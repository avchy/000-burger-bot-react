import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: "Rubik, Arial, sans-serif",
	},
	backgroundAll: "#131415",
	backgroundElements: "#1a222c",
	blue: "#1a3f6c",
	blue2: "#539acd",
	palette: {
		primary: {
			main: "#1a3f6c",
			secondary: "#539acd",
		},
		// Добавь другие цвета по необходимости
	},
});

export default theme;
