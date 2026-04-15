export const dynamic = "force-dynamic";

async function getData() {
  const res = await fetch("http://localhost:3000/api/companies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}

function getBucket(dateStr: string | null) {
  if (!dateStr) return "none";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  const diff =
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  if (diff <= 7) return "next";
  return "later";
}

function getStatusColor(status: string) {
  switch (status) {
    case "not_contacted":
      return "#6b7280";
    case "contacted":
      return "#2563eb";
    case "replied":
      return "#7c3aed";
    case "interview":
      return "#f59e0b";
    case "offer":
      return "#16a34a";
    case "accepted":
      return "#15803d";
    case "rejected":
      return "#dc2626";
    case "ghosted":
      return "#9ca3af";
    default:
      return "#111827";
  }
}

export default async function DashboardPage() {
  const data = await getData();

  const overdue = data.filter((c: any) => getBucket(c.next_followup_at) === "overdue");
  const today = data.filter((c: any) => getBucket(c.next_followup_at) === "today");
  const next = data.filter((c: any) => getBucket(c.next_followup_at) === "next");

  return (
    <main
      style={{
        padding: "32px",
        maxWidth: "1100px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "24px" }}>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
        <Section
          title="🔴 Overdue"
          subtitle={`${overdue.length} item${overdue.length === 1 ? "" : "s"}`}
          items={overdue}
          getStatusColor={getStatusColor}
        />

        <Section
          title="🟡 Today"
          subtitle={`${today.length} item${today.length === 1 ? "" : "s"}`}
          items={today}
          getStatusColor={getStatusColor}
        />

        <Section
          title="🟢 Next 7 Days"
          subtitle={`${next.length} item${next.length === 1 ? "" : "s"}`}
          items={next}
          getStatusColor={getStatusColor}
        />
      </div>
    </main>
  );
}

function Section({
  title,
  subtitle,
  items,
  getStatusColor,
}: {
  title: string;
  subtitle: string;
  items: any[];
  getStatusColor: (status: string) => string;
}) {
  return (
    <section
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>

        <span
          style={{
            background: "#111827",
            color: "white",
            padding: "4px 10px",
            borderRadius: "999px",
            fontSize: "12px",
          }}
        >
          {subtitle}
        </span>
      </div>

      {/* Empty state */}
      {items.length === 0 ? (
        <p style={{ color: "#6b7280" }}>Nothing here 🎉</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {items.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "14px",
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{c.name}</h3>

                <p style={{ margin: "4px 0", fontSize: "14px", color: "#6b7280" }}>
                  {c.next_followup_at ?? "No date"}
                </p>
              </div>

              <span
                style={{
                  backgroundColor: "#f3f4f6",
                  color: getStatusColor(c.status),
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
