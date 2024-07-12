import "./globals.css";
import {Providers} from "./providers";
import Footer from "./components/Footer";

export const metadata = {
  title: "CINEGEST: Movie Recommendation",
  description: "Project in Natural Language Processing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className=" bg-black">
            {children}
            {/* <Footer /> */}
          </main>
        </Providers>
      </body>
    </html>
  );
}
