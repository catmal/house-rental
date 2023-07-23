<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { usePropertyStore } from 'src/stores/property'
import { storeToRefs } from 'pinia'
const ToolBar = defineAsyncComponent(() => import('components/Shared/ToolBar.vue'))
const NoData = defineAsyncComponent(() => import('components/Shared/NoData.vue'))
const { properties, pagination } = storeToRefs(usePropertyStore())
const filter = ref('')
const passedProps =
  {
    columns: { type: Array, required: true },
    grid: { type: Boolean, required: true },
    switchable: { type: Boolean, required: false, default: true },
    message: { type: String, required: true }

  }
const emit = defineEmits(['add', 'toggle-active', 'show', 'request'])
</script>
<template>
  <q-table
    v-model:pagination="pagination"
    :grid="grid"
    :grid-header="true"
    :rows="properties.data"
    :columns="passedProps.columns"
    row-key="id"
    :filter="filter"
    :table-header-class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"

    @request="emit('request', $event)"
  >
    <template #top>
      <div class="row full-width">
        <ToolBar
          :switchable="true"
          :view="grid ? 'grid' : 'table'"
          @search="filter = $event"
          @grid-view="emit('toggle-active', 'grid')"
          @table-view="emit('toggle-active', 'table')"
        />
      </div>
    </template>
    <template #no-data>
      <NoData :message="passedProps.message" />
    </template>
    <template
      v-if="!passedProps.grid"
      #body="props"
    >
      <slot
        name="body"
        v-bind="props"
      />
    </template>
    <template
      v-if="passedProps.grid"
      #item="props"
    >
      <slot
        name="item"
        v-bind="props"
      />
    </template>
  </q-table>
</template>
