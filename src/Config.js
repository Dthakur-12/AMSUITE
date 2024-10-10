const TIMEOUT = 120000;
const GOOGLE_MAP_APIKEY = "AIzaSyApNYA3hXfKoKDoLpfg1JFL2h3FgCxS1Xs";

let WS_URL_API = "";
let URL_API = "";

const setUrlApi = (isReadXML) => {
  const filePathXML = window.location.origin + "/AMSuiteConfig.xml";

  let x = new XMLHttpRequest();
  let doc;
  x.open("GET", filePathXML, true);
  x.onreadystatechange = function () {
    if (x.readyState === 4 && x.status === 200) {
      doc = x.responseXML;

      localStorage.setItem(
        "urlApi",
        doc.getElementsByTagName("ConfigParameter")[0].attributes[1].nodeValue
      );
      localStorage.setItem(
        "urlServer",
        doc.getElementsByTagName("ConfigParameter")[2].attributes[1].nodeValue
      );
      console.log("URL_API: ", localStorage.getItem("urlApi"));
      console.log("SERVER_API: ", localStorage.getItem("urlServer"));
      isReadXML && isReadXML();
    }
  };
  x.send();
  //return URL_API;
};

module.exports = {
  setUrlApi,
  API_URL: URL_API,
  WS_URL: WS_URL_API,

  TIMEOUT: TIMEOUT,
  GOOGLE_MAP_APIKEY,
};
