import { random } from '../simulation-core/random.js';
import type { BirthRequest, DollConfig, Person, Settlement, World } from '../contracts/index.js';

/**
 * Seeded, pure creation-draft generator.
 *
 * This module deliberately does not write to a World. It produces a rich,
 * editable draft that can be shown in the creation UI and, after the player
 * accepts it, mapped to the existing BirthRequest. Family, parents, site
 * viability, abilities and outcomes remain the simulator's decision.
 */

export type CreationMode = 'ordinary' | 'legendary';
export type BirthSex = NonNullable<Person['sex']>;
export type EraBand =
  'premodern' | 'industrial' | 'interwar' | 'coldwar' | 'contemporary' | 'frontier';

/* ------------------------------------------------------------------ */
/* Name cultures                                                       */
/* ------------------------------------------------------------------ */

export type NameCultureId =
  | 'han'
  | 'japanese'
  | 'korean'
  | 'vietnamese'
  | 'thai'
  | 'malay-indonesian'
  | 'filipino'
  | 'southeast-asian'
  | 'south-asian'
  | 'bengali'
  | 'tamil'
  | 'arabic'
  | 'persian'
  | 'turkish'
  | 'caucasus'
  | 'greek'
  | 'hebrew'
  | 'west-african'
  | 'east-african'
  | 'central-african'
  | 'southern-african'
  | 'latin-american'
  | 'caribbean'
  | 'anglo'
  | 'french'
  | 'german'
  | 'iberian'
  | 'italian'
  | 'slavic'
  | 'nordic'
  | 'central-asian'
  | 'pacific-islander'
  | 'frontier';

export type NameCulture = {
  readonly id: NameCultureId;
  readonly label: string;
  readonly region: string;
  readonly surnames: readonly string[];
  readonly male: readonly string[];
  readonly female: readonly string[];
  readonly familyFirst: boolean;
  readonly separator: string;
};

function pool(
  id: NameCultureId,
  label: string,
  region: string,
  surnames: readonly string[],
  male: readonly string[],
  female: readonly string[],
  familyFirst: boolean,
  separator: string,
): NameCulture {
  return { id, label, region, surnames, male, female, familyFirst, separator };
}

export const NAME_CULTURES = {
  han: pool(
    'han',
    '汉/中文',
    '东亚',
    [
      '林',
      '陈',
      '苏',
      '沈',
      '顾',
      '陆',
      '周',
      '叶',
      '许',
      '赵',
      '韩',
      '白',
      '温',
      '江',
      '宋',
      '秦',
    ],
    [
      '远',
      '川',
      '舟',
      '砚',
      '峥',
      '渡',
      '迟',
      '野',
      '槐',
      '鸣',
      '岸',
      '澈',
      '知远',
      '见山',
      '修白',
      '照野',
    ],
    [
      '雾',
      '棠',
      '宁',
      '禾',
      '晚',
      '澜',
      '鸢',
      '眠',
      '照',
      '缨',
      '若',
      '绮',
      '青梧',
      '听雪',
      '明月',
      '见微',
    ],
    true,
    '',
  ),
  japanese: pool(
    'japanese',
    '日本',
    '东亚',
    [
      '佐藤',
      '铃木',
      '高桥',
      '田中',
      '渡边',
      '伊藤',
      '山本',
      '中村',
      '小林',
      '加藤',
      '吉田',
      '山田',
    ],
    ['莲', '悠真', '阳翔', '湊', '大和', '飒太', '树', '奏', '亮', '源太', '佐吉', '清十郎'],
    ['结衣', '阳菜', '葵', '凛', '芽依', '千代', '菊', '咲', '紬', '美咲', '小百合', '时雨'],
    true,
    '',
  ),
  korean: pool(
    'korean',
    '朝鲜半岛',
    '东亚',
    ['Kim', 'Lee', 'Park', 'Choi', 'Jung', 'Kang', 'Cho', 'Yoon', 'Jang', 'Han'],
    [
      'Min-jun',
      'Ji-hun',
      'Hyeon-u',
      'Do-yun',
      'Jae-hyeon',
      'Seong-min',
      'Tae-ha',
      'Dong-uk',
      'Jae-min',
      'Sang-u',
    ],
    [
      'Ji-su',
      'Min-a',
      'Su-yeon',
      'Eun-chae',
      'Ha-rin',
      'Yun-hee',
      'Mi-gyeong',
      'Da-eun',
      'Seo-yeon',
      'Ji-eun',
    ],
    true,
    ' ',
  ),
  vietnamese: pool(
    'vietnamese',
    '越南',
    '东南亚',
    ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vu', 'Phan', 'Ngo', 'Dang', 'Bui'],
    ['Minh', 'Duc', 'Quang', 'Tuan', 'Anh', 'Son', 'Hai', 'Truong', 'Thanh', 'Hung'],
    ['Lan', 'Mai', 'Thu', 'Huong', 'Ngoc', 'Anh', 'Thuy', 'My', 'Phuong', 'Quynh'],
    true,
    ' ',
  ),
  thai: pool(
    'thai',
    '泰国',
    '东南亚',
    ['Suwan', 'Siri', 'Boonna', 'Kamon', 'Sawang', 'Thana', 'Phani', 'Wilai'],
    ['Anan', 'Prasong', 'Chai', 'Narin', 'Thira', 'Somsak', 'Arthit', 'Wara'],
    ['Malee', 'Napa', 'Pim', 'Siri', 'Wan', 'Kanya', 'Suda', 'Alisa'],
    false,
    ' ',
  ),
  'malay-indonesian': pool(
    'malay-indonesian',
    '马来/印尼',
    '东南亚',
    ['Santoso', 'Wijaya', 'Rahman', 'Surya', 'Putra', 'Hidayat', 'Saputra', 'Nurhadi'],
    ['Budi', 'Agung', 'Rian', 'Fahmi', 'Dimas', 'Irfan', 'Adi', 'Yuda'],
    ['Siti', 'Ayu', 'Dewi', 'Intan', 'Nur', 'Putri', 'Rani', 'Sari'],
    false,
    ' ',
  ),
  filipino: pool(
    'filipino',
    '菲律宾',
    '东南亚',
    ['Santos', 'Reyes', 'Cruz', 'Bautista', 'Garcia', 'Mendoza', 'Aquino', 'Villanueva'],
    ['Jose', 'Miguel', 'Carlos', 'Rafael', 'Andres', 'Emilio', 'Danilo', 'Paolo'],
    ['Maria', 'Liza', 'Rosa', 'Carmen', 'Isabel', 'Elena', 'Teresa', 'Ana'],
    false,
    ' ',
  ),
  'southeast-asian': pool(
    'southeast-asian',
    '东南亚（多语混合）',
    '东南亚',
    ['Sok', 'Chan', 'Vann', 'Phom', 'Kham', 'Aung', 'Win', 'Souvannavong', 'Chanthavong'],
    ['Dara', 'Min', 'Htet', 'Somphone', 'Bounmy', 'Thiha', 'Sovann', 'Khamla'],
    ['Srey', 'Sophea', 'Thiri', 'Su', 'Khin', 'Noy', 'Chanthy', 'Maly'],
    false,
    ' ',
  ),
  'south-asian': pool(
    'south-asian',
    '南亚（印度/巴基斯坦）',
    '南亚',
    ['Sharma', 'Patel', 'Singh', 'Iyer', 'Khan', 'Sheikh', 'Rao', 'Nair', 'Mehta', 'Ahmed'],
    ['Aarav', 'Rohan', 'Vikram', 'Kabir', 'Imran', 'Arjun', 'Dev', 'Nikhil'],
    ['Priya', 'Ananya', 'Meera', 'Zoya', 'Fatima', 'Kavita', 'Diya', 'Rani'],
    false,
    ' ',
  ),
  bengali: pool(
    'bengali',
    '孟加拉',
    '南亚',
    ['Das', 'Roy', 'Chowdhury', 'Begum', 'Sen', 'Ghosh', 'Haque', 'Rahman'],
    ['Arjun', 'Rafi', 'Anik', 'Sumit', 'Tanu', 'Shuvo', 'Adi', 'Nilanjan'],
    ['Maya', 'Nusrat', 'Rupa', 'Mita', 'Tasnim', 'Shumi', 'Anika', 'Devi'],
    false,
    ' ',
  ),
  tamil: pool(
    'tamil',
    '泰米尔',
    '南亚',
    ['Subramanian', 'Raman', 'Chettiar', 'Pillai', 'Murthy', 'Krishnan', 'Venkatesan', 'Naidu'],
    ['Karthik', 'Ilango', 'Aravind', 'Suresh', 'Vijay', 'Kumar', 'Ashok', 'Sethu'],
    ['Priya', 'Revathi', 'Meenakshi', 'Kavya', 'Lakshmi', 'Anjali', 'Divya', 'Sujatha'],
    false,
    ' ',
  ),
  arabic: pool(
    'arabic',
    '阿拉伯/中东',
    '中东与北非',
    ['al-Haddad', 'Nassar', 'Khalil', 'Saleh', 'Aziz', 'Qasim', 'Farouk', 'Mansour', 'Rahim'],
    ['Yusuf', 'Omar', 'Karim', 'Samir', 'Khalid', 'Zaid', 'Tariq', 'Hassan'],
    ['Layla', 'Amina', 'Noor', 'Mariam', 'Salma', 'Yasmin', 'Huda', 'Rania'],
    false,
    ' ',
  ),
  persian: pool(
    'persian',
    '波斯/伊朗',
    '中东与中亚',
    ['Farhadi', 'Tehrani', 'Azadi', 'Rostami', 'Kian', 'Mehr', 'Sadeghi', 'Shirazi'],
    ['Arash', 'Reza', 'Dariush', 'Kianoush', 'Behrouz', 'Navid', 'Farid', 'Sohrab'],
    ['Parisa', 'Shirin', 'Leila', 'Anahita', 'Sara', 'Neda', 'Roxana', 'Mahsa'],
    false,
    ' ',
  ),
  turkish: pool(
    'turkish',
    '土耳其/安纳托利亚',
    '中东',
    ['Yılmaz', 'Demir', 'Kaya', 'Şahin', 'Aydın', 'Çelik', 'Arslan', 'Koç'],
    ['Emre', 'Mert', 'Burak', 'Cem', 'Kerem', 'Serkan', 'Onur', 'Hakan'],
    ['Elif', 'Zeynep', 'Selin', 'Derya', 'Aylin', 'Ece', 'Defne', 'Yasemin'],
    false,
    ' ',
  ),
  caucasus: pool(
    'caucasus',
    '高加索',
    '欧亚交界',
    [
      'Beridze',
      'Kapanadze',
      'Sargsyan',
      'Petrosyan',
      'Aliyev',
      'Mammadov',
      'Gogoladze',
      'Hakobyan',
      'Tsitsishvili',
      'Avetisyan',
    ],
    ['Giorgi', 'Levan', 'Aram', 'Tigran', 'Narek', 'Davit', 'Elvin', 'Rashad', 'Vakhtang', 'Armen'],
    ['Nino', 'Mariam', 'Anahit', 'Lilit', 'Aysel', 'Leyla', 'Tamar', 'Siranush', 'Elene', 'Gunel'],
    false,
    ' ',
  ),
  greek: pool(
    'greek',
    '希腊/塞浦路斯',
    '南欧',
    [
      'Papadopoulos',
      'Georgiou',
      'Nikolaidis',
      'Stavrou',
      'Dimitriou',
      'Katsaros',
      'Vlahos',
      'Theodorou',
    ],
    ['Nikos', 'Giorgos', 'Dimitris', 'Yannis', 'Kostas', 'Andreas', 'Petros', 'Stavros'],
    ['Eleni', 'Maria', 'Sofia', 'Katerina', 'Anna', 'Despina', 'Ioanna', 'Zoe'],
    false,
    ' ',
  ),
  hebrew: pool(
    'hebrew',
    '希伯来',
    '中东',
    ['Cohen', 'Levin', 'Mizrahi', 'Azoulay', 'Ben-David', 'Shapiro', 'Halevi', 'Dahan'],
    ['Noam', 'Eitan', 'Yonatan', 'Avi', 'Moshe', 'Daniel', 'Amit', 'Uri'],
    ['Maya', 'Tamar', 'Noa', 'Yael', 'Shira', 'Rivka', 'Lior', 'Hadar'],
    false,
    ' ',
  ),
  'west-african': pool(
    'west-african',
    '西非',
    '非洲',
    [
      'Ogunleye',
      'Adeyemi',
      'Bakare',
      'Ojo',
      'Okafor',
      'Eze',
      'Nwosu',
      'Obi',
      'Bello',
      'Abubakar',
      'Danjuma',
      'Sani',
    ],
    ['Adebayo', 'Tunde', 'Chinedu', 'Emeka', 'Ibrahim', 'Musa', 'Femi', 'Obinna'],
    ['Funmilayo', 'Yewande', 'Ngozi', 'Adaeze', 'Aisha', 'Hauwa', 'Temi', 'Chiamaka'],
    false,
    ' ',
  ),
  'east-african': pool(
    'east-african',
    '东非',
    '非洲',
    [
      'Mwangi',
      'Mushi',
      'Otieno',
      'Njoroge',
      'Bekele',
      'Tesfaye',
      'Alemu',
      'Warsame',
      'Farah',
      'Abdi',
    ],
    ['Juma', 'Baraka', 'Dawit', 'Mekonnen', 'Abdi', 'Kato', 'Sefu', 'Tesfaye'],
    ['Asha', 'Zawadi', 'Selam', 'Mekdes', 'Hodan', 'Furaha', 'Nadifa', 'Amina'],
    false,
    ' ',
  ),
  'central-african': pool(
    'central-african',
    '中非',
    '非洲',
    [
      'Mbuyi',
      'Ilunga',
      'Mbala',
      'Ngoma',
      'Ngo Bassong',
      'Ekambi',
      'Mabika',
      'Kanku',
      'Ndiaye',
      'Mavinga',
    ],
    ['Kabasele', 'Nsenga', 'Fiston', 'Serge', 'Blaise', 'Junior', 'Mwamba', 'Tshimanga'],
    ['Aminata', 'Chantal', 'Mireille', 'Awa', 'Nsimba', 'Lola', 'Ornella', 'Nana'],
    false,
    ' ',
  ),
  'southern-african': pool(
    'southern-african',
    '南部非洲',
    '非洲',
    ['Mokoena', 'Dlamini', 'Ndlovu', 'Molefe', 'Sithole', 'Khumalo', 'van Wyk', 'Botha'],
    ['Thabo', 'Sipho', 'Kagiso', 'Themba', 'André', 'Pieter', 'Tshepo', 'Mandla'],
    ['Nomvula', 'Lerato', 'Zanele', 'Nomsa', 'Annelie', 'Thandi', 'Palesa', 'Marlene'],
    false,
    ' ',
  ),
  'latin-american': pool(
    'latin-american',
    '拉丁美洲',
    '美洲',
    [
      'Álvarez',
      'Rojas',
      'Quispe',
      'Ferreira',
      'Carvalho',
      'Vega',
      'Salazar',
      'Paredes',
      'Morales',
      'Duarte',
    ],
    ['Mateo', 'Santiago', 'Diego', 'João', 'Rafael', 'Tomás', 'Emiliano', 'Bruno'],
    ['Valentina', 'Camila', 'Marisol', 'Ana Lucía', 'Beatriz', 'Luiza', 'Ximena', 'Paloma'],
    false,
    ' ',
  ),
  caribbean: pool(
    'caribbean',
    '加勒比',
    '美洲',
    ['Desir', 'Joseph', 'Williams', 'Brown', 'Castillo', 'Cruz', 'Charles', 'Pierre'],
    ['Jean-Baptiste', 'Kemar', 'Rafael', 'Dwayne', 'Emmanuel', 'Luis', 'Andre', 'Samuel'],
    ['Marie-Lourdes', 'Shanice', 'Esperanza', 'Nadège', 'Alicia', 'Imani', 'Solange', 'Keisha'],
    false,
    ' ',
  ),
  anglo: pool(
    'anglo',
    '英语世界',
    '欧洲/北美/大洋洲',
    [
      'Reed',
      'Ashford',
      'Collins',
      'Brooks',
      'Vale',
      'Mercer',
      'Whitaker',
      'Hargreaves',
      'Bennett',
      'Clarke',
    ],
    ['Thomas', 'Jonah', 'Isaac', 'Owen', 'Liam', 'Noah', 'Ethan', 'Arthur', 'Walter', 'Alfred'],
    [
      'Eleanor',
      'Maeve',
      'Harriet',
      'Lena',
      'Olivia',
      'Maya',
      'Chloe',
      'Ethel',
      'Mabel',
      'Florence',
    ],
    false,
    ' ',
  ),
  french: pool(
    'french',
    '法语区',
    '欧洲',
    ['Marchand', 'Moreau', 'Laurent', 'Girard', 'Dubois', 'Leroy', 'Fontaine', 'Rousseau'],
    ['Luc', 'Théo', 'Hugo', 'Émile', 'Henri', 'Auguste', 'Julien', 'Marcel'],
    ['Élodie', 'Camille', 'Margot', 'Manon', 'Léa', 'Colette', 'Jeanne', 'Marguerite'],
    false,
    ' ',
  ),
  german: pool(
    'german',
    '德语区',
    '欧洲',
    ['Vogel', 'Brandt', 'Hoffmann', 'Wagner', 'Bauer', 'Schmidt', 'Fischer', 'Weber'],
    ['Lukas', 'Felix', 'Jonas', 'Emil', 'Wilhelm', 'Friedrich', 'Otto', 'Matthias'],
    ['Hannah', 'Lea', 'Mia', 'Greta', 'Liesel', 'Hedwig', 'Clara', 'Annika'],
    false,
    ' ',
  ),
  iberian: pool(
    'iberian',
    '伊比利亚',
    '欧洲',
    ['Navarro', 'Romero', 'Costa', 'Ferreira', 'Serrano', 'Álvarez', 'Pereira', 'Molina'],
    ['Álvaro', 'Pablo', 'Tiago', 'Joaquín', 'Ramón', 'Anselmo', 'Iker', 'Duarte'],
    ['Lucía', 'Inés', 'Beatriz', 'Carmen', 'Pilar', 'Dolores', 'Marta', 'Sofia'],
    false,
    ' ',
  ),
  italian: pool(
    'italian',
    '意大利',
    '南欧',
    ['Moretti', 'Ricci', 'Romano', 'Greco', 'Conti', 'Ferrari', 'Esposito', 'Bianchi'],
    ['Matteo', 'Lorenzo', 'Marco', 'Luca', 'Giovanni', 'Enzo', 'Dario', 'Pietro'],
    ['Chiara', 'Giulia', 'Sofia', 'Francesca', 'Elena', 'Rosa', 'Bianca', 'Lucia'],
    false,
    ' ',
  ),
  slavic: pool(
    'slavic',
    '斯拉夫/中东欧',
    '欧洲',
    [
      'Volkov',
      'Orlov',
      'Sokolova',
      'Morozov',
      'Nowak',
      'Kowalski',
      'Petrović',
      'Jovanović',
      'Novák',
      'Ionescu',
    ],
    [
      'Mikhail',
      'Dmitri',
      'Piotr',
      'Nikolai',
      'Maksim',
      'Tomasz',
      'Nikola',
      'László',
      'Andrei',
      'Marek',
    ],
    ['Anya', 'Katya', 'Zofia', 'Olga', 'Mila', 'Natalia', 'Ewa', 'Milica', 'Ilona', 'Ioana'],
    false,
    ' ',
  ),
  nordic: pool(
    'nordic',
    '北欧/波罗的海',
    '欧洲',
    [
      'Lindqvist',
      'Halvorsen',
      'Sørensen',
      'Dahl',
      'Nyström',
      'Eriksen',
      'Virtanen',
      'Laine',
      'Berg',
      'Nielsen',
    ],
    ['Erik', 'Magnus', 'Bjorn', 'Mikko', 'Lars', 'Anders', 'Emil', 'Jaan'],
    ['Astrid', 'Freja', 'Sigrid', 'Ingrid', 'Elsa', 'Aino', 'Maja', 'Liv', 'Kadi'],
    false,
    ' ',
  ),
  'central-asian': pool(
    'central-asian',
    '中亚/蒙古',
    '中亚',
    [
      'Sadykova',
      'Abenov',
      'Nurlan',
      'Karimov',
      'Yusupova',
      'Tursunov',
      'Rakhimova',
      'Batbayar',
      'Erdene',
      'Bekov',
    ],
    ['Daniyar', 'Timur', 'Rustam', 'Bekzod', 'Temülen', 'Arman', 'Nursultan', 'Sanjar'],
    ['Aigerim', 'Aizada', 'Zarina', 'Madina', 'Sarnai', 'Gulnara', 'Dilnoza', 'Aliya'],
    false,
    ' ',
  ),
  'pacific-islander': pool(
    'pacific-islander',
    '太平洋岛屿',
    '大洋洲',
    ['Tupou', 'Vaka', 'Faletau', 'Kala', 'Rangi', 'Naidu', 'Tanoa', 'Moala'],
    ['Sione', 'Tavita', 'Manu', 'Kiri', 'Tevita', 'Ratu', 'Moana', 'Lani'],
    ['Mele', 'Litia', 'Moana', 'Sina', 'Leilani', 'Vai', 'Kalani', 'Rina'],
    false,
    ' ',
  ),
  frontier: pool(
    'frontier',
    '默认城邦世界',
    '虚构',
    ['苇舟', '灰林', '长溪', '石桥', '暮羽', '麦穗', '霜叶', '远丘'],
    ['阿岚', '莱恩', '索恩', '罗文', '奥林', '卡尔', '菲恩', '泰伦'],
    ['伊芙', '米拉', '诺雅', '艾达', '瑟琳', '维拉', '露娅', '宁'],
    false,
    '·',
  ),
} satisfies Record<NameCultureId, NameCulture>;

