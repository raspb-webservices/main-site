export const load = async ({ fetch }) => {
  const res = await fetch('/api/content/home');
  if (res.ok) {
    const content = await res.json();
    return content;
  }
};
