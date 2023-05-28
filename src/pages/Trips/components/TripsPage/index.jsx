import { useEffect } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';

function TripsPage() {
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className={globalStyles.wrapper}>
      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <div className={styles.block}>Trips</div>
          <div className={styles.block}>2</div>
        </div>
      </div>
    </div>
  );
}

export default TripsPage;
