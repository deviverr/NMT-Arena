declare namespace chrome {
  namespace storage {
    const local: {
      get(keys: string[] | string): Promise<Record<string, unknown>>;
      set(items: Record<string, unknown>, callback?: () => void): void;
    };
  }

  namespace runtime {
    const id: string;
    function sendMessage(message: unknown, callback?: (response: unknown) => void): void;
    const onMessage: {
      addListener(
        callback: (message: unknown, sender: unknown, sendResponse: (response: unknown) => void) => boolean | void
      ): void;
    };
    const onMessageExternal: {
      addListener(
        callback: (message: unknown, sender: unknown, sendResponse: (response: unknown) => void) => boolean | void
      ): void;
    };
  }

  namespace tabs {
    function create(createProperties: { url: string }): void;
  }
}
