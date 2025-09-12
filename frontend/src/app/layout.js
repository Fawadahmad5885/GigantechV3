import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/footer/Footer";
// import { fetchStrapi } from "../lib/api";
import { fetchStrapi } from "../lib/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const layoutData = await fetchStrapi(
    "layout-pages?populate[header_section][populate][logo][fields][0]=url&populate[header_section][populate][navItems]=*" +
      "&populate[footer_section][populate][officesCard][populate][flagImage][fields]=url,formats&populate[footer_section][populate][whiteLogo][fields]=url" +
      "&populate[services_lists][populate]=*" +
      "&populate[industries_lists][populate]=*"
  );

  const layoutPage = layoutData?.[0] || {};
  const headerData = layoutPage.header_section;

  const footerData = layoutPage.footer_section;

  const servicesList = layoutPage.services_lists;
  const industriesList = layoutPage.industries_lists;

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Header headerData={headerData} />
        <main>{children}</main>
        <Footer
          footerData={footerData}
          services={servicesList}
          industries={industriesList}
        />
      </body>
    </html>
  );
}
