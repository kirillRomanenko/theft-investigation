const axios = require('axios');

async function getValueBlock(){
    try {
        const response = await axios.get('https://blockchain.info/rawblock/705805');
        const txLength = response.data.tx.length; // количество транзакций
        let attentionPrice = [];
        for (let i = 0; i < txLength; i++) {
            let countOutAddr = response.data.tx[i].out.length; // количество адресов назначения перевода
            let price = 0;
            for (let j = 0; j < countOutAddr; j++) {
                price += response.data.tx[i].out[j].value;
                if (price >= 7034232952) {
                    attentionPrice.push(price); // сумма
                }
            }
            
        }
        console.log(attentionPrice);
        // console.log(response.data.tx[1].out[0].value);
        // console.log(response.data.tx.length);
        // console.log(response.data.tx[2].out.length);
    } catch (error) {
        console.log(error);
    }
}
getValueBlock();

async function getNumberLatestBlock(){
    try {
        const response = await axios.get('https://blockchain.info/latestblock');
        // console.log(response.data.block_index);
        const latestNumberBlock = response.data.block_index;
        const startNumberBlock = 705805;
    } catch (error) {
        console.log(error);
    }
}
// getNumberLatestBlock();