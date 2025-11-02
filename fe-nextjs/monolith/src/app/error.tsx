"use client";

export default function GlobalError({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Something went wrong 😵</h1>
          <p>{error.message}</p>
          <button onClick={() => reset()}>Retry</button>
        </div>
      </body>
    </html>
  );
}
