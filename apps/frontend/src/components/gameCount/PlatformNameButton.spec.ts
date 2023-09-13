import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { GREEN_MAN_GAMING_URL, NUUVEM_URL, STEAM_URL } from '@/constants/urls'
import { Platform } from '@/types/Platform'

import PlatformNameButton from './PlatformNameButton.vue'

describe('PlatformNameButton', () => {
  describe('Platform URL', () => {
    it('Should contain the steam url if it receives STEAM as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.STEAM }
      })

      const url = wrapper.get('[test-data="button"]').attributes().href

      expect(url).toBe(STEAM_URL)
    })

    it('Should contain the nuuvem url if it receives NUUVEM as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.NUUVEM }
      })

      const url = wrapper.get('[test-data="button"]').attributes().href

      expect(url).toBe(NUUVEM_URL)
    })

    it('Should contain the green man gaming url if it receives GREEN_MAN_GAMING as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.GREEN_MAN_GAMING }
      })

      const url = wrapper.get('[test-data="button"]').attributes().href

      expect(url).toBe(GREEN_MAN_GAMING_URL)
    })
  })

  describe('Platform name', () => {
    it('Should render "Steam" if it receives STEAM as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.STEAM }
      })

      const name = wrapper.get('[test-data="name"]').text()

      expect(name).toBe('Steam')
    })

    it('Should render "Nuuvem" if it receives NUUVEM as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.NUUVEM }
      })

      const name = wrapper.get('[test-data="name"]').text()

      expect(name).toBe('Nuuvem')
    })

    it('Should render "Green Man Gaming" if it receives GREEN_MAN_GAMING as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.GREEN_MAN_GAMING }
      })

      const name = wrapper.get('[test-data="name"]').text()

      expect(name).toBe('Green Man Gaming')
    })
  })

  describe('Platform icon', () => {
    it('Should render the steam icon if it receives STEAM as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.STEAM }
      })

      const steamIconExists = wrapper.find('[test-data="steam-icon"]').exists()
      const nuuvemIconExists = wrapper.find('[test-data="nuuvem-icon"]').exists()
      const gmgIconExists = wrapper.find('[test-data="gmg-icon"]').exists()

      expect(steamIconExists).toBe(true)
      expect(nuuvemIconExists).toBe(false)
      expect(gmgIconExists).toBe(false)
    })

    it('Should render the nuuvem icon if it receives NUUVEM as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.NUUVEM }
      })

      const steamIconExists = wrapper.find('[test-data="steam-icon"]').exists()
      const nuuvemIconExists = wrapper.find('[test-data="nuuvem-icon"]').exists()
      const gmgIconExists = wrapper.find('[test-data="gmg-icon"]').exists()

      expect(steamIconExists).toBe(false)
      expect(nuuvemIconExists).toBe(true)
      expect(gmgIconExists).toBe(false)
    })

    it('Should render the Green Man Gaming icon if it receives GREEN_MAN_GAMING as platform', async () => {
      const wrapper = mount(PlatformNameButton, {
        props: { platform: Platform.GREEN_MAN_GAMING }
      })

      const steamIconExists = wrapper.find('[test-data="steam-icon"]').exists()
      const nuuvemIconExists = wrapper.find('[test-data="nuuvem-icon"]').exists()
      const gmgIconExists = wrapper.find('[test-data="gmg-icon"]').exists()

      expect(steamIconExists).toBe(false)
      expect(nuuvemIconExists).toBe(false)
      expect(gmgIconExists).toBe(true)
    })
  })
})
