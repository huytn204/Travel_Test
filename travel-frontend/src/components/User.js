import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link từ react-router-dom
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const addUser = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/auth/register', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({ username: '', password: '' });
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi thêm người dùng!', error.response ? error.response.data : error.message);
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/auth/login', loginData)
      .then(response => {
        setIsLoggedIn(true);
        setCurrentUser(response.data);
        setLoginData({ username: '', password: '' });
      })
      .catch(error => {
        console.error('Đăng nhập thất bại!', error.response ? error.response.data : error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="user-container">
      {!isLoggedIn ? (
        <>
          <h1>Đăng nhập</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              placeholder="Tên người dùng"
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Mật khẩu"
              required
            />
            <button type="submit">Đăng nhập</button>
          </form>
        </>
      ) : (
        <>
          <h1>Xin chào, {currentUser.username}</h1>
          <button onClick={handleLogout}>Đăng xuất</button>

          <h2>Người dùng</h2>
          <ul>
            {users.map(user => (
              <li key={user.id} className="user-item">
                Tên người dùng: {user.username}
              </li>
            ))}
          </ul>
          <form onSubmit={addUser}>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChange}
              placeholder="Tên người dùng"
              required
            />
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              required
            />
            <button type="submit">Thêm</button>
          </form>

          {/* Thêm Link để chuyển đến trang Places */}
          <ul>
            <li>
              <Link to="/places">Địa điểm</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default User;
