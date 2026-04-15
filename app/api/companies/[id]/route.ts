import { NextResponse } from "next/server";
import {
  getCompanyById,
  updateCompanyDetails,
  updateCompanyNotes,
} from "../../../../lib/queries";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const company = getCompanyById(params.id);

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  return NextResponse.json(company);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const body = await req.json();

  updateCompanyNotes({
    id: params.id,
    notes: body.notes,
  });

  updateCompanyDetails({
    id: params.id,
    contact_person: body.contact_person,
    contact_channel: body.contact_channel,
  });

  return NextResponse.json({ ok: true });
}
