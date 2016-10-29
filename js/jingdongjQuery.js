jQuery(function(){
	// 按需加载
	// 多库共存
	var aa=jQuery.noConflict();
 	aa("img").lazyload({
 		threshold:200,
 		event:"scroll",
 		effect:"fadeIn",
 	});
 	console.log(aa("img"));

	// TOP隐藏部分
	jQuery('.nav-hidden').each(function(index){
		jQuery(this).hover(function(){
			jQuery('.nav-hidden').eq(index).css('background','#fff');
			jQuery('.hidden1').eq(index).css('display','block')
			jQuery('.top-nav').eq(index).css('background','#fff')
 			jQuery('.hidden-empty').eq(index).css('display','block')
		},function(){
			jQuery('.nav-hidden').eq(index).css('background','#F1F1F1');
			jQuery('.hidden1').eq(index).css('display','none')
			jQuery('.top-nav').eq(index).css('background','#F1F1F1')
 			jQuery('.hidden-empty').eq(index).css('display','none')
		})
	})
	// 购物袋
	jQuery('.buy').hover(function(){
		jQuery('.buy-empty').css('display','block');
		jQuery('.buy-con').css('display','block');
		jQuery(this).css({'background':'#fff','border':'1px solid #fff','boxShadow':'0 0 4px #DDDDDD'})
	},function(){
		jQuery('.buy-empty').css('display','none');
		jQuery('.buy-con').css('display','none');
		jQuery(this).css({'background':'#F9F9F9','border':'1px solid #DFDFDF','boxShadow':'0 0 0 #DDDDDD'})
	})
	//导航
	function color(){
		jQuery('.left-con').each(function(index){
			jQuery(this).hover(function(){
				jQuery('.left-con').eq(index).css('background','#F7F7F7')
				jQuery('.hidden-con').eq(index).css('display','block')
			},function(){
				jQuery('.left-con').eq(index).css('background','#C81623')
				jQuery('.hidden-con').eq(index).css('display','none')
			})
		})
	} 
	color()
	// 今日推荐轮播
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(shift,10000);
	var width=jQuery('.recommend2').width()
	function shift(type){
		var type=type||'right';
		if(type=='right'){
			if(!flag){
 				return;
 			}
 			flag=false;
	 		next=n+1;
	 		if(next>=jQuery('.recommend2-con').length){
	 			next=0;
	 		}
		 	jQuery('.recommend2-con').eq(next).css('left',width+'px').end().eq(n).animate({left:-width},2000).end().eq(next).animate({left:0},2000,function(){
		 		flag=true;
		 	});
		 	n=next;
		}else if(type=='left'){
			if(!flag){
		 		return;
		 	}
		 	flag=false;
		 	next=n-1;
			if(next<0){
				next=jQuery('.recommend2-con').length-1;
			}
			jQuery('.recommend2-con').eq(next).css('left',-width+'px').end().eq(n).animate({left:width},2000).end().eq(next).animate({left:0},2000,function(){
				flag=true;
			})
			n=next;
		}
		
	}
	jQuery('.recommend2').hover(function(){
		clearInterval(t)
	},function(){
		t=setInterval(shift,10000);
	})
	jQuery('.recommendLeft').on('click',function(){
		shift('left')
	})
	jQuery('.recommendRight').on('click',function(){
		shift('right')
	})
	// banner轮播
	function banner(){
		var n=0;
		var next=0;
		var flag=true;
		var t=setInterval(move,3000);
		function move(type){
			var type=type||'right';
			if(!flag){
				return;
			}
			flag=false;
			if(type=='right'){
				next=n+1;
				if(next>=jQuery('.banner-img').length){
					next=0;
				}
			}else if(type=='left'){
				next=n-1;
				if(next<0){
					next=jQuery('.banner-img').length-1;
				}	
			}
			jQuery(".banner-img").eq(n).animate({opacity:0},600).end().eq(next).animate({opacity:1},600,function(){
				flag=true;
			})
			jQuery('.circle').eq(n).css('background','#3E3E3E')
			jQuery('.circle').eq(next).css('background','#B61B1F')
			n=next;
		}
		jQuery('.banner-middle').hover(function(){
			clearInterval(t);
		},function(){
			t=setInterval(move,3000)
		})
		jQuery('.right-arrow').on('click',function(){
			move('right')
		})
		jQuery('.left-arrow').on('click',function(){
			move('left')
		})
		jQuery('.circle').each(function(index){
			jQuery(this).on('mouseover',function(){
				if(index>n){
					if(!flag){
					return;
					}
					flag=false;
				}else if(index<n){
					if(!flag){
					return;
					}
					flag=false;
				}
				jQuery(".banner-img").eq(n).animate({opacity:0},600).end().eq(index).animate({opacity:1},600,function(){
					flag=true;
				})
				jQuery('.circle').eq(n).css('background','#3E3E3E')
				jQuery('.circle').eq(index).css('background','#B61B1F')
				n=index;
			})
		})		
	}
	banner()
	// 2F..楼层内轮播
	function carousel(){
		var now=0;
		var next=0;
		var width=jQuery('.protect-carousel').width();
		var flag=true;
		function move(type){
			var type=type||'right';
			if(!flag){
				return;
			}
			flag=false;
			if(type=='right'){
				next=now+1;
				if(next>=jQuery('.protect-carousel .protect-img').length){
					next=0;
				}
				jQuery('.protect-carousel .protect-img').eq(next).css('left',width).end().eq(now).animate({left:-width}).end().eq(next).animate({left:0},function(){flag=true});
				jQuery('.protect-carousel .protect-img-bottom').eq(next).css('left',width).end().eq(now).animate({left:-width}).end().eq(next).animate({left:0});
			}else if(type=='left'){
				next=now-1;
				if(next<0){
					next=jQuery('.protect-carousel .protect-img').length-1;
				}
				jQuery('.protect-carousel .protect-img').eq(next).css('left',-width).end().eq(now).animate({left:width}).end().eq(next).animate({left:0},function(){flag=true});
				jQuery('.protect-img-bottom').eq(next).css('left',-width).end().eq(now).animate({left:width}).end().eq(next).animate({left:0});
			}
			jQuery('.protect-carousel ul li').css('background','#3E3E3E');
			jQuery('.protect-carousel ul li').eq(next).css('background','#B61B1F');
			now=next;
		}
		var t=setInterval(move,2000);
		jQuery('.protect-carousel').on('mouseover',function(){
			clearInterval(t)
		})
		jQuery('.protect-carousel').on('mouseout',function(){
			t=setInterval(move,2000);
		})
		jQuery('.protectLeft').on('click',function(){
			move('left')
		})
		jQuery('.protectRight').on('click',function(){
			move('right')
		});
		jQuery('.protect-carousel ul li').each(function(index){
			jQuery(this).on('click',function(){
				if(index>now){
					if(!flag){
						return;
					}
					flag=false;
					jQuery('.protect-carousel .protect-img').eq(index).css('left',width).end().eq(now).animate({left:-width}).end().eq(index).animate({left:0},function(){flag=true});
					jQuery('.protect-carousel .protect-img-bottom').eq(index).css('left',width).end().eq(now).animate({left:-width}).end().eq(index).animate({left:0});
				}else if(index<now){
					if(!flag){
						return;
					}
					flag=false;
					jQuery('.protect-carousel .protect-img').eq(index).css('left',-width).end().eq(now).animate({left:width}).end().eq(index).animate({left:0},function(){flag=true});
					jQuery('.protect-img-bottom').eq(index).css('left',-width).end().eq(now).animate({left:width}).end().eq(index).animate({left:0});
				}
				jQuery('.protect-carousel ul li').eq(now).css('background','#3E3E3E');
				jQuery('.protect-carousel ul li').eq(index).css('background','#B61B1F');
				now=index;		
				
			})
		})
	}
	carousel();
	// 3F楼层内轮播
	function carousel2(){
		var width=jQuery('.clothing-carousel').width();
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
				if(next>=jQuery('.pic1').length){
					next=0;
				}
				jQuery('.pic1').eq(next).css('left',width+'px').end().eq(n).animate({'left':-width},600).end().eq(next).animate({'left':0},function(){
					flag=true;
				})
				
			}
			// else if(){
				// next=n-1;
				// if(next>=jQuery('.pic1').length){
				// 	next=0;
				// }
			// }
			n=next;

		}
	}
	carousel2()
		
})
