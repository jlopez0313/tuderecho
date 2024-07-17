import React, { memo, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../MyModal.scss";
import { notify } from "@/helpers/helpers";
import { create } from "@/services/Casos";
import shared from "@/assets/styles/shared.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { all as getTags } from "@/services/Tags";
import styles from "./Form.module.scss";
import { useForm } from "@/hooks/useForm";

import { useTranslation } from "react-i18next";
import { getCountries, getStates, getCities } from "@/services/geolocation";

const animatedComponents = makeAnimated();

export const FormModal = memo(({ modalShow, ...props }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(true);

  const [tags, setTags] = useState([]);
  const [myTags, setMyTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  const initFormData = {
    pais: "",
    region: "",
    ciudad: "",
    tags: "",
    email: "",
    name: "",
    case: "",
    terms: "",
  };

  const { onInputChange, onRadioChange, onSetFormState, formState } =
    useForm(initFormData);

  const doHide = (hide = false) => {
    setShow(false);

    const timer1 = setTimeout(() => {
      props.onHide(hide);
    }, 100);

    const timer2 = setTimeout(() => {
      setShow(true);
    }, 200);

    // clearTimeout(timer1)
    // clearTimeout(timer2)
  };

  const onDoSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    const saved = await create(formState);
    if (saved) {
      setIsLoading(false);

      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "success",
        confirmButtonColor: "red",
        text: t("form.alerts.success"),
      });

      onSetFormState(initFormData);
      doHide(true);
    } else {
      notify(t("comentarios.alerts.error"), "error");
    }
  };

  const showAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: "question",
      confirmButtonColor: "red",
      html: `<p> ${t("form.alerts.question")} </p>`,
    });
  };

  const onGetLists = async () => {
    const list = (await getTags()) || [];

    const tags = list.map((tag) => {
      return {
        value: tag.id,
        label: tag.name,
      };
    });

    setTags(tags);
    setCountries(await getCountries());
  };

  const onPrepareTags = (newTags, actionMeta) => {
    const newTagsId = newTags.map((tag) => {
      return tag.value;
    });
    const evt = { target: { name: "tags", value: newTagsId } };

    setMyTags(
      newTags.map((tag) => {
        return { value: tag.value, label: tag.label };
      })
    );
    onInputChange(evt);
  };

  const onGetRegions = async () => {
    setRegions(await getStates(formState.pais));

    const ciudad = { target: {value: '', name: 'ciudad'} }
    onInputChange(ciudad);
  };

  const onGetCities = async () => {
    setCities(
      await getCities(formState.pais, formState.region)
    );
  };

  useEffect(() => {
    onGetLists();
  }, []);

  useEffect(() => {
    onGetRegions();
  }, [formState.pais]);

  useEffect(() => {
    onGetCities();
  }, [formState.region]);

  if (modalShow) {
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modal}
      >
        <form onSubmit={onDoSubmit}>
          <Modal.Header
            closeButton
            className="text-center pb-0"
            onHide={doHide}
          >
            <Modal.Title className="m-auto" id="contained-modal-title-vcenter">
              {props.title}

              <button className="btn ms-3" onClick={() => showAlert()}>
                <FontAwesomeIcon icon={faCircleQuestion} />
              </button>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className={`py-0 ${styles.body} ${shared.list}`}>
            <div className="overflow-auto">
              <div className="card my-2">
                <div className="card-body">
                  <div className="form">
                    
                    <div className="mb-3 row">
                      <div className="col-md-6 col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {" "}
                          {t("profile.form.country")}
                        </label>
                        <select
                          required
                          className="form-control"
                          name="pais"
                          value={formState.pais || ""}
                          onChange={(evt) => onInputChange(evt)}
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
                      </div>

                      <div className="col-md-6 col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {" "}
                          {t("profile.form.region")}
                        </label>
                        <select
                          required
                          className="form-control"
                          name="region"
                          value={formState.region || ""}
                          onChange={(evt) => onInputChange(evt)}
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
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-md-6 col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {" "}
                          {t("profile.form.city")}
                        </label>
                        <select
                          required
                          className="form-control"
                          name="ciudad"
                          value={formState.ciudad || ""}
                          onChange={(evt) => onInputChange(evt)}
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
                      </div>

                      <div className="col-md-6 col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {t("form.form.keywords")}:
                        </label>
                        <Select
                          className=""
                          required
                          name="tags"
                          onChange={onPrepareTags}
                          placeholder={t("form.form.chose-some")}
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          value={myTags}
                          options={tags}
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-md-6 col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {t("form.form.name")}:
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder={t("form.form.name-placeholder")}
                          value={formState.name}
                          onChange={(evt) => onInputChange(evt)}
                        />
                      </div>
                      <div className="col-md-6 col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {t("form.form.email")}:{" "}
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder={t("form.form.email-placeholder")}
                          value={formState.email}
                          onChange={(evt) => onInputChange(evt)}
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <div className="col-12">
                        <label htmlFor="staticEmail" className="form-label">
                          {t("form.form.case")}:{" "}
                        </label>
                        <textarea
                          className="form-control"
                          required
                          name="case"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          value={formState.case || ""}
                          onChange={(evt) => onInputChange(evt)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-3 form-check">
                      <input
                        className="form-check-input"
                        required
                        name="terms"
                        type="checkbox"
                        id="flexCheckDefault"
                        value="A"
                        onChange={(evt) => onRadioChange(evt)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        {t("form.form.terms")}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="d-block text-center">
            <Button className="w-100 m-0" type="submit" disabled={isLoading}>
              {isLoading ? t("loading") : t("form.form.send")}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});
