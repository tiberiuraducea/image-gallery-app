import type {NextPage} from 'next'
import type {ImageType} from "@/components/molecules/GalleryImage/GalleryImage";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {AppContextType, useAppContext} from "@/context/AppContext";
import {getImages} from "@/services/imageService";
import debounce from "@/helpers/Debounce/Debounce";

import GalleryGrid from "@/components/organisms/GalleryGrid/GalleryGrid";
import Head from "next/head";
import Link from "next/link";
import StickyTop from "@/components/molecules/StickyTop/StickyTop";
import AlbumsList from "@/components/molecules/AlbumsList/AlbumsList";
import Input from "@/components/atoms/Input/Input";


const Index: NextPage<{ images: ImageType[] }> = ({images}) => {

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const [album, setAlbum] = useState<number | null>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {favoriteImages, reqOptions, setReqOptions} = useAppContext() as AppContextType;
  const {additionalImages, setAdditionalImages} = useAppContext() as AppContextType;
  const [loading, setLoading] = useState<boolean>(false);

  // Create array of albums
  const albums = useMemo(() => {
    return [...images, ...additionalImages]
      .map((image: ImageType) => image.albumId)
      .filter((value, index, self) => self.indexOf(value) === index)
  }, [images, additionalImages]);


  // Combine images and filter by album
  const galleryImages = useMemo(() => {
    return [...images, ...additionalImages]
      .filter((image: ImageType) => {
        return album ? image.albumId === album : true;
      })
      .filter((image: ImageType) => {
        return searchTerm ? image.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      });
  }, [images, additionalImages, album, searchTerm]);

  const loadMore = async () => {

    setLoading(true)

    const newImages: ImageType[] = await getImages(reqOptions.limit, reqOptions.start + reqOptions.limit)

    setAdditionalImages(newImages);
    setReqOptions({
      limit: reqOptions.limit,
      start: reqOptions.start + reqOptions.limit
    })

    setLoading(false)
  }

  useEffect(() => {

    const button = loadMoreButtonRef.current;

    const loadMoreImages = debounce(() => loadMore(), 300);
    if (!button) return;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry.isIntersecting && !loading) {
        loadMoreImages();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (button) {
      observer.observe(button);
    }

    return () => {
      if (button) {
        observer.unobserve(button);
      }
    };
  }, [loading]);

  return (
    <div className="relative">

      <Head>
        <title>Gallery</title>
      </Head>
      <StickyTop>
        <div className="container flex flex-row flex-wrap gap-2.5 items-center justify-between">

          <AlbumsList album={album} albums={albums} setAlbum={setAlbum}/>

          <div className="w-full lg:w-auto flex-grow lg:flex-grow-0 order-3">
            <Input type="search" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
          </div>

          <div className="order-2 lg:order-3">
            {favoriteImages?.length > 0 &&
              <Link href="/favorites" className="relative box-border block px-2 leading-none"
                    aria-label="Favourite images list">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path
                    d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/>
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center rounded-full leading-none text-white">{favoriteImages.length}</span>
              </Link>
            }
          </div>

        </div>
      </StickyTop>
      <GalleryGrid images={galleryImages}/>
      <div className="py-4 text-center">
        <button
          ref={loadMoreButtonRef}
          className="rounded bg-sky-300 px-2 py-1 font-semibold text-neutral-900 shadow-sm hover:bg-white/20"
          onClick={loadMore}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>

  )
}

export const getStaticProps = async () => {

  const images: ImageType[] = await getImages(0, 24);

  return {
    props: {
      images: images
    }
  }
}

export default Index;
