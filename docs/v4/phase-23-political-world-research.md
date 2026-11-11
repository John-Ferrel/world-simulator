# Phase 23 — Political World Research Brief

Date: 2026-11-12  
Purpose: source-grounded reference for `packages/v4/political-world/data.ts`; not world state or a scripted timeline. The simulator may diverge; dates are metadata.

Notation: ids are aliases; `data-*.ts` uses `polity-<slug>-<year>` (e.g., `polity-austria-hungary-1912`); map 1:1. 执=ruling, 主=major, 反=opposition, 禁=banned, 联=coalition. ISO3 lists are comma-separated; `(+...)` = partial/contested overlay.

Gaps: 1918 Finland/Baltics, 1938 Austria, 1955 India.

Snapshots are anchored mid-1912, November 1918, late 1938, late 1945, and late 1955; use the month-specific notes in §7 for transitions.

## 1. 1912 — Dual Monarchy and the Balkan powder keg

| id | 中文名 (English) | 时期/政体/首都/政府 | 元首 | 政府首脑 | 政党（意识形态；地位） | 矛盾 | 盟友/对手 | ISO3 |
|---|---|---|---|---|---|---|---|---|
| ah-1912 | 奥匈帝国 (Austria-Hungary) | 1867–1918；双元帝国；维也纳/布达佩斯；共同君主、军队与外交，两套议会 | 弗朗茨·约瑟夫一世，皇帝-国王（1848–1916） | 施蒂尔格克，奥地利总理（1911–16）；卢卡奇，匈牙利总理（1912–13）；外交:贝希托尔德（1912–15） | 基督教社会党（天主教；主/支持政府）、社会民主党（社会民主；主反）、德意志民族联盟（民族/自由；最大党团）、捷克/波兰/南斯拉夫俱乐部（民族；反）；匈牙利:民族工作党（自由保守；执）、独立与48党（民族；反） | 双元制；民族冲突；巴尔干危机；匈牙利选举权 | 盟:德国,意大利；敌:俄国,塞尔维亚 | AUT,HUN,CZE,SVK,SVN,HRV,BIH(+POL,UKR,ROU,SRB) |
| de-1912 | 德意志帝国 (German Empire) | 1871–1918；联邦君主国；柏林；皇帝、首相、帝国议会，普鲁士主导 | 威廉二世，皇帝（1888–1918） | 贝特曼-霍尔韦格，首相（1909–17） | 社会民主党（社会民主；110席，反）、中央党（天主教；91席，主）、民族自由党（民族自由；45席，支持政府）、保守党（农业-君主；43席，支持政府）、进步人民党（左翼自由；42席，反） | 海军竞赛；普鲁士三级选举；阿尔萨斯-洛林；波兰少数民族 | 盟:奥匈,意大利；敌:法国,俄国,英国 | DEU(+POL,FRA,LTU,RUS) |
| ru-1912 | 俄罗斯帝国 (Russian Empire) | 1721–1917；专制帝国；圣彼得堡；沙皇、大臣会议、国家杜马 | 尼古拉二世，皇帝（1894–1917） | 科科弗佐夫，大臣会议主席（1911–14） | 立宪民主党（自由；反）、十月党（中右；主）、社会革命党（农业社会主义；反）、俄国社会民主工党（马克思主义；分裂、地下）、俄罗斯人民联盟（极右；保皇） | 杜马与专制；勒拿河惨案与劳工；少数民族；巴尔干竞争 | 盟:法国,英国（协约）；敌:德国,奥匈,奥斯曼 | RUS,UKR,BLR,POL,FIN,EST,LVA,LTU,MDA |
| tr-1912 | 奥斯曼帝国 (Ottoman Empire) | 1299–1922；帝国；君士坦丁堡；苏丹、大维齐尔、统一与进步委员会主导的议会 | 穆罕默德五世，苏丹-哈里发（1909–18） | 赛义德帕夏（1911–1912.7）→穆赫塔尔帕夏（1912.7–10）→卡米尔帕夏（1912.10–1913.1） | 统一与进步委员会（青年土耳其，民族现代化；执）、自由与协约党（自由；反）、达什纳克（亚美尼亚；反）、希腊/保加利亚米勒特政党、阿拉伯俱乐部 | 委员会与自由派；巴尔干同盟；阿拉伯/民族少数；利比亚战后 | 盟:德国（上升）；敌:意大利,巴尔干同盟,俄国 | TUR,SYR,IRQ,JOR,ISR,LBN,SAU,YEM(+GRC,BGR,SRB,ALB,MKD) |
| uk-1912 | 大不列颠及爱尔兰联合王国 (United Kingdom) | 1801–1922；议会君主国；伦敦；内阁对下院负责 | 乔治五世，国王（1910–36） | 阿斯奎斯，首相（1908–16），自由党 | 自由党（执）、保守党/统一党（反）、工党（42席；上升）、爱尔兰议会党（自治）、妇女社会政治联盟（选举权激进） | 爱尔兰自治；妇女参政；劳工动荡；海军竞赛 | 盟:法国,俄国；敌:德国 | GBR,IRL（殖民叠层省略） |
| fr-1912 | 法兰西第三共和国 (French Third Republic) | 1870–1940；议会共和国；巴黎；总统与部长会议 | 法利埃，总统（1906–13） | 普恩加莱，总理（1912.1–1913.1） | 激进社会党（中左；主/支持政府）、共和民主联盟（中右；支持政府）、工人国际法国支部（社会主义；反）、法兰西行动（保皇；极右） | 德国威胁/阿尔萨斯；摩洛哥；世俗与天主教；劳工 | 盟:俄国,英国；敌:德国 | FRA（殖民叠层省略） |
| it-1912 | 意大利王国 (Kingdom of Italy) | 1861–1946；议会君主国；罗马；国王、首相、议会 | 维托里奥·埃马努埃莱三世，国王（1900–46） | 焦利蒂，首相（1911–14） | 自由联盟（执）、意大利社会党（社会主义；反）、激进党（支持）、天主教选举联盟（支持/弃权）、民族主义协会（右） | 利比亚战争；选举权改革；南北差距；对奥领土主义 | 盟:德国,奥匈（三国同盟）；敌:奥斯曼,奥匈（特伦托/的里雅斯特） | ITA(+LBY,ERI,SOM) |
| rs-1912 | 塞尔维亚王国 (Kingdom of Serbia) | 1882–1918；宪政君主国；贝尔格莱德；人民激进党主导 | 彼得一世，国王（1903–18） | 帕希奇，总理（1912–18，有间断） | 人民激进党（执）、独立激进党（反）、自由党（反）、社会民主党（小）、黑手社（军人秘密组织） | 亚得里亚海出海口/阿尔巴尼亚；波斯尼亚/南斯拉夫统一；军队与激进党；马其顿 | 盟:俄国,巴尔干同盟；敌:奥匈,奥斯曼 | SRB(+MKD；主张 BIH,HRV) |
| bg-1912 | 保加利亚王国 (Kingdom of Bulgaria) | 1908–1946；宪政君主国；索菲亚；沙皇、首相、国民议会 | 斐迪南一世，沙皇（1887–1918） | 盖绍夫，首相（1911–13） | 人民党（执联盟）、进步自由党（联）、自由党/拉多斯拉沃夫（反）、农民联盟（主）、社会民主党（紧密派） | 马其顿；巴尔干同盟协调；奥斯曼边界；对外站队 | 盟:巴尔干同盟；敌:奥斯曼；后敌:塞尔维亚,希腊 | BGR(+MKD,GRC) |
| ro-1912 | 罗马尼亚王国 (Kingdom of Romania) | 1881–1947；宪政君主国；布加勒斯特；国王、首相、有限选举 | 卡罗尔一世，国王（1866–1914） | 马约雷斯库，首相（1912–14），保守党 | 保守党（执）、国家自由党（反）、保守民主党、社会民主党、农民运动 | 特兰西瓦尼亚；农民问题；多布罗加/保加利亚；石油与外资 | 盟:三国同盟（秘密），公开亲协约；敌:保加利亚,匈牙利 | ROU(+MDA；主张特兰西瓦尼亚) |
| gr-1912 | 希腊王国 (Kingdom of Greece) | 1832–1924；宪政君主国；雅典；国王、首相、议会 | 乔治一世，国王（1863–1913） | 韦尼泽洛斯，首相（1910–15） | 自由党（执）、人民党（反）、社会主义劳工党、军事同盟 | 马其顿/克里特；巴尔干同盟；奥斯曼海军；王朝与韦尼泽洛斯 | 盟:巴尔干同盟；敌:奥斯曼；后敌:保加利亚 | GRC(+TUR,ALB,MKD) |
| us-1912 | 美利坚合众国 (United States) | 1776–；联邦共和国；华盛顿；总统、国会、最高法院 | 塔夫脱，总统（1909–13） | 无（总统兼政府首脑） | 共和党（执）、民主党（反）、进步党/公麋党（1912）、社会党、禁酒党 | 1912年大选；托拉斯/进步主义；种族隔离；墨西哥；中立 | 盟:无正式；英国非正式；敌:墨西哥,日本（太平洋） | USA(+PHL,CUB) |
| jp-1912 | 大日本帝国 (Empire of Japan) | 1868–1947；宪政君主国；东京；天皇、元老、内阁、帝国议会 | 明治天皇（1867–1912）→大正天皇（1912–26） | 西园寺公望，首相（1911–1912.12） | 立宪政友会（执）、立宪国民党（反）、元老/军部（议会外）、社会主义者（小） | 大正政变；陆海军预算；朝鲜/中国；不平等条约 | 盟:英国（英日同盟）；敌:俄国,德国,中国 | JPN(+KOR,TWN；在华势力范围) |
| cn-1912 | 清帝国→中华民国 (Qing Empire → Republic of China) | 1644–1912/1912–；帝国→共和国；北京/南京；清廷崩溃、临时共和、北洋政府 | 溥仪，宣统帝（1908–12）；孙中山，临时大总统（1912.1–3）；袁世凯，总统（1912–16） | 袁世凯，总理/总统（1911–16）；唐绍仪，总理（1912） | 同盟会/国民党（革命；临时执/后反）、北洋集团（袁世凯；执）、立宪派（地方精英）、清室遗老（反） | 南北分裂；袁世凯集权；外债/租界；蒙古/西藏 | 盟:无强援；敌:日本,俄国,英国（压力） | CHN(+MNG,TWN) |

