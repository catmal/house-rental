<script setup>
import { ref } from 'vue'
import { usePropertyStore } from 'src/stores/property'
import { storeToRefs } from 'pinia'
const { pagination } = storeToRefs(usePropertyStore())

const bedrooms = ref({ min: 0, max: 10 })
const bathrooms = ref({ min: 0, max: 10 })
const landSize = ref({ min: 0, max: 500 })
const buildingSize = ref({ min: 0, max: 500 })
const price = ref({ min: 0, max: 500 })
const { loadProperties } = usePropertyStore()

async function request () {
  await loadProperties({
    pagination: pagination.value,
    filter: '',
    bedrooms: bedrooms.value,
    bathrooms: bathrooms.value,
    landSize: landSize.value,
    buildingSize: buildingSize.value,
    price: price.value

  })
}
</script>

<template>
  <q-card-section>
    <p class="text-bold">
      FILTERS
    </p>
  </q-card-section>
  <q-card class="q-mt-md q-pb-sm">
    <q-card-section>
      <caption>Bedrooms</caption>

      <q-range
        v-model="bedrooms"
        :min="0"
        :max="10"
        label-always
        switch-label-side
        bounce="800"
        @change="request"
      />
    </q-card-section>
  </q-card>
  <q-card class="q-mt-md q-pb-sm">
    <q-card-section>
      <caption>Bathrooms</caption>

      <q-range
        v-model="bathrooms"
        :min="0"
        :max="10"
        label-always
        switch-label-side
        @change="request"
      />
    </q-card-section>
  </q-card>
  <q-card class="q-mt-md q-pb-sm">
    <q-card-section>
      <caption class="full-width text-left">
        Land Size (m2)
      </caption>
      <q-range
        v-model="landSize"
        :min="0"
        :max="500"
        label-always
        switch-label-side
        @change="request"
      />
    </q-card-section>
  </q-card>
  <q-card class="q-mt-md q-pb-sm">
    <q-card-section>
      <caption class="full-width text-left">
        Building Size (m2)
      </caption>
      <q-range
        v-model="buildingSize"
        :min="0"
        :max="500"
        label-always
        switch-label-side
        @change="request"
      />
    </q-card-section>
  </q-card>
  <q-card class="q-mt-md q-pb-sm">
    <q-card-section>
      <caption>Price</caption>
      <q-range
        v-model="price"
        :min="0"
        :max="500"
        label-always
        switch-label-side
        @change="request"
      />
    </q-card-section>
  </q-card>
</template>
