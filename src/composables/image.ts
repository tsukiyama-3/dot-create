import { ref, Ref } from 'vue'
import domtoimage from 'dom-to-image'

export const useImage = () => {
  const imageUrl: Ref<string | null> = ref(null)
  const storeImage = async (dom: any) => {
    try {
      imageUrl.value = await domtoimage.toPng(dom.value)
    } catch (e) {
      console.error('画像化に失敗したよ！！', e)
    }
    return imageUrl
  }
  return {
    storeImage,
  }
}