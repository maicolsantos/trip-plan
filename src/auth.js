import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { config } from '@/env'

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init (context) {
    this.context = context

    firebase.initializeApp(config)

    this.uiConfig = {
      signInSuccessUrl: `${process.env.path}/`,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('addUser')
      const requireAuth = this.context.$route.matched.some(record =>
        record.meta.requireAuth
      )
      const guestOnly = this.context.$route.matched.some(record =>
        record.meta.guestOnly
      )

      if (requireAuth && !user) {
        this.context.$router.push(`${process.env.path}login`)
      } else if (guestOnly && user) {
        this.context.$router.push(`${process.env.path}/`)
      }
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  logout () {
    firebase.auth().signOut()
    setTimeout(() => {
      this.context.$router.push(`${process.env.path}login`)
    }, 500)
  }
}

export default auth
