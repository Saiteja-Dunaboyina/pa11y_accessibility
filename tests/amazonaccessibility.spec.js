const { test, expect } = require('@playwright/test');
const { reportgeneration } = require('../utility/pa11yreportgenerator');
const pa11y = require('pa11y');
const fs = require('fs');
const pa11yHtmlReporter = require('pa11y-reporter-html');
 
test.describe('Accessibility tests', () => {
  test("Homepage should not have any accessibility issues", async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    // await page.waitForTimeout(2000);
    await reportgeneration(page.url(),"WCAG2AA","amazonhomepagereport");
  });

  test("Signin page should not have any accessibility issues" , async({ page }) => {
    await page.goto("https://www.amazon.in/");
    await page.locator("//a[@id='nav-link-accountList']").click();
    await reportgeneration(page.url(),"WCAG2AAA","amazonsigninpagereport");
  })

  test("Create account page should not have any accessibility issues" , async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    await page.locator("//a[@id='nav-link-accountList']").click();
    await page.locator("//a[@id='createAccountSubmit']").click();
    await reportgeneration(page.url(),"WCAG2A","amazoncreateaccountpagereport");
  })

  test("mobiles page should not have any accessibility issues",async({ page }) => {
    await page.goto("https://www.amazon.in/");
    await page.locator("//input[@id='twotabsearchtextbox']").fill("mobiles");
    await page.locator("//input[@id='nav-search-submit-button']").click();
    await reportgeneration(page.url(),"WCAG2AAA","amazonmobilespagereport");
  })

  test("OrangeHrm login Page", async({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    const imagename = "loginpage.png"
    const results = await pa11y(page.url() , {
      runner: 'axe',
      standard: "WCAG2A",
      screenCapture : imagename,
    });
    const htmlReport = await pa11yHtmlReporter.results(results);

    //  // Read the screenshot file as base64
    //  const screenshotData = fs.readFileSync(imagename, { encoding: 'base64' });
    //  const screenshotBase64 = `data:image/png;base64,${screenshotData}`;
 
    //  // Append screenshot image tag to the report HTML
    //  const reportWithScreenshot = htmlReport.replace('</body>', `<img src="${screenshotBase64}" alt="Screenshot" /></body>`);

    if (!fs.existsSync("reports/orangehrmloginreport.html")) {
      fs.mkdirSync("reports", {
        recursive: true,
      });
    }
    fs.writeFileSync("reports/orangehrmloginreport.html", htmlReport);
  })

});




