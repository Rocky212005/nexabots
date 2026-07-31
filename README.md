# 🚀 MERN Kanban Task Management System

A full-stack **Kanban Board** application built with the **MERN Stack** that enables teams to create boards, manage tasks, and collaborate in real-time using **Socket.IO**.

---

## 📸 Preview

> Add screenshots or a GIF here

```
Dashboard
├── Create Board
├── View Boards
└── Manage Tasks

Board
├── Todo
├── In Progress
└── Done
```

---

# ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 📋 Boards
- Create Board
- View All Boards
- View Single Board
- Board Details

### ✅ Tasks
- Create Task
- Update Task
- Delete Task
- View Tasks by Board
- Assign Task to Users
- Task Status
  - Todo
  - In Progress
  - Done

### ⚡ Real-Time Collaboration
- Built with **Socket.IO**
- Join board rooms
- Real-time task creation
- Real-time task updates
- Real-time task deletion
- No page refresh required

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Socket.IO Client

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Socket.IO

---

# 📂 Project Structure

```
kanban-board/
│
├── client/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── socket.js
│   └── App.jsx
│
└── server/
    │
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── socket/
    ├── app.js
    └── server.js
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/kanban-board.git
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 🔑 Environment Variables

```env
PORT=

MONGO_URI=

JWT_SECRET=
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Boards

| Method | Endpoint |
|----------|-----------------------------|
| GET | /api/board |
| POST | /api/board |
| GET | /api/board/:id |
| PUT | /api/board/:id |
| DELETE | /api/board/:id |

---

## Tasks

| Method | Endpoint |
|----------|--------------------------------|
| GET | /api/task/board/:boardId |
| POST | /api/task |
| GET | /api/task/:id |
| PUT | /api/task/:id |
| DELETE | /api/task/:id |

---

# 🔄 Real-Time Workflow

```
User

│

Creates Task

│

Axios POST

│

Express Server

│

MongoDB

│

Socket.IO

│

Broadcast Event

│

All Connected Users

│

React Updates UI
```

---

# 🔌 Socket.IO Events

### Client

```
join-board
```

Joins a specific board room.

---

### Server

```
task-created
```

Broadcasts when a new task is created.

```
task-updated
```

Broadcasts when a task is updated.

```
task-deleted
```

Broadcasts when a task is deleted.

---

# 🔒 Authentication Flow

```
Register

↓

Login

↓

JWT Token

↓

Local Storage

↓

Protected APIs

↓

Dashboard
```

---

# 🎯 Future Improvements

- Drag & Drop (react-beautiful-dnd)
- Board Members
- Comments
- Activity Log
- Notifications
- Due Dates
- Labels
- File Attachments
- Search Tasks
- Dark Mode
- Email Invitations

---

# 📷 Screenshots

## Login

_Add Screenshot_

---

## Dashboard

_Add Screenshot_

---

## Board Details

_Add Screenshot_

---

## Create Task

_Add Screenshot_

---

# 👨‍💻 Author

**Rahul Mishra**

- 💼 MERN Stack Developer
- 🌐 Portfolio: https://your-portfolio.vercel.app
- 💻 GitHub: https://github.com/yourusername
- 🔗 LinkedIn: https://linkedin.com/in/yourprofile

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.
