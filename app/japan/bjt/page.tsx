'use client'

import { useEffect, useMemo, useState } from 'react'

const WORDS = [
  { id: 1, word: '承認', reading: 'しょうにん', meaning: '승인' },
  { id: 2, word: '確認', reading: 'かくにん', meaning: '확인' },
  { id: 3, word: '依頼', reading: 'いらい', meaning: '의뢰' },
  { id: 4, word: '対応', reading: 'たいおう', meaning: '대응' },
  { id: 5, word: '提出', reading: 'ていしゅつ', meaning: '제출' },
  { id: 6, word: '締切', reading: 'しめきり', meaning: '마감' },
  { id: 7, word: '期限', reading: 'きげん', meaning: '기한' },
  { id: 8, word: '納期', reading: 'のうき', meaning: '납기' },
  { id: 9, word: '延期', reading: 'えんき', meaning: '연기' },
  { id: 10, word: '変更', reading: 'へんこう', meaning: '변경' },
  { id: 11, word: '中止', reading: 'ちゅうし', meaning: '중지' },
  { id: 12, word: '再開', reading: 'さいかい', meaning: '재개' },
  { id: 13, word: '実施', reading: 'じっし', meaning: '실시' },
  { id: 14, word: '完了', reading: 'かんりょう', meaning: '완료' },
  { id: 15, word: '進捗', reading: 'しんちょく', meaning: '진척' },
  { id: 16, word: '遅延', reading: 'ちえん', meaning: '지연' },
  { id: 17, word: '調整', reading: 'ちょうせい', meaning: '조정' },
  { id: 18, word: '予定', reading: 'よてい', meaning: '예정' },
  { id: 19, word: '見込み', reading: 'みこみ', meaning: '전망' },
  { id: 20, word: '状況', reading: 'じょうきょう', meaning: '상황' },
  { id: 21, word: '課題', reading: 'かだい', meaning: '과제' },
  { id: 22, word: '対策', reading: 'たいさく', meaning: '대책' },
  { id: 23, word: '改善', reading: 'かいぜん', meaning: '개선' },
  { id: 24, word: '原因', reading: 'げんいん', meaning: '원인' },
  { id: 25, word: '影響', reading: 'えいきょう', meaning: '영향' },
  { id: 26, word: '対応策', reading: 'たいおうさく', meaning: '대응책' },
  { id: 27, word: '解決', reading: 'かいけつ', meaning: '해결' },
  { id: 28, word: '再発', reading: 'さいはつ', meaning: '재발' },
  { id: 29, word: '防止', reading: 'ぼうし', meaning: '방지' },
  { id: 30, word: '障害', reading: 'しょうがい', meaning: '장애' },
  { id: 31, word: '不具合', reading: 'ふぐあい', meaning: '결함' },
  { id: 32, word: '仕様', reading: 'しよう', meaning: '사양' },
  { id: 33, word: '要件', reading: 'ようけん', meaning: '요건' },
  { id: 34, word: '設計', reading: 'せっけい', meaning: '설계' },
  { id: 35, word: '実装', reading: 'じっそう', meaning: '구현' },
  { id: 36, word: '検証', reading: 'けんしょう', meaning: '검증' },
  { id: 37, word: '試験', reading: 'しけん', meaning: '시험' },
  { id: 38, word: '品質', reading: 'ひんしつ', meaning: '품질' },
  { id: 39, word: '環境', reading: 'かんきょう', meaning: '환경' },
  { id: 40, word: '本番', reading: 'ほんばん', meaning: '운영' },
  { id: 41, word: '開発', reading: 'かいはつ', meaning: '개발' },
  { id: 42, word: '運用', reading: 'うんよう', meaning: '운영' },
  { id: 43, word: '保守', reading: 'ほしゅ', meaning: '보수' },
  { id: 44, word: '更新', reading: 'こうしん', meaning: '갱신' },
  { id: 45, word: '移行', reading: 'いこう', meaning: '이행' },
  { id: 46, word: '導入', reading: 'どうにゅう', meaning: '도입' },
  { id: 47, word: '廃止', reading: 'はいし', meaning: '폐지' },
  { id: 48, word: '権限', reading: 'けんげん', meaning: '권한' },
  { id: 49, word: '設定', reading: 'せってい', meaning: '설정' },
  { id: 50, word: '共有', reading: 'きょうゆう', meaning: '공유' },
  { id: 51, word: '添付', reading: 'てんぷ', meaning: '첨부' },
  { id: 52, word: '記載', reading: 'きさい', meaning: '기재' },
  { id: 53, word: '追記', reading: 'ついき', meaning: '추가 기재' },
  { id: 54, word: '修正', reading: 'しゅうせい', meaning: '수정' },
  { id: 55, word: '削除', reading: 'さくじょ', meaning: '삭제' },
  { id: 56, word: '返信', reading: 'へんしん', meaning: '회신' },
  { id: 57, word: '連絡', reading: 'れんらく', meaning: '연락' },
  { id: 58, word: '報告', reading: 'ほうこく', meaning: '보고' },
  { id: 59, word: '相談', reading: 'そうだん', meaning: '상담' },
  { id: 60, word: '回答', reading: 'かいとう', meaning: '답변' },
  { id: 61, word: '案内', reading: 'あんない', meaning: '안내' },
  { id: 62, word: '通知', reading: 'つうち', meaning: '통지' },
  { id: 63, word: '承知', reading: 'しょうち', meaning: '인지함' },
  { id: 64, word: '了承', reading: 'りょうしょう', meaning: '양해·승낙' },
  { id: 65, word: '恐縮', reading: 'きょうしゅく', meaning: '황송함' },
  { id: 66, word: '恐縮ですが', reading: 'きょうしゅくですが', meaning: '죄송하지만' },
  { id: 67, word: 'お手数', reading: 'おてすう', meaning: '수고' },
  { id: 68, word: '差し支え', reading: 'さしつかえ', meaning: '지장' },
  { id: 69, word: '都合', reading: 'つごう', meaning: '사정' },
  { id: 70, word: '至急', reading: 'しきゅう', meaning: '至急 긴급히' },
  { id: 71, word: '早急', reading: 'そうきゅう', meaning: '조속히' },
  { id: 72, word: '直ちに', reading: 'ただちに', meaning: '즉시' },
  { id: 73, word: 'あらかじめ', reading: 'あらかじめ', meaning: '미리' },
  { id: 74, word: '引き続き', reading: 'ひきつづき', meaning: '계속해서' },
  { id: 75, word: '改めて', reading: 'あらためて', meaning: '다시·새로' },
  { id: 76, word: '念のため', reading: 'ねんのため', meaning: '만일을 위해' },
  { id: 77, word: '原則', reading: 'げんそく', meaning: '원칙' },
  { id: 78, word: '例外', reading: 'れいがい', meaning: '예외' },
  { id: 79, word: '条件', reading: 'じょうけん', meaning: '조건' },
  { id: 80, word: '対象', reading: 'たいしょう', meaning: '대상' },
  { id: 81, word: '範囲', reading: 'はんい', meaning: '범위' },
  { id: 82, word: '基準', reading: 'きじゅん', meaning: '기준' },
  { id: 83, word: '方針', reading: 'ほうしん', meaning: '방침' },
  { id: 84, word: '目的', reading: 'もくてき', meaning: '목적' },
  { id: 85, word: '手順', reading: 'てじゅん', meaning: '절차' },
  { id: 86, word: '方法', reading: 'ほうほう', meaning: '방법' },
  { id: 87, word: '内容', reading: 'ないよう', meaning: '내용' },
  { id: 88, word: '詳細', reading: 'しょうさい', meaning: '상세' },
  { id: 89, word: '概要', reading: 'がいよう', meaning: '개요' },
  { id: 90, word: '資料', reading: 'しりょう', meaning: '자료' },
  { id: 91, word: '議題', reading: 'ぎだい', meaning: '의제' },
  { id: 92, word: '議論', reading: 'ぎろん', meaning: '논의' },
  { id: 93, word: '決定', reading: 'けってい', meaning: '결정' },
  { id: 94, word: '承認待ち', reading: 'しょうにんまち', meaning: '승인 대기' },
  { id: 95, word: '保留', reading: 'ほりゅう', meaning: '보류' },
  { id: 96, word: '見直し', reading: 'みなおし', meaning: '재검토' },
  { id: 97, word: '合意', reading: 'ごうい', meaning: '합의' },
  { id: 98, word: '負担', reading: 'ふたん', meaning: '부담' },
  { id: 99, word: '費用', reading: 'ひよう', meaning: '비용' },
  { id: 100, word: '見積もり', reading: 'みつもり', meaning: '견적' },
] as const

type Mode = 'all' | 'due' | 'known'
type View = 'cards' | 'vocabulary'

export default function BjtVocabularyPage() {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [mode, setMode] = useState<Mode>('all')
  const [known, setKnown] = useState<number[]>([])
  const [due, setDue] = useState<number[]>([])
  const [view, setView] = useState<View>('cards')
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      setKnown(JSON.parse(localStorage.getItem('bjt-known') || '[]'))
      setDue(JSON.parse(localStorage.getItem('bjt-due') || '[]'))
    } catch (error) {
      console.warn('BJT 학습 진도를 불러오지 못했습니다.', error)
    }
  }, [])

  const pool = useMemo(() => {
    if (mode === 'due') return WORDS.filter((item) => due.includes(item.id))
    if (mode === 'known') return WORDS.filter((item) => known.includes(item.id))
    return [...WORDS]
  }, [mode, known, due])
  const card = pool[index % Math.max(pool.length, 1)] || WORDS[0]
  const filteredWords = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return WORDS.filter((item) => {
      if (mode === 'due' && !due.includes(item.id)) return false
      if (mode === 'known' && !known.includes(item.id)) return false
      if (!normalized) return true
      return [item.word, item.reading, item.meaning].some((value) =>
        value.toLowerCase().includes(normalized)
      )
    })
  }, [query, mode, known, due])

  const persist = (nextKnown: number[], nextDue: number[]) => {
    setKnown(nextKnown)
    setDue(nextDue)
    localStorage.setItem('bjt-known', JSON.stringify(nextKnown))
    localStorage.setItem('bjt-due', JSON.stringify(nextDue))
  }
  const answer = (isKnown: boolean) => {
    const nextKnown = isKnown
      ? Array.from(new Set([...known, card.id]))
      : known.filter((id) => id !== card.id)
    const nextDue = isKnown
      ? due.filter((id) => id !== card.id)
      : Array.from(new Set([...due, card.id]))
    persist(nextKnown, nextDue)
    setRevealed(false)
    setIndex((value) => value + 1)
  }
  const reset = () => {
    persist([], [])
    setIndex(0)
    setRevealed(false)
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-teal-600 uppercase">
          BJT 1,500 Vocabulary Project
        </p>
        <h1 className="text-4xl font-bold tracking-tight">비즈니스 일본어 암기장</h1>
        <p className="mt-4 text-stone-600 dark:text-stone-300">
          단어를 외우기보다 한자 조합과 업무 문맥을 회상하세요. 현재 1차 핵심 세트 100개를
          제공합니다.
        </p>
      </header>

      <section className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-700">
          <div className="text-2xl font-bold">{WORDS.length}</div>
          <div className="text-xs text-stone-500">전체</div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950">
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            {known.length}
          </div>
          <div className="text-xs text-stone-500">알고 있음</div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{due.length}</div>
          <div className="text-xs text-stone-500">다시 보기</div>
        </div>
      </section>

      <nav
        className="mb-6 flex rounded-2xl border border-stone-200 p-1 dark:border-stone-700"
        aria-label="학습 메뉴"
      >
        <button
          onClick={() => setView('cards')}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${view === 'cards' ? 'bg-teal-600 text-white' : 'text-stone-500'}`}
        >
          카드 암기
        </button>
        <button
          onClick={() => setView('vocabulary')}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold ${view === 'vocabulary' ? 'bg-teal-600 text-white' : 'text-stone-500'}`}
        >
          단어장
        </button>
      </nav>

      {view === 'vocabulary' ? (
        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="단어·읽기·뜻 검색"
              className="flex-1 rounded-xl border border-stone-300 bg-transparent px-4 py-3 outline-none focus:border-teal-600"
            />
            <div className="flex gap-2 text-sm">
              {(['all', 'due', 'known'] as Mode[]).map((value) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={`rounded-xl px-3 py-2 ${mode === value ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'border border-stone-300'}`}
                >
                  {value === 'all' ? '전체' : value === 'due' ? '복습' : '완료'}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-100 text-stone-500 dark:bg-stone-800">
                <tr>
                  <th className="px-4 py-3">단어</th>
                  <th className="px-4 py-3">읽기</th>
                  <th className="px-4 py-3">뜻</th>
                  <th className="px-4 py-3">상태</th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map((item) => (
                  <tr key={item.id} className="border-t border-stone-200 dark:border-stone-700">
                    <td className="px-4 py-3 text-lg font-semibold">{item.word}</td>
                    <td className="px-4 py-3 text-teal-600">{item.reading}</td>
                    <td className="px-4 py-3">{item.meaning}</td>
                    <td className="px-4 py-3 text-xs">
                      {known.includes(item.id) ? '완료' : due.includes(item.id) ? '복습' : '미학습'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredWords.length && (
              <p className="p-8 text-center text-stone-500">검색 결과가 없습니다.</p>
            )}
          </div>
        </section>
      ) : (
        <>
          <div className="mb-5 flex flex-wrap gap-2">
            {(['all', 'due', 'known'] as Mode[]).map((value) => (
              <button
                key={value}
                onClick={() => {
                  setMode(value)
                  setIndex(0)
                  setRevealed(false)
                }}
                className={`rounded-full px-4 py-2 text-sm ${mode === value ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900' : 'border border-stone-300'}`}
              >
                {value === 'all' ? '전체' : value === 'due' ? '다시 보기' : '알고 있음'}
              </button>
            ))}
            <button
              onClick={reset}
              className="ml-auto rounded-full px-4 py-2 text-sm text-stone-500 underline"
            >
              진도 초기화
            </button>
          </div>

          <section className="min-h-[330px] rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm dark:border-stone-700 dark:bg-stone-900">
            <div className="text-sm text-stone-500">
              {pool.length
                ? `${(index % pool.length) + 1} / ${pool.length}`
                : '복습할 단어가 없습니다'}
            </div>
            <div className="mt-8 text-6xl font-bold tracking-tight">{card.word}</div>
            <div className="mt-4 text-xl text-teal-600">{revealed ? card.reading : '••••••'}</div>
            <div className="mt-3 min-h-8 text-lg">
              {revealed ? card.meaning : '뜻을 생각한 뒤 카드를 눌러 확인하세요'}
            </div>
            <button
              onClick={() => setRevealed((value) => !value)}
              className="mt-8 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
            >
              {revealed ? '다시 가리기' : '정답 보기'}
            </button>
          </section>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              disabled={!revealed}
              onClick={() => answer(false)}
              className="rounded-xl border border-amber-300 px-4 py-3 font-semibold text-amber-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              다시 보기
            </button>
            <button
              disabled={!revealed}
              onClick={() => answer(true)}
              className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              알고 있음
            </button>
          </div>

          <div className="mt-10 rounded-2xl bg-stone-100 p-5 text-sm text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            <strong>학습법:</strong> 하루 10개만 진행하고, `期限·締切·納期`처럼 비슷한 단어를 문장
            속에서 비교하세요. 진도는 이 브라우저에 자동 저장됩니다.
          </div>
        </>
      )}
    </main>
  )
}
