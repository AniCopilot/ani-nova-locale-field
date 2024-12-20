<template>
  <button 
    type="button" 
    :class="classes" 
    class="locale-button" 
    v-if="localeDisplayName" 
    ref="localeButton"
  >
    <svg 
      class="fill-current w-4 h-4 mr-2" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
    >
      <path d="M16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2 0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
    </svg>
    <span>{{ localeDisplayName }}</span>
    
    <!-- Hidden select -->
    <select 
      v-if="!disabled" 
      name="locale-options" 
      :value="selectedLocale" 
      @change="localeChanged" 
      class="fake-select"
    >
      <option
        v-for="locale in field.locales"
        :key="locale.value"
        :value="locale.value"
        :disabled="locale.value === selectedLocale"
      >
        {{ !field.value.existingLocalisations[locale.value] ? '+ ' : '' }} {{ locale.label }}
      </option>
    </select>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { router } from '@inertiajs/vue3'

const props = defineProps(['field', 'locale', 'customClass'])

const classes = computed(() => {
  let classes = 'btn btn-default btn-primary btn-icon text-base ml-auto'
  if (props.customClass) classes += ` ${props.customClass}`
  if (disabled.value) classes += ` cursor-not-allowed`
  return classes
})

const selectedLocale = computed(() => {
  return props.locale || (props.field.value && props.field.value.locale) || null
})

const localeDisplayName = computed(() => {
  const matchedLocale = props.field.locales.find(l => l.value === selectedLocale.value)
  return matchedLocale && matchedLocale.label
})

const localeParentId = computed(() => {
  return props.field.value.localeParentId || props.field.value.id || router.page.props.route.query.localeParentId
})

const disabled = computed(() => {
  return router.page.props.route.name === 'create'
})

const localeChanged = (e) => {
  const newLocale = e.target.value
  const resourceId = props.field.value.existingLocalisations[newLocale]

  if (resourceId) {
    let routeName = router.page.props.route.name
    if (routeName === 'create') routeName = 'edit'

    router.visit(`/resources/${router.page.props.route.params.resourceName}/${resourceId}/edit`)
  } else {
    router.visit(`/resources/${router.page.props.route.params.resourceName}/create`, {
      data: { 
        localeParentId: localeParentId.value, 
        locale: newLocale 
      }
    })
  }
}
</script>

<style scoped>
form h1 > *:first-child {
  margin-left: auto;
}

form h1 > *:last-child {
  margin-right: 0;
}

.locale-button {
  position: relative;
}

.locale-button .fake-select {
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  cursor: pointer;
}
</style>