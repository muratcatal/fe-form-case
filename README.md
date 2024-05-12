# Frontend Case

## Technologies

- React
- Typescript
- React-query
- Axios
- Yup
- EmotionJS
- Material-UI
- React-hot-toast
- Jest
- React-testing-library

### Folder Structure

```
src
├── components
│   ├── tax
│   │   ├── constants
│   │   ├── tax-input
│   │   ├── validations
│   │   ├── index.tsx
├── core
│   │   ├── form
│   │   │   ├── field
│   │   │   ├── validation
│   │   │   ├── index.tsx
│   │   ├── inputs
├── services

```

### Components

Each component is a folder with its own styles, tests, and index file. They are organized in a way that makes it easy to find and maintain them. Validations and constants are also separated from the main component.

### Core

Core folder contains form and input components that are used in the application. They are reusable components that can be used in other parts of the application.

### Services

Services folder contains the API service that is used to fetch data from the API. It is separated from the components to make it easier to maintain and test.

### Run

To run application, use `yarn start`

[http://localhost:3000](http://localhost:3000) to view it in the browser.

### Test

Simply run `yarn test` command to run tests.
