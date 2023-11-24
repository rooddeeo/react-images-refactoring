import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx';
import getGallery from '../api/gallery.js';
import Button from './Button/Button';
import Loader from './Loader/Loader.jsx';
import ErrorBackEnd from './ErrorBackEnd/ErrorBackEnd.jsx';
import Modal from './Modal/Modal';
import css from './App.module.css';

class App extends Component {
  state = {
    isLoader: false,
    errorBackEnd: '',
    gallery: '',
    search: '',
    showModal: false,
    modalImageUrl: '',
    modalImageTags: '',
    page: 1,
    loadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.handleGallery(search, page);
    }
  }

  onSubmit = ({ search }) => {
    this.setState({ search, page: 1 });
  };

  handleGallery = async (search, page) => {
    try {
      this.setState({ isLoader: true });
      if (page === 1) {
        this.setState({ gallery: [] });
      }
      const data = await getGallery(search, page);
      this.setState(prev => ({
        gallery: [...prev.gallery, ...data.hits],
        loadMore: page < Math.ceil(data.totalHits / 12),
        error: '',
      }));
    } catch (error) {
      this.setState({ errorBackEnd: error.message });
    } finally {
      this.setState({ isLoader: false });
    }
  };

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.setState({ showModal: true });
    this.setState(prev => ({
      modalImageUrl: (prev.modalImageUrl = largeImageURL),
    }));
    this.setState(prev => ({ modalImageTags: (prev.modalImageTags = tags) }));
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      isLoader,
      errorBackEnd,
      gallery,
      loadMore,
      showModal,
      modalImageUrl,
      modalImageTags,
    } = this.state;
    return (
      <div className={css.container}>
        {isLoader && <Loader />}
        {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
        <Searchbar onSubmit={this.onSubmit} />
        {gallery && (
          <ImageGalleryItem
            gallery={gallery}
            handleOpenModal={this.handleOpenModal}
          />
        )}
        {loadMore && <Button onLoadMore={this.onLoadMore} />}
        {showModal && (
          <Modal
            closeModal={this.handleCloseModal}
            largeImage={modalImageUrl}
            tags={modalImageTags}
          />
        )}
      </div>
    );
  }
}
export default App;
