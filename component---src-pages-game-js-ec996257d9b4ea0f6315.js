(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{gyVf:function(e,t,n){"use strict";n.r(t);var a=n("q1tI"),c=n.n(a),o=(n("Wbzz"),n("Bl7J")),r=(n("tBDR"),n("vrFN")),i=n("/a2i"),l=n("dbrF"),u=n("/MKj"),s=n("B6RA"),b=n("qWTO");t.default=function(){var e=Object(a.useState)(0),t=(e[0],e[1],Object(u.c)((function(e){return e.game}))),n=(t.centerBlocks,t.width,t.height,t.rocket,t.loading),p=t.blocksLine,f=t.resultMessage,g=t.wall,m=Object(u.b)();Object(l.b)((function(){p&&p.length>0&&m(Object(s.c)())}),200),Object(l.b)((function(){}),500),Object(a.useEffect)((function(){m(Object(s.d)({width:window.innerWidth,height:window.innerHeight})),m(Object(s.b)())}),[]);return c.a.createElement(o.a,null,c.a.createElement(r.a,{title:"Game"}),n&&c.a.createElement("h2",null,n),f&&c.a.createElement("h2",null,f),c.a.createElement("button",{style:{marginTop:"10px"},type:"button",class:"nes-btn is-primary",onClick:function(){return m(Object(s.f)())}},"Start"),c.a.createElement("button",{style:{marginTop:"10px"},type:"button",class:"nes-btn is-primary",onClick:function(){if(!p){m(Object(s.g)([{gender:"male",age:10,expressions:[{happy:.6}]}]))}}},"test"),p&&p.map((function(e){return c.a.createElement(i.a,{key:""+(e.x+e.y),x:e.x,y:e.y,colour:e.colour,rotation:0})})),console.log("wall",g),g&&g.map((function(e){return e.map((function(e){return c.a.createElement(i.a,{key:""+(e.x+e.y),x:e.x,y:e.y,colour:e.colour,rotation:0})}))})),c.a.createElement(b.a,{results:function(e){var t=[];e.forEach((function(e){t.push({gender:e.gender,age:e.age,expressions:e.expressions})})),p?m(Object(s.e)("Wait for the wall to be built")):(m(Object(s.g)(t)),m(Object(s.e)(null))),console.log("inside the thing",e)}}))}}}]);
//# sourceMappingURL=component---src-pages-game-js-ec996257d9b4ea0f6315.js.map