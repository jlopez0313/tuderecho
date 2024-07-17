export const getCountries = async () => {
    const resp = await fetch('json/countries.json')
    const {countries} = await resp.json();
    return countries;
}

export const getStates = async ( countryName ) => {

    if ( countryName ) {
        const countries = await getCountries();
        const country = countries.find( item => item.name == countryName)
    
        const resp = await fetch('json/states.json')
        const { states } = await resp.json();
        return states.filter( item => item.id_country == country.id);
    } else {
        return []
    }
}

export const getCities = async ( countryName, regionName ) => {
    if ( regionName ) {
        const countries = await getCountries();
        const country = countries.find( item => item.name == countryName)
        
        const states = await getStates( countryName );
        const state = states.find( item => item.name == regionName)
    
        const resp = await fetch('json/cities.json')
        const { cities } = await resp.json();
        return cities.filter( item => item.id_state == state.id);
    } else {
        return []
    }
}
