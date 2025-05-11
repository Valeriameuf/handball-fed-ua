<template>
    <button @click="$emit('click')" class="close-button" aria-label="close">
        <i class="fas fa-times"></i>
    </button>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class CloseButton extends Vue {
}
</script>

<style scoped>
</style>
