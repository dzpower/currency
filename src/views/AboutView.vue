<template>
  <div class="about">
    <h2>Changed Currency</h2>
  </div>
  <div class="wrapper">
    <input type="text" v-model="search" placeholder="Search..." />
    <div class="empty-search" v-if="!filteredCurrencies.length && search">
      No data
    </div>
    <div v-if="filteredCurrencies.length" class="currency-list">
      <CurrencyItem
        v-for="currency in filteredCurrencies"
        :key="currency.id"
        :item="currency"
        not-active
      />
    </div>
    <div v-if="filteredCurrencies.length" class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <button @click="nextPage" :disabled="currentPage === maxPage">Next</button>
      <p>Page: {{ currentPage }} / {{ maxPage }}</p>
    </div>
  </div>
</template>

<script setup>
import CurrencyItem from "../components/CurrencyItem.vue"
import {ref, computed, onMounted} from 'vue'

const search = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)

let getCurrencyList = ref([])

onMounted(() => {
  const storedData = localStorage.getItem('editedCurrency')
  if (storedData) {
    getCurrencyList.value = JSON.parse(storedData).map(currency => ({
      id: currency.r030,
      exchangedate: currency.exchangedate,
      cc: currency.cc,
      rate: currency.rate,
      title: currency.txt
    }))
  }
})

const filteredCurrencies = computed(() => {
  const searchLower = search.value.toLowerCase()
  const filtered = getCurrencyList.value.filter(currency => currency.title.toLowerCase().includes(searchLower))
  return filtered.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value)
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
</script>
