interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CallbackPage({ searchParams }: Props) {
  const params = await searchParams;
  const { code, state, error, error_description } = params;

  return (
    <main style={{ padding: "2rem", maxWidth: 600 }}>
      <h1>WHOOP OAuth Callback</h1>
      {error ? (
        <div style={{ color: "#c00", marginTop: "1rem" }}>
          <p><strong>Error:</strong> {error}</p>
          {error_description && <p>{error_description}</p>}
        </div>
      ) : code ? (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Authorization Code:</strong></p>
          <pre style={{ background: "#f5f5f5", padding: "1rem", borderRadius: 4, overflowX: "auto" }}>
            {code}
          </pre>
          {state && <p style={{ marginTop: "0.5rem" }}><strong>State:</strong> {state}</p>}
        </div>
      ) : (
        <p style={{ color: "#c00", marginTop: "1rem" }}>
          No authorization code received.
        </p>
      )}
    </main>
  );
}
