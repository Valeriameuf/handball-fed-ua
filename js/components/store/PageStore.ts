import Vuex, { Store } from 'vuex';
import { header } from '@js/components/store/modules/header';
import Vue from 'vue';

Vue.use(Vuex);

type State = {
    header: typeof header,
};

export const PageStore: Store<State> = new Vuex.Store({
    modules: {
        header,
    },
});
