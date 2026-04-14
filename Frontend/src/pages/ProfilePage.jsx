import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { getMyBooks } from '../api/bookApi';
import { getIncomingRequests, getOutgoingRequests } from '../api/exchangeApi';
import './Pages.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ booksListed: 0, successfulExchanges: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, incomingRes, outgoingRes] = await Promise.all([
          getMyBooks(),
          getIncomingRequests(),
          getOutgoingRequests()
        ]);
        
        let successful = 0;
        const allExchanges = [...(incomingRes.data || []), ...(outgoingRes.data || [])];
        allExchanges.forEach(ex => {
          if (ex.status === 'accepted') successful++;
        });

        setStats({
          booksListed: booksRes.data?.length || 0,
          successfulExchanges: successful
        });
      } catch (err) {
        console.error('Failed to load profile stats');
      }
    };
    if (user) fetchStats();
  }, [user]);

  if (!user) return <><Navbar /><div style={{padding: '4rem', textAlign: 'center'}}>Please login to view your profile.</div><Footer/></>;

  return (
    <>
      <Navbar />
      <div className="page-content" style={{ background: '#f8fafc' }}>
        <div className="page-container">
          <div className="profile-card">
            <div className="profile-avatar">
              {user.name.charAt(0)}
            </div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#4f46e5' }}>{stats.booksListed}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Books Listed</div>
              </div>
              <div style={{ width: '1px', background: '#e2e8f0' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>{stats.successfulExchanges}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Exchanges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
