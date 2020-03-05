import { LunarDate } from '../../interfaces/date';
import * as moment from 'moment';
import 'moment-lunar';

const CAN: string[] = [ 'Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', ];
const CHI: string[] = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', ];

export function LunarYear(year: number): string {
  const can = CAN[year % 10];
  const chi = CHI[year % 12];

  return can + ' ' + chi;
}

// month start from 0
export function Solar2Lunar(date: number, month: number, year: number): LunarDate {
  const lunar: moment.Moment = moment().year(year).month(month).date(date).lunar();
  return {
    date: lunar.date(),
    month: lunar.month(),
    year: lunar.year(),
    lunarYear: LunarYear(lunar.year())
  };
}
