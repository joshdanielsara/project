import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f1f3f4",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 88,
            height: 112,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 14,
            background: "#fff",
            borderRadius: 10,
            border: "4px solid #dadce0",
            padding: "18px 16px",
          }}
        >
          <div style={{ height: 8, width: "100%", background: "#5f6368", borderRadius: 4 }} />
          <div style={{ height: 8, width: "70%", background: "#dadce0", borderRadius: 4 }} />
          <div style={{ height: 8, width: "85%", background: "#dadce0", borderRadius: 4 }} />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
