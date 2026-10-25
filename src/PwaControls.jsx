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
  const [isIOS] = useState(() => typeof navigator !== "undefined"
    && /iPad|iPhone|iPod/.test(navigator.userAgent)
    && typeof window !== "undefined"
    && !window.MSStream);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isIOSPromptClosing, setIsIOSPromptClosing] = useState(false);

  useEffect(() => {
    if (!isIOSPromptClosing) return undefined;
    const timeout = window.setTimeout(() => {
      setShowIOSPrompt(false);
      setIsIOSPromptClosing(false);
    }, 220);
    return () => window.clearTimeout(timeout);
  }, [isIOSPromptClosing]);

  useEffect(() => {
    const standalone = window.navigator.standalone === true;

    if (isIOS && !standalone) {
      let isDismissed = false;
      try {
        isDismissed = window.localStorage.getItem("ios_install_dismissed") === "true";
      } catch (error) {
        console.error("Unable to read the iOS installation prompt preference.", error);
      }

      if (!isDismissed) {
        const timeout = window.setTimeout(() => setShowIOSPrompt(true), 2500);
        return () => window.clearTimeout(timeout);
      }
      return undefined;
    }

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
  }, [isIOS]);

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

  const dismissIOSPrompt = () => {
    setIsIOSPromptClosing(true);
    try {
      window.localStorage.setItem("ios_install_dismissed", "true");
    } catch (error) {
      console.error("Unable to save the iOS installation prompt preference.", error);
    }
  };

  return (
    <>
      {!isIOS && installPrompt && (
        <button className="install-app-button" type="button" onClick={promptInstallation}>
          Install App
        </button>
      )}
      {isIOS && showIOSPrompt && (
        <aside
          className={isIOSPromptClosing ? "ios-install-card is-closing" : "ios-install-card"}
          role="dialog"
          aria-labelledby="ios-install-title"
          aria-describedby="ios-install-message"
        >
          <div className="ios-install-card-heading">
            <img className="ios-install-app-icon" src="/app-icon.png" alt="" />
            <h2 id="ios-install-title">കളിയാട്ടമുക്ക് ബസ് ടൈംടേബിൾ</h2>
            <button
              className="ios-install-close"
              type="button"
              aria-label="അറിയിപ്പ് അടയ്ക്കുക"
              onClick={dismissIOSPrompt}
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>
          <p id="ios-install-message">ഈ ആപ്പ് നിങ്ങളുടെ ഫോണിൽ എളുപ്പത്തിൽ ഇൻസ്റ്റാൾ ചെയ്യാം!</p>
          <ol className="ios-install-steps">
            <li>
              <span className="ios-install-step-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V3m0 0L8 7m4-4 4 4M5 12v7h14v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>താഴെയുള്ള Safari Share ബട്ടൺ അമർത്തുക</span>
            </li>
            <li>
              <span className="ios-install-step-icon" aria-hidden="true">+</span>
              <span>ലിസ്റ്റിൽ നിന്ന് &apos;Add to Home Screen&apos; തിരഞ്ഞെടുക്കുക</span>
            </li>
          </ol>
        </aside>
      )}
    </>
  );
}
