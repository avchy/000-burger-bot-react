import { TextField } from "@mui/material"

export function StyledTextField({ value, onChange, label, placeholder }) {
  const buttonStyle = {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
  }

  return (
    <TextField
      sx={buttonStyle}
      className="input"
      type="text"
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      InputLabelProps={{
        style: { color: "white" },
      }}
      InputProps={{
        style: { color: "white", borderColor: "white" },
      }}
      inputProps={{ style: { color: "white" } }}
    />
  )
}
