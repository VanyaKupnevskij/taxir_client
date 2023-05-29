import { useContext, useEffect } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';
import { Button, Icon, Navbar, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/context';

function SelfTripsPage() {
  const auth = useContext(AuthContext);

  function handleChange(name, event) {}

  function handleLogin(e) {
    e.preventDefault();
  }

  function handleLogout(e) {
    auth.logout();
  }

  return (
    <div className={globalStyles.wrapper}>
      <Navbar
        fixed
        alignLinks="left"
        brand={
          <h1 className="brand-logo" style={{ margin: '1rem 0' }}>
            Свої поїздки
          </h1>
        }
        centerLogo
        id="mobile-nav"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}>
        <Button node="button" large modal="confirm" waves="light" onClick={handleLogout}>
          Вийти
        </Button>
        <Link to="/trips/self">Свої поїздки</Link>
        {auth.role === 'driver' ? (
          <Link to="/trips">Всі поїздки</Link>
        ) : (
          <Link to="/trip/create">Створити поїздку</Link>
        )}
      </Navbar>

      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <div className="row">
            <form className="col s12"></form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfTripsPage;
