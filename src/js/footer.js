import Refs from "./Refs";
import {onPressEscapeModalClose,onClickBackdropModalClose,onClickButtonModalClose} from "./closeModalFunctions";
Refs.footerButtonTeamModal.addEventListener('click',onClickOpenTeamModal)

function onClickOpenTeamModal(e){
    // Refs.productCardInWindow.innerHTML = '';
    // renderFilmsCard(devInfo)
    // Refs.backDrop.classList.toggle('is-hidden')
    //     // ============close modal
    //     onClickButtonModalClose()
    //     onClickBackdropModalClose()
    //     onPressEscapeModalClose()
    }
// function renderFilmsCard(data){
//     return data.map(({name , icon , role }) => {Refs.teamListModal.insertAdjacentHTML('afterbegin',devCard({name , icon , role }))})
// }