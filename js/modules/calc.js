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

export default calc;