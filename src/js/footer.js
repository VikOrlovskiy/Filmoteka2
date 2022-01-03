import Refs from "./Refs";
import {onPressEscapeModalClose,onClickBackdropModalClose,onClickButtonModalClose} from "./closeModalFunctions";
import devInfo from "./teamInform.js"
import devCard from '../templates/devCard.hbs';
Refs.footerButtonTeamModal.addEventListener('click',onClickOpenTeamModal)
function onClickOpenTeamModal(e){
    Refs.productCardInWindow.innerHTML = '';
    renderFilmsCard(devInfo)
    Refs.backDrop.classList.toggle('is-hidden')
        // ============close modal
        onClickButtonModalClose()
        onClickBackdropModalClose()
        onPressEscapeModalClose()
    }
console.log(devInfo)
function renderFilmsCard(data){
    return data.map(({name , icon , role }) => {Refs.productCardInWindow.insertAdjacentHTML('afterbegin',devCard({name , icon , role }))})
}