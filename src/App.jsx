import React, { useMemo, useState } from 'react';

const questions = [
  {
    id: 1,
    text: '今の住まいで、一番気になっていることは？',
    image: '/yuzurie-question-01.png',
    options: [
      { label: '家賃を払い続ける不安', type: 'future' },
      { label: '将来の住宅ローン', type: 'future' },
      { label: '子どもの成長と部屋数', type: 'family' },
      { label: '古さ・住み心地', type: 'freedom' },
      { label: '特に大きな不満はない', type: 'connection' },
    ],
  },
  {
    id: 2,
    text: '「マイホーム」と聞いて、一番近い気持ちは？',
    image: '/yuzurie-question-02.png',
    options: [
      { label: 'いつか欲しい', type: 'future' },
      { label: '正直まだ不安', type: 'connection' },
      { label: 'ローンが気になる', type: 'future' },
      { label: '家族の安心につながる', type: 'family' },
      { label: '持ち家にこだわりはない', type: 'freedom' },
    ],
  },
  {
    id: 3,
    text: 'あなたにとって「安心できる暮らし」とは？',
    image: '/yuzurie-question-03.png',
    options: [
      { label: '毎月の支払いに余裕がある', type: 'future' },
      { label: '家族との時間が増える', type: 'family' },
      { label: '自分らしく暮らせる', type: 'freedom' },
      { label: '地域とのつながりがある', type: 'connection' },
      { label: '将来への不安が少ない', type: 'future' },
    ],
  },
  {
    id: 4,
    text: '住まい選びで、つい後回しにしがちなことは？',
    image: '/yuzurie-question-04.png',
    options: [
      { label: '将来の資金計画', type: 'future' },
      { label: '家族との話し合い', type: 'family' },
      { label: '本当に必要な広さ', type: 'connection' },
      { label: '地域との関わり', type: 'connection' },
      { label: '自分たちらしい暮らし', type: 'freedom' },
    ],
  },
  {
    id: 5,
    text: 'もし「住みながら将来の安心につながる仕組み」があるなら？',
    image: '/yuzurie-question-05.png',
    options: [
      { label: '興味がある', type: 'gratitude' },
      { label: '少し話を聞いてみたい', type: 'connection' },
      { label: '条件次第', type: 'future' },
      { label: 'よくわからない', type: 'connection' },
      { label: '今は考えていない', type: 'freedom' },
    ],
  },
  {
    id: 6,
    text: 'あなたが大切にしたいのは、どちらに近いですか？',
    image: '/yuzurie-question-06.png',
    options: [
      { label: '家を所有すること', type: 'future' },
      { label: '心地よく暮らすこと', type: 'freedom' },
      { label: '家族が安心して暮らせること', type: 'family' },
      { label: '地域の中でつながること', type: 'connection' },
      { label: '無理なく選べること', type: 'gratitude' },
    ],
  },
  {
    id: 7,
    text: '空き家を活かして暮らしをつなぐ考え方について、どう感じますか？',
    image: '/yuzurie-question-07.png',
    options: [
      { label: 'とても共感する', type: 'gratitude' },
      { label: '面白いと思う', type: 'connection' },
      { label: '少し不安もある', type: 'future' },
      { label: 'あまりイメージできない', type: 'connection' },
      { label: '新築の方が安心', type: 'future' },
    ],
  },
  {
    id: 8,
    text: '将来の暮らしで、特に大切にしたいことは？',
    image: '/yuzurie-question-08.png',
    options: [
      { label: '子どもの安心', type: 'family' },
      { label: '老後の安心', type: 'future' },
      { label: '自由な働き方', type: 'freedom' },
      { label: '家族時間', type: 'family' },
      { label: '地域とのつながり', type: 'connection' },
    ],
  },
  {
    id: 9,
    text: '「家のために人生を使わない」という考え方に近いですか？',
    image: '/yuzurie-question-09.png',
    options: [
      { label: 'とても共感する', type: 'freedom' },
      { label: 'なんとなくわかる', type: 'gratitude' },
      { label: '半々くらい', type: 'connection' },
      { label: 'あまり考えたことがない', type: 'future' },
      { label: '持ち家は人生の目標だと思う', type: 'future' },
    ],
  },
  {
    id: 10,
    text: '最後に。あなたが本当に欲しいのは「家」そのものですか？ それとも——',
    image: '/yuzurie-question-10.png',
    options: [
      { label: '安心', type: 'future' },
      { label: '家族との時間', type: 'family' },
      { label: '自由', type: 'freedom' },
      { label: '自分らしい暮らし', type: 'freedom' },
      { label: '将来への希望', type: 'gratitude' },
    ],
  },
];

