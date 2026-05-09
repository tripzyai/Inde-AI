import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin() as any;
    const auditData = await request.json();

    // Validate required fields
    const requiredFields = [
      'industry',
      'automationGoal',
      'currentProcess',
      'biggestProblem',
      'tools',
      'websiteUrl',
      'name',
      'email',
    ];

    for (const field of requiredFields) {
      if (!auditData[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    console.log('Processing audit request...');
    console.log('Audit data received:', JSON.stringify(auditData, null, 2));

    // Calculate lead score using the database function
    const { data: scoreData, error: scoreError } = await (supabaseAdmin as any).rpc('calculate_lead_score', {
      p_industry: auditData.industry,
      p_biggest_problem: auditData.biggestProblem,
      p_tools_count: auditData.tools.length,
    });

    if (scoreError) {
      console.error('Lead score calculation error:', scoreError);
    }

    const leadScore = scoreData || 50;
    console.log('Calculated lead score:', leadScore);

    // Simple confirmation message (no AI needed)
    const confirmationMessage = `Thanks for completing the audit! We've received your request and will review your ${auditData.industry} workflow. We'll reach out to you at ${auditData.email} within 24 hours with specific recommendations.`;

    const insertData = {
      industry: auditData.industry,
      website_url: auditData.websiteUrl,
      name: auditData.name,
      email: auditData.email,
      phone: auditData.phone || null,
      company_name: auditData.companyName || null,
      automation_goal: auditData.automationGoal,
      current_process: auditData.currentProcess,
      biggest_problem: auditData.biggestProblem,
      tools_used: auditData.tools,
      ai_summary: null,
      ai_recommendations: null,
      lead_score: leadScore,
      status: 'pending',
      priority: leadScore >= 70 ? 'high' : 'medium',
      source: 'website_chatbot',
    };

    console.log('Inserting into database:', JSON.stringify(insertData, null, 2));

    // Insert audit request into database
    const { data: auditRequest, error: auditError } = await supabaseAdmin
      .from('audit_requests')
      .insert([insertData])
      .select()
      .single();

    if (auditError) {
      console.error('Database error:', JSON.stringify(auditError, null, 2));
      console.error('Error details:', auditError.message, auditError.code, auditError.details);
      throw new Error(`Database error: ${auditError.message || 'Failed to save audit request'}`);
    }

    // Store conversation messages if provided
    if (auditData.messages && Array.isArray(auditData.messages)) {
      const conversationMessages = auditData.messages.map((msg: any, index: number) => ({
        audit_request_id: auditRequest.id,
        message_text: msg.text,
        is_ai_message: msg.isAI,
        step_number: index,
      }));

      await supabaseAdmin
        .from('conversation_messages')
        .insert(conversationMessages);
    }

    // Log activity
    await supabaseAdmin.from('activity_log').insert([
      {
        audit_request_id: auditRequest.id,
        activity_type: 'audit_submitted',
        description: `New audit request submitted from ${auditData.industry}`,
        actor: 'system',
        new_value: { email: auditData.email, lead_score: leadScore },
      },
    ]);

    // TODO: Send email notification
    // You can integrate Resend, SendGrid, or another email service here
    // Example:
    // await sendEmail({
    //   to: auditData.email,
    //   subject: 'Your Workflow Audit Request - Inde AI',
    //   body: confirmationMessage
    // });

    console.log('Audit request saved successfully:', auditRequest.id);

    return NextResponse.json({
      success: true,
      summary: confirmationMessage,
      leadScore,
      auditId: auditRequest.id,
      message: 'Audit request received successfully!',
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process audit request',
      },
      { status: 500 }
    );
  }
}
