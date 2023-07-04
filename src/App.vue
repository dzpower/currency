<template>
  <header class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Головна</RouterLink>
        <RouterLink to="/search">Пошук курсу</RouterLink>
        <RouterLink to="/about">Змінені курси</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
