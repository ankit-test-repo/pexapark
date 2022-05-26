export interface Windfarm {
  index: number,
  id: string,
  averageOutput: number,
  name: string,
  location: string
}

export interface FarmOutput {
  farmId: string,
  output: EnergyOutput[]
}

export interface EnergyOutput {
  timestamp: number,
  energy: number
}

export interface EnergyCapacity {
  date: string;
  readings: number,
  capacityFactor: number
}

export class WindfarmsModel {
  farms!: Windfarm[]
}

export class WindfarmModel {
  farm?: Windfarm
}

export class WindfarmOutputModel {
  output!: FarmOutput
}

