# Backend

This directory contains the backend code for the Task Manager project.

## Getting Started

To get started with the backend development environment, follow these steps:

1. Install dependencies:
    npm install


2. Start the backend server:
    npm start


3. The backend server will run on (http://localhost:5000) by default.

## API Endpoints

- GET /api/tasks: Fetch all tasks.
- POST /api/tasks/add: Add a new task.
- PUT /api/tasks/update/:id: Update an existing task.
- DELETE /api/tasks/:id: Delete a task.

## Database

This project uses Mongoose as the database. Make sure you have Mongoose installed and running locally.

## Environment Variables

Create a .env file in the root directory and define the following environment variables:

PORT=5000
MONGODB_URI=<your-mongodb-uri>


## Folder Structure

- routes/       --> Express route handlers
- models/       --> Mongoose models
- index.js      --> Entry point

