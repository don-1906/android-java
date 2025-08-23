# Data Models and Database

MongoDB is used for persistence. Below are the Node/Mongoose schemas and suggested Spring Data Mongo equivalents.

## User
Fields: email, username, password (bcrypt hash), emailVerified, walletBalance, transactionHistory[], activity[], paymentAccounts[], newsletter, messageforuser, refreshToken, resetToken/Expiration, follow graph, chat presence, buy[], sell[]

Java:
```java
@Document("user")
public class User {  
  @Id ObjectId id;  
  String profileName;  
  String deliveryAddress;  
  String billingAddress;  
  String phoneNumber;  
  @Indexed(unique = true) String email;  
  @Indexed(unique = true) String username;  
  Boolean emailVerified;  
  String password;  
  Double walletBalance;  
  List<TxnHistory> transactionHistory;  
  List<Activity> activity;  
  List<PaymentAccount> paymentAccounts;  
  Boolean newsletter;  
  Boolean messageforuser;  
  String refreshToken;  
  String resetToken;  
  Date resetTokenExpiration;  
  List<ObjectId> followers;  
  List<ObjectId> following;  
  Boolean isOnline;  
  Date lastSeen;  
  String chatDisplayName;  
  List<Buy> buy;  
  List<Sell> sell;  
}
```

## Product
Fields: title, category, price, description, pictures[], location{postalCode,street}, name, termsAccepted, owner, isBuy, isSell, timestamps

Java:
```java
@Document("product")
public class Product {  
  @Id ObjectId id;  
  String title;  
  @Indexed String category;  
  Double price;  
  String description;  
  List<String> pictures;  
  Location location;  
  String name;  
  Boolean termsAccepted;  
  ObjectId owner;  
  Boolean isBuy;  
  Boolean isSell;  
  Instant createdAt;  
  Instant updatedAt;  
}
```

## Transaction
Fields: senderId, receiverId, type, amount, description, transactionId, referenceId, source, status, createdAt

Java:
```java
@Document("transaction")
public class Transaction {  
  @Id ObjectId id;  
  ObjectId senderId;  
  ObjectId receiverId;  
  String type;  
  Double amount;  
  String description;  
  @Indexed(unique = true) String transactionId;  
  String referenceId;  
  String source;  
  String status;  
  Instant createdAt;  
}
```

## Conversation and Message
Conversation: participants[{userId(String email), userName}], lastMessage, lastMessageTime
Message: conversationId(ObjectId), senderId(email), senderName, text, timestamp, isRead

Java:
```java
@Document("conversation")
class Conversation {  
  @Id ObjectId id;  
  List<Participant> participants;  
  String lastMessage;  
  Instant lastMessageTime;  
}

@Document("message")
class Message {  
  @Id ObjectId id;  
  ObjectId conversationId;  
  String senderId;  
  String senderName;  
  String text;  
  Instant timestamp;  
  Boolean isRead;  
}
```

## Indexing and Performance
- Users: unique on `email`, `username`. Partial indexes for `followers`, `following` as needed.
- Products: index `category`, `owner`, compound indexes for feed queries; pagination friendly sort on `createdAt`.
- Transactions: unique `transactionId`, indexes on `senderId`, `receiverId`, `createdAt`.
- Messages: index `conversationId`, `timestamp`.

## Migrations and Seed
- Use Spring `CommandLineRunner` to seed dev data. Manage schema changes with application-level migrations as Mongo has no built-in migrations.