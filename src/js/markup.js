export default function galleryCardMarkup(images, galleryEl) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <div class="photo-card">
    <a class='photo-card__thumb' href=${largeImageURL}>
        <img class='photo-card__img'
            src="${webformatURL}" 
            alt="${tags}" 
            loading="lazy" 
        />
    </a>
    <ul class="info">
        <li class="info__item">
        <b>Likes</b>
        ${likes}
        </li>
        <li class="info__item">
            <b>Views</b>
            ${views}
        </li>
        <li class="info__item">
            <b>Comments</b>
            ${comments}
        </li>
        <li class="info__item">
            <b>Downloads</b>
            ${downloads}
        </li>
    </ul>
    </div>`;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}
