import { useEffect } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { Button, Icon, NavItem, Navbar, Select, TextInput } from 'react-materialize';

function LoginPage() {
  useEffect(() => {}, []);

  function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <div className={globalStyles.wrapper}>
      <Navbar
        fixed
        alignLinks="left"
        brand={
          <h1 className="brand-logo" style={{ margin: '1rem 0' }}>
            Login
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
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </Navbar>

      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <TextInput email id="input_email" label="Email" validate m={12} />
              </div>
              <div className="row">
                <TextInput password id="input_password" label="Пароль" validate m={12} />
              </div>

              <Button node="button" large modal="confirm" waves="light" onClick={handleLogin}>
                Увійти
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
