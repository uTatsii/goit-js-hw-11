import { loadImagesByRequest, loadMore, canLoadMore, totalHits } from './fetchImages';
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

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

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
    Notify.success(`Hooray! We found ${totalHits} images.`);
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
