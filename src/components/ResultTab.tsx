import React from "react";
import { FormConfig } from "../types/FormConfig";
import FormGenerator from "./FormGenerator";
import styles from "./ResultTab.module.css";

interface ResultTabProps {
  config: FormConfig | null;
}

const ResultTab: React.FC<ResultTabProps> = ({ config }) => {
  return (
    <section className={styles.resultSection}>
      <h2 className={styles.heading}>Generated Form</h2>
      {config ? (
        <FormGenerator config={config} />
      ) : (
        <p className={styles.placeholder}>
          Please load a valid configuration in the Config tab.
        </p>
      )}
    </section>
  );
};

export default ResultTab;
