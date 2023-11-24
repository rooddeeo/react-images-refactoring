import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    name: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ search: this.state });
    this.setState({
      name: '',
    });
  };
  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.handleSubmit}>
          <div className={css.container}>
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Search images and photos"
            />
            <button type="submit" className={css.button}>
              <span className="button-label">Search</span>
            </button>
          </div>
        </form>
      </header>
    );
  }
}
export default Searchbar;
