import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Container, Box, Typography, Grid, Slider, Input } from "@mui/material";
import { TextField } from "@mui/material";
import Footer from "../components/Footer";
import { useState } from "react";
import * as V from "victory";
import { VictoryPie, VictoryTooltip } from "victory";

export default function Calculator() {
  const [value, setValue] = useState({ loanAmount: 0, year: 30, interestRate: 2 });
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0);
  const [totalInterestIncurred, setTotalInterestIncurred] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  const handleLoanAmount = (event) => {
    setValue((prevValue) => ({ ...prevValue, loanAmount: event.target.value }));
  };

  const handleSliderChange = (event, newValue) => {
    if (event.target.name === "sliderLoanYears") {
      setValue((prevValue) => ({ ...prevValue, year: newValue }));
    } else if (event.target.name === "sliderInterestRate") {
      setValue((prevValue) => ({ ...prevValue, interestRate: newValue }));
    }
  };

  const handleInputChange = (event) => {
    if (event.target.name === "inputLoanYears") {
      setValue((prevValue) => ({ ...prevValue, year: event.target.value === "" ? 0 : Number(event.target.value) }));
    } else if (event.target.name === "inputInterestRate") {
      setValue((prevValue) => ({
        ...prevValue,
        interestRate: event.target.value === "" ? 0 : Number(event.target.value),
      }));
    }
  };

  const handleBlur = (event) => {
    if (event.target.name === "inputLoanYears") {
      if (value.year < 0) {
        setValue((prevValue) => ({ ...prevValue, year: 0 }));
      } else if (value.year > 50) {
        setValue((prevValue) => ({ ...prevValue, year: 50 }));
      }
    } else if (event.target.name === "inputInterestRate") {
      if (value.interestRate < 0.1) {
        setValue((prevValue) => ({ ...prevValue, interestRate: 0.1 }));
      } else if (value.interestRate > 6) {
        setValue((prevValue) => ({ ...prevValue, interestRate: 6 }));
      }
    }
  };
  console.log(value);
  const calculate = () => {
    const P = parseFloat(value.loanAmount);
    const r = parseFloat(value.interestRate) / 12 / 100;
    const n = parseInt(value.year) * 12;
    const M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(M.toFixed(2));

    // Calculate total interest per year
    const principalRepaidFirstYear = M * 12 - (P * r + (P * r * Math.pow(1 + r, n - 1)) / (Math.pow(1 + r, n) - 1));
    const interestFirstYear = M * 12 - principalRepaidFirstYear;

    // setTotalInterestPerYear(interestFirstYear.toFixed(2));
    console.log(interestFirstYear.toFixed(2));

    // Calculate total interest incurred
    const totalPayments = M * n;
    const totalInterest = totalPayments - P;

    setTotalInterestIncurred(totalInterest.toFixed(2));

    setTotalMonthlyPayment((n * M).toFixed(2));
    console.log(n);
    setPaymentCount(n);
  };

  useEffect(() => {
    calculate();
  }, [value]);

  return (
    <>
      <NavBar></NavBar>
      <Box
        backgroundColor="#f5f5f5"
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography fontSize={40} sx={{ fontWeight: 500, color: "#3f51b5" }}>
          Mortgage Calculator
        </Typography>
        <Typography sx={{ mt: 3 }}>
          Use this calculator to estimate the monthly repayments for your dream flat.
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 10, mx: "auto" }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography fontSize={25} sx={{ fontWeight: 500, color: "#3f51b5" }}>
              Your Mortgage
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Loan Amount</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="$"
              sx={{ width: "60%" }}
              onChange={handleLoanAmount}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Loan Tenure (in years)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={typeof value.year === "number" ? value.year : 1}
              onChange={handleSliderChange}
              max={50}
              name="sliderLoanYears"
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              value={value.year}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              name="inputLoanYears"
              inputProps={{
                step: 1,
                min: 0,
                max: 50,
                type: "number",
              }}
              sx={{ width: "60%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Interest Rate (%)</Typography>
          </Grid>
          <Grid item xs={8}>
            <Slider
              value={typeof value.interestRate === "number" ? value.interestRate : 1}
              onChange={handleSliderChange}
              step={0.1}
              max={6}
              name="sliderInterestRate"
            />
          </Grid>
          <Grid item xs={2}>
            <Input
              value={value.interestRate}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              name="inputInterestRate"
              inputProps={{
                step: 1,
                min: 0.1,
                max: 6,
                type: "number",
              }}
              sx={{ width: "60%" }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={25} sx={{ fontWeight: 500, color: "#3f51b5" }}>
              Mortgage payment breakdown
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <VictoryPie
              colorScale={["navy", "cyan"]}
              data={[
                { x: "Interest", y: totalInterestIncurred },
                { x: "Principal", y: value.loanAmount },
              ]}
            />
            {/* <VictoryLabel text={`Interest: ${totalInterestIncurred}`} />
            <VictoryLabel text={`Principal: ${value.loanAmount}`} /> */}
          </Grid>
          <Grid item xs={2} style={{ borderRight: "1px solid gray", minHeight: "300px" }}></Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column" gap={2} height="100%" justifyContent="center">
              <Typography fontSize={18}>Monthly Payment</Typography>
              <Typography fontSize={20} fontWeight={600} color="primary">
                $ {monthlyPayment}
              </Typography>

              <Typography fontSize={18}>Total Payment you pay in {paymentCount} payments</Typography>
              <Typography fontSize={20} fontWeight={600} color="primary">
                $ {totalMonthlyPayment}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={2} height="100%" justifyContent="center">
              <Typography fontSize={18}>Total Interest</Typography>
              <Typography fontSize={20} fontWeight={600} color="primary">
                $ {totalInterestIncurred}
              </Typography>
              <Typography fontSize={18}>Principal</Typography>
              <Typography fontSize={20} fontWeight={600} color="primary">
                $ {value.loanAmount}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </>
  );
}
