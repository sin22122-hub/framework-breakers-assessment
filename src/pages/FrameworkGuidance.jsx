import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  FileText,
  DoorOpen,
  Eye,
  Flame,
  CheckCircle2,
  KeyRound,
  Lock,
  Clock3,
  MapPin,
  BadgeDollarSign,
} from "lucide-react";
import logoSrc from "@/assets/framework-logo.png";
import heroSrc from "@/assets/framework-guidance-hero.png";
import blueprintSrc from "@/assets/blueprint-preview.png";

const GUIDANCE_BOOKING_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdojgTY_u38L7MedfxVn5_CR2btHWjpHr6cx97toMPuz6s1ng/viewform?usp=sf_link";

function SectionLabel({ icon: Icon, children, tone = "stone" }) {
  const color = tone === "amber" ? "text-amber-200" : tone === "red" ? "text-red-200" : "text-stone-300";
  return (
    <div className={`mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.22em] ${color}`}>
      <Icon className="h-4 w-4" />
      {children}
    </div>
  );
}

export default function FrameworkGuidance() {
  function goBackToResult() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
      return;
    }
    if (typeof window !== "undefined") window.location.href = "/";
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 md:px-10 md:py-3">
          <button onClick={() => (window.location.href = "/")} className="flex items-center text-left">
            <img src={logoSrc} alt="Framework Breakers" className="h-[94px] w-auto object-contain md:h-[116px]" />
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
          <img src={heroSrc} alt="破框引導光門" className="h-full w-full object-cover object-center brightness-[1.45] contrast-[1.18] saturate-[1.12]" />
        </div>
        <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[#050403] via-[#050403]/88 to-transparent" />
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
            <a href={GUIDANCE_BOOKING_FORM_URL} target="_blank" rel="noreferrer" className="mt-8 inline-block">
              <Button className="rounded-xl bg-amber-200 px-8 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                預約破框引導
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
              <img src={blueprintSrc} alt="個人破框藍圖預覽" className="w-full rounded-xl border border-stone-800 bg-[#f2eee7] object-cover shadow-2xl shadow-black/40" />
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

          <div id="booking" className="rounded-[1.75rem] border border-stone-900/10 bg-[#0b0a08] p-6 text-stone-100 shadow-xl md:row-span-2">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-amber-100">預約破框引導</h2>
            <p className="mt-2 text-sm leading-7 text-stone-400">
              點擊下方按鈕後，會開啟獨立的 Google 預約表單。填寫完成後，我會再與你確認可預約時段。
            </p>
            <div className="mt-5 rounded-2xl border border-amber-300/15 bg-amber-950/10 p-5">
              <div className="space-y-3 text-sm leading-7 text-stone-300">
                <p className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-200" />姓名、Email、Line ID</p>
                <p className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-200" />希望引導形式：線上 / 實體 / 皆可</p>
                <p className="flex gap-2"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-200" />希望預約時段</p>
              </div>
            </div>
            <a href={GUIDANCE_BOOKING_FORM_URL} target="_blank" rel="noreferrer" className="mt-5 block">
              <Button className="w-full rounded-xl bg-amber-200 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                開啟預約表單
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <p className="mt-3 text-xs leading-6 text-stone-500">
              預約資料會進入獨立的破框引導預約表，不會與測驗結果資料混在一起。
            </p>
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
                    <Icon className="h-5 w-5" />
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
          <div className="rounded-2xl bg-[#0b0a08] px-6 py-8 text-stone-100 shadow-xl md:px-9 md:py-9">
            <h2 className="mb-7 text-center text-3xl font-semibold tracking-[0.12em] text-stone-100">服務資訊</h2>
            <div className="grid overflow-hidden rounded-xl border border-amber-300/20 bg-black/25 md:grid-cols-4">
              {[
                ["時間", "60 分鐘", Clock3],
                ["形式", "線上 / 實體", MapPin],
                ["費用", "NT$ 2,000", BadgeDollarSign],
                ["交付成果", "個人破框藍圖 PDF", FileText],
              ].map(([title, text, Icon], index) => (
                <div key={title} className={`flex min-h-[120px] flex-col items-center justify-center px-5 py-5 text-center ${index > 0 ? "border-t border-amber-300/15 md:border-l md:border-t-0" : ""}`}>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold tracking-[0.18em] text-amber-200">{title}</p>
                  <p className="mt-2 text-base font-semibold leading-7 text-stone-50 md:text-lg">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm leading-7 text-stone-400">會談後 24 小時內寄送 PDF，作為你第一層破框引導的專屬成果。</p>
          </div>
        </section>

        <section className="bg-[#0b0a08] px-5 py-10 text-stone-100 md:px-10">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-amber-300/20 bg-black md:grid-cols-[0.34fr_0.44fr_0.22fr]">
            <div className="relative min-h-[210px]">
              <img src={heroSrc} alt="下一扇門" className="absolute inset-0 h-full w-full object-cover object-center brightness-125 contrast-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/20 to-black/70" />
            </div>
            <div className="p-7 md:p-8">
              <SectionLabel icon={KeyRound} tone="amber">下一扇門</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">第二層｜破框重塑</h2>
              <p className="mt-5 text-base leading-8 text-stone-300">
                你已經知道自己如何運作，但還不知道：為什麼會形成這個模式。這將會在第二層開始展開。
              </p>
            </div>
            <div className="border-t border-amber-300/15 p-7 md:border-l md:border-t-0 md:p-8">
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

        <section className="bg-[#0b0a08] px-5 pb-16 text-stone-100 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-amber-300/20 bg-gradient-to-r from-black to-amber-950/20 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em]">改變人生，不是找到新的方法。</h2>
              <p className="mt-3 text-lg leading-8 text-stone-300">而是停止重複舊的模式。</p>
            </div>
            <a href={GUIDANCE_BOOKING_FORM_URL} target="_blank" rel="noreferrer">
              <Button className="rounded-xl bg-amber-200 px-8 py-6 text-base font-semibold text-stone-950 hover:bg-amber-100">
                預約破框引導
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}



