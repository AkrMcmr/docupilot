import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            {"D"}
          </div>
          <span
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#a1a1aa",
              letterSpacing: "-0.5px",
            }}
          >
            DocuPilot
          </span>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#fafafa",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            maxWidth: "900px",
          }}
        >
          Your docs, always up to date.
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "#52525b",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-2px",
          }}
        >
          Automatically.
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "48px",
            color: "#71717a",
            fontSize: "24px",
          }}
        >
          <span>README</span>
          <span style={{ color: "#3f3f46" }}>|</span>
          <span>CHANGELOG</span>
          <span style={{ color: "#3f3f46" }}>|</span>
          <span>API Docs</span>
        </div>

        <div
          style={{
            marginTop: "32px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "100px",
            padding: "12px 32px",
            fontSize: "20px",
            fontWeight: 600,
            color: "white",
          }}
        >
          Starting at $9/month
        </div>
      </div>
    ),
    { ...size }
  );
}
