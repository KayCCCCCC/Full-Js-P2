import { useState, useEffect } from "react";
import axios from 'axios';
const useFetch = (url, isTable) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const outReq = axios.CancelToken.source;
    useEffect(() => {
        setTimeout(async () => {
            const fetchData = async () => {
                try {
                    const res = await axios.get(url, {
                        cancelToken: outReq.token
                    });
                    setData(res.data.data);
                    // { isTable === true && setData(res.data.data); }
                    // { isTable === false && setData(res.data) }
                    // { isTable === undefined && setData(res.data) }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData(); // Call the fetchData function
            setLoading(false)
            return () => {
                outReq.cancel();
            }
        }, 3000)
    }, [url, outReq]);
    return { data, loading }
}

export default useFetch;