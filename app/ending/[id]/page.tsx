import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EndingPage({ params }: Props) {
  const { id } = await params;

  let title = '';
  let text = '';
  let color = 'text-white';
  let bg = '';

  if (id === 'bad') {
    title = 'BAD END';
    text = 'あなたは見てはいけないものを見てしまった。';
    color = 'text-red-500';
    bg = '/bg/ending_bad.png';
  } else if (id === 'true') {
    title = 'TRUE END';
    text = '部屋からは逃げられたが、平穏な日常はもう戻らない。';
    color = 'text-gray-300';
    bg = '/bg/ending_true.png';
  } else if (id === 'hidden') {
    title = 'HIDDEN END';
    text = '鏡合わせの真実。次に見られるのは、誰だろうか。';
    color = 'text-purple-400';
    bg = '/bg/ending_hidden.png';
  } else {
    title = 'UNKNOWN END';
    text = '存在しない結末。';
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 text-center relative overflow-hidden">
      {/* Background image */}
      {bg && (
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-40"
          style={{ backgroundImage: `url(${bg})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <h1 className={`relative z-10 text-6xl md:text-8xl font-bold tracking-widest mb-8 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] ${color}`}>
        {title}
      </h1>
      <p className="relative z-10 text-xl md:text-2xl mb-12 opacity-90 leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
        {text}
      </p>
      <Link 
        href="/"
        className="relative z-10 px-8 py-3 border border-white/30 text-white/70 hover:bg-white hover:text-black transition-colors"
      >
        タイトルへ戻る
      </Link>
    </div>
  );
}
