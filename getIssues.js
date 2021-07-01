const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const pdfkit = require("pdfkit");

function getIssueHTML(url,topic,repoName){
    request(url ,cb);  // cb -> callback function
    function cb(err, response,html){
        console.log("status code :" , response  && response.statusCode);
        if(err){
            console.log(err);
        }
        else{
            getIssue(html);
        }
    }
    function getIssue(html){
        let $ = cheerio.load(html);
        let issuesArrEle = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let issueArr = [];
        for(let i=0;i<issuesArrEle.length;i++){
            let link = $(issuesArrEle[i]).attr("href");
            issueArr.push(link);
        }

        let folderPath = path.join(__dirname,topic); // topics folder path created
        dirCreator(folderPath);
        let filePath = path.join(folderPath , repoName + ".pdf");
        // fs.writeFileSync(filePath, JSON.stringify(issueArr));  // since json doesnot store array we need to convert it in string
        let content = JSON.stringify(issueArr);
        let pdfdoc = new pdfkit();
        pdfdoc.pipe(fs.createWriteStream(filePath));  // filepath pe write karo
        pdfdoc.text(content);
        pdfdoc.end();
    }
}
function dirCreator(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);  // if folderpath doesn't exists then create one folder
    }


}

module.exports = getIssueHTML;