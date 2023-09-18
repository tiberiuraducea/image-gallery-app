import { Html, Head, Main, NextScript } from 'next/document'
import Footer from "@/components/organisms/Footer/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head/>
      <body className="bg-white text-neutral-900">
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  )
}
