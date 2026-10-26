const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {z}=require(process.env.TKM_ZOD||'zod');
const code=fs.readFileSync(path.resolve(__dirname,'../../mvu/schema/MVU_ZOD.js'),'utf8').replace(/^import .*?;\s*$/m,'').replace('export const Schema','const Schema');
let registered;
const Schema=new Function('z','$','registerMvuSchema',code+'\nreturn Schema;')(z,f=>f(),s=>registered=s);
const native={native:{关系:'朋友',好感:67},other:5};
assert.equal(registered,Schema);assert.deepEqual(Schema.parse(undefined),{});assert.deepEqual(Schema.parse(Schema.parse(native)),native);
console.log('PASS: actual Zod schema registration / empty init / passthrough / idempotence');
