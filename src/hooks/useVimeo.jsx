import {Vimeo} from 'vimeo';
import axios from 'axios';
import * as tus from 'tus-js-client';

export const useVimeo = () => {
    
    const VIMEO_ACCESS_TOKEN = import.meta.env.VITE_VIMEO_ACCESS_TOKEN;
    const VIMEO_API_URL = 'https://api.vimeo.com/me/videos';

    const upload = async (file, title) => {

        const size = file.size;
        const body = {
            name: title,
            description: 'The description goes here.',
            upload: {
                approach: 'tus',
                size,
            },
            privacy: {
                view: 'anybody',
                embed: 'public',
            },
            embed: {
                color: '#4338CA',
            },
        };

        const headers = {
            Authorization: `bearer ${VIMEO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/vnd.vimeo.*+json;version=3.4',
        };

        const response = await axios.post(
            VIMEO_API_URL,
            body,
            { headers }
        );

        const uploadURI = response.data.upload.upload_link;
        const vimeoVideoLink = response.data.uri;
        const vimeoId = vimeoVideoLink.split('/').slice(-1)[0];


        return new Promise( (resolve, reject) => {
            const uploader = new tus.Upload(file, {
              uploadUrl: uploadURI,
              endpoint: uploadURI,
              onError: (error) => {
                    reject(error);
              },
              onProgress: (bytesUploaded, bytesTotal) => {
                    console.log(bytesUploaded, bytesTotal);
              },
              onSuccess: () => {
                    resolve({
                        provider: 'Vimeo',
                        id: vimeoId,
                    });
                },
            });

            uploader.start();
        });

    }
    
    return {
        upload
    }
}