type EraGiven = { readonly male: readonly string[]; readonly female: readonly string[] };

/**
 * A small set of names that only appear in a matching era band. The base pool
 * remains usable across periods, so this is flavour rather than a claim about
 * naming statistics.
 */
const ERA_GIVEN: Partial<Record<NameCultureId, Partial<Record<EraBand, EraGiven>>>> = {
  han: {
    industrial: { male: ['启山', '伯言', '志清'], female: ['秀兰', '桂英', '静秋'] },
    interwar: { male: ['振邦', '怀瑾', '慕远'], female: ['曼云', '素贞', '玉珍'] },
    coldwar: { male: ['建国', '卫东', '明远'], female: ['红梅', '小燕', '丽华'] },
    contemporary: { male: ['子轩', '浩然', '沐辰'], female: ['雨桐', '若溪', '可欣'] },
  },
  japanese: {
    industrial: { male: ['源太', '佐吉', '清十郎'], female: ['千代', '菊', '琴'] },
    contemporary: { male: ['蓮', '悠真', '湊'], female: ['結衣', '陽菜', '葵'] },
  },
  anglo: {
    industrial: { male: ['Walter', 'Alfred', 'Arthur'], female: ['Ethel', 'Mabel', 'Harriet'] },
    contemporary: { male: ['Liam', 'Noah', 'Ethan'], female: ['Olivia', 'Maya', 'Chloe'] },
  },
  french: {
    industrial: {
      male: ['Émile', 'Henri', 'Auguste'],
      female: ['Marguerite', 'Colette', 'Jeanne'],
    },
    contemporary: { male: ['Théo', 'Lucas', 'Hugo'], female: ['Camille', 'Manon', 'Léa'] },
  },
  german: {
    industrial: { male: ['Wilhelm', 'Friedrich', 'Otto'], female: ['Greta', 'Liesel', 'Hedwig'] },
    contemporary: { male: ['Lukas', 'Felix', 'Jonas'], female: ['Hannah', 'Lea', 'Mia'] },
  },
  iberian: {
    industrial: { male: ['Joaquín', 'Ramón', 'Anselmo'], female: ['Carmen', 'Pilar', 'Dolores'] },
    contemporary: { male: ['Álvaro', 'Pablo', 'Tiago'], female: ['Lucía', 'Inés', 'Beatriz'] },
  },
  slavic: {
    industrial: { male: ['Mikhail', 'Dmitri', 'Piotr'], female: ['Katya', 'Zofia', 'Olga'] },
    contemporary: { male: ['Maksim', 'Nikola', 'Tomasz'], female: ['Anya', 'Mila', 'Natalia'] },
  },
  arabic: {
    industrial: { male: ['Yusuf', 'Omar', 'Khalil'], female: ['Layla', 'Amina', 'Mariam'] },
    contemporary: { male: ['Karim', 'Sami', 'Zaid'], female: ['Noor', 'Salma', 'Yasmin'] },
  },
};

/* ------------------------------------------------------------------ */
/* Country -> naming culture                                           */
/* ------------------------------------------------------------------ */

function countryGroup(culture: NameCultureId, codes: string): Record<string, NameCultureId> {
  return Object.fromEntries(
    codes
      .split(' ')
      .filter(Boolean)
      .map((code) => [code, culture]),
  );
}

const COUNTRY_CULTURES: Readonly<Record<string, NameCultureId>> = {
  ...countryGroup('han', 'CHN TWN HKG MAC SGP'),
  ...countryGroup('japanese', 'JPN'),
  ...countryGroup('korean', 'KOR PRK'),
  ...countryGroup('vietnamese', 'VNM'),
  ...countryGroup('thai', 'THA'),
  ...countryGroup('malay-indonesian', 'IDN MYS BRN'),
  ...countryGroup('filipino', 'PHL TLS'),
  ...countryGroup('southeast-asian', 'KHM LAO MMR'),
  ...countryGroup('south-asian', 'IND PAK LKA NPL BTN MDV'),
  ...countryGroup('bengali', 'BGD'),
  ...countryGroup(
    'arabic',
    'IRQ SYR LBN JOR SAU YEM OMN ARE QAT BHR KWT EGY LBY TUN DZA MAR SDN ESH MRT SAH PSX PSE',
  ),
  ...countryGroup('persian', 'IRN AFG TJK'),
  ...countryGroup('turkish', 'TUR CYN'),
  ...countryGroup('caucasus', 'GEO ARM AZE'),
  ...countryGroup('greek', 'GRC CYP'),
  ...countryGroup('hebrew', 'ISR'),
  ...countryGroup('west-african', 'NGA GHA BEN TGO CIV SEN MLI BFA NER GIN GNB SLE LBR GMB CPV'),
  ...countryGroup('east-african', 'ETH ERI SOM SOL SDS KEN TZA UGA RWA BDI DJI MDG COM MUS SYC'),
  ...countryGroup('central-african', 'COD COG CMR CAF TCD GAB GNQ AGO STP'),
  ...countryGroup('southern-african', 'ZAF NAM BWA ZWE ZMB MWI MOZ LSO SWZ'),
  ...countryGroup(
    'latin-american',
    'MEX GTM BLZ HND SLV NIC CRI PAN COL VEN ECU PER BOL BRA ARG CHL URY PRY GUY SUR GUF',
  ),
  ...countryGroup(
    'caribbean',
    'CUB DOM HTI JAM TTO BHS BRB GRD LCA VCT ATG DMA KNA PRI ABW CUW SXM TCA VGB CYM BMU AIA MSR BLM MAF GLP MTQ',
  ),
  ...countryGroup('anglo', 'USA CAN GBR IRL AUS NZL FLK IMN JEY GGY'),
  ...countryGroup('french', 'FRA BEL LUX MCO REU SPM ATF'),
  ...countryGroup('german', 'DEU AUT CHE LIE'),
  ...countryGroup('iberian', 'ESP PRT AND GIB'),
  ...countryGroup('italian', 'ITA SMR VAT MLT'),
  ...countryGroup(
    'slavic',
    'POL CZE SVK HUN ROU BGR SRB HRV BIH SVN MKD ALB MNE KOS UKR BLR RUS MDA LTU LVA',
  ),
  ...countryGroup('nordic', 'SWE NOR DNK FIN ISL EST GRL FRO'),
  ...countryGroup('central-asian', 'KAZ UZB TKM KGZ MNG'),
  ...countryGroup(
    'pacific-islander',
    'PNG FJI SLB VUT WSM TON KIR FSM MHL PLW NRU TUV NCL PYF WLF COK NIU',
  ),
};

function coordinateCulture(lat: number, lon: number): NameCultureId | undefined {
  if (lat > 34 && lon >= -25 && lon <= 45) {
    if (lat > 55) return 'nordic';
    if (lon < -5) return 'french';
    if (lon < 15) return 'german';
    if (lon < 30) return 'slavic';
    return 'greek';
  }
  if (lat >= -35 && lat <= 37 && lon >= -20 && lon <= 55) {
    if (lat < -20) return 'southern-african';
    if (lon > 32) return 'east-african';
    if (lat > 15 && lon < 35) return 'arabic';
    if (lon < 15) return 'west-african';
    return 'central-african';
  }
  if (lat >= -10 && lat <= 80 && lon >= 25 && lon <= 180) {
    if (lon < 60) {
      if (lat > 12) return 'arabic';
      return 'east-african';
    }
    if (lon < 75) return 'south-asian';
    if (lon < 90) return 'south-asian';
    if (lon < 120) return 'han';
    if (lon < 135) return 'japanese';
    return 'southeast-asian';
  }
  if (lat >= -60 && lat <= 75 && lon >= -170 && lon <= -30) {
    if (lat > 15) return 'anglo';
    return 'latin-american';
  }
  if (lat < 0 && lon >= 110) return 'pacific-islander';
  return undefined;
}

export type CreationSettlement = Pick<Settlement, 'id' | 'name'> & {
  readonly polityId?: string;
  readonly regionId?: string;
  readonly lon?: number;
  readonly lat?: number;
  readonly sourcePopulation?: number;
  readonly cohort?: Pick<Settlement['cohort'], 'children' | 'adults' | 'elders'>;
};

export type CreationWorld = Pick<World, 'seed' | 'month'> & {
  readonly settlements: readonly CreationSettlement[];
  readonly calendar?: Pick<NonNullable<World['calendar']>, 'startYear'> | null;
  readonly pack?: Pick<World['pack'], 'id'> | null;
};

/** Maps a real settlement's country/coordinates to a name pool. */
export function inferNameCulture(settlement: CreationSettlement): NameCultureId {
  const polity = settlement.polityId;
  const region = settlement.regionId;
  const code = region && COUNTRY_CULTURES[region] ? region : polity;
  if (code && COUNTRY_CULTURES[code]) {
    if (code === 'IND' && typeof settlement.lat === 'number' && settlement.lat < 15) return 'tamil';
    return COUNTRY_CULTURES[code];
  }
  if (typeof settlement.lat === 'number' && typeof settlement.lon === 'number') {
    return coordinateCulture(settlement.lat, settlement.lon) ?? 'frontier';
  }
  return 'frontier';
}

/* ------------------------------------------------------------------ */
/* Content catalog                                                     */
/* ------------------------------------------------------------------ */

export type WealthBand = 'destitute' | 'poor' | 'modest' | 'comfortable' | 'wealthy' | 'elite';

type FamilyBackgroundTemplate = {
  readonly kind: string;
  readonly label: string;
  readonly summary: string;
  readonly wealth: WealthBand;
  readonly stability: number;
  readonly pressure: number;
  readonly tags: readonly string[];
  readonly ordinaryWeight: number;
  readonly legendaryWeight: number;
  readonly eras?: readonly EraBand[];
};

