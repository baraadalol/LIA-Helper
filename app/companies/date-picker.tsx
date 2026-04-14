"use client";

import { useState } from "react";

export default function DatePicker({
  applicationId,
  currentDate,
}: {
  applicationId: string;
  currentDate: string;
}) {
  const [date, setDate] = useState(currentDate || "");
  const [saving, setSaving] = useState(false);

  async function handleChange(newDate: string) {
    setDate(newDate);
    setSaving(true);

    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ next_followup_at: newDate }),
    });

    setSaving(false);
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <label>
        Follow-up date:{" "}
        <input
          type="date"
          value={date || ""}
          onChange={(e) => handleChange(e.target.value)}
          disabled={saving}
        />
      </label>
      {saving && <span style={{ marginLeft: "10px" }}>Saving...</span>}
    </div>
  );
}
