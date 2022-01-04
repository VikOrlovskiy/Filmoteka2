import Refs from "./Refs";
import teamlist from '../templates/devModal.hbs';
import {onModalClose} from "./closeModalFunctions";
// ===================== team modal open===============================
Refs.footerButtonTeamModal.addEventListener('click',onClickOpenTeamModal)
// =====================function open on click=========================
function onClickOpenTeamModal(e){
    Refs.modalContentContainer.innerHTML = '';
    renderDevList()
    Refs.body.classList.add("modal-open")
    Refs.backDrop.classList.toggle('is-hidden')
    onModalClose()
    }
// =====================function render dev list======================
function renderDevList(){
    Refs.modalContentContainer.insertAdjacentHTML('afterbegin', teamlist())
}