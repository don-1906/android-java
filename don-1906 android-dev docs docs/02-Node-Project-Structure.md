# Node.js Project Structure

Located under `backend/` with Express, MongoDB (Mongoose), Redis, Socket.IO, Twilio, Nodemailer, and Paymentwall.

## Key Entry
- `index.js`: Express app, CORS, morgan logs to file, static assets, cookies, `Routes` mount, Socket.IO initialization via `socket.js`.

## Routes Aggregator
- `Routes/index.js` mounts:
  - `/signup`, `/login`, `/refreshAccessToken`, `/logout`, `/forgotpassword`, `/verifyemail`, `/verifytoken`, `/resetpassword`
  - `/users/*`
  - `/redis/clear-cache`
  - Twilio: `/send-otp`, `/verify-otp`
  - Profile: name/password/address/newsletter/message prefs
  - `/api/products/*`
  - `/api/chat/*`
  - `/api/transaction/*`
  - `/api/payment/*`
  - Followers: `/follow/:id`, `/unfollow/:id`, checks and lists

## Auth
- `controller/Authcontroller.js`
  - Signup temp user, email verification (Nodemailer), finalize user into `User`
  - Login with bcrypt, access/refresh tokens (JWT), refresh cookie, logout, reset password flows
  - Middleware `verifyJWT` for protected routes (also separate `middlewares/auth.middlewares.js` for Bearer token verification)
- Routes: `Routes/Authroutes.js`

## Users and Profiles
- Users: `controller/userController.js`, `Routes/userRouter.js`
  - GET users (Redis cache), GET by id, GET transactions (joins with `Transaction`)
- Profiles: `controller/Profilecontroller.js`, `Routes/Profileroutes.js`
  - Update name, delivery/billing address, password; phone verify via Twilio; toggle newsletter/message; get profile; verify email change

## Products
- `controller/product.controller.js`, `Routes/product.route.js`
  - Add product with images (multer), get products with aggregation and pagination, get by id, by user, by category, update, delete, mark as sold

## Transactions
- `controller/transaction.controller.js`, `Routes/transaction.route.js`
  - Verify receiver, fund transfer with session/transaction, update both users' wallet and histories

## Payments
- `controller/paymentcontroller.js`, `services/paymentService.js`, `Routes/paymentroutes.js`
  - Initiate Paymentwall widget URL, Pingback validation endpoint

## Followers
- `controller/followercontroller.js`, `Routes/Followerroutes.js`
  - Follow/unfollow, check follow, list followers/following

## Chat
- `controller/chatcontroller.js`, `Routes/chat.js`
  - Connect user (online presence), list users, get/create conversations, get/send messages
- `socket.js`: user join/leave, conversation rooms, typing, presence updates

## Models
- `models/user.js`: core user fields, wallet, buy/sell, chat presence, follow graph, tokens
- `models/product.model.js`: product listing with location, flags (isBuy/isSell), pictures
- `models/transaction.model.js`: transaction ledger
- `models/Conversation.js`, `models/message.js`
- `models/tempuser.js`: temp signup entries (used in Auth)

## Utilities and Middleware
- `utils/asyncHandler.js`, `utils/ApiError.js`, `utils/ApiResponse.js`, `utils/logger.js`, `utils/redisClient.js`
- `middlewares/auth.middlewares.js` (Bearer JWT), `middlewares/multer.middleware.js`