import {useMemo} from "react";

const Footer = () => {

  const year = useMemo(() => {
    return new Date().getFullYear();
  }, [])

  return (
    <footer className="py-8 ">
      <div className="container">
      <p className="text-center">&copy; {year} Copyright Tiberiu Raducea</p>
      </div>
    </footer>
  )
}

export default Footer
