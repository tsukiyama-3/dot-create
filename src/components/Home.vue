<template>
  <div class="w-1040px my-0 mx-auto flex justify-between py-20">
    <div class="w-512px h-512px border-1 bg-hex-fffffe border-collapse">
      <div class="w-512px h-512px overflow-scroll" ref="dom">
        <div class="grid grid-cols-64" v-for="n of 64" :key="n">
          <div
            class="w-8px h-8px bg-hex-ffffff hover:bg-hex-dddddd dot"
            :class="{ dotgrid : gridFlug, defaultColor : resetFlug === true}"
            @click="changeColorClick"
            @mouseenter="changeColorMouse"
            v-for="n of 64"
            :key="n"
          >
          </div>
        </div>
      </div>
    </div>
    <div class="w-488px h-512px flex items-end content-end flex-wrap bg-hex-fffffe rounded-2xl p-4">
      <form>
        <input type="color" v-model="currentColor"><br>
        <input type="color.hex" v-model="currentColor"><br>
        <input type="checkbox" id="grid-flug" v-model="gridFlug">
        <label for="grid-flug">Grid / {{ gridFlug ? 'OFF' : 'ON' }}</label><br>
      </form>
      <div class="w-full flex justify-between mt-4">
        <a
          @click="completeImage"
          class="cursor-pointer flex items-center justify-center w-12/25 h-48px font-bold text-xl rounded bg-hex-00ebc7 text-hex-00214d transition-all duration-400 hover:rounded-2xl"
        >
          Complete
        </a>
        <a
          @click="resetDom"
          class="cursor-pointer flex items-center justify-center w-12/25 h-48px font-bold text-xl rounded bg-hex-00ebc7 text-hex-00214d transition-all duration-400 hover:rounded-2xl"
        >
          Reset
        </a>
      </div>
    </div>
  </div>
  <div class="modal">
    <StoreModal v-if="modalFlug" :image-url="imageUrl" @modalFlug="modalFlug = $event" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useImage } from '../composables/image'
import StoreModal from '../components/StoreModal.vue'
import {
  disableBodyScroll,
} from 'body-scroll-lock'

export default defineComponent({
  components: {
    StoreModal
  },
  setup: () => {
    const currentColor = ref('#ffffff')
    const changeColorClick = (e: any) => {
      e.currentTarget.style.backgroundColor = currentColor.value
    }
    const changeColorMouse = (e: any) => {
      if (e.ctrlKey) {
        e.currentTarget.style.backgroundColor = currentColor.value
      }
    }

    const dom = ref(null)
    const { storeImage } = useImage()
    const gridFlug = ref(true)
    const resetFlug = ref(false)
    const modalFlug = ref(false)
    const imageUrl: any = ref(null)
    const completeImage = async () => {
      const gridFlugStore = ref(gridFlug.value)
      // grid線を消す
      gridFlug.value = false
      imageUrl.value = await storeImage(dom)

      // grid線を元に戻す
      gridFlug.value = gridFlugStore.value
      modalFlug.value = true
      const modal: any = document.querySelector('.modal')
      disableBodyScroll(modal)
    }

    // このメソッドのコードダサすぎるから直したい
    const resetDom = (() => {
      resetFlug.value = true
      let obj: any = document.getElementsByClassName("dot")
      for( let i = 0; i < obj.length; i++){
        obj[i].style.backgroundColor = "#ffffff";
      }
    })

    return {
      changeColorClick,
      changeColorMouse,
      currentColor,
      gridFlug,
      dom,
      completeImage,
      imageUrl,
      modalFlug,
      resetFlug,
      resetDom
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

.defaultColor {
  background-color: white;
}
</style>