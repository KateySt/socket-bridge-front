import {NextResponse} from 'next/server';

export async function POST(request: Request) {
  const {username, password, first_name, last_name, email} = await request.json();

  const backendRes = await fetch(process.env.NEXT_PUBLIC_URL_BACK + '/user/api/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password, last_name, first_name, email}),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      {
        success: false,
        error: data.error || data.message || 'Unknown error',
      },
      { status: backendRes.status }
    );
  }

  return NextResponse.json({
    success: true,
    ...data,
  });
}
