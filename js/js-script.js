const _waitgif="/static/index/css/imgs/wait_gif.svg";
var rem=function(e){
	document.documentElement.style.fontSize=(document.documentElement.clientWidth/750)*e+"px";
}

var ge=function(e){return new Gere.init(e);}
Gere={
	init:function(e){
		this[0]=typeof(e)=="object"?e:document.getElementById(e);
		return this;
	},
	css:function(e,f){
		for(var i in f){
			e.style[i]=f[i];
		}
	},
	style:function(o,n){
		const e=n?n:null;
		return window.getComputedStyle?window.getComputedStyle(o,e):o.currentStyle;
	},
	opacity:function(o,f,fc){
		let s=this.style(o).opacity*1;
		let v=s>f?-0.01:0.01;
		const sv=setInterval(function(){
			s+=v;
			if(s<0||s>1){
				clearInterval(sv);
				s<0?o.style.opacity=0:o.style.opacity=1;
				fc?fc():'';
			}else{
				o.style.opacity=s;
			}
		},1);
	},
	newbg:function(m,r){
		const rgba=r?r:'rgba(0,0,0,0.5)';
		let o=this.create({
			'width':'100%',
			'height':document.documentElement.clientHeight+"px",
			'position':'fixed',
			'zIndex':'900',
			'top':'0',
			'left':'0',
			'backgroundColor':rgba
		},'div');
		m?o.appendChild(m):'';
		document.body.appendChild(o);
		return o;
	},
	addwait:function(e,t,b){
		e=e?e:"Loading";
		this.spanbg='rgba(255,255,255,0.8)';
		//this.spanimg=b?'url('+_waitgif+') no-repeat center top/0.3rem 0.3rem':'';
		this.padding=b?'0.3rem 0 0 0.2rem':'0.2rem 0';
		let o=this.create({
			'lineHeight':'0.5rem',
			'position':'absolute',
			'color':'rgb(61 143 201)',
			'textAlign':'center',
			'top':'50%',
			'width':'100%',
			'fontSize':'0.28rem',
			'fontWeight':'400',
			'background':this.spanbg,
			'textShadow':'0 0 0.1rem #ccc',
			'padding':this.padding
		},'span');
		const bg=this.newbg(o);
		bg.style.opacity=0;
		if(b){
			e='<svg viewbox="-1 -2 148 147" xmlns="http://www.w3.org/2000/svg" style="width:0.5rem;display:block;margin:0 auto;rotate:-46deg;"><defs>		<g id="hb_petal_loading_id" fill="none" fill-rule="evenodd"><path d="m138.202 6.04-38.053.142c-10.609.704-15.236.704-29.356 7.012-25.534 11.31-37.165 43.13-35.934 58.426 1.23 15.296 1.762 19.878 7.642 30.243 5.879 10.364 20.595 33.162 57.52 34.69 18.145.184 30.86.144 8.144-.12l.774-18.162c1.108-16.41-2.866-30.769-7.743-44.7-11.796-28.034-31.93-48.16-60.403-60.377C49.713 6.298 40.67 4.565 25.84 5.52l-18.254.662V42.06c.473 13.995 3.164 24.755 7.935 33.225 7.472 13.264 16.673 20.334 26.98 26.579 15.502 6.459 20.63 7.37 30.403 7.58 31.14 0 49.979-21.439 58.41-35.871 3.627-10.333 7.625-16.855 6.888-36.589V6.04Z"></path></g></defs>	<use xlink:href="#hb_petal_loading_id" stroke="rgba(0,0,0,0.15)" stroke-width="14"></use><use xlink:href="#hb_petal_loading_id" class="wait_gif" stroke="#FF5967" stroke-width="14" stroke-dasharray="771px 771px" stroke-linecap="square"></use></svg>'+e;
		}
		o.innerHTML=e;
		o.style.marginTop=-o.offsetHeight/2+'px';
		(function(e){
			if(t){
				const s=setTimeout(function(){
					e.opacity(bg,0,function(){e.delbg(bg)});
				},t);
			}
		})(this);
		this.opacity(bg,0.5);
		return bg;
	},
	delbg:function(o){
		o.parentNode.removeChild(o);
	},
	open:function(e,p,l){
		if(this.stat==1)
			return false;
		this.stat=1;
		e.style.top=document.body.outerHeight+"px";
		e.style.display="block";
		e.style.position="fixed";
		let s=0;
		switch(p){
			case "up":
				l?s=l:s=e.offsetHeight;
				e.style.bottom=-s+"px";
				this.move.up(e,s);break;
			case "down":
				l?s=l:s=e.offsetHeight;
				this.move.down(e,s);break;
		}
	},
	close:function(e,p,l){
		this.stat=0;
		let s=0;
		let s0=e.offsetTop
		switch(p){
			case "down":
				l?s=l:s=e.offsetHeight;
				this.move.down(e,s,function(){
					e.style.display="none";
					e.style.top=s0+"px";
				});break;
		}
	},
	move:{
		up:function(e,l,f){
			let b=e.offsetTop;
			let v=10;
			let s=0;
			_m=setInterval(function(){
				if(s>l){
					clearInterval(_m);
					e.style.top=b-l+"px";
					f?f():"";
				}else{
					s+=v;
					e.style.top=b-s+"px";
				}
			},1);
		},
		down:function(e,l,f){
			let b=e.offsetTop;
			let v=10;
			let s=0;
			_m=setInterval(function(){
				if(s>l){
					clearInterval(_m);
					e.style.top=b+l+"px";
					f?f():"";
				}else{
					s+=v;
					e.style.top=b+s+"px";
				}
			},1);
		}
	},
	touchmove:{
		listen:function(e){
			e.addEventListener("touchstart",this.site.y);
			e.addEventListener("touchmove", this.scroll);
			e.addEventListener("touchend",this.fix);
		},
		site:{
			x:function(e){
				e.preventDefault()
				this.X=e.changedTouches[0].screenX;
			},
			y:function(e){
				e.preventDefault()
				this.Y=e.changedTouches[0].screenY;
				this.t=this.offsetTop;
				this.lit=this.children[0].offsetHeight;
				this.sb=0+this.t;
				this.st=this.offsetHeight+this.t-this.lit;
			}
		},
		scroll:function(e){
			this.v=1.2;
			if(this.Y-e.changedTouches[0].screenY<=this.st*this.v && this.Y-e.changedTouches[0].screenY>=this.sb*this.v){
				this.style.top=Math.floor((e.changedTouches[0].screenY-this.Y)/this.v)+this.t+"px";
			}
		},
		fix:function(e){
			this.n=Math.round(this.t/this.lit,0);
			this.t=this.lit*this.n;
			if(this.Y-e.changedTouches[0].screenY<=this.st*this.v && this.Y-e.changedTouches[0].screenY>=this.sb*this.v){
				const n=Math.round((this.Y-e.changedTouches[0].screenY)/this.lit,0);
				this.style.top=this.t-this.lit*n+"px";
			}
			
			this.n=Math.round(this.offsetTop/this.lit,0);
			this.confirm(Math.abs(this.n));
		}
	},
	time:function(e,f,a){
		const v=0;
		this.st=new Date(e*1000);
		f?this.et=new Date(f).getTime():this.et=new Date().getTime();
		this.v=this.et-this.st;
		this.m=Math.floor((this.v-v)/(60*1000));
		this.s=this.v-v;
		return a?this.s:this.m;
	},
	showpass:function(e1,e2){
		e1.onclick=function(){
			e2.type='text';
		}
	},
	getcode:function(t){
		let e=window.location.href.split("?invite=")[1];
		let o;
		if(e){
			this.e=window.location.href.split("=")[1];
			if(t){
				o=ge(t)[0];
			}else{
				o=this[0]
			}
			o.setAttribute("readonly","true");
			o.value=this.e;
		}
	},
	box:function(e,s,b){
		var o=this.create(s,e);
		var btn;
		var m=0.9,n=0.8;
		var h=document.documentElement.clientHeight*n;
		var w=document.documentElement.clientWidth*m
		this.css(o,{"position":"fixed","height":h+"px","width":w+"px","top":"50%","left":"50%","margin":"-"+h/2+"px 0 0 -"+w/2+"px"});
		
		if(b){
			btn=this.create({
				"position":"absolute",
				"top":"-0.12rem",
				"right":"-0.12rem",
				"width":"0.4rem",
				"height":"0.4rem",
				"borderRadius":"0.4rem",
				"backgroundImage":"linear-gradient(244deg,#6688b8 50%,#73624f 50%,#6688b8 100%)",
				"color":"#fff",
				"fontSize":"0.3rem",
				"textAlign":"center",
				"lineHeight":"0.4rem"
			},"span");
		}
		
		document.body.appendChild(o);
		o.appendChild(btn);
		return [o,btn];
	},
	create:function(s,n){
		if(typeof(s)=='object'){
			this.s=s;
			this.n=n;
		}else{
			this.s=n;
			this.n=s;
		}
		var o=document.createElement(this.n);
		this.css(o,this.s);
		return o;
	},
	string:function(v,l,s,f){
		if(f){
			let t;
			switch(f){
				case "num":
					t=/^[0-9]*$/;
					return s===0?l!=v.length?false:true:l<=v.length?false:true;
				break;
				case "weak":t=/^(?=.*[a-z])(?=.*[A-Z])[^]{8,16}$/;break;
				case "middle":t=/^(?=.*[a-z])(?=.*[A-Z]){8,16}$/;break;
				case "strong":t=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;break;
			}
			return t.test(v);
		}
		
		return s===0?l!=v.length?false:true:l<v.length?false:true;
	},
	imgbox:function(b,t,m){
		this.box=document.getElementById(b);
		this.s=this.box.getElementsByTagName(t)[0];
		this.s.innerHTML+=this.s.innerHTML;
		this.e=this.s.children;
		if(this.e.length<2){
			return false;
		}
		this.w=this.e[0].offsetWidth;
		for(var i=0;i<this.e.length;i++){
			this.e[i].style.width=this.w+"px";
		}
		this.s.style.width=this.w*this.e.length+"px";
		const n=this.e.length/2;
		this.l=this.e[1].offsetLeft-this.e[0].offsetLeft;
		this.t=[];
		this.bg='linear-gradient(188deg,#c8c8c8,#c8c8c8)';
		this.bg2='linear-gradient(188deg,#fff,#fff)';
		let v=0;

		if(m){
			const s1=0.2;
			const s2=0.1;
			const ms=0.05;
			this.box.parentNode.style.position="relative";

			this.tags=this.create({
				"width":(s1+ms)*n+"rem",
				"height":s1+"rem",
				"position":"absolute",
				"left":"50%",
				"marginLeft":-(s1+ms)*n /2+"rem",
				"bottom":"-0.4rem",
				"display":"flex",
				"justifyContent":"space-between"
			},"p");

			for(var i=0;i<n;i++){
				let t=this.create({
					"width":s1+"rem",
					"height":s1+"rem",
					"borderRadius":s1+"rem",
					"textAlign":"center",
					"fontSize":s1/2+"rem",
					"lineHeight":s1+"rem",
					"color":"#fff",
					"backgroundImage":this.bg,
					"fontFamily":"fantasy",
				},"span");
				t.setAttribute("tag",i);
				this.t.push(t);
				this.e[i].setAttribute("tag",i);
				this.tags.appendChild(t);
			}
			this.box.parentNode.appendChild(this.tags);
			this.t[v].style.backgroundImage=this.bg2;
		}

		let main=this;
		const reset=function(){
			for(var i=0;i<main.t.length;i++){
				main.t[i].style.backgroundImage=main.bg;
			}
		}
		let auto=function(){
			reset();
			const l0=main.e[v].offsetLeft;
			v++;
			const s=l0-main.e[v].offsetLeft;
			if(v==n){
				v=0;
				main.scroll(main.box,s,0);
			}else{
				main.scroll(main.box,s);
			}
			main.t[v].style.backgroundImage=main.bg2;
		}
		const mt=setInterval(auto,4000);
	},
	scroll:function(o,s,r,p){
		let os=0;
		const v=s<0?5:-5;
		const vs=o.scrollLeft;
		let f=this;
		let sc=function(){
			if(os-Math.abs(s)>=0){
				clearInterval(ms);
				r?r-1<0?o.scrollTop=0:o.scrollTop-s:r-1<0?o.scrollLeft=0:o.scrollLeft=vs-s;
				p?p():'';
				os=0;
				return;
			}
			os+=Math.abs(v);
			r?o.scrollTop+=v:o.scrollLeft+=v;
		}
		const ms=setInterval(sc,1);
	},
	copy:function(p,a){
		var o=this.create({"position":"absolute","left":"-100rem"},"input");
		o.setAttribute("value",p);
		document.body.appendChild(o);
		o.select();
		document.execCommand("copy");
		document.body.removeChild(o);
		alert(a);
	},
	value:function(e){
		let p="";
		for(var i=0;i<e.length;i++){
			const v1=document.getElementById(e[i]).value;
			const v2=document.getElementById(e[i]).innerHTML;
			v1?p+=e[i]+':"'+v1+'",':p+=e[i]+':"'+v2+'",';
		}
		p=p.substr(0,p.length-1);
		return Function('p','return {'+p+'}')();
	},
	infobox:{},
	pay:function(o,t,c,s,f){
		const v=s?s:'active';
		let a;
		const es=o[0].getElementsByTagName(t);
		function ch(e){
			if(e.target.getAttribute("e")=="false" || e.target==es[a]){
				if(e.target.getAttribute("e")=="false" && f){
					f(e.target);
				}
				return;
			}
			if(es[a].className.indexOf(" "+v)!=-1){
				es[a].className=es[a].className.replace(" "+v,"");
			}else{
				es[a].className=es[a].className.replace(v,"");
			}
			e.target.className+=" "+v;
			if(c){
				o.url=e.target.getAttribute(c.pay);
				o.cid=e.target.getAttribute(c.cid);
			}
			set();
			if(f){
				f(e.target);
			}
		}
		
		function set(){
			for(var i=0;i<es.length;i++){
				es[i].onclick=ch;
				if(es[i].className.indexOf(v)!=-1){
					a=i;
					if(c){
						o.url=es[i].getAttribute(c.pay);
						o.cid=es[i].getAttribute(c.cid);
					}
					if(f){
						f(es[i]);
					}
				}
			}
		}
		set();
	},
	imgload:function(e,t,f){
		let n=0;
		let m=0;
		let v=0;
		
		for(var i=0;i<e.length;i++){
			m++;
			let o=new Image();
			if(typeof e[i]==='object'){
				o.src=e[i].src;
			}else{
				o.src=e[i];
			}
			o.onload=function(){
				n++;
			};
		}

		let o=function(){
			if(m==n && v==0){
				v=1;
				clearInterval(imgload);
				f();
			}
		}

		imgload=setInterval(o,300);
		setTimeout(o,t)
	},
	tab:function(b,t){
		const box=ge(b)[0];
		const list=box.getElementsByTagName("ul");
		const tag=ge(t)[0].getElementsByTagName("a");
		const a="active";
		const s="on";
		let v=0;
		for(var i=0;i<tag.length;i++){
			tag[i].setAttribute("mark",i);
			tag[i].onclick=set;
			tag[i].className.indexOf(a)>0?v=i:'';
		}
		function set(e){
			if(tag[v].className.split(" ").length>1){
				tag[v].className=tag[v].className.replace(" "+a,"");
			}else{
				tag[v].className=tag[v].className.replace(a,"");
			}
			list[v].className=list[v].className.replace(" "+s,"");
			
			v=e.target.getAttribute("mark");
			e.target.className+=" "+a;
			list[v].className+=" "+s;
		}
	},
	confirm:function(t,o){
		let box;
		let tbox;
		let btn;
		let title;
		box=this.create({
			"width":"80%",
			"top":"50%",
			"left":"50%",
			"position":"fixed",
			"borderRadius":"0.3rem",
			"overflow":"hidden",
			"border":"0.01rem solid #fff",
			"backgroundImage":"linear-gradient(180deg,#fff,#fff)",
			"zIndex":"1000"
		},"section");

		if(o){
			title=this.create({
				"backgroundImage":"linear-gradient(180deg,#fff,#fff)",
				"padding":"0.2rem 0.3rem 0",
				"lineHeight":"0.6rem",
				"color":"#474a5b",
				"fontWeight":"600",
				"textAlign":"center",
				"borderBottom":"0.01rem solid #fff",
				"fontSize":"0.32rem"
			},"h4");
			btn=this.create({
				"display":"block",
				"margin":"0.3rem auto 0.5rem",
				"textAlign":"center",
				"width":"50%",
				"fontSize":"0.28rem",
				"color":"#fff",
				"borderRadius":"0.4rem",
				"lineHeight":"0.7rem",
			},'a');
			btn.className="btn";
			title.innerHTML=o.title;
			btn.setAttribute("href",o.url);
			box.appendChild(title);
			btn.innerHTML=o.btn;
		}

		tbox=this.create({
			"margin":"0.2rem",
			"textAlign":"center",
			"padding":"0.2rem 0"
		},"div");
		box.appendChild(tbox);
		tbox.innerHTML=t;
		const bg=this.newbg();
		document.body.appendChild(box);
		const h=box.offsetHeight;
		const w=box.offsetWidth;
		this.css(box,{
			"margin":-h/2+"px 0 0 "+-w/2+"px"
		});
		
		if(o){
			this.passvalue=function(){
				return document.getElementById(o.id).value;
			}
			box.appendChild(btn);
		}

		this.remove=function(){document.body.removeChild(box);document.body.removeChild(bg);}

		if(!o){
			setTimeout(function(){document.body.removeChild(box);},1000);
		}
	},
	red:function(bs,s,ls){
		const w=s.w;
		const h=s.h;
		const bw=bs.w;
		const bh=bs.h;
		let v=0;
		let m=this;
		let p=function(s){
			let o=m.create({
				'width':s.w+'rem',
				'height':s.h+'rem',
				'position':'absolute',
				'top':'50%',
				'left':'50%',
				'margin':'-'+s.h/2+'rem 0 0 -'+s.w/2+'rem',
				'zIndex':'1000',
				'background':'url('+s.url+') no-repeat left top/100% auto',
			},'section');
			return o;
		}
		let txt=function(s){
			let o=m.create({
				'textAlign':'center',
				'color':s.color,
				'fontSize':s.fontsize+'rem',
				'lineHeight':'0.4rem',
				'marginTop':s.h-0.6+'rem',
				'textShadow':'0.01rem 0.01rem 0.01rem #501f1f'
			},'p')
			return o;
		}
		let o1=p({w:bs.w,h:bs.h,url:bs.url});
		let o2=p({w:s.w,h:s.h,url:s.url});
		let o3=p({w:ls.w,h:ls.h,url:ls.url});
		let bg=this.newbg(o1,bs.rgba);
		let rbg=this.newbg(o2,s.rgba);
		let lbg=this.newbg(o3,ls.rgba);
		this.remove=function(){
			m.delbg(bg);
			m.delbg(rbg);
			m.delbg(lbg);
		}
		this.set=function(s){
			o2.style.backgroundImage='url('+s.url+')';
			o2.style.width=s.w+'rem';
			o2.style.height=s.h+'rem';
			o2.style.margin='-'+s.h/2+'rem 0 0 -'+s.w/2+'rem';
		}
		this.t=function(s,t){
			v==1?o2.removeChild(this.ot):'';
			this.ot=txt(s);
			v=1;
			o2.appendChild(this.ot);
			this.ot.innerHTML=t;
		}
		return o3;
	},
	passstatus:function(o){
		o=typeof o=='object'?o:ge(o)[0];
		o.type=='password'?o.type='text':o.type='password';
	},
	tree:function(b,t,f){
		const box=typeof b=='object'?b:ge(b)[0];
		const bts=box.getElementsByTagName(t.tag);

		for(var i=0;i<bts.length;i++){
			const main=this;
			bts[i].onclick=function(){
				const c=this.parentNode.className;
				this.parentNode.className=main.proto(c,t.active);
				const s=this.parentNode.getElementsByTagName("div");
				if(s){
					for(var i=0;i<s.length;i++){
						if(s[i].className.indexOf(t.list)>-1){
							return;
						}
					}
				}
				let o=main.create("div");
				f?f(this,o):'';
				o.className=t.list;
				this.parentNode.appendChild(o);
			}
		}
	},
	proto:function(s,t){
		s=s.indexOf(t)>-1?s=s.replace(t,''):s+" "+t;
		return s.replace(/(^\s*)|(\s*$)/g,'');
	},
	ajax:function(u,j,f,f2){
		$.ajax({
			url:u,
			type:"post",
			data: j,
			success: function(data) {

				
				if(data.code == 1){
					if(data.data && data.data.code == 99){
						f?f(data):'';
					}
					else{
						f?f(data):'';
						if(f2){
							ge().addwait(data.msg,1000)
						}
					}

					
				}else{
					if(data.data.type == 1 || data.data.type == 2){
						f?f(data):'';
						return;
					}
					
					if(f2){
						
						if(typeof(f2)=='function'){
							f2(data);
							ge().addwait(data.msg,2000)
							
							if(data.msg=='Insufficient balance'){
								setTimeout(()=>{
									document.location.href = '/index/index/recharge.html'
								},2000)
								
							}
							return;
						}
						if(data.msg=='Insufficient balance'){
							ge().addwait(data.msg,2000)
							setTimeout(()=>{
								document.location.href = '/index/index/recharge.html'
							},2000)
							return;
						}
						if(!data.msg && !data.code){
							// document.location.href = '/index/login/index.html'
							location.reload();
						}
						
						
						ge().addwait(data.msg,2000)
					}

					if(data.msg=='Insufficient balance'){
						ge().addwait(data.msg,2000)
						setTimeout(()=>{
							document.location.href = '/index/index/recharge.html'
						},2000)
						
					}
				}
			},
			error:function(data) {
				console.log("```````````error```````````````````",data)
				if(f2){
						if(typeof(f2)=='function'){
							f2(data);
							ge().addwait(data.msg,2000)
							return;
						}
						ge().addwait(data.msg,2000)
					}
			}
		});
	}
}
Gere.init.prototype=Gere;