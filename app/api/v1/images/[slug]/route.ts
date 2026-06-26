import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params: _params }: { params: { slug: string } }
) {
  // TODO: validate API key, check access, return single image
  return NextResponse.json({ success: true, data: null })
}
