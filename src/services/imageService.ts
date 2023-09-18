import axios from "axios";

/**
 * Get images
 * @param start
 * @param limit
 * @returns ImageType[]
 */
export const getImages = async (start: number, limit: number) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${start}`
  ).then((res) => res.data);
}

/**
 * Get image by id
 * @param id
 * @returns Object<ImageType>
 */
export const getImage = async (id: string) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${id}`
  ).then((res) => res.data);
}

/**
 * Get images by album
 * @param albumId
 * @param start
 * @param limit
 * @returns ImageType[]
 */
export const getImageByAlbum = async (albumId: string, start: number, limit: number) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=${limit}&_start=${start}`
  ).then((res) => res.data);
}
