import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import FrameworkGuidance from "@/pages/FrameworkGuidance";
import {
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  FileText,
  Crown,
  DoorOpen,
  Eye,
  Flame,
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Mail,
  Gift,
  Clock3,
  MapPin,
  BadgeDollarSign,
} from "lucide-react";

const obsessions = {
  humility: {
    name: "卑微之門",
    short: "卑微",
    free: "你很容易把自己的價值交給別人的反應決定。你不是沒有力量，而是太習慣先縮小自己，換取安全與被接納。",
    ritual: "我不再用縮小自己換取被愛。我允許自己的存在，本身就有價值。",
  },
  failure: {
    name: "挫敗之門",
    short: "挫敗",
    free: "你不是不努力，而是過去的挫敗讓你開始懷疑自己的推進能力。你需要的不是再逼自己，而是重新建立可完成的行動感。",
    ritual: "我允許自己重新開始。過去的失敗，不再定義我的下一步。",
  },
  control: {
    name: "控制之門",
    short: "控制",
    free: "你很需要掌控局面，因為未知會讓你不安。你真正渴望的不是控制一切，而是即使不可控，也能相信自己接得住。",
    ritual: "我允許事情不完全照我預期發生，但我仍然可以穩定在自己之中。",
  },
  perfection: {
    name: "完美主義之門",
    short: "完美主義",
    free: "你對自己有很高標準，但這份標準有時不是讓你成長，而是讓你遲遲不敢完成與交付。",
    ritual: "我允許不完美的版本先出現。完成，是我開始信任自己的方式。",
  },
  rigidity: {
    name: "剛硬心之門",
    short: "剛硬心",
    free: "你習慣靠理性、堅強與距離保護自己。你不是沒有感受，而是太早學會把感受關起來。",
    ritual: "我願意柔軟，但不代表我會失去力量。真正的穩，是能打開也能守住。",
  },
  mask: {
    name: "面具之門",
    short: "面具",
    free: "你很懂得扮演該有的樣子，但內在有一部分已經厭倦了繼續演。你正在被召喚回到更真實的自己。",
    ritual: "我不再只用角色活著。我允許真實的自己，被看見、被理解、被承接。",
  },
};

const archetypes = {
  suppressor: {
    name: "壓抑者",
    en: "The Suppressor",
    free: "你習慣先把感受壓下來，讓自己看起來穩定。但你真正需要的不是繼續忍，而是讓情緒被安全地看見。",
    premium: "完整報告會拆解：你的情緒壓抑模式、身體警訊、關係中的沉默代價，以及安全釋放練習。",
  },
  controller: {
    name: "控制者",
    en: "The Controller",
    free: "你透過掌控細節來抵抗不安。你有很強的判斷力，但若過度控制，會讓生命失去流動。",
    premium: "完整報告會拆解：控制慣性、焦慮觸發點、權力與信任議題，以及鬆手而不失控的練習。",
  },
  avoider: {
    name: "逃避者",
    en: "The Avoider",
    free: "你知道問題存在，但常常選擇先離開、延後或淡化。你不是懶，而是害怕真正面對後必須改變。",
    premium: "完整報告會拆解：你正在逃避的核心代價、拖延循環、關係切斷模式，以及第一個面對行動。",
  },
  performer: {
    name: "表演者",
    en: "The Performer",
    free: "你擅長呈現有能力、有魅力、有價值的一面，但內在可能很累，因為你不確定若不表現，是否仍被愛。",
    premium: "完整報告會拆解：形象依賴、認同成癮、社群表現壓力，以及真實影響力的建立。",
  },
  eruptor: {
    name: "失控者",
    en: "The Eruptor",
    free: "你平常可能忍很久，但一旦超過臨界點就會爆發。這不是情緒太多，而是情緒太久沒有被聽見。",
    premium: "完整報告會拆解：爆發前兆、壓抑累積點、衝突修復方式，以及情緒能量轉化練習。",
  },
  fader: {
    name: "消失者",
    en: "The Fader",
    free: "當壓力太大或關係太近時，你會不自覺退場。你的消失其實是一種自我保護。",
    premium: "完整報告會拆解：退場模式、親密恐懼、失聯與斷訊背後的需求，以及重新連結的安全步驟。",
  },
  hollow: {
    name: "空洞者",
    en: "The Hollow Man",
    free: "你可能外在正常運作，但內在有一種空、麻、無感。這代表你的靈魂正在提醒你：你不能再只靠功能活著。",
    premium: "完整報告會拆解：空洞感來源、生命意義斷線、麻木防衛，以及重新連回渴望的書寫練習。",
  },
  awakened: {
    name: "觀察者",
    en: "The Observer",
    free: "你擅長看見模式、抽離觀察，也知道自己不能再用舊方式活。你的課題不是看得更清楚，而是把觀察落成選擇與行動。",
    premium: "完整報告會拆解：你的觀察慣性、行動延遲點、身份重塑路徑，以及下一階段落地行動地圖。",
  },
};

const outerArchetypes = {
  strategic: {
    name: "理性決策者",
    en: "The Strategic Self",
    mask: "你以為自己只是理性、謹慎、需要想清楚再行動。",
    truth: "但你的理性，有時其實是在替不安找一個合理的名字。",
  },
  charismatic: {
    name: "有魅力的表現者",
    en: "The Charismatic Self",
    mask: "你以為自己只是擅長表達、會掌握氣氛、懂得呈現價值。",
    truth: "但你越會表現，越容易忘記：不表現的你，也值得被留下。",
  },
  independent: {
    name: "獨立冷靜者",
    en: "The Independent One",
    mask: "你以為自己只是成熟、冷靜、不想麻煩別人。",
    truth: "但你的獨立，有時是在避免讓真正的脆弱被人靠近。",
  },
  free: {
    name: "自由隨性者",
    en: "The Free Spirit",
    mask: "你以為自己只是需要空間、不喜歡被限制。",
    truth: "但你的自由，有時是在逃開真正需要承擔的選擇。",
  },
  agreeable: {
    name: "好相處的人",
    en: "The Agreeable Self",
    mask: "你以為自己只是體貼、懂事、善於配合別人。",
    truth: "但你越好相處，越可能把自己的需要藏到沒有人看見。",
  },
  seeker: {
    name: "觀察追尋者",
    en: "The Observing Seeker",
    mask: "你以為自己已經看懂很多，也能冷靜觀察自己的狀態。",
    truth: "但真正的觀察不是停在理解，而是把看見的東西活出來。",
  },
};

const outerMap = {
  controller: "strategic",
  performer: "charismatic",
  suppressor: "independent",
  avoider: "free",
  fader: "agreeable",
  hollow: "independent",
  eruptor: "strategic",
  awakened: "seeker",
};

