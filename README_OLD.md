# Task Management Web Application

A full-stack task management application built with Node.js, Express, MySQL, HTML, CSS, and JavaScript.

## Features

- ✅ Create, Read, Update, and Delete (CRUD) tasks
- 📝 Task fields: Title, Description, Status (Pending, In Progress, Completed)
- 🎨 Responsive UI design
- 🔍 Filter tasks by status
- 💾 Persistent storage with MySQL database
- 🚀 RESTful API architecture

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (Responsive Design)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- MySQL2

**Database:**
- MySQL

## Project Structure

```
task_management/
├── database/
│   ├── connection.js      # Database connection configuration
│   └── schema.sql         # Database schema and sample data
├── public/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── app.js             # Frontend JavaScript
├── server.js              # Express server and API routes
├── package.json           # Project dependencies
├── .env                   # Environment variables
└── .gitignore             # Git ignore file
```

## Prerequisites

- Node.js (v14 or higher)
- XAMPP (with MySQL)
- npm or yarn

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start XAMPP

- Open XAMPP Control Panel
- Start **Apache** (for phpMyAdmin access)
- Start **MySQL** database server

### 3. Configure Database

The `.env` file is already configured with XAMPP default settings:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Empty by default in XAMPP
DB_NAME=task_management
DB_PORT=3306
PORT=3000
```

If you've changed your XAMPP MySQL password, update `DB_PASSWORD` accordingly.

### 4. Create Database

**Option A: Using phpMyAdmin (Recommended for XAMPP)**

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click on "SQL" tab
3. Copy and paste the contents of `database/schema.sql`
4. Click "Go" to execute

**Option B: Using MySQL Command Line**

```bash
mysql -u root < database/schema.sql
```

**Option C: Manual SQL Execution**

```sql
CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. Start the Node.js Server

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Get All Tasks
```
GET /api/tasks
```

### Get Single Task
```
GET /api/tasks/:id
```

### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Task description",
  "status": "pending"
}
```

### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

### Delete Task
```
DELETE /api/tasks/:id
```

## Usage

1. **Add a Task:** Fill in the form at the top with title, description, and status
2. **View Tasks:** All tasks are displayed in cards below the form
3. **Filter Tasks:** Use the filter dropdown to show specific status tasks
4. **Edit Task:** Click the "Edit" button on any task card
5. **Delete Task:** Click the "Delete" button on any task card

## Features Details

### Task Status Options
- **Pending:** Tasks that haven't been started
- **In Progress:** Tasks currently being worked on
- **Completed:** Finished tasks

### Responsive Design
The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Troubleshooting

### Database Connection Error
- Ensure XAMPP MySQL is running (green in Control Panel)
- Verify credentials in `.env` file (default password is empty)
- Check if database `task_management` exists in phpMyAdmin
- Confirm MySQL port is 3306 in XAMPP config

### Port Already in Use
- Change the PORT in `.env` file
- Kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill
  ```

## License

ISC

## Author

Built as part of a task management assignment
