import Refs from "./Refs";
import DataFetch from "./apiServiceSearch";
import {renderFilmsCard} from "./renderFilmsCard";
import {logOutAuthUser,authState,authWithEmailAndPassword,RegistrationWithEmailAndPassword} from "./fireBaseApi";
import {writeUserDataByCategoryName,readUserDataByCategoryName} from "./readOrWriteUserData";
import Pagination from 'tui-pagination';
import {onModalClose} from "./closeModalFunctions";
import formLogIn from '../templates/formLogIn.hbs';
import formRegistration from '../templates/formRegistration.hbs';
const dataFetch = new DataFetch()
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
// ==================reload page ============================
Refs.backHomePage.addEventListener('click' , onClickReloadPage)
// ==================logOut========================
Refs.logOutButton.addEventListener('click' , logOutAuthUser)
// ==================search by input========================
Refs.logInButton.addEventListener('click' , onClickregistrationOrlogInUser)
// ==================search by input========================
Refs.searchInput.addEventListener('input', debounce(onFilmSerchValue, DEBOUNCE_DELAY));
// =================functions===============================
function onClickReloadPage(){location.reload()}
authState()
let fims = [12341244124,34324234,3252353,32546,3423432]
writeUserDataByCategoryName('Watched',fims)
// readUserDataByCategoryName('Watched',localStorage.getItem('userID'))
// ====================serch film==========================
function onClickregistrationOrlogInUser(){
    Refs.body.classList.add("modal-open")
    Refs.modalWindow.classList.add("modal_form")
    renderForm(formLogIn)
    let form = document.querySelector('.form')
    form.addEventListener('submit', onSubmitEntryForm)
    form.querySelector('.to_signup').addEventListener('click',onRegistrationLinkClick)
    Refs.backDrop.classList.toggle('is-hidden')
    onModalClose()
}
function renderForm(value){
  Refs.modalContentContainer.insertAdjacentHTML('afterbegin', value())
}
function onSubmitEntryForm(e){
  e.preventDefault()
  const email = e.target.querySelector('#email').value;
  const password = e.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password);
  this.reset()
  Refs.body.classList.remove("modal-open")
  Refs.backDrop.classList.add('is-hidden')
  Refs.modalWindow.classList.remove("modal_form")
  Refs.modalContentContainer.innerHTML = ''
  console.log(email,password)
}
function onSubmitRegistrationForm(e){
  e.preventDefault()
  const email = e.target.querySelector('#email').value;
  const password = e.target.querySelector('#password').value;
  const passwordConfirm = e.target.querySelector('#passwordConfirm').value;
  RegistrationWithEmailAndPassword(email, password);
  this.reset()
  Refs.body.classList.remove("modal-open")
  Refs.backDrop.classList.add('is-hidden')
  Refs.modalWindow.classList.remove("modal_form")
  Refs.modalContentContainer.innerHTML = ''
  console.log(email,password,passwordConfirm)
}

function onRegistrationLinkClick(e){
  Refs.modalContentContainer.innerHTML = '';
  renderForm(formRegistration)
  let form = document.querySelector('.form')
  form.addEventListener('submit', onSubmitRegistrationForm)
}


function onFilmSerchValue(e) {
    e.preventDefault()
    if( e.target.value === ''){
        dataFetch.fetchTopFilms().then(films => {renderFilmsCard(films.results)});
        Refs.errorTextField.textContent ='Search result not successful. Enter the correct movie name'
    return}
      dataFetch.query = e.target.value.trim();
      Refs.galleryRef.innerHTML = '';
      dataFetch.fetchFilms().then(films =>{
      if(films.results.length === 0){dataFetch.fetchTopFilms().then(films => {renderFilmsCard(films.results)});
          Refs.errorTextField.textContent ='Search result not successful. Enter the correct movie name'
    return}
      Refs.errorTextField.textContent =''
      renderFilmsCard(films.results)
      onClickPaginationFilms ()
    })
}
function onClickPaginationFilms (){
    dataFetch.page = 1;
    const instance2 = new Pagination(Refs.paginationContainer, {
      totalItems: DataFetch.totalPages,
      itemsPerPage: 20,
      visiblePages:  5,
      centerAlign: true,
    });
    instance2.on('beforeMove', (event) => {
      dataFetch.page = event.page;
      dataFetch.fetchFilms().then(films => {
        Refs.galleryRef.innerHTML = '';
        renderFilmsCard(films.results)})
    })
  }