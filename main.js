const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const getReposPageHTML = require("./getRepos");
let url = "https://github.com/topics";

request(url ,cb);  // cb -> callback function
function cb(err, response,html){
    console.log("status code :" , response  && response.statusCode);
    if(err){
        console.log(err);
    }
    else{
        fetchTopicLink(html);  // to fetch the topics link
    }
}

function fetchTopicLink(html){
    let $ =cheerio.load(html);
    let topicsArrEle = $(".no-underline.d-flex.flex-column.flex-justify-center"); // list of topics  -> an object
    for(let i=0;i<topicsArrEle.length;i++){
        // wrap [i]
        let href = $(topicsArrEle[i]).attr("href");
        let link =  `https://github.com/${href}`; //link fetched for all 3 topics ->"https://github.com/topics/...."
        // console.log(link);
        let topic = href.split("/").pop();  // topic name
        getReposPageHTML(link,topic);  // now we need to fetch repos for the respective topics
    }
}

