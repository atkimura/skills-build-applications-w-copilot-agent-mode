import React, { useState, useEffect } from 'react';

const rankClass = (index) => {
  if (index === 0) return 'rank-gold';
  if (index === 1) return 'rank-silver';
  if (index === 2) return 'rank-bronze';
  return '';
};

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Fetching leaderboard from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Leaderboard data fetched:', data);
        setLeaderboard(Array.isArray(data) ? data : (data.results || []));
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header bg-warning text-dark">
        <h2 className="h4 mb-0">&#127942; Leaderboard</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Team</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-3">No leaderboard data found.</td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td className={rankClass(index)}>
                      {index === 0 ? '&#127947;' : index === 1 ? '&#129352;' : index === 2 ? '&#129353;' : index + 1}
                    </td>
                    <td className="fw-semibold">{entry.team}</td>
                    <td><span className="badge bg-primary fs-6">{entry.points}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        Total: <strong>{leaderboard.length}</strong> teams
      </div>
    </div>
  );
}

export default Leaderboard;
