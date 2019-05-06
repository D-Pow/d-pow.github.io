const fs = require('fs');

const COMPONENT_NAME_INDEX = 2;
const DIR_NAME_INDEX = 3;

function processArgs(args) {
    switch (args.length) {
        case 3:
            createComponent(args[COMPONENT_NAME_INDEX]);
            break;
        case 4:
            createClass(args[COMPONENT_NAME_INDEX], args[DIR_NAME_INDEX]);
            break;
        default:
            printUsage();
    }
}

function createComponent(componentName = "MyComponent") {
    createClass(componentName, 'components');
}

function createClass(componentName, dirName = 'components') {
    const dir = `./src/${dirName}/${componentName}`;
    const indexText = `import ${componentName} from './${componentName}';\n\nexport default ${componentName};\n`;
    const componentText = 
`import React from 'react';
import PropTypes from 'prop-types';

class ${componentName} extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div></div>
        );
    }
}

${componentName}.propTypes = {

};

${componentName}.defaultProps = {

};

export default ${componentName};
`;
    fs.mkdir(`${dir}`, {recursive: true}, err => {
        if (err) {
            error(err);
        } else {
            fs.writeFile(`${dir}/index.js`, indexText, err => {
                if (err) {
                    error(err);
                } else {
                    fs.writeFile(`${dir}/${componentName}.js`, componentText, err => {
                        if (err) {
                            error(err);
                        } else {
                            console.log(`Created ${componentName} in src/${dirName}/`);
                        }
                    });
                }
            });
        }
    });
}

function printUsage() {
    const usage = "Creates a component inside its own folder in the src/ directory along with an index.js file" +
        "\nUsage: createComponent NAME [directory under src/]";
    console.log(usage);
    process.exit(0);
}

function error(err) {
    console.error(err);
    process.exit(1);
}

processArgs(process.argv);
