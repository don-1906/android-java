# Java Spring Boot Project Structure

Goal: Recreate Node capabilities in a modular Spring Boot monolith (ready to split later).

## Recommended Layout
```
com.example.app
├─ AppApplication.java
├─ config/
│  ├─ MongoConfig.java
│  ├─ SecurityConfig.java
│  ├─ WebConfig.java (CORS, Jackson)
│  ├─ OpenApiConfig.java
├─ common/
│  ├─ ApiResponse.java, ApiError.java
│  ├─ exceptions/, advice/
│  ├─ util/ (JwtUtil, PasswordUtil)
├─ auth/
│  ├─ controller/AuthController.java
│  ├─ service/AuthService.java
│  ├─ dto/
│  ├─ domain/TempUser.java, User.java
│  ├─ repo/TempUserRepository.java, UserRepository.java
├─ user/
│  ├─ controller/UserController.java, ProfileController.java, FollowController.java
│  ├─ service/UserService.java, ProfileService.java, FollowService.java
│  ├─ repo/UserRepository.java
├─ product/
│  ├─ controller/ProductController.java
│  ├─ service/ProductService.java
│  ├─ domain/Product.java
│  ├─ repo/ProductRepository.java
├─ transaction/
│  ├─ controller/TransactionController.java
│  ├─ service/TransactionService.java
│  ├─ domain/Transaction.java
│  ├─ repo/TransactionRepository.java
├─ payment/
│  ├─ controller/PaymentController.java
│  ├─ service/PaymentService.java
├─ chat/
│  ├─ controller/ChatRestController.java
│  ├─ ws/WebSocketConfig.java, ChatSocketController.java
│  ├─ service/ChatService.java
│  ├─ domain/Conversation.java, Message.java
│  ├─ repo/ConversationRepository.java, MessageRepository.java
├─ integration/
│  ├─ TwilioClient.java, MailClient.java, PaymentwallClient.java
├─ infra/
│  ├─ LoggingConfig.java, RedisConfig.java
```

## Mapping from Node
- `middlewares/auth.middlewares.js` → `SecurityConfig` + `JwtAuthenticationFilter`
- Controllers → `@RestController` per module
- Services → `@Service` classes, transactional boundaries via `@Transactional`
- Mongoose models → Spring Data Mongo `@Document`
- Redis cache (user list) → Spring Data Redis
- Socket.IO → Spring WebSocket (STOMP), topics per conversation
- Nodemailer → JavaMailSender; Twilio Verify SDK → Twilio Java SDK
- Paymentwall → server-side client for URL + pingback validation

## Build
- Maven or Gradle; enable profiles: `dev`, `prod`
- Dependencies: spring-boot-starter-web, spring-boot-starter-security, spring-boot-starter-data-mongodb, spring-boot-starter-validation, spring-boot-starter-websocket, spring-data-redis, jjwt, lombok, springdoc-openapi, twilio, javax.mail

## API Compatibility
- Mirror paths where feasible:
  - `/signup`, `/login`, `/refreshAccessToken`, `/logout`, `/forgotpassword`, `/verifyemail`, `/verifytoken`, `/resetpassword`
  - `/users/*`, profile routes, follower routes
  - `/api/products/*`, `/api/transaction/*`, `/api/payment/*`, `/api/chat/*`

## Configuration
- `application.yml` with sections for: MongoDB, Redis, JWT secrets, SMTP creds, Twilio SIDs, CORS, Paymentwall keys