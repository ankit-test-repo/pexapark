import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Windfarm} from '../../model/windfarm';
import {Select, Store} from '@ngxs/store';
import {WindfarmsState} from '../../store/windfarms/windfarms.state';
import {WindFarms} from '../../store/windfarms/windfarms.actions';

@Component({
  selector: 'app-all-farms',
  templateUrl: './all-farms.component.html',
  styleUrls: ['./all-farms.component.scss']
})
export class AllFarmsComponent implements OnInit {
 @Select(WindfarmsState.allWindFarms) windFarms$: Observable<Windfarm[]> | undefined;
 public searchText!: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(WindFarms.Load);
  }

}
