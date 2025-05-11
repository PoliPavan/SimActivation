import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SimCardIcon from "@mui/icons-material/SimCard";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "All Customer",
    icon: <PersonIcon />,
    route: "/all-customers",
  },
  {
    label: "Validate Sim",
    icon: <SimCardIcon />,
    route: "/validate-sim",
  },
  {
    label: "Validate Customer",
    icon: <HowToRegIcon />,
    route: "/validate-customer",
  },
  {
    label: "Validate Customer Details",
    icon: <InfoIcon />,
    route: "/validate-customer-details",
  },
  {
    label: "Validate ID Proof",
    icon: <HomeIcon />,
    route: "/validate-id-proof",
  },
  {
    label: "Show Special Offers",
    icon: <LocalOfferIcon />,
    route: "/special-offers",
  },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: "#002b45",
        color: "white",
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.route}
            style={() => ({
              textDecoration: "none",
            })}
          >
            {({ isActive }) => (
              <ListItemButton
                sx={{
                  color: "white",
                  bgcolor: isActive ? "#4a5c6a" : "transparent",
                  "&:hover": {
                    bgcolor: "#3b4f5e",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={<Typography fontSize={14}>{item.label}</Typography>}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </Box>
  );
};

export { Sidebar };
