export const dynamic = "force-dynamic";

async function getCompany(id: string) {
  const res = await fetch(`http://localhost:3000/api/companies/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch company");
  }

  return res.json();
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const company = await getCompany(id);

  return (
    <main
      style={{
        padding: "32px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "24px",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "8px" }}>
          {company.name}
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          {company.location || "No location"}
        </p>

        <div style={{ display: "grid", gap: "12px" }}>
          <p><strong>Status:</strong> {company.status ?? "No status"}</p>
          <p><strong>Priority:</strong> {company.priority ?? "-"}</p>
          <p><strong>Match score:</strong> {company.match_score ?? "-"}</p>
          <p><strong>Next follow-up:</strong> {company.next_followup_at ?? "Not set"}</p>
          <p><strong>Last contact:</strong> {company.last_contact_at ?? "Not set"}</p>
          <p><strong>Website:</strong> {company.website || "Not set"}</p>
          <p><strong>Tags:</strong> {company.tags || "None"}</p>
          <p><strong>Contact person:</strong> {company.contact_person || "Not set"}</p>
          <p><strong>Contact channel:</strong> {company.contact_channel || "Not set"}</p>
          <p><strong>Notes:</strong> {company.notes || "No notes yet"}</p>
        </div>
      </div>
    </main>
  );
}
