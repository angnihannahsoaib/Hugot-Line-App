"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  // Hugot Lines State
  const [hugotLines, setHugotLines] = useState([]);
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(null); // Will be set after login
  const [message, setMessage] = useState('');

  // Registration and Login States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  // Fetch Hugot Lines from the backend
  useEffect(() => {
    fetchHugotLines();
  }, []);

  // Function to fetch all hugot lines
  const fetchHugotLines = async () => {
    try {
      const response = await axios.get('http://localhost/hugot_api/api/hugot_lines.php');
      setHugotLines(response.data);
    } catch (error) {
      console.error('Error fetching hugot lines:', error);
    }
  };

  // Handle submission of new hugot line
  const submitHugotLine = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage('Please log in to submit a hugot line.');
      return;
    }

    try {
      const response = await axios.post('http://localhost/hugot_api/api/hugot_lines.php', {
        user_id: userId,
        content
      });

      setMessage(response.data.message);
      setContent('');
      fetchHugotLines(); // Fetch updated hugot lines after submission
    } catch (error) {
      console.error('Error submitting hugot line:', error);
    }
  };

  // Handle user registration
  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/hugot_api/api/register.php', {
        username,
        email,
        password,
      });

      setRegisterMessage(response.data.message || response.data.error);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error registering user:', error);
      setRegisterMessage('Registration failed');
    }
  };

  // Handle user login
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/hugot_api/api/login.php', {
        email,
        password,
      });

      if (response.data.user_id) {
        setUserId(response.data.user_id); // Save logged-in user ID
        setLoginMessage('Login successful');
      } else {
        setLoginMessage(response.data.error || 'Login failed');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Hugot Lines</h1>

      <ul>
        {hugotLines.map(line => (
          <li key={line.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <p>{line.content}</p>
            <small>
              by {line.username} on {new Date(line.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>

      <h2>Add a Hugot Line</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submitHugotLine}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
        ></textarea>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Add Hugot
        </button>
      </form>

      <h2>Register</h2>
      {registerMessage && <p>{registerMessage}</p>}
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Register
        </button>
      </form>

      <h2>Login</h2>
      {loginMessage && <p>{loginMessage}</p>}
      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '10px', width: '100%' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
}