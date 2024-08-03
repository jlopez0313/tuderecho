export const tipoDocumentos = [
  {
    key: 'CC',
    value:'Cédula de Ciudadanía'
  },
  {
    key: 'CE',
    value:'Cédula de Extranjería'
  },
  {
    key: 'TI',
    value:'Tarjeta de Identidad'
  },
  {
    key: 'PA',
    value:'Pasaporte'
  },
  {
    key: 'ID',
    value:'ID'
  },
  {
    key: 'DNI',
    value:'DNI'
  },
];

export const TITLE = 'Sabiux'
export const MAX_TAGS = 3
export const GIGAS = 1000000000 // bytes
export const EXTRA_GIGA_PRICE = 12000;
export const DAYS_LEFT = 59;

export const PLANS = [
  {
    plan: 1,
    gigas: GIGAS,
    title: 'Plan 1',
    price: 0,
    description: `
      <ul>
        <li> 1Gb de Almacenamiento para archivos multimedia <b> en Videoteca </b>. </li>
      </ul>
    `
  },
  {
    plan: 2,
    title: 'Plan 2',
    gigas: GIGAS * 3,
    price: 50000,
    description: `
      <ul>
        <li> 3Gb de Almacenamiento para archivos multimedia <b> en Videoteca </b>. </li>
      </ul>
    `
  },
]