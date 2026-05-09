# Inde AI - Setup Guide

## Overview

This guide walks you through setting up the complete Inde AI landing page with AI-powered workflow audit chatbot.

## What's Implemented

✅ **Landing Page**
- Hero section with chatbot preview
- Problem, Solution, Industries sections
- Pricing tiers
- FAQ accordion
- Contact sections

✅ **AI Audit Chatbot**
- Full-screen conversational chatbot
- 7-step audit questionnaire
- Real-time validation
- Progress tracking

✅ **Backend Integration**
- OpenAI GPT-4 for AI-powered audit summaries
- Supabase database for storing audit requests
- Lead scoring algorithm
- Conversation history tracking
- Activity logging

## Prerequisites

You need accounts for:
1. **Supabase** - Database (free tier available)
2. **OpenAI** - AI summaries (pay-as-you-go)
3. **Vercel** - Hosting (optional, free tier available)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

Dependencies installed:
- `@supabase/supabase-js` - Database client
- `openai` - OpenAI API client
- `framer-motion` - Animations
- `lucide-react` - Icons

### 2. Create Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to **SQL Editor**
3. Copy the entire contents of `supabase_schema.sql`
4. Paste and run it in the SQL Editor

This creates:
- `audit_requests` - Main table for audit data
- `conversation_messages` - Chat history
- `email_notifications` - Email tracking
- `ai_analysis_cache` - OpenAI response caching
- `website_analysis` - Website audit results
- `activity_log` - Activity tracking

### 3. Get Your API Keys

#### Supabase Keys
1. Go to **Project Settings** → **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important**: Never expose `service_role` key in client-side code!

#### OpenAI Key
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy it → `OPENAI_API_KEY`

⚠️ **Security**: Revoke and regenerate your key if accidentally exposed!

### 4. Configure Environment Variables

Create `.env.local` in the project root:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and fill in your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
OPENAI_API_KEY=sk-proj-...your_openai_key_here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Testing the Chatbot

1. Click any **"Book Free Workflow Audit"** button
2. Complete all 7 steps:
   - Step 1: Select industry
   - Step 2: Choose automation goal
   - Step 3: Describe current process
   - Step 4: Select biggest problem
   - Step 5: Choose tools (multi-select)
   - Step 6: Enter website URL
   - Step 7: Provide name and email
3. Submit and wait for AI-generated summary

### What Happens Behind the Scenes

1. ✅ Chatbot collects all 7 responses
2. ✅ Sends data to `/api/submit-audit`
3. ✅ API route calls OpenAI GPT-4 to generate personalized audit summary
4. ✅ Calculates lead score (0-100) based on industry, problem, and tools
5. ✅ Stores audit request in Supabase `audit_requests` table
6. ✅ Stores conversation history in `conversation_messages` table
7. ✅ Logs activity in `activity_log` table
8. ✅ Returns AI summary to chatbot
9. ✅ Chatbot displays personalized summary to user

## Verifying the Integration

### Check Database

1. Go to Supabase dashboard → **Table Editor**
2. Open `audit_requests` table
3. You should see your test submission with:
   - All form fields populated
   - `ai_summary` - OpenAI generated text
   - `ai_recommendations` - Structured JSON recommendations
   - `lead_score` - Calculated score (0-100)
   - `status` - "pending"
   - `priority` - "high" or "medium"

### Check Conversation History

1. Open `conversation_messages` table
2. You should see all 7 questions and answers linked to your audit request

### Check Activity Log

1. Open `activity_log` table
2. You should see an "audit_submitted" activity

### Check Browser Console

Open Developer Tools → Console, you should see:
```
Audit submitted successfully: [uuid]
Lead score: [0-100]
```

## File Structure

