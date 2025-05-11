<template>
    <mobile-fullscreen-overlay v-if="mobileSearchOpen">
        <div class="mobile-search">
            <div class="mobile-search__search">
                <search></search>
            </div>
            <close-button @click="setMobileSearchOpen(false)"/>
        </div>
    </mobile-fullscreen-overlay>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import MobileFullscreenOverlay from "@js/components/MobileFullscreenOverlay.vue";
import Search from "@js/components/Search.vue";
import {PageStore} from "@js/components/store/PageStore";
import {mapMutations, mapState} from "vuex";
import CloseButton from "@js/components/CloseButton.vue";

@Component({
    components: {CloseButton, MobileFullscreenOverlay, Search},
    store: PageStore,
    computed: {
        ...mapState('header', [
            'mobileSearchOpen'
        ]),
    },
    methods: {
        ...mapMutations('header', [
            'setMobileSearchOpen'
        ])
    },
})
export default class MobileSearch extends Vue {
    mobileSearchOpen!: boolean;

    setMobileSearchOpen: (value: boolean) => void;
}
</script>

<style scoped>
</style>
