import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

const offers = [
  {
    price: "₹99",
    data: "1.5 GB/day data & Unlimited calls",
    sms: "100 SMS per Day",
    validity: "28 days validity",
    benefits: "VI Movies & TV, Data Rollover, Night Binge subscriptions free",
  },
  {
    price: "₹149",
    data: "2 GB/day data & Unlimited calls",
    sms: "100 SMS per Day",
    validity: "30 days validity",
    benefits: "VI Movies & TV, Data Rollover, Night Binge subscriptions free",
  },
  {
    price: "₹299",
    data: "3 GB/day data & Unlimited calls",
    sms: "100 SMS per Day",
    validity: "60 days validity",
    benefits: "VI Movies & TV, Data Rollover, Night Binge subscriptions free",
  },
];

const highlightText = (text: string, target: string) => {
  const parts = text.split(new RegExp(`(${target})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === target.toLowerCase() ? <b key={i}>{part}</b> : part
  );
};

const CheckSpecialOffers: React.FC = () => {
  const [simNumber, setSimNumber] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [showOffers, setShowOffers] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleCheckOffers = () => {
    const simValid = /^\d{13}$/.test(simNumber);
    const serviceValid = /^\d{10}$/.test(serviceNumber);

    if (!simValid || !serviceValid) {
      setMessage({
        type: "error",
        text: "Please enter valid SIM and Service numbers.",
      });
      setShowOffers(false);
      return;
    }

    if (simNumber === "1111111111111" && serviceNumber === "1111111111") {
      setMessage({ type: "success", text: "Offers successfully loaded!" });
      setShowOffers(true);
    } else {
      setMessage({
        type: "error",
        text: "SIM or Service number mismatch. Please try again.",
      });
      setShowOffers(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Check Special Offers
      </Typography>

      <Paper sx={{ margin: 2, padding: 4 }}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckOffers();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 300,
            margin: "auto auto 20px auto",
          }}
        >
          <TextField
            label="Sim Number"
            variant="outlined"
            value={simNumber}
            onChange={(e) => setSimNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Service Number"
            variant="outlined"
            value={serviceNumber}
            onChange={(e) => setServiceNumber(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="warning"
            sx={{ mt: 2 }}
            type="submit"
          >
            CHECK OFFERS
          </Button>
        </Box>
        {message && (
          <Alert severity={message.type} sx={{ mt: 2 }}>
            {message.text}
          </Alert>
        )}
      </Paper>

      {showOffers && (
        <Box sx={{ display: "flex", gap: "10px" }}>
          {offers.map((offer, index) => (
            <Box
              key={index}
              sx={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" color="error">
                    {offer.price}
                  </Typography>
                  <Typography>
                    {highlightText(offer.data, offer.data.split(" ")[0])}
                  </Typography>
                  <Typography>{highlightText(offer.sms, "100")}</Typography>
                  <Typography>
                    {highlightText(
                      offer.validity,
                      offer.validity.split(" ")[0]
                    )}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" mt={1}>
                    Other Benefits
                  </Typography>
                  <Typography variant="body2" sx={{ color: "purple" }}>
                    {offer.benefits}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export { CheckSpecialOffers };
