# Architecture Overview

This system provides marketplace features (products, profiles, wallet transactions), authentication, chat, and payment integration. The current backend is Node.js/Express/MongoDB/Redis with Socket.IO. This doc outlines how to reproduce the same capabilities in Java Spring Boot and connect a React Native Android app.

## Components
- Backend API (Node.js → Spring Boot): Auth, Users, Products, Transactions, Payments, Profile, Followers, Chat REST.
- MongoDB: Primary data store.
- Redis: Caching (users list) and potential token/session store.
- Realtime: Socket.IO (Node) → Spring WebSocket/STOMP (Java).
- Mobile App: React Native for Android.
- Email/SMS: Nodemailer (Gmail) and Twilio Verify.
- Payment: Paymentwall widget + pingback endpoint.

## Context Diagram (conceptual)
- React Native app ↔ API Gateway (Spring Boot) ↔ Services (modular packages)
- Spring Boot ↔ MongoDB | Redis | Twilio | SMTP | Paymentwall
- Spring WebSocket ↔ Mobile app for chat rooms

## Service Boundaries (Java)
- auth-service: signup, login, refresh, logout, password reset flows
- user-service: users, profiles, followers
- product-service: CRUD, search, categories
- transaction-service: fund transfer, user transactions
- chat-service: conversations, messages, presence, websocket
- payment-service: initiate payment, pingback webhook

Monolith-first approach: Implement as a single Spring Boot app with modular packages. Split to microservices later if needed.

## Cross-cutting Concerns
- Security: JWT access/refresh tokens, cookies, CORS
- Observability: structured logging, metrics, tracing
- Configuration: profiles, secrets, environment
- Testing: unit, integration, contract tests
- Deployment: containerized, CI/CD, cloud