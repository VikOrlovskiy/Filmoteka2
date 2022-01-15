import Refs from "./Refs";
import {onModalClose} from "./closeModalFunctions";
import {RegistrationWithEmailAndPassword,authWithEmailAndPassword} from "./fireBaseApi";
import formLogIn from '../templates/formLogIn.hbs';
import formRegistration from '../templates/formRegistration.hbs';
// ==================library btn============================
Refs.userButtons.addEventListener('click', onClickShowWatchedAndQueue)
// ==================navigation btn=========================
Refs.navigationPanel.addEventListener('click', onClickChengeNavigationPage)
// ==================functions=========================
function onClickReloadPage(){location.reload()}

function onClickChengeNavigationPage(e){
    // close gate !btn
  if(e.target.nodeName !== 'BUTTON'){return}
  if(e.target.dataset.action === 'form'){
  Refs.body.classList.add("modal-open")
  Refs.modalWindow.classList.add("modal_form")
  renderForm(formLogIn)
  let form = document.querySelector('.form')
  form.addEventListener('submit', onSubmitEntryForm)
  form.querySelector('.to_signup').addEventListener('click',onRegistrationLinkClick)
  Refs.backDrop.classList.toggle('is-hidden')
  onModalClose()
  return;
  }
  // active btn
  const activeBtn = document.querySelector('.navigation_button.active');
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
  Refs.galleryRef.innerHTML = '<li ><p>You need to register to accesse</p</li>';
  Refs.paginationContainer.classList.add("is-hidden")
  // fetch user library films
  return;
  }
  //click in home btn
  Refs.errorTextField.textContent = '';
  onClickReloadPage()
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

function onRegistrationLinkClick(e){
    Refs.modalContentContainer.innerHTML = '';
    renderForm(formRegistration)
    let form = document.querySelector('.form')
    form.addEventListener('submit', onSubmitRegistrationForm)
}
