import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import Header from './Header';
import './css/challengedetail.css';
import { toast } from 'react-toastify';

const ChallengeDetail = () => {
  const { selectedEvent, deleteEvent } = useContext(EventContext);
  console.log(selectedEvent);
  const navigate = useNavigate();

  const handleEditClick = () => {
    if (selectedEvent) {
      navigate(`/editchallenge/${selectedEvent.id}`);
    }
  };


  const handleDeleteClick = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      toast.success("Event Successfully Deleted, Check below !",);
      navigate('/');
    }
  };

  if (!selectedEvent) {
    return <p>No challenge selected</p>;
  }

  return (
    <>
      <Header />
      <div className="challengedetail">
        <div className="upper">
          <button>{`Starts on ${selectedEvent.time}(Indian Standard Time)`}</button>
          <h1>{selectedEvent.title}</h1>
          <p>This is Assignment demonstration given by AI Planet</p>
          <h4>{selectedEvent.status}</h4>
        </div>
        <div className="lower">
          <div className="overview">
            <h3>Overview</h3>
            <div className="buttons">
              <button className="edit" onClick={handleEditClick}>Edit</button>
              <button className="delete" onClick={handleDeleteClick}>Delete</button>
            </div>
          </div>
          <p>{selectedEvent.description}</p>
        </div>
      </div>
    </>
  );
};

export default ChallengeDetail;
