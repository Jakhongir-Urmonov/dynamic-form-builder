import React from "react";
import styles from "./App.module.css";
import TabView from "./components/TabView";

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <TabView />
    </div>
  );
};

export default App;
