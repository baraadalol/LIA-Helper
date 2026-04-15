import StatusSelect from "./status-select";
import AddCompanyForm from "./add-company-form";
import DatePicker from "./date-picker";
import DeleteCompanyButton from "./delete-company-button";
import PrioritySelect from "./priority-select";

async function getCompanies() {
  const res = await fetch("http://localhost:3000/api/companies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }

  return res.json();
}

export default async function CompaniesPage() {
  const companies = await getCompanies();

  return (
    <main style={{ padding: "20px" }}>
      <h1>Companies</h1>
      <AddCompanyForm />

      {companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <>
          {companies.map((c: any) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
              }}
            >
              <h2>{c.name}</h2>
              <p>Status: {c.status ?? "No status"}</p>
              <p>Priority: {c.priority ?? "-"}</p>
              <p>Next follow-up: {c.next_followup_at ?? "Not set"}</p>

              {c.application_id ? (
                <>
                  <StatusSelect
                    applicationId={c.application_id}
                    currentStatus={c.status}
                  />

                  <DatePicker
                    applicationId={c.application_id}
                    currentDate={c.next_followup_at}
                  />

                  <PrioritySelect
                    applicationId={c.application_id}
                    currentPriority={c.priority}
                  />
                </>
              ) : (
                <p>No application yet.</p>
              )}

              <DeleteCompanyButton
                companyId={c.id}
                companyName={c.name}
              />
            </div>
          ))}
        </>
      )}
    </main>
  );
}
