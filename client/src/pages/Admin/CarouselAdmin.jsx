import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./carouseladmin.css";

const API = "http://localhost:3000/api/carousel";

const CarouselAdmin = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API);
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to load carousel images.");
      }

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setError("Please choose an image to upload.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", imageFile);

      const res = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to upload carousel image.");
      }

      setItems((prev) => [...prev, data]);
      setTitle("");
      setImageFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this carousel image?")) {
      return;
    }

    setError("");

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete carousel image.");
      }

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="carousel-admin-page">
      <div className="carousel-admin-shell">
        <div className="carousel-admin-header">
          <div>
            <span className="carousel-eyebrow">Homepage Media</span>
            <h1>Carousel Management</h1>
            <p>Upload, preview, and remove the images shown in the home page carousel.</p>
          </div>
          <div className="carousel-admin-count">
            <span>Total Slides</span>
            <strong>{items.length}</strong>
          </div>
        </div>

        {error ? <div className="carousel-error">{error}</div> : null}

        <div className="carousel-admin-grid">
          <form className="carousel-admin-form" onSubmit={handleSubmit}>
            <div className="carousel-form-head">
              <span className="carousel-section-label">Upload Slide</span>
              <h2>Add Carousel Image</h2>
            </div>

            <div className="carousel-field">
              <label htmlFor="carousel-title">Image Title</label>
              <input
                id="carousel-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="carousel-input"
                placeholder="Optional title for admin reference"
              />
            </div>

            <div className="carousel-field">
              <label htmlFor="carousel-image">Choose Image</label>
              <input
                id="carousel-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="carousel-input carousel-file-input"
              />
            </div>

            {previewUrl ? (
              <div className="carousel-preview">
                <img src={previewUrl} alt="Carousel preview" />
              </div>
            ) : null}

            <button type="submit" className="carousel-submit" disabled={submitting}>
              {submitting ? "Uploading..." : "Upload Image"}
            </button>
          </form>

          <div className="carousel-admin-list-wrap">
            <div className="carousel-list-head">
              <span className="carousel-section-label">Current Slides</span>
              <h2>Carousel Preview</h2>
            </div>

            <div className="carousel-admin-list">
              {loading ? (
                <div className="carousel-empty">Loading carousel images...</div>
              ) : items.length === 0 ? (
                <div className="carousel-empty">No carousel images added yet.</div>
              ) : (
                items.map((item) => (
                  <div key={item._id} className="carousel-card">
                    <img
                      src={item.imageUrl}
                      alt={item.title || "Carousel slide"}
                      className="carousel-card-image"
                    />
                    <div className="carousel-card-copy">
                      <h3>{item.title || "Untitled slide"}</h3>
                      <p>{item.image?.fileName || "Stored in database"}</p>
                    </div>
                    <button
                      type="button"
                      className="carousel-delete"
                      onClick={() => handleDelete(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselAdmin;