const FAMILY_BACKGROUNDS = [
  {
    kind: 'war_displaced',
    label: '战乱离散',
    summary: '家族从{place}以北逃来，行李里只有一口铁锅和半张族谱；长辈说起故乡时，总是先看门外。',
    wealth: 'poor',
    stability: 0.25,
    pressure: 0.85,
    tags: ['displacement', 'violence', 'loss'],
    ordinaryWeight: 0.9,
    legendaryWeight: 2.3,
  },
  {
    kind: 'dock_labor',
    label: '码头劳工',
    summary: '父亲在{place}的码头扛货，母亲替船工缝补帆布；家里每个人都能从脚步声认出债主。',
    wealth: 'poor',
    stability: 0.5,
    pressure: 0.65,
    tags: ['labour', 'port', 'debt'],
    ordinaryWeight: 2.4,
    legendaryWeight: 1.4,
  },
  {
    kind: 'declining_scholars',
    label: '没落书香门第',
    summary:
      '祖上做过官，如今只剩一柜受潮的书和不肯低头的规矩；父亲把最后一方砚台卖了，却没有告诉任何人。',
    wealth: 'modest',
    stability: 0.45,
    pressure: 0.55,
    tags: ['letters', 'decline', 'pride'],
    ordinaryWeight: 1.2,
    legendaryWeight: 2.0,
  },
  {
    kind: 'refugee_descendants',
    label: '流亡者后代',
    summary: '祖父母在边境失去国籍，家里说两种语言，却对故乡保持沉默；{ta}的籍贯一栏总是填得很慢。',
    wealth: 'poor',
    stability: 0.4,
    pressure: 0.72,
    tags: ['exile', 'language', 'stateless'],
    ordinaryWeight: 1.0,
    legendaryWeight: 1.9,
  },
  {
    kind: 'tenant_farmers',
    label: '佃农',
    summary: '一家人替地主种地，收成先交租，剩下的才轮到孩子；每年冬天，父亲都会把种子藏进枕头里。',
    wealth: 'poor',
    stability: 0.6,
    pressure: 0.58,
    tags: ['land', 'rural', 'rent'],
    ordinaryWeight: 2.8,
    legendaryWeight: 1.2,
  },
  {
    kind: 'artisan',
    label: '手工业者',
    summary: '家里有一间小作坊，工具比家具多；父亲的手艺正在被机器取代，他每天把锤子擦得比脸还亮。',
    wealth: 'modest',
    stability: 0.62,
    pressure: 0.46,
    tags: ['craft', 'workshop', 'change'],
    ordinaryWeight: 2.2,
    legendaryWeight: 1.2,
  },
  {
    kind: 'market_traders',
    label: '小商贩',
    summary: '母亲在集市摆摊，父亲欠着供货商的钱；账本藏在米缸下面，家里人从不在饭桌上提数字。',
    wealth: 'modest',
    stability: 0.5,
    pressure: 0.52,
    tags: ['market', 'debt', 'secrecy'],
    ordinaryWeight: 2.0,
    legendaryWeight: 1.0,
  },
  {
    kind: 'clerks',
    label: '吏员与文书',
    summary:
      '父亲替衙门抄写文书，知道太多人的秘密，所以从不抬头看人；他教{ta}的第一件事是把废纸烧干净。',
    wealth: 'comfortable',
    stability: 0.65,
    pressure: 0.44,
    tags: ['bureaucracy', 'secrecy', 'literacy'],
    ordinaryWeight: 1.5,
    legendaryWeight: 1.2,
  },
  {
    kind: 'soldier_household',
    label: '军户',
    summary: '家里有退伍的兵、坏掉的军靴和一套不许问来路的军功章；父亲喝醉时会对着门后的影子报数。',
    wealth: 'modest',
    stability: 0.55,
    pressure: 0.62,
    tags: ['military', 'memory', 'violence'],
    ordinaryWeight: 1.4,
    legendaryWeight: 1.7,
  },
  {
    kind: 'shrine_keepers',
    label: '祠庙守户',
    summary: '家里守着一个小神龛，祷词比晚饭更准时；香灰里埋着几张写着陌生名字的红纸。',
    wealth: 'poor',
    stability: 0.7,
    pressure: 0.38,
    tags: ['faith', 'ritual', 'names'],
    ordinaryWeight: 1.2,
    legendaryWeight: 1.1,
  },
  {
    kind: 'foundling_home',
    label: '弃儿与寄养',
    summary:
      '孩子出生前就已被列入弃养名单；一个修女或看守临时改了名字，从此没有人再提起最初的那一页。',
    wealth: 'destitute',
    stability: 0.28,
    pressure: 0.82,
    tags: ['abandonment', 'institution', 'identity'],
    ordinaryWeight: 0.9,
    legendaryWeight: 2.1,
  },
  {
    kind: 'smugglers',
    label: '走私家族',
    summary:
      '家族的生意不能写在门牌上；孩子学会的第一件事是替大人撒谎，第二件事是把货物藏在棺材铺后院。',
    wealth: 'poor',
    stability: 0.35,
    pressure: 0.76,
    tags: ['crime', 'border', 'secrecy'],
    ordinaryWeight: 1.0,
    legendaryWeight: 2.2,
  },
  {
    kind: 'fallen_nobility',
    label: '没落贵族',
    summary:
      '家里还留着旧宅的一把钥匙，和一个再也进不去的姓氏；母亲把体面缝在袖口里，父亲把它喝进酒里。',
    wealth: 'modest',
    stability: 0.4,
    pressure: 0.68,
    tags: ['status', 'loss', 'pride'],
    ordinaryWeight: 0.7,
    legendaryWeight: 2.4,
  },
  {
    kind: 'elite_household',
    label: '权贵之家',
    summary:
      '家里有人坐在离权力很近的椅子上；亲近意味着随时可以被牺牲，孩子从小学会用沉默换取安全。',
    wealth: 'elite',
    stability: 0.5,
    pressure: 0.72,
    tags: ['power', 'danger', 'status'],
    ordinaryWeight: 0.5,
    legendaryWeight: 2.3,
  },
  {
    kind: 'frontier_settlers',
    label: '边地拓荒者',
    summary: '家族在边界上开荒，地契画的线比河流更早改变；{ta}出生时，第一场霜冻死了半亩苗。',
    wealth: 'poor',
    stability: 0.45,
    pressure: 0.66,
    tags: ['frontier', 'land', 'survival'],
    ordinaryWeight: 1.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'fisherfolk',
    label: '渔户',
    summary:
      '一家人在海上讨生活，风暴每年带走一个名字；母亲在船头系红布，父亲说那只是怕盐吃进绳子里。',
    wealth: 'poor',
    stability: 0.5,
    pressure: 0.62,
    tags: ['sea', 'loss', 'superstition'],
    ordinaryWeight: 1.8,
    legendaryWeight: 1.1,
  },
  {
    kind: 'migrant_labor',
    label: '迁徙劳工',
    summary:
      '父母跟着工程走，孩子出生在临时棚屋；籍贯写在别人的账本上，家乡只是一张被折过很多次的纸。',
    wealth: 'poor',
    stability: 0.3,
    pressure: 0.7,
    tags: ['migration', 'labour', 'temporary'],
    ordinaryWeight: 1.0,
    legendaryWeight: 1.5,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'plague_household',
    label: '疫病之家',
    summary:
      '家里有人死于疫病，门框上的石灰印还没刷掉；邻居经过时会绕开三步，孩子们却照常在门口玩。',
    wealth: 'poor',
    stability: 0.3,
    pressure: 0.8,
    tags: ['disease', 'stigma', 'loss'],
    ordinaryWeight: 1.0,
    legendaryWeight: 1.6,
  },
  {
    kind: 'teachers',
    label: '教书人',
    summary: '家里有一块黑板和三种版本的课本；父亲因为教错一句话被解雇过，从此只在夜里给{ta}念书。',
    wealth: 'modest',
    stability: 0.6,
    pressure: 0.42,
    tags: ['education', 'dissent', 'night'],
    ordinaryWeight: 1.4,
    legendaryWeight: 1.1,
  },
  {
    kind: 'theatre_troupe',
    label: '流动戏班',
    summary: '一家人跟着戏班走，名字随戏单换；{ta}分不清哪一个才是真的，只知道谢幕时所有人都在笑。',
    wealth: 'poor',
    stability: 0.35,
    pressure: 0.6,
    tags: ['performance', 'travel', 'identity'],
    ordinaryWeight: 1.0,
    legendaryWeight: 1.6,
  },
  {
    kind: 'factory_workers',
    label: '工厂工人',
    summary:
      '全家在厂区附近租房，汽笛代替鸡叫；父亲的肺里积着洗不掉的灰，母亲的工资单上少了一个零。',
    wealth: 'poor',
    stability: 0.45,
    pressure: 0.72,
    tags: ['factory', 'labour', 'health'],
    ordinaryWeight: 1.5,
    legendaryWeight: 1.6,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'herders',
    label: '游牧人家',
    summary:
      '家族赶着牲畜迁徙，国界只是地图上的一条细线；{ta}出生在迁徙路上，第一口水来自一只旧皮囊。',
    wealth: 'poor',
    stability: 0.55,
    pressure: 0.56,
    tags: ['nomad', 'border', 'animals'],
    ordinaryWeight: 1.4,
    legendaryWeight: 1.1,
  },
  {
    kind: 'household_servants',
    label: '仆役之家',
    summary: '父母在别人家里伺候人，孩子学会在走廊里不出声；主家的旧衣服改一改，就是{ta}的襁褓。',
    wealth: 'poor',
    stability: 0.5,
    pressure: 0.55,
    tags: ['service', 'hierarchy', 'invisibility'],
    ordinaryWeight: 1.5,
    legendaryWeight: 1.2,
  },
  {
    kind: 'absent_parent',
    label: '失踪者家庭',
    summary:
      '父亲某天出门后再没回来，母亲每年都把他的碗摆上桌；家里人相信他还会回来，债主也这么相信。',
    wealth: 'poor',
    stability: 0.3,
    pressure: 0.76,
    tags: ['absence', 'debt', 'waiting'],
    ordinaryWeight: 1.1,
    legendaryWeight: 1.7,
  },
] as const satisfies readonly FamilyBackgroundTemplate[];

type PersonalityValues = {
  readonly care: number;
  readonly ambition: number;
  readonly tradition: number;
};
type PersonalityTraits = {
  readonly openness: number;
  readonly conscientiousness: number;
  readonly extraversion: number;
  readonly agreeableness: number;
  readonly neuroticism: number;
};

type PersonalityTendencyTemplate = {
  readonly kind: string;
  readonly label: string;
  readonly summary: string;
  readonly values: PersonalityValues;
  readonly traits: PersonalityTraits;
  readonly ordinaryWeight: number;
  readonly legendaryWeight: number;
};

const PERSONALITY_TENDENCIES = [
  {
    kind: 'quiet_observer',
    label: '沉默的观察者',
    summary: '先看，再决定要不要出声；记得别人忽略的细节，也记得谁在什么时候撒过谎。',
    values: { care: 0.55, ambition: 0.4, tradition: 0.45 },
    traits: {
      openness: 0.65,
      conscientiousness: 0.5,
      extraversion: 0.3,
      agreeableness: 0.55,
      neuroticism: 0.5,
    },
    ordinaryWeight: 2,
    legendaryWeight: 1.2,
  },
  {
    kind: 'defiant',
    label: '不肯低头',
    summary: '越是有人命令，越要问一句凭什么；伤痕常常比奖章先到，但从不把决定权交给别人。',
    values: { care: 0.45, ambition: 0.7, tradition: 0.3 },
    traits: {
      openness: 0.55,
      conscientiousness: 0.55,
      extraversion: 0.5,
      agreeableness: 0.35,
      neuroticism: 0.55,
    },
    ordinaryWeight: 1.4,
    legendaryWeight: 1.8,
  },
  {
    kind: 'appeaser',
    label: '习惯讨好',
    summary: '能从语气里听出危险，先笑再说话；渴望被喜欢，也害怕被看穿。',
    values: { care: 0.7, ambition: 0.35, tradition: 0.55 },
    traits: {
      openness: 0.45,
      conscientiousness: 0.6,
      extraversion: 0.45,
      agreeableness: 0.75,
      neuroticism: 0.6,
    },
    ordinaryWeight: 1.8,
    legendaryWeight: 1.0,
  },
  {
    kind: 'caretaker',
    label: '早熟的照顾者',
    summary: '总在替别人收拾残局，自己的伤口留到最后；被需要时才觉得自己有位置。',
    values: { care: 0.75, ambition: 0.4, tradition: 0.5 },
    traits: {
      openness: 0.5,
      conscientiousness: 0.7,
      extraversion: 0.45,
      agreeableness: 0.7,
      neuroticism: 0.45,
    },
    ordinaryWeight: 2.0,
    legendaryWeight: 0.9,
  },
  {
    kind: 'wanderer',
    label: '坐不住的人',
    summary: '听见远方的汽笛就收拾行李；害怕被困住，也害怕真的抵达。',
    values: { care: 0.45, ambition: 0.55, tradition: 0.25 },
    traits: {
      openness: 0.75,
      conscientiousness: 0.35,
      extraversion: 0.6,
      agreeableness: 0.5,
      neuroticism: 0.45,
    },
    ordinaryWeight: 1.5,
    legendaryWeight: 1.6,
  },
  {
    kind: 'performer',
    label: '表演者',
    summary: '知道怎样让别人看见自己想让他们看见的部分；掌声是粮食，也是锁链。',
    values: { care: 0.5, ambition: 0.65, tradition: 0.3 },
    traits: {
      openness: 0.65,
      conscientiousness: 0.45,
      extraversion: 0.8,
      agreeableness: 0.55,
      neuroticism: 0.5,
    },
    ordinaryWeight: 1.2,
    legendaryWeight: 1.7,
  },
  {
    kind: 'skeptic',
    label: '怀疑论者',
    summary: '对每一句保证都保留一半；不容易被骗，也不容易相信自己是安全的。',
    values: { care: 0.4, ambition: 0.5, tradition: 0.35 },
    traits: {
      openness: 0.7,
      conscientiousness: 0.55,
      extraversion: 0.4,
      agreeableness: 0.45,
      neuroticism: 0.5,
    },
    ordinaryWeight: 1.6,
    legendaryWeight: 1.2,
  },
  {
    kind: 'zealot',
    label: '狂热者',
    summary: '一旦认定某件事，就愿意为它烧掉退路；最危险的不是恶意，而是确信自己正确。',
    values: { care: 0.5, ambition: 0.7, tradition: 0.65 },
    traits: {
      openness: 0.55,
      conscientiousness: 0.75,
      extraversion: 0.55,
      agreeableness: 0.4,
      neuroticism: 0.6,
    },
    ordinaryWeight: 0.5,
    legendaryWeight: 2.1,
  },
  {
    kind: 'survivor',
    label: '幸存者',
    summary: '遇事先找出口，再找理由；对饥饿、谎言和天气有近乎动物的直觉。',
    values: { care: 0.5, ambition: 0.6, tradition: 0.4 },
    traits: {
      openness: 0.45,
      conscientiousness: 0.65,
      extraversion: 0.4,
      agreeableness: 0.45,
      neuroticism: 0.65,
    },
    ordinaryWeight: 1.7,
    legendaryWeight: 1.5,
  },
  {
    kind: 'dreamer',
    label: '做梦的人',
    summary: '总在计划一个比现实更好的地方；现实越硬，梦越具体。',
    values: { care: 0.55, ambition: 0.45, tradition: 0.3 },
    traits: {
      openness: 0.8,
      conscientiousness: 0.35,
      extraversion: 0.5,
      agreeableness: 0.6,
      neuroticism: 0.5,
    },
    ordinaryWeight: 1.6,
    legendaryWeight: 1.4,
  },
  {
    kind: 'trickster',
    label: '骗子',
    summary: '先试探别人愿意相信什么，再决定自己是谁；谎言有时是盾，有时是桥。',
    values: { care: 0.35, ambition: 0.65, tradition: 0.25 },
    traits: {
      openness: 0.7,
      conscientiousness: 0.4,
      extraversion: 0.7,
      agreeableness: 0.35,
      neuroticism: 0.5,
    },
    ordinaryWeight: 1.0,
    legendaryWeight: 1.8,
  },
  {
    kind: 'ascetic',
    label: '苦行者',
    summary: '相信欲望会让人露出破绽，于是先把欲望关起来；对自己苛刻，对别人却未必宽容。',
    values: { care: 0.5, ambition: 0.45, tradition: 0.6 },
    traits: {
      openness: 0.55,
      conscientiousness: 0.75,
      extraversion: 0.3,
      agreeableness: 0.55,
      neuroticism: 0.45,
    },
    ordinaryWeight: 0.9,
    legendaryWeight: 1.4,
  },
  {
    kind: 'avenger',
    label: '记仇的人',
    summary: '把受过的每一笔都记在心里，等一个合适的季节；复仇是方向，也是不肯愈合的伤。',
    values: { care: 0.3, ambition: 0.75, tradition: 0.4 },
    traits: {
      openness: 0.45,
      conscientiousness: 0.7,
      extraversion: 0.45,
      agreeableness: 0.3,
      neuroticism: 0.7,
    },
    ordinaryWeight: 0.5,
    legendaryWeight: 2.0,
  },
  {
    kind: 'loyalist',
    label: '守约的人',
    summary: '把承诺看得比利益重；一旦站到某一边，就很难再转身，即使那一边正在下沉。',
    values: { care: 0.65, ambition: 0.45, tradition: 0.65 },
    traits: {
      openness: 0.4,
      conscientiousness: 0.65,
      extraversion: 0.5,
      agreeableness: 0.65,
      neuroticism: 0.5,
    },
    ordinaryWeight: 1.6,
    legendaryWeight: 1.1,
  },
  {
    kind: 'collector',
    label: '收集者',
    summary: '把别人丢掉的东西捡回家，给每一件编一个来历；相信只要保存得够久，就能拼出完整的过去。',
    values: { care: 0.4, ambition: 0.55, tradition: 0.5 },
    traits: {
      openness: 0.6,
      conscientiousness: 0.6,
      extraversion: 0.35,
      agreeableness: 0.45,
      neuroticism: 0.55,
    },
    ordinaryWeight: 1.3,
    legendaryWeight: 1.5,
  },
  {
    kind: 'nihilist',
    label: '虚无者',
    summary: '不相信意义，却对细小的快乐格外敏感；什么都敢失去的人，也什么都敢试。',
    values: { care: 0.25, ambition: 0.5, tradition: 0.2 },
    traits: {
      openness: 0.65,
      conscientiousness: 0.35,
      extraversion: 0.4,
      agreeableness: 0.35,
      neuroticism: 0.65,
    },
    ordinaryWeight: 0.5,
    legendaryWeight: 1.8,
  },
  {
    kind: 'healer',
    label: '修补者',
    summary: '见不得东西坏着，无论是伤口、机器还是一段关系；常常先救别人，再发现自己也在流血。',
    values: { care: 0.8, ambition: 0.4, tradition: 0.45 },
    traits: {
      openness: 0.55,
      conscientiousness: 0.7,
      extraversion: 0.4,
      agreeableness: 0.75,
      neuroticism: 0.45,
    },
    ordinaryWeight: 1.4,
    legendaryWeight: 1.0,
  },
  {
    kind: 'guardian',
    label: '守门人',
    summary: '习惯站在门口，先确认谁能进来；保护别人时有力量，面对自己的需要时却笨拙。',
    values: { care: 0.7, ambition: 0.5, tradition: 0.55 },
    traits: {
      openness: 0.45,
      conscientiousness: 0.7,
      extraversion: 0.45,
      agreeableness: 0.6,
      neuroticism: 0.5,
    },
    ordinaryWeight: 1.5,
    legendaryWeight: 1.1,
  },
] as const satisfies readonly PersonalityTendencyTemplate[];

