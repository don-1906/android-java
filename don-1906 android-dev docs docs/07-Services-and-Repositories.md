# Services and Repositories

Translate Node controllers and helpers into Spring service and repository layers.

## Principles
- Controllers: HTTP-only logic (request/response mapping, validation)
- Services: business logic, transactions, integration calls
- Repositories: data access via Spring Data Mongo repositories
- DTOs: request/response contracts to decouple from domain
- Transactions: `@Transactional` at service layer where multiple writes must be atomic

## Example: Fund Transfer
- Node: `fundTransfer` uses session transactions to update two users and create a transaction record
- Java:
```java
@Service
public class TransactionService {
  @Transactional
  public TransactionResult transfer(ObjectId senderId, ObjectId receiverId, BigDecimal amount, String transactionId) {
    User sender = userRepo.findById(senderId).orElseThrow(...);
    if (sender.getWalletBalance() < amount.doubleValue()) throw new InsufficientFunds();
    Transaction txn = txnRepo.save(new Transaction(...));
    userRepo.debit(senderId, amount, transactionId);
    userRepo.credit(receiverId, amount, transactionId);
    return TransactionResult.success(txn);
  }
}
```

## Repositories
```java
public interface UserRepository extends MongoRepository<User, ObjectId> {
  Optional<User> findByEmail(String email);
  @Query(value = "{_id:?0}", update = "{$inc:{walletBalance:?1}, $push:{transactionHistory:?2}}")
  @Modifying void credit(ObjectId userId, BigDecimal amount, TxnHistory entry);
}
```

Prefer simple repository methods; use `MongoTemplate` when you need multi-operation updates.

## Caching
- Use Spring Cache with Redis for `/users/get-users`
- Configure TTL ~ 1 hour; provide endpoint to evict cache (`/redis/clear-cache` equivalent)

## File Uploads
- Replace multer with Spring `MultipartFile`; store files locally or to S3/GCS. Persist URLs in Product.

## Payment Integration
- Encapsulate Paymentwall interaction in `PaymentService`; expose create URL and pingback validation methods.

## Email/SMS
- `MailClient` for SMTP; `TwilioClient` for verify operations; retry with backoff on failures.