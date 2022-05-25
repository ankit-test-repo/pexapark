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
import {MAX_OUTPUT} from '../../constants/static-data';
import {BucketService} from '../../services/bucket.service';

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

  constructor(private windFarmService: WindfarmService, private bucketService: BucketService) {
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
        ctx.dispatch(new WindFarms.CalculateCapacity(returnData.output));
      })
    );
  }

  @Action(WindFarms.CalculateCapacity)
  calculateCapacityFactor(ctx: StateContext<CapacityFactorModel>, {output}: WindFarms.CalculateCapacity) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      data: []
    });
    return from(output).pipe(
      groupBy(raw => this.findBucket(raw.timestamp)),
      mergeMap(group => group.pipe(toArray())),
      tap(items => {
        console.log(items);
        const item = this.calculateCapacity(items);
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          data: [...state.data? state.data : [] , item]
        });
      })
    )
  }

  calculateCapacity(rawEnergy: EnergyOutput[]) : EnergyCapacity {
    const date = this.findBucket(rawEnergy[0].timestamp)
    const readings = rawEnergy.length
    const totalOutput = rawEnergy.reduce(
      (previousValue, currentValue) => previousValue + currentValue.energy, 0
    );
    return {
      date: date,
      capacityFactor: (totalOutput/ readings) / MAX_OUTPUT,
      readings: readings
    }
  }

  toShortTimestamp(timestamp: number){
    return DateTime.fromSeconds(timestamp).toUTC().toFormat('dd/MM/yy HH:mm')
  }

  findBucket(timestamp: number): string{
    const buckets = this.bucketService.getBuckets();
    const bucket = buckets.find(b => timestamp >= b.from && timestamp < b.to);
    return bucket? this.toShortTimestamp(bucket.from): 'unknown';
  }
}
