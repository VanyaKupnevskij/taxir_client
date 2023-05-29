import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'materialize-css';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import TripsPage from './pages/Trips';
import CreateTripPage from './pages/CreateTrip';
import SelfTripsPage from './pages/SelfTrips';

import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState('driver');

  useEffect(() => {
    setIsAuth(Boolean(localStorage.getItem('user_id')));
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <div className="App">
      {isAuth ? (
        role === 'driver' ? (
          <Routes>
            <Route index exact path="/trips" element={<TripsPage />} />
            <Route strict exact path="/self_trips/" element={<SelfTripsPage />} />

            <Route path="*" element={<Navigate to="/trips" />} />
          </Routes>
        ) : (
          <Routes>
            <Route strict exact path="/trips/self" element={<SelfTripsPage />} />
            <Route strict exact path="/trip/create/" element={<CreateTripPage />} />

            <Route path="*" element={<Navigate to="/trips/self" />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route strict exact path="/login" element={<LoginPage />} />
          <Route strict exact path="/signup" element={<SignupPage />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
