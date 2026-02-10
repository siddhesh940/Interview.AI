// API Route: /api/notifications
// Handles DEMO → LIVE mode automatically

import { createClient } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering since we use auth() which needs headers
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unread') === 'true';
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = createClient();

    // Check if we have any REAL (non-dummy) drives to determine mode
    const { count: realDrivesCount } = await supabase
      .from('drives')
      .select('*', { count: 'exact', head: true })
      .eq('is_dummy', false);

    const isLiveMode = (realDrivesCount || 0) > 0;
    
    // Fetch notifications based on mode
    // LIVE MODE: Only real notifications (is_dummy = false)
    // DEMO MODE: Dummy notifications (is_dummy = true)
    let query = supabase
      .from('notifications')
      .select(`
        *,
        drives (
          *,
          companies (
            name,
            logo_url
          )
        )
      `)
      .eq('clerk_user_id', userId)
      .eq('is_dummy', !isLiveMode)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data: notifications, error } = await query;

    if (error) {
      console.error('Error fetching notifications:', error);

      return NextResponse.json(
        { error: 'Failed to fetch notifications' },
        { status: 500 }
      );
    }

    // Get unread count (same mode filter)
    const { count: unreadCount } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('clerk_user_id', userId)
      .eq('is_dummy', !isLiveMode)
      .eq('is_read', false);

    return NextResponse.json({ 
      notifications: notifications || [], 
      unreadCount: unreadCount || 0,
      mode: isLiveMode ? 'LIVE' : 'DEMO'
    });
  } catch (error) {
    console.error('Error in notifications GET:', error);

    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { notificationId, markAllAsRead } = body;

    const supabase = createClient();

    if (markAllAsRead) {
      // Mark all notifications as read
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('clerk_user_id', userId)
        .eq('is_read', false);

      if (error) {
        console.error('Error marking all notifications as read:', error);
        
return NextResponse.json(
          { error: 'Failed to mark notifications as read' },
          { status: 500 }
        );
      }
    } else if (notificationId) {
      // Mark specific notification as read
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('clerk_user_id', userId);

      if (error) {
        console.error('Error marking notification as read:', error);
        
return NextResponse.json(
          { error: 'Failed to mark notification as read' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in notifications PUT:', error);
    
return NextResponse.json(
      { error: 'Failed to update notifications' },
      { status: 500 }
    );
  }
}
