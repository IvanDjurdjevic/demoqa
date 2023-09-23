const { Builder, By, Select, until } = require("selenium-webdriver");
const DemoqaPage = require('../pages/DemoqaPage');
require("dotenv").config();
const locator = require("../utils/locatorsElements.json");
const data = require("../utils/dataElements.json");
const assert = require("assert");

describe('Tests of Elements in demoqa', async function() {
    let driver;
    let elements;
    beforeEach("Open demoqa.com", async function() {
        driver = new Builder().forBrowser(process.env.USE_BROWSER).build();
        elements = new DemoqaPage(driver);
        await elements.visit(data.urlHomePage);
        await elements.maximizeWindow();
        await elements.sleep(1);
        await driver.executeScript("window.scrollBy(0, 150)", ""); 
        await elements.sleep(1);
        await elements.findAndClick(locator.goToElements);
        await elements.sleep(1);
    })
    afterEach('Close browser', function() {
        driver.quit();
    })

    it('Open page', async function() {
        await elements.sleep(2);
        assert.equal(data.urlElementsPage, "https://demoqa.com/elements");
    })
    it('Add correct values in the Text Box', async function() {
        await elements.findAndClick(locator.goToTextBox);
        await elements.findAndSendKeys(locator.inputFullName, data.fullName);
        await elements.findAndSendKeys(locator.inputEmail, data.email);
        await elements.findAndSendKeys(locator.inputCurrentAddress, data.currentAddresss);
        await elements.findAndSendKeys(locator.inputPermanentAddress, data.permanentAddress);
        await driver.executeScript("window.scrollBy(0, 150)", ""); 
        await elements.sleep(2);
        await elements.findAndClick(locator.button);
        const out = await elements.getText(locator.outputText);
        assert.equal(out.includes(data.fullName), true);
        assert.equal(out.includes(data.email), true);
        assert.equal(out.includes(data.currentAddresss), true);
        assert.equal(out.includes(data.permanentAddress), true);
    })
    it('Incorrect email address in the Text Box', async function() {
        await elements.findAndClick(locator.goToTextBox);
        await elements.findAndSendKeys(locator.inputFullName, data.fullName);
        await elements.findAndSendKeys(locator.inputEmail, data.incorrectEmail);
        await elements.findAndSendKeys(locator.inputCurrentAddress, data.currentAddresss);
        await elements.findAndSendKeys(locator.inputPermanentAddress, data.permanentAddress);
        await driver.executeScript("window.scrollBy(0, 150)", ""); 
        await elements.sleep(2);
        await elements.findAndClick(locator.button);
        const out = await elements.getText(locator.outputText);
        assert.equal(out, "");
    })
    it('Add only the correct email address in the Text Box', async function() {
        await elements.findAndClick(locator.goToTextBox);
        await elements.findAndSendKeys(locator.inputEmail, data.email);
        await driver.executeScript("window.scrollBy(0, 150)", ""); 
        await elements.sleep(2);
        await elements.findAndClick(locator.button);
        const out = await elements.getText(locator.outputText);
        assert.equal(out.includes(data.email), true);
    })
    it("If we do not select anything, the result should not exist in the Check Box", async function() {
        await elements.findAndClick(locator.goToCheckBox);
        await elements.sleep(2);
        try {
            await elements.find(locator.result);
            // If the element exists, throw an error
            throw new Error("The 'result' element should not exist in this case.");
        } catch (error) {
            if (error.name === "NoSuchElementError") {
                assert.ok(true, "Element 'result' does not exist.");
            } else {
                throw error;
            }
        }
    })
    it('If we select home, everything will be selected in the Check Box', async function() {
        await elements.findAndClick(locator.goToCheckBox);
        await elements.findAndClick(locator.expandAll);
        await elements.findAndClick(locator.checkHome);
        await elements.sleep(2);
        // It doesn't have to be scrolled even though the result is not visible at the end
        const allText = await elements.getText(locator.result);
        assert.equal(allText.includes(data.homeText), true);
        assert.equal(allText.includes(data.desktopText), true);
        assert.equal(allText.includes(data.notesText), true);
        assert.equal(allText.includes(data.commandsText), true);
        assert.equal(allText.includes(data.documentsText), true);
        assert.equal(allText.includes(data.wordFileText), true);
        assert.equal(allText.includes(data.reactText), true);
        assert.equal(allText.includes(data.angularText), true);
        assert.equal(allText.includes(data.veuText), true);
        assert.equal(allText.includes(data.officeText), true);
        assert.equal(allText.includes(data.publicText), true);
        assert.equal(allText.includes(data.privateText), true);
        assert.equal(allText.includes(data.classifiedText), true);
        assert.equal(allText.includes(data.generalText), true);
        assert.equal(allText.includes(data.downloadsText), true);
        assert.equal(allText.includes(data.wordFileText), true);
        assert.equal(allText.includes(data.exelFileText), true);
    })
    it.only('If we check Notes and Commands, Home and Desktop are checked, but "home" is not in Result in the Check Box', async function() {
        await elements.findAndClick(locator.goToCheckBox);
        await elements.findAndClick(locator.expandAll);
        await elements.findAndClick(locator.checkNotes);
        await elements.findAndClick(locator.checkCommands);
        await elements.sleep(2);
        try {
            const element1 = await elements.find(locator.checkedHome); // Also locator.checkHome exists
            const element2 = await elements.find(locator.checkedDesktop); // Also locator.checkDesktop exists
            assert.ok(element1, "Element 'element1' exists in this case.");
            assert.ok(element2, "Element 'element2' exists in this case.");
        } catch (error) {
            assert.fail("Some of the elements were not found on the page.");
        }
        const allText = await elements.getText(locator.result);
        assert.equal(allText.includes(data.homeText), false);
        assert.equal(allText.includes(data.desktopText), true);
        assert.equal(allText.includes(data.notesText), true);
        assert.equal(allText.includes(data.commandsText), true);
    })
})