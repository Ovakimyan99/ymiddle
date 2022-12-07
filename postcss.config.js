const fs = require('fs');
const postcss = require('postcss');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const doiuse = require('doiuse');
const postcssNested = require('postcss-nested');
const postcssMixins = require('postcss-mixins');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const css = fs.readFileSync('./assets/postcss/main.pcss', "utf8");
const normalize = require('normalize.css');

module.exports = {
    plugins: [
        normalize,
        postcss()
            .use(atImport())
            .process(css, {}),
        postcssMixins,
        postcssFlexbugsFixes,
        postcssNested,
        autoprefixer,
        doiuse({
            browsers: ['defaults'],
            ignoreFiles: ['**/normalize.css'],
            onFeatureUsage: function(info) {
                const selector = info.usage.parent.selector;
                const property = `${info.usage.prop}: ${info.usage.value}`;

                let status = info.featureData.caniuseData.status.toUpperCase();

                if (info.featureData.missing) {
                    status = 'NOT SUPPORTED'.red;
                } else if (info.featureData.partial) {
                    status = 'PARTIAL SUPPORT'.yellow;
                }

                console.log(`\n${status}:\n\n    ${selector} {\n        ${property};\n    }\n`);
            }
        }),
    ]
}
