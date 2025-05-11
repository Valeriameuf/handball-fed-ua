import Vue from 'vue';

export interface GlobalEventBus {
    $emit(event: 'toggle-main-menu', targetNode: Element): this;

    $on(event: 'toggle-main-menu', callback: (targetNode: Element) => void): this;
}

export const globalEventBus: GlobalEventBus = new Vue();
