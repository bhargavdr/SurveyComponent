import React, { useState, useEffect } from 'react';
import data from '../questions.json';

const QandA = () => {
  const [editMode, setEditMode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [initialAnswers, setInitialAnswers] = useState({});
  
  useEffect(() => {
    const initialSelectedAnswers = {};
    data.forEach((item) => {
      initialSelectedAnswers[item.id] = item.answer;
    });
    setSelectedAnswers(initialSelectedAnswers);
    setInitialAnswers(initialSelectedAnswers);
  }, []);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleFormSubmit = (event) => {
  event.preventDefault();
  let updatedData;
  if (editMode) {
    updatedData = data.map((item) => ({
      answer: selectedAnswers[item.id] || item.answer
    }));
  } else {
    updatedData = data.map((item) => ({
      answer: initialAnswers[item.id] || item.answer
    }));
  }
  console.log(updatedData);
};


  return (
    <div className="q-and-a">
      <h1 style={{ textAlign: 'center' }}>SURVEY RESPONSES</h1>
      <form onSubmit={handleFormSubmit}>
        {data.map((item) => (
          <div key={item.id} className="q-and-a-item" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div className="question" style={{ width: '70%' }}>{item.question}</div>
            <div className="answer">
              {editMode ? (
                item.options.map((option) => (
                  <button
                    key={option}
                    className="answer-item"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: selectedAnswers[item.id] === option ? 'white': 'rgba(0,0,0,0.8)',
                      fontWeight: selectedAnswers[item.id] === option ? 'bold' : 'normal',
                      border: '1px solid white'
                    }}
                    onClick={() => handleAnswerSelect(item.id, option)}
                  >
                    {option}
                  </button>
                ))
              ) : (
                <span
                  className="answer-item"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    color: 'white'
                  }}
                >
                  {item.answer}
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="button-container">
          <button
            className="edit-button"
            onClick={handleEditClick}
            style={{ backgroundColor: "gray" }}
          >
            {editMode ? 'Cancel' : 'Edit'}
          </button>
          <button
            className="submit-button"
            style={{
              backgroundColor: 'blue',
            }}
            type="submit"
          >
            {editMode ? 'Save and Submit' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QandA;
