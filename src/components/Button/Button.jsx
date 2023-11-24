import css from './Button.module.css';

const Button = ({ onLoadMore, hidden }) => {
  return (
    <button
      className={`${css.button} ${hidden}`}
      type="button"
      onClick={() => onLoadMore()}
    >
      Load more
    </button>
  );
};

export default Button;
