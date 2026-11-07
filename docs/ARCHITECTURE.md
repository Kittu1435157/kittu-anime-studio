# Architecture

## Stage 1 boundaries
- Next.js web application for public pages and creator workspace.
- FastAPI API for server-side orchestration and provider integrations.
- Supabase PostgreSQL/Auth/Storage as managed platform services.

Start as a modular monolith. Do not introduce microservices until independent scaling or deployment is justified.

## Trust boundaries
1. Browser is untrusted. Only Supabase URL and publishable key may be exposed.
2. Supabase RLS is the authorization boundary for browser-side database operations.
3. FastAPI validates user sessions for user-specific endpoints; secrets remain server-side.
4. Storage is private; issue short-lived signed URLs after ownership checks.
5. Future generation workers are isolated from public ingress and use durable jobs.

## Public/private rules
- Registration is public.
- Projects default to private.
- Project visibility is reserved for a future curated publication flow; current RLS keeps project rows private.
- Character references remain private even when a project is later published.

## Future AI adapter contract
Each provider adapter implements capabilities(), validate_request(), submit_generation(), get_job_status(), cancel_job(), and fetch_outputs(). Persist provider/model/workflow versions, parameters, input/output asset IDs, and errors for reproducibility.
