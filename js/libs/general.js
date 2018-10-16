// English Version, also applied for every other language than spanish
function chat(){
	//Live Person
	$("img[class*='LPMimage']").trigger('click');
}

function capitalize(string, a){
	var tempstr = string;
	if(a == false || a == undefined)
		return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());
	else{
		return tempstr.split(" ").map(function(i){ return i[0].toUpperCase() + i.substring(1) }).join(" ");
	}
}

<!-- BEGIN LivePerson Monitor. -->
window.lpTag = window.lpTag || {}, 'undefined' == typeof window.lpTag._tagCount ? (window.lpTag = {
	wl: lpTag.wl || null,
	scp: lpTag.scp || null,
	site: '90637832' || '',
	section: lpTag.section || '',
	tagletSection: lpTag.tagletSection || null,
	autoStart: lpTag.autoStart !== !1,
	ovr: lpTag.ovr || {},
	_v: '1.10.0',
	_tagCount: 1,
	protocol: 'https:',
	events: {bind: function(t, e, i){lpTag.defer(function(){lpTag.events.bind(t, e, i)}, 0)}, trigger: function(t, e, i){lpTag.defer(function(){lpTag.events.trigger(t, e, i)}, 1)}},
	defer: function(t, e){0 === e ? (this._defB = this._defB || [], this._defB.push(t)) : 1 === e ? (this._defT = this._defT || [], this._defT.push(t)) : (this._defL = this._defL || [], this._defL.push(t))},
	load: function(t, e, i){
		var n = this;
		setTimeout(function(){n._load(t, e, i)}, 0)
	},
	_load: function(t, e, i){
		var n = t;
		t || (n = this.protocol + '//' + (this.ovr && this.ovr.domain ? this.ovr.domain : 'lptag.liveperson.net') + '/tag/tag.js?site=' + this.site);
		var o = document.createElement('script');
		o.setAttribute('charset', e ? e : 'UTF-8'), i && o.setAttribute('id', i), o.setAttribute('src', n), document.getElementsByTagName('head').item(0).appendChild(o)
	},
	init: function(){
		this._timing = this._timing || {}, this._timing.start = (new Date).getTime();
		var t = this;
		window.attachEvent ? window.attachEvent('onload', function(){t._domReady('domReady')}) : (window.addEventListener('DOMContentLoaded', function(){t._domReady('contReady')}, !1), window.addEventListener('load', function(){t._domReady('domReady')}, !1)), 'undefined' === typeof window._lptStop && this.load()
	},
	start: function(){this.autoStart = !0},
	_domReady: function(t){this.isDom || (this.isDom = !0, this.events.trigger('LPT', 'DOM_READY', {t: t})), this._timing[t] = (new Date).getTime()},
	vars: lpTag.vars || [],
	dbs: lpTag.dbs || [],
	ctn: lpTag.ctn || [],
	sdes: lpTag.sdes || [],
	hooks: lpTag.hooks || [],
	identities: lpTag.identities || [],
	ev: lpTag.ev || []
}, lpTag.init()) : window.lpTag._tagCount += 1;
<!-- END LivePerson Monitor. -->