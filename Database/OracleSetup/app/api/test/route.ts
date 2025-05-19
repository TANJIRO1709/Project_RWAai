import { NextResponse } from 'next/server';
import { initialize, execute, close } from '../../db';

export async function GET() {
  try {
    // Initialize database connection pool
    await initialize();
    
    const result = await execute('SELECT SYSDATE FROM DUAL');
    
    // Return the result
    return NextResponse.json({ 
      success: true,
      message: 'Connection successful',
      data: result.rows 
    });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json(
      { 
        success: false,
        error: 'Database error', 
        details: err.message 
      },
      { status: 500 }
    );
  } finally {
    try {
      // Close connection pool
      await close();
    } catch (e) {
      console.error('Error closing database connection:', e);
    }
  }
}