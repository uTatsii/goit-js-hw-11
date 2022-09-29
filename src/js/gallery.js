import {
  loadImagesByRequest,
  loadMore,
  canLoadMore,
  totalHits,
} from './fetchImages';
import galleryCardMarkup from './markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let request = '';

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
loadMoreBtn.style.display = 'none';

async function onFormSubmit(e) {
  e.preventDefault();

  request = e.target.searchQuery.value;
  const response = await loadImagesByRequest(request);
  const images = response.hits;
  clearGallery();

  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.style.display = 'none';
  } else {
    galleryCardMarkup(images, gallery);
    Notify.success(`Hooray! We found ${totalHits} images.`);
    loadMoreBtn.style.display = 'block';
    showBigPhoto();
  }
}

async function onLoadMoreBtnClick(e) {
  if (canLoadMore()) {
    const response = await loadMore(request);
    const images = response.hits;
    galleryCardMarkup(images, gallery);
    showBigPhoto();
    scrollOnLoadMore();
  } else {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.style.display = 'none';
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showBigPhoto() {
  const photoGallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
  return photoGallery;
}

function scrollOnLoadMore() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2 - 80,
    behavior: 'smooth',
  });
}
