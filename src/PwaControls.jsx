import { useEffect, useState } from "react";

export function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);

  useEffect(() => {
    const updateConnectionStatus = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);
    return () => {
      window.removeEventListener("online", updateConnectionStatus);
      window.removeEventListener("offline", updateConnectionStatus);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div className="offline-notice" role="status" aria-live="polite">
      You&apos;re offline. The saved timetable remains available; internet access may be needed for updates.
    </div>
  );
}

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const rememberInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const clearInstallPrompt = () => setInstallPrompt(null);

    window.addEventListener("beforeinstallprompt", rememberInstallPrompt);
    window.addEventListener("appinstalled", clearInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", rememberInstallPrompt);
      window.removeEventListener("appinstalled", clearInstallPrompt);
    };
  }, []);

  const promptInstallation = async () => {
    if (!installPrompt) {
      return;
    }

    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    } catch (error) {
      console.error("Unable to show the Bus Timer installation prompt.", error);
      setInstallPrompt(null);
    }
  };

  if (!installPrompt) {
    return null;
  }

  return (
    <button className="install-app-button" type="button" onClick={promptInstallation}>
      Install App
    </button>
  );
}
