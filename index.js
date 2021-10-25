const axios = require('axios');
const xl = require('excel4node');

function createReport(hash, btcValue, time){
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet 1');
    const styleHeader = wb.createStyle({
        font: {
            bold: true,
            color: '#000000',
            name: 'Times New Roman',
            size: 14,
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
      });
    const style = wb.createStyle({
        font: {
            color: '#000000',
            name: 'Times New Roman',
            size: 12,
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
      });
    ws.cell(1, 1) //A1
      .string('Hash address')
      .style(styleHeader);
    ws.cell(1, 2) //B1
      .string('BTC value')
      .style(styleHeader);
    ws.cell(1, 3) //C1
      .string('Time')
      .style(styleHeader);
    
    hashLength = hash.length;
    for (let i = 0; i < hashLength; i++) {
        ws.cell(i+2, 1) //A
        .string(hash)
        .style(style);
        
        ws.cell(i+2, 2) //B
        .string(btcValue)
        .style(style);
        
        ws.cell(i+2, 3) //C
        .string(time)
        .style(style);
        
    }
    
    wb.write('Excel.xlsx');
}

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