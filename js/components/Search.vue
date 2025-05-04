<template>
    <form class="search" method="GET" action="/search">
        <input type="text" class="search__input" name="s" placeholder="Пошук...">
        <button class="search__search-button search-button" type="submit">
            <i class="fa-solid fa-magnifying-glass search-button__icon"></i>
        </button>
    </form>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class Search extends Vue {
}
</script>

<style scoped>
</style>
