# Security baseline

- Never commit .env files, service-role keys, provider keys, or signed URLs.
- Browser code may use only Supabase URL and publishable key.
- Every exposed table has RLS enabled.
- Test policies as anonymous, User A, and User B.
- Derive owner_id from the authenticated session, never from client input.
- Validate ownership for parent-child writes.
- Character reference bucket is private.
- Validate uploads by MIME type, size, and image decoding.
- Rate-limit registration and future generation endpoints.
- Do not log bearer tokens, passwords, signed URLs, or private prompts.
- Never expose ComfyUI/model workers directly to the public internet.
- Public projects must be shared through curated public fields/assets, not direct exposure of private source tables.

Storage uploads remain disabled until storage.objects policies are added and tested.
