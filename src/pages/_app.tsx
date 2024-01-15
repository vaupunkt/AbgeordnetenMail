import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";

const theme = createTheme();
const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that accesses the theme
  }
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <ThemeProvider theme={theme}>
        <SpeedInsights />
        <Analytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
