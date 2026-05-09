import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AuditAnalysisInput {
  industry: string;
  automationGoal: string;
  currentProcess: string;
  biggestProblem: string;
  tools: string[];
  websiteUrl: string;
  name: string;
}

export interface AuditAnalysisResult {
  summary: string;
  recommendations: {
    automationOpportunities: string[];
    quickWins: string[];
    integrationSuggestions: string[];
    estimatedImpact: string;
  };
  tokenUsage: {
    prompt: number;
    completion: number;
    total: number;
  };
}

export async function generateAuditSummary(
  input: AuditAnalysisInput
): Promise<AuditAnalysisResult> {
  const systemPrompt = `You are an AI workflow audit assistant for Inde AI. Your role is to analyze business workflows and identify specific opportunities where AI intake assistants can improve lead capture, qualification, and conversion.

Focus on:
1. Lead capture optimization (24/7 availability, instant response)
2. Lead qualification automation (asking the right questions)
3. CRM/tool integration opportunities
4. Time savings and efficiency gains
5. Specific pain points they mentioned

Be specific, actionable, and tailored to their industry. Keep the tone professional but friendly.`;

  const userPrompt = `Analyze this workflow audit for ${input.name}'s business:

**Industry:** ${input.industry}
**Automation Goal:** ${input.automationGoal}
**Current Process:** ${input.currentProcess}
**Biggest Problem:** ${input.biggestProblem}
**Current Tools:** ${input.tools.join(', ')}
**Website:** ${input.websiteUrl}

Generate a personalized audit summary that:
1. Acknowledges their specific challenges
2. Identifies 3-4 automation opportunities with AI intake assistants
3. Suggests 2-3 quick wins they could implement
4. Recommends tool integrations based on what they already use
5. Estimates the potential impact (time saved, leads captured, etc.)

Format the response as a friendly, actionable summary (3-4 paragraphs max).`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const summary = completion.choices[0].message.content || 'Unable to generate summary.';

    // Extract structured recommendations from the summary
    const recommendations = {
      automationOpportunities: extractBulletPoints(summary, 'automation opportunit'),
      quickWins: extractBulletPoints(summary, 'quick win'),
      integrationSuggestions: input.tools.map(tool => `${tool} integration`),
      estimatedImpact: extractImpact(summary),
    };

    return {
      summary,
      recommendations,
      tokenUsage: {
        prompt: completion.usage?.prompt_tokens || 0,
        completion: completion.usage?.completion_tokens || 0,
        total: completion.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate AI audit summary');
  }
}

// Helper function to extract bullet points from text
function extractBulletPoints(text: string, keyword: string): string[] {
  const lowerText = text.toLowerCase();
  const keywordIndex = lowerText.indexOf(keyword);

  if (keywordIndex === -1) return [];

  const section = text.substring(keywordIndex, keywordIndex + 500);
  const lines = section.split('\n');

  return lines
    .filter(line => line.trim().match(/^[-•*\d.]/))
    .map(line => line.replace(/^[-•*\d.]\s*/, '').trim())
    .filter(line => line.length > 0)
    .slice(0, 4);
}

// Helper function to extract impact estimation
function extractImpact(text: string): string {
  const impactKeywords = ['save', 'capture', 'increase', 'reduce', 'improve'];
  const sentences = text.split(/[.!?]+/);

  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase();
    if (impactKeywords.some(keyword => lowerSentence.includes(keyword))) {
      return sentence.trim();
    }
  }

  return 'Significant improvement in lead capture and qualification efficiency.';
}
