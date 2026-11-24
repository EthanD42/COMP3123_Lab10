
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from './redux/counterSlice';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      
      const protectedResponse = await fetch(
        `${API_URL}/api/protected`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`
          }
        }
      );

      const protectedData = await protectedResponse.json();

      if (!protectedResponse.ok) {
        throw new Error(protectedData.message || 'Access denied');
      }

      setToken(data.token);
      setMessage(protectedData.message);
    } catch (error) {
      setMessage(error.message || 'Could not connect to the server');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setToken('');
    setUsername('');
    setPassword('');
    setMessage('');
  }

  if (!token) {
    return (
      <div className="app">
        <div className="counter-card">
          <h1>JWT Login</h1>
          <p className="description">
            Log in to access the Redux counter
          </p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="status">{message}</p>
          <p className="description">
            Demo username: student
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="counter-card">
        <h1>Redux Counter</h1>
        <p className="description">{message}</p>

        <div className="count">{count}</div>

        <div className="buttons">
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>

          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
        </div>

        <button className="reset" onClick={() => dispatch(reset())}>
          Reset Counter
        </button>

        <p className="status">
          Authenticated with JWT
        </p>

        <button className="logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default App;
