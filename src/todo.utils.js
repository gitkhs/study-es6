const el = tag=> document.createElement(tag);
const qs = (target, el=document)=> el.querySelector(target);
const qa = (target, el=document)=> el.querySelectorAll(target);
const datetime = (fm, dt=new Date)=> {
  const pad = (vl, sz, zp='0'.repeat(sz)+vl)=> zp.substr(zp.length-sz);
  const t = {
    yyyy: pad(dt.getFullYear(), 4),
    mm: pad(dt.getMonth()+1, 2),
    dd: pad(dt.getDate(), 2),
    hh: pad(dt.getHours(), 2),
    mi: pad(dt.getMinutes(), 2),
    ss: pad(dt.getSeconds(), 2),
    ms: pad(dt.getMilliseconds(), 3),
  };
  return fm.replace(/yyyy|mm|dd|hh|mi|ss|ms/g, v=>t[v]);
};
