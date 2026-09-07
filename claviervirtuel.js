var clavier=false, maj=false, quote2='"';
tab=new Array();// Majuscule
tab['<']='>';//
tab[',']='?';//
tab[';']='.';//
tab[':']='/';//
tab['!']='§';
tab[tradacrit('�')]='~';
tab['"']='#';// #
tab['\'']='{';// {
tab['(']='[';// [
tab['-']='|';// }
tab[tradacrit('è')]='`';
tab['_']='\\';
tab[tradacrit('ç')]='^';
tab['à']='@';// @="\100"
tab[')']=']';// ]
tab['=']='}';// }
tab['$']='£';// ]
tab['^']='¨';// ]
tab['ù']='%';
tab['*']='µ';
//tab['°']='\100';
function press(val, casse){
	if (maj){
		if (casse){
			val=val.toUpperCase();
		}else{
			val=tab[val];
		}
	}
	if (clavier){
		clavier.value+=val;
		clavier.focus();
	}
}

function claviersur(obj){
	clavier=obj;
}

function backslash(){
	var l=clavier.value.length;
	clavier.value=clavier.value.substr(0,l-1);
}
function capslock(){
	maj=(maj)?false:true;
	if (maj){
		document.getElementById("CapsLock").style.backgroundColor="FF0";
	}else{
		document.getElementById("CapsLock").style.backgroundColor="transparent";
	}
}
