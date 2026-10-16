// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <div
          style={{
            background: "red",
            color: "white",
            padding: "20px",
            fontSize: "24px",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          ✅ LAYOUT TEST — Ye dikh raha hai toh layout chal raha hai
        </div>
        <div style={{ paddingTop: "100px" }}>{children}</div>
      </body>
    </html>
  );
}
