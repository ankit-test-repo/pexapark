import {Action, Selector, State, StateContext} from '@ngxs/store';
import {WindFarms} from './windfarms.actions';
import {WindfarmService} from '../../services/windfarm.service';
import {from, groupBy, mergeMap, tap, toArray} from 'rxjs';
import {Injectable} from '@angular/core';
import {
  CapacityFactorModel,
  EnergyCapacity,
  EnergyOutput,
  WindfarmModel,
  WindfarmOutputModel
} from '../../model/windfarm';
import {DateTime} from 'luxon';

@State<WindfarmModel>({
  name: 'windfarms',
  defaults: {
    farms : []
  }
})


@State<WindfarmOutputModel>({
  name: 'windfarmOutput',
  defaults: {
    output : {}
  }
})

@State<CapacityFactorModel>({
  name: 'farmCapacityFactor',
  defaults: {
    data : []
  }
})

@Injectable()
export class WindfarmsState {
  maxOutput: number = 10;

  constructor(private windFarmService: WindfarmService) {
  }

  @Selector()
  static allWindFarms(state: WindfarmModel) {
    return state.farms;
  }

  @Selector([WindfarmOutputModel])
  static farmOutput(state: WindfarmOutputModel) {
    return state.output;
  }

  @Selector()
  static capacityFactor(state: CapacityFactorModel) {
    return state.data;
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
        ctx.dispatch(new WindFarms.FoundSuccessfully(returnData.output));
      })
    );
  }

  @Action(WindFarms.FoundSuccessfully)
  calculateCapacityFactor(ctx: StateContext<CapacityFactorModel>, {output}: WindFarms.FoundSuccessfully) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      data: []
    });
    return from(output).pipe(
      groupBy(raw => this.toShortDate(raw.timestamp)),
      mergeMap(group => group.pipe(toArray())),
      tap(items => {
        const item = this.calculateCapacity(items);
        console.log(item);
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          data: [...state.data? state.data : [] , item]
        });
      })
    )
  }


  calculateCapacity(rawEnergy: EnergyOutput[]) : EnergyCapacity {
    const date = this.toShortDate(rawEnergy[0].timestamp)
    const readings = rawEnergy.length
    const totalOutput = rawEnergy.reduce(
      (previousValue, currentValue) => previousValue + currentValue.energy, 0
    );
    return {
      date: date,
      capacityFactor: (totalOutput/ readings) / this.maxOutput,
      readings: readings
    }
  }

  toShortDate(timestamp: number){
    return DateTime.fromSeconds(timestamp).toLocaleString(DateTime.DATE_SHORT)
  }
}
