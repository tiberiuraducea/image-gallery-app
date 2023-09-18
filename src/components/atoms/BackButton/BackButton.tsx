import {FunctionComponent} from "react";
import {useRouter} from "next/router";
const BackButton: FunctionComponent = () => {

  const router = useRouter();

  const handleClick = () => {
    router.back()
  }

  return (
    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Back
    </button>
  )
}

export default BackButton
