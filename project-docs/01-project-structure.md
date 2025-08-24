# Project Structure

```
/ (repo root)
├─ backend/                  # Spring Boot (Java, MVC)
│  ├─ src/main/java/
│  ├─ src/main/resources/
│  └─ pom.xml
├─ frontend/                 # Expo React Native app (iOS/Android/Web)
│  ├─ app/
│  ├─ app.config.ts
│  └─ package.json
├─ project-docs/             # Documentation set
│  ├─ 01-project-structure.md
│  ├─ 02-backend-setup.md
│  ├─ 03-frontend-setup.md
│  ├─ 04-api-contracts.md
│  ├─ 05-running-locally.md
│  ├─ 06-cors-networking.md
│  ├─ 07-deployment-backend.md
│  ├─ 08-build-mobile.md
│  ├─ 09-environments-config.md
│  ├─ 10-troubleshooting.md
│  ├─ 11-code-style-and-quality.md
│  └─ 12-branching-and-ci.md
└─ README.md
```

- Backend is a RESTful API with `/api/todos` CRUD.
- Frontend consumes the API and provides a simple UI to list, add, toggle, and delete todos.