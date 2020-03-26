export function Solar2Lunar(day: number, month: number, year: number): { date: number, month: number, year: number } {
  let lYear: number = year;
  month = month + 1;
  let lunarYear: number[][] = LunarYear(year);
  const month11: number[] = lunarYear[lunarYear.length - 1];
  const jdToday: number = LocalToJD(day, month, year);
  const jdMonth11: number = LocalToJD(month11[0], month11[1], month11[2]);
  if (jdToday >= jdMonth11) {
    lunarYear = LunarYear(year + 1);
    lYear = year + 1;
  }
  let i: number = lunarYear.length - 1;
  while ((jdToday < LocalToJD(lunarYear[i][0], lunarYear[i][1], lunarYear[i][2]))) {
    {
      i--;
    }
  }
  const lDate: number = (<number>(jdToday - LocalToJD(lunarYear[i][0], lunarYear[i][1], lunarYear[i][2])) | 0) + 1;
  let lMonth: number = lunarYear[i][3];
  if (lMonth >= 11) {
    lYear--;
  }

  lMonth = lMonth - 1;

  return { date: lDate, month: lMonth, year: lYear };
}


function INT(d: number): number {
  return (<number>Math.floor(d) | 0);
}

function MOD(x: number, y: number): number {
  let z: number = x - (<number>(y * Math.floor((<number>x / y))) | 0);
  if (z === 0) {
    z = y;
  }
  return z;
}

function UniversalToJD(day: number, month: number, year: number): number {
  let jd: number;
  if (year > 1582 || (year === 1582 && month > 10) || (year === 1582 && month === 10 && day > 14)) {
    jd = 367 * year - INT((7 * (year + INT(((month + 9) / 12 | 0))) / 4 | 0)) - INT((3 * (INT(((year + ((month - 9) / 7 | 0)) / 100 | 0)) + 1) / 4 | 0)) + INT((275 * month / 9 | 0)) + day + 1721028.5;
  } else {
    jd = 367 * year - INT((7 * (year + 5001 + INT(((month - 9) / 7 | 0))) / 4 | 0)) + INT((275 * month / 9 | 0)) + day + 1729776.5;
  }
  return jd;
}

