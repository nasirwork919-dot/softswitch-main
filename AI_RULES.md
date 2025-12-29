# AI Development Rules for This Application

This document outlines the core technologies used in this project and provides guidelines for library usage to ensure consistency, maintainability, and best practices.

## Tech Stack Overview

*   **Frontend Framework**: React for building dynamic and interactive user interfaces.
*   **Language**: TypeScript is the preferred language for new components and features, enhancing code quality and developer experience.
*   **Build Tool**: Vite for a fast development server and optimized production builds.
*   **Styling**: Tailwind CSS for a utility-first approach to styling, ensuring responsive and consistent design across the application.
*   **Routing**: React Router DOM for managing client-side navigation and defining application routes.
*   **Icons**: Lucide React provides a comprehensive and customizable set of SVG icons.
*   **UI Components**: Shadcn/ui components are integrated and should be prioritized for common UI elements.
*   **Charting**: Chart.js (with React Chart.js 2) and Recharts are available for data visualization.
*   **Mapping**: Leaflet and React Leaflet are used for interactive map functionalities.
*   **Tabbed Interfaces**: React Tabs is used for creating organized, tab-based content sections.

## Library Usage Rules

To maintain a cohesive and efficient codebase, please adhere to the following guidelines when developing new features or modifying existing ones:

1.  **React**: Always use React for all UI development.
2.  **TypeScript**: All new components, hooks, and utility files **must** be written in TypeScript (`.tsx` or `.ts`). Existing `.jsx` files can be refactored to TypeScript during significant modifications.
3.  **Styling**:
    *   **Tailwind CSS**: Use Tailwind CSS classes exclusively for all styling. Avoid custom CSS files or inline styles unless absolutely necessary for integrating third-party libraries that do not offer direct Tailwind compatibility.
    *   **Responsive Design**: All components and layouts must be designed with responsiveness in mind, utilizing Tailwind's responsive utility classes.
4.  **Routing**: Use `react-router-dom` for all application navigation. All top-level routes should be defined in `src/App.jsx` (or `src/App.tsx`).
5.  **Icons**: Use icons from the `lucide-react` library.
6.  **UI Components**:
    *   **Shadcn/ui**: Leverage pre-built components from `shadcn/ui` whenever possible (e.g., buttons, inputs, cards, modals, tables). These components are already styled with Tailwind CSS and follow best practices.
    *   **Custom Components**: If a required UI element is not available in `shadcn/ui` or needs significant customization, create a new, small, and focused component in `src/components/` using Tailwind CSS.
7.  **Charting**: For data visualization, prefer `Chart.js` (via `react-chartjs-2`) or `Recharts`. Choose the library that best suits the specific chart type and data requirements, aiming for consistency within a given dashboard or report.
8.  **Mapping**: For any map-related features, use `react-leaflet` and `leaflet`.
9.  **Tabs**: For creating tabbed interfaces, use the `react-tabs` library.
10. **File Structure**:
    *   Place pages in `src/pages/`.
    *   Place reusable UI components in `src/components/`.
    *   Place utility functions in `src/utils/`.
    *   Place custom React hooks in `src/hooks/`.
    *   Ensure directory names are all lower-case.
11. **Code Quality**:
    *   Keep components and files small and focused on a single responsibility.
    *   Avoid partial implementations; all code changes must be fully functional.
    *   Do not over-engineer solutions; prioritize simplicity and elegance.
    *   Do not use `try/catch` blocks for error handling unless explicitly requested, to allow errors to bubble up for easier debugging.