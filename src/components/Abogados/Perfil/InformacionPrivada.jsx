import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

import { useTranslation } from "react-i18next";
import { getStates, getCities } from "@/services/geolocation";

export const InformacionPrivada = ({
  formState,
  onInputChange,
  onRadioChange,
}) => {
  const { t } = useTranslation();

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const onShowAlertEstudiante = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: "question",
      confirmButtonColor: "red",
      html: `<p> ${t("profile.form.student-alert")} </p>`,
    });
  };

  const onGetRegions = async () => {
    setRegions(await getStates(formState.perfil?.pais));
  };

  const onGetCities = async () => {
    setCities(
      await getCities(formState.perfil?.pais, formState.perfil?.region)
    );
  };

  useEffect(() => {
    onGetRegions();
  }, [formState.perfil?.pais]);

  useEffect(() => {
    onGetCities();
  }, [formState.perfil?.region]);

  return (
    <div className="card p-3">
      <div className="mb-3 row">
        <div className="col-sm-6">
          <div className="form-floating col-sm-12">
            <input
              type="text"
              placeholder="Ej: ABC123"
              className="form-control"
              minLength={3}
              name="perfil"
              onChange={(evt) => onInputChange(evt, "tarjeta_profesional")}
              value={formState.perfil?.tarjeta_profesional || ""}
            />
            <label htmlFor="staticEmail">
              {" "}
              {t("profile.form.professional-card")} :
            </label>
          </div>
        </div>
        <div className="col-sm-6">
          <label htmlFor="staticEmail">
            {t("profile.form.student")}
            <button className="btn" onClick={onShowAlertEstudiante}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </button>
          </label>
          <div className="form-floating col-sm-12">
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                value="S"
                name="perfil"
                onChange={(evt) => onRadioChange(evt, "estudiante")}
                checked={
                  formState.perfil && formState.perfil?.estudiante === "S"
                }
              />
              <label className="form-check-label" htmlFor="inlineCheckbox1">
                {" "}
                {t("profile.form.yes")}{" "}
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                value="S"
                name="perfil"
                onChange={(evt) => onRadioChange(evt, "decreto176")}
                checked={
                  formState.perfil && formState.perfil?.decreto176 === "S"
                }
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                {" "}
                {t("profile.form.law-student")}{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-6 mb-3">
          <div className="form-floating col-sm-12">
            <select
              required
              className="form-control"
              name="perfil"
              value={formState.perfil?.region || ""}
              onChange={(evt) => onInputChange(evt, "region")}
            >
              <option value=""> {t("profile.form.chose")}</option>

              {regions.map((item, key) => {
                return (
                  <option key={key} value={item.name}>
                    {" "}
                    {item.name}{" "}
                  </option>
                );
              })}
            </select>
            <label htmlFor="staticEmail"> {t("profile.form.region")} *</label>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-floating col-sm-12">
            <select
              required
              className="form-control"
              name="perfil"
              value={formState.perfil?.ciudad || ""}
              onChange={(evt) => onInputChange(evt, "ciudad")}
            >
              <option value=""> {t("profile.form.chose")}</option>

              {cities.map((item, key) => {
                return (
                  <option key={key} value={item.name}>
                    {" "}
                    {item.name}{" "}
                  </option>
                );
              })}
            </select>
            <label htmlFor="staticEmail"> {t("profile.form.city")} *</label>
          </div>
        </div>
      </div>
      <div className="mb-3 row">
        <div className="col-sm-6 mb-3">
          <div className="form-floating col-sm-12">
            <span className="form-control"> {formState.email} </span>
            <label htmlFor="staticEmail"> {t("profile.form.email")} *</label>
          </div>
        </div>
        <div className="form-floating col-sm-6">
          <input
            type="number"
            placeholder="Ej: 12345679"
            required
            className="form-control"
            name="perfil"
            value={formState.perfil?.telefono || ""}
            onChange={(evt) => onInputChange(evt, "telefono")}
          />
          <label htmlFor="staticEmail"> {t("profile.form.phone")} *</label>
        </div>
      </div>
      <div className="my-4 row ms-2">
        <div className="form-check form-switch align-items-center d-flex">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            name="perfil"
            onChange={(evt) => onRadioChange(evt, "cuenta")}
            value="I"
            checked={formState.perfil && formState.perfil?.cuenta === "I"}
          />
          <label
            className="form-check-label ms-2"
            htmlFor="flexSwitchCheckDefault"
          >
            {" "}
            {t("profile.form.inactive")}{" "}
          </label>
        </div>
      </div>
    </div>
  );
};
