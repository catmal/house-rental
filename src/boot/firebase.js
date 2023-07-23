import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
// import { useUserStore } from '../stores/user'
// import { storeToRefs } from 'pinia'
// import { FirebaseUser } from 'components/models'
// import { boot } from 'quasar/wrappers'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

firebase.initializeApp(config)
export { firebase }
// const { currentUser } = storeToRefs(useUserStore())
// const { fetchUser, getMe } = useUserStore()

// export default boot(({ router }) => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       user.getIdToken()
//         .then(async function (token) {
//           currentUser.value.token = token
//           await getMe()
//         })
//       fetchUser(user as FirebaseUser)
//       if (currentUser.value) {
//         currentUser.value.providers = user.providerData
//       }
//       router.push('/')
//     }
//   })
// })
