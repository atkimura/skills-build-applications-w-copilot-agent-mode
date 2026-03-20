import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching activities from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Activities data fetched:', data);
        setActivities(Array.isArray(data) ? data : (data.results || []));
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header bg-primary text-white">
        <h2 className="h4 mb-0">&#127939; Activities</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-3">No activities found.</td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <td>{index + 1}</td>
                    <td>{activity.user}</td>
                    <td><span className="badge bg-secondary">{activity.type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        Total: <strong>{activities.length}</strong> activities
      </div>
    </div>
  );
}

export default Activities;
