import { NextResponse } from "next/server";
import {
  updateApplicationStatus,
  updateFollowUpDate,
} from "../../../../lib/queries";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const params = await context.params;

  if (body.status) {
    updateApplicationStatus(params.id, body.status);
  }

  if (body.next_followup_at) {
    updateFollowUpDate(params.id, body.next_followup_at);
  }

  return NextResponse.json({ ok: true });
}
