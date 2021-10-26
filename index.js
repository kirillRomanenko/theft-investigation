const axios = require('axios');
const xl = require('excel4node');
const moment = require('moment-timezone');
const wb = new xl.Workbook();
function createReport(hash, btcValue, time, numberBlock, idBlock){
    // const wb = new xl.Workbook();
    const ws = wb.addWorksheet(idBlock);
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
        numberFormat: '$#,##0.00000000; ($#,##0.00000000); -',
      });
    ws.cell(1, 1) //A1
      .string('Hash address')
      .style(styleHeader);
    ws.cell(1, 2) //B1
      .string('BTC value')
      .style(styleHeader);
    // ws.cell(1, 3) //C1
    //   .string('Time')
    //   .style(styleHeader);
    ws.cell(1, 3) //D1
      .string('Number block')
      .style(styleHeader);
    
    hashLength = hash.length;
    for (let i = 0; i < hashLength; i++) {
        ws.cell(i+2, 1) //A
        .string(hash[i])
        .style(style);
        
        ws.cell(i+2, 2) //B
        .string(btcValue[i])
        .style(style);
        
        // ws.cell(i+2, 3) //C
        // .string(time[i])
        // .style(style);
        
        ws.cell(i+2, 3) //D
        .string(numberBlock[i])
        .style(style);
        
    }
    
    wb.write('./Reports/Report.xlsx');
}

async function getValueBlock(){
    try {
        const response2 = await axios.get('https://blockchain.info/latestblock');
        const latestNumberBlock = response2.data.height;
        for (let idBlock = 705052; idBlock < latestNumberBlock; idBlock++) {
            const response = await axios.get('https://blockchain.info/rawblock/' + idBlock);
        
            const txLength = response.data.tx.length; // количество транзакций
            let attentionPrice = [];
            let hash = [];
            let time = [];
            let numberBlock = [];
            for (let i = 0; i < txLength; i++) {
                let countOutAddr = response.data.tx[i].out.length; // количество адресов назначения перевода
                let price = 0;
                for (let j = 0; j < countOutAddr; j++) {
                    price += response.data.tx[i].out[j].value;
                    if (price >= 8500000000) {
                        hash.push(response.data.tx[i].hash); // хэш транзакции
                        attentionPrice.push(String(price)); // сумма
                        // let timestamp = moment.(response.data.tx[i].time);
                        let timestamp = moment.tz(response.data.tx[i].time, "Europe/Moscow");
                        // let MoscowTime = timestamp.tz('Europe/Moscow').format('D MMM Y HH:mm:ss');
                        time.push(timestamp);
                        numberBlock.push(String(response.data.block_index));
                    }
                }
                
            }
            createReport(hash, attentionPrice, time, numberBlock, idBlock);
            
        }
        
    } catch (error) {
        console.log(error);
    }
}
// async function getAllBlocks(){
//     try {
//         const response = await axios.get('https://blockchain.info/latestblock');
//         const latestNumberBlock = response.data.height;
//         for (let i = 705805; i <= 705807; i++) {
//             getValueBlock(i);
            
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// getAllBlocks();
getValueBlock();
