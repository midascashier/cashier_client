// English Version, also applied for every other language than spanish
function chat(){
	window.open('https://lz.livepokersupport.com/chat.php?v=2&hcgs=MQ__&nct=MQ__&hfk=MQ__','','width=400,height=600,left=0,top=0,resizable=yes,menubar=no,location=no,status=yes,scrollbars=yes')
}

function capitalize(string,a){
	var tempstr = string;
	if (a == false || a == undefined)
		return tempstr.replace(tempstr[0], tempstr[0].toUpperCase());
	else {
		return tempstr.split(" ").map(function (i) { return i[0].toUpperCase() + i.substring(1) }).join(" ");
	}
}