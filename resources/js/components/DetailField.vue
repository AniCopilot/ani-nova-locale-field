<template>
  <panel-item :field="field">
    <template v-slot:value>
      <locale-options-list
        :field="field"
        :resource="resource"
        :resource-id="resourceId"
        :resource-name="resourceName"
      />
      <locale-button :field="field" ref="localeButton" custom-class="mr-3" />
    </template>
  </panel-item>
</template>

<script>
import { ref, onMounted } from 'vue';
import LocaleOptionsList from './LocaleOptionsList';
import LocaleButton from './LocaleButton';

export default {
  components: { LocaleOptionsList, LocaleButton },
  props: ['resource', 'resourceName', 'resourceId', 'field'],
  setup() {
    const localeButton = ref(null);

    onMounted(() => {
      const deleteButtonEl = document.querySelector('.content').querySelector('[dusk="open-delete-modal-button"]');
      if (deleteButtonEl) {
        deleteButtonEl.parentElement.insertBefore(localeButton.value.$el, deleteButtonEl);
      }
    });

    return {
      localeButton,
    };
  },
};
</script>
