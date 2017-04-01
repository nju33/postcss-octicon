import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import octicons from 'octicons';
import cheerio from 'cheerio';
import svgpath from 'svgpath';

const defaultOpts = {
  targets: ['content', 'background-image', 'background']
};

export default postcss.plugin('postcss-octicon', (opts = defaultOpts) => {
  opts = Object.assign({}, defaultOpts, opts);

  return root => {
    const re = new RegExp(opts.targets.join('|'));
    root.walkDecls(re, decl => {
      const parsed = valueParser(decl.value);
      parsed.walk(node => {
        if (node.type !== 'function' && node.value !== 'octicon') {
          return;
        }

        const [name, color] = node.nodes.filter(node => {
          return node.type === 'word' && node.value;
        }).map(node => {
          return node.value;
        });

        const url = format(octicons[name].toSVG(), color || '#000');
        decl.value = decl.value.replace(/octicon\(.*?\)/, `url(${url})`);
      });
    });
  };
});

function format(svg, color) {
  const $ = cheerio.load(svg);

  const d = $('path').attr('d');
  $('path').attr('d', svgpath(d).scale(80).toString());

  const $svg = $('svg');
  const viewBox = $svg.attr('viewbox').split(' ').map(val => {
    return Number(val) * 80;
  });
  $svg.attr('viewBox', viewBox.join(' '));

  $svg.attr('xmlns', 'http://www.w3.org/2000/svg');
  $svg.attr('style', `fill:${color};`);
  $svg.removeAttr('class');
  $svg.removeAttr('width');
  $svg.removeAttr('height');

  const url = createBuffer($.html());
  return url;
}

function createBuffer(svg) {
  const base64 = Buffer.from([
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ',
    '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
    svg
  ].join('')).toString('base64');

  return [
    'data:image/svg+xml;base64,',
    base64
  ].join('');
}
