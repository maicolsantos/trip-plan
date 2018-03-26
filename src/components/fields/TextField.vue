<template>
  <v-text-field
    color="primary"
    :label="input.label"
    v-model="value"
    @change="updateValue()"
  >
  </v-text-field>
</template>

<script>
export default {
  data () {
    return {
      value: '',
    }
  },
  methods: {
    updateValue () {
      this.$store.dispatch('addTrip', {
        [this.input.name]: this.value
      })
    }
  },
  props: [
    'input'
  ]
}
</script>
