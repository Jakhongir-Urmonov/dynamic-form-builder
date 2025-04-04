# Dynamic Form Builder

Dynamic Form Builder is a flexible and customizable form builder built with React, allowing you to create forms dynamically based on configuration. This project enables you to easily define form fields, their types, validations, and layout without having to hard-code each form component.

## Features

- **Dynamic form creation** based on JSON configuration.
- Supports various input types: text, number, date, checkbox, radio, and textarea.
- Validation rules (required fields, pattern matching, etc.) for each form field.
- Customizable form structure (inputs and buttons).
- Easy-to-use interface for creating forms with dynamic configurations.
- Form data handling and validation logic are centralized for better maintainability.

## Technologies Used

- React (with hooks and context)
- TypeScript
- CSS Modules for styling
- Custom hook (`useFormState`) for form state management

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Jakhongir-Urmonov/dynamic-form-builder.git
```

2. Navigate to the project folder:

```bash
cd dynamic-form-builder
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

The project will run on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Configuration**: Define a form's configuration in the form of JSON with properties such as `inputs`, `buttons`, and validation rules.
   Example:

   ```json
   {
     "title": "My Dynamic Form",
     "inputs": [
       {
         "name": "age",
         "label": "Age",
         "type": "numeric",
         "validation": {
           "required": true,
           "pattern": "^[1-9][0-9]?$|^100$"
         }
       },
       {
         "name": "name",
         "label": "Name",
         "type": "string",
         "validation": {
           "required": true,
           "pattern": "^[a-zA-Z ]{2,50}$"
         }
       }
     ],
     "buttons": [
       {
         "text": "Submit"
       }
     ]
   }
   ```

2. **Rendering the Form**: The form is generated dynamically based on the configuration provided. The form fields include text, numeric, date, checkbox, radio button, and multi-line text options.

3. **Validation**: Validation logic is applied based on the configuration. You can define required fields, patterns, and more.

4. **Form State**: Use the `useFormState` hook to manage form data, errors, and submission state. The form state is automatically updated as users interact with the form.

## How It Works

1. The form configuration is passed into the `DynamicForm` component.
2. The configuration specifies the input fields, their types, validation rules, and button configurations.
3. The form is rendered dynamically using React’s state and context management.
4. The form supports validation on change, and errors are displayed next to invalid fields.
5. Upon form submission, the form data is logged or processed accordingly.

## Example Usage

```tsx
import React from "react";
import { DynamicForm } from "dynamic-form-builder";
import { useFormState } from "./hooks/useFormState";

const App = () => {
  const { state, dispatch } = useFormState();

  return (
    <div>
      <DynamicForm formState={{ state, dispatch }} />
    </div>
  );
};

export default App;
```

## Available Input Types

- **String**: A simple text input field.
- **Numeric**: A field for numeric input.
- **Multi-line**: A textarea for longer input.
- **Boolean**: A checkbox (true/false).
- **Date**: A date picker input.
- **Enum**: A set of radio buttons for predefined choices.

## Contributing

We welcome contributions to improve this project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes, ensuring they don't break existing functionality.
4. Commit your changes and push them to your forked repository.
5. Open a pull request with a description of your changes.
