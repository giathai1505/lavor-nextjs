import { LegacyRef, useEffect, useRef, useState } from "react";

interface IImageProps {
  className?: string;
  src: string;
  alt: string;
}
interface ILazyImage extends IImageProps {
  placeHolderImage: string;
}

const LazyImage: React.FC<ILazyImage> = ({ src, alt, placeHolderImage }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState(placeHolderImage);

  useEffect(() => {
    if (!ref.current) return;

    const image = new Image();
    image.src = src;

    image.onload = () => {
      setImage(src);
    };

    image.onerror = () => {
      setImage(placeHolderImage);
    };
  }, [ref]);

  return (
    <img
      className="block w-full h-full object-cover"
      src={image}
      alt={alt}
      ref={ref}
    />
  );
};

export default LazyImage;
