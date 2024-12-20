<template>
  <LocaleOptionsList 
    :field="field" 
    :resource-name="resourceName" 
    class="my-2" 
  />
</template>

<script setup>
import LocaleOptionsList from './LocaleOptionsList'

defineProps(['resourceName', 'field'])
</script>