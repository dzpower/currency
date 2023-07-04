<template>
  <h1 class="h1-title">
    Search
  </h1>
  <div class="wrapper">
    <input
      type="text"
      v-model="search"
      placeholder="Search..."
      @input="fetchFilteredList"
    />
    <VueDatePicker
      v-model="date"
      model-type="yyyyMMdd"
      @update:model-value="fetchFilteredList"
    />
    <div class="empty-search" v-if="!getCurrencyList.length && search">
      No data
    </div>
    <div v-if="getCurrencyList.length" class="currency-list">
      <CurrencyItem
        v-for="currency in filteredCurrencies"
        :key="currency.id"
        :item="currency"
      />
    </div>
    <div v-if="getCurrencyList.length" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <button @click="nextPage" :disabled="currentPage === maxPage">Next</button>
      <p>Page: {{ currentPage }} / {{ maxPage }}</p>
    </div>
  </div>
</template>

<script setup>
import CurrencyItem from "../components/CurrencyItem.vue"
import { ref, computed } from 'vue'
import { useCurrencyStore } from '../stores/CurrencyStore'

const store = useCurrencyStore()
const getCurrencyList = computed(() => {
  return store.getCurrencyList
})

const fetchCurrencyList = async (params) => await store.fetchCurrencyList(params)

fetchCurrencyList()

const search = ref('')
const date = ref('')

const itemsPerPage = ref(10)
const currentPage = ref(1)

const filteredCurrencies = computed(() => {
  return getCurrencyList.value.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value)
})

const maxPage = computed(() => {
  const searchLower = search.value.toLowerCase()
  return Math.ceil(getCurrencyList.value.filter(currency => currency.title.toLowerCase().includes(searchLower)).length / itemsPerPage.value)
})

const nextPage = () => {
  if (currentPage.value < maxPage.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const fetchFilteredList = () => {
  const params = {}
  if (date.value) params.date = date.value
  if (search.value) params.valcode = search.value
  fetchCurrencyList(params)
}

</script>
