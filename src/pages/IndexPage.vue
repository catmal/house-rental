<template>
  <q-page>
    <q-card class="q-ma-md">
      <Suspense>
        <template #default>
          <div>
            <PropertiesGrid
              v-show="view === 'grid'"
              @show="show"
              @grid-view="view = 'table'"
              @request="request"
              @toggle-active="toggleActiveView"
            />
          </div>
        </template>
        <template #fallback>
          <!-- <ServicesGridSkeleton /> -->
        </template>
      </Suspense>

      <div>
        <PropertiesTable
          v-show="view === 'table'"
          @show="show"
          @grid-view="view = 'grid'"
          @request="request"
          @toggle-active="toggleActiveView"
        />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, defineAsyncComponent, ref } from 'vue'
import { usePropertyStore } from 'src/stores/property'
import { storeToRefs } from 'pinia'

const PropertiesTable = defineAsyncComponent(() =>
  import('components/Properties/PropertiesTable.vue')
)
const PropertiesGrid = defineAsyncComponent(() =>
  import('components/Properties/PropertiesGrid.vue')
)
const { loadProperties } = usePropertyStore()
const view = ref('grid')
const show = ref(false)
const { pagination } = storeToRefs(usePropertyStore())

function toggleActiveView (value) {
  view.value = value
}
onMounted(async () => {
  await request({
    pagination: pagination.value,
    filter: ''
  })
})

async function request (payload) {
  await loadProperties({
    pagination: payload.pagination,
    filter: payload.filter === null ? '' : payload.filter
  })
}
</script>
