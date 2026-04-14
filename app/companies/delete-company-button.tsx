"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteCompanyButton({
  companyId,
  companyName,
}: {
  companyId: string;
  companyName: string;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${companyName}?`
    );

    if (!confirmed) return;

    setDeleting(true);

    await fetch("/api/companies", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: companyId }),
    });

    setDeleting(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      style={{
        marginTop: "10px",
        background: "#d9534f",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {deleting ? "Deleting..." : "Delete company"}
    </button>
  );
}

