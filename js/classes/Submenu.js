export default class Submenu {
    constructor(containerSelector) {
        this.containerSelector = containerSelector;
        this.triggerSelector = '.header__link[data-has-children]';
        this.triggerActiveClass = 'header__link--active';
        this.currentEvent;

        this.init();
    }

    init() {
        this.container = document.querySelector(this.containerSelector);

        if (this.container === null) {
            return;
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
                    trigger.closest('li').classList.remove('active');
                } else {
                    trigger.classList.add(this.triggerActiveClass);
                    trigger.closest('li').classList.add('active');
                }

                const innerMenu = trigger.parentNode.querySelector('ul');
                innerMenu.classList.toggle('d-inline-block');
            });
        }
    }

    isOpenedTrigger(trigger) {
        return trigger.classList.contains(this.triggerActiveClass);
    }

    getTriggers() {
        if (this.currentEvent === undefined) {
            return this.container.querySelectorAll(this.triggerSelector);
        }

        return Array.from(
            this.currentEvent.target
                .closest('ul')
                .querySelectorAll(this.triggerSelector)
        );
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
