## E-Archive Kemahasiswaan TEL-U

### Description

This is a web application for E-Archive Kemahasiswaan TEL-U project. It is designed following the best practices and recommendations to ensure a clean, maintainable, and scalable codebase. It is also built with security in mind to protect against common security threats.

### Tech Stack

The application is built using [TypeScript](https://www.typescriptlang.org/) for strong typing, [pnpm](https://pnpm.io/) as a fast package manager, and [React](https://reactjs.org/) for building UI. It leverages [Next.js](https://nextjs.org/) to enable server-side rendering and static site generation. For styling, it uses [TailwindCSS](https://tailwindcss.com/).


### Getting started

1. Clone the repository
```
  git clone https://github.com/ahargunyllib/e-archive-mhs-tel-u.git
```

2. Set up the environment variables by copying .env.example
```
  cp .env.example .env
```

3. Install the required the dependencies
```
  pnpm install
```

4. Run the development server
```
  php artisan serve && pnpm dev
```
5. Open http://localhost:8000 with your browser to see the result.

### Architecture

The project is structured using a feature-based approach to ensure scalability, modularity, and maintainability. The `src` directory is organized into three main sections:

- **`app`**: Contains global application-level components, pages, layouts, and configurations, including the main entry point for pages and global styles.
- **`features`**: Houses feature-specific modules, where each module includes its own actions, services, components, containers, and types to encapsulate functionality and logic for that feature.
- **`shared`**: Includes reusable components, hooks, libraries, and utilities that are shared across different features and pages, promoting consistency and code reusability.

### Features

- **State Management**: Utilizes [Zustand](https://github.com/pmndrs/zustand), a minimalistic state management solution for React, to handle global state across the application.
- **Form Handling**: Employs [React Hook Form](https://react-hook-form.com/), a library that manages forms efficiently with minimal re-renders, offering built-in validation and integration with [Zod](https://github.com/colinhacks/zod).
- **Data Fetching**: Integrates [React Query](https://tanstack.com/query/latest), a data-fetching library that simplifies data management by handling caching, synchronization, and background updates.
- **Search Query Management**: Incorporates [Nuqs](https://github.com/nuqs/nuqs), a utility for creating and managing complex search query systems in React applications.
- **Table Management**: Utilizes [TanStack Table](https://tanstack.com/table/latest), a powerful and flexible table library for displaying large datasets, supporting features like pagination, sorting, and filtering.
- **Schema Validation**: Employs [Zod](https://github.com/colinhacks/zod), a TypeScript-first schema validation library used for form validation and data parsing.
- **Code Formatting**: Utilizes [Biome](https://github.com/biome/biome), a tool for managing and formatting code in a consistent and optimized way across the project.
- **Animations**: Integrates [Motion](https://motion.dev/), a library for adding animations to React components, enabling smoother transitions and interactions.
- **Rich Text Editing**: Incorporates [CKEditor](https://ckeditor.com/ckeditor-5/), a rich text editor for building complex text-based content areas, offering features like formatting, media embedding, and more.
- **Data Visualization**: Utilizes [Recharts](https://recharts.org/en-US/), a charting library for creating interactive and customizable data visualizations.
- **3D Graphics**: Integrates [Three.js](https://threejs.org/), a 3D graphics library for rendering interactive 3D content in the browser.
- **Safe Actions**: Employs [Next Safe Action](https://github.com/next-safe-action/next-safe-action), a utility that ensures safe execution of actions in Next.js, providing error handling and recovery mechanisms to ensure smooth user experience during server-side or client-side actions.

### Contributing

1. Make sure to run husky prepare command
```[]
  pnpm prepare
```

2. You can start contributing by reading [CONVENTION](./CONVENTION.md) for commit convention