const resultMap = {
  gratitude: {
    title: 'ありがとう循環タイプ',
    image: '/yuzurie-result-gratitude.png',
    catch: '家や暮らしを通して、家族・地域・ご縁にありがとうを循環させるタイプです。',
    body: 'あなたは、住まいを自分たちだけのものとして見るよりも、家族や地域、支えてくれる人とのつながりまで大切にできる方です。ゆずりえの「空き家を活かし、住む人に安心を届け、地域に灯りをともす」という考え方と、とても相性が良い住まい方です。',
  },
  family: {
    title: '家族灯りタイプ',
    image: '/yuzurie-result-family.png',
    catch: '家や暮らしを通して、家族の時間や安心に灯りをともしていくタイプです。',
    body: 'あなたは、家そのものよりも、そこで過ごす家族の時間や安心感を大切にする方です。ゆずりえのように、無理なく暮らしながら、家族に合う住まい方を育てていく考え方が心に合いやすいかもしれません。',
  },
  connection: {
    title: 'つながり安心タイプ',
    image: '/yuzurie-result-connection.png',
    catch: '人とのつながりや地域との関わりの中で、安心して暮らしを育てていくタイプです。',
    body: 'あなたは、家を建物だけで考えるのではなく、周りの人、地域、ご縁との関係性も大切にできる方です。ゆずりえの暮らしは、住む人だけでなく、オーナーさん・地域・工務店さんとのつながりも含めて安心を育てていく住まい方です。',
  },
  future: {
    title: '未来灯りタイプ',
    image: '/yuzurie-result-future.png',
    catch: '今の暮らしを大切にしながら、将来の安心や希望に灯りをともしていくタイプです。',
    body: 'あなたは、勢いだけで住まいを決めるよりも、家計・将来・家族の安心を丁寧に整えながら、一歩ずつ進みたい方です。ゆずりえは、いきなり大きな負担を抱えるのではなく、住みながら将来の選択肢を育てていく考え方です。',
  },
  freedom: {
    title: '自由育みタイプ',
    image: '/yuzurie-result-freedom.png',
    catch: '自分たちらしい心地よさや自由を大切にしながら、暮らしを育んでいくタイプです。',
    body: 'あなたは、家を持つことだけをゴールにせず、心地よく、自分らしく、無理なく暮らせることを大切にする方です。ゆずりえのような「賃貸から始める新しい住まい方」は、自由と安心のバランスを取りやすい選択肢になります。',
  },
};

function getTopResult(answers) {
  const scores = { gratitude: 0, family: 0, connection: 0, future: 0, freedom: 0 };
  Object.values(answers).forEach((type) => {
    scores[type] += 1;
  });
  const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'gratitude';
  return resultMap[topType];
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [about, setAbout] = useState(false);
  const [answers, setAnswers] = useState({});

  const currentIndex = Object.keys(answers).length;
  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;
  const result = useMemo(() => getTopResult(answers), [answers]);

  const handleAnswer = (type) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: type }));
  };

  const reset = () => {
    setStarted(false);
    setAbout(false);
    setAnswers({});
  };

  const back = () => {
    if (isFinished) return;
    if (currentIndex === 0) {
      setStarted(false);
      return;
    }
    const copy = { ...answers };
    delete copy[questions[currentIndex - 1].id];
    setAnswers(copy);
  };

  if (!started) {
    return (
      <main className="min-h-screen bg-[#fff8ed] px-4 py-6 md:px-8 md:py-10">
        <section className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-[#dfc99f] bg-white shadow-2xl">
            <img
              src="/yuzurie-top-main.png"
              alt="ゆずりえ適性診断 トップ画像"
              className="block h-auto w-full"
            />
          </div>

          <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={() => setStarted(true)}
              className="rounded-2xl bg-[#f1992d] px-10 py-5 text-xl font-bold tracking-[0.12em] text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#e58c21]"
            >
              診断をはじめる　›
            </button>
            <button
              onClick={() => setAbout(!about)}
              className="rounded-2xl border border-[#9cae73] bg-white px-10 py-5 text-xl font-bold tracking-[0.08em] text-[#6f8748] shadow-sm transition hover:bg-[#f2f7e8]"
            >
              ゆずりえとは？
            </button>
          </div>

          {about && (
            <div className="mx-auto mt-6 max-w-3xl rounded-3xl border border-[#d8c795] bg-white/90 p-6 leading-8 text-[#4a3828] shadow-sm">
              <p className="mb-2 text-xl font-bold text-[#6f8748]">ゆずりえとは？</p>
              今の暮らしを大切にしながら、将来の“わが家”につながる新しい住まい方です。空き家を活かし、住む人に安心を届け、地域にもう一度灯りをともす。そんな想いから生まれたプロジェクトです。
            </div>
          )}
        </section>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="min-h-screen bg-[#fff8ed] p-4 md:p-8">
        <section className="mx-auto max-w-7xl rounded-[2rem] border border-[#dfc99f] bg-white p-5 shadow-2xl md:p-8">
          <div className="text-center">
            <p className="text-sm font-bold tracking-[0.25em] text-[#6f8748]">ゆずりえプロジェクト</p>
            <h1 className="mt-2 font-serif text-5xl font-bold tracking-[0.16em] text-[#3c2b1f]">診断結果</h1>
          </div>
          <div className="mt-7 grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-[#789654] px-5 py-2 text-lg font-bold text-white">あなたは</p>
              <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl"><span className="text-[#e58c21]">{result.title.replace('タイプ', '')}</span><span className="text-[#6f8748]">タイプ</span></h2>
              <p className="mt-5 text-xl font-bold leading-9 text-[#5f4a37]">{result.catch}</p>
              <p className="mt-5 leading-9 text-[#5f4a37]">{result.body}</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <a href="https://forms.gle/yYY8CqTCqjYnZ3756" target="_blank" rel="noreferrer" className="rounded-2xl bg-[#f1992d] px-8 py-5 text-center text-xl font-bold tracking-[0.12em] text-white shadow-xl shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-[#e58c21]">
                  個別相談してみる　›
                </a>
                <button onClick={reset} className="rounded-2xl border border-[#9cae73] bg-white px-8 py-5 text-xl font-bold tracking-[0.08em] text-[#6f8748] transition hover:bg-[#f2f7e8]">
                  もう一度診断する
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.6rem] border border-[#dfc99f] bg-[#fff4df] shadow-lg">
              <img src={result.image} alt={result.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] p-4 md:p-8">
      <section className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#dfc99f] bg-white shadow-2xl md:grid md:grid-cols-[1.05fr_.95fr]">
        <div className="p-6 md:p-10">
          <button onClick={back} className="mb-5 rounded-full border border-[#d8c795] bg-white px-5 py-2 font-bold text-[#5f4a37] shadow-sm hover:bg-[#fff8ed]">← 戻る</button>
          <p className="text-center text-sm font-bold tracking-[0.25em] text-[#6f8748]">ゆずりえプロジェクト</p>
          <h1 className="mt-2 text-center font-serif text-4xl font-bold tracking-[0.12em] text-[#3c2b1f] md:text-5xl">ゆずりえ <span className="text-[#e58c21]">適性</span><span className="text-[#6f8748]">診断</span></h1>
          <div className="my-7">
            <div className="mb-3 flex items-center justify-between text-lg font-bold text-[#5f4a37]">
              <span>質問 <span className="text-3xl text-[#e58c21]">{currentIndex + 1}</span> / {questions.length}</span>
              <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-4 overflow-hidden rounded-full border border-[#d8c795] bg-[#f4ead3]">
              <div className="h-full rounded-full bg-[#789654] transition-all duration-700" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
          <h2 className="text-center font-serif text-3xl font-bold leading-relaxed text-[#3c2b1f] md:text-4xl">{currentQuestion.text}</h2>
          <div className="mt-7 grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <button key={option.label} onClick={() => handleAnswer(option.type)} className="group flex items-center gap-4 rounded-2xl border border-[#d8c795] bg-[#fffdf7] px-5 py-4 text-left text-lg font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-[#f1992d] hover:bg-[#fff4df] hover:shadow-md">
                <span className="text-[#e58c21]">{index + 1}.</span>
                <span>{option.label}</span>
                <span className="ml-auto text-2xl text-[#6f8748]">›</span>
              </button>
            ))}
          </div>
          <p className="mt-7 text-center text-lg font-bold tracking-[0.16em] text-[#6f8748]">気軽にお答えください</p>
        </div>
        <div className="min-h-[420px] bg-[#fff4df]">
          <img src={currentQuestion.image} alt={`質問${currentQuestion.id}`} className="h-full w-full object-cover" />
        </div>
      </section>
    </main>
  );
}
