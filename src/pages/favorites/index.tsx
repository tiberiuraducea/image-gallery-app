import {AppContextType, useAppContext} from "@/context/AppContext";
import GalleryGrid from "@/components/organisms/GalleryGrid/GalleryGrid";
import StickyTop from "@/components/molecules/StickyTop/StickyTop";
import BackButton from "@/components/atoms/BackButton/BackButton";
import {NextPage} from "next";

const Favorites: NextPage = () => {

  const {favoriteImages} = useAppContext() as AppContextType;
  return (
    <div className="relative">
      <StickyTop>
        <div className="container flex flex-row flex-wrap items-center justify-between">
          <BackButton/>
          <h1 className="text-2xl font-bold">Favorites</h1>
        </div>
      </StickyTop>
      {favoriteImages?.length > 0 ? <GalleryGrid images={favoriteImages}/> : <div>
        <p className="text-center">No favorites yet</p>
      </div>}
    </div>
  )
}

export default Favorites
