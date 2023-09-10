import { reactive } from 'vue'
interface Props {
  category: string | null
  selectCategory: (categoryName: string) => void
}

export const store = reactive<Props>({
  category: null,
  selectCategory(categoryName) {
    this.category = categoryName
  }
})
