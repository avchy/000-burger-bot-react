import React from "react";
import { Button } from "@mui/material";

export function BigButton({ children, disabled, onClick, backgroundColor }) {
  const fontSizeRelativeToViewport = (viewportWidth) => {
    // Задаем желаемое соотношение ширины шрифта к ширине окна (можно изменить)
    const fontSizeRatio = 0.05; // 2% от ширины окна браузера

    // Рассчитываем размер шрифта относительно ширины окна
    return `${viewportWidth * fontSizeRatio}px`;
  };

  const buttonStyle = {
    margin: "10px",

    background: backgroundColor,
    borderRadius: "10px",
    width: "fit-content", // добавляем свойство для растягивания по размеру содержимого

    backgroundColor: "#1a3f6c",
    cursor: "pointer",
    color: "white",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    gap: 5,

    // fontSize: "1.2rem",
    fontSize: fontSizeRelativeToViewport(window.innerWidth), // Устанавливаем размер шрифта относительно ширины окна

    fontWeight: "bold",
    border: "4px solid #000",

    opacity: disabled ? 0.3 : 1,
    pointerEvents: disabled ? "none" : "auto",
  };

  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
    >
      {children}
    </Button>
  );
}
