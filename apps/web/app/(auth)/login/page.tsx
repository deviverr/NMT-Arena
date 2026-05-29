"use client";

import { Chrome, MessageCircle } from "lucide-react";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function LoginPage({ searchParams }: { searchParams: { source?: string } }) {
  const source = searchParams.source === "extension" ? "extension" : "web";

  async function login(provider: "google" | "discord") {
    const supabase = createBrowserSupabase();
    const redirectTo = `${window.location.origin}/callback?source=${source}`;
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-4 py-16">
      <div className="arena-card w-full text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-arena-500 text-3xl">🏟️</div>
        <h1 className="mt-5 text-3xl font-black">Увійди в NMT Arena</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Профіль потрібен, щоб зберігати XP, стріки, бейджі та місце в лідерборді.</p>
        <div className="mt-6 grid gap-3">
          <button type="button" className="arena-button" onClick={() => void login("google")}><Chrome className="size-5" aria-hidden />Увійти через Google</button>
          <button type="button" className="arena-button-secondary" onClick={() => void login("discord")}><MessageCircle className="size-5" aria-hidden />Увійти через Discord</button>
        </div>
      </div>
    </div>
  );
}
