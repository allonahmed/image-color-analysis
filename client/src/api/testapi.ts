import axios from 'axios'

export const MockApi = async () => {
    await axios.post('/data/create',
        JSON.stringify({ name: "Mike" })
        , {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response: any) => response).then(message => {
            console.log(message);
        }).catch((err) => {
            console.log('error: ', err);
        })
}