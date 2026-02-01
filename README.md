# Task Management Web Application 🚀

A full-stack task management application with authentication, advanced filtering, and comprehensive testing. Built with Node.js, Express, MySQL, and modern JavaScript.

[![Node.js CI](https://github.com/yourusername/task-management/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/task-management/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Features

### Core Features
- ✅ **Full CRUD Operations** - Create, Read, Update, Delete tasks
- 📝 **Task Management** - Title, Description, Status tracking
- 🎨 **Responsive UI** - Works on desktop, tablet, and mobile
- 💾 **Persistent Storage** - MySQL database
- 🚀 **RESTful API** - Well-structured API endpoints

### Bonus Features
- 🔐 **Authentication** - JWT-based user authentication (register/login)
- 🔍 **Advanced Filtering** - Filter by status, search by title/description
- 📊 **Sorting** - Sort by date, title, or status
- 🧪 **Testing** - Jest test suite with coverage reports
- 📚 **Documentation** - Comprehensive API and deployment docs
- 🔄 **CI/CD** - GitHub Actions workflow
- 🌐 **Deployment Ready** - Instructions for Heroku, Railway, Render, and VPS

## 📸 Demo

[Add screenshots or GIF of your application here]

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (Responsive Design with Flexbox/Grid)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js & Express.js
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing
- MySQL2 (Promise-based)

**Database:**
- MySQL

**Testing:**
- Jest
- Supertest

**DevOps:**
- GitHub Actions (CI/CD)
- Environment variable management

## 📁 Project Structure

```
task_management/
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD pipeline
├── __tests__/
│   └── api.test.js          # Test suite
├── database/
│   ├── connection.js        # Database connection pool
│   └── schema.sql           # Database schema & sample data
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── public/
│   ├── index.html           # Frontend HTML
│   ├── styles.css           # Responsive CSS styling
│   └── app.js               # Frontend JavaScript
├── .env                     # Environment variables (not in repo)
├── .gitignore               # Git ignore configuration
├── API.md                   # API documentation
├── CONTRIBUTING.md          # Contribution guidelines
├── DEPLOYMENT.md            # Deployment instructions
├── jest.config.js           # Jest configuration
├── package.json             # Dependencies and scripts
├── README.md                # This file
└── server.js                # Express server & API routes
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **XAMPP** (with MySQL) or standalone MySQL
- **npm** or yarn
- **Git** (for cloning repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/minalsalian/task-management.git
   cd task-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   The `.env` file is already configured for XAMPP defaults:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=task_management
   DB_PORT=3306
   PORT=3000
   JWT_SECRET=your-secret-key-change-in-production-2026
   JWT_EXPIRES_IN=7d
   ```
   
   **Important:** Change `JWT_SECRET` to a secure random string for production!

4. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start **MySQL** (required)
   - Start **Apache** (optional, for phpMyAdmin)

5. **Create database**
   
   **Option A: Using phpMyAdmin (Recommended)**
   - Open `http://localhost/phpmyadmin`
   - Click **SQL** tab
   - Copy and paste contents from `database/schema.sql`
   - Click **Go**

   **Option B: Command Line**
   ```bash
   mysql -u root < database/schema.sql
   ```

6. **Start the application**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

7. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

View coverage report:
```bash
npm test
# Coverage report will be in ./coverage/lcov-report/index.html
```

## 📚 Documentation

- **[API Documentation](API.md)** - Complete API reference with examples
- **[Deployment Guide](DEPLOYMENT.md)** - Deploy to Heroku, Railway, Render, or VPS
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to this project

## 🔐 Authentication

### Register a New User
```javascript
POST /api/auth/register
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Login
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

Returns JWT token - include in subsequent requests:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Query Parameters (GET /api/tasks)
- `status` - Filter by status: `pending`, `in-progress`, `completed`, `all`
- `search` - Search in title and description
- `sortBy` - Sort by: `created_at`, `updated_at`, `title`, `status`
- `order` - Sort order: `ASC`, `DESC`

**Example:**
```
GET /api/tasks?status=pending&search=meeting&sortBy=created_at&order=DESC
```

## 🎨 Features in Detail

### Task Management
- Create tasks with title, description, and status
- Update task details and status
- Delete tasks
- View all tasks in organized cards

### Filtering & Search
- Filter tasks by status (Pending, In Progress, Completed)
- Search tasks by title or description
- Sort by various fields
- Real-time updates

### User Authentication
- Secure password hashing with bcrypt
- JWT token-based authentication
- Token expiration and validation
- Protected routes for authenticated users

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interface
- Modern gradient design

## 🌐 Deployment

### Quick Deploy Options

**Heroku:**
```bash
heroku create your-app-name
heroku addons:create cleardb:ignite
git push heroku main
```

**Railway:**
- Connect GitHub repo
- Add MySQL database plugin
- Deploy automatically

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions**

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `` (empty) |
| `DB_NAME` | Database name | `task_management` |
| `DB_PORT` | MySQL port | `3306` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Built as part of a task management assignment
- Inspired by modern task management applications
- Thanks to all contributors

## 📈 Project Status

- ✅ Core CRUD operations
- ✅ Authentication system
- ✅ Advanced filtering
- ✅ Testing framework
- ✅ Documentation
- ✅ Deployment ready
- 🔄 Future enhancements: Real-time updates, notifications, task sharing

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure XAMPP MySQL is running
- Verify credentials in `.env`
- Check if database exists in phpMyAdmin

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill
```

### Authentication Not Working
- Verify JWT_SECRET is set in `.env`
- Check token is included in request headers
- Token format: `Bearer YOUR_TOKEN`

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Read documentation files

## 🔮 Future Enhancements

- [ ] Task categories/tags
- [ ] Task priorities
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Task sharing between users
- [ ] Real-time updates with WebSockets
- [ ] Email notifications
- [ ] Task comments
- [ ] Activity log
- [ ] Data export (CSV, PDF)

---

**⭐ If you find this project useful, please give it a star!**
