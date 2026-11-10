/** Call synchronously from a user gesture, never after a network request. */
export function openWhatsApp(url: string): boolean {
  try {
    const destination = new URL(url);
    if (destination.origin !== "https://wa.me") return false;
    // noopener in window.open's features returns null even when opening succeeds.
    // Instead detach the opener immediately, before navigating the blank tab.
    const tab = window.open("", "_blank");
    if (!tab || tab.closed) return false;
    tab.opener = null;
    tab.location.replace(url);
    return true;
  } catch {
    return false;
  }
}