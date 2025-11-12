# Agro Leaf Watch Backend

This is the backend server for the Agro Leaf Watch application, handling user authentication and contact form submissions.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/register** - Register a new user
  - Request body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt_token", "user": { "id": "...", "name": "John Doe", "email": "john@example.com" } }`

- **POST /api/login** - User login
  - Request body: `{ "email": "john@example.com", "password": "password123" }`
  - Response: `{ "token": "jwt_token", "user": { "id": "...", "name": "John Doe", "email": "john@example.com" } }`

### Contact Form

- **POST /api/contact** - Submit contact form
  - Request body: `{ "name": "John Doe", "email": "john@example.com", "message": "Hello!" }`
  - Response: `{ "message": "Message sent successfully" }`

- **GET /api/contacts** - Get all contact submissions (protected route)
  - Headers: `Authorization: Bearer your_jwt_token`
  - Response: `[ { "name": "...", "email": "...", "message": "...", "createdAt": "..." }, ... ]`

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Port on which the server will run (default: 5000)
