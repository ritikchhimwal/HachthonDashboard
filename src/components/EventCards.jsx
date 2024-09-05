import React, { useState, useEffect, useContext } from "react";
import "./css/eventcards.css";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";

const EventCard = ({ id, title, status, time, image, endDate, description }) => {
  const { selectEvent } = useContext(EventContext);
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(
    endDate ? calculateTimeLeft(endDate) : time
  );
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    if (endDate) {
      const timer = setInterval(() => {
        const newCountdown = calculateTimeLeft(endDate);
        setCountdown(newCountdown);
        updateStatus(endDate);
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [endDate]);

  function calculateTimeLeft(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end - now;

    if (difference <= 0) {
      return "Event has ended";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d : ${hours} : ${minutes} : ${seconds}`;
  }

  function updateStatus(endDate) {
    const now = new Date();
    const end = new Date(endDate);

    if (now > end) {
      setCurrentStatus("Past");
    } else if (now < end && (end - now) <= 7 * 24 * 60 * 60 * 1000) { 
      setCurrentStatus("Upcoming");
    } else {
      setCurrentStatus("Active");
    }
  }

  const handleParticipateClick = () => {
    selectEvent({ id, title, status, time, image, endDate , description });
    navigate("/challengedetail"); 
  };

  return (
    <div className="card">
      <img src={image || "placeholder-image-url"} alt={title || "Challenge"} className="card-img" />
      <div className="card-content">
        <span className={`status ${currentStatus.toLowerCase()}`}>{currentStatus}</span>
        <h3 className="card-title">{title}</h3>
        <div className="time">{countdown}</div>
        <button className="participate-btn" onClick={handleParticipateClick}>Participate Now</button>
      </div>
    </div>
  );
};

const EventCards = ({ events }) => {
  return (
    <div className="event-cards-container">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};

export default EventCards;
