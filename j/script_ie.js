// HTML5 doctor
(function(){var e = "abbr,article,aside,audio,canvas,datalist,details,eventsource,figure,figcaption,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),i=e.length;while(i--){document.createElement(e[i])}})()

var IExpr = {

	fix: function(t) {
		if (t.IExprLoop) {
			var i = -1;
			while (t.IExprLoop[++i]) {
				IExpr[t.IExprLoop[i]](t);
			}
		} else {
			t.IExprLoop = [];
			var i = 0;
			while (arguments[++i]) {
				IExpr[arguments[i]](t) && t.IExprLoop.push(arguments[i]);
			}
		}
		if (!t.IExprLoop.length) {
			t.runtimeStyle.behavior = 'none';
			t.removeAttribute('IExprLoop');
		}
	},

	before: function(t) {
		t.insertAdjacentHTML('afterBegin','<span class="' + (t.className ? t.className.replace(/([^\s]+)/g,'$1_before') : 'before') + '" style="behavior:expression(IExpr.fix(this,\'renderContent\'))"></span>');
	},
	
	after: function(t) {
		t.insertAdjacentHTML('beforeEnd','<span class="' + (t.className ? t.className.replace(/([^\s]+)/g,'$1_after') : 'after') + '" style="behavior:expression(IExpr.fix(this,\'renderContent\'))"></span>');
	},
	
	firstChild: function(t) {
		var firstClass = t.className ? t.className.replace(/([^\s]+)/g,'$1_first-child') : 'first-child';
		if (!t.previousSibling || !t.previousSibling.className) {
			t.className += (' ' + firstClass);
		}
	},
	
	lastChild: function(t) {
		var lastClass = t.className ? t.className.replace(/([^\s]+)/g,'$1_last-child') : 'last-child';
		if (!t.nextSibling || !t.nextSibling.className) {
			t.className += (' ' + lastClass);
		}
	},
	
	zoom: function(t) {
		t.runtimeStyle.zoom = 1;
	},
	
	renderContent: function(t) {
		var content = t.currentStyle['content'];
		if (content) {
			if (content == 'none' || content == 'normal') {
				t.removeNode(true);
			} else {
				if (content.length > 2) {
					t.insertAdjacentText('afterBegin', content.slice(1,-1));
				}
			}
		}
	}
};
