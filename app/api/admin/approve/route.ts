import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  // TODO: verify admin role, approve payment, generate API key, send email
  return NextResponse.json({ success: true })
}
