import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Place.css';

const Place = () => {
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({
    name: '',
    description: '',
    created_by: '',
    image_path: ''
  });

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = () => {
    axios.get('http://localhost:8080/places/')
      .then(response => {
        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          setPlaces(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu các địa điểm!', error);
      });
  };

  const addPlace = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/places/', newPlace)
      .then(response => {
        setPlaces([...places, response.data]);
        setNewPlace({
          name: '',
          description: '',
          created_by: '',
          image_path: ''
        });
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi thêm địa điểm!', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlace({ ...newPlace, [name]: value });
  };

  return (
    <div className="place-container">
      <h1>Địa điểm</h1>
      <form onSubmit={addPlace}>
        <input
          type="text"
          name="name"
          value={newPlace.name}
          onChange={handleChange}
          placeholder="Tên địa điểm mới"
          required
        />
        <input
          type="text"
          name="description"
          value={newPlace.description}
          onChange={handleChange}
          placeholder="Mô tả"
          required
        />
        <input
          type="text"
          name="created_by"
          value={newPlace.created_by}
          onChange={handleChange}
          placeholder="Người tạo"
          required
        />
        <input
          type="text"
          name="image_path"
          value={newPlace.image_path}
          onChange={handleChange}
          placeholder="Đường dẫn hình ảnh"
          required
        />
        <button type="submit">Thêm</button>
      </form>
      <ul>
        {Array.isArray(places) ? (
          places.map(place => (
            <li key={place.id} className="place-item">
              <h2>{place.name}</h2>
              <p>{place.description}</p>
              <p>Created by: {place.created_by}</p>
              <img src={place.image_path} alt={place.name} />
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};

export default Place;
