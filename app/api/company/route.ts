import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")?.trim();
  const userId = request.headers.get("x-user-id")?.trim();

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: No access token' },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "10";
  const query = searchParams.get("query") ?? "";

  const backendUrl = `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/companies?query=${encodeURIComponent(query)}&page=${page}&size=${size}`;

  const backendRes = await fetch(backendUrl, {
    method: 'GET',
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
      ...(userId && { "X-User-Id": userId }),
    },
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
console.log(data)
  return NextResponse.json({
    success: true,
    ...data,
  });
}

