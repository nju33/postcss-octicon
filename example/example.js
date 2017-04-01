import fs from 'fs';
import postcss from 'postcss';
import octicon from '../';

const css = fs.readFileSync(`${__dirname}/index.css`, 'utf-8');

postcss([octicon]).process(css).then(result => {
  fs.writeFileSync(`${__dirname}/example.css`, result.css, 'utf-8');
  console.log(result.css);
});
