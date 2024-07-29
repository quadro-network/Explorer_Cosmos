import{A as At,j as lt,B as Et,C as vt,D as Ot,E as et,G as Vt,k as St,H as ft,J as st,K as jt,d as Z,L as y,a as Y,o as p,c as g,b as t,n as k,f as e,e as b,F as A,w as Nt,M as Rt,I as nt,m,t as n,N as tt,O as Lt,P as It,r as Tt,g as j,p as X,z as D,s as at,Q as Bt,i as Gt,R as Wt,y as zt,q as bt,S as xt,U as kt,V as Jt,W as Ft,X as Ut,T as qt}from"./index-61bbdb05.js";import{s as Ht,W as Kt,_ as yt}from"./index-65681188.js";import{A as Qt}from"./vue3-apexcharts.common-b8264312.js";import{g as Xt}from"./apexChartConfig-0f2066da.js";import{b as mt}from"./route-block-83d24a4e.js";function Pt(r){switch(r){case"yellow":return"customGreen";case"green":return"base-content";default:return"secondary"}}const Dt=At("module-index",{state:()=>({days:14,tickerIndex:0,coinInfo:{name:"",symbol:"",description:{en:""},categories:[],market_cap_rank:0,links:{twitter_screen_name:"",homepage:[],repos_url:{github:[]},telegram_channel_identifier:""},market_data:{price_change_percentage_24h:0},tickers:[]},marketData:{market_caps:[],prices:[],total_volumes:[]},communityPool:[],tally:{}}),getters:{blockchain(){return lt().current},coingecko(){return Et()},bankStore(){return vt()},twitter(){var r,o,a;return(o=(r=this.coinInfo)==null?void 0:r.links)!=null&&o.twitter_screen_name?`https://twitter.com/${(a=this.coinInfo)==null?void 0:a.links.twitter_screen_name}`:""},homepage(){var c,i,v,l;if(!((i=(c=this.coinInfo)==null?void 0:c.links)!=null&&i.homepage))return"";const[r,o,a]=(l=(v=this.coinInfo)==null?void 0:v.links)==null?void 0:l.homepage;return r||o||a},github(){var c,i,v,l,_;if(!((i=(c=this.coinInfo)==null?void 0:c.links)!=null&&i.repos_url))return"";const[r,o,a]=(_=(l=(v=this.coinInfo)==null?void 0:v.links)==null?void 0:l.repos_url)==null?void 0:_.github;return r||o||a},telegram(){var r,o,a;return(o=(r=this.coinInfo)==null?void 0:r.links)!=null&&o.homepage?`https://t.me/${(a=this.coinInfo)==null?void 0:a.links.telegram_channel_identifier}`:""},priceChange(){var o,a,c,i;if(!((a=(o=this.coinInfo)==null?void 0:o.market_data)!=null&&a.price_change_percentage_24h))return"";const r=((i=(c=this.coinInfo)==null?void 0:c.market_data)==null?void 0:i.price_change_percentage_24h)||0;return Ot(r).format("+0.[00]")},priceColor(){var o,a,c,i;if(!((a=(o=this.coinInfo)==null?void 0:o.market_data)!=null&&a.price_change_percentage_24h))return"";const r=((i=(c=this.coinInfo)==null?void 0:c.market_data)==null?void 0:i.price_change_percentage_24h)||0;switch(!0){case r>0:return"text-base-content";case r<0:return"text-error";default:return""}},trustColor(){var o,a,c;return(o=this.coinInfo)!=null&&o.tickers?(c=(a=this.coinInfo)==null?void 0:a.tickers[this.tickerIndex])==null?void 0:c.trust_score:""},pool(){return et().pool},proposals(){return Vt().proposals[2]},stats(){var v,l,_,u,f,w,S;const r=St(),o=vt(),a=et(),c=ft(),i=st();return[{title:"Height",color:"primary",icon:"mdi-pound",stats:String(((_=(l=(v=r==null?void 0:r.latest)==null?void 0:v.block)==null?void 0:l.header)==null?void 0:_.height)||0),change:0},{title:"Validators",color:"error",icon:"mdi-human-queue",stats:String(((w=(f=(u=r==null?void 0:r.latest)==null?void 0:u.block)==null?void 0:f.last_commit)==null?void 0:w.signatures.length)||0),change:0},{title:"Supply",color:"base-content",icon:"mdi-currency-usd",stats:i.formatTokenAmount(o.supply),change:0},{title:"Bonded Tokens",color:"warning",icon:"mdi-lock",stats:i.formatTokenAmount({amount:this.pool.bonded_tokens,denom:a.params.bond_denom}),change:0},{title:"Inflation",color:"base-content",icon:"mdi-chart-multiple",stats:i.formatDecimalToPercent(c.inflation),change:0},{title:"Community Pool",color:"primary",icon:"mdi-bank",stats:i.formatTokens((S=this.communityPool)==null?void 0:S.filter($=>$.denom===a.params.bond_denom)),change:0}]},coingeckoId(){var o;this.tickerIndex=0;const[r]=((o=this.blockchain)==null?void 0:o.assets)||[];return r.coingecko_id}},actions:{async loadDashboard(){this.$reset(),this.initCoingecko(),ft().fetchInflation(),jt().fetchCommunityPool().then(r=>{var o,a;this.communityPool=(a=(o=r==null?void 0:r.pool)==null?void 0:o.filter(c=>c.denom.length<10))==null?void 0:a.map(c=>({amount:String(parseInt(c.amount)),denom:c.denom}))})},tickerColor(r){return Pt(r)},initCoingecko(){var o;this.tickerIndex=0;const[r]=((o=this.blockchain)==null?void 0:o.assets)||[];r&&r.coingecko_id&&(this.coingecko.getCoinInfo(r.coingecko_id).then(a=>{this.coinInfo=a}),this.coingecko.getMarketChart(this.days,r.coingecko_id).then(a=>{this.marketData=a}))},selectTicker(r){this.tickerIndex=r}}}),Yt={class:"tabs tabs-boxed bg-transparent justify-end"},Zt=Z({__name:"PriceMarketChart",setup(r){const o=Dt(),a=St(),c=y(()=>{const _=a.theme,u=o.marketData.prices.map(f=>f[0]);return Xt(_,u)}),i=Y("price"),v=y(()=>[{name:"Price",data:i.value==="price"?o.marketData.prices.map(_=>_[1]):o.marketData.total_volumes.map(_=>_[1])}]);function l(_){i.value=_}return(_,u)=>(p(),g(A,null,[t("div",Yt,[t("a",{class:k(["tab text-xs mr-2 text-grey-400 uppercase",{"tab-act":e(i)==="price"}]),onClick:u[0]||(u[0]=f=>l("price"))}," Price ",2),t("a",{class:k(["tab text-xs text-grey-400 uppercase",{"tab-act":e(i)==="volume"}]),onClick:u[1]||(u[1]=f=>l("volume"))}," Volume ",2)]),b(e(Qt),{type:"area",height:"230",options:e(c),series:e(v)},null,8,["options","series"])],64))}});var wt;const Mt=typeof window<"u",$t=r=>typeof r=="function";Mt&&((wt=window==null?void 0:window.navigator)!=null&&wt.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function te(r,o){let a,c,i;const v=Y(!0),l=()=>{v.value=!0,i()};Nt(r,l,{flush:"sync"});const _=$t(o)?o:o.get,u=$t(o)?void 0:o.set,f=Rt((w,S)=>(c=w,i=S,{get(){return v.value&&(a=_(),v.value=!1),c(),a},set($){u==null||u($)}}));return Object.isExtensible(f)&&(f.trigger=l),f}const ee={class:"#saved cardStatistic text-secondary shadow rounded p-4"},se={class:"flex items-center justify-center"},oe={key:0,class:"relative w-15 h-15 rounded overflow-hidden flex items-center justify-center"},ne={class:""},ae={class:"text-lg text-center font-semibold mt-2 mb-1"},le={class:"text-sm title2 text-center"},re={key:0,size:"x-small",class:"font-semibold"},ce={class:"truncate"},de=Z({__name:"CardStatisticsVertical",props:{title:{},color:{default:"customGreen"},icon:{},stats:{},change:{},subtitle:{}},setup(r){const o=r,a=te(()=>o.change,()=>Math.sign(o.change||0)===1);return(c,i)=>(p(),g("div",ee,[t("div",se,[o.icon?(p(),g("div",oe,[b(e(nt),{class:k([`text-${o==null?void 0:o.color}`]),icon:o.icon,size:"32"},null,8,["class","icon"]),t("div",{class:k(["absolute top-0 left-0 bottom-0 right-0 opacity-20",[`bg-${o==null?void 0:o.color}`]])},null,2)])):m("",!0),o.change?(p(),g("div",{key:1,class:k([e(a)?"text-base-content":"text-error","flex items-center text-secondary text-sm font-semibold"])},[t("span",null,n(e(a)?`+${o.change}`:o.change)+"%",1),b(e(nt),{icon:e(a)?"mdi-chevron-up":"mdi-chevron-down"},null,8,["icon"])],2)):m("",!0)]),t("div",ne,[t("h6",ae,n(o.stats||"-"),1),t("p",le,n(o.title),1),o.subtitle?(p(),g("div",re,[t("span",ce,n(o.subtitle),1)])):m("",!0)])]))}}),ie={class:"progress rounded-[3px] h-6 text-xs flex items-center"},ue=["title"],_e=["title"],he=["title"],pe=["title"],ge=Z({__name:"ProposalProcess",props:{tally:{type:Object},pool:{type:Object}},setup(r){const o=r,a=y(()=>{var u;return(u=o.pool)==null?void 0:u.bonded_tokens}),c=st(),i=y(()=>{var u;return c.calculatePercent((u=o.tally)==null?void 0:u.yes,a.value)}),v=y(()=>{var u;return c.calculatePercent((u=o.tally)==null?void 0:u.no,a.value)}),l=y(()=>{var u;return c.calculatePercent((u=o.tally)==null?void 0:u.abstain,a.value)}),_=y(()=>{var u;return c.calculatePercent((u=o.tally)==null?void 0:u.no_with_veto,a.value)});return(u,f)=>(p(),g("div",ie,[t("div",{class:"h-6 bg-yes flex items-center pl-2 text-white overflow-hidden",style:tt(`width: ${e(i)}`),title:e(i)},n(e(i)),13,ue),t("div",{class:"h-6 bg-no flex items-center text-white overflow-hidden",style:tt(`width: ${e(v)}`),title:e(v)},n(e(v)),13,_e),t("div",{class:"h-6 bg-[#B71C1C] flex items-center text-white overflow-hidden",style:tt(`width: ${e(_)};`),title:e(_)},n(e(_)),13,he),t("div",{class:"h-6 bg-secondary flex items-center text-white overflow-hidden",style:tt(`width: ${e(l)}`),title:e(l)},n(e(l)),13,pe)]))}});const Ct=Lt(ge,[["__scopeId","data-v-b197f3d9"]]),ve={class:"text-customMilk bg-customDark dark:bg-[#28334e] rounded text-sm"},fe={class:"table-compact w-full table-fixed hidden lg:!table"},be={class:"px-4 w-20"},xe=["onClick"],ke={class:"w-full"},ye={key:0,class:"bg-[#f6f2ff] text-customDark dark:bg-grey-600 dark:text-grey-300 inline-block rounded-full px-2 py-[1px] text-xs mb-1"},me={class:"w-60"},we={class:"w-36"},$e={class:"pl-4"},Ce={class:"text-xs"},Se={class:"truncate col-span-2 md:!col-span-1 text-xs text-grey-500 dark:text-grey-400 text-right md:!flex md:!justify-start"},Ie={key:0,class:"w-40"},Te=t("div",{class:""},null,-1),Pe=[Te],De={class:"lg:!hidden"},Ae={class:"text-customMilk text-base mb-1 flex justify-between hover:text-grey-400"},Ee=["onClick"],Oe={class:"grid grid-cols-4 mt-2 mb-2"},Ve={class:"col-span-2"},je={key:0,class:"bg-[#f6f2ff] text-[#c9f31d] dark:bg-grey-600 dark:text-grey-300 inline-block rounded-full px-2 py-[1px] text-xs mb-1"},Ne={class:"truncate text-xs text-grey-500 dark:text-grey-400 flex items-center justify-end"},Re={key:0,class:"mt-4"},Le={class:"flex justify-between"},Be={class:"text-xs flex items-center"},Ge=["onClick"],We={key:0},ze={key:1},Je=t("input",{type:"checkbox",id:"proposal-detail-modal",class:"modal-toggle"},null,-1),Fe={for:"proposal-detail-modal",class:"modal"},Ue={class:"modal-box !w-11/12 !max-w-5xl",for:""},qe=t("label",{for:"proposal-detail-modal",class:"btn btn-sm btn-circle absolute right-2 top-2"},"✕",-1),He=t("h3",{class:"font-bold text-lg"},"Description",-1),Ke={class:"py-4"},Qe=Z({__name:"ProposalListItem",props:{proposals:{type:Object}},setup(r){const o=It(),a=st(),c=et(),i=lt();function v(f){return f&&f.substring(f.lastIndexOf(".")+1)}const l={PROPOSAL_STATUS_VOTING_PERIOD:"VOTING",PROPOSAL_STATUS_PASSED:"PASSED",PROPOSAL_STATUS_REJECTED:"REJECTED"},_=Y();function u(f){return f?JSON.parse(f):{}}return(f,w)=>{var $,E,O,M,V,N,R,h,x,L,G,W,z,J,F,U,q;const S=Tt("RouterLink");return p(),g("div",ve,[t("table",fe,[t("tbody",null,[(p(!0),g(A,null,j(($=r.proposals)==null?void 0:$.proposals,(s,B)=>(p(),g("tr",{key:B},[t("td",be,[t("label",{for:"proposal-detail-modal",class:"text-main text-base hover:text-indigo-400 cursor-pointer",onClick:I=>_.value=s}," #"+n(s==null?void 0:s.proposal_id),9,xe)]),t("td",ke,[t("div",null,[b(S,{to:`/${e(i).chainName}/gov/${s==null?void 0:s.proposal_id}`,class:"text-main text-base mb-1 block hover:text-grey-100 truncate"},{default:X(()=>{var I,C;return[D(n(((I=s==null?void 0:s.content)==null?void 0:I.title)||(s==null?void 0:s.title)||((C=u(s==null?void 0:s.metadata))==null?void 0:C.title)),1)]}),_:2},1032,["to"]),s.content?(p(),g("div",ye,n(v(s.content["@type"])),1)):m("",!0)])]),t("td",me,[b(Ct,{pool:e(c).pool,tally:s.final_tally_result},null,8,["pool","tally"])]),t("td",we,[t("div",$e,[t("div",{class:k(["flex items-center",(l==null?void 0:l[s==null?void 0:s.status])==="PASSED"?"text-yes":(l==null?void 0:l[s==null?void 0:s.status])==="REJECTED"?"text-no":"text-accent-content"])},[t("div",{class:k(["w-1 h-1 rounded-full mr-2",(l==null?void 0:l[s==null?void 0:s.status])==="PASSED"?"bg-yes":(l==null?void 0:l[s==null?void 0:s.status])==="REJECTED"?"bg-no":"bg-info"])},null,2),t("div",Ce,n((l==null?void 0:l[s==null?void 0:s.status])||(s==null?void 0:s.status)),1)],2),t("div",Se,n(e(a).toDay(s.voting_end_time,"from")),1)])]),(l==null?void 0:l[s==null?void 0:s.status])==="VOTING"?(p(),g("td",Ie,Pe)):m("",!0)]))),128))])]),t("div",De,[(p(!0),g(A,null,j((E=r.proposals)==null?void 0:E.proposals,(s,B)=>{var I;return p(),g("div",{key:B,class:"px-4 py-4"},[t("div",Ae,[b(S,{to:`/${e(i).chainName}/gov/${s==null?void 0:s.proposal_id}`,class:"flex-1 w-0 truncate mr-4 text-customMilk"},{default:X(()=>{var C,H;return[D(n(((C=s==null?void 0:s.content)==null?void 0:C.title)||(s==null?void 0:s.title)||((H=u(s==null?void 0:s.metadata))==null?void 0:H.title)),1)]}),_:2},1032,["to"]),t("label",{for:"proposal-detail-modal",class:"text-main text-base hover:text-grey-400 cursor-pointer",onClick:C=>_.value=s}," #"+n(s==null?void 0:s.proposal_id),9,Ee)]),t("div",Oe,[t("div",Ve,[s.content?(p(),g("div",je,n(v(s.content["@type"])),1)):m("",!0)]),t("div",Ne,n(e(a).toDay(s.voting_end_time,"from")),1)]),t("div",null,[b(Ct,{pool:e(c).pool,tally:s.final_tally_result},null,8,["pool","tally"])]),(l==null?void 0:l[s==null?void 0:s.status])==="VOTING"?(p(),g("div",Re,[t("div",Le,[t("div",{class:k(["flex items-center",(l==null?void 0:l[s==null?void 0:s.status])==="PASSED"?"text-yes":(l==null?void 0:l[s==null?void 0:s.status])==="REJECTED"?"text-no":"text-accent-content"])},[t("div",{class:k(["w-1 h-1 rounded-full mr-2",(l==null?void 0:l[s==null?void 0:s.status])==="PASSED"?"bg-yes":(l==null?void 0:l[s==null?void 0:s.status])==="REJECTED"?"bg-no":"bg-info"])},null,2),t("div",Be,n((l==null?void 0:l[s==null?void 0:s.status])||(s==null?void 0:s.status)),1)],2),t("label",{for:"vote",class:"btn btn-xs #sav1 rounded-sm",onClick:C=>e(o).open("vote",{proposal_id:s==null?void 0:s.proposal_id})},[(s==null?void 0:s.voterStatus)!=="VOTE_OPTION_NO_WITH_VETO"?(p(),g("span",We,n((I=s==null?void 0:s.voterStatus)==null?void 0:I.replace("VOTE_OPTION_","")),1)):(p(),g("span",ze,"Vote"))],8,Ge)])])):m("",!0)])}),128))]),Je,t("label",Fe,[t("label",Ue,[qe,He,t("p",Ke,[(M=(O=_.value)==null?void 0:O.content)!=null&&M.description||(V=_.value)!=null&&V.summary||(R=u((N=_.value)==null?void 0:N.metadata))!=null&&R.summary?(p(),at(Bt(e(Ht)(((x=(h=_.value)==null?void 0:h.content)==null?void 0:x.description)||((L=_.value)==null?void 0:L.summary)||((W=u((G=_.value)==null?void 0:G.metadata))==null?void 0:W.summary),"horizontal")),{key:0,value:((J=(z=_.value)==null?void 0:z.content)==null?void 0:J.description)||((F=_.value)==null?void 0:F.summary)||((q=u((U=_.value)==null?void 0:U.metadata))==null?void 0:q.summary)},null,8,["value"])):m("",!0)])])])])}}}),Xe={key:0,class:"#saved rounded shadow"},Ye={class:"grid grid-cols-2 md:grid-cols-3 p-4"},Ze={class:"col-span-2 md:col-span-1"},Me={class:"text-xl font-semibold text-main"},ts={class:"uppercase"},es={class:"text-xs mt-2"},ss={class:"badge text-xs badge-error bg-[#fcebea] dark:bg-[#070707] text-red-400"},os={class:"my-4 flex flex-wrap items-center"},ns=["href"],as={class:"ml-1 text-sm uppercase"},ls={class:"dropdown dropdown-hover w-full"},rs={class:"bg-customDark dark:bg-[#141414] flex items-center justify-between px-4 py-2 cursor-pointer rounded"},cs={class:"font-semibold text-xl text-[#6e6e6d] dark:text-white"},ds={class:"text-accent-content text-sm"},is={class:"text-right"},us={class:"text-xl font-semibold text-[#6e6e6d] dark:text-white"},_s={class:"dropdown-content pt-1"},hs={class:"h-64 overflow-auto w-full shadow rounded"},ps={class:"menu w-full bg-customDark rounded dark:bg-[#141414]"},gs=["onClick"],vs={class:"flex items-center justify-between hover:#saved"},fs={class:"flex-1"},bs={class:"text-sm text-grey-50 dark:text-grey-400"},xs={class:"text-base text-main"},ks={class:"flex"},ys={class:"modal"},ms={class:"modal-box"},ws={class:"text-lg font-bold"},$s={class:"flex flex-col w-full mt-5"},Cs={class:"grid h-20 flex-grow card rounded-box place-items-center"},Ss={class:"join w-full"},Is={class:"join-item btn"},Ts={class:"uppercase"},Ps=t("div",{class:"divider"},"=",-1),Ds={class:"grid h-20 flex-grow card rounded-box place-items-center"},As={class:"join w-full"},Es=t("label",{class:"join-item btn"},[t("span",null,"USD")],-1),Os={class:"modal-backdrop",for:"calculator"},Vs=["href"],js={class:"col-span-2"},Ns=t("div",{class:"h-[1px] w-full bg-grey-100 dark:bg-[#141414]"},null,-1),Rs={class:"max-h-[250px] overflow-auto p-4 text-sm"},Ls={class:"mx-4 flex flex-wrap items-center"},Bs={class:"mr-2 mb-4 text-xs bg-grey-100 dark:bg-[#141414] px-3 rounded-full py-1"},Gs={class:"grid grid-cols-1 gap-4 mt-6 md:!grid-cols-3 lg:!grid-cols-4 2xl:!grid-cols-5"},Ws={key:1,class:"#saved rounded mt-4 shadow"},zs=t("div",{class:"pool px-4 pt-4 pb-2 text-lg font-semibold text-main"},null,-1),Js={class:"px-4 pb-4"},Fs={style:{display:"none"},class:"#saved rounded mt-4 shadow"},Us={class:"flex justify-between px-4 pt-4 pb-2 text-lg font-semibold text-main"},qs={class:"truncate"},Hs={class:"grid grid-cols-1 md:!grid-cols-4 auto-cols-auto gap-4 px-4 pb-6"},Ks={class:"bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3"},Qs={class:"text-sm mb-1"},Xs={class:"text-lg font-semibold text-main"},Ys={class:"bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3"},Zs={class:"text-sm mb-1"},Ms={class:"text-lg font-semibold text-main"},to={class:"bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3"},eo={class:"text-sm mb-1"},so={class:"text-lg font-semibold text-main"},oo={class:"bg-grey-100 dark:bg-[#141414] rounded-sm px-4 py-3"},no={class:"text-sm mb-1"},ao={class:"text-lg font-semibold text-main"},lo={key:0,class:"px-4 pb-4 overflow-auto"},ro={class:"table table-compact w-full table-zebra"},co=["onClick"],io=["onClick"],uo={class:"grid grid-cols-3 gap-4 px-4 pb-6 mt-4"},_o={for:"PingTokenConvert",class:"btn #sav1 text-white"},ho=["chain-name","endpoint","hd-path"],po={class:"#saved rounded mt-4"},go={class:"px-4 pt-4 pb-2 text-lg font-semibold text-main"},vo=t("div",{class:"h-4"},null,-1),fo={key:2,class:"#saved rounded mt-4"},bo={class:"px-4 pt-4 pb-2 text-lg font-semibold text-main"},xo=t("div",{class:"h-4"},null,-1),ko=Z({__name:"index",props:["chain"],setup(r){const o=lt(),a=Dt(),c=Gt(),i=st(),v=It();et();const l=Wt(),_=y(()=>a.coinInfo);zt(()=>{a.loadDashboard(),c.loadMyAsset(),l.handleAbciInfo()});const u=y(()=>a.coinInfo.tickers[a.tickerIndex]),f=Y("");o.$subscribe((h,x)=>{x.chainName!==f.value&&(f.value=x.chainName,a.loadDashboard(),c.loadMyAsset(),l.handleAbciInfo())});function w(h,x){return h.toLowerCase().startsWith("ibc/")||h.toLowerCase().startsWith("0x")?x:h}const S=[{name:"Website",icon:"mdi-web",href:a.homepage},{name:"Twitter",icon:"mdi-twitter",href:a.twitter},{name:"Telegram",icon:"mdi-telegram",href:a.telegram},{name:"Github",icon:"mdi-github",href:a.github}],$=y(()=>{const h=c.balanceOfStakingToken;return h?i.priceChanges(h.denom):0}),E=y(()=>{switch(!0){case $.value>0:return"text-customGreen";case $.value===0:return"text-grey-500";case $.value<0:return"text-red-600"}});function O(){c.loadMyAsset()}function M(h){return`text-${Pt(h)}`}const V=Y(100),N=y({get:()=>parseFloat(V.value.toFixed(6)),set:h=>{V.value=h}}),R=y({get:()=>V.value*u.value.converted_last.usd||0,set:h=>{V.value=h/u.value.converted_last.usd||0}});return(h,x)=>{var G,W,z,J,F,U,q,s,B,I,C,H,rt,ct,dt,it,ut,_t;const L=Tt("RouterLink");return p(),g("div",null,[e(_)&&e(_).name?(p(),g("div",Xe,[t("div",Ye,[t("div",Ze,[t("div",Me,[D(n(e(_).name)+" (",1),t("span",ts,n(e(_).symbol),1),D(") ")]),t("div",es,[D(n(h.$t("index.rank"))+": ",1),t("div",ss," #"+n(e(_).market_cap_rank),1)]),t("div",os,[(p(),g(A,null,j(S,(d,T)=>t("a",{key:T,href:d.href,class:"link link_style px-2 py-1 rounded-sm no-underline hover: #saved hover:bg-grey-950 dark:hover:bg-grey-950 flex items-center"},[b(e(nt),{icon:d==null?void 0:d.icon},null,8,["icon"]),t("span",as,n(d==null?void 0:d.name),1)],8,ns)),64))]),t("div",null,[t("div",ls,[t("label",null,[t("div",rs,[t("div",null,[t("div",cs,n(((W=(G=e(u))==null?void 0:G.market)==null?void 0:W.name)||""),1),t("div",ds,n(w((z=e(u))==null?void 0:z.base,(J=e(u))==null?void 0:J.coin_id))+"/"+n(w((F=e(u))==null?void 0:F.target,(U=e(u))==null?void 0:U.target_coin_id)),1)]),t("div",is,[t("div",us," $"+n((s=(q=e(u))==null?void 0:q.converted_last)==null?void 0:s.usd),1),t("div",{class:k(["text-sm",e(a).priceColor])},n(e(a).priceChange)+"% ",3)])])]),t("div",_s,[t("div",hs,[t("ul",ps,[(p(!0),g(A,null,j(e(a).coinInfo.tickers,(d,T)=>{var K,Q;return p(),g("li",{key:T,onClick:ot=>e(a).selectTicker(T)},[t("div",vs,[t("div",fs,[t("div",{class:k(["text-main text-sm",M(d.trust_score)])},n((K=d==null?void 0:d.market)==null?void 0:K.name),3),t("div",bs,n(w(d==null?void 0:d.base,d==null?void 0:d.coin_id))+"/"+n(w(d==null?void 0:d.target,d==null?void 0:d.target_coin_id)),1)]),t("div",xs," $"+n((Q=d==null?void 0:d.converted_last)==null?void 0:Q.usd),1)])],8,gs)}),128))])])])]),t("div",ks,[t("div",ys,[t("div",ms,[t("h3",ws,n(h.$t("index.price_calculator")),1),t("div",$s,[t("div",Cs,[t("div",Ss,[t("label",Is,[t("span",Ts,n(e(_).symbol),1)]),bt(t("input",{type:"number","onUpdate:modelValue":x[0]||(x[0]=d=>kt(N)?N.value=d:null),min:"0",placeholder:"Input a number",class:"input grow input-bordered join-item"},null,512),[[xt,e(N)]])])]),Ps,t("div",Ds,[t("div",As,[Es,bt(t("input",{type:"number","onUpdate:modelValue":x[1]||(x[1]=d=>kt(R)?R.value=d:null),min:"0",placeholder:"Input amount",class:"join-item grow input input-bordered"},null,512),[[xt,e(R)]])])])])]),t("label",Os,n(h.$t("index.close")),1)]),t("a",{class:k(["my-5 !text-white btn grow",{"!btn-base-content":e(a).trustColor==="green","!btn-customGreen":e(a).trustColor==="yellow"}]),href:e(u).trade_url,target:"_blank"},n(h.$t("index.buy"))+" "+n(e(_).symbol||""),11,Vs)])])]),t("div",js,[b(Zt)])]),Ns,t("div",Rs,[b(e(Kt),{"model-value":(B=e(_).description)==null?void 0:B.en,previewOnly:""},null,8,["model-value"])]),t("div",Ls,[(p(!0),g(A,null,j(e(_).categories,d=>(p(),g("div",Bs,n(d),1))),256))])])):m("",!0),t("div",Gs,[(p(!0),g(A,null,j(e(a).stats,(d,T)=>(p(),g("div",{key:T},[b(de,Jt(Ft(d)),null,16)]))),128))]),b(Ut,{id:"chain-home-banner-ad",unit:"banner",width:"970px",height:"90px"}),e(o).supportModule("governance")?(p(),g("div",Ws,[zs,t("div",Js,[b(Qe,{proposals:(I=e(a))==null?void 0:I.proposals},null,8,["proposals"])])])):m("",!0),t("div",Fs,[t("div",Us,[t("span",qs,n(e(c).currentAddress||"Not Connected"),1),e(c).currentAddress?(p(),at(L,{key:0,class:"float-right text-sm cursor-pointert link link_style no-underline font-medium",to:`/${r.chain}/account/${e(c).currentAddress}`},{default:X(()=>[D(n(h.$t("index.more")),1)]),_:1},8,["to"])):m("",!0)]),t("div",Hs,[t("div",Ks,[t("div",Qs,n(h.$t("account.balance")),1),t("div",Xs,n(e(i).formatToken(e(c).balanceOfStakingToken)),1),t("div",{class:k(["text-sm",e(E)])}," $"+n(e(i).tokenValue(e(c).balanceOfStakingToken)),3)]),t("div",Ys,[t("div",Zs,n(h.$t("module.staking")),1),t("div",Ms,n(e(i).formatToken(e(c).stakingAmount)),1),t("div",{class:k(["text-sm",e(E)])}," $"+n(e(i).tokenValue(e(c).stakingAmount)),3)]),t("div",to,[t("div",eo,n(h.$t("index.reward")),1),t("div",so,n(e(i).formatToken(e(c).rewardAmount)),1),t("div",{class:k(["text-sm",e(E)])}," $"+n(e(i).tokenValue(e(c).rewardAmount)),3)]),t("div",oo,[t("div",no,n(h.$t("index.unbonding")),1),t("div",ao,n(e(i).formatToken(e(c).unbondingAmount)),1),t("div",{class:k(["text-sm",e(E)])}," $"+n(e(i).tokenValue(e(c).unbondingAmount)),3)])]),e(c).delegations.length>0?(p(),g("div",lo,[t("table",ro,[t("thead",null,[t("tr",null,[t("th",null,n(h.$t("account.validator")),1),t("th",null,n(h.$t("account.delegations")),1),t("th",null,n(h.$t("account.rewards")),1),t("th",null,n(h.$t("staking.actions")),1)])]),t("tbody",null,[(p(!0),g(A,null,j(e(c).delegations,(d,T)=>{var K,Q,ot,ht,pt;return p(),g("tr",{key:T},[t("td",null,[b(L,{class:"link link_style no-underline",to:`/${r.chain}/staking/${(K=d==null?void 0:d.delegation)==null?void 0:K.validator_address}`},{default:X(()=>{var P;return[D(n(e(i).validatorFromBech32((P=d==null?void 0:d.delegation)==null?void 0:P.validator_address)),1)]}),_:2},1032,["to"])]),t("td",null,n(e(i).formatToken(d==null?void 0:d.balance)),1),t("td",null,n(e(i).formatTokens((pt=(ht=(ot=(Q=e(c))==null?void 0:Q.rewards)==null?void 0:ot.rewards)==null?void 0:ht.find(P=>{var gt;return(P==null?void 0:P.validator_address)===((gt=d==null?void 0:d.delegation)==null?void 0:gt.validator_address)}))==null?void 0:pt.reward)),1),t("td",null,[t("div",null,[t("label",{for:"delegate",class:"btn !btn-xs ! #sav1 btn-ghost rounded-sm mr-2",onClick:P=>e(v).open("delegate",{validator_address:d.delegation.validator_address},O)},n(h.$t("account.btn_delegate")),9,co),t("label",{for:"withdraw",class:"btn !btn-xs ! #sav1 btn-ghost rounded-sm",onClick:P=>e(v).open("withdraw",{validator_address:d.delegation.validator_address},O)},n(h.$t("index.btn_withdraw_reward")),9,io)])])])}),128))])])])):m("",!0),t("div",uo,[t("label",_o,n(h.$t("index.btn_swap")),1),t("label",{for:"send",class:"btn !bg-yes !border-yes text-white",onClick:x[2]||(x[2]=d=>e(v).open("send",{},O))},n(h.$t("account.btn_send")),1),t("label",{for:"delegate",class:"btn !bg-info !border-info text-white",onClick:x[3]||(x[3]=d=>e(v).open("delegate",{},O))},n(h.$t("account.btn_delegate")),1),b(L,{to:"/wallet/receive",class:"btn !bg-info !border-info text-white hidden"},{default:X(()=>[D(n(h.$t("index.receive")),1)]),_:1})]),(p(),at(qt,{to:"body"},[t("ping-token-convert",{"chain-name":(H=(C=e(o))==null?void 0:C.current)==null?void 0:H.prettyName,endpoint:(ct=(rt=e(o))==null?void 0:rt.endpoint)==null?void 0:ct.address,"hd-path":(it=(dt=e(c))==null?void 0:dt.connectedWallet)==null?void 0:it.hdPath},null,8,ho)]))]),t("div",po,[t("div",go,n(h.$t("index.app_versions")),1),b(yt,{value:(ut=e(l).appVersion)==null?void 0:ut.items,thead:!1},null,8,["value"]),vo]),e(a).coingeckoId?m("",!0):(p(),g("div",fo,[t("div",bo,n(h.$t("index.node_info")),1),b(yt,{value:(_t=e(l).nodeVersion)==null?void 0:_t.items,thead:!1},null,8,["value"]),xo]))])}}});typeof mt=="function"&&mt(ko);export{ko as default};
