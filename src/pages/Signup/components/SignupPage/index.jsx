import { useEffect, useState } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { Button, Icon, NavItem, Navbar, Select, TextInput } from 'react-materialize';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSignup(e) {
    e.preventDefault();
  }

  return (
    <div className={globalStyles.wrapper}>
      <Navbar
        fixed
        alignLinks="left"
        brand={
          <h1 className="brand-logo" style={{ margin: '1rem 0' }}>
            Signup
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
              <div className="row">
                <TextInput id="input_firstName" label="Ім'я" />
                <TextInput id="input_lastName" label="Призвіще" />
              </div>
              <div className="row">
                <Select
                  id="select_role"
                  m={12}
                  multiple={false}
                  onChange={function noRefCheck() {}}
                  options={{
                    classes: '',
                    dropdownOptions: {
                      alignment: 'left',
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250,
                    },
                  }}
                  value="">
                  <option disabled value="">
                    Оберіть вашу роль
                  </option>
                  <option value="pasager">Пасажир</option>
                  <option value="driver">Водій</option>
                </Select>
              </div>
              <Button node="button" large modal="confirm" waves="light" onClick={handleSignup}>
                Зареєструватися
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
