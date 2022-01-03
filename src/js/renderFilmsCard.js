import DataFetch from "./apiServiceSearch";
import Refs from "./Refs";
// ==================import HBS==============================
import filmsGalery from '../templates/films.hbs';
// ================== renderFilmsCard =======================
function renderFilmsCard(films){
    return films.map(({original_title , release_date , poster_path ,genre_ids,vote_average,id}) => {
        let correctYear = correctYearRelease(release_date);
        let filmGenry = filterFilmGenrys(genre_ids);
  Refs.galleryRef.insertAdjacentHTML('afterbegin',filmsGalery({filmGenry ,original_title , correctYear, poster_path ,vote_average,id}))})
  }
  function correctYearRelease(release_date){
    let correctYear = release_date.slice(0, 4)
    return correctYear
  }
// ================ filterFilmGenrys =======================
  function filterFilmGenrys(genre_ids){
   let genreList = genre_ids
   .map(id => DataFetch.genres.filter(genre => genre.id === id).map(genre => genre.name))
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
  export{renderFilmsCard}