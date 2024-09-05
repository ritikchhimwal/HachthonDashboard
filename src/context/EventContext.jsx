import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import img1 from '../assets/cardimage/Group 1000002466.png';
import img2 from '../assets/cardimage/Group 1000002766.png';
import img3 from '../assets/cardimage/Group 1000002767.png';
import img4 from '../assets/cardimage/Group 1000002771.png';
import img5 from '../assets/cardimage/Group 1000002772.png';
import img6 from '../assets/cardimage/Group 1000002773.png';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const initialEvents = JSON.parse(localStorage.getItem('events')) || [
    {
      id: uuidv4(),
      title: 'Data Science Bootcamp - Graded Datathon',
      status: 'Upcoming',
      time: '00 : 15 : 22',
      image: img4,
      levelType: 'Easy',
      description: 'A bootcamp datathon focused on data science skills.',
      endDate: '2024-12-31',
    },
    {
      id: uuidv4(),
      title: 'Data Sprint 72 - Butterfly Identification',
      status: 'Upcoming',
      time: '00 : 12 : 34',
      image: img2,
      levelType: 'Easy',
      description: 'Identify different butterfly species using image datasets.',
      endDate: '2024-10-20',
    },
    {
      id: uuidv4(),
      title: 'Data Sprint 71 - Weather Recognition',
      status: 'Active',
      time: '01 : 17 : 10',
      image: img3,
      levelType: 'Easy',
      description: 'Recognize weather conditions from provided image data.',
      endDate: '2024-09-10',
    },
    {
      id: uuidv4(),
      title: 'Data Sprint 70 - Airline Passenger Satisfaction',
      status: 'Active',
      time: '00 : 11 : 27',
      image: img1,
      levelType: 'Easy',
      description: 'Predict airline passenger satisfaction based on survey data.',
      endDate: '2024-08-25',
    },
    {
      id: uuidv4(),
      title: 'Engineering Graduates Employment Outcomes',
      status: 'Past',
      time: '16th May\'22 09:00 PM',
      image: img6,
      levelType: 'Easy',
      description: 'Analyze employment outcomes of engineering graduates.',
      endDate: '2024-07-16',
    },
    {
      id: uuidv4(),
      title: 'Travel Insurance Claim Prediction',
      status: 'Past',
      time: '16th May\'22 09:00 PM',
      image: img5,
      levelType: 'Easy',
      description: 'Predict travel insurance claim outcomes from data.',
      endDate: '2024-06-01',
    },
  ];

  const [events, setEvents] = useState(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: uuidv4() };
    setEvents((prevEvents) => [eventWithId, ...prevEvents]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, selectEvent, selectedEvent }}>
      {children}
    </EventContext.Provider>
  );
};
