import {Action, Selector, State, StateContext} from '@ngxs/store';
import {WindFarms} from './windfarms.actions';
import {WindfarmService} from '../../services/windfarm.service';
import {tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {WindfarmModel, WindfarmOutputModel} from '../../model/windfarm';

@State<WindfarmModel>({
  name: 'windfarms',
  defaults: {
    farms : []
  }
})


@State<WindfarmOutputModel>({
  name: 'windfarmOutput',
  defaults: {
    output : {farmId: '', output:[]}
  }
})


@Injectable()
export class WindfarmsState {

  constructor(private windFarmService: WindfarmService) {
  }

  @Selector()
  static allWindFarms(state: WindfarmModel) {
    return state.farms;
  }

  @Selector()
  static farmOutput(state: WindfarmOutputModel) {
    return state.output;
  }

  @Action(WindFarms.Load)
  load(ctx: StateContext<WindfarmModel>) {
    return this.windFarmService.getAllFarms().pipe(
      tap(returnData =>{
        const state = ctx.getState();
        ctx.setState({
          ...state,
          farms: returnData
        });
      })
    )
  }

  @Action(WindFarms.Find)
  find(ctx: StateContext<WindfarmOutputModel>, {id}: WindFarms.Find) {
    return this.windFarmService.getFarmOutput(id).pipe(
      tap(returnData =>{
        const state = ctx.getState();
        ctx.setState({
          ...state,
          output: returnData
        });
      })
    );
  }

}
