async function getData() {
  const res = await fetch("http://localhost:3000/api/companies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}

function getBucket(dateStr: string | null) {
  if (!dateStr) return "none";

  const today = new Date();
  const date = new Date(dateStr);

  const diff = Math.ceil(
    (date.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) return "overdue";
  if (diff === 0) return "today";
  if (diff <= 7) return "next";
  return "later";
}

export default async function DashboardPage() {
  const data = await getData();

  const overdue = data.filter((c: any) => getBucket(c.next_followup_at) === "overdue");
  const today = data.filter((c: any) => getBucket(c.next_followup_at) === "today");
  const next = data.filter((c: any) => getBucket(c.next_followup_at) === "next");

  return (
    <main style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <Section title="🔴 Overdue" items={overdue} />
      <Section title="🟡 Today" items={today} />
      <Section title="🟢 Next 7 Days" items={next} />
    </main>
  );
}

function Section({ title, items }: any) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>{title}</h2>

      {items.length === 0 ? (
        <p>Nothing here</p>
      ) : (
        items.map((c: any) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <strong>{c.name}</strong>
            <p>Status: {c.status}</p>
            <p>Follow-up: {c.next_followup_at}</p>
          </div>
        ))
      )}
    </div>
  );
}
