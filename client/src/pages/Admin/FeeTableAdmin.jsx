import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../store/auth";
import "./feetableadmin.css";
import {
  calculateTotalAmount,
  defaultFeeStructure,
  FEE_STRUCTURE_API,
  normalizeFeeStructure,
} from "../../components/feecard/feeStructureData";

const feeFields = [
  { name: "messadv", label: "Mess Advance", note: "Per semester" },
  { name: "seatrent", label: "Seat Rent", note: "Room rent" },
  { name: "electricityfee", label: "Electricity Fee", note: "Utility charges" },
  { name: "devfee", label: "Development Fee", note: "One time" },
  { name: "cmoney", label: "Caution Money", note: "Refundable" },
  { name: "comcharge", label: "Common Room Charge", note: "Shared facility" },
];

const asINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const FeeTableAdmin = () => {
  const { token } = useAuth();
  const [feeStructure, setFeeStructure] = useState(defaultFeeStructure);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = useMemo(
    () => calculateTotalAmount(feeStructure),
    [feeStructure]
  );

  const fetchFeeStructure = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(FEE_STRUCTURE_API);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load fee structure.");
      }

      setFeeStructure(normalizeFeeStructure(data));
    } catch (err) {
      setError(err.message);
      setFeeStructure(defaultFeeStructure);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeeStructure();
  }, [fetchFeeStructure]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFeeStructure((currentValue) => ({
      ...currentValue,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const saveFeeStructure = async () => {
      setSaving(true);
      setError("");

      try {
        const res = await fetch(FEE_STRUCTURE_API, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(normalizeFeeStructure(feeStructure)),
        });
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(data?.message || "Failed to save fee structure.");
        }

        setFeeStructure(normalizeFeeStructure(data));
        toast.success("Fee structure updated successfully.");
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setSaving(false);
      }
    };

    saveFeeStructure();
  };

  const handleReset = () => {
    setFeeStructure(defaultFeeStructure);
  };

  return (
    <div className="fta-page">
      <div className="fta-shell">
        <div className="fta-header">
          <div>
            <h1>Fee Table</h1>
            <p>Manage the hostel fee structure shown to students.</p>
          </div>
          <div className="fta-total-card">
            <span>Total Fee</span>
            <strong>{asINR(totalAmount)}</strong>
          </div>
        </div>

        <div className="fta-grid">
          {loading ? (
            <div className="fta-loading">Loading fee structure...</div>
          ) : (
            <form className="fta-form" onSubmit={handleSubmit}>
              {feeFields.map((field) => (
                <div key={field.name} className="fta-field">
                  <label htmlFor={field.name}>{field.label}</label>
                  <span>{field.note}</span>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min="0"
                    step="1"
                    value={feeStructure[field.name]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="fta-actions">
                <button
                  type="submit"
                  className="fta-save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Fee Structure"}
                </button>
                <button
                  type="button"
                  className="fta-reset-btn"
                  onClick={handleReset}
                  disabled={saving}
                >
                  Reset Default
                </button>
              </div>
            </form>
          )}

          <div className="fta-preview">
            <h2>Preview</h2>
            {error && <div className="fta-error">{error}</div>}
            <div className="fta-preview-list">
              {feeFields.map((field) => (
                <div key={field.name} className="fta-preview-row">
                  <span>{field.label}</span>
                  <strong>{asINR(Number(feeStructure[field.name] || 0))}</strong>
                </div>
              ))}
            </div>
            <div className="fta-preview-total">
              <span>Total Amount</span>
              <strong>{asINR(totalAmount)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeTableAdmin;
