import React, { useState } from 'react';
import { 
  Clipboard, 
  Check, 
  ArrowRight, 
  MessageCircle, 
  Brain, 
  Sparkles, 
  HeartHandshake, 
  TrendingUp, 
  Coins, 
  Smartphone,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

// LINE公式アカウントURL
const LINE_OFFICIAL_URL = 'https://lin.ee/N5e4G8M';

// 役割タイプ定義
const ROLES = {
  T1: {
    id: 'T1',
    name: '経営コンサルタント',
    icon: <Brain className="w-8 h-8 text-blue-600" />,
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    description: '少人数会社の経営に寄り添う、判断整理のプロ',
    empathy: '一人で決断を迫られる毎日、本当にお疲れ様です。絡まった糸を一緒に解きほぐしましょう。',
    themes: ['迷っている判断の整理', '優先順位の決め直し', '今週の動き方の設計'],
    prompt: `あなたは、日本最高峰レベルの経営コンサルタントでありながら、
少人数会社の経営者プレイヤーに寄り添う相談相手です。

私は今、【悩み】で迷っています。
正解を押しつけず、結論を急がず、
整理するために質問を1つずつしてください。
私が「OK」と言うまで質問を続けてください。
最後に、選択肢を3案にまとめてください。`
  },
  T2: {
    id: 'T2',
    name: '集客マーケター',
    icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    description: '無理なく続く集客導線を作る、寄り添い
