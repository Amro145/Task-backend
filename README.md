# 🚀 Task Manager Backend API

A robust, production-ready Express.js REST API providing complete authentication and task management capabilities. Seamlessly built with MongoDB, secured with JWTs, and explicitly configured for serverless Vercel deployments.

## ✨ Features
- **Secure Authentication:** JWT-based user authorization with secure, HTTP-only cookie parsing.
- **RESTful Architecture:** Clean, stateless CRUD operations for Task management.
- **Persistent Data:** Connected to MongoDB via Mongoose schemas.
- **Serverless Ready:** Configured to deploy smoothly on Vercel without buffering timeouts or CORS preflight failures. 
- **User Protection:** Middleware routes preventing unauthorized entry.

## 🛠️ Technology Stack
- **Node.js** & **Express** - Core framework
- **MongoDB** & **Mongoose** - Database & Object Data Modeling
- **JSON Web Tokens (JWT)** - State security & authorization
- **Bcrypt** - Password hashing
- **Cookie-Parser** - Secure Cross-Origin cookie transmission
- **Cors** - Multi-environment whitelisting 

---

## 🚦 Getting Started

### 1. Installation
Clone the repository and install the backend dependencies.
```bash
cd Task-backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the root backend directory:
```env
PORT=5000
DB_URL=mongodb+srv://<your-username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Start Development Server
Run the local database and API via nodemon:
```bash
npm run dev
```

---

## 🌎 API Endpoints

### User Authentication (`/api/users`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/signup`| Register a new user | ❌ No |
| `POST` | `/signin`| Authenticate and receive cookie | ❌ No |
| `GET`  | `/logout`| Destroy active session cookie | ❌ No |
| `GET`  | `/me`    | Retrieve current profile session | ✅ Yes |

### Task Management (`/api`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET`  | `/`      | Fetch all tasks for logged-in user | ✅ Yes |
| `POST` | `/`      | Create a new task | ✅ Yes |
| `PUT`  | `/UpdateTask/:id` | Update task fields (i.e. status) | ✅ Yes |
| `PUT`  | `/CompleteTask/:id`| Force task to 'completed' status | ✅ Yes |
| `DELETE`| `/DeleteTask/:id` | Remove a task permanently | ✅ Yes |

---

## 🚀 Deployment (Vercel)
This project includes a `vercel.json` file designed to natively mount your Express REST framework directly onto Serverless Node edges. 
Remember to whitelist your frontend URL strings in `server.js` `cors({ origin: [...] })`!
