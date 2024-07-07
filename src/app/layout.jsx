import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
  title: "Movie Recommendation",
  description: "Project in Natural Language Processing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className=" bg-black">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
