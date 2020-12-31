(this.webpackJsonppixelbilder=this.webpackJsonppixelbilder||[]).push([[0],{12:function(e,t,n){e.exports=n(13)},13:function(e,t,n){"use strict";n.r(t);var a=n(6),i=n(7),r=n(11),l=n(10),s=(n(14),n(0)),c=n.n(s),o=n(1),u=n.n(o),h=n(9),m=n(4),d=n.n(m),g=(n(21),[{value:1,label:"Schwarz/Weiss (1 Bit)"},{value:2,label:"Graustufen (2 Bit)"},{value:8,label:"Graustufen (8 Bit)"},{value:"rgbDec",label:"RGB24 (Dezimalzahlen)"},{value:9,label:"RGB9 (9 Bit)"},{value:24,label:"RGB24 (24 Bit)"},{value:"runLengthDec",label:"Laufl\xe4ngencodierung mit Dezimalzahlen"}]),p=function(e){Object(r.a)(n,e);var t=Object(l.a)(n);function n(e){var i;return Object(a.a)(this,n),(i=t.call(this,e)).imageChangeHandler=function(e){i.setState({imageString:e.target.value})},i.rowDimensionChange=function(e){e<=50?i.setState({rows:e}):i.setState({rows:50}),e>0&i.state.columns>0&0!=i.state.bitdepth&&i.setState({inputDisabled:!1})},i.columnDimensionChange=function(e){e<=50?i.setState({columns:e}):i.setState({columns:50}),i.state.rows>0&e>0&0!=i.state.bitdepth&&i.setState({inputDisabled:!1})},i.bitdepthChangeHandler=function(e){i.setState({bitdepth:e.value}),i.state.rows>0&i.state.columns>0&0!=e.value&&i.setState({inputDisabled:!1})},i.state={imageString:"",rows:0,columns:0,warnings:[],bitdepth:0,placeholderCol:"red",inputDisabled:!0},i}return Object(i.a)(n,[{key:"rgb",value:function(e,t,n){return"rgb("+e+","+t+","+n+")"}},{key:"getWarning",value:function(){return this.state.rows<=0|this.state.columns<=0?"Lege zuerst die Dimensionen des Bildes fest!":this.state.bitdepth<=0?"Lege zuerst die Codierung des Bildes fest!":""}},{key:"testBinaryStr",value:function(e){for(var t=0;t<e.length;t++)if("0"!==e[t]&&"1"!==e[t])return!1;return!0}},{key:"renderBinaryPixel",value:function(e,t){var n=this.state.bitdepth.valueOf();"rgbDec"===n&&(n=24),isNaN(n)&&(n=1);var a,i,r="",l=parseInt(Math.round(document.getElementById("image-container").clientWidth-0)/this.state.columns);i=String(.5*l)+"px",l=String(l)+"px";var s=255/(Math.pow(2,n)-1);if(!e||e.length<n||!this.testBinaryStr(e))r="?",a=this.rgb(255,255,255);else if(n>8){var o=this.splitNChars(e,n/3);s=255/(Math.pow(2,n/3)-1),a=this.rgb(parseInt(o[0],2)*s,parseInt(o[1],2)*s,parseInt(o[2],2)*s)}else a=this.rgb(parseInt(e,2)*s,parseInt(e,2)*s,parseInt(e,2)*s);return c.a.createElement("div",{className:"pixel",key:"pixel_"+t,style:{backgroundColor:a,height:l,width:l,fontSize:i}},c.a.createElement("span",{style:{verticalAlign:"middle"}},r))}},{key:"renderBinaryRow",value:function(e,t){for(var n=[],a=0;a<e.length;a++)n.push(this.renderBinaryPixel(e[a],a));return c.a.createElement("div",{className:"image-row",key:"row"+t},n)}},{key:"splitNChars",value:function(e,t){for(var n=[],a=0;a<e.length;a+=t)n.push(e.substr(a,t));return n}},{key:"explain0",value:function(){switch(this.state.bitdepth){case 0:return"";case 1:return"Die Bitsequenz soll eine Abfolge von einstelligen Bin\xe4rzahlen sein. 0 wird als Schwarz und 1 als Weiss interpretiert. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert.";case 2:return"Die Bitsequenz soll eine Abfolge von zweistelligen Bin\xe4rzahlen sein. 00 wird als Schwarz und 11 als Weiss interpretiert. Die Zahlen dazwischen stellen Graustufen dar. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert.";case 8:return"Die Bitsequenz soll eine Abfolge von achtstelligen Bin\xe4rzahlen sein. 00000000 wird als Schwarz und 11111111 als Weiss interpretiert. Die Zahlen dazwischen stellen Graustufen dar. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert.";case"rgbDec":return"Es wird eine Sequenz von kommagetrennten RGB-Codes erwartet. Die RGB-Codes enthalten drei durch Leerzeichen getrennte Dezimalzahlen";case 9:return"Die Bitsequenz soll eine Abfolge von neunstelligen Bin\xe4rzahlen sein. Die ersten drei Stellen bestimmen die Rotintensit\xe4t, die zweiten drei Stellen die Gr\xfcnintensit\xe4t und die letzten drei Stellen die Blauintensit\xe4t. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert.";case 24:return"Die Bitsequenz soll eine Abfolge von vierundzwanzigstelligen Bin\xe4rzahlen sein. Die ersten acht Stellen bestimmen die Rotintensit\xe4t, die zweiten acht Stellen die Gr\xfcnintensit\xe4t und die letzten acht Stellen die Blauintensit\xe4t. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert.";case"runLengthDec":return"Es wird eine Sequenz von kommagetrennten Dezimalzahlen erwartet. Die Zahlen beschreiben die Laufl\xe4ngencodierung eines Schwarz/Weiss-Bildes, wobei mit Weiss begonnen wird. Leerzeichen werden ignoriert und Zeilenumbr\xfcche als Kommas interpretiert.";case"runLengthBin4":return"Es wird eine Sequenz von vierstelligen Bin\xe4rzahlen erwartet. Die Zahlen beschreiben die Laufl\xe4ngencodierung eines Schwarz/Weiss-Bildes, wobei mit Weiss begonnen wird. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert.";case"runLengthBin8":return"Es wird eine Sequenz von achtstelligen Bin\xe4rzahlen erwartet. Die Zahlen beschreiben die Laufl\xe4ngencodierung eines Schwarz/Weiss-Bildes, wobei mit Weiss begonnen wird. Zeilenumbr\xfcche, Leerzeichen und Kommas werden ignoriert."}}},{key:"explain",value:function(){return isNaN(this.state.bitdepth)?" ":this.state.bitdepth<=8?"Pixel * Bittiefe = "+this.state.rows*this.state.columns+" * "+this.state.bitdepth+" = ":"Pixel * (3 * Bittiefe) = "+this.state.rows*this.state.columns+" * (3 * "+this.state.bitdepth/3+") = "}},{key:"explain_res",value:function(){return isNaN(this.state.bitdepth)?"-":this.state.bitdepth<=8?this.state.rows*this.state.columns*this.state.bitdepth+" Bits":this.state.rows*this.state.columns*(3*this.state.bitdepth/3)+" Bits"}},{key:"explain2",value:function(){return"runLengthDec"===this.state.bitdepth|"rgbDec"===this.state.bitdepth?"-":this.state.imageString.replace(/(\r\n|\n|\r)/gm,"").split(" ").join("").split(",").join("").length}},{key:"renderBinaryImage",value:function(){var e=this.state.bitdepth.valueOf(),t=this.state.imageString,n=0,a=[];if(isNaN(e))if("runLengthDec"===e){e=1;for(var i=t.valueOf().replace(/(\r\n|\n|\r)/gm,",").split(" ").join("").split(","),r=[],l=0;l<i.length;l++){var s=parseInt(i[l]);if(s>2500&&(s=2500),!isNaN(s))if(l%2===0)for(var o=0;o<s;o++)r.push(1);else for(var u=0;u<s;u++)r.push(0)}t=r.join("")}else if("runLengthBin4"===e|"runLengthBin8"===e){var h;e=1,h="runLengthBin4"===this.state.bitdepth?4:8;for(var m=t.valueOf().replace(/(\r\n|\n|\r)/gm,",").split(" ").join("").split(",").join(""),d=this.splitNChars(m,h),g=[],p=0;p<d.length;p++){var v=parseInt(d[p],2);if(!isNaN(v)&d[p].length===h)if(p%2===0)for(var b=0;b<v;b++)g.push(1);else for(var f=0;f<v;f++)g.push(0)}t=g.join("")}else{e=24;for(var w=t.valueOf().replace(/(\r\n|\n|\r)/gm,",").split(","),E=[],z=0;z<w.length;z++){var B=[],N=w[z].trim().split(" ");if(3!==N.length)B=["????????","????????","????????"];else for(var S=0;S<N.length;S++){var D=parseInt(N[S]);if(!isNaN(D)&D>=0&D<=255){for(var x=D.toString(2);x.length<8;)x="0"+x;B.push(x)}else B.push("????????")}E.push(B.join(""))}t=E.join("")}else t=t.replace(/(\r\n|\n|\r)/gm,"").split(" ").join("").split(",").join("");for(var y=this.splitNChars(t,e),L=0;L<this.state.rows;L++){for(var C=[],k=0;k<this.state.columns;k++){var j=y[n];C.push(j),n+=1}a.push(C)}for(var Z=[],I=0;I<a.length;I++)Z.push(this.renderBinaryRow(a[I],I));return c.a.createElement("div",null,Z)}},{key:"render",value:function(){return c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12 center-bar"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("div",{className:"text-center title-container rounded"},c.a.createElement("h1",null,"Pixelbilder")))),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-6"},c.a.createElement("div",null,c.a.createElement("div",{className:"text-center title-container rounded"},c.a.createElement("h5",null,"Dimensionen")),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("b",null,"Anzahl Spalten:"),c.a.createElement("div",{className:"float-right"},c.a.createElement(d.a,{mobile:!0,min:0,max:50,onChange:this.columnDimensionChange})))),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("b",null,"Anzahl Zeilen:"),c.a.createElement("div",{className:"float-right"},c.a.createElement(d.a,{mobile:!0,min:0,max:50,onChange:this.rowDimensionChange})),c.a.createElement("p",null,c.a.createElement("br",null),c.a.createElement("b",null,"Pixel =")," Spalten * Zeilen = ",this.state.columns," * ",this.state.rows," = ",c.a.createElement("b",null,this.state.rows*this.state.columns," Pixel")))))))),c.a.createElement("div",{className:"col-md-6"},c.a.createElement("div",null,c.a.createElement("div",{className:"text-center title-container rounded"},c.a.createElement("h5",null,"Codierung")),c.a.createElement(h.a,{onChange:this.bitdepthChangeHandler,options:g}),c.a.createElement("p",null,c.a.createElement("i",null,this.explain0()))))),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-md-6"},c.a.createElement("div",{className:"text-center title-container rounded"},c.a.createElement("h5",null,"Bitsequenz")),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("b",null,"N\xf6tige L\xe4nge der Bitsequenz:")," ",this.explain()," ",c.a.createElement("b",null,this.explain_res()),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement("b",null,"Aktuelle L\xe4nge der Bitsequenz: ",this.explain2()," Bits"),c.a.createElement("br",null),c.a.createElement("br",null)),c.a.createElement("div",{className:"col-lg-12"},c.a.createElement("textarea",{disabled:this.state.inputDisabled,type:"text",class:"flex-fill form-control prop-field",onChange:this.imageChangeHandler,placeholder:this.getWarning()})))),c.a.createElement("div",{className:"col-md-6"},c.a.createElement("div",null,c.a.createElement("div",{className:"text-center title-container rounded"},c.a.createElement("h5",null,"Pixelbild")),c.a.createElement("div",{id:"image-container",style:{backgroundColor:"white",display:"block",width:"100%"}},this.renderBinaryImage()))))))),c.a.createElement("div",{class:"bottom"},"Contact: ",c.a.createElement("a",{href:"mailto:hooljohannes@gmail.com"},"Johannes Hool"))))}}]),n}(c.a.Component);u.a.render(c.a.createElement(p,null),document.getElementById("root"))},21:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.5b18d2a2.chunk.js.map