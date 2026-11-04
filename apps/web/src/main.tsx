import '@fontsource/noto-sans-sc/400.css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import PaperDoll, { CompactDollEditor } from './PaperDoll';
import {
  historicalPhaseLabel,
  historicalRoleLabel,
  influencePercent,
  relationScoreText,
} from './historicalLabels';
import './style.css';

type Date4 = { year: number; month: number };
type Appearance = { skin: number; hair: number; clothes: number; doll?: Record<string, unknown> };
type HistoricalIdentity = {
  id: string;
  sourceIds: string[];
  birthPrecision: 'year' | 'day';
  occupation: string;
  publicRole: string;
  activityRegionIds: string[];
  activeFrom: Date4;
  activeTo?: Date4;
  realWorldDeath?: { year: number; month?: number; day?: number };
  biographyIsNotFate: boolean;
  notes?: string;
};
type PersonHistoricalProcess = {
  id: string;
  name?: string;
  description: string;
  kind: string;
  phase: string;
  outcome?: string;
  roles: string[];
  influence: number;
  joinedAt: Date4;
  lastEventId: string;
};
type HistoricalContact = {
  id: string;
  name: string;
  kind: string;
  trust: number;
  respect: number;
  historicalId: string;
  publicRole: string;
};
type WorldHistoricalDevelopment = {
  id: string;
  type: string;
  description: string;
  status: string;
  severity: number;
  organizationId?: string;
  historical?: {
    kind: string;
    phase: string;
    phaseStarted: Date4;
    metrics: Record<string, number>;
    objectives: string[];
    participantCount: number;
    organizations: { id: string; roles: string[] }[];
    outcome?: string;
    recentHistory: { date: Date4; phase: string; note: string }[];
  };
};
type PersonSummary = {
  id: string;
  name: string;
  sex: string;
  owner: boolean;
  ownedByAnother?: boolean;
  born: Date4;
  died?: Date4;
  deathCause?: string;
  age: number;
  locationId: string;
  locationName?: string;
  occupation: string;
  historical?: HistoricalIdentity;
  agency?: {
    goal: string;
    summary: string;
    since: Date4;
    lastAction?: Date4;
    lastActionKind?: string;
  };
  householdId: string;
  roles: string[];
  education: { status: string; level: number; placeId?: string };
  lifeContract?: {
    originalWish: string;
    mode: string;
    interpretation?: string;
    privateGoal?: string;
  };
  appearance: Appearance;
};
type LogKind = 'birth' | 'death' | 'history' | 'major' | 'ordinary';
type LogSegment = {
  type: 'text' | 'person';
  text: string;
  personId?: string;
  name?: string;
  role?: string;
  historical?: boolean;
};
type ProcessRef = {
  id: string;
  name: string;
  phase?: string;
  description?: string;
};
type LogEvent = {
  id: string;
  date: Date4;
  action: string;
  title?: string;
  immediateText: string;
  placeName?: string;
  people: { id: string; name: string; role: string }[];
  significance: number;
  visibility?: 'private' | 'participants' | 'public';
  kind: LogKind;
  major: boolean;
  causes?: string[];
  historyRefs?: string[];
  tags?: string[];
  segments: LogSegment[];
  processRefs?: ProcessRef[];
  trace?: {
    mechanism: {
      sceneId: string;
      outcomeId: string;
      kernelId?: string;
      contextId?: string;
      milieuId?: string;
      variantId?: string;
    };
    place?: { id: string; name: string; kind: string };
    subject: { id: string; name: string; age?: number; occupation?: string; roles: string[] };
    participants: { personId: string; role: string; name: string; organizationId?: string }[];
    motive?: string;
    conflict?: string;
    response?: string;
    effects: { type: string; description: string }[];
  };
};
type PersonHover = {
  personId: string;
  name?: string;
  role?: string;
  historical?: boolean;
  rect: DOMRect;
};
type ProcessHover = {
  process: ProcessRef;
  rect: DOMRect;
};
type Chronicle = {
  id: string;
  date: Date4;
  title: string;
  text: string;
  sourceIds: string[];
};
type World = {
  id: string;
  date: Date4;
  status: string;
  terminalReason?: string;
  revision: number;
  people: PersonSummary[];
  peopleTotal?: number;
  peopleAlive?: number;
  householdCount?: number;
  peopleLimit?: number;
  peopleNextCursor?: string | null;
  peopleHasMore?: boolean;
  places: { id: string; name: string; kind: string }[];
  organizations: { id: string; name: string; kind: string }[];
  recentEvents: LogEvent[];
  chronicle: Chronicle[];
  macro?: {
    developments?: WorldHistoricalDevelopment[];
    legacy?: {
      id: string;
      processId?: string;
      kind: string;
      title: string;
      description: string;
      regionId: string;
      started: Date4;
      tags: string[];
      eventWeights: Record<string, number>;
    }[];
  } | null;
};
type PersonDetail = {
  person: PersonSummary;
  canReadLog: boolean;
  household?: {
    id: string;
    residenceId: string;
    sharingRules: string;
    members: {
      id: string;
      name: string;
      age: number;
      born?: Date4;
      occupation?: string;
      relation: string;
      died?: Date4;
    }[];
  };
  place?: { id: string; name: string; kind: string };
  relationships: {
    id: string;
    personId: string;
    name: string;
    kind: string;
    trust: number;
    affection: number;
    obligation: number;
  }[];
  events: LogEvent[];
  worldEvents: LogEvent[];
  historicalProcesses?: PersonHistoricalProcess[];
  historicalContacts?: HistoricalContact[];
  lifePassages?: {
    id: string;
    from: Date4;
    to: Date4;
    title: string;
    eventIds: string[];
    text: string;
  }[];
};
type AuthState = {
  user: { id: string; username: string } | null;
  persons: { id: string; name: string; worldId: string; born: Date4; died?: Date4 }[];
};

async function api<T = any>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    credentials: 'same-origin',
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init?.headers ?? {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok)
    throw new Error((data && (data.error as string)) || `请求失败（${response.status}）`);
  return data as T;
}

const monthNames = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];
const dateText = (date: Date4) => `${date.year} 年 ${monthNames[date.month - 1]}`;
const shortDate = (date: Date4) => `${date.year}.${String(date.month).padStart(2, '0')}`;
const sexText = (sex: string) => (sex === 'female' ? '女' : sex === 'male' ? '男' : '双性');
const relationText: Record<string, string> = {
  kin: '亲属',
  guardian: '监护',
  partner: '伴侣',
  friend: '朋友',
  colleague: '同事',
  employer: '雇主',
  rival: '对手',
  acquaintance: '相识',
};
const educationText: Record<string, string> = {
  none: '未入学',
  home: '家中教养',
  primary: '国民学校',
  secondary: '中学',
  apprenticeship: '学徒',
  higher: '高等教育',
};

/**
 * Mirrors the simulator's age rule, but lets the observer pin a dead person to
 * their age at death. The API normally supplies `age`; this is defensive so an
 * in-flight or older response can never make a dead person keep ageing.
 */
function ageAtDate(person: { born: Date4 }, date: Date4): number {
  return Math.max(
    0,
    Math.floor(date.year - person.born.year + (date.month - person.born.month) / 12),
  );
}

function displayAge(person: { born: Date4; died?: Date4; age?: number }, worldDate: Date4): number {
  if (person.died) {
    const atDeath = ageAtDate(person, person.died);
    return typeof person.age === 'number' && Number.isFinite(person.age)
      ? Math.min(person.age, atDeath)
      : atDeath;
  }
  return typeof person.age === 'number' && Number.isFinite(person.age)
    ? person.age
    : ageAtDate(person, worldDate);
}

function lifeChapter(age: number): string {
  if (age < 6) return '幼年';
  if (age < 12) return '童年';
  if (age < 18) return '少年';
  if (age < 25) return '青年';
  if (age < 35) return '成年';
  if (age < 50) return '中年';
  if (age < 65) return '晚年';
  return '老年';
}

function lifeSpanText(person: Pick<PersonSummary, 'born' | 'died'>): string {
  return `${shortDate(person.born)} — ${person.died ? shortDate(person.died) : '至今'}`;
}

const eventKindText: Record<LogKind, string> = {
  birth: '出生',
  death: '死亡',
  history: '历史参与',
  major: '重大事件',
  ordinary: '生活记录',
};

const developmentStatusText: Record<string, string> = {
  emerging: '初现',
  active: '进行中',
  declining: '衰退',
  ended: '已结束',
  blocked: '停滞',
};

const participantRoleText: Record<string, string> = {
  subject: '当事人',
  participant: '参与者',
  witness: '见证者',
  neighbor: '邻居',
  friend: '朋友',
  partner: '伴侣',
  spouse: '配偶',
  parent: '父母',
  child: '子女',
  guardian: '监护人',
  employer: '雇主',
  employee: '雇员',
  colleague: '同事',
  rival: '对手',
  official: '官员',
  doctor: '医生',
  teacher: '教师',
  leader: '领导者',
  organizer: '组织者',
  supporter: '支持者',
  opponent: '反对者',
  executor: '执行者',
  perpetrator: '施暴者',
  victim: '受害者',
  rescuer: '救助者',
  affected: '受影响者',
};

function readableParticipantRole(role: string | undefined): string | undefined {
  if (!role) return undefined;
  return participantRoleText[role] ?? '在场';
}

