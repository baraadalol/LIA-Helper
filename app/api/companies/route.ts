import { NextResponse } from "next/server";
import {
  getAllCompanies,
  createCompany,
  createApplication,
} from "../../../lib/queries";

export async function GET() {
  const companies = getAllCompanies();
  return NextResponse.json(companies);
}

export async function POST(req: Request) {
  const body = await req.json();

  const id = `c_${body.name.toLowerCase().replace(/\s+/g, "_")}`;
  const applicationId = `a_${body.name.toLowerCase().replace(/\s+/g, "_")}`;

  createCompany({
    id,
    name: body.name,
    website: body.website,
    location: body.location,
    tags: body.tags,
    notes: body.notes,
  });

  createApplication({
    id: applicationId,
    company_id: id,
    status: "not_contacted",
  });

  return NextResponse.json({ ok: true });
}