function UniversalFromJD(jd: number): number[] {
  let Z: number;
  let A: number;
  let alpha: number;
  let B: number;
  let C: number;
  let D: number;
  let E: number;
  let dd: number;
  let mm: number;
  let yyyy: number;
  let F: number;
  Z = INT(jd + 0.5);
  F = (jd + 0.5) - Z;
  if (Z < 2299161) {
    A = Z;
  } else {
    alpha = INT((Z - 1867216.25) / 36524.25);
    A = Z + 1 + alpha - INT((alpha / 4 | 0));
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
  return [dd, mm, yyyy];
}

function LocalFromJD(jd: number): number[] {
  return UniversalFromJD(jd + 7.0 / 24.0);
}

function LocalToJD(day: number, month: number, year: number): number {
  return UniversalToJD(day, month, year) - 7.0 / 24.0;
}

function NewMoon(k: number): number {
  const T: number = k / 1236.85;
  const T2: number = T * T;
  const T3: number = T2 * T;
  const dr: number = Math.PI / 180;
  let Jd1: number = 2415020.75933 + 29.53058868 * k + 1.178E-4 * T2 - 1.55E-7 * T3;
  Jd1 = Jd1 + 3.3E-4 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M: number = 359.2242 + 29.10535608 * k - 3.33E-5 * T2 - 3.47E-6 * T3;
  const Mpr: number = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 1.236E-5 * T3;
  const F: number = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 2.39E-6 * T3;
  let C1: number = (0.1734 - 3.93E-4 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 4.0E-4 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 4.0E-4 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 4.0E-4 * Math.sin(dr * (2 * F - M)) - 6.0E-4 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.001 * Math.sin(dr * (2 * F - Mpr)) + 5.0E-4 * Math.sin(dr * (2 * Mpr + M));
  let delta: number;
  if (T < -11) {
    delta = 0.001 + 8.39E-4 * T + 2.261E-4 * T2 - 8.45E-6 * T3 - 8.1E-8 * T * T3;
  } else {
    delta = -2.78E-4 + 2.65E-4 * T + 2.62E-4 * T2;
  }
  const JdNew: number = Jd1 + C1 - delta;
  return JdNew;
}

function SunLongitude(jd: number): number {
  const T: number = (jd - 2451545.0) / 36525;
  const T2: number = T * T;
  const dr: number = Math.PI / 180;
  const M: number = 357.5291 + 35999.0503 * T - 1.559E-4 * T2 - 4.8E-7 * T * T2;
  const L0: number = 280.46645 + 36000.76983 * T + 3.032E-4 * T2;
  let DL: number = (1.9146 - 0.004817 * T - 1.4E-5 * T2) * Math.sin(dr * M);
  DL = DL + (0.019993 - 1.01E-4 * T) * Math.sin(dr * 2 * M) + 2.9E-4 * Math.sin(dr * 3 * M);
  let L: number = L0 + DL;
  L = L * dr;
  L = L - Math.PI * 2 * (INT(L / (Math.PI * 2)));
  return L;
}

function LunarMonth11(year: number): number[] {
  const off: number = LocalToJD(31, 12, year) - 2415021.076998695;
  const k: number = INT(off / 29.530588853);
  let jd: number = NewMoon(k);
  const ret: number[] = LocalFromJD(jd);
  const sunLong: number = SunLongitude(LocalToJD(ret[0], ret[1], ret[2]));
  if (sunLong > 3 * Math.PI / 2) {
    jd = NewMoon(k - 1);
  }
  return LocalFromJD(jd);
}

function LunarYear(Y: number): number[][] {
  let ret: number[][] = null;
  const month11A: number[] = LunarMonth11(Y - 1);
  const jdMonth11A: number = LocalToJD(month11A[0], month11A[1], month11A[2]);
  const k: number = (<number>Math.floor(0.5 + (jdMonth11A - 2415021.076998695) / 29.530588853) | 0);
  const month11B: number[] = LunarMonth11(Y);
  const off: number = LocalToJD(month11B[0], month11B[1], month11B[2]) - jdMonth11A;
  const leap: boolean = off > 365.0;
  if (!leap) {
    ret = <any>(function (dims) { const allocate = function (dims) { if (dims.length == 0) { return 0; } else { const array = []; for (let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; } }; return allocate(dims); })([13, 5]);
  } else {
    ret = <any>(function (dims) { const allocate = function (dims) { if (dims.length == 0) { return 0; } else { const array = []; for (let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; } }; return allocate(dims); })([14, 5]);
  }
  ret[0] = [month11A[0], month11A[1], month11A[2], 0, 0];
  ret[ret.length - 1] = [month11B[0], month11B[1], month11B[2], 0, 0];
  for (let i: number = 1; i < ret.length - 1; i++) {
    const nm: number = NewMoon(k + i);
    const a: number[] = LocalFromJD(nm);
    ret[i] = [a[0], a[1], a[2], 0, 0];
  }
  for (let i: number = 0; i < ret.length; i++) {
    ret[i][3] = MOD(i + 11, 12);
  }
  if (leap) {
    initLeapYear(ret);
  }
  return ret;
}

function initLeapYear(ret: number[][]) {
  const sunLongitudes: number[] = (s => { const a = []; while (s-- > 0) a.push(0); return a; })(ret.length);
  for (let i: number = 0; i < ret.length; i++) {
    {
      const a: number[] = ret[i];
      const jdAtMonthBegin: number = LocalToJD(a[0], a[1], a[2]);
      sunLongitudes[i] = SunLongitude(jdAtMonthBegin);
    };
  }
  let found: boolean = false;
  for (let i: number = 0; i < ret.length; i++) {
    {
      if (found) {
        ret[i][3] = MOD(i + 10, 12);
        continue;
      }
      const sl1: number = sunLongitudes[i];
      const sl2: number = sunLongitudes[i + 1];
      const hasMajorTerm: boolean = Math.floor(sl1 / Math.PI * 6) !== Math.floor(sl2 / Math.PI * 6);
      if (!hasMajorTerm) {
        found = true;
        ret[i][4] = 1;
        ret[i][3] = MOD(i + 10, 12);
      }
    };
  }
}
