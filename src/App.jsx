import { Routes, Route } from "react-router";

import Dashboard from "./components/layout/Dashboard";
import Sidebar from "./components/layout/Sidebar";

import Overview from "./components/links/Overview";
import Grants from "./components/links/Grants";
import Projects from "./components/links/Projects";
import Purchase from "./components/links/purchaseRequisition/Purchase";
import Contract from "./components/links/contract/Contract";
import ContractDetail from "./components/links/contract/ContractDetail";
import Milestones from "./components/links/Milestones";
import Prf from "./components/links/Prf";
import Approvals from "./components/links/Approvals";
import CreatePurchaseRequisition from "./components/links/purchaseRequisition/CreatePurchaseRequisition";
import PurchaseDetail from "./components/links/purchaseRequisition/PurchaseDetail";
import PurchaseReqCreated from "./components/links/purchaseRequisition/PurchaseReqCreated";
import PRMilestone from "./components/links/purchaseRequisition/PRMilestone";

import { styles } from "./assets/styles";

export default function App() {
  return (
    <div style={styles.layout}>
      <Sidebar />

      <Dashboard>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route
            path="/purchase/createpurchaserequisition"
            element={<CreatePurchaseRequisition />}
          />
          <Route
            path="/purchase/purchasereqsuccess"
            element={<PurchaseReqCreated />}
          />
          <Route path="/purchase/:id" element={<PurchaseDetail />} />
          <Route path="/purchase/:id/milestone" element={<PRMilestone />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/contract/:id" element={<ContractDetail />} />
          <Route path="/milestones" element={<Milestones />} />
          <Route path="/prf" element={<Prf />} />
          <Route path="/approvals" element={<Approvals />} />
        </Routes>
      </Dashboard>
    </div>
  );
}
