"use client"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "sans-serif",
          gap: "16px",
          margin: 0,
          background: "#f9fafb",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", margin: 0 }}>
          Something went wrong
        </h2>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            padding: "8px 20px",
            background: "#c0392b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
