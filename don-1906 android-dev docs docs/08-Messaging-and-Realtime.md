# Messaging and Realtime

## Current Node Realtime
- Socket.IO initialized in `socket.js`
- Events: `join-user`, `join-conversation`, `leave-conversation`, `typing`, server emit `new-message`
- Rooms per conversation; presence via user `isOnline` and `lastSeen`

## Spring WebSocket/STOMP
- Configure `/ws` endpoint with SockJS fallback
- Topics: `/topic/conversation.{id}` for message broadcasts
- User presence: maintain via channel interceptors and a presence service

Example destinations
- Client subscribes to `/topic/conversation.{id}`
- Client sends to `/app/conversation.{id}.send` with payload `{text}`

## Message Flow (Java)
1. HTTP POST `/api/chat/messages` persists message
2. Service updates conversation lastMessage/time
3. WebSocket controller broadcasts to `/topic/conversation.{id}`

## If Splitting to Microservices
- Use API Gateway (Spring Cloud Gateway) and service registry
- Async comms via Kafka or RabbitMQ for cross-service events (e.g., transaction completed → notify user)
- Outbox pattern for reliable message delivery
- Each service owns its data (separate Mongo databases/collections)

## Redis Usage
- Continue cache for user list; can also store ephemeral presence or WebSocket session maps

## Mobile Considerations
- Handle background notifications with FCM: server send push when WebSocket not active
- Limit message payload sizes, paginate history (limit 100 like Node)