
require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;


const DEMO_USERNAME = 'student';
const DEMO_PASSWORD = 'TherCorrectPassword123';


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username !== DEMO_USERNAME ||
    password !== DEMO_PASSWORD
  ) {
    return res.status(401).json({
      message: 'Invalid username or password'
    });
  }

  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'Login successful',
    token
  });
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Access denied.  a valid JWT Token is  required.'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: 'Invalid or expired token'
      });
    }

    req.user = user;
    next();
  });
}


app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    username: req.user.username
  });
});

app.listen(PORT, () => {
  console.log(`JWT server running at http://localhost:${PORT}`);
});
