# Task Management System

A Task Management System built with Node.js, TypeScript, Express, and PostgreSQL. This application supports user authentication, task management, and team collaboration features, with validations and error handling. It also uses `express-validator` for request validation and `typeorm` as the ORM.

---

## Features

- **User Authentication and Authorization**: Secure user registration and login using JWT.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **Team Collaboration**: Assign tasks to team members and add comments/attachments.
- **Validation and Error Handling**: Request validations and centralized error handling.

---

## Requirements

- Node.js v14 or later
- PostgreSQL

---

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/task-management-system.git
    cd task-management-system
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Build and start the Project**

    ```bash
    npm run build
    npm run start
    ```

---

## Environment Variables

Create a `.env` file in the root directory with the following environment variables:

```plaintext
PORT=3000
PG_USERNAME=your_db_user
PG_PASSWORD=your_db_password
PG_DATABASE=your_db_name
JWT_SECRET=your_secret_key

```

---

## Postman Collection: 
https://documenter.getpostman.com/view/10389495/2sAY4sjjLj

