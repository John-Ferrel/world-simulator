/** Archival career categories are hints for an adult starting role, never a promise of later achievement. */
export function historicalCareer(occupation: string | undefined) {
  if (!occupation) return;
  const role = occupation.toUpperCase();
  if (/PHYSICIAN|SURGEON|NURSE/.test(role)) return '医护人员';
  if (
    /PHYSICIST|CHEMIST|BIOLOGIST|MATHEMATICIAN|SCIENTIST|INVENTOR|ASTRONOMER|ECONOMIST|PSYCHOLOGIST|ENGINEER/.test(
      role,
    )
  )
    return '研究员';
  if (/POLITICIAN|DIPLOMAT|JUDGE|ACTIVIST/.test(role)) return '政务工作者';
  if (/MILITARY/.test(role)) return '军务工作者';
  if (/RELIGIOUS/.test(role)) return '宗教事务工作者';
  if (/WRITER|PHILOSOPHER|HISTORIAN|JOURNALIST/.test(role)) return '抄写员';
  if (/ACTOR|SINGER|MUSICIAN|COMPOSER|PAINTER|ARTIST|FILM|DANCER/.test(role)) return '艺术工作者';
  if (/PLAYER|ATHLETE|WRESTLER|BOXER|GYMNAST|SWIMMER/.test(role)) return '运动员';
  if (/BUSINESS|MERCHANT/.test(role)) return '商贩';
}
