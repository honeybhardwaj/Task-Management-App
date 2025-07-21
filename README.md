
# 📋 Task Management App

A full-stack **Task Management Application** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can create, update, delete, and organize tasks with a clean and responsive UI. Includes JWT authentication and an analytics dashboard for insights.

---

## 🚀 Live Demo

-  [Task Manager](https://task-management-app-ten-teal.vercel.app/login)


---

## 🌟 Features

- ✅ **User Authentication**
  - Secure signup/login using JWT.
  - Password hashing with bcrypt.  
- ✅ **Task Management**
  - Create, edit, delete, and organize tasks by priority and due date.  
- ✅ **Analytics Dashboard**
  - Charts showing task distribution, completion rates, and upcoming deadlines.  
- ✅ **Responsive Design**
  - Mobile-first design for all screen sizes.  
- ✅ **Search & Filter**
  - Filter tasks by status (completed/pending) and search by title/description.

---

## 🛠 Tech Stack

| Technology          | Usage                        |
|----------------------|-------------------------------|
| **Frontend**         | React.js (with Vercel hosting)|
| **Backend**          | Node.js + Express.js (Render) |
| **Database**         | MongoDB Atlas (cloud DB)      |
| **Authentication**   | JWT + bcrypt                  |
| **Charts**           | Chart.js / Recharts           |
| **Styling**          | Material-UI / TailwindCSS     |

---

## 📦 Folder Structure

```
/frontend    → React.js client
/backend     → Node.js/Express server
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/task-management-app.git
cd task-management-app
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in `backend/` with:  
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```

- Start backend:
  ```bash
  npm start
  ```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```
- In `frontend/src/api.js`, set API base URL:
  ```js
  const API_URL = "https://task-management-app-backend.onrender.com/api";
  ```

- Start frontend:
  ```bash
  npm start
  ```

---

## 📡 API Endpoints (Backend)

| Method | Endpoint           | Description              |
|--------|---------------------|---------------------------|
| POST   | `/api/auth/signup` | Register new user         |
| POST   | `/api/auth/login`  | Login existing user       |
| GET    | `/api/tasks`       | Get all tasks             |
| POST   | `/api/tasks`       | Create a new task         |
| PUT    | `/api/tasks/:id`   | Update a task             |
| DELETE | `/api/tasks/:id`   | Delete a task             |

---

