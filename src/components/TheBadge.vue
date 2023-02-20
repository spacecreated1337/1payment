<template>
  <div class="pl-3 mt-3" v-if="value">
    <b-badge class="d-flex align-items-center" variant="primary">
      <div class="pr-1">
        {{ title.toUpperCase() }} : {{ value }}
      </div>
      <div role='button' @click="clearBadgeFilter(title)">
        <img src="../assets/img/close.svg" alt="">
      </div>
    </b-badge>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    clearBadgeFilter(title) {
      this.$emit('clear-badge-filter', title);
    }
  }
}
</script>
