import {EnergyOutput, FarmOutput} from '../../model/windfarm';

export namespace WindFarms{
  export class Load {
    static readonly type = '[WindFarms] load all farms';
    constructor() {
    }
  }

  export class Find {
    static readonly type = '[WindFarms] Find a farm and output';
    constructor(public id: string) {
    }
  }

  export class CalculateCapacity {
    static readonly type = '[WindFarms] Successfully found a farm and its output';
    constructor(public output: EnergyOutput[]) {
    }
  }
}


