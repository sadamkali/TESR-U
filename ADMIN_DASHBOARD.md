# TESR-U Admin Dashboard

## Purpose

The administration area is being added to the existing static TESR-U website at:

- Public website: https://www.tesruganda.org/
- Admin route: https://www.tesruganda.org/admin

The dashboard is deliberately kept in the existing HTML/CSS/JavaScript stack. The public website is not being rebuilt or migrated to another framework.

## Dashboard sections

1. **Overview** — status of the public website, content overview, quick actions and publishing workflow.
2. **News & Updates** — articles, field stories and organisation updates; drafts, previews, scheduled publishing, publication and archiving.
3. **Announcements** — short notices and optional website-wide or homepage announcement banners with visibility dates.
4. **Navigation & Footer** — shared menu labels, destinations, order, visibility, footer information and links.
5. **Media Library** — approved photographs, logos, banners and downloadable documents.
6. **Organisation Profile** — registered identity, overview, vision, mission, strategic focus areas and programme locations.
7. **Website Settings** — contact information, social links, brand identity, SEO defaults and homepage display settings.
8. **Activity Log** — record of publishing, content edits, settings changes and security events.
9. **Admin Account** — single administrator sign-in, password recovery and access controls.

## Current implementation status

The first dashboard interface is a layout preview. It contains no real organisation records beyond details already published on the website, and no content is saved or published from this screen.

The following are intentionally not active yet:

- Supabase authentication and administrator role verification.
- Database-backed content management.
- Supabase Storage uploads.
- Server-side permission enforcement and Row Level Security policies.
- Scheduled publishing.
- Activity history.

Do not treat the preview screen as a secured administration system. Complete authentication and database access controls before enabling real content changes.

## Planned Supabase data areas

The schema will be designed around the approved scope and reviewed before applying migrations:

- `news_posts` and `news_categories`
- `site_announcements`
- `site_settings`
- `navigation_items`
- `media_assets` (metadata for objects stored in a private/publicly readable Storage bucket as appropriate)
- `content_activity`

Every exposed table will have Row Level Security enabled. Public visitors should only read published public content and approved site settings. Only the trusted administrator role should create, update, publish or archive content. The administrator role must be assigned through trusted application metadata, never user-editable profile metadata.

## Deployment configuration

The Vercel project already has the following client-safe variables configured for Development, Preview and Production:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

No Supabase service-role or secret key belongs in browser code or a `NEXT_PUBLIC_` variable. Do not commit local `.env` files or credentials to GitHub.

## Next implementation sequence

1. Review and approve the dashboard sections and terminology.
2. Implement Supabase Auth for one administrator, with no public sign-up.
3. Design and review the SQL migration and Row Level Security policies.
4. Connect the News & Updates and Announcements modules.
5. Connect Storage and the Media Library.
6. Connect shared navigation, footer, profile and website settings.
7. Add server-side publishing controls, scheduled publishing and the Activity Log.
8. Test on a Vercel Preview deployment before enabling production editing.
