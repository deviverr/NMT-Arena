import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const score = url.searchParams.get("score") ?? "0";
  const total = url.searchParams.get("total") ?? "0";
  const subject = url.searchParams.get("subject") ?? "НМТ";
  const username = url.searchParams.get("username") ?? "гравець";
  const isStory = url.searchParams.get("format") === "story";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 70, background: "linear-gradient(160deg,#F6FAF7,#A8D5B5,#F59E0B)", color: "#062E18", fontFamily: "sans-serif", textAlign: "center" }}>
        <div style={{ fontSize: isStory ? 54 : 42, fontWeight: 900 }}>NMT Arena 🏟️</div>
        <div style={{ marginTop: 60, fontSize: isStory ? 96 : 78, fontWeight: 900 }}>{score}/{total}</div>
        <div style={{ marginTop: 24, fontSize: isStory ? 46 : 36, fontWeight: 800 }}>@{username} набрав з {subject}</div>
        <div style={{ marginTop: 60, fontSize: isStory ? 34 : 28 }}>Готуйся до НМТ з кайфом</div>
      </div>
    ),
    { width: isStory ? 1080 : 1200, height: isStory ? 1920 : 630 }
  );
}
