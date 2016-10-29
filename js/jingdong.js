 window.onload=function(){
 	var aa=jQuery.noConflict();
 	aa("img").lazyload({
 		threshold:200,
 		event:"scroll",
 		effect:"fadeIn",
 	});
 	console.log(aa("img"));

 	// TOP隐藏部分
 	var nav=$('.nav-hidden');
 	var hidden=$('.hidden1');
 	var top_nav=$('.top-nav');
 	var hidden_empty=$('.hidden-empty');
 	for(var i=0;i<nav.length;i++){
 		nav[i].index=i;
 		nav[i].onmouseover=function(){
 			nav[this.index].style.background='#fff';
 			hidden[this.index].style.display='block';
 			top_nav[this.index].style.background='#fff';
 			hidden_empty[this.index].style.display='block';
 		}
 		nav[i].onmouseout=function(){
 			nav[this.index].style.background='#F1F1F1'
 			hidden[this.index].style.display='none';
 			top_nav[this.index].style.background='transparent';
 			hidden_empty[this.index].style.display='none';
 		}
 	}
 	// 搜索框
 	var search=$('.search-k')[0];
 	search.onfocus=function(){
 		search.value=''
 	}
 	search.onblur=function(){
 		search.value='游戏本'
 	}
 	// 购物袋
 	var buy=$('.buy')[0];
 	var buy_empty=$('.buy-empty')[0];
 	var buy_con=$('.buy-con')[0];
 	buy.onmouseover=function(){
 		buy_empty.style.display='block';
 		buy_con.style.display='block';
 		buy.style.background='#fff';
 		buy.style.border='1px solid #fff';
 		buy.style.boxShadow=' 0 0 4px #DDDDDD';
 	}
 	buy.onmouseout=function(){
 		buy_empty.style.display='none';
 		buy_con.style.display='none';
 		buy.style.background='#F9F9F9';
 		buy.style.border='1px solid #DFDFDF';
 		buy.style.boxShadow=' 0 0 0 #DDDDDD';
 	}
 	// 导航
 	function color(obj){
 		var obj=obj;
	 	var dh=$('.left-con',obj);
	 	var hidden_con=$('.hidden-con');
	 	for(var i=0;i<dh.length;i++){
	 		dh[i].index=i;
	 		dh[i].onmouseover=function(){
	 			this.style.cssText='background:#F7F7F7';
	 			hidden_con[this.index].style.display='block';
	 		}
	 		dh[i].onmouseout=function(){
	 			this.style.cssText='background:#C81623';
	 			hidden_con[this.index].style.display='none';
	 		}
	 	}
	}
	color($('.banner-bottom')[0])
 	// 今日推荐轮播
 	function Recommend(obj){
	 	var recommend=obj;
	 	var width=recommend.offsetWidth;
	 	var recommend2_con=$('.recommend2-con');
	 	var Left=$('.recommendLeft')[0];
	 	var Right=$('.recommendRight')[0];	
	 	var n3=0;
	 	var next2=0;
	 	var flag=true;
	 	var t=setInterval(shift,10000);
	 	function shift(type){
	 		type=type||'right';
	 		if(type=='right'){
	 			if(!flag){
	 				return;
	 			}
	 			flag=false;
		 		next2=n3+1;
		 		if(next2>=recommend2_con.length){
		 			next2=0;
		 		}
		 		recommend2_con[next2].style.left=width+'px';
		 		animate(recommend2_con[n3],{left:-width},2000)
		 		animate(recommend2_con[next2],{left:0},2000,function(){
		 			flag=true;
		 		});
				n3=next2;
		 	}else if(type=='left'){
		 		if(!flag){
		 			return;
		 		}
		 		flag=false;
		 		next2=n3-1;
				if(next2<0){
					next2=recommend2_con.length-1;
				}
				recommend2_con[next2].style.left=-width+'px';
				animate(recommend2_con[next2],{left:0},2000);	
				animate(recommend2_con[n3],{left:width},2000,function(){
					flag=true;
				});
				n3=next2;
		 	}	
	 	};
	 	recommend.onmouseover=function(){
	 		clearInterval(t)
	 	}
	 	recommend.onmouseout=function(){
	 		t=setInterval(shift,10000);
	 	}
	 	Left.onclick=function(){
	 		shift('left')
	 	}
	 	Right.onclick=function(){
	 		shift('right')
	 	}
	}
	Recommend($('.recommend2')[0])
	// banner轮播
	function banner(obj){
		var box=obj;
		var img=$('.banner-img',box);
		var left=$('.left-arrow',box)[0];
		var right=$('.right-arrow',box)[0];
		var circle=$('.circle',box);
		var n=0;
		var flag=true;
		var t=setInterval(move,3000);
		function move(type){
			type=type||'right';
			if(type=='right'){
				if(!flag){
					return;
				}
				flag=false;
				n++;
				if(n>=img.length){
					n=0;
				}
				for(var i=0;i<img.length;i++){
					animate(img[i],{opacity:0},1000)
					circle[i].style.background='#3E3E3E'
				}
			}else if(type=='left'){
				if(!flag){
					return;
				}
				flag=false;
				n--;
				if(n<0){
					n=img.length-1;
				}
				for(var i=0;i<img.length;i++){
					animate(img[i],{opacity:0},1000)
					circle[i].style.background='#3E3E3E'
				}
			}
			animate(img[n],{opacity:1},1000,function(){flag=true});
			circle[n].style.background='#B61B1F';
		}
		box.onmouseover=function(){
			clearInterval(t);
		}
		box.onmouseout=function(){
			t=setInterval(move,3000);
		}
		right.onclick=function(){
			move('right');
		}
		left.onclick=function(){
			move('left')
		}
		for(var i=0;i<circle.length;i++){
			circle[i].index=i;
			circle[i].onmouseover=function(){
				if(this.index>n){
					n++;
					if(n>=img.length){
						n=0;
					}
					for(var i=0;i<img.length;i++){
						animate(img[i],{opacity:0},1000);
						circle[i].style.background='#3E3E3E';
					}
				}else if(this.index<n){
					n--;
					if(n<=0){
						n=img.length-1;
					}
					for(var i=0;i<img.length;i++){
						animate(img[i],{opacity:0},1000);
						circle[i].style.background='#3E3E3E';
					}	
				}
				animate(img[this.index],{opacity:1},1000);
				circle[this.index].style.background='#B61B1F';
				n=this.index;
			}
		}
	}
	banner($('.banner-middle')[0])
	// 楼层内轮播
	function carousel(obj){
		var protect=obj;
		var protect_img=$('.protect-img',protect);
		var protect_width=parseInt(getStyle(protect_img[0],'width'))
		var protect_img_bottom=$('.protect-img-bottom',protect);
		var protect_lis=$('.protect-lis',protect);
		var protectLeft=$('.protectLeft',protect)[0];
		var protectRight=$('.protectRight',protect)[0];
		var n2=0;
		var next=0;
		var flag=true;
		var t2=setInterval(move2,2000)
		function move2(){
			next=n2+1;
			if(!flag){
				return;
			}
			flag=false;
			if(next>=protect_img.length){
				next=0;
			}
			protect_img[next].style.left=protect_width+'px';
			protect_img_bottom[next].style.left=protect_width+'px';
			animate(protect_img[n2],{left:-protect_width},600,Tween.Quad.easeInOut)
			animate(protect_img_bottom[n2],{left:-protect_width},600,Tween.Quad.easeInOut)
			protect_lis[n2].style.background='#3E3E3E';
			animate(protect_img[next],{left:0},600,Tween.Quad.easeInOut)
			animate(protect_img_bottom[next],{left:0},600,Tween.Quad.easeInOut,function(){flag=true})
			protect_lis[next].style.background='#B61B1F';
			n2=next;
		}
		hover(protect_img,function(){
			clearInterval(t2);
			protectLeft.style.display='block';
			protectRight.style.display='block';
		},function(){
			t2=setInterval(move2,2000);
			protectLeft.style.display='none';
			protectRight.style.display='none';
		})
		protectRight.onclick=function(){
			move2();
		}
		protectLeft.onclick=function(){
			next=n2-1;
			if(!flag){
				return;
			}
			flag=false;
			if(next<0){
				next=protect_img.length-1;
			}
			protect_img[next].style.left=-protect_width+'px';
			protect_img_bottom[next].style.left=-protect_width+'px';
			animate(protect_img[next],{left:0},600,Tween.Quad.easeInOut)
			animate(protect_img_bottom[next],{left:0},600,Tween.Quad.easeInOut,function(){flag=true})
			animate(protect_img[n2],{left:protect_width},600,Tween.Quad.easeInOut)
			animate(protect_img_bottom[n2],{left:protect_width},600,Tween.Quad.easeInOut)
			protect_lis[n2].style.background='#3E3E3E';	
			protect_lis[next].style.background='#B61B1F';
			n2=next;
		}
		for(var i=0;i<protect_lis.length;i++){
			protect_lis[i].index=i;
			protect_lis[i].onclick=function(){
				if(this.index<n2){
					if(!flag){
						return;
					}
					flag=false;
					protect_img[this.index].style.left=-protect_width+'px';
					protect_img_bottom[this.index].style.left=-protect_width+'px';
					animate(protect_img[this.index],{left:0},600,Tween.Quad.easeInOut)
					animate(protect_img_bottom[this.index],{left:0},600,Tween.Quad.easeInOut,function(){flag=true});
					animate(protect_img[n2],{left:protect_width},600,Tween.Quad.easeInOut)
					animate(protect_img_bottom[n2],{left:protect_width},600,Tween.Quad.easeInOut);
					protect_lis[n2].style.background='#3E3E3E';	
					protect_lis[this.index].style.background='#B61B1F';
					n2=this.index;
					next=this.index;
				}else if(this.index>n2){
					if(!flag){
						return;
					}
					flag=false;
					protect_img[this.index].style.left=protect_width+'px';
					protect_img_bottom[this.index].style.left=protect_width+'px';
					animate(protect_img[n2],{left:-protect_width},600,Tween.Quad.easeInOut)
					animate(protect_img_bottom[n2],{left:-protect_width},600,Tween.Quad.easeInOut)
					protect_lis[n2].style.background='#3E3E3E';
					animate(protect_img[this.index],{left:0},600,Tween.Quad.easeInOut)
					animate(protect_img_bottom[this.index],{left:0},600,Tween.Quad.easeInOut,function(){flag=true})
					protect_lis[this.index].style.background='#B61B1F';
					n2=this.index;
					next=this.index;
				}
			}	
		}
	}
	carousel($('.protect-carousel')[0]);
	carousel($('.exercise-carousel')[0]);
	carousel($('.life-carousel')[0]);
	carousel($('.toy-carousel')[0]);
	carousel($('.health-carousel')[0]);
	// 楼层内轮播
	function carousel2(obj){
		var banner=obj;
		var width=parseInt(getStyle(banner,'width'));
		var img=$('.pic1',obj);
		var lis=$('.mobile-lis',obj);
		var left=$('.mobileLeft',obj)[0];
		var right=$('.mobileRight',obj)[0];
		var n=0;
		var next=0;
		var flag=true;
		var t=setInterval(move,2000);
		function move(type){
			var type=type||'right';
			if(!flag){
				return;
			}
			flag=false;
			if(type=='right'){
				next=n+1;
				if(next>=img.length){
					next=0;
				}
				img[next].style.left=width+'px';
				animate(img[n],{left:-width},600,Tween.Quad.easeInOut);
			}else if(type=='left'){
				next=n-1;
				if(next<0){
					next=img.length-1;
				}
				img[next].style.left=-width+'px';
				animate(img[n],{left:width},600,Tween.Quad.easeInOut);
			}
			animate(img[next],{left:0},600,Tween.Quad.easeInOut,function(){flag=true});
			lis[n].style.background="#3E3E3E";
			lis[next].style.background='#B61B1F';
			n=next;
		}
		banner.onmouseover=function(){
			clearInterval(t);
			left.style.display='block';
			right.style.display='block';
		}
		banner.onmouseout=function(){
			t=setInterval(move,2000);
			left.style.display='none';
			right.style.display='none';
		}
		left.onclick=function(){
			move('left')
		}
		right.onclick=function(){
			move('right');
		}
		for(var i=0;i<lis.length;i++){
			lis[i].index=i;
			lis[i].onclick=function(){
				if(this.index<n){
					if(!flag){
						return;
					}
					flag=false;
					img[this.index].style.left=-width+'px';
					animate(img[n],{left:width},600,Tween.Quad.easeInOut);
					
				}else if(this.index>n){
					if(!flag){
						return;
					}
					flag=false;
					img[this.index].style.left=width+'px';
					animate(img[n],{left:-width},600,Tween.Quad.easeInOut);
				}
				animate(img[this.index],{left:0},600,Tween.Quad.easeInOut,function(){flag=true});
				lis[n].style.background="#3E3E3E";
				lis[this.index].style.background='#B61B1F';
				n=this.index;
				next=this.index;
			}
			
		}
	}
	carousel2($('.clothing-carousel')[0]);
	carousel2($('.mobile-carousel')[0]);
	carousel2($('.electric-carousel')[0]);
	carousel2($('.computer-carousel')[0]);
	carousel2($('.book-carousel')[0]);
	carousel2($('.car-carousel')[0]);
	carousel2($('.service-carousel')[0]);
	carousel2($('.service-carousel')[1]);
	// 楼层跳转
	var now;
	var word=$('.word')
	var floor=$('.floor')
	var floor_nav=$('.floor-nav')[0];
	var floor_lis=$('.floor-lis');
	var text=$('.text',floor_nav)
	var ch=document.documentElement.clientHeight;
	var top=document.body.scrollTop?document.body:document.documentElement;
	for(var i=0;i<floor.length;i++){
		floor[i].h=floor[i].offsetTop;
	}
	window.onscroll=function(){
		var nHeight=floor_nav.offsetHeight;
		if(top.scrollTop>=floor[0].h-300){
			
			floor_nav.style.top=(ch-nHeight)/2+'px';floor_nav.style.display='block';
		}else if(top.scrollTop<floor[0].h-300){
			floor_nav.style.display='none';
		}
		for(var i=0;i<floor.length;i++){
			if(top.scrollTop>=floor[i].h-200){
				for(var j=0;j<floor_lis.length;j++){
					floor_lis[j].style.cssText='color:#625351';
					word[j].style.display='block'
					text[j].style.display='none'
				}
				floor_lis[i].style.cssText='color:#C81623';
				word[i].style.display='none'
				text[i].style.cssText='display:block;color:#C81623'
				now=i;	
			}
		}
	}
	for(var i=0;i<floor_lis.length;i++){
		floor_lis[i].index=i;
		floor_lis[i].onclick=function(){
			animate(document.body,{scrollTop:floor[this.index].h})
			text[this.index].style.cssText='color:#C81522'
			animate(document.documentElement,{scrollTop:floor[this.index].h})
			now=this.index;	
		}
		floor_lis[i].onmouseover=function(){
			this.style.cssText='background:#C81623';
			word[this.index].style.display='none';
			text[this.index].style.cssText='display:block;color:#fff'
		}
		floor_lis[i].onmouseout=function(){
			if(this.index==now){
				return;
			}
			this.style.background='#fff';
			word[this.index].style.display='block';
			text[this.index].style.display='none'
		}
	}
	// 选项卡
	function Select(obj){
		var obj=obj;
		var title=$(".right-con",obj);
		var con=$('.img-box',obj);
		var right_border=$('.right-border',obj)
		for(var i=0;i<title.length;i++){
			title[i].index=i;
			title[i].onmouseover=function(){
				for(var j=0;j<con.length;j++){
					con[j].style.display='none';
					right_border[j].style.display='none';
				}
				con[this.index].style.display='block';
				right_border[this.index].style.display='block'
			}
		}
	}
	for(var i=0;i<floor.length-1;i++){
		Select($('.floor')[i]);
	}
	// 天天低价
	var pic=$('.left-img');
	for(var i=0;i<pic.length;i++){
		pic[i].index=i;
		pic[i].onmouseover=function(){
			animate(pic[this.index],{left:0})
		}
		pic[i].onmouseout=function(){
			animate(pic[this.index],{left:10})
		}
	}
	var pic2=$('.first-img',$('.price')[0])[0];
	pic2.onmouseover=function(){
		animate(pic2,{marginLeft:0})
	}
	pic2.onmouseout=function(){
		animate(pic2,{marginLeft:9})
	}
	// 右边固定定位
	var fixed_left=$('.fixed-left');
	var fixed_hidden=$('.fixed-hidden');
	for(var i=0;i<fixed_left.length;i++){
		fixed_left[i].index=i;
		fixed_left[i].onmouseover=function(){
			fixed_hidden[this.index].style.display='block'
			animate(fixed_hidden[this.index],{left:-55})
		}
		fixed_left[i].onmouseout=function(){
			animate(fixed_hidden[this.index],{left:0})
			fixed_hidden[this.index].style.display='none'
		}	
	}
	var back=$('.back')[0];
	var Top=document.body.scrollTop?document.body:document.documentElement;
	back.onclick=function(){
		animate(document.body,{scrollTop:0})
	}
	//天天低价
	function pirce(obj){
		var box=$('.list',obj)[0];
		var box2=$('.list-con',obj)[0];
		var img=$('.list1',obj)[0];
		var height=parseInt(getStyle(img,'height'));
		var t=setInterval(move,1500);
		function move(){
			animate(box2,{top:-(height+20)},600,function(){
				var first=getFirstChild(box2);
				box2.appendChild(first);
				box2.style.top='10px';
			})
		}
		box2.onmouseover=function(){
			clearInterval(t);
		}
		box2.onmouseout=function(){
			t=setInterval(move,1500);
		}
	}
	pirce($('.list')[0])
	
}