const axios = require('axios');


axios.get('https://blockchain.info/latestblock')
    .then(function (response) {
        // handle success
        let latestNumberBlock = response.data.block_index;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
