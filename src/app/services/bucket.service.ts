import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor() { }
  /**
   * use behaviour subject to store bucket
   * create bucket based on time range
   * use default as last 7 days 24hr bucket
   * bucket: {id: any, startTime, endTime, capacityFactor}
   * use filter for date ranges
   *
   * */
}
