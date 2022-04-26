function modal() {
    const btns = document.querySelectorAll('button[data-modal]'),
          modal = document.querySelector('.modal');

    btns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    const modalTimerId = setTimeout(openModal, 10000);

    document.addEventListener('click', (e) => {
        if (e.target == modal || e.target.closest('.modal__close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.style.display == 'block') {
            closeModal();
        }
    });

    window.addEventListener('scroll',  openModalScrollBottom);

    function openModalScrollBottom() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
        };
        window.removeEventListener('scroll', openModalScrollBottom);
    }
    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

module.exports = modal;