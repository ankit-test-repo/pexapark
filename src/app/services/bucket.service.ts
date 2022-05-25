import {Injectable} from '@angular/core';
import {BehaviorSubject, from, groupBy, mergeMap, toArray} from 'rxjs';
import {Bucket} from '../model/bucket';
import {EnergyCapacity, EnergyOutput} from '../model/windfarm';
import {MAX_OUTPUT} from '../constants/static-data';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public buckets: BehaviorSubject<Bucket[]> = new BehaviorSubject<Bucket[]>([]);

  public bucketSize: BehaviorSubject<number> = new BehaviorSubject(24);

  // hardcode range value as the data is only for that given period
  private static start = 1652140800;
  private static end = 1652918399;

  public getBucketSize(): number {
    return this.bucketSize.getValue();
  }

  public getBuckets(): Bucket[] {
    return this.buckets.getValue().length > 0? this.buckets.getValue() : this.createBuckets();
  }

  public setBucketSize(value: number) {
    return this.bucketSize.next(value);
  }

  constructor() {
  }

  public createBuckets(): Bucket[] {
    const sizeInSeconds = this.getBucketSize() * 60 * 60;
    let currentStart = BucketService.start
    // this is test project so does not need a UUID
    let id: number = 1;
    const buckets: Bucket[] = [];
    while (currentStart < BucketService.end) {
      buckets.push({
        id: id,
        from: currentStart,
        to: currentStart + sizeInSeconds
      });
      currentStart += sizeInSeconds;
      id++;
    }
    this.buckets.next(buckets);
    return buckets;
  }

  calculateCapacityFactor(output: EnergyOutput[]): EnergyCapacity[] {
    const capacityFactors: EnergyCapacity[] = [];
    if(output) {
      from(output).pipe(
        groupBy(raw => this.findBucket(raw.timestamp)),
        mergeMap(group => group.pipe(toArray())),
      ).subscribe(items => {
        capacityFactors.push(this.calculateCapacity(items));
      });
    }
    return capacityFactors;
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
    const buckets = this.getBuckets();
    const bucket = buckets.find(b => timestamp >= b.from && timestamp < b.to);
    return bucket? this.toShortTimestamp(bucket.from): 'unknown';
  }
}
