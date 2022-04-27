function tabs(parentSelector, tabsSelector, tbContentSelector, activeClass) {
    
    const parent = document.querySelector(parentSelector),
        tabs = parent.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tbContentSelector);
    

    hideContent();
    showContent();
    
    parent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
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
            item.classList.remove(activeClass);
        });
    }

    function showContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');
        tabs[i].classList.add(activeClass);
    }
}

export default tabs;