import axios from 'axios';

const API_KEY = '26815523-fce97669ecba6a5ffa2a6f920';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}`;

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async getImages() {
        const url = `${BASE_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        
        try {
            const responce = await axios.get(url);
            this.incrementPage();
            return responce.data;
        } catch (error) {
            console.log(error.message);
        }
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

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}