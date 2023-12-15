import React from 'react';
import PropTypes from 'prop-types';

const CalendarItem = ({ item, itemType }) => {
  // Format the date for display
  const formatDate = (date) => {
      return new Date(date).toLocaleString();
  };

  const itemStyles = {
    backgroundColor: item.color || '#FFFFFF',
    border: '1px solid #E0E0E0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '10px 15px',
    margin: '10px 0',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease'
  };

  return (
    <div style={itemStyles}>
      <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: 'bold' }}>{item.title}</h3>
      <p style={{ margin: '5px 0 0', fontSize: '0.9rem' }}>{itemType === 'event' ? `Time: ${formatDate(item.when.date)} at ${item.when.time}` : `Deadline: ${formatDate(item.deadline)}`}</p>
      {itemType === 'event' && <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Location: {item.location || 'N/A'}</p>}
      <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Description: {item.description || 'No description'}</p>
      {itemType === 'task' && (
        <>
          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Max Time Block: {item.maxTimeBlock} minutes</p>
          <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Estimated Time to Completion: {item.estimatedTimeToCompletion} hours</p>
        </>
      )}
    </div>
  );
};

CalendarItem.propTypes = {
    item: PropTypes.object.isRequired,
    itemType: PropTypes.oneOf(['event', 'task']).isRequired,
};

export default CalendarItem;
