````markdown
# Mini Todo App

A mini todo app which can add, get, edit, and delete tasks.

## Tech Stack
- Frontend: Next.js + TypeScript + React
- Backend: Express (Node.js)
- Database: MySQL (via XAMPP)

## Why Express
I'm more comfortable with Express and have more knowledge in it.

## Database Setup (XAMPP)
1. Open XAMPP and start MySQL
2. Open phpMyAdmin
3. Create the database, then import `mydb.sql`
4. I particularly use SQL this way — you can use proper SQL import if you prefer

## Backend Setup
Import all requirements like express, cors, mysql, etc.

```bash
cd backend
npm install
node server.js
````

Runs on [http://localhost:4000](http://localhost:4000)

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000)

## Features

* Add a task
* Get all tasks
* Update task status
* Delete a task
* Basic input validation (empty title blocked)
* Loading and error states

```
```

## 📸 Screenshots

### Todo Application
![Todo Application](./screenshots/todo_page.png)
### Database
![MySQL Database](./screenshots/database.png)
