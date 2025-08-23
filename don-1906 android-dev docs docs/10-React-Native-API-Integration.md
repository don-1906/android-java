# React Native – API Integration and State

## HTTP Client
- Use Axios instance with interceptors
```ts
import axios from 'axios';
export const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8080' });
api.interceptors.request.use(cfg => {
  const token = authStore.getState().accessToken;
  if (token) cfg.headers.Authorization = token; // already includes Bearer
  return cfg;
});
api.interceptors.response.use(r => r, async err => {
  if (err.response?.status === 401) {
    try { const { data } = await api.post('/refreshAccessToken'); authStore.getState().setAccessToken(data.accessToken); return api(err.config); } catch {}
  }
  return Promise.reject(err);
});
```

## File Uploads
```ts
const form = new FormData();
form.append('title', title);
images.forEach((uri, i) => form.append('pictures', { uri, name: `p${i}.jpg`, type: 'image/jpeg' } as any));
await api.post('/api/products/add', form, { headers: { 'Content-Type': 'multipart/form-data' }});
```

## Pagination
- Backend supports `page`, `limit`; maintain cursor in screen state; prefetch next page on scroll

## State Libraries
- RTK Query or React Query for caching, retries, and background refetch
- Keep auth and user profile in a lightweight global store (Zustand/Redux)

## WebSocket
- Node backend: Socket.IO client
```ts
import { io } from 'socket.io-client';
const socket = io('http://10.0.2.2:8080');
socket.emit('join-user', user.email);
socket.emit('join-conversation', conversationId);
socket.on('new-message', (payload) => { /* update state */ });
```
- Java backend: STOMP over SockJS with `@stomp/stompjs`

## Error and Retry
- Display friendly errors; exponential backoff; cancel stale requests on unmount

## Deep Links
- Handle verification/reset links if needed via Linking in RN; otherwise use in-app flows