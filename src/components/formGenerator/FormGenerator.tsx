import React from "react";
import styles from "./FormGenerator.module.css";
import { useFormState } from "../../hooks/useFormState";
import { InputConfig } from "../../types/FormConfig";

const FormGenerator: React.FC<{
  formState: ReturnType<typeof useFormState>;
}> = ({ formState }) => {
  const { state, dispatch } = formState;

  // Handle input changes and validation
  const handleChange = (
    fieldName: string,
    value: string | number | boolean | Date | null,
    validation?: { required?: boolean; pattern?: string }
  ) => {
    let error = "";

    // Required validation
    if (validation?.required && (value === "" || value === undefined)) {
      error = "This field is required";
    }

    // Pattern validation
    if (typeof value === "string" && validation?.pattern) {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value)) {
        error = "Invalid format";
      }
    }

    // Dispatch updates
    dispatch({ type: "UPDATE_FIELD", name: fieldName, value });

    // Dispatch validation errors
    dispatch({ type: "SET_ERROR", name: fieldName, error });
  };

  const renderField = (field: InputConfig) => {
    const fieldValue = state.formValues[field.name] ?? "";

    const commonProps = {
      id: field.name,
      name: field.name,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        handleChange(
          field.name,
          (e.target as HTMLInputElement).type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value,
          field.validation
        ),
      className: styles.inputField,
    };

    switch (field.type) {
      case "numeric":
        return (
          <input
            type="number"
            value={typeof fieldValue === "number" ? fieldValue : ""}
            {...commonProps}
          />
        );
      case "string":
        return (
          <input
            type="text"
            {...commonProps}
            value={
              typeof fieldValue === "string" || typeof fieldValue === "number"
                ? fieldValue
                : ""
            }
          />
        );
      case "multi-line":
        return (
          <textarea
            {...commonProps}
            value={typeof fieldValue === "string" ? fieldValue : ""}
            className={styles.textArea}
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={!!fieldValue}
            onChange={(e) =>
              handleChange(field.name, e.target.checked, field.validation)
            }
            className={styles.checkbox}
          />
        );
      case "date":
        return (
          <input
            type="date"
            {...commonProps}
            value={typeof fieldValue === "string" ? fieldValue : ""}
          />
        );
      case "enum":
        return (
          <div className={styles.radioGroup}>
            {(field.options || []).map((option) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={fieldValue === option}
                  onChange={() =>
                    handleChange(field.name, option, field.validation)
                  }
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

    // Check for any required field errors before submission
    let hasErrors = false;
    state.fields.inputs.forEach((field) => {
      if (field.validation?.required && !state.formValues[field.name]) {
        dispatch({
          type: "SET_ERROR",
          name: field.name,
          error: "This field is required",
        });
        hasErrors = true;
      }
    });

    if (hasErrors) {
      console.log("Form has errors, fix them before submitting.");
      return;
    }

    console.log("Form submitted with values:", state.formValues);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>{state.fields.title}</h2>
      {state.fields.inputs?.map((field) => (
        <div key={field.name} className={styles.formGroup}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}
          </label>
          {renderField(field)}
          {state.errors?.[field.name] && (
            <p className={styles.error}>{state.errors[field.name]}</p>
          )}
        </div>
      ))}
      <div className={styles.buttonGroup}>
        {state.fields.buttons?.map((btn, index) => (
          <button key={index} type="submit" className={styles.submitButton}>
            {btn.text}
          </button>
        ))}
      </div>
    </form>
  );
};

export default FormGenerator;
