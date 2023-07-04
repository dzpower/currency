<template>
  <router-link
    v-if="!notActive"
    :to="{ name: 'detail', params: { id: item.id } }"
    class="currency-item"
  >
    <span class="currency-item__title">
      {{ item.title }}
    </span>
    <span class="currency-item__rate">
      {{ item.rate }}
    </span>
    <span class="currency-item__cc">
      {{ item.cc }}
    </span>
  </router-link>
  <div
    v-else
    class="currency-item"
  >
    <span class="currency-item__title">
      {{ item.title }}
    </span>
    <span class="currency-item__rate">
      {{ item.rate }}
    </span>
    <span class="currency-item__cc">
      {{ item.cc }}
    </span>
  </div>
</template>

<script setup>
  const props = defineProps({
    item: {
      type: Object,
      default: () => {}
    },
    notActive: {
      type: Boolean,
      default: () => false
    }
  })
</script>
