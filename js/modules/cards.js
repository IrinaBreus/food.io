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