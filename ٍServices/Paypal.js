const axios = require('axios');
const { header } = require('express-validator');

// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');

async function generateAccessToken() {
    const response = await axios({
        //url: `${process.env.PAYPAL_BASE_URL  }/v1/oauth2/token`,
       url: process.env.PAYPAL_BASE_URL  ,
        method: 'post',
        data: 'grant_type=client_credentials',
        header: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    })

    //return response.data.access_token

   
    console.log("donnee pay");
}

generateAccessToken()





/*const axios = require('axios');

async function generateAccessToken() {
    try {
        const response = await axios.post(`${process.env.PAYPAL_BASE_URL}`, 'grant_type=client_credentials', {
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            }
        });
        
        console.log(response.data);
        console.log("Data from PayPal");
        return response.data.access_token;
    } catch (error) {
        console.error("Error generating access token:", error);
        throw error;
    }
}

generateAccessToken();*/
