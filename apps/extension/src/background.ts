import type { ExtensionStorage } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "https://nmt-arena.fun";

chrome.runtime.onMessage.addListener((message: { type?: string; token?: string; userId?: string }, _sender, sendResponse) => {
  if (message.type === "NMT_ARENA_TOKEN" && message.token) {
    chrome.storage.local.set({ accessToken: message.token, userId: message.userId } satisfies ExtensionStorage, () => sendResponse({ ok: true }));
    return true;
  }
  if (message.type === "NMT_ARENA_OPEN_LOGIN") {
    chrome.tabs.create({ url: `${API_URL}/login?source=extension` });
    sendResponse({ ok: true });
  }
  return false;
});

chrome.runtime.onMessageExternal.addListener((message: { type?: string; token?: string; userId?: string }, _sender, sendResponse) => {
  if (message.type === "NMT_ARENA_TOKEN" && message.token) {
    chrome.storage.local.set({ accessToken: message.token, userId: message.userId } satisfies ExtensionStorage, () => sendResponse({ ok: true }));
    return true;
  }
  sendResponse({ ok: false });
  return false;
});
