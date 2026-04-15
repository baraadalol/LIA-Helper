"use client";

import { useState } from "react";

export default function PrioritySelect({
  applicationId,
  currentPriority,
}: {
  applicationId: string;
  currentPriority: number;
}) {
  const [priority, setPriority] = useState(currentPriority ?? 3);
  const [saving, setSaving] = useState(false);

  async function handleChange(newPriority: number) {
    setPriority(newPriority);
    setSaving(true);

    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority: newPriority }),
    });

    setSaving(false);
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <label>
        Priority:{" "}
        <select
          value={priority}
          onChange={(e) => handleChange(Number(e.target.value))}
          disabled={saving}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      {saving && <span style={{ marginLeft: "10px" }}>Saving...</span>}
    </div>
  );
}
