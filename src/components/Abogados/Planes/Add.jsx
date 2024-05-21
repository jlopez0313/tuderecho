import React, { useState, useEffect, memo } from "react";

import { useForm } from "@/hooks/useForm";
import { useEpayco } from '@/hooks/useEpayco';

import { useTranslation } from "react-i18next";
import { numberFormat } from "@/helpers/numbers";
import { GIGAS, EXTRA_GIGA_PRICE } from "@/constants/constants";

export const Add = memo( ({id, totalStorage}) => {
    
    const { t } = useTranslation();
    const { doEpayco } = useEpayco();

    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState(0);

    const formData = {
      extra: 0,
    };

    const { onInputChange, formState } = useForm(formData);
    
    const onDoSubmit = () => {
      const item = {
        titulo: t('plans.title'),
        precio: price,
        extra: (formState.extra * GIGAS) + totalStorage,
        id
      }
      
      doEpayco( item, '/planes', 'PAYPLAN' )
    }

    useEffect(() => {
      setPrice( formState.extra * EXTRA_GIGA_PRICE );
    }, [formState]);

    return (
      <div className="row">
        <div className="col-sm-12 mb-3">
          <div className="form-floating mb-2">
            <input
              type="number"
              placeholder={t("plans.form.gb-placeholder")}
              required
              className="form-control"
              name="extra"
              value={formState.extra || ""}
              onChange={onInputChange}
            />
            <label htmlFor="staticEmail"> {t("plans.gigas")} *</label>
          </div>
          <div className="form-floating mb-2">
            <span required className="form-control">
              {" "}
              $ { numberFormat( price ) }
            </span>
            <label htmlFor="staticEmail"> {t("plans.total")}</label>
          </div>

          <button
            type="button"
            className="btn btn-primary mt-3 mx-auto d-block"
            disabled={isLoading}
            onClick={onDoSubmit}
          >
            {isLoading ? t("loading") : t("plans.form.pay")}
          </button>
        </div>
      </div>
    );
  }
);
