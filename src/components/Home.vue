<template>
  <div class="p-8">
    <div class="w-512px h-512px border-1 border-collapse mb-12" ref="dom">
      <div class="grid grid-cols-64" v-for="n of 64" :key="n">
        <div class="w-8px h-8px hover:bg-hex-dddddd" :class="{ dotgrid : gridFlug }" @click="changeColor" v-for="n of 64" :key="n">
        </div>
      </div>
    </div>
    <form>
      <input type="color" v-model="currentColor"><br>
      <input type="color.hex" v-model="currentColor"><br>
      <input type="checkbox" id="grid-flug" v-model="gridFlug">
      <label for="grid-flug">グリッド {{ gridFlug ? 'OFF' : 'ON' }}</label><br>
      <a v-on:click="storeImg">完成</a>
    </form>
    <img v-if="imageUrl" :src="imageUrl">
    <a v-if="imageUrl" :href="imageUrl" download>保存</a>
  </div>
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