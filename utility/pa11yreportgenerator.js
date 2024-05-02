const pa11y = require('pa11y');
const fs = require('fs');
const pa11yHtmlReporter = require('pa11y-reporter-html');

exports.reportgeneration = async (url,standardname,reportname) => {
    const results = await pa11y(url , {
        standard: standardname
      });
      const htmlReport =await pa11yHtmlReporter.results(results);
      if (!fs.existsSync("reports/"+ reportname +".html")) {
        fs.mkdirSync("reports", {
          recursive: true,
        });
      }
      fs.writeFileSync("reports/"+ reportname +".html", htmlReport);
}