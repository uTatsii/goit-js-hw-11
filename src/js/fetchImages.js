export { loadImagesByRequest, loadMore, canLoadMore, totalHits };
const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30087114-c2a4a7f273bfb2ec9ee563fe8';
const requestOptions = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};
const receivedOptions = {
  totalHits: 0,
  loaded: 0,
}
let { totalHits, loaded } = receivedOptions;

function canLoadMore() {
  return totalHits !== loaded;
}

async function loadMore(request) {
  requestOptions.page += 1;
  const response = await fetchImages(request);
  loaded += response.hits.length;
  return response;
}

async function loadImagesByRequest(request) {
  requestOptions.page = 1;
  loaded = 0;
  const response = await fetchImages(request);
  loaded += response.hits.length;
  totalHits = response.totalHits;
  return response;
}

function optionsToString() {
  return Object.keys(requestOptions)
    .reduce((acc, optionKey) => (acc += `${optionKey}=${requestOptions[optionKey]}&`), '')
    .slice(0, -1);
}

async function fetchImages(request) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${request}&${optionsToString()}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}
