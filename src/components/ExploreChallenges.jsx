import React, { useState } from "react";
import "./css/explorechallenges.css";
import search from '../assets/icons/serach.svg';
import EventCards from "./EventCards";

const ExploreChallenges = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatusOptions, setSelectedStatusOptions] = useState([]);
  const [selectedLevelOptions, setSelectedLevelOptions] = useState([]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option, type) => {
    if (type === 'status') {
      if (selectedStatusOptions.includes(option)) {
        setSelectedStatusOptions(selectedStatusOptions.filter(item => item !== option));
      } else {
        setSelectedStatusOptions([...selectedStatusOptions, option]);
      }
    } else if (type === 'level') {
      if (selectedLevelOptions.includes(option)) {
        setSelectedLevelOptions(selectedLevelOptions.filter(item => item !== option));
      } else {
        setSelectedLevelOptions([...selectedLevelOptions, option]);
      }
    }
  };

  const removeOption = (option, type) => {
    if (type === 'status') {
      setSelectedStatusOptions(selectedStatusOptions.filter(item => item !== option));
    } else if (type === 'level') {
      setSelectedLevelOptions(selectedLevelOptions.filter(item => item !== option));
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventStatus = event.status;
    const eventLevel = event.levelType;

    const statusMatches =
      selectedStatusOptions.includes('All') ||
      selectedStatusOptions.length === 0 ||
      selectedStatusOptions.includes(eventStatus);

    const levelMatches =
      selectedLevelOptions.includes('All') ||
      selectedLevelOptions.length === 0 ||
      selectedLevelOptions.includes(eventLevel);

    return statusMatches && levelMatches;
  });

  return (
    <>
      <div className="explorechallenges">
        <h2>Explore Challenges</h2>
        <div className="search-container">
          <div className="search-bar">
            <img
              src={search}
              alt="Search Icon"
              className="search-icon"
            />
            <input type="text" placeholder="Search" />
          </div>
          <div className="filter-container">
            <button className="filter-button" onClick={toggleDropdown}>
              Filter
              <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-section">
                  <h4>Status</h4>
                  <ul>
                    {['All', 'Active', 'Upcoming', 'Past'].map((option) => (
                      <li key={option}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedStatusOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option, 'status')}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown-section">
                  <h4>Level</h4>
                  <ul>
                    {['All', 'Easy', 'Medium', 'Hard'].map((option) => (
                      <li key={option}>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedLevelOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option, 'level')}
                          />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="filter-item">
          {selectedStatusOptions.map((option, index) => (
            <div key={index} className="selected-option">
              {option}
              <span className="remove-option" onClick={() => removeOption(option, 'status')}>✕</span>
            </div>
          ))}
          {selectedLevelOptions.map((option, index) => (
            <div key={index} className="selected-option">
              {option}
              <span className="remove-option" onClick={() => removeOption(option, 'level')}>✕</span>
            </div>
          ))}
        </div>
      </div>
      <EventCards events={filteredEvents} />
    </>
  );
};

export default ExploreChallenges;
