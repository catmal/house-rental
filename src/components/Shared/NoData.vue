<template>
  <div
    class="full-width full-height"
  >
    <div
      class="text-center"
    >
      <p class="text-bold q-mt-lg">
        No {{ props.message }} found. Create some or try to expand your search.
      </p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(
  {
    message: { type: String, required: true }

  }
)
</script>
