import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	Paper,
	styled,
	Box,
	Button,
	CircularProgress,
	Typography,
	TableCell,
	TextField,
	Select,
} from "@mui/material";

export const StyledSelect = styled(Select)(({ theme }) => ({
  border: '2px solid orange',
  backgroundColor: theme.blue,
  width: '150px',
  marginBottom: '10px',
}));

 

export const FlexRowContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	// border: '1px solid blue',
}));

export const FlexColumnContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "start",
	// gap: theme.spacing(2),

	// border: '1px solid green',
}));
export const CenterBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
	color: "white",
}));

export const Container = styled(Box)`
	display: flex;
	flex-direction: column;
	position: "absolute";
`;

export const BlackBox = styled(Box)`
	width: 22px;
	height: 21px;
	background: #000000 0% 0% no-repeat padding-box;
	margin-bottom: 11px;
`;

export const FiveBlackBoxes = () => {
	return (
		<Container>
			<BlackBox />
			<BlackBox />
			<BlackBox />
			<BlackBox />
			<BlackBox />
		</Container>
	);
};
