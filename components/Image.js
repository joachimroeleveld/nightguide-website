export const generateImgPropsFromServingUrl = (
  url,
  imgWidths = [],
  sizes,
  alt
) => {
  if (!url) return null;
  const sources = imgWidths.map(size => `${url}=s${size}`);
  const src = sources[0];
  const srcSet = sources
    .map((url, index) => `${url} ${imgWidths[index]}w`)
    .join(', ');
  return {
    srcSet: srcSet.length ? srcSet : undefined,
    src,
    alt,
    sizes,
  };
};
