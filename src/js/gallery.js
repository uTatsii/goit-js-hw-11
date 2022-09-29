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
let photoGallery = null;
let request = '';

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
loadMoreBtn.style.display = 'none';

async function onFormSubmit(e) {
  e.preventDefault();

  request = e.target.searchQuery.value;
  let response = null;
  try {
   response = await loadImagesByRequest(request);
  } catch (error) {
    Notify.failure('Error');
    return;
  }
  const imagesData = response.hits;
  clearGallery();

  galleryCardMarkup(imagesData, gallery);
  initializeSimpleLightbox();
  photoGallery.refresh();

  if (imagesData.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadMoreBtn.style.display = 'none';
    return;
  }
  if (imagesData.length < 40) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.style.display = 'none';
    return;
  } else {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    loadMoreBtn.style.display = 'block';
  }
}

async function onLoadMoreBtnClick() {
  if (canLoadMore()) {
    const response = await loadMore(request);
    const imagesData = response.hits;
    galleryCardMarkup(imagesData, gallery);
    photoGallery.refresh();
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

function initializeSimpleLightbox() {
  photoGallery = new SimpleLightbox('.gallery a', {
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
