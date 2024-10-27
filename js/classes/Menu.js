export default class Menu {
    constructor(
        triggersSelector,
        openedIconClass,
        closedIconClass,
        eventCallback
    ) {
        this.triggersSelector = triggersSelector;
        this.openedIconClass = openedIconClass;
        this.closedIconClass = closedIconClass;
        this.eventCallback = eventCallback;
        this.currentEvent;
    }

    init() {
        this.registerListeners();
    }

    getOpenedTriggers() {
        return Array.from(
            document.querySelectorAll(`${this.triggersSelector}[data-open]`)
        );
    }

    closeOpenedTriggers() {
        for (const triggerNode of this.getOpenedTriggers()) {
            if (triggerNode === this.currentEvent.target) {
                continue;
            }
            triggerNode.dispatchEvent(new Event("click"));
        }
    }

    registerListeners() {
        const triggers = Array.from(
            document.querySelectorAll(this.triggersSelector)
        );

        for (const trigger of triggers) {
            trigger.addEventListener("click", (event) => {
                this.currentEvent = event;

                this.closeOpenedTriggers();

                const isClosed = !trigger.parentNode.hasAttribute("data-opened");

                if (isClosed) {
                    trigger.parentNode.setAttribute("data-opened", "");
                    trigger.classList.replace(this.closedIconClass, this.openedIconClass);
                } else {
                    trigger.parentNode.removeAttribute("data-opened");
                    trigger.classList.replace(this.openedIconClass, this.closedIconClass);
                }

                this.eventCallback(trigger);
            });
        }
    }
}
