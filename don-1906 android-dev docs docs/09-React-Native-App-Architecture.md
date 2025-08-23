# React Native App Architecture (Android)

## Tech Stack
- React Native (Expo or bare), React Navigation, Redux Toolkit/RTK Query or React Query, Axios/Fetch, Socket.IO client or STOMP client for WebSocket

## Navigation
- Auth Stack: Login, Register, EmailVerify, ResetPassword
- Main Tabs: Home (Products), Chat, Wallet, Profile
- Nested: ProductDetail, CreateProduct, EditProduct, UserAds, CategoryList

## State Management
- Global auth state (access token, user)
- API data: products, profile, chat conversations/messages, transactions
- Caching and background refresh for lists; optimistic updates for chat

## API Client
- Base URL via env; attach `Authorization: Bearer <accessToken>`
- Auto-refresh access token via refresh cookie flow (call `/refreshAccessToken` when 401)

## Screens and APIs Map
- Login/Register → `/login`, `/signup`
- Products List → `/api/products/getProducts`
- Product Detail → `/api/products/product/:id`
- Create/Edit Product → `/api/products/add`, `/api/products/product/:id`
- Mark Sold → `/api/products/mark-sold/:productId`
- Profile → `/userdata/:id`, PATCH endpoints for updates
- Wallet/Transactions → `/users/:id/transactions`, transfer fund
- Followers → follow/unfollow endpoints
- Chat → conversations/messages endpoints; websocket for realtime
- Payments → create payment to open Paymentwall URL in WebView

## File Uploads
- Use `react-native-image-picker` or `expo-image-picker`; send as multipart `pictures[]`

## WebSocket
- Use Socket.IO client (to match Node) or STOMP (for Java version)
- Join conversation room on entering chat screen; leave on exit
- Show typing indicator and new message pushes

## Android Permissions
- Camera, Media, Internet; handle runtime permissions

## Error Handling
- Central error boundary; toast notifications; retry policies on API calls