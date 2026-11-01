export const skinColors = ['#e8c29a', '#c79772', '#9b694d', '#684633'];
export const hairColors = ['#342c29', '#754f38', '#c0a36c', '#c6c5bb'];
export const clothesColors = ['#7d8b67', '#92675d', '#648c99', '#8e79a0', '#b39762', '#657a7d'];
export function spritePixels(
  appearance: { skin: number; hair: number; clothes: number },
  age: number,
  occupation: string,
  dead = false,
) {
  const skin = skinColors[appearance.skin] ?? skinColors[1],
    hair = age > 60 ? '#bebeb4' : (hairColors[appearance.hair] ?? hairColors[0]),
    cloth =
      occupation === '议事长' ? '#b39762' : (clothesColors[appearance.clothes] ?? clothesColors[2]);
  const rows = [
    '0000hhhh0000',
    '000hhhhhh000',
    '000hsssssh00',
    '000sseses000',
    '000ssssss000',
    '0000ssss0000',
    '0000cccc0000',
    '00sccccccs00',
    '00sccccccs00',
    '00sccccccs00',
    '000cccccc000',
    '0000bbbb0000',
    '0000b0bb0000',
    '0000b0bb0000',
    '0000d0dd0000',
    '000dd0ddd000',
  ];
  const palette: Record<string, string> = {
    h: hair,
    s: skin,
    e: '#292e2a',
    c: cloth,
    b: '#474a45',
    d: '#302e2c',
  };
  return rows.flatMap((row, y) =>
    [...row].flatMap((c, x) => (c === '0' ? [] : [{ x, y, color: dead ? '#81837a' : palette[c] }])),
  );
}
