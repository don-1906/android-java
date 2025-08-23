# API Reference

This API reference consolidates endpoints found in the Node backend and provides example payloads and Java Spring mappings.

Base URL (dev): `http://localhost:8080`

## Auth
- POST `/signup`
  - body: `{ email, username, password }`
  - 201: `{ message }` – sends verification email
- GET `/verifyemail?token=...`
  - 302 redirect to FE confirm page if success
- POST `/login`
  - body: `{ email, password }`
  - 200: `{ success, accessToken: "Bearer <jwt>", userId, userName, role }`
  - sets `refreshToken` cookie (HttpOnly)
- POST `/refreshAccessToken`
  - uses cookie refresh; 200: `{ success, accessToken: "Bearer <jwt>" }`
- POST `/logout`
  - clears refresh cookie
- POST `/forgotpassword`
  - body: `{ email }` – sends reset email
- GET `/verifytoken?token=...` → redirects to FE reset page
- POST `/resetpassword?token=...` body: `{ newPassword }`

Java mapping: `AuthController` with `AuthService`, JWT using `jjwt`, refresh token cookie, email via `JavaMailSender`, redis optional caching.

## Users
- GET `/users/get-users`
  - 200: `{ fromRedis, data: [User] }`
- GET `/users/get-users/:id`
  - 200: `{ data: User }`
- GET `/users/:id/transactions`
  - 200: `{ data: { transactions, totalCredit, totalDebit, walletBalance } }`

Java mapping: `UserController`, `UserService`, Redis cache on list endpoint, transaction aggregation.

## Profile
- PATCH `/nameupdate/:id/profileName` body: `{ profileName }`
- PATCH `/deliveryaddress/:id/delivery-Address` body: `{ deliveryAddress }`
- PATCH `/billingaddress/:id/billingAddress` body: `{ billingAddress }`
- PATCH `/updatepassword/:id` body: `{ password }`
- GET `/newsletter/:id` – toggles newsletter
- GET `/messageforuser/:id` – toggles message preference
- GET `/userdata/:id`
- POST `/emailverify` body: `{ userId, password, newEmail }`
- POST `/verifyphoneupdate` body: `{ phoneNumber, code, userId }`

Java mapping: `ProfileController`, `ProfileService`, Twilio verify via integration client.

## Products (base: `/api/products`)
- POST `/add` (multipart form-data with pictures[])
  - fields: `title, category, price, description, postalCode, streetNo, name, termsAccepted, offerType, showFullAddress, subscribe, isBuy, isSell, quantity`
  - requires Bearer token
- GET `/getProducts` query: `category, page, limit, userId, minPrice, maxPrice`
- GET `/product/:id`
- GET `/user/:userId/ads`
- PUT `/product/:id` (multipart pictures)
- DELETE `/product/:id`
- PATCH `/mark-sold/:productId`
- GET `/category/:category`

Java mapping: `ProductController`, `ProductService`, storage for pictures (S3, local), aggregation pagination via Spring Data or manual pipeline.

## Transactions (base: `/api/transaction`)
- POST `/verifyTransaction` body: `{ receiver }`
- POST `/transferFund` body: `{ senderId, receiverId, amount, transactionId, type?, description? }`
  - 200: `{ message: "Transaction successful", data, success }`

Java mapping: `TransactionController` + `TransactionService` using `@Transactional` and Mongo template session ops.

## Payments (base: `/api/payment`)
- POST `/create` body: `{ userId, amount }` → `{ success, url }`
- GET `/pingback` – Paymentwall server callback

Java mapping: `PaymentService` integrating Paymentwall; consider PCI and webhook validation.

## Followers
- POST `/follow/:id` body: `{ followerId }`
- POST `/unfollow/:id` body: `{ followerId }`
- GET `/check/:followerId/:followingId` → `{ isFollowing }`
- GET `/:id/followers`, GET `/:id/following`

Java mapping: `FollowController`, `FollowService`.

## Chat (base: `/api/chat`)
- POST `/connect` body: `{ username, displayName? }`
- GET `/users`
- GET `/conversations/:userIdentifier`
- POST `/conversations` body: `{ participants: [user1, user2] }`
- GET `/messages/:conversationId`
- POST `/messages` body: `{ conversationId, senderId, text }`
- GET `/user/:username`

Realtime: Socket events
- `join-user` (userIdentifier)
- `join-conversation` (conversationId)
- `leave-conversation` (conversationId)
- `typing` ({ conversationId, isTyping, userName })
- `new-message` room broadcast

Java mapping: Spring WebSocket STOMP destinations `/topic/conversation.{id}`, controller methods for chat messaging.