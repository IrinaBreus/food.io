import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо, мы скоро с Вами свяжемся!',
        failure: 'Упс... Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.after(statusMessage);


            const formData = new FormData(form);

            let json = JSON.stringify(Object.fromEntries(formData.entries()));
           
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            })
        });
    }

    function showThanksModal(message) {
        const modalDialog = document.querySelector('.modal__dialog');
        modalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        let modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');
        modalThanks.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        
        document.querySelector('.modal').append(modalThanks);
        setTimeout(() => {
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            modalThanks.remove();
            closeModal('.modal');
        }, 4000);
    };

    fetch('http://localhost:3000/menu')
        .then(data => data.json());
}

export default form;