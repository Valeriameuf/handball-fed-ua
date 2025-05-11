<template>
    <button @click="$emit('click')" class="search-button">
        <i v-if="!active" class="fa-solid fa-magnifying-glass search-button__icon"></i>
        <i v-else class="fa-solid fa-xmark search-button__icon"></i>
    </button>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class SearchButton extends Vue {
    @Prop({type: Boolean, default: false})
    active!: boolean
}
</script>

<style scoped>
</style>
