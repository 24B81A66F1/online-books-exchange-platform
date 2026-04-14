import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import IncomingRequests from '../components/exchange/IncomingRequests';
import OutgoingRequests from '../components/exchange/OutgoingRequests';
import Spinner from '../components/layout/Spinner';
import { getIncomingRequests, getOutgoingRequests, updateRequestStatus } from '../api/exchangeApi';
import '../components/exchange/Exchange.css';

const ExchangesPage = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [loading, setLoading] = useState(true);
  
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const [inc, out] = await Promise.all([
          getIncomingRequests(),
          getOutgoingRequests()
        ]);
        setIncoming(inc.data);
        setOutgoing(out.data);
      } catch (err) {
        console.error('Failed to load exchanges', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateRequestStatus(id, 'accepted');
      setIncoming(prev => prev.map(req => req._id === id ? { ...req, status: 'accepted' } : req));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept');
    }
  };

  const handleReject = async (id) => {
    try {
      await updateRequestStatus(id, 'rejected');
      setIncoming(prev => prev.map(req => req._id === id ? { ...req, status: 'rejected' } : req));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject');
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-content" style={{ background: '#f8fafc' }}>
        <div className="page-container" style={{ maxWidth: '900px' }}>
          <h1 className="exchange-header">My Exchanges</h1>
          
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'incoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('incoming')}
            >
              Incoming Requests
            </button>
            <button 
              className={`tab-btn ${activeTab === 'outgoing' ? 'active' : ''}`}
              onClick={() => setActiveTab('outgoing')}
            >
              Outgoing Requests
            </button>
          </div>

          <div style={{ marginTop: '2rem' }}>
            {loading ? (
              <Spinner />
            ) : (
              activeTab === 'incoming' 
                ? <IncomingRequests requests={incoming} onAccept={handleAccept} onReject={handleReject} />
                : <OutgoingRequests requests={outgoing} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExchangesPage;
