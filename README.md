# Todo List (React + Vite)

A professional-grade Todo List application built with React, Vite, and Tailwind CSS. Features authentication, real-time task management, filtering, and sorting with a responsive, accessible interface designed for both desktop and mobile users.

## 📌 Live Demo

Visit the deployed application:

- **Live App**:Create an account at the hosted site https://react-todo-list-v3.onrender.com/
- **Sign-Up Flow**:then log in via https://abc.com/ with your credentials

---

## ✨ Features

- **Add, Edit & Delete Todos** – Create new tasks and manage existing ones with ease
- **Mark Complete/Incomplete** – Toggle todo status with a single click
- **Filter by Status** – View all, active, or completed todos
- **Sort Todos** – Organize by date, alphabetical order, or custom sorting
- **User Authentication** – Secure login and account management via Auth Context
- **Responsive Design** – Fully responsive layout for desktop, tablet, and mobile
- **Form Validation** – Real-time input validation for better UX
- **Accessible UI** – Keyboard-friendly navigation and WCAG-compliant components
- **Protected Routes** – RequireAuth pattern ensures only authenticated users access todos

---

## 🛠️ Technologies Used

- **Frontend Framework**: React (JSX)
- **Build Tool**: Vite (ultra-fast bundler)
- **Styling**: Tailwind CSS (utility-first CSS framework)
- **State Management**: Context API + useReducer pattern
- **Icons**: react-icons
- **Routing**: React Router v6 (inferred from project structure)
- **Code Quality**: ESLint
- **Styling Framework**: PostCSS

---

## 📸 Screenshots

### Desktop View

![Desktop View](https://via.placeholder.com/800x600?text=Desktop+Todo+List)

### Mobile View

![Mobile View](https://via.placeholder.com/400x600?text=Mobile+Todo+List)

_Note: Add actual screenshots by replacing placeholder URLs with images of your app in action._

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Faisal2320/todo-list.git
   cd todo-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3001` (or the URL shown in your terminal)

### Local Authentication Testing

- Create a test account on the app login page
- Enter your credentials to sign in
- Start managing your todos

---

## 📋 Available Scripts

| Script            | Description                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start development server with hot module reloading |
| `npm run build`   | Create optimized production build                  |
| `npm run preview` | Preview the production build locally               |
| `npm run lint`    | Run ESLint to check code quality                   |

---

## 🏗️ Project Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Root component & routing
├── index.css               # Global styles
├── App.css                 # Component-specific styles
├── components/
│   └── RequireAuth.jsx     # Route protection wrapper
├── pages/
│   ├── HomePage.jsx        # Landing page
│   ├── TodosPage.jsx       # Main todos interface
│   ├── LoginPage.jsx       # User authentication
│   ├── ProfilePage.jsx     # User profile
│   ├── AboutPage.jsx       # About section
│   └── NotFoundPage.jsx    # 404 error page
├── features/
│   ├── Logon.jsx          # Login form component
│   ├── Logoff.jsx         # Logout functionality
│   └── Todos/
│       ├── TodoForm.jsx    # Create/edit todo form
│       └── TodoList/
│           ├── TodoList.jsx       # Todo list container
│           └── TodoListItem.jsx   # Individual todo item
├── contexts/
│   └── AuthContext.jsx     # Authentication provider & logic
├── reducers/
│   └── todoReducer.js      # Todo state reducer
├── hooks/
│   └── useEditableTitle.js # Custom hook for editable titles
├── utils/
│   ├── todoValidation.js   # Input validation functions
│   └── useDebounce.js      # Debounce hook for search
└── shared/
    ├── Header.jsx          # App header
    ├── Navigation.jsx      # Navigation menu
    ├── FilterInput.jsx     # Search filter component
    ├── StatusFilter.jsx    # Status filter component
    ├── SortBy.jsx         # Sort options component
    └── TextInputWithLabel.jsx # Reusable input component
```

---

## 🎨 Design Decisions

### Styling Approach

- **Tailwind CSS** was chosen for rapid development and consistent design system. Utility classes provide flexibility without writing custom CSS.
- **Responsive Design**: Mobile-first approach ensures excellent UX on all devices.
- **Accessibility**: Semantic HTML elements and ARIA attributes ensure compliance with WCAG guidelines.

### State Management

- **Context API + useReducer** provides lightweight, scalable state management without external dependencies.
- Authentication state is centralized in `AuthContext.jsx` for easy user management.
- Todo operations (add, delete, update) use a reducer pattern for predictable state changes.

### Component Architecture

- **Separation of Concerns**: UI components, pages, and features are organized logically.
- **Reusable Components**: Shared components like `TextInputWithLabel` and `FilterInput` reduce code duplication.
- **Protected Routes**: `RequireAuth` wrapper prevents unauthorized access to protected pages.

### Form Validation

- **Real-time Validation**: Input validation happens as users type (with debouncing for performance).
- **User Feedback**: Clear error messages guide users toward valid input.

---

## 🎯 Future Improvements

- **Local Storage Persistence**: Save todos to browser storage so they persist across sessions
- **Backend Integration**: Connect to a real API (Node.js/Express, Firebase, etc.) for data persistence
- **Todo Categories/Tags**: Organize todos by categories or add custom tags
- **Drag & Drop**: Reorder todos with intuitive drag-and-drop interface
- **Due Dates & Reminders**: Add deadline tracking and notification system
- **Dark Mode**: Toggle between light and dark themes
- **Collaborative Lists**: Share todo lists with other users in real-time
- **Export/Import**: Download todos as CSV or JSON; import from other apps
- **Unit & Integration Tests**: Comprehensive test coverage with Jest and React Testing Library
- **PWA Capabilities**: Offline support and installable app functionality
- **Analytics**: Track user behavior and feature usage

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

The MIT License is permissive and allows you to:

- ✅ Use the software for any purpose
- ✅ Copy, modify, and distribute
- ✅ Include in proprietary applications

As long as you include a copy of the license and copyright notice.

---

## 👤 Contact & Links

- **GitHub**: https://github.com/Faisal2320
- **Portfolio**:
- **Email**: fsaeed033@gmail.com

For questions, issues, or collaboration inquiries, please open an issue on the GitHub repository or reach out via email.

---

## 🙏 Acknowledgements

Created as part of a React learning assignment with Code the Dream. Showcases best practices in:

- Component-based architecture
- State management patterns
- Responsive web design
- Accessibility standards
- Professional documentation

Feel free to fork, adapt, and use this project as a learning resource or starting point for your own todo applications.
