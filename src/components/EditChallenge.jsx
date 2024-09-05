import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import './css/editchallenge.css';
import { toast } from 'react-toastify';

const EditChallenge = () => {
  const { events, updateEvent } = useContext(EventContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    challengeName: '',
    startDate: '',
    endDate: '',
    description: '',
    image: '',
    levelType: 'Easy',
  });

  useEffect(() => {
    const eventToEdit = events.find(event => event.id === id);
    if (eventToEdit) {
      setFormData({
        challengeName: eventToEdit.title,
        startDate: eventToEdit.time.split(' to ')[0],
        endDate: eventToEdit.time.split(' to ')[1],
        description: eventToEdit.description,
        image: eventToEdit.image,
        levelType: eventToEdit.status,
      });
    }
  }, [events, id]);

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
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
      id,
      title: formData.challengeName,
      time: `${formData.startDate} to ${formData.endDate}`,
      description: formData.description,
      image: formData.image,
      status: formData.levelType,
    };

    updateEvent(updatedEvent);
    toast.success("Event Successfully Updated, Check below !",);
    navigate(`/`);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="challenge-form">
        <h2>Edit Challenge</h2>
        <label>
          Challenge Name
          <input
            type="text"
            name="challengeName"
            value={formData.challengeName}
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
        <button type="submit">Update Challenge</button>
      </form>
    </div>
  );
};

export default EditChallenge;
