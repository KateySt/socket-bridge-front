import {NextRequest, NextResponse} from "next/server";

export async function PUT(request: NextRequest, {params}: { params: Promise<{ id: string }> }) {
  const {first_name, last_name} = await request.json();
  const token = request.headers.get("authorization")?.trim();
  const {id} = await params;

  if (!token) {
    return NextResponse.json(
      {success: false, error: "Unauthorized: No access token"},
      {status: 401}
    );
  }

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/user/api/user/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({first_name, last_name}),
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

  let data;

  const contentType = backendRes.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await backendRes.json();
  } else {
    data = await backendRes.text();
  }

  return NextResponse.json({
    success: true,
    data,
  });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = request.headers.get("authorization")?.trim();
  const { id } = await params;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/user/api/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!backendRes.ok) {
    const errorText = await backendRes.text().catch(() => "Unknown error");
    return NextResponse.json(
      {
        success: false,
        error: errorText,
      },
      { status: backendRes.status }
    );
  }

  return NextResponse.json({
    success: true,
    message: "User deleted successfully",
  });
}