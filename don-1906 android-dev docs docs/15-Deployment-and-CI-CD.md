# Deployment and CI/CD

## Containerization
- Dockerfile for Spring Boot (JDK 17, distroless/temurin base)
- Multi-stage build for RN Android (optional CI job)
- Docker Compose for local: app, Mongo, Redis

## CI (GitHub Actions example)
- Jobs:
  - Backend: build, test, package Docker image, push to registry
  - Mobile: lint, unit tests, optional AAB build on tag
- Caching: Maven/Gradle caches, npm cache

## CD
- Environments: dev/staging/prod
- Deploy with:
  - Kubernetes (Helm or Kustomize), HPA autoscaling; or
  - ECS/Fargate; or
  - Heroku/Render/Fly.io for simplicity

## Cloud Services
- MongoDB Atlas; Redis Cloud/ElastiCache; Twilio; Email (SES/SendGrid)
- Object storage for images: S3/GCS/Azure Blob

## Ingress and TLS
- Managed TLS via Cloud provider or LetsEncrypt
- CORS and WAF at edge; rate limiting at gateway

## Configuration
- Inject env via secrets; separate config by profile

## Blue/Green & Rollbacks
- Keep previous image; health/readiness probes; automated rollback on failed probes

## Database Migrations
- Application-level; ensure backward compatible changes on rolling deploys