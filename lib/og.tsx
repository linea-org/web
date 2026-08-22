import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function createOgImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#ffffff",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3" }}>
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 58,
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.12,
                marginTop: 20,
                maxWidth: 920,
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#a3a3a3" }}>
            Linea
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
