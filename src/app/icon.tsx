import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 16,
            height: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            background: "#fff",
            borderRadius: 2,
            border: "1.5px solid #dadce0",
            padding: "3px 3px",
          }}
        >
          <div style={{ height: 2, width: "100%", background: "#5f6368", borderRadius: 1 }} />
          <div style={{ height: 2, width: "70%", background: "#dadce0", borderRadius: 1 }} />
          <div style={{ height: 2, width: "85%", background: "#dadce0", borderRadius: 1 }} />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
