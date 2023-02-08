import Image, { ImageProps } from 'next/image';

export const ImagePlaceholder = ({
  src,
  alt,
  width,
  height,
  ...props
}: ImageProps): JSX.Element => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
      priority
    />
  );
};
