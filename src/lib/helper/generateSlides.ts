export function generateSlides(length = 6): Array<{ src: string; alt: string }> {
  const output = [];
  for (let i = 0; i < length; i++) {
    const currentObject = {
      src: `https://picsum.photos/id/${(i + 3) * 2}/1440/450`,
      alt: `Image ${i}`
    };
    output.push(currentObject);
  }
  return output;
}