type SecretTemplate = {
  readonly kind: string;
  readonly form: 'secret' | 'obsession';
  readonly title: string;
  readonly detail: string;
  readonly baseIntensity: number;
  readonly ordinaryWeight: number;
  readonly legendaryWeight: number;
  readonly eras?: readonly EraBand[];
};

const SECRETS = [
  {
    kind: 'buried_box',
    form: 'secret',
    title: '灶台下的木箱',
    detail:
      '旧宅的灶台下埋着一只没有名字的木箱；家里人说里面是祖先的骨灰，{ta}却听见里面有金属碰撞声。',
    baseIntensity: 0.7,
    ordinaryWeight: 0.8,
    legendaryWeight: 1.8,
  },
  {
    kind: 'false_name',
    form: 'secret',
    title: '借来的姓',
    detail:
      '家族的姓氏是借来的；真正的姓写在一张被烧掉一半的船票上，而船票上的日期比{ta}的出生早二十年。',
    baseIntensity: 0.75,
    ordinaryWeight: 0.7,
    legendaryWeight: 1.9,
  },
  {
    kind: 'missing_sibling',
    form: 'secret',
    title: '多出来的碗筷',
    detail:
      '母亲每年多摆一副碗筷；{ta}后来知道，那个孩子不是死了，而是被送去了一个再也不许提的地方。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.7,
    legendaryWeight: 1.7,
  },
  {
    kind: 'debt_ledger',
    form: 'secret',
    title: '写在债册上的生日',
    detail:
      '父亲把{ta}的出生日期写进一本债册；从法律上说，{ta}的一部分已经属于别人，只是还没有人来收。',
    baseIntensity: 0.7,
    ordinaryWeight: 0.9,
    legendaryWeight: 1.6,
  },
  {
    kind: 'watcher',
    form: 'obsession',
    title: '塔上的眼睛',
    detail:
      '{ta}总觉得有一双眼睛从{place}的旧塔上看着自己；那座塔已经塌了很多年，塔基上却总有新的脚印。',
    baseIntensity: 0.65,
    ordinaryWeight: 0.9,
    legendaryWeight: 1.7,
  },
  {
    kind: 'fire',
    form: 'obsession',
    title: '对火的亲近',
    detail: '{ta}对火有无法解释的亲近，梦见自己在一场大火里替别人关门；醒来时，手指上常有烟灰。',
    baseIntensity: 0.75,
    ordinaryWeight: 0.8,
    legendaryWeight: 1.8,
  },
  {
    kind: 'counting',
    form: 'obsession',
    title: '必须数清裂缝',
    detail:
      '{ta}必须数清房间里的每一道裂缝，否则会觉得有人会从裂缝里进来；有一次，数到一半，裂缝多了一条。',
    baseIntensity: 0.6,
    ordinaryWeight: 1.1,
    legendaryWeight: 1.2,
  },
  {
    kind: 'dead_language',
    form: 'secret',
    title: '没人教过的语言',
    detail:
      '{ta}会说出一种没人教过的语言；每次说完，屋里的狗都会朝同一个方向低吼，而那个方向没有门。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.5,
    legendaryWeight: 1.9,
  },
  {
    kind: 'mirror_double',
    form: 'secret',
    title: '慢半拍的镜子',
    detail: '镜子里的人偶尔比{ta}慢半拍；母亲说那只是灯影，可灯灭之后，镜子里还会亮一会儿。',
    baseIntensity: 0.7,
    ordinaryWeight: 0.5,
    legendaryWeight: 1.8,
  },
  {
    kind: 'salt',
    form: 'obsession',
    title: '怕盐的门槛',
    detail: '{ta}害怕盐，尤其害怕别人把盐撒在门槛上；有一次，{ta}在夜里把整条街的门槛都舔了一遍。',
    baseIntensity: 0.7,
    ordinaryWeight: 0.8,
    legendaryWeight: 1.5,
  },
  {
    kind: 'bone',
    form: 'obsession',
    title: '收藏的小骨头',
    detail: '{ta}收集小骨头，坚信其中一根属于从未见过面的祖父；每次家里死人，收藏就会多一根。',
    baseIntensity: 0.75,
    ordinaryWeight: 0.7,
    legendaryWeight: 1.7,
  },
  {
    kind: 'clock',
    form: 'obsession',
    title: '停摆前的钟声',
    detail:
      '{ta}能听见钟表停摆前的声音，却无法解释为什么有些钟在夜里自己走快；家里的钟都停在同一个时刻。',
    baseIntensity: 0.6,
    ordinaryWeight: 1.0,
    legendaryWeight: 1.4,
  },
  {
    kind: 'door',
    form: 'obsession',
    title: '必须留一条门缝',
    detail:
      '{ta}睡觉必须让门开着一条缝，否则会梦见自己被人从外面反锁；门缝里偶尔会伸进一只不属于任何人的手。',
    baseIntensity: 0.65,
    ordinaryWeight: 1.0,
    legendaryWeight: 1.5,
  },
  {
    kind: 'blood_oath',
    form: 'secret',
    title: '黄纸上的血印',
    detail:
      '家族在一张黄纸上按过血手印；{ta}出生时，纸上多了一个小小的指印，而家里没有人承认抱过{ta}去按。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'name_compulsion',
    form: 'obsession',
    title: '写下听过的名字',
    detail:
      '{ta}会不自觉地把听过的名字写下来，包括那些不该知道的名字；有一页上，{ta}写下了自己的死期。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'survivor_guilt',
    form: 'secret',
    title: '不属于自己的灾难',
    detail:
      '{ta}记得一场自己没有经历过的灾难，记得自己从死人堆里爬出来；每次讲述，细节都比上一次更清楚。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.6,
    legendaryWeight: 1.8,
  },
  {
    kind: 'stolen_identity',
    form: 'secret',
    title: '别人的出生证明',
    detail:
      '{ta}的出生证明属于另一个孩子；那个孩子的家人每年都来{place}找，带着一张和{ta}很像的旧照片。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.5,
    legendaryWeight: 2.0,
  },
  {
    kind: 'dead_letter',
    form: 'secret',
    title: '没有寄出的信',
    detail:
      '家里藏着一封没有寄出的信，收信人是一个被从族谱里划掉的人；信封上的火漆印和{ta}的胎记形状一样。',
    baseIntensity: 0.65,
    ordinaryWeight: 0.9,
    legendaryWeight: 1.6,
  },
  {
    kind: 'twin',
    form: 'secret',
    title: '从未被提起的双胞胎',
    detail: '{ta}有一个从未被提起的双胞胎；家里人把那个名字当作禁忌，却在每年同一天多煮一碗面。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'saint_mark',
    form: 'secret',
    title: '像地图的痣',
    detail: '{ta}的手掌有一块形状像地图的痣；邻居说那是神迹，母亲说那是病，医生说不必管。',
    baseIntensity: 0.55,
    ordinaryWeight: 0.8,
    legendaryWeight: 1.6,
  },
  {
    kind: 'escape_plan',
    form: 'obsession',
    title: '床板下的逃跑路线',
    detail:
      '{ta}从会走路起就在计划逃跑，路线藏在床板下面，终点是一个没有名字的地方；路线每年都会延长一点。',
    baseIntensity: 0.6,
    ordinaryWeight: 1.1,
    legendaryWeight: 1.5,
  },
  {
    kind: 'revenge_list',
    form: 'obsession',
    title: '越来越短的名单',
    detail:
      '{ta}有一份名单，上面的人名每年都会少一个；{ta}不记得自己划掉过谁，但记得每一次划掉时手都很稳。',
    baseIntensity: 0.85,
    ordinaryWeight: 0.5,
    legendaryWeight: 2.0,
  },
  {
    kind: 'hunger',
    form: 'obsession',
    title: '枕头下的食物',
    detail:
      '{ta}总在枕头下藏食物，即使家里并不缺粮；饥饿感来自一个不属于自己的胃，夜里会听见有人在嚼东西。',
    baseIntensity: 0.7,
    ordinaryWeight: 0.9,
    legendaryWeight: 1.5,
  },
  {
    kind: 'repair',
    form: 'obsession',
    title: '修好不该修的东西',
    detail:
      '{ta}会把坏掉的东西修好，包括不该修好的东西；有一次，一只死鸟在桌上动了动，母亲把桌子烧了。',
    baseIntensity: 0.75,
    ordinaryWeight: 0.7,
    legendaryWeight: 1.8,
  },
  {
    kind: 'debt_to_dead',
    form: 'secret',
    title: '欠死人的债',
    detail:
      '家里欠死者一笔债；每年清明，父亲都会对着空椅子说“今年一定还”，而空椅子每年都往门口挪一点。',
    baseIntensity: 0.65,
    ordinaryWeight: 0.9,
    legendaryWeight: 1.5,
  },
  {
    kind: 'extra_street',
    form: 'obsession',
    title: '地图上多出的街',
    detail:
      '{ta}反复画同一张地图；图上{place}的街道比现实多出一条，那条街的尽头总是画着一扇没有门的房子。',
    baseIntensity: 0.6,
    ordinaryWeight: 0.9,
    legendaryWeight: 1.5,
  },
  {
    kind: 'animal_kinship',
    form: 'secret',
    title: '动物不看眼睛',
    detail: '动物愿意靠近{ta}，但从不看{ta}的眼睛；镇上的屠夫因此拒绝让{ta}进店，说刀会自己转向。',
    baseIntensity: 0.6,
    ordinaryWeight: 0.8,
    legendaryWeight: 1.5,
  },
  {
    kind: 'stolen_sleep',
    form: 'secret',
    title: '被借走的夜晚',
    detail:
      '{ta}每天醒来都比睡前更累，仿佛夜里有人借走了{ta}的身体去做别的事；鞋底偶尔沾着没去过的地方的土。',
    baseIntensity: 0.75,
    ordinaryWeight: 0.6,
    legendaryWeight: 1.7,
  },
  {
    kind: 'empty_grave',
    form: 'secret',
    title: '空棺材',
    detail: '父亲的墓里埋着一只空棺材；母亲说不要问，问了就会有人来，而每年都真的有人来。',
    baseIntensity: 0.8,
    ordinaryWeight: 0.6,
    legendaryWeight: 1.8,
  },
  {
    kind: 'last_word',
    form: 'secret',
    title: '祖母的最后一个词',
    detail:
      '{ta}的祖母临终前只说了一个词，家里人假装没听见；{ta}却每天梦见那个词，醒来时舌尖发麻。',
    baseIntensity: 0.65,
    ordinaryWeight: 0.8,
    legendaryWeight: 1.6,
  },
] as const satisfies readonly SecretTemplate[];

type DestinyHookTemplate = {
  readonly kind: string;
  readonly title: string;
  readonly detail: string;
  readonly omen: string;
  readonly severity: number;
  readonly promise: number;
  readonly tags: readonly string[];
  readonly ordinaryWeight: number;
  readonly legendaryWeight: number;
  readonly eras?: readonly EraBand[];
};

