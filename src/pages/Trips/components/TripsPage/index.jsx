import { useContext, useEffect, useState } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import newStatusImage from '../../../../images/new.svg';
import travelStatusImage from '../../../../images/travel.svg';
import completeStatusImage from '../../../../images/complete.svg';
import { Button, Collapsible, CollapsibleItem, Icon, Modal, Navbar } from 'react-materialize';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/context';
import http from '../../../../axios.common';
import { useMessage } from '../../../../message.hook';

function TripsPage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [confirmedTrip, setConfirmedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
    try {
      const data = (await http.get('/trip/')).data;

      setTrips([...data]);
    } catch (error) {
      console.log(error);
      message('Помилка при завантаженні поїздок');
      setTrips([]);
    }
  }

  async function confirmTrip(tripId) {
    try {
      const data = (
        await http.patch('/trip/updateStatus', {
          status: 'В поїздці',
          tripId,
          driverId: auth.user_id,
        })
      ).data;

      setConfirmedTrip({ ...data });
      message('Поїздка прийнята вдало!');

      setTimeout(() => completeTrip(tripId), (Math.random() * 5 + 5) * 1000);
    } catch (error) {
      console.log(error);
      message('Помилка при прийняті поїздки');
      setConfirmedTrip(null);
    }
  }

  async function completeTrip(tripId) {
    try {
      const data = (
        await http.patch('/trip/updateStatus', {
          status: 'Завершено',
          tripId,
          driverId: auth.user_id,
        })
      ).data;

      setConfirmedTrip({ ...data });
      message('Поїздка завершена вдало!');
    } catch (error) {
      console.log(error);
      message('Помилка при завершені поїздки');
      setConfirmedTrip(null);
    }
  }

  function handleConfirm(tripId) {
    confirmTrip(tripId);
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
            Всі поїздки
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
        <Link to="/profile">Профіль</Link>
        <Link to="/trips/self">Свої поїздки</Link>
        <Link to="/trips">Всі поїздки</Link>
      </Navbar>

      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <div>
            <Collapsible accordion popout>
              {trips.map((trip) => {
                trip.price = Math.round(trip.price * 100) / 100;
                trip.distance = Math.round(trip.distance * 10) / 10;
                trip.tripTime =
                  Math.floor(trip.tripTime) +
                  ' годин ' +
                  Math.floor((trip.tripTime % 1) * 60) +
                  ' хвилин ';

                return (
                  <CollapsibleItem
                    key={trip.tripId}
                    expanded={false}
                    header={
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                        <span>
                          <img
                            src={
                              trip.status === 'Нова'
                                ? newStatusImage
                                : trip.status === 'В поїздці'
                                ? travelStatusImage
                                : completeStatusImage
                            }
                            alt="status"
                            width={25}
                            style={{ marginRight: '2rem' }}
                          />
                          Поїздка до: {trip.tripTo}
                        </span>
                        <span>
                          Ціна: <b>{trip.price}</b> грн
                        </span>
                      </div>
                    }
                    node="div">
                    Від: {trip.tripFrom} <br />
                    До: {trip.tripTo} <br />
                    Погода: {trip.weather} <br />
                    Статус: {trip.status} <br />
                    Відстань: {trip.distance} км <br />
                    Час поїздки: {trip.tripTime} <br />
                    Ціна: <b>{trip.price}</b> грн <br />
                    <br />
                    {trip.status === 'Нова' && (
                      <Button
                        node="button"
                        waves="light"
                        onClick={() => handleConfirm(trip.tripId)}>
                        Прийняти поїздку
                      </Button>
                    )}
                  </CollapsibleItem>
                );
              })}
            </Collapsible>
          </div>
        </div>
      </div>

      {confirmedTrip && (
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
          open={confirmedTrip != null}
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
          <div className="row">Початкова точка: {confirmedTrip.tripFrom}</div>
          <div className="row">Кінечна точка: {confirmedTrip.tripTo}</div>
          <div className="row">Погода: {confirmedTrip.weather}</div>
          <div className="row">Час поїздки: {confirmedTrip.tripTime}</div>
          <div className="row">Статус: {confirmedTrip.status}</div>
          <div className="row">Відстань: {confirmedTrip.distance} км</div>
          <br />
          <div className="row">
            Ціна: <b>{confirmedTrip.price}</b> грн
          </div>
        </Modal>
      )}
    </div>
  );
}

export default TripsPage;
