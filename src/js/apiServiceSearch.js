const URL ='https://api.themoviedb.org/3/'
const KEY ='api_key=3bcb9c362d567dc87ce4f986b1e52bec'
// ===================================================
const axios = require('axios');
// ==================================================
export default class DataFetch {
// ============= GET FILM GENRE ===============  
static fetchGenres() {
        return axios.get(`${URL}/genre/movie/list?${KEY}&language=${this.language}`)
    .then(response=> {this.genres = response.data.genres})}
// ============= GET film by ID ===============
    static  fetchFilmByID() {
        return axios.get(`${URL}/movie/${this.moveID}?${KEY}&language=${this.language}`).then(response => response.data)} ;
constructor(){
    this.searchValue = '';
    this.language ='en-US';
    this.filmForAdult = false;
    this.moveID = 0;
    this.genres=[];
    this.page = 1;
    this.totalPages = 99;
    console.log(this.page)
    }
// ============= GET film by user value ===============  
fetchFilms() {
   return axios.get(`${URL}search/movie?${KEY}&language=${this.language}&query=${this.searchValue}&page=${this.page}&include_adult=${this.filmForAdult}`).then(response => response.data)} 
// ================== GET top film ===============  
fetchTopFilms() {
    return axios.get(`${URL}trending/movie/week?${KEY}&page=${this.page}`).then(films => {return  films.data})} 
// =============Pagination Actions===============  
   nextPage(){this.page +=1;}
   prewPage(){this.page -=1;}
   pageReset(){this.page = 1;}
// =================== get/set=======================
    get query() {return this.searchQuery}
    set query(newQuery) {this.searchQuery = newQuery}
    get pageNum() {return this.page}
    set pageNum(newPage) {this.page = newPage}
}
