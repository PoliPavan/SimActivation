import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./pages/dashboard";
import { ValidateIDProof } from "./pages/valid-id-proof";
import { ValidateCustomerDetails } from "./pages/validate-customer-details";
import { ValidateCustomer } from "./pages/validate-customer";
import { ValidateSim } from "./pages/validate-sim";
import { CustomerTable } from "./components/customer-table";
import { CheckSpecialOffers } from "./pages/show-special-offers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route set to DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Define a default child route (when user visits '/') */}
          <Route index element={<CustomerTable />} /> {/* Default page */}
          <Route path="validate-id-proof" element={<ValidateIDProof />} />
          <Route path="validate-customer-details" element={<ValidateCustomerDetails />} />
          <Route path="validate-customer" element={<ValidateCustomer />} />
          <Route path="validate-sim" element={<ValidateSim />} />
          <Route path="all-customers" element={<CustomerTable />} />
          <Route path="special-offers" element={<CheckSpecialOffers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
