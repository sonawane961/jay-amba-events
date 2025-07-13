import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/Navbar";
import ContactFloating from "@/components/ContactFloating/ContactFloating";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";

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
