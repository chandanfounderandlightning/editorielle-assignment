import './style.scss';
import Spinner from './spinner';
export const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner />
    </div>
  );
};

export default Loader;
