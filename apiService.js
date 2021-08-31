const axios = require('axios');

const apiService = {};

const endpoint = "http://localhost:8080/parkHours";

apiService.get  = async function (date) {
    await axios.get(endpoint + '/' + date)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
}

module.exports = apiService;