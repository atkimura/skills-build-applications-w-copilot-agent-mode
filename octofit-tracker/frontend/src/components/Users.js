import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Fetching users from:', apiUrl);
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Users data fetched:', data);
        setUsers(Array.isArray(data) ? data : (data.results || []));
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="card component-card">
      <div className="card-header bg-dark text-white">
        <h2 className="h4 mb-0">&#128100; Users</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">No users found.</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`} className="link-primary">{user.email}</a>
                    </td>
                    <td><span className="badge bg-success">{user.team}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        Total: <strong>{users.length}</strong> users
      </div>
    </div>
  );
}

export default Users;
