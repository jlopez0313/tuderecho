import React from 'react'

export const useEpayco = () => {

    const getInvoice = () => {
        const currentDate = new Date();
        return currentDate.getTime();
    }
    
    const doEpayco = ( item, route, component ) => {
        
        const handler = ePayco.checkout.configure({
            key: '84fe68597f45c7f44444c991a46a23af',
            test: true
        });

        const data={
            //Parametros compra (obligatorio)
            name: item.titulo,
            description: item.titulo,
            invoice: String( getInvoice() ),
            currency: "cop",
            amount: String(item.precio),
            tax_base: "0",
            tax: "0",
            country: "co",
            lang: "en",

            //Onpage="false" - Standard="true"
            external: "false",

            //Atributos opcionales
            extra1: item.id, // ID from Item
            extra2: route, // Redirect Page
            extra3: component,
            confirmation: import.meta.env.VITE_FRONTEND +  "/abogados/confirmation",
            response: import.meta.env.VITE_FRONTEND + "/abogados/confirmation",

            //Atributos cliente
            name_billing: "",
            address_billing: "",
            type_doc_billing: "",
            mobilephone_billing: "",
            number_doc_billing: "",

            //atributo deshabilitación metodo de pago
            // methodsDisable: ["TDC", "PSE","SP","CASH","DP"]
        }

        handler.open(data)
    }

    const checkTransaction = ( transactionID ) => {
        return new Promise( (resolve, reject) => {
            fetch( 'https://secure.epayco.co/validation/v1/reference/' + transactionID )
            .then( json => json.json() )
            .then( data  => {
                resolve( data.data );
            })
        })
    }


    return {
        doEpayco,
        checkTransaction
    }

}
