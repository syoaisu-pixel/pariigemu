const fs=require('node:fs'),assert=require('node:assert/strict');
const s=fs.readFileSync('index.html','utf8');
const voices=[...s.match(/case 'ultimatePop':([^\n]+)/)[1].matchAll(/tone\(([\d.]+),([\d.]+),'(\w+)',([\d.]+)\)/g)].map(x=>({f:+x[1],d:+x[2],type:x[3],v:+x[4]}));
assert.equal(voices.length,3);
for(const beat of [170,320,450]){let peak=0,energy=0,n=0;for(let i=0;i<Math.ceil((beat/1000+.1)*48000);i++){let t=i/48000,y=0;for(let k=0;k<3;k++)for(const v of voices){let u=t-k*beat/2000;if(u>=0&&u<v.d){let z=Math.sin(2*Math.PI*v.f*u);y+=(v.type==='triangle'?2/Math.PI*Math.asin(z):z)*v.v*Math.pow(.001/v.v,u/v.d)}}peak=Math.max(peak,Math.abs(y));energy+=y*y;n++}assert(peak<1&&peak>.1);assert(beat/2>Math.max(...voices.map(v=>v.d*1000)));console.log({beat,peak,rms:Math.sqrt(energy/n)});}