const painMatrix = {
  "strategic-controller-humility": {
    light: "你很會照顧局面，但有時候你把自己的需要排到最後，像是只要事情順了，你就可以晚一點再管自己。",
    medium: "你總是在安排所有人，卻很少停下來問自己：那我呢？",
    heavy: "你把所有人的期待都放進計畫裡，卻把自己排除在外。你以為這叫負責，其實是害怕承認：你也需要被照顧。",
  },
  "strategic-controller-failure": {
    light: "你很怕事情做不好，所以會先想很多、算很多，像是只要推演夠完整，就不會再失敗。",
    medium: "你不是怕失敗。你是怕努力後，再一次證明自己不夠好。",
    heavy: "你一直把失敗想像得很嚴重，所以寧可把每一步都控制到安全。可是真正困住你的不是失敗，而是你不相信自己承受得住失敗後的自己。",
  },
  "strategic-controller-control": {
    light: "你很習慣把事情想清楚再行動，但有時候你其實是在延後面對不確定。",
    medium: "你以為你在做理性判斷，但你其實是在用控制，避免自己面對失控。",
    heavy: "你以為自己是在負責，其實你只是太害怕失去掌控。因為一旦事情超出預期，你就會被迫面對那個不知道該怎麼辦的自己。",
  },
  "strategic-controller-perfection": {
    light: "你很在意開始的品質，所以常常需要等條件更完整、想法更清楚，才願意往前。",
    medium: "你一直在等最好的時機。結果最常錯過的，就是時機本身。",
    heavy: "你把準備做得很像進度，其實很多時候，你只是用更完整的計畫，延後真正交出去的那一刻。",
  },
  "strategic-controller-rigidity": {
    light: "你看起來很穩，也很會處理問題，但你很少允許自己露出不知道怎麼辦的樣子。",
    medium: "你很會撐。但你已經撐到忘記：被接住也是一種能力。",
    heavy: "你一直把脆弱視為風險，所以只能讓自己更硬、更冷、更像什麼都能扛。可是你越不讓自己倒下，越沒有人知道你其實快撐不住了。",
  },
  "strategic-controller-mask": {
    light: "你習慣讓自己看起來很有把握，即使心裡其實也有不確定。",
    medium: "你很怕別人發現，原來你也有不知道怎麼辦的時候。",
    heavy: "你最不想被看見的，不是失敗，而是那個其實也會慌、也會亂、也會沒有答案的自己。所以你用冷靜維持形象，用掌控包裝不安。",
  },

  "charismatic-performer-humility": {
    light: "你很努力讓自己被看見，但有時候你心裡其實只是很怕自己不夠重要。",
    medium: "你一直努力發光。因為你害怕：不夠亮，就沒人看見你。",
    heavy: "你把被喜歡、被稱讚、被需要當成存在感的證明。可是一旦沒有人回應，你就開始懷疑：是不是我其實沒有那麼值得被留下。",
  },
  "charismatic-performer-failure": {
    light: "你很在意自己的表現，一旦做不好，就容易把事情的失誤變成對自己的否定。",
    medium: "每次做不好，你否定的不是事情，而是整個自己。",
    heavy: "你不是不能失敗，而是太習慣把失敗解讀成『我不夠好』。所以每次跌倒，你痛的不是結果，是那個又被證明不值得的自己。",
  },
  "charismatic-performer-control": {
    light: "你很會掌握氣氛，也很在意別人怎麼看你，因為那會影響你對自己的感覺。",
    medium: "你想掌控別人對你的看法。於是活得越來越不像自己。",
    heavy: "你一直在調整自己的樣子，好讓別人喜歡、認同、留下。可是你越能掌控形象，就越難確認：別人喜歡的是你，還是你演出來的版本。",
  },
  "charismatic-performer-perfection": {
    light: "你對自己要求很高，總想把狀態、能力、形象都做到更好。",
    medium: "你一直在升級自己，卻很少允許自己停下來喘口氣。",
    heavy: "你把自己活成一個永遠不能掉漆的版本。你看起來越好，內在越累，因為你不敢讓別人看見那個還沒準備好的自己。",
  },
  "charismatic-performer-rigidity": {
    light: "你看起來自信、有精神，但很多時候，你只是很會把脆弱收起來。",
    medium: "你看起來自信。其實很多委屈，只是沒有說出來。",
    heavy: "你用光鮮、幽默、能力，把那些真正受傷的地方蓋住。久了以後，大家都以為你很好，只有你知道自己其實很累。",
  },
  "charismatic-performer-mask": {
    light: "你很擅長呈現自己，但有時候你也會懷疑，哪一個才是真的你。",
    medium: "你越會表現，越容易依賴別人的反應來確認自己的價值。",
    heavy: "你最害怕的從來不是失敗。而是有一天，別人發現真實的你，沒有你表現出來的那麼好。所以你不停證明、不停努力、不停維持，直到連你自己都忘了，到底哪一個才是真的你。",
  },

  "agreeable-fader-humility": {
    light: "你很會顧及他人，但有時候你會忽略自己的位置。",
    medium: "你越讓別人舒服，你就越容易消失在關係裡。",
    heavy: "你一直在等別人選擇你。所以習慣體諒、配合、退讓。最後連自己都忘了：你也值得被選擇。",
  },
  "agreeable-fader-failure": {
    light: "你不是沒有期待，只是每次失望之後，你會更習慣把自己退後一點。",
    medium: "每一次失望，都讓你退得更後面一點。",
    heavy: "你不是突然變得安靜，而是一次又一次期待落空後，開始學會不要期待。你退得越後面，就越不會再被拒絕，也越不會被真正看見。",
  },
  "agreeable-fader-control": {
    light: "你很怕關係太近後失去空間，所以會用退一步來讓自己安全一點。",
    medium: "你不是不想靠近。你只是害怕靠近後失去自己。",
    heavy: "你一邊渴望被靠近，一邊又害怕被吞沒。所以你用消失保護自己，用距離維持掌控，最後卻讓真正想靠近你的人，也找不到你。",
  },
  "agreeable-fader-perfection": {
    light: "你常常想等自己更好一點、狀態更穩一點，再真正站出來。",
    medium: "你一直在等準備好。於是人生一直停在預備位置。",
    heavy: "你把『還沒準備好』當成退場理由。可是真正讓你沒有開始的，不是不夠好，而是你害怕一旦站出來，就再也不能躲回沒有人注意的位置。",
  },
  "agreeable-fader-rigidity": {
    light: "你常說自己習慣一個人，但那不一定是你真的不需要人。",
    medium: "你說自己習慣一個人。其實你只是習慣失望。",
    heavy: "你把需要藏得很深，把想靠近說成沒關係。久了以後，連你自己都分不清楚：你是真的獨立，還是已經不敢再期待有人會接住你。",
  },
  "agreeable-fader-mask": {
    light: "你很會讓自己看起來沒事，即使心裡其實很在意。",
    medium: "你最會做的事，就是假裝沒關係。",
    heavy: "你總是把失落包成懂事，把委屈包成體諒，把想要包成算了。你不是沒有需求，只是太習慣戴上好相處的面具。",
  },

  "independent-hollow-humility": {
    light: "你常把注意力放在別人身上，久了以後，自己的感受反而變得很遠。",
    medium: "你一直把注意力放在別人身上，卻很久沒有問自己：我真正想要的是什麼？",
    heavy: "你不是沒有需要，而是太久沒有把自己算進去。你照顧了很多人、配合了很多事，最後卻發現最陌生的人變成你自己。",
  },
  "independent-hollow-failure": {
    light: "你看起來可以自己處理很多事，但內在其實已經有一部分失去熱度。",
    medium: "你不是沒有想要，只是過去的挫敗讓你開始練習不期待。",
    heavy: "你一直在做的，是假裝自己不想要，這樣就不用再承認自己曾經很失望。",
  },
  "independent-hollow-control": {
    light: "你看起來很冷靜，像是已經放下了很多事，但那不一定是真的放下。",
    medium: "你以為自己已經放下了。其實你只是用麻木，代替面對。",
    heavy: "你把感覺關掉，以為這樣就不會再痛。可是麻木不是自由，它只是讓你暫時不用承認：有些事其實你還在乎。",
  },
  "independent-hollow-perfection": {
    light: "你常常等感覺對了、狀態好了，再開始做真正想做的事。",
    medium: "你一直在等感覺對了再開始。結果人生過去了，你還站在原地等感覺。",
    heavy: "你不是沒有方向，而是把開始條件設得太高。於是你用等待保護自己，也用等待慢慢耗掉原本還有熱度的渴望。",
  },
  "independent-hollow-rigidity": {
    light: "你不是沒感覺，只是很習慣把感覺放到很後面。",
    medium: "你不是沒感覺。你只是太習慣告訴自己：撐一下就過去了。",
    heavy: "你把很多東西都撐過去了，但也把自己撐到越來越無感。你不是沒有靈魂，是太久沒有允許自己真的有感覺。",
  },
  "independent-hollow-mask": {
    light: "你看起來過得還可以，但內在不一定真的有感覺。",
    medium: "你已經很久沒有問自己快不快樂，只剩下看起來過得不錯。",
    heavy: "你把生活維持得很正常，把自己整理得很像沒事。可是你心裡知道，有些日子你不是在活著，只是在把該做的事做完。",
  },

  "seeker-awakened-humility": {
    light: "你已經看見自己常把別人放前面，但真正要把自己放回來，還是很不容易。",
    medium: "你已經知道自己總把別人放前面。但知道，不代表做得到。",
    heavy: "你不是不知道自己在委屈，也不是沒有覺察。真正困難的是：你看見了，卻還是一次次選擇讓別人比較重要。",
  },
  "seeker-awakened-failure": {
    light: "你開始看見自己的模式，但對於改變是否真的有用，心裡仍然有懷疑。",
    medium: "你開始看見自己的模式。但內心還是有個聲音告訴你：改了又有什麼用？",
    heavy: "你不是沒有覺察，而是過去太多次失望，讓你開始懷疑轉化本身。你看得越清楚，越害怕最後只是再失望一次。",
  },
  "seeker-awakened-control": {
    light: "你很會分析自己，也很會拆解原因，但有時候分析會讓你暫時不用行動。",
    medium: "你很會分析自己。但分析久了，有時只是另一種拖延。",
    heavy: "你把自己分析得很清楚，卻遲遲沒有做出不同選擇。你以為你在理解自己，其實有時只是用理解，延後真正改變。",
  },
  "seeker-awakened-perfection": {
    light: "你已經觀察到很多，但還在找更好的開始方式。",
    medium: "你一直在觀察與理解，但還沒有真的讓改變發生。",
    heavy: "你一直在做的，是用『我看見了』，取代『我真的做了』。",
  },
  "seeker-awakened-rigidity": {
    light: "你知道自己很累，但還是會習慣把感受收起來，繼續往前。",
    medium: "你知道自己很累。但你還是習慣對自己說：再撐一下。",
    heavy: "你已經看見自己在硬撐，卻還是很難停下來。因為真正讓你害怕的不是累，而是一旦放鬆，你不知道自己會不會整個垮掉。",
  },
  "seeker-awakened-mask": {
    light: "你知道自己有些樣子是演出來的，但要真的放下，仍然不容易。",
    medium: "你知道自己戴著面具。但知道，不等於放下。",
    heavy: "你已經看見自己在扮演，也知道真正的你被藏起來了。可是你還是害怕：如果不再演，會不會連原本留下的人也離開。",
  },

  "independent-suppressor-humility": {
    light: "你很會把自己的需要放小，像是只要不麻煩別人，就比較安全。",
    medium: "你總是先忍下來，因為你怕一開口，就變成別人的負擔。",
    heavy: "你把懂事練到像本能，把委屈吞到沒有人看見。久了以後，你不是沒有需求，而是連自己都不敢承認：我其實也想被照顧。",
  },
  "independent-suppressor-failure": {
    light: "你受挫後不太會喊痛，反而會安靜地把期待收回去。",
    medium: "每一次失敗後，你不是重新相信自己，而是更用力告訴自己：不要再期待了。",
    heavy: "你不是不想再試，而是太怕又一次失望，所以先把想要壓下去。你看起來很冷靜，其實只是把希望關得很深。",
  },
  "independent-suppressor-control": {
    light: "你表面上很配合，但心裡其實常常在壓住自己的不安。",
    medium: "你不是沒有意見，而是害怕一說出口，事情就會失控。",
    heavy: "你把情緒關起來，讓場面看起來和平。可是你越不說，內在越緊，最後真正失控的，反而是那個一直被你壓住的自己。",
  },
  "independent-suppressor-perfection": {
    light: "你很怕自己做得不夠好，所以常常先把壓力吞下來。",
    medium: "你不是做不好，而是太怕不夠好，所以很多事還沒開始就先卡在心裡。",
    heavy: "你把標準放得很高，又不允許自己脆弱。於是你一邊想做好，一邊把害怕藏起來，最後不是完成，而是被壓力困在原地。",
  },
  "independent-suppressor-rigidity": {
    light: "你習慣讓自己穩住，但有時候這份穩，是壓住感受換來的。",
    medium: "你最常說的一句話是：我沒事。但真正有事的人，往往就是那個一直說沒事的人。",
    heavy: "你一直在做的，是用『我沒事』，讓所有人，包括你自己，都忽略你。你越能撐，別人越看不見你其實早就累了。",
  },
  "independent-suppressor-mask": {
    light: "你習慣表現成熟、穩定、懂事，但不代表你真的不需要被理解。",
    medium: "你習慣表現成熟。但成熟久了，連脆弱都變得不會了。",
    heavy: "你把自己包裝成不需要麻煩別人的人。可是那個真正想被抱住、想被聽見、想被允許脆弱的你，已經被你藏太久了。",
  },

  "free-avoider-humility": {
    light: "你常常先退一步，讓別人舒服一點，也讓自己不用承認真正想要什麼。",
    medium: "你不是沒有需要，只是太習慣用離開，避免自己的需要被拒絕。",
    heavy: "你用退開保護自己，因為只要你不開口、不要求、不靠近，就不會被證明自己不重要。可是真正被你放棄的，往往是你自己。",
  },
  "free-avoider-failure": {
    light: "你不是不想開始，只是只要想到可能失敗，就會想先放一放。",
    medium: "你常常不是敗在能力，而是敗在還沒投入前，就先替自己撤退。",
    heavy: "你把『再等等』說得很像選擇，其實很多時候，那是你害怕失敗的出口。你沒有輸在結果，而是輸在一次次還沒開始就先離場。",
  },
  "free-avoider-control": {
    light: "你很重視自由，但有些選擇你其實一直沒有真正做出來。",
    medium: "你說你要空間，但其實是在避開那些一旦選擇就無法回頭的決定。",
    heavy: "你一直在做的，是用『自由』，讓自己不用負責。你不是不想要，只是太怕一旦承認想要，就必須真的做出選擇。",
  },
  "free-avoider-perfection": {
    light: "你常常想等狀態更好、條件更完整，再真正開始。",
    medium: "你一直在等一個更好的時機，但很多時候，那只是拖延穿上的好看外衣。",
    heavy: "你把準備當成安全區，把還沒開始當成不會失敗。可是你越等完美，越把自己留在一個永遠不必面對結果的位置。",
  },
  "free-avoider-rigidity": {
    light: "你不太喜歡被情緒綁住，所以會選擇冷掉、淡掉、先走開。",
    medium: "你看起來很灑脫，其實只是太習慣在受傷前先把自己關起來。",
    heavy: "你用冷淡保護自己，用距離證明自己不在乎。可是真正的你不是沒感覺，而是太怕感覺一旦打開，就再也收不回來。",
  },
  "free-avoider-mask": {
    light: "你看起來很自由、很隨性，但不代表你真的沒有在逃。",
    medium: "你把不在乎演得很好，因為承認在乎，會讓你變得太容易受傷。",
    heavy: "你最會裝作無所謂，好像什麼都可以放掉。可是你心裡知道，有些離開不是自由，而是你不敢留下來面對真正的自己。",
  },

  "strategic-eruptor-humility": {
    light: "你平常很會忍讓，但當你覺得自己一直被忽略時，情緒會突然衝出來。",
    medium: "你不是突然爆炸，而是太久把自己的委屈放到最後。",
    heavy: "你一直退、一直忍、一直說沒關係，直到某一刻再也裝不下去。你爆發的不是脾氣，而是那個長期不被重視的自己。",
  },
  "strategic-eruptor-failure": {
    light: "你對失敗很敏感，壓力一累積，就容易用情緒反應保護自己。",
    medium: "你不是不能接受失敗，而是每次失敗都像在打回那個不夠好的自己。",
    heavy: "你一邊害怕失敗，一邊又討厭自己害怕。最後情緒爆出來時，你真正攻擊的不是別人，而是那個又一次讓你失望的自己。",
  },
  "strategic-eruptor-control": {
    light: "你看起來很有判斷力，但只要事情不受控，內在壓力就會快速升高。",
    medium: "你越想控制局面，越容易在失控時被情緒反過來控制。",
    heavy: "你把所有變數都想抓住，因為你怕一放手就會崩掉。可是你壓得越緊，爆發時越猛烈，最後真正失控的反而是你自己。",
  },
  "strategic-eruptor-perfection": {
    light: "你很想把事情做好，所以當現實不如預期時，情緒會特別容易被點燃。",
    medium: "你不是只是在生氣，而是在對那個沒有做到完美的自己失望。",
    heavy: "你對自己要求太高，又不允許過程有失誤。於是每一次不完美，都像在挑戰你的價值，最後只能用爆發替壓力找出口。",
  },
  "strategic-eruptor-rigidity": {
    light: "你看起來很有判斷力，但壓力累積到某個點時，你會突然失去平衡。",
    medium: "你不是突然爆發，而是太久沒有允許自己誠實表達。",
    heavy: "你一直在做的，是把委屈壓到最後，再讓失控替你說話。你不是情緒太多，而是太久沒有讓情緒有正常出口。",
  },
  "strategic-eruptor-mask": {
    light: "你平常可能把狀態維持得很好，但越是維持，越容易在某個瞬間撐不住。",
    medium: "你看起來很能掌控自己，其實很多情緒只是被你藏到最後一刻。",
    heavy: "你努力讓自己看起來穩、強、沒問題。可是一旦面具裂開，所有被壓住的委屈、憤怒和失望，就會一次衝出來替你說話。",
  },
};

