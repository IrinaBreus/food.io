'use strict';
document.addEventListener('DOMContentLoaded', () => {

    // Табы
    const parent = document.querySelector('.tabheader__items'),
          tabs = parent.querySelectorAll('.tabheader__item'),
          tabContent = document.querySelectorAll('.tabcontent');
    

    hideContent();
    showContent();
    
    parent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((btn, i) => {
                if (e.target == btn) {
                    hideContent();
                    showContent(i);
                };
            });
        };
    });
    
    function hideContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }
})