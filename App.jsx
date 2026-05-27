import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  FileText,
  ShieldCheck,
  Crown,
  DoorOpen,
  Eye,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Compass,
  KeyRound,
  Mail,
  Gift,
  MousePointerClick,
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
    name: "失序者",
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
    name: "覺醒者",
    en: "The Awakened",
    free: "你已經開始看見舊模式，也知道自己不能再用舊方式活。你的課題是把覺察落地，而不是停在理解。",
    premium: "完整報告會拆解：你的覺醒節點、轉化任務、身份重塑路徑，以及下一階段行動地圖。",
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
    name: "覺察追尋者",
    en: "The Conscious Seeker",
    mask: "你以為自己已經看懂很多，也正在走向更高版本。",
    truth: "但真正的覺醒不是理解更多，而是把看見的東西活出來。",
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
  "strategic-controller-control": {
    light: "你很習慣把事情想清楚再行動，但有時候你其實是在延後面對不確定。",
    medium: "你以為你在做理性判斷，但你其實是在用控制，避免自己面對失控。",
    heavy: "你每天都在做的，不是決策，而是把焦慮包裝成分析。",
  },
  "charismatic-performer-mask": {
    light: "你很擅長呈現自己，但有時候你也會懷疑，哪一個才是真的你。",
    medium: "你越會表現，越容易依賴別人的反應來確認自己的價值。",
    heavy: "你一直在做的，是用更好的表現，掩蓋那個不敢被看見的自己。",
  },
  "independent-suppressor-rigidity": {
    light: "你習慣讓自己穩住，但有時候這份穩，是壓住感受換來的。",
    medium: "你不是沒有情緒，而是太早學會把它關掉。",
    heavy: "你一直在做的，是用『我沒事』，讓所有人，包括你自己，都忽略你。",
  },
  "free-avoider-control": {
    light: "你很重視自由，但有些選擇你其實一直沒有真正做出來。",
    medium: "你說你要空間，但其實是在避開那些一旦選擇就無法回頭的決定。",
    heavy: "你一直在做的，是用『自由』，讓自己不用負責。",
  },
  "agreeable-fader-humility": {
    light: "你很會顧及他人，但有時候你會忽略自己的位置。",
    medium: "你越讓別人舒服，你就越容易消失在關係裡。",
    heavy: "你一直在做的，是用退讓，換取一點點被留下的可能。",
  },
  "seeker-awakened-perfection": {
    light: "你已經開始看見很多，但還在找更好的開始方式。",
    medium: "你一直在理解，但還沒有真的讓改變發生。",
    heavy: "你一直在做的，是用『我知道了』，取代『我真的做了』。",
  },
  "independent-hollow-failure": {
    light: "你看起來可以自己處理很多事，但內在其實已經有一部分失去熱度。",
    medium: "你不是沒有想要，只是過去的挫敗讓你開始練習不期待。",
    heavy: "你一直在做的，是假裝自己不想要，這樣就不用再承認自己曾經很失望。",
  },
  "strategic-eruptor-rigidity": {
    light: "你看起來很有判斷力，但壓力累積到某個點時，你會突然失去平衡。",
    medium: "你不是突然爆發，而是太久沒有允許自己誠實表達。",
    heavy: "你一直在做的，是把委屈壓到最後，再讓失控替你說話。",
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
  "awakened-perfection": "看見問題 → 想做得更完整 → 遲遲不開始 → 內疚 → 再學更多 → 仍然沒有真正改變。",
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
  "eruptor-rigidity": "你的爆發來自長期封閉與忍耐。失序不是問題本身，而是內在太久沒有出口。",
  "awakened-perfection": "你看見了更高版本的自己，但完美主義會讓你一直等待最好的時機。真正的覺醒，需要先行動。",
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

const questions = [
  // 免費版定位：四階快速版。每階取代表題，不做完整 8 / 7 / 6 題，避免免費版過度揭露。
  {
    id: "b1",
    stage: "第一階｜破框八問",
    title: "當你發現自己又卡住時，你最常出現的第一反應是？",
    options: [
      { text: "先懷疑是不是自己不夠好", obsession: "humility", archetype: "fader", weight: 4 },
      { text: "覺得反正做了也不一定有用", obsession: "failure", archetype: "hollow", weight: 4 },
      { text: "開始想控制更多細節，避免出錯", obsession: "control", archetype: "controller", weight: 5 },
      { text: "覺得還沒準備好，想等更完美", obsession: "perfection", archetype: "performer", weight: 4 },
      { text: "把感覺壓下去，逼自己撐住", obsession: "rigidity", archetype: "suppressor", weight: 5 },
      { text: "換一個樣子面對別人，不讓人看出來", obsession: "mask", archetype: "performer", weight: 5 },
    ],
  },
  {
    id: "b2",
    stage: "第一階｜破框八問",
    title: "你在人生裡最反覆出現的內在聲音是？",
    options: [
      { text: "我是不是沒有資格擁有更好的？", obsession: "humility", archetype: "fader", weight: 5 },
      { text: "我好像每次都會搞砸", obsession: "failure", archetype: "hollow", weight: 5 },
      { text: "我不能讓事情失控", obsession: "control", archetype: "controller", weight: 5 },
      { text: "我還不夠好，不能現在開始", obsession: "perfection", archetype: "performer", weight: 5 },
      { text: "我不能軟弱，不能倒下", obsession: "rigidity", archetype: "suppressor", weight: 5 },
      { text: "我必須維持某個樣子，別人才會認同我", obsession: "mask", archetype: "performer", weight: 5 },
    ],
  },
  {
    id: "b3",
    stage: "第一階｜破框八問",
    title: "當你面對重要選擇時，最容易被什麼拉住？",
    options: [
      { text: "怕自己的選擇不被支持", obsession: "humility", archetype: "fader", weight: 4 },
      { text: "怕又失敗，所以不敢投入", obsession: "failure", archetype: "avoider", weight: 4 },
      { text: "怕變數太多，想先確定全部", obsession: "control", archetype: "controller", weight: 5 },
      { text: "怕成果不夠漂亮，被人比較", obsession: "perfection", archetype: "performer", weight: 4 },
      { text: "怕一放鬆就失去掌控，所以硬撐", obsession: "rigidity", archetype: "suppressor", weight: 4 },
      { text: "怕真實想法曝光後，角色崩塌", obsession: "mask", archetype: "fader", weight: 5 },
    ],
  },
  {
    id: "i1",
    stage: "第二階｜內在七問",
    title: "在親密關係或重要關係裡，你最常如何保護自己？",
    options: [
      { text: "不說真話，把委屈吞回去", obsession: "rigidity", archetype: "suppressor", weight: 5 },
      { text: "要求對方給答案、給承諾、給安全感", obsession: "control", archetype: "controller", weight: 5 },
      { text: "開始逃開，不回、不講、不處理", obsession: "control", archetype: "avoider", weight: 5 },
      { text: "表現得很好、很懂事、很有價值", obsession: "mask", archetype: "performer", weight: 5 },
      { text: "忍到最後爆掉，說出傷人的話", obsession: "rigidity", archetype: "eruptor", weight: 5 },
      { text: "慢慢淡出，讓自己不存在", obsession: "humility", archetype: "fader", weight: 5 },
      { text: "感覺空掉，沒有力氣再投入", obsession: "failure", archetype: "hollow", weight: 5 },
      { text: "看見模式，開始想真正改變", obsession: "perfection", archetype: "awakened", weight: 3 },
    ],
  },
  {
    id: "i2",
    stage: "第二階｜內在七問",
    title: "當你被看見、被期待、被投射時，你最容易？",
    options: [
      { text: "把壓力藏起來，繼續扛", obsession: "rigidity", archetype: "suppressor", weight: 4 },
      { text: "想掌控對方怎麼看我", obsession: "control", archetype: "controller", weight: 4 },
      { text: "想逃掉，不想再承接", obsession: "control", archetype: "avoider", weight: 5 },
      { text: "更努力表現出最好的一面", obsession: "mask", archetype: "performer", weight: 5 },
      { text: "突然失控，對期待感到憤怒", obsession: "rigidity", archetype: "eruptor", weight: 4 },
      { text: "降低存在感，避免被注意", obsession: "humility", archetype: "fader", weight: 5 },
      { text: "覺得自己像空殼，只是在演", obsession: "mask", archetype: "hollow", weight: 5 },
      { text: "開始練習把影響力接住", obsession: "perfection", archetype: "awakened", weight: 3 },
    ],
  },
  {
    id: "i3",
    stage: "第二階｜內在七問",
    title: "你最熟悉的自我消耗模式是？",
    options: [
      { text: "有話不說，最後身心都累", obsession: "rigidity", archetype: "suppressor", weight: 5 },
      { text: "腦中一直推演所有可能", obsession: "control", archetype: "controller", weight: 5 },
      { text: "一遇到關鍵就拖延或消失", obsession: "failure", archetype: "avoider", weight: 5 },
      { text: "一直維持形象，不能讓人失望", obsession: "mask", archetype: "performer", weight: 5 },
      { text: "平常沒事，一爆發就很劇烈", obsession: "rigidity", archetype: "eruptor", weight: 5 },
      { text: "慢慢失去存在感與主動性", obsession: "humility", archetype: "fader", weight: 5 },
      { text: "什麼都做得到，但內在沒有感覺", obsession: "failure", archetype: "hollow", weight: 5 },
      { text: "覺察很多，但還沒完全落地", obsession: "perfection", archetype: "awakened", weight: 4 },
    ],
  },
  {
    id: "s1",
    stage: "第三階｜靈魂六問",
    title: "哪一句話最刺中你？",
    options: [
      { text: "我怕我其實不值得被好好對待", obsession: "humility", archetype: "fader", weight: 6 },
      { text: "我怕努力到最後還是一場空", obsession: "failure", archetype: "hollow", weight: 6 },
      { text: "我怕一放手，事情就會失控", obsession: "control", archetype: "controller", weight: 6 },
      { text: "我怕不夠好，就不值得被選擇", obsession: "perfection", archetype: "performer", weight: 6 },
      { text: "我怕一柔軟，就會被傷害", obsession: "rigidity", archetype: "suppressor", weight: 6 },
      { text: "我怕真實的我，其實沒有人要", obsession: "mask", archetype: "fader", weight: 6 },
    ],
  },
  {
    id: "s2",
    stage: "第三階｜靈魂六問",
    title: "如果你真的要穿越，最需要放下的是？",
    options: [
      { text: "用卑微換取關係", obsession: "humility", archetype: "fader", weight: 6 },
      { text: "用過去失敗定義未來", obsession: "failure", archetype: "avoider", weight: 6 },
      { text: "用控制換取安全", obsession: "control", archetype: "controller", weight: 6 },
      { text: "用完美換取被認可", obsession: "perfection", archetype: "performer", weight: 6 },
      { text: "用剛硬掩蓋脆弱", obsession: "rigidity", archetype: "suppressor", weight: 6 },
      { text: "用角色取代真實", obsession: "mask", archetype: "hollow", weight: 6 },
    ],
  },
  {
    id: "h1",
    stage: "第四階｜轉化之門",
    title: "此刻你最想對自己的靈魂說什麼？",
    options: [
      { text: "我願意相信，我值得被愛與被選擇", obsession: "humility", archetype: "awakened", weight: 4 },
      { text: "我願意重新開始，不再被挫敗困住", obsession: "failure", archetype: "awakened", weight: 4 },
      { text: "我願意放下控制，學會信任生命", obsession: "control", archetype: "awakened", weight: 4 },
      { text: "我願意不完美地開始", obsession: "perfection", archetype: "awakened", weight: 4 },
      { text: "我願意柔軟，也願意真實", obsession: "rigidity", archetype: "awakened", weight: 4 },
      { text: "我願意卸下面具，讓真實的我被看見", obsession: "mask", archetype: "awakened", weight: 4 },
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
      label: "高壓臨界｜已經不能再只靠理解撐住",
      headline: "你不是不知道問題，而是已經看太清楚，卻還沒真正穿越。",
      warning: "這個分數代表你的模式已經不是偶爾出現，而是正在影響你的關係、選擇、行動與自我價值。",
      paidReason: "完整報告會直接拆出你的核心循環、觸發點與七日破框行動，避免你只是看懂，卻沒有改變。",
    };
  }
  if (score >= 65) {
    return {
      label: "直指執念｜你已經看見問題，但還沒有真正改變",
      headline: "你現在最危險的不是卡住，而是以為自己正在改變。",
      warning: "你已經有覺察，也知道自己常常重複某些劇本。但如果沒有把它拆成具體行動，你會一直停在『我懂了』，卻仍然回到同樣的反應。",
      paidReason: "完整報告會把你的主副執念轉成具體練習，讓你知道不是再想更多，而是下一步要怎麼做。",
    };
  }
  if (score >= 45) {
    return {
      label: "模式浮現｜你開始看見自己不是單純卡住",
      headline: "你已經摸到那扇門，但還沒有真正知道門後藏的是什麼。",
      warning: "這個階段最容易把問題歸咎於環境、關係或時機，但真正重複的是你內在的保護方式。",
      paidReason: "完整報告會幫你辨識外層身份與內在防衛的差異，讓你不再只修表面問題。",
    };
  }
  return {
    label: "慣性鬆動｜問題還沒有完全浮上檯面",
    headline: "你不是沒有問題，而是你還習慣把問題合理化。",
    warning: "這個分數不代表你沒事，而是你的防衛還很會替你解釋一切。",
    paidReason: "完整報告會幫你先找出最早出現的卡點，避免等到劇本變成慣性後才處理。",
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
    awakened: "你以為自己已經看懂很多，但你其實還在用覺察延後真正的行動。",
  };

  return fallbackByArchetype[topArchetype] || `你真正卡住的不是「${archetypes[topArchetype].name}」，而是你一直用舊方式證明自己還安全。`;
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
    "seeker-awakened-perfection": "你一直以為自己正在成長、正在覺察。但其實你也可能停在理解，而不是進入真正的改變。",
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
      `${obsessions[topObsession].short}被觸發 → ${archetypes[topArchetype].name}開始反應 → 暫時安全 → 長期卡住 → 再次回到同一個生命劇本。`,
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
    { range: "0–44", min: 0, max: 44, text: "模式剛成形 → 你還在合理化" },
    { range: "45–64", min: 45, max: 64, text: "模式浮現 → 開始影響選擇" },
    { range: "65–81", min: 65, max: 81, text: "模式固定 → 你已經看見但還在重複" },
    { range: "82–100", min: 82, max: 100, text: "模式主導 → 已經在影響人生走向" },
  ];

  const isActiveLevel = (level) => score >= level.min && score <= level.max;
  const levelsWithPunch = [
    { range: "0–44", min: 0, max: 44, text: "模式剛成形 → 你還在合理化", punch: "你現在在『還在替自己解釋』的區間。" },
    { range: "45–64", min: 45, max: 64, text: "模式浮現 → 開始影響選擇", punch: "你已經在重複同一套劇本，只是還不願意承認。" },
    { range: "65–81", min: 65, max: 81, text: "模式固定 → 你已經看見但還在重複", punch: "你在『看懂但不改』的區間。" },
    { range: "82–100", min: 82, max: 100, text: "模式主導 → 已經在影響人生走向", punch: "這個模式，正在替你做決定。" },
  ];
  const active = levelsWithPunch.find(isActiveLevel) || levelsWithPunch[2];

  return (
    <div className="rounded-2xl border border-amber-300/25 bg-gradient-to-br from-amber-950/25 to-black/20 p-6">
      <SectionLabel icon={AlertTriangle} tone="amber">
        轉化強度｜你的模式卡得有多深
      </SectionLabel>
      <div className="mb-4 flex items-end gap-3">
        <span className="text-5xl font-semibold tracking-[-0.06em] text-amber-100">{score}</span>
        <span className="pb-1 text-sm text-stone-500">/ 100</span>
      </div>
      <div className="mb-5 rounded-xl border border-red-400/25 bg-red-950/15 p-4">
        <p className="text-lg font-semibold leading-8 text-red-100">{active.punch}</p>
      </div>
      <p className="mb-5 text-sm leading-7 text-stone-400">
        這個分數不是「好或壞」，也不是總分高低，而是代表你的慣性模式有多
        <strong className="text-stone-200">集中、穩定、重複</strong>。分數越高，代表你的主執念與主原型越一致，越容易在壓力、關係與選擇中反覆啟動同一套劇本。
      </p>
      <div className="grid gap-3 text-sm leading-7">
        {levels.map((level) => (
          <div key={level.range} className={`rounded-xl border p-3 ${isActiveLevel(level) ? "border-amber-300/30 bg-amber-950/20" : "border-stone-800 bg-black/25"}`}>
            <span className={isActiveLevel(level) ? "text-amber-200" : "text-stone-500"}>{level.range}</span>｜{level.text}
          </div>
        ))}
      </div>
      <h4 className="mt-6 text-2xl font-semibold leading-snug text-stone-50">{insight.headline}</h4>
      <p className="mt-4 text-base leading-8 text-stone-300">{insight.warning}</p>
      <div className="mt-5 rounded-xl border border-amber-300/15 bg-black/25 p-4 text-sm leading-7 text-amber-50/90">
        👉 越高，代表不是更糟，而是你越不能再用「自己想一想就好」的方式處理這件事。
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

export default function FrameworkBreakersAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [paidIntentClicked, setPaidIntentClicked] = useState(false);
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

  function submitEmailGate(event) {
    event.preventDefault();
    if (!email.includes("@") || email.trim().length < 5) return;
    setEmailUnlocked(true);
  }

  function handlePaidIntentClick() {
    setPaidIntentClicked(true);
    // 未來可接 GA / Meta Pixel / 自建 API
    console.log("paid_intent_clicked");
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setEmail("");
    setName("");
    setEmailUnlocked(false);
    setPaidIntentClicked(false);
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
            你不是卡住，
            <br />
            <span className="bg-gradient-to-r from-amber-100 via-stone-100 to-stone-400 bg-clip-text text-transparent">
              你只是還沒看懂自己在哪一扇門前。
            </span>
          </motion.h1>
          <p className="mt-7 max-w-3xl text-lg leading-9 text-stone-300 md:text-xl">
            這不是完整深度報告，而是「四階快速版」入口：用少量關鍵題，先看見你的外層身份、內在防衛與底層執念。免費版給你足夠的覺察，但不會把完整轉化路徑一次全部揭露。
          </p>
          <div className="mt-9 grid gap-3 md:grid-cols-4">
            {["01 破框快速題｜慣性劇本", "02 內在快速題｜潛意識原型", "03 靈魂快速題｜執念核心", "04 轉化之門｜回心整合"].map((item) => (
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
                      className="group rounded-2xl border border-stone-800 bg-stone-900/60 p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-amber-200/50 hover:bg-stone-900 hover:shadow-xl hover:shadow-amber-950/20"
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
              </motion.div>
            ) : !emailUnlocked ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-950/35 to-black/20 p-6 md:p-8">
                  <SectionLabel icon={Gift} tone="amber">
                    免費報告已完成
                  </SectionLabel>
                  <h3 className="text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-5xl">
                    你的破框結果已經生成。
                    <br />
                    <span className="text-amber-100">留下 Email，解鎖免費簡易報告。</span>
                  </h3>
                  <p className="mt-5 text-lg leading-9 text-stone-300">
                    免費版會顯示你的外層原型、內在原型、主副執念、刺痛句、轉化強度與三個月後預言。完整深度報告則會保留在付費版解鎖。
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
                    <Button type="submit" className="w-full rounded-xl bg-amber-200 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                      解鎖我的免費簡易報告
                    </Button>
                  </div>
                  <p className="mt-4 text-xs leading-6 text-stone-500">
                    MVP 測試版：目前不會真的寄送 Email。正式上線時可串接 ConvertKit、MailerLite、Google Sheet、Airtable 或 Notion 表單。
                  </p>
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
                    你不是單純卡住，而是外在身份、內在防衛與底層執念正在互相拉扯。真正的轉化，不是修掉某個缺點，而是看懂你一直用什麼方式保護自己。
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
                  <SectionLabel icon={RotateCcw}>循環劇本</SectionLabel>
                  <p className="text-lg leading-9 text-stone-200">{result.loopScript}</p>
                </div>

                <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
                  <SectionLabel icon={Compass}>雙軸交叉解讀</SectionLabel>
                  <p className="text-lg leading-9 text-stone-200">{result.matrixText}</p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-black/20 p-5">
                  <SectionLabel icon={AlertTriangle} tone="amber">
                    不改變的代價
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
                <li>・主副執念：你卡在哪一扇門</li>
                <li>・刺痛句、循環劇本與不改變的代價</li>
                <li>・轉化強度：依模式集中度計算</li>
                <li>・三個月後預言與下一步提醒</li>
                <li>・一段今日確認語</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="sticky top-6 border-amber-300/25 bg-gradient-to-br from-stone-950 via-stone-950 to-amber-950/35 text-stone-100 shadow-2xl shadow-black/30">
            <CardContent className="p-6">
              <SectionLabel icon={Lock} tone="amber">
                付費解鎖｜完整原型報告
              </SectionLabel>
              <h3 className="text-2xl font-semibold leading-snug tracking-[-0.03em] text-stone-50">
                免費報告讓你看見問題，完整報告帶你拆掉問題。
              </h3>
              <p className="mt-4 leading-8 text-stone-300">
                你會得到的不只是更多文字，而是把你的外層身份、內在原型、主副執念、關係模式、金錢卡點與七日破框行動完整串起來。
              </p>
              {isComplete && (
                <div className="mt-5 space-y-4 rounded-2xl border border-amber-300/20 bg-black/25 p-4 text-sm leading-7 text-amber-50">
                  <p className="font-medium text-amber-100">依你的結果，最值得解鎖的是：</p>
                  <p>{result.premiumHook}</p>
                  <p>{mainArchetype.premium}</p>
                </div>
              )}
              <div className="mt-5 grid gap-2 text-sm text-stone-300">
                {["完整循環劇本與觸發點", "關係模式、金錢卡點與自我價值盲區", "三個破框練習與七日行動指令", "對應 Skool / Notion 深度模組"].map((item) => (
                  <p key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 text-amber-200" />
                    {item}
                  </p>
                ))}
              </div>
              <div className="mt-6 grid gap-3">
                <Button onClick={handlePaidIntentClick} className="w-full rounded-xl bg-amber-200 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                  <MousePointerClick className="mr-2 h-4 w-4" />
                  我想先看完整報告（NT$399）
                </Button>
                <Button
                  onClick={() => {
                    console.log("coaching_intent_clicked");
                    setPaidIntentClicked("coaching");
                  }}
                  variant="outline"
                  className="w-full rounded-xl border-amber-300/30 bg-transparent py-6 text-base font-semibold text-amber-100 hover:bg-amber-950/30"
                >
                  👉 我不想再卡住，我想直接被帶
                </Button>
              </div>
              {paidIntentClicked === true && (
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-black/25 p-4 text-sm leading-7 text-amber-50">
                  已收到你的解鎖意願。
                  <br />
                  完整報告正在優化中，將優先開放給願意深入轉化的人。
                  <br />
                  你會是第一批被通知的人。
                </div>
              )}
              {paidIntentClicked === "coaching" && (
                <div className="mt-4 rounded-xl border border-red-400/20 bg-red-950/15 p-4 text-sm leading-7 text-red-100">
                  我知道你不是想再看一份分析。
                  <br />
                  你是已經受夠一直卡在同一個地方。
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
