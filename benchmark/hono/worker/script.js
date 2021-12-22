!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){const n=r(1)();n.get("/",()=>new Response("Root Page!")),n.get("/hello",()=>new Response("GET Hello!")),n.put("/hello",()=>new Response("PUT Hello!")),n.post("/hello",()=>new Response("POST Hello!")),n.delete("/hello",()=>new Response("DELETE Hello!")),n.get("/foo/bar",()=>new Response("GET Foo Bar!")),n.put("/foo/bar",()=>new Response("PUT Foo Bar!")),n.post("/foo/bar",()=>new Response("POST Foo Bar!")),n.delete("/foo/bar",()=>new Response("DELETE Foo Bar!")),n.get("/todos",()=>new Response("Todos Index!")),n.get("/todos/:id",e=>new Response("Todo #"+e.req.params("id"))),n.post("/todos",async e=>{const t=await e.req.json();return new Response("Creating Todo: "+JSON.stringify(t))}),n.all("*",()=>new Response("Not Found.",{status:404})),n.fire()},function(e,t,r){"use strict";const n=r(2),o=r(3),s=r(4);class a{constructor(){this.node=new n,this.tempPath="/"}add(e,t,...r){this.node.insert(e,t,r)}match(e,t){return e=e.toLowerCase(),this.node.search(e,t)}}const i={get:(e,t)=>(...r)=>e.constructor.prototype.hasOwnProperty(t)?e[t](...r):1==r.length?e.addRoute(t,e.router.tempPath,...r):e.addRoute(t,...r)};class l{constructor(){this.router=new a,this.middlewareRouter=new a,this.middleware=[]}addRoute(e,t,...r){return this.router.add(e,t,...r),u(this)}matchRoute(e,t){return this.router.match(e,t)}route(e){return this.router.tempPath=e,u(this)}use(e,t){t=[t];const r=this.middlewareRouter.match("all",e);r&&t.push(...r.handler),this.middlewareRouter.add("all",e,...t)}createContext(e,t){return{req:e,res:t}}async dispatch(e,t){const[r,n]=[e.method,(a=e.url,(a=new URL(a)).pathname)];var a;const i=this.matchRoute(r,n);if(!i)return this.notFound();e.params=e=>i.params[e];const l=[s],u=this.middlewareRouter.match("all",n);u&&l.push(...u.handler);let h=i.handler[0];l.push((e,t)=>{e.res=h(e),t()});const c=o(l),d=this.createContext(e,t);return c(d),d.res}async handleEvent(e){return await this.dispatch(e.request,new Response)}fire(){addEventListener("fetch",e=>{e.respondWith(this.handleEvent(e))})}notFound(){return new Response("Not Found",{status:404})}}const u=(e=new l)=>new Proxy(e,i);e.exports=u},function(e,t){class r{constructor({method:e,label:t,handler:r,children:n}={}){this.label=t||"",this.children=n||[],this.method={},e&&r&&(this.method[e]=r)}insert(e,t,n){let o=this;for(const e of this.splitPath(t)){let t=o.children[e];t?o=t:(o.children[e]=new r({label:e,handler:n}),o=o.children[e])}o.method[e]=n}splitPath(e){return["/",...e.split("/").filter(e=>""!==e)]}getPattern(e){const t=e.match(/^\:.+?\{(.+)\}$/);return t?"("+t[1]+")":"(.+)"}getParamName(e){const t=e.match(/^\:([^\{\}]+)/);if(t)return t[1]}search(e,t){let r,n=this,o={};if("/"===t){const t=this.children["/"];if(!t)return this.noRoute();const n=t.children["*"];if(n)r=n.method[e]||n.method.all;else if(!t.method[e])return this.noRoute()}for(const e of this.splitPath(t)){let t=n.children[e];if(t){n=t;continue}let r=!1;for(const t in n.children){if("*"===t){n=n.children[t],r=!0;break}if(t.match(/^:/)){const s=this.getPattern(t),a=e.match(new RegExp(s));if(a){o[this.getParamName(t)]=a[0],n=n.children[t],r=!0;break}return this.noRoute()}}if(0==r)return this.noRoute()}return r=r||n.method.all||n.method[e],r?(({handler:e,params:t}={})=>({handler:e,params:t}))({handler:r,params:o}):this.noRoute()}noRoute(){return null}}e.exports=r},function(e,t){e.exports=e=>function(t,r){let n=-1;return function o(s){if(s<=n)return Promise.reject(new Error("next() called multiple times"));n=s;let a=e[s];s===e.length&&(a=r);if(!a)return Promise.resolve();try{return Promise.resolve(a(t,o.bind(null,s+1)))}catch(e){return Promise.reject(e)}}(0)}},function(e,t){e.exports=(e,t)=>{e.req.query=t=>new URL(e.req.url).searchParams.get(t),t(),"string"==typeof e.res&&(e.res=new Response(e.res,{status:200,headers:{"Content-Type":"text/plain"}}))}}]);