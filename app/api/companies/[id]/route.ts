import { NextResponse } from "next/server";
import { getCompanyById } from "../../../../lib/queries";

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
