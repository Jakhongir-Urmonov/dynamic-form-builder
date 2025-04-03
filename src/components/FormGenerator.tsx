import React, { useState } from "react";
import { FormConfig, FieldConfig } from "../types/FormConfig";
import styles from "./FormGenerator.module.css";

interface FormGeneratorProps {
  config: FormConfig;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ config }) => {
  const [formState, setFormState] = useState<Record<string, any>>({});

  const handleChange = (field: FieldConfig, value: any) => {
    setFormState((prev) => ({ ...prev, [field.name]: value }));
  };

  const renderField = (field: FieldConfig) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formState[field.name] || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        handleChange(
          field,
          e.target.type === "checkbox" ? e.target.checked : e.target.value
        ),
      className: styles.inputField,
    };

    switch (field.type) {
      case "numeric":
        return <input type="number" {...commonProps} />;
      case "string":
        return <input type="text" {...commonProps} />;
      case "multi-line":
        return <textarea {...commonProps} className={styles.textArea} />;
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={!!formState[field.name]}
            onChange={(e) => handleChange(field, e.target.checked)}
            className={styles.checkbox}
          />
        );
      case "date":
        return <input type="date" {...commonProps} />;
      case "enum":
        return (
          <div className={styles.radioGroup}>
            {field.options?.map((option) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formState[field.name] === option}
                  onChange={() => handleChange(field, option)}
                  className={styles.radioInput}
                />
                {option}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with state:", formState);
    // Further processing could be done here.
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>{config.title}</h2>
      {config.fields.map((field) => (
        <div key={field.name} className={styles.formGroup}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}
      <div className={styles.buttonGroup}>
        {config.buttons.map((btn, index) => (
          <button key={index} type="submit" className={styles.submitButton}>
            {btn.text}
          </button>
        ))}
      </div>
    </form>
  );
};

export default FormGenerator;
