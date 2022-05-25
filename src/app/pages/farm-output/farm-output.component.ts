import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {EnergyCapacity} from '../../model/windfarm';
import {WindFarms} from '../../store/windfarms/windfarms.actions';
import {WindfarmsState} from '../../store/windfarms/windfarms.state';
import {AgChartOptions} from 'ag-charts-community';
import {CAPACITY_FACTOR_CHART_AXES, CHART_THEME} from '../../constants/static-data';

@Component({
  selector: 'app-farm-output',
  templateUrl: './farm-output.component.html',
  styleUrls: ['./farm-output.component.scss']
})
export class FarmOutputComponent implements OnInit {
  @Select(WindfarmsState.capacityFactor) capacityFactor$!: Observable<EnergyCapacity[]>;
  public chartOptions?: AgChartOptions;
  public bucketSize: number = 24;

  constructor(private _Activatedroute: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    const farmId = this._Activatedroute.snapshot.paramMap.get("id");
    if (!!farmId) {
      this.store.dispatch(new WindFarms.Find(farmId));
    }
    this.capacityFactor$.subscribe(data => this.setChartData(data));
  }

  setChartData(capacityFactors: EnergyCapacity[]) {
    this.chartOptions = {
      data: capacityFactors,
      theme: CHART_THEME,
      axes: CAPACITY_FACTOR_CHART_AXES,
      series: [
        {
          type: 'column',
          xKey: 'date',
          yKey: 'capacityFactor',
          yName: 'Aggregate capacity factor'
        },
        {
          type: 'line',
          xKey: 'date',
          yKey: 'readings',
          yName: 'Number of readings'
        }

      ],
      legend: { position: "bottom" }
    };
  }
}
