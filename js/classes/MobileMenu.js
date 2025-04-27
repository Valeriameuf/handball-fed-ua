export default class MobileMenu {
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

                const dropDown = trigger.parentElement.querySelector('.mobile-nav__sublist');

                const isOpened = this.isOpenedTrigger(trigger);

                if (isOpened) {
                    trigger.removeAttribute(this.openTriggerAttribute);
                    trigger
                        .querySelector('.mobile-nav__caret')
                        .classList
                        .replace('fa-caret-down', 'fa-caret-right');

                    dropDown.classList.replace('mobile-nav__sublist--visible', 'mobile-nav__sublist--hidden');
                } else {
                    trigger.setAttribute(this.openTriggerAttribute, '');
                    trigger
                        .querySelector('.mobile-nav__caret')
                        .classList
                        .replace('fa-caret-right', 'fa-caret-down');

                    dropDown.classList.replace('mobile-nav__sublist--hidden', 'mobile-nav__sublist--visible');
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
}
