import {cn} from "@/helpers/ClassNames/ClassNames";
import {FunctionComponent} from "react";

type AlbumsListProps = {
  album?: number | null,
  albums: number[],
  setAlbum: (album: number | null) => void
}

const AlbumsList:FunctionComponent<AlbumsListProps> = ({album, albums, setAlbum}) => {
  return (
    <>
      {albums && (<ul className="w-auto flex gap-2 flex-grow lg:flex-grow-0 order-1">
        {albums.map((item: number) => (
          <li className={cn(
            'inline-block px-4 py-2 rounded-lg cursor-pointer ',
            album === item ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          )} key={item} onClick={() => setAlbum(item)}>Album {item}</li>
        ))}
      </ul>)
      }
    </>
  )
}

export default AlbumsList
