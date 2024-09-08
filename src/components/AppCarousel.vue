<template>
    <div>
        <img :src="state" alt="Image" data-test="carouse-current-image" />
    </div>
</template>

<script setup lang="ts">
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import { useCycleList } from '@/composables/useCycleList'
import { useInterval } from '@/composables/useInterval'

interface Props {
    urls: MaybeRefOrGetter<string[]>
    duration: MaybeRefOrGetter<number>
}

const props = withDefaults(defineProps<Props>(), {
    urls: () => [],
    duration: 2000,
})

const { state, next } = useCycleList(props.urls)

useInterval(next, toValue(props.duration))
</script>
