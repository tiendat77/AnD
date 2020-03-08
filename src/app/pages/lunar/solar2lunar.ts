import { LunarDate, SolarDate } from '../../interfaces/date';
import * as moment from 'moment';
import 'moment-lunar';

export const WEEKDAY: string[] = [ 'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', ];
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
    lunarDate: lunarDate(),
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

function lunarDate(): string {
  const can = 'Chua';
  const chi = 'Biet Tinh';
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
