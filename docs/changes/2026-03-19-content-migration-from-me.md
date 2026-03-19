# 2026-03-19 Content Migration From `tommi-team/me`

## Why this pass happened

The refreshed SPA still contained starter placeholders. The existing portfolio at `/home/ngominhtoan/tommi-team/me` was used as the source of truth for real biography, skills, projects, links, and resume assets.

## Source data used

- `src/content/profile.ts`
- `public/ToanNgo-resume.pdf`
- extracted text from the current resume PDF for experience, location, and email

## What changed

- replaced placeholder hero copy with real role, location, and headline metrics
- replaced overview copy with real backend, cloud, and product summary
- replaced starter action links with real resume, GitHub, and LinkedIn destinations
- replaced skill placeholders with real Go, cloud, API, and platform categories
- replaced timeline placeholders with GTG CRM, Tokeet, and Trydome experience
- replaced project placeholders with real backend and platform project themes
- replaced contact placeholders with real email, GitHub, and LinkedIn links
- updated footer text with real location and technical focus
- copied `ToanNgo-resume.pdf` into the Vite app `public/` directory so resume links resolve correctly

## Notes

This pass intentionally reuses structured content from the current portfolio instead of inventing new marketing copy. The new SPA now reflects real experience rather than starter content.
