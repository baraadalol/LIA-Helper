import { NextResponse } from "next/server";
import {
  updateApplicationStatus,
  updateFollowUpDate,
  updateApplicationPriority,
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

  if (body.priority !== undefined) {
    updateApplicationPriority(params.id, Number(body.priority));
  }

  return NextResponse.json({ ok: true });
}
