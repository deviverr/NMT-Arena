import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseAnonKey) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  supabase.auth.getSession().then(({ data }) => {
    const token = data.session?.access_token;
    const userId = data.session?.user.id;
    if (token) {
      chrome.runtime.sendMessage({ type: "NMT_ARENA_TOKEN", token, userId });
      window.postMessage({ type: "NMT_ARENA_EXTENSION_CONNECTED" }, window.origin);
    }
  }).catch(() => undefined);
}
