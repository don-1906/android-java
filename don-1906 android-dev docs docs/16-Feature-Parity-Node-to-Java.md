# Feature Parity: Node → Java

This doc lists each capability in Node and the equivalent approach in Java, with notes on differences.

## Auth
- Node: JWT (access/refresh), refresh cookie, Nodemailer
- Java: Spring Security + jjwt, HttpOnly refresh cookie, JavaMailSender
- Differences: Cookie handling may differ on Android emulator; ensure SameSite/secure flags

## Users/Profiles
- Same CRUD and toggles; validation moved to Bean Validation; Twilio verify supported via Java SDK

## Products
- Multer → Spring Multipart; local disk vs S3 for images
- Aggregation pagination: Node uses mongoose-aggregate-paginate; Java can use MongoTemplate aggregation with manual paging

## Transactions
- Node uses Mongo session transactions on `User` and `Transaction`
- Java: `@Transactional` with Mongo multi-document transactions; ensure replica set in Mongo for transactions

## Payments
- Paymentwall widget URL + pingback: replicate via Java SDK/REST
- Alternative: Stripe Checkout for simpler integration if Paymentwall not required

## Chat and Realtime
- Socket.IO → Spring WebSocket STOMP; RN client changes required
- Alternative: keep Node Socket.IO as a separate realtime service and migrate later

## Redis
- Cache user list; optional token/session store; in Java use Spring Data Redis Cache

## Email/SMS
- Gmail SMTP in dev; production: SES/SendGrid; Twilio Verify stays

## What to keep in Node (optional)
- If chat migration is complex, keep Socket.IO service while moving REST to Java
- Paymentwall pingback can remain in Node temporarily if certification constraints exist

## Notable Trade-offs
- Spring Boot adds type safety and structure, but more boilerplate
- WebSocket STOMP has different client libraries; require RN changes
- Mongo transactions require replica set; ensure infra supports it