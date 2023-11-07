import React, { useEffect } from 'react'

export const useZoom = ({ payload }) => {

    const startZoom = async () => {

        // const {ZoomMtg} = await import("@zoomus/websdk");
        /*
        ZoomMtg.setZoomJSLib("https://source.zoom.us/2.13.0/lib", "/av");
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        ZoomMtg.generateSDKSignature({
            meetingNumber: payload.meetingNumber,
            role: payload.role,
            sdkKey: payload.sdkKey,
            sdkSecret: payload.sdkSecret,
            success: function( signature ){
                ZoomMtg.init({
                    leaveUrl: payload.leaveUrl,
                    success: function( data ) {
                        ZoomMtg.join({
                            meetingNumber: payload.meetingNumber,
                            signature: signature.result,
                            sdkKey: payload.sdkKey,
                            userName: payload.userName,
                            userEmail: payload.userEmail,
                            passWord: payload.passWord,
                            tk: '',
                            success: function(){
                                console.log('--- Joined ---');
                            },
                            error: function( error ) {
                                console.log(' error ', error);
                            }
                        })
                    }, 
                    error: function( error ) {
                        console.log('error', error);
                    }
                })
            },
            error: function( error ) {
                console.log('error', error);
            }

        })
        */
    } 

    return {startZoom}
}
