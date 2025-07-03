import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/companies/`+id,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!backendRes.ok) {
    const errorData = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Unknown error",
      },
      {status: backendRes.status}
    );
  }

  const data = await backendRes.json();

  return NextResponse.json({
    success: true,
    ...data,
  });
}

export async function POST(request: NextRequest, {params}: { params: { id: string } }) {
  const {name, description, visible} = await request.json();
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/companies`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        'X-User-Id': id,
      },
      body: JSON.stringify({name, description, visible}),
    }
  );

  if (!backendRes.ok) {
    const errorData = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Unknown error",
      },
      {status: backendRes.status}
    );
  }

  const data = await backendRes.json();

  return NextResponse.json({
    success: true,
    ...data,
  });
}


export async function PUT(request: NextRequest, {params}: { params: { id: string } }) {
  const {name, description, companyId} = await request.json();
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/companies/${companyId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        'X-User-Id': id,
      },
      body: JSON.stringify({name, description}),
    }
  );

  if (!backendRes.ok) {
    const errorData = await backendRes.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Unknown error",
      },
      {status: backendRes.status}
    );
  }

  return NextResponse.json({success: true});
}

export async function DELETE(request: NextRequest, {params}: { params: { id: string } }) {
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;
  let companyId: string | undefined;

  try {
    const body = await request.json();
    companyId = body.companyId;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid or missing JSON body" }, { status: 400 });
  }

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/company/api/companies/${companyId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      'X-User-Id': id,
    },
  });

  if (!backendRes.ok) {
    const errorText = await backendRes.text().catch(() => "Unknown error");
    return NextResponse.json(
      {
        success: false,
        error: errorText,
      },
      {status: backendRes.status}
    );
  }

  return NextResponse.json({
    success: true,
    message: "User deleted successfully",
  });
}