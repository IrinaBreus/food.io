function slider ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
         slider  = document.querySelector(container),
         slidesWrapper = document.querySelector(wrapper),
         slidesField = document.querySelector(field),
         prew = document.querySelector(prevArrow),
         next = document.querySelector(nextArrow),
         current = document.querySelector(currentCounter),
         total = document.querySelector(totalCounter),
         width = window.getComputedStyle(slidesWrapper).width;

    let index = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    showCurrent(index);
    function showCurrent(x) {
        if (slides.length < 10) {
            current.textContent = `0${x}`;
        } else {
            current.textContent = x;
        }
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => item.style.width = width);
    
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = '1';
        } else {
            dot.style.opacity = '0.5';
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function showDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[index - 1].style.opacity = '1';
    }
 
    function deleteLetters(str) {
        return +str.replace(/\D/g, '');
    }
    prew.addEventListener('click', () => {
        if (offset  == 0) {
            offset = deleteLetters(width) * (slides.length -1);
        } else {
            offset -= deleteLetters(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (index == 1) {
            index = slides.length;
        } else {
            index--;
        }
        showCurrent(index);
        showDot();
    });

    next.addEventListener('click', () => {
        if (offset == deleteLetters(width) * (slides.length -1)) {
            offset =0;
        } else {
            offset += deleteLetters(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (index == slides.length) {
            index = 1;
        } else {
            index++;
        }
        showCurrent(index);
        showDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            index = slideTo;
            offset = deleteLetters(width) * (slideTo -1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            showDot();
            showCurrent(index);
        });
    });

    // showSlides(index);

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         index = 1;
    //     }
    //     if (n < 1) {
    //         index = slides.length;
    //     }
    //     slides.forEach(item => item.style.display =  'none');
    //     slides[index -1].style.display = '';
        
    //     if (slides.length < 10) {
    //         current.textContent = `0${index}`;
    //     } else {
    //         current.textContent = index;
    //     }
    // }

    // function plusSlide(n) {
    //     showSlides(index += n);
    // }

    // prew.addEventListener('click', () => {
    //     plusSlide(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlide(1);
    // });

}

export default slider;