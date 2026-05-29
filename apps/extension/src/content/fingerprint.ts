export type AnswerEvent = { at: number; question: number };

export class FingerprintTracker {
  private readonly startedAt = Date.now();
  private answerEvents: AnswerEvent[] = [];
  private visibilityChanges = 0;

  constructor() {
    document.addEventListener("change", this.trackChange, true);
    document.addEventListener("visibilitychange", this.trackVisibility);
  }

  private readonly trackChange = (event: Event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    const questionNode = target.closest("[id], .question, .task, li");
    const question = questionNode?.textContent ? Math.abs(hashText(questionNode.textContent)) % 300 : this.answerEvents.length + 1;
    this.answerEvents.push({ at: Date.now() - this.startedAt, question });
  };

  private readonly trackVisibility = () => {
    this.visibilityChanges += 1;
  };

  snapshot() {
    return {
      startedAt: this.startedAt,
      completedAt: Date.now(),
      userAgent: navigator.userAgent,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      answerEvents: this.answerEvents.slice(-400),
      visibilityChanges: this.visibilityChanges
    };
  }

  stop() {
    document.removeEventListener("change", this.trackChange, true);
    document.removeEventListener("visibilitychange", this.trackVisibility);
  }
}

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return hash;
}
