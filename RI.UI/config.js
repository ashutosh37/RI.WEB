const cmsWebDirRelative = '../RI.WEB';
const cmsStaticPath = '';

const paths = {
    base: './src',  
    dist : `${cmsWebDirRelative}${cmsStaticPath}/wwwroot/public`  
};

const entry = {
    scripts : `${paths.base}/main.tsx`,
    styles : `${paths.base}/main.scss`
}

const output = {
    scripts : 'main.js',
    styles : 'main.css'
};

module.exports = {
    paths,
    entry,
    output
};