import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest, { params }: { params:  Promise<{ id: string }> }) {
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
    `${process.env.NEXT_PUBLIC_URL_BACK}/company/api/memberships/admins?companyId=${id}&ownerId=${ownerId}`,
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

  const enrichedUsers = invitations
    .map((inv: any) => {
      const user = users.find((u: any) => u.id === inv.user_id);
      if (!user) return null;

      return {
        ...user,
        invitation: inv,
      };
    })
    .filter(Boolean);

  return NextResponse.json({
    success: true,
    users: enrichedUsers,
  });
}

