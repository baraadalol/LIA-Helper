"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCompanyForm({
  companyId,
  initialNotes,
  initialContactPerson,
  initialContactChannel,
}: {
  companyId: string;
  initialNotes: string;
  initialContactPerson: string;
  initialContactChannel: string;
}) {
  const router = useRouter();

  const [notes, setNotes] = useState(initialNotes || "");
  const [contactPerson, setContactPerson] = useState(initialContactPerson || "");
  const [contactChannel, setContactChannel] = useState(
    initialContactChannel || ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    await fetch(`/api/companies/${companyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notes,
        contact_person: contactPerson,
        contact_channel: contactChannel,
      }),
    });

    setSaving(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "24px",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "20px",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Edit company info</h2>

      <div style={{ display: "grid", gap: "12px" }}>
        <div>
          <label>Contact person</label>
          <input
            type="text"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginTop: "4px",
            }}
          />
        </div>

        <div>
          <label>Contact channel</label>
          <select
            value={contactChannel}
            onChange={(e) => setContactChannel(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginTop: "4px",
            }}
          >
            <option value="">Select channel</option>
            <option value="email">email</option>
            <option value="linkedin">linkedin</option>
            <option value="phone">phone</option>
            <option value="other">other</option>
          </select>
        </div>

        <div>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: "100%",
              minHeight: "120px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              marginTop: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            backgroundColor: "#111827",
            color: "white",
            border: "none",
            padding: "12px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
