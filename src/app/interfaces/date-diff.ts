export interface DateDiffModel {
  startDate: string;
  untilDate: string;
  days: string;
  dmy: {
    days: number;
    months: number;
    years: number;
  };
}
