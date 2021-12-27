import Refs from "./Refs";
import DataFetch from "./apiServiceSearch";
const dataFetch = new DataFetch()
// ==================import HBS===================================
import filmsGalery from '../templates/films.hbs';
import filmCard from '../templates/film.hbs';
// ==================first page load========================
window.addEventListener('load',onloadFetchTopfilms)
// ==================reload page ========================
Refs.backHomePage.addEventListener('click' , onClickReloadPage)
// ==================search by submit========================
Refs.searchForm.addEventListener('submit', onClickGetSerchValue )
// ==================navigation btn========================
Refs.navigationPanel.addEventListener('click', onClickChengePage)
// ==================library btn========================
Refs.userButtons.addEventListener('click', onClickShowWatchedAndQueue)
// =================functions================================
function onClickReloadPage(){location.reload()}
function renderFilmsCard(films){
    return films.map(({original_title , release_date , poster_path ,genre_ids,vote_average,id}) => {
       
        let correctYearRelease
        if(release_date){correctYearRelease = release_date.slice(0, 4)}

       filterFilmGenrys(genre_ids)
  Refs.galleryRef.insertAdjacentHTML('afterbegin',filmsGalery({genre_ids ,original_title , correctYearRelease, poster_path ,vote_average,id}))})
}
function filterFilmGenrys(genre_ids){
    let filmGenry = []
   dataFetch.genres.map(function(genry) {
        if(genre_ids.includes(genry.id)){
            filmGenry.push(genry.name)}
        if(filmGenry.length > 1){
             filmGenry.slice(0,2)}
        
        })
        console.log(filmGenry)
        return filmGenry
        
}
async function onloadFetchTopfilms(e){ 
   await dataFetch.fetchGenres()
   await dataFetch.fetchTopFilms().then(films => {
        renderFilmsCard(films.results)})
    console.log(dataFetch.genres)
}
function onClickGetSerchValue(e){
    e.preventDefault()
    if(this.search.value === ''){
    Refs.errorTextField.textContent = 'Search result not successful. Enter the correct movie name and ';
    return
    }
    let searchValue = this.search.value.trim();
    Refs.errorTextField.textContent = '';
    this.search.value ='';
}
function onClickChengePage(e){
    // active btn
    const activeBtn = document.querySelector('.navigation_button.active');
    // close gate !btn
    if(e.target.nodeName !== 'BUTTON'){return}
    // chenge disabled btn
    activeBtn.disabled = false;
    e.target.disabled = true;
    // chenge active class btn
    activeBtn.classList.remove('active');
    e.target.classList.add('active');
    // chenge bg header
    Refs.headerContainer.classList.toggle('active');
    // hide serch block
    Refs.searchBlock.classList.toggle('is-hidden');
    // show library buttons
    Refs.userButtons.classList.toggle('is-hidden');
    // fetch users film
   if(e.target.dataset.action === 'LIBRARY'){
    // clear library field
    // Refs.galleryRef.innerHTML = '';
    // fetch user library films
    return;
    }
    //click in home btn
    Refs.errorTextField.textContent = '';
    onClickReloadPage()
}
function onClickShowWatchedAndQueue(e){
    // close gate !btn
    if (e.target.nodeName !== 'BUTTON') {return}
    // active btn
    const activeBtn = document.querySelector('.button.active');
    // chenge disabled btn
    activeBtn.disabled = false;
    e.target.disabled = true;
    // chenge active class btn
    activeBtn.classList.remove('active');
    e.target.classList.add('active');
}
