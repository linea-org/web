import { ImageResponse } from "next/og";
import type { CSSProperties, ReactNode } from "react";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BORDER = "rgba(255,255,255,0.12)";
const MUTED = "#a3a3a3";
const CROSS = "rgba(255,255,255,0.35)";

const interMedium = fetch(
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@5.2.5/latin-500-normal.woff",
)
  .then((res) => (res.ok ? res.arrayBuffer() : null))
  .catch(() => null);

function OgCross({ style }: { style: CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: 14,
        height: 14,
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 0,
          right: 0,
          top: 6,
          height: 1,
          background: CROSS,
        }}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 6,
          width: 1,
          background: CROSS,
        }}
      />
    </div>
  );
}

function FrameMarks() {
  return (
    <div style={{ display: "flex" }}>
      <OgCross style={{ top: -7, left: -7 }} />
      <OgCross style={{ top: -7, right: -7 }} />
      <OgCross style={{ bottom: -7, left: -7 }} />
      <OgCross style={{ bottom: -7, right: -7 }} />
    </div>
  );
}

function OgFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#000000",
        color: "#ffffff",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          border: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            margin: 6,
            border: `1px solid ${BORDER}`,
            position: "relative",
          }}
        >
          <FrameMarks />
          {children}
        </div>
      </div>
    </div>
  );
}

export async function createOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const inter = await interMedium;
  const showEyebrow = eyebrow.toLowerCase() !== "linea";
  const long = title.length > 48;

  return new ImageResponse(
    (
      <OgFrame>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
            padding: "44px 64px 48px",
            backgroundImage:
              "radial-gradient(ellipse 90% 140% at 50% 0%, rgba(255,255,255,0.05), transparent 62%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 500,
                letterSpacing: "-0.03em",
              }}
            >
              Linea
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: MUTED,
                letterSpacing: "-0.02em",
              }}
            >
              getlinea.app
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {showEyebrow ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: MUTED,
                  letterSpacing: "-0.02em",
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                fontSize: long ? 48 : 58,
                fontWeight: 500,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                marginTop: showEyebrow ? 14 : 0,
                maxWidth: 1000,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: MUTED,
                letterSpacing: "-0.02em",
                lineHeight: 1.45,
                marginTop: 22,
                maxWidth: 860,
              }}
            >
              {description}
            </div>
          </div>
        </div>
      </OgFrame>
    ),
    {
      ...ogSize,
      fonts: inter
        ? [{ name: "Inter", data: inter, style: "normal", weight: 500 }]
        : [],
    },
  );
}
