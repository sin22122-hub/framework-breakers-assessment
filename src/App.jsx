
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [intentChoice, setIntentChoice] = useState("deepReport");

  async function submitEmailGate(event) {
    event.preventDefault();

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfgIhKyFPDMSt4NyLHWxoHqJYTz9XVylT4R90lqgZQOJj5mGw/formResponse";

    const formData = new FormData();

    formData.append("entry.1407072553", name || "");
    formData.append("entry.1917274556", email || "");
    formData.append(
      "entry.931356060",
      intentChoice === "deepReport" ? "是" : "否"
    );
    formData.append(
      "entry.1636982887",
      intentChoice === "breakthrough" ? "是" : "否"
    );

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }

    alert("已送出");
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-stone-100">
      <div className="mx-auto max-w-3xl">
        <Card className="border border-stone-800 bg-[#120d0b]">
          <CardContent className="space-y-6 p-6">
            <div>
              <p className="text-sm tracking-wide text-amber-200">
                解鎖你的結果
              </p>
            </div>

            <form onSubmit={submitEmailGate} className="space-y-5">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的名字 / 暱稱（選填）"
                className="w-full rounded-xl border border-amber-300/40 bg-black/30 px-4 py-4 text-stone-100 outline-none"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="輸入 Email 解鎖結果"
                type="email"
                className="w-full rounded-xl border border-stone-800 bg-black/30 px-4 py-4 text-stone-100 outline-none"
              />

              <div className="rounded-2xl border border-stone-800 bg-black/20 p-5">
                <p className="text-xl font-semibold leading-8 text-stone-100">
                  如果這份結果真的有說中你，
                </p>

                <p className="mb-5 mt-1 text-stone-400">
                  你現在更想知道的是？
                </p>

                <div className="grid gap-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-800 p-4 transition hover:border-amber-300/30 hover:bg-stone-900">
                    <input
                      type="radio"
                      name="intentChoice"
                      value="deepReport"
                      checked={intentChoice === "deepReport"}
                      onChange={() => setIntentChoice("deepReport")}
                    />
                    <span>
                      我想知道完整的潛意識循環與破解方式
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-800 p-4 transition hover:border-amber-300/30 hover:bg-stone-900">
                    <input
                      type="radio"
                      name="intentChoice"
                      value="breakthrough"
                      checked={intentChoice === "breakthrough"}
                      onChange={() => setIntentChoice("breakthrough")}
                    />
                    <span>
                      我不想再自己繞圈，我想直接突破
                    </span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-amber-200 py-6 text-lg font-semibold text-stone-950"
              >
                解鎖我的結果
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
