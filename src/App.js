import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./components/Login";
import { Member } from "./pages/Member";
import { AddMember } from "./pages/AddMember";
import { TopupMember } from "./pages/TopupMember";
import { Transaksi } from "./pages/Transaksi";
import { Register } from "./components/Register";
import { TrxTopUp } from "./pages/TrxTopUp";
import { Balance } from "./pages/Balance";
import { Transfer } from "./pages/Transfer";
import { OverallTrx } from "./pages/OverallTrx";
import { TopTrx } from "./pages/TopTrx";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route path="/dashboard_chart" element={<AdminDashboard/>}/>
          <Route path="/member" element={<Member/>}/>
          <Route path="/member/add" element={<AddMember/>}/>
          <Route path="/member/topup/:username" element={<TopupMember/>}/>
          <Route path="/transaksi" element={<Transaksi/>}/>

          <Route path="/balance" element={<Balance/>}/>
          <Route path="/topup" element={<TrxTopUp/>}/>
          <Route path="/transfer" element={<Transfer/>}/>
          <Route path="/top_transactions" element={<TopTrx/>}/>
          <Route path="/top_user" element={<OverallTrx/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;