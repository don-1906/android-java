# Environments & Configuration

## Backend
- Use `application.yml` profiles (`application-dev.yml`, `application-prod.yml`)
- Externalize DB config in production (Postgres/MySQL)

## Frontend
- Expo public env vars prefixed with `EXPO_PUBLIC_`
- `.env` for local, EAS secrets for CI/CD

## Example
```env
# frontend/.env
EXPO_PUBLIC_API_BASE=https://api.example.com
```