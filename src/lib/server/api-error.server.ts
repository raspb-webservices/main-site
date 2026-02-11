export function apiErrorResponse(error: unknown, status = 500): Response {
  const message =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
