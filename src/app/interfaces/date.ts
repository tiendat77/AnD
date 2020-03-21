export interface IDate {
  solar: SolarDate;
  lunar: LunarDate;
  isDisabled: boolean;
  isToday: boolean;
}

// MONTH START FROM 0
export interface SolarDate {
  year: number;
  month: number;
  date: number;
  weekday: string;
}

export interface LunarDate {
  year: number;
  month: number;
  date: number;
  lunarYear?: Lunar;
  lunarMonth?: Lunar;
  lunarDate?: Lunar;
}

export interface Lunar {
  can: string;
  chi: string;
}