const DESTINY_HOOKS = [
  {
    kind: 'war_orphan',
    title: '战乱孤儿',
    detail:
      '一场没有正式名字的战争从{place}经过；{ta}的家在撤离名单上被漏掉了，从此没有人能说清谁先离开。',
    omen: '每次听见远处的闷响，{ta}都会先找门。',
    severity: 0.85,
    promise: 0.5,
    tags: ['war', 'orphan', 'displacement'],
    ordinaryWeight: 0.8,
    legendaryWeight: 2.3,
  },
  {
    kind: 'dock_child',
    title: '码头童工',
    detail: '还没长到柜台高，{ta}就在{place}的码头替人跑腿，学会了从水声里分辨哪条船会晚点。',
    omen: '{ta}的鞋底总带着不属于家里的河泥。',
    severity: 0.6,
    promise: 0.55,
    tags: ['labour', 'port', 'poverty'],
    ordinaryWeight: 2.2,
    legendaryWeight: 1.2,
  },
  {
    kind: 'declining_scholars',
    title: '没落书香门第',
    detail: '家族把最后一间书房锁了起来，钥匙挂在{ta}的摇篮上；没人承认那扇门已经打不开。',
    omen: '{ta}第一次开口，念出的是一个没人教过的书名。',
    severity: 0.45,
    promise: 0.65,
    tags: ['letters', 'decline', 'inheritance'],
    ordinaryWeight: 1.8,
    legendaryWeight: 1.6,
  },
  {
    kind: 'refugee_descendant',
    title: '流亡者后代',
    detail: '祖父母从一张被撕掉的地图另一端逃来；{ta}的出生证明上，籍贯一栏空着。',
    omen: '{ta}会在梦里说出一种家里没人再说的语言。',
    severity: 0.65,
    promise: 0.6,
    tags: ['exile', 'stateless', 'language'],
    ordinaryWeight: 1.4,
    legendaryWeight: 1.9,
  },
  {
    kind: 'plague_survivor',
    title: '疫病幸存者',
    detail: '疫病经过{place}时，{ta}是那条街上唯一没有发烧的孩子；邻居说这是运气，母亲说这是债。',
    omen: '{ta}能闻出别人身上“快要病倒”的气味。',
    severity: 0.75,
    promise: 0.5,
    tags: ['disease', 'survival', 'stigma'],
    ordinaryWeight: 0.9,
    legendaryWeight: 1.6,
  },
  {
    kind: 'factory_child',
    title: '工厂童工',
    detail: '工厂的汽笛就是{ta}的摇篮曲；父亲的手指少了两根，赔偿金还没有发下来。',
    omen: '{ta}睡觉时会把手掌贴在耳边，像在听机器停转。',
    severity: 0.7,
    promise: 0.45,
    tags: ['factory', 'labour', 'injury'],
    ordinaryWeight: 1.5,
    legendaryWeight: 1.5,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'smuggler_heir',
    title: '走私家族后代',
    detail: '家族的仓库里总有多出来的箱子；{ta}学会走路之前，先学会了不要问箱子里是什么。',
    omen: '{ta}对锁孔和暗门有一种本能的亲近。',
    severity: 0.65,
    promise: 0.6,
    tags: ['crime', 'border', 'secrecy'],
    ordinaryWeight: 0.9,
    legendaryWeight: 1.9,
  },
  {
    kind: 'temple_ward',
    title: '寺庙寄养',
    detail:
      '寺庙收养了{ta}，条件是长大后替一个失踪的僧人守夜；那个僧人从未被找到，守夜的钟却每年都响。',
    omen: '{ta}能背出自己从未学过的经文。',
    severity: 0.5,
    promise: 0.55,
    tags: ['faith', 'institution', 'missing'],
    ordinaryWeight: 1.2,
    legendaryWeight: 1.4,
  },
  {
    kind: 'military_bastard',
    title: '军户私生',
    detail: '父亲的名字出现在一份阵亡名单上，母亲说那不是父亲；{ta}的姓因此一直空着。',
    omen: '{ta}对军号声有反应，即使隔着几里地。',
    severity: 0.6,
    promise: 0.55,
    tags: ['military', 'parentage', 'shame'],
    ordinaryWeight: 1.0,
    legendaryWeight: 1.7,
  },
  {
    kind: 'colonial_interpreter',
    title: '殖民地译员之子',
    detail: '家里替外来者做翻译，既被本地人怀疑，也被外来者轻视；{ta}从两种语言里学会了两套谎话。',
    omen: '{ta}说梦话时会切换口音，像在替别人吵架。',
    severity: 0.55,
    promise: 0.7,
    tags: ['colonial', 'language', 'betrayal'],
    ordinaryWeight: 0.8,
    legendaryWeight: 1.8,
    eras: ['industrial', 'interwar', 'coldwar'],
  },
  {
    kind: 'frontier_settler',
    title: '边地拓荒者',
    detail: '家族在边界上开荒，地契画的线比河流更早改变；{ta}出生时，第一场霜冻死了半亩苗。',
    omen: '{ta}总在朝地平线看，像在等一个不会来的信号。',
    severity: 0.55,
    promise: 0.6,
    tags: ['frontier', 'land', 'survival'],
    ordinaryWeight: 1.5,
    legendaryWeight: 1.5,
  },
  {
    kind: 'shipwreck',
    title: '海难遗孤',
    detail:
      '一艘没有登记名字的船在{place}外海沉没；{ta}是唯一被冲上岸的婴儿，怀里抱着一块不属于任何本地船只的木板。',
    omen: '{ta}洗澡时从不怕水，反而会往深处走。',
    severity: 0.75,
    promise: 0.65,
    tags: ['sea', 'orphan', 'mystery'],
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'mine_child',
    title: '矿工之子',
    detail: '矿道塌方那年，{ta}的父亲被埋在下面；矿主说那是他自己的疏忽，抚恤金是一袋发霉的谷子。',
    omen: '{ta}能听见地下很轻的敲击声，别人听不见。',
    severity: 0.8,
    promise: 0.4,
    tags: ['mine', 'death', 'labour'],
    ordinaryWeight: 1.0,
    legendaryWeight: 1.8,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'circus_foundling',
    title: '戏班弃儿',
    detail: '流动戏班在{place}城外捡到{ta}；他们给{ta}取的名字来自上一场戏里死掉的角色。',
    omen: '{ta}会模仿从未见过的人走路。',
    severity: 0.5,
    promise: 0.65,
    tags: ['performance', 'foundling', 'identity'],
    ordinaryWeight: 0.7,
    legendaryWeight: 1.7,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'rebel_courier',
    title: '叛军信使',
    detail: '一个陌生人把一封没有署名的信塞进{ta}的襁褓；第二天，城里开始抓人。',
    omen: '{ta}学会写字后，第一个写下的词是“快走”。',
    severity: 0.8,
    promise: 0.6,
    tags: ['rebellion', 'danger', 'message'],
    ordinaryWeight: 0.7,
    legendaryWeight: 2.0,
  },
  {
    kind: 'lost_heir',
    title: '失落继承人',
    detail: '家族声称{ta}是某位失踪继承人的后代，却拿不出证据；觊觎家产的人已经开始上门。',
    omen: '{ta}的睡相和旧画像里的人一模一样。',
    severity: 0.65,
    promise: 0.75,
    tags: ['inheritance', 'claim', 'danger'],
    ordinaryWeight: 0.5,
    legendaryWeight: 2.2,
  },
  {
    kind: 'debt_hostage',
    title: '抵债的孩子',
    detail: '{ta}出生那天，父亲用{ta}的名字签了一张借据；债主每年都来确认{ta}还活着。',
    omen: '{ta}看到算盘或账本就会安静下来。',
    severity: 0.75,
    promise: 0.45,
    tags: ['debt', 'child', 'powerless'],
    ordinaryWeight: 0.8,
    legendaryWeight: 1.8,
  },
  {
    kind: 'census_ghost',
    title: '户籍上的幽灵',
    detail:
      '官府的户籍册上，{ta}已经死过一次；另一个同名孩子替{ta}领了配给，而那个孩子现在住在{ta}家。',
    omen: '{ta}的影子偶尔比身体短一截。',
    severity: 0.55,
    promise: 0.55,
    tags: ['bureaucracy', 'identity', 'duplicate'],
    ordinaryWeight: 0.7,
    legendaryWeight: 1.6,
  },
  {
    kind: 'prophecy_marked',
    title: '被预言标记',
    detail: '一个疯癫的算命人指着{ta}说，这孩子会让一座城改名；说完就投了河，尸体一直没有找到。',
    omen: '{ta}出生那晚，全城的狗朝同一个方向叫。',
    severity: 0.7,
    promise: 0.85,
    tags: ['prophecy', 'fame', 'danger'],
    ordinaryWeight: 0.3,
    legendaryWeight: 2.4,
  },
  {
    kind: 'twin_consumed',
    title: '被留下的双胞胎',
    detail: '{ta}有一个从未被埋葬的双胞胎；家里人把两个人的名字缝在同一件衣服里，每年只洗一次。',
    omen: '{ta}会对着空椅子说话，语气像在安慰另一个孩子。',
    severity: 0.8,
    promise: 0.5,
    tags: ['twin', 'loss', 'guilt'],
    ordinaryWeight: 0.4,
    legendaryWeight: 2.1,
  },
  {
    kind: 'executioner_lineage',
    title: '刽子手血脉',
    detail: '家族世代替官府行刑，门前从不挂灯；{ta}出生时，父亲第一次拒绝上班。',
    omen: '{ta}的手很稳，稳得不像一个孩子。',
    severity: 0.7,
    promise: 0.5,
    tags: ['violence', 'lineage', 'stigma'],
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'gravedigger',
    title: '守墓人之子',
    detail: '{ta}在墓地旁长大，学会的第一首歌是给死人唱的；有一块无字碑上刻着{ta}的生辰。',
    omen: '{ta}能准确说出村里每个人还剩多少年。',
    severity: 0.6,
    promise: 0.5,
    tags: ['death', 'graveyard', 'omen'],
    ordinaryWeight: 0.8,
    legendaryWeight: 1.7,
  },
  {
    kind: 'forbidden_student',
    title: '偷学的人',
    detail:
      '{ta}偷看了一本不该看的书，书页上写着如何让一个死人开口；先生没有没收书，只是不再来上课。',
    omen: '{ta}会对着空屋子提问，然后等很久。',
    severity: 0.55,
    promise: 0.8,
    tags: ['knowledge', 'forbidden', 'ambition'],
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'strike_child',
    title: '罢工家庭的孩子',
    detail: '罢工那月，{ta}的母亲在厂门口生下{ta}；厂主撤走了医务室，工友用一箱纱布把{ta}裹起来。',
    omen: '{ta}听见汽笛就握拳，听见口号却会笑。',
    severity: 0.65,
    promise: 0.65,
    tags: ['labour', 'solidarity', 'birth'],
    ordinaryWeight: 0.8,
    legendaryWeight: 1.7,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'occupation_child',
    title: '占领军的孩子',
    detail: '{ta}的父亲是占领军的翻译，母亲是本地人；两边都认为{ta}不该存在。',
    omen: '{ta}同时害怕两种颜色的制服，却会模仿两边的口音。',
    severity: 0.8,
    promise: 0.55,
    tags: ['occupation', 'parentage', 'betrayal'],
    ordinaryWeight: 0.6,
    legendaryWeight: 2.0,
    eras: ['interwar', 'coldwar'],
  },
  {
    kind: 'exile_return',
    title: '流亡归来者',
    detail: '家族被驱逐出境，又在{ta}出生前悄悄回来；旧宅现在住着别人，门牌却还是原来的。',
    omen: '{ta}会在自家门口迷路。',
    severity: 0.6,
    promise: 0.6,
    tags: ['exile', 'return', 'home'],
    ordinaryWeight: 0.8,
    legendaryWeight: 1.7,
  },
  {
    kind: 'machine_orphan',
    title: '被机器吃掉父亲的人',
    detail: '一台机器吞掉了{ta}父亲的手臂，也吞掉了他的名字；工厂记录上，父亲变成了一个编号。',
    omen: '{ta}对齿轮声有生理性的恐惧，也有无法解释的亲近。',
    severity: 0.75,
    promise: 0.55,
    tags: ['machine', 'labour', 'loss'],
    ordinaryWeight: 1.1,
    legendaryWeight: 1.8,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'lake_child',
    title: '湖里捞起来的孩子',
    detail: '有人在{place}的湖里捞起一只木盆，{ta}躺在里面，盆底刻着一个不是本地字的姓。',
    omen: '{ta}从不怕冷，冬天也敢把手伸进冰水。',
    severity: 0.65,
    promise: 0.7,
    tags: ['water', 'foundling', 'mystery'],
    ordinaryWeight: 0.5,
    legendaryWeight: 1.9,
  },
  {
    kind: 'caravan_orphan',
    title: '商队遗孤',
    detail:
      '商队在沙漠边上遭遇劫掠，{ta}被一只驮货的骡子带回了{place}；骡子背上还绑着半袋没人认领的盐。',
    omen: '{ta}能闻出方向，尤其能闻出危险从哪边来。',
    severity: 0.7,
    promise: 0.6,
    tags: ['caravan', 'desert', 'orphan'],
    ordinaryWeight: 0.6,
    legendaryWeight: 1.6,
  },
  {
    kind: 'street_runner',
    title: '街头跑腿',
    detail: '{ta}在{place}的街巷里替人送信，知道哪条巷子没有灯，也知道哪扇门后的人不该看。',
    omen: '{ta}走路没有声音，连家里人都常被吓到。',
    severity: 0.5,
    promise: 0.55,
    tags: ['street', 'information', 'survival'],
    ordinaryWeight: 2.0,
    legendaryWeight: 1.2,
  },
  {
    kind: 'archive_bastard',
    title: '档案室私生',
    detail: '档案室的一场火烧掉了{ta}的出生记录；一个老吏偷偷把{ta}塞进另一户人家的册页。',
    omen: '{ta}对纸灰的味道感到安心。',
    severity: 0.55,
    promise: 0.65,
    tags: ['archive', 'identity', 'fire'],
    ordinaryWeight: 0.7,
    legendaryWeight: 1.8,
    eras: ['industrial', 'interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'plague_doctor_ward',
    title: '瘟疫医生的养子',
    detail: '瘟疫医生收养了{ta}，条件是从此不许摘下口罩；{ta}至今不知道养父的脸。',
    omen: '{ta}画人时总先画口罩。',
    severity: 0.6,
    promise: 0.7,
    tags: ['plague', 'mask', 'care'],
    ordinaryWeight: 0.6,
    legendaryWeight: 1.8,
    eras: ['premodern', 'industrial', 'interwar'],
  },
  {
    kind: 'radio_ghost',
    title: '电台里的声音',
    detail:
      '{ta}能从一个没有通电的收音机里听见自己的声音，那个声音总在说同一句话：“别让他们找到你。”',
    omen: '{ta}在安静的地方会突然捂住耳朵。',
    severity: 0.7,
    promise: 0.7,
    tags: ['radio', 'voice', 'surveillance'],
    ordinaryWeight: 0.4,
    legendaryWeight: 2.1,
    eras: ['interwar', 'coldwar', 'contemporary'],
  },
  {
    kind: 'border_child',
    title: '边界上的孩子',
    detail: '{ta}的出生地在一张地图上属于两个国家；两边都发过出生证明，两边的兵都来查过户口。',
    omen: '{ta}会用两种方式写自己的名字。',
    severity: 0.55,
    promise: 0.65,
    tags: ['border', 'identity', 'state'],
    ordinaryWeight: 0.8,
    legendaryWeight: 1.7,
  },
  {
    kind: 'last_speaker',
    title: '最后会说那种话的人',
    detail:
      '{ta}是最后一个会说某种方言的人；一个外来学者愿意出钱买下{ta}的录音，条件是{ta}永远不再说。',
    omen: '{ta}做梦时只会用那种方言说话。',
    severity: 0.5,
    promise: 0.7,
    tags: ['language', 'last', 'choice'],
    ordinaryWeight: 0.6,
    legendaryWeight: 1.9,
  },
  {
    kind: 'sacrifice',
    title: '被还给河神的孩子',
    detail: '村里的老人说{ta}是“还给河神的孩子”；母亲不信，但她从此不敢让{ta}靠近水。',
    omen: '每年涨水前，{ta}都会梦见同一座桥。',
    severity: 0.85,
    promise: 0.6,
    tags: ['ritual', 'sacrifice', 'water'],
    ordinaryWeight: 0.4,
    legendaryWeight: 2.2,
  },
  {
    kind: 'unknown_parent',
    title: '不知道父母是谁',
    detail: '{ta}的母亲在生下{ta}后失踪，只留下一张写着陌生男人名字的纸条；那个人已经死了十年。',
    omen: '{ta}会在人群里寻找一张从未见过的脸。',
    severity: 0.7,
    promise: 0.55,
    tags: ['parentage', 'missing', 'search'],
    ordinaryWeight: 0.7,
    legendaryWeight: 1.7,
  },
  {
    kind: 'cursed_name',
    title: '不该取的名字',
    detail: '接生婆给{ta}取了一个不该取的名字，那是上一个死在这张床上的孩子的名字。',
    omen: '家里没人敢在夜里叫{ta}的全名。',
    severity: 0.65,
    promise: 0.65,
    tags: ['name', 'curse', 'birth'],
    ordinaryWeight: 0.5,
    legendaryWeight: 1.9,
  },
] as const satisfies readonly DestinyHookTemplate[];

type WishTemplate = { readonly text: string; readonly tags: readonly string[] };

const WISHES = [
  { text: '愿{ta}有饭吃，不必像我们一样在别人的账本上活着。', tags: ['survival'] },
  { text: '愿{ta}学会读书，然后把家里的名字从债契上划掉。', tags: ['knowledge', 'debt'] },
  { text: '愿{ta}长大后离开这里，永远不要回来。', tags: ['escape'] },
  { text: '愿{ta}找到一个不会在冬天消失的人。', tags: ['belonging'] },
  { text: '愿{ta}活得比父亲久，也活得比父亲自由。', tags: ['freedom', 'family'] },
  { text: '愿{ta}亲眼看见旧宅的门重新打开。', tags: ['return'] },
  { text: '愿{ta}能听懂动物和机器坏掉前的声音。', tags: ['knowledge', 'strange'] },
  { text: '愿{ta}成为一个让权贵记住名字的人。', tags: ['power', 'ambition'] },
  { text: '愿{ta}不要继承我们的愤怒。', tags: ['family', 'peace'] },
  { text: '愿{ta}平安，哪怕平安意味着平凡。', tags: ['safety'] },
  { text: '愿{ta}能把死者的名字一个一个念对。', tags: ['memory'] },
  { text: '愿{ta}有一间自己的房间，门能从里面锁上。', tags: ['autonomy'] },
  { text: '愿{ta}从不欠任何人钱。', tags: ['debt'] },
  { text: '愿{ta}找到失散的哥哥，不管哥哥变成了什么。', tags: ['search', 'family'] },
  { text: '愿{ta}学会写字，然后伪造一张能让我们离开的通行证。', tags: ['knowledge', 'escape'] },
  { text: '愿{ta}永远不必在饥饿和尊严之间选择。', tags: ['dignity'] },
  { text: '愿{ta}能原谅我们把这个孩子带到这个世界。', tags: ['family', 'guilt'] },
  { text: '愿{ta}成为传说，但不要成为祭品。', tags: ['legend', 'danger'] },
  { text: '愿{ta}拥有足够的力量，保护那些没有力量的人。', tags: ['power', 'care'] },
  { text: '愿{ta}与所爱的人在一起，而不是与一块土地。', tags: ['love', 'freedom'] },
  { text: '愿{ta}死后有人记得这个孩子的真名。', tags: ['memory', 'identity'] },
  { text: '愿{ta}不再做同一个梦。', tags: ['peace', 'mind'] },
  { text: '愿{ta}成为我们家族第一个不必说谎的人。', tags: ['truth', 'family'] },
  { text: '愿{ta}看见海。', tags: ['horizon'] },
  { text: '愿{ta}有一个可以回去的地方。', tags: ['belonging', 'home'] },
  { text: '愿{ta}学会拒绝。', tags: ['autonomy'] },
  { text: '愿{ta}能把不属于自己的罪还回去。', tags: ['justice'] },
  { text: '愿{ta}活得足够久，久到看见旧世界结束。', tags: ['time', 'change'] },
] as const satisfies readonly WishTemplate[];

type BodyNoteTemplate = {
  readonly text: string;
  readonly severity: number;
  readonly eras?: readonly EraBand[];
};

const BODY_NOTES = [
  { text: '早产，左耳听力很弱，哭声却很大。', severity: 0.35 },
  { text: '右手多一根指骨，家里说这是要出人头地的记号。', severity: 0.15 },
  { text: '背上有一块像旧地图的胎记，天冷时会发痒。', severity: 0.1 },
  { text: '天生哮喘，跑不了远路，但能分辨十几种咳嗽声。', severity: 0.45 },
  { text: '左眼几乎看不见，右眼在夜里格外敏锐。', severity: 0.4 },
  { text: '出生时脐带绕颈，接生婆说这孩子命硬。', severity: 0.25 },
  { text: '有轻微的唇裂，已经缝合，笑起来像一道旧伤口。', severity: 0.3 },
  { text: '对麦麸过敏，吃了会起疹子；在这个地方，这意味着很多顿饭都不能吃。', severity: 0.35 },
  { text: '脚踝天生内翻，走路慢，但从不摔倒。', severity: 0.5 },
  { text: '头发是少见的浅色，陌生人总要多看一眼。', severity: 0.1 },
  { text: '皮肤对阳光敏感，夏天只能待在阴影里。', severity: 0.25 },
  { text: '手指细长，关节却经常疼，阴雨天握不住笔。', severity: 0.35 },
  { text: '有一颗心脏杂音，医生说不碍事，母亲不信。', severity: 0.45 },
  { text: '出生时没有哭，直到有人把一枚冷硬币放进{ta}手里。', severity: 0.2 },
  { text: '右腿比左腿短一截，鞋底要垫三层布。', severity: 0.45 },
  { text: '对某些气味会突然昏厥，没人知道是哪一种。', severity: 0.4 },
  { text: '说话晚，三岁前只会用手势；后来却能模仿任何人的口音。', severity: 0.2 },
  { text: '后背有一道旧疤，父母说是出生时留下的。', severity: 0.3 },
  { text: '牙齿长得歪，笑起来总像在咬牙。', severity: 0.1 },
  { text: '体温比常人低，冬天手脚发紫。', severity: 0.35 },
  { text: '夜里会短暂停止呼吸，母亲每隔一个时辰就要探一次鼻息。', severity: 0.55 },
  { text: '身上有洗不掉的墨水味，尽管家里没人识字。', severity: 0.15 },
  { text: '左撇子，被先生用戒尺纠正过很多次。', severity: 0.05 },
  { text: '对羽毛、灰尘和旧纸都会打喷嚏。', severity: 0.15 },
  { text: '少一根肋骨，家族传说那是被祖先拿去换了什么。', severity: 0.4 },
  { text: '哭起来没有声音，接生婆说这样的孩子要么活不长，要么记仇。', severity: 0.35 },
  { text: '出生后高烧七天，退烧后眼睛的颜色变深了一层。', severity: 0.4 },
  { text: '左手掌心有一道像镜子的纹路，医生说是普通的掌纹。', severity: 0.1 },
] as const satisfies readonly BodyNoteTemplate[];

const BIRTHPLACE_REASONS = [
  '家里说，{place}的码头冬天也有活干。',
  '外祖母留下一张写着{place}的旧车票。',
  '父亲欠下的债把全家的方向指向{place}。',
  '那里有一条能藏人的河。',
  '有人说，在{place}见过一个与家里失散多年的人。',
  '一份旧契约上写着{place}，没人说得清是谁签的。',
  '家里听说那里不征兵。',
  '母亲的同乡在{place}开了一间铺子。',
  '因为一场火灾，全家只能去{place}投亲。',
  '孩子出生前，家里已经朝{place}走了三个月。',
  '那里有一所肯收穷孩子的学校。',
  '家族的老宅在{place}，如今住着陌生人。',
  '有人托付了一封信，收信地址在{place}。',
  '家里相信{place}的井水能治一种病。',
  '商队说{place}正在修一条新路，需要人手。',
  '那里每年有一场集市，失散的人会在集市上碰头。',
] as const;

/* ------------------------------------------------------------------ */
/* Derived content types                                               */
/* ------------------------------------------------------------------ */

export type FamilyBackgroundKind = (typeof FAMILY_BACKGROUNDS)[number]['kind'];
export type PersonalityTendencyId = (typeof PERSONALITY_TENDENCIES)[number]['kind'];
export type SecretKind = (typeof SECRETS)[number]['kind'];
export type DestinyHookKind = (typeof DESTINY_HOOKS)[number]['kind'];

export type RichAppearance = {
  skin: number;
  hair: number;
  clothes: number;
  doll: DollConfig;
};

export type BirthplaceDraft = {
  locationId: string;
  locationName: string;
  localCultureId: NameCultureId;
  localCultureLabel: string;
  polityId?: string;
  regionId?: string;
  lon?: number;
  lat?: number;
  reason: string;
  status: 'preference';
};

export type EraContext = {
  band: EraBand;
  label: string;
  year?: number;
  texture: string;
};

export type FamilyBackgroundDraft = {
  kind: FamilyBackgroundKind;
  label: string;
  summary: string;
  wealth: WealthBand;
  stability: number;
  pressure: number;
  tags: string[];
  status: 'preference';
};

export type PersonalityDraft = {
  tendency: PersonalityTendencyId;
  label: string;
  summary: string;
  values: { care: number; ambition: number; tradition: number };
  traits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
};

export type SecretDraft = {
  kind: SecretKind;
  form: 'secret' | 'obsession';
  title: string;
  detail: string;
  intensity: number;
  visibility: 'private';
};

export type DestinyHookDraft = {
  kind: DestinyHookKind;
  title: string;
  detail: string;
  omen: string;
  severity: number;
  promise: number;
  tags: string[];
  status: 'premise';
};

export type FateDraft = {
  variance: number;
  hardship: number;
  promise: number;
  certainty: number;
  note: string;
};

/**
 * Fields beyond today's strict BirthRequestSchema. Future mapping (without
 * changing the simulator authority):
 * - name/sex/health/body/wish/preferredLocationId/appearance -> BirthRequest
 * - familyBackground -> an optional future `familyPreference` hint, or
 *   BirthProposal.interpretation.conditions; the simulator still selects real
 *   parents and decides whether the preference is viable.
 * - personality -> BirthProposal.traits.personality / values, clamped by the
 *   existing 0.2..0.8 bounds.
 * - secret / destinyHook -> private LifeProgram opportunities, costs and
 *   hiddenFutures; they are narrative premises, never established facts.
 * - culture / era / birthplace.reason -> observer-private creation metadata,
 *   useful to the UI and to an LLM proposal, never a canonical claim.
 */
export type RichBirthDraft = {
  schema: 'creation/rich-birth-draft@1';
  seed: string;
  mode: CreationMode;
  name: string;
  sex: BirthSex;
  health: number;
  bodyNote: string;
  wish: string;
  culture: {
    id: NameCultureId;
    label: string;
    region: string;
    source: 'location' | 'override';
    diaspora: boolean;
  };
  birthplace: BirthplaceDraft;
  appearance: RichAppearance;
  era: EraContext;
  familyBackground: FamilyBackgroundDraft;
  personality: PersonalityDraft;
  secret: SecretDraft;
  destinyHook: DestinyHookDraft;
  fate: FateDraft;
  provenance: {
    canonical: false;
    note: string;
  };
};

export type RichAppearanceOverride = Partial<Omit<RichAppearance, 'doll'>> & {
  readonly doll?: DollConfig;
};

export type RichBirthOverrides = {
  readonly mode?: CreationMode;
  readonly name?: string;
  readonly sex?: BirthSex;
  readonly health?: number;
  readonly bodyNote?: string;
  readonly wish?: string;
  readonly preferredLocationId?: string;
  readonly cultureId?: NameCultureId;
  readonly appearance?: RichAppearanceOverride;
  readonly familyBackgroundKind?: FamilyBackgroundKind;
  readonly personalityTendency?: PersonalityTendencyId;
  readonly secretKind?: SecretKind;
  readonly destinyHookKind?: DestinyHookKind;
};

export type RichBirthOptions = {
  /** Caller-controlled seed. Defaults to world.seed for reproducibility. */
  readonly seed?: string;
  /** Changes the effective seed without requiring the caller to concatenate strings. */
  readonly nonce?: string | number;
  readonly overrides?: RichBirthOverrides;
};

/* ------------------------------------------------------------------ */
/* Small deterministic helpers                                         */
/* ------------------------------------------------------------------ */

type Rng = {
  next(): number;
  int(maxExclusive: number): number;
  pick<T>(items: readonly T[]): T;
  chance(probability: number): boolean;
  float(min: number, max: number): number;
};

function makeRng(seed: string, scope: string): Rng {
  let cursor = 0;
  const next = () => random(seed, scope, cursor++);
  const int = (maxExclusive: number) => {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) return 0;
    return Math.min(maxExclusive - 1, Math.floor(next() * maxExclusive));
  };
  return {
    next,
    int,
    pick<T>(items: readonly T[]): T {
      if (!items.length) throw new Error(`随机池为空：${scope}`);
      return items[int(items.length)]!;
    },
    chance: (probability: number) => next() < probability,
    float: (min: number, max: number) => min + next() * (max - min),
  };
}

function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value));
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function pickWeighted<T>(rng: Rng, items: readonly T[], weight: (item: T) => number): T {
  if (!items.length) throw new Error('加权随机池为空');
  const weights = items.map((item) => Math.max(0, weight(item)));
  const total = weights.reduce((sum, value) => sum + value, 0);
  if (total <= 0) return items[0]!;
  let cursor = rng.next() * total;
  for (let i = 0; i < items.length; i++) {
    cursor -= weights[i]!;
    if (cursor <= 0) return items[i]!;
  }
  return items[items.length - 1]!;
}

function eraFilter<T>(items: readonly T[], band: EraBand): readonly T[] {
  const matching = items.filter((item) => {
    const eras = (item as { readonly eras?: readonly EraBand[] }).eras;
    return !eras || eras.includes(band);
  });
  return matching.length ? matching : items;
}

function render(template: string, context: Readonly<Record<string, string | number>>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in context ? String(context[key]) : match,
  );
}

function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1))}…`;
}

function cleanOverrideText(value: string, max: number, label: string): string {
  if (typeof value !== 'string') throw new Error(`${label}必须是文本`);
  const cleaned = value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) throw new Error(`${label}不能为空`);
  if (cleaned.length > max) throw new Error(`${label}超过 ${max} 个字符`);
  return cleaned;
}

function finiteNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function integerInRange(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.round(value)));
}

/* ------------------------------------------------------------------ */
/* Era and appearance data                                             */
/* ------------------------------------------------------------------ */

const ERA_LABELS: Record<EraBand, { label: string; texture: string }> = {
  premodern: {
    label: '前工业时代',
    texture: '城墙、饥荒与远行商队决定一个孩子能走多远。',
  },
  industrial: {
    label: '工业黎明',
    texture: '蒸汽、霍乱与殖民舰队共享同一条航线。',
  },
  interwar: {
    label: '大战与萧条',
    texture: '征兵公告、通货膨胀与新的广播声音挤进每个家庭。',
  },
  coldwar: {
    label: '冷战与去殖民',
    texture: '两个阵营的阴影落下，边境与工厂同时需要人手。',
  },
  contemporary: {
    label: '气候与算法年代',
    texture: '气候灾害、算法与旧债同时追着普通人。',
  },
  frontier: {
    label: '无纪年城邦时代',
    texture: '没有公认的纪元，只有城邦、商路和随时会改道的河。',
  },
};

function eraForWorld(world: CreationWorld): EraContext {
  let startYear =
    typeof world.calendar?.startYear === 'number' && Number.isFinite(world.calendar.startYear)
      ? world.calendar.startYear
      : undefined;
  if (startYear === undefined) {
    const match = /^earth-(\d{3,4})$/.exec(world.pack?.id ?? '');
    if (match) startYear = Number(match[1]);
  }
  if (startYear === undefined) return { band: 'frontier', ...ERA_LABELS.frontier };
  const year = Math.floor(startYear + world.month / 12);
  const band: EraBand =
    year < 1800
      ? 'premodern'
      : year < 1914
        ? 'industrial'
        : year < 1946
          ? 'interwar'
          : year < 1992
            ? 'coldwar'
            : 'contemporary';
  return { band, label: ERA_LABELS[band].label, year, texture: ERA_LABELS[band].texture };
}

const SKIN_INDEXES = Array.from({ length: 12 }, (_, index) => index);
const HAIR_INDEXES = Array.from({ length: 16 }, (_, index) => index);
const CLOTHES_INDEXES = Array.from({ length: 16 }, (_, index) => index);
const HAIR_COLORS = [
  '#252129',
  '#603f2d',
  '#936847',
  '#c9aa65',
  '#cfbfa2',
  '#6b4935',
  '#b2aca6',
  '#aa573e',
  '#41495e',
  '#d9d6cd',
  '#756854',
  '#b78c75',
  '#242e36',
  '#864b35',
  '#aa9180',
  '#544c47',
] as const;
const EYE_COLORS = [
  '#3b2b23',
  '#5a4632',
  '#6f6b4d',
  '#485b5c',
  '#4b5b78',
  '#6b5b78',
  '#3d3d3d',
] as const;
const TEXTILE_COLORS = [
  '#687f57',
  '#975e55',
  '#568293',
  '#887199',
  '#b39966',
  '#597c78',
  '#d3c7ae',
  '#3d4557',
  '#8094a1',
  '#ad896f',
  '#6d6965',
  '#567268',
  '#9c7685',
  '#c1a774',
  '#8f9b80',
  '#d9dbd4',
] as const;
const HAIR_STYLES = [
  'hair_bangs_adult',
  'hair_bob_adult',
  'hair_buzzcut_adult',
  'hair_cowlick_adult',
  'hair_curly_long_adult',
  'hair_curly_short_adult',
  'hair_dreadlocks_long_adult',
  'hair_flat_top_fade_adult',
  'hair_half_up_adult',
  'hair_idol_adult',
  'hair_lob_adult',
  'hair_long_messy_adult',
  'hair_messy1_adult',
  'hair_messy2_adult',
  'hair_mop_adult',
  'hair_page_adult',
  'hair_parted_adult',
  'hair_pigtails_adult',
  'hair_pixie_adult',
  'hair_plain_adult',
  'hair_spiked_adult',
  'hair_unkempt_adult',
] as const;
const MALE_TOPS = [
  'torso_clothes_shortsleeve_tshirt_male',
  'torso_clothes_shortsleeve_tshirt_vneck_male',
  'torso_clothes_shortsleeve_shortsleeve_polo_male',
  'torso_clothes_longsleeve_longsleeve2_buttoned_male',
  'torso_clothes_longsleeve_longsleeve2_cardigan_male',
  'torso_clothes_longsleeve_longsleeve2_male',
  'torso_clothes_sleeveless_sleeveless2_male',
] as const;
const FEMALE_TOPS = [
  'torso_clothes_shortsleeve_tshirt_female',
  'torso_clothes_shortsleeve_tshirt_vneck_female',
  'torso_clothes_shortsleeve_shortsleeve_polo_female',
  'torso_clothes_longsleeve_longsleeve2_buttoned_female',
  'torso_clothes_longsleeve_longsleeve2_cardigan_female',
  'torso_clothes_longsleeve_longsleeve2_female',
  'torso_clothes_sleeveless_sleeveless2_female',
] as const;
const TEEN_TOPS = [
  'torso_clothes_shortsleeve_tshirt_teen',
  'torso_clothes_shortsleeve_tshirt_vneck_teen',
  'torso_clothes_shortsleeve_shortsleeve_polo_teen',
  'torso_clothes_longsleeve_longsleeve2_buttoned_teen',
  'torso_clothes_longsleeve_longsleeve2_cardigan_teen',
  'torso_clothes_longsleeve_longsleeve2_teen',
  'torso_clothes_sleeveless_sleeveless2_teen',
] as const;
const MALE_BOTTOMS = [
  'legs_pants_male',
  'legs_pants2_male',
  'legs_formal_male',
  'legs_cuffed_male',
] as const;
const FEMALE_BOTTOMS = [
  'legs_pants_thin',
  'legs_pants2_thin',
  'legs_formal_thin',
  'legs_cuffed_thin',
  'legs_skirts_straight_thin',
] as const;
const MALE_SHOES = [
  'feet_shoes_basic_male',
  'feet_shoes_revised_male',
  'feet_boots_basic_male',
  'feet_boots_fold_male',
  'feet_sandals_male',
] as const;
const FEMALE_SHOES = [
  'feet_shoes_basic_thin',
  'feet_shoes_revised_thin',
  'feet_boots_basic_thin',
  'feet_boots_fold_thin',
  'feet_sandals_thin',
] as const;

type ClothingBody = 'male' | 'female' | 'teen';

function bodyTypeFor(rng: Rng, sex: BirthSex): NonNullable<DollConfig['bodyType']> {
  if (sex === 'female') return 'female';
  if (sex === 'male') return rng.chance(0.12) ? 'muscular' : 'male';
  return rng.chance(0.5) ? 'female' : 'male';
}

function clothingBody(bodyType: NonNullable<DollConfig['bodyType']>): ClothingBody {
  return bodyType === 'female' ? 'female' : bodyType === 'teen' ? 'teen' : 'male';
}

function generateAppearance(rng: Rng, sex: BirthSex, mode: CreationMode): RichAppearance {
  const bodyType = bodyTypeFor(rng, sex);
  const clothesBody = clothingBody(bodyType);
  const faceBody = bodyType === 'female' ? 'female' : 'male';
  const top =
    clothesBody === 'female'
      ? rng.pick(FEMALE_TOPS)
      : clothesBody === 'teen'
        ? rng.pick(TEEN_TOPS)
        : rng.pick(MALE_TOPS);
  const bottom = clothesBody === 'female' ? rng.pick(FEMALE_BOTTOMS) : rng.pick(MALE_BOTTOMS);
  const shoes = clothesBody === 'female' ? rng.pick(FEMALE_SHOES) : rng.pick(MALE_SHOES);
  const headOptions =
    bodyType === 'female'
      ? [
          'head_heads_human_female',
          'head_heads_human_female_small',
          'head_heads_human_female_elderly',
        ]
      : ['head_heads_human_male', 'head_heads_human_male_gaunt', 'head_heads_human_male_plump'];
  const doll: DollConfig = {
    bodyType,
    head: rng.pick(headOptions),
    hairStyle: rng.pick(HAIR_STYLES),
    hairColor: rng.pick(HAIR_COLORS),
    eyeColor: rng.pick(EYE_COLORS),
    expression: `head_faces_${faceBody}_neutral`,
    nose: rng.pick([
      'head_nose_big_adult',
      'head_nose_button_adult',
      'head_nose_large_adult',
      'head_nose_straight_adult',
    ]),
    ears: rng.pick(['head_ears_big_adult', 'head_ears_medium_adult', 'head_ears_down_adult']),
    eyebrows: rng.pick(['eyes_eyebrows_thick_adult', 'eyes_eyebrows_thin_adult']),
    top,
    topColor: rng.pick(TEXTILE_COLORS),
    bottom,
    bottomColor: rng.pick(TEXTILE_COLORS),
    shoes,
    shoeColor: rng.pick(['#4b3c35', '#5d4a3a', '#3d3a34', '#6b5a45']),
  };
  if (rng.chance(0.25)) {
    doll.coat =
      clothesBody === 'female'
        ? 'torso_clothes_longsleeve_longsleeve2_cardigan_female_outer'
        : clothesBody === 'teen'
          ? 'torso_clothes_longsleeve_longsleeve2_cardigan_teen_outer'
          : rng.pick([
              'torso_jacket_collared_male_walk_charcoal',
              'torso_jacket_collared_male_walk_bluegray',
              'torso_jacket_collared_male_walk_brown',
              'torso_clothes_longsleeve_longsleeve2_cardigan_male_outer',
            ]);
    doll.coatColor = rng.pick(TEXTILE_COLORS);
  }
  if (rng.chance(mode === 'legendary' ? 0.28 : 0.14)) {
    doll.earrings = rng.pick([
      'facial_earrings_simple_left_adult',
      'facial_earrings_simple_right_adult',
    ]);
  }
  if (rng.chance(0.1))
    doll.glasses = rng.pick(['facial_glasses_round_adult', 'facial_glasses_nerd_adult']);
  if (rng.chance(0.06)) doll.hat = 'hat_cloth_bandana_adult';
  if (rng.chance(mode === 'legendary' ? 0.22 : 0.1)) {
    doll.backpack =
      clothesBody === 'female'
        ? rng.pick([
            'backpack_backpack_female_walk_leather',
            'backpack_squarepack_female_walk_leather',
          ])
        : clothesBody === 'male'
          ? rng.pick([
              'backpack_backpack_male_walk_leather',
              'backpack_squarepack_male_walk_leather',
            ])
          : undefined;
    if (!doll.backpack) delete doll.backpack;
  }
  return {
    skin: rng.pick(SKIN_INDEXES),
    hair: rng.pick(HAIR_INDEXES),
    clothes: rng.pick(CLOTHES_INDEXES),
    doll,
  };
}

const DOLL_KEYS = [
  'bodyType',
  'head',
  'nose',
  'ears',
  'eyebrows',
  'expression',
  'earrings',
  'hairStyle',
  'hairColor',
  'eyeColor',
  'beard',
  'top',
  'topColor',
  'bottom',
  'bottomColor',
  'shoes',
  'shoeColor',
  'coat',
  'coatColor',
  'hat',
  'glasses',
  'backpack',
  'mask',
] as const satisfies readonly (keyof DollConfig)[];

function mergeAppearance(
  base: RichAppearance,
  override: RichAppearanceOverride | undefined,
): RichAppearance {
  if (!override) return base;
  const doll: DollConfig = { ...base.doll };
  if (override.doll) {
    for (const key of DOLL_KEYS) {
      const value = override.doll[key];
      if (value !== undefined) {
        (doll as Record<string, unknown>)[key] = value;
      }
    }
  }
  return {
    skin: integerInRange(override.skin, base.skin, 0, 11),
    hair: integerInRange(override.hair, base.hair, 0, 15),
    clothes: integerInRange(override.clothes, base.clothes, 0, 15),
    doll,
  };
}

/* ------------------------------------------------------------------ */
/* Generation                                                          */
/* ------------------------------------------------------------------ */

const MODE_WEIGHTS: Record<CreationMode, number> = { ordinary: 88, legendary: 12 };
const MODE_PROFILES: Record<
  CreationMode,
  { variance: number; hardship: number; promise: number; certainty: number }
> = {
  ordinary: { variance: 0.32, hardship: 0.38, promise: 0.42, certainty: 0.62 },
  legendary: { variance: 0.78, hardship: 0.58, promise: 0.66, certainty: 0.34 },
};

function resolveMode(rng: Rng, override: CreationMode | undefined): CreationMode {
  if (override !== undefined) {
    if (override !== 'ordinary' && override !== 'legendary') throw new Error('未知人生模式');
    return override;
  }
  return pickWeighted(rng, ['ordinary', 'legendary'] as const, (mode) => MODE_WEIGHTS[mode]);
}

function resolveSex(rng: Rng, override: BirthSex | undefined): BirthSex {
  if (override !== undefined) {
    if (override !== 'female' && override !== 'male' && override !== 'intersex')
      throw new Error('未知性别');
    return override;
  }
  return pickWeighted(rng, ['female', 'male', 'intersex'] as const, (sex) =>
    sex === 'intersex' ? 2 : 49,
  );
}

function resolveCulture(
  override: NameCultureId | undefined,
  local: NameCultureId,
): { id: NameCultureId; source: 'location' | 'override' } {
  if (override === undefined) return { id: local, source: 'location' };
  if (!(override in NAME_CULTURES)) throw new Error('未知姓名文化分组');
  return { id: override, source: 'override' };
}

function generateName(rng: Rng, cultureId: NameCultureId, sex: BirthSex, era: EraBand): string {
  const culture = NAME_CULTURES[cultureId];
  const eraEntry = ERA_GIVEN[cultureId]?.[era];
  const eraPool = eraEntry
    ? sex === 'female'
      ? eraEntry.female
      : sex === 'male'
        ? eraEntry.male
        : [...eraEntry.male, ...eraEntry.female]
    : [];
  const basePool =
    sex === 'female'
      ? culture.female
      : sex === 'male'
        ? culture.male
        : [...culture.male, ...culture.female];
  const given = rng.pick(eraPool.length && rng.chance(0.45) ? eraPool : basePool);
  const family = rng.pick(culture.surnames);
  const name = culture.familyFirst
    ? `${family}${culture.separator}${given}`
    : `${given}${culture.separator}${family}`;
  return name.replace(/\s+/g, ' ').trim();
}

function settlementWeight(settlement: CreationSettlement): number {
  const population =
    settlement.sourcePopulation ??
    (settlement.cohort
      ? settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders
      : 0);
  return Math.max(1, Math.sqrt(Math.max(0, population)));
}

function selectBirthplace(
  world: CreationWorld,
  rng: Rng,
  overrideId: string | undefined,
): CreationSettlement {
  if (overrideId !== undefined) {
    if (typeof overrideId !== 'string' || overrideId.length > 64) throw new Error('出生地 ID 无效');
    const site = world.settlements.find((settlement) => settlement.id === overrideId);
    if (!site) throw new Error(`世界中没有出生地：${overrideId}`);
    return site;
  }
  const all = world.settlements.filter((settlement) => !!settlement.id && !!settlement.name);
  const populated = all.filter((settlement) => {
    if (!settlement.cohort) return true;
    return settlement.cohort.children + settlement.cohort.adults + settlement.cohort.elders > 0;
  });
  const candidates = populated.length ? populated : all;
  if (!candidates.length) throw new Error('当前世界没有可用的出生地点');
  return pickWeighted(rng, candidates, settlementWeight);
}

function buildBirthplace(
  site: CreationSettlement,
  rng: Rng,
  localCultureId: NameCultureId,
  context: Readonly<Record<string, string | number>>,
): BirthplaceDraft {
  const reasonTemplate = rng.pick(BIRTHPLACE_REASONS);
  return {
    locationId: site.id,
    locationName: site.name,
    localCultureId,
    localCultureLabel: NAME_CULTURES[localCultureId].label,
    ...(site.polityId ? { polityId: site.polityId } : {}),
    ...(site.regionId ? { regionId: site.regionId } : {}),
    ...(typeof site.lon === 'number' ? { lon: site.lon } : {}),
    ...(typeof site.lat === 'number' ? { lat: site.lat } : {}),
    reason: render(reasonTemplate, context),
    status: 'preference',
  };
}

function selectFamily(
  rng: Rng,
  mode: CreationMode,
  era: EraBand,
  kindOverride: FamilyBackgroundKind | undefined,
  context: Readonly<Record<string, string | number>>,
): FamilyBackgroundDraft {
  const template =
    kindOverride !== undefined
      ? FAMILY_BACKGROUNDS.find((item) => item.kind === kindOverride)
      : pickWeighted(rng, eraFilter(FAMILY_BACKGROUNDS, era), (item) =>
          mode === 'legendary' ? item.legendaryWeight : item.ordinaryWeight,
        );
  if (!template) throw new Error(`未知家庭背景倾向：${String(kindOverride)}`);
  return {
    kind: template.kind,
    label: template.label,
    summary: render(template.summary, context),
    wealth: template.wealth,
    stability: round2(template.stability),
    pressure: round2(template.pressure),
    tags: [...template.tags],
    status: 'preference',
  };
}

function jitterStat(rng: Rng, base: number): number {
  return round2(clamp(base + rng.float(-0.045, 0.045), 0.2, 0.8));
}

function selectPersonality(
  rng: Rng,
  mode: CreationMode,
  idOverride: PersonalityTendencyId | undefined,
): PersonalityDraft {
  const template =
    idOverride !== undefined
      ? PERSONALITY_TENDENCIES.find((item) => item.kind === idOverride)
      : pickWeighted(rng, PERSONALITY_TENDENCIES, (item) =>
          mode === 'legendary' ? item.legendaryWeight : item.ordinaryWeight,
        );
  if (!template) throw new Error(`未知性格倾向：${String(idOverride)}`);
  return {
    tendency: template.kind,
    label: template.label,
    summary: template.summary,
    values: {
      care: jitterStat(rng, template.values.care),
      ambition: jitterStat(rng, template.values.ambition),
      tradition: jitterStat(rng, template.values.tradition),
    },
    traits: {
      openness: jitterStat(rng, template.traits.openness),
      conscientiousness: jitterStat(rng, template.traits.conscientiousness),
      extraversion: jitterStat(rng, template.traits.extraversion),
      agreeableness: jitterStat(rng, template.traits.agreeableness),
      neuroticism: jitterStat(rng, template.traits.neuroticism),
    },
  };
}

function selectSecret(
  rng: Rng,
  mode: CreationMode,
  era: EraBand,
  kindOverride: SecretKind | undefined,
  context: Readonly<Record<string, string | number>>,
): SecretDraft {
  const template =
    kindOverride !== undefined
      ? SECRETS.find((item) => item.kind === kindOverride)
      : pickWeighted(rng, eraFilter(SECRETS, era), (item) =>
          mode === 'legendary' ? item.legendaryWeight : item.ordinaryWeight,
        );
  if (!template) throw new Error(`未知秘密/执念：${String(kindOverride)}`);
  const intensity = round2(
    clamp(
      template.baseIntensity * (mode === 'legendary' ? 1.1 : 0.92) + rng.float(-0.06, 0.06),
      0.05,
      0.99,
    ),
  );
  return {
    kind: template.kind,
    form: template.form,
    title: template.title,
    detail: render(template.detail, context),
    intensity,
    visibility: 'private',
  };
}

function selectDestinyHook(
  rng: Rng,
  mode: CreationMode,
  era: EraBand,
  kindOverride: DestinyHookKind | undefined,
  context: Readonly<Record<string, string | number>>,
): DestinyHookDraft {
  const template =
    kindOverride !== undefined
      ? DESTINY_HOOKS.find((item) => item.kind === kindOverride)
      : pickWeighted(rng, eraFilter(DESTINY_HOOKS, era), (item) =>
          mode === 'legendary' ? item.legendaryWeight : item.ordinaryWeight,
        );
  if (!template) throw new Error(`未知命运钩子：${String(kindOverride)}`);
  // Legendary widens the same premise a little; it does not make the premise true.
  const severity = round2(clamp(template.severity + (mode === 'legendary' ? 0.05 : -0.02), 0, 1));
  return {
    kind: template.kind,
    title: template.title,
    detail: render(template.detail, context),
    omen: render(template.omen, context),
    severity,
    promise: round2(template.promise),
    tags: [...template.tags],
    status: 'premise',
  };
}

function selectBodyNote(
  rng: Rng,
  mode: CreationMode,
  era: EraBand,
  overrideText: string | undefined,
  context: Readonly<Record<string, string | number>>,
): { text: string; severity: number } {
  const candidates = eraFilter(BODY_NOTES, era);
  const primary = pickWeighted(rng, candidates, () => 1);
  const secondary =
    rng.chance(mode === 'legendary' ? 0.35 : 0.18) && candidates.length > 1
      ? rng.pick(candidates.filter((item) => item !== primary))
      : undefined;
  const generated = [primary.text, secondary?.text].filter(Boolean).join(' ');
  return {
    text: overrideText ?? render(clip(generated, 300), context),
    severity: Math.min(1, primary.severity + (secondary?.severity ?? 0) * 0.35),
  };
}

function generateHealth(rng: Rng, mode: CreationMode, bodySeverity: number): number {
  // Newborn vitality prior, not an adult health score. The previous uniform
  // base made "偏弱" far too common. This bands the roll so ordinary lives are
  // mostly ordinary/healthy while severe frailty remains a real minority.
  // These are explicit heuristics, not claims of exact 1900 vital statistics.
  const roll = rng.next();
  let base: number;
  if (mode === 'legendary') {
    if (roll < 0.04) base = 0.25 + (roll / 0.04) * 0.2;
    else if (roll < 0.16) base = 0.45 + ((roll - 0.04) / 0.12) * 0.2;
    else if (roll < 0.52) base = 0.65 + ((roll - 0.16) / 0.36) * 0.17;
    else if (roll < 0.84) base = 0.82 + ((roll - 0.52) / 0.32) * 0.13;
    else base = 0.95 + ((roll - 0.84) / 0.16) * 0.05;
  } else if (roll < 0.015) base = 0.28 + (roll / 0.015) * 0.17;
  else if (roll < 0.1) base = 0.45 + ((roll - 0.015) / 0.085) * 0.2;
  else if (roll < 0.58) base = 0.65 + ((roll - 0.1) / 0.48) * 0.17;
  else if (roll < 0.9) base = 0.82 + ((roll - 0.58) / 0.32) * 0.13;
  else base = 0.95 + ((roll - 0.9) / 0.1) * 0.05;
  return round2(clamp(base - bodySeverity * 0.12 + rng.float(-0.01, 0.01), 0.2, 1));
}

function computeFate(
  rng: Rng,
  mode: CreationMode,
  family: FamilyBackgroundDraft,
  hook: DestinyHookDraft,
): FateDraft {
  const profile = MODE_PROFILES[mode];
  const variance = round2(clamp(profile.variance + rng.float(-0.06, 0.06), 0.05, 0.98));
  const hardship = round2(
    clamp(
      profile.hardship * 0.55 +
        hook.severity * 0.25 +
        family.pressure * 0.2 +
        rng.float(-0.04, 0.04),
      0,
      1,
    ),
  );
  const promise = round2(
    clamp(
      profile.promise * 0.45 +
        hook.promise * 0.35 +
        (1 - family.pressure) * 0.2 +
        rng.float(-0.04, 0.04),
      0,
      1,
    ),
  );
  const certainty = round2(
    clamp(profile.certainty - variance * 0.25 + rng.float(-0.04, 0.04), 0.05, 0.95),
  );
  return {
    variance,
    hardship,
    promise,
    certainty,
    note:
      mode === 'legendary'
        ? '模式只放大随机振幅与极端素材的权重；传奇不是必胜，也不保证任何结局。'
        : '普通模式不提供保护，也不保证平安；世界仍会依据真实因果裁定结局。',
  };
}

export function generateRichBirthDraft(
  world: CreationWorld,
  options: RichBirthOptions = {},
): RichBirthDraft {
  if (!world || !Array.isArray(world.settlements))
    throw new Error('生成人物草案需要一个包含 settlements 的世界');
  const baseSeed = options.seed ?? world.seed;
  const effectiveSeed =
    options.nonce === undefined ? baseSeed : `${baseSeed}#${String(options.nonce)}`;
  const overrides = options.overrides ?? {};

  const mode = resolveMode(makeRng(effectiveSeed, 'mode'), overrides.mode);
  const era = eraForWorld(world);
  const site = selectBirthplace(
    world,
    makeRng(effectiveSeed, 'place'),
    overrides.preferredLocationId,
  );
  const localCultureId = inferNameCulture(site);
  const cultureChoice = resolveCulture(overrides.cultureId, localCultureId);
  const culture = NAME_CULTURES[cultureChoice.id];
  const sex = resolveSex(makeRng(effectiveSeed, 'sex'), overrides.sex);
  const name =
    overrides.name !== undefined
      ? cleanOverrideText(overrides.name, 32, '姓名')
      : generateName(makeRng(effectiveSeed, 'name'), cultureChoice.id, sex, era.band);

  const context = {
    name,
    place: site.name,
    era: era.label,
    ta: sex === 'female' ? '她' : sex === 'male' ? '他' : '这个孩子',
  };

  const body = selectBodyNote(
    makeRng(effectiveSeed, 'body'),
    mode,
    era.band,
    overrides.bodyNote !== undefined
      ? cleanOverrideText(overrides.bodyNote, 300, '身体备注')
      : undefined,
    context,
  );
  const health =
    overrides.health !== undefined
      ? round2(clamp(finiteNumber(overrides.health, 0.9), 0.2, 1))
      : generateHealth(makeRng(effectiveSeed, 'health'), mode, body.severity);
  const wish =
    overrides.wish !== undefined
      ? cleanOverrideText(overrides.wish, 1000, '自由愿望')
      : render(rngPickWish(makeRng(effectiveSeed, 'wish')), context);

  const appearance = mergeAppearance(
    generateAppearance(makeRng(effectiveSeed, 'appearance'), sex, mode),
    overrides.appearance,
  );
  const familyBackground = selectFamily(
    makeRng(effectiveSeed, 'family'),
    mode,
    era.band,
    overrides.familyBackgroundKind,
    context,
  );
  const personality = selectPersonality(
    makeRng(effectiveSeed, 'personality'),
    mode,
    overrides.personalityTendency,
  );
  const secret = selectSecret(
    makeRng(effectiveSeed, 'secret'),
    mode,
    era.band,
    overrides.secretKind,
    context,
  );
  const destinyHook = selectDestinyHook(
    makeRng(effectiveSeed, 'hook'),
    mode,
    era.band,
    overrides.destinyHookKind,
    context,
  );
  const fate = computeFate(makeRng(effectiveSeed, 'fate'), mode, familyBackground, destinyHook);

  return {
    schema: 'creation/rich-birth-draft@1',
    seed: effectiveSeed,
    mode,
    name,
    sex,
    health,
    bodyNote: body.text,
    wish,
    culture: {
      id: culture.id,
      label: culture.label,
      region: culture.region,
      source: cultureChoice.source,
      diaspora: cultureChoice.id !== localCultureId,
    },
    birthplace: buildBirthplace(
      site,
      makeRng(effectiveSeed, 'place-reason'),
      localCultureId,
      context,
    ),
    appearance,
    era,
    familyBackground,
    personality,
    secret,
    destinyHook,
    fate,
    provenance: {
      canonical: false,
      note: '这是带种子的创作草案，不是世界事实。家庭、出生地可行性、能力与结局仍由模拟器在出生编译时依据世界状态裁定。',
    },
  };
}

