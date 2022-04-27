function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal(btnSelector, modalSelector, modalTimerId) {
    const btns = document.querySelectorAll(btnSelector),
          modal = document.querySelector(modalSelector);

    btns.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    

    document.addEventListener('click', (e) => {
        if (e.target == modal || e.target.closest('.modal__close')) {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.style.display == 'block') {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll',  openModalScrollBottom);

    function openModalScrollBottom() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, modalTimerId);
        };
        window.removeEventListener('scroll', openModalScrollBottom);
    }
    
}

export default modal;

export {openModal};
export {closeModal};