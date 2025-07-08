import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { ownerId } = await request.json();
  const { id } = await params;

  const token = request.headers.get("authorization")?.trim();

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: No access token" },
      { status: 401 }
    );
  }

  const invitationsRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/memberships/company/${id}/members?ownerId=${ownerId}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!invitationsRes.ok) {
    const errorData = await invitationsRes.json().catch(() => ({}));
    return NextResponse.json(
      {
        success: false,
        error: errorData.error || errorData.message || "Failed to fetch invitations",
      },
      { status: invitationsRes.status }
    );
  }

  const invitations = await invitationsRes.json();

  const usersRes = await fetch(`${process.env.NEXT_PUBLIC_URL_BACK}/user/api/users`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  if (!usersRes.ok) {
    const errorText = await usersRes.text().catch(() => "Unknown error");
    return NextResponse.json({ success: false, error: errorText }, { status: usersRes.status });
  }

  const users = await usersRes.json();

  const invitedUserIds = new Set(invitations.map((inv: any) => inv.user_id));

  const invitedUsers = users.filter((user: any) => invitedUserIds.has(user.id));

  return NextResponse.json({
    success: true,
    users: invitedUsers,
  });
}

