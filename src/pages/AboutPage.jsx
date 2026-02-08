// src/pages/AboutPage.jsx

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About This Todo App</h1>

      <p>
        This todo app is designed to help you stay organized and productive by
        keeping track of your daily tasks in a simple and intuitive way.
      </p>

      <section>
        <h2>App Features</h2>
        <ul>
          <li>Create, edit, and delete todos</li>
          <li>Mark tasks as completed</li>
          <li>Persistent navigation with protected routes</li>
          <li>Clean and responsive user interface</li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <ul>
          <li>
            <strong>React</strong> – for building the user interface
          </li>
          <li>
            <strong>React Router</strong> – for client-side routing
          </li>
          <li>
            <strong>Vite</strong> – for fast development and build tooling
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AboutPage;
