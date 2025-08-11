export const load = async ({ url }: { url: URL }) => {
  // Extract URL parameters
  const projectType = url.searchParams.get('projectType');
  const subType = url.searchParams.get('subType');

  return {
    projectType,
    subType
  };
};
