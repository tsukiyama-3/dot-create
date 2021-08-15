<template>
  <div class="over-lay flex items-center justify-center" @click="closeModal">
    <div class="w-800px h-480px p-12 box-border bg-hex-fffffe rounded-2xl">
      <div @click="closeModal">x</div>
      <div class="flex items-center justify-between">
        <img class="h-312px w-312px" :src="imageUrl">
        <div class="w-312px">
          <a
            class="cursor-pointer flex items-center justify-center w-184px h-48px font-bold text-xl rounded bg-hex-00ebc7 text-hex-00214d transition-all duration-400 hover:rounded-2xl"
            :href="imageUrl"
            download
          >
            Store!
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  clearAllBodyScrollLocks
} from 'body-scroll-lock'

export default defineComponent({
  props: ['imageUrl', 'modalFlug'],
  setup: (props, { emit }) => {
    const imageUrl = props.imageUrl
    const modalFlug = props.modalFlug
    const closeModal = () => {
      clearAllBodyScrollLocks()
      emit('modalFlug', false)
    }
    return {
      modalFlug,
      imageUrl,
      closeModal
    }
  },
})
</script>


<style scoped>
.over-lay {
  background-color: rgba(0,0,0,0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
</style>