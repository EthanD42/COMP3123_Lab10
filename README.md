# Redux  Counter App

## Description

This is a  React application created to demonstrate React Redux and JSON Web Token  authentication. Users log in to access a counter that can be incrased, decreased, and reset.

## Technologies Used

- React
- Vite
- Redux Toolkit
- React Redux
- Node.js
- Express
- JSON Web Token

## Features

- Login using demo credentials
- JWT token generation and verification
- Protected backend API endpoint
- Increment, decrement, and reset counter
- Centralized state management using Redux

## Redux Concepts

1. **State:** Stores the current counter value.
2. **Store:** Holds the Redux application state.
3. **Reducer:** Defines how the counter state changes.
4. **Action:** Describes an operation such as increment, decrement, or reset.
5. **Dispatch:** Sends actions to Redux to update the counter.
6. **Subscribe:** React Redux subscribes components to relevant store updates so the interface reflects state changes.

## JWT Authentication

The user submits their username and password to the Express backend. If the credentials are correct, the backend generates a signed JWT. The frontend sends this token in the Authorization header when accessing the protected API endpoint.

The backend verifies the token before allowing access.

## Installation and Setup

### 1. Install frontend dependencies

```bash
npm install
npm install @reduxjs/toolkit react-redux
```

### 2. Configure the backend

Navigate to the server folder:

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
JWT_SECRET=replace_with_your_own_secret
PORT=5000
```

Use your own secret and do not upload the `.env` file.

### 3. Start the backend

From the server folder:

```bash
node server.js
```

### 4. Start the frontend

Open another terminal in the main project folder:

```bash
npm run dev
```

Open the local URL displayed by Vite.

## Demo Login

Use the demo username and password configured in `server.js`.

## Learning Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
- [JWT Introduction](https://jwt.io/introduction)
- [Express Documentation](https://expressjs.com/)

## Disclaimer

This is a learning project. The hardcoded demo credentials are for demonstration purposes only and are not suitable for production authentication.
