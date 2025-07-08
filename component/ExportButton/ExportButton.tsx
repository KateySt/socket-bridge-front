"use client";

import React from "react";

interface ExportButtonProps {
  userId: string;
  requesterId: string;
  format: "CSV" | "JSON";
}

export function ExportButton({userId, requesterId, format}: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const params = new URLSearchParams({
        userId: userId,
        format,
      });

      const res = await fetch(`/api/quizzes/export?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": requesterId,
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Error: " + (errorData.error || "Unknown error"));
        return;
      }

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "results." + (format === "CSV" ? "csv" : "json");
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Export failed");
      console.error(error);
    }
  };

  return (
    <button onClick={handleExport} className="btn btn-sm btn-outline">
      Export {format}
    </button>
  );
}
