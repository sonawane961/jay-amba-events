import Footer from "@/components/footer/footer";
import ContactFloating from "@/components/ContactFloating/ContactFloating";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/navbar";

function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ContactFloating />
      <Footer />
    </>
  );
}
export default wrapper.withRedux(App);
