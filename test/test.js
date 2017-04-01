import fs from 'fs';
import path from 'path';
import test from 'ava';

test('test', t => {
  const filepath = path.resolve(__dirname, '../example/example.css');
  const css = fs.readFileSync(filepath, 'utf-8');

  t.regex(css, /content:.*url\(.+?\)/);
  t.regex(css, /background-image:.*url\(.+?\)/);
  t.regex(css, /background:.*url\(.+?\).*/);
});
