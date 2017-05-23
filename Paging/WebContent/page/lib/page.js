;(function($, window, document, undefined){
	var page = function(ele, opts){
		this.$element = ele;
		this.defaults = {
			'allRecords' : '0',
			'perPageNum' : '15',
			'currentPage' : '0',
			'showPagesNum' : '11',
			'bgColor' : '#DDD',
			'currBgColor' : '#DDD',
			'fontsize' : '15px',
			'lineheight': '25px'
		};
		this.options = $.extend({}, this.defaults, opts);
	};
	
	page.prototype = {
		show : function(){
			var allRecords = this.options.allRecords;
			var showPagesNum = this.options.showPagesNum;
			var currentPage = this.options.currentPage;
			var bgColor = this.options.bgColor;
			var currBgColor = this.options.currBgColor;
			var fontsize = this.options.fontsize;
			var lineheight = this.options.lineheight;
			var perPageNum = this.options.perPageNum;
			if(perPageNum == 0 || perPageNum == undefined || perPageNum == '') perPageNum = 1;
			
			var allPage = Math.ceil(allRecords / perPageNum);
			var midPage = Math.floor(showPagesNum / 2);
			var prefix = '<input type="hidden" id="currPage" value="'+currentPage+'"><button id="change" style="display: none"/><div id="content">';
			var html = '<ul class="pagelist" id="pagelist">'
						+'<li><a href="javascript:void(0)" id="first">首页</a></li>'
						+'<li><a href="javascript:void(0)" id="back">上一页</a></li>';
			
			if(currentPage > midPage && allPage > showPagesNum){
				var end = (currentPage*1 + midPage*1) < allPage ? (currentPage*1 + midPage*1) : allPage;
				var start = (end - showPagesNum + 1) < 1 ? 1 : (end - showPagesNum + 1 );
				
				for(var k = start; k <= end; k++){
					 if(k == currentPage){
						 html += '<li class="thisclass"><a id="curr">' + k + '</a></li>';
					 }else{
						 html += '<li><a href="javascript:void(0)" id="' + k + '" class="page">'+ k +'</a></li>';
					 }
				 }
			}else{
				for(var i = 1; i <= showPagesNum; i++){
					 if(i == currentPage){
						 html += '<li class="thisclass"><a id="curr">' + i + '</a></li>';
					 }else{
						 html += '<li><a href="javascript:void(0)" id="' + i + '" class="page">'+ i +'</a></li>';
					 }
				 }
			}
			html += '<li><a href="javascript:void(0)" id="next">下一页</a></li>'
				+'<li><a href="javascript:void(0)" id="last">尾页</a></li>'
				+'<li><span class="pageinfo">共<strong id="allPage">'+allPage+'</strong>页<strong>'+allRecords+'</strong>条</span></li></ul>';
			var suffix = "</div>";
			if(this.$element.find("#currPage") == undefined
					|| this.$element.find("#currPage").val() == undefined){
				this.$element.html(prefix + html + suffix);
			}else{
				this.$element.find("#content").html(html);
			}
			
			this.$element.find(".pagelist").css('font-size', fontsize);
			this.$element.find(".pagelist").css('line-height', lineheight);
			this.$element.find("#curr").css('background', currBgColor);
			this.$element.find("a").css('color', bgColor);
			this.$element.find("#change").click();
			
			myListener(this);
		}
	};
	
	function myListener(that){
		var options = that.options;
		
		//首页
		$(".pagelist #first").click(function(){
			that.options.currentPage = 1;
			var mypage = new page(that.$element, that.options);
			mypage.show();
		});
		//上一页
		$(".pagelist #back").click(function(){
			that.options.currentPage = options.currentPage - 1 < 1 ? 1 : options.currentPage - 1;
			var mypage = new page(that.$element, that.options);
			mypage.show();
		});
		//下一页
		$(".pagelist #next").click(function(){
			var allPage = Math.ceil(that.options.allRecords / that.options.perPageNum);
			var currPage = that.options.currentPage * 1 + 1;
			that.options.currentPage = currPage > allPage ? allPage : currPage;
			var mypage = new page(that.$element, that.options);
			mypage.show();
		});
		//尾页
		$(".pagelist #last").click(function(){
			that.options.currentPage = Math.ceil(that.options.allRecords / that.options.perPageNum);
			var mypage = new page(that.$element, that.options);
			mypage.show();
		});
		
		$(".pagelist .page").click(function(){
			that.options.currentPage = $(this).text();
			var mypage = new page(that.$element, that.options);
			mypage.show();
		});
	}
	
	$.fn.pages = function(options){
		var mypage = new page(this, options);
		mypage.show();
	};
	
})(jQuery, window, document);