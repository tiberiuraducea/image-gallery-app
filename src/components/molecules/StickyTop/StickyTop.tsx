import {FunctionComponent, PropsWithChildren} from "react";

const StickyTop: FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <div className="sticky top-0 left-0 z-10 mb-10 w-full bg-white py-4">
      {children}
    </div>
  )
}

export default StickyTop
