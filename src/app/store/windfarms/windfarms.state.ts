import {Action, Selector, State, StateContext} from '@ngxs/store';
import {WindFarms} from './windfarms.actions';
import {WindfarmService} from '../../services/windfarm.service';
import {tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {WindfarmOutputModel, WindfarmsModel} from '../../model/windfarm';

@State<WindfarmsModel>({
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
  static allWindFarms(state: WindfarmsModel) {
    return state.farms;
  }

  @Selector()
  static selectedFarm(state: WindfarmsModel) {
    return (id: string) => {
      return state.farms.find(farm => farm.id === id);
    };
  }

  @Selector()
  static farmOutput(state: WindfarmOutputModel) {
    return state.output;
  }

  @Action(WindFarms.Load)
  load(ctx: StateContext<WindfarmsModel>) {
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
