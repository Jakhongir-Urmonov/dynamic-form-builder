import React, { useState } from "react";
import ConfigTab from "./components/ConfigTab";
import ResultTab from "./components/ResultTab";
import { FormConfig } from "./types/FormConfig";
import styles from "./App.module.css";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"config" | "result">("config");
  const [config, setConfig] = useState<FormConfig | null>(null);

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <button
            onClick={() => setActiveTab("config")}
            className={`${styles.navButton} ${
              activeTab === "config" ? styles.active : ""
            }`}
          >
            Config
          </button>
          <button
            onClick={() => setActiveTab("result")}
            className={`${styles.navButton} ${
              activeTab === "result" ? styles.active : ""
            }`}
          >
            Result
          </button>
        </nav>
      </header>
      <main className={styles.mainContent}>
        {activeTab === "config" ? (
          <ConfigTab onConfigChange={setConfig} />
        ) : (
          <ResultTab config={config} />
        )}
      </main>
    </div>
  );
};

export default App;
