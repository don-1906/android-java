# Environment, Secrets, and Configuration

## Node Backend (current)
- `.env` keys used:
  - `PORT`, `EMAIL_USER`, `EMAIL_PASS`, `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`, Mongo URI, Redis URL

## Java Spring Boot
- `application.yml`:
```yaml
spring:
  data:
    mongodb:
      uri: ${MONGODB_URI}
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
server:
  port: ${PORT:8080}
app:
  jwt:
    accessSecret: ${ACCESS_TOKEN_SECRET}
    refreshSecret: ${REFRESH_TOKEN_SECRET}
  mail:
    user: ${EMAIL_USER}
    pass: ${EMAIL_PASS}
  twilio:
    accountSid: ${TWILIO_ACCOUNT_SID}
    authToken: ${TWILIO_AUTH_TOKEN}
    verifyServiceSid: ${TWILIO_VERIFY_SERVICE_SID}
  paymentwall:
    publicKey: ${PAYMENTWALL_PUBLIC}
    privateKey: ${PAYMENTWALL_PRIVATE}
  cors:
    origins: ${CORS_ORIGINS:http://localhost:5173,http://10.0.2.2:8080}
```

## Profiles
- `application-dev.yml` and `application-prod.yml` to separate configs

## Secrets Management
- Prefer: Docker secrets, Kubernetes secrets, AWS SSM/Secrets Manager, GCP Secret Manager, or Vault
- Never commit secrets to VCS

## Local Development
- Docker Compose for Mongo, Redis
- Seed data via Spring `CommandLineRunner`

## CORS
- Allow RN dev hosts; restrict in production