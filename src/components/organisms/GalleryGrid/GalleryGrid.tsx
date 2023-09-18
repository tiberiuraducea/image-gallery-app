import {FunctionComponent} from "react";
import {ImageType} from "@/components/molecules/GalleryImage/GalleryImage";
import {motion} from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {AppContextType, useAppContext} from "@/context/AppContext";

const GalleryImage = dynamic(() => import("@/components/molecules/GalleryImage/GalleryImage"))

interface GalleryGridProps {
  images: ImageType[]
}

const GalleryGrid: FunctionComponent<GalleryGridProps> = ({images}) => {

  const {favoriteImages, addImageToFavorites} = useAppContext() as AppContextType;

  const isFavorite = (image: ImageType) => {
    return favoriteImages.findIndex((item) => item.id === image.id) > -1;
  }

  return (
    <div className="container">
      <ul className="grid min-h-screen grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {images.map((image: ImageType, i: number) => {

        const imageId = image.id.toString();

        const favorite = isFavorite(image);

        return (
          <motion.li
            className={`col-span-1 group relative overflow-hidden ${i % 2 === 0 && 'delay-100'}`}
            id={`image-${imageId}`}
            key={image.id}
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
          >
            <div
              className="relative mb-4 block aspect-square w-full overflow-hidden rounded-2xl bg-stone-500 pt-[62.25%]">
              <Link href="/[id]" as={'/' + image.id} prefetch={false} className="absolute inset-0 box-border block h-full w-full">
                <GalleryImage image={image} thumbNail={true} priority={i < 12}/>
              </Link>
              <button aria-label={favorite ? 'Remove image from favorites' : 'Add image to favorites'} onClick={() => addImageToFavorites(image)} className="absolute top-4 right-0 px-4 py-2 transition-transform z-[2] hover:scale-105">
                {favorite
                  ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/>
                  </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"/>
                  </svg>
                }
              </button>
            </div>
            <h3 className="truncate text-xl ...">{image.title}</h3>
          </motion.li>
        )
      })}
    </ul>
    </div>
  )
}

export default GalleryGrid