```
inde-ai/
├── app/
│   ├── api/
│   │   └── submit-audit/
│   │       └── route.ts          # API endpoint for audit submission
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main landing page
│   └── globals.css               # Global styles
├── components/
│   ├── chatbot/
│   │   ├── AuditChatbotOverlay.tsx  # Main chatbot component
│   │   ├── ChatMessage.tsx          # Message bubble
│   │   ├── OptionButton.tsx         # Selection button
│   │   ├── ProgressBar.tsx          # Progress indicator
│   │   └── TypingIndicator.tsx      # Typing animation
│   ├── ui/
│   │   ├── Button.tsx            # Reusable button
│   │   ├── Card.tsx              # Reusable card
│   │   ├── Badge.tsx             # Badge component
│   │   └── ChatWidget.tsx        # Chat preview
│   ├── Hero.tsx                  # Hero section
│   ├── Pricing.tsx               # Pricing section
│   ├── FAQ.tsx                   # FAQ section
│   └── ...other sections
├── lib/
│   ├── supabase/
│   │   └── client.ts             # Supabase client setup
│   └── openai/
│       └── client.ts             # OpenAI integration
├── supabase_schema.sql           # Database schema
├── .env.local.example            # Environment template
└── package.json
```

## Key Features

### Lead Scoring Algorithm

Located in `supabase_schema.sql` (line 247):

```sql
CREATE OR REPLACE FUNCTION calculate_lead_score(
    p_industry TEXT,
    p_biggest_problem TEXT,
    p_tools_count INTEGER
)
```

Scoring logic:
- Base score: 50
- High-value industries (+20): Law Firm, Healthcare, Accounting
- Urgent problems (+15): "Miss leads after hours", "Slow response time"
- Tool integrations (+3 per tool)
- Capped at 100

### AI Summary Generation

Located in `lib/openai/client.ts`:

- Uses GPT-4 Turbo
- Temperature: 0.7 (creative but focused)
- Max tokens: 600
- Extracts structured recommendations
- Caches token usage for analytics

### Database Security

All tables have Row Level Security (RLS) enabled:
- `service_role` has full access (API routes only)
- `anon` key has no direct access (security by default)
- Never expose service_role key in client code

## Next Steps

### 1. Email Notifications (Optional)

Integrate [Resend](https://resend.com) or [SendGrid](https://sendgrid.com):

```typescript
// In app/api/submit-audit/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Inde AI <audit@indeai.com>',
  to: [auditData.email],
  subject: 'Your AI Workflow Audit Results',
  html: `<p>Hi ${auditData.name},</p><p>${aiAnalysis.summary}</p>`
});
```

### 2. Admin Dashboard

Build a dashboard to view/manage leads:
- Use Supabase Auth for login
- Query `high_priority_leads` view
- Update status and priority
- Add internal notes

### 3. Analytics

Track chatbot performance:
- Completion rate (step 7 / step 1)
- Drop-off points (which steps users abandon)
- Lead quality by source
- Conversion rate by industry

Use the existing `daily_audit_metrics` view as a starting point.

### 4. Website Analysis (Advanced)

Implement automated website crawling:
- Screenshot capture
- SEO analysis
- Contact form detection
- Load time measurement

Store results in `website_analysis` table.

## Troubleshooting

### Chatbot not showing AI summary

**Check:**
1. Browser console for errors
2. Network tab → `/api/submit-audit` request
3. Supabase logs (Project Dashboard → Logs)
4. OpenAI API quota/limits

### Database errors

**Common issues:**
- Missing environment variables → Check `.env.local`
- RLS blocking inserts → Verify `service_role` key is used in API routes
- Table doesn't exist → Re-run `supabase_schema.sql`

### OpenAI errors

**Common issues:**
- Invalid API key → Regenerate on OpenAI dashboard
- Rate limits → Check usage on OpenAI dashboard
- Model not available → Update model name in `lib/openai/client.ts`

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard:
   - Settings → Environment Variables
   - Add all variables from `.env.local`
4. Deploy!

Vercel automatically:
- Builds the Next.js app
- Serves it with edge functions
- Provides HTTPS
- Auto-deploys on git push

### Environment Variables in Production

⚠️ **Never commit `.env.local` to git!**

It's already in `.gitignore`, but double-check:

```bash
git status
# Should NOT show .env.local
```

## Support

- Supabase docs: https://supabase.com/docs
- OpenAI docs: https://platform.openai.com/docs
- Next.js docs: https://nextjs.org/docs

## Cost Estimates

**Supabase**: Free tier includes:
- 500MB database
- 5GB bandwidth
- 50,000 monthly active users

**OpenAI**: GPT-4 Turbo pricing (as of 2024):
- ~$0.01 per audit request (600 tokens)
- 1000 audits = ~$10

**Vercel**: Free tier includes:
- Unlimited websites
- 100GB bandwidth
- Automatic HTTPS
