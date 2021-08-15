<template>
  <div class="w-1040px my-0 mx-auto flex justify-between py-20">
    <div class="w-512px h-512px border-1 border-collapse" ref="dom">
      <div class="grid grid-cols-64" v-for="n of 64" :key="n">
        <div class="w-8px h-8px hover:bg-hex-dddddd" :class="{ dotgrid : gridFlug }" @click="changeColor" v-for="n of 64" :key="n">
        </div>
      </div>
    </div>
    <div class="w-488px h-512px flex items-end">
      <form>
        <input type="color" v-model="currentColor"><br>
        <input type="color.hex" v-model="currentColor"><br>
        <input type="checkbox" id="grid-flug" v-model="gridFlug">
        <label for="grid-flug">Grid / {{ gridFlug ? 'OFF' : 'ON' }}</label><br>
        <a
          v-on:click="storeImg"
          class="cursor-pointer flex items-center justify-center w-184px h-48px font-bold text-xl rounded bg-hex-00ebc7 text-hex-00214d transition-all duration-400 hover:rounded-2xl"
        >
          Complete!
        </a>
      </form>
    </div>
  </div>
  <img v-if="imageUrl" :src="imageUrl">
  <a
    v-if="imageUrl" :href="imageUrl" download
  >
    Store!
  </a>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useImage } from '../composables/image'

export default defineComponent({
  setup: () => {
    const currentColor = ref('#ffffff')
    const changeColor = (e: any) => {
      e.currentTarget.style.backgroundColor = currentColor.value
    }

    const dom = ref(null)
    const { imageUrl, storeImage } = useImage()
    const storeImg = async () => {
      gridFlug.value = false
      await storeImage(dom)
    }

    const gridFlug = ref(true)

    return {
      changeColor,
      currentColor,
      gridFlug,
      dom,
      storeImg,
      imageUrl
    }
  }
})
</script>

<style scoped>
.dotgrid {
  border: 1px solid #eee;
  border-collapse: collapse;
  box-sizing: border-box;
}
</style>