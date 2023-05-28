import { useEffect } from 'react';
import globalStyles from '../../../../styles/global.module.scss';
import styles from './style.module.scss';

function CreateTripPage() {
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className={globalStyles.wrapper}>
      <div className={globalStyles.container}>
        <div className={globalStyles.inner}>
          <div className={styles.block}>CreateTripPage</div>
          <div className={styles.block}>2</div>
        </div>
      </div>
    </div>
  );
}

export default CreateTripPage;
