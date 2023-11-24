import axios from 'axios';
axios.defaults.baseURL =
  'https://pixabay.com/api';

const getGallery = async (search, page) => {
  const { data } = await axios(`/?q=${search.name}&page=${page}&key=12002814-5debf547df742213b695907de&image_type=photo&orientation=horizontal&per_page=12`);
  return data;
};

export default getGallery