<template>
  <v-app id="inspire" dark>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar light color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div id="firebaseui-auth-container"></div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import auth from '@/auth'

export default {
  mounted () {
    auth.authForm('#firebaseui-auth-container')
  },
}
</script>

<style>
  @import "../../node_modules/firebaseui/dist/firebaseui.css";
</style>
