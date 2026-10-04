import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "NOVESYA — Conciergerie Airbnb Premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 80% 10%, #ece3d5 0%, #f6f1e9 60%)",
          color: "#2a201a",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 10, color: "#8a5d28" }}>NOVESYA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05 }}>Votre logement travaille.</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, color: "#8a5d28", fontStyle: "italic" }}>NOVESYA s&apos;occupe du reste.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6b5f55" }}>Conciergerie Airbnb premium</div>
      </div>
    ),
    size,
  );
}
