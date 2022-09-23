import './markup';
import {
  loadImagesByRequest,
  loadMore,
} from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

function onFormSubmit(e) {
  e.preventDefault();

  const request = e.target.searchQuery.value;

  loadImagesByRequest(request);
}

function galleryMarkup() {
  gallery.insertAdjacentHTML(
    'beforeend',
    galleryMarkup(neededResponsParameters)
  );
}
