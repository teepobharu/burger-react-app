import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);
    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        // console.log("TCL: extends -> componentDidMount -> error", error);
        setError(err);
    });

    useEffect(() => {
        return () => {
            console.log("this.reqInterceptor unMOUNT", reqInterceptor, resInterceptor)
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.request.eject(resInterceptor);

        }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    }
    return [error, errorConfirmedHandler];
}