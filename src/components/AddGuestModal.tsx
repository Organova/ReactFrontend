import React, { useState } from "react";

import { Guest } from "@/types/guest";

interface AddGuestModalProps {
  onClose: () => void;
  onAddGuest: (guest: Omit<Guest, "id">) => void;
}

const AddGuestModal: React.FC<AddGuestModalProps> = ({
  onClose,
  onAddGuest,
}) => {
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    rolle: "Gast" as Guest["rolle"],
    status: "Ausstehend" as Guest["status"],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.vorname.trim()) {
      newErrors.vorname = "Vorname ist erforderlich";
    }

    if (!formData.nachname.trim()) {
      newErrors.nachname = "Nachname ist erforderlich";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onAddGuest(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Neuen Gast hinzufügen</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="guest-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="vorname">Vorname *</label>
            <input
              className={errors.vorname ? "input-error" : ""}
              id="vorname"
              name="vorname"
              type="text"
              value={formData.vorname}
              onChange={handleChange}
            />
            {errors.vorname && (
              <span className="error-message">{errors.vorname}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nachname">Nachname *</label>
            <input
              className={errors.nachname ? "input-error" : ""}
              id="nachname"
              name="nachname"
              type="text"
              value={formData.nachname}
              onChange={handleChange}
            />
            {errors.nachname && (
              <span className="error-message">{errors.nachname}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-Mail *</label>
            <input
              className={errors.email ? "input-error" : ""}
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rolle">Rolle</label>
            <select
              id="rolle"
              name="rolle"
              value={formData.rolle}
              onChange={handleChange}
            >
              <option value="Gast">Gast</option>
              <option value="VIP">VIP</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Presenter">Presenter</option>
              <option value="Arbeiter">Arbeiter</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Ausstehend">Ausstehend</option>
              <option value="Zugesagt">Zugesagt</option>
              <option value="Abgesagt">Abgesagt</option>
            </select>
          </div>

          <div className="modal-actions">
            <button className="btn-secondary" type="button" onClick={onClose}>
              Abbrechen
            </button>
            <button className="btn-primary" type="submit">
              Gast hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGuestModal;
