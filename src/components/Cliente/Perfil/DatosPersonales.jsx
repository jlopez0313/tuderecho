import { useEffect, useRef, useState } from "react";
import Avatar from "@/assets/images/abogado/perfil/avatar.png";
import "./Perfil.scss";
import { tipoDocumentos } from "@/constants/constants";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { getCountries, getStates, getCities } from "@/services/geolocation";


export const DatosPersonales = ({
  formState,
  onInputChange,
  onRadioChange,
}) => {
  const { t } = useTranslation();

  const image = useRef(null);

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  
  const onGetLists = async () => {
    setCountries(await getCountries());
  };

  const onGetRegions = async () => {
    setRegions(await getStates(formState.perfil?.pais));
  };

  const onGetCities = async () => {
    setCities(
      await getCities(formState.perfil?.pais, formState.perfil?.region)
    );
  };

  const onClickImage = () => {
    image.current?.click();
  };

  const onUploadImage = (evt) => {
    const reader = new FileReader();
    reader.readAsDataURL(evt.target.files[0]);
    reader.onload = function (event) {
      const myEvent = {
        target: { name: "perfil", value: event.target.result },
      };
      onInputChange(myEvent, "photo");
    };
    reader.onerror = function () {
      notify("No se pudo cargar la imágen", "error");
    };
  };

  useEffect(() => {
    onGetLists();
  }, []);

  useEffect(() => {
    onGetRegions();
  }, [formState.perfil?.pais]);

  useEffect(() => {
    onGetCities();
  }, [formState.perfil?.region]);

  return (
    <div className="card p-3 my-4">
      <div className="row">
        <div className="col-sm-3 mb-3 text-center">
          <div
            style={{
              backgroundImage: `url(${formState.perfil?.photo || Avatar})`,
            }}
            className="avatar-container m-auto d-flex justify-content-center align-items-center cursor-pointer"
            onClick={onClickImage}
          >
            <div className="upload-image">
              <FontAwesomeIcon icon={faCamera} />
              <span className="mt-2 upload-text"> Upload Photo</span>
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="d-none"
              ref={image}
              onChange={onUploadImage}
            />
          </div>
        </div>
        <div className="col-sm-9">
          <div className="form-floating mb-2">
            <select
              required
              className="form-select"
              name="perfil"
              value={formState.perfil?.tipoDoc || ""}
              onChange={(evt) => onInputChange(evt, "tipoDoc")}
              id="floatingSelect"
            >
              <option value=""> {t("profile.form.chose")} </option>
              {tipoDocumentos.map((tipo, key) => {
                return (
                  <option value={tipo.key} key={key}>
                    {tipo.value}
                  </option>
                );
              })}
            </select>
            <label htmlFor="especialidad">
              {" "}
              {t("profile.form.document")} *
            </label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="number"
              placeholder={t("profile.form.id-placeholder")}
              required
              className="form-control"
              name="perfil"
              defaultValue={formState.perfil?.identificacion || ""}
              onChange={(evt) => onInputChange(evt, "identificacion")}
            />
            <label htmlFor="staticEmail"> {t("profile.form.id")} *</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              required
              placeholder={t("profile.form.name-placeholder")}
              className="form-control"
              name="name"
              value={formState.name}
              onChange={onInputChange}
            />
            <label htmlFor="staticEmail"> {t("profile.form.name")} *</label>
          </div>
          <div className="form-floating mb-2">
            <select
              required
              className="form-control"
              name="perfil"
              value={formState.perfil?.pais || ""}
              onChange={(evt) => onInputChange(evt, "pais")}
            >
              <option value=""> {t("profile.form.chose")}</option>

              {countries.map((item, key) => {
                return (
                  <option key={key} value={item.name}>
                    {" "}
                    {item.name}{" "}
                  </option>
                );
              })}
            </select>
            <label htmlFor="staticEmail"> {t("profile.form.country")} *</label>
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
            <label htmlFor="staticEmail">{t("profile.form.city")} *</label>
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
            defaultValue={formState.perfil?.telefono || ""}
            onChange={(evt) => onInputChange(evt, "telefono")}
          />
          <label htmlFor="staticEmail"> {t("profile.form.phone")} *</label>
        </div>
      </div>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Cuéntanos sobre tí"
          required
          name="perfil"
          onChange={(evt) => onInputChange(evt, "biografia")}
          value={formState.perfil?.biografia || ""}
        ></textarea>
        <label htmlFor="staticEmail"> {t("profile.form.biography")} *</label>
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
            checked={formState.perfil && formState.perfil.cuenta === "I"}
          />
          <label
            className="form-check-label ms-2"
            htmlFor="flexSwitchCheckDefault"
          >
            {" "}
            {t("profile.form.inactive")}
          </label>
        </div>
      </div>
    </div>
  );
};
