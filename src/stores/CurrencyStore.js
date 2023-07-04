import { defineStore } from 'pinia'
import axios from "axios"

export const useCurrencyStore = defineStore('currencyStore', {
    state: () => ({
        currencyList: []
    }),

    actions: {
        async fetchCurrencyList (params) {
            try {
                const response = await axios.get('/?json', { params })
                this.currencyList = response.data.map(currency => ({
                    id: currency.r030,
                    exchangedate: currency.exchangedate,
                    cc: currency.cc,
                    rate: currency.rate,
                    title: currency.txt
                }))
                return response
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        getCurrencyList: (state) => state.currencyList
    },
})
