import css from './ImageGallery.module.css';

const ImageGallery = ({ cards }) => {
  return <ul className={css.gallery}>{cards}</ul>;
};

export default ImageGallery;
