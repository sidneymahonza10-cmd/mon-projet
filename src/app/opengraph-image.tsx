import { ImageResponse } from "next/og";

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
          background: "radial-gradient(circle at 80% 10%, #3a2f20 0%, #0a0a0b 55%)",
          color: "#fbfaf6",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: 10, color: "#d8bd8a" }}>NOVESYA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05 }}>Votre logement travaille.</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, color: "#e2d4bb", fontStyle: "italic" }}>NOVESYA s&apos;occupe du reste.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#a8a398" }}>Conciergerie Airbnb premium</div>
      </div>
    ),
    size,
  );
}