**What changed from 1900:** mass male suffrage (1907), the 1908 Bosnian annexation and the 1911–12 Italo-Turkish War made foreign policy a street-level subject. Vienna is a mass-party city; the emperor still chooses ministers, but the Reichsrat and party press set the temperature.

### 1.1 News anchors

| date | 标题 | 摘要（40–80字） | scope | category | source |
|---|---|---|---|---|---|
| 1912-10 | 第一次巴尔干战争爆发 | 1912年10月，保加利亚、塞尔维亚、希腊和黑山组成的巴尔干同盟向奥斯曼帝国开战。巴尔干领土与民族问题急剧升温，奥匈帝国担心塞尔维亚向亚得里亚海扩张，维也纳的报纸和咖啡馆充满战争传闻。 | regional | war | https://en.wikipedia.org/wiki/First_Balkan_War |
| 1912-11 | 阿尔巴尼亚宣布独立 | 1912年11月28日，伊斯梅尔·捷马利在发罗拉宣布阿尔巴尼亚独立。奥匈帝国支持这一举动，以阻止塞尔维亚获得亚得里亚海出海口；巴尔干战争后的边界安排成为维也纳外交的焦点。 | regional | diplomacy | https://en.wikipedia.org/wiki/Albanian_Declaration_of_Independence |
| 1912-04 | 泰坦尼克号沉没 | 1912年4月14日至15日，泰坦尼克号在北大西洋撞上冰山沉没，约1500人遇难。灾难占据欧洲报纸头条，也让远洋旅行、阶级舱位与移民航线成为维也纳市民谈论的话题。 | global | society | https://en.wikipedia.org/wiki/Titanic |
| 1912-04 | 勒拿河惨案震动俄国 | 1912年4月，俄国西伯利亚勒拿河金矿工人罢工遭军队开枪，死亡人数说法不一。事件激起俄国城市与杜马中的抗议，也让维也纳社会民主党人在五一集会上谈论俄国工人的处境。 | global | politics | https://en.wikipedia.org/wiki/Lena_massacre |
| 1912-07 | 明治天皇去世，大正时代开始 | 1912年7月30日，明治天皇去世，皇太子嘉仁即位，年号改为大正。日本政党政治与军部势力的角力进入新阶段，东亚局势也因中国革命而更加动荡。 | global | politics | https://en.wikipedia.org/wiki/Emperor_Taish%C5%8D |
| 1912-11 | 威尔逊当选美国总统 | 1912年11月，民主党人伍德罗·威尔逊击败寻求连任的塔夫脱和进步党候选人罗斯福，当选美国总统。共和党分裂、进步主义改革与欧洲战争阴影成为维也纳评论员关注的重点。 | global | politics | https://en.wikipedia.org/wiki/1912_United_States_presidential_election |

### 1.2 Personal drama hooks

1. 基督教社会党的区议员用冬季煤票换取印刷工遗孀在党集会上的支持。
2. 社会民主党组织者把罢工基金藏进缝纫女工的公寓，警察随即搜查整栋楼。
3. 一名捷克女仆在巴尔干危机后被雇主怀疑“不忠”，邻居偷听她的电话。
4. 德语民族主义学生在反犹集会后殴打卖报的犹太少年，巡警选择视而不见。
5. 一名预备役军人收到巴尔干动员令，未婚妻必须在婚礼与移民船票之间选择。

## 2. 1918 — Collapse, revolution, new states

