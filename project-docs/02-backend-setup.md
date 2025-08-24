# Backend Setup (Spring Boot)

## Requirements
- Java 17+
- Maven 3.9+

## Dependencies
Declared in `backend/pom.xml`:
- spring-boot-starter-web: REST API
- spring-boot-starter-validation: request validation
- spring-boot-starter-data-jpa: JPA access
- h2 (runtime): in-memory DB for local dev
- springdoc-openapi-starter-webmvc-ui: Swagger UI docs
- lombok (optional)
- spring-boot-starter-test (test scope)

## Project layout
- `com.example.todoapp` main package
- `entity`, `repository`, `service`, `controller`, `config`, `dto`

## Run locally
```bash
cd backend
mvn spring-boot:run
```
- App runs on `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- H2 console: `http://localhost:8080/h2-console`

## Packaging
```bash
cd backend
mvn -DskipTests package
java -jar target/todo-backend-0.0.1-SNAPSHOT.jar
```