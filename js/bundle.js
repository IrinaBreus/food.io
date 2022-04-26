/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc() {
    let result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    
    innitLocalSettings('#gender div', 'calculating__choose-item_active');
    innitLocalSettings('#ratios div', 'calculating__choose-item_active');

    localStorage.getItem('sex') ? sex = localStorage.getItem('sex') : localStorage.setItem('sex', 'female');
    localStorage.getItem('ratio') ? ratio = localStorage.getItem('ratio') : localStorage.setItem('ratio', 1.375);

    
    function innitLocalSettings(selector, activeClass) {
        let elems = document.querySelectorAll(selector);

        elems.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.dataset.ratio === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }
    
    calc();
    getStaticInfo('#ratios', 'calculating__choose-item_active');
    getStaticInfo('#gender', 'calculating__choose-item_active');
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');


    function calc() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        };

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 *height) - (5.7 * age)) * ratio);
        };
    }

    function getStaticInfo(selector, activeClass) {
        let elems = document.querySelectorAll(`${selector} div`);

        elems.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.dataset.ratio;
                    localStorage.setItem('ratio', +e.target.dataset.ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                };

                elems.forEach(elem => elem.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                calc();
            });
        });
    }

    function getDynamicInfo(selector) {
        let input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            };
            calc();
        });
    }
}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
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

    const getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        };
       
       return res.json();
   };

   getResourse('http://localhost:3000/menu')
   .then(data => {
       data.forEach(({img, altimg, title, descr, price}) => {
           new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
       });
   });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо, мы скоро с Вами свяжемся!',
        failure: 'Упс... Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
         const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
         });
        
        return res.json();
    };

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
        openModal();

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
            closeModal();
        }, 4000);
    };

    fetch('http://localhost:3000/menu')
        .then(data => data.json());
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    const sliders = document.querySelectorAll('.offer__slide'),
        current = document.querySelector('#current'),
        arrowPrev = document.querySelector('.offer__slider-prev'),
        arrowNext = document.querySelector('.offer__slider-next'),
        slidersWrapper = document.querySelector('.offer__slider-wrapper'),
        slidersField = document. querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidersWrapper).width;
    let index = 1,
        offset = 0,
        dots = [];
    
    createDots();
    
    
    dots[index - 1].style.opacity = 1;
    sliders.forEach(slide => slide.style.width = width);
    slidersField.style.cssText = `
        width: ${100 * sliders.length}%;
        display: flex;
        transition: all 0.5s`;
    slidersWrapper.style.overflow = 'hidden';
    current.innerHTML = `0${index}`;

    arrowPrev.addEventListener('click', () => {
        offset == parseInt(width) * (sliders.length - 1) ? 
            offset = 0 : offset += parseInt(width);

        index == sliders.length ? index = 1 : index++;

        moveSliders(offset, index);
        movieDots(index - 1);
    });

    arrowNext.addEventListener('click', () => {
        offset == 0 ? offset = parseInt(width) * (sliders.length - 1) :
            offset -= parseInt(width);

        index == 1 ? index = sliders.length : index--;

        moveSliders(offset, index);
        movieDots(index -1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            movieDots(i);

            offset = parseInt(width) * (i);
            moveSliders(offset, i + 1);
        });
    });

    function createDots() {
        let indicators = document.createElement('ol');
        indicators.classList.add('carousel-indicators');
        for (let i = 0; i < sliders.length; i++) {
            let dot = document.createElement('li');
            dot.classList.add('dot');
            indicators.append(dot);
            dots.push(dot);
        };
        slidersWrapper.append(indicators);
    }
    
    function movieDots(n) {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[n].style.opacity = '1';
    }

    function moveSliders(offset, index) {
        slidersField.style.transform = `translateX(-${offset}px)`;
        current.innerHTML = `0${index}`;
    }

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    
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
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
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
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/

document.addEventListener('DOMContentLoaded', () => {
    const calc = __webpack_require__ (/*! ./modules/calc */ "./js/modules/calc.js"),
          cards = __webpack_require__ (/*! ./modules/cards */ "./js/modules/cards.js"),
          form = __webpack_require__ (/*! ./modules/form */ "./js/modules/form.js"),
          modal = __webpack_require__ (/*! ./modules/modal */ "./js/modules/modal.js"),
          slider = __webpack_require__ (/*! ./modules/slider */ "./js/modules/slider.js"),
          tabs = __webpack_require__ (/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__ (/*! ./modules/timer */ "./js/modules/timer.js");
        
    calc();
    cards();
    form();
    modal();
    slider();
    tabs();
    timer();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map