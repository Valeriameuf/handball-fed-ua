import { globalEventBus } from '@js/components/globalEventBus';

export default class MainMenu {
    constructor() {
        this.containerSelector = '#main-menu';
        this.triggerSelector = '.main-menu-link[data-has-children]';
        this.triggerActiveClass = 'main-menu-link--active';
        this.currentEvent;
        this.headerMain;

        this.init();
    }

    init() {
        this.container = document.querySelector(this.containerSelector);

        if (this.container === null) {
            return;
        }

        this.headerMain = document.querySelector('#header-main');

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
                } else {
                    trigger.classList.add(this.triggerActiveClass);
                }

                const targetNode = document.querySelector(
                    trigger.getAttribute('data-target-node-id')
                );

                if (targetNode !== null) {
                    globalEventBus.$emit('toggle-main-menu', targetNode);
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
