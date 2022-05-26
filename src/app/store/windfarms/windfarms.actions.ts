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

}


