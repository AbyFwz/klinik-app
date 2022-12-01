import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Login,
  Dashboard,
  ViewDokter,
  NotFound,
  AddDokter,
  JadwalOperasi,
  Kasir,
  ProsesInvoice,
  EditInvoice,
  Pembayaran,
  History,
  Deposit,
  ViewJenisTindakan,
  Invoice,
} from "../pages";

export default function index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route
          path="/home"
          exact
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/view-dokter"
          exact
          element={
            <MainLayout>
              <ViewDokter />
            </MainLayout>
          }
        />
        <Route
          path="/add-dokter"
          exact
          element={
            <MainLayout>
              <AddDokter />
            </MainLayout>
          }
        />
        <Route
          path="/jadwal"
          exact
          element={
            <MainLayout>
              <JadwalOperasi />
            </MainLayout>
          }
        />
        <Route
          path="/kasir"
          exact
          element={
            <MainLayout>
              <Kasir />
            </MainLayout>
          }
        />

        <Route
          path="/invoice"
          exact
          element={
            <MainLayout>
              <Invoice />
            </MainLayout>
          }
        />

        <Route
          path="/proses-invoice"
          exact
          element={
            <MainLayout>
              <ProsesInvoice />
            </MainLayout>
          }
        />

        <Route
          path="/ubah-invoice"
          exact
          element={
            <MainLayout>
              <EditInvoice />
            </MainLayout>
          }
        />

        <Route
          path="/pembayaran"
          exact
          element={
            <MainLayout>
              <Pembayaran />
            </MainLayout>
          }
        />

        <Route
          path="/invoices"
          exact
          element={
            <MainLayout>
              <Invoice />
            </MainLayout>
          }
        />

        <Route
          path="/history-transaksi"
          exact
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        />

        <Route
          path="/deposit"
          exact
          element={
            <MainLayout>
              <Deposit />
            </MainLayout>
          }
        />

        <Route
          path="/view-jenis-tindakan"
          exact
          element={
            <MainLayout>
              <ViewJenisTindakan />
            </MainLayout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
