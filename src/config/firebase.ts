import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'

export const Collections = {
    menu: firestore().collection('menu'),
    extraMenu: firestore().collection('extramenu'),
    orders: firestore().collection('orders'),
    users: firestore().collection('users'),
    adminSettings: firestore().collection('adminSettings'),
    favorites: firestore().collection('favorites'),
} as const

// ── Typed document helpers ────────────────────────────────────────────────────

export const menuDoc = (id: string) =>
    firestore().collection('menu').doc(id)

export const orderDoc = (id: string) =>
    firestore().collection('orders').doc(id)

export const userDoc = (uid: string) =>
    firestore().collection('users').doc(uid)

// ── Auth + Messaging exports ──────────────────────────────────────────────────

export const firebaseAuth = auth()
export const firebaseMessaging = messaging()