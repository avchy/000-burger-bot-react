import React from "react";
import { US, IL, RU, FR } from "country-flag-icons/react/3x2";

export const languageButtons = [
  {
    code: "en",
    label: "EN",
    flag: <US title="United States" className="countryFlag" />,
  },
  {
    code: "ru",
    label: "RU",
    flag: <RU title="Russian" className="countryFlag" />,
  },
  {
    code: "he",
    label: "HE",
    flag: <IL title="Israel" className="countryFlag" />,
  },
  {
    code: "fr",
    label: "FR",
    flag: <FR title="France" className="countryFlag" />,
  },
];
