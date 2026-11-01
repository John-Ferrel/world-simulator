import '@fontsource/noto-sans-sc/400.css';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import PaperDoll, { CompactDollEditor } from './PaperDoll';
import './style.css';

type Date4 = { year: number; month: number };
type Appearance = { skin: number; hair: number; clothes: number; doll?: Record<string, unknown> };
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
type LogEvent = {
  id: string;
  date: Date4;
  action: string;
  title?: string;
  immediateText: string;
  placeName?: string;
  people: { id: string; name: string; role: string }[];
  significance: number;
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
          onLoadMorePeople={onLoadMorePeople}
          loadingMorePeople={loadingMorePeople}
        />
        <LogPane world={world} person={person} detail={detail} />
        <WorldPane
          world={world}
          activePlace={activePlace}
          setActivePlace={setActivePlace}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </main>
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
  onLoadMorePeople,
  loadingMorePeople,
}: {
  world: World;
  person: PersonSummary | null;
  detail: PersonDetail | null;
  onSelect: (id: string) => void;
  onShowPlace: (id: string) => void;
  onLoadMorePeople: () => void;
  loadingMorePeople: boolean;
}) {
  if (!person)
    return (
      <aside className="pane person-pane">
        <p className="muted">还没有可观察的人物。</p>
      </aside>
    );
  const household = detail?.household;
  const years = person.died
    ? `${person.born.year} — ${person.died.year}`
    : `${person.born.year} — `;
  return (
    <aside className="pane person-pane">
      <div className="pane-label">人物</div>
      <div className={`portrait ${person.died ? 'dead' : ''}`}>
        <PaperDoll person={person} direction={2} motion />
        <div className="portrait-years">{years}</div>
        {person.died && <div className="death-stamp">卒</div>}
      </div>
      <div className="person-heading">
        <h2>{person.name}</h2>
        <div className="person-sub">
          {sexText(person.sex)} ·{' '}
          {person.died ? `享年 ${person.died.year - person.born.year} 岁` : `${person.age} 岁`}
          {person.owner && <span className="own-badge">你的人物</span>}
        </div>
      </div>
      <div className="person-facts">
        <Fact label="身份" value={person.occupation} />
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
        {person.died && <Fact label="死因" value={person.deathCause ?? '没有记录'} />}
      </div>
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
      {household && (
        <section className="side-section">
          <h3>家庭</h3>
          <div className="member-list">
            {household.members.map((member) => (
              <button
                key={member.id}
                className={`member ${member.id === person.id ? 'current' : ''} ${member.died ? 'gone' : ''}`}
                onClick={() => onSelect(member.id)}
              >
                <span>{member.name}</span>
                <small>
                  {member.relation} · {member.died ? '已故' : `${member.age} 岁`}
                  {member.occupation ? ` · ${member.occupation}` : ''}
                </small>
              </button>
            ))}
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
      <div className="person-switch">
        <label>
          观察另一个人
          <select value={person.id} onChange={(event) => onSelect(event.target.value)}>
            {world.people
              .slice()
              .sort((a, b) => Number(a.died) - Number(b.died) || b.age - a.age)
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}（{item.died ? '已故' : `${item.age} 岁`}）
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
}: {
  world: World;
  person: PersonSummary | null;
  detail: PersonDetail | null;
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
  const shown = yearFilter ? events.filter((event) => event.date.year === yearFilter) : events;
  useEffect(() => {
    setYearFilter(null);
  }, [person?.id]);
  useEffect(() => {
    const node = scroller.current;
    if (node) node.scrollTop = 0;
  }, [person?.id, events.length]);

  if (!person) return <section className="pane log-pane" />;
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
        <div className="year-jumps">
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
        {!detail && <p className="muted pad">正在读日志……</p>}
        {detail && !detail.canReadLog && (
          <div className="log-locked">
            <h3>这是另一个人的人生</h3>
            <p>你可以看到他的公开身份与家庭，但不能读另一位玩家的私人日志。</p>
          </div>
        )}
        {detail && detail.canReadLog && shown.length === 0 && (
          <p className="muted pad">还没有已经发生的事情。下一年会带来新的场景。</p>
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
                  </div>
                )}
                <LogEntry event={event} />
              </React.Fragment>
            );
          })}
      </div>
      <div className="log-foot">
        <span>
          {person.name} · {person.died ? '一生已结束' : '仍在生活'}
        </span>
        <span>{world.date.year} 年 · 历史仍在推进</span>
      </div>
    </section>
  );
}

function LogEntry({ event }: { event: LogEvent }) {
  const title =
    event.title ?? (event.action === 'death' ? '死亡' : event.action === 'birth' ? '出生' : null);
  return (
    <article className={`log-entry ${event.action === 'death' ? 'death' : ''}`}>
      <div className="log-meta">
        <time>{shortDate(event.date)}</time>
        {title && <span className="log-title">{title}</span>}
        {!title && <span className="log-title subtle">已记录</span>}
      </div>
      <p>{event.immediateText || '这件事实没有留下文字记录。'}</p>
      {(event.placeName || event.people.length > 0) && (
        <div className="log-where">
          {event.placeName && <span>{event.placeName}</span>}
          {event.people.length > 0 && (
            <span>
              在场：
              {event.people.map((participant) => participant.name).join('、')}
            </span>
          )}
        </div>
      )}
    </article>
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
              <small>{person.died ? '已故' : `${person.age} 岁 · ${person.occupation}`}</small>
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
