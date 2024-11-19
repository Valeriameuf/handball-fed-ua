export default class Submenu {
    constructor(
        containerSelector,
        openBtnSelector,
        closeBtnSelector
    ) {
        this.containerSelector = containerSelector;
        this.openBtnSelector = openBtnSelector;
        this.closeBtnSelector = closeBtnSelector;
        this.triggerSelector = '.mobile-nav__link[data-has-children]';
        this.openTriggerAttribute = 'data-open-trigger';
        this.currentEvent;
        this.openBtn;
        this.closeBtn;

        this.init();
    }

    init() {
        this.container = document.querySelector(this.containerSelector);

        if (this.container === null) {
            return;
        }

        this.openBtn = document.querySelector(this.openBtnSelector);
        this.closeBtn = document.querySelector(this.closeBtnSelector);

        this.registerListeners();
    }

    registerListeners() {
        this.openBtn.addEventListener('click', () => this.container.classList.add('active'));
        this.closeBtn.addEventListener('click', () => this.container.classList.remove('active'));

        const triggers = this.getTriggers();

        for (const trigger of triggers) {
            trigger.addEventListener('click', event => {
                this.currentEvent = event;

                this.currentEvent.preventDefault();

                this.closeOpenedTriggers();

                const dropDown = trigger
                    .closest('.mobile-nav__item')
                    .querySelector('.mobile-nav__sublist');

                const isOpened = this.isOpenedTrigger(trigger);

                if (isOpened) {
                    trigger.removeAttribute(this.openTriggerAttribute);
                    trigger
                        .querySelector('i')
                        .classList
                        .replace('fa-chevron-up', 'fa-chevron-down');

                    dropDown.classList.remove('mobile-nav__sublist--open');
                } else {
                    trigger.setAttribute(this.openTriggerAttribute, '');
                    trigger
                        .querySelector('i')
                        .classList
                        .replace('fa-chevron-down', 'fa-chevron-up');

                    dropDown.classList.add('mobile-nav__sublist--open');
                }
            });
        }
    }

    isOpenedTrigger(trigger) {
        return trigger.hasAttribute(this.openTriggerAttribute);
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
