# Akbar's Darbar Customer App

React Native food delivery app for a live restaurant client. Order food, track delivery in real time, and pay securely, all from one app.

## Features

- **Live Order Tracking** — real-time rider location on a map from order pickup to delivery
- **Geolocation** — auto-detects user location for delivery address and nearby restaurant discovery
- **Secure Payments** — Razorpay integration with webhook-verified payment confirmation (no client-side trust)
- **Polished Micro-interactions** — animated add-to-cart (menu item flies into the cart icon) for a native, tactile feel
- **Push Notifications** — order status updates delivered in real time

## Tech Stack

- React Native, Expo, TypeScript
- Firebase (Firestore, Realtime Database, Cloud Functions, Auth)
- Zustand + MMKV (state & persistence)
- react-native-maps, react-native-reanimated
- Razorpay

## Architecture

Part of the Darbar ecosystem — this customer-facing app shares a Firebase backend with the [Admin Dashboard](https://github.com/irf0/akbars-darbar-admin-panel-new) and [Rider App](https://github.com/irf0/akbars-darbar-rider-app-new). Orders placed here sync in real time across all three apps.
