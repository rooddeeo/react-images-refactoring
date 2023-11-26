import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ gallery, handleOpenModal }) => {
  const galleryList = gallery.map(card => (
    <li className={css.galleryItem} key={card.id}>
      <button
        className={css.galleryItemLink}
        type="button"
        onClick={() => handleOpenModal(card.largeImageURL, card.tags)}
      >
        <img
          className={css.galleryItemImg}
          src={card.webformatURL}
          alt={card.tags}
        />
      </button>
    </li>
  ));
  return <ImageGallery cards={galleryList} />;
};

export default ImageGalleryItem;
