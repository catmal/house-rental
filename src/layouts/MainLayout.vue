<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Bali House Rent
        </q-toolbar-title>

        <div>user@email.com</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="q-px-md"
    >
      <Filters />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
const Filters = defineAsyncComponent(() => import('src/components/PropertyFilters.vue'))
const leftDrawerOpen = ref(true)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
