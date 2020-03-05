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
}

export interface LunarDate {
  year: number;
  month: number;
  date: number;
  lunarYear?: string;
  lunarMonth?: string;
  lunarDate?: string;
}
