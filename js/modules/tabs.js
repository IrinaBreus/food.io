function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabs.forEach(btns => {
            btns.classList.remove(activeClass);
        });

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add(activeClass);
        
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((btn, i) => {
                if (e.target == btn) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;