| id | 中文名 (English) | 时期/政体/首都/政府 | 元首 | 政府首脑 | 政党（意识形态；地位） | 矛盾 | 盟友/对手 | ISO3 |
|---|---|---|---|---|---|---|---|---|
| at-1918 | 德意志奥地利共和国 (Republic of German-Austria) | 1918–19；共和国；维也纳；临时国民议会、社会民主党主导 | 卡尔·伦纳，国务总理（1918–20）；无独立总统 | 卡尔·伦纳，总理（1918–20） | 社会民主党（执）、基督教社会党（联/主）、德意志民族党（反）、共产党（小） | 帝国解体；粮食/流感；德奥合并问题；民族委员会 | 盟:无；敌:继承国（边界）,意大利（南蒂罗尔） | AUT(+CZE,SVN) |
| hu-1918 | 匈牙利民主共和国 (Hungarian Democratic Republic) | 1918–19；共和国；布达佩斯；革命联合政府 | 卡罗利·米哈伊，总理（1918.10.31–11.16），后总统（11.16–1919.3） | 卡罗利，总理（1918.10–11） | 独立与48党/卡罗利党（执）、社会民主党（联）、激进党（联）、共产党（非法，1918.11成立） | 停战条件；土地改革；斯洛伐克/罗马尼亚/塞尔维亚占领；苏维埃诱惑 | 盟:无；敌:继承国,协约国 | HUN(+SVK,ROU,SRB,HRV) |
| de-1918 | 德意志帝国→魏玛共和国 (German Empire → Weimar Republic) | 1871–1918/1918–19；君主国→共和国；柏林；革命、人民代表委员会、停战 | 威廉二世（至1918.11.9）；艾伯特，人民代表委员会主席（1918.11–1919.2） | 马克斯·冯·巴登（1918.10–11.9）；艾伯特（11.9–1919.2） | 社会民主党（执）、独立社会民主党（联后反）、共产党（1918.12成立）、中央党（联）、德国民主党（联）、德国民族人民党（反） | 停战；斯巴达克起义；魏玛联盟；普鲁士改革 | 盟:无；敌:协约国,波兰,苏俄 | DEU(+POL,FRA) |
| ru-1918 | 苏维埃俄国 (Soviet Russia) | 1917–22；社会主义共和国；彼得格勒/莫斯科；布尔什维克一党政府、内战 | 列宁，人民委员会主席（1917–24）；斯维尔德洛夫，全俄中央执行委员会主席（1917–19） | 列宁，人民委员会主席（1917–24） | 布尔什维克（执）、左翼社会革命党（联后反）、孟什维克（反）、白军（内战）、无政府主义者（马赫诺） | 内战；布列斯特和约；红色恐怖；协约国干涉 | 盟:无；敌:白军,协约国,波兰,波罗的海国家 | RUS(+UKR,BLR) |
| cs-1918 | 捷克斯洛伐克 (Czechoslovakia) | 1918–39；共和国；布拉格；议会共和国、国民议会 | 马萨里克，总统（1918–35） | 克拉马日，总理（1918–19） | 捷克斯洛伐克民族民主党（执）、农业党（联）、社会民主党（联）、德意志政党（反）、斯洛伐克人民党（反） | 对匈牙利/波兰/奥地利边界；德意志少数民族；斯洛伐克 | 盟:法国,南斯拉夫,罗马尼亚（小协约）；敌:匈牙利,苏俄 | CZE,SVK(+UKR) |
| yu-1918 | 塞尔维亚人、克罗地亚人和斯洛文尼亚人王国 (Kingdom of Serbs, Croats and Slovenes) | 1918–41；宪政君主国；贝尔格莱德；统一君主国、塞尔维亚王朝主导 | 亚历山大摄政王（1918–21） | 普罗蒂奇，总理（1918–19） | 激进党（执）、民主党（联）、克罗地亚农民党（反）、斯洛文尼亚人民党（联）、穆斯林组织 | 中央集权与联邦制；克罗地亚反对；君主制；边界 | 盟:法国,捷克斯洛伐克,罗马尼亚；敌:意大利,匈牙利,保加利亚 | SRB,HRV,SVN,BIH,MKD |
| pl-1918 | 波兰第二共和国 (Second Polish Republic) | 1918–39；共和国；华沙；议会共和国、毕苏斯基为国家元首 | 毕苏斯基，国家元首（1918–22） | 达申斯基（1918.11）；莫拉切夫斯基（1918–19） | 波兰社会党（执）、民族民主党（反）、农民党（联）、共产党（非法） | 边界（波森、加利西亚、西里西亚）；德莫夫斯基与毕苏斯基；犹太人；乌克兰 | 盟:法国,英国；敌:德国,苏俄,立陶宛,乌克兰 | POL(+UKR,BLR,LTU) |
| fi-1918 | 芬兰共和国 (Republic of Finland) | 1917–；共和国；赫尔辛基；议会共和国、内战与摄政 | 斯温胡武德，摄政（1918.5–12）；曼纳海姆，摄政（1918–19） | 帕西基维（1918.5–11）；英格曼（1918–19） | 社会民主党（内战后反）、民族联盟/白军（执）、农民联盟（联）、瑞典人民党（联） | 内战；德国与协约；语言；奥兰群岛 | 盟:德国（1918）；敌:苏俄,瑞典（奥兰） | FIN |
| balt-1918 | 爱沙尼亚/拉脱维亚/立陶宛 (Estonia/Latvia/Lithuania) | 1918–40；共和国；塔林/里加/维尔纽斯；民族委员会、德国占领与苏俄战争 | 帕茨（爱沙尼亚，总理1918–19）；乌尔马尼斯（拉脱维亚，总理1918–19）；斯梅托纳（立陶宛，委员会主席1917–19） | 见元首；联合内阁 | 农业/民族委员会（执）、社会民主党（联/反）、波罗的海德意志政党（主） | 独立与苏俄/德国；土地改革；少数民族 | 盟:协约国；敌:苏俄,德国 | EST,LVA,LTU |
| tr-1918 | 奥斯曼帝国 (Ottoman Empire) | 1299–1922；帝国；君士坦丁堡；停战、委员会崩溃、协约国占领 | 穆罕默德六世，苏丹-哈里发（1918–22） | 塔拉特帕夏（1917–1918.10）→伊泽特帕夏（10–11）→特夫菲克帕夏（11–1919.1） | 统一与进步委员会（解散/地下）、自由与协约党（1918.10后执）、土耳其民族主义者（上升）、亚美尼亚/希腊米勒特 | 停战；协约国占领；委员会问责；希腊登陆（1919） | 盟:德国（战败）；敌:协约国,希腊,亚美尼亚 | TUR,SYR,IRQ,JOR,ISR,LBN(+GRC,BGR,ALB,MKD) |
| uk-1918 | 大不列颠及爱尔兰联合王国 (United Kingdom) | 1801–1922；议会君主国；伦敦；联合政府、劳合·乔治 | 乔治五世，国王（1910–36） | 劳合·乔治，首相（1916–22） | 联合自由党（执）、保守党（联）、工党（反）、新芬党（反，1918.12胜选）、爱尔兰议会党（崩溃） | 爱尔兰；劳工；帝国；和平条件 | 盟:法国,美国；敌:德国,苏俄 | GBR,IRL |
| fr-1918 | 法兰西第三共和国 (French Third Republic) | 1870–1940；共和国；巴黎；议会共和国、克列孟梭战时政府 | 普恩加莱，总统（1913–20） | 克列孟梭，总理（1917–20） | 激进社会党（执）、共和民主联盟（联）、工人国际法国支部（反）、法兰西行动（反） | 克列孟梭战争目标；德国；俄国；殖民地军队 | 盟:英国,美国；敌:德国 | FRA |
| it-1918 | 意大利王国 (Kingdom of Italy) | 1861–1946；宪政君主国；罗马；议会君主国、奥兰多战时政府 | 维托里奥·埃马努埃莱三世，国王（1900–46） | 奥兰多，总理（1917–19） | 自由党（执）、意大利社会党（反）、天主教人民党（1919成立）、民族主义者（主） | “残缺的胜利”；阜姆；退伍军人；社会党极大化 | 盟:协约国；敌:奥匈（战败）,南斯拉夫（亚得里亚海） | ITA |
| us-1918 | 美利坚合众国 (United States) | 1776–；联邦共和国；华盛顿；总统制、威尔逊政府 | 威尔逊，总统（1913–21） | 无（总统兼政府首脑） | 民主党（执）、共和党（反，1918.11赢国会）、社会党、进步党 | 威尔逊主义；参议院；种族；劳工 | 盟:协约国；敌:德国,苏俄（意识形态） | USA |
| jp-1918 | 大日本帝国 (Empire of Japan) | 1868–1947；宪政君主国；东京；宪政君主国、原敬政党内阁 | 大正天皇（1912–26） | 寺内正毅（1916–1918.9）→原敬（1918–21） | 立宪政友会（执）、立宪国民党（反）、军部（议会外）、社会主义者（小） | 原敬内阁；政党政治；西伯利亚；中国 | 盟:英国；敌:德国,苏俄 | JPN(+KOR,TWN) |
| cn-1918 | 中华民国 (Republic of China) | 1912–49；共和国；北京；北洋政府、军阀派系 | 徐世昌，总统（1918–22） | 段祺瑞（1917–1918.10）→钱能训（1918–19） | 北洋政府/安福俱乐部（执）、直系（反）、国民党（南方政府）、共产党（1921起） | 南北分裂；军阀；外债；五四（1919） | 盟:无强援；敌:日本,俄国,英国（压力） | CHN |

**What changed from 1912:** four empires collapsed; Austria-Hungary dissolved into nation-states; Germany became a republic; Soviet Russia fought a civil war. Women entered the electorate, and influenza and hunger killed more than combat.

### 2.1 News anchors

| date | 标题 | 摘要（40–80字） | scope | category | source |
|---|---|---|---|---|---|
| 1918-11 | 第一次世界大战停战 | 1918年11月11日，德国与协约国在贡比涅森林签署停战协定，西线战事结束。维也纳在饥饿、流感与帝国瓦解中迎来停战，士兵、难民和阵亡通知同时涌回城市。 | global | war | https://en.wikipedia.org/wiki/Armistice_of_11_November_1918 |
| 1918-11 | 奥匈帝国签署停战协定 | 1918年11月3日，奥匈帝国在意大利帕多瓦附近的朱斯蒂别墅签署停战协定。哈布斯堡军队开始复员，维也纳的粮食供应、士兵返乡与帝国各民族的独立宣言交织在一起。 | regional | war | https://en.wikipedia.org/wiki/Armistice_of_Villa_Giusti |
| 1918-11 | 柏林革命与德皇退位 | 1918年11月9日，柏林爆发革命，社会民主党人谢德曼宣布共和国成立，德皇威廉二世退位。德国新政府面临停战、饥饿与左翼起义，维也纳的德语报纸密切追踪邻国局势。 | global | politics | https://en.wikipedia.org/wiki/German_revolution_of_1918%E2%80%931919 |
| 1918-10 | 捷克斯洛伐克宣布独立 | 1918年10月28日，布拉格民族委员会宣布捷克斯洛伐克独立，马萨里克随后当选总统。维也纳的捷克裔居民、士兵与公务员开始面临效忠选择，帝国议会中的捷克议员公开支持新国家。 | regional | politics | https://en.wikipedia.org/wiki/Czechoslovak_declaration_of_independence |
| 1918-12 | 塞尔维亚-克罗地亚-斯洛文尼亚王国成立 | 1918年12月1日，塞尔维亚的亚历山大摄政王宣布成立塞尔维亚人、克罗地亚人和斯洛文尼亚人王国。萨格勒布、卢布尔雅那与贝尔格莱德对中央集权与联邦制的分歧从一开始就存在。 | regional | politics | https://en.wikipedia.org/wiki/Creation_of_Yugoslavia |
| 1918-11 | 德意志奥地利共和国宣告成立 | 1918年11月12日，奥地利临时国民议会宣布成立德意志奥地利共和国，社会民主党人卡尔·伦纳出任总理。共和国希望与德国合并，但协约国与圣日耳曼条约将阻止这一计划。 | local | politics | https://en.wikipedia.org/wiki/Republic_of_German-Austria |
| 1918-10 | 流感第二波袭击维也纳 | 1918年秋，流感大流行的第二波袭击中欧，维也纳的医院、兵营和工人公寓挤满病人。战时饥饿、拥挤住房与医疗短缺放大了死亡，市政府与教会组织紧急救助。 | local | society | https://en.wikipedia.org/wiki/Spanish_flu |
| 1918-02 | 英国部分女性获得选举权 | 1918年2月6日，英国《人民代表法》生效，30岁以上、符合财产条件的女性获得投票权。维也纳的妇女运动者把这一消息视为战后社会秩序变化的信号，也开始争取自己的选举权。 | global | society | https://en.wikipedia.org/wiki/Representation_of_the_People_Act_1918 |

### 2.2 Personal drama hooks

1. 归来的战俘发现自己的维也纳公寓被难民占据，妻子在军工厂做工。
2. 妇女参政活动家竞选区委员会，被报纸嘲讽为“穿裙子的革命者”。
3. 捷克铁路职员必须在新的捷克斯洛伐克国籍与维也纳养老金之间选择。
4. 加利西亚犹太家庭逃离集体迫害抵达维也纳，却发现没有住房和食物。
5. 流感病房的护士为垂死的朋友偷吗啡，被同事发现。

## 3. 1938 — Anschluss, appeasement, persecution

| id | 中文名 (English) | 时期/政体/首都/政府 | 元首 | 政府首脑 | 政党（意识形态；地位） | 矛盾 | 盟友/对手 | ISO3 |
|---|---|---|---|---|---|---|---|---|
| de-1938 | 纳粹德国 (Nazi Germany) | 1933–45；独裁；柏林；元首国家、纳粹党垄断、恐怖机器 | 希特勒，元首兼总理（1934–45） | 希特勒（1934–45）；无独立总理 | 纳粹党（法西斯；执）、社会民主党/共产党（禁）、中央党（解散）、德国民族人民党（被吞并）、冲锋队/党卫队（国家辅助） | 合并奥地利；苏台德；重整军备；种族迫害 | 盟:意大利,日本；敌:英国,法国,苏联 | DEU,AUT,CZE(+POL,FRA,LTU) |
| at-1938 | 奥地利联邦国→东方边区 (Austria → Ostmark) | 1934–38/1938–45；威权国家→被吞并省；维也纳；祖国阵线→帝国总督 | 米克拉斯，总统（1928–38）；1938.3后希特勒为国家元首 | 舒施尼格（1934–1938.3.11）；赛斯-因夸特（3.11–13），后帝国总督 | 祖国阵线（奥地利法西斯；1938.3前执）、社会民主党/共产党（禁）、纳粹（非法→执） | 吞并；迫害；公投；奥地利认同 | 盟:意大利（至1938）,德国（3月后）；敌:西方盟国 | AUT |
| cs-1938 | 捷克斯洛伐克 (Czechoslovakia) | 1918–39；共和国；布拉格；议会共和国、苏台德危机、慕尼黑 | 贝奈斯，总统（1935–1938.10）；哈查（1938.11–39） | 霍扎（1935–1938.9）；西罗维（1938.9–12）；贝兰（1938–39） | 农业党（执）、社会民主党（联）、捷克斯洛伐克民族社会党（联）、共产党（主）、苏台德德意志人党（反）、斯洛伐克人民党（反） | 慕尼黑；苏台德；波兰/匈牙利要求；残存国家 | 盟:法国,苏联,小协约；敌:德国,波兰,匈牙利 | CZE,SVK(+UKR) |
| pl-1938 | 波兰第二共和国 (Second Polish Republic) | 1918–39；共和国；华沙；萨纳齐威权共和国、民族统一阵营 | 莫希齐茨基，总统（1926–39） | 斯克瓦德科夫斯基，总理（1936–39） | 民族统一阵营（执）、民族党（反）、农民党（反）、波兰社会党（反）、共产党（禁） | 德国威胁/但泽；萨纳齐；反犹；乌克兰 | 盟:法国,英国；敌:德国,苏联,立陶宛 | POL(+UKR,BLR,LTU) |
| hu-1938 | 匈牙利王国 (Kingdom of Hungary) | 1920–46；摄政；布达佩斯；威权摄政、霍尔蒂、修正主义 | 霍尔蒂·米克洛什，摄政（1920–44） | 达拉尼（1936–1938.5）；伊姆雷迪（1938–39） | 民族统一党（执）、箭十字党（法西斯；反/禁）、社会民主党（反）、小农党（反） | 修正主义；反犹法；箭十字；小协约 | 盟:德国,意大利；敌:捷克斯洛伐克,罗马尼亚,南斯拉夫 | HUN(+SVK,ROU,SRB,HRV) |
| yu-1938 | 南斯拉夫王国 (Kingdom of Yugoslavia) | 1918–41；宪政君主国；贝尔格莱德；王室独裁、保罗亲王摄政 | 保罗亲王，摄政（1934–41）；彼得二世，国王（1934–45） | 斯托亚迪诺维奇，总理（1935–39） | 南斯拉夫激进联盟（执）、克罗地亚农民党（反）、民主党（反）、共产党（禁） | 中央集权；克罗地亚问题；轴心压力；继承 | 盟:法国,小协约；敌:德国,意大利,匈牙利 | SRB,HRV,SVN,BIH,MKD |
| ro-1938 | 罗马尼亚王国 (Kingdom of Romania) | 1881–1947；宪政君主国；布加勒斯特；1938.2起王室独裁、民族复兴阵线 | 卡罗尔二世，国王（1930–40） | 戈加（1937.12–1938.2）；克里斯泰亚宗主教（1938–39） | 民族复兴阵线（执）、国家农民党（反）、国家自由党（反）、铁卫团（禁/镇压）、共产党（禁） | 王室独裁；铁卫团；领土修正主义；犹太人 | 盟:法国,英国；敌:德国,匈牙利,苏联 | ROU(+MDA) |
| su-1938 | 苏联 (USSR) | 1922–91；联邦社会主义国家；莫斯科；一党制、斯大林、大清洗 | 斯大林，总书记（1922–52）；加里宁，国家元首（1922–46） | 莫洛托夫，人民委员会主席（1930–41） | 苏联共产党（执）；无合法反对派；托派被清洗 | 大清洗；德国；集体安全；远东 | 盟:法国,捷克斯洛伐克（名义）；敌:德国,日本 | RUS,UKR,BLR(+EST,LVA,LTU,MDA) |
| uk-1938 | 大不列颠及北爱尔兰联合王国 (United Kingdom) | 1922–；议会君主国；伦敦；宪政君主国、张伯伦国民政府 | 乔治六世，国王（1936–52） | 张伯伦，首相（1937–40） | 保守党（执）、工党（反）、自由党（反）、共产党（小） | 绥靖；重整军备；帝国；张伯伦 | 盟:法国,美国（非正式）；敌:德国,意大利,日本 | GBR |
| fr-1938 | 法兰西第三共和国 (French Third Republic) | 1870–1940；共和国；巴黎；议会共和国、达拉第政府、人民阵线结束 | 勒布伦，总统（1932–40） | 达拉第，总理（1938–40） | 激进社会党（执）、工人国际法国支部（联/反）、法国共产党（主）、共和民主联盟（反）、法国人民党（法西斯；反） | 慕尼黑；人民阵线分裂；重整军备；殖民地 | 盟:英国,波兰；敌:德国,意大利 | FRA |
| it-1938 | 意大利王国 (Kingdom of Italy) | 1861–1946；法西斯独裁；罗马；法西斯一党制、墨索里尼 | 维托里奥·埃马努埃莱三世，国王（1900–46） | 墨索里尼，首相/领袖（1922–43） | 国家法西斯党（执）、天主教行动（容忍）、共产党/社会党（禁） | 帝国；西班牙；奥地利；地中海 | 盟:德国,日本；敌:英国,法国,苏联 | ITA(+LBY,ERI,SOM) |
| es-1938 | 西班牙国/西班牙共和国 (Nationalist Spain / Republican Spain) | 1936–39；内战政权；布尔戈斯/巴伦西亚；军事民族主义 vs 共和联盟 | 佛朗哥，国家元首（1936–75）；阿萨尼亚，总统（1936–39） | 佛朗哥（1938.1起兼总理）；内格林，共和派总理（1937–39） | 长枪党（民族区执）、卡洛斯派（联）、社会党/共产党/无政府工团（共和区）、共和派 | 内战；外国干涉；共和派分裂 | 盟:德国,意大利（民族派）；苏联（共和派）；敌:彼此 | ESP |
| tr-1938 | 土耳其共和国 (Republic of Turkey) | 1923–；共和国；安卡拉；一党制共和国、共和人民党、世俗民族主义 | 阿塔图尔克，总统（1923–1938.11.10）；伊诺努（1938–50） | 拜亚尔，总理（1937–39） | 共和人民党（执）；无合法反对派；库尔德/宗教运动被镇压 | 中立；海峡；巴尔干协约；阿塔图尔克继承 | 盟:英国,法国（谨慎）；敌:意大利,苏联（互疑） | TUR |
| us-1938 | 美利坚合众国 (United States) | 1776–；联邦共和国；华盛顿；总统制、新政、孤立主义 | 罗斯福，总统（1933–45） | 无（总统兼政府首脑） | 民主党（执）、共和党（反）、孤立主义者、共产党（小） | 孤立主义；新政；日本；难民 | 盟:英国,法国（非正式）；敌:德国,日本 | USA |
| jp-1938 | 大日本帝国 (Empire of Japan) | 1868–1947；宪政君主国；东京；军部内阁、天皇、议会、侵华战争 | 裕仁，天皇（1926–89） | 近卫文麿，首相（1937–39） | 立宪政友会、立宪民政党、军部（主导）、社会主义者（禁） | 中国战争；陆军派系；美国制裁；近卫 | 盟:德国,意大利；敌:中国,美国,苏联 | JPN(+KOR,TWN；占领中国部分) |
| cn-1938 | 中华民国 (Republic of China) | 1912–49；共和国；重庆；国民党一党政府、与中共统一战线 | 林森，主席（1931–43）；蒋介石，国民党领袖 | 孔祥熙，行政院长（1938–39）；蒋介石，军事委员会主席 | 国民党（执）、中国共产党（联，统一战线）、汪精卫派（合作主义）、民主同盟（后） | 抗战；统一战线；重庆；汪精卫 | 盟:美国,苏联,英国；敌:日本 | CHN |

