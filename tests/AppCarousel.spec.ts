import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AppCarousel from '../src/components/AppCarousel.vue'

const urls = [
    'https://picsum.photos/id/32/500/300?test=1',
    'https://picsum.photos/id/35/500/300?test=2',
    'https://picsum.photos/id/56/500/300?test=3',
    'https://picsum.photos/id/84/500/300?test=4',
]

beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
    vi.useRealTimers()
})

describe('the Carousel component', () => {
    const currentImage = '[data-test="carouse-current-image"]'

    it('rotates through the images provided via the urls prop', async () => {
        const duration = 2000
        const wrapper = mount(AppCarousel, {
            props: {
                urls: urls,
            },
        })

        expect(wrapper.find(currentImage).attributes('src')).toBe(urls[0])

        vi.advanceTimersByTime(duration)
        await nextTick()
        expect(wrapper.find(currentImage).attributes('src')).toBe(urls[1])

        vi.advanceTimersByTime(duration)
        await nextTick()
        expect(wrapper.find(currentImage).attributes('src')).toBe(urls[2])
    })

    it('uses the duration prop to change the time between images', async () => {
        const duration = 500
        const wrapper = mount(AppCarousel, {
            props: {
                urls: urls,
                duration,
            },
        })

        vi.advanceTimersByTime(duration * 3)
        await nextTick()
        expect(wrapper.find(currentImage).attributes('src')).toBe(urls[3])
    })
})
