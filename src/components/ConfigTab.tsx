import React, { useState } from "react";
import { FormConfig } from "../types/FormConfig";
import styles from "./ConfigTab.module.css";

interface ConfigTabProps {
  onConfigChange: (config: FormConfig | null) => void;
}

const defaultJSON = `{
  "title": "My Dynamic Form",
  "fields": [
    { "name": "age", "label": "Age", "type": "numeric" },
    { "name": "name", "label": "Name", "type": "string" },
    { "name": "bio", "label": "Biography", "type": "multi-line" },
    { "name": "subscribe", "label": "Subscribe to Newsletter", "type": "boolean" },
    { "name": "birthday", "label": "Birthday", "type": "date" },
    { "name": "gender", "label": "Gender", "type": "enum", "options": ["Male", "Female", "Other"] }
  ],
  "buttons": [
    { "text": "OK" },
    { "text": "Cancel" },
    { "text": "Apply" }
  ]
}`;

const ConfigTab: React.FC<ConfigTabProps> = ({ onConfigChange }) => {
  const [jsonInput, setJsonInput] = useState<string>(defaultJSON);
  const [error, setError] = useState<string>("");

  const handleLoad = () => {
    try {
      const config: FormConfig = JSON.parse(jsonInput);
      onConfigChange(config);
      setError("");
    } catch (err) {
      setError("Invalid JSON configuration. Please check your syntax.");
      onConfigChange(null);
    }
  };

  return (
    <section className={styles.configSection}>
      <h2 className={styles.heading}>Configuration</h2>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className={styles.textarea}
      />
      <div className={styles.controls}>
        <button onClick={handleLoad} className={styles.loadButton}>
          Load Config
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default ConfigTab;
