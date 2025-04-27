export default class MainMenuSubSection {
    constructor() {
        this.containerSelector = '#main-menu-sub';
        this.triggerSelector = '.main-menu-link[data-has-children]';
        this.triggerActiveClass = 'main-menu-link--active';
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
                    trigger.closest('.main-menu-sub__item').classList.remove('main-menu-sub__item--active');
                } else {
                    trigger.classList.add(this.triggerActiveClass);
                    trigger.closest('.main-menu-sub__item').classList.add('main-menu-sub__item--active');
                }

                const innerMenu = trigger.parentNode.querySelector('.main-menu-sub__sublist');
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
            this.currentEvent.currentTarget
                .closest('ul')
                .querySelectorAll(this.triggerSelector)
        );
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
