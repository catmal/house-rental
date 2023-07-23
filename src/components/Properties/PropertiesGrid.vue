<script setup>
import { defineAsyncComponent } from 'vue'
import useDateFormattings from 'src/composables/useDateFormattings.js'
// import { pic } from 'src/boot/axios'
import { usePropertyStore } from 'src/stores/property'
import { storeToRefs } from 'pinia'
import placeholder from 'src/statics/placeholder.png'
const TableGrid = defineAsyncComponent(() => import('components/TableGrid.vue'))

const { formattedPrice } = useDateFormattings()
const emit = defineEmits(['request', 'toggle-active', 'add', 'show'])
const { properties } = storeToRefs(usePropertyStore())

const columns = [
  {
    name: 'name',
    required: true,
    align: 'left',
    field: row => row.attributes.name,
    format: val => `${val}`,
    sortable: true,
    label: 'NAME'
  },
  {
    name: 'bedrooms',
    required: true,
    align: 'left',
    field: row => row.attributes.bedrooms,
    format: val => `${val}`,
    label: 'BEDROOMS',
    sortable: true
  },
  {
    name: 'bathrooms',
    required: true,
    align: 'left',
    field: row => row.attributes.bathrooms,
    format: val => `${val}`,
    label: 'BATHROOMS',
    sortable: true
  },
  {
    name: 'land_size',
    required: true,
    align: 'left',
    field: row => row.attributes.land_size,
    format: val => `${val}`,
    sortable: true,
    label: 'LAND SIZE'
  },
  {
    name: 'price',
    required: true,
    align: 'left',
    field: row => formattedPrice(row.attributes.price),
    format: val => `${val}`,
    label: 'PRICE',
    sortable: true
  }
]
function serviceImage (property) {
  if (property.attributes.image) {
    return property.attributes.image
  } else {
    return placeholder
  }
}

</script>
<template>
  <q-card class="relative-position full-width">
    <TableGrid
      v-if="properties && properties.data"
      :switchable="true"
      :grid="true"
      :columns="columns"
      :rows="properties.data"
      message="properties"
      @toggle-active="emit('toggle-active', 'table')"
      @request="emit('request', $event)"
    >
      <template #item="props">
        <div class="q-pa-sm col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 ">
          <q-card
            v-ripple
            class="cursor-pointer"
            @click="$emit('show', props.row.id)"
          >
            <q-card-section horizontal>
              <div style="width: 160px; height: 200px">
                <q-img
                  class=" cursor-pointer rounded-borders"
                  width="100%"
                  height="100%"
                  contain
                  :src="serviceImage(props.row)"
                />
              </div>
              <q-card-section class="full-width">
                <div
                  class="row full-width"
                  style="overflow: hidden"
                >
                  <div class="col-12">
                    <p class="ellipsis text-bold ">
                      {{ props.row.attributes.name }}
                    </p>
                    <caption
                      class="ellipsis q-mb-md"
                      style="max-width: 350px"
                    >
                      {{ props.row.attributes.description }}
                    </caption>
                  </div>
                  <div class="row">
                    <div class="row">
                      <q-icon
                        name="bed"
                        size="sm"
                        color="primary"
                      />
                      <p class=" q-mx-sm q-mt-xs">
                        {{ props.row.attributes.bedrooms }}
                      </p>
                      <q-icon
                        name="bathroom"
                        size="sm"
                        color="primary"
                      />
                      <p class=" q-mx-sm q-mt-xs">
                        {{ props.row.attributes.bathrooms }}
                      </p>
                      <q-icon
                        name="yard"
                        size="sm"
                        color="primary"
                      />
                      <p class=" q-mx-sm q-mt-xs">
                        {{ props.row.attributes.land_size }}m2
                      </p>
                      <q-icon
                        name="house"
                        size="sm"
                        color="primary"
                      />
                      <p class=" q-mx-sm q-mt-xs">
                        {{ props.row.attributes.building_size }}m2
                      </p>
                    </div>
                  </div>
                  <div class="col-12">
                    <q-separator />
                    <div class="row">
                      <p class="text-bold  q-mt-sm">
                        {{ props.row.attributes.location }}
                      </p>
                      <q-space />
                      <p class="text-bold q-ml-sm q-mt-sm">
                        {{ formattedPrice(props.row.attributes.price) }} mil
                      </p>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </TableGrid>
  </q-card>
</template>

<style lang="scss" scoped>
// :deep(.q-table--grid .q-table__grid-content) {
//   height: 800px;
//   overflow-y: scroll;
// }
:deep(.q-table__middle) {
  max-width: 89vw;
  height: 60px;
  overflow-y: hidden;
  position: sticky;
  top: 50px;
}
</style>
