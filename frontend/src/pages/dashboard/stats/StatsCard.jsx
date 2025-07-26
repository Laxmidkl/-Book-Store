import React from 'react';

const StatsCard = ({ icon, title, value, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    orange: 'bg-orange-100 text-orange-800',
    
  };

  return (
    <div className={`p-6  rounded-lg shadow ${colorClasses[color]}`}>
      <div className="flex items-center">
        <span className="text-3xl mr-4">{icon}</span>
        <div>
          <h3 className="text-xl font-medium whitespace-nowrap">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;