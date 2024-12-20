<template>
  <div>
    <DefaultField
      :field="field"
      :errors="errors"
      v-if="!localePreviouslySet"
    >
      <template #field>
        <select
          name="locale"
          class="w-full form-control form-input form-input-bordered"
          :class="errorClasses"
          v-model="locale"
          :disabled="localePreviouslySet"
        >
          <option value="">Choose a locale</option>
          <option
            v-for="locale in field.locales"
            :key="locale.value"
            :value="locale.value"
          >
            {{ locale.label }}
          </option>
        </select>
      </template>
    </DefaultField>

    <DefaultField
      :field="{ name: 'Locale parent' }"
      :errors="errors"
      v-if="parentResourceName"
    >
      <template #field>
        <input
          type="text"
          :value="parentResourceName"
          readonly
          class="w-full form-control form-input form-input-bordered"
        />
      </template>
    </DefaultField>

    <LocaleButton
      v-show="localePreviouslySet"
      :field="field"
      :locale="locale"
      ref="localeButton"
    />
  </div>
</template>

<script setup>

import { ref, computed, onMounted, watch } from 'vue'
import { router } from '@inertiajs/vue3'
//import { useForm } from '@/composables/forms'
//import { DefaultField } from '@/components/Form'
import LocaleButton from './LocaleButton'

const props = defineProps(['resourceName', 'resourceId', 'field'])


//const form = useForm()

const locale = ref()
const localeParentId = ref()
const localePreviouslySet = ref(false)
const localeButton = ref(null)

const parentResourceName = computed(() => {
  return (props.field.resources && props.field.resources[localeParentId.value]) || null
})

watch(() => router.page.props.route.query, (query) => {
  const value = props.field.value

  router.go()

  const newLocale = (value && value.locale) || query.locale
  if (newLocale) locale.value = newLocale

  const newParent = (value && value.localeParentId) || query.localeParentId
  if (newParent) localeParentId.value = newParent
})

onMounted(() => {
  const formHeading = document.querySelector('form > * > h1')
  if (formHeading && localeButton.value) {
    formHeading.style.display = 'flex'
    formHeading.style['align-items'] = 'center'
    nextTick(() => formHeading.append(localeButton.value.$el))
  }

  setInitialValue()
})

function setInitialValue() {
  const value = props.field.value
  const query = router.page.props.route.query

  locale.value = (value && value.locale) || query.locale
  localeParentId.value = (value && value.localeParentId) || query.localeParentId

  localePreviouslySet.value = !!locale.value

  if (!locale.value) locale.value = props.field.locales[0].value
}

function fill(formData) {
  if (localeParentId.value) {
    formData.append(props.field.localeParentIdAttribute, localeParentId.value)
  }
  if (locale.value) {
    formData.append(props.field.localeAttribute, locale.value)
  }
}

defineExpose({
  fill
})
</script>


<!-- Основните промени, които направих:

1. Променен е начинът на регистрация на компонентите в field.js за Vue 3
2. FormField.vue е преработен да използва Composition API вместо Options API
3. Променени са слотовете от `slot="field"` на `#field`
4. Добавени са съответните imports от Vue 3
5. Използват се новите Vue Router хукове
6. Премахнати са миксините и заменени с директно използване на необходимата функционалност -->