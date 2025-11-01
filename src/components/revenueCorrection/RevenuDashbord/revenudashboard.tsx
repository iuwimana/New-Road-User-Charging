import React, { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";
import { toast } from "react-toastify";
import { MdDashboard } from "react-icons/md";
import { FcCurrencyExchange } from "react-icons/fc";
import jsPDF from "jspdf";
import "jspdf-autotable";
import _ from "lodash";

import * as Source from "../../../services/RevenuRessources/revenuCorrectionService";
import * as RevProdData from "../../../services/RevenuRessources/revenuPaymentServices";
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";

import ListGroup from "../../common/listGroup";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";

const RevenuDashboard = () => {
  // States
  const [fiscalYearId, setFiscalYearId] = useState<number>(0);
  const [fiscalYears, setFiscalYears] = useState<any[]>([]);
  const [revProducts, setRevProducts] = useState<any[]>([]);
  const [sources, setSources] = useState<any[]>([]);
  const [narative, setNarative] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 4;
  const tableRef = useRef<HTMLTableElement>(null);

  // Load fiscal years + revenue products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fyResponse = await FiscalYear.getFiscalyears();
        let fiscalYears: any[] = [];

        if (fyResponse && typeof fyResponse === "object" && "data" in fyResponse) {
          fiscalYears = fyResponse.data;
        } else {
          console.warn("Unexpected fiscal year response:", fyResponse);
        }

        const firstYearId = fiscalYears.length ? fiscalYears[0].fiscalyearid : 0;
        setFiscalYears(fiscalYears);
        setFiscalYearId(firstYearId);

        const revResponse = await RevProdData.getrevenupaymentByFiscalyear(firstYearId);
        let revProducts: any[] = [];

        if (revResponse && typeof revResponse === "object" && "data" in revResponse) {
          revProducts = revResponse.data;
        } else {
          console.warn("Unexpected revenue payment response:", revResponse);
        }

        setRevProducts([{ revenueproductname: "All Products", revenuepaymentid: 0 }, ...revProducts]);
      } catch (err) {
        toast.error("Error loading data: " + err);
      }
    };

    fetchData();
  }, []);

  // Fetch revenue corrections and narrative summary
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        if (!fiscalYearId) return;

        const revResponse = await Source.getrevenucorrectionByFiscalYearID(fiscalYearId);
        let sources: any[] = [];

        if (revResponse && typeof revResponse === "object" && "data" in revResponse) {
          sources = revResponse.data;
        } else {
          console.warn("Unexpected response:", revResponse);
        }

        let filteredSources = sources;

        // Filter by date range
        if (startDate && endDate) {
          filteredSources = sources.filter((s: any) => {
            const date = new Date(s.correctiondate);
            return date >= new Date(startDate) && date <= new Date(endDate);
          });
        }

        // Filter by selected product
        if (selectedProduct && selectedProduct.revenuepaymentid !== 0) {
          filteredSources = filteredSources.filter(
            (s: any) => s.revenueproductid === selectedProduct.revenuepaymentid
          );
        }

        setSources(filteredSources);

        // Fetch narrative summary
        const response = await Source.getnarativedashboardrevenuecorrection(
          selectedProduct?.revenueproductid || 0,
          startDate || "1000-01-01",
          endDate || "3000-01-01",
          fiscalYearId
        );

        if (response && typeof response === "object" && "data" in response) {
          setNarative(response.data);
        } else {
          console.warn("Unexpected response:", response);
          setNarative([]);
        }

        const total = filteredSources.reduce((sum: number, s: any) => sum + (s.deposit || 0), 0);
        setTotalDeposit(total);
      } catch (err) {
        toast.error("Error loading dashboard data: " + err);
      }
    };

    fetchRevenueData();
  }, [fiscalYearId, selectedProduct, startDate, endDate]);

  // Pagination logic
  const { totalCount, data: pagedSources } = (() => {
    const sorted = _.orderBy(sources, ["correctiondate"], ["desc"]);
    const paginated = paginate(sorted, currentPage, pageSize);
    return { totalCount: sorted.length, data: paginated };
  })();

  // Print PDF
  const handlePrintPDF = () => {
    if (!sources.length) {
      toast.info("No data to export.");
      return;
    }

    const doc = new jsPDF("p", "pt");
    doc.setFontSize(14);
    doc.text("Revenue Collection Report", 40, 40);

    const body = sources.map((s) => [
      s.revenueproductname,
      s.sourceoffundname,
      s.accountnumber,
      s.bankname,
      s.correctiondate,
      new Intl.NumberFormat().format(s.deposit),
    ]);

    (doc as any).autoTable({
      startY: 60,
      head: [["Revenue Product", "Source", "Account", "Bank", "Date", "Deposit (Rwf)"]],
      body,
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("Revenue_Report.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            <MdDashboard size={28} />
            <h3 className="text-lg font-semibold">Revenue Collection Dashboard</h3>
          </div>
          <span className="text-sm italic">Fiscal Year: {fiscalYearId}</span>
        </CardHeader>

        <CardBody className="p-6 bg-gray-50">
          {/* Filters + Summary + Print Button */}
          <div className="flex flex-wrap md:flex-nowrap items-end justify-between gap-4 mb-6">
            {/* Product filter */}
            <div className="flex-1 min-w-[180px]">
              <label className="text-sm font-medium block mb-1">Revenue Product</label>
              <ListGroup
                items={revProducts}
                textProperty="revenueproductname"
                valueProperty="revenuepaymentid"
                selectedItem={selectedProduct}
                onItemSelect={setSelectedProduct}
              />
            </div>

            {/* Date range */}
            <div className="flex items-center gap-3">
              <div>
                <label className="text-sm font-medium block mb-1">From</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">To</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Total summary */}
            <div className="bg-white rounded-xl shadow p-4 text-center min-w-[180px]">
              <span className="font-semibold text-gray-700 block">Total Collected</span>
              <FcCurrencyExchange size={26} className="mx-auto mt-1" />
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {new Intl.NumberFormat().format(totalDeposit)} Rwf
              </p>
            </div>

            {/* Print button */}
            <div className="text-right min-w-[120px]">
              <button
                onClick={handlePrintPDF}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
              >
                Print PDF
              </button>
            </div>
          </div>

          {/* Narrative cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {narative.map((n, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4">
                <p className="font-semibold text-gray-700">Bank: {n.bankname}</p>
                <p className="text-sm text-gray-500">Account: {n.accountnumber}</p>
                <p className="text-sm text-gray-500">
                  Amount: {new Intl.NumberFormat().format(n.totalamount)} Rwf
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table ref={tableRef} className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2">Revenue Product</th>
                  <th className="p-2">Source of Fund</th>
                  <th className="p-2">Account</th>
                  <th className="p-2">Bank</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Deposit</th>
                </tr>
              </thead>
              <tbody>
                {pagedSources.map((s) => (
                  <tr key={s.revenuecorrectionid}>
                    <td className="p-2">{s.revenueproductname}</td>
                    <td className="p-2">{s.sourceoffundname}</td>
                    <td className="p-2">{s.accountnumber}</td>
                    <td className="p-2">{s.bankname}</td>
                    <td className="p-2">{s.correctiondate}</td>
                    <td className="p-2">{new Intl.NumberFormat().format(s.deposit)} Rwf</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RevenuDashboard;