function rngPickWish(rng: Rng): string {
  return pickWeighted(rng, WISHES, () => 1).text;
}

/* ------------------------------------------------------------------ */
/* Rerolling and mapping                                               */
/* ------------------------------------------------------------------ */

export type RichBirthRerollScope =
  'all' | 'name' | 'appearance' | 'wish' | 'family' | 'personality' | 'secret' | 'destinyHook';

/**
 * Re-roll one part of an existing draft. A new seed is derived from the same
 * caller seed plus `nonce`, so the result is reproducible. Other fields are
 * copied from the previous draft, which is how the UI can offer "只换名字" or
 * "只换命运钩子" without silently changing the rest of the character.
 *
 * Pass a changing nonce (for example a button-click counter). Without one the
 * operation is intentionally idempotent; using wall-clock or a non-seeded
 * global RNG here would break reproducible drafts.
 */
export function rerollRichBirthDraft(
  world: CreationWorld,
  previous: RichBirthDraft,
  scope: RichBirthRerollScope,
  options: {
    readonly seed?: string;
    readonly nonce?: string | number;
    readonly overrides?: RichBirthOverrides;
  } = {},
): RichBirthDraft {
  const seed = options.seed ?? previous.seed;
  const keepContext = scope !== 'all';
  const fresh = generateRichBirthDraft(world, {
    seed,
    nonce: options.nonce ?? `reroll:${scope}`,
    overrides: keepContext
      ? {
          mode: previous.mode,
          sex: previous.sex,
          preferredLocationId: previous.birthplace.locationId,
          cultureId: previous.culture.id,
          ...options.overrides,
        }
      : options.overrides,
  });
  if (scope === 'all') return fresh;
  const next: RichBirthDraft = {
    ...previous,
    seed: fresh.seed,
    culture: previous.culture,
    birthplace: previous.birthplace,
    era: previous.era,
    provenance: previous.provenance,
  };
  switch (scope) {
    case 'name':
      next.name = fresh.name;
      break;
    case 'appearance':
      next.appearance = fresh.appearance;
      break;
    case 'wish':
      next.wish = fresh.wish;
      break;
    case 'family':
      next.familyBackground = fresh.familyBackground;
      break;
    case 'personality':
      next.personality = fresh.personality;
      break;
    case 'secret':
      next.secret = fresh.secret;
      break;
    case 'destinyHook':
      next.destinyHook = fresh.destinyHook;
      next.fate = fresh.fate;
      break;
  }
  return next;
}

/**
 * Safe projection to today's BirthRequest.
 *
 * Only canonical intake fields are mapped. Rich fields are intentionally not
 * stuffed into `wish` or `body`: doing so would present a draft preference as
 * an already-established family fact. A future optional BirthRequest extension
 * (or the birth compiler's proposal) can carry family/personality/secret/hook
 * as untrusted hints; the simulator must still choose the real family and
 * decide every consequence.
 */
export function toBirthRequest(draft: RichBirthDraft): BirthRequest {
  return {
    name: draft.name,
    sex: draft.sex,
    health: draft.health,
    body: draft.bodyNote,
    appearance: {
      skin: draft.appearance.skin,
      hair: draft.appearance.hair,
      clothes: draft.appearance.clothes,
      doll: { ...draft.appearance.doll },
    },
    wish: draft.wish,
    preferredLocationId: draft.birthplace.locationId,
    lifeMode: draft.mode,
  };
}

export type CreationCatalogStats = {
  cultures: number;
  surnames: number;
  givenNames: number;
  nameCombinations: number;
  wishes: number;
  secrets: number;
  destinyHooks: number;
  familyBackgrounds: number;
  personalityTendencies: number;
  bodyNotes: number;
  birthplaceReasons: number;
  totalNarrativeCombinations: number;
};

/** Counts used by tests and by the UI to prove the pool is more than a handful of templates. */
export function creationCatalogStats(): CreationCatalogStats {
  const cultures = Object.values(NAME_CULTURES);
  const surnames = cultures.reduce((sum, culture) => sum + culture.surnames.length, 0);
  const givenNames = cultures.reduce(
    (sum, culture) => sum + culture.male.length + culture.female.length,
    0,
  );
  const nameCombinations = cultures.reduce(
    (sum, culture) => sum + culture.surnames.length * (culture.male.length + culture.female.length),
    0,
  );
  const totalNarrativeCombinations =
    WISHES.length *
    SECRETS.length *
    DESTINY_HOOKS.length *
    FAMILY_BACKGROUNDS.length *
    PERSONALITY_TENDENCIES.length *
    BODY_NOTES.length;
  return {
    cultures: cultures.length,
    surnames,
    givenNames,
    nameCombinations,
    wishes: WISHES.length,
    secrets: SECRETS.length,
    destinyHooks: DESTINY_HOOKS.length,
    familyBackgrounds: FAMILY_BACKGROUNDS.length,
    personalityTendencies: PERSONALITY_TENDENCIES.length,
    bodyNotes: BODY_NOTES.length,
    birthplaceReasons: BIRTHPLACE_REASONS.length,
    totalNarrativeCombinations,
  };
}

/** Stable list for a culture picker in the creation UI. */
export function availableNameCultures(): { id: NameCultureId; label: string; region: string }[] {
  return Object.values(NAME_CULTURES).map(({ id, label, region }) => ({ id, label, region }));
}
