# AI Chatbot API Integration Guide

## Overview

The Audit Chatbot currently stores responses locally and logs them to the console. This guide shows you how to integrate OpenAI API for AI-powered responses and backend storage.

## Current Implementation

Location: `components/chatbot/AuditChatbotOverlay.tsx`

The `handleSubmit` function (line ~350) currently:
- Collects all audit data
- Logs to console
- Shows success message

```typescript
const handleSubmit = () => {
  const finalData: AuditData = {
    ...auditData as AuditData,
    submittedAt: new Date().toISOString()
  };

  console.log('=== Audit Request Submitted ===');
  console.log(finalData);
  
  // TODO: Add your API integration here
}
```

## OpenAI API Integration

### Step 1: Add Environment Variables

Create `.env.local` in the project root:

```env
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_ENDPOINT=/api/submit-audit
```

### Step 2: Create API Route

Create `app/api/submit-audit/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const auditData = await request.json();

    // Generate AI-powered audit summary using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an AI workflow audit assistant for Inde AI. Analyze business data and suggest where AI intake assistants can help.'
        },
        {
          role: 'user',
          content: `Generate a personalized workflow audit summary for this business:
          
Industry: ${auditData.industry}
Automation Goal: ${auditData.automationGoal}
Current Process: ${auditData.currentProcess}
Biggest Problem: ${auditData.biggestProblem}
Tools: ${auditData.tools.join(', ')}
Website: ${auditData.websiteUrl}

Provide specific recommendations for their ${auditData.industry} business.`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiSummary = completion.choices[0].message.content;

    // Store in your database (Supabase, MongoDB, etc.)
    // await db.auditRequests.create({ ...auditData, aiSummary });

    // Send email notification (Resend, SendGrid, etc.)
    // await sendEmail({
    //   to: auditData.email,
    //   subject: 'Your AI Workflow Audit',
    //   body: aiSummary
    // });

    return NextResponse.json({
      success: true,
      summary: aiSummary,
      message: 'Audit request received'
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process audit' },
      { status: 500 }
    );
  }
}
```

### Step 3: Update handleSubmit in Chatbot

Replace the TODO section in `AuditChatbotOverlay.tsx`:

```typescript
const handleSubmit = async () => {
  const finalData: AuditData = {
    ...auditData as AuditData,
    submittedAt: new Date().toISOString()
  };

  try {
    const response = await fetch('/api/submit-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    });

    const result = await response.json();

    if (result.success) {
      setIsSubmitted(true);
      setShowTyping(true);
      setTimeout(() => {
        setShowTyping(false);
        setMessages(prev => [...prev, {
          text: result.summary, // AI-generated summary
          isAI: true
        }]);
      }, 1000);
    }
  } catch (error) {
    console.error('Submission error:', error);
    // Show error message to user
  }
};
```

### Step 4: Install Dependencies

```bash
npm install openai
```

## Alternative Backends

### Formspree

```typescript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(finalData)
});
```

### Supabase

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

await supabase
  .from('audit_requests')
  .insert([finalData]);
```

### Email with Resend

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'Inde AI <audit@indeai.com>',
  to: [auditData.email],
  subject: 'Your AI Workflow Audit',
  html: `<p>Thanks ${auditData.name}...</p>`
});
```

## Data Structure

The chatbot collects this data:

```typescript
interface AuditData {
  industry: string;           // E.g., "Law Firm"
  automationGoal: string;     // E.g., "Lead capture from website"
  currentProcess: string;     // E.g., "They fill out a form"
  biggestProblem: string;     // E.g., "We miss leads after hours"
  tools: string[];           // E.g., ["Website form", "Calendly"]
  websiteUrl: string;        // E.g., "https://example.com"
  name: string;              // E.g., "John Smith"
  email: string;             // E.g., "john@example.com"
  submittedAt: string;       // ISO timestamp
}
```

## Testing

1. Click any "Book Free Audit" button
2. Complete all 7 steps
3. Check browser console for logged data
4. Once API is connected, check your database/email

## Security Notes

- Never expose `OPENAI_API_KEY` in client-side code
- Always use API routes for sensitive operations
- Validate and sanitize user inputs
- Rate limit the API endpoint
- Add CAPTCHA if spam becomes an issue

## Next Steps

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. Set up Supabase or your preferred database
3. Configure email service (Resend, SendGrid, etc.)
4. Update the handleSubmit function
5. Test the full flow
6. Deploy to production

## Support

For questions about this integration, check:
- OpenAI API docs: https://platform.openai.com/docs
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Vercel deployment: https://vercel.com/docs
