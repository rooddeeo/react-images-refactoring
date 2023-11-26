import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx';
import getGallery from '../api/gallery.js';
import Button from './Button/Button';
import Loader from './Loader/Loader.jsx';
import ErrorBackEnd from './ErrorBackEnd/ErrorBackEnd.jsx';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [errorBackEnd, setErrorBackEnd] = useState('');
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalImageTags, setModalImageTags] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  const onSubmit = ({ search }) => {
    setSearch(search);
    setPage(1);
  };

  useEffect(() => {
    if (search && page) {
      const handleGallery = async (search, page) => {
        try {
          setIsLoader(true);
          if (page === 1) {
            setGallery([]);
          }
          const data = await getGallery(search, page);
          setGallery(prev => [...prev, ...data.hits]);
          setLoadMore(page < Math.ceil(data.totalHits / 12));
          setErrorBackEnd('');
        } catch (error) {
          setErrorBackEnd(error.message);
        } finally {
          setIsLoader(false);
        }
      };
      handleGallery(search, page);
    }
  }, [search, page]);

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenModal = (largeImageURL, tags) => {
    setShowModal(true);
    setModalImageUrl(largeImageURL);
    setModalImageTags(tags);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.container}>
      {isLoader && <Loader />}
      {errorBackEnd && <ErrorBackEnd errorBackEnd={errorBackEnd} />}
      <Searchbar onSubmit={onSubmit} />
      {gallery && (
        <ImageGalleryItem gallery={gallery} handleOpenModal={handleOpenModal} />
      )}
      {loadMore && <Button onLoadMore={onLoadMore} />}
      {showModal && (
        <Modal
          closeModal={handleCloseModal}
          largeImage={modalImageUrl}
          tags={modalImageTags}
        />
      )}
    </div>
  );
};

export default App;
