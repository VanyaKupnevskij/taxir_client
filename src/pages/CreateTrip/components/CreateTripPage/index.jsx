import { useContext, useState } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';
import { Button, Icon, Modal, Navbar, TextInput } from 'react-materialize';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/context';
import http from '../../../../axios.common';
import { useMessage } from '../../../../message.hook';

function CreateTripPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [createdTrip, setCreatedTrip] = useState(null);
  const [form, setForm] = useState({
    tripFrom: '',
    tripTo: '',
  });

  function handleChange(name, event) {
    setForm({ ...form, [name]: event.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();

    if (form.tripFrom.length < 4 || form.tripTo.length < 4) {
      message('Уведіть коректно дані');
      return;
    }

    try {
      const data = (
        await http.post('/trip/create', {
          ...form,
          customer: { customerId: auth.user_id },
        })
      ).data;

      setForm({
        tripFrom: '',
        tripTo: '',
      });

      data.price = Math.round(data.price * 100) / 100;
      data.distance = Math.round(data.distance * 10) / 10;
      data.tripTime =
        Math.floor(data.tripTime) + ' годин ' + Math.floor((data.tripTime % 1) * 60) + ' хвилин ';

      setCreatedTrip({ ...data });

      message('Створено поїздку успішно!');
    } catch (error) {
      console.log(error);
      message('Помилка при створенні поїздки');
      setCreatedTrip(null);
    }
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
            Створити поїздку
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
        <Link to="/trip/create">Створити поїздку</Link>
      </Navbar>

      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <TextInput
                  id="input_from"
                  label="Звідки"
                  data-length={40}
                  validate
                  m={12}
                  value={form.tripFrom}
                  onChange={(event) => handleChange('tripFrom', event)}
                />
              </div>
              <div className="row">
                <TextInput
                  data-length={40}
                  id="input_to"
                  label="Куди"
                  validate
                  m={12}
                  value={form.tripTo}
                  onChange={(event) => handleChange('tripTo', event)}
                />
              </div>

              <Button node="button" large modal="confirm" waves="light" onClick={handleCreate}>
                Створити поїздку
              </Button>
            </form>
          </div>
        </div>
      </div>

      {createdTrip && (
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Закрити
            </Button>,
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header="Створена поїздка"
          id="modal1"
          open={createdTrip != null}
          options={{
            dismissible: true,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%',
          }}>
          <div className="row">Початкова точка: {createdTrip.tripFrom}</div>
          <div className="row">Кінечна точка: {createdTrip.tripTo}</div>
          <div className="row">Погода: {createdTrip.weather}</div>
          <div className="row">Час поїздки: {createdTrip.tripTime}</div>
          <div className="row">Статус: {createdTrip.status}</div>
          <div className="row">Відстань: {createdTrip.distance} км</div>
          <br />
          <div className="row">
            Ціна: <b>{createdTrip.price}</b> грн
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CreateTripPage;
