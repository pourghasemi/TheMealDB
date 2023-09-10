# The Meal DB

The Meal DB is a **Responsive** web application for searching food recipes.
  
  The most important features of the app are the search capability by:
  *  Meal name
  *  Meal category
  *  Meal Area (country)
  *  Ingredients

It also shows the list of **categories** and **areas** in the side-bar for easy access.   
  

##  Install the application

```sh
npm install
```

### Compile and Start the application for development environment

```sh
npm run dev
```

### Running tests

```sh 
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

## Architecture

### Folder structure

**src** - Contains the source code for the project, it consist of the following sub-folders:
    **assets**: Images and css files.
    **components**: The definitions of the reusable components in the project.
    **composables**: The definitions of reusable logics used in the project.
    **router**: The single page that handles multiple routes.
    **services**: API calls and related configurations.
    **store**: Implementation for state management.
    **types**: Types/models that are used in the project.
    **views**: The project pages.

### Framework and Libraries 
    - Vue 3
    - VueRouter
    - Typescript
    - Tailwind
    - Jest
    - Eslint
    - Prettier

