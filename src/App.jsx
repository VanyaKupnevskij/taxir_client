import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import 'materialize-css';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import TripsPage from './pages/Trips';
import CreateTripPage from './pages/CreateTrip';
import SelfTripsPage from './pages/SelfTrips';

import { AuthContext } from './context/context';
import { useEffect, useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [user_id, setUser_id] = useState(0);

  useEffect(() => {
    setIsAuth(Number(localStorage.getItem('user_id')) !== 0);
    setUser_id(Number(localStorage.getItem('user_id')));
    setRole(localStorage.getItem('role'));
  }, []);

  function logout() {
    localStorage.setItem('user_id', 0);
    localStorage.setItem('role', 0);

    setIsAuth(false);
    setUser_id(0);
    setRole(null);
  }

  function login(user_id, role) {
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('role', role);

    setIsAuth(Number(user_id) !== 0);
    setUser_id(user_id);
    setRole(role);
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          role,
          isAuth,
          logout,
          user_id,
          login,
        }}>
        {isAuth === true ? (
          role === 'driver' ? (
            <Routes>
              <Route index exact path="/trips" element={<TripsPage />} />
              <Route strict exact path="/trips/self" element={<SelfTripsPage />} />

              <Route path="*" element={<Navigate to="/trips" />} />
            </Routes>
          ) : (
            <Routes>
              <Route strict exact path="/trips/self" element={<SelfTripsPage />} />
              <Route strict exact path="/trip/create" element={<CreateTripPage />} />

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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
