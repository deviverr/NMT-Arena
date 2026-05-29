import { ArenaHUD } from "./hud";
import { FingerprintTracker } from "./fingerprint";
import { detectZnoResult } from "./detector";
import { submitResult } from "./submission";

const hud = new ArenaHUD();
const tracker = new FingerprintTracker();
hud.mount();

let submitted = false;

async function checkResult() {
  if (submitted) return;
  const result = detectZnoResult();
  if (!result) return;
  submitted = true;
  try {
    const response = await submitResult(result, tracker);
    hud.showResult(response.xp_earned ?? 0, response.new_total_xp ?? 0);
    tracker.stop();
  } catch (error) {
    submitted = false;
    hud.showMessage(error instanceof Error ? error.message : "Не вдалося надіслати результат");
  }
}

void checkResult();
const observer = new MutationObserver(() => void checkResult());
observer.observe(document.body, { childList: true, subtree: true, characterData: true });
