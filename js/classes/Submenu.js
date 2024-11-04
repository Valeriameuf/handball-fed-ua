import Menu from "./Menu";

export default class Submenu extends Menu {
    getOpenedTriggers() {
        return Array.from(
            this.currentEvent.target
                .closest("ul")
                .querySelectorAll("li[data-opened] > i")
        );
    }
}
