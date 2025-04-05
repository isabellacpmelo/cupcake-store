<!-- @format -->
<script setup>
const props = defineProps({
  label: {
    type: String,
    default: 'Label here',
  },
  icon: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: 'text-blue-500',
  },
  bgColor: {
    type: String,
    default: 'bg-white',
  },
  iconLeft: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <button
      :disabled="disabled"
      :class="[textColor, bgColor]"
      class="rounded-md group hover:shadow-sm hover:shadow-black/30 text-lg">
      <div
        class="flex px-1.5 lg:px-3 py-1 rounded-md hover:bg-black/25 transition-colors duration-300">
        <div class="group-hover:animate-shake">
          {{ label }}
        </div>
        <div v-if="icon" class="group-hover:animate-shake">
          <i :class="icon" class="ml-2" />
        </div>
      </div>
    </button>
  </div>
</template>
