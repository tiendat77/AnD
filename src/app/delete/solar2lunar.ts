const PI = Math.PI;
const CAN: string[] = [ 'Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', ];
const CHI: string[] = ['Thân', 'Dậu', 'Tuất', 'Hợi', 'Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', ];
const LOCAL_TIMEZONE = 7;

export function Solar2LunarYear(year: number): string {
  const can = CAN[year % 10];
  const chi = CHI[year % 12];

  return can + ' ' + chi;
}

export function Solar2Lunar(day: number, month: number, year: number): number[] {

  let yy = year;
  let ly: number[][] = LunarYear(year);
  const month11 = ly[ly.length - 1];
  const jdToday = LocalToJD(day, month, year);
  const jdMonth11 = LocalToJD(month11[0], month11[1], month11[2]);
  if (jdToday >= jdMonth11) {
    ly = LunarYear(year + 1);
    yy = year + 1;
  }
  let i = ly.length - 1;
  while (jdToday < LocalToJD(ly[i][0], ly[i][1], ly[i][2])) {
    i--;
  }
  const dd = INT(jdToday - LocalToJD(ly[i][0], ly[i][1], ly[i][2])) + 1;
  const mm = ly[i][3];
  if (mm >= 11) {
    yy--;
  }

  return new Array(dd, mm, yy, ly[i][4]);
}

function INT(d) {
  return Math.floor(d);
}

function MOD(x: number, y: number): number {
  let z = x - (y * Math.floor(x / y));
  if (z === 0) {
    z = y;
  }

  return z;
}

function LocalToJD(day: number, month: number, year: number): number {
  return UniversalToJD(day, month, year) - LOCAL_TIMEZONE / 24.0;
}

function LocalFromJD(JD: number): number[] {
  return UniversalFromJD(JD + LOCAL_TIMEZONE / 24.0);
}

function UniversalToJD(day: number, month: number, year: number): number {
  let JD: number;

  if (year > 1582 || (year === 1582 && month > 10) || (year === 1582 && month === 10 && day > 14)) {
    JD = 367 * year - INT(7 * (year + INT((month + 9) / 12)) / 4)
         - INT(3 * (INT((year + (month - 9) / 7) / 100) + 1) / 4)
         + INT(275 * month / 9) + day + 1721028.5;
  } else {
    JD = 367 * year - INT(7 * (year + 5001 + INT((month - 9) / 7)) / 4)
         + INT(275 * month / 9) + day + 1729776.5;
  }

  return JD;
}

// Convert Julius to Solar
function UniversalFromJD(JD: number): number[] {
  let Z, A, alpha, B, C, D, E, dd, mm, yyyy;
  let F: number;

  Z = INT(JD + 0.5);
  F = (JD + 0.5) - Z;

  if (Z < 2299161) {
    A = Z;
  } else {
    alpha = INT((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - INT(alpha / 4);
  }

  B = A + 1524;
  C = INT((B - 122.1) / 365.25);
  D = INT(365.25 * C);
  E = INT((B - D) / 30.6001);
  dd = INT(B - D - INT(30.6001 * E) + F);

  if (E < 14) {
    mm = E - 1;
  } else {
    mm = E - 13;
  }
  if (mm < 3) {
    yyyy = C - 4715;
  } else {
    yyyy = C - 4716;
  }

  return Array(dd, mm, yyyy);
}

function NewMoon(k: number) {
  const T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  let deltat;
  if (T < -11) {
    deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
  } else {
    deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
  }

  const JdNew = Jd1 + C1 - deltat;
  return JdNew;
}

function SunLongitude(jdn: number) {
  const T = (jdn - 2451545.0) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
  const T2 = T * T;
  const dr = PI / 180; // degree to radian
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = L0 + DL; // true longitude, degree
  L = L * dr;
  L = L - PI * 2 * (INT(L / (PI * 2))); // Normalize to (0, 2*PI)
  return L;
}

function LunarMonth11(Y: number) {
  const off = LocalToJD(31, 12, Y) - 2415021.076998695;
  const k = INT(off / 29.530588853);
  let jd = NewMoon(k);
  const ret: number[] = LocalFromJD(jd);
  const sunLong = SunLongitude(LocalToJD(ret[0], ret[1], ret[2])); // sun longitude at local midnight
  if (sunLong > 3 * PI / 2) {
    jd = NewMoon(k - 1);
  }
  return LocalFromJD(jd);
}

function initLeapYear(ret: number[][]) {
  const sunLongitudes: number[] = [ret[0].length, ret.length];
  for (let i = 0; i < ret.length; i++) {
    const a: number[] = ret[i];
    const jdAtMonthBegin: number = LocalToJD(a[0], a[1], a[2]);
    sunLongitudes[i] = SunLongitude(jdAtMonthBegin);
  }
  let found = false;
  for (let i = 0; i < ret.length; i++) {
    if (found) {
      ret[i][3] = MOD(i + 10, 12);
      continue;
    }
    const sl1 = sunLongitudes[i];
    const sl2 = sunLongitudes[i + 1];
    const hasMajorTerm = Math.floor(sl1 / PI * 6) !== Math.floor(sl2 / PI * 6);
    if (!hasMajorTerm) {
      found = true;
      ret[i][4] = 1;
      ret[i][3] = MOD(i + 10, 12);
    }
  }
}

function LunarYear(Y: number) {
  let ret: number[][] = [];
  const month11A: number[] = LunarMonth11(Y - 1);
  const jdMonth11A = LocalToJD(month11A[0], month11A[1], month11A[2]);
  const k = Math.floor(0.5 + (jdMonth11A - 2415021.076998695) / 29.530588853);
  const month11B: number[] = LunarMonth11(Y);
  const off = LocalToJD(month11B[0], month11B[1], month11B[2]) - jdMonth11A;
  const leap = off > 365.0;
  if (!leap) {
    // ret = new Array[13][5];
  } else {
    // ret = new int[14][5];
  }
  ret.push(new Array(month11A[0], month11A[1], month11A[2], 0, 0));
  for (let i = 1; i < ret.length - 1; i++) {
    const nm = NewMoon(k + i);
    const a = LocalFromJD(nm);
    ret.push(new Array(a[0], a[1], a[2], 0, 0));
  }
  ret.push(new Array(month11B[0], month11B[1], month11B[2], 0, 0));
  for (let i = 0; i < ret.length; i++) {
    ret[i][3] = MOD(i + 11, 12);
  }
  if (leap) {
    initLeapYear(ret);
  }
  return ret;
}
