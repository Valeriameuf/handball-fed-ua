<template>
    <div v-show="shown" class="under-main-menu-space">
        <div class="under-main-menu-space__wrapper">
            <div class="container">
                <div class="under-main-menu-space__content">
                    <slot></slot>
                    <div v-if="searchOpen" class="under-main-menu-space__search">
                        <search></search>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Watch} from 'vue-property-decorator';
import {globalEventBus} from "@js/components/globalEventBus";
import Search from "@js/components/Search.vue";
import MainManuSubSection from '@js/classes/MainMenuSubSection';
import {PageStore} from "@js/components/store/PageStore";
import {mapMutations, mapState} from "vuex";

@Component({
    components: {
        Search
    },
    store: PageStore,
    computed: {
        ...mapState('header', [
            'mainMenuOpen',
            'searchOpen',
        ]),
    },
    methods: {
        ...mapMutations('header', [
            'setMainMenuOpen',
            'setSearchOpen',
        ])
    },
})
export default class UnderMainMenuSpace extends Vue {
    mainMenuOpen!: boolean;
    searchOpen!: boolean;
    frontPage!: boolean;
    mainManuSubSection!: MainManuSubSection;
    $headerMain!: Element;
    $submenu!: Element;

    get shown() {
        return this.mainMenuOpen || this.searchOpen;
    }

    mounted() {
        this.$headerMain = document.querySelector('#header-main');
        this.$submenu = document.querySelector('#main-menu-sub');
        this.frontPage = this.$headerMain.classList.contains('header__main--position');
        this.mainManuSubSection = new MainManuSubSection();

        globalEventBus.$on('toggle-main-menu', (targetNode: Element) => {

            this.$submenu.classList.toggle('d-block');
            targetNode.classList.toggle('d-block');

            this.setMainMenuOpen(!this.mainMenuOpen);
        });

        //Outside click
        document.addEventListener('click', event => {
            if (!this.shown) {
                return;
            }

            if (!this.$headerMain.contains(event.target as Element)) {
                // TODO: Fix this shit
                window.mainMenu.closeOpenedTriggers();

                this.setSearchOpen(false);
            }
        });
    }

    setMainMenuOpen: (value: boolean) => void;

    setSearchOpen: (value: boolean) => void;

    @Watch('shown')
    putBackground(newValue: boolean, oldValue: boolean) {
        if (!this.frontPage) {
            return;
        }

        const classToRemove = oldValue ? 'header__main--position-bg' : 'header__main--position';
        const classToAdd = oldValue ? 'header__main--position' : 'header__main--position-bg';

        this.$headerMain.classList.replace(classToRemove, classToAdd);
    }
}
</script>

<style scoped>
</style>
