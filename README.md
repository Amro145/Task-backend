# CRUD Using Redux (Backend)

This is the backend service for the CRUD application, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js
- MongoDB

## Installation


1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `backend` directory and add your MongoDB connection string and port:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

## Running the Server

To start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

Base URL: `/api`

| Method | Endpoint             | Description           |
| :----- | :------------------- | :-------------------- |
| GET    | `/`                  | Get all tasks         |
| POST   | `/`                  | Create a new task     |
| GET    | `/task/:id`          | Get a specific task   |
| PUT    | `/UpdateTask/:id`    | Update a task         |
| PUT    | `/CompleteTask/:id`  | Mark task as complete |
| DELETE | `/DeleteTask/:id`    | Delete a task         |

## Technologies

- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling
- **Cors**: Cross-Origin Resource Sharing
- **Dotenv**: Environment variable management
- **Nodemon**: Development utility
