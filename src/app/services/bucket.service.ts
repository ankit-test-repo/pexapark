import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Bucket} from '../model/bucket';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  public buckets: BehaviorSubject<Bucket[]> = new BehaviorSubject<Bucket[]>([]);

  public bucketSize: BehaviorSubject<number> = new BehaviorSubject(24);

  // hardcode range value as the data is only for that given period
  private static start = 1652140800;
  private static end = 1652896800;

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

  /**
   * use behaviour subject to store bucket
   * create bucket based on time range
   * use default as last 7 days 24hr bucket
   * bucket: {id: any, startTime, endTime, capacityFactor}
   * use filter for date ranges
   *
   * */


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
}
