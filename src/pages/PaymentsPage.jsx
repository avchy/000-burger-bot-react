import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
  },
});

function PaymentsPage() {
  const classes = useStyles();
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className={classes.container}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose Payment Method:</FormLabel>
        <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
          <FormControlLabel value="googlePay" control={<Radio />} label="Google Pay" />
          <FormControlLabel value="applePay" control={<Radio />} label="Apple Pay" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default PaymentsPage;
