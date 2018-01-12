const puppeteer = require("puppeteer");
const extractStyles = require("./extractStyles");

module.exports = async ({
  url,
  selectors,
  viewport: { width: viewportWidth = 1280, height: viewportHeight = 768 } = {}
} = {}) => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    page = await browser.newPage();

    page.setViewport({ width: viewportWidth, height: viewportHeight });

    page.on("console", msg => {
      for (let i = 0; i < msg.args.length; ++i)
        console.log(`${i}: ${msg.args[i]}`);
    });

    await page.goto(url);
  });

  describe(url, () => {
    selectors.forEach(async selector => {
      let options = {};

      if (typeof selector === "string") {
        options.selector = selector;
      } else {
        options = selector;
      }

      async function testSelector(selector) {
        const styles = await extractStyles({ page, selector });

        if (options.allMatches) {
          styles.forEach(style => {
            expect(style).toMatchSnapshot();
          });
        } else {
          expect(styles[0]).toMatchSnapshot();
        }
      }

      test(`"${options.selector}"`, async () => {
        await testSelector(options.selector);
      });

      if (options.hover) {
        test(`"${options.selector}:hover"`, async () => {
          await page.hover(options.selector);
          await testSelector(options.selector);
        });
      }

      if (options.active) {
        test(`"${options.selector}:active"`, async () => {
          await page.hover(options.selector);
          await page.mouse.down();
          await testSelector(options.selector);
        });
      }

      if (options.focus) {
        test(`"${options.selector}:focus"`, async () => {
          await page.focus(options.selector);
          await testSelector(options.selector);
        });
      }
    });
  });

  afterAll(async () => {
    return await browser.close();
  });
};
