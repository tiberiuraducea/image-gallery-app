import React, {FunctionComponent, useEffect} from 'react';
import type { PropsWithChildren } from 'react';
import {createContext, useContext, useState} from 'react';
import {ImageType} from "@/components/molecules/GalleryImage/GalleryImage";

export type RequestOptions = {
  limit: number,
  start: number
}

export interface AppContextType {
  reqOptions: RequestOptions,
  setReqOptions: React.Dispatch<React.SetStateAction<RequestOptions>>,
  additionalImages: ImageType[]
  setAdditionalImages: React.Dispatch<React.SetStateAction<ImageType[]>>
  favoriteImages: ImageType[]
  addImageToFavorites: (images: ImageType) => void
}

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

const AppProvider: FunctionComponent<PropsWithChildren> =  ({ children }) => {

  const [favoriteImages, setFavoriteImages] = useState<ImageType[]>([]);
  const [additionalImages, setAdditionalImages] = useState<ImageType[]>([]);
  const [reqOptions, setReqOptions] = useState<RequestOptions>({
    limit: 24,
    start: 0
  });

  /**
   * Store favorite images in local storage
   * @param images
   */
  const storeFavoriteImages = (images: ImageType[]) => {
    localStorage.setItem('favoriteImages', JSON.stringify(images));
  }

  /**
   * Get favorite images from local storage
   */
  const getFavoriteImages = () => {
    const images = localStorage.getItem('favoriteImages');
    return images ? JSON.parse(images) : [];
  }

  useEffect(() => {
    const images = getFavoriteImages();
    setFavoriteImages(images);
  }, []);

  /**
   * Add or remove image from favorites
   * @param image
   */
  const addImageToFavorites = (image: ImageType) => {
      const newFavourites = [...favoriteImages];
      // Check if image is already in favorites
      const index = newFavourites.findIndex((item) => item.id === image.id);

      // If it is, remove it, otherwise add it
      if (index > -1) {
        newFavourites.splice(index, 1);
      } else {
        newFavourites.push(image);
      }
    setFavoriteImages(newFavourites);
    storeFavoriteImages(newFavourites);
  }

  const value = {
    reqOptions,
    setReqOptions,
    additionalImages,
    setAdditionalImages,
    favoriteImages,
    addImageToFavorites
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;


