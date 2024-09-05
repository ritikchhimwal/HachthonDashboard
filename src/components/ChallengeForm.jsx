import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { toast } from 'react-toastify';
import './css/challengeform.css';
import "react-toastify/dist/ReactToastify.css"

const ChallengeForm = () => {
  const { addEvent } = useContext(EventContext);
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
    levelType: 'Easy',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedImage = localStorage.getItem('challengeImage');
    if (storedImage) {
      setFormData((prevState) => ({
        ...prevState,
        image: storedImage,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setFormData({
          ...formData,
          image: base64Image,
        });
        localStorage.setItem('challengeImage', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: formData.title,
      status: formData.levelType,
      time: `${formData.startDate} to ${formData.endDate}`,
      image: formData.image,
      endDate: formData.endDate,
      description: formData.description,
    };

    addEvent(newEvent);
    localStorage.removeItem('challengeImage');
    toast.success("Event Successfully Created, Check below !",);
    navigate('/');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="challenge-form">
        <h2>Challenge Details</h2>
        <label>
          Challenge Name
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Image
          <input type="file" onChange={handleFileChange} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Challenge"
              style={{ width: '100px', height: '100px', marginTop: '10px' }}
            />
          )}
        </label>
        <label>
          Level Type
          <select
            name="levelType"
            value={formData.levelType}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <button type="submit">Create Challenge</button>
      </form>
      
    </div>
  );
};

export default ChallengeForm;
