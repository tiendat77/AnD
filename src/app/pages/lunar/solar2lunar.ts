import { LunarDate, SolarDate } from '../../interfaces/date';
import * as moment from 'moment';
import 'moment-lunar';

export const WEEKDAY: string[] = [ 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY' ];
const CAN: string[] = [ 'Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', ];
const CHI: string[] = [ 'Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', ];

export function getSolarDate(solarDate: Date): SolarDate {
  const date = solarDate.getDate();
  const month = solarDate.getMonth();
  const year = solarDate.getFullYear();
  const weekday = WEEKDAY[solarDate.getDay()];

  return { year, month, date, weekday };
}

// month start from 0
export function getLunarDate(solarDate: Date): LunarDate {
  const date = solarDate.getDate();
  const month = solarDate.getMonth();
  const year = solarDate.getFullYear();

  const lunar: moment.Moment = moment().year(year).month(month).date(date).lunar();
  return {
    date: lunar.date(),
    month: lunar.month(),
    year: lunar.year(),
    lunarYear: lunarYear(lunar.year()),
    lunarMonth: lunarMonth(lunar.year(), lunar.month()),
    lunarDate: lunarDate(year, month, date),
  };
}

function lunarYear(year: number): string {
  const can = CAN[year % 10];
  const chi = CHI[year % 12];

  return can + ' ' + chi;
}

function lunarMonth(year: number, month: number): string {
  const can = CAN[fix10((year * 12 + month + 8) % 10)];
  const chi = CHI[fix12(month + 6)];
  return can + ' ' + chi;
}

function lunarDate(year: number, month: number, date: number): string {
  const fixMonth = ((14 - month) - (14 - month) % 12) / 12;
  const jy = year + 4800 - fixMonth;
  const jm = month + 12 * fixMonth - 3;
  const jd = date + ((153 * jm + 2) - ((153 * jm + 2) % 5)) / 5
            + 365 * jy + (jy - (jy % 4)) / 4 - (jy - jy % 100) / 100 + (jy - (jy % 400)) / 400 - 32045;

  const can = CAN[fix10((jd + 2) % 10)];
  const chi = CHI[fix12((jd + 10) % 12)];
  return can + ' ' + chi;
}

function fix10(num: number): number {
  while (num > 9) {
    num = num - 10;
  }

  while (num < 0) {
    num = num + 10;
  }

  return num;
}

function fix12(num: number): number {
  while (num > 11) {
    num = num - 12;
  }

  while (num < 0) {
    num = num + 12;
  }

  return num;
}
