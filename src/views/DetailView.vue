<template>
  <h2 class="text-center">
    Detail for {{ selectedItem.txt }}
  </h2>
  <div class="detail-page">
    <div>
      Title: <input type="text" v-model="selectedItem.txt"> <br>
      CC: <input type="text" v-model="selectedItem.cc"> <br>
      Rate: <input type="number" v-model="selectedItem.rate"> <br>

      <button @click="saveData">Save</button>
    </div>
  </div>
</template>

<script setup>
import { useCurrencyStore } from '../stores/CurrencyStore'
import { useRoute, useRouter } from 'vue-router'
import { ref } from "vue"

const store = useCurrencyStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id

const fetchCurrencyList = async () => await store.fetchCurrencyList()

let selectedItem = ref({})

fetchCurrencyList().then((res) => {
  selectedItem.value = res.data.find(currency => currency.r030 == id)
})

const saveData = () => {
  const itemToSave = { ...selectedItem.value }

  if (!localStorage.getItem('editedCurrency')) {
    const currency = []
    currency.push(itemToSave)
    localStorage.setItem('editedCurrency', JSON.stringify(currency))
  } else {
    let localStorageParsed = JSON.parse(localStorage.getItem('editedCurrency'))
    const existingIndex = localStorageParsed.findIndex(item => item.r030 === itemToSave.r030)
    if (existingIndex !== -1) {
      localStorageParsed[existingIndex] = itemToSave
    } else {
      localStorageParsed.push(itemToSave)
    }
    localStorage.setItem('editedCurrency', JSON.stringify(localStorageParsed))
  }
  router.push('/about')
}

</script>
