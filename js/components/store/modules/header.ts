import { Module } from 'vuex';

type State = {
    mainMenuOpen: boolean,
    searchOpen: boolean,
    mobileSearchOpen: boolean,
}

const initState = (): State => ({
    mainMenuOpen: false,
    searchOpen: false,
    mobileSearchOpen: false,
});

export const header: Module<State, any> = {
    namespaced: true,
    state: initState(),
    mutations: {
        setMainMenuOpen(state: State, value: boolean): void {
            state.mainMenuOpen = value;
        },
        setSearchOpen(state: State, value: boolean): void {
            state.searchOpen = value;
        },
        setMobileSearchOpen(state: State, value: boolean): void {
            state.mobileSearchOpen = value;
        },
    },
};
