'use client'

import { useEffect, useMemo, useState } from 'react'

const RADICALS = [
  {
    id: 1,
    radical: '⼀',
    hint: 'One',
  },
  {
    id: 2,
    radical: '⼁',
    hint: 'Line',
  },
  {
    id: 3,
    radical: '⼂',
    hint: 'Dot',
  },
  {
    id: 4,
    radical: '⼃',
    hint: 'Slash',
  },
  {
    id: 5,
    radical: '⼄',
    hint: 'Second',
  },
  {
    id: 6,
    radical: '⼅',
    hint: 'Hook',
  },
  {
    id: 7,
    radical: '⼆',
    hint: 'Two',
  },
  {
    id: 8,
    radical: '⼇',
    hint: 'Lid',
  },
  {
    id: 9,
    radical: '⼈',
    hint: 'Man',
  },
  {
    id: 10,
    radical: '⼉',
    hint: 'Legs',
  },
  {
    id: 11,
    radical: '⼊',
    hint: 'Enter',
  },
  {
    id: 12,
    radical: '⼋',
    hint: 'Eight',
  },
  {
    id: 13,
    radical: '⼌',
    hint: 'Down Box',
  },
  {
    id: 14,
    radical: '⼍',
    hint: 'Cover',
  },
  {
    id: 15,
    radical: '⼎',
    hint: 'Ice',
  },
  {
    id: 16,
    radical: '⼏',
    hint: 'Table',
  },
  {
    id: 17,
    radical: '⼐',
    hint: 'Open Box',
  },
  {
    id: 18,
    radical: '⼑',
    hint: 'Knife',
  },
  {
    id: 19,
    radical: '⼒',
    hint: 'Power',
  },
  {
    id: 20,
    radical: '⼓',
    hint: 'Wrap',
  },
  {
    id: 21,
    radical: '⼔',
    hint: 'Spoon',
  },
  {
    id: 22,
    radical: '⼕',
    hint: 'Right Open Box',
  },
  {
    id: 23,
    radical: '⼖',
    hint: 'Hiding Enclosure',
  },
  {
    id: 24,
    radical: '⼗',
    hint: 'Ten',
  },
  {
    id: 25,
    radical: '⼘',
    hint: 'Divination',
  },
  {
    id: 26,
    radical: '⼙',
    hint: 'Seal',
  },
  {
    id: 27,
    radical: '⼚',
    hint: 'Cliff',
  },
  {
    id: 28,
    radical: '⼛',
    hint: 'Private',
  },
  {
    id: 29,
    radical: '⼜',
    hint: 'Again',
  },
  {
    id: 30,
    radical: '⼝',
    hint: 'Mouth',
  },
  {
    id: 31,
    radical: '⼞',
    hint: 'Enclosure',
  },
  {
    id: 32,
    radical: '⼟',
    hint: 'Earth',
  },
  {
    id: 33,
    radical: '⼠',
    hint: 'Scholar',
  },
  {
    id: 34,
    radical: '⼡',
    hint: 'Go',
  },
  {
    id: 35,
    radical: '⼢',
    hint: 'Go Slowly',
  },
  {
    id: 36,
    radical: '⼣',
    hint: 'Evening',
  },
  {
    id: 37,
    radical: '⼤',
    hint: 'Big',
  },
  {
    id: 38,
    radical: '⼥',
    hint: 'Woman',
  },
  {
    id: 39,
    radical: '⼦',
    hint: 'Child',
  },
  {
    id: 40,
    radical: '⼧',
    hint: 'Roof',
  },
  {
    id: 41,
    radical: '⼨',
    hint: 'Inch',
  },
  {
    id: 42,
    radical: '⼩',
    hint: 'Small',
  },
  {
    id: 43,
    radical: '⼪',
    hint: 'Lame',
  },
  {
    id: 44,
    radical: '⼫',
    hint: 'Corpse',
  },
  {
    id: 45,
    radical: '⼬',
    hint: 'Sprout',
  },
  {
    id: 46,
    radical: '⼭',
    hint: 'Mountain',
  },
  {
    id: 47,
    radical: '⼮',
    hint: 'River',
  },
  {
    id: 48,
    radical: '⼯',
    hint: 'Work',
  },
  {
    id: 49,
    radical: '⼰',
    hint: 'Oneself',
  },
  {
    id: 50,
    radical: '⼱',
    hint: 'Turban',
  },
  {
    id: 51,
    radical: '⼲',
    hint: 'Dry',
  },
  {
    id: 52,
    radical: '⼳',
    hint: 'Short Thread',
  },
  {
    id: 53,
    radical: '⼴',
    hint: 'Dotted Cliff',
  },
  {
    id: 54,
    radical: '⼵',
    hint: 'Long Stride',
  },
  {
    id: 55,
    radical: '⼶',
    hint: 'Two Hands',
  },
  {
    id: 56,
    radical: '⼷',
    hint: 'Shoot',
  },
  {
    id: 57,
    radical: '⼸',
    hint: 'Bow',
  },
  {
    id: 58,
    radical: '⼹',
    hint: 'Snout',
  },
  {
    id: 59,
    radical: '⼺',
    hint: 'Bristle',
  },
  {
    id: 60,
    radical: '⼻',
    hint: 'Step',
  },
  {
    id: 61,
    radical: '⼼',
    hint: 'Heart',
  },
  {
    id: 62,
    radical: '⼽',
    hint: 'Halberd',
  },
  {
    id: 63,
    radical: '⼾',
    hint: 'Door',
  },
  {
    id: 64,
    radical: '⼿',
    hint: 'Hand',
  },
  {
    id: 65,
    radical: '⽀',
    hint: 'Branch',
  },
  {
    id: 66,
    radical: '⽁',
    hint: 'Rap',
  },
  {
    id: 67,
    radical: '⽂',
    hint: 'Script',
  },
  {
    id: 68,
    radical: '⽃',
    hint: 'Dipper',
  },
  {
    id: 69,
    radical: '⽄',
    hint: 'Axe',
  },
  {
    id: 70,
    radical: '⽅',
    hint: 'Square',
  },
  {
    id: 71,
    radical: '⽆',
    hint: 'Not',
  },
  {
    id: 72,
    radical: '⽇',
    hint: 'Sun',
  },
  {
    id: 73,
    radical: '⽈',
    hint: 'Say',
  },
  {
    id: 74,
    radical: '⽉',
    hint: 'Moon',
  },
  {
    id: 75,
    radical: '⽊',
    hint: 'Tree',
  },
  {
    id: 76,
    radical: '⽋',
    hint: 'Lack',
  },
  {
    id: 77,
    radical: '⽌',
    hint: 'Stop',
  },
  {
    id: 78,
    radical: '⽍',
    hint: 'Death',
  },
  {
    id: 79,
    radical: '⽎',
    hint: 'Weapon',
  },
  {
    id: 80,
    radical: '⽏',
    hint: 'Do Not',
  },
  {
    id: 81,
    radical: '⽐',
    hint: 'Compare',
  },
  {
    id: 82,
    radical: '⽑',
    hint: 'Fur',
  },
  {
    id: 83,
    radical: '⽒',
    hint: 'Clan',
  },
  {
    id: 84,
    radical: '⽓',
    hint: 'Steam',
  },
  {
    id: 85,
    radical: '⽔',
    hint: 'Water',
  },
  {
    id: 86,
    radical: '⽕',
    hint: 'Fire',
  },
  {
    id: 87,
    radical: '⽖',
    hint: 'Claw',
  },
  {
    id: 88,
    radical: '⽗',
    hint: 'Father',
  },
  {
    id: 89,
    radical: '⽘',
    hint: 'Double X',
  },
  {
    id: 90,
    radical: '⽙',
    hint: 'Half Tree Trunk',
  },
  {
    id: 91,
    radical: '⽚',
    hint: 'Slice',
  },
  {
    id: 92,
    radical: '⽛',
    hint: 'Fang',
  },
  {
    id: 93,
    radical: '⽜',
    hint: 'Cow',
  },
  {
    id: 94,
    radical: '⽝',
    hint: 'Dog',
  },
  {
    id: 95,
    radical: '⽞',
    hint: 'Profound',
  },
  {
    id: 96,
    radical: '⽟',
    hint: 'Jade',
  },
  {
    id: 97,
    radical: '⽠',
    hint: 'Melon',
  },
  {
    id: 98,
    radical: '⽡',
    hint: 'Tile',
  },
  {
    id: 99,
    radical: '⽢',
    hint: 'Sweet',
  },
  {
    id: 100,
    radical: '⽣',
    hint: 'Life',
  },
  {
    id: 101,
    radical: '⽤',
    hint: 'Use',
  },
  {
    id: 102,
    radical: '⽥',
    hint: 'Field',
  },
  {
    id: 103,
    radical: '⽦',
    hint: 'Bolt Of Cloth',
  },
  {
    id: 104,
    radical: '⽧',
    hint: 'Sickness',
  },
  {
    id: 105,
    radical: '⽨',
    hint: 'Dotted Tent',
  },
  {
    id: 106,
    radical: '⽩',
    hint: 'White',
  },
  {
    id: 107,
    radical: '⽪',
    hint: 'Skin',
  },
  {
    id: 108,
    radical: '⽫',
    hint: 'Dish',
  },
  {
    id: 109,
    radical: '⽬',
    hint: 'Eye',
  },
  {
    id: 110,
    radical: '⽭',
    hint: 'Spear',
  },
  {
    id: 111,
    radical: '⽮',
    hint: 'Arrow',
  },
  {
    id: 112,
    radical: '⽯',
    hint: 'Stone',
  },
  {
    id: 113,
    radical: '⽰',
    hint: 'Spirit',
  },
  {
    id: 114,
    radical: '⽱',
    hint: 'Track',
  },
  {
    id: 115,
    radical: '⽲',
    hint: 'Grain',
  },
  {
    id: 116,
    radical: '⽳',
    hint: 'Cave',
  },
  {
    id: 117,
    radical: '⽴',
    hint: 'Stand',
  },
  {
    id: 118,
    radical: '⽵',
    hint: 'Bamboo',
  },
  {
    id: 119,
    radical: '⽶',
    hint: 'Rice',
  },
  {
    id: 120,
    radical: '⽷',
    hint: 'Silk',
  },
  {
    id: 121,
    radical: '⽸',
    hint: 'Jar',
  },
  {
    id: 122,
    radical: '⽹',
    hint: 'Net',
  },
  {
    id: 123,
    radical: '⽺',
    hint: 'Sheep',
  },
  {
    id: 124,
    radical: '⽻',
    hint: 'Feather',
  },
  {
    id: 125,
    radical: '⽼',
    hint: 'Old',
  },
  {
    id: 126,
    radical: '⽽',
    hint: 'And',
  },
  {
    id: 127,
    radical: '⽾',
    hint: 'Plow',
  },
  {
    id: 128,
    radical: '⽿',
    hint: 'Ear',
  },
  {
    id: 129,
    radical: '⾀',
    hint: 'Brush',
  },
  {
    id: 130,
    radical: '⾁',
    hint: 'Meat',
  },
  {
    id: 131,
    radical: '⾂',
    hint: 'Minister',
  },
  {
    id: 132,
    radical: '⾃',
    hint: 'Self',
  },
  {
    id: 133,
    radical: '⾄',
    hint: 'Arrive',
  },
  {
    id: 134,
    radical: '⾅',
    hint: 'Mortar',
  },
  {
    id: 135,
    radical: '⾆',
    hint: 'Tongue',
  },
  {
    id: 136,
    radical: '⾇',
    hint: 'Oppose',
  },
  {
    id: 137,
    radical: '⾈',
    hint: 'Boat',
  },
  {
    id: 138,
    radical: '⾉',
    hint: 'Stopping',
  },
  {
    id: 139,
    radical: '⾊',
    hint: 'Color',
  },
  {
    id: 140,
    radical: '⾋',
    hint: 'Grass',
  },
  {
    id: 141,
    radical: '⾌',
    hint: 'Tiger',
  },
  {
    id: 142,
    radical: '⾍',
    hint: 'Insect',
  },
  {
    id: 143,
    radical: '⾎',
    hint: 'Blood',
  },
  {
    id: 144,
    radical: '⾏',
    hint: 'Walk Enclosure',
  },
  {
    id: 145,
    radical: '⾐',
    hint: 'Clothes',
  },
  {
    id: 146,
    radical: '⾑',
    hint: 'West',
  },
  {
    id: 147,
    radical: '⾒',
    hint: 'See',
  },
  {
    id: 148,
    radical: '⾓',
    hint: 'Horn',
  },
  {
    id: 149,
    radical: '⾔',
    hint: 'Speech',
  },
  {
    id: 150,
    radical: '⾕',
    hint: 'Valley',
  },
  {
    id: 151,
    radical: '⾖',
    hint: 'Bean',
  },
  {
    id: 152,
    radical: '⾗',
    hint: 'Pig',
  },
  {
    id: 153,
    radical: '⾘',
    hint: 'Badger',
  },
  {
    id: 154,
    radical: '⾙',
    hint: 'Shell',
  },
  {
    id: 155,
    radical: '⾚',
    hint: 'Red',
  },
  {
    id: 156,
    radical: '⾛',
    hint: 'Run',
  },
  {
    id: 157,
    radical: '⾜',
    hint: 'Foot',
  },
  {
    id: 158,
    radical: '⾝',
    hint: 'Body',
  },
  {
    id: 159,
    radical: '⾞',
    hint: 'Cart',
  },
  {
    id: 160,
    radical: '⾟',
    hint: 'Bitter',
  },
  {
    id: 161,
    radical: '⾠',
    hint: 'Morning',
  },
  {
    id: 162,
    radical: '⾡',
    hint: 'Walk',
  },
  {
    id: 163,
    radical: '⾢',
    hint: 'City',
  },
  {
    id: 164,
    radical: '⾣',
    hint: 'Wine',
  },
  {
    id: 165,
    radical: '⾤',
    hint: 'Distinguish',
  },
  {
    id: 166,
    radical: '⾥',
    hint: 'Village',
  },
  {
    id: 167,
    radical: '⾦',
    hint: 'Gold',
  },
  {
    id: 168,
    radical: '⾧',
    hint: 'Long',
  },
  {
    id: 169,
    radical: '⾨',
    hint: 'Gate',
  },
  {
    id: 170,
    radical: '⾩',
    hint: 'Mound',
  },
  {
    id: 171,
    radical: '⾪',
    hint: 'Slave',
  },
  {
    id: 172,
    radical: '⾫',
    hint: 'Short Tailed Bird',
  },
  {
    id: 173,
    radical: '⾬',
    hint: 'Rain',
  },
  {
    id: 174,
    radical: '⾭',
    hint: 'Blue',
  },
  {
    id: 175,
    radical: '⾮',
    hint: 'Wrong',
  },
  {
    id: 176,
    radical: '⾯',
    hint: 'Face',
  },
  {
    id: 177,
    radical: '⾰',
    hint: 'Leather',
  },
  {
    id: 178,
    radical: '⾱',
    hint: 'Tanned Leather',
  },
  {
    id: 179,
    radical: '⾲',
    hint: 'Leek',
  },
  {
    id: 180,
    radical: '⾳',
    hint: 'Sound',
  },
  {
    id: 181,
    radical: '⾴',
    hint: 'Leaf',
  },
  {
    id: 182,
    radical: '⾵',
    hint: 'Wind',
  },
  {
    id: 183,
    radical: '⾶',
    hint: 'Fly',
  },
  {
    id: 184,
    radical: '⾷',
    hint: 'Eat',
  },
  {
    id: 185,
    radical: '⾸',
    hint: 'Head',
  },
  {
    id: 186,
    radical: '⾹',
    hint: 'Fragrant',
  },
  {
    id: 187,
    radical: '⾺',
    hint: 'Horse',
  },
  {
    id: 188,
    radical: '⾻',
    hint: 'Bone',
  },
  {
    id: 189,
    radical: '⾼',
    hint: 'Tall',
  },
  {
    id: 190,
    radical: '⾽',
    hint: 'Hair',
  },
  {
    id: 191,
    radical: '⾾',
    hint: 'Fight',
  },
  {
    id: 192,
    radical: '⾿',
    hint: 'Sacrificial Wine',
  },
  {
    id: 193,
    radical: '⿀',
    hint: 'Cauldron',
  },
  {
    id: 194,
    radical: '⿁',
    hint: 'Ghost',
  },
  {
    id: 195,
    radical: '⿂',
    hint: 'Fish',
  },
  {
    id: 196,
    radical: '⿃',
    hint: 'Bird',
  },
  {
    id: 197,
    radical: '⿄',
    hint: 'Salt',
  },
  {
    id: 198,
    radical: '⿅',
    hint: 'Deer',
  },
  {
    id: 199,
    radical: '⿆',
    hint: 'Wheat',
  },
  {
    id: 200,
    radical: '⿇',
    hint: 'Hemp',
  },
  {
    id: 201,
    radical: '⿈',
    hint: 'Yellow',
  },
  {
    id: 202,
    radical: '⿉',
    hint: 'Millet',
  },
  {
    id: 203,
    radical: '⿊',
    hint: 'Black',
  },
  {
    id: 204,
    radical: '⿋',
    hint: 'Embroidery',
  },
  {
    id: 205,
    radical: '⿌',
    hint: 'Frog',
  },
  {
    id: 206,
    radical: '⿍',
    hint: 'Tripod',
  },
  {
    id: 207,
    radical: '⿎',
    hint: 'Drum',
  },
  {
    id: 208,
    radical: '⿏',
    hint: 'Rat',
  },
  {
    id: 209,
    radical: '⿐',
    hint: 'Nose',
  },
  {
    id: 210,
    radical: '⿑',
    hint: 'Even',
  },
  {
    id: 211,
    radical: '⿒',
    hint: 'Tooth',
  },
  {
    id: 212,
    radical: '⿓',
    hint: 'Dragon',
  },
  {
    id: 213,
    radical: '⿔',
    hint: 'Turtle',
  },
  {
    id: 214,
    radical: '⿕',
    hint: 'Flute',
  },
] as const

