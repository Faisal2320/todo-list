// src/pages/AboutPage.jsx
import todoBoard_01 from "../assets/img/todoBoard_01.gif";

const AboutPage = () => {
  return (
    <div className="max-w-3xl h-screen mx-auto px-4 py-10 space-y-8 bg-[url('../src/assets/loading.gif')] ">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800">About This Todo App</h1>

      {/* Intro Paragraph */}
      <p className="text-gray-700 leading-relaxed text-lg">
        This todo app is designed to help you stay organized and productive by
        keeping track of your daily tasks in a simple and intuitive way.
      </p>
      <div className="container relative ">
        <div className="absolute z-0 top-0 right-0 w-80 opacity-0 md:opacity-80">
          <img src={todoBoard_01} alt="" />
        </div>
        <div className=" absolute left z-10">
          {/* Features Section */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              App Features
            </h2>

            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Create, edit, and delete todos</li>
              <li>Mark tasks as completed</li>
              <li>Persistent navigation with protected routes</li>
              <li>Clean and responsive user interface</li>
            </ul>
          </section>

          {/* Technologies Section */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Technologies Used
            </h2>

            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                <strong className="font-semibold text-gray-900">React</strong> –
                for building the user interface
              </li>
              <li>
                <strong className="font-semibold text-gray-900">
                  React Router
                </strong>{" "}
                – for client-side routing
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Vite</strong> –
                for fast development and build tooling
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
