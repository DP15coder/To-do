# Todo App

A full-stack todo application built with React and Node.js that allows users to create, manage, and organize their tasks efficiently.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Todo Lists**: Create multiple todo lists to organize tasks
- **Task Management**: Add, edit, delete ,Update
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Updates**: Instant updates across the application

## Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/             # Images and SVGs
│   │   │   └── react.svg
│   │   ├── components/         # Reusable components
│   │   │   ├── auth/           # Authentication components
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── layout/         # Layout components
│   │   │   │   └── Header.jsx
│   │   │   └── todo/           # Todo-related components
│   │   │       ├── CreateTodoForm.jsx
│   │   │       ├── TodoItemCard.jsx
│   │   │       └── TodoListCard.jsx
│   │   ├── contexts/           # React contexts
│   │   │   └── AuthContext.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Auth.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── TodoItem.jsx
│   │   ├── services/           # API service layer
│   │   │   ├── authService.js
│   │   │   ├── axiosInstance.js
│   │   │   └── todoService.js
│   │   └── utils/              # Frontend utilities
│   │       └── validation.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── server/                     # Node.js backend
│   ├── config/                 # Database configuration
│   │   └── db.js
│   ├── controllers/            # Route controllers
│   │   ├── authController.js
│   │   └── todoController.js
│   ├── middleware/             # Custom middleware
│   │   ├── authMiddleware.js
│   │   ├── authValidator.js
│   │   └── todoValidator.js
│   ├── models/                 # Database models
│   │   ├── TodoList.js
│   │   └── User.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   └── todoRoutes.js
│   ├── services/               # Service layer
│   │   ├── authService.js
│   │   └── todoService.js
│   ├── utils/                  # Utility functions
│   │   └── generateToken.js
│   ├── swagger.js              # Swagger API docs config
│   ├── swagger.json            # Generated Swagger docs
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── server.js               # Server entry point
├── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Todo
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/todoapp
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_HOSTS_DEV=http://localhost:5173|http://localhost:8080
   FRONTEND_HOSTS=https://to-do-git-main-draksha-patles-projects.vercel.app/auth
   PORT=8080
   ```

5. **Start the development servers**
   
   Terminal 1 (Server):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Client):
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080

## API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Todo Routes
- `GET /api/todos` - Get all todo lists
- `POST /api/todos` - Create new todo list
- `PUT /api/todos/:todoId` - Update todo list
- `DELETE /api/todos/:todoId` - Delete todo list
- `GET /api/todos/:todoId/items` - Get todo items
- `POST /api/todos/:todoId/items` - Create todo item
- `PUT /api/todos/:todoId/items/:itemId` - Update todo item
- `DELETE /api/todos/:todoId/items/:itemId` - Delete todo item

## Features in Detail

### Authentication
- Secure user registration with input validation (see `middleware/authValidator.js`)
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes and middleware (`middleware/authMiddleware.js`)
- Automatic token verification

### Todo Management
- Create multiple todo lists for organization
- Add tasks with titles and optional descriptions
- Edit task details inline
- Delete tasks with confirmation
- Search through tasks

### User Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Toast notifications for user feedback
- Loading states and error handling
- Intuitive navigation and user experience

## Development

### Available Scripts

**Client:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Server:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Code Quality
- ESLint configuration for consistent code style
- Modern React patterns with hooks
- Clean architecture with separated concerns
- Error handling and validation
- Secure authentication practices

## Deployment

### Environment Variables
Make sure to set the following environment variables in production:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_HOSTS` - Allowed frontend origins (pipe-separated)
- `PORT` - Server port (default: 8080)

### Build Steps
1. Build the React frontend:
   ```bash
   cd client
   npm run build
   ```

2. Configure server to serve static files
3. Deploy to your preferred hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Things to add

1. OpenAPI schema generator
2. Service Layer
3. Seperate and nested Todo's and Items
4. Refresh Tokens in JWT
5. Consistent file names
