const styleshots = require("../index");
const path = require("path");

const url = `file://${path.resolve(__dirname, "./fixtures/basic.html")}`;

styleshots({
  url,
  projectName: "Basic",
  debug: true,
  selectors: [
    ".plain-div",
    ".red",
    ".always-green .red",
    ".padding",
    ".margin",
    ".border",
    ".rgba",
    ".inline-color",
    {
      selector: ".hover-el",
      hover: true
    },
    {
      selector: ".active-el",
      active: true
    },
    {
      selector: ".focus-el",
      focus: true
    },
    { selector: ".container-with-nesting *", allMatches: true }
  ]
});