type Mode = 'all' | 'due' | 'known'

export default function RadicalFlashcardsPage() {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [mode, setMode] = useState<Mode>('all')
  const [known, setKnown] = useState<number[]>([])
  const [due, setDue] = useState<number[]>([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    try {
      setKnown(JSON.parse(localStorage.getItem('radicals-known') || '[]'))
      setDue(JSON.parse(localStorage.getItem('radicals-due') || '[]'))
    } catch {
      console.warn('부수 학습 진도를 불러오지 못했습니다.')
    }
  }, [])
  const pool = useMemo(
    () =>
      mode === 'known'
        ? RADICALS.filter((x) => known.includes(x.id))
        : mode === 'due'
          ? RADICALS.filter((x) => due.includes(x.id))
          : [...RADICALS],
    [mode, known, due]
  )
  const card = pool[index % Math.max(pool.length, 1)] || RADICALS[0]
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RADICALS.filter((x) => !q || `${x.id} ${x.radical} ${x.hint}`.toLowerCase().includes(q))
  }, [query])
  const persist = (k: number[], d: number[]) => {
    setKnown(k)
    setDue(d)
    localStorage.setItem('radicals-known', JSON.stringify(k))
    localStorage.setItem('radicals-due', JSON.stringify(d))
  }
  const answer = (ok: boolean) => {
    const k = ok ? Array.from(new Set([...known, card.id])) : known.filter((id) => id !== card.id)
    const d = ok ? due.filter((id) => id !== card.id) : Array.from(new Set([...due, card.id]))
    persist(k, d)
    setRevealed(false)
    setIndex((i) => i + 1)
  }
  const reset = () => {
    persist([], [])
    setIndex(0)
    setRevealed(false)
  }
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-teal-600 uppercase">
          Japanese Kanji Radical Flashcards
        </p>
        <h1 className="text-4xl font-bold tracking-tight">한자 부수 플래시카드</h1>
        <p className="mt-4 text-stone-600 dark:text-stone-300">
          부수만 보고 의미 힌트를 떠올린 뒤 정답을 확인하세요. 진도는 이 브라우저에 저장됩니다.
        </p>
      </header>
      <section className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border p-4">
          <b className="text-2xl">{RADICALS.length}</b>
          <div className="text-xs text-stone-500">전체 부수</div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <b className="text-2xl text-emerald-700">{known.length}</b>
          <div className="text-xs text-stone-500">알고 있음</div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <b className="text-2xl text-amber-700">{due.length}</b>
          <div className="text-xs text-stone-500">다시 보기</div>
        </div>
      </section>
      <div className="mb-5 flex flex-wrap gap-2">
        {(['all', 'due', 'known'] as Mode[]).map((v) => (
          <button
            key={v}
            onClick={() => {
              setMode(v)
              setIndex(0)
              setRevealed(false)
            }}
            className={`rounded-full px-4 py-2 text-sm ${mode === v ? 'bg-stone-900 text-white' : 'border border-stone-300'}`}
          >
            {v === 'all' ? '전체' : v === 'due' ? '다시 보기' : '알고 있음'}
          </button>
        ))}
        <button
          onClick={reset}
          className="ml-auto rounded-full px-4 py-2 text-sm text-stone-500 underline"
        >
          진도 초기화
        </button>
      </div>
      <section className="min-h-[350px] rounded-3xl border bg-white p-8 text-center shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <div className="text-sm text-stone-500">
          {pool.length ? `${(index % pool.length) + 1} / ${pool.length}` : '복습할 카드가 없습니다'}
        </div>
        <div className="mt-8 text-8xl font-bold">{card.radical}</div>
        <div className="mt-6 min-h-16 text-lg">
          {revealed ? (
            <>
              <strong>{card.hint}</strong>
              <p className="mt-2 text-sm text-stone-500">강희자전 {card.id}번 · 부수 전용 문자</p>
            </>
          ) : (
            '의미를 떠올린 뒤 정답 보기를 누르세요'
          )}
        </div>
        <button
          onClick={() => setRevealed((v) => !v)}
          className="mt-8 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white"
        >
          {revealed ? '다시 가리기' : '정답 보기'}
        </button>
      </section>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          disabled={!revealed}
          onClick={() => answer(false)}
          className="rounded-xl border border-amber-300 px-4 py-3 font-semibold text-amber-700 disabled:opacity-40"
        >
          다시 보기
        </button>
        <button
          disabled={!revealed}
          onClick={() => answer(true)}
          className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:opacity-40"
        >
          알고 있음
        </button>
      </div>
      <section className="mt-12">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="번호·부수·영어 힌트 검색"
          className="mb-4 w-full rounded-xl border px-4 py-3"
        />
        <div className="max-h-80 overflow-auto rounded-2xl border">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-stone-100 dark:bg-stone-800">
              <tr>
                <th className="px-4 py-3">번호</th>
                <th className="px-4 py-3">부수</th>
                <th className="px-4 py-3">힌트</th>
                <th className="px-4 py-3">상태</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x) => (
                <tr key={x.id} className="border-t">
                  <td className="px-4 py-2">{x.id}</td>
                  <td className="px-4 py-2 text-2xl">{x.radical}</td>
                  <td className="px-4 py-2">{x.hint}</td>
                  <td className="px-4 py-2 text-xs">
                    {known.includes(x.id) ? '완료' : due.includes(x.id) ? '복습' : '미학습'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="mt-6 text-sm text-stone-500">
        학습 순서: 하루 10개 → 다음 날 다시 보기 → 3일 뒤 복습. 부수는 의미 힌트이지 한자 뜻을 항상
        결정하지는 않습니다.
      </p>
    </main>
  )
}
