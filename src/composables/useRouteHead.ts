import { useHead } from '@vueuse/head'
import {  watchEffect } from 'vue'

interface Props{
  mealName?:string,
  dynamicSegment?:string
}
export default function useRouteHead(props: Props) {

  const updatePageTitle = () => {
    const pageTitle = ` ${props?.mealName || props?.dynamicSegment || 'The Meal DB'}`;
    useHead({
      title: `${pageTitle}`,
      meta: [{ name: 'description', content: `About ${pageTitle}` }]
    })
  };

  watchEffect(() => {
    updatePageTitle();
  });

}