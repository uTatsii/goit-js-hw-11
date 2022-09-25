import './markup';
import { loadImagesByRequest, loadMore } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryCardMarkup from './markup';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const neededResponsParameters = {
  largeImageURL: '',
  webformatURL: '',
  tags: '',
  likes: '',
  views: '',
  comments: '',
  downloads: '',
};

form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();

  const request = e.target.searchQuery.value;

  const val = await loadImagesByRequest(request);
  const images = val.hits;
  galleryCardMarkup(images, gallery);
}

// function renderImages(request) {
//   loadImagesByRequest(request);
// }
