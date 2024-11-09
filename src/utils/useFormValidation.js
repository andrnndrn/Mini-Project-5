import { useState } from "react";

const useFormValidation = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [formValidation, setFormValidation] = useState({
    name: { isValid: "", message: "" },
    class: { isValid: "", message: "" },
    year: { isValid: "", message: "" },
    nim: { isValid: "", message: "" },
    guardian_name: { isValid: "", message: "" },
    birthDate: { isValid: "", message: "" },
    address: { isValid: "", message: "" },
  });
  const resetFormValidation = () => {
    setFormValidation({
      name: { isValid: "", message: "" },
      class: { isValid: "", message: "" },
      year: { isValid: "", message: "" },
      nim: { isValid: "", message: "" },
      guardian_name: { isValid: "", message: "" },
      birthDate: { isValid: "", message: "" },
      address: { isValid: "", message: "" },
    });
  };
  const validateField = (name, value) => {
    let validation = { ...formValidation };

    switch (name) {
      case "name":
        validation.name = {
          isValid: value.length >= 3 ? "is-valid" : "is-invalid",
          message:
            value.length >= 3 ? "" : "Name must be at least 3 characters!",
        };
        break;
      case "class":
        validation.class = {
          isValid: value ? "is-valid" : "is-invalid",
          message: value ? "" : "Class is required!",
        };
        break;
      case "year":
        const yearValue = parseInt(value);
        if (!value) {
          validation.year = {
            isValid: "is-invalid",
            message: "Year is required!",
          };
        } else if (yearValue < 2000 || yearValue > 2024) {
          validation.year = {
            isValid: "is-invalid",
            message: "Year must be between 2000 and 2024!",
          };
        } else {
          validation.year = {
            isValid: "is-valid",
            message: "",
          };
        }
        break;
      case "nim":
        validation.nim = {
          isValid: value ? "is-valid" : "is-invalid",
          message: value ? "" : "NIM is required!",
        };
        break;
      case "guardian_name":
        validation.guardian_name = {
          isValid: value.length >= 2 ? "is-valid" : "is-invalid",
          message:
            value.length >= 2
              ? ""
              : "Guardian name must be at least 2 characters!",
        };
        break;
      case "birthDate":
        validation.birthDate = {
          isValid: value ? "is-valid" : "is-invalid",
          message: value ? "" : "Birth date is required!",
        };
        break;
      case "address":
        validation.address = {
          isValid: value.length >= 20 ? "is-valid" : "is-invalid",
          message:
            value.length >= 20 ? "" : "Address must be at least 20 characters!",
        };
        break;
      default:
        break;
    }

    setFormValidation(validation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };

  return {
    formData,
    setFormData,
    formValidation,
    handleChange,
    resetFormValidation,
  };
};

export default useFormValidation;
