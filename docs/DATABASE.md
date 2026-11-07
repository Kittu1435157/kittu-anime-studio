# Database

Migration order: 1. `0001_initial_schema.sql`.

Tables: profiles, projects, episodes, characters, character_references.

Storage bucket: studio-assets (private). Proposed path: `{user_id}/{project_id}/characters/{character_id}/references/{file_id}.png`.

Do not enable uploads until storage.objects policies verify the authenticated user's ID prefix and parent ownership.
