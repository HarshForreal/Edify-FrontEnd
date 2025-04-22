# Edify - Frontend

**Edify** is a full-stack online learning platform where users can register as Students or Instructors. Instructors can create and manage online courses, while students can browse and enroll in courses. This repository contains the frontend implementation of **Edify**, built with **React.js** and styled using **Tailwind CSS**.

## Features
- User authentication (Login/Signup) with **JWT** (JSON Web Token)
- Role-based access control (Student & Instructor)
- Instructors can:
  - Create and manage courses
  - Add course content (YouTube video links & rich text explanations)
  - Edit and delete their courses
- Students can:
  - Browse and filter courses by category
  - Enroll in courses
  - Track session progress and view course details
  - Watch embedded YouTube videos and read session content
  - Mark sessions as "completed"

## Technologies Used
- **React.js** - Frontend JavaScript library
- **React Router** - For handling page navigation
- **Redux** or **Context API** - For state management
- **Tailwind CSS** - For styling the frontend
- **Axios** - For making API requests to the backend
- **React-Toastify** - For displaying notifications
- **React-Player** - For embedding YouTube videos
- **TipTap Editor** - For rich text editing in course descriptions

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/edify-frontend.git
    cd edify-frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the necessary environment variables:
    ```bash
    REACT_APP_API_URL=http://localhost:5000  # Backend API URL
    ```

4. Run the frontend:
    ```bash
    npm start
    ```
    The frontend application will now be running at `http://localhost:3000`.

## Directory Structure
- `src/`: Contains all the React components and application logic
- `src/components/`: UI components like Navbar, CourseCard, etc.
- `src/pages/`: React pages for different views (Home, Login, Dashboard, etc.)
- `src/store/`: Contains Redux store setup (if using Redux)
- `src/assets/`: Static assets like images, icons, etc.

## Key Features in the Frontend
- **Authentication**: Users can sign up, log in, and access role-specific routes.
- **Course Management**: Instructors can create, edit, and delete courses. Students can browse, view, and enroll in courses.
- **Progress Tracking**: Students can track their session progress with visual indicators like progress bars.
- **Rich Text Editor**: Instructors can add rich text explanations for each session using the **TipTap Editor**.
- **YouTube Video Embeds**: Courses can contain embedded YouTube videos using **React-Player**.
- **Notifications**: **React-Toastify** is used to show user-friendly notifications (e.g., course enrolled, session completed).

## API Endpoints
The frontend communicates with the backend API (running at `http://localhost:5000` by default):
- **POST /api/auth/signup** - Register a new user (Student/Instructor)
- **POST /api/auth/login** - User login
- **GET /api/courses** - Get all courses
- **POST /api/courses** - Create a new course (Instructor only)
- **GET /api/courses/:id** - Get a specific course details
- **PUT /api/courses/:id** - Update a course (Instructor only)
- **DELETE /api/courses/:id** - Delete a course (Instructor only)

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request.

## Acknowledgements
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [React-Toastify](https://fkhadra.github.io/react-toastify/)
- [React-Player](https://www.npmjs.com/package/react-player)
- [TipTap Editor](https://tiptap.dev/)

