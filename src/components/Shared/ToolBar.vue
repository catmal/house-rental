<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
const TextInput = defineAsyncComponent(() =>
  import('./TextInput.vue')
)
const filter = ref('')
const props = defineProps(
  {
    addable: { type: Boolean, required: false, default: false },
    view: { type: String, required: false, default: 'grid' },
    download: { type: Boolean, required: false, default: false },
    switchable: { type: Boolean, required: false, default: false }

  }
)
const emit = defineEmits(['add', 'table-view', 'grid-view', 'download', 'search'])

</script>
<template>
  <div class="row full-width">
    <TextInput
      v-model="filter"
      dense
      label="Search"
      icon="search"
      clearable
      @input="emit('search', filter)"
    />
    <q-space />
    <q-btn
      v-if="props.download"
      color="primary"
      icon-right="archive"
      no-caps
      outline
      @click="emit('download')"
    />
    <q-btn
      v-if="props.switchable && props.view && props.view === 'grid'"
      color="dark"
      outline
      icon="table_chart"
      @click="emit('table-view')"
    />
    <q-btn
      v-if="props.switchable && props.view && props.view === 'table'"
      color="dark"
      outline
      icon="apps"
      class="grid-view"
      @click="emit('grid-view')"
    />
    <q-btn
      v-if="props.addable"
      outline
      color="positive"
      type="submit"
      class="q-ml-sm"
      @click="emit('add')"
    >
      ADD
    </q-btn>
  </div>
</template>
