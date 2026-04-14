import React from 'react';
import './Exchange.css';

const ExchangeRequestCard = ({ request, type, onAccept, onReject }) => {
  const getStatusClass = (status = '') => {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'accepted': return 'status-accepted';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const statusText =
    request.status.charAt(0).toUpperCase() + request.status.slice(1);

  return (
    <div className="exchange-card">
      <div className="exchange-info">
        <h4 className="exchange-title">{request.bookTitle}</h4>

        <div className="exchange-meta">
          {type === 'incoming' ? 'Requested by ' : 'Requested from '}
          <strong>{request.counterpartName}</strong>
          {' • '}
          {new Date(request.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div>
        <span className={`status-badge ${getStatusClass(request.status)}`}>
          {statusText}
        </span>
      </div>

      {type === 'incoming' &&
        request.status?.toLowerCase() === 'pending' && (
          <div className="exchange-actions">
            <button
              onClick={() => onAccept(request.id)}
              className="btn-accept"
            >
              Accept
            </button>

            <button
              onClick={() => onReject(request.id)}
              className="btn-reject"
            >
              Reject
            </button>
          </div>
        )}
    </div>
  );
};

export default ExchangeRequestCard;