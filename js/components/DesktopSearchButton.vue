<template>
    <div id="desktop-search-button">
        <search-button :active="searchOpen" @click="setSearchOpen(!searchOpen)"/>
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
            'searchOpen',
        ]),
    },
    methods: {
        ...mapMutations('header', ['setSearchOpen'])
    },
})
export default class DesktopSearchButton extends Vue {
    searchOpen!: boolean;

    setSearchOpen: (value: boolean) => void;
}
</script>

<style scoped>
</style>
