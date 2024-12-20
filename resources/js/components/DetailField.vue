<template>
  <PanelItem :field="field">
    <template #value>
      <LocaleOptionsList
        :field="field"
        :resource="resource"
        :resource-id="resourceId"
        :resource-name="resourceName"
      />
      <LocaleButton 
        :field="field" 
        ref="localeButton" 
        custom-class="mr-3" 
      />
    </template>
  </PanelItem>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LocaleOptionsList from './LocaleOptionsList'
import LocaleButton from './LocaleButton'

const props = defineProps(['resource', 'resourceName', 'resourceId', 'field'])
const localeButton = ref(null)

onMounted(() => {
  const deleteButtonEl = document.querySelector('.content')?.querySelector('[dusk="open-delete-modal-button"]')
  if (deleteButtonEl && localeButton.value?.$el) {
    deleteButtonEl.parentElement.insertBefore(localeButton.value.$el, deleteButtonEl)
  }
})
</script>