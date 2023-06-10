import { createClient } from "microcms-js-sdk"



export const client = createClient({
    serviceDomain: 'yoshimo-blog',  // service-domain は XXXX.microcms.io の XXXX 部分
    apiKey: import.meta.env.VITE_MICROCMS_APIKEY,
});



