import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Fetching teams from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Teams data fetched:', data);
        setTeams(Array.isArray(data) ? data : (data.results || []));
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header bg-success text-white">
        <h2 className="h4 mb-0">&#127960; Teams</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-3">No teams found.</td>
                </tr>
              ) : (
                teams.map((team, index) => (
                  <tr key={team.id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{team.name}</td>
                    <td>
                      {(Array.isArray(team.members) ? team.members : (team.members ? [team.members] : [])).map((m, i) => (
                        <span key={i} className="badge bg-info text-dark me-1">{m}</span>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        Total: <strong>{teams.length}</strong> teams
      </div>
    </div>
  );
}

export default Teams;
