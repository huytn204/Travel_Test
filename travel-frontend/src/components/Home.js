import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Chào mừng bạn đến với ứng dụng Travel</h1>
      <nav className="home-nav">
        <ul>
          <li>
            <Link to="/placeslist">Địa điểm</Link>
          </li>
          <li>
            <Link to="/users">Người dùng</Link>
          </li>
          <li>
            <Link to="/comments">Bình luận</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
