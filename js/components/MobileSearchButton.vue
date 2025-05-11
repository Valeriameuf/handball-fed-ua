<template>
    <div id="mobile-search-button">
        <search-button :active="mobileSearchOpen" @click="setMobileSearchOpen(!mobileSearchOpen)"/>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {PageStore} from "@js/components/store/PageStore";
import {mapMutations, mapState} from "vuex";
import SearchButton from "@js/components/SearchButton.vue";

@Component({
    components: {
        SearchButton
    },
    store: PageStore,
    computed: {
        ...mapState('header', [
            'mobileSearchOpen',
        ]),
    },
    methods: {
        ...mapMutations('header', ['setMobileSearchOpen'])
    },
})
export default class MobileSearchButton extends Vue {
    mobileSearchOpen!: boolean;

    setMobileSearchOpen: (value: boolean) => void;
}
</script>

<style scoped>
</style>
