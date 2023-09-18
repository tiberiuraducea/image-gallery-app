import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import GalleryImage, {ImageType} from "@/components/molecules/GalleryImage/GalleryImage";
import {getImage} from "@/services/imageService";
import Head from "next/head";
import BackButton from "@/components/atoms/BackButton/BackButton";
import StickyTop from "@/components/molecules/StickyTop/StickyTop";

type GalleryItemProps = {
  image: ImageType
}

const GalleryItem: NextPage<GalleryItemProps> = ({image}) => {

  return (
    <div className="relative">
      <Head>
        <title>{image.title} - Gallery</title>
      </Head>

      <StickyTop>
        <div className="container">
          <BackButton/>
        </div>
      </StickyTop>
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-medium mb-4 text-center">{image.title}</h1>
        <div className="relative rounded-xl bg-stone-500 pt-[100%] mb-4">
          <GalleryImage image={image} thumbNail={false} priority={true}/>
        </div>
        <p className="text-right text-sm">Album ID: {image.albumId}</p>
      </div>
    </div>

  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {

  // Handle No Params
  if (!params || !params.id) {
    return {
      notFound: true,
    }
  }

  try {
    const uid: string = params?.id ? params.id.toString() : "";

    const image = await getImage(uid)

    return {
      props: {
        image: image
      }
    }
  } catch (error) {

    // Handle Error (404)
    return {
      notFound: true,
    }
  }

}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export default GalleryItem;

