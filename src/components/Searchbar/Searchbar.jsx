import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = props => {
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({ search: name });
    setName('');
  };
  const handleChange = ({ target: { value } }) => {
    setName(value);
  };
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit}>
        <div className={css.container}>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>
        </div>
      </form>
    </header>
  );
};

export default Searchbar;
