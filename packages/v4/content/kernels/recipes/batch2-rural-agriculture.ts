import type { PlotKernel } from '../../../composition/types.js';
import { recipes } from './kit.js';

/**
 * Batch 2 · rural life, vineyards and the small town around Klosterneuburg.
 *
 * Fifty mechanisms of a wine-and-grain economy, 1900–1935: hail, mildew,
 * rent days, inheritance by the row, seasonal crews, cattle plagues, mill
 * tolls, wells, barn fires, tithes, cooperatives, village institutions, war
 * requisitions and the slow violence of mortgages. Every scene is anchored in
 * a place with a name, a tool, a price and a person who can refuse.
 */
export const BATCH2_RURAL_AGRICULTURE: PlotKernel[] = recipes([
  // 1. Harvest failure ------------------------------------------------------
  {
    id: 'r2-rural.harvest-failure',
    title: '冰雹后的葡萄行',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'harvest', 'weather', 'debt', 'vineyard'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      vinedresser: ['worker', { minAge: 30, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 20, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'salvaged-the-rows',
        w: 0.42,
        text: '{subject}蹲在垄间，把打落的青葡萄一颗颗捡进围裙。{vinedresser}用靴尖拨开叶子，说这些还能压出酸酒，别浪费。两人把破网重新拉上，风一过，湿绳在桩上啪啪作响。天快黑时，场院里堆起三筐带泥的果子。',
        significance: 0.72,
        fx: {
          cash: 2,
          skill: { craft: 0.02 },
          relation: ['vinedresser', 'colleague', 0.08, 0],
          flag: 'salvaged_hail_crop',
        },
      },
      {
        id: 'mortgaged-the-vintage',
        w: 0.33,
        when: { maxCash: 6 },
        text: '{subject}把账本摊在酒窖门口，算到第三遍还是差十四克朗。{vinedresser}说东家不会等到圣诞节，要么押酒桶，要么押葡萄园。{subject}在抵押栏上按了指印，钱袋沉了一点，纸上的数字更沉。',
        significance: 0.8,
        fx: {
          cash: 11,
          condition: 'debt_pressure',
          relation: ['vinedresser', 'acquaintance', 0.02, 0],
          flag: 'mortgaged_after_hail',
        },
      },
      {
        id: 'neighbor-shared-crop',
        w: 0.25,
        text: '傍晚，{neighbor}扛着两只空筐来敲门，说自家也剩不下多少，但可以先借一桶酒渣喂猪。{subject}没有推辞，只把厨房里最后半块面包切开。两个人坐在门槛上，谁也没提明年的租。',
        significance: 0.68,
        fx: {
          cash: 3,
          food: 1,
          relation: ['neighbor', 'friend', 0.15, 0.05],
          flag: 'neighbor_harvest_help',
        },
      },
    ],
    variants: [
      {
        id: 'war-requisition-after-hail',
        when: { processKinds: ['war_mobilization'] },
        title: '收成归了军队',
        roles: {
          officer: ['official', { minAge: 30, maxAge: 60 }],
        },
        outcomes: [
          {
            id: 'requisition-at-hail-price',
            w: 0.55,
            text: '{officer}带着两名士兵站在葡萄行尽头，手里是一张盖红章的征购单。他说今年的酒要留给伤兵医院，价钱由公署定。{subject}接过单子，发现数目只有去年的一半，纸角却被雨打湿了。',
            significance: 0.78,
            fx: {
              cash: -6,
              food: -2,
              relation: ['officer', 'rival', -0.1, 0],
              flag: 'requisitioned_wine_harvest',
              knowledge: [
                'the army pays half the market price for requisitioned wine',
                0.85,
                'officer',
              ],
            },
          },
          {
            id: 'buried-two-barrels',
            w: 0.45,
            text: '{subject}连夜把最好的两桶埋进斜坡下的石缝，上面覆了葡萄藤。第二天{officer}来点数，桶是空的，酒窖里只有酸味。士兵走后，{neighbor}在墙外低声问：埋了几桶？',
            significance: 0.8,
            fx: {
              cash: 4,
              relation: ['neighbor', 'acquaintance', 0.05, 0],
              flag: 'hid_wine_from_requisition',
              knowledge: ['two barrels are buried under the slope', 0.8, 'neighbor'],
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 2,
  },

  // 2. Vine disease ---------------------------------------------------------
  {
    id: 'r2-rural.vine-mildew',
    title: '叶背的白霜',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['rural', 'vineyard', 'disease', 'harvest', 'authority'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      neighbor: ['neighbor', { minAge: 30, maxAge: 70 }],
      inspector: ['official', { minAge: 30, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'burned-the-rows',
        w: 0.4,
        text: '{subject}翻过一片叶子，背面是一层灰白粉霜，指腹一捻就散。{neighbor}说这是霜霉，雨后再拖三天，整排都得拔。两人把病叶装进麻袋，扛到村外的石灰坑烧了，烟一直低低地压在葡萄架上。',
        significance: 0.74,
        fx: {
          cash: -6,
          skill: { craft: 0.03 },
          relation: ['neighbor', 'colleague', 0.1, 0],
          flag: 'burned_mildewed_vines',
        },
      },
      {
        id: 'reported-to-inspector',
        w: 0.35,
        when: { skill: { name: 'literacy', min: 0.3 } },
        text: '{subject}没有烧，先去镇上找{inspector}。{inspector}戴着眼镜看了半分钟，说可以报灾，但要留下三排做样，收成归公署统计。{subject}问补偿多少，{inspector}把表格翻到背面，那里什么也没写。',
        significance: 0.72,
        fx: {
          cash: 2,
          reputation: 0.05,
          role: 'disease_reporter',
          relation: ['inspector', 'acquaintance', 0.06, 0],
          flag: 'reported_mildew',
          knowledge: ['disease compensation forms have no stated amount', 0.8, 'inspector'],
        },
      },
      {
        id: 'sold-the-mildewed-grapes',
        w: 0.25,
        text: '{subject}把病叶摘掉，照旧把葡萄卖给路过的酒商，只说今年酸度高，适合做混酿。{neighbor}在装车时看见桶底浮着的白沫，什么也没说，只把自己的那一篮提回了家。',
        significance: 0.76,
        fx: {
          cash: 6,
          reputation: -0.1,
          relation: ['neighbor', 'rival', -0.12, 0],
          flag: 'sold_mildewed_grapes',
          knowledge: ['the buyer was not told about the mildew', 0.75],
        },
      },
    ],
    variants: [
      {
        id: 'war-copper-shortage',
        when: { processKinds: ['war_mobilization'] },
        title: '买不到的硫酸铜',
        outcomes: [
          {
            id: 'treated-with-lime',
            w: 0.55,
            text: '镇上的药房说硫酸铜全被军队订走了。{subject}只好用石灰水刷藤，刷到手指开裂。{neighbor}站在地头看了半天，说这法子治不了霜霉，只能让叶子看起来白一些。',
            significance: 0.72,
            fx: {
              cash: -3,
              health: -0.04,
              skill: { craft: 0.02 },
              relation: ['neighbor', 'colleague', 0.05, 0],
              flag: 'treated_vines_with_lime',
            },
          },
          {
            id: 'let-the-rows-go',
            w: 0.45,
            text: '{subject}把病得最重的两排直接翻了土，改种豆子。{neighbor}问葡萄园不要了？{subject}说先顾今年冬天。豆苗出土时，老藤的根还在地里，一锄头下去，断根流出清水。',
            significance: 0.76,
            fx: {
              food: 2,
              cash: -4,
              flag: 'converted_vines_to_beans',
              knowledge: ['the oldest rows were ploughed under', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 3. Hail ---------------------------------------------------------------
  {
    id: 'r2-rural.hailstorm',
    title: '五月的冰雹',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [16, 75],
    tags: ['rural', 'weather', 'neighbor', 'repair', 'vineyard'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      neighbor: ['neighbor', { minAge: 20, maxAge: 75 }],
      sibling: ['sibling', { minAge: 12, maxAge: 70 }],
      parent: ['parent', { minAge: 40, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'sheltered-the-chickens',
        w: 0.4,
        text: '冰粒砸在瓦上像一把倒下来的石子。{subject}和{sibling}把晾在院里的被单拖进屋，{neighbor}在墙外喊他家的鸡棚塌了。三个人顶着簸箕跑去，把鸡一只只塞进木箱，手背被打得通红。',
        significance: 0.66,
        fx: {
          health: -0.04,
          relation: ['sibling', 'colleague', 0.1, 0],
          flag: 'hail_shelter_shared',
        },
      },
      {
        id: 'repaired-the-roof',
        w: 0.35,
        text: '雹停后，屋顶漏了三处。{subject}爬上梯子铺油毡，脚下一滑，膝盖磕在檐口。{parent}在下面扶着梯子骂了两句，又去烧热水。修屋顶的木板和钉子花了九克朗，账记在欠条上。',
        significance: 0.74,
        fx: {
          cash: -9,
          health: -0.06,
          condition: 'bruised_knee',
          relation: ['parent', 'kin', 0.05, 0],
          flag: 'repaired_hail_damage',
        },
      },
      {
        id: 'caught-in-the-open',
        w: 0.25,
        when: { minAge: 55 },
        text: '{subject}没来得及躲，冰粒打在肩上，夜里抬不起胳膊。{neighbor}送来一罐猪油，说抹上就好。第二天{subject}还是去了地里，把打断的葡萄桩一根根拔出来，断口白得刺眼。',
        significance: 0.72,
        fx: {
          cash: -2,
          health: -0.1,
          condition: 'bruised_shoulder',
          relation: ['neighbor', 'friend', 0.08, 0],
          flag: 'injured_in_hail',
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 4. Flood --------------------------------------------------------------
  {
    id: 'r2-rural.flood-meadow',
    title: '河滩上的水印',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [16, 72],
    tags: ['rural', 'flood', 'neighbor', 'institution', 'land'],
    contexts: ['rural', 'agriculture', 'crisis', 'reform', 'peace'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      official: ['official', { minAge: 28, maxAge: 65 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'saved-the-hay',
        w: 0.4,
        text: '河水漫过草滩时，{subject}和{neighbor}把干草一叉一叉往高处扔。水到膝盖，靴子里灌满泥，走一步响一声。到半夜，草垛保住了，下游的磨坊却传来木头断裂的闷响。',
        significance: 0.7,
        fx: {
          health: -0.05,
          relation: ['neighbor', 'colleague', 0.12, 0],
          flag: 'saved_hay_from_flood',
        },
      },
      {
        id: 'cellar-flooded',
        w: 0.35,
        text: '{official}划着小船来发沙袋，说堤上的缺口不归村里管。{subject}把沙袋堆在自家门口，水还是从墙根渗进来，地窖里的土豆全泡了。第二天量水位，墙上的泥线比去年高出一掌。',
        significance: 0.76,
        fx: {
          cash: -7,
          food: -3,
          relation: ['official', 'rival', -0.08, 0],
          flag: 'flooded_cellar',
        },
      },
      {
        id: 'pledged-embankment-work',
        w: 0.25,
        text: '洪水退后，{council}的人来丈量河岸，说要在上游修石堤，每户按地亩出工。{subject}在名单上按了手印，换来一车石头。{neighbor}说这堤修不修得成，要看明年春天谁还记得这场水。',
        significance: 0.68,
        fx: {
          cash: -4,
          membership: ['council', true, 'pledged labour for the flood embankment'],
          relation: ['neighbor', 'acquaintance', 0.04, 0],
          flag: 'pledged_flood_works',
        },
      },
    ],
    baseRate: 0.04,
    cooldownYears: 4,
  },

  // 5. Land rent ----------------------------------------------------------
  {
    id: 'r2-rural.land-rent',
    title: '圣马丁日的租约',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'rent', 'debt', 'land', 'authority'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      steward: ['official', { minAge: 35, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      parent: ['parent', { minAge: 45, maxAge: 82 }],
    },
    outcomes: [
      {
        id: 'paid-in-grain-and-cash',
        w: 0.4,
        text: '{steward}把租约铺在桌上，手指压在“圣马丁日”那一行。{subject}把粮袋推过去，数出十四克朗，又把最后两斗黑麦倒进他的斗里。{steward}用指节敲了敲斗沿，说今年雨水多，东家只收这些。',
        significance: 0.72,
        fx: {
          cash: -14,
          food: -2,
          relation: ['steward', 'acquaintance', 0.04, 0],
          flag: 'paid_land_rent',
        },
      },
      {
        id: 'negotiated-a-share',
        w: 0.35,
        when: { skill: { name: 'social', min: 0.3 } },
        text: '{subject}没有立刻掏钱，先请{steward}喝了一杯去年的酒，又提起东家仓里缺干草。话说到第三杯，租子改成六成粮、四成现钱。{steward}走时把空酒瓶留在桌上，说别让{neighbor}知道。',
        significance: 0.74,
        fx: {
          cash: -6,
          food: -1,
          relation: ['steward', 'colleague', 0.1, 0],
          flag: 'negotiated_rent_share',
          knowledge: ['the steward will accept a mixed grain-and-cash rent', 0.8, 'steward'],
        },
      },
      {
        id: 'signed-the-arrears',
        w: 0.25,
        when: { maxCash: 5 },
        text: '{subject}把空钱袋翻给{steward}看，说再逼就只能牵走那头奶牛。{steward}在租约背面写了“欠”，让{subject}画押，限期到圣诞节。{parent}在里屋听见，把拐杖往地上顿了一下。',
        significance: 0.8,
        fx: {
          condition: 'rent_arrears',
          relation: ['steward', 'rival', -0.12, 0],
          flag: 'rent_in_arrears',
          knowledge: ['the estate can seize the cow at Christmas', 0.75, 'steward'],
        },
      },
    ],
    variants: [
      {
        id: 'war-rent-deferral',
        when: { processKinds: ['war_mobilization'] },
        title: '缓租不缓税',
        outcomes: [
          {
            id: 'filed-the-deferral',
            w: 0.5,
            text: '战争爆发后，{steward}带来一张公署告示，说佃租可以缓交，但粮食要先卖给征购站。{subject}把告示读了两遍，发现缓的是租，不是税。{steward}说公署的人下周就来量仓。',
            significance: 0.72,
            fx: {
              cash: 2,
              relation: ['steward', 'acquaintance', 0.03, 0],
              flag: 'wartime_rent_deferral',
              knowledge: ['the deferral covers rent but not the grain levy', 0.85, 'steward'],
            },
          },
          {
            id: 'paid-anyway',
            w: 0.5,
            text: '{subject}把该交的租子照旧放在桌上，{steward}愣了一下，还是收了。他说东家的儿子上了前线，家里也缺现钱。两人谁也没提告示，只把窗户关紧，外头的征兵鼓声一下一下传进来。',
            significance: 0.68,
            fx: {
              cash: -8,
              relation: ['steward', 'colleague', 0.06, 0],
              flag: 'paid_rent_during_war',
            },
          },
        ],
      },
    ],
    baseRate: 0.09,
    cooldownYears: 1,
  },

  // 6. Vineyard inheritance ------------------------------------------------
  {
    id: 'r2-rural.vineyard-inheritance',
    title: '分葡萄园的那把尺',
    domain: 'family',
    stage: 'adulthood',
    ages: [22, 70],
    tags: ['rural', 'inheritance', 'vineyard', 'sibling', 'law'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'postwar'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      sibling: ['sibling', { minAge: 18, maxAge: 75 }],
      notary: ['official', { minAge: 30, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'divided-by-the-row',
        w: 0.4,
        text: '葡萄园按垄分。{notary}把皮尺从石桩拉到第三排，{sibling}说那一排向阳，该归自己。{subject}没争，只把界石重新埋深，铁锹碰到石头时发出闷响。分完的地只剩窄窄一条，推车都难掉头。',
        significance: 0.78,
        fx: {
          cash: -4,
          relation: ['sibling', 'rival', -0.16, 0],
          flag: 'divided_vineyard',
          knowledge: ['the best row went to the sibling', 0.8],
        },
      },
      {
        id: 'sold-the-share',
        w: 0.35,
        when: { minCash: 10 },
        text: '{subject}把皮尺收起来，说园子不分，折价卖给{sibling}。{sibling}数钱时少给了两克朗，说是这些年的工钱。{subject}把钱揣好，最后看了一眼那排老藤，藤根上还留着父亲绑过的麻绳。',
        significance: 0.8,
        fx: {
          cash: 18,
          relation: ['sibling', 'rival', -0.08, 0],
          flag: 'sold_vineyard_share',
        },
      },
      {
        id: 'inherited-the-debt',
        w: 0.25,
        text: '{notary}念完遗嘱，{subject}才知道园子还押着银行的钱。{sibling}当场把钥匙扔在桌上，说谁要园子谁还债。{subject}捡起钥匙，掌心被齿口硌出一道白痕。',
        significance: 0.82,
        fx: {
          condition: 'mortgaged_vineyard',
          cash: -2,
          relation: ['sibling', 'rival', -0.2, 0],
          flag: 'inherited_indebted_vineyard',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-divided-vineyard',
        when: { legacyKinds: ['war_aftermath'] },
        title: '战后分园',
        outcomes: [
          {
            id: 'rebuilt-the-wall-together',
            w: 0.6,
            text: '战后回来，园子荒了两年，{sibling}在战俘营里少了一条腿。{subject}把分园的皮尺收进柜子，说先一起把塌掉的石墙垒起来。{sibling}坐在门槛上削一根葡萄桩，削了很久才说：界石还在老地方。',
            significance: 0.78,
            fx: {
              cash: -5,
              relation: ['sibling', 'colleague', 0.15, 0.05],
              flag: 'reunited_vineyard_after_war',
            },
          },
          {
            id: 'disputed-the-old-boundary',
            w: 0.4,
            text: '{sibling}带回一张战前的地契副本，上面的界线和{subject}记的不一样。两人在雨里量到天黑，最后把争议的那三垄改种了豆子。豆子归公，谁也别卖酒。豆苗出土那天，两人都没去地里看。',
            significance: 0.7,
            fx: {
              food: 2,
              relation: ['sibling', 'rival', -0.06, 0],
              flag: 'disputed_vineyard_rows',
              knowledge: ['the pre-war boundary is not the same as the remembered one', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 7. Seasonal labour -----------------------------------------------------
  {
    id: 'r2-rural.seasonal-labor',
    title: '摘葡萄的短工',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 60],
    tags: ['rural', 'harvest', 'labour', 'wages', 'vineyard'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'war'],
    milieus: ['farm', 'rural', 'land', 'market'],
    roles: {
      boss: ['worker', { minAge: 35, maxAge: 65 }],
      picker: ['neighbor', { minAge: 16, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'paid-by-the-basket',
        w: 0.4,
        text: '天没亮，{boss}在村口点人，{subject}和{picker}挤上板车。到了坡上，露水把裤脚浸透，手指很快被果梗染黑。傍晚过秤，{boss}按筐数发钱，{subject}多得一克朗，因为最后两筐是自己扛下山的。',
        significance: 0.7,
        fx: {
          cash: 4,
          role: 'grape_picker',
          skill: { craft: 0.02 },
          relation: ['boss', 'colleague', 0.06, 0],
          flag: 'paid_by_the_basket',
        },
      },
      {
        id: 'short-paid-as-a-novice',
        w: 0.35,
        when: { employment: false },
        text: '{boss}说今年只收熟手，让{subject}先试半天。{subject}剪得慢，筐底混进几串青果，过秤时被倒出来重挑。天黑结账，{boss}扣了半天的工钱，只给了一顿冷土豆。',
        significance: 0.68,
        fx: {
          cash: 1,
          food: 1,
          mood: -0.08,
          relation: ['boss', 'rival', -0.1, 0],
          flag: 'short_paid_as_novice',
        },
      },
      {
        id: 'organized-the-crew',
        w: 0.25,
        when: { skill: { name: 'social', min: 0.3 } },
        text: '下午暴雨将至，{subject}把女工们叫到棚下，说再干下去果子要烂在藤上，不如一起要求按筐加价。{boss}骂了两句，最后还是添了半克朗。回村的车上，{picker}把多出的钱塞回{subject}手里，说这是你争来的。',
        significance: 0.76,
        fx: {
          cash: 5,
          role: 'crew_leader',
          relation: [
            ['picker', 'friend', 0.18, 0.05],
            ['boss', 'rival', -0.08, 0],
          ],
          flag: 'organized_grape_pickers',
        },
      },
    ],
    variants: [
      {
        id: 'war-women-in-the-vines',
        when: { processKinds: ['war_mobilization'] },
        title: '葡萄园里的女人',
        roles: {
          matron: ['worker', { minAge: 35, maxAge: 65 }],
        },
        outcomes: [
          {
            id: 'took-the-missing-men-s-hooks',
            w: 0.55,
            text: '{matron}把名册翻到新页，说男人都走了，今年女人顶上。{subject}接过剪刀，发现刃口缺了一块，握把上缠着男人的旧布条。第一天下来，掌心磨出血泡，{matron}用针挑了，说习惯就好。',
            significance: 0.72,
            fx: {
              cash: 3,
              role: 'wartime_vineyard_worker',
              health: -0.04,
              relation: ['matron', 'colleague', 0.08, 0],
              flag: 'women_harvested_vineyard',
            },
          },
          {
            id: 'hid-grapes-from-the-army',
            w: 0.45,
            text: '收工后，{matron}把{subject}留下，指着坡顶那片没剪的藤说，明天军队要来收葡萄，能藏多少藏多少。两人摸黑剪到半夜，篮子藏在石墙后面，露水把头发打得贴在额头上。',
            significance: 0.74,
            fx: {
              cash: 2,
              relation: ['matron', 'friend', 0.15, 0],
              flag: 'hid_grapes_from_army',
              knowledge: ['the army collects grapes from the upper rows tomorrow', 0.8, 'matron'],
            },
          },
        ],
      },
    ],
    baseRate: 0.08,
    cooldownYears: 1,
  },

  // 8. Cattle disease ------------------------------------------------------
  {
    id: 'r2-rural.cattle-plague',
    title: '牛棚里的第一声咳',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['rural', 'cattle', 'disease', 'market', 'risk'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'market'],
    roles: {
      vet: ['worker', { minAge: 28, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      dealer: ['worker', { minAge: 30, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'culled-the-cow',
        w: 0.4,
        text: '{vet}掰开牛嘴看舌根，又把手贴在肩胛上听。他说是传染性胸膜肺炎，今天就得处理。{subject}把牛牵到坑边，牛还回头舔了舔{subjectPronoun}的袖子。枪响后，{vet}在记录本上写下日期，字迹很稳。',
        significance: 0.82,
        fx: {
          cash: -16,
          food: 2,
          relation: ['vet', 'acquaintance', 0.05, 0],
          flag: 'culled_sick_cow',
          knowledge: ['the herd must be watched for ten days', 0.85, 'vet'],
        },
      },
      {
        id: 'hid-the-cough',
        w: 0.35,
        text: '{subject}把病牛关进后院，用烧酒和草药灌了两天。{neighbor}隔着墙问是不是口蹄疫，{subject}说只是着了凉。第三天牛站起来吃草，{subject}却在夜里听见它咳嗽，一声接一声，像有人在棚里敲空桶。',
        significance: 0.74,
        fx: {
          cash: -4,
          health: -0.04,
          relation: ['neighbor', 'acquaintance', 0.02, 0],
          flag: 'hid_cattle_illness',
          knowledge: ['the cow still coughs at night', 0.85],
        },
      },
      {
        id: 'sold-at-meat-price',
        w: 0.25,
        when: { maxCash: 4 },
        text: '{dealer}在集市边上压低了价，说病牛也收，按肉价。{subject}数完钱，看着牛被牵上另一辆车，牛蹄在石板上打滑。回家路上，{vet}的马车从旁边过去，{subject}把帽檐拉低了。',
        significance: 0.78,
        fx: {
          cash: 9,
          reputation: -0.12,
          relation: ['vet', 'rival', -0.1, 0],
          flag: 'sold_sick_cow',
          knowledge: ['the dealer will resell the cow before the inspectors arrive', 0.7, 'dealer'],
        },
      },
    ],
    variants: [
      {
        id: 'crisis-quarantine',
        when: { processKinds: ['economic_crisis'] },
        title: '疫病与封锁',
        outcomes: [
          {
            id: 'sold-under-quarantine',
            w: 0.6,
            text: '村口设了石灰槽，{vet}说外村的牛一律不准进。{subject}家的牛刚好下崽，买主在封锁线外等了半天，最后压价三成牵走。{vet}在通行证上盖章时，说这不是他定的规矩。',
            significance: 0.72,
            fx: {
              cash: 6,
              food: -1,
              relation: ['vet', 'acquaintance', 0.03, 0],
              flag: 'sold_cattle_under_quarantine',
            },
          },
          {
            id: 'concealed-the-neighbor-s-burial',
            w: 0.4,
            text: '{neighbor}家的牛先病倒，夜里偷偷埋在河滩。{subject}看见了新土，没声张，只把自家的牛栏门钉死。第二天{vet}来巡查，问河滩上为什么有乌鸦，{neighbor}说那是去年的死羊。',
            significance: 0.7,
            fx: {
              relation: ['neighbor', 'colleague', 0.06, 0],
              flag: 'concealed_neighbor_cattle_death',
              knowledge: ['a cow is buried in the river meadow', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.045,
    cooldownYears: 4,
  },

  // 9. Village fair and church festival ------------------------------------
  {
    id: 'r2-rural.kirtag',
    title: '教堂节上的旋转木马',
    domain: 'culture',
    stage: 'adulthood',
    ages: [16, 70],
    tags: ['rural', 'festival', 'church', 'courtship', 'theft'],
    contexts: ['rural', 'small_town', 'peace', 'war'],
    milieus: ['farm', 'rural', 'shop', 'market'],
    roles: {
      priest: ['neighbor', { minAge: 35, maxAge: 75 }],
      rival: ['worker', { minAge: 16, maxAge: 30 }],
      sibling: ['sibling', { minAge: 12, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'carried-the-banner',
        w: 0.4,
        text: '教堂节那天，{priest}把圣像抬到广场，铜管乐队跟在后面，吹得走调。{subject}举着旗帜走过面包摊，旗杆上的漆蹭了一手。{rival}在人群里喊{subject}的名字，声音被钟声盖住，只看见嘴在动。',
        significance: 0.68,
        fx: {
          reputation: 0.06,
          role: 'festival_banner_bearer',
          relation: ['rival', 'acquaintance', 0.06, 0],
          flag: 'carried_festival_banner',
        },
      },
      {
        id: 'honey-cake-and-a-promise',
        w: 0.35,
        when: { maxAge: 25 },
        text: '傍晚，木马棚边有人拉手风琴。{subject}和{rival}挤在人群后面，分吃一块蜂蜜饼。{rival}说等攒够钱就去维也纳，{subject}说葡萄园离不开人。话没说完，{sibling}在远处喊回家喂牛。',
        significance: 0.6,
        fx: {
          mood: 0.08,
          relation: ['rival', 'friend', 0.12, 0.05],
          flag: 'kirtag_romance',
        },
      },
      {
        id: 'cut-purse-at-the-fair',
        w: 0.25,
        text: '散场时，{subject}发现口袋里的四克朗不见了，只剩一个被割开的口子。{priest}在教堂门口点灯，说节日的扒手比平时勤快。{sibling}把自己剩下的铜板分了一半，一路没提丢钱的事。',
        significance: 0.66,
        fx: {
          cash: -4,
          relation: ['sibling', 'colleague', 0.1, 0],
          flag: 'robbed_at_kirtag',
        },
      },
    ],
    variants: [
      {
        id: 'war-kirtag',
        when: { processKinds: ['war_mobilization'] },
        title: '没有木马的教堂节',
        outcomes: [
          {
            id: 'offering-for-the-front',
            w: 0.55,
            text: '教堂节缩成一场弥撒。{priest}念到阵亡名单时停了停，广场上只剩风吹旗绳的声音。{subject}把自家最后一篮苹果放在教堂门口，说是给从前线回来的人。风把篮子的提手吹得直响。',
            significance: 0.7,
            fx: {
              food: -1,
              reputation: 0.05,
              relation: ['priest', 'friend', 0.08, 0],
              flag: 'wartime_kirtag_offering',
            },
          },
          {
            id: 'searched-the-wounded',
            w: 0.45,
            text: '下午，几个伤兵被抬进村，{subject}把节日的长桌让出来当担架。{rival}的妹妹在人群里找哥哥，{subject}陪她把每一张脸都看了一遍，最后在教堂后墙看见一个空担架。',
            significance: 0.74,
            fx: {
              mood: -0.1,
              relation: ['rival', 'acquaintance', 0.08, 0.04],
              flag: 'searched_kirtag_for_wounded',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 1,
  },

  // 10. Mill toll and accident --------------------------------------------
  {
    id: 'r2-rural.mill-toll',
    title: '磨坊主的秤砣',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['rural', 'mill', 'toll', 'injury', 'craft'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'shop'],
    roles: {
      miller: ['worker', { minAge: 35, maxAge: 70 }],
      farmer: ['neighbor', { minAge: 25, maxAge: 70 }],
      mill: ['organization', { organizationKind: 'household_firm' }],
      worker: ['worker', { minAge: 16, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'paid-the-toll',
        w: 0.35,
        text: '{miller}把秤砣往斗边一挂，说磨一斗麦抽一升面，这是祖上传下的规矩。{subject}看着面粉从漏斗里流进他的袋，想问又咽回去。{farmer}在门口咳了一声，说去年还是半升。',
        significance: 0.64,
        fx: {
          food: -2,
          cash: -2,
          relation: ['miller', 'acquaintance', 0.02, 0],
          flag: 'paid_mill_toll',
        },
      },
      {
        id: 'weighed-the-toll',
        w: 0.4,
        when: { skill: { name: 'numeracy', min: 0.35 } },
        text: '{subject}自带了一杆小秤，把磨好的面当场复称，差了两百克。{miller}说秤砣受潮，{subject}把秤砣拿起来，底下粘着一块铅。排队的人都不说话，只有磨轮还在转。',
        significance: 0.82,
        fx: {
          role: 'mill_auditor',
          relation: ['miller', 'rival', -0.2, 0],
          reputation: 0.06,
          flag: 'exposed_mill_short_weight',
          knowledge: ['the miller’s weight has a lead plug in its base', 0.9],
        },
      },
      {
        id: 'caught-in-the-gearing',
        w: 0.25,
        text: '工人往磨眼添麦时，袖子被传动带咬住。{miller}扑过去拉闸，磨轮空转了半天才停。人被抬到门板上，手已经变了形。{subject}帮着按住肩膀，听见他一路喊的不是疼，是家里的牛还没喂。',
        significance: 0.86,
        fx: {
          health: -0.02,
          relation: ['worker', 'colleague', 0.1, 0],
          flag: 'witnessed_mill_accident',
          raw: [
            {
              type: 'condition',
              personId: '$worker',
              condition: 'crushed_hand',
              add: true,
              reason: 'caught in the mill gearing',
            },
          ],
        },
      },
    ],
    variants: [
      {
        id: 'war-army-mill',
        when: { processKinds: ['war_mobilization'] },
        title: '军粮磨坊',
        outcomes: [
          {
            id: 'walked-to-the-lower-mill',
            w: 0.6,
            text: '磨坊被征用，门口站着哨兵。{miller}说现在只磨军粮，村民要磨面得去下游的水磨。{subject}背着麦子走了六里路，回来时天黑了，袋底漏出的面粉在身后留了一道白线。',
            significance: 0.68,
            fx: {
              cash: -3,
              food: -1,
              flag: 'used_distant_mill',
            },
          },
          {
            id: 'ground-at-the-back-window',
            w: 0.4,
            text: '{subject}半夜把麦子从磨坊后窗递进去，{miller}不收钱，只抓了两把面当谢礼。磨轮用布裹着，声音闷在墙里。走的时候，{miller}说下周别来了，哨兵换了人。',
            significance: 0.7,
            fx: {
              food: 2,
              relation: ['miller', 'colleague', 0.08, 0],
              flag: 'ground_grain_at_night',
              knowledge: ['the mill still runs for villagers at night', 0.8, 'miller'],
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 11. Well contamination -------------------------------------------------
  {
    id: 'r2-rural.well-contamination',
    title: '井里的死老鼠',
    domain: 'health',
    stage: 'adulthood',
    ages: [16, 75],
    tags: ['rural', 'water', 'health', 'neighbor', 'institution'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'reform'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      official: ['official', { minAge: 28, maxAge: 65 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'sealed-the-well',
        w: 0.4,
        text: '{subject}打上来的第三桶水有股土腥味，桶底沉着几根细毛。{neighbor}探头看了一眼，说井壁塌了，老鼠掉进去了。两人把水倒进沟里，用石灰封了井口，整个院子傍晚都在借水。',
        significance: 0.74,
        fx: {
          health: -0.04,
          cash: -2,
          relation: ['neighbor', 'colleague', 0.1, 0],
          flag: 'sealed_contaminated_well',
        },
      },
      {
        id: 'waited-for-the-district',
        w: 0.35,
        text: '{official}来验水，把一只玻璃瓶对着太阳看了很久，说大肠菌太多，得等公署派工来淘井。{subject}问要等几天，{official}说要看路费和人手。院子里的人排着队，把桶放在脚边，谁也不先走。',
        significance: 0.7,
        fx: {
          reputation: 0.04,
          relation: ['official', 'acquaintance', 0.04, 0],
          flag: 'reported_well_contamination',
          knowledge: ['the district will send a well crew when it has money', 0.8, 'official'],
        },
      },
      {
        id: 'cleaned-it-by-hand',
        w: 0.25,
        when: { maxCash: 4 },
        text: '{subject}没有等公署，自己下井淘泥。绳子在井沿上磨得发毛，井底的水没到腰。捞上来的除了烂叶，还有一只泡胀的猫。{neighbor}在上面喊，问看见什么了，{subject}说没什么，把猫装进麻袋。',
        significance: 0.76,
        fx: {
          health: -0.08,
          condition: 'well_cleaning_strain',
          cash: -1,
          relation: ['neighbor', 'friend', 0.08, 0],
          flag: 'cleaned_well_by_hand',
        },
      },
    ],
    variants: [
      {
        id: 'reform-new-pump',
        when: { legacyKinds: ['reform'] },
        title: '公署的新水泵',
        outcomes: [
          {
            id: 'signed-for-the-pump',
            w: 0.6,
            text: '{council}的人带来一台手压泵，说公署出三分之二，剩下的按户摊。{subject}把分摊的钱数念给{neighbor}听，{neighbor}说这比淘井便宜。装泵那天，孩子们围着铁管，等第一股水出来。',
            significance: 0.72,
            fx: {
              cash: -5,
              relation: ['neighbor', 'colleague', 0.08, 0],
              membership: ['council', true, 'contributed to the village pump'],
              flag: 'installed_village_pump',
            },
          },
          {
            id: 'refused-the-assessment',
            w: 0.4,
            text: '{subject}把分摊单推回去，说自家有井，凭什么替别人出钱。{official}在名单上划掉{subject}的名字，泵还是装在了广场上。入冬后旧井又浑了，{subject}提着桶去广场，排在{neighbor}后面。',
            significance: 0.7,
            fx: {
              reputation: -0.05,
              relation: ['neighbor', 'rival', -0.08, 0],
              flag: 'refused_pump_assessment',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 12. Barn fire ---------------------------------------------------------
  {
    id: 'r2-rural.barn-fire',
    title: '谷仓夜里的红光',
    domain: 'civic',
    stage: 'adulthood',
    ages: [16, 72],
    tags: ['rural', 'fire', 'neighbor', 'loss', 'insurance'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      sibling: ['sibling', { minAge: 14, maxAge: 70 }],
      brigade: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'saved-the-horses',
        w: 0.35,
        text: '{subject}被焦味呛醒时，谷仓的屋顶已经红了一半。{neighbor}提着水桶从巷口跑来，两人把门板卸下来，赶在火势蔓延前把两匹马牵出去。马在院子里转圈，鬃毛上还带着火星。',
        significance: 0.8,
        fx: {
          health: -0.06,
          relation: ['neighbor', 'friend', 0.15, 0.05],
          flag: 'saved_horses_from_barn_fire',
        },
      },
      {
        id: 'lost-the-barn',
        w: 0.4,
        text: '火从草料棚烧起来，等{brigade}的手压泵接上井水，谷仓只剩黑梁。{subject}和{sibling}在灰里扒出半袋没烧透的麦子，袋口一碰就碎。{sibling}蹲在地上，把焦麦一粒粒捡进帽子。',
        significance: 0.84,
        fx: {
          cash: -18,
          food: -3,
          relation: ['sibling', 'colleague', 0.1, 0],
          flag: 'lost_barn_to_fire',
        },
      },
      {
        id: 'contained-the-fire',
        w: 0.25,
        when: { skill: { name: 'craft', min: 0.3 } },
        text: '{subject}没有泼水，先爬上侧棚把通风口堵死，火被闷在草料棚里。{brigade}的人来后说这法子救下了正屋。{neighbor}却在灰堆边捡到一只油灯，灯底刻着外村商贩的名字。',
        significance: 0.78,
        fx: {
          skill: { craft: 0.03 },
          reputation: 0.06,
          relation: ['neighbor', 'acquaintance', 0.04, 0],
          flag: 'contained_barn_fire',
          knowledge: ['a lamp from an out-of-village pedlar was found in the ashes', 0.7],
        },
      },
    ],
    variants: [
      {
        id: 'war-brigade-at-the-front',
        when: { processKinds: ['war_mobilization'] },
        title: '消防队上了前线',
        outcomes: [
          {
            id: 'bucket-line',
            w: 0.6,
            text: '村里的消防队大半上了前线，只剩一架手压泵和几个老人。火起时，{subject}站在井边传水桶，桶从一只手到另一只手，等传到谷仓，水只剩半桶。天亮时，草料棚塌成一堆黑灰。',
            significance: 0.76,
            fx: {
              cash: -12,
              food: -2,
              health: -0.05,
              flag: 'bucket_line_after_fire',
            },
          },
          {
            id: 'saved-the-seed-grain',
            w: 0.4,
            text: '{subject}冲进还没着火的侧屋，把明年播种的几袋麦种拖出来。麻袋在门槛上磨破，麦粒撒了一地。{neighbor}一边扑火一边骂，说命比种子值钱。{subject}没回嘴，只把袋口扎紧。',
            significance: 0.74,
            fx: {
              food: 2,
              health: -0.06,
              relation: ['neighbor', 'colleague', 0.06, 0],
              flag: 'saved_seed_grain',
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 6,
  },

  // 13. Poacher and gamekeeper --------------------------------------------
  {
    id: 'r2-rural.poacher',
    title: '林子边的一只野兔',
    domain: 'crime',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'forest', 'poaching', 'hunger', 'authority'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'land', 'home'],
    roles: {
      gamekeeper: ['worker', { minAge: 30, maxAge: 65 }],
      poacher: ['neighbor', { minAge: 18, maxAge: 60 }],
      gendarme: ['official', { minAge: 25, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'warned-the-poacher',
        w: 0.4,
        text: '{gamekeeper}的灯在林子里晃，{poacher}蹲在灌木后，脚边一只野兔还在抽腿。{subject}把篮子踢到他手边，又朝另一头扔了块石头。灯转过去了，{poacher}提着兔子钻进沟里，连声谢都没敢说。',
        significance: 0.74,
        fx: {
          reputation: -0.03,
          relation: ['poacher', 'friend', 0.18, 0.05],
          flag: 'warned_poacher',
        },
      },
      {
        id: 'shared-the-meat',
        w: 0.35,
        when: { maxCash: 3 },
        text: '{poacher}把兔子分成两半，硬塞给{subject}一半。回家炖了一锅，肉香从门缝飘到街上。第二天{gamekeeper}来问夜里谁在林子里，{subject}说只听见风。锅里的骨头还没扔。',
        significance: 0.7,
        fx: {
          food: 3,
          relation: ['poacher', 'colleague', 0.1, 0],
          flag: 'accepted_poached_meat',
        },
      },
      {
        id: 'informed-on-the-poacher',
        w: 0.25,
        text: '{subject}把{poacher}的脚印指给{gendarme}看，换来两克朗赏钱。{poacher}被带走时，他女人站在门口，手里还攥着一把没摘完的野菜。{gamekeeper}拍了拍{subject}的肩，说以后林子里的路好走了。',
        significance: 0.78,
        fx: {
          cash: 2,
          relation: ['poacher', 'rival', -0.3, -0.1],
          reputation: 0.06,
          flag: 'informed_on_poacher',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-hunger-in-the-woods',
        when: { processKinds: ['economic_crisis'] },
        title: '饥荒里的套索',
        outcomes: [
          {
            id: 'set-snares-together',
            w: 0.55,
            text: '面粉涨到买不起，{poacher}在林子深处下了三道套索。{subject}帮他望风，雪地上只留两行脚印。第二天套住一只瘦狍子，两人在沟里分肉，血把雪染黑了一小片。{gamekeeper}的狗在远处叫。',
            significance: 0.78,
            fx: {
              food: 4,
              relation: ['poacher', 'friend', 0.15, 0],
              flag: 'poached_during_famine',
              knowledge: ['three snares are set in the upper wood', 0.8],
            },
          },
          {
            id: 'burned-the-snares',
            w: 0.45,
            text: '{subject}找到套索，把它们一根根割断，埋在雪里。{poacher}第二天来问，{subject}说林子封了，再下套就轮到宪兵来搜。{poacher}没说话，只把空手插进袖口，站了很久。',
            significance: 0.7,
            fx: {
              relation: ['poacher', 'rival', -0.15, -0.05],
              flag: 'cut_poacher_snares',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 14. Landlord's agent ---------------------------------------------------
  {
    id: 'r2-rural.land-agent',
    title: '账房先生的靴子',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'rent', 'authority', 'corruption', 'land'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      agent: ['official', { minAge: 35, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'bribed-with-a-bottle',
        w: 0.4,
        text: '{agent}穿着黑靴子走进葡萄行，靴底沾满湿泥。他用手杖拨开叶子，说东家怀疑{subject}把好酒藏了，今年要按去年的两成加租。{subject}把一瓶酒塞进他的鞍袋，他推了一次，第二次没推。',
        significance: 0.74,
        fx: {
          cash: -4,
          relation: ['agent', 'colleague', 0.06, 0],
          flag: 'bribed_land_agent',
          knowledge: ['the agent will forget the rent increase for one bottle', 0.8],
        },
      },
      {
        id: 'read-the-accounts-aloud',
        w: 0.35,
        text: '{agent}把账本摊在石磨上，一页页念欠项。{subject}没有争，只叫{neighbor}和另外三户来听。念到“修渠摊派”时，{neighbor}问渠在哪，{agent}把那一页翻了过去。',
        significance: 0.78,
        fx: {
          role: 'tenant_delegate',
          reputation: 0.08,
          relation: [
            ['neighbor', 'friend', 0.12, 0],
            ['agent', 'rival', -0.1, 0],
          ],
          flag: 'challenged_land_agent',
        },
      },
      {
        id: 'prepaid-the-rent',
        w: 0.25,
        when: { minCash: 8 },
        text: '{subject}把该交的租子提前放在桌上，又请{agent}去看新买的压榨机。{agent}摸着机器说东家会高兴，转身把加租的话咽了回去。{subject}送他到门口，看见他的靴跟已经磨偏。',
        significance: 0.7,
        fx: {
          cash: -10,
          relation: ['agent', 'acquaintance', 0.08, 0],
          flag: 'prepaid_rent_to_agent',
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 15. Tithe --------------------------------------------------------------
  {
    id: 'r2-rural.tithe',
    title: '什一税的最后一口袋',
    domain: 'religion',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'church', 'tax', 'grain', 'negotiation'],
    contexts: ['rural', 'agriculture', 'peace', 'reform'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      collector: ['official', { minAge: 30, maxAge: 65 }],
      priest: ['neighbor', { minAge: 35, maxAge: 75 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      parish: ['organization', { organizationKind: 'church' }],
    },
    outcomes: [
      {
        id: 'paid-the-tithe',
        w: 0.4,
        text: '{collector}把斗放在教堂门口，说今年按捆算，不按重量。{subject}把最后一袋黑麦倒进去，袋底翻过来抖了抖，落下几粒瘪谷。{priest}在旁边记账，笔尖在“实收”一栏停了停。',
        significance: 0.68,
        fx: {
          food: -3,
          cash: -2,
          relation: ['collector', 'acquaintance', 0.02, 0],
          flag: 'paid_tithe',
        },
      },
      {
        id: 'haggled-over-the-bushel',
        w: 0.35,
        when: { skill: { name: 'social', min: 0.3 } },
        text: '{subject}请{collector}进屋喝汤，把家里五个孩子一个一个叫来给他看。{collector}喝完汤，把斗换成了小一号的，说剩下的算教会的仁慈。{priest}在门外听见，没有进来。',
        significance: 0.7,
        fx: {
          food: -1,
          cash: -1,
          relation: ['collector', 'colleague', 0.08, 0],
          flag: 'negotiated_tithe',
        },
      },
      {
        id: 'hid-a-sack-in-the-loft',
        w: 0.25,
        text: '{subject}把一袋麦子藏进阁楼的干草里，上面压着旧渔网。{collector}数完明面上的捆数，用棍子在草堆里戳了两下，没戳到底。他走后，{neighbor}在墙外说：你家的烟囱今天冒烟太早。',
        significance: 0.74,
        fx: {
          food: 1,
          relation: ['neighbor', 'acquaintance', 0.03, 0],
          flag: 'hid_tithe_grain',
          knowledge: ['a sack of grain is hidden under the loft hay', 0.75],
        },
      },
    ],
    variants: [
      {
        id: 'reform-commuted-tithe',
        when: { legacyKinds: ['reform'] },
        title: '什一税改了章程',
        outcomes: [
          {
            id: 'assessed-by-the-hectare',
            w: 0.6,
            text: '{parish}贴出告示，说什一税改成交钱，按地亩算。{subject}把地契翻出来，发现自家那块河滩地被算成了三等。{priest}说章程是公署定的，他只管收。{subject}在告示下面站了很久。',
            significance: 0.7,
            fx: {
              cash: -5,
              relation: ['priest', 'rival', -0.06, 0],
              flag: 'tithe_commuted_to_cash',
            },
          },
          {
            id: 'appealed-the-assessment',
            w: 0.4,
            text: '{subject}和{neighbor}一起去公署递了复核申请。窗口的人把纸收下，说三个月内答复。回村的路上，{neighbor}说三个月后麦子都进了仓，谁还记得这张纸。',
            significance: 0.72,
            fx: {
              reputation: 0.05,
              relation: ['neighbor', 'colleague', 0.08, 0],
              flag: 'appealed_tithe_assessment',
              knowledge: ['the district has three months to answer the appeal', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 1,
  },

  // 16. Cooperative dairy --------------------------------------------------
  {
    id: 'r2-rural.dairy-coop',
    title: '奶桶上的共同印章',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'dairy', 'cooperative', 'market', 'institution'],
    contexts: ['rural', 'agriculture', 'peace', 'reform'],
    milieus: ['farm', 'rural', 'land', 'shop'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 70 }],
      coop: ['organization', { organizationKind: 'other' }],
      agronomist: ['official', { minAge: 28, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'joined-the-coop',
        w: 0.4,
        text: '{subject}把奶桶推到{coop}的收奶台前，{neighbor}用同一枚印章在桶盖上按了印。司秤的人说合作社统一卖价，月底分红。{subject}看着自家的奶倒进大罐，和别人的混在一起，忽然认不出哪一瓢是自己的。',
        significance: 0.74,
        fx: {
          cash: 2,
          role: 'coop_member',
          membership: ['coop', true, 'joined the dairy cooperative'],
          relation: ['neighbor', 'colleague', 0.08, 0],
          flag: 'joined_dairy_coop',
        },
      },
      {
        id: 'kept-selling-alone',
        w: 0.35,
        text: '{subject}没有入社，照旧把奶卖给路过的贩子。贩子压价，说合作社的奶已经够镇上卖了。{neighbor}来劝了两次，第三次带来一张社里的价目表。{subject}把表折好，压在奶桶下面。',
        significance: 0.68,
        fx: {
          cash: 1,
          relation: ['neighbor', 'acquaintance', 0.03, 0],
          flag: 'refused_dairy_coop',
        },
      },
      {
        id: 'soured-the-coop-milk',
        w: 0.25,
        text: '{subject}夜里往合作社的奶罐里倒了半桶酸水，第二天整罐奶都凝了。{neighbor}站在门口骂，说这是全村孩子的口粮。{agronomist}来查时，{subject}把空桶洗得比谁都干净。',
        significance: 0.8,
        fx: {
          reputation: -0.14,
          relation: ['neighbor', 'rival', -0.25, -0.05],
          funds: ['coop', -8, 'a whole churn of milk was soured'],
          flag: 'sabotaged_dairy_coop',
          knowledge: ['someone poured acid into the coop churn', 0.7],
        },
      },
    ],
    variants: [
      {
        id: 'reform-cream-separator',
        when: { legacyKinds: ['reform'] },
        title: '合作社的第一台离心机',
        outcomes: [
          {
            id: 'turned-the-separator',
            w: 0.6,
            text: '{coop}贷款买回一台离心机，{agronomist}来教大家分离奶油。{subject}把手摇柄摇到胳膊发酸，第一瓢奶油浮出来时，{neighbor}在门口鼓掌，掌心都是奶。',
            significance: 0.72,
            fx: {
              cash: 3,
              skill: { craft: 0.04 },
              relation: ['neighbor', 'colleague', 0.1, 0],
              flag: 'operated_cream_separator',
            },
          },
          {
            id: 'repaired-the-broken-bearing',
            w: 0.4,
            text: '机器坏了，{coop}请来的技工说要等维也纳的零件。{subject}把拆下来的轴承泡在煤油里，照{agronomist}画的样子磨了一个木垫。机器转起来了，但每转一圈就响一声。',
            significance: 0.7,
            fx: {
              skill: { craft: 0.03 },
              reputation: 0.05,
              relation: ['agronomist', 'colleague', 0.08, 0],
              flag: 'repaired_cream_separator',
            },
          },
        ],
      },
    ],
    baseRate: 0.055,
    cooldownYears: 2,
  },

  // 17. Village school -----------------------------------------------------
  {
    id: 'r2-rural.village-school',
    title: '只有一排课桌的学校',
    domain: 'education',
    stage: 'childhood',
    ages: [7, 14],
    tags: ['rural', 'school', 'childhood', 'teacher', 'literacy'],
    contexts: ['rural', 'small_town', 'peace', 'war', 'reform'],
    milieus: ['farm', 'rural', 'home', 'shop'],
    roles: {
      teacher: ['teacher', { minAge: 22, maxAge: 70 }],
      parent: ['parent', { minAge: 30, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'learned-the-letters',
        w: 0.4,
        text: '{subject}把石板放在膝盖上，{teacher}用粉笔在木板上写字母。教室里只有一排课桌，后排的孩子坐在倒扣的奶桶上。下课铃是一只旧牛铃，{teacher}摇的时候，窗外的羊也跟着叫。',
        significance: 0.72,
        fx: {
          education: ['primary', 1],
          skill: { literacy: 0.05 },
          role: 'pupil',
          flag: 'learned_letters_at_village_school',
        },
      },
      {
        id: 'kept-home-for-the-harvest',
        w: 0.35,
        text: '{parent}在门口等{subject}，说今天再不摘豆子，霜一来就全烂。{teacher}把课本合上，说落下的课自己补。{subject}跟着{parent}走进地里，手指沾满豆荚的绒毛，书包挂在篱笆上。',
        significance: 0.68,
        fx: {
          skill: { craft: 0.02 },
          relation: ['parent', 'kin', 0.04, 0],
          flag: 'kept_home_for_harvest',
        },
      },
      {
        id: 'kept-the-teacher',
        w: 0.25,
        text: '{teacher}说要调去镇上的大学校，村里凑不出补缺的钱。{subject}和同学把课桌擦得发亮，又在黑板上写了“老师别走”。{teacher}看了很久，最后把行李又放回讲台下面。',
        significance: 0.7,
        fx: {
          reputation: 0.04,
          relation: ['teacher', 'friend', 0.12, 0.05],
          flag: 'kept_village_teacher',
        },
      },
    ],
    variants: [
      {
        id: 'war-school-barracks',
        when: { processKinds: ['war_mobilization'] },
        title: '教室成了营房',
        outcomes: [
          {
            id: 'lessons-in-the-kitchen',
            w: 0.6,
            text: '军队征用了学校，课桌被堆到后院，{teacher}把{subject}和几个孩子带到自己家厨房上课。锅里煮着汤，{subject}在案板边上写字，字迹被蒸汽洇开。{parent}来接时，{teacher}说下周还不知道在哪。',
            significance: 0.72,
            fx: {
              education: ['primary', 1],
              skill: { literacy: 0.03 },
              flag: 'schooled_in_a_kitchen',
            },
          },
          {
            id: 'left-school-for-war-work',
            w: 0.4,
            text: '{subject}不去上课了，跟着{parent}去车站卸军粮。麻袋比人高，{subject}扛不动，只能帮着捡从破口漏下的麦粒。晚上{teacher}来敲门，{parent}说读书不能当饭吃。',
            significance: 0.7,
            fx: {
              skill: { craft: 0.02 },
              relation: ['teacher', 'acquaintance', -0.02, 0],
              flag: 'left_school_for_war_work',
            },
          },
        ],
      },
    ],
    baseRate: 0.08,
    cooldownYears: 1,
  },

  // 18. Rural midwife ------------------------------------------------------
  {
    id: 'r2-rural.midwife',
    title: '夜里的产婆',
    domain: 'health',
    stage: 'adulthood',
    ages: [25, 70],
    tags: ['rural', 'birth', 'medicine', 'neighbor', 'risk'],
    contexts: ['rural', 'agriculture', 'peace', 'war'],
    milieus: ['farm', 'rural', 'home'],
    roles: {
      mother: ['neighbor', { sex: 'female', minAge: 18, maxAge: 45 }],
      father: ['neighbor', { minAge: 20, maxAge: 50 }],
      doctor: ['official', { minAge: 28, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'delivered-a-healthy-child',
        w: 0.4,
        text: '{subject}在灶上烧水，把剪刀在火里过了两遍。{mother}抓住床沿，指节发白，{father}在门外来回走。天快亮时孩子哭出声，{subject}把湿布裹好，才觉得自己的后背也湿透了。',
        significance: 0.8,
        fx: {
          cash: 3,
          role: 'midwife',
          reputation: 0.1,
          relation: ['mother', 'friend', 0.2, 0.08],
          flag: 'delivered_a_child',
        },
      },
      {
        id: 'postpartum-haemorrhage',
        w: 0.35,
        text: '{mother}产后血止不住，{subject}把被单叠成垫子压上去，又让{father}去镇上请{doctor}。马车回来时，雪已经盖住车辙。{doctor}进门只看了一眼，说送得太晚，{subject}的手一直按着被单没松。',
        significance: 0.84,
        fx: {
          health: -0.02,
          relation: [
            ['mother', 'friend', 0.15, 0.05],
            ['doctor', 'rival', -0.06, 0],
          ],
          flag: 'postpartum_haemorrhage',
          raw: [
            {
              type: 'condition',
              personId: '$mother',
              condition: 'postpartum_weakness',
              add: true,
              reason: 'heavy bleeding after delivery',
            },
          ],
        },
      },
      {
        id: 'stillbirth-in-the-village',
        w: 0.25,
        text: '孩子生下来没有哭。{subject}把他翻过来拍背，拍了很久，屋里只有火塘的噼啪声。{mother}伸手要抱，{subject}把襁褓递过去，自己走到院子里，蹲在雪地上洗那把剪刀。',
        significance: 0.82,
        fx: {
          mood: -0.15,
          relation: ['mother', 'friend', 0.18, 0.05],
          flag: 'stillbirth_in_village',
        },
      },
    ],
    variants: [
      {
        id: 'war-doctor-at-the-front',
        when: { processKinds: ['war_mobilization'] },
        title: '医生在前线',
        outcomes: [
          {
            id: 'delivered-breech-alone',
            w: 0.6,
            text: '镇上唯一的医生上了前线，{subject}只能靠自己。{mother}难产，{subject}让{father}烧热水，把仅有的半瓶烧酒倒在手上。孩子出来时肩先露，{subject}转了三次才接住，天亮后才发现自己的袖子被咬破了。',
            significance: 0.84,
            fx: {
              cash: 2,
              reputation: 0.12,
              relation: ['mother', 'friend', 0.2, 0.1],
              flag: 'delivered_breech_birth_alone',
            },
          },
          {
            id: 'fetched-an-army-medic',
            w: 0.4,
            text: '{subject}去军营找医士，哨兵说医士在手术帐篷里。等了两个钟头，出来一个满手是血的年轻人，跟{subject}走了三里路。到门口时，孩子已经生下来了，{mother}自己咬断了脐带。',
            significance: 0.72,
            fx: {
              relation: [
                ['doctor', 'acquaintance', 0.08, 0],
                ['mother', 'colleague', 0.1, 0.05],
              ],
              flag: 'army_medic_assisted_birth',
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 1,
  },

  // 19. Village gossip -----------------------------------------------------
  {
    id: 'r2-rural.gossip',
    title: '井台边的第三遍话',
    domain: 'social',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['rural', 'gossip', 'reputation', 'courtship', 'neighbor'],
    contexts: ['rural', 'small_town', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'home', 'market'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      partner: ['partner', { minAge: 18, maxAge: 60 }],
      gossip: ['neighbor', { minAge: 30, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'confronted-the-gossip',
        w: 0.4,
        text: '{subject}在井台边堵住{gossip}，问她那句话是从谁嘴里听来的。{gossip}把水桶往地上一放，说全村都这么说。{neighbor}在旁边打水，绳子摇到一半停住了。{subject}没有吵，只把自家的桶提走，水洒了一路。',
        significance: 0.7,
        fx: {
          reputation: 0.04,
          relation: ['gossip', 'rival', -0.15, 0],
          flag: 'confronted_village_gossip',
        },
      },
      {
        id: 'added-a-detail',
        w: 0.35,
        text: '{subject}把听来的话添了一句，讲给{neighbor}听。三天后，{partner}在集市上被人拦住问，回家把篮子摔在桌上。{subject}说只是随口一提，{partner}说随口的话才最像真的。',
        significance: 0.76,
        fx: {
          reputation: -0.08,
          relation: [
            ['partner', 'rival', -0.2, -0.05],
            ['neighbor', 'acquaintance', 0.02, 0],
          ],
          flag: 'spread_village_gossip',
        },
      },
      {
        id: 'engagement-broken',
        w: 0.25,
        when: { relationKind: 'partner' },
        text: '{subject}什么也没解释，照旧去井台打水。{partner}等了三天，第四天把订婚的银戒指放在窗台上。{gossip}在巷口看见，转身就去敲下一家的门。第二天{subject}照常去井台，桶绳在手里勒出一道红印。',
        significance: 0.8,
        fx: {
          mood: -0.12,
          relation_end: ['partner', 'partner'],
          flag: 'engagement_broken_by_gossip',
        },
      },
    ],
    baseRate: 0.07,
    cooldownYears: 1,
  },

  // 20. Conscription of farmhands -----------------------------------------
  {
    id: 'r2-rural.conscription-farmhands',
    title: '征兵站的马车',
    domain: 'war',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['rural', 'war', 'conscription', 'labour', 'family'],
    contexts: ['rural', 'agriculture', 'war'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      officer: ['official', { minAge: 30, maxAge: 60 }],
      hand: ['worker', { minAge: 18, maxAge: 40 }],
      parent: ['parent', { minAge: 45, maxAge: 80 }],
    },
    outcomes: [
      {
        id: 'paid-a-substitute',
        w: 0.35,
        text: '{officer}把征兵名单钉在村委会门上，{hand}的名字在第三行。{subject}把两头猪赶到集市上卖了，又向{parent}借了八克朗，凑够替役钱。{hand}拿到钱时没抬头，只说秋后还。',
        significance: 0.82,
        fx: {
          cash: -20,
          relation: ['hand', 'friend', 0.12, 0],
          flag: 'paid_conscription_substitute',
        },
      },
      {
        id: 'hid-the-farmhand',
        w: 0.4,
        text: '{subject}把{hand}藏进谷仓的干草堆，上面压着两捆秸秆。{officer}带着猎犬来搜，狗在仓门口转了两圈，被{subject}扔出去的一块咸肉引开了。夜里{hand}从后墙翻出去，往北走了。',
        significance: 0.8,
        fx: {
          reputation: -0.05,
          relation: ['hand', 'friend', 0.2, 0.08],
          flag: 'hid_farmhand_from_conscription',
          knowledge: ['the farmhand crossed the northern boundary at night', 0.75, 'hand'],
        },
      },
      {
        id: 'lost-the-farmhand',
        w: 0.25,
        text: '{officer}把{hand}带上马车，{parent}追到村口，塞给他一双新纳的鞋。车走远了，{subject}还得去收那片没割完的麦子。镰刀在手里轻得不像话。',
        significance: 0.76,
        fx: {
          food: -2,
          condition: 'overworked',
          relation: ['hand', 'friend', 0.1, 0],
          flag: 'farmhand_conscripted',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-return-from-captivity',
        when: { legacyKinds: ['war_aftermath'] },
        title: '从战俘营回来的人',
        outcomes: [
          {
            id: 'returned-without-two-fingers',
            w: 0.6,
            text: '{hand}从战俘营回来时，少了两根手指，站在场院门口不敢进。{subject}把镰刀递给他，说今年的麦子还没割。{hand}试了试握把，刀掉了，两人都没去捡。',
            significance: 0.78,
            fx: {
              relation: ['hand', 'friend', 0.18, 0.08],
              condition: 'overworked',
              flag: 'farmhand_returned_from_captivity',
            },
          },
          {
            id: 'only-a-postcard-came-back',
            w: 0.4,
            text: '{hand}没有回来，只回来一张明信片，上面的字不是他的。{subject}把明信片钉在谷仓门后，每年换一根钉子。{parent}说别钉了，木头会烂。{subject}把钉子拔出来，第二年又钉了回去。',
            significance: 0.72,
            fx: {
              mood: -0.1,
              flag: 'farmhand_missing_after_war',
              knowledge: ['the postcard was written by someone else', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 21. Wartime requisition -----------------------------------------------
  {
    id: 'r2-rural.war-requisition',
    title: '征粮队的粉笔字',
    domain: 'war',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'war', 'requisition', 'grain', 'resistance'],
    contexts: ['rural', 'agriculture', 'war', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      officer: ['official', { minAge: 30, maxAge: 60 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      priest: ['neighbor', { minAge: 35, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'handed-over-the-grain',
        w: 0.4,
        text: '{officer}用粉笔在每家门上写征购数，写到{subject}家时，多画了一道。{subject}把粮袋拖出来，斗量到最后一袋，{officer}用靴尖踢了踢袋底，说不够干。{subject}把湿麦摊在院里，摊到半夜。',
        significance: 0.76,
        fx: {
          food: -5,
          cash: -3,
          relation: ['officer', 'acquaintance', 0.02, 0],
          flag: 'requisition_receipt',
        },
      },
      {
        id: 'hid-grain-in-the-crypt',
        w: 0.35,
        text: '{subject}和{priest}把六袋黑麦搬进教堂地窖，上面盖着旧圣袍。{officer}来查时，{priest}说教堂只有弥撒用的面。士兵走后，{priest}在地窖门口点了根蜡烛，说这不是第一次。',
        significance: 0.8,
        fx: {
          relation: ['priest', 'friend', 0.18, 0.1],
          flag: 'hid_grain_from_army',
          knowledge: ['six sacks of rye are under the church crypt', 0.85, 'priest'],
        },
      },
      {
        id: 'resisted-the-requisition',
        w: 0.25,
        text: '{subject}把征购单揉成一团，说仓里只剩种子。{officer}让士兵搬，{subject}挡在仓门口，被枪托推倒在石阶上。{neighbor}把{subjectPronoun}扶起来时，嘴角的血已经滴到衣领。',
        significance: 0.82,
        fx: {
          health: -0.1,
          condition: 'bruised_ribs',
          reputation: 0.06,
          relation: ['neighbor', 'friend', 0.1, 0],
          flag: 'resisted_grain_requisition',
        },
      },
    ],
    baseRate: 0.1,
    cooldownYears: 1,
  },

  // 22. Grain black market -------------------------------------------------
  {
    id: 'r2-rural.grain-black-market',
    title: '磨坊后门的黑麦',
    domain: 'economy',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'war', 'scarcity', 'black_market', 'grain'],
    contexts: ['rural', 'agriculture', 'war', 'crisis', 'postwar'],
    milieus: ['farm', 'rural', 'land', 'shop'],
    roles: {
      trader: ['neighbor', { minAge: 25, maxAge: 65 }],
      gendarme: ['official', { minAge: 25, maxAge: 60 }],
      miller: ['worker', { minAge: 35, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'sold-behind-the-mill',
        w: 0.4,
        text: '{trader}在磨坊后门等，秤藏在麻袋下面。{subject}把黑麦倒进他的斗，换回八克朗，钱上还带着烟味。{gendarme}的自行车铃在巷口响了一下，两人把袋口扎紧，装作在谈磨面。',
        significance: 0.78,
        fx: {
          cash: 8,
          relation: ['trader', 'colleague', 0.08, 0],
          flag: 'sold_on_black_market',
        },
      },
      {
        id: 'reported-the-trader',
        w: 0.35,
        text: '{subject}把交易的时间和秤的位置写在纸上，塞进{gendarme}的门缝。第二天{trader}的秤被没收，{subject}领到两克朗赏钱。磨坊后门空了，{miller}看{subject}的眼神像看一个陌生人。',
        significance: 0.8,
        fx: {
          cash: 2,
          reputation: 0.06,
          relation: [
            ['trader', 'rival', -0.3, -0.1],
            ['miller', 'rival', -0.12, 0],
          ],
          flag: 'reported_black_market',
        },
      },
      {
        id: 'bartered-for-salt',
        w: 0.25,
        text: '{subject}没有要钱，换了半袋盐和一小桶煤油。{trader}说盐比克朗稳，克朗明天就毛了。回家路上，{subject}把盐袋抱在怀里，听见里面沙沙响，像雪落在屋顶上。',
        significance: 0.7,
        fx: {
          food: 2,
          relation: ['trader', 'acquaintance', 0.06, 0],
          flag: 'bartered_grain_for_salt',
          knowledge: ['salt is the stable currency at the mill door', 0.75, 'trader'],
        },
      },
    ],
    baseRate: 0.08,
    cooldownYears: 1,
  },

  // 23. New railway station -----------------------------------------------
  {
    id: 'r2-rural.railway-station',
    title: '新站台的第一声汽笛',
    domain: 'civic',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'railway', 'land', 'market', 'reform'],
    contexts: ['rural', 'small_town', 'peace', 'reform', 'postwar'],
    milieus: ['farm', 'rural', 'land', 'shop', 'official'],
    roles: {
      stationmaster: ['official', { minAge: 30, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      railway: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'sold-the-pea-field',
        w: 0.35,
        text: '{stationmaster}带来一张线路图，说站台要修在{subject}家的豌豆地中间。补偿款按公署的价，一次付清。{subject}在图上按了手印，晚上去地里拔最后一茬豌豆，藤蔓缠住脚踝。',
        significance: 0.8,
        fx: {
          cash: 20,
          relation: ['stationmaster', 'acquaintance', 0.04, 0],
          flag: 'sold_land_to_railway',
        },
      },
      {
        id: 'opened-an-inn',
        w: 0.35,
        text: '{subject}把临街的屋子腾出来，摆了四张桌子，卖酒和煎蛋。第一班车进站时，汽笛把窗纸震得发抖。{stationmaster}来喝了一杯，说以后会有更多车，更多外乡人。',
        significance: 0.78,
        fx: {
          cash: -10,
          role: 'innkeeper',
          relation: ['stationmaster', 'colleague', 0.1, 0],
          flag: 'opened_inn_by_station',
        },
      },
      {
        id: 'protested-the-route',
        w: 0.3,
        text: '{subject}和{neighbor}把路线上的木桩一根根拔掉，堆在乡公所门口。{stationmaster}说这是公署的决定，{subject}说铁路会把他们和葡萄园隔开。最后路线改了三米，站台还是修了起来。',
        significance: 0.74,
        fx: {
          reputation: 0.08,
          relation: [
            ['stationmaster', 'rival', -0.15, 0],
            ['neighbor', 'friend', 0.1, 0],
          ],
          flag: 'protested_railway_route',
        },
      },
    ],
    variants: [
      {
        id: 'reform-milk-train',
        when: { legacyKinds: ['reform'] },
        title: '铁路与合作社',
        outcomes: [
          {
            id: 'shipped-milk-by-rail',
            w: 0.6,
            text: '{railway}在站台边设了冷藏车厢，{subject}第一次把鲜奶装上火车运往维也纳。{stationmaster}教他看时刻表，说误了这一班，奶就酸在站台上。{subject}把表折好，塞在帽子里。',
            significance: 0.72,
            fx: {
              cash: 4,
              skill: { numeracy: 0.03 },
              role: 'milk_shipper',
              relation: ['stationmaster', 'colleague', 0.08, 0],
              flag: 'shipped_milk_by_rail',
            },
          },
          {
            id: 'prices-followed-the-train',
            w: 0.4,
            text: '站台修好后，镇上的粮价跟着维也纳的行情走。{subject}发现今年的麦子卖得比去年高，但租子也涨了。{stationmaster}说铁路把什么都拉近了，包括账房先生。',
            significance: 0.7,
            fx: {
              cash: 2,
              flag: 'railway_linked_prices',
              knowledge: ['grain prices now follow the Vienna market', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 5,
  },

  // 24. Land sale to a speculator -----------------------------------------
  {
    id: 'r2-rural.land-speculator',
    title: '城里来的地契',
    domain: 'economy',
    stage: 'adulthood',
    ages: [22, 72],
    tags: ['rural', 'land', 'speculation', 'cooperative', 'conflict'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'reform'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      speculator: ['neighbor', { minAge: 35, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      coop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'sold-to-the-city',
        w: 0.35,
        text: '{speculator}穿着城里人的呢大衣，站在地头用手杖画了一个圈，说这一片要盖避暑别墅。{subject}听完价，问了一句：葡萄园也铲？{speculator}说葡萄园不值钱。{subject}在契约上签了名。',
        significance: 0.82,
        fx: {
          cash: 22,
          relation: ['speculator', 'acquaintance', 0.04, 0],
          flag: 'sold_land_to_speculator',
          knowledge: ['the buyer plans villas, not vines', 0.85, 'speculator'],
        },
      },
      {
        id: 'refused-the-offer',
        w: 0.35,
        text: '{subject}把契约推回去，说地是祖上传下来的，不卖。{speculator}笑了笑，说邻居们都签了，到时候路一修，剩下的地也种不成。{subject}站在门口看他走远，手杖在碎石上敲得很响。',
        significance: 0.74,
        fx: {
          relation: ['speculator', 'rival', -0.1, 0],
          reputation: 0.05,
          flag: 'refused_speculator_offer',
        },
      },
      {
        id: 'bought-it-through-the-coop',
        w: 0.3,
        text: '{subject}连夜去找{neighbor}和另外几户，凑钱把坡下的地先买下来，再转给{coop}。{speculator}第二天来，发现地契已经换了名字。{subject}把合同锁进柜子，钥匙交给{coop}的会计。',
        significance: 0.84,
        fx: {
          cash: -12,
          role: 'land_coop_member',
          membership: ['coop', true, 'bought land ahead of the speculator'],
          relation: ['neighbor', 'friend', 0.15, 0.05],
          flag: 'blocked_speculator_purchase',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-distress-sale',
        when: { processKinds: ['economic_crisis'] },
        title: '贱卖',
        outcomes: [
          {
            id: 'sold-under-distress',
            w: 0.6,
            text: '银行催贷，{subject}只能把河滩地卖给{speculator}。价钱只有三年前的一半，{speculator}还要{subject}把界石挪半米。{subject}蹲下去搬石头，手指抠进湿泥里。',
            significance: 0.8,
            fx: {
              cash: 12,
              relation: ['speculator', 'rival', -0.06, 0],
              flag: 'sold_land_under_distress',
            },
          },
          {
            id: 'mortgaged-to-the-coop',
            w: 0.4,
            text: '{subject}把地契押给{coop}，换了三个月期限。{neighbor}说合作社不是银行，{subject}说总比卖给城里人强。签字时，笔尖在纸上洇开一个黑点。',
            significance: 0.78,
            fx: {
              cash: 8,
              condition: 'debt_pressure',
              membership: ['coop', true, 'mortgaged land to the cooperative'],
              relation: ['neighbor', 'acquaintance', 0.04, 0],
              flag: 'mortgaged_land_to_coop',
            },
          },
        ],
      },
    ],
    baseRate: 0.045,
    cooldownYears: 3,
  },

  // 25. Tenant eviction ----------------------------------------------------
  {
    id: 'r2-rural.tenant-eviction',
    title: '门槛上的封条',
    domain: 'civic',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'eviction', 'rent', 'neighbor', 'law'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'postwar'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      steward: ['official', { minAge: 35, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'paid-to-stay',
        w: 0.35,
        text: '{steward}把封条贴在门框上，说欠租到期。{subject}去当铺押了母亲的银十字架，又向{neighbor}借了五克朗，凑齐十五克朗。{steward}数完钱，把封条撕下来，纸还粘着半扇门。',
        significance: 0.78,
        fx: {
          cash: -15,
          relation: [
            ['steward', 'acquaintance', 0.04, 0],
            ['neighbor', 'friend', 0.12, 0],
          ],
          flag: 'paid_to_stay_on_land',
        },
      },
      {
        id: 'tenants-stood-together',
        w: 0.35,
        text: '{subject}没有去当铺，而是把{neighbor}和另外三户请到家里，把封条摊在桌上。大家凑了九克朗，又一起去{steward}门口站着。{steward}出来时，看见的不是一户人。',
        significance: 0.82,
        fx: {
          cash: 9,
          role: 'tenant_delegate',
          reputation: 0.1,
          relation: [
            ['neighbor', 'friend', 0.2, 0.05],
            ['steward', 'rival', -0.12, 0],
          ],
          flag: 'tenants_stood_together',
        },
      },
      {
        id: 'left-with-the-cart',
        w: 0.3,
        text: '{subject}把家具装上板车，锅碗用绳子捆在车尾。{steward}站在门口看着，没有催。走到村口时，{subject}回头看了一眼那扇门，门上的封条被风吹起一角。',
        significance: 0.84,
        fx: {
          cash: -3,
          condition: 'evicted',
          move: ['@rural', 'left the tenant farm after eviction'],
          flag: 'evicted_from_tenant_farm',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-land-distribution',
        when: { legacyKinds: ['war_aftermath'] },
        title: '战后分地',
        outcomes: [
          {
            id: 'received-temporary-tenure',
            w: 0.6,
            text: '公署把东家的地分给复员士兵和佃户。{subject}拿到一张临时地契，上面写着“试用三年”。{steward}来收租时，{subject}把地契给他看，他看了很久，说这纸不归他管了。',
            significance: 0.8,
            fx: {
              cash: 4,
              relation: ['steward', 'acquaintance', 0.02, 0],
              flag: 'received_postwar_land_tenure',
              knowledge: ['the new tenure is provisional for three years', 0.85],
            },
          },
          {
            id: 'excluded-from-the-list',
            w: 0.4,
            text: '分地名单上没有{subject}的名字，因为{steward}说{subject}欠租。{subject}去公署问，窗口的人说先还清旧账。回家的路上，{subject}把那张申诉纸折成四折，塞进鞋底。',
            significance: 0.74,
            fx: {
              mood: -0.12,
              condition: 'rent_arrears',
              flag: 'excluded_from_postwar_land_distribution',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 26. Wine fraud ---------------------------------------------------------
  {
    id: 'r2-rural.wine-fraud',
    title: '酒桶里的糖水',
    domain: 'economy',
    stage: 'adulthood',
    ages: [20, 70],
    tags: ['rural', 'wine', 'fraud', 'market', 'inspection'],
    contexts: ['rural', 'vineyard', 'peace', 'crisis', 'reform'],
    milieus: ['farm', 'rural', 'land', 'shop'],
    roles: {
      merchant: ['worker', { minAge: 30, maxAge: 65 }],
      inspector: ['official', { minAge: 28, maxAge: 65 }],
      coop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'watered-the-wine',
        w: 0.35,
        text: '{merchant}说维也纳的酒商只看出价，不看颜色。{subject}往桶里兑了糖水和苹果汁，搅到酒面起了一层细泡。封桶时，{merchant}在标签上写“一九一一年，特级”。{subject}的手在围裙上擦了两遍。',
        significance: 0.8,
        fx: {
          cash: 9,
          reputation: -0.12,
          relation: ['merchant', 'colleague', 0.08, 0],
          flag: 'adulterated_wine',
          knowledge: ['the barrels are labelled as a superior vintage', 0.8],
        },
      },
      {
        id: 'refused-to-water-it',
        w: 0.35,
        text: '{subject}把糖水桶推到一边，说这酒要卖给镇上的人。{merchant}把订单收了回去，说那你自己喝吧。{subject}看着他的马车走远，桶里的酒还在轻轻晃，映出屋檐的一角。',
        significance: 0.74,
        fx: {
          cash: -6,
          relation: ['merchant', 'rival', -0.18, 0],
          reputation: 0.04,
          flag: 'refused_to_adulterate_wine',
        },
      },
      {
        id: 'testified-about-the-fraud',
        w: 0.3,
        text: '{subject}把掺酒的配方抄在纸上，交给{inspector}。{inspector}带人查封了{merchant}的库房，翻出三十桶贴假标签的酒。{coop}的人来请{subject}去讲怎么辨酒，{subject}站在台上，半天没说出话。',
        significance: 0.84,
        fx: {
          cash: 3,
          role: 'wine_witness',
          reputation: 0.08,
          membership: ['coop', true, 'testified about adulterated wine'],
          relation: ['merchant', 'rival', -0.3, -0.1],
          flag: 'exposed_wine_fraud',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-wine-tax',
        when: { processKinds: ['economic_crisis'] },
        title: '酒税与假酒',
        outcomes: [
          {
            id: 'moved-the-wine-out-the-back',
            w: 0.6,
            text: '酒税涨了，{merchant}把税票贴在空桶上，真酒从后门走。{subject}帮他搬桶时，看见税票的日期是去年的。{merchant}说没人查，查了也只是罚钱了事。',
            significance: 0.76,
            fx: {
              cash: 5,
              relation: ['merchant', 'colleague', 0.06, 0],
              flag: 'evaded_wine_tax',
              knowledge: ['the tax stamps on the barrels are a year old', 0.8],
            },
          },
          {
            id: 'hid-the-real-ledger',
            w: 0.4,
            text: '税务员来查库，{subject}把真账本藏在酒糟里，交出一本假的。税务员翻了两页，问为什么今年的产量比去年少一半。{subject}说霜霉病，指了指墙角的枯藤。',
            significance: 0.78,
            fx: {
              cash: 3,
              skill: { social: 0.02 },
              flag: 'hid_wine_ledger',
              knowledge: ['the real ledger is buried in the wine lees', 0.85],
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 27. Mortgage -----------------------------------------------------------
  {
    id: 'r2-rural.mortgage',
    title: '抵押葡萄园的那支笔',
    domain: 'economy',
    stage: 'adulthood',
    ages: [22, 72],
    tags: ['rural', 'debt', 'bank', 'vineyard', 'risk'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      banker: ['official', { minAge: 30, maxAge: 65 }],
      notary: ['official', { minAge: 30, maxAge: 70 }],
      sibling: ['sibling', { minAge: 18, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'signed-the-mortgage',
        w: 0.4,
        text: '{banker}把抵押书推过来，指着利率那一栏，说三年还清，逾期园子归银行。{subject}数了三遍零，还是签了。{notary}盖章时，蜡油滴在纸角，像一滴干掉的血。',
        significance: 0.82,
        fx: {
          cash: 18,
          condition: 'mortgaged_vineyard',
          relation: ['banker', 'acquaintance', 0.03, 0],
          flag: 'signed_vineyard_mortgage',
          knowledge: ['the vineyard is forfeit if the loan runs three years', 0.9, 'banker'],
        },
      },
      {
        id: 'sold-the-cow-instead',
        w: 0.35,
        text: '{subject}没有签，回家把奶牛牵到集市。买主压价，说牛老了。{subject}摸着牛角，想起它第一年下崽时，{sibling}还在院里放鞭炮。钱揣进兜里，牛绳交出去时，手心空了一下。',
        significance: 0.74,
        fx: {
          cash: 8,
          food: -2,
          relation: ['sibling', 'acquaintance', 0.02, 0],
          flag: 'sold_cow_instead_of_mortgage',
        },
      },
      {
        id: 'rented-the-meadow',
        w: 0.25,
        when: { minCash: 8 },
        text: '{subject}把抵押书带回家，和{sibling}算了一夜。两人把河滩地租给邻居种菜，租金正好够付利息。{banker}收到第一笔钱时，说这法子撑不过两年。{sibling}在门外听见，把烟头踩灭了。',
        significance: 0.78,
        fx: {
          cash: 9,
          relation: ['sibling', 'colleague', 0.08, 0],
          flag: 'rented_meadow_to_pay_interest',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-bank-calls-the-loan',
        when: { processKinds: ['economic_crisis'] },
        title: '银行催款',
        outcomes: [
          {
            id: 'foreclosure-notice',
            w: 0.6,
            text: '银行提前催款，{banker}说行情不好，抵押物要重新估价。{subject}把酒窖里的陈酒全卖了，还是差三十克朗。{notary}来贴拍卖告示时，{subject}站在葡萄行里，一根一根数还没发芽的藤。',
            significance: 0.84,
            fx: {
              cash: -10,
              condition: 'foreclosure_notice',
              relation: ['banker', 'rival', -0.15, 0],
              flag: 'bank_called_the_loan',
            },
          },
          {
            id: 'sold-the-heirloom',
            w: 0.4,
            text: '{subject}去找{sibling}，两人把父亲留下的银表卖了。{banker}收了钱，把期限延了半年。回家路上，{sibling}说表本来该传给下一个孩子，{subject}说园子先保住再说。',
            significance: 0.8,
            fx: {
              cash: -8,
              relation: ['sibling', 'colleague', 0.1, 0],
              flag: 'sold_heirloom_to_pay_bank',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 28. Marriage with land ------------------------------------------------
  {
    id: 'r2-rural.marriage-land',
    title: '婚书背后的葡萄行',
    domain: 'family',
    stage: 'adulthood',
    ages: [20, 50],
    tags: ['rural', 'marriage', 'land', 'vineyard', 'family'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'war'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      partner: ['partner', { sex: 'opposite', minAge: 18, maxAge: 55 }],
      parent: ['parent', { minAge: 40, maxAge: 80 }],
      priest: ['neighbor', { minAge: 35, maxAge: 78 }],
    },
    outcomes: [
      {
        id: 'married-and-merged-the-vines',
        w: 0.35,
        text: '{priest}在婚书上写下两家的地界，{partner}的手一直放在桌下。{subject}把自家葡萄行的钥匙推过去，{partner}没有接，只说先去地里看看。婚礼后第二天，两人在界石边重新埋了桩。',
        significance: 0.82,
        fx: {
          cash: 10,
          role: 'married_vintner',
          relation: ['partner', 'partner', 0.2, 0.1],
          flag: 'married_with_land',
        },
      },
      {
        id: 'refused-to-merge-the-land',
        w: 0.35,
        text: '{subject}把婚书推回去，说地不能并，并了就分不清谁欠谁。{parent}把酒杯往桌上一顿，酒洒在婚书上。{partner}站起来，把椅子推回桌下，说那就各守各的园子。',
        significance: 0.8,
        fx: {
          relation: [
            ['parent', 'rival', -0.15, 0],
            ['partner', 'rival', -0.1, 0],
          ],
          relation_end: ['partner', 'partner'],
          flag: 'refused_land_marriage',
        },
      },
      {
        id: 'trial-farming-partnership',
        w: 0.3,
        text: '{subject}说先不办婚礼，把两家的地合种一季试试。{partner}同意了，两人在葡萄行里拉了一道新绳。到了秋天，酒是混着酿的，账却还是两本。{priest}来问什么时候补办，{subject}说等这季酒卖了。',
        significance: 0.7,
        fx: {
          cash: 3,
          relation: ['partner', 'partner', 0.1, 0.05],
          flag: 'trial_farming_partnership',
        },
      },
    ],
    variants: [
      {
        id: 'war-marriage-before-conscription',
        when: { processKinds: ['war_mobilization'] },
        title: '婚礼在征召之后',
        outcomes: [
          {
            id: 'married-in-ten-minutes',
            w: 0.6,
            text: '{partner}收到征召令，婚礼提前到第二天早上。{priest}只用了十分钟念完，{parent}把嫁妆里的地契塞进{subject}的围裙。{partner}上车前说，园子要是荒了，就种豆子。',
            significance: 0.8,
            fx: {
              cash: 4,
              relation: ['partner', 'partner', 0.15, 0.1],
              flag: 'wartime_marriage_before_conscription',
            },
          },
          {
            id: 'kept-the-land-alone',
            w: 0.4,
            text: '{subject}没有等{partner}回来，一个人把两家的葡萄行都剪了。村里人说这婚算不算数，{subject}把婚书钉在酒窖门上，说地界算数就行。开春时，{subjectPronoun}一个人把界石重新埋好。',
            significance: 0.74,
            fx: {
              cash: -2,
              reputation: 0.04,
              relation: ['partner', 'partner', 0.05, 0],
              flag: 'kept_land_through_wartime_absence',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 4,
  },

  // 29. Dowry in land ------------------------------------------------------
  {
    id: 'r2-rural.dowry-land',
    title: '嫁妆里的半亩地',
    domain: 'family',
    stage: 'adulthood',
    ages: [18, 45],
    tags: ['rural', 'marriage', 'dowry', 'land', 'sibling'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      partner: ['partner', { sex: 'opposite', minAge: 18, maxAge: 55 }],
      parent: ['parent', { minAge: 40, maxAge: 80 }],
      sibling: ['sibling', { minAge: 16, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'took-the-half-acre',
        w: 0.4,
        text: '{parent}把半亩地的地契压在嫁妆箱底，上面盖着两床新被。{partner}家的人来抬箱时，{subject}把地契抽出来看了一眼，又放回去。{sibling}在门口说，那半亩地浇不上水。',
        significance: 0.78,
        fx: {
          cash: 8,
          relation: [
            ['partner', 'partner', 0.12, 0.06],
            ['sibling', 'acquaintance', -0.02, 0],
          ],
          flag: 'dowry_land_received',
        },
      },
      {
        id: 'disputed-the-boundary-stone',
        w: 0.35,
        text: '{subject}去看那块地，发现界石被挪到了沟边。{sibling}说父亲生前就答应过，那块地算在儿子的份里。{partner}站在田埂上，没有下田，只问了一句：这婚还结不结？',
        significance: 0.8,
        fx: {
          condition: 'boundary_dispute',
          relation: [
            ['sibling', 'rival', -0.2, 0],
            ['partner', 'rival', -0.1, 0],
          ],
          flag: 'disputed_dowry_boundary',
        },
      },
      {
        id: 'refused-the-land-dowry',
        w: 0.25,
        text: '{subject}没有要那半亩地，把地契还给{parent}，说嫁妆够用了。{parent}愣了很久，把地契折好，塞回箱底。{partner}在门外听见，进来时手里多了一束野花，花根还带着泥。',
        significance: 0.7,
        fx: {
          reputation: 0.06,
          relation: [
            ['parent', 'kin', 0.08, 0],
            ['partner', 'friend', 0.1, 0.08],
          ],
          flag: 'refused_land_dowry',
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 4,
  },

  // 30. Farm servant -------------------------------------------------------
  {
    id: 'r2-rural.farm-servant',
    title: '长工屋里的草垫',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 60],
    tags: ['rural', 'labour', 'servant', 'wages', 'farm'],
    contexts: ['rural', 'agriculture', 'peace', 'war', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'home'],
    roles: {
      farmer: ['worker', { minAge: 35, maxAge: 70 }],
      cook: ['neighbor', { minAge: 25, maxAge: 70 }],
      mistress: ['neighbor', { sex: 'female', minAge: 30, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'hired-for-the-year',
        w: 0.4,
        text: '{farmer}把一年的工钱说定，管吃住，冬天加一双鞋。{subject}把铺盖卷搬进长工屋，草垫上还留着上一个人的汗味。{cook}端来一碗热汤，说夜里冷就多盖一层麻袋。',
        significance: 0.72,
        fx: {
          cash: 2,
          food: 1,
          role: 'farm_servant',
          relation: [
            ['farmer', 'colleague', 0.05, 0],
            ['cook', 'friend', 0.08, 0],
          ],
          flag: 'hired_as_farm_servant',
        },
      },
      {
        id: 'wages-withheld',
        w: 0.35,
        text: '{subject}干满一年，{farmer}说今年收成不好，工钱先欠一半。{mistress}在旁边算饭钱，说吃住的也要扣。{subject}把账算到半夜，发现自己倒欠东家三克朗。',
        significance: 0.8,
        fx: {
          cash: -1,
          condition: 'servant_debt',
          relation: ['farmer', 'rival', -0.15, 0],
          flag: 'wages_withheld_as_servant',
        },
      },
      {
        id: 'ran-away-before-the-year',
        w: 0.25,
        when: { maxAge: 25 },
        text: '{subject}在长工屋住了三个月，趁夜把铺盖卷好，从后窗翻出去。{farmer}的狗叫了两声，被{subject}扔过去的一块面包止住。天亮时，{subject}已经走到邻村的磨坊，脚上全是露水。',
        significance: 0.78,
        fx: {
          unemployment: 'left the farm before the year was out',
          relation: ['farmer', 'rival', -0.2, 0],
          flag: 'ran_away_from_farm_service',
        },
      },
    ],
    variants: [
      {
        id: 'war-farm-servant-conscription',
        when: { processKinds: ['war_mobilization'] },
        title: '长工上了前线',
        outcomes: [
          {
            id: 'kept-the-farm-running',
            w: 0.6,
            text: '{farmer}的儿子被征走，地里的活全压在{subject}身上。{farmer}把工钱加了一成，说只要把葡萄收完，明年就给一块自己的地。{subject}在长工屋里算了一夜，觉得这话像真的。',
            significance: 0.74,
            fx: {
              cash: 4,
              role: 'farm_servant',
              relation: ['farmer', 'colleague', 0.1, 0],
              flag: 'kept_farm_running_in_wartime',
            },
          },
          {
            id: 'conscripted-with-the-year-unfinished',
            w: 0.4,
            text: '{subject}也被征召，{farmer}去征兵站说情，回来时脸色很难看。第二天{subject}还是上了车，{farmer}塞给他一袋干面包，说打完仗回来，长工屋还留着。',
            significance: 0.76,
            fx: {
              relation: ['farmer', 'friend', 0.1, 0],
              flag: 'farm_servant_conscripted',
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 1,
  },

  // 31. Child farm labour --------------------------------------------------
  {
    id: 'r2-rural.child-farm-labor',
    title: '八岁的手和镰刀',
    domain: 'family',
    stage: 'childhood',
    ages: [8, 13],
    tags: ['rural', 'child_labour', 'harvest', 'school', 'injury'],
    contexts: ['rural', 'agriculture', 'vineyard', 'peace', 'war', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'home'],
    roles: {
      parent: ['parent', { minAge: 30, maxAge: 60 }],
      farmer: ['worker', { minAge: 30, maxAge: 70 }],
      teacher: ['teacher', { minAge: 22, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'sent-to-pick-grapes',
        w: 0.4,
        text: '{parent}把一只小篮子挂在{subject}脖子上，说捡满一篮就回家。葡萄行里的刺划破手指，{subject}用嘴吸了吸，继续捡。{farmer}过秤时多给了半个铜板，说这孩子手快。',
        significance: 0.7,
        fx: {
          cash: 1,
          health: -0.05,
          skill: { craft: 0.03 },
          relation: ['farmer', 'acquaintance', 0.04, 0],
          flag: 'child_harvest_labor',
        },
      },
      {
        id: 'kept-in-school',
        w: 0.35,
        text: '{teacher}来家里说{subject}的算术跟得上，不该缺课。{parent}把学费的事说了一遍，{teacher}说可以免一半。{subject}坐在门槛上，一手攥着课本，一手攥着没剥完的豆子。',
        significance: 0.72,
        fx: {
          education: ['primary', 1],
          skill: { literacy: 0.03 },
          relation: [
            ['teacher', 'friend', 0.1, 0],
            ['parent', 'rival', -0.06, 0],
          ],
          flag: 'kept_child_in_school',
        },
      },
      {
        id: 'cut-by-the-sickle',
        w: 0.25,
        text: '{subject}学着大人挥镰刀，刀刃卡在藤根上，反弹回来划开小腿。{parent}用围裙扎住伤口，抱着往村里跑。{farmer}在后面喊，说今天的工钱照给。{subject}在家躺了七天，腿上的疤一直留着。',
        significance: 0.76,
        fx: {
          health: -0.1,
          condition: 'cut_leg',
          relation: ['parent', 'kin', 0.1, 0.05],
          flag: 'child_farm_injury',
        },
      },
    ],
    variants: [
      {
        id: 'war-school-closed-for-children',
        when: { processKinds: ['war_mobilization'] },
        title: '学校关门以后',
        outcomes: [
          {
            id: 'learned-the-hoe',
            w: 0.6,
            text: '{teacher}上了前线，学校锁了门。{subject}每天跟着{parent}去地里，学会用锄头敲碎土块。休息时，{parent}用树枝在地上写{subject}的名字，说别忘了怎么读。',
            significance: 0.7,
            fx: {
              skill: { craft: 0.03 },
              flag: 'child_worked_after_school_closed',
            },
          },
          {
            id: 'sent-to-relatives',
            w: 0.4,
            text: '{subject}被送到镇上的亲戚家，说是那边有学校。走的那天，{parent}把一包煮鸡蛋塞进包袱，{subject}在车上剥了一个，蛋黄噎在喉咙里。亲戚家的床很软，{subject}却一夜没睡着。',
            significance: 0.72,
            fx: {
              education: ['primary', 1],
              move: ['@rural', 'sent to relatives for schooling'],
              flag: 'sent_away_to_school',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 32. Veterinarian -------------------------------------------------------
  {
    id: 'r2-rural.veterinarian',
    title: '马蹄下的体温',
    domain: 'health',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'animal', 'medicine', 'craft', 'farm'],
    contexts: ['rural', 'agriculture', 'peace', 'reform'],
    milieus: ['farm', 'rural', 'land', 'shop'],
    roles: {
      vet: ['worker', { minAge: 28, maxAge: 65 }],
      farmer: ['neighbor', { minAge: 25, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'paid-the-vet',
        w: 0.4,
        text: '{vet}把听诊器贴在马的肋下，又掰开眼皮看。他说是肠绞痛，得灌药、牵着走一夜。{subject}付了五克朗，跟着{vet}在院里走到天亮，马终于排了气。马低头蹭了蹭{subject}的肩，鼻息把衣领吹热。',
        significance: 0.72,
        fx: {
          cash: -5,
          relation: ['vet', 'colleague', 0.08, 0],
          flag: 'saved_horse',
        },
      },
      {
        id: 'treated-it-alone',
        w: 0.35,
        text: '{subject}没请兽医，用温水和盐给马灌肠，又把自己的旧毯子盖在马背上。{farmer}来看了一眼，说这马救不活就别浪费盐。第二天马站起来吃草，{subject}却累得在槽边睡着了。',
        significance: 0.7,
        fx: {
          cash: -1,
          health: -0.03,
          skill: { craft: 0.03 },
          relation: ['farmer', 'acquaintance', 0.03, 0],
          flag: 'treated_horse_alone',
        },
      },
      {
        id: 'apprenticed-to-the-vet',
        w: 0.25,
        when: { skill: { name: 'craft', min: 0.3 } },
        text: '{vet}来给邻村的牛看病，{subject}给他打下手，学会了怎么听肺音、怎么绑绷带。{vet}走时说，明年春天他的学徒要走，问{subject}愿不愿意来。',
        significance: 0.76,
        fx: {
          role: 'vet_assistant',
          skill: { craft: 0.04 },
          relation: ['vet', 'colleague', 0.12, 0],
          flag: 'apprenticed_to_veterinarian',
          knowledge: ['the vet will need a new apprentice next spring', 0.8, 'vet'],
        },
      },
    ],
    variants: [
      {
        id: 'reform-state-vaccination',
        when: { legacyKinds: ['reform'] },
        title: '公署来的兽医',
        outcomes: [
          {
            id: 'held-the-cow-for-the-needle',
            w: 0.6,
            text: '公署派{vet}来给全村的牛打防疫针，价钱由村里摊。{subject}帮着按牛头，{vet}把针扎进颈侧，牛一甩头，把{subject}撞进草堆。{vet}说这针能少死一半牛。',
            significance: 0.72,
            fx: {
              cash: -2,
              reputation: 0.05,
              relation: ['vet', 'colleague', 0.1, 0],
              flag: 'village_cattle_vaccinated',
            },
          },
          {
            id: 'refused-the-vaccination',
            w: 0.4,
            text: '{subject}不信防疫针，把自家的牛藏进后山。{vet}在名单上画了叉，说没打的牛出了事不赔。秋天牛病倒时，{subject}背着它走了十里路去找{vet}，{vet}只看了看，说晚了。',
            significance: 0.78,
            fx: {
              cash: -8,
              food: -1,
              relation: ['vet', 'rival', -0.1, 0],
              flag: 'refused_cattle_vaccination',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 33. Horse sale ---------------------------------------------------------
  {
    id: 'r2-rural.horse-sale',
    title: '集市上的马牙',
    domain: 'economy',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'market', 'horse', 'deception', 'craft'],
    contexts: ['rural', 'agriculture', 'peace', 'war'],
    milieus: ['farm', 'rural', 'land', 'market'],
    roles: {
      dealer: ['worker', { minAge: 30, maxAge: 65 }],
      farmer: ['neighbor', { minAge: 25, maxAge: 70 }],
      gendarme: ['official', { minAge: 25, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'sold-the-unsound-horse',
        w: 0.35,
        text: '{dealer}教{subject}把老马的牙锉平，再抹上一点草汁，看起来像七岁。买主是个外村人，掰开马嘴看了半天，付了十二克朗。{subject}接过钱，马已经被牵走了。',
        significance: 0.78,
        fx: {
          cash: 12,
          reputation: -0.08,
          relation: ['dealer', 'colleague', 0.08, 0],
          flag: 'sold_unsound_horse',
          knowledge: ['the horse has a hidden lameness', 0.85],
        },
      },
      {
        id: 'told-the-truth',
        w: 0.35,
        text: '{subject}把马牵到集市，主动说了腿上的旧伤。{dealer}在旁边摇头，买主却蹲下来摸了摸马蹄，说干活不妨事。最后卖了八克朗，{dealer}说{subject}不会做生意，{subject}说这样睡得着。',
        significance: 0.7,
        fx: {
          cash: 8,
          reputation: 0.04,
          relation: ['dealer', 'acquaintance', 0.02, 0],
          flag: 'honest_horse_sale',
        },
      },
      {
        id: 'kept-the-old-horse',
        w: 0.3,
        text: '{subject}把马牵回家，说它还能拉两年车。{farmer}笑{subject}心软，说草料钱比马价贵。夜里{subject}给马添了一把燕麦，马把头搁在栏门上，鼻息喷了一手。',
        significance: 0.66,
        fx: {
          cash: -4,
          food: -1,
          relation: ['farmer', 'acquaintance', 0.04, 0],
          flag: 'kept_old_horse',
        },
      },
    ],
    variants: [
      {
        id: 'war-army-buys-horses',
        when: { processKinds: ['war_mobilization'] },
        title: '军队来买马',
        outcomes: [
          {
            id: 'sold-the-best-horse',
            w: 0.6,
            text: '{gendarme}带着军队的采购单来，说好马一律征购。{subject}把最壮的那匹牵出来，{dealer}在旁边使眼色，让把牙口报小一岁。军队的人没细看，按价付了钱。',
            significance: 0.74,
            fx: {
              cash: 10,
              relation: ['dealer', 'colleague', 0.06, 0],
              flag: 'sold_horse_to_army',
            },
          },
          {
            id: 'hid-the-horse-in-the-woods',
            w: 0.4,
            text: '{subject}把马藏进林子的窝棚，每天夜里去送草。军队的人来查了两次，第二次带着{dealer}。{dealer}看了看空马棚，说这家的马去年就死了。{subject}摸着马鬃，听见远处有军号。',
            significance: 0.78,
            fx: {
              cash: -3,
              relation: ['dealer', 'friend', 0.1, 0],
              flag: 'hid_horse_from_army',
              knowledge: ['the horse is hidden in the upper wood', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 34. Threshing crew -----------------------------------------------------
  {
    id: 'r2-rural.threshing-crew',
    title: '打谷机进村',
    domain: 'work',
    stage: 'adulthood',
    ages: [16, 65],
    tags: ['rural', 'harvest', 'machine', 'injury', 'community'],
    contexts: ['rural', 'agriculture', 'peace', 'war'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      boss: ['worker', { minAge: 35, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 70 }],
      machine_owner: ['worker', { minAge: 30, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'joined-the-crew',
        w: 0.4,
        text: '{boss}把打谷机停在村口，皮带一挂，整个场院都震。{subject}负责往机器口送麦捆，麦芒扎进领口，痒得直咬牙。天黑收工，{boss}按天发钱，多给了一勺麦子。',
        significance: 0.7,
        fx: {
          cash: 4,
          role: 'threshing_hand',
          skill: { craft: 0.03 },
          relation: ['boss', 'colleague', 0.06, 0],
          flag: 'joined_threshing_crew',
        },
      },
      {
        id: 'caught-in-the-gears',
        w: 0.35,
        text: '{subject}的手套被齿轮卷住，连手一起往里带。{machine_owner}一脚踹开皮带，机器停了，{subject}的袖子已经绞成布条。{neighbor}把{subject}扶到井边冲水，血在水面上散开。',
        significance: 0.84,
        fx: {
          health: -0.12,
          condition: 'broken_arm',
          relation: [
            ['machine_owner', 'rival', -0.08, 0],
            ['neighbor', 'friend', 0.1, 0],
          ],
          flag: 'threshing_accident',
        },
      },
      {
        id: 'harvest-feast',
        w: 0.25,
        text: '{subject}和{neighbor}把最后一捆麦子送进机器，{boss}抬来一桶新酒。众人坐在麦秸堆上喝，谁的脸上都是灰。{machine_owner}说起明年要买一台带风选的新机器，没人接话。',
        significance: 0.62,
        fx: {
          food: 2,
          relation: [
            ['neighbor', 'friend', 0.12, 0.05],
            ['boss', 'colleague', 0.08, 0],
          ],
          flag: 'harvest_feast_after_threshing',
        },
      },
    ],
    variants: [
      {
        id: 'war-too-few-hands',
        when: { processKinds: ['war_mobilization'] },
        title: '人手不够的打谷',
        outcomes: [
          {
            id: 'threshed-with-two-hands',
            w: 0.6,
            text: '{boss}只带来两个帮工，打谷机却不肯停。{subject}和{neighbor}轮班往机器口送麦，困了就靠在麦秸上眯一会儿。第三天，{subject}的手指被皮带擦掉一层皮，{boss}说这不算伤。',
            significance: 0.72,
            fx: {
              cash: 3,
              health: -0.06,
              condition: 'abraded_fingers',
              relation: ['neighbor', 'colleague', 0.1, 0],
              flag: 'threshed_with_too_few_hands',
            },
          },
          {
            id: 'kept-the-machine-running',
            w: 0.4,
            text: '{machine_owner}被征去修军用卡车，打谷机停在棚里。{subject}照着旧图纸拆开齿轮箱，用猪油代替机油。机器转起来时，声音像一头老牛在喘。{subject}满手油污，坐在机器边笑了一声。',
            significance: 0.74,
            fx: {
              skill: { craft: 0.04 },
              role: 'machine_tinkerer',
              flag: 'kept_threshing_machine_running',
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 1,
  },

  // 35. Communal oven ------------------------------------------------------
  {
    id: 'r2-rural.communal-oven',
    title: '公共烤炉的排队',
    domain: 'social',
    stage: 'adulthood',
    ages: [16, 75],
    tags: ['rural', 'bread', 'community', 'scarcity', 'neighbor'],
    contexts: ['rural', 'small_town', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'home', 'shop'],
    roles: {
      baker: ['worker', { minAge: 30, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'baked-at-the-communal-oven',
        w: 0.4,
        text: '{baker}把长木铲伸进炉膛，面包在石板上鼓起来。{subject}交了一铜板，拿到一只烫手的面包，用围裙兜着往家走。{neighbor}排在后面，问能不能借一把火，{baker}说火不借，面包可以赊。',
        significance: 0.64,
        fx: {
          cash: -1,
          food: 3,
          relation: ['baker', 'acquaintance', 0.04, 0],
          flag: 'baked_at_communal_oven',
        },
      },
      {
        id: 'burned-bread-at-home',
        w: 0.35,
        text: '{subject}舍不得那一铜板，在家里的灶上烤面团。火太旺，面包底焦成黑炭，烟从窗户往外冒。{neighbor}提着水桶跑来，以为失了火。{subject}把焦面包掰开，里面还是生的。',
        significance: 0.68,
        fx: {
          cash: -1,
          reputation: -0.04,
          relation: ['neighbor', 'acquaintance', 0.02, 0],
          flag: 'burned_bread_at_home',
        },
      },
      {
        id: 'shared-the-loaf',
        w: 0.25,
        text: '{subject}把刚出炉的面包掰成三份，一份给{neighbor}，一份留给{baker}。{baker}不要，{subject}就放在炉边的石台上。第二天去取，石台上多了一小罐盐。',
        significance: 0.66,
        fx: {
          food: 2,
          relation: [
            ['neighbor', 'friend', 0.12, 0.05],
            ['baker', 'colleague', 0.08, 0],
          ],
          flag: 'shared_bread_at_oven',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-bread-queue',
        when: { processKinds: ['economic_crisis'] },
        title: '面包前面的队伍',
        outcomes: [
          {
            id: 'queued-for-hours',
            w: 0.6,
            text: '面粉配给减半，烤炉前的队伍从教堂排到井台。{baker}一次只开一炉，谁插队就骂。{subject}排了两个钟头，轮到时只剩最后两个小面包，{neighbor}在后面说家里有四个孩子。',
            significance: 0.7,
            fx: {
              food: 1,
              relation: ['neighbor', 'acquaintance', 0.03, 0],
              flag: 'queued_for_bread_in_crisis',
            },
          },
          {
            id: 'gave-the-ration-away',
            w: 0.4,
            text: '{subject}把配额让给{neighbor}，自己回家煮土豆皮。夜里饿得睡不着，听见隔壁孩子在哭。第二天{neighbor}送来半块面包，说是孩子吃剩的。面包还热着，{subject}却先闻了很久。',
            significance: 0.72,
            fx: {
              food: 1,
              health: -0.03,
              relation: ['neighbor', 'friend', 0.15, 0.08],
              flag: 'gave_bread_ration_to_neighbor',
            },
          },
        ],
      },
    ],
    baseRate: 0.07,
    cooldownYears: 1,
  },

  // 36. Rural epidemic -----------------------------------------------------
  {
    id: 'r2-rural.typhus',
    title: '村口的石灰线',
    domain: 'health',
    stage: 'adulthood',
    ages: [16, 75],
    tags: ['rural', 'epidemic', 'medicine', 'neighbor', 'fear'],
    contexts: ['rural', 'agriculture', 'peace', 'war', 'crisis'],
    milieus: ['farm', 'rural', 'home', 'official'],
    roles: {
      doctor: ['official', { minAge: 28, maxAge: 70 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'nursed-the-village',
        w: 0.4,
        text: '{doctor}在村口撒石灰，说斑疹伤寒已经进了第三户。{subject}把家里的旧床单撕成绷带，挨家送热水。{neighbor}烧得说胡话，{subject}用湿布擦他的额头，擦到天亮。',
        significance: 0.8,
        fx: {
          health: -0.08,
          reputation: 0.1,
          role: 'epidemic_helper',
          relation: ['neighbor', 'friend', 0.15, 0.05],
          flag: 'nursed_typhus_patients',
        },
      },
      {
        id: 'fled-to-vienna',
        w: 0.35,
        text: '{subject}把行李捆在自行车后座上，趁夜往维也纳骑。路过村口时，{doctor}站在石灰线后面看着，没有拦。{subject}骑出两里路，才想起灶上还炖着一锅汤。',
        significance: 0.78,
        fx: {
          health: -0.02,
          move: ['@station', 'fled the village epidemic'],
          flag: 'fled_typhus_epidemic',
        },
      },
      {
        id: 'caught-the-typhus',
        w: 0.25,
        when: { capability: 'frail_body' },
        text: '{subject}开始发冷，骨头像被人拆开。{doctor}来看了，说是伤寒，让把水烧开再喝。{subject}躺在阁楼上，听见楼下有人在哭，分不清是梦里还是隔壁。',
        significance: 0.84,
        fx: {
          health: -0.18,
          condition: 'typhus',
          flag: 'caught_typhus',
        },
      },
    ],
    variants: [
      {
        id: 'war-field-hospital-in-the-village',
        when: { processKinds: ['war_mobilization'] },
        title: '战地医院撤进村',
        outcomes: [
          {
            id: 'nursed-the-wounded',
            w: 0.6,
            text: '{doctor}带着伤兵撤进村，学校成了病房。{subject}帮着烧水、洗绷带，水盆里的血一层层换。{doctor}说别碰伤口，{subject}还是伸手扶了一个从担架上滚下来的年轻人。',
            significance: 0.78,
            fx: {
              health: -0.04,
              reputation: 0.08,
              relation: ['doctor', 'colleague', 0.1, 0],
              flag: 'nursed_wounded_at_village_school',
            },
          },
          {
            id: 'refused-the-billet',
            w: 0.4,
            text: '{subject}拒绝把自家屋子让出来，说家里有老人。{doctor}在门上画了一个白叉，带着担架去了下一家。夜里，{subject}听见隔壁的呻吟，把被子蒙在头上。',
            significance: 0.7,
            fx: {
              reputation: -0.06,
              relation: ['doctor', 'rival', -0.08, 0],
              flag: 'refused_billet_for_wounded',
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 5,
  },

  // 37. Wandering labourer -------------------------------------------------
  {
    id: 'r2-rural.wandering-laborer',
    title: '谷仓门口的陌生人',
    domain: 'migration',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['rural', 'migration', 'labour', 'stranger', 'risk'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      stranger: ['worker', { minAge: 18, maxAge: 60 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      gendarme: ['official', { minAge: 25, maxAge: 60 }],
    },
    outcomes: [
      {
        id: 'hired-the-wanderer',
        w: 0.4,
        text: '{stranger}站在谷仓门口，鞋底用麻绳绑着，问有没有活干。{subject}让他劈了一下午柴，管了两顿饭，又给了一克朗。{stranger}把钱塞进袜筒，说往北走还有活。',
        significance: 0.7,
        fx: {
          cash: -2,
          food: -1,
          relation: ['stranger', 'friend', 0.1, 0],
          flag: 'hired_wandering_laborer',
        },
      },
      {
        id: 'turned-him-away',
        w: 0.35,
        text: '{stranger}问能不能在谷仓睡一夜，{subject}说家里没地方。{stranger}点点头，把背包往肩上一甩，走进雨里。{neighbor}在墙后说，这种人走了还会回来偷东西。',
        significance: 0.66,
        fx: {
          mood: -0.05,
          relation: ['neighbor', 'acquaintance', 0.02, 0],
          flag: 'turned_away_wanderer',
        },
      },
      {
        id: 'reported-the-stranger',
        w: 0.25,
        text: '{gendarme}来问有没有见过生人，{subject}指了指南边的路。第二天{stranger}被带回来，背包里只有一块干面包和一把断柄的镰刀。{gendarme}说最近有偷鸡的，{subject}没问是不是他。',
        significance: 0.74,
        fx: {
          cash: 1,
          relation: [
            ['stranger', 'rival', -0.2, 0],
            ['gendarme', 'acquaintance', 0.06, 0],
          ],
          flag: 'reported_wandering_laborer',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-destitute-wanderer',
        when: { processKinds: ['economic_crisis'] },
        title: '饥荒路上的陌生人',
        outcomes: [
          {
            id: 'shared-the-potato-mash',
            w: 0.6,
            text: '{stranger}饿得站不住，{subject}把锅里的土豆糊分了一半。{stranger}吃完才说自己是从工厂裁下来的，走了三天。{subject}让他睡在灶边，夜里听见他在梦里喊一个女人的名字。',
            significance: 0.72,
            fx: {
              food: -1,
              relation: ['stranger', 'friend', 0.15, 0.05],
              flag: 'fed_destitute_wanderer',
            },
          },
          {
            id: 'bolted-the-door',
            w: 0.4,
            text: '{subject}把门闩上，从窗缝里看{stranger}蹲在墙根啃树皮。天亮时人已经走了，墙根留下一小堆削好的木片。{subject}捡起来，发现每片都刻着同一个记号。',
            significance: 0.7,
            fx: {
              mood: -0.06,
              flag: 'ignored_destitute_wanderer',
              knowledge: ['the wanderer carved the same mark on every chip', 0.7],
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 1,
  },

  // 38. Anti-Roma prejudice ------------------------------------------------
  {
    id: 'r2-rural.roma-family',
    title: '草棚外的水桶',
    domain: 'social',
    stage: 'adulthood',
    ages: [18, 75],
    tags: ['rural', 'prejudice', 'roma', 'exclusion', 'moral_choice'],
    contexts: ['rural', 'small_town', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      roma_father: ['worker', { minAge: 25, maxAge: 55 }],
      roma_mother: ['neighbor', { sex: 'female', minAge: 20, maxAge: 55 }],
      gendarme: ['official', { minAge: 25, maxAge: 60 }],
      neighbor: ['neighbor', { minAge: 25, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'brought-water',
        w: 0.35,
        text: '{roma_father}在村外草棚边修一只破桶，{roma_mother}把湿衣服摊在灌木上。{subject}提来一桶井水，又放下半块面包。{roma_father}说了声谢谢，用德语，口音很重。第二天，{neighbor}问{subject}昨晚去村外做什么。',
        significance: 0.76,
        fx: {
          cash: -2,
          reputation: -0.06,
          relation: [
            ['roma_father', 'friend', 0.15, 0.05],
            ['neighbor', 'rival', -0.06, 0],
          ],
          flag: 'helped_roma_family',
        },
      },
      {
        id: 'signed-the-expulsion-petition',
        w: 0.4,
        text: '{neighbor}拿着联名信挨家敲门，说要让乡公所把草棚拆了。{subject}在信上签了名，换来一句“早就该这样”。三天后，{gendarme}来收走了{roma_father}的证件，说他们没有居留许可。{roma_father}把工具一件件装上车，没有说话。',
        significance: 0.84,
        fx: {
          reputation: 0.06,
          relation: [
            ['roma_father', 'rival', -0.3, -0.1],
            ['neighbor', 'colleague', 0.08, 0],
          ],
          flag: 'signed_expulsion_petition',
          knowledge: ['the family’s residence papers were seized', 0.9, 'gendarme'],
        },
      },
      {
        id: 'warned-the-family',
        w: 0.25,
        text: '{subject}听说{gendarme}天亮要来查草棚，连夜去敲{roma_father}的门。一家人摸黑拆棚、装车，孩子抱着鸡笼坐在车尾。天亮时草棚只剩几根木桩，{gendarme}踢了踢灰，问谁报的信。',
        significance: 0.86,
        fx: {
          relation: [
            ['roma_father', 'friend', 0.25, 0.1],
            ['gendarme', 'rival', -0.12, 0],
          ],
          flag: 'warned_roma_family_of_raid',
          knowledge: ['the family left before the gendarme arrived', 0.9],
        },
      },
    ],
    variants: [
      {
        id: 'crisis-scapegoat',
        when: { processKinds: ['economic_crisis'] },
        title: '危机里的替罪羊',
        outcomes: [
          {
            id: 'stayed-silent',
            w: 0.6,
            text: '村里丢了鸡，{neighbor}一口咬定是草棚那家人偷的。{subject}看见{roma_mother}在河边洗一只死鸡，那是她自家病死的。{subject}没有替她说话，只在{gendarme}来问时说自己什么也没看见。',
            significance: 0.76,
            fx: {
              relation: [
                ['roma_mother', 'acquaintance', 0.05, 0],
                ['neighbor', 'rival', -0.04, 0],
              ],
              flag: 'stayed_silent_in_roma_accusation',
              knowledge: ['the dead chicken belonged to the Roma family', 0.85],
            },
          },
          {
            id: 'defended-the-family',
            w: 0.4,
            text: '{subject}站出来说鸡是黄鼠狼咬的，还带{gendarme}去看篱笆下的洞。{neighbor}骂{subject}胳膊肘往外拐。草棚那家人当晚就搬走了，{roma_mother}留下一只编好的篮子，挂在{subject}的门把上。',
            significance: 0.8,
            fx: {
              reputation: -0.04,
              relation: [
                ['roma_mother', 'friend', 0.2, 0.08],
                ['neighbor', 'rival', -0.15, 0],
              ],
              flag: 'defended_roma_family',
            },
          },
        ],
      },
    ],
    baseRate: 0.04,
    cooldownYears: 3,
  },

  // 39. Village council ----------------------------------------------------
  {
    id: 'r2-rural.village-council',
    title: '村议会的那把木槌',
    domain: 'civic',
    stage: 'adulthood',
    ages: [25, 75],
    tags: ['rural', 'council', 'politics', 'road', 'corruption'],
    contexts: ['rural', 'small_town', 'peace', 'reform', 'crisis'],
    milieus: ['farm', 'rural', 'official'],
    roles: {
      mayor: ['official', { minAge: 35, maxAge: 70 }],
      council: ['organization', { organizationKind: 'state' }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'spoke-for-the-road',
        w: 0.4,
        text: '{mayor}把木槌敲了三下，议事才安静下来。{subject}站起来说，通往磨坊的路再不加石子，秋天马车就过不去。有人鼓掌，有人低头卷烟。{mayor}让书记把话记进本子，说钱从明年的税里出。',
        significance: 0.74,
        fx: {
          reputation: 0.06,
          role: 'council_speaker',
          funds: ['council', -4, 'road gravel approved at the village council'],
          relation: ['mayor', 'acquaintance', 0.05, 0],
          flag: 'spoke_at_village_council',
        },
      },
      {
        id: 'bribed-the-mayor',
        w: 0.35,
        text: '{subject}在会前把一瓶酒塞进{mayor}的大衣口袋，说自家门前的排水沟该修了。{mayor}在会上把这条排在最前面，没有人反对。散会后，{neighbor}在门口等{subject}，问那瓶酒是哪一年的。',
        significance: 0.72,
        fx: {
          cash: -3,
          reputation: -0.04,
          relation: ['mayor', 'colleague', 0.1, 0],
          flag: 'bribed_village_council',
        },
      },
      {
        id: 'walked-out',
        w: 0.25,
        text: '{subject}提到佃租，{mayor}说这事不归村议会管。{subject}把椅子推开，走到门口时，{neighbor}跟了出来。两人在台阶上站着，听里面继续念修路预算，谁也没再进去。',
        significance: 0.7,
        fx: {
          mood: -0.08,
          relation: ['neighbor', 'colleague', 0.08, 0],
          flag: 'boycotted_village_council',
        },
      },
    ],
    variants: [
      {
        id: 'reform-elected-council',
        when: { legacyKinds: ['reform'] },
        title: '重建村议会',
        outcomes: [
          {
            id: 'left-off-the-roll',
            w: 0.6,
            text: '公署要求村里重选议会，{mayor}把选民名单贴在教堂门口。{subject}发现自己被漏掉了，去找{mayor}补名字。{mayor}翻着名单说，漏掉的不止你一个。',
            significance: 0.7,
            fx: {
              reputation: 0.03,
              relation: ['mayor', 'rival', -0.05, 0],
              flag: 'left_off_village_roll',
            },
          },
          {
            id: 'elected-to-the-council',
            w: 0.4,
            text: '{subject}被选进议会，第一次开会就为磨坊的水权和人吵起来。{mayor}敲木槌敲到槌头松了，最后把议题推到下个月。{subject}回家路上还在翻章程，油灯烧到半夜。',
            significance: 0.78,
            fx: {
              role: 'council_member',
              membership: ['council', true, 'elected to the village council'],
              reputation: 0.08,
              flag: 'elected_to_village_council',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 40. Road tax -----------------------------------------------------------
  {
    id: 'r2-rural.road-tax',
    title: '路上的石子钱',
    domain: 'civic',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['rural', 'tax', 'road', 'evasion', 'council'],
    contexts: ['rural', 'small_town', 'peace', 'reform'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      toll_collector: ['official', { minAge: 30, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'paid-the-road-toll',
        w: 0.4,
        text: '{toll_collector}在木栅栏边摆了一张桌子，过一辆车收三克朗。{subject}赶着板车去磨坊，钱交了，栅栏却只开了一半，车轮蹭掉一块漆。{toll_collector}在本子上记了车牌，说月底还要查。',
        significance: 0.66,
        fx: {
          cash: -3,
          relation: ['toll_collector', 'acquaintance', 0.02, 0],
          flag: 'paid_road_tax',
        },
      },
      {
        id: 'evaded-the-toll-at-night',
        w: 0.35,
        text: '{subject}趁天黑把板车赶进河滩，绕过木栅栏。车轮陷进泥里，{neighbor}帮着推，泥水溅到腰。回到大路时，{toll_collector}的灯在前面晃，两人蹲在沟里等到灯走远。',
        significance: 0.74,
        fx: {
          cash: 2,
          relation: [
            ['neighbor', 'friend', 0.12, 0.05],
            ['toll_collector', 'rival', -0.08, 0],
          ],
          flag: 'evaded_road_tax',
        },
      },
      {
        id: 'challenged-the-accounts',
        w: 0.25,
        when: { skill: { name: 'numeracy', min: 0.4 } },
        text: '{subject}把修路的账本借来，发现石子的价钱比镇上贵一倍。{council}开会时，{subject}把账单举起来，问多出来的钱进了谁的口袋。{toll_collector}坐在后排，帽子压得很低。',
        significance: 0.78,
        fx: {
          role: 'tax_objector',
          reputation: 0.06,
          relation: ['toll_collector', 'rival', -0.15, 0],
          flag: 'challenged_road_tax',
          knowledge: ['the road gravel was bought at twice the market price', 0.9],
        },
      },
    ],
    variants: [
      {
        id: 'reform-road-levy',
        when: { legacyKinds: ['reform'] },
        title: '修路摊派',
        outcomes: [
          {
            id: 'worked-off-the-levy',
            w: 0.6,
            text: '公署拨款修路，但要求村里先出工。{subject}被派去砸石子，每天砸到手掌起泡。{toll_collector}来验工，说石子太大，要重砸。{subject}把锤子往地上一扔，又捡了起来。',
            significance: 0.7,
            fx: {
              health: -0.05,
              cash: 1,
              relation: ['toll_collector', 'rival', -0.08, 0],
              flag: 'worked_on_road_levy',
            },
          },
          {
            id: 'paid-cash-instead-of-labour',
            w: 0.4,
            text: '{subject}按亩交钱代替出工，钱交到{council}的柜上。收据上只写了“修路”，没写用在哪一段。{neighbor}说这钱大概又修了镇长门前的路。{subject}把收据压在柜台的玻璃板下。',
            significance: 0.68,
            fx: {
              cash: -4,
              relation: ['neighbor', 'acquaintance', 0.03, 0],
              flag: 'paid_road_levy',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 41. Forestry work ------------------------------------------------------
  {
    id: 'r2-rural.forestry',
    title: '林场里的冬斧',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 65],
    tags: ['rural', 'forestry', 'winter', 'labour', 'accident'],
    contexts: ['rural', 'agriculture', 'peace', 'war'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      forester: ['official', { minAge: 30, maxAge: 65 }],
      worker: ['worker', { minAge: 18, maxAge: 60 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'took-the-winter-logging-job',
        w: 0.4,
        text: '{forester}把冬季伐木的名单贴在林务所门口，{subject}挤进去按了手印。天没亮就上山，雪没过靴筒，斧柄冻得粘手。中午啃黑面包时，{forester}说这一片要在开春前清完。',
        significance: 0.72,
        fx: {
          cash: 5,
          role: 'forest_worker',
          health: -0.06,
          relation: ['forester', 'acquaintance', 0.04, 0],
          flag: 'winter_logging_job',
        },
      },
      {
        id: 'no-union-card',
        w: 0.35,
        when: { employment: false },
        text: '{forester}翻到名单最后，说今年只收有工会证的。{subject}把空手插进袖口，站在雪地里看别人领斧头。{worker}出来时低声说，明年开春可能还要人，先去把证办了。',
        significance: 0.72,
        fx: {
          unemployment: 'turned away from winter logging without a union card',
          relation: ['worker', 'acquaintance', 0.05, 0],
          flag: 'refused_logging_without_union_card',
        },
      },
      {
        id: 'crushed-by-a-falling-spruce',
        w: 0.25,
        text: '{subject}在坡上砍一棵云杉，树倒的方向偏了，枝杈扫过来，把{subject}压进雪里。{worker}用锯子砍断枝条，{forester}跑来看伤，说这根树早该标记。{subject}的腿肿了半个月。',
        significance: 0.84,
        fx: {
          health: -0.14,
          condition: 'crushed_leg',
          relation: [
            ['worker', 'friend', 0.12, 0],
            ['forester', 'rival', -0.1, 0],
          ],
          flag: 'logging_accident',
        },
      },
    ],
    variants: [
      {
        id: 'war-army-timber',
        when: { processKinds: ['war_mobilization'] },
        title: '军需木材',
        outcomes: [
          {
            id: 'cut-sleepers-for-the-army',
            w: 0.6,
            text: '{forester}说军队要枕木，林场昼夜不停。{subject}和{worker}轮班拉锯，锯末混着雪水粘在脸上。夜里收工，{subject}的手抖得端不住碗。',
            significance: 0.76,
            fx: {
              cash: 6,
              health: -0.08,
              condition: 'exhaustion',
              relation: ['worker', 'colleague', 0.1, 0],
              flag: 'cut_timber_for_army',
            },
          },
          {
            id: 'sold-timber-off-the-books',
            w: 0.4,
            text: '{subject}把好木料偷偷卖给村里的木匠，账记在风倒木上。{forester}来查时，{subject}带他看了一棵被雷劈开的树。木匠在门口数钱，没抬头。斧头砍在树皮上，声音传得很远。',
            significance: 0.78,
            fx: {
              cash: 5,
              relation: ['forester', 'rival', -0.06, 0],
              flag: 'sold_timber_off_the_books',
              knowledge: ['the good timber was billed as windfall wood', 0.8],
            },
          },
        ],
      },
    ],
    baseRate: 0.055,
    cooldownYears: 2,
  },

  // 42. Quarry -------------------------------------------------------------
  {
    id: 'r2-rural.quarry',
    title: '采石场的炮眼',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 60],
    tags: ['rural', 'quarry', 'stone', 'injury', 'labour'],
    contexts: ['rural', 'agriculture', 'peace', 'war', 'crisis'],
    milieus: ['farm', 'rural', 'land'],
    roles: {
      foreman: ['worker', { minAge: 35, maxAge: 65 }],
      worker: ['worker', { minAge: 18, maxAge: 60 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'worked-the-blast-shift',
        w: 0.4,
        text: '{foreman}把导火索剪到三指长，说点着就跑，别回头。{subject}点完炮眼，踩着碎石往坡下冲，身后一声闷响，石粉扑了满脸。收工时，{foreman}按炮眼数发钱。',
        significance: 0.72,
        fx: {
          cash: 5,
          health: -0.05,
          skill: { craft: 0.04 },
          relation: ['foreman', 'colleague', 0.06, 0],
          flag: 'worked_quarry_blast',
        },
      },
      {
        id: 'stone-dust-lung',
        w: 0.35,
        text: '{subject}在碎石机边干了两年，咳嗽越来越重。{foreman}说石场的人都咳，喝点牛奶就好。夜里{subject}咳出一口灰痰，{neighbor}听见了，说这是石肺，得去维也纳看。',
        significance: 0.8,
        fx: {
          health: -0.1,
          condition: 'stone_dust_lung',
          relation: ['neighbor', 'friend', 0.08, 0],
          flag: 'quarry_lung',
        },
      },
      {
        id: 'refused-the-unsafe-fuse',
        w: 0.25,
        text: '{foreman}让{subject}去点一个哑炮，说不会响。{subject}看见炮眼边冒着细烟，拒绝下坑。{foreman}骂了一声，自己去了。当天晚上，{subject}的名字从排班表上被划掉。',
        significance: 0.78,
        fx: {
          unemployment: 'fired for refusing to relight a smouldering charge',
          relation: ['foreman', 'rival', -0.2, 0],
          flag: 'fired_for_refusing_unsafe_blast',
        },
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 43. Cheese storage -----------------------------------------------------
  {
    id: 'r2-rural.cheese-cellar',
    title: '地窖里的奶酪',
    domain: 'work',
    stage: 'adulthood',
    ages: [18, 70],
    tags: ['rural', 'dairy', 'storage', 'market', 'food'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'shop'],
    roles: {
      dairymaid: ['worker', { minAge: 20, maxAge: 65 }],
      merchant: ['worker', { minAge: 30, maxAge: 65 }],
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
    },
    outcomes: [
      {
        id: 'sold-the-aged-cheese',
        w: 0.4,
        text: '{subject}把地窖门打开，冷气裹着霉味涌出来。奶酪轮上结着一层灰白的皮，{merchant}用刀尖挑了一点尝，说可以按陈年卖。{subject}把最重的一轮搬上车，腰闪了一下。',
        significance: 0.72,
        fx: {
          cash: 7,
          health: -0.03,
          relation: ['merchant', 'colleague', 0.08, 0],
          flag: 'sold_aged_cheese',
        },
      },
      {
        id: 'the-cheese-spoiled',
        w: 0.35,
        text: '{dairymaid}掀开麻布，奶酪上长了一层绿毛，边缘渗出苦水。{subject}把坏的部分切掉，剩下的自己也不敢吃。{merchant}来看了，说这一窖只能喂猪。',
        significance: 0.74,
        fx: {
          cash: -6,
          food: -1,
          relation: ['dairymaid', 'acquaintance', 0.02, 0],
          flag: 'cheese_spoiled',
        },
      },
      {
        id: 'shared-the-cellar-cheese',
        w: 0.25,
        text: '{subject}把一轮熟奶酪切开，分给{neighbor}和{dairymaid}各一块。三人坐在窖口，就着黑面包吃，奶酪的咸味在舌根留了很久。{neighbor}说这味道像他母亲做的。',
        significance: 0.64,
        fx: {
          food: 2,
          relation: [
            ['neighbor', 'friend', 0.12, 0.05],
            ['dairymaid', 'colleague', 0.08, 0],
          ],
          flag: 'shared_cellar_cheese',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-cheese-for-flour',
        when: { processKinds: ['economic_crisis'] },
        title: '奶酪换面粉',
        outcomes: [
          {
            id: 'traded-at-the-city-scale',
            w: 0.6,
            text: '城里来的人用面粉换奶酪，一磅换一磅。{subject}算了算，觉得划算，把窖里最老的几轮搬出来。{merchant}在秤上做了手脚，{subject}看见秤砣底下垫着一块木片。',
            significance: 0.74,
            fx: {
              cash: 3,
              food: 2,
              relation: ['merchant', 'rival', -0.1, 0],
              flag: 'traded_cheese_for_flour',
              knowledge: ['the merchant’s scale has a wooden shim under the weight', 0.8],
            },
          },
          {
            id: 'hoarded-until-it-moulded',
            w: 0.4,
            text: '{subject}把奶酪藏进地窖最深处，上面堆满木柴，等价钱再涨。{neighbor}来借柴，看见木柴下面露出的麻布角，什么也没问。开春时，奶酪长了毛，价钱也没涨。',
            significance: 0.72,
            fx: {
              cash: -4,
              food: -1,
              flag: 'hoarded_cheese_too_long',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 44. Bee colony ---------------------------------------------------------
  {
    id: 'r2-rural.bee-swarm',
    title: '屋檐下的蜂群',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [16, 72],
    tags: ['rural', 'bees', 'honey', 'craft', 'neighbor'],
    contexts: ['rural', 'agriculture', 'peace', 'reform'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      beekeeper: ['neighbor', { minAge: 30, maxAge: 75 }],
      sibling: ['sibling', { minAge: 12, maxAge: 65 }],
      priest: ['neighbor', { minAge: 35, maxAge: 78 }],
      coop: ['organization', { organizationKind: 'other' }],
    },
    outcomes: [
      {
        id: 'captured-the-swarm',
        w: 0.4,
        text: '{beekeeper}说蜂群分家时最好收，拿一只空箱和一把带蜜的脾。{subject}爬上梯子，把箱口对准屋檐下的蜂团，手被蜇了三下。傍晚，蜂群全进了箱，{beekeeper}说这一箱归{subject}。',
        significance: 0.74,
        fx: {
          cash: 2,
          skill: { craft: 0.04 },
          relation: ['beekeeper', 'colleague', 0.1, 0],
          flag: 'kept_bee_colony',
        },
      },
      {
        id: 'sold-the-first-honey',
        w: 0.35,
        text: '{subject}摇出第一桶蜜，滤了两遍，装进玻璃罐。{sibling}拿去集市，换回三克朗和一小袋糖。{beekeeper}尝了一口，说花期好，明年能多分一箱。',
        significance: 0.68,
        fx: {
          cash: 3,
          relation: [
            ['sibling', 'colleague', 0.08, 0],
            ['beekeeper', 'acquaintance', 0.04, 0],
          ],
          flag: 'sold_first_honey',
        },
      },
      {
        id: 'stung-on-the-neck',
        w: 0.25,
        text: '{subject}被蜇在脖子上，半个脸肿起来。{priest}赶来念了一段经，又用湿泥敷上。{beekeeper}说下次穿厚点，蜂不认人，只认颜色。第二天肿消了，{subject}照旧去看蜂箱。',
        significance: 0.72,
        fx: {
          health: -0.08,
          condition: 'bee_sting_swelling',
          relation: ['priest', 'friend', 0.08, 0],
          flag: 'bee_sting_reaction',
        },
      },
    ],
    variants: [
      {
        id: 'reform-honey-coop',
        when: { legacyKinds: ['reform'] },
        title: '合作社的蜂箱',
        outcomes: [
          {
            id: 'moved-the-bees-into-the-new-hive',
            w: 0.6,
            text: '{coop}发下新式蜂箱，说统一收购蜂蜜。{subject}把旧木箱里的蜂赶进新箱，蜂在箱口挤成一团。{beekeeper}说这箱子好，就是蜂还不认路。{subject}被蜇了两下，没敢松手。',
            significance: 0.72,
            fx: {
              cash: 2,
              membership: ['coop', true, 'joined the honey cooperative'],
              relation: ['beekeeper', 'colleague', 0.08, 0],
              flag: 'joined_honey_coop',
            },
          },
          {
            id: 'sold-honey-in-vienna',
            w: 0.4,
            text: '{subject}没入社，把蜜装进旧瓶子，挑到维也纳的市场上卖。价钱比合作社高，但来回走了一天，脚底磨出水泡。{beekeeper}说这样卖不长久了。回到家时，鞋底已经磨穿。',
            significance: 0.7,
            fx: {
              cash: 4,
              health: -0.03,
              flag: 'sold_honey_independently',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 2,
  },

  // 45. Orchard ------------------------------------------------------------
  {
    id: 'r2-rural.orchard-frost',
    title: '果园的晚霜',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [16, 72],
    tags: ['rural', 'orchard', 'frost', 'harvest', 'neighbor'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis'],
    milieus: ['farm', 'rural', 'land', 'market'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      sibling: ['sibling', { minAge: 14, maxAge: 70 }],
      merchant: ['worker', { minAge: 30, maxAge: 65 }],
    },
    outcomes: [
      {
        id: 'smoked-the-orchard',
        w: 0.4,
        text: '{subject}在果园里点起湿草堆，烟低低地压在树行间。{neighbor}扛来一捆稻草，说再烧一夜，花就能保住。天亮时两人满脸黑灰，枝头的花瓣还挂着。{subject}的睫毛上结了一层白灰。',
        significance: 0.72,
        fx: {
          cash: -3,
          skill: { craft: 0.03 },
          relation: ['neighbor', 'friend', 0.12, 0.05],
          flag: 'saved_orchard_from_frost',
        },
      },
      {
        id: 'the-frost-took-the-blossom',
        w: 0.35,
        text: '{subject}起晚了，霜已经把花打黑。{sibling}站在树下，用手一碰，花瓣就落。{merchant}来收果，看了半天，说今年只能做果酱，价钱按烂果算。',
        significance: 0.76,
        fx: {
          cash: -8,
          food: -2,
          relation: [
            ['sibling', 'acquaintance', 0.02, 0],
            ['merchant', 'rival', -0.06, 0],
          ],
          flag: 'orchard_frost_loss',
        },
      },
      {
        id: 'cut-the-trees-for-firewood',
        w: 0.25,
        text: '{subject}把冻死的果树砍了当柴卖，换回四克朗。{neighbor}说这些树是你父亲种的，{subject}说树死了，留着也是虫窝。斧头砍在树根上，声音很闷。',
        significance: 0.74,
        fx: {
          cash: 4,
          reputation: -0.06,
          relation: ['neighbor', 'rival', -0.08, 0],
          flag: 'cut_orchard_trees_for_firewood',
        },
      },
    ],
    variants: [
      {
        id: 'crisis-apples-for-potatoes',
        when: { processKinds: ['economic_crisis'] },
        title: '果子换粮食',
        outcomes: [
          {
            id: 'traded-apples-for-potatoes',
            w: 0.6,
            text: '{merchant}用一袋土豆换{subject}的苹果，说城里人现在只买得起土豆。{subject}把苹果一个个码进他的筐，挑出有虫眼的放在一边。{sibling}问为什么不自己吃，{subject}说土豆更顶饱。',
            significance: 0.7,
            fx: {
              food: 2,
              relation: ['merchant', 'acquaintance', 0.03, 0],
              flag: 'traded_apples_for_potatoes',
            },
          },
          {
            id: 'hoarded-the-apples',
            w: 0.4,
            text: '{subject}把苹果藏在草棚里，等冬天卖高价。{neighbor}来借草，看见苹果堆，说这是囤积。{subject}给了他半筐，让他别声张。冬天苹果烂了一半，剩下的也失了味。',
            significance: 0.68,
            fx: {
              food: 1,
              cash: 2,
              relation: ['neighbor', 'colleague', 0.06, 0],
              flag: 'hoarded_apples',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 46. Potato blight ------------------------------------------------------
  {
    id: 'r2-rural.potato-blight',
    title: '地窖里的黑斑',
    domain: 'agriculture',
    stage: 'adulthood',
    ages: [18, 72],
    tags: ['rural', 'potato', 'disease', 'hunger', 'market'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'land', 'home'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      inspector: ['official', { minAge: 28, maxAge: 65 }],
      council: ['organization', { organizationKind: 'state' }],
    },
    outcomes: [
      {
        id: 'burned-the-blighted-potatoes',
        w: 0.4,
        text: '{subject}切开一颗土豆，里面是黑褐色的环。{neighbor}说这是晚疫病，整窖都完了。两人把土豆倒在坑里，浇上煤油点火，黑烟在雪地上滚。{subject}站在坑边，闻着焦味，没说话。',
        significance: 0.78,
        fx: {
          food: -4,
          cash: -5,
          relation: ['neighbor', 'colleague', 0.08, 0],
          flag: 'burned_blighted_potatoes',
        },
      },
      {
        id: 'ate-the-blighted-potatoes',
        w: 0.35,
        text: '{subject}把黑斑削掉，剩下的煮了一锅。{neighbor}说吃了会中毒，{subject}说饿比毒厉害。夜里{subject}吐了一地，第二天连站起来的力气都没有。',
        significance: 0.8,
        fx: {
          health: -0.1,
          condition: 'potato_sickness',
          flag: 'ate_blighted_potatoes',
        },
      },
      {
        id: 'sold-blighted-seed',
        w: 0.25,
        text: '{subject}把病薯混进种薯里，卖给邻村来的贩子。{inspector}来查时，{subject}带他看了一筐挑好的。贩子的车走远了，{neighbor}在地头问：你卖的是哪一筐？',
        significance: 0.78,
        fx: {
          cash: 3,
          reputation: -0.1,
          relation: ['neighbor', 'rival', -0.1, 0],
          flag: 'sold_blighted_seed_potatoes',
          knowledge: ['the seed potatoes were mixed with diseased tubers', 0.85],
        },
      },
    ],
    variants: [
      {
        id: 'war-potato-shortage',
        when: { processKinds: ['war_mobilization'] },
        title: '战时的土豆',
        outcomes: [
          {
            id: 'divided-good-from-diseased',
            w: 0.6,
            text: '军队征走了半窖土豆，剩下的又染了病。{subject}把病薯和好薯分开，好的留种，病的煮了吃。孩子问为什么不去领配给，{subject}说配给站在十里外。{subjectPronoun}把好薯埋进新窖，上面压了两块石板。',
            significance: 0.72,
            fx: {
              food: -2,
              health: -0.04,
              flag: 'wartime_potato_shortage',
            },
          },
          {
            id: 'hid-potatoes-under-the-cabbages',
            w: 0.4,
            text: '{subject}在村口挖了一个新窖，把土豆藏进去，上面种上白菜。{neighbor}问为什么把菜种在路边，{subject}说土肥。夜里两人摸黑搬薯，谁也没提军队。',
            significance: 0.76,
            fx: {
              food: 2,
              relation: ['neighbor', 'colleague', 0.08, 0],
              flag: 'hid_potatoes_from_army',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 47. Grain price --------------------------------------------------------
  {
    id: 'r2-rural.grain-price',
    title: '粮价牌上的粉笔',
    domain: 'economy',
    stage: 'adulthood',
    ages: [20, 72],
    tags: ['rural', 'grain', 'price', 'market', 'protest'],
    contexts: ['rural', 'agriculture', 'peace', 'crisis', 'war'],
    milieus: ['farm', 'rural', 'land', 'market', 'shop'],
    roles: {
      merchant: ['worker', { minAge: 30, maxAge: 65 }],
      farmer: ['neighbor', { minAge: 25, maxAge: 70 }],
      miller: ['worker', { minAge: 35, maxAge: 70 }],
    },
    outcomes: [
      {
        id: 'held-the-grain-too-long',
        w: 0.35,
        text: '{subject}把麦子堆在阁楼上，等价钱再涨。{merchant}每周来问一次，价钱一次比一次高。{farmer}说该卖了，{subject}说再等一周。结果铁路运来一车匈牙利小麦，价钱一夜跌回原处。',
        significance: 0.78,
        fx: {
          cash: 2,
          flag: 'held_grain_too_long',
          knowledge: ['a trainload of Hungarian wheat broke the local price', 0.85],
        },
      },
      {
        id: 'sold-at-the-harvest-price',
        w: 0.35,
        text: '{subject}把麦子拉到磨坊，{miller}过秤时压了压斗沿。{merchant}付钱，说今年收成好，价钱不会再高。{subject}把钱缝进腰带，回家路上买了一块咸肉。',
        significance: 0.68,
        fx: {
          cash: 3,
          food: 1,
          relation: ['merchant', 'acquaintance', 0.03, 0],
          flag: 'sold_grain_at_harvest_price',
        },
      },
      {
        id: 'wrote-the-old-price-on-the-board',
        w: 0.3,
        text: '{subject}在粮价牌前站了半天，用粉笔把旧价和新价并排写上。赶集的人围过来，{merchant}让人把牌子擦掉。{subject}又写了一遍，这次写在地上。',
        significance: 0.74,
        fx: {
          reputation: 0.05,
          relation: ['merchant', 'rival', -0.15, 0],
          flag: 'wrote_old_grain_prices_on_the_board',
        },
      },
    ],
    variants: [
      {
        id: 'war-ration-price',
        when: { processKinds: ['war_mobilization'] },
        title: '配给与粮价',
        outcomes: [
          {
            id: 'sold-at-the-requisition-price',
            w: 0.6,
            text: '{merchant}把粮价牌翻到背面，写上配给价，数字只有原来的三成。{subject}问差额谁来补，{merchant}说公署。第二天公署的人来查账，{merchant}把牌子上的粉笔字擦了又写。',
            significance: 0.72,
            fx: {
              cash: 2,
              flag: 'sold_grain_at_requisition_price',
              knowledge: ['the ration price is less than a third of the open market', 0.85],
            },
          },
          {
            id: 'sold-after-ration-hours',
            w: 0.4,
            text: '{subject}把粮食藏起来，等配给站关门再卖。{farmer}劝他别冒险，{subject}说饿死比坐牢快。夜里交易时，巷口传来自行车铃声，两人把袋子拖进草垛，屏住呼吸。',
            significance: 0.76,
            fx: {
              cash: 6,
              flag: 'sold_grain_after_ration_hours',
            },
          },
        ],
      },
    ],
    baseRate: 0.06,
    cooldownYears: 2,
  },

  // 48. Winter isolation ---------------------------------------------------
  {
    id: 'r2-rural.winter-isolation',
    title: '雪封住的村路',
    domain: 'civic',
    stage: 'adulthood',
    ages: [18, 75],
    tags: ['rural', 'winter', 'isolation', 'health', 'neighbor'],
    contexts: ['rural', 'agriculture', 'peace', 'war', 'crisis'],
    milieus: ['farm', 'rural', 'home', 'land'],
    roles: {
      neighbor: ['neighbor', { minAge: 18, maxAge: 75 }],
      doctor: ['official', { minAge: 28, maxAge: 70 }],
      parent: ['parent', { minAge: 45, maxAge: 85 }],
    },
    outcomes: [
      {
        id: 'dug-out-the-road',
        w: 0.4,
        text: '{subject}和{neighbor}扛着木锹去挖路，雪没到腰，挖一锹塌一锹。到中午，两人从村口挖到教堂，手指冻得握不住锹柄。{doctor}的雪橇终于进来时，车上坐着两个发烧的孩子。',
        significance: 0.76,
        fx: {
          health: -0.08,
          relation: [
            ['neighbor', 'friend', 0.15, 0.05],
            ['doctor', 'colleague', 0.06, 0],
          ],
          flag: 'dug_out_village_road',
        },
      },
      {
        id: 'rationed-the-firewood',
        w: 0.35,
        text: '{subject}把柴棚里的木头数了一遍，只够烧十天。{parent}说省着用，白天别生火。夜里{subject}听见屋顶的雪压得梁木响，起来把最后一捆柴塞进灶膛。',
        significance: 0.7,
        fx: {
          food: -2,
          health: -0.04,
          relation: ['parent', 'kin', 0.05, 0],
          flag: 'rationed_firewood_in_winter',
        },
      },
      {
        id: 'the-doctor-came-too-late',
        w: 0.25,
        text: '{parent}咳了三天，脸烧得通红。{subject}用雪橇拉着往镇上走，走到半路，马不肯再往前。{doctor}来时，{parent}已经说不出话，只抬手摸了摸{subject}的帽子。',
        significance: 0.82,
        fx: {
          health: -0.06,
          mood: -0.15,
          relation: ['parent', 'kin', 0.1, 0.05],
          flag: 'parent_ill_while_snowbound',
        },
      },
    ],
    variants: [
      {
        id: 'war-army-truck-in-the-snow',
        when: { processKinds: ['war_mobilization'] },
        title: '雪路上的军车',
        outcomes: [
          {
            id: 'pulled-the-truck-out',
            w: 0.6,
            text: '军车陷在村口的雪里，士兵下来推车，靴子灌满雪。{subject}把自家的马牵出来，帮他们把车拉到站上。军官要给钱，{subject}没要，只要了一袋军粮。军官在本子上记下{subject}的名字。',
            significance: 0.72,
            fx: {
              cash: 2,
              food: 2,
              flag: 'pulled_army_truck_from_snow',
            },
          },
          {
            id: 'lent-a-shovel',
            w: 0.4,
            text: '{subject}没有去帮忙，站在门口看士兵在雪里骂。夜里军车还陷着，一个士兵来敲门借铁锹。{subject}把锹递出去，又把门关紧。士兵还锹时，在门口放了一小块肥皂。',
            significance: 0.66,
            fx: {
              relation: ['neighbor', 'acquaintance', 0.01, 0],
              flag: 'lent_shovel_to_soldiers',
            },
          },
        ],
      },
    ],
    baseRate: 0.05,
    cooldownYears: 3,
  },

  // 49. Rural school closure ----------------------------------------------
  {
    id: 'r2-rural.school-closure',
    title: '钉上木板的教室',
    domain: 'education',
    stage: 'childhood',
    ages: [8, 14],
    tags: ['rural', 'school', 'closure', 'childhood', 'protest'],
    contexts: ['rural', 'small_town', 'peace', 'reform', 'crisis'],
    milieus: ['farm', 'rural', 'home', 'official'],
    roles: {
      teacher: ['teacher', { minAge: 22, maxAge: 70 }],
      mayor: ['official', { minAge: 35, maxAge: 70 }],
      parent: ['parent', { minAge: 30, maxAge: 60 }],
      school: ['organization', { organizationKind: 'school' }],
    },
    outcomes: [
      {
        id: 'lessons-in-the-teacher-kitchen',
        w: 0.35,
        text: '{teacher}把黑板挂在自家厨房的墙上，{subject}和另外三个孩子挤在桌边。锅里炖着汤，{subject}写一行字，就闻一次肉味。{mayor}来看了，说这不算学校，{teacher}说孩子认字就算。',
        significance: 0.74,
        fx: {
          role: 'kitchen_pupil',
          education: ['primary', 1],
          reputation: 0.06,
          relation: ['teacher', 'friend', 0.12, 0.05],
          flag: 'schooled_in_teacher_kitchen',
        },
      },
      {
        id: 'reopened-the-classroom',
        w: 0.35,
        text: '{subject}和几个同学把钉在教室门上的木板一块块撬开，把课桌搬回原位。{mayor}赶来时，{subject}站在讲台上，手里攥着半截粉笔。{teacher}在后面看着，没有拦。',
        significance: 0.72,
        fx: {
          reputation: 0.05,
          relation: [
            ['mayor', 'rival', -0.08, 0],
            ['teacher', 'friend', 0.1, 0],
          ],
          flag: 'reopened_classroom_by_hand',
        },
      },
      {
        id: 'lost-a-school-year',
        w: 0.3,
        text: '{school}的门锁了一个冬天，{subject}每天路过都往窗里看。开春后，{teacher}说课程赶不上了，只能重读。{parent}把学费交了两次，收据叠在一起，像一本薄书。',
        significance: 0.72,
        fx: {
          education: ['primary', 0],
          cash: -2,
          relation: ['teacher', 'acquaintance', 0.02, 0],
          flag: 'lost_a_school_year',
        },
      },
    ],
    variants: [
      {
        id: 'reform-school-reopened',
        when: { legacyKinds: ['reform'] },
        title: '学校重新开学',
        outcomes: [
          {
            id: 'handed-over-the-key',
            w: 0.6,
            text: '{mayor}带来公署的公文，说学校归镇里管，老师由镇里派。{teacher}把钥匙交出来，{subject}看见她的手指在发抖。新老师来的那天，教室的窗户换成了玻璃。',
            significance: 0.72,
            fx: {
              education: ['primary', 1],
              reputation: 0.04,
              relation: ['teacher', 'acquaintance', 0.02, 0],
              flag: 'village_school_reopened_under_district',
            },
          },
          {
            id: 'petitioned-to-keep-the-school',
            w: 0.4,
            text: '{subject}和{parent}去镇上请愿，要求保留老学校。窗口的人收下名单，说会研究。回村的路上，{parent}买了一块糖给{subject}，说研究就是等，等就是没有。',
            significance: 0.7,
            fx: {
              reputation: 0.04,
              relation: ['parent', 'kin', 0.06, 0],
              flag: 'petitioned_to_keep_village_school',
            },
          },
        ],
      },
    ],
    baseRate: 0.045,
    cooldownYears: 4,
  },

  // 50. Inheritance of a mill ---------------------------------------------
  {
    id: 'r2-rural.mill-inheritance',
    title: '磨坊的水轮归谁',
    domain: 'family',
    stage: 'adulthood',
    ages: [22, 68],
    tags: ['rural', 'inheritance', 'mill', 'sibling', 'craft'],
    contexts: ['rural', 'agriculture', 'peace', 'postwar'],
    milieus: ['farm', 'rural', 'land', 'official'],
    roles: {
      sibling: ['sibling', { minAge: 18, maxAge: 75 }],
      notary: ['official', { minAge: 30, maxAge: 70 }],
      miller: ['worker', { minAge: 35, maxAge: 70 }],
      mill: ['organization', { organizationKind: 'household_firm' }],
    },
    outcomes: [
      {
        id: 'inherited-the-mill',
        w: 0.35,
        text: '{notary}念完遗嘱，把磨坊的钥匙交给{subject}。水轮已经停了三天，轮叶上挂着水草。{miller}站在门口，问新东家还留不留他。{subject}把钥匙攥热，说先修闸，再谈人。',
        significance: 0.84,
        fx: {
          cash: 10,
          role: 'miller',
          relation: ['miller', 'acquaintance', 0.05, 0],
          flag: 'inherited_the_mill',
        },
      },
      {
        id: 'sold-the-mill',
        w: 0.35,
        text: '{subject}把磨坊卖给邻村的磨坊主，价钱比自己预想的高。{sibling}在契约上签了放弃继承，签完把笔一扔，说这地方早就该卖。{miller}收拾工具时，把一把旧锉刀留在了门槛上。',
        significance: 0.82,
        fx: {
          cash: 24,
          relation: ['sibling', 'colleague', 0.06, 0],
          flag: 'sold_the_mill',
        },
      },
      {
        id: 'shared-the-mill',
        w: 0.3,
        text: '{subject}和{sibling}把磨坊的股份对半分，一个管磨，一个管账。第一天开闸，两人为谁先用水吵了起来，{miller}在旁边把闸门拉了一半，说水不等人。',
        significance: 0.76,
        fx: {
          cash: 4,
          role: 'mill_partner',
          relation: ['sibling', 'colleague', 0.12, 0.05],
          flag: 'shared_the_mill',
        },
      },
    ],
    variants: [
      {
        id: 'postwar-rebuild-the-mill',
        when: { legacyKinds: ['war_aftermath'] },
        title: '战后修磨',
        outcomes: [
          {
            id: 'rebuilt-the-water-wheel',
            w: 0.6,
            text: '磨坊的屋顶被炮弹掀掉一半，水轮卡在淤泥里。{subject}和{miller}清了一个月，才让轮子重新转。第一斗麦磨出来时，{sibling}抓了一把面粉，说里面有沙。',
            significance: 0.8,
            fx: {
              cash: -8,
              skill: { craft: 0.04 },
              relation: [
                ['miller', 'colleague', 0.12, 0],
                ['sibling', 'colleague', 0.06, 0],
              ],
              flag: 'rebuilt_the_mill_after_war',
            },
          },
          {
            id: 'scrapped-the-wheel',
            w: 0.4,
            text: '{subject}没有修磨坊，把水轮拆下来当废铁卖了。{miller}站在空磨房里，说这轮子转了三代人。{subject}数完钱，听见河水从闸口白白流走。废铁商把轮叶砸直，装上了自己的车。',
            significance: 0.78,
            fx: {
              cash: 12,
              reputation: -0.08,
              relation: ['miller', 'rival', -0.15, 0],
              flag: 'scrapped_the_mill_wheel',
            },
          },
        ],
      },
    ],
    baseRate: 0.035,
    cooldownYears: 6,
  },
]);
