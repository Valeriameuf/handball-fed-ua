export default class MainMenu {
    constructor() {
        this.containerSelector = '#main-menu';
        this.submenuRealSelector = '#main-menu-sub';
        this.closeMenuBtnSelector = '#main-menu-sub-close-menu-btn';
        this.triggerSelector = '.main-menu-link[data-has-children]';
        this.triggerActiveClass = 'main-menu-link--active';
        this.currentEvent;
        this.headerMain;
        this.frontPage = false;

        this.init();
    }

    init() {
        this.container = document.querySelector(this.containerSelector);

        if (this.container === null) {
            return;
        }

        this.submenuReal = document.querySelector(this.submenuRealSelector);

        this.closeMenuBtn = document.querySelector(this.closeMenuBtnSelector);

        this.headerMain = document.querySelector('#header-main');

        if (this.headerMain.classList.contains('header__main--position')) {
            this.frontPage = true;
        }

        this.registerListeners();
    }

    registerListeners() {
        document.addEventListener('click', event => {
            if (!this.submenuReal.classList.contains('d-block')) {
                return;
            }

            if (!this.headerMain.contains(event.target)) {
                this.closeOpenedTriggers();
            }
        });

        this.closeMenuBtn.addEventListener('click', event => {
            event.preventDefault();
            this.closeOpenedTriggers();
        });

        const triggers = this.getTriggers();

        for (const trigger of triggers) {
            trigger.addEventListener('click', event => {
                this.currentEvent = event;

                this.currentEvent.preventDefault();

                this.closeOpenedTriggers();

                const isOpened = this.isOpenedTrigger(trigger);

                if (isOpened) {
                    trigger.classList.remove(this.triggerActiveClass);
                    this.headerMain.classList.replace(
                        'header__main--position-bg',
                        this.frontPage ? 'header__main--position' : 'header__main--bg'
                    );
                } else {
                    trigger.classList.add(this.triggerActiveClass);
                    this.headerMain.classList.replace(
                        this.frontPage ? 'header__main--position' : 'header__main--bg',
                        'header__main--position-bg'
                    );
                }

                const targetNode = document.querySelector(
                    trigger.getAttribute('data-target-node-id')
                );

                if (targetNode !== null) {
                    this.submenuReal.classList.toggle('d-block');
                    targetNode.classList.toggle('d-block');
                }
            });
        }
    }

    isOpenedTrigger(trigger) {
        return trigger.classList.contains(this.triggerActiveClass);
    }

    getTriggers() {
        return Array.from(this.container.querySelectorAll(this.triggerSelector));
    }

    getOpenedTriggers() {
        return this.getTriggers().filter(trigger => this.isOpenedTrigger(trigger));
    }

    closeOpenedTriggers() {
        for (const trigger of this.getOpenedTriggers()) {
            if (trigger === this.currentEvent.currentTarget) {
                continue;
            }
            trigger.dispatchEvent(new Event('click'));
        }
    }
}
