/**
 * Open a URL externally — uses Capacitor Browser plugin on native,
 * falls back to window.open on web.
 */
export async function openExternal(url: string) {
  try {
    // Check if running in Capacitor native shell
    const cap = (window as any).Capacitor;
    if (cap?.isNativePlatform?.() || cap?.isNative) {
      // Dynamically import to avoid bundling issues in web
      const { Browser } = await import("@capacitor/browser");
      await Browser.open({ url });
      return;
    }
  } catch {
    // Capacitor not available, fall through
  }
  window.open(url, "_blank");
}
