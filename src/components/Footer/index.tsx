/* eslint-disable react/no-unescaped-entities */
import { Share } from "@material-ui/icons";
import { Box, Button, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Footer() {
  const [pageUrl, setPageUrl] = useState<string>("");
  const [userAgent, setUserAgent] = useState<string>("");

  useEffect(() => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
    const isAndroid = () => Boolean(userAgent.match(/Android/i));
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
    const isSSR = () => Boolean(userAgent.match(/SSR/i));
    const isMobile = () =>
      Boolean(isAndroid() || isIos() || isOpera() || isWindows());
    const isDesktop = () => Boolean(!isMobile() && !isSSR());
    if (isMobile()) {
      setUserAgent("mobile");
      if (window) {
        const currentURL = new URL(window.location.href);
        setPageUrl(currentURL.toString());
      } else {
        setPageUrl("");
        setUserAgent("Desktop");
      }
    }
  }, []);
  function handleShare() {
    console.log(pageUrl);
    if (navigator.share) {
      navigator
        .share({
          title: "Prüft ein AFD Verbot",
          text: "Sende eine Mail an Abgeordnete",
          url: pageUrl,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API not supported in your browser");
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "30px",
        paddingBottom: "30px",
        gap: "30px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}>
      <Box sx={{}}>
        <Typography variant='h6' align='justify'>
          Impressum (Angaben gemäß § 5 TMG)
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          Veliko Kardziev
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          Neureutherstr. 4
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          80799 München
        </Typography>
        <Typography sx={{ userSelect: "none" }} variant='body1' align='justify'>
          E-Mail: mail@velikokardziev.de
        </Typography>
        {userAgent === "mobile" ? (
          <Box sx={{ margin: "15px 0" }}>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleShare}
              startIcon={<Share />}>
              Diese Seite weiterleiten
            </Button>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography variant='body2' align='justify'>
          Diese Webseite steht nicht in Verbindung mit der Petition{" "}
          <a href='https://innn.it/afdverbot'>
            "Prüft ein AFD Verbot" auf https://innn.it/afdverbot
          </a>{" "}
          sondern ist ein reines Zusatzangebot, erstellt mit öffentlich
          zugänglichen Daten:
        </Typography>
        <Typography variant='caption'>
          (c) Die Bundeswahlleiterin, Wiesbaden 2024 Datenlizenz Deutschland –
          Namensnennung – Version 2.0 (https://www.govdata.de/dl-de/by-2-0)
        </Typography>
        <Typography variant='caption'>
          Ergebnisse der Wahlbezirksstatistik zur Bundestagswahl 2021 Endgültig
          gewählte Bewerberinnen und Bewerber bei der Wahl zum 20. Deutschen
          Bundestag (26. September 2021) sowie Mitgliedschaftsverluste und
          berufene Listennachfolgen - Stand:08.01.2024
        </Typography>
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const pageUrl = process.env.SITE_URL;

  return {
    props: { pageUrl },
  };
}
