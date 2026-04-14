import React from 'react';
import ExchangeRequestCard from './ExchangeRequestCard';
import './Exchange.css';

const OutgoingRequests = ({ requests }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Outgoing Requests</h3>
        <p>You haven't requested any books yet. Explore the marketplace to find something to read!</p>
      </div>
    );
  }

  return (
    <div>
      {requests.map(request => (
        <ExchangeRequestCard 
          key={request._id || request.id} 
          request={{
            id: request._id || request.id,
            bookTitle: request.requestedBook?.title || request.bookTitle,
            counterpartName: request.owner?.name || request.counterpartName,
            status: request.status,
            createdAt: request.createdAt
          }} 
          type="outgoing" 
        />
      ))}
    </div>
  );
};

export default OutgoingRequests;
