# Princes Trust Front End

PTFE is a VueJS project undertaken for the Princes Trust's office in Glasgow. The charity has a number of visitors to the building each (week)day, and wanted to be able to log the numbers coming through to be able to have the information to provide to funders.

They had an existing app, but it broke and no-one had the skills to fix it, so I was asked to help recreate it.

Initially, it was a quick and dirty fix involving a number of HTML pages. I have since refactored the whole project, separating out the node.js sign-in site and the admin dashboard site.

The bar chart bars are clickable, and different graphs will render below each graph depending on what you select.

The project has Jest as it's testing suite.

## Build Setup

``` bash
# install dependencies
npm i

# serve with hot reload at localhost:8080
npm run dev

# run tests
npm test

```
