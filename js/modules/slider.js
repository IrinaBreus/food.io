function slider({slides, current, arrPrev, arrNext, wrapper, field}) {
    const sliders = document.querySelectorAll(slides),
        curr = document.querySelector(current),
        arrowPrev = document.querySelector(arrPrev),
        arrowNext = document.querySelector(arrNext),
        slidersWrapper = document.querySelector(wrapper),
        slidersField = document. querySelector(field),
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
    curr.innerHTML = `0${index}`;

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
        curr.innerHTML = `0${index}`;
    }

}

export default slider;