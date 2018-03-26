<template>
  <v-app id="inspire" dark>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>Nossa Trip</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        nudge-right
        transition="slide-y-transition"
      >
        <v-btn slot="activator" flat>
          {{ user.name }}
          <v-list-tile-avatar class="avatar">
            <img :src="user.avatar">
          </v-list-tile-avatar>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title @click="logout">Sair</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout>
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <h2>Adicionar novo destino</h2>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <DateField />
                  <div v-for="(textField, key) in textFields" :key="key">
                    <TextField :input="textField" />
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.stop="dialog = false">Fechar</v-btn>
                <v-btn flat @click="postData">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            fixed bottom right fab light
            color="primary"
            @click.stop="dialog = true"
          >
            <v-icon light>add</v-icon>
          </v-btn>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <!-- <td v-for="(value, key) in props.item" :key="key">
              {{ value }}
            </td> -->
            <td>{{ props.item.date }}</td>
            <td>{{ props.item.destiny }}</td>
            <td>{{ props.item.description }}</td>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import uuid from 'uuid'

import auth from '@/auth'
import { DateField, TextField } from './fields'

export default {
  data () {
    return {
      dialog: false,
      textFields: [
        { name: 'destiny', label: 'Nome do destino' },
        { name: 'description', label: 'Descrição' },
      ],
      headers: [
        { text: 'Data', value: 'date' },
        { text: 'Destino', value: 'destiny' },
        { text: 'Descrição', value: 'description' },
      ],
    }
  },
  components: {
    DateField,
    TextField,
  },
  computed: {
    ...mapGetters({
      user: 'user',
      trip: 'trip',
      items: 'items',
    }),
    getItems () {
      return this.items
    }
  },
  created () {
    firebase.database().ref().child('trip').on('value', snap => {
      return this.$store.dispatch('getItems', snap.val())
    })
  },
  methods: {
    logout () {
      auth.logout()
    },
    postData () {
      firebase.database().ref(`trip/${uuid()}`).set({ ...this.trip })
      this.dialog = false
    }
  }
}
</script>

<style lang="sass">
  .avatar
    img
      width: 30px
      height: 30px
</style>
