(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{18:function(t,e,n){t.exports=n(41)},23:function(t,e,n){},41:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(17),i=n.n(o),l=(n(23),n(2)),c=n(3),s=n(5),u=n(4),p=n(1),f=n(7),h=n.n(f),m="UP",d={yellow:{UP:"/static/images/yellow_up.png",DOWN:"/static/images/yellow_down.png",LEFT:"/static/images/yellow_left.png",RIGHT:"/static/images/yellow_right.png"},red:{UP:"/static/images/red_up.png",DOWN:"/static/images/red_down.png",LEFT:"/static/images/red_left.png",RIGHT:"/static/images/red_right.png"},green:{UP:"/static/images/green_up.png",DOWN:"/static/images/green_down.png",LEFT:"/static/images/green_left.png",RIGHT:"/static/images/green_right.png"},blue:{UP:"/static/images/blue_up.png",DOWN:"/static/images/blue_down.png",LEFT:"/static/images/blue_left.png",RIGHT:"/static/images/blue_right.png"}};function g(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var v=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(g()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){return Object(l.a)(this,r),n.call(this,t)}return Object(c.a)(r,[{key:"render",value:function(){var t=this;return a.a.createElement("div",{style:{width:"15%",float:"left"}},a.a.createElement("h3",null,"Moves:"),this.props.moveHistory.map((function(e){return a.a.createElement("img",{src:d[t.props.playerState[e.robot].colorSignifier][e.dir]})})))}}]),r}(a.a.Component);function y(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var b=function(t){var e=t.dimension,n=t.position,r=e+"px";return{width:r,height:r,backgroundColor:"#807878",position:"absolute",top:n.top+"px",left:n.left+"px",transition:"all 0.1s ease"}},E=function(t){var e=t.dimension,n=(t.position,e-4+"px");return{width:n,height:n,backgroundColor:"#c4a1a1",position:"absolute",top:"2px",left:"2px",transition:"all 0.1s ease"}},S=function(t){var e=t.dimension,n=(t.position,(e-4)/2+"px");return{width:n,height:n,backgroundColor:"#e1e1e1",position:"absolute",top:(e-4)/4+"px",left:(e-4)/4+"px",transition:"all 0.1s ease"}},x=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(y()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(){var t;Object(l.a)(this,r);for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o];return(t=n.call.apply(n,[this].concat(a))).handleClick=function(){t.props.handlePlayerMovementFromMouse(t.props.position)},t}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement("div",{onClick:this.handleClick,style:b(this.props)},a.a.createElement("div",{style:E(this.props)},a.a.createElement("div",{style:S(this.props)})))}}]),r}(a.a.Component),R=function(t,e){return{width:t+"px",height:e+"px",border:"1px solid black",position:"relative",margin:"25px auto",overflow:"hidden",float:"left",marginRight:"30px"}},O=function(t){var e=t.width,n=t.height,r=t.children;return a.a.createElement("div",{style:R(e,n)},r)};function w(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var k=function(t){var e=t.dimension,n=t.position,r=e+"px";return{width:r,height:r,position:"absolute",top:n.top+"px",left:n.left+"px",transition:"all 0.1s ease"}},j=function(t){var e=t.dimension-4+"px";return{width:e,height:e,position:"absolute",top:"2px",left:"2px",transition:"all 0.1s ease"}},C=function(t){var e=t.dimension,n=t.color,r=e-4-8+"px",a=void 0,o="none";return t.index===t.selected&&(a="#ffd700",o="solid"),{width:r,height:r,backgroundColor:n,borderStyle:o,borderColor:a,position:"absolute",borderRadius:"50%",top:"4px",left:"4px",transition:"all 0.1s ease"}},P=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(w()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(){var t;Object(l.a)(this,r);for(var e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o];return(t=n.call.apply(n,[this].concat(a))).handleKeyDown=function(e){var n;switch(e.keyCode){case 37:n={top:0,left:-40,dir:"LEFT"};break;case 38:n={top:-40,left:0,dir:m};break;case 39:n={top:0,left:40,dir:"RIGHT"};break;case 40:n={top:40,left:0,dir:"DOWN"};break;case 9:return void t.props.tabSelector();default:return}t.props.handlePlayerMovement(n)},t.handleClick=function(){t.props.onClick(t.props.index)},t}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement("div",{onClick:this.handleClick,style:k(this.props)},a.a.createElement("div",{style:j(this.props)},a.a.createElement("div",{style:C(this.props)})))}},{key:"componentDidMount",value:function(){window.onkeydown=this.handleKeyDown}}]),r}(a.a.Component),D=function(t){var e=t.orientation,n=t.dimension,r=t.position;if("horizontal"==e)var a=n+"px",o="8px";else a="8px",o=n+"px";return{width:a,height:o,backgroundColor:"black",position:"absolute",top:r.top+"px",left:r.left+"px",transition:"all 0.1s ease"}},M=function(t){return a.a.createElement("div",{style:D(t)})},z=function(t){var e=t.dimension,n=t.position,r=e+"px";return{width:r,height:r,position:"absolute",top:n.top+"px",left:n.left+"px",transition:"all 0.1s ease"}},T=function(t){return a.a.createElement("img",{src:"/static/images/swirl.png",style:z(t)})},G=function(t){var e=t.dir,n=t.position,r=t.endPosition,a=t.color,o=0,i=0,l=0,c=0;return void 0!==n&&void 0!==r&&("LEFT"===e?(l=r.top,c=r.left,o=n.left-r.left+"px",i="4px"):"RIGHT"===e?(l=n.top,c=n.left,o=r.left-n.left+"px",i="4px"):e===m?(l=r.top,c=r.left,o="4px",i=n.top-r.top+"px"):(l=n.top,c=n.left,o="4px",i=r.top-n.top+"px")),{width:o,height:i,backgroundColor:a,position:"absolute",top:(l+=18)+"px",left:(c+=18)+"px",transition:"all 0.1s ease"}},H=function(t){return a.a.createElement("div",{style:G(t)})},L=function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t};function _(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var F=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(_()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){return Object(l.a)(this,r),n.call(this,t)}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",null,"You Win! with ",this.props.numMoves," Moves!"),a.a.createElement("input",{style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px",float:"left"},id:"namesubmitHS",type:"text",placeholder:"Username"}),a.a.createElement("form",{onSubmit:this.props.submitAnswer,style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px",float:"left"}},a.a.createElement("button",{type:"submit"},"Submit Highscore ")))}}]),r}(a.a.Component);function B(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var I=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(B()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){return Object(l.a)(this,r),n.call(this,t)}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:this.props.submitPuzzle,style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px",float:"left"}},a.a.createElement("button",{type:"submit"},"Create Puzzle")),a.a.createElement("input",{style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px",float:"left"},id:"namesubmit",type:"text",placeholder:"Name Of Puzzle?"}))}}]),r}(a.a.Component),N=function(t){var e=t.highscores;return a.a.createElement("div",{style:{marginleft:"15px",float:"left"}},"All Highscores:",e.map((function(t){return function(t){return a.a.createElement("div",{style:{marginBottom:"20px",marginTop:"10px"}},"By: "+t.comment,a.a.createElement("div",null,"Moves: "+t.numMoves))}(t)})))};function W(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var A=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(W()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){return Object(l.a)(this,r),n.call(this,t)}return Object(c.a)(r,[{key:"render",value:function(){var t=this;return a.a.createElement("div",{id:"DisplayView",style:{marginRight:"10px",float:"left",width:"15%"}},a.a.createElement("div",null,"http://"+window.location.host+"/play/"+this.props.uri),this.props.playerState.map((function(e){return t.props.checkwin(e)})),a.a.createElement("div",null,a.a.createElement("form",{onSubmit:this.props.resetPuzzle,style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px",float:"left"}},a.a.createElement("button",{type:"submit"},"Reset"))))}}]),r}(a.a.Component);function U(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var V=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(U()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){var e;return Object(l.a)(this,r),(e=n.call(this,t)).handleClick=function(t){e.props.onClick()},e}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement("div",{style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px",float:"left"}},"Toggle Line Indicators:",a.a.createElement("label",{class:"switch"},a.a.createElement("input",{id:"toggleLineIndicators",onClick:this.handleClick,type:"checkbox",class:"real-checkbox"}),a.a.createElement("span",{class:"slider round"})))}}]),r}(a.a.Component),Y=function(t,e,n,r,a){var o=e.left,i=e.top,l=!1;t.map((function(t){t.top==i-4&&t.left==o-40&&(l=!0)}));var c=n.top==i&&n.left==o-44;return!(l&&c)},J=function(t,e,n,r,a){var o=e.left,i=e.top,l=!1;n.map((function(t){t.top==i-44&&t.left==o&&(l=!0)}));var c=!1,s=!1;return t.map((function(t){t.top==i-40&&t.left==o-4&&(c=!0),t.top==i-40&&t.left==o+36&&(s=!0)})),!(l&&(c||s)||c&&s)},K=function(t,e,n){var r,a,o=0;do{o=0,r=Math.floor(Math.random()*Math.floor(n/40)),a=Math.floor(Math.random()*Math.floor(e/40)),t.map((function(t){40*r==t.top&&40*a==t.left&&(o=1)}))}while(1==o);return{top:40*r,left:40*a}};function $(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}window.addEventListener("keydown",(function(t){[32,37,38,39,40,9].indexOf(t.keyCode)>-1&&t.preventDefault()}),!1);var q=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if($()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){var e;if(Object(l.a)(this,r),(e=n.call(this,t)).robotSelect=function(t){e.setState({robotSelected:t})},e.submitPuzzle=function(t){t.preventDefault();var n=document.getElementById("namesubmit").value,r=e.state;r.playerState=e.state.playerStart.slice(),r.moveHistory=[],r.createMode="No",h.a.post("/submitpuzzle",L({puzzledata:r},{name:n})).then((function(t){e.setState({uri:t.data.uri})}))},e.toggleLineIndicators=function(){0==e.state.ColoredLineDirections.length?e.setState({ColoredLineDirections:["LEFT","RIGHT",m,"DOWN"]}):e.setState({ColoredLineDirections:[]})},e.submitAnswer=function(t){t.preventDefault(),console.log(e.state.uri),h.a.post("/submithighscore",{highscore:e.state.moveHistory.length,name:document.getElementById("namesubmitHS").value,uri:e.state.uri}).then((function(t){console.log(t),console.log(t.data)}))},e.resetPuzzle=function(t){t.preventDefault(),e.setState({playerState:e.state.playerStart.slice(),moveHistory:[]})},e.tabSelector=function(){var t=e.state.robotSelected+1;t%=4,e.setState({robotSelected:t})},e.handleCollision=function(t,n,r){var a,o=e.state.playerState[n].left,i=e.state.playerState[n].top;switch(t.dir){case m:var l=0;e.state.wallHorizontal.map((function(t){t.left===o&&t.top<i&&t.top>l&&(l=t.top+4)})),e.state.playerState.map((function(t){t.left===o&&t.top<i&&t.top>l-4&&(l=t.top+40)})),a={top:l,left:o,color:r};break;case"RIGHT":l=600;e.state.wallVerticle.map((function(t){t.top===i&&t.left>o&&t.left<l&&(l=t.left-36)})),e.state.playerState.map((function(t){t.top===i&&t.left>o&&t.left<l+36&&(l=t.left-40)})),a={top:i,left:l,color:r};break;case"LEFT":l=0;e.state.wallVerticle.map((function(t){t.top===i&&t.left<o&&t.left>l&&(l=t.left+4)})),e.state.playerState.map((function(t){t.top===i&&t.left<o&&t.left>l-4&&(l=t.left+40)})),a={top:i,left:l,color:r};break;case"DOWN":l=600;e.state.wallHorizontal.map((function(t){t.left===o&&t.top>i&&t.top<l&&(l=t.top-36)})),e.state.playerState.map((function(t){t.left===o&&t.top>i&&t.top<l+36&&(l=t.top-40)})),a={top:l,left:o,color:r};break;default:return}return a},e.checkwin=function(t){return t.top===e.state.goal.top&&t.left===e.state.goal.left?"No"===e.state.createMode?a.a.createElement(F,{numMoves:e.state.moveHistory.length,submitAnswer:e.submitAnswer}):a.a.createElement(I,{submitPuzzle:e.submitPuzzle}):""},e.handlePlayerMovement=function(t){if(void 0!==t.dir){var n=e.handleCollision(t,e.state.robotSelected,e.state.playerState[e.state.robotSelected].color),r=e.state.playerState,a=e.state.moveHistory;(n=L(n,{colorSignifier:r[e.state.robotSelected].colorSignifier})).top===r[e.state.robotSelected].top&&n.left===r[e.state.robotSelected].left||a.push({dir:t.dir,robot:e.state.robotSelected,colorSignifier:r[e.state.robotSelected].colorSignifier}),r[e.state.robotSelected]=n,e.setState({playerState:r,moveHistory:a}),e.checkwin(n)}},e.handlePlayerMovementFromMouse=function(t){var n,r=e.state.playerState[e.state.robotSelected];n=t.top===r.top&&t.left<r.left?{top:0,left:-40,dir:"LEFT"}:t.top===r.top&&t.left>r.left?{top:0,left:40,dir:"RIGHT"}:t.top<r.top&&t.left===r.left?{top:-40,left:0,dir:m}:t.top>r.top&&t.left===r.left?{top:40,left:0,dir:"DOWN"}:{top:0,left:0,dir:void 0},e.handlePlayerMovement(n)},"Yes"==e.props.loadedGame)e.state=JSON.parse(e.props.gamedata),e.state.highscores=e.props.highscores,e.state.uri=e.props.uri,e.state.ColoredLineDirections=[];else{var o=function(t,e,n){for(var r=[],a=[{top:0,left:-4}],o=[],i=[],l={top:40*Math.floor(Math.random()*Math.floor(e/40)),left:40*Math.floor(Math.random()*Math.floor(t/40))},c=[l],s=0;s<5;s++)c.push(K(c,t,e));var u=L(c[1],{color:"#4169e1",colorSignifier:"blue"}),p=L(c[2],{color:"#228b22",colorSignifier:"green"}),f=L(c[3],{color:"#b22222",colorSignifier:"red"}),h=L(c[4],{color:"#ff8c00",colorSignifier:"yellow"});i.push(u),i.push(p),i.push(f),i.push(h);for(s=0;s<t;s+=40)for(var m=0;m<e;m+=40)r.push({top:m,left:s});for(m=0;m<e;m+=40)for(s=0;s<t;s+=40)s<1?a.push({top:m,left:s-4}):s==t-40&&a.push({top:m,left:s+36}),m<1?o.push({top:m-4,left:s}):m==e-40&&o.push({top:m+36,left:s});for(m=0;m<e;m+=40)for(s=0;s<t;s+=40)s>1&&s!=t-40&&Math.random()>n&&Y(o,{top:m,left:s},a[a.length-1])&&a.push({top:m,left:s-4}),m>1&&m!=e-40&&Math.random()>n&&J(a,{top:m,left:s},o)&&o.push({top:m-4,left:s});return{playerState:i,boardState:r,wallHorizontal:o,wallVerticle:a,goal:l,playerStart:i.slice()}}(640,640,.9);e.state=L({robotSelected:0,moveHistory:[],uri:"",createMode:"Yes",highscores:[],ColoredLineDirections:[]},o)}return e}return Object(c.a)(r,[{key:"render",value:function(){var t=this;return a.a.createElement("div",{id:"GameMain",style:{width:"100%"}},a.a.createElement(A,{playerState:this.state.playerState,uri:this.state.uri,resetPuzzle:this.resetPuzzle,highscores:this.state.highscores,checkwin:this.checkwin}),a.a.createElement(O,{width:640,height:640},this.state.boardState.map((function(e){return a.a.createElement(x,{dimension:40,position:{top:e.top,left:e.left},handlePlayerMovementFromMouse:t.handlePlayerMovementFromMouse})})),a.a.createElement(T,{dimension:40,position:this.state.goal}),this.state.ColoredLineDirections.map((function(e){return a.a.createElement(H,{dir:e,position:{top:t.state.playerState[t.state.robotSelected].top,left:t.state.playerState[t.state.robotSelected].left},endPosition:t.handleCollision({dir:e},t.state.robotSelected,t.state.playerState[t.state.robotSelected].color),color:"red"})})),this.state.playerState.map((function(e,n){return a.a.createElement(P,{dimension:40,position:{top:e.top,left:e.left},color:e.color,selected:t.state.robotSelected,index:n,onClick:t.robotSelect,handlePlayerMovement:t.handlePlayerMovement,tabSelector:t.tabSelector})})),this.state.wallHorizontal.map((function(t){return a.a.createElement(M,{orientation:"horizontal",dimension:40,position:{top:t.top,left:t.left}})})),this.state.wallVerticle.map((function(t){return a.a.createElement(M,{orientation:"verticle",dimension:40,position:{top:t.top,left:t.left}})}))),a.a.createElement(v,{moveHistory:this.state.moveHistory,playerState:this.state.playerState}),a.a.createElement(N,{highscores:this.state.highscores}),a.a.createElement(V,{onClick:this.toggleLineIndicators}))}}]),r}(a.a.Component);function Q(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var X=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(Q()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){return Object(l.a)(this,r),n.call(this,t)}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement(q,{loadedGame:"No"})}}]),r}(a.a.Component);function Z(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var tt=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(Z()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){var e;return Object(l.a)(this,r),(e=n.call(this,t)).handleGameClick=function(){e.props.handleGameClick(e.props.game.puzzledata,e.props.highscores,e.props.game.uri)},e}return Object(c.a)(r,[{key:"render",value:function(){var t=this.props.highscore;return"undefined"===typeof t&&(t={comment:"",numMoves:""}),a.a.createElement("div",{style:{marginRight:"25px",marginTop:"25px",marginBottom:"50px",marginLeft:"50px",paddingRight:"25px",paddingLeft:"25px",paddingTop:"25px",paddingBottom:"25px",float:"left"}},a.a.createElement("div",null,a.a.createElement("h2",{onClick:this.handleGameClick},this.props.game.name)),a.a.createElement("div",{style:{marginRight:"5px",marginTop:"15px",marginBottom:"15px"}},a.a.createElement("h4",null,"Highscore:"),a.a.createElement("div",null,a.a.createElement("div",null,t.comment),a.a.createElement("div",null,t.numMoves))))}}]),r}(a.a.Component);function et(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var nt=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(et()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){var e;Object(l.a)(this,r),(e=n.call(this,t)).handleGameClick=function(t,n,r){e.props.handleGameClick(t,n,r)};var a=window.gameslist,o=window.highscoreslist;return e.state={gameslist:a,highscoreslist:o},e}return Object(c.a)(r,[{key:"render",value:function(){var t=this;return a.a.createElement("div",{id:"GameMain"},this.state.gameslist.map((function(e,n){return a.a.createElement(tt,{handleGameClick:t.handleGameClick,game:e,highscores:t.state.highscoreslist[n],highscore:t.state.highscoreslist[n][0]})})))}}]),r}(a.a.Component);function rt(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var at=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(rt()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){return Object(l.a)(this,r),n.call(this,t)}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement(q,{loadedGame:"Yes",gamedata:this.props.gamedata,highscores:this.props.highscores,uri:this.props.uri})}}]),r}(a.a.Component);function ot(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var it=function(t){Object(s.a)(r,t);var e,n=(e=r,function(){var t,n=Object(p.a)(e);if(ot()){var r=Object(p.a)(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return Object(u.a)(this,t)});function r(t){var e;return Object(l.a)(this,r),(e=n.call(this,t)).handleGameClick=function(t,n,r){e.setState({PageSelected:a.a.createElement(at,{highscores:n,gamedata:t,uri:r})})},e.handleClickCreateGame=function(t){t.preventDefault(),e.setState({PageSelected:a.a.createElement(X,null)})},e.handleClickFindGame=function(t){t.preventDefault(),e.setState({PageSelected:a.a.createElement(nt,{handleGameClick:e.handleGameClick})})},console.log(window.highscoreslist),console.log(window.gameslist),""==window.uri?e.state={PageSelected:a.a.createElement(X,null)}:e.state={PageSelected:a.a.createElement(at,{gamedata:window.token.puzzledata,highscores:window.highscores,uri:window.uri})},e}return Object(c.a)(r,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("header",{id:"top"},a.a.createElement("div",{class:"site-title-nav"},a.a.createElement("input",{type:"checkbox",id:"tn-tg",class:"topnav-toggle fullscreen-toggle","aria-label":"Navigation"}),a.a.createElement("label",{for:"tn-tg",class:"fullscreen-mask"}),a.a.createElement("label",{for:"tn-tg",class:"hbg"},a.a.createElement("span",{class:"hbg__in"})),a.a.createElement("h1",{class:"site-title"},a.a.createElement("a",{href:"/"},"RobitsEvolved",a.a.createElement("span",null,".com"))),a.a.createElement("nav",{id:"topnav",class:"hover"},a.a.createElement("section",null,a.a.createElement("a",{href:"/"},a.a.createElement("span",{class:"play"},"Play"),a.a.createElement("span",{class:"home"},"robitsevolved")),a.a.createElement("div",{role:"group"},a.a.createElement("a",{onClick:this.handleClickCreateGame,href:"/#createGame"},"Create a game"),a.a.createElement("a",{onClick:this.handleClickFindGame,href:"/#findgame"},"Find a game"),a.a.createElement("a",{href:"/simul"},"Puzzle Rush"))),a.a.createElement("section",null,a.a.createElement("a",{href:"/training"},"Learn"),a.a.createElement("div",{role:"group"},a.a.createElement("a",{href:"/learn"},"Robits Basics"),a.a.createElement("a",{href:"/training"},"Starter Puzzles"))),a.a.createElement("section",null,a.a.createElement("a",{href:"/player"},"Community"),a.a.createElement("div",{role:"group"},a.a.createElement("a",{href:"/player"},"Players"),a.a.createElement("a",{href:"/team"},"Teams"),a.a.createElement("a",{href:"/forum"},"Forum"))),a.a.createElement("section",null,a.a.createElement("a",{href:"/analysis"},"Tools"),a.a.createElement("div",{role:"group"},a.a.createElement("a",{href:"/analysis"},"Robits solver (test)"),a.a.createElement("a",{href:"/analysis#explorer"},"Settings"))))),a.a.createElement("div",{class:"site-buttons"},a.a.createElement("div",{id:"clinput"},a.a.createElement("a",{class:"link"},a.a.createElement("span",{"data-icon":"y"})),a.a.createElement("input",{spellcheck:"false",autocomplete:"false","aria-label":"Search",placeholder:"Search"})),a.a.createElement("div",{class:"dasher"},a.a.createElement("a",{class:"toggle link anon"},a.a.createElement("span",{title:"Preferences","data-icon":"%"}))),a.a.createElement("a",{href:"/login?referrer=/",class:"signin button button-empty"},"Sign in"))),this.state.PageSelected)}}]),r}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(it,null),document.getElementById("MainApp")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.4ad5c80a.chunk.js.map