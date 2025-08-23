# Authentication and Security

This doc covers access/refresh token flows, password reset, email verification, and security controls in Java.

## Flows
- Signup: accept `{email, username, password}`, create TempUser, email verification link; upon verify, create User.
- Login: validate with bcrypt, issue access JWT (short) and refresh (long, HttpOnly cookie).
- Refresh: verify refresh cookie, rotate access token.
- Logout: invalidate refresh token (clear in DB) and cookie.
- Forgot/Reset: send reset link with token, verify, set new bcrypt hash.

## Tokens
- Access: `exp ~15m`, signed with `ACCESS_TOKEN_SECRET`, used as `Authorization: Bearer <token>`
- Refresh: `exp ~7d`, signed with `REFRESH_TOKEN_SECRET`, stored server-side on user record, set as HttpOnly cookie

## Spring Security Setup
- Stateless session, JWT filter before `UsernamePasswordAuthenticationFilter`
- Permit auth endpoints; secure others by default
- CORS aligned with React Native dev origins

Example config sketch:
```java
http
  .csrf(csrf -> csrf.disable())
  .cors(Customizer.withDefaults())
  .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS))
  .authorizeHttpRequests(reg -> reg
    .requestMatchers("/signup","/login","/refreshAccessToken","/forgotpassword","/verifyemail","/verifytoken","/resetpassword","/api/payment/pingback").permitAll()
    .anyRequest().authenticated()
  )
  .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
```

## Passwords
- Use `BCryptPasswordEncoder` with strength 10–12
- Enforce minimum length and complexity similar to Node validations

## Input Validation
- Use `@Valid` and Bean Validation annotations on DTOs; handle with `@ControllerAdvice`

## Rate Limiting and Brute Force
- Consider bucket4j or Redis-based rate limiting for `/login`, `/signup`, `/forgotpassword`

## Secrets and Config
- Store secrets in env/secret manager; do not commit keys (Paymentwall, Twilio, JWT secrets, SMTP credentials)

## CSRF and Cookies
- Since using JWT in Authorization header for APIs, CSRF protection can be disabled for stateless APIs; keep refresh in HttpOnly cookie with SameSite set appropriately

## Roles and Authorization
- If roles present (e.g., `role` returned in login), add `ROLE_USER`, `ROLE_ADMIN` and annotate endpoints with `@PreAuthorize`

## Input Validation Patterns (Examples)
- Use DTOs with validation annotations:
```java
public record SignupRequest(
  @Email String email,
  @NotBlank @Size(min=3,max=16) String username,
  @NotBlank @Size(min=6) String password
) {}
```
- Centralize error responses with `@ControllerAdvice`

## Rate Limit Examples
- bucket4j filter for `/login`:
```java
@Bean FilterRegistrationBean<ServletFilter> loginRateLimit(){ /* configure bucket */ }
```