<template>
  <v-dialog
    ref="dialog"
    persistent
    v-model="modal"
    lazy
    full-width
    width="290px"
    :return-value.sync="value"
  >
    <v-text-field
      slot="activator"
      label="Data do destino"
      v-model="dateFormat"
      prepend-icon="event"
      readonly
    ></v-text-field>
    <v-date-picker
      type="date"
      color="secondary"
      :locale="locale"
      :min="minDate"
      :max="maxDate"
      v-model="value"
    >
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="modal = false">
        Cancelar
      </v-btn>
      <v-btn flat color="primary" @click="saveDate()">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import * as moment from 'moment'

export default {
  data () {
    return {
      modal: false,
      value: '',
      minDate: '2018-06-01',
      maxDate: '2018-06-10',
      locale: process.env.locale,
    }
  },
  computed: {
    dateFormat () {
      const date = moment(this.value)
      if (this.value && date.isValid()) {
        return date.format('DD/MM/YYYY')
      }
      return ''
    },
  },
  methods: {
    saveDate () {
      this.$refs.dialog.save(this.value)
    }
  }
}
</script>
