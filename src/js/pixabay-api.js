import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com';
const myApiKey = '55024434-f37333710f698bb54909d1b68';

export function getImagesByQuery(query) {
  return axios
    .get('/api/', {
      params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data.hits);
}