# Observability

## Logging
- Backend: use SLF4J + Logback; JSON logs with request IDs; MDC to tag userId/requestId
- Map Node morgan to Spring `CommonsRequestLoggingFilter` or use access log via reverse proxy
- Centralize logs with ELK/EFK (Elasticsearch/OpenSearch + Kibana) or Loki + Grafana

## Metrics
- Micrometer + Prometheus for JVM metrics, HTTP latencies, custom counters (login attempts, messages sent)
- Dashboards in Grafana; SLOs for availability and latency

## Tracing
- OpenTelemetry instrumentation; export to Jaeger/Tempo/Zipkin
- Propagate trace IDs across HTTP and WebSocket when possible

## Mobile Diagnostics
- Use Sentry/Crashlytics for crash reporting
- Log network errors and key user actions (privacy-considerate)

## Alerts
- Alert on error rate spikes, p95 latency for key endpoints, low success rate of payment pingbacks

## Sampling and Retention
- Keep high-cardinality labels in check; sample traces in prod (1–10%)