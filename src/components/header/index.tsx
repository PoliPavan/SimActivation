import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{ position: "sticky", bgcolor: "#002b45", boxShadow: "none" }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hitachi Sim Activation Portal
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
