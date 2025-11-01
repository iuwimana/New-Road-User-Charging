import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { FcDownload } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";
import * as BankStatement from "../../../services/RevenuRessources/Bankstatementservice";
import * as Advices from "../../../services/RevenuRessources/nfradviceservices";
import "./collection.css";

const NFRAdvicenotinPaymentReceipt = () => {
  const [sources, setSources] = useState([]);
  const [fiscalYearId, setFiscalYearId] = useState(null);
  const [recordNumber, setRecordNumber] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(30);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await FiscalYear.getFiscalyears();
        const years = response?.data ?? [];

        if (years.length === 0) {
          setError("No Fiscal Year found.");
          return;
        }

        const yearId = years[0].fiscalyearid;
        setFiscalYearId(yearId);

        const [sourcesRes, recordRes, totalRes] = await Promise.all([
          BankStatement.getnfrnotinbankstatementbyfiscalyear(yearId),
          BankStatement.getdeclarationnumber(yearId),
          BankStatement.getdeclarationaount(yearId),
        ]);

        setSources(sourcesRes.data ?? []);
        setRecordNumber(recordRes.data?.[0]?.recordnumber ?? 0);
        setTotalPayment(totalRes.data?.[0]?.totalpayment ?? 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!id) return toast.info("Invalid record selected.");
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await Advices.deletenfradvice(id);
      setSources((prev) => prev.filter((item) => item.nfradviceid !== id));
      toast.success("Record deleted successfully.");
    } catch (err) {
      const message = err.response?.data ?? "Failed to delete record.";
      toast.error(message);
    }
  };

  const handleExport = async (type) => {
    if (!fiscalYearId) return toast.error("Fiscal Year not found.");

    try {
      setExporting(true);
      if (type === "pdf") {
        await BankStatement.exportnfrnotinbankToPDF(fiscalYearId);
      } else {
        await BankStatement.exportnfrnotinbankToExcel(fiscalYearId);
      }
      toast.success(`Exported successfully to ${type.toUpperCase()}`);
    } catch (err) {
      console.error("Export failed:", err);
      toast.error(`Failed to export to ${type.toUpperCase()}`);
    } finally {
      setExporting(false);
      setExportMenuOpen(false);
    }
  };

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const filtered = sources.filter(
      (m) =>
        m.revenueproductname?.toLowerCase().includes(q) ||
        m.paymentmodename?.toLowerCase().includes(q) ||
        m.sourceoffundname?.toLowerCase().includes(q) ||
        m.accountnumber?.toLowerCase().includes(q) ||
        m.name?.toLowerCase().includes(q) ||
        m.advice?.toLowerCase().includes(q) ||
        m.taxcenter?.toLowerCase().includes(q) ||
        m.bankname?.toLowerCase().includes(q) ||
        m.paymentdate?.toLowerCase().includes(q)
    );
    return _.orderBy(filtered, ["revenueproductname"], ["asc"]);
  }, [sources, searchQuery]);

  const paginatedData = paginate(filteredData, currentPage, pageSize);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading data...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">{error}</div>
    );

  return (
    <div className="container-fluid mt-3">
      <Col>
        <Card className="shadow border-0">
          <CardHeader className="d-flex justify-content-between align-items-center bg-light">
            <h6 className="mb-0">Record #: {recordNumber}</h6>
            <h5 className="text-primary text-center mb-0">
              NFR Advice not in Payment Receipt
            </h5>
            <h6 className="mb-0">Total Payment: {totalPayment}</h6>
          </CardHeader>

          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div className="dropdown">
                <button
                  className="btn btn-info dropdown-toggle"
                  onClick={() => setExportMenuOpen((p) => !p)}
                  disabled={exporting}
                >
                  <FcDownload className="me-2" />
                  {exporting ? "Exporting..." : "Download"}
                </button>

                {exportMenuOpen && (
                  <div className="dropdown-menu show">
                    <button
                      className="dropdown-item"
                      onClick={() => handleExport("excel")}
                    >
                      Export to Excel
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleExport("pdf")}
                    >
                      Export to PDF
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                className="form-control w-auto"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            {filteredData.length === 0 ? (
              <p className="text-center text-muted">No records found.</p>
            ) : (
              <div className="table-responsive" style={{ maxHeight: 400 }}>
                <table className="table table-striped table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Product</th>
                      <th>Advice</th>
                      <th>Tax Center</th>
                      <th>Name</th>
                      <th>Service Period</th>
                      <th>Deposit</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr key={item.nfradviceid}>
                        <td>{item.revenueproductname}</td>
                        <td>{item.advice}</td>
                        <td>{item.taxcenter}</td>
                        <td>{item.name}</td>
                        <td>{item.paymentdate}</td>
                        <td>{item.amount}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.nfradviceid)}
                          >
                            <AiFillDelete /> Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-3">
              <Pagination
                itemsCount={filteredData.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default NFRAdvicenotinPaymentReceipt;
