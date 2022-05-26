import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {map, Observable} from 'rxjs';
import {EnergyCapacity, EnergyOutput, FarmOutput, Windfarm} from '../../model/windfarm';
import {WindFarms} from '../../store/windfarms/windfarms.actions';
import {WindfarmsState} from '../../store/windfarms/windfarms.state';
import {AgChartOptions} from 'ag-charts-community';
import {CAPACITY_FACTOR_CHART_AXES, CHART_THEME} from '../../constants/static-data';
import {BucketService} from '../../services/bucket.service';

@Component({
  selector: 'app-farm-output',
  templateUrl: './farm-output.component.html',
  styleUrls: ['./farm-output.component.scss']
})
export class FarmOutputComponent implements OnInit {
  @Select(WindfarmsState.farmOutput) farmOutput$!: Observable<FarmOutput>;
  windFarm?: Windfarm;
  public chartOptions?: AgChartOptions;
  public bucketSize: number = 24;
  private energyOutput: EnergyOutput[] = [];

  constructor(private _Activatedroute: ActivatedRoute,
              private store: Store,
              private bucketService: BucketService) {
  }

  ngOnInit(): void {
    const farmId = this._Activatedroute.snapshot.paramMap.get("id");
    if (!!farmId) {
      this.store.dispatch(new WindFarms.Find(farmId));
      this.store.select(WindfarmsState.selectedFarm).pipe(map(findFn => findFn(farmId)))
        .subscribe(farm => this.windFarm = farm);

    }
    this.bucketSize = this.bucketService.getBucketSize();

    this.farmOutput$.subscribe(data => {
      if(data){
        this.energyOutput = data.output;
        this.updateCapacityFactor();
      }
    });
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

  updateCapacityFactor(){
    this.bucketService.setBucketSize(this.bucketSize);
    this.bucketService.createBuckets();
    const capacityFactors = this.bucketService.calculateCapacityFactor(this.energyOutput);
    this.setChartData(capacityFactors);
  }
}
