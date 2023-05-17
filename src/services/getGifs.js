
export const getGifs = async ( category, limit = 25, offset = 0 ) => {
    const api_key = 'Ns4NdhIX2lHEqu9xdgsozNuiNyuy937q';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${category}&limit=${limit}&offset=${offset}&rating=g&lang=en`
    const resp = await fetch( url ) 
    const { data } = await resp.json()
    const gifs = data.map( img => {
        return {
            id: img.id,
            title: img.title,
            url: img.images.downsized_medium.url
        }
    })

    console.log( gifs )

    return gifs
} 