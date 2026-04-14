import React from 'react';
import ExchangeRequestCard from './ExchangeRequestCard';
import './Exchange.css';

const IncomingRequests = ({ requests, onAccept, onReject }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Incoming Requests</h3>
        <p>You don't have any requests for your books right now.</p>
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
            counterpartName: request.requester?.name || request.counterpartName,
            status: request.status,
            createdAt: request.createdAt
          }} 
          type="incoming" 
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
};

export default IncomingRequests;