/** Keep a hover card inside the viewport without turning it into a modal. */
function popoverPosition(
  rect: DOMRect,
  width: number,
  estimatedHeight: number,
): React.CSSProperties {
  const margin = 10;
  const viewportWidth = typeof window === 'undefined' ? 1280 : window.innerWidth;
  const viewportHeight = typeof window === 'undefined' ? 800 : window.innerHeight;
  const clampedWidth = Math.max(220, Math.min(width, viewportWidth - margin * 2));
  let left = rect.left + rect.width / 2 - clampedWidth / 2;
  left = Math.max(margin, Math.min(left, viewportWidth - clampedWidth - margin));
  let top = rect.bottom + 8;
  if (top + estimatedHeight > viewportHeight - margin)
    top = Math.max(margin, rect.top - estimatedHeight - 8);
  return { left, top, width: clampedWidth };
}

/**
 * The API sends a stable process name when it has one. These local fallbacks
 * only run for older responses or for a macro development opened directly from
 * the world pane; they derive a short label from recorded data, not from prose
 * inference.
 */
function shortProcessName(description: string | undefined, fallback = '历史进程'): string {
  const text = description?.trim();
  if (!text) return fallback;
  const clause = text.split(/[。；;\n]/)[0]?.trim() || text;
  return clause.length > 36 ? `${clause.slice(0, 36)}…` : clause;
}

function processRefFromDevelopment(development: WorldHistoricalDevelopment): ProcessRef {
  return {
    id: development.id,
    name: shortProcessName(development.description),
    phase: development.historical?.phase,
    description: development.description,
  };
}

function processRefFromParticipation(process: PersonHistoricalProcess): ProcessRef {
  return {
    id: process.id,
    name: process.name?.trim() || shortProcessName(process.description),
    phase: process.phase,
    description: process.description,
  };
}

/**
 * Household payloads currently carry the age at world date and sometimes no
 * birth date. Prefer a real age at death when we can reconstruct it; otherwise
 * show the death year instead of an age that would keep increasing.
 */
function householdMemberAge(
  member: { id: string; age: number; born?: Date4; died?: Date4 },
  world: World,
): number | null {
  if (!member.died) return member.age;
  const born = member.born ?? world.people.find((person) => person.id === member.id)?.born;
  return born ? ageAtDate({ born }, member.died) : null;
}

/**
 * The world endpoint now returns one page of person summaries. A background
 * refresh replaces that first page but must keep pages the observer already
 * loaded, otherwise map pins and the person switcher silently shrink.
 */
function mergeWorldRefresh(previous: World | null, page: World): World {
  if (!previous || previous.id !== page.id) return page;
  const firstPage = new Set(page.people.map((person) => person.id));
  const extra = previous.people.filter((person) => !firstPage.has(person.id));
  if (extra.length === 0) return page;
  return {
    ...page,
    people: [...page.people, ...extra],
    peopleNextCursor:
      previous.peopleNextCursor === undefined ? page.peopleNextCursor : previous.peopleNextCursor,
  };
}

/** Append a cursor page without duplicating anybody already loaded. */
function mergeWorldPage(previous: World, page: World): World {
  const seen = new Set(previous.people.map((person) => person.id));
  const appended = page.people.filter((person) => !seen.has(person.id));
  return {
    ...previous,
    ...page,
    people: [...previous.people, ...appended],
    peopleNextCursor: page.peopleNextCursor,
    peopleHasMore: page.peopleHasMore,
  };
}

function App() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [world, setWorld] = useState<World | null>(null);
  const [worldError, setWorldError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PersonDetail | null>(null);
  const [view, setView] = useState<'observer' | 'birth'>('observer');
  const [pending, setPending] = useState<{ id: string; name: string; failure?: string } | null>(
    null,
  );
  const [browsingWhilePending, setBrowsingWhilePending] = useState(false);
  const [loadingMorePeople, setLoadingMorePeople] = useState(false);
  const selectedRef = useRef<string | null>(null);
  selectedRef.current = selectedId;
  const worldRef = useRef<World | null>(null);
  worldRef.current = world;

  const refreshWorld = useCallback(async () => {
    try {
      const page = await api<World>('/v4/world');
      const next = mergeWorldRefresh(worldRef.current, page);
      setWorld(next);
      worldRef.current = next;
      setWorldError(null);
      const current = selectedRef.current;
      const alive = next.people.filter((person) => !person.died);
      if (!current || !next.people.some((person) => person.id === current)) {
        const own = next.people.find((person) => person.owner && !person.died);
        const fallback = next.people.find((person) => person.id === 'person-anna-bauer');
        const pick = own ?? fallback ?? alive[0] ?? next.people[0];
        if (pick) {
          setSelectedId(pick.id);
          selectedRef.current = pick.id;
        }
      }
      return next;
    } catch (error) {
      setWorldError((error as Error).message);
      return null;
    }
  }, []);

  const loadMorePeople = useCallback(async () => {
    const current = worldRef.current;
    if (!current?.peopleNextCursor || loadingMorePeople) return;
    setLoadingMorePeople(true);
    try {
      const page = await api<World>(
        `/v4/world?limit=500&cursor=${encodeURIComponent(current.peopleNextCursor)}`,
      );
      setWorld((existing) => {
        if (!existing) return page;
        const merged = mergeWorldPage(existing, page);
        worldRef.current = merged;
        return merged;
      });
    } catch {
      /* keep the people already loaded; the next refresh can retry */
    } finally {
      setLoadingMorePeople(false);
    }
  }, [loadingMorePeople]);

  const refreshDetail = useCallback(async (personId: string) => {
    try {
      const next = await api<PersonDetail>(`/v4/persons/${personId}`);
      if (selectedRef.current === personId) setDetail(next);
    } catch {
      if (selectedRef.current === personId) setDetail(null);
    }
  }, []);

  const bootstrap = useCallback(
    async (preferredId?: string) => {
      const [meResult, worldResult] = await Promise.allSettled([
        api<AuthState>('/auth/me'),
        api<World>('/v4/world'),
      ]);
      if (meResult.status === 'fulfilled') setAuth(meResult.value);
      else setAuth({ user: null, persons: [] });
      if (worldResult.status === 'fulfilled') {
        const next = mergeWorldRefresh(worldRef.current, worldResult.value);
        setWorld(next);
        worldRef.current = next;
        setWorldError(null);
        const own = next.people.find((person) => person.owner && !person.died);
        const fallback =
          next.people.find((person) => person.id === 'person-anna-bauer') ?? next.people[0];
        const pick =
          preferredId ?? (meResult.status === 'fulfilled' ? own?.id : undefined) ?? fallback?.id;
        if (pick) {
          setSelectedId(pick);
          selectedRef.current = pick;
        }
        if (meResult.status === 'fulfilled' && meResult.value.user) {
          const owns = meResult.value.persons.length > 0;
          setView(owns || pending || browsingWhilePending ? 'observer' : 'birth');
        }
      } else {
        setWorldError((worldResult.reason as Error).message);
      }
      setReady(true);
    },
    [pending, browsingWhilePending],
  );

  useEffect(() => {
    void bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = setInterval(() => {
      void refreshWorld().then((next) => {
        const id = selectedRef.current;
        if (next && id) void refreshDetail(id);
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [ready, refreshWorld, refreshDetail]);

  useEffect(() => {
    if (selectedId) void refreshDetail(selectedId);
  }, [selectedId, refreshDetail]);

  useEffect(() => {
    if (!pending || pending.failure) return;
    const timer = setInterval(async () => {
      try {
        const result = await api<{ status: string; childId?: string; failure?: string }>(
          `/v4/births/${pending.id}`,
        );
        if (result.status === 'born' && result.childId) {
          setPending(null);
          setBrowsingWhilePending(false);
          await bootstrap(result.childId);
          setView('observer');
        } else if (result.status === 'failed') {
          setPending((current) =>
            current ? { ...current, failure: result.failure ?? '出生登记失败' } : current,
          );
        }
      } catch {
        /* 世界重启期间保留等待状态 */
      }
    }, 1600);
    return () => clearInterval(timer);
  }, [pending, browsingWhilePending, bootstrap]);

  if (!ready)
    return (
      <div className="boot">
        <div className="boot-mark">世界人生</div>
        <p>正在读取世界与已提交的历史……</p>
      </div>
    );

  if (worldError)
    return (
      <div className="boot">
        <div className="boot-mark">世界尚未启动</div>
        <p>{worldError}</p>
        <p className="muted">
          运行 <code>pnpm dev</code> 后会创建维也纳 1912 世界。
        </p>
        <button className="primary" onClick={() => void bootstrap()}>
          重试
        </button>
      </div>
    );

  if (!auth?.user) return <AuthScreen onDone={() => void bootstrap()} />;

  if (!world) return <div className="boot">正在读取世界……</div>;

  const ownPersons = world.people.filter((person) => person.owner);
  // /auth/me has the authoritative list of this observer's people, so a page
  // boundary can never hide their own character or re-open the birth screen.
  const ownsPerson = ownPersons.length > 0 || auth.persons.length > 0;

  if (view === 'birth' && !ownsPerson && !pending && world.status === 'running')
    return (
      <BirthScreen
        world={world}
        username={auth.user.username}
        onPending={(request) => setPending(request)}
        onBrowse={() => {
          setBrowsingWhilePending(true);
          setView('observer');
        }}
        onLogout={async () => {
          await api('/auth/logout', { method: 'POST' });
          setAuth(null);
          setWorld(null);
          void bootstrap();
        }}
      />
    );

  if (pending && !browsingWhilePending)
    return (
      <PendingScreen
        pending={pending}
        world={world}
        onBrowse={() => {
          setBrowsingWhilePending(true);
          setView('observer');
        }}
        onRetry={() => {
          setPending(null);
          setView('birth');
        }}
        onLogout={async () => {
          await api('/auth/logout', { method: 'POST' });
          setAuth(null);
          setWorld(null);
          void bootstrap();
        }}
      />
    );

  return (
    <Observer
      world={world}
      detail={detail}
      selectedId={selectedId}
      onSelect={(id) => {
        setSelectedId(id);
        selectedRef.current = id;
        setDetail(null);
      }}
      username={auth.user.username}
      onLogout={async () => {
        await api('/auth/logout', { method: 'POST' });
        setAuth(null);
        setWorld(null);
        void bootstrap();
      }}
      onCreateAnother={() => setView('birth')}
      canCreate={!ownsPerson && world.status === 'running'}
      pending={pending ?? undefined}
      onRefresh={() => void bootstrap()}
      onLoadMorePeople={() => void loadMorePeople()}
      loadingMorePeople={loadingMorePeople}
    />
  );
}

function AuthScreen({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api(`/auth/${mode}`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      onDone();
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-screen">
      <div className="auth-world">
        <div className="eyebrow">另一个历史 · 1900</div>
        <h1>世界人生</h1>
        <p>
          1900 年的真实地球，历史尚未确定。你写下一个新生儿的名字与愿望，然后基本不再控制他。
          他在家庭、学校、工作、战争与疾病中自行生活。
        </p>
        <div className="auth-note">
          <span>观察，而不是指挥</span>
          <span>个人日志只写已经发生的事</span>
          <span>世界不会为愿望改规则</span>
        </div>
      </div>
      <form className="auth-card" onSubmit={submit}>
        <h2>{mode === 'login' ? '回到世界' : '建立观察者身份'}</h2>
        <label>
          用户名
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            minLength={3}
            maxLength={32}
            required
          />
        </label>
        <label>
          密码
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            minLength={10}
            maxLength={128}
            required
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="primary" disabled={busy}>
          {busy ? '处理中……' : mode === 'login' ? '进入世界' : '注册并进入'}
        </button>
        <button
          type="button"
          className="link-button"
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setError(null);
          }}
        >
          {mode === 'login' ? '没有身份？注册' : '已有身份？登录'}
        </button>
      </form>
    </div>
  );
}

function BirthScreen({
  world,
  username,
  onPending,
  onBrowse,
  onLogout,
}: {
  world: World;
  username: string;
  onPending: (request: { id: string; name: string }) => void;
  onBrowse: () => void;
  onLogout: () => void;
}) {
  const [name, setName] = useState('');
  const [sex, setSex] = useState<'female' | 'male' | 'intersex'>('female');
  const [health, setHealth] = useState(0.72);
  const [body, setBody] = useState('');
  const [wish, setWish] = useState('');
  const [lifeMode, setLifeMode] = useState<'ordinary' | 'legendary'>('ordinary');
  const [appearance, setAppearance] = useState<Appearance>({
    skin: 1,
    hair: 0,
    clothes: 2,
    doll: { bodyType: 'female' },
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const created = await api<{ id: string; status: string }>('/v4/births', {
        method: 'POST',
        body: JSON.stringify({
          name,
          sex,
          health,
          body: body.trim() || undefined,
          wish,
          lifeMode,
          appearance,
        }),
      });
      onPending({ id: created.id, name });
    } catch (caught) {
      setError((caught as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="birth-screen">
      <header className="birth-head">
        <div>
          <div className="eyebrow">维也纳 · {dateText(world.date)}</div>
          <h1>写下一个人的起点</h1>
        </div>
        <div className="head-actions">
          <span>{username}</span>
          <button className="link-button" onClick={onBrowse}>
            先看看世界
          </button>
          <button className="link-button" onClick={onLogout}>
            退出
          </button>
        </div>
      </header>
      <div className="birth-layout">
        <aside className="birth-world">
          <h2>此刻的世界</h2>
          <p>
            奥匈帝国进入第二个十年。维也纳的公寓里挤着工人家庭，印刷厂和纺织厂按件付钱，
            学校按学期收学费，医院按次收出诊费。战争、配给和流感还没有发生，但都已在路上。
          </p>
          <div className="birth-facts">
            <div>
              <span>世界时间</span>
              <strong>{dateText(world.date)}</strong>
            </div>
            <div>
              <span>城中人物</span>
              <strong>
                {world.peopleAlive ?? world.people.filter((person) => !person.died).length} 人
              </strong>
            </div>
            <div>
              <span>家庭</span>
              <strong>
                {world.householdCount ??
                  new Set(world.people.map((person) => person.householdId)).size}{' '}
                户
              </strong>
            </div>
          </div>
          <div className="birth-quote">
            “你写下的是愿望，不是命令。孩子进入哪个家庭、能否活下来、会遇见谁，
            由世界当时的条件决定。”
          </div>
        </aside>
        <form className="birth-form" onSubmit={submit}>
          <div className="birth-form-grid">
            <label>
              名字
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="例如：Anna"
                maxLength={32}
                required
              />
            </label>
            <label>
              性别
              <select value={sex} onChange={(event) => setSex(event.target.value as typeof sex)}>
                <option value="female">女</option>
                <option value="male">男</option>
                <option value="intersex">双性</option>
              </select>
            </label>
          </div>
          <label>
            身体条件
            <input
              type="range"
              min={0.2}
              max={1}
              step={0.04}
              value={health}
              onChange={(event) => setHealth(Number(event.target.value))}
            />
            <span className="range-note">
              {health < 0.45 ? '先天虚弱，婴儿期风险很高' : health < 0.7 ? '普通体质' : '结实健康'}
            </span>
          </label>
          <label>
            身体描述（可选）
            <input
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="例如：右腿略短、早产、左耳听不见"
              maxLength={300}
            />
          </label>
          <div className="appearance-block">
            <span className="field-title">外观</span>
            <CompactDollEditor value={appearance} onChange={setAppearance} />
          </div>
          <label>
            自由祝愿
            <textarea
              value={wish}
              onChange={(event) => setWish(event.target.value)}
              rows={4}
              maxLength={1000}
              placeholder="可以是期望、异能、私有系统、禁忌或自相矛盾的愿望。世界会按自己的规则解释它。"
              required
            />
          </label>
          <fieldset className="life-mode">
            <legend>人生模式</legend>
            <label>
              <input
                type="radio"
                checked={lifeMode === 'ordinary'}
                onChange={() => setLifeMode('ordinary')}
              />
              普通人生
            </label>
            <label>
              <input
                type="radio"
                checked={lifeMode === 'legendary'}
                onChange={() => setLifeMode('legendary')}
              />
              允许异常潜质
            </label>
          </fieldset>
          {error && <p className="form-error">{error}</p>}
          <button className="primary birth-submit" disabled={busy}>
            {busy ? '正在登记……' : '让他出生'}
          </button>
          <p className="fine-print">
            出生会立刻成为一个已提交事件。愿望的深度解释可以稍后完成，不会阻塞你进入世界。
          </p>
        </form>
      </div>
    </div>
  );
}

function PendingScreen({
  pending,
  world,
  onBrowse,
  onRetry,
  onLogout,
}: {
  pending: { id: string; name: string; failure?: string };
  world: World;
  onBrowse: () => void;
  onRetry: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="birth-screen">
      <header className="birth-head">
        <div>
          <div className="eyebrow">维也纳 · {dateText(world.date)}</div>
          <h1>{pending.failure ? '出生登记没有完成' : `${pending.name} 正在进入世界`}</h1>
        </div>
        <div className="head-actions">
          <button className="link-button" onClick={onLogout}>
            退出
          </button>
        </div>
      </header>
      <div className="pending-card">
        {pending.failure ? (
          <>
            <p className="form-error">{pending.failure}</p>
            <p>请求没有产生人物。你可以重新填写，世界时间不会为这次失败停住。</p>
            <button className="primary" onClick={onRetry}>
              重新填写
            </button>
          </>
        ) : (
          <>
            <div className="spinner" aria-hidden="true" />
            <p>
              出生请求已经登记。模拟器会寻找一个真实存在、能够接纳婴儿的家庭，然后写入出生事件。
            </p>
            <p className="muted">这一步不阻塞世界时钟。你可以先看维也纳正在发生什么。</p>
            <button className="primary" onClick={onBrowse}>
              先浏览世界
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Observer({
  world,
  detail,
  selectedId,
  onSelect,
  username,
  onLogout,
  onCreateAnother,
  canCreate,
  pending,
  onRefresh,
  onLoadMorePeople,
  loadingMorePeople,
}: {
  world: World;
  detail: PersonDetail | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  username: string;
  onLogout: () => void;
  onCreateAnother: () => void;
  canCreate: boolean;
  pending?: { id: string; name: string };
  onRefresh: () => void;
  onLoadMorePeople: () => void;
  loadingMorePeople: boolean;
}) {
  const person = detail?.person ?? world.people.find((item) => item.id === selectedId) ?? null;
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [processModal, setProcessModal] = useState<{ id: string; fallback?: ProcessRef } | null>(
    null,
  );
  const openProcess = (id: string, fallback?: ProcessRef) => setProcessModal({ id, fallback });
  const alive = world.people.filter((item) => !item.died);
  return (
    <div className="observer">
      <header className="topbar">
        <div className="brand">
          <span className="brand-title">世界人生</span>
          <span className="brand-sub">维也纳 · 另一个历史</span>
        </div>
        <div className="clock">
          <strong>{world.date.year}</strong>
          <span>{monthNames[world.date.month - 1]}</span>
        </div>
        <div className="world-status">
          <span className={`dot ${world.status === 'running' ? 'live' : ''}`} />
          {world.status === 'running' ? '世界运行中' : '世界已结束'}
        </div>
        <div className="account">
          {pending && <span className="pending-chip">{pending.name} 等待出生</span>}
          {canCreate && (
            <button className="link-button" onClick={onCreateAnother}>
              创造人物
            </button>
          )}
          <button className="link-button" onClick={onRefresh}>
            刷新
          </button>
          <span>{username}</span>
          <button className="link-button" onClick={onLogout}>
            退出
          </button>
        </div>
      </header>
      <main className="panes">
        <PersonPane
          world={world}
          person={person}
          detail={detail}
          onSelect={onSelect}
          onShowPlace={(id) => setActivePlace(id)}
          onOpenProcess={openProcess}
          onLoadMorePeople={onLoadMorePeople}
          loadingMorePeople={loadingMorePeople}
        />
        <LogPane
          world={world}
          person={person}
          detail={detail}
          onSelectPerson={onSelect}
          onOpenProcess={openProcess}
        />
        <WorldPane
          world={world}
          activePlace={activePlace}
          setActivePlace={setActivePlace}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </main>
      {processModal && (
        <ProcessDossierModal
          processId={processModal.id}
          fallback={processModal.fallback}
          world={world}
          detail={detail}
          onClose={() => setProcessModal(null)}
          onSelectPerson={onSelect}
        />
      )}
      <div className="footnote">
        {world.terminalReason ??
          '日志只来自已提交事件；地图用于定位，不是精确测绘。世界时间约每 30 秒推进一年。'}
        <span className="alive-count">
          {world.peopleAlive ?? alive.length} 人在世
          {world.peopleTotal !== undefined && world.peopleTotal > world.people.length
            ? ` · 已载入 ${world.people.length}/${world.peopleTotal}`
            : ''}
        </span>
      </div>
    </div>
  );
}

function PersonPane({
  world,
  person,
  detail,
  onSelect,
  onShowPlace,
  onOpenProcess,
  onLoadMorePeople,
  loadingMorePeople,
}: {
  world: World;
  person: PersonSummary | null;
  detail: PersonDetail | null;
  onSelect: (id: string) => void;
  onShowPlace: (id: string) => void;
  onOpenProcess: (id: string, fallback?: ProcessRef) => void;
  onLoadMorePeople: () => void;
  loadingMorePeople: boolean;
}) {
  const [processHover, setProcessHover] = useState<ProcessHover | null>(null);
  if (!person)
    return (
      <aside className="pane person-pane">
        <p className="muted">还没有可观察的人物。</p>
      </aside>
    );
  const household = detail?.household;
  const historicalProcesses = detail?.historicalProcesses ?? [];
  const historicalContacts = detail?.historicalContacts ?? [];
  const age = displayAge(person, world.date);
  return (
    <aside className="pane person-pane">
      <div className="pane-label">人物</div>
      <div className={`portrait ${person.died ? 'dead' : ''}`}>
        <PaperDoll person={{ ...person, age }} direction={2} motion />
        <div className="portrait-years">{lifeSpanText(person)}</div>
        {person.died && <div className="death-stamp">卒</div>}
      </div>
      <div className="person-heading">
        <h2>{person.name}</h2>
        <div className="person-dates">{lifeSpanText(person)}</div>
        <div className="person-sub">
          {sexText(person.sex)} · {person.died ? `享年 ${age} 岁` : `${age} 岁`}
          {person.owner && <span className="own-badge">你的人物</span>}
          {person.historical && <span className="historical-badge">历史人物</span>}
        </div>
      </div>
      <div className="person-facts">
        <Fact label="身份" value={person.occupation} />
        {person.historical && (
          <Fact
            label="历史身份"
            value={person.historical.publicRole || person.historical.occupation}
          />
        )}
        <Fact
          label="住处"
          value={person.locationName ?? '维也纳'}
          onClick={() => onShowPlace(person.locationId)}
        />
        <Fact
          label="教育"
          value={educationText[person.education.status] ?? person.education.status}
        />
        {person.roles.length > 0 && (
          <Fact label="角色" value={person.roles.slice(0, 3).join(' · ')} />
        )}
        {person.agency && (
          <Fact label="当前目标" value={person.agency.summary || person.agency.goal} />
        )}
        {person.died && <Fact label="死因" value={person.deathCause ?? '没有记录'} />}
      </div>
      {detail && (detail.lifePassages ?? []).length > 0 && (
        <section className="side-section life-passages">
          <h3>人生片段</h3>
          <div className="life-passage-list">
            {(detail.lifePassages ?? []).slice(-4).map((passage) => (
              <article key={passage.id} className="life-passage">
                <div>
                  <strong>{passage.title}</strong>
                  <span>
                    {passage.from.year}
                    {passage.from.month !== passage.to.month ||
                    passage.from.year !== passage.to.year
                      ? `–${passage.to.year}`
                      : ''}
                  </span>
                </div>
                <p>{passage.text.slice(0, 220)}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {person.lifeContract && (
        <div className="wish-card">
          <div className="wish-label">出生愿望</div>
          <p>{person.lifeContract.originalWish}</p>
          {person.lifeContract.interpretation && (
            <div className="wish-note">
              <span>对这个愿望的读法</span>
              {person.lifeContract.interpretation}
            </div>
          )}
          {person.lifeContract.privateGoal && (
            <div className="wish-note">
              <span>私人目标</span>
              {person.lifeContract.privateGoal}
            </div>
          )}
        </div>
      )}
      {historicalProcesses.length > 0 && (
        <section className="side-section historical-participation">
          <h3>历史参与</h3>
          <div className="historical-list">
            {historicalProcesses.map((process) => {
              const outcome = process.outcome?.trim();
              const fallback = processRefFromParticipation(process);
              return (
                <button
                  key={process.id}
                  type="button"
                  className="historical-card historical-card-button"
                  data-process-id={process.id}
                  aria-label={`打开历史进程：${fallback.name}`}
                  onMouseEnter={(event) =>
                    setProcessHover({
                      process: fallback,
                      rect: event.currentTarget.getBoundingClientRect(),
                    })
                  }
                  onMouseLeave={() => setProcessHover(null)}
                  onFocus={(event) =>
                    setProcessHover({
                      process: fallback,
                      rect: event.currentTarget.getBoundingClientRect(),
                    })
                  }
                  onBlur={() => setProcessHover(null)}
                  onClick={() => {
                    setProcessHover(null);
                    onOpenProcess(process.id, fallback);
                  }}
                >
                  <div className="historical-card-head">
                    <span className="phase-pill">{historicalPhaseLabel(process.phase)}</span>
                    <span className="influence-note">
                      影响 {influencePercent(process.influence)}%
                    </span>
                  </div>
                  <p>{process.description}</p>
                  {process.roles.length > 0 && (
                    <div className="role-tags">
                      {process.roles.map((role) => (
                        <span key={`${process.id}-${role}`}>{historicalRoleLabel(role)}</span>
                      ))}
                    </div>
                  )}
                  {outcome && <p className="historical-outcome">结果：{outcome}</p>}
                  <span className="card-action-hint">查看进程档案</span>
                </button>
              );
            })}
          </div>
        </section>
      )}
      {household && (
        <section className="side-section">
          <h3>
            家庭 · {household.members.filter((member) => !member.died).length} 人在世 /{' '}
            {household.members.length} 条成员记录
          </h3>
          <div className="member-list">
            {household.members.map((member) => {
              const memberAge = householdMemberAge(member, world);
              return (
                <button
                  key={member.id}
                  className={`member ${member.id === person.id ? 'current' : ''} ${member.died ? 'gone' : ''}`}
                  onClick={() => onSelect(member.id)}
                >
                  <span>{member.name}</span>
                  <small>
                    {member.relation} ·{' '}
                    {member.died
                      ? memberAge !== null
                        ? `已故 · 享年 ${memberAge} 岁`
                        : `已故 · 卒于 ${member.died.year} 年`
                      : `${memberAge ?? member.age} 岁`}
                    {member.occupation ? ` · ${member.occupation}` : ''}
                  </small>
                </button>
              );
            })}
          </div>
        </section>
      )}
      {detail && detail.relationships.length > 0 && (
        <section className="side-section">
          <h3>关系</h3>
          <div className="relation-list">
            {detail.relationships
              .slice()
              .sort((a, b) => b.affection - a.affection)
              .slice(0, 6)
              .map((relation) => (
                <button key={relation.id} onClick={() => onSelect(relation.personId)}>
                  <span>{relation.name}</span>
                  <small>{relationText[relation.kind] ?? relation.kind}</small>
                </button>
              ))}
          </div>
        </section>
      )}
      {historicalContacts.length > 0 && (
        <section className="side-section historical-contacts">
          <h3>历史人物关系</h3>
          <div className="historical-contact-list">
            {historicalContacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                className="historical-contact-chip"
                data-person-id={contact.id}
                aria-label={`查看历史人物 ${contact.name}`}
                onClick={() => onSelect(contact.id)}
              >
                <span>{contact.name}</span>
                <small>
                  {contact.publicRole} · {relationText[contact.kind] ?? contact.kind} · 信任{' '}
                  {relationScoreText(contact.trust)} · 尊重 {relationScoreText(contact.respect)}
                </small>
              </button>
            ))}
          </div>
        </section>
      )}
      <div className="person-switch">
        <label>
          观察另一个人
          <select value={person.id} onChange={(event) => onSelect(event.target.value)}>
            {world.people
              .slice()
              .sort((a, b) => {
                if (Boolean(a.died) !== Boolean(b.died)) return a.died ? 1 : -1;
                if (a.died && b.died)
                  return b.died.year - a.died.year || b.died.month - a.died.month;
                return displayAge(b, world.date) - displayAge(a, world.date);
              })
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}（
                  {item.died
                    ? `已故 · 享年 ${displayAge(item, world.date)} 岁`
                    : `${displayAge(item, world.date)} 岁`}
                  ）
                </option>
              ))}
          </select>
        </label>
        {world.peopleNextCursor && (
          <button className="link-button" disabled={loadingMorePeople} onClick={onLoadMorePeople}>
            {loadingMorePeople
              ? '正在读取……'
              : `加载更多人物（已显示 ${world.people.length} / ${world.peopleTotal ?? world.people.length}）`}
          </button>
        )}
      </div>
      {processHover && <ProcessHoverCard hover={processHover} />}
    </aside>
  );
}

function Fact({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  return (
    <div className="fact">
      <span>{label}</span>
      {onClick ? <button onClick={onClick}>{value}</button> : <strong>{value}</strong>}
    </div>
  );
}

function LogPane({
  world,
  person,
  detail,
  onSelectPerson,
  onOpenProcess,
}: {
  world: World;
  person: PersonSummary | null;
  detail: PersonDetail | null;
  onSelectPerson: (id: string) => void;
  onOpenProcess: (id: string, fallback?: ProcessRef) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const events = useMemo(() => {
    const source = detail?.events ?? [];
    // Newest first. For events committed on the same date, the later commit
    // appears above the earlier one, so a birth follows the scene that caused it.
    return source
      .map((event, index) => ({ event, index }))
      .sort(
        (a, b) =>
          b.event.date.year - a.event.date.year ||
          b.event.date.month - a.event.date.month ||
          b.index - a.index,
      )
      .map(({ event }) => event);
  }, [detail?.events]);
  const years = useMemo(
    () => Array.from(new Set(events.map((event) => event.date.year))).sort((a, b) => b - a),
    [events],
  );
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [personHover, setPersonHover] = useState<PersonHover | null>(null);
  const [processHover, setProcessHover] = useState<ProcessHover | null>(null);
  const [personDetails, setPersonDetails] = useState<Record<string, PersonDetail>>({});
  const personRequests = useRef(new Set<string>());
  const personDetailRevision = useRef<Record<string, number>>({});
  const [eventModal, setEventModal] = useState<{
    id: string;
    loading: boolean;
    event?: LogEvent;
    error?: string;
  } | null>(null);
  const eventRequest = useRef(0);
  const shown = yearFilter ? events.filter((event) => event.date.year === yearFilter) : events;
  const ownerIds = useMemo(() => {
    const ids = new Set(world.people.filter((item) => item.owner).map((item) => item.id));
    if (detail?.person.owner) ids.add(detail.person.id);
    return ids;
  }, [world.people, detail?.person.id, detail?.person.owner]);

  useEffect(() => {
    setYearFilter(null);
    setPersonHover(null);
    setProcessHover(null);
    setEventModal(null);
    eventRequest.current += 1;
  }, [person?.id]);
  useEffect(() => {
    const node = scroller.current;
    if (node) node.scrollTop = 0;
  }, [person?.id, events.length]);

  const ensurePersonDetail = (personId: string) => {
    if (personId === detail?.person.id) return;
    const loadedRevision = personDetailRevision.current[personId];
    if (personDetails[personId] && loadedRevision !== undefined && loadedRevision >= world.revision)
      return;
    if (personRequests.current.has(personId)) return;
    personRequests.current.add(personId);
    const requestedRevision = world.revision;
    api<PersonDetail>(`/v4/persons/${personId}`)
      .then((next) => {
        personDetailRevision.current[personId] = requestedRevision;
        setPersonDetails((current) => ({ ...current, [personId]: next }));
      })
      .catch(() => undefined)
      .finally(() => personRequests.current.delete(personId));
  };

  const showPerson = (next: PersonHover) => {
    setProcessHover(null);
    setPersonHover(next);
    ensurePersonDetail(next.personId);
  };

  const showProcess = (process: ProcessRef, rect: DOMRect) => {
    setPersonHover(null);
    setProcessHover({ process, rect });
  };

  const selectPerson = (personId: string) => {
    setPersonHover(null);
    setProcessHover(null);
    setEventModal(null);
    eventRequest.current += 1;
    onSelectPerson(personId);
  };

  const openEvent = async (eventId: string) => {
    const token = eventRequest.current + 1;
    eventRequest.current = token;
    setEventModal({ id: eventId, loading: true });
    try {
      const next = await api<LogEvent>(`/v4/events/${eventId}`);
      if (eventRequest.current === token)
        setEventModal({ id: eventId, loading: false, event: next });
    } catch (error) {
      if (eventRequest.current === token)
        setEventModal({
          id: eventId,
          loading: false,
          error: (error as Error).message || '无法读取事件档案',
        });
    }
  };

  if (!person) return <section className="pane log-pane" />;
  const hoveredDetail = personHover
    ? personHover.personId === detail?.person.id
      ? detail
      : personDetails[personHover.personId]
    : undefined;
  return (
    <section className="pane log-pane">
      <div className="log-head">
        <div>
          <div className="pane-label">个人日志</div>
          <h2>{person.name} 已经历的事</h2>
        </div>
        <div className="log-meta-right">
          <div className="log-count">{events.length} 条记录</div>
          <div className="log-order">最新在上 · 向下读旧记录</div>
        </div>
      </div>
      {years.length > 1 && (
        <div className="year-jumps" aria-label="按年份筛选日志">
          <button
            className={yearFilter === null ? 'active' : ''}
            onClick={() => setYearFilter(null)}
          >
            全部
          </button>
          {years.map((year) => (
            <button
              key={year}
              className={yearFilter === year ? 'active' : ''}
              onClick={() => setYearFilter(year)}
            >
              {year}
            </button>
          ))}
        </div>
      )}
      <div className="log-scroll" ref={scroller}>
        {!detail && <p className="muted pad">正在读取已提交的人生记录……</p>}
        {detail && !detail.canReadLog && (
          <div className="log-locked">
            <h3>这是另一个人的人生</h3>
            <p>你可以看到他的公开身份与家庭，但不能读另一位玩家的私人日志。</p>
          </div>
        )}
        {detail && detail.canReadLog && shown.length === 0 && events.length === 0 && (
          <div className="log-empty">
            <h3>{person.died ? '没有留下日志' : '这份人生刚刚开始'}</h3>
            <p>
              {person.died
                ? '这个世界没有为这个人提交可读的个人事件；身份、家庭与死亡信息仍然来自世界状态。'
                : '出生登记和之后每一年的经历都会按提交顺序写在这里。世界时钟继续走，新的年份会带来新的记录。'}
            </p>
          </div>
        )}
        {detail && detail.canReadLog && shown.length === 0 && events.length > 0 && (
          <p className="muted pad">这一年没有留下记录。选择“全部”查看其他年份。</p>
        )}
        {detail?.canReadLog &&
          shown.map((event, index) => {
            const previous = shown[index - 1];
            const newYear = !previous || previous.date.year !== event.date.year;
            return (
              <React.Fragment key={event.id}>
                {newYear && (
                  <div className="year-divider">
                    <span>{event.date.year}</span>
                    <small>
                      {event.date.year - person.born.year} 岁 ·{' '}
                      {lifeChapter(event.date.year - person.born.year)}
                    </small>
                  </div>
                )}
                <LogEntry
                  event={event}
                  selectedId={person.id}
                  ownerIds={ownerIds}
                  onSelectPerson={selectPerson}
                  onPersonHover={showPerson}
                  onPersonLeave={() => setPersonHover(null)}
                  onProcessHover={showProcess}
                  onProcessLeave={() => setProcessHover(null)}
                  onOpenProcess={onOpenProcess}
                  onOpenEvent={openEvent}
                />
              </React.Fragment>
            );
          })}
        {detail?.canReadLog &&
          !person.died &&
          events.length === 1 &&
          events[0]?.action === 'birth' && (
            <p className="log-awaiting">出生已经记录。接下来的年份会在这里加入新的经历。</p>
          )}
      </div>
      <div className="log-foot">
        <span>
          {person.name} ·{' '}
          {person.died
            ? `一生已结束 · ${lifeSpanText(person)}`
            : `仍在生活 · ${displayAge(person, world.date)} 岁`}
        </span>
        <span>{world.date.year} 年 · 历史仍在推进</span>
      </div>
      {personHover && (
        <PersonDossierCard hover={personHover} detail={hoveredDetail} selectedDetail={detail} />
      )}
      {processHover && <ProcessHoverCard hover={processHover} />}
      {eventModal && (
        <EventDossierModal
          state={eventModal}
          selectedId={person.id}
          ownerIds={ownerIds}
          events={events}
          onClose={() => {
            eventRequest.current += 1;
            setEventModal(null);
          }}
          onSelectPerson={selectPerson}
          onOpenEvent={openEvent}
          onOpenProcess={(id, fallback) => {
            eventRequest.current += 1;
            setEventModal(null);
            onOpenProcess(id, fallback);
          }}
        />
      )}
    </section>
  );
}

const actionTitleFallback: Record<string, string> = {
  birth: '出生',
  death: '死亡',
  statistical_death: '离世',
  statistical_infection: '染病',
  statistical_recovery: '康复',
  statistical_illness_worsened: '病情加重',
  interaction_response: '交往',
};

/**
 * Titles come from the API and may be absent, or may leak a raw action ID or
 * an internal enum. Players only ever see prose, so unknown tokens fall back to
 * a neutral label instead of the action name.
 */
function readableLogTitle(event: LogEvent): string {
  const fallback = actionTitleFallback[event.action] ?? '生活记录';
  const title = typeof event.title === 'string' ? event.title.trim() : '';
  if (!title) return fallback;
  if (/^(none|null|undefined|nan)$/i.test(title)) return fallback;
  if (title === event.action) return fallback;
  if (/^[A-Za-z][A-Za-z0-9_-]*$/.test(title)) return fallback;
  return title;
}

function readableLogText(event: LogEvent): string {
  const text = typeof event.immediateText === 'string' ? event.immediateText.trim() : '';
  if (!text || /^(none|null|undefined|nan)$/i.test(text)) return '这件事实没有留下文字记录。';
  return text;
}

function SemanticText({
  event,
  selectedId,
  ownerIds,
  onSelectPerson,
  onPersonHover,
  onPersonLeave,
}: {
  event: LogEvent;
  selectedId?: string | null;
  ownerIds?: Set<string>;
  onSelectPerson: (id: string) => void;
  onPersonHover?: (hover: PersonHover) => void;
  onPersonLeave?: () => void;
}) {
  const segments: LogSegment[] = event.segments?.length
    ? event.segments
    : [{ type: 'text', text: readableLogText(event) }];
  return (
    <>
      {segments.map((segment, index) => {
        if (segment.type !== 'person' || !segment.personId) {
          return <React.Fragment key={`text-${index}`}>{segment.text}</React.Fragment>;
        }
        const personId = segment.personId;
        const classes = ['semantic-person'];
        if (segment.historical) classes.push('historical');
        if (ownerIds?.has(personId)) classes.push('owner');
        if (selectedId === personId) classes.push('selected');
        const show = (element: HTMLElement) =>
          onPersonHover?.({
            personId,
            name: segment.name,
            role: segment.role,
            historical: segment.historical,
            rect: element.getBoundingClientRect(),
          });
        return (
          <button
            key={`person-${index}-${personId}`}
            type="button"
            className={classes.join(' ')}
            data-person-id={personId}
            aria-label={`查看 ${segment.name ?? segment.text}`}
            onMouseEnter={(mouseEvent) => show(mouseEvent.currentTarget)}
            onMouseLeave={onPersonLeave}
            onFocus={(focusEvent) => show(focusEvent.currentTarget)}
            onBlur={onPersonLeave}
            onClick={() => onSelectPerson(personId)}
          >
            {segment.text}
          </button>
        );
      })}
    </>
  );
}

function LogEntry({
  event,
  selectedId,
  ownerIds,
  onSelectPerson,
  onPersonHover,
  onPersonLeave,
  onProcessHover,
  onProcessLeave,
  onOpenProcess,
  onOpenEvent,
}: {
  event: LogEvent;
  selectedId: string;
  ownerIds: Set<string>;
  onSelectPerson: (id: string) => void;
  onPersonHover: (hover: PersonHover) => void;
  onPersonLeave: () => void;
  onProcessHover: (process: ProcessRef, rect: DOMRect) => void;
  onProcessLeave: () => void;
  onOpenProcess: (id: string, fallback?: ProcessRef) => void;
  onOpenEvent: (id: string) => void;
}) {
  const title = readableLogTitle(event);
  const isDeath = event.action === 'death' || event.action === 'statistical_death';
  const people = event.people ?? [];
  const processRefs = event.processRefs ?? [];
  const historicalIds = new Set(
    (event.segments ?? [])
      .filter((segment) => segment.type === 'person' && segment.historical && segment.personId)
      .map((segment) => segment.personId!),
  );
  const classes = ['log-entry'];
  if (isDeath) classes.push('death');
  if (event.major) classes.push('major');
  if (event.kind === 'history') classes.push('history');
  return (
    <article
      className={classes.join(' ')}
      data-trace={event.trace ? 'true' : 'false'}
      data-visibility={event.visibility ?? 'participants'}
    >
      <div className="log-meta">
        <time>{shortDate(event.date)}</time>
        <button
          type="button"
          className="log-title log-title-button"
          data-event-id={event.id}
          aria-label={`打开事件档案：${title}`}
          onClick={() => onOpenEvent(event.id)}
        >
          {title}
        </button>
        {event.major && <span className="log-badge major-badge">重大</span>}
        {event.kind === 'history' && <span className="log-badge history-badge">历史</span>}
      </div>
      <p className="log-text">
        <SemanticText
          event={event}
          selectedId={selectedId}
          ownerIds={ownerIds}
          onSelectPerson={onSelectPerson}
          onPersonHover={onPersonHover}
          onPersonLeave={onPersonLeave}
        />
      </p>
      {(event.placeName || people.length > 0) && (
        <div className="log-where">
          {event.placeName && <span>{event.placeName}</span>}
          {people.length > 0 && (
            <span className="log-cast">
              在场：
              {people.map((participant, index) => {
                const classes = ['log-person-chip'];
                if (historicalIds.has(participant.id)) classes.push('historical');
                if (ownerIds.has(participant.id)) classes.push('owner');
                if (selectedId === participant.id) classes.push('selected');
                return (
                  <React.Fragment key={`${participant.id}-${index}`}>
                    {index > 0 && '、'}
                    <button
                      type="button"
                      className={classes.join(' ')}
                      data-person-id={participant.id}
                      aria-label={`查看 ${participant.name}`}
                      onMouseEnter={(mouseEvent) =>
                        onPersonHover({
                          personId: participant.id,
                          name: participant.name,
                          role: participant.role,
                          historical: historicalIds.has(participant.id),
                          rect: mouseEvent.currentTarget.getBoundingClientRect(),
                        })
                      }
                      onMouseLeave={onPersonLeave}
                      onFocus={(focusEvent) =>
                        onPersonHover({
                          personId: participant.id,
                          name: participant.name,
                          role: participant.role,
                          historical: historicalIds.has(participant.id),
                          rect: focusEvent.currentTarget.getBoundingClientRect(),
                        })
                      }
                      onBlur={onPersonLeave}
                      onClick={() => onSelectPerson(participant.id)}
                    >
                      {participant.name}
                    </button>
                  </React.Fragment>
                );
              })}
            </span>
          )}
        </div>
      )}
      {processRefs.length > 0 && (
        <div className="log-processes" aria-label="这件事涉及的历史进程">
          <span className="log-process-label">历史进程</span>
          {processRefs.map((ref) => (
            <button
              key={ref.id}
              type="button"
              className="process-chip"
              data-process-id={ref.id}
              aria-label={`打开历史进程：${ref.name}`}
              title={ref.description}
              onMouseEnter={(mouseEvent) =>
                onProcessHover(ref, mouseEvent.currentTarget.getBoundingClientRect())
              }
              onMouseLeave={onProcessLeave}
              onFocus={(focusEvent) =>
                onProcessHover(ref, focusEvent.currentTarget.getBoundingClientRect())
              }
              onBlur={onProcessLeave}
              onClick={() => {
                onProcessLeave();
                onOpenProcess(ref.id, ref);
              }}
            >
              <span>{ref.name}</span>
              {ref.phase && <small>{historicalPhaseLabel(ref.phase)}</small>}
            </button>
          ))}
        </div>
      )}
    </article>
  );
}

function PersonDossierCard({
  hover,
  detail,
  selectedDetail,
}: {
  hover: PersonHover;
  detail?: PersonDetail;
  selectedDetail: PersonDetail | null;
}) {
  const person = detail?.person;
  const name = person?.name ?? hover.name ?? '无名';
  const relation = selectedDetail?.relationships.find((item) => item.personId === hover.personId);
  const isSelected = selectedDetail?.person.id === hover.personId;
  const participation = detail?.historicalProcesses?.[0];
  const goal = person?.agency?.summary?.trim() || person?.agency?.goal?.trim();
  return (
    <div
      className="dossier-popover person-dossier"
      style={popoverPosition(hover.rect, 292, 280)}
      role="tooltip"
      aria-label={`人物小档案：${name}`}
    >
      <div className="dossier-head">
        <strong>{name}</strong>
        {person?.historical && <span className="dossier-tag historical">历史人物</span>}
        {person?.owner && <span className="dossier-tag owner">你的人物</span>}
      </div>
      {person ? (
        <>
          <div className="dossier-meta">
            {lifeSpanText(person)} · {person.died ? `享年 ${person.age} 岁` : `${person.age} 岁`} ·{' '}
            {sexText(person.sex)}
          </div>
          <div className="dossier-line">
            <span>身份</span>
            <strong>{person.occupation}</strong>
          </div>
          <div className="dossier-line">
            <span>住处</span>
            <strong>{person.locationName ?? detail?.place?.name ?? '维也纳'}</strong>
          </div>
          {isSelected ? (
            <div className="dossier-line">
              <span>关系</span>
              <strong>当前观察的人物</strong>
            </div>
          ) : (
            relation && (
              <div className="dossier-line">
                <span>与 {selectedDetail?.person.name ?? '当前人物'}</span>
                <strong>
                  {relationText[relation.kind] ?? relation.kind} · 信任{' '}
                  {relationScoreText(relation.trust)}
                </strong>
              </div>
            )
          )}
          {person.historical?.publicRole && (
            <div className="dossier-line">
              <span>历史身份</span>
              <strong>{person.historical.publicRole}</strong>
            </div>
          )}
          {goal && (
            <div className="dossier-line">
              <span>当前目标</span>
              <strong>{goal}</strong>
            </div>
          )}
          {participation && (
            <div className="dossier-line">
              <span>重要参与</span>
              <strong>
                {shortProcessName(participation.description)} ·{' '}
                {historicalPhaseLabel(participation.phase)}
              </strong>
            </div>
          )}
        </>
      ) : (
        <div className="dossier-loading">
          {hover.role
            ? `在这场事件中：${readableParticipantRole(hover.role) ?? '在场'}`
            : '正在读取人物档案……'}
        </div>
      )}
      <div className="dossier-hint">点击人物切换观察 · 档案来自已提交状态</div>
    </div>
  );
}

function ProcessHoverCard({ hover }: { hover: ProcessHover }) {
  const description = hover.process.description?.trim();
  return (
    <div
      className="dossier-popover process-dossier"
      style={popoverPosition(hover.rect, 300, 220)}
      role="tooltip"
      aria-label={`历史进程：${hover.process.name}`}
    >
      <div className="dossier-head">
        <strong>{hover.process.name}</strong>
        {hover.process.phase && (
          <span className="phase-pill">{historicalPhaseLabel(hover.process.phase)}</span>
        )}
      </div>
      {description && (
        <p className="dossier-copy">
          {description.length > 220 ? `${description.slice(0, 220)}…` : description}
        </p>
      )}
      <div className="dossier-hint">点击查看进程档案</div>
    </div>
  );
}

function EventDossierModal({
  state,
  selectedId,
  ownerIds,
  events,
  onClose,
  onSelectPerson,
  onOpenEvent,
  onOpenProcess,
}: {
  state: { id: string; loading: boolean; event?: LogEvent; error?: string };
  selectedId: string;
  ownerIds: Set<string>;
  events: LogEvent[];
  onClose: () => void;
  onSelectPerson: (id: string) => void;
  onOpenEvent: (id: string) => void;
  onOpenProcess: (id: string, fallback?: ProcessRef) => void;
}) {
  useEffect(() => {
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const event = state.event;
  const title = event ? readableLogTitle(event) : '事件档案';
  const significance =
    event && Number.isFinite(event.significance)
      ? Math.round(Math.max(0, Math.min(1, event.significance)) * 100)
      : 0;
  const people = event?.people ?? [];
  const processRefs = event?.processRefs ?? [];
  const causeIds = [...new Set([...(event?.causes ?? []), ...(event?.historyRefs ?? [])])];
  const causeEvents = causeIds
    .map((id) => events.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is LogEvent => Boolean(candidate))
    .sort((a, b) => a.date.year * 12 + a.date.month - (b.date.year * 12 + b.date.month));
  return (
    <div
      className="modal-overlay"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card event-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`事件档案：${title}`}
        data-event-id={state.id}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="关闭事件档案"
          onClick={onClose}
          autoFocus
        >
          ×
        </button>
        {state.loading && <p className="muted">正在读取这件已提交的事实……</p>}
        {state.error && <p className="modal-error">{state.error}</p>}
        {event && (
          <>
            <div className="modal-kicker">事件档案 · {eventKindText[event.kind] ?? '事件'}</div>
            <h2>{title}</h2>
            <div className="modal-meta">
              <span>{dateText(event.date)}</span>
              {event.placeName && <span>{event.placeName}</span>}
              <span>显著度 {significance}%</span>
            </div>
            <div className="modal-badges">
              {event.major && <span className="log-badge major-badge">重大事件</span>}
              {event.kind === 'history' && (
                <span className="log-badge history-badge">历史参与</span>
              )}
            </div>
            <p className="modal-text">
              <SemanticText
                event={event}
                selectedId={selectedId}
                ownerIds={ownerIds}
                onSelectPerson={onSelectPerson}
              />
            </p>
            {causeEvents.length > 0 && (
              <section className="modal-section prior-events">
                <h3>前因</h3>
                <div className="prior-event-list">
                  {causeEvents.map((cause) => (
                    <button
                      key={cause.id}
                      type="button"
                      className="prior-event"
                      onClick={() => onOpenEvent(cause.id)}
                    >
                      <span className="prior-event-date">
                        {cause.date.year}.{String(cause.date.month).padStart(2, '0')}
                      </span>
                      <span className="prior-event-title">{readableLogTitle(cause)}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {event.trace && (
              <section className="modal-section incident-trace">
                <h3>因果链</h3>
                {(event.trace.motive || event.trace.conflict || event.trace.response) && (
                  <dl className="trace-grid">
                    {event.trace.motive && (
                      <>
                        <dt>动机</dt>
                        <dd>{event.trace.motive}</dd>
                      </>
                    )}
                    {event.trace.conflict && (
                      <>
                        <dt>冲突</dt>
                        <dd>{event.trace.conflict}</dd>
                      </>
                    )}
                    {event.trace.response && (
                      <>
                        <dt>回应</dt>
                        <dd>{event.trace.response}</dd>
                      </>
                    )}
                  </dl>
                )}
                {event.trace.effects.length > 0 && (
                  <ul className="modal-list trace-effects">
                    {event.trace.effects.slice(0, 8).map((effect, index) => (
                      <li key={`${effect.type}-${index}`}>{effect.description}</li>
                    ))}
                  </ul>
                )}
                <p className="trace-mechanism">
                  {event.trace.mechanism.kernelId
                    ? `机制：${event.trace.mechanism.kernelId} / ${event.trace.mechanism.contextId} / ${event.trace.mechanism.milieuId}`
                    : `机制：${event.trace.mechanism.sceneId}`}
                </p>
              </section>
            )}
            {people.length > 0 && (
              <section className="modal-section">
                <h3>在场人物</h3>
                <div className="participant-chips">
                  {people.map((participant, index) => (
                    <button
                      key={`${participant.id}-${index}`}
                      type="button"
                      className="participant-chip"
                      data-person-id={participant.id}
                      aria-label={`查看 ${participant.name}`}
                      onClick={() => onSelectPerson(participant.id)}
                    >
                      <span>{participant.name}</span>
                      <small>{readableParticipantRole(participant.role)}</small>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {processRefs.length > 0 && (
              <section className="modal-section">
                <h3>相关历史进程</h3>
                <div className="process-links">
                  {processRefs.map((ref) => (
                    <button
                      key={ref.id}
                      type="button"
                      className="process-chip"
                      data-process-id={ref.id}
                      aria-label={`打开历史进程：${ref.name}`}
                      onClick={() => onOpenProcess(ref.id, ref)}
                    >
                      <span>{ref.name}</span>
                      {ref.phase && <small>{historicalPhaseLabel(ref.phase)}</small>}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProcessDossierModal({
  processId,
  fallback,
  world,
  detail,
  onClose,
  onSelectPerson,
}: {
  processId: string;
  fallback?: ProcessRef;
  world: World;
  detail: PersonDetail | null;
  onClose: () => void;
  onSelectPerson: (id: string) => void;
}) {
  useEffect(() => {
    const onKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const development = (world.macro?.developments ?? []).find((item) => item.id === processId);
  const participation = detail?.historicalProcesses?.find((item) => item.id === processId);
  const derivedRef = development
    ? processRefFromDevelopment(development)
    : participation
      ? processRefFromParticipation(participation)
      : undefined;
  const name = fallback?.name ?? derivedRef?.name ?? '历史进程';
  const description =
    development?.description ?? fallback?.description ?? participation?.description;
  const phase = development?.historical?.phase ?? fallback?.phase ?? participation?.phase;
  const outcome = development?.historical?.outcome ?? participation?.outcome;
  const objectives = development?.historical?.objectives ?? [];
  const recentHistory = development?.historical?.recentHistory ?? [];
  const participantCount = development?.historical?.participantCount;
  const organizationRoles = development?.historical?.organizations ?? [];
  return (
    <div
      className="modal-overlay process-overlay"
      onMouseDown={(mouseEvent) => {
        if (mouseEvent.target === mouseEvent.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card process-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`历史进程：${name}`}
        data-process-id={processId}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="关闭进程档案"
          onClick={onClose}
          autoFocus
        >
          ×
        </button>
        <div className="modal-kicker">
          历史进程 · {development ? (developmentStatusText[development.status] ?? '记录') : '记录'}
        </div>
        <h2>{name}</h2>
        <div className="modal-meta">
          {phase && <span className="phase-pill">{historicalPhaseLabel(phase)}</span>}
          {participantCount !== undefined && <span>{participantCount} 人参与</span>}
          {organizationRoles.length > 0 && <span>{organizationRoles.length} 个组织卷入</span>}
        </div>
        {description && <p className="modal-text">{description}</p>}
        {objectives.length > 0 && (
          <section className="modal-section">
            <h3>目标</h3>
            <ul className="modal-list">
              {objectives.map((objective, index) => (
                <li key={`${processId}-objective-${index}`}>{objective}</li>
              ))}
            </ul>
          </section>
        )}
        {participation && detail && (
          <section className="modal-section">
            <h3>当前人物的参与</h3>
            <div className="participant-chips">
              <button
                type="button"
                className="participant-chip"
                data-person-id={detail.person.id}
                onClick={() => {
                  onSelectPerson(detail.person.id);
                  onClose();
                }}
              >
                <span>{detail.person.name}</span>
                <small>
                  {participation.roles.map(historicalRoleLabel).join('、')} · 影响{' '}
                  {influencePercent(participation.influence)}%
                </small>
              </button>
            </div>
            <div className="modal-fineprint">
              加入于 {dateText(participation.joinedAt)}
              {participation.lastEventId ? ` · 最近事件 ${participation.lastEventId}` : ''}
            </div>
          </section>
        )}
        {outcome && (
          <section className="modal-section">
            <h3>结果</h3>
            <p className="modal-text">{outcome}</p>
          </section>
        )}
        {recentHistory.length > 0 && (
          <section className="modal-section">
            <h3>近期记录</h3>
            <ul className="modal-list process-history">
              {recentHistory.map((entry, index) => (
                <li key={`${processId}-history-${index}`}>
                  <span>{dateText(entry.date)}</span>
                  <strong>{historicalPhaseLabel(entry.phase)}</strong>
                  <p>{entry.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {!description && !participation && (
          <p className="muted">这个世界没有留下该进程的公开记录。</p>
        )}
      </div>
    </div>
  );
}

const PLACE_POINTS: Record<string, { x: number; y: number; major?: boolean }> = {
  'place-wien-leopoldstadt-bauer-flat': { x: 238, y: 152, major: true },
  'place-wien-leopoldstadt-huber-flat': { x: 248, y: 162 },
  'place-wien-leopoldstadt-moser-flat': { x: 242, y: 170 },
  'place-wien-leopoldstadt-tenement': { x: 232, y: 160 },
  'place-wien-leopoldstadt-lechner-flat': { x: 254, y: 148 },
  'place-wien-leopoldstadt-kral-flat': { x: 230, y: 168 },
  'place-wien-leopoldstadt-hofer-flat': { x: 258, y: 166 },
  'place-wien-innere-stadt-winter-flat': { x: 184, y: 138 },
  'place-wien-josefstadt-stein-flat': { x: 132, y: 124 },
  'place-wien-josefstadt-berg-flat': { x: 124, y: 114 },
  'place-wien-algergrund-weiss-flat': { x: 144, y: 92 },
  'place-klosterneuburg-aunt-house': { x: 34, y: 34, major: true },
  'place-wien-printshop-winter': { x: 214, y: 128, major: true },
  'place-wien-volksschule-leopoldstadt': { x: 246, y: 140, major: true },
  'place-wien-maedchenlyzeum': { x: 200, y: 164, major: true },
  'place-wien-printers-union-hall': { x: 190, y: 154, major: true },
  'place-wien-allgemeines-krankenhaus': { x: 150, y: 76, major: true },
  'place-wien-magistrat': { x: 248, y: 174, major: true },
  'place-wien-markthalle': { x: 222, y: 182, major: true },
  'place-wien-landwehr-barracks': { x: 286, y: 104, major: true },
  'place-wien-orphanage': { x: 266, y: 178, major: true },
};
const HIDDEN_MAP_PLACES = new Set(['place-wien', 'place-klosterneuburg']);

type ActiveHistoricalDevelopment = WorldHistoricalDevelopment & {
  historical: NonNullable<WorldHistoricalDevelopment['historical']>;
};

function isActiveHistoricalDevelopment(
  development: WorldHistoricalDevelopment,
): development is ActiveHistoricalDevelopment {
  return development.status === 'active' && Boolean(development.historical);
}

function WorldPane({
  world,
  activePlace,
  setActivePlace,
  selectedId,
  onSelect,
}: {
  world: World;
  activePlace: string | null;
  setActivePlace: (id: string | null) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [showAllChronicle, setShowAllChronicle] = useState(false);
  const here = activePlace
    ? world.people.filter((person) => !person.died && person.locationId === activePlace)
    : [];
  const visibleChronicle = world.chronicle
    .slice()
    .sort((a, b) => b.date.year - a.date.year || b.date.month - a.date.month)
    .slice(0, showAllChronicle ? 20 : 5);
  const placeById = useMemo(
    () => Object.fromEntries(world.places.map((place) => [place.id, place])),
    [world.places],
  );
  const activeDevelopments = (world.macro?.developments ?? [])
    .filter(isActiveHistoricalDevelopment)
    .slice(0, 4);
  const activeLegacy = (world.macro?.legacy ?? []).slice(0, 4);
  return (
    <aside className="pane world-pane">
      <div className="pane-label">维也纳 · 世界</div>
      <div className="map-frame">
        <ViennaMap
          people={world.people}
          selectedId={selectedId}
          activePlace={activePlace}
          onPlace={setActivePlace}
        />
        <div className="map-caption">
          {placeById[activePlace ?? '']?.name ??
            (world.peopleTotal !== undefined && world.peopleTotal > world.people.length
              ? `已载入 ${world.people.length} / ${world.peopleTotal} 人 · 点击地点查看在场的人`
              : '利奥波德城与内城 · 点击地点查看在场的人')}
        </div>
      </div>
      {activePlace && (
        <div className="place-people">
          <div className="place-people-head">
            <h3>{placeById[activePlace]?.name}</h3>
            <button className="link-button" onClick={() => setActivePlace(null)}>
              收起
            </button>
          </div>
          {here.length === 0 && <p className="muted">此刻没有具名人物在这里。</p>}
          {here.map((person) => (
            <button key={person.id} className="place-person" onClick={() => onSelect(person.id)}>
              <span>{person.name}</span>
              <small>
                {person.died
                  ? `已故 · 享年 ${displayAge(person, world.date)} 岁`
                  : `${displayAge(person, world.date)} 岁 · ${person.occupation}`}
              </small>
            </button>
          ))}
        </div>
      )}
      <section className="chronicle">
        <div className="section-head">
          <h3>时代</h3>
          <span>{world.chronicle.length} 条背景</span>
        </div>
        {visibleChronicle.map((entry) => (
          <article key={entry.id} className="chronicle-entry">
            <div className="chronicle-date">
              {monthNames[entry.date.month - 1]} {entry.date.year}
            </div>
            <h4>{entry.title}</h4>
            <p>{entry.text}</p>
          </article>
        ))}
        {world.chronicle.length > 5 && (
          <button className="link-button" onClick={() => setShowAllChronicle(!showAllChronicle)}>
            {showAllChronicle ? '只显示最近' : '展开更早的时代记录'}
          </button>
        )}
      </section>
      {activeLegacy.length > 0 && (
        <section className="historical-legacy">
          <div className="section-head">
            <h3>历史遗产</h3>
            <span>{activeLegacy.length} 项仍在使用</span>
          </div>
          {activeLegacy.map((legacy) => (
            <article key={legacy.id} className="historical-legacy-card">
              <strong>{legacy.title}</strong>
              <p>{legacy.description}</p>
              <small>{legacy.tags.slice(0, 3).join(' · ')}</small>
            </article>
          ))}
        </section>
      )}
      {activeDevelopments.length > 0 && (
        <section className="historical-processes">
          <div className="section-head">
            <h3>历史进程</h3>
            <span>{activeDevelopments.length} 项进行中</span>
          </div>
          {activeDevelopments.map((development) => {
            const objectives = (development.historical.objectives ?? []).slice(0, 2);
            return (
              <article key={development.id} className="historical-process">
                <div className="historical-process-head">
                  <span className="phase-pill">
                    {historicalPhaseLabel(development.historical.phase)}
                  </span>
                  <span className="participant-count">
                    {development.historical.participantCount} 人参与
                  </span>
                </div>
                <p>{development.description}</p>
                {objectives.length > 0 && (
                  <ul className="historical-objectives">
                    {objectives.map((objective, index) => (
                      <li key={`${development.id}-objective-${index}`}>{objective}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </section>
      )}
      <section className="public-events">
        <div className="section-head">
          <h3>公开事件</h3>
          <span>全世界可见</span>
        </div>
        {world.recentEvents.length === 0 && (
          <p className="muted">还没有被世界公开记录的事件。家庭内部的事写在各自的人生里。</p>
        )}
        {world.recentEvents.slice(0, 5).map((event) => (
          <div key={event.id} className="public-event">
            <span>{shortDate(event.date)}</span>
            <p>{event.immediateText}</p>
          </div>
        ))}
      </section>
      <div className="source-note">
        时代记录是内容包中的历史基线，不是模拟器凭空生成的个人事件。
      </div>
    </aside>
  );
}

function ViennaMap({
  people,
  selectedId,
  activePlace,
  onPlace,
}: {
  people: PersonSummary[];
  selectedId: string | null;
  activePlace: string | null;
  onPlace: (id: string) => void;
}) {
  const byPlace = useMemo(() => {
    const map = new Map<string, PersonSummary[]>();
    for (const person of people) {
      if (person.died) continue;
      const list = map.get(person.locationId) ?? [];
      list.push(person);
      map.set(person.locationId, list);
    }
    return map;
  }, [people]);
  return (
    <svg viewBox="0 0 340 230" className="vienna-map" role="img" aria-label="维也纳示意地图">
      <defs>
        <linearGradient id="paperMap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a211d" />
          <stop offset="100%" stopColor="#121714" />
        </linearGradient>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0" stroke="#2a342d" strokeWidth="0.5" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="340" height="230" fill="url(#paperMap)" />
      <rect width="340" height="230" fill="url(#hatch)" opacity="0.5" />
      <path
        d="M0 38 C 60 18, 118 52, 178 40 S 290 18, 340 36 L340 66 C 286 82, 225 66, 166 80 S 55 92, 0 72 Z"
        fill="#1b3034"
      />
      <text x="12" y="30" className="map-water">
        多瑙河
      </text>
      <path
        d="M178 30 C 186 48, 182 56, 190 70 L228 70 C 222 54, 228 44, 236 32"
        fill="none"
        stroke="#1b3034"
        strokeWidth="8"
      />
      <path
        d="M118 78 C 98 106, 100 156, 154 180 C 196 198, 254 190, 276 160 C 296 132, 282 96, 238 82 C 200 70, 146 62, 118 78 Z"
        fill="none"
        stroke="#3a4439"
        strokeWidth="1.4"
        strokeDasharray="3 3"
      />
      <text x="172" y="118" className="map-district">
        内城
      </text>
      <text x="238" y="198" className="map-district">
        利奥波德城
      </text>
      <text x="96" y="146" className="map-district">
        约瑟夫城
      </text>
      <text x="126" y="66" className="map-district">
        阿尔泽格伦德
      </text>
      <text x="18" y="20" className="map-district">
        克洛斯特新堡
      </text>
      <text x="286" y="78" className="map-district">
        兵营
      </text>
      {Object.entries(PLACE_POINTS).map(([id, point]) => {
        const list = byPlace.get(id) ?? [];
        const selected = list.some((person) => person.id === selectedId);
        const active = activePlace === id;
        return (
          <g
            key={id}
            className={`map-pin ${active ? 'active' : ''} ${selected ? 'selected' : ''}`}
            transform={`translate(${point.x} ${point.y})`}
            onClick={() => onPlace(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onPlace(id);
            }}
          >
            <title>{list.map((person) => person.name).join('、') || '地点'}</title>
            <circle r={point.major ? 4 : 2.6} />
            {selected && <circle className="pin-ring" r={point.major ? 8 : 6} />}
            {list.length > 0 && point.major && (
              <text x="7" y="3" className="pin-count">
                {list.length}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
