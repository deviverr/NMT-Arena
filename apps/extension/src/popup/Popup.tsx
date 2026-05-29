import { useEffect, useState } from "react";
import { Award, Chrome, ExternalLink, Trophy } from "lucide-react";
import type { ExtensionStorage } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "https://nmt-arena.fun";

export function Popup() {
  const [storage, setStorage] = useState<ExtensionStorage>({});

  useEffect(() => {
    chrome.storage.local.get(["accessToken", "userId", "profile"]).then((value) => setStorage(value as ExtensionStorage));
  }, []);

  function openLogin() {
    chrome.runtime.sendMessage({ type: "NMT_ARENA_OPEN_LOGIN" });
  }

  const loggedIn = Boolean(storage.accessToken);
  return (
    <main className="popup">
      <section className="hero">
        <div className="logo"><Trophy size={24} /></div>
        <div>
          <h1>NMT Arena</h1>
          <p>XP для реальних тестів</p>
        </div>
      </section>

      {loggedIn ? (
        <section className="card">
          <div className="avatar">{storage.profile?.username?.slice(0, 2).toUpperCase() ?? "NA"}</div>
          <h2>{storage.profile?.displayName ?? "Акаунт підключено"}</h2>
          <p className="muted">{storage.profile?.currentRank ?? "Готовий до тестів"}</p>
          <div className="stats">
            <div><strong>{storage.profile?.totalXp ?? 0}</strong><span>XP</span></div>
            <div><strong>{storage.profile?.currentStreak ?? 0}</strong><span>стрік</span></div>
          </div>
          <a className="button" href={`${API_URL}/profile/me`} target="_blank" rel="noreferrer"><ExternalLink size={16} />Профіль</a>
          <a className="button secondary" href={`${API_URL}/leaderboard`} target="_blank" rel="noreferrer"><Award size={16} />Лідерборд</a>
        </section>
      ) : (
        <section className="card">
          <h2>Увійди, щоб збирати XP</h2>
          <p className="muted">Після входу розширення автоматично збереже результат тесту на zno.osvita.ua.</p>
          <button type="button" className="button" onClick={openLogin}><Chrome size={16} />Увійти через сайт</button>
          <a className="button secondary" href={API_URL} target="_blank" rel="noreferrer"><ExternalLink size={16} />nmt-arena.fun</a>
        </section>
      )}

      <footer>Версія 0.1.0 · Працює на zno.osvita.ua</footer>
    </main>
  );
}
