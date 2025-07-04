import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get('authorization')?.trim();
  const id = request.nextUrl.searchParams.get('userId');

  if (!token) {
    return NextResponse.json(
      {success: false, error: 'Unauthorized: No access token'},
      {status: 401}
    );
  }

  const backendRes = await fetch(process.env.NEXT_PUBLIC_URL_BACK + `/company/api/memberships/my/requests?userId=${id}`, {
    method: 'GET',
    headers: {
      "Authorization": token,
      'Content-Type': 'application/json',
    },
  });

  const data = await backendRes.json()

  if (!backendRes.ok) {
    return NextResponse.json(
      {
        success: false,
        error: data.error || data.message || 'Unknown error',
      },
      {status: backendRes.status}
    );
  }

  return NextResponse.json({
    success: true,
    invitations: data,
  });
}
