# Branching & CI

## Branching
- Main branch: stable releases
- Feature branches: `feature/<name>` (e.g., `feature/split-frontend-backend`)
- Use PRs for code review

## CI (optional)
- Backend: run `mvn -B -DskipTests=false verify`
- Frontend: run `npm ci && npm run lint && npm run build:web`

## Example GitHub Actions (backend)
```yaml
name: backend-ci
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
      - run: mvn -B -DskipTests=false verify
```