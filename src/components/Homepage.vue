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
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <h2>Adicionar novo destino</h2>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <DateField />
                  <div v-for="(textField, key) in textFields" :key="key">
                    <TextField :label="textField.label" />
                  </div>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.stop="dialog = false">Fechar</v-btn>
                <v-btn flat @click.stop="dialog = false">Salvar</v-btn>
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
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

import auth from '@/auth'
import { DateField, TextField } from './fields'

export default {
  data () {
    return {
      dialog: false,
      textFields: [
        { label: 'Nome do destino' },
        { label: 'Descrição' },
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
    })
  },
  methods: {
    logout () {
      auth.logout()
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
