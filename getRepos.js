const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const getIssueHTML = require("./getIssues");

function getReposPageHTML(url,topic){
    request(url , cb);
    function cb(err,response,html){
        console.log("status code:" , response && response.statusCode);
        if(err){
            console.log(err);
        }
        else{
            fetchReposLink(html);
            // console.log(">>>>>>>>>>>>>>>>>");
            // console.log(html);
        }
    }
    function fetchReposLink(html){
        let $ = cheerio.load(html);
        let h1ELemOfRepos =$(".f3.color-text-secondary.text-normal.lh-condensed");
        
        console.log(topic);
        for(let i=0;i<8;i++){
            // since I only require the top 8 repository
            let arrayOfAttrEle = $(h1ELemOfRepos[i]).find("a");
            let href = $(arrayOfAttrEle[1]).attr("href");  // 'authorname/reponame'
            let fullLink = `https://github.com${href}/issues`; // issues link
            let hrefArr= href.split("/");
            repoName = hrefArr.pop();
              
            getIssueHTML(fullLink,topic,repoName);
            
        }
    }
}



module.exports = getReposPageHTML;
