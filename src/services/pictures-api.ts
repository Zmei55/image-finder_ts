const API_KEY: string = '29121921-8e5b9c13e3f0ecc46ac9f6034';
const BASE_URL: string = 'https://pixabay.com/api';

interface IPictureApi {
  searchQuery: string;
  page: number;
  incrementPage(): void;
  resetPage(): void;
}

export default class PicturesApiService implements IPictureApi {
  searchQuery: string;
  page: number;

  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    return fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`,
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error('Something went wrong!'));
      })
      .then(pictures => pictures.hits);
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery: string) {
    this.searchQuery = newQuery.trim();
    // this.resetPage();
  }
}
