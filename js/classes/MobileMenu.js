export default class MobileMenu {
    constructor() {
        this.containerSelector = '#dropdown-menu';
        this.openBtnSelector = '#mobile-menu-open';
        this.closeBtnSelector = '#mobile-menu-close';
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
        this.openBtn.addEventListener('click', () => this.toggleMobileMenu());
        this.closeBtn.addEventListener('click', () => this.toggleMobileMenu());

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

                    dropDown.classList.remove('d-block');
                } else {
                    trigger.setAttribute(this.openTriggerAttribute, '');
                    trigger
                        .querySelector('.mobile-nav__caret')
                        .classList
                        .replace('fa-caret-right', 'fa-caret-down');

                    dropDown.classList.add('d-block');
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

    toggleMobileMenu() {
        document.body.classList.toggle('overflow-hidden')
        this.container.classList.toggle('active');
    }
}
