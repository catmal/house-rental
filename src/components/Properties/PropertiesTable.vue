<script setup>
import { defineAsyncComponent } from 'vue'
import useDateFormattings from 'src/composables/useDateFormattings.js'
import { usePropertyStore } from 'src/stores/property'
import { storeToRefs } from 'pinia'

const TableGrid = defineAsyncComponent(() => import('components/TableGrid.vue'))
const { formattedPrice } = useDateFormattings()
const emit = defineEmits(['request', 'toggle-active', 'add', 'show'])
const { properties, pagination } = storeToRefs(usePropertyStore())
const columns = [
  {
    name: 'name',
    required: true,
    align: 'left',
    field: (row) => row.attributes.name,
    format: (val) => `${val}`,
    sortable: true,
    label: 'NAME'
  },
  {
    name: 'bedrooms',
    required: true,
    align: 'right',
    field: (row) => row.attributes.bedrooms,
    format: (val) => `${val}`,
    sortable: true,
    label: 'BEDROOMS'
  },
  {
    name: 'bathrooms',
    required: true,
    align: 'right',
    field: (row) => row.attributes.bathrooms,
    format: (val) => `${val}`,
    label: 'BATHROOMS',
    sortable: true
  },
  {
    name: 'land_size',
    required: true,
    align: 'right',
    field: (row) => row.attributes.land_size,
    format: (val) => `${val}`,
    label: 'LAND SIZE',
    sortable: true
  },
  {
    name: 'building_size',
    required: true,
    align: 'right',
    field: (row) => row.attributes.building_size,
    format: (val) => `${val}`,
    sortable: true,
    label: 'BUILDING SIZE'
  },

  {
    name: 'location',
    required: true,
    align: 'right',
    field: (row) => row.attributes.location,
    format: (val) => `${val}`,
    label: 'LOCATION',
    sortable: true
  },
  {
    name: 'price',
    required: true,
    align: 'right',
    field: (row) => formattedPrice(row.attributes.price),
    format: (val) => `${val}`,
    label: 'PRICE',
    sortable: true
  }

]

</script>
<template>
  <TableGrid
    :switchable="true"
    :pagination="pagination"
    :grid="false"
    :columns="columns"
    :rows="properties.data"
    message="properties"
    @toggle-active="emit('toggle-active', 'grid')"
    @request="emit('request', $event)"
  >
    <template #body="props">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click="emit('show', props.row.id)"
        >
          <q-td
            key="name"
            :props="props"
          >
            <p>{{ props.row.attributes.name }}</p>
          </q-td>
          <q-td
            key="bedrooms"
            :props="props"
          >
            <p>{{ props.row.attributes.bedrooms }}</p>
          </q-td>
          <q-td
            key="bathrooms"
            :props="props"
          >
            <p>{{ props.row.attributes.bathrooms }}</p>
          </q-td>
          <q-td
            key="land_size"
            :props="props"
          >
            <p>{{ props.row.attributes.land_size }}</p>
          </q-td>
          <q-td
            key="building_size"
            :props="props"
          >
            <p>{{ props.row.attributes.building_size }}</p>
          </q-td>
          <q-td
            key="location"
            :props="props"
          >
            <p>{{ props.row.attributes.location }}</p>
          </q-td>

          <q-td
            key="price"
            :props="props"
          >
            <p>{{ formattedPrice (props.row.attributes.price) }}</p>
          </q-td>
        </q-tr>
      </transition>
    </template>
  </TableGrid>
</template>
<style lang="scss" scoped>
:deep(.q-table__grid-content) {
  height: calc(100vh - 200px);
  overflow-y: scroll;
}
:deep(thead) {
  position: sticky;
  top: 0px;
  z-index: 10;
  overflow-x: scroll;
}
</style>
