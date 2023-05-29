import globalStyles from '../../../../styles/global.module.scss';
import { Link } from 'react-router-dom';
import { Button, Col, Collection, CollectionItem, Icon, Navbar, Row } from 'react-materialize';
import { useMessage } from '../../../../message.hook';
import { useContext, useEffect, useState } from 'react';
import http from '../../../../axios.common';
import { AuthContext } from '../../../../context/context';

function ProfilePage() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = (await http.get('/customer/' + auth.user_id)).data;

      setUserInfo({ ...data });
    } catch (error) {
      console.log(error);
      message('Помилка при завантаженні особистих даних');
      setUserInfo(null);
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
            Особистий профіль
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
        {auth.role === 'driver' ? (
          <Link to="/trips">Всі поїздки</Link>
        ) : (
          <Link to="/trip/create">Створити поїздку</Link>
        )}
      </Navbar>

      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <Row style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Col m={6} s={6} style={{ margin: 0 }}>
              {userInfo && (
                <Collection>
                  <CollectionItem>
                    Ім'я: {userInfo.lastName} {userInfo.firstName}
                  </CollectionItem>
                  <CollectionItem>Електронна пошта: {userInfo.email}</CollectionItem>
                  <CollectionItem>
                    Роль: {{ driver: 'Водій', passenger: 'Пасажир' }[userInfo.role]}
                  </CollectionItem>
                </Collection>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
