# Tribute Site — Project File Structure

Frontend-first build. Backend pieces are flagged and can be skipped/left empty until that phase.

```
tribute-site/
├── AGENTS.md
├── .env.local                          # Supabase keys (not committed)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts                  # minimal, since theme lives in globals.css
├── tsconfig.json
├── package.json
│
├── public/
│   ├── gallery/                        # all 50-60 gallery images live here
│   │   ├── photo-01.jpg
│   │   ├── photo-02.jpg
│   │   └── ...
│   ├── hero/
│   │   └── hero-portrait.jpg
│   └── favicon.ico
│
└── src/
    ├── app/
    │   ├── layout.tsx                  # root layout, fonts, <IntroGate> wrapper
    │   ├── globals.css                 # theme tokens
    │   ├── page.tsx                    # Home page (Hero, Featured Images, Featured Videos, CTA)
    │   │
    │   ├── videos/
    │   │   └── page.tsx                # Mentorship Videos page
    │   │
    │   ├── gallery/
    │   │   └── page.tsx                # Full Gallery page
    │   │
    │   ├── letters/
    │   │   └── page.tsx                # Public Letters page (approved letters + submission form)
    │   │
    │   ├── admin/                      # BACKEND-FACING — organizer only
    │   │   ├── layout.tsx              # admin shell, auth guard
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── letters/
    │   │       └── page.tsx            # Pending/Approved/Declined queue + actions
    │   │
    │   └── api/                        # BACKEND — route handlers
    │       ├── letters/
    │       │   ├── route.ts            # POST: submit a new letter (public)
    │       │   └── [id]/
    │       │       └── route.ts        # PATCH: approve/decline/revert (admin only)
    │       └── auth/
    │           └── route.ts            # admin login/session handling
    │
    ├── components/
    │   ├── intro/
    │   │   └── IntroGate.tsx           # full-screen gate, split animation, welcome text + button
    │   │
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   │
    │   ├── home/
    │   │   ├── Hero.tsx
    │   │   ├── FeaturedImages.tsx
    │   │   ├── FeaturedVideos.tsx
    │   │   └── LetterCTA.tsx           # 4th home section linking to /letters
    │   │
    │   ├── videos/
    │   │   ├── VideoGrid.tsx
    │   │   └── VideoCard.tsx           # Vimeo embed wrapper
    │   │
    │   ├── gallery/
    │   │   ├── GalleryGrid.tsx
    │   │   └── Lightbox.tsx
    │   │
    │   ├── letters/
    │   │   ├── LetterList.tsx          # renders approved letters
    │   │   ├── LetterCard.tsx
    │   │   └── LetterForm.tsx          # "Write a Letter" form (react-hook-form + zod)
    │   │
    │   ├── admin/                      # BACKEND-FACING UI
    │   │   ├── LetterQueueTable.tsx
    │   │   ├── LetterStatusBadge.tsx
    │   │   └── LetterActions.tsx       # Approve / Decline / Revert buttons
    │   │
    │   └── ui/                         # small shared/reusable pieces
    │       ├── Button.tsx
    │       ├── SectionWrapper.tsx      # handles Framer Motion whileInView fade/slide
    │       └── AnimatedText.tsx
    │
    ├── lib/
    │   ├── supabase/                   # BACKEND
    │   │   ├── client.ts               # browser client
    │   │   ├── server.ts               # server client (route handlers, admin pages)
    │   │   └── middleware.ts           # session refresh helper
    │   │
    │   ├── validation/
    │   │   └── letterSchema.ts         # zod schema for the letter form
    │   │
    │   ├── data/
    │   │   ├── gallery.ts              # static list/config of gallery images (captions, order)
    │   │   └── videos.ts               # static or Supabase-driven list of Vimeo entries
    │   │
    │   └── utils.ts
    │
    ├── types/
    │   ├── letter.ts                   # Letter type (id, sender_name, message, status, ...)
    │   └── video.ts
    │
    ├── hooks/
    │   └── useIntroGate.ts             # optional: manage gate state/animation sequencing
    │
    └── middleware.ts                   # BACKEND — protects /admin routes via Supabase session
```

## Build order (frontend phase)

Everything except the items marked BACKEND above. Suggested order:

1. `app/globals.css` — theme tokens (already written)
2. `app/layout.tsx` — fonts + root layout
3. `components/intro/IntroGate.tsx`
4. `components/ui/SectionWrapper.tsx` — reusable scroll-reveal wrapper
5. `components/home/*` + `app/page.tsx` — Home page
6. `components/gallery/*` + `app/gallery/page.tsx`
7. `components/videos/*` + `app/videos/page.tsx`
8. `components/letters/*` + `app/letters/page.tsx` (form UI only, no backend wiring yet)
9. `lib/data/gallery.ts` and `lib/data/videos.ts` — static placeholder data to render against
