// Run with: node scripts/test_hiring_notice.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const page = fs.readFileSync(path.join(__dirname, '../_pages/about.md'), 'utf8');
const script = page.match(/<script>([\s\S]*?)<\/script>/)[1];
assert.match(page, /id="phd-opening"[^>]*hidden/);

for (const [time, hidden] of [
  ['2026-10-02T12:00:00Z', false],
  ['2026-10-15T21:59:59Z', false],
  ['2026-10-15T22:00:00Z', true],
  ['2026-10-16T12:00:00Z', true],
]) {
  const notice = { hidden: true };
  vm.runInNewContext(script, {
    document: { getElementById: (id) => {
      assert.equal(id, 'phd-opening');
      return notice;
    } },
    Date: { now: () => Date.parse(time), parse: Date.parse },
  });
  assert.equal(notice.hidden, hidden, time);
}
console.log('Hiring notice deadline checks passed.');
