export default class BottomMenu {
    constructor(containerSelector) {
        this.containerSelector = containerSelector;
        this.triggerSelector = '.header__link[data-has-children]';
        this.triggerActiveClass = 'header__link--active';
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

        this.headerMain = document.querySelector('#header-main');

        if (this.headerMain.classList.contains('header__main--position')) {
            this.frontPage = true;
        }

        this.registerListeners();
    }

    registerListeners() {
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
            if (trigger === this.currentEvent.target) {
                continue;
            }
            trigger.dispatchEvent(new Event('click'));
        }
    }
}
