export default function mainMenu() {
    const container = document.querySelector('.main-menu__container');
    const menu = document.querySelector('.main-menu');
    const burger = document.querySelector('.main-menu__burger');
    burger.addEventListener('click', (ev) => {
        ev.stopPropagation();
        if (container.classList.contains('main-menu__container--hidden')) {
            showMenu();
        }
        else {
            hideMenu();
        }
        burger.classList.remove('main-menu__burger-icon--active');
    });
    burger.addEventListener('pointerdown', () => {
        burger.classList.add('main-menu__burger-icon--active');
    });
    document.querySelector('.main-wrapper').addEventListener('click', () => {
        hideMenu();
    });
    function showMenu() {
        container.classList.remove('main-menu__container--hidden');
        setTimeout(() => {
            container.classList.remove('main-menu__container--hiding');
            menu.classList.remove('main-menu--hidden');
        }, 0);
    }
    function hideMenu() {
        container.classList.add('main-menu__container--hiding');
        menu.classList.add('main-menu--hidden');
        setTimeout(() => {
            container.classList.add('main-menu__container--hidden');
        }, 200);
    }
    /*
     * Menu Items
     */
    const menuItems = document.querySelectorAll('.main-menu__item');
    let currActiveMenuItem = 0;
    menuItems.forEach((menuItem, index) => {
        menuItem.addEventListener('click', function (ev) {
            menuItems[currActiveMenuItem].classList.remove('main-menu__item--active');
            // @ts-ignore
            this.classList.add('main-menu__item--active');
            currActiveMenuItem = index;
        });
    });
}
