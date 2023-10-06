const headers = new Headers();
headers.append('X-Api-Key', '1695967492vhekN8J5KJbpp3YgqhzO7dP5JzWqUUXN');
headers.append('X-Format', 'default');

export const upload = async () => {
    const body = `{"source":"yourFileNameHere.mp4","upload_type":"ajax","callback_url":"yourCallbackUrlHere"}`;

    const response = await fetch( 'https://developer.dacast.com/v2/vod', {
        method: 'POST',
        headers,
        body
      } );
    const data = await response.json();

    return data;

}