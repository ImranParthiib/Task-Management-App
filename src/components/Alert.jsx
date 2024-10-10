import React from 'react';

const Alert = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700';

  return (
    <div className={`${bgColor} border-l-4 p-4 mb-4`} role="alert">
      <p>{message}</p>
    </div>
  );
};

export default Alert;