import React, { useState, useEffect } from 'react';

const difficultyBadge = (level) => {
  const lower = (level || '').toLowerCase();
  if (lower === 'easy')   return <span className="badge badge-easy text-white">{level}</span>;
  if (lower === 'hard')   return <span className="badge badge-hard text-white">{level}</span>;
  return <span className="badge badge-medium text-white">{level}</span>;
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Fetching workouts from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Workouts data fetched:', data);
        setWorkouts(Array.isArray(data) ? data : (data.results || []));
      })
      .catch(error => console.error('Error fetching workouts:', error));
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header bg-danger text-white">
        <h2 className="h4 mb-0">&#128170; Workouts</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">No workouts found.</td>
                </tr>
              ) : (
                workouts.map((workout, index) => (
                  <tr key={workout.id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{workout.name}</td>
                    <td>{workout.description}</td>
                    <td>{difficultyBadge(workout.difficulty)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        Total: <strong>{workouts.length}</strong> workouts
      </div>
    </div>
  );
}

export default Workouts;
