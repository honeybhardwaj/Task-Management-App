# Task Management App (Frontend)

A modern, responsive task management frontend built with React and Material UI. Includes authentication, task CRUD features, and an analytics dashboard.

---

## 🔧 Tech Stack

- **React** (with React Router)
- **Material UI** for UI components
- **Axios** for API calls
- **Recharts** for data visualization
- **JWT-based authentication** with context

---

## 🚀 Features

- 🔐 Login/Signup with JWT
- 📋 Task list with search and priority filtering
- 📝 Create/Edit/Delete tasks
- ✅ Mark tasks as completed
- 📊 Dashboard with priority distribution & completion rate
- 📱 Fully responsive layout with MUI

---

## 📁 Folder Structure (src)
```
src/
├── components/       # Navbar
├── pages/            # Login, Signup, TaskForm, TaskList, Dashboard
├── utils/            # API, auth context, route protection
├── App.js            # Main routing
└── index.js          # React entry point
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Ensure backend is running
The app connects to a backend running at `http://localhost:5000/api`. Make sure your Node.js/Express backend is running and supports these endpoints:
- `POST /auth/signup`
- `POST /auth/login`
- `GET/POST/PUT/DELETE /tasks`

### 4. Start the frontend
```bash
npm start
```

---

## 📷 Screenshots
- Login page
- Task List view
- Dashboard with charts

---

## 🧪 Optional Improvements
- Add toast notifications
- Add dark mode support
- Deploy to Vercel / Netlify

---

## 📄 License
MIT

---

> Built with ❤️ for MERN stack practice.
