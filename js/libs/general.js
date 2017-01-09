// English Version, also applied for every other language than spanish
function chat(){
	window.open('https://livepokersupport.com/visitor/index.php?/Default/LiveChat/Chat/Request/_sessionID=/_promptType=chat/_proactive=0/_filterDepartmentID=33%2C48/_randomNumber=oj6266h15mhaw6j436e0d6l3yyg2g6n2/_fullName=/_email=/_languageID=1', 'livechatwin', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=0,resizable=1,width=600,height=680');
}


function FAQ(){
	window.open('../FAQ.html', 'FAQ', 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=0,width=800,height=680');
}

function capitalize(string,a) {
	var tempstr = string.toLowerCase();
	if (a == false || a == undefined)
		return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());
	else {
		return tempstr.split(" ").map(function (i) { return i[0].toUpperCase() + i.substring(1) }).join(" ");
	}
}