import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTelegram } from "hooks/useTelegram";
import "../../App.scss";
import { US, IL, RU, FR } from "country-flag-icons/react/3x2";
import { FlexRowContainer } from "components/styled/AllHelpComponents";
import generatedGitInfo from "helpers/generatedGitInfo.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tele = window.Telegram.WebApp;

export const Header = () => {
  const { user, onClose } = useTelegram();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const location = useLocation();
  const state = location?.state || [];

  useEffect(() => {
    const language_code = user?.language_code;
    if (language_code && currentLanguage !== language_code) {
      setCurrentLanguage(language_code);
      i18n.changeLanguage(language_code);
    }
  }, [user?.language_code]);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  const languageButtons = [
    { code: "en", label: "EN", flag: <US title="United States" className="countryFlag" /> },
    { code: "ru", label: "RU", flag: <RU title="Russian" className="countryFlag" /> },
    { code: "he", label: "HE", flag: <IL title="Israel" className="countryFlag" /> },
    { code: "fr", label: "FR", flag: <FR title="France" className="countryFlag" /> },
  ];

  return (
    <>
      <FlexRowContainer
        sx={{
          justifyContent: "space-around",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{ border: "2px solid orange", padding: "4px 8px ", width: "40px" }}
          variant="body1"
        >
          {currentLanguage}
        </Typography>

        {languageButtons.map((button) => (
          <Button
            key={button.code}
            variant={currentLanguage === button.code ? "contained" : "outlined"}
            onClick={() => changeLanguage(button.code)}
          >
            {button.flag} &nbsp; &nbsp;
            {button.label}
          </Button>
        ))}
      </FlexRowContainer>
    </>
  );
};
