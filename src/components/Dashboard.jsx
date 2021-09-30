import React ,{useEffect}from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Dashboard() {
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);  
    }
  }, [currentUser]);
  return (
    (currentUser === null ?
      <Redirect to="/login" /> :
      <div className="col-md-12 addBootcamp">
        <div className="w-80">
          <h5 className="card-title">Welcome to Esquire Technology</h5>
        </div>
      </div>
    )
  );
}
export default Dashboard;
