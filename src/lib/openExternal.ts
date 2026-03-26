/**
 * Open a URL externally — uses Capacitor Browser plugin on native,
 * falls back to window.open on web.
 */
export async function openExternal(url: string) {
  try {
    const cap = (window as any).Capacitor;
    if (cap?.isNativePlatform?.() || cap?.isNative) {
      // Dynamic import — only resolves when @capacitor/browser is installed (native build)
      const mod = await (Function('return import("@capacitor/browser")')() as Promise<any>);
      await mod.Browser.open({ url });
      return;
    }
  } catch {
    // Capacitor not available, fall through
  }
  window.open(url, "_blank");
}
