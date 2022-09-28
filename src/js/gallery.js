import './markup';
import { loadImagesByRequest, loadMore, canLoadMore } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryCardMarkup from './markup';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let request = '';
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();

  request = e.target.searchQuery.value;

  const response = await loadImagesByRequest(request);
  const images = response.hits;
  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    clearGallery();
  } else {
    clearGallery();
    galleryCardMarkup(images, gallery);
    loadMoreBtn.style.display = 'block';
  }
}

async function onLoadMoreBtnClick(e) {
  if (canLoadMore()) {
    const response = await loadMore(request);
    const images = response.hits;
    galleryCardMarkup(images, gallery);
  } else {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}
