import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay}>
      <div className={css.loader}>
        <Circles
          height="80"
          width="80"
          color="#2271b3"
          ariaLabel="circles-loading"
          wrapperStyle
          wrapperClass="loader"
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loader;
