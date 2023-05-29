import { useEffect, useState } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';
import { Button, Icon, NavItem, Navbar, Select, TextInput } from 'react-materialize';
import http from '../../../../axios.common';
import { useMessage } from '../../../../message.hook';

function SignupPage() {
  const message = useMessage();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
    firstName: '',
    lastName: '',
  });

  function handleChange(name, event) {
    setForm({ ...form, [name]: event.target.value });
  }

  async function handleSignup(e) {
    e.preventDefault();

    if (
      form.email.length < 6 ||
      form.password.length < 4 ||
      form.role.length < 3 ||
      form.firstName.length < 4
    )
      return;

    try {
      const data = (await http.post('/customer/create', form)).data;

      if (!data || data.customerId == 0) {
        throw Error('Такий користувач вже існує');
      }

      setForm({
        email: '',
        password: '',
        role: '',
        firstName: '',
        lastName: '',
      });

      message('Реєстрація успішна!');
    } catch (error) {
      console.log(error);
      message('Помилка при реєстрації');

      localStorage.setItem('user_id', 0);
      localStorage.setItem('role', 0);
    }
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
                <TextInput
                  email
                  id="input_email"
                  label="Email"
                  validate
                  m={12}
                  value={form.email}
                  onChange={(event) => handleChange('email', event)}
                />
              </div>
              <div className="row">
                <TextInput
                  password
                  data-length={20}
                  id="input_password"
                  label="Пароль"
                  validate
                  m={12}
                  value={form.password}
                  onChange={(event) => handleChange('password', event)}
                />
              </div>
              <div className="row">
                <TextInput
                  id="input_firstName"
                  label="Ім'я"
                  value={form.firstName}
                  onChange={(event) => handleChange('firstName', event)}
                />
                <TextInput
                  id="input_lastName"
                  label="Призвіще"
                  value={form.lastName}
                  onChange={(event) => handleChange('lastName', event)}
                />
              </div>
              <div className="row">
                <Select
                  id="select_role"
                  m={12}
                  multiple={false}
                  onChange={(event) => handleChange('role', event)}
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
                  value={form.role}>
                  <option disabled value="">
                    Оберіть вашу роль
                  </option>
                  <option value="passenger">Пасажир</option>
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
