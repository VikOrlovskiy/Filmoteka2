const URL ='https://api.themoviedb.org/3/'
const KEY ='api_key=3bcb9c362d567dc87ce4f986b1e52bec'
// ===================================================
const axios = require('axios');
// ==================================================
export default class DataFetch {
    constructor(){
        this.searchValue = '';
        this.language ='en-US';
        this.filmForAdult = false;
        this.moveID = 0;
        this.genres=[];
        this.page = 1;
        this.totalPages = 1;
    }
    // ================== GET top film ===============  
    fetchTopFilms() {
         const response = await axios.get(`${URL}trending/movie/week?${KEY}&page=${this.page}`)
         return response.data} 
        // ============= GET film by user value ===============  
    fetchFilms() {
         const response = await axios.get(`${URL}search/movie?${KEY}&language=${this.language}&query=${this.value}&page=${this.page}&include_adult=${this.filmForAdult}`)
         return response.data} 
       // ============= GET FILM GENRE ===============  
    fetchGenres() {
         const response = await axios.get(`${URL}/genre/movie/list?${KEY}&language=${this.language}`)
         this.genres = response.data.genres}
       // ============= GET FILM by id ===============  
    fetchFilmByID() {
         const response = await axios.get(`${URL}/movie/${this.moveID}?${KEY}&language=${this.language}`)
         return response.data} 
}