const loopScripts = {
  "avoider-control": "不確定出現 → 開始分析 → 越想越怕 → 延後處理 → 暫時鬆一口氣 → 問題變大 → 更想逃開。",
  "performer-mask": "被期待 → 開始表現 → 得到認同 → 害怕失去形象 → 更用力維持 → 內在越來越累。",
  "suppressor-rigidity": "受傷 → 壓下來 → 表面沒事 → 身體與關係開始緊繃 → 更不敢說 → 情緒更深地卡住。",
  "controller-control": "變數出現 → 焦慮升高 → 想掌控所有細節 → 他人感到壓力 → 關係更失控 → 你更焦慮。",
  "hollow-failure": "想開始 → 想起失敗 → 自我否定 → 失去行動力 → 沒有成果 → 再次證明自己不行。",
  "fader-humility": "想靠近 → 害怕不被選擇 → 降低需求 → 慢慢退場 → 對方更看不見你 → 你更確定自己不重要。",
  "eruptor-rigidity": "忍耐 → 壓抑 → 假裝沒事 → 累積到臨界點 → 爆發 → 後悔 → 繼續壓抑。",
  "awakened-perfection": "看見問題 → 想觀察得更完整 → 遲遲不開始 → 內疚 → 再分析更多 → 仍然沒有真正改變。",
};

const futureCosts = {
  control: "如果你繼續只靠控制換安全，你會得到短暫穩定，卻失去真正的信任、流動與生命機會。",
  mask: "如果你繼續只用角色換認同，你會越來越有魅力，卻越來越不知道誰真正愛的是你。",
  rigidity: "如果你繼續只靠剛硬保護自己，你會看起來很強，但親密、感受與創造力會慢慢離你而去。",
  failure: "如果你繼續讓過去失敗定義自己，你不是不會成功，而是會連開始的權利都交出去。",
  humility: "如果你繼續縮小自己換取關係，你會留住一些人，卻弄丟最需要被你守住的自己。",
  perfection: "如果你繼續等待完美才開始，你的人生會累積很多想法，卻缺少真正改變命運的作品。",
};

const premiumAngles = {
  control: "完整報告會幫你拆開：你的焦慮來源、控制慣性、決策卡點，以及如何在不可控中建立真正的穩。",
  mask: "完整報告會幫你拆開：你的角色慣性、被看見恐懼、認同依賴，以及如何從形象影響力走向真實影響力。",
  rigidity: "完整報告會幫你拆開：你的防衛模式、情緒封閉、關係距離，以及如何柔軟但不失去力量。",
  failure: "完整報告會幫你拆開：你的挫敗循環、行動斷點、自我否定，以及重新建立完成感的路徑。",
  humility: "完整報告會幫你拆開：你的低價值感、討好退縮、金錢與關係壓抑，以及如何重新站回自己的位置。",
  perfection: "完整報告會幫你拆開：你的完美拖延、比較焦慮、交付恐懼，以及如何用版本一開始重建命運。",
};

const futurePredictions = {
  control: "如果你什麼都不做，三個月後你大概還是在分析、推演、擔心失控，只是換了一個新的問題讓你繼續焦慮。",
  mask: "如果你什麼都不做，三個月後你可能會更會表現、更會撐場，但也更難分辨別人喜歡的是你，還是你演出來的版本。",
  rigidity: "如果你什麼都不做，三個月後你看起來也許還是很穩，但你的身體、關係與情緒會替你承受那些沒有說出口的東西。",
  failure: "如果你什麼都不做，三個月後你不一定會更失敗，但你很可能會更習慣不開始，然後把那叫做冷靜。",
  humility: "如果你什麼都不做，三個月後你可能還是會把別人的反應放在自己前面，繼續用委屈換取一點點被留下的感覺。",
  perfection: "如果你什麼都不做，三個月後你可能又多懂了很多，但真正交付出去的版本，仍然停在腦中。",
};

const matrix = {
  "avoider-control": "你不是單純逃避，而是透過退開來維持掌控感。當事情不可預測，你會用消失、延後或轉移焦點來保護自己。",
  "performer-mask": "你不是只想表現，而是把被喜歡與被需要當成安全感來源。你需要從形象影響力，轉向真實影響力。",
  "suppressor-rigidity": "你用壓抑與堅強保護自己。你看起來很穩，但內在其實需要被允許柔軟。",
  "controller-control": "你的控制不是強勢，而是深層焦慮的外化。你越怕失控，越容易把自己與他人都逼緊。",
  "hollow-failure": "你的空洞感常來自長期挫敗後的自我斷線。不是你沒有熱情，而是你不敢再全心投入。",
  "fader-humility": "你會消失，是因為你不確定自己是否值得被留下。你需要重新確認：你的存在不需要靠討好證明。",
  "eruptor-rigidity": "你的爆發來自長期封閉與忍耐。失控不是問題本身，而是內在太久沒有出口。",
  "awakened-perfection": "你看見了更高版本的自己，但完美主義會讓你一直等待最好的時機。真正的觀察，需要落成行動。",
};

const decisionMap = {
  "avoider-control": ["停止再分析", "做一個不確定的決定", "今天直接行動一小步"],
  "performer-mask": ["停止維持形象", "允許不完美被看見", "發一個真實內容"],
  "suppressor-rigidity": ["停止壓抑", "說出感受", "對一個人坦白"],
  "controller-control": ["停止過度掌控", "放掉一個控制點", "接受不確定"],
  "hollow-failure": ["停止否定自己", "完成一件小事", "建立行動信心"],
  "fader-humility": ["停止退縮", "選擇留下", "說出你的立場"],
  "eruptor-rigidity": ["停止累積", "提早表達", "說出情緒"],
  "awakened-perfection": ["停止等待", "開始行動", "先做版本1"],
};



const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfgIhKyFPDMSt4NyLHWxoHqJYTz9XVylT4R90lqgZQOJj5mGw/formResponse";

const GOOGLE_FORM_FIELDS = {
  name: "entry.1407072553",
  email: "entry.1917274556",
  outer: "entry.1357505889",
  inner: "entry.1940201517",
  main: "entry.1484495161",
  second: "entry.1748881777",
  intensity: "entry.1727596188",
  report: "entry.931356060",
  coaching: "entry.1636982887",
};

