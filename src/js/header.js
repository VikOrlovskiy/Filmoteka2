import Refs from "./Refs";
import DataFetch from "./apiServiceSearch";
const dataFetch = new DataFetch()
// ==================import HBS===================================
import filmsGalery from '../templates/films.hbs';
// ==================first page load========================
window.addEventListener('load',onloadFetchTopfilms)
// ==================reload page ========================
Refs.backHomePage.addEventListener('click' , onClickReloadPage)
// ==================search by submit========================
Refs.searchForm.addEventListener('submit', onClickGetSerchValue )
// ==================navigation btn========================
Refs.navigationPanel.addEventListener('click', onClickChengeNavigationPage)
// ==================library btn========================
Refs.userButtons.addEventListener('click', onClickShowWatchedAndQueue)
// =================functions================================
function onClickReloadPage(){location.reload()}
// =================functions first page render==============
async function onloadFetchTopfilms(){ 
    // genry fetch
    await dataFetch.fetchGenres()
    // TopFilms fetch and render
    await dataFetch.fetchTopFilms().then(films => {
         renderFilmsCard(films.results)})
 }
// ==== renderFilmsCard ======
function renderFilmsCard(films){
    return films.map(({original_title , release_date , poster_path ,genre_ids,vote_average,id}) => {
        console.log(id)
        let correctYear = correctYearRelease(release_date);
        let filmGenry = filterFilmGenrys(genre_ids);
  Refs.galleryRef.insertAdjacentHTML('afterbegin',filmsGalery({filmGenry ,original_title , correctYear, poster_path ,vote_average,id}))})
}
function correctYearRelease(release_date){
    let correctYear = release_date.slice(0, 4)
    return correctYear
}
function filterFilmGenrys(genre_ids){
   let genreList = genre_ids
   .map(id => dataFetch.genres.filter(genre => genre.id === id).map(genre => genre.name))
   .flat();
 if (genreList.length === 0) {
   return (genreList = [`Unknown`]);
 }
 if (genreList.length === 1) {
   return (genreList = [`${genreList[0]}`]);
 }
 if (genreList.length === 2) {
   return (genreList = [`${genreList[0]}, ${genreList[1]}`]);
 } else if (genreList.length > 2) {
   return (genreList = `${genreList[0]}, ${genreList[1]}, Other`);
 }
}

function onClickGetSerchValue(e){
    e.preventDefault()
    if(this.search.value === ''){
    Refs.errorTextField.textContent = 'Search result not successful. Enter the correct movie name and ';
    return}
    let searchValue = this.search.value.trim();
    Refs.errorTextField.textContent = '';
    this.search.value ='';
}
function onClickChengeNavigationPage(e){
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
