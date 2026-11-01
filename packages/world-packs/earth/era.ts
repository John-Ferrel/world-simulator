export function occupationForYear<T extends string>(role: T, year: number): T | '抄写员' | '商贩' {
  if (role === '程序员' && year < 1950) return '抄写员';
  if (role === '司机' && year < 1910) return '商贩';
  return role;
}
