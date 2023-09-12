import { useHead } from '@vueuse/head'
import { ref, onBeforeUnmount, watchEffect } from 'vue'

export default function useRouteHead(props: any) {
  const pageTitle = ref('');
  // const props = defineProps(['dynamicSegment', 'mealName'])

  const updatePageTitle = () => {
    pageTitle.value = ` ${props.mealName || props.dynamicSegment}`;
    useHead({
      title: `${props.mealName || props.dynamicSegment}`,
      meta: [{ name: 'description', content: `About ${props.mealName || props.dynamicSegment}` }]
    })
  };

  // Watch for route changes and update page title
  watchEffect(() => {
    updatePageTitle();
  });

  // Cleanup the watch when the component is unmounted
  onBeforeUnmount(() => {
    pageTitle.value = '';
  });

  // return {
  //   pageTitle,
  // };
}