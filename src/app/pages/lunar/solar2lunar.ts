import { Lunar } from '../../interfaces/lunar';
import * as moment from 'moment';
import 'moment-lunar';

const CAN: string[] = [ 'Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', ];
const CHI: string[] = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', ];

export function LunarYear(year: number): string {
  const can = CAN[year % 10];
  const chi = CHI[year % 12];

  return can + ' ' + chi;
}

export function Solar2Lunar(date: number, month: number, year: number): Lunar {
  const lunar: moment.Moment = moment().year(year).month(month - 1).date(date).lunar();
  return {
    date: lunar.date(),
    month: lunar.month() + 1,
    year: lunar.year(),
    canchi: LunarYear(lunar.year())
  };
}
