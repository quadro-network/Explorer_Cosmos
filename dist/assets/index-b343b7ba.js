import{d as q,j as R,a as r,Z as B,y as N,r as v,o as c,c as i,b as e,t as o,F as C,g as F,e as b,p as L,z as P,f as d}from"./index-61bbdb05.js";import{_ as S}from"./PaginationBar.vue_vue_type_script_setup_true_lang-57a5a2cf.js";const V={class:"overflow-x-auto"},j={class:"table table-compact"},D=q({__name:"index",props:["chain"],setup(g){const y=R(),p=r([]),l=r(new B),f=r({});N(()=>{m(1)});function m(t){l.value.setPage(t),y.rpc.getAuthAccounts(l.value).then(a=>{p.value=a.accounts,f.value=a.pagination})}function k(t){return t.replace("/cosmos.auth.v1beta1.","")}function u(t,a){if(!t||Array.isArray(t)||typeof t=="string")return null;const s=Object.keys(t);if(s.includes(a))return t[a];for(let n=0;n<s.length;n++){const _=u(t[s[n]],a);if(_)return _}}function h(t){return u(t,"address")}function w(t){return u(t,"account_number")}function $(t){return u(t,"sequence")}function A(t){return u(t,"pub_key")}return(t,a)=>{const s=v("RouterLink");return c(),i("div",V,[e("table",j,[e("thead",null,[e("tr",null,[e("td",null,o(t.$t("account.type")),1),e("td",null,o(t.$t("account.address")),1),e("td",null,o(t.$t("account.acc_num")),1),e("td",null,o(t.$t("account.sequence")),1),e("td",null,o(t.$t("account.pub_key")),1)])]),(c(!0),i(C,null,F(d(p),n=>(c(),i("tr",null,[e("td",null,o(k(n["@type"])),1),e("td",null,[b(s,{to:`/${g.chain}/account/${h(n)}`},{default:L(()=>[P(o(h(n)),1)]),_:2},1032,["to"])]),e("td",null,o(w(n)),1),e("td",null,o($(n)),1),e("td",null,o(A(n)),1)]))),256))]),b(S,{limit:d(l).limit,total:d(f).total,callback:m},null,8,["limit","total"])])}}});export{D as default};
