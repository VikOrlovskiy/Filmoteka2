import Refs from "./Refs";
import filmCard from '../templates/film.hbs';
import DataFetch from "./apiServiceSearch";
const dataFetch = new DataFetch()
// ====================open selected film==========================
Refs.galleryRef.addEventListener('click', openfilm);

function openfilm(e) {
    dataFetch.moveID = e.target.parentNode.dataset.id
    Refs.productCardInWindow.innerHTML = '';
    dataFetch.fetchFilmByID().then(film =>{
      createFilmCard(film)})
    Refs.backDrop.classList.toggle('is-hidden')
    // // ============close modal===============================
    Refs.modalButtonClose.addEventListener('click', e => Refs.backDrop.classList.add('is-hidden'))
    Refs.backDrop.addEventListener('click', e => {
      if(e.target !== e.currentTarget){return}
      Refs.backDrop.classList.add('is-hidden')
    })
    document.addEventListener("keydown", e => {
      if(e.key === "Escape"){
        Refs.backDrop.classList.add('is-hidden')
      }
    });
  }

  function createFilmCard(film){
    const  {original_title , title, poster_path ,vote_average,vote_count,popularity,genres,overview} = film
    let filmGenry = genres[0].name;
    let rounded = Math.round(popularity * 10) / 10
    Refs.productCardInWindow.insertAdjacentHTML('afterbegin',filmCard({original_title , title, poster_path ,vote_average,vote_count,rounded,filmGenry,overview}),)
  }