**What changed from 1918:** the Versailles order failed; Austria disappeared into the Reich, Czechoslovakia was partitioned, and Britain and France chose appeasement. Politics became racial persecution; the next war was prepared.

### 3.1 News anchors

| date | 标题 | 摘要（40–80字） | scope | category | source |
|---|---|---|---|---|---|
| 1938-03 | 德国吞并奥地利 | 1938年3月12日，德军越过边境进入奥地利，希特勒在维也纳宣布奥地利并入德意志帝国。舒施尼格政府被推翻，赛斯-因夸特出任地方长官，维也纳的犹太人、社会民主党人和政治犯面临逮捕与掠夺。 | regional | politics | https://encyclopedia.ushmm.org/content/en/article/anschluss |
| 1938-09 | 慕尼黑协定肢解捷克斯洛伐克 | 1938年9月30日，英国、法国、德国与意大利签署慕尼黑协定，捷克斯洛伐克被迫割让苏台德地区。张伯伦宣称赢得“一代人的和平”，布拉格与维也纳的难民则开始准备逃离。 | global | diplomacy | https://en.wikipedia.org/wiki/Munich_Agreement |
| 1938-11 | 水晶之夜：全德反犹暴行 | 1938年11月9日至10日，纳粹党徒在全德及刚刚被吞并的奥地利焚烧犹太会堂、砸毁商店并大规模逮捕犹太人。维也纳的犹太社区遭受重创，数千人被押往达豪等集中营。 | regional | society | https://encyclopedia.ushmm.org/content/en/article/kristallnacht |
| 1938-11 | 第一次维也纳仲裁 | 1938年11月2日，德国与意大利在维也纳仲裁，迫使捷克斯洛伐克把南部斯洛伐克和喀尔巴阡鲁塞尼亚部分地区割让给匈牙利。维也纳作为仲裁地点，成为中欧领土修正的舞台。 | regional | diplomacy | https://en.wikipedia.org/wiki/First_Vienna_Award |
| 1938-07 | 埃维昂难民会议无果而终 | 1938年7月，32国代表在法国埃维昂讨论犹太难民问题，多数国家拒绝接收更多移民。维也纳的犹太家庭从中读出危险信号，领事馆前排起长队，出境签证成为生死攸关的文件。 | global | society | https://en.wikipedia.org/wiki/%C3%89vian_Conference |
| 1938-11 | 阿塔图尔克逝世，土耳其进入伊诺努时代 | 1938年11月10日，土耳其总统凯末尔·阿塔图尔克逝世，伊斯梅特·伊诺努继任。土耳其保持谨慎中立，在巴尔干协定与英法苏之间维持平衡，维也纳的报纸关注这个黑海邻国的走向。 | global | politics | https://en.wikipedia.org/wiki/%C4%B0smet_%C4%B0n%C3%B6n%C3%BC |

### 3.2 Personal drama hooks

1. 犹太店主被迫“出售”店铺，基督教邻居答应“代管”，却开始收取租金。
2. 天主教女佣把犹太雇主的银器藏进教堂，盖世太保搜查整栋公寓。
3. 电车售票员因 1934 年的一句玩笑被邻居告发，面临“叛国”审讯。
4. 少年加入希特勒青年团以保住父亲的工作，随后被要求举报父亲。
5. 慕尼黑协定后，捷克难民越过边境，在维也纳领事馆外排队等过境签证。

## 4. 1945 — Liberation, occupation, Cold War dawn

| id | 中文名 (English) | 时期/政体/首都/政府 | 元首 | 政府首脑 | 政党（意识形态；地位） | 矛盾 | 盟友/对手 | ISO3 |
|---|---|---|---|---|---|---|---|---|
| at-1945 | 盟军占领下的奥地利 (Allied-occupied Austria) | 1945–55；被占领共和国；维也纳；第二共和国、四国占领、伦纳临时政府 | 伦纳，总理（1945.4–12），后总统（1945.12–50） | 伦纳（1945.4–12）；费格尔（1945.12–53） | 社会民主党（联）、人民党（联）、共产党（联）、前纳粹被剥夺权利 | 占领；去纳粹化；粮食；第二共和国 | 盟:西方盟国,苏联（形式）；敌:无 | AUT |
| de-1945 | 盟军占领下的德国 (Allied-occupied Germany) | 1945–49；被占领国家；柏林；盟国管制委员会、美英法苏占领区 | 盟国管制委员会；邓尼茨，总统（1945.5） | 邓尼茨政府（1945.5）；后军事总督 | 社会民主党、基督教民主联盟/基督教社会联盟、共产党、自由民主党、德国统一社会党（1946起）；纳粹党（禁） | 占领；纽伦堡；分裂；难民 | 盟:占领国；敌:彼此（冷战萌芽） | DEU(+POL,RUS) |
| pl-1945 | 波兰 (Poland) | 1945–52；临时国家；华沙；民族团结临时政府、共产党主导 | 贝鲁特，全国国民委员会主席（1944–47） | 奥苏布卡-莫拉夫斯基，总理（1944–47） | 波兰工人党（执）、波兰社会党（联）、波兰农民党（反）、民主党（联） | 边界；共产党接管；人口驱逐；抵抗 | 盟:苏联；敌:西方盟国,乌克兰起义军 | POL(+UKR,BLR,LTU) |
| cs-1945 | 捷克斯洛伐克 (Czechoslovakia) | 1945–92；共和国；布拉格；第三共和国、民族阵线、贝奈斯法令 | 贝奈斯，总统（1945–48） | 费林格（1945–46）；哥特瓦尔德（1946–48） | 捷克斯洛伐克共产党（联/执）、民族社会党（联）、社会民主党（联）、人民党（联）、斯洛伐克民主党 | 贝奈斯法令；德意志人驱逐；共产党推进；斯洛伐克 | 盟:苏联；敌:德国（战败）,匈牙利 | CZE,SVK(+UKR) |
| yu-1945 | 南斯拉夫 (Yugoslavia) | 1945–92；社会主义联邦；贝尔格莱德；共产党主导的人民阵线、1945.11废除君主制 | 铁托，总理/总统（1945–80）；彼得二世（1945废） | 铁托，总理（1945–53） | 南斯拉夫共产党（执）、人民阵线（联）、反对派被压制 | 铁托；君主制；的里雅斯特；冷战 | 盟:苏联（至1948）；敌:西方盟国（的里雅斯特） | SRB,HRV,SVN,BIH,MKD |
| su-1945 | 苏联 (USSR) | 1922–91；联邦社会主义国家；莫斯科；一党制、斯大林、胜利与占领 | 斯大林，总书记（1922–52）；加里宁，国家元首（1922–46） | 莫洛托夫（1930–41）；斯大林（1941–53） | 苏联共产党（执）；无合法反对派 | 胜利；占领；重建；斯大林 | 盟:卫星国；敌:美国,英国（冷战） | RUS,UKR,BLR(+EST,LVA,LTU,MDA) |
| uk-1945 | 英国 (United Kingdom) | 1922–；议会君主国；伦敦；联合政府至7月、工党大胜 | 乔治六世，国王（1936–52） | 丘吉尔（1940–1945.7）；艾德礼（1945–51） | 工党（执）、保守党（反）、自由党（反） | 工党大胜；帝国；紧缩；印度 | 盟:美国；敌:苏联 | GBR |
| us-1945 | 美国 (United States) | 1776–；联邦共和国；华盛顿；总统制、杜鲁门 | 罗斯福（至1945.4.12）；杜鲁门（1945–53） | 无（总统兼政府首脑） | 民主党（执）、共和党（反） | 杜鲁门；原子弹；联合国；对苏关系 | 盟:英国,法国；敌:苏联（萌芽） | USA |
| fr-1945 | 法国 (France) | 1944–46；临时共和国；巴黎；临时政府、戴高乐 | 戴高乐，临时总统（1944–46） | 戴高乐（1944–46） | 法国共产党（联）、工人国际法国支部（联）、人民共和运动（联）、激进党（联）、戴高乐派 | 解放；清洗；帝国；戴高乐 | 盟:英国,美国,苏联（形式）；敌:德国 | FRA |
| it-1945 | 意大利 (Italy) | 1943–46；被占领君主国；罗马；盟军占领下的王国、联合政府 | 维托里奥·埃马努埃莱三世，国王（1900–46） | 帕里（1945.6–12）；加斯佩里（1945–53） | 天主教民主党（执）、意大利共产党（联）、社会党（联）、行动党（联）、君主派 | 君主制/共和国；加斯佩里；共产党；重建 | 盟:美国,英国；敌:南斯拉夫（的里雅斯特） | ITA |
| jp-1945 | 日本 (Japan) | 1945–52；被占领君主国；东京；盟军占领（SCAP）、天皇保留 | 裕仁，天皇（1926–89） | 铃木贯太郎（1945.4–8）；东久迩稔彦（8–10）；币原喜重郎（10–1946） | 日本自由党、日本进步党、社会民主党、日本共产党（1945.10合法化）；投降前无政党 | 占领；投降；非军事化；天皇 | 盟:美国（占领）；敌:无 | JPN |
| cn-1945 | 中华民国 (Republic of China) | 1912–49；共和国；重庆/南京；国民党政府、内战重启 | 蒋介石，国民政府主席（1943–48） | 蒋介石（行政院）；毛泽东，中共主席（1945–76） | 国民党（执）、中国共产党（反/起义）、民主同盟 | 内战；国共；满洲；美国调停 | 盟:美国（国民党）,苏联（中共）；敌:彼此 | CHN |

**What changed from 1938:** Nazi Germany and imperial Japan were destroyed; Austria was liberated but occupied; Germany was divided; the USSR and USA were superpowers. The UN and Nuremberg promised a new order, while the Cold War began.

### 4.1 News anchors

| date | 标题 | 摘要（40–80字） | scope | category | source |
|---|---|---|---|---|---|
| 1945-04 | 苏军攻占维也纳 | 1945年4月13日，苏军完成对维也纳的进攻，纳粹统治在城内结束。战斗、抢劫与报复造成大量平民伤亡，城市基础设施严重受损，幸存者开始寻找食物、亲人和失踪的邻居。 | local | war | https://en.wikipedia.org/wiki/Vienna_offensive |
| 1945-04 | 奥地利第二共和国宣告成立 | 1945年4月27日，卡尔·伦纳领导的社会党、人民党与共产党代表宣布成立第二共和国。临时政府在苏占区获得有限空间，随后寻求西方盟国承认，并着手恢复行政与粮食供应。 | local | politics | https://en.wikipedia.org/wiki/Allied-occupied_Austria |
| 1945-05 | 德国无条件投降，欧洲战争结束 | 1945年5月8日，德国签署无条件投降书，欧洲战事结束。维也纳仍在四国占领之下，难民、战俘与幸存者开始流动，关于战争罪行与战后秩序的讨论迅速展开。 | global | war | https://en.wikipedia.org/wiki/End_of_World_War_II_in_Europe |
| 1945-08 | 原子弹轰炸广岛 | 1945年8月6日，美国在广岛投下原子弹，三天后在长崎再投一枚。日本于8月15日宣布投降，第二次世界大战结束；维也纳的报纸把这一新武器称为“不可想象的未来”。 | global | war | https://en.wikipedia.org/wiki/Atomic_bombings_of_Hiroshima_and_Nagasaki |
| 1945-11 | 纽伦堡审判开庭 | 1945年11月20日，国际军事法庭在纽伦堡开庭，审判纳粹德国的主要战犯。维也纳的报纸详细报道暴行证据，奥地利人开始被迫面对自己参与纳粹政权的事实。 | global | society | https://en.wikipedia.org/wiki/Nuremberg_trials |
| 1945-07 | 波茨坦会议划定战后秩序 | 1945年7月至8月，美英苏三国领导人在波茨坦会晤，决定德国占领区、去纳粹化与波兰西部边界。奥地利问题被搁置，维也纳的未来在四大国博弈中悬而未决。 | global | diplomacy | https://en.wikipedia.org/wiki/Potsdam_Conference |

### 4.2 Personal drama hooks

1. 苏联士兵住进一户人家的公寓，父亲必须在伏特加与抵抗之间选择。
2. 前纳粹党员请犹太邻居写“去纳粹化”证明，邻居要求他先说出真相。
3. 母亲在黑市用结婚戒指换一袋土豆，被警察当场抓住。
4. 归来的士兵发现未婚妻已与抵抗战士订婚，而他的战功无人相信。
5. 神父把犹太女孩藏在教区，必须决定是否为她的配给卡登记。

## 5. 1955 — State Treaty, neutrality, blocs

| id | 中文名 (English) | 时期/政体/首都/政府 | 元首 | 政府首脑 | 政党（意识形态；地位） | 矛盾 | 盟友/对手 | ISO3 |
|---|---|---|---|---|---|---|---|---|
| at-1955 | 奥地利共和国 (Republic of Austria) | 1955–；主权共和国；维也纳；大联合政府、宪法中立 | 克尔纳，总统（1951–57） | 拉布，总理（1953–61） | 社会民主党（联）、人民党（联）、共产党（反）、独立者联盟（右；反） | 国家条约；中立；占领遗产；联合政府 | 盟:无；友:西方,南斯拉夫；中立 | AUT |
| de-w-1955 | 德意志联邦共和国 (West Germany) | 1949–90；联邦共和国；波恩；议会联邦共和国、基民盟/基社盟主导 | 豪斯，总统（1949–59） | 阿登纳，总理（1949–63） | 基民盟/基社盟（执）、社会民主党（反）、自由民主党（联）、全德集团/被驱逐者联盟（联）、共产党（1956禁） | 北约；主权；哈尔斯坦主义；重新武装 | 盟:美国,北约；敌:苏联,东德 | DEU（西；分裂近似） |
| de-e-1955 | 德意志民主共和国 (East Germany) | 1949–90；社会主义共和国；东柏林；德国统一社会党一党制、卫星政党 | 皮克，总统（1949–60） | 格罗提渥，总理（1949–64）；乌布利希，统一社会党第一书记（1950–71） | 德国统一社会党（执）、基民盟（联）、自由民主党（联）、国家民主党（联）、群众组织 | 华约；统一社会党；逃亡；柏林 | 盟:苏联,华约；敌:西德,北约 | DEU（东；同一 ISO3） |
| su-1955 | 苏联 (USSR) | 1922–91；联邦社会主义国家；莫斯科；一党制、赫鲁晓夫解冻 | 赫鲁晓夫，第一书记（1953–64）；伏罗希洛夫，最高苏维埃主席团主席（1953–60） | 布尔加宁，部长会议主席（1955–58） | 苏联共产党（执）；无合法反对派 | 赫鲁晓夫解冻；去斯大林化；日内瓦；卫星国 | 盟:华约,中国；敌:美国,北约 | RUS,UKR,BLR(+EST,LVA,LTU,MDA) |
| yu-1955 | 南斯拉夫 (Yugoslavia) | 1945–92；社会主义联邦；贝尔格莱德；铁托一党制、不结盟 | 铁托，总统（1953–80） | 铁托，总统；1953年后总理分设 | 南斯拉夫共产主义者联盟（执）、社会主义联盟（联）；无合法反对派 | 不结盟；的里雅斯特；市场社会主义；科索沃 | 友:印度,埃及（不结盟）；敌:苏联（至1955和解）,西方 | SRB,HRV,SVN,BIH,MKD |
| hu-1955 | 匈牙利人民共和国 (Hungarian People's Republic) | 1949–89；社会主义共和国；布达佩斯；一党制、拉科西、华约 | 多比，总统（1952–67） | 赫格居什，总理（1955–56）；拉科西，第一书记（1948–56） | 匈牙利劳动人民党（执）、爱国人民阵线（联）；反对派被压制 | 拉科西；集体化；知识分子；1956 | 盟:苏联,华约；敌:西方,南斯拉夫 | HUN |
| cs-1955 | 捷克斯洛伐克 (Czechoslovakia) | 1948–89；社会主义共和国；布拉格；一党制、捷共、华约 | 萨波托茨基，总统（1953–57） | 西罗基，总理（1953–63）；诺沃提尼，第一书记（1953–68） | 捷克斯洛伐克共产党（执）、民族阵线政党（联）；无合法反对派 | 诺沃提尼；斯大林主义；斯洛伐克；经济 | 盟:苏联,华约；敌:西方 | CZE,SVK |
| pl-1955 | 波兰人民共和国 (Polish People's Republic) | 1952–89；社会主义共和国；华沙；一党制、波兰统一工人党、华约 | 萨瓦茨基，国务委员会主席（1952–64） | 西伦凯维兹，总理（1954–70）；贝鲁特，第一书记（1948–56） | 波兰统一工人党（执）、统一农民党（联）、民主党（联）；无合法反对派 | 贝鲁特；波兹南（1956）；教会；知识分子 | 盟:苏联,华约；敌:西方 | POL |
| uk-1955 | 英国 (United Kingdom) | 1922–；议会君主国；伦敦；宪政君主国、保守党政府 | 伊丽莎白二世，女王（1952–2022） | 艾登，首相（1955–57） | 保守党（执）、工党（反）、自由党（反） | 艾登；苏伊士；帝国；紧缩 | 盟:美国,北约；敌:苏联 | GBR |
| fr-1955 | 法兰西第四共和国 (French Fourth Republic) | 1946–58；共和国；巴黎；议会共和国、内阁不稳、阿尔及利亚 | 科蒂，总统（1954–59） | 富尔，总理（1955–56） | 激进党（联）、工人国际法国支部（联）、人民共和运动（联）、法国共产党（反）、法兰西人民联盟（反）、布热德派（反） | 第四共和国；阿尔及利亚；印度支那；布热德主义 | 盟:美国,北约；敌:苏联,阿尔及利亚民族主义者 | FRA(+DZA) |
| us-1955 | 美国 (United States) | 1776–；联邦共和国；华盛顿；总统制、艾森豪威尔、遏制 | 艾森豪威尔，总统（1953–61） | 无（总统兼政府首脑）；杜勒斯，国务卿 | 共和党（执）、民主党（反） | 艾森豪威尔；杜勒斯；遏制；民权 | 盟:北约,东南亚条约组织；敌:苏联,中国 | USA |
| it-1955 | 意大利共和国 (Italian Republic) | 1946–；共和国；罗马；议会共和国、天主教民主党主导、经济奇迹 | 格龙基，总统（1955–62） | 谢尔巴（1954–1955.7）；塞尼（1955–57） | 天主教民主党（执）、意大利共产党（反）、社会党（反）、意大利社会运动（反）、自由党（联） | 天主教民主党主导；经济奇迹；南方；共产党 | 盟:美国,北约；敌:苏联,南斯拉夫（的里雅斯特） | ITA |
| jp-1955 | 日本 (Japan) | 1952–；议会君主国；东京；宪政君主国、1955年起自民党主导 | 裕仁，天皇（1926–89） | 鸠山一郎，首相（1954–56） | 自由民主党（1955.11起执）、日本社会党（反）、日本共产党（反） | 自民党成立；美日同盟；增长；重新武装 | 盟:美国；紧张:苏联,中国 | JPN |
| cn-1955 | 中华人民共和国 (People's Republic of China) | 1949–；社会主义共和国；北京；中共一党制、毛泽东、集体化 | 毛泽东，中共主席（1943–76），共和国主席（1954–59） | 周恩来，总理（1949–76） | 中国共产党（执）、民主党派（联）；无合法反对派 | 集体化；台湾；万隆；百花运动 | 友:苏联（至分裂）,印度；敌:美国,国民党台湾 | CHN |
| in-1955 | 印度共和国 (Republic of India) | 1950–；联邦共和国；新德里；议会共和国、国大党主导、不结盟 | 普拉萨德，总统（1950–62） | 尼赫鲁，总理（1947–64） | 国大党（执）、印度共产党（反）、社会党（反）、人民同盟（反） | 不结盟；分治；发展；果阿 | 友:南斯拉夫,埃及,中国（万隆）；敌:巴基斯坦,葡萄牙（果阿） | IND(+PAK,BGD) |

**What changed from 1945:** Austria became sovereign and neutral; Germany was divided and armed on both sides; Europe stabilized into blocs. Decolonization and Bandung moved Asia and Africa to the center.

### 5.1 News anchors

| date | 标题 | 摘要（40–80字） | scope | category | source |
|---|---|---|---|---|---|
| 1955-05 | 奥地利国家条约签署 | 1955年5月15日，美英法苏四国与奥地利在维也纳美景宫签署国家条约，结束占领、恢复主权。条约禁止奥地利与德国合并，并规定少数族群权利与战争责任；维也纳人涌上街头庆祝。 | local | diplomacy | https://en.wikipedia.org/wiki/Austrian_State_Treaty |
| 1955-10 | 奥地利宣布永久中立 | 1955年10月26日，奥地利国民议会通过宪法性中立法，宣布永久中立并加入联合国。最后一批占领军撤离后，维也纳从四国分区城市变回单一首都，冷战边界却近在咫尺。 | local | politics | https://en.wikipedia.org/wiki/Declaration_of_Neutrality |
| 1955-05 | 华沙条约组织成立 | 1955年5月14日，苏联与东欧卫星国在华沙签署友好合作互助条约，回应西德加入北约。欧洲的分裂线固定下来，奥地利的中立成为东西方之间一条狭窄的缓冲带。 | regional | diplomacy | https://en.wikipedia.org/wiki/Warsaw_Pact |
| 1955-04 | 万隆会议与不结盟运动 | 1955年4月，29个亚非国家在印度尼西亚万隆举行会议，讨论反殖民主义、经济发展与和平共处。印度总理尼赫鲁与埃及总统纳赛尔成为焦点，维也纳的报纸把它称为“第三世界的觉醒”。 | global | diplomacy | https://en.wikipedia.org/wiki/Bandung_Conference |
| 1955-07 | 日内瓦四国首脑会议 | 1955年7月，美英法苏首脑在日内瓦举行战后首次峰会，讨论德国统一、裁军与欧洲安全。会议没有达成实质协议，但“日内瓦精神”短暂缓和了冷战紧张，也影响了奥地利中立的设计。 | global | diplomacy | https://en.wikipedia.org/wiki/Geneva_Summit_(1955) |
| 1955-05 | 西德加入北约 | 1955年5月，西德正式加入北约，结束占领状态并重新武装。阿登纳政府把西方一体化视为安全保证，苏联则以华沙条约回应，德国的分裂由此制度化。 | regional | diplomacy | https://en.wikipedia.org/wiki/West_Germany |

### 5.2 Personal drama hooks

1. 苏联占领军士兵与维也纳面包店学徒在撤军前夕相爱，面临分离。
2. 一家人争论是入籍奥地利还是保留德国护照，祖父的纳粹党籍成为障碍。
3. 匈牙利难民在 1956 年越过边境，在维也纳工厂找到工作，却想念家乡。
4. 公务员被要求签署中立宣言，想起自己 1938 年签过的效忠誓词。
5. 爵士俱乐部老板因“西方颓废音乐”被苏联巡逻队调查。

## 6. Encoding cautions

- Do not encode death dates as commands or treat a `reference` anchor as a committed event; both are metadata/hooks.
- Do not use one ISO3 code as a precise historical border; label the overlay approximate.
- Leader arrays sometimes include later office-holders (e.g., Karl I in a 1912 snapshot). Filter by snapshot year or mark `from`/`to`; do not show a 1918 leader in 1912.

## 7. Sources and confidence

Sources are **tertiary** (Wikipedia, USHMM, reference encyclopedias); no archives or contemporary newspapers. Confidence is high for regimes, capitals, office holders and major dates; medium for seat counts and month-level transitions; low for "public opinion" and coalition composition.

| # | URL | Era |
|---:|---|---|
| 1 | https://icr.ethz.ch/data/cshapes/ | method |
| 2 | https://www.britannica.com/place/Austria-Hungary | 1912 |
| 3 | https://www.geschichtewiki.wien.gv.at/Franz_Joseph_I. | 1912 |
| 4 | https://en.wikipedia.org/wiki/1911_Cisleithanian_legislative_election | 1912 |
| 5 | https://en.wikipedia.org/wiki/First_Balkan_War | 1912 |
| 6 | https://en.wikipedia.org/wiki/Albanian_Declaration_of_Independence | 1912 |
| 7 | https://en.wikipedia.org/wiki/1912_German_federal_election | 1912 |
| 8 | https://en.wikipedia.org/wiki/Lena_massacre | 1912 |
| 9 | https://en.wikipedia.org/wiki/Italo-Turkish_War | 1912 |
| 10 | https://en.wikipedia.org/wiki/1912_United_States_presidential_election | 1912 |
| 11 | https://en.wikipedia.org/wiki/1911_Revolution | 1912 |
| 12 | https://en.wikipedia.org/wiki/Armistice_of_11_November_1918 | 1918 |
| 13 | https://en.wikipedia.org/wiki/Armistice_of_Villa_Giusti | 1918 |
| 14 | https://en.wikipedia.org/wiki/German_revolution_of_1918%E2%80%931919 | 1918 |
| 15 | https://en.wikipedia.org/wiki/Dissolution_of_Austria-Hungary | 1918 |
| 16 | https://en.wikipedia.org/wiki/Czechoslovak_declaration_of_independence | 1918 |
| 17 | https://en.wikipedia.org/wiki/Creation_of_Yugoslavia | 1918 |
| 18 | https://en.wikipedia.org/wiki/Republic_of_German-Austria | 1918 |
| 19 | https://en.wikipedia.org/wiki/Spanish_flu | 1918 |
| 20 | https://en.wikipedia.org/wiki/Representation_of_the_People_Act_1918 | 1918 |
| 21 | https://encyclopedia.ushmm.org/content/en/article/anschluss | 1938 |
| 22 | https://en.wikipedia.org/wiki/Munich_Agreement | 1938 |
| 23 | https://en.wikipedia.org/wiki/First_Vienna_Award | 1938 |
| 24 | https://encyclopedia.ushmm.org/content/en/article/kristallnacht | 1938 |
| 25 | https://en.wikipedia.org/wiki/%C3%89vian_Conference | 1938 |
| 26 | https://en.wikipedia.org/wiki/Great_Purge | 1938 |
| 27 | https://en.wikipedia.org/wiki/Allied-occupied_Austria | 1945 |
| 28 | https://en.wikipedia.org/wiki/Austrian_State_Treaty | 1955 |
| 29 | https://en.wikipedia.org/wiki/Declaration_of_Neutrality | 1955 |
| 30 | https://en.wikipedia.org/wiki/Potsdam_Conference | 1945 |
| 31 | https://en.wikipedia.org/wiki/Nuremberg_trials | 1945 |
| 32 | https://en.wikipedia.org/wiki/Atomic_bombings_of_Hiroshima_and_Nagasaki | 1945 |
| 33 | https://en.wikipedia.org/wiki/Warsaw_Pact | 1955 |
| 34 | https://en.wikipedia.org/wiki/Bandung_Conference | 1955 |
| 35 | https://en.wikipedia.org/wiki/Geneva_Summit_(1955) | 1955 |

The Britannica URL returned HTTP 403 to automated fetch; it is retained as a canonical reference, not machine-verified. Wien Geschichte Wiki pages were reachable. Wikipedia URLs were resolved through the MediaWiki API; USHMM may block bots.

**Flagged uncertainties and corrections**

- **1912 Ottoman grand vizier:** three changes within the year (Said Pasha → Ahmed Muhtar Pasha in July → Kâmil Pasha in October). Anchor the snapshot mid-1912; do not encode a single "1912 grand vizier" without a month. Current `data-1912.ts` has the wrong 1912 grand-vizier chain; correct it before shipping.
- **1912 Hungary:** Khuen-Héderváry was PM until April 1912, then Lukács. The table uses Lukács for the post-April snapshot.
- **1918:** Károlyi was PM only 31 Oct–16 Nov 1918, then President; do not list him as PM for all of November. The Austro-Hungarian armistice with Italy was 3 Nov, not 11 Nov.
- **1918 Baltic states:** dates are declarations; de facto control varied, and German occupation/Soviet invasion continued into 1919.
- **1938 Austria:** legal status changed on 13 March. Before that, Schuschnigg; after, Seyss-Inquart as Reichsstatthalter. "Austria" is shown as annexed, not sovereign.
- **1945 Vienna four sectors:** this is **historical fact**, not a counterfactual. The existing `packages/v4/history-db/data/fiction-hooks.json` entry `fiction:1945-vienna-four-sector-city` is mislabeled; correct or remove it. Vienna was divided into US/UK/French/Soviet sectors, with the inner city under joint Allied control.
- **1955 Germany:** West and East Germany share ISO3 `DEU`. A country-level overlay cannot show both; use a single "divided Germany" feature with hatching, or split the geometry explicitly and mark it approximate.
- **Overlay precedence:** when codes overlap (e.g., `de-1938` lists `AUT,CZE` while `at-1938`/`cs-1938` also list them), prefer the more specific polity or render a hatched shared-sovereignty rule. Never assign one ISO3 silently to two polities.
- **Party seat counts:** the 1911 Cisleithanian figures are from one tertiary table; other sources group German national clubs differently. Treat seat counts as illustrative, not canonical.
- **1912 party labels:** current `data-1912.ts` marks the German Conservative Party and Russian Octobrists as opposition. Both were government-aligned; use `major`, not `opposition`.
- **"Austria-Hungary" vs "Austria":** in 1912, "Austria" means Cisleithania, not the whole monarchy. Do not use `AUT` alone for the dual monarchy without a note.

### CShapes 2.0 note

CShapes 2.0 (ETH Zurich) maps borders and capitals of independent states and dependent territories from **1886 to 2019** (CShapes-Europe from 1816). It is licensed **CC BY-NC-SA 4.0**; cite Schvitz et al. 2022. Strengths for 1912: it represents the Austro-Hungarian, German, Russian and Ottoman empires as sovereign polygons and gives a defensible country-level baseline for borders, capitals and independence dates. Limits: it is a state-system dataset, not an ethnic, linguistic or administrative map. It does not show Cisleithania/Transleithania, occupation zones, front lines, district boundaries or wartime control. Its geometries are simplified, and sovereignty coding involves judgment calls. This project does **not** bundle CShapes geometry; the map is Natural Earth modern geometry plus an ISO3 political-attribution overlay. That overlay is approximate by construction: one modern code can contain several 1912 polities (e.g., `POL`, `UKR`, `ROU` inside Austria-Hungary/Russia) and one 1912 polity can span many codes. Use hatching, a legend and a visible "approximate political map" label; never present it as a survey map.

## Encodable summary

**Most important polities per era (ids)**

- **1912:** `ah-1912`, `de-1912`, `ru-1912`, `tr-1912`, `uk-1912`, `fr-1912`, `it-1912`, `rs-1912`, `bg-1912`, `ro-1912`, `gr-1912`, `us-1912`, `jp-1912`, `cn-1912`.
- **1918:** `at-1918`, `hu-1918`, `de-1918`, `ru-1918`, `cs-1918`, `yu-1918`, `pl-1918`, `fi-1918`, `balt-1918`, `tr-1918`, `uk-1918`, `fr-1918`, `it-1918`, `us-1918`, `jp-1918`.
- **1938:** `de-1938`（含 `at-1938`）, `cs-1938`, `pl-1938`, `hu-1938`, `yu-1938`, `ro-1938`, `su-1938`, `uk-1938`, `fr-1938`, `it-1938`, `es-1938`, `tr-1938`, `us-1938`, `jp-1938`, `cn-1938`.
- **1945:** `at-1945`, `de-1945`, `pl-1945`, `cs-1945`, `yu-1945`, `su-1945`, `uk-1945`, `us-1945`, `fr-1945`, `it-1945`, `jp-1945`, `cn-1945`.
- **1955:** `at-1955`, `de-w-1955`, `de-e-1955`, `su-1955`, `yu-1955`, `hu-1955`, `cs-1955`, `pl-1955`, `uk-1955`, `fr-1955`, `us-1955`, `it-1955`, `jp-1955`, `cn-1955`, `in-1955`.

**Twenty parties/leaders to encode first**

1. SDAP — Victor Adler (1912)
2. Christian Social Party — Karl Lueger legacy / Albert Gessmann (1912)
3. German National bloc — Georg von Schönerer (1912)
4. Bolsheviks — Vladimir Lenin (1918)
5. SPD — Friedrich Ebert (1918)
6. USPD — Hugo Haase (1918)
7. KPD — Rosa Luxemburg / Karl Liebknecht (1918–19)
8. NSDAP — Adolf Hitler (1938)
9. Fatherland Front — Kurt Schuschnigg (1938)
10. KSČ — Klement Gottwald (1945–48)
11. PPR/PZPR — Bolesław Bierut (1945–56)
12. KPJ/LCY — Josip Broz Tito (1945–80)
13. CPSU — Joseph Stalin (1945) / Nikita Khrushchev (1955)
14. Conservative Party — Neville Chamberlain (1938) / Anthony Eden (1955)
15. Labour Party — Clement Attlee (1945)
16. Radical-Socialists — Édouard Daladier (1938)
17. Christian Democracy (DC) — Alcide De Gasperi (1945–53)
18. LDP — Ichirō Hatoyama (1955)
19. KMT — Chiang Kai-shek (1938–45)
20. CCP — Mao Zedong (1945–55)
