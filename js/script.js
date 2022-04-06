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

    //Таймер
    let days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds');

    let now = new Date();
    let deadline = new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 2));
    
    setClock();

    function getDate() {
        let time = deadline - (new Date()),
            day = Math.floor(time / (1000 * 60 * 60 * 24)),
            hour = Math.floor((time / (1000 * 60 * 60)) % 24),
            minute = Math.floor((time / (1000 * 60)) % 60),
            second = Math.floor(time / 1000 % 60);
        
        return {time, day, hour, minute, second};
    }

    let timerId = setInterval(setClock, 1000);

    function setClock() {
        let t = getDate();
        days.innerHTML = normalise(t.day);
        hours.innerHTML = normalise(t.hour);
        minutes.innerHTML = normalise(t.minute);
        seconds.innerHTML = normalise(t.second);

        if (t.time <= 0) {
            clearInterval(timerId);
        }
    }

    function normalise(num) {
        return num >= 0 && num < 10 ? `0${num}`: num;
    }

    //Modal
    const btns = document.querySelectorAll('button[data-modal]'),
          modal = document.querySelector('.modal');

    btns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // const modalTimerId = setTimeout(openModal, 10000);

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


    // карточки товара
    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
            this.price = price;
            this.transfert = 2.86;
            this.changeToRub();
        }

        changeToRub() {
            return Math.round(this.price * this.transfert);
        }
        render() {
            let elem = document.createElement('div');
            elem.classList.add('menu__item');
            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.changeToRub()}</span> руб/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    };

    new MenuCard ("img/tabs/vegy.jpg", "vegy", 
                'Меню "Фитнес"', 
                'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
                229, 
                '.menu__field .container')
        .render();

        new MenuCard ("img/tabs/elite.jpg", "elite", 
                        'Меню “Премиум”', 
                        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
                        550, 
                        '.menu__field .container')
                .render();
       
        new MenuCard ("img/tabs/post.jpg", "post", 
                'Меню "Постное"', 
                'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
                430, 
                '.menu__field .container')
        .render();

        
})