import React from "react";
import "./App.css";
import { InstallAppButton, OfflineNotice } from "./PwaControls.jsx";

function AboutIcon({ children }) {
  return <span className="about-card-icon" aria-hidden="true">{children}</span>;
}

export function AboutContent() {
  return (
    <section className="about-guide" aria-labelledby="about-guide-title" lang="ml">
      <header className="about-guide-heading">
        <span className="about-guide-eyebrow">About</span>
        <h1 id="about-guide-title">Details and How to use</h1>
        <p>റൂട്ടുകളും ബസ് സമയങ്ങളും എളുപ്പത്തിൽ അറിയാനുള്ള ലളിതമായ വഴികാട്ടി.</p>
      </header>

      <article className="about-guide-card">
        <div className="about-guide-card-heading">
          <AboutIcon>ℹ</AboutIcon>
          <h2>About website/app</h2>
        </div>
        <p>
          കളിയാട്ടമുക്ക് ➔ ചെമ്മാട്, ചെമ്മാട് ➔ കളിയാട്ടമുക്ക് റൂട്ടുകളിലെ ബസ് സമയങ്ങളും
          നിലവിലെ സമയമനുസരിച്ച് പുതുക്കുന്ന ഏകദേശ സ്റ്റോപ്പ് വിവരങ്ങളും മൊബൈലിൽ
          എളുപ്പത്തിൽ കാണാനുള്ള പ്ലാറ്റ്‌ഫോമാണ് ഇത്. ബസിന്റെ തത്സമയ ലൊക്കേഷൻ ഇവിടെ
          കാണിക്കില്ല.
        </p>
      </article>

      <article className="about-guide-card">
        <div className="about-guide-card-heading">
          <AboutIcon>☷</AboutIcon>
          <h2>How to use?</h2>
        </div>
        <div className="about-guide-feature">
          <span className="about-guide-feature-icon" aria-hidden="true">🔄</span>
          <p><strong>റൂട്ട് മാറ്റാൻ:</strong> മുകളിലുള്ള ആരോ ബട്ടൺ അമർത്തി കളിയാട്ടമുക്ക് ➔ ചെമ്മാട് അല്ലെങ്കിൽ ചെമ്മാട് ➔ കളിയാട്ടമുക്ക് തിരഞ്ഞെടുക്കാം.</p>
        </div>
        <div className="about-guide-feature">
          <span className="about-guide-feature-icon" aria-hidden="true">🚌</span>
          <div>
            <p><strong>Live bus:</strong> ഇന്ത്യയിലെ നിലവിലെ സമയവും അടുത്തതായി പുറപ്പെടുന്ന ബസും മുകളിൽ കാണാം. ഓരോ സ്റ്റോപ്പിലുമെത്തുന്ന ഏകദേശ സമയം വെർട്ടിക്കൽ ടൈംലൈനായി കാണിക്കും. കണക്കാക്കിയ സമയം എത്തുമ്പോൾ സ്റ്റോപ്പ് പച്ചയായി മാറും. മുട്ടിച്ചിറ സമയത്തിന് ശേഷം അടുത്ത ബസ് കാണിക്കും.</p>
          </div>
        </div>
        <div className="about-guide-feature">
          <span className="about-guide-feature-icon" aria-hidden="true">📋</span>
          <div>
            <p><strong>All times:</strong> തിരഞ്ഞെടുത്ത റൂട്ടിലെ ദിവസത്തെ ബസ് പേരുകളും സ്റ്റാൻഡിൽ നിന്ന് പുറപ്പെടുന്ന സമയവും ഇവിടെ കാണാം.</p>
            <ul>
              <li><strong>Search:</strong> ബസ് പേരോ സമയമോ നൽകി ആവശ്യമായ സർവീസ് കണ്ടെത്താം.</li>
              <li><strong>Favorites:</strong> ഹൃദയ ബട്ടൺ അമർത്തി പതിവായി ഉപയോഗിക്കുന്ന സർവീസുകൾ അടയാളപ്പെടുത്താം.</li>
              <li><strong>Recently Viewed:</strong> ബസ് സമയവരി അമർത്തിയാൽ അത് ഈ വിഭാഗത്തിൽ ചേർക്കും. Clear അമർത്തി പട്ടിക ഒഴിവാക്കാം.</li>
            </ul>
          </div>
        </div>
      </article>

      <article className="about-guide-card about-guide-notes">
        <div className="about-guide-card-heading">
          <AboutIcon>!</AboutIcon>
          <h2>പ്രധാന അറിയിപ്പുകൾ</h2>
        </div>
        <div className="about-guide-feature">
          <span className="about-guide-feature-icon" aria-hidden="true">⚠️</span>
          <p><strong>ഏകദേശ സമയം:</strong> ട്രാഫിക്, കാലാവസ്ഥ, മറ്റ് സാഹചര്യങ്ങൾ എന്നിവ കാരണം എത്തിച്ചേരുന്ന സമയത്തിൽ മാറ്റമുണ്ടാകാം.</p>
        </div>
        <div className="about-guide-feature">
          <span className="about-guide-feature-icon" aria-hidden="true">📅</span>
          <p><strong>Sunday note:</strong> ചിലപ്പോൾ ഒരു ബസ് മാത്രമാണ് ഞായറാഴ്ച സർവീസ് നടത്താൻ സാധ്യതയുള്ളൂ, അതുകൊണ്ട് ഞായറാഴ്ച ദിവസങ്ങളിൽ നിങ്ങൾക്ക് വെബ്സൈറ്റിനു മുകളിൽ ഞായറാഴ്ച സർവീസുകൾ കുറവായിരിക്കാമെന്ന അറിയിപ്പ് ആപ്പിൽ കാണിക്കും.</p>
        </div>
      </article>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="app-shell" data-theme="light">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand about-page-brand" href="/" aria-label="ബസ് സമയപ്പട്ടികയിലേക്ക് മടങ്ങുക">
            <span className="brand-icon">
              <img src="/arebyan.png" alt="" width="40" height="40" />
            </span>
            <span className="brand-copy">
              <strong>കളിയാട്ടമുക്ക്</strong>
              <span>ബസ് സമയപ്പട്ടിക</span>
            </span>
          </a>
          <div className="header-actions">
            <InstallAppButton />
            <a className="about-home-link" href="/">Back to home</a>
          </div>
        </div>
      </header>

      <OfflineNotice />

      <main className="page-content about-page-content" lang="ml">
        <AboutContent />
        <footer className="site-footer">
          <p>© 2025 കളിയാട്ടമുക്ക് ബസ് സമയപ്പട്ടിക</p>
        </footer>
      </main>
    </div>
  );
}

export default AboutPage;
