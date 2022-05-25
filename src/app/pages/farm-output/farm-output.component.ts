import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {EnergyCapacity} from '../../model/windfarm';
import {WindFarms} from '../../store/windfarms/windfarms.actions';
import {WindfarmsState} from '../../store/windfarms/windfarms.state';

@Component({
  selector: 'app-farm-output',
  templateUrl: './farm-output.component.html',
  styleUrls: ['./farm-output.component.scss']
})
export class FarmOutputComponent implements OnInit {
  @Select(WindfarmsState.capacityFactor) capacityFactor$: Observable<EnergyCapacity[]> | undefined;

  constructor(private _Activatedroute: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    const farmId = this._Activatedroute.snapshot.paramMap.get("id");
    if (!!farmId) {
      this.store.dispatch(new WindFarms.Find(farmId));
    }
  }

}