async function submitLeadToGoogleForm(payload) {
  try {
    const formData = new FormData();
    formData.append(GOOGLE_FORM_FIELDS.name, payload.name || "");
    formData.append(GOOGLE_FORM_FIELDS.email, payload.email || "");
    formData.append(GOOGLE_FORM_FIELDS.outer, payload.outer || "");
    formData.append(GOOGLE_FORM_FIELDS.inner, payload.inner || "");
    formData.append(GOOGLE_FORM_FIELDS.main, payload.main || "");
    formData.append(GOOGLE_FORM_FIELDS.second, payload.second || "");
    formData.append(GOOGLE_FORM_FIELDS.intensity, String(payload.intensity || ""));
    formData.append(GOOGLE_FORM_FIELDS.report, payload.report || "");
    formData.append(GOOGLE_FORM_FIELDS.coaching, payload.coaching || "");

    await fetch(GOOGLE_FORM_ACTION_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    return { ok: true };
  } catch (error) {
    console.error("Failed to submit lead to Google Form:", error);
    return { ok: false, error };
  }
}

const questions = [
  // 免費版定位：四階快速版。題目用生活情境篩選，不用療癒圈術語，但底層仍對應外在樣子、內在反應與最容易重複的問題。
  {
    id: "b1",
    stage: "第一階｜你平常怎麼重複同樣的問題",
    title: "每次事情不順時，你最常變成哪種狀態？",
    options: [
      { text: "一直想是不是自己不夠好", obsession: "humility", archetype: "fader", weight: 4 },
      { text: "腦袋停不下來，一直想怎麼補救", obsession: "control", archetype: "controller", weight: 5 },
      { text: "想先躲一下，不想面對", obsession: "failure", archetype: "avoider", weight: 4 },
      { text: "假裝沒事，照樣撐著", obsession: "rigidity", archetype: "suppressor", weight: 5 },
      { text: "開始想控制每個細節", obsession: "control", archetype: "controller", weight: 5 },
      { text: "更努力表現自己，不想被看扁", obsession: "mask", archetype: "performer", weight: 5 },
    ],
  },
  {
    id: "b2",
    stage: "第一階｜你平常怎麼重複同樣的問題",
    title: "當你很在意一件事時，你通常會？",
    options: [
      { text: "一直想很多，卻遲遲不敢開始", obsession: "perfection", archetype: "awakened", weight: 4 },
      { text: "一直確認別人怎麼看我", obsession: "mask", archetype: "performer", weight: 5 },
      { text: "先把情緒壓住，不想影響別人", obsession: "rigidity", archetype: "suppressor", weight: 5 },
      { text: "假裝不在乎，直接放掉", obsession: "failure", archetype: "avoider", weight: 4 },
      { text: "希望事情照自己的方式走", obsession: "control", archetype: "controller", weight: 5 },
      { text: "想做到最好，不想被比較", obsession: "perfection", archetype: "performer", weight: 5 },
    ],
  },
  {
    id: "i1",
    stage: "第二階｜你怎麼保護自己",
    title: "在關係裡，你最怕哪種感覺？",
    options: [
      { text: "對方突然冷掉、不理我", obsession: "humility", archetype: "fader", weight: 5 },
      { text: "我講真話後被嫌棄", obsession: "mask", archetype: "performer", weight: 5 },
      { text: "被管、被限制、沒有空間", obsession: "control", archetype: "avoider", weight: 5 },
      { text: "明明很努力，還是不被重視", obsession: "failure", archetype: "hollow", weight: 5 },
      { text: "一放鬆，事情就失控", obsession: "rigidity", archetype: "controller", weight: 5 },
      { text: "對方看到真正的我後失望", obsession: "mask", archetype: "fader", weight: 6 },
    ],
  },
  {
    id: "i2",
    stage: "第二階｜你怎麼保護自己",
    title: "當你受傷時，你最常？",
    options: [
      { text: "嘴巴說沒事，其實心裡很在意", obsession: "humility", archetype: "suppressor", weight: 5 },
      { text: "突然不想講話、想消失", obsession: "failure", archetype: "fader", weight: 5 },
      { text: "開始想很多、反覆推演", obsession: "control", archetype: "controller", weight: 5 },
      { text: "對別人變冷淡", obsession: "rigidity", archetype: "avoider", weight: 4 },
      { text: "情緒突然爆掉", obsession: "rigidity", archetype: "eruptor", weight: 6 },
      { text: "更努力讓自己看起來很好", obsession: "mask", archetype: "performer", weight: 5 },
    ],
  },
  {
    id: "s1",
    stage: "第三階｜你最怕面對的是什麼",
    title: "哪一句話最容易刺到你？",
    options: [
      { text: "『你好像沒有那麼重要』", obsession: "humility", archetype: "fader", weight: 6 },
      { text: "『你是不是又失敗了？』", obsession: "failure", archetype: "hollow", weight: 6 },
      { text: "『你控制太多了』", obsession: "control", archetype: "controller", weight: 6 },
      { text: "『你明明很想改變，卻總是停在想而已』", obsession: "perfection", archetype: "awakened", weight: 6 },
      { text: "『你太敏感了』", obsession: "rigidity", archetype: "suppressor", weight: 6 },
      { text: "『真正的你，其實沒人會想留下』", obsession: "mask", archetype: "performer", weight: 7 },
    ],
  },
  {
    id: "s2",
    stage: "第三階｜你最怕面對的是什麼",
    title: "你覺得自己最常敗在哪一步？",
    options: [
      { text: "一直拖，等更好的時機", obsession: "perfection", archetype: "awakened", weight: 5 },
      { text: "一直想，卻沒有真的行動", obsession: "control", archetype: "controller", weight: 5 },
      { text: "太怕失敗，所以乾脆不投入", obsession: "failure", archetype: "avoider", weight: 5 },
      { text: "一直顧別人，最後忘了自己", obsession: "humility", archetype: "fader", weight: 5 },
      { text: "把情緒壓到最後一次爆掉", obsession: "rigidity", archetype: "eruptor", weight: 6 },
      { text: "表面過得很好，內心卻很空", obsession: "mask", archetype: "hollow", weight: 6 },
    ],
  },
  {
    id: "h1",
    stage: "第四階｜你準備改變了嗎",
    title: "如果再這樣下去，你最怕變成什麼樣子？",
    options: [
      { text: "一直活成別人期待的樣子", obsession: "humility", archetype: "fader", weight: 6 },
      { text: "明明很努力，卻一直原地打轉", obsession: "failure", archetype: "hollow", weight: 6 },
      { text: "不敢愛，也不敢相信人", obsession: "control", archetype: "avoider", weight: 6 },
      { text: "越來越沒感覺，只剩下撐著", obsession: "rigidity", archetype: "suppressor", weight: 6 },
      { text: "一直知道問題，但從來沒真的改", obsession: "perfection", archetype: "awakened", weight: 6 },
      { text: "有一天突然發現，自己根本沒真正活過", obsession: "mask", archetype: "hollow", weight: 7 },
    ],
  },
];

function addScore(map, key, value) {
  map[key] = (map[key] || 0) + value;
}

function topEntries(map) {
  return Object.entries(map).sort((a, b) => b[1] - a[1]);
}

function getIntensityInsight(score) {
  if (score >= 82) {
    return {
      label: "高壓臨界｜已經不能再只靠想一想撐住",
      headline: "你不是不知道問題，而是已經看太清楚，卻還沒真正穿越。",
      warning: "這個分數代表你的模式已經不是偶爾出現，而是正在影響你的關係、選擇、行動與自我價值。",
      paidReason: "完整報告會直接拆出你最常重複的劇本、觸發點與七日破框行動，避免你只是看懂，卻沒有真正改變。",
    };
  }
  if (score >= 65) {
    return {
      label: "重複劇本｜你已經知道問題，卻還是回到原點",
      headline: "你現在最危險的，不是不知道問題，而是把「想過了」誤以為「改變了」。",
      warning: "你其實已經知道問題常常出在哪裡。但如果沒有真的做出不同選擇，你會一直停在「我知道了」，然後下一次還是回到同樣的反應。",
      paidReason: "完整報告會把你最容易重複的反應轉成具體練習，讓你知道不是再想更多，而是下一步要怎麼做。",
    };
  }
  if (score >= 45) {
    return {
      label: "模式浮現｜你開始發現這不是單次意外",
      headline: "你已經開始發現，很多事不是剛好不順，而是你常常用同一種方式反應。",
      warning: "這個階段最容易覺得只是對方、環境或時機不對，但真正一直重複的，是你面對壓力時的習慣反應。",
      paidReason: "完整報告會幫你辨識外層身份與內在防衛的差異，讓你不再只修表面問題。",
    };
  }
  return {
    label: "開始有感｜你可能還沒承認這是一套模式",
    headline: "你不是沒事，而是你還很會替自己找理由。",
    warning: "這個分數不代表你沒有重複，只是你可能還很會把它解釋成「只是最近比較累」或「只是這次比較特別」。",
    paidReason: "完整報告會幫你先找出最早出現的重複點，避免等到它變成生活慣性後才想處理。",
  };
}

function getConcentrationScore(scoreMap) {
  const entries = Object.values(scoreMap).sort((a, b) => b - a);
  const top = entries[0] || 0;
  const second = entries[1] || 0;
  const totalScore = entries.reduce((sum, value) => sum + value, 0) || 1;
  const topRatio = top / totalScore;
  const gapRatio = (top - second) / Math.max(top, 1);
  return { topRatio, gapRatio };
}

function getSoulConsistency(answers, topObsession, topArchetype) {
  const soulQuestionIds = ["s1", "s2", "h1"];
  const soulAnswers = soulQuestionIds.map((id) => answers[id]).filter(Boolean);
  if (soulAnswers.length === 0) return 0;
  const matchCount = soulAnswers.filter((answer) => answer.obsession === topObsession || answer.archetype === topArchetype).length;
  return matchCount / soulAnswers.length;
}

function calculateIntensity(answers, obsessionScore, archetypeScore, topObsession, topArchetype) {
  const obsession = getConcentrationScore(obsessionScore);
  const archetype = getConcentrationScore(archetypeScore);
  const soulConsistency = getSoulConsistency(answers, topObsession, topArchetype);

  const rawScore =
    obsession.topRatio * 40 +
    archetype.topRatio * 30 +
    soulConsistency * 20 +
    obsession.gapRatio * 10;

  return Math.round(Math.min(100, Math.max(35, rawScore + 25)));
}

function getPainLevel(intensity) {
  if (intensity >= 82) return "heavy";
  if (intensity >= 65) return "medium";
  return "light";
}

function getPainLine(outerKey, topArchetype, topObsession, intensity) {
  const directKey = `${outerKey}-${topArchetype}-${topObsession}`;
  const combo = painMatrix[directKey];
  const level = getPainLevel(intensity);

  if (combo) return combo[level] || combo.medium || combo.light;

  const fallbackByArchetype = {
    controller: "你以為自己只是想把事情做好，但你其實常常在用掌控，避免面對內在的不安。",
    performer: "你以為自己只是有能力、有魅力，但你其實很怕一旦不表現，就沒有人真的留下來。",
    suppressor: "你以為自己只是冷靜成熟，但你其實習慣把感受壓到連自己都聽不見。",
    avoider: "你以為自己只是需要空間，但你其實常常用退開，避開真正需要承擔的選擇。",
    fader: "你以為自己只是好相處，但你其實正在把自己的位置讓到沒有人看見。",
    hollow: "你以為自己只是累了，但你其實已經開始用無感保護自己不再失望。",
    eruptor: "你以為自己只是忍不住爆發，但你其實已經忍太久，久到情緒只能用失控表達。",
    awakened: "你以為自己已經看懂很多，但你其實還在用觀察延後真正的行動。",
  };

  return fallbackByArchetype[topArchetype] || `真正讓你一直重複的不是「${archetypes[topArchetype].name}」，而是你一直用舊方式證明自己還安全。`;
}

function getIdentityGap(outerKey, topArchetype, topObsession) {
  const outer = outerArchetypes[outerKey];
  const archetype = archetypes[topArchetype];
  const obsession = obsessions[topObsession];

  const direct = {
    "strategic-controller-control": "你一直以為自己只是理性、謹慎、在做正確決策。但其實很多時候，你不是在選擇，而是在避免不確定。",
    "charismatic-performer-mask": "你一直以為自己只是擅長表達、懂得呈現價值。但其實你也在用表現，確認自己是否仍然值得被喜歡。",
    "independent-suppressor-rigidity": "你一直以為自己只是成熟、冷靜、不想麻煩別人。但其實你也在用壓抑，讓自己看起來不需要任何人。",
    "free-avoider-control": "你一直以為自己只是需要空間、不喜歡被限制。但其實你也在用自由，避開那些需要承擔後果的選擇。",
    "agreeable-fader-humility": "你一直以為自己只是體貼、好相處、懂得配合。但其實你也在慢慢把自己的需求移出關係。",
    "seeker-awakened-perfection": "你一直以為自己正在成長、正在觀察。但其實你也可能停在理解，而不是進入真正的改變。",
  };

  return direct[`${outerKey}-${topArchetype}-${topObsession}`] || `你外在呈現的是「${outer.name}」，內在運作卻更接近「${archetype.name}」。這不是矛盾，而是你為了避開「${obsession.name}」所形成的保護方式。`;
}

function getResult(answers) {
  const obsessionScore = {};
  const archetypeScore = {};

  Object.values(answers).forEach((answer) => {
    if (!answer) return;
    addScore(obsessionScore, answer.obsession, answer.weight);
    addScore(archetypeScore, answer.archetype, answer.weight);
  });

  const topObsession = topEntries(obsessionScore)[0]?.[0] || "control";
  const secondObsession = topEntries(obsessionScore)[1]?.[0] || "mask";
  const topArchetype = topEntries(archetypeScore)[0]?.[0] || "awakened";
  const secondArchetype = topEntries(archetypeScore)[1]?.[0] || "controller";
  const intensity = calculateIntensity(answers, obsessionScore, archetypeScore, topObsession, topArchetype);
  const matrixKey = `${topArchetype}-${topObsession}`;
  const outerKey = outerMap[topArchetype] || outerMap[secondArchetype] || "strategic";

  return {
    topObsession,
    secondObsession,
    topArchetype,
    secondArchetype,
    outerKey,
    intensity,
    matrixText:
      matrix[matrixKey] ||
      `你的主要狀態是「${archetypes[topArchetype].name}」遇上「${obsessions[topObsession].name}」。這代表你的行為反應背後，有一股更深的執念動力正在推動你。`,
    painLine: getPainLine(outerKey, topArchetype, topObsession, intensity),
    identityGap: getIdentityGap(outerKey, topArchetype, topObsession),
    loopScript:
      loopScripts[matrixKey] ||
      `${obsessions[topObsession].short}被觸發 → ${archetypes[topArchetype].name}開始反應 → 暫時安全 → 長期停在同一個地方 → 再次回到同一個生命劇本。`,
    futureCost: futureCosts[topObsession] || "如果你繼續用舊模式保護自己，你會得到熟悉的安全感，卻錯過真正的轉化。",
    premiumHook: premiumAngles[topObsession] || "完整報告會把你的主副執念轉成具體練習。",
    futurePrediction:
      futurePredictions[topObsession] ||
      "如果你什麼都不做，三個月後你大概還會在同一個地方，只是換一個故事再重來一次。",
    obsessionScore,
    archetypeScore,
  };
}

function SectionLabel({ icon: Icon, children, tone = "stone" }) {
  const color = tone === "amber" ? "text-amber-200" : tone === "red" ? "text-red-200" : "text-stone-300";
  return (
    <div className={`mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.22em] ${color}`}>
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}

function ScoreBar({ label, value, max }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm text-stone-300">
        <span>{label}</span>
        <span className="text-amber-200">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-800">
        <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-stone-100" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function IntensityBlock({ score, insight, futurePrediction }) {
  const levels = [
    {
      range: "0–44",
      min: 0,
      max: 44,
      text: "模式剛成形 → 你還在替自己找理由",
      punch: "你現在還在「替自己找理由」的區間。",
    },
    {
      range: "45–64",
      min: 45,
      max: 64,
      text: "模式浮現 → 開始影響選擇",
      punch: "你已經在重複同一套劇本，只是還不願意承認。",
    },
    {
      range: "65–81",
      min: 65,
      max: 81,
      text: "模式固定 → 你知道問題卻還在重複",
      punch: "你在『看懂但不改』的區間。",
    },
    {
      range: "82–100",
      min: 82,
      max: 100,
      text: "模式主導 → 已經在影響人生走向",
      punch: "這個模式，正在替你做決定。",
    },
  ];

  const isActiveLevel = (level) => score >= level.min && score <= level.max;
  const active = levels.find(isActiveLevel) || levels[2];

  return (
    <div className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-950/25 to-black/20 p-6">
      <SectionLabel icon={AlertTriangle} tone="amber">
        轉化強度｜這套反應重複得有多深
      </SectionLabel>
      <div className="mb-4 flex items-end gap-3">
        <span className="text-5xl font-semibold tracking-[-0.06em] text-amber-100">{score}</span>
        <span className="pb-1 text-sm text-stone-500">/ 100</span>
      </div>
      <div className="mb-5 rounded-xl border border-red-400/25 bg-red-950/15 p-4">
        <p className="text-lg font-semibold leading-8 text-red-100">{active.punch}</p>
      </div>

      <div className="mb-5 rounded-xl border border-amber-300/15 bg-black/20 p-4">
        <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-amber-100">分數說明</p>
        <p className="text-sm leading-7 text-stone-400">
          這份分數看的不是你有多好或多差，而是當壓力、關係與重要選擇出現時，你有多容易回到同一套反應。
        </p>
        <p className="mt-3 text-sm leading-7 text-stone-400">
          分數越高，代表這套模式越熟悉、越自動，也越容易影響你的關係、決策與人生方向。
        </p>
      </div>

      <div className="grid gap-3 text-sm leading-7">
        {levels.map((level) => (
          <div key={level.range} className={`rounded-xl border p-3 ${isActiveLevel(level) ? "border-amber-300/30 bg-amber-950/20" : "border-stone-800 bg-black/25"}`}>
            <span className={isActiveLevel(level) ? "text-amber-200" : "text-stone-500"}>{level.range}</span>｜{level.text}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-stone-800 bg-black/20 p-4">
        <p className="text-xs leading-6 text-stone-500">
          註：這份測驗主要提供給想理解自己為什麼一直重複同樣問題的人，因此大部分人的結果會落在 65 分以上。分數較低不代表沒有問題，而是代表這套反應尚未形成固定慣性，或目前只出現在特定情境中。
        </p>
      </div>

      <h4 className="mt-6 text-2xl font-semibold leading-snug text-stone-50">{insight.headline}</h4>
      <p className="mt-4 text-base leading-8 text-stone-300">{insight.warning}</p>
      <div className="mt-5 rounded-xl border border-amber-300/15 bg-black/25 p-4 text-sm leading-7 text-amber-50/90">
        👉 越高，不代表你更糟，而是代表這件事已經不能再只靠忍、想、撐、拖來處理。
      </div>
      <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-950/15 p-5">
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-red-200">三個月後的你</p>
        <p className="text-lg font-medium leading-9 text-stone-100">{futurePrediction}</p>
      </div>
      <div className="mt-4 rounded-xl border border-amber-300/15 bg-black/25 p-4 text-sm leading-7 text-amber-50/90">
        {insight.paidReason}
      </div>
    </div>
  );
}



function FrameworkGuidancePage() {
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingLine, setBookingLine] = useState("");
  const [bookingFormat, setBookingFormat] = useState("線上");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingNote, setBookingNote] = useState("");
  const [bookingSent, setBookingSent] = useState(false);
  const [bookingError, setBookingError] = useState(false);

  function goBackToResult() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    if (typeof window !== "undefined") window.location.href = "/";
  }

  async function submitGuidanceBooking(event) {
    event.preventDefault();
    setBookingError(false);
    if (!bookingName.trim() || !bookingEmail.includes("@") || bookingEmail.trim().length < 5) {
      setBookingError(true);
      return;
    }

    await submitLeadToGoogleForm({
      name: bookingName,
      email: bookingEmail,
      outer: "破框引導頁",
      inner: "Framework Guidance",
      main: "破框引導預約",
      second: `形式:${bookingFormat || "未填"}｜時段:${bookingTime || "未填"}`,
      intensity: "",
      report: "",
      coaching: `破框引導預約｜LINE:${bookingLine || "未填"}｜形式:${bookingFormat || "未填"}｜希望時段:${bookingTime || "未填"}｜補充:${bookingNote || "未填"}`,
    });

    setBookingSent(true);
  }

  const notItems = [
    ["不是", "心理測驗解析", FileText],
    ["不是", "心靈雞湯", Sparkles],
    ["不是", "快速給答案", Flame],
    ["而是", "一起拆解你的人生模式", DoorOpen],
  ];

  const blueprintItems = [
    ["Alpha 觀察", "看見的不是你的問題，而是你的模式。", Eye],
    ["現實中的保護模式", "從工作、關係、情緒三個面向，看見你如何保護自己。", Lock],
    ["當前課題", "找出你真正需要練習、突破的關鍵課題。", KeyRound],
    ["下一步建議", "具體的停止、選擇、行動練習，幫助你開始改變。", ArrowRight],
  ];

  const flowItems = [
    ["看見", "你如何運作", Eye],
    ["拆解", "你的保護機制", Sparkles],
    ["理解", "執念與模式", Flame],
    ["建立藍圖", "下一步方向", FileText],
  ];

  const goodFit = ["常常重複同樣的問題", "明知道問題在哪卻改不了", "覺得測驗很準，有被說中的感覺", "願意誠實看見自己", "想開始改變但不知道從哪裡開始"];
  const notFit = ["想快速得到標準答案", "不願意自我覺察", "希望別人替自己改變", "只想聽好話，不想面對真相"];

  const pageBg = "bg-[#ECE7DF]";
  const cardBg = "bg-[#F6F0E6]";
  const softCard = "bg-[#EFE7DB]";
  const borderSoft = "border-[#D3C2A9]";

  return (
    <div className={`min-h-screen ${pageBg} text-stone-950 selection:bg-amber-200 selection:text-stone-950`}>
      <header className="sticky top-0 z-40 border-b border-amber-300/10 bg-[#050403]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10 md:py-4">
          <button onClick={() => (window.location.href = "/")} className="flex items-center text-left">
            <img src="/framework-logo.png" alt="Framework Breakers" className="h-[110px] w-auto object-contain md:h-[135px]" />
          </button>
          <nav className="hidden items-center gap-7 text-xs font-medium tracking-[0.2em] text-stone-400 md:flex">
            <button onClick={() => (window.location.href = "/")} className="hover:text-amber-100">測驗</button>
            <span className="text-amber-100">破框引導</span>
            <span className="opacity-50">破框重塑</span>
            <span className="opacity-50">回心之途</span>
          </nav>
          <Button onClick={goBackToResult} className="rounded-xl bg-amber-200 px-5 py-2 text-sm font-semibold text-stone-950 hover:bg-amber-100">
            回到我的結果
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-amber-300/10 bg-[#050403] px-5 py-14 md:px-10 md:py-20">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] md:block">
          <img src="/framework-guidance-hero.png" alt="破框引導光門" className="h-full w-full object-cover object-center brightness-[1.55] contrast-[1.22] saturate-[1.12]" />
          <div className="absolute inset-y-0 right-0 w-[46%] bg-gradient-to-l from-[#050403]/82 via-[#050403]/48 to-transparent" />
          <div className="absolute right-[7%] top-1/2 hidden -translate-y-1/2 text-right md:block">
            <p className="text-2xl font-semibold leading-[2.1] tracking-[0.14em] text-amber-100 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
              每一次破框，<br />
              都始於願意<br />
              誠實看見自己。
            </p>
          </div>
        </div>
        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#050403] via-[#050403]/96 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_69%_45%,rgba(246,213,132,0.14),transparent_21%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="relative z-10">
            <div className="mb-5 inline-flex rounded-full border border-amber-300/20 bg-black/45 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-amber-100">
              測驗結果 ＞ 破框引導
            </div>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-[2.75rem] font-semibold leading-[1.04] tracking-[-0.055em] text-stone-50 md:text-7xl">
              你已經看見
              <br />
              自己如何運作
            </motion.h1>
            <p className="mt-4 text-xl font-medium leading-9 text-amber-100 md:text-2xl">但真正的改變，從理解這些模式開始。</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
              破框引導不是告訴你答案，而是透過 60 分鐘深度對談，幫助你看見：你的人生究竟是如何運作的。
            </p>
            <div className="mt-6 grid max-w-2xl gap-3 text-sm leading-7 text-stone-300">
              {[
                "完整重複劇本與觸發點",
                "關係與情緒中的自我保護模式",
                "真正讓你一直重複的原因",
                "下一階段需要突破的方向",
              ].map((item) => (
                <p key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-amber-50/90">
              {[
                ["60分鐘深度引導", Eye],
                ["線上 / 實體", DoorOpen],
                ["專屬個人破框藍圖", FileText],
              ].map(([text, Icon]) => (
                <div key={text} className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/45 px-4 py-2">
                  <Icon className="h-4 w-4 text-amber-200" />
                  {text}
                </div>
              ))}
            </div>
            <a href="#booking" className="mt-8 inline-block">
              <Button className="rounded-xl bg-amber-200 px-8 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                我想停止一直重複
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
          <div className="relative z-10 hidden min-h-[540px] md:block" aria-hidden="true" />
        </div>
      </section>

      <main className={`${pageBg} text-stone-950`}>
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-10">
          <div className="mb-9 flex items-center justify-center gap-5">
            <span className="h-px w-20 bg-[#cdbd9f]" />
            <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] md:text-4xl">這不是心理測驗解說</h2>
            <span className="h-px w-20 bg-[#cdbd9f]" />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {notItems.map(([label, text, Icon], index) => (
              <div key={text} className={`rounded-2xl border ${borderSoft} ${cardBg} p-6 text-center shadow-sm`}>
                <div className={`mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full ${index === 3 ? "bg-amber-700 text-amber-50" : "bg-stone-950 text-stone-50"}`}>
                  {index === 3 ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <p className="text-sm text-stone-500">{label}</p>
                <p className="mt-1 text-lg font-semibold">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 md:grid-cols-[0.92fr_0.78fr_0.7fr] md:px-10">
          <div className="rounded-[1.75rem] bg-[#0b0a08] p-6 text-stone-100 shadow-xl md:row-span-2">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-amber-100">你會得到什麼</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-amber-300/20 bg-stone-950 p-4">
              <img src="/blueprint-preview.png" alt="個人破框藍圖預覽" className="w-full rounded-xl border border-stone-800 bg-[#f2eee7] object-cover shadow-2xl shadow-black/40" />
              <p className="mt-3 text-center text-xs leading-6 text-stone-500">會談後 24 小時內寄送一頁式 PDF</p>
            </div>
          </div>

          <div className="grid gap-4">
            {blueprintItems.map(([title, text, Icon]) => (
              <div key={title} className={`flex gap-4 rounded-2xl border ${borderSoft} ${cardBg} p-5 shadow-sm`}>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-amber-700/30 bg-[#f2eee7] text-amber-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{text}</p>
                </div>
              </div>
            ))}
            <div className={`rounded-2xl border border-amber-700/20 ${softCard} p-5 text-sm leading-7 text-stone-700`}>
              這份藍圖不是系統自動生成，而是根據你的測驗結果、60 分鐘對談與 Alpha 觀察共同整理。
            </div>
          </div>

          <form id="booking" onSubmit={submitGuidanceBooking} className="rounded-[1.75rem] border border-stone-900/10 bg-[#0b0a08] p-6 text-stone-100 shadow-xl md:row-span-2">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-amber-100">預約破框引導</h2>
            <p className="mt-2 text-sm leading-7 text-stone-400">請填寫以下資訊，我會再與你確認時間。</p>
            <div className="mt-5 space-y-3">
              <input value={bookingName} onChange={(event) => setBookingName(event.target.value)} className="w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-amber-300/60" placeholder="姓名" />
              <input value={bookingEmail} onChange={(event) => setBookingEmail(event.target.value)} className="w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-amber-300/60" placeholder="Email" />
              <input value={bookingLine} onChange={(event) => setBookingLine(event.target.value)} className="w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-amber-300/60" placeholder="Line ID" />
              <select value={bookingFormat} onChange={(event) => setBookingFormat(event.target.value)} className="w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none focus:border-amber-300/60">
                <option>線上</option>
                <option>實體</option>
                <option>線上或實體皆可</option>
              </select>
              <input value={bookingTime} onChange={(event) => setBookingTime(event.target.value)} className="w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-amber-300/60" placeholder="希望時段，例如：平日晚上、週末下午" />
              <textarea value={bookingNote} onChange={(event) => setBookingNote(event.target.value)} className="min-h-[96px] w-full rounded-xl border border-stone-700 bg-black/30 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-amber-300/60" placeholder="其他想先告訴我的事（選填）" />
            </div>
            {bookingError && <p className="mt-3 text-sm text-red-300">請至少填寫姓名與正確 Email。</p>}
            {bookingSent ? (
              <div className="mt-5 rounded-xl border border-amber-300/20 bg-amber-950/20 p-4 text-sm leading-7 text-amber-50">
                已收到你的預約資料。我會再與你確認可預約時段。
              </div>
            ) : (
              <Button type="submit" className="mt-5 w-full rounded-xl bg-amber-200 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                送出預約
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            <p className="mt-3 text-xs leading-6 text-stone-500">你的資料只用於預約與聯繫，我會妥善保護你的隱私。</p>
          </form>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10">
          <div className="grid overflow-hidden rounded-[2rem] border border-amber-900/15 bg-[#0b0a08] text-stone-100 shadow-xl md:grid-cols-[0.38fr_0.62fr]">
            <div className="border-b border-amber-300/15 bg-black/40 p-7 md:border-b-0 md:border-r md:p-8">
              <SectionLabel icon={Eye} tone="amber">Alpha 如何進行破框引導</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-stone-50">不是替你下定論，而是陪你看見真正重複的地方。</h2>
            </div>
            <div className="p-7 md:p-8">
              <p className="text-lg leading-9 text-stone-200">
                我不會告訴你該怎麼做。我會陪你一起看見：你如何一步一步形成現在的人生模式。
                有時候，問題不是能力不足，而是你一直在用同一套方式保護自己。
              </p>
              <div className="mt-6 grid gap-3 text-sm leading-7 text-stone-300 md:grid-cols-2">
                {["不分析對錯", "不給標準答案", "不說服你改變", "陪你看見真正的自己"].map((item) => (
                  <p key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10">
          <div className={`rounded-[1.75rem] border ${borderSoft} ${cardBg} p-8 shadow-sm`}>
            <h2 className="text-center text-3xl font-semibold tracking-[-0.04em] md:text-4xl">60 分鐘會談流程</h2>
            <div className="relative mt-10 grid gap-8 md:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-amber-800/45 md:block" />
              {flowItems.map(([title, text, Icon]) => (
                <div key={title} className="relative text-center">
                  <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border border-amber-800/40 bg-stone-950 text-amber-100 shadow-lg">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-stone-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-8 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className={`rounded-2xl border ${borderSoft} ${cardBg} p-6 shadow-sm md:min-h-[230px]`}>
              <h2 className="mb-5 text-2xl font-semibold">你可能適合破框引導</h2>
              <div className="space-y-3 text-sm leading-7 text-stone-700">
                {goodFit.map((item) => (
                  <p key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-700" />{item}</p>
                ))}
              </div>
            </div>
            <div className={`rounded-2xl border ${borderSoft} ${cardBg} p-6 shadow-sm md:min-h-[230px]`}>
              <h2 className="mb-5 text-2xl font-semibold">這可能不適合你</h2>
              <div className="space-y-3 text-sm leading-7 text-stone-700">
                {notFit.map((item) => (
                  <p key={item} className="flex gap-2"><span className="mt-0.5 shrink-0 text-lg text-stone-400">×</span>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-10">
          <div className="rounded-2xl bg-[#0b0a08] px-6 py-7 text-stone-100 shadow-xl md:px-9 md:py-8">
            <h2 className="mb-7 text-center text-3xl font-semibold tracking-[0.12em] text-stone-100">服務資訊</h2>
            <div className="grid overflow-hidden rounded-xl border border-amber-300/20 bg-black/20 md:grid-cols-4">
              {[
                ["時間", "60 分鐘", Clock3],
                ["形式", "線上 / 實體", MapPin],
                ["費用", "NT$ 2,000", BadgeDollarSign],
                ["交付成果", "個人破框藍圖 PDF", FileText],
              ].map(([title, text, Icon], index) => (
                <div key={title} className={`flex min-h-[132px] flex-col items-center justify-center px-5 py-6 text-center ${index > 0 ? "border-t border-amber-300/15 md:border-l md:border-t-0" : ""}`}>
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-200">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold tracking-[0.18em] text-amber-200">{title}</p>
                  <p className="mt-2 text-base font-semibold leading-7 text-stone-50 md:text-lg">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm leading-7 text-stone-400">會談後 24 小時內寄送 PDF，作為你第一層破框引導的專屬成果。</p>
          </div>
        </section>

        <section className="bg-[#0b0a08] px-5 py-14 text-stone-100 md:px-10">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-amber-300/20 bg-black md:grid-cols-[0.36fr_0.42fr_0.22fr]">
            <div className="relative min-h-[240px]">
              <img src="/framework-guidance-hero.png" alt="下一扇門" className="absolute inset-0 h-full w-full object-cover object-center brightness-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/20 to-black/70" />
            </div>
            <div className="p-8 md:p-10">
              <SectionLabel icon={KeyRound} tone="amber">下一扇門</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">第二層｜破框重塑</h2>
              <p className="mt-5 text-base leading-8 text-stone-300">
                你已經知道自己如何運作，但還不知道：為什麼會形成這個模式。這將會在第二層開始展開。
              </p>
            </div>
            <div className="border-t border-amber-300/15 p-8 md:border-l md:border-t-0 md:p-10">
              <div className="space-y-3 text-sm leading-7 text-stone-300">
                {['執念根源', '保護機制', '潛意識角色', '人生劇本形成原因'].map((item) => (
                  <p key={item} className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 text-amber-200" />{item}</p>
                ))}
              </div>
              <Button variant="outline" className="mt-5 w-full rounded-xl border-amber-300/30 bg-transparent px-6 py-5 text-amber-100 hover:bg-amber-950/30">
                了解破框重塑（即將開放）
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0a08] px-5 pb-20 text-stone-100 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-amber-300/20 bg-gradient-to-r from-black to-amber-950/20 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">改變人生，不是找到新的方法。</h2>
              <p className="mt-3 text-lg leading-8 text-stone-300">而是停止重複舊的模式。</p>
            </div>
            <a href="#booking">
              <Button className="rounded-xl bg-amber-200 px-8 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                我想停止一直重複
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}



function FrameworkBreakersAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [paidIntentClicked, setPaidIntentClicked] = useState(false);
  const [unlockIntent, setUnlockIntent] = useState("report");
  const isComplete = Object.keys(answers).length === questions.length;
  const result = useMemo(() => getResult(answers), [answers]);
  const current = questions[step];
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);
  const intensityInsight = getIntensityInsight(result.intensity);
  const decisionKey = `${result.topArchetype}-${result.topObsession}`;
  const decisions = decisionMap[decisionKey] || ["停止舊模式", "做一個不同選擇", "立刻行動一步"];
  const mainObsession = obsessions[result.topObsession];
  const secondObsession = obsessions[result.secondObsession];
  const mainArchetype = archetypes[result.topArchetype];
  const outerArchetype = outerArchetypes[result.outerKey];
  const maxObsession = Math.max(...Object.values(result.obsessionScore), 1);
  const maxArchetype = Math.max(...Object.values(result.archetypeScore), 1);

  function selectOption(option) {
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
    window.setTimeout(() => {
      if (step < questions.length - 1) setStep((prevStep) => prevStep + 1);
    }, 180);
  }

  function goBackOneStep() {
    if (step > 0) setStep((prevStep) => prevStep - 1);
  }

  async function submitEmailGate(event) {
    event.preventDefault();
    if (!email.includes("@") || email.trim().length < 5) return;
    await submitLeadToGoogleForm({
      name,
      email,
      outer: outerArchetype.name,
      inner: mainArchetype.name,
      main: mainObsession.name,
      second: secondObsession.name,
      intensity: result.intensity,
      report: unlockIntent === "report" ? "想看完整破解方式" : "",
      coaching: unlockIntent === "coaching" ? "想直接一對一突破" : "",
    });
    setEmailUnlocked(true);
  }

  async function handlePaidIntentClick() {
    setPaidIntentClicked(true);
    console.log("paid_intent_clicked");
    await submitLeadToGoogleForm({
      name,
      email,
      outer: outerArchetype.name,
      inner: mainArchetype.name,
      main: mainObsession.name,
      second: secondObsession.name,
      intensity: result.intensity,
      report: "點擊完整破解方式",
      coaching: "",
    });
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setEmail("");
    setName("");
    setEmailUnlocked(false);
    setPaidIntentClicked(false);
    setUnlockIntent("report");
  }

  return (
    <div className="min-h-screen bg-[#0b0a08] text-stone-100 selection:bg-amber-200 selection:text-stone-950">
      <section className="relative overflow-hidden px-5 py-14 md:px-12 md:py-20">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,#d6b56f,transparent_42%)]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <Badge className="mb-6 border border-amber-300/20 bg-stone-900/80 px-4 py-1.5 text-xs tracking-[0.18em] text-amber-100 hover:bg-stone-900">
            四階快速版｜FRAMEWORK BREAKERS ASSESSMENT
          </Badge>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl text-[2.7rem] font-semibold leading-[1.05] tracking-[-0.04em] md:text-7xl"
          >
            你不是沒努力，
            <br />
            <span className="bg-gradient-to-r from-amber-100 via-stone-100 to-stone-400 bg-clip-text text-transparent">
              你只是一直被同一套反應帶回原點。
            </span>
          </motion.h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-stone-300 md:text-xl">
            這不是一般心理測驗，而是一份「四階快速版」自我檢視：用幾個最常出現在生活裡的反應，先看見你為什麼總是重複同樣的問題。免費版會讓你先看懂自己怎麼被同一套模式帶走，完整轉化路徑會保留在後續報告與一對一引導中。
          </p>
          <div className="mt-9 grid gap-3 md:grid-cols-4">
            {["日常反應｜你平常怎麼重複同樣的問題", "關係反應｜你怎麼保護自己", "重複劇本｜你最怕面對的是什麼", "改變入口｜你準備改變了嗎"].map((item) => (
              <div key={item} className="rounded-2xl border border-stone-800/80 bg-stone-950/60 p-4 text-sm font-medium text-stone-300 shadow-xl shadow-black/20">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-6xl gap-6 px-5 pb-20 md:grid-cols-[1.22fr_0.78fr] md:px-12">
        <Card className="overflow-hidden border-stone-800 bg-stone-950/80 text-stone-100 shadow-2xl shadow-black/40">
          <CardContent className="p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-stone-500">ASSESSMENT PROGRESS</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
                  {isComplete ? "你的免費簡易報告已生成" : current.stage}
                </h2>
              </div>
              <span className="rounded-full border border-stone-800 px-3 py-1 text-sm text-amber-100">{progress}%</span>
            </div>
            <Progress value={progress} className="mb-8 h-2 bg-stone-800" />

            {!isComplete ? (
              <motion.div key={current.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="mb-7 text-3xl font-semibold leading-snug tracking-[-0.03em] text-stone-50">{current.title}</h3>
                <div className="grid gap-3">
                  {current.options.map((option, index) => (
                    <button
                      key={option.text}
                      onClick={() => selectOption(option)}
                      className={`group rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-stone-900 hover:shadow-xl hover:shadow-amber-950/20 ${answers[current.id]?.text === option.text ? "border-amber-300/50 bg-amber-950/20" : "border-stone-800 bg-stone-900/60"}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[1rem] leading-7 text-stone-200">
                          <span className="mr-3 font-semibold text-amber-200/80">{String.fromCharCode(65 + index)}</span>
                          {option.text}
                        </span>
                        <ArrowRight className="h-4 w-4 text-stone-500 transition group-hover:translate-x-1 group-hover:text-amber-200" />
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 border-t border-stone-800 pt-5 md:flex-row md:items-center md:justify-between">
                  <Button
                    type="button"
                    onClick={goBackOneStep}
                    disabled={step === 0}
                    variant="outline"
                    className="border-stone-700 bg-transparent text-stone-300 hover:bg-stone-900 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ← 回到上一題
                  </Button>
                  <p className="text-xs leading-6 text-stone-500">建議直覺作答，不需要想出最完美答案。</p>
                </div>
              </motion.div>
            ) : !emailUnlocked ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-950/35 to-black/20 p-6 md:p-8">
                  <SectionLabel icon={Gift} tone="amber">
                    免費報告已完成
                  </SectionLabel>
                  <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                    你的結果已經生成。
                    <br />
                    <span className="text-amber-100">留下 Email，解鎖你的免費簡易報告。</span>
                  </h3>
                  <p className="mt-5 text-lg leading-9 text-stone-300">
                    免費版會顯示你外在看起來的樣子、真正的反應模式、最容易重複的問題、刺痛句、轉化強度與三個月後預言。完整拆解會保留在後續報告與一對一引導中。
                  </p>
                </div>

                <form onSubmit={submitEmailGate} className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 md:p-6">
                  <SectionLabel icon={Mail}>解鎖免費簡易報告</SectionLabel>
                  <div className="grid gap-3">
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="你的名字／暱稱（選填）"
                      className="w-full rounded-xl border border-stone-800 bg-black/30 px-4 py-3 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-amber-200/60"
                    />
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="輸入 Email 解鎖結果"
                      type="email"
                      className="w-full rounded-xl border border-stone-800 bg-black/30 px-4 py-3 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-amber-200/60"
                    />
                  </div>

                  <div className="mt-4 rounded-2xl border border-stone-800 bg-black/20 p-4">
                    <p className="mb-2 text-base font-semibold text-stone-100">如果這份結果真的有說中你，</p>
                    <p className="mb-4 text-sm text-stone-400">你現在更想知道的是？</p>
                    <div className="grid gap-3">
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-800 bg-black/20 px-4 py-3 text-sm text-stone-200 transition hover:border-amber-300/40">
                        <input
                          type="radio"
                          name="unlockIntent"
                          value="report"
                          checked={unlockIntent === "report"}
                          onChange={() => setUnlockIntent("report")}
                          className="h-4 w-4 accent-amber-200"
                        />
                        我想知道完整的潛意識循環與破解方式
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-800 bg-black/20 px-4 py-3 text-sm text-stone-200 transition hover:border-amber-300/40">
                        <input
                          type="radio"
                          name="unlockIntent"
                          value="coaching"
                          checked={unlockIntent === "coaching"}
                          onChange={() => setUnlockIntent("coaching")}
                          className="h-4 w-4 accent-amber-200"
                        />
                        我不想再自己繞圈，我想直接突破
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="mt-4 w-full rounded-xl bg-amber-200 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                    解鎖我的結果
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-950/35 to-black/20 p-6 md:p-7">
                  <SectionLabel icon={DoorOpen} tone="amber">
                    YOUR CORE RESULT
                  </SectionLabel>
                  <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                    {name ? `${name}，你的結果是：` : "你的結果是："}
                    <br />
                    {outerArchetype.name}
                    <br />
                    <span className="text-amber-100">→ {mainArchetype.name} → {mainObsession.name}</span>
                  </h3>
                  <p className="mt-5 text-lg leading-9 text-stone-300">
                    你不是哪裡壞掉，而是外在看起來的樣子、內在保護自己的方式，和真正害怕的東西正在互相拉扯。改變不是硬逼自己變好，而是先看懂你一直怎麼保護自己。
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                    <SectionLabel icon={Crown}>外層原型</SectionLabel>
                    <p className="text-2xl font-semibold text-stone-50">{outerArchetype.name}</p>
                    <p className="text-sm text-amber-200/70">{outerArchetype.en}</p>
                    <p className="mt-4 text-sm leading-7 text-stone-400">{outerArchetype.mask}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                    <SectionLabel icon={Eye}>內在原型</SectionLabel>
                    <p className="text-2xl font-semibold text-stone-50">{mainArchetype.name}</p>
                    <p className="text-sm text-amber-200/70">{mainArchetype.en}</p>
                    <p className="mt-4 text-sm leading-7 text-stone-400">{mainArchetype.free}</p>
                  </div>
                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                    <SectionLabel icon={Flame}>主副執念</SectionLabel>
                    <p className="text-2xl font-semibold text-stone-50">{mainObsession.name}</p>
                    <p className="mt-4 text-sm leading-7 text-stone-400">
                      副執念：<span className="text-stone-200">{secondObsession.name}</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-black/30 p-5">
                  <SectionLabel icon={AlertTriangle} tone="amber">
                    你一直以為的自己 vs 你其實在做的事
                  </SectionLabel>
                  <p className="text-xl font-medium leading-9 text-stone-100">{result.identityGap}</p>
                </div>

                <div className="rounded-2xl border border-red-400/20 bg-red-950/10 p-5">
                  <SectionLabel icon={Flame} tone="red">
                    刺痛句｜最可能讓你破防的那句話
                  </SectionLabel>
                  <p className="text-2xl font-semibold leading-10 text-stone-50">{result.painLine}</p>
                  <p className="mt-4 border-l border-red-300/30 pl-4 text-sm leading-7 text-red-100/80">
                    真正刺痛的地方，不是這句話很狠，而是你可能已經用這個方式保護自己很多年。
                  </p>
                </div>

                <IntensityBlock score={result.intensity} insight={intensityInsight} futurePrediction={result.futurePrediction} />

                <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                  <SectionLabel icon={RotateCcw}>重複劇本</SectionLabel>
                  <p className="text-lg leading-9 text-stone-200">{result.loopScript}</p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-black/20 p-5">
                  <SectionLabel icon={AlertTriangle} tone="amber">
                    如果繼續這樣下去
                  </SectionLabel>
                  <p className="text-lg leading-9 text-stone-200">{result.futureCost}</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-4 rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                    <p className="text-lg font-semibold text-stone-50">六大執念分布</p>
                    {Object.entries(result.obsessionScore)
                      .sort((a, b) => b[1] - a[1])
                      .map(([key, value]) => (
                        <ScoreBar key={key} label={obsessions[key].short} value={value} max={maxObsession} />
                      ))}
                  </div>
                  <div className="space-y-4 rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                    <p className="text-lg font-semibold text-stone-50">八大原型分布</p>
                    {Object.entries(result.archetypeScore)
                      .sort((a, b) => b[1] - a[1])
                      .map(([key, value]) => (
                        <ScoreBar key={key} label={archetypes[key].name} value={value} max={maxArchetype} />
                      ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-950/25 to-black/20 p-5">
                  <SectionLabel icon={KeyRound} tone="amber">
                    你的破框決策
                  </SectionLabel>
                  <div className="grid gap-3 md:grid-cols-3">
                    {decisions.map((item, index) => (
                      <p key={item} className="rounded-xl bg-black/25 p-4 text-stone-200">
                        <span className="mb-1 block text-xs text-stone-500">{["停止", "選擇", "行動"][index]}</span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                  <SectionLabel icon={Sparkles}>今日確認語</SectionLabel>
                  <p className="text-lg leading-9 text-stone-200">{mainObsession.ritual}</p>
                </div>

                <Button onClick={reset} variant="outline" className="border-stone-700 bg-transparent text-stone-200 hover:bg-stone-900">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  重新測驗
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-stone-800 bg-stone-950/80 text-stone-100">
            <CardContent className="p-6">
              <SectionLabel icon={FileText}>免費報告包含</SectionLabel>
              <ul className="space-y-3 text-sm leading-7 text-stone-400">
                <li>・外層原型：你以為你是誰</li>
                <li>・內在原型：你其實如何保護自己</li>
                <li>・主副執念：你最容易重複的反應</li>
                <li>・刺痛句、重複劇本與如果繼續這樣下去</li>
                <li>・轉化強度：依模式集中度計算</li>
                <li>・三個月後預言與下一步提醒</li>
                <li>・一段今日確認語</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="sticky top-6 border-amber-300/25 bg-gradient-to-br from-stone-950 via-stone-950 to-amber-950/35 text-stone-100 shadow-2xl shadow-black/30">
            <CardContent className="p-6">
              <SectionLabel icon={Lock} tone="amber">
                結果深化｜看見真正的重複點
              </SectionLabel>
              <h3 className="text-2xl font-semibold leading-snug tracking-[-0.03em] text-stone-50">
                你真正反覆的，從來不是能力不夠。
              </h3>
              <p className="mt-4 leading-8 text-stone-300">
                而是你一直在用同一套潛意識模式，重複活成同樣的人生。你以為你只是焦慮、拖延、受傷、失控或不敢開始，但真正的問題是：你正在用某種「保護自己的方式」，慢慢消耗你的人生。
              </p>
              <p className="mt-4 leading-8 text-stone-300">
                完整報告不是更多資訊，而是幫你看見：到底是哪個「你」，正在替你做選擇。
              </p>
              {isComplete && (
                <div className="mt-5 space-y-4 rounded-2xl border border-amber-300/20 bg-black/25 p-4 text-sm leading-7 text-amber-50">
                  <p className="font-medium text-amber-100">依你的結果，最值得解鎖的是：</p>
                  <p>{result.premiumHook}</p>
                  <p>{mainArchetype.premium}</p>
                </div>
              )}
              <div className="mt-5 grid gap-2 text-sm text-stone-300">
                {["完整重複劇本與觸發點", "關係與情緒中的自我保護模式", "真正讓你一直重複的原因", "下一階段最需要突破的方向"].map((item) => (
                  <p key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-amber-200" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-6 grid gap-3">
                <Button onClick={handlePaidIntentClick} className="w-full rounded-xl bg-amber-200 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                  <Sparkles className="mr-2 h-4 w-4" />
                  我想看完整破解方式
                </Button>
                <Button
                  onClick={async () => {
                    console.log("coaching_intent_clicked");
                    await submitLeadToGoogleForm({
                      name,
                      email,
                      outer: outerArchetype.name,
                      inner: mainArchetype.name,
                      main: mainObsession.name,
                      second: secondObsession.name,
                      intensity: result.intensity,
                      report: "",
                      coaching: "點擊破框引導頁",
                    });
                    window.location.href = "/framework-guidance";
                  }}
                  variant="outline"
                  className="w-full rounded-xl border-amber-300/30 bg-transparent py-6 text-base font-semibold text-amber-100 hover:bg-amber-950/30"
                >
                  👉 我不想再自己繞圈，我想直接突破
                </Button>
              </div>
              {paidIntentClicked === true && (
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-black/25 p-4 text-sm leading-7 text-amber-50">
                  已收到你的解鎖意願。
                  <br />
                  完整破解方式正在優化中，將優先開放給想看懂自己真正重複點的人。
                  <br />
                  你會是第一批被通知的人。
                </div>
              )}
              {paidIntentClicked === "coaching" && (
                <div className="mt-4 rounded-xl border border-red-400/20 bg-red-950/15 p-4 text-sm leading-7 text-red-100">
                  我知道你不是想再看一份分析。
                  <br />
                  你是已經受夠一直用同一套方式，把自己帶回同一個地方。
                  <br />
                  👉 接下來會開放「一對一破框引導」，你會優先收到通知。
                </div>
              )}
</CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : "";
  if (path === "/framework-guidance") return <FrameworkGuidance />;
  return <FrameworkBreakersAssessment />;
}

