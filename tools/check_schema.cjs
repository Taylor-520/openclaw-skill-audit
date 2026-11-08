// Offline checks only: no model calls, no sample execution.
const fs=require('node:fs'),path=require('node:path');
const Ajv2020=require('ajv/dist/2020.js');
const root=path.resolve(__dirname,'..');
const schema=JSON.parse(fs.readFileSync(path.join(root,'skills/openclaw-skill-audit/references/report-schema.json'),'utf8'));
const ajv=new Ajv2020({allErrors:true,strict:false});
if(!ajv.validateSchema(schema))throw new Error('Invalid Schema');
const validate=ajv.compile(schema),results=[];
for(let i=1;i<=12;i++){
  const id='C'+String(i).padStart(2,'0');
  try{
    const obj=JSON.parse(fs.readFileSync(path.join(root,'evidence/round2/responses',id+'.txt'),'utf8'));
    results.push({case_id:id,valid:validate(obj),errors:validate.errors||[]});
  }catch(e){results.push({case_id:id,valid:false,reason:'JSON parsing failed'});}
}
const valid=results.filter(r=>r.valid).length;
const expected=valid===11&&results.filter(r=>!r.valid).map(r=>r.case_id).join(',')==='C03';
console.log(JSON.stringify({schema_compiles:true,valid_reports:valid,total:12,matches_recorded_outcome:expected,model_calls:0,results},null,2));
// Duplicate keys are checked separately by verify_snapshot.py.
process.exit(expected?0:1);
