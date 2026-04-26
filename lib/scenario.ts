import { SceneNode } from './types';

export const scenario: SceneNode[] = [
  {
    id: 'start',
    text: '深夜2時。ベッドに横たわり、スマホの画面を漫然とスクロールしている。',
    background: '/bg/dark_room.png',
    effect: 'noise',
    bgm: '/bgm/silence.wav', // dummy
    next: 'node1',
  },
  {
    id: 'node1',
    text: '突然、見知らぬアカウントからDMが届いた。',
    background: '/bg/dark_room.png',
    se: '/se/notification.wav',
    next: 'node2',
  },
  {
    id: 'node2',
    text: '『遅くまで起きてるんだね』\n『スマホの光で、顔が青く照らされてるよ』',
    next: 'choice1',
  },
  {
    id: 'choice1',
    text: '今の自分の状況を的確に言い当てている……。どうする？',
    choices: [
      { label: '「誰ですか？」と返信する', next: 'branch_reply' },
      { label: '気味が悪いので無視する', next: 'branch_ignore' },
    ],
  },
  {
    id: 'branch_reply',
    text: '震える指で『誰ですか？』とメッセージを送った。',
    next: 'reply_2',
  },
  {
    id: 'reply_2',
    text: 'すぐに既読がつき、返信が来た。\n『ずっと見てるよ』',
    background: '/bg/dark_room.png',
    se: '/se/notification.wav',
    next: 'reply_3',
  },
  {
    id: 'reply_3',
    text: 'その直後、玄関の方から「ガチャ、ガチャ」とドアノブを回す音が聞こえた。',
    background: '/bg/dark_room.png',
    effect: 'shake',
    se: '/se/doorknob.wav',
    next: 'reply_choice',
  },
  {
    id: 'reply_choice',
    text: '誰かが外から開けようとしている。どうする？',
    choices: [
      { label: 'ドアスコープ（覗き穴）を確認する', next: 'door_check' },
      { label: '布団をかぶって息を潜める', next: 'bed_hide' },
    ],
  },
  {
    id: 'door_check',
    text: '恐る恐る玄関へ向かい、覗き穴から外を見た。',
    background: '/bg/peephole.png',
    bgm: '/bgm/tension.wav',
    next: 'door_check2',
  },
  {
    id: 'door_check2',
    text: '……真っ暗だ。何も見えない。廊下の電気が消えているのだろうか。',
    next: 'door_check3',
  },
  {
    id: 'door_check3',
    text: 'ブブッ、と手元のスマホが震えた。',
    background: '/bg/peephole.png',
    se: '/se/notification.wav',
    next: 'door_check4',
  },
  {
    id: 'door_check4',
    text: '『覗き穴、指で塞いでるから見えないでしょ？』',
    next: 'door_check5',
  },
  {
    id: 'door_check5',
    text: '外から見えなくされている……！？',
    effect: 'glitch',
    next: 'door_check6',
  },
  {
    id: 'door_check6',
    text: 'ドンドンドンドンドンドンドンドンドンドン！！！！！！',
    background: '/bg/peephole.png',
    effect: 'shake',
    se: '/se/bang.wav',
    next: 'door_choice',
  },
  {
    id: 'door_choice',
    text: '激しくドアを叩き始めた。',
    choices: [
      { label: '鍵を開けて外を確認する', next: 'bad_open' },
      { label: 'ベランダから逃げる', next: 'escape_balcony', setFlag: 'noticed' },
    ],
  },
  {
    id: 'branch_ignore',
    text: '誰かのイタズラだろう。無視して電気を消し、目を閉じた。',
    effect: 'fadeBlack',
    next: 'ignore_2',
  },
  {
    id: 'ignore_2',
    text: '数分後、再びスマホが震えた。',
    background: '/bg/dark_room.png',
    se: '/se/notification.wav',
    next: 'ignore_3',
  },
  {
    id: 'ignore_3',
    text: '送られてきたのは1枚の画像。\n……私の部屋の、玄関のドアを外から撮った写真だ。',
    choices: [
      { label: '画像をよく見る', next: 'hidden_1' },
      { label: 'そのまま見過ごす', next: 'ignore_4' },
    ],
  },
  {
    id: 'ignore_4',
    text: '『鍵、閉め忘れてたよ』',
    next: 'ignore_5',
  },
  {
    id: 'ignore_5',
    text: 'キィィ……という音とともに、ゆっくりと玄関のドアが開く気配がした。',
    background: '/bg/dark_room.png',
    bgm: '/bgm/tension.wav',
    next: 'ignore_choice',
  },
  {
    id: 'ignore_choice',
    text: 'どうする？',
    choices: [
      { label: '布団をかぶって息を潜める', next: 'bed_hide' },
      { label: 'ベランダから逃げる', next: 'escape_balcony' },
    ],
  },
  {
    id: 'bed_hide',
    text: '恐怖のあまり、布団を頭まで被って震えることしかできなかった。',
    next: 'bed_hide2',
  },
  {
    id: 'bed_hide2',
    text: 'ペタ、ペタ、と靴下で歩くような足音が近づいてくる。',
    background: '/bg/dark_room.png',
    se: '/se/footstep.wav',
    next: 'bed_hide3',
  },
  {
    id: 'bed_hide3',
    text: '足音はベッドのすぐ脇でピタリと止まった。',
    next: 'bed_hide4',
  },
  {
    id: 'bed_hide4',
    text: 'スマホが鳴る。',
    background: '/bg/dark_room.png',
    se: '/se/notification.wav',
    next: 'bed_hide5',
  },
  {
    id: 'bed_hide5',
    text: '『布団かぶってても意味ないよ』',
    next: 'bed_hide6',
  },
  {
    id: 'bed_hide6',
    text: '勢いよく布団が剥がされた。',
    effect: 'flash',
    ending: 'bad',
  },
  {
    id: 'bad_open',
    text: '恐怖よりも怒りが勝り、チェーンをかけたまま鍵を開けた。',
    next: 'bad_open2',
  },
  {
    id: 'bad_open2',
    text: '少しだけ開いた隙間から見えたのは、見開かれた無数の血走った目だった。',
    effect: 'flash',
    next: 'bad_open3',
  },
  {
    id: 'bad_open3',
    text: '強引にドアが抉じ開けられ、黒い影が雪崩れ込んでくる。',
    effect: 'fadeBlack',
    ending: 'bad',
  },
  {
    id: 'escape_balcony',
    text: '音を立てないように窓を開け、ベランダへ飛び出した。',
    next: 'escape_balcony2',
  },
  {
    id: 'escape_balcony2',
    text: '幸いここは2階だ。雨樋を伝って地上へ降り、無我夢中で駆け出した。',
    next: 'escape_balcony3',
  },
  {
    id: 'escape_balcony3',
    text: '深夜のコンビニに駆け込み、警察に通報する。\n……しばらくして、自分の部屋へ戻ることになった。',
    effect: 'fadeBlack',
    next: 'escape_balcony4',
  },
  {
    id: 'escape_balcony4',
    text: '部屋に侵入者の痕跡はあったが、誰もいなかったという。',
    next: 'escape_balcony5',
  },
  {
    id: 'escape_balcony5',
    text: 'だが、机の上には……\nさっきまでベッドで寝ていた自分の顔写真が、ご丁寧に現像されて置かれていた。',
    effect: 'glitch',
    ending: 'true',
  },
  {
    id: 'hidden_1',
    text: '送られてきた画像をよく見ると……窓ガラスに反射して、相手の顔がうっすらと写っている。',
    background: '/bg/dark_room.png',
    next: 'hidden_2',
  },
  {
    id: 'hidden_2',
    text: '『あなたの顔、窓に写ってるよ』と返信した。',
    next: 'hidden_3',
  },
  {
    id: 'hidden_3',
    text: 'ピタリとドアの音が止んだ。',
    bgm: '/bgm/silence.wav',
    next: 'hidden_4',
  },
  {
    id: 'hidden_4',
    text: '『……見つけた』',
    se: '/se/notification.wav',
    next: 'hidden_5',
  },
  {
    id: 'hidden_5',
    text: '直後、自分の部屋の「クローゼットの中」からスマホの着信音が鳴り響いた。',
    effect: 'shake',
    next: 'hidden_6',
  },
  {
    id: 'hidden_6',
    text: '外にいると思わせて、実は最初から中にいたのだ。',
    effect: 'fadeBlack',
    ending: 'hidden',
  }
];
