

import React, { useState } from 'react';
import './poll.css';

const Poll = () => {
  const [options, setOptions] = useState([
    { id: 1, text: 'Option 1', count: 0 },
    { id: 2, text: 'Option 2', count: 0 },
    { id: 3, text: 'Option 3', count: 0 },
  ]);
  const [newOptionText, setNewOptionText] = useState('');

  const handleVote = (id, action) => {
    const updatedOptions = options.map((option) => {
      if (option.id === id) {
        if (action === 'add') {
          return { ...option, count: option.count + 1 };
        } else if (action === 'delete' && option.count > 0) {
          return { ...option, count: option.count - 1 };
        }
      }
      return option;
    });
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    const newOption = {
      id: options.length + 1,
      text: newOptionText,
      count: 0, // Initialize count to 0 for new options
    };
    setOptions([...options, newOption]);
    setNewOptionText(''); // Clear the input field after adding option
  };

  const handleDeleteOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);
    setOptions(updatedOptions);
  };

  const handleChangeNewOption = (e) => {
    setNewOptionText(e.target.value);
  };

  return (
    <div className="Poll">
      <h2>Poll</h2>
      {options.map((option) => (
        <div key={option.id} className="option">
          <label>{option.text}</label>
          <div>
            <button onClick={() => handleVote(option.id, 'add')}>Add Vote</button>
            <span>Count: {option.count}</span>
            <button onClick={() => handleVote(option.id, 'delete')}>Delete Vote</button>
            <button onClick={() => handleDeleteOption(option.id)}>Delete</button>
          </div>
        </div>
      ))}
      <div className="new-option">
        <input type="text" value={newOptionText} onChange={handleChangeNewOption} placeholder="Enter new option" />
        <button onClick={handleAddOption}>Add Option</button>
      </div>
    </div>
  );
};

export default Poll;
