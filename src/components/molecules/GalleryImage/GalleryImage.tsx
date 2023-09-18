import {FunctionComponent} from "react";
import Image from "next/image";

export type ImageType = {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

interface GalleryImageProps {
  image: ImageType,
  thumbNail?: boolean,
  priority?: boolean
}

const GalleryImage: FunctionComponent<GalleryImageProps> = ({image, priority, thumbNail}) => {

  return (
    <Image
      src={thumbNail ? image.thumbnailUrl : image.url}
      className="transition-all duration-500 ease-in-out group-hover:scale-110"
      priority={priority}
      title={image.title}
      aria-label={image.title}
      alt={image.title}
      fill={true}
      sizes={thumbNail ? '150px' : '100%'}
    />
  )
}

export default GalleryImage
