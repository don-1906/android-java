# Backend Deployment

## Build artifact
```bash
cd backend
mvn -DskipTests package
```
Jar: `target/todo-backend-0.0.1-SNAPSHOT.jar`

## Run with environment
```bash
java -jar target/todo-backend-0.0.1-SNAPSHOT.jar \
  --server.port=8080 \
  --spring.datasource.url=jdbc:h2:mem:todo_db
```

## Containers (optional)
Create `Dockerfile` under `backend/` if containerizing:
```Dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/todo-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
```