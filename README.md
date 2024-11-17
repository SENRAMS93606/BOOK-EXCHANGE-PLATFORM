# Book Exchange Platform

## Overview

The Book Exchange Platform is a web application that allows users to exchange books with each other. Users can list books they own, browse books listed by others, and request exchanges. The platform is built using a modern web stack, including Vue.js for the frontend, Express.js for the backend, and MongoDB for the database.

## Technologies Used

- **Frontend:** Vue.js, Vite, Element Plus
- **Backend:** Express.js, Node.js
- **Database:** MongoDB (with Mongoose for object data modeling)
- **Authentication:** Sessions with MongoDB store

## Features

1. **User Authentication:**

   - User registration and login
   - Session management

2. **Book Management:**

   - Add, edit, and delete books
   - View book details

3. **Book Browsing:**

   - Browse books listed by other users
   - Filter and search books based on various criteria

4. **Exchange Requests:**
   - Request exchanges with other users
   - Manage incoming and outgoing exchange requests

## Project Structure

### Frontend (Vue.js)

**Component-Based Architecture:**

- `App.vue`: Main application component
- `MainLayout.vue`: Layout component with header and sidebar
- `Header.vue`: Header component with search and user actions
- `Sidebar.vue`: Sidebar component for navigation
- `HomePage.vue`: Home page component
- `CardComp.vue`: Component to display books in card format
- `CreateNewForm.vue`: Form to add a new book
- `ExchangeRequestForm.vue`: Form to request an exchange
- `Login.vue`: User login component
- `Register.vue`: User registration component
- `ForgotPassword.vue`: Forgot password component
- `ResetPassword.vue`: Reset password component

### Backend (Express.js)

**Modular Architecture:**

- `index.js`: Main server file
- `authRoutes.js`: Routes for user authentication
- `bookRoutes.js`: Routes for book management
- `authStore.js`: Service for user authentication logic
- `bookStore.js`: Service for book management logic
- `User.js`: Mongoose model for user
- `Book.js`: Mongoose model for book
- `ExchangeRequest.js`: Mongoose model for exchange request

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SENRAMS93606/BOOK-EXCHANGE-PLATFORM.git
   cd book-exchange-platform
   ```

# Install backend dependencies

cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install

# Set up environment variables:

MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret

# Run the backend server

cd backend
node src/index.js

# Run the frontend development server

cd frontend
npm run dev
