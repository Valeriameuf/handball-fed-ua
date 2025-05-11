<template>
    <div class="mobile-fullscreen-overlay">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class MobileFullscreenOverlay extends Vue {
    mounted() {
        document.body.classList.add('overflow-hidden')
    }

    destroyed() {
        document.body.classList.remove('overflow-hidden')
    }
}
</script>

<style scoped>
</style>
