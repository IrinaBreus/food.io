'use strict';
import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal'

document.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000);

    calc();
    cards();
    form('form', modalTimerId);
    modal('button[data-modal]', '.modal');
    slider({
        slides: '.offer__slide',
        current: '#current',
        arrPrev: '.offer__slider-prev',
        arrNext: '.offer__slider-next',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    timer();
})