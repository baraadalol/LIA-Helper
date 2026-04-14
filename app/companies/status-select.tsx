"use client";

import { useState } from "react";

const statuses = [
  "not_contacted",
  "contacted",
  "replied",
  "interview",
  "offer",
  "accepted",
  "rejected",
  "ghosted",
];

export default function StatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);

  async function handleChange(newStatus: string) {
    setStatus(newStatus);
    setSaving(true);

    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setSaving(false);
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <label>
        Update status:{" "}
        <select
          value={status}
          onChange={(e) => handleChange(e.target.value)}
          disabled={saving}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      {saving && <span style={{ marginLeft: "10px" }}>Saving...</span>}
    </div>
  );
}
