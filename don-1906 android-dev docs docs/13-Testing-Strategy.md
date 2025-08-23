# Testing Strategy

## Backend (Spring Boot)
- Unit: JUnit 5, Mockito; test services and utilities
- Integration: `@SpringBootTest` with Testcontainers for MongoDB and Redis
- Web: MockMvc tests for controllers; contract tests for API responses
- Security: tests for JWT filter behavior and protected endpoints
- Load/Soak: k6/Gatling for critical flows (login, products list)

## Node (existing)
- If retaining parts, use Jest and Supertest for routes

## Mobile (React Native)
- Unit: Jest, React Testing Library
- E2E: Detox for Android; mock API and WebSocket

## Test Data and Fixtures
- Use builders/factories; avoid sharing global mutable state

## CI Integration
- Run unit/integration on PRs; E2E nightly or on release branch

## Coverage Targets
- Backend: 80%+ on services and controllers
- Mobile: 70%+ components and screens