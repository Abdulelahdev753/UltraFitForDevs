import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  // TODO: validate API key, check usage, return images
  return NextResponse.json({ success: true, data: [] })
}
