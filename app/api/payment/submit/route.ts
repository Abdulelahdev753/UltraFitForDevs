import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  // TODO: save StreamPay transaction ID, set payment status to pending
  return NextResponse.json({ success: true })
}
