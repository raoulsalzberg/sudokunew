function clearhypotheses() {// Effacement des hypotheses et afficher titre de base
		titrehypothese="<b><u>Liste des hypothèses</u></b>";
		document.getElementById("Titrehyp").innerHTML=tradacrit(titrehypothese);
    	oTable = document.getElementById('Lyly');
    	oTR = oTable.getElementsByTagName('tr');
    	for (var i=oTR.length-1; i>1; i--) {
			var disparu=oTable.removeChild(oTable.lastChild);
		}
}



	function hypotheseup() {
			if (numerohypothese>1) {numerohypothese=numerohypothese-1} else {numerohypothese=0}
			hypotheseenjaune(numerohypothese+1);// hypothese precedente en jaune
            hypotheseenblanc(numerohypothese);
			putmessage("Hypothèse "+ numerohypothese+" sur "+numerr+" : "+scenhyp[numerohypothese]);
			traitementhypothese();
			changemethods("Etapes");
}
	
	function hypothesedown() {
			if (numerohypothese>=numerr) {numerohypothese=numerr} else {numerohypothese=numerohypothese+1} 
            hypotheseenjaune(numerohypothese-1);// hypothese precedente en jaune
            hypotheseenblanc(numerohypothese);
			putmessage("Hypothèse "+ numerohypothese+" sur "+numerr+" : "+scenhyp[numerohypothese]);
			traitementhypothese();
			changemethods("Etapes");
	}
	
function hypotheseenblanc(numgrille) {
		numgrille=numgrille+3;
		oTable = document.getElementById('Lyly');
        oTR = oTable.getElementsByTagName('tr');
        oTD = oTable.getElementsByTagName('td');
		if (numgrille<oTR.length) {oTR[numgrille].style.setProperty("background-color", "#FFFFFF")}
}

function hypotheseenjaune(numgrille) {
		numgrille=numgrille+3;
		oTable = document.getElementById('Lyly');
        oTR = oTable.getElementsByTagName('tr');
		if (numgrille<oTR.length) {oTR[numgrille].style.setProperty("background-color", "#FFFF80")} 
}

function listehypotheses() {// Creation et affichage des hypotheses successives de la grille, base sur le tableau scenhyp
		titrehypothese=tradacrit("<b>Liste des "+(numerr+1)+" hypothèses pour la grille <u>"+myForm.nomrevue.value+"</u></b>");
		document.getElementById("Titrehyp").innerHTML=tradacrit(titrehypothese);
		oTable = document.getElementById('Lyly');
        oTR = oTable.getElementsByTagName('tr');
        oTD = oTable.getElementsByTagName('td');
		var hypothesefinale=parseInt(numerr)+1;
		for (var i=0; i<hypothesefinale; i++) {        
				var insidehyp= tradacrit(scenhyp[i]);
				insidehyp=insidehyp.split("<br>")[0];
				row = document.createElement("tr");
                cell = document.createElement("td");
				texte = document.createTextNode(i+"-"+insidehyp);
				cell.appendChild(texte);
                row.appendChild(cell);
    	 		oTable.appendChild(row);
				cell.setAttribute("id", i+"H");
		 		row.style.setProperty("background-color", "#FFFF80");
		}// i
		// Selection solution si elle exist, sinon selection derniere hypothesee
		numerohypothese=numerr;
		if (numerr>0) {
			if (numinter!=(-1)) {numerohypothese=numinter}
		}
		hypotheseenblanc(numerohypothese);
// Cas de click sur une hypothese
for(var i=0; i < oTD.length; i++){
	 // affecte la fonction mouseclick
	 oTD[i].onclick = function(){
			  hypotheseenjaune(parseInt(numerohypothese));// hypothese previous			  
			  numerohypothese=parseInt(this.id);
			  hypotheseenblanc(numerohypothese);
			  putmessage("Hypothèse "+ numerohypothese+" sur "+numerr+" : "+scenhyp[numerohypothese]);
			  traitementhypothese();
			  affiche();
			  etapecalcul=listecorr[numerohypothese].split(sep).length;
			  changemethods("Etapes");
     }
}
}

function hypothese() {
		var re = /\d/g;
		// Selection case
		var nb=0;
		do {
    		var cc=Math.floor(Math.random() * (M-1));// case choisie aleatoirement
    		var contccex=contenu[cc]+"";
			nb=nb+1;
    	}
    	while ((contccex.length!=2) && (colPlace[cc]!="E2") && (colPlace[cc]!="G7") && (nb<100))// ok si 2 chiffres et pas vue
 		if (contccex.length!=2) {//Plus de case a 2 chiffres
    		var nb=0;
    		do {
        		var cc=Math.floor(Math.random() * (M-1));// case choisie aleatoirement
        		var contccex=contenu[cc]+"";
    			nb+=1;
        	}
        	while ((contccex.length!=3) && (nb<100))// ok si 3 chiffres et pas vue
		}
		if (contccex.length<4) {
    		// Selection chiffre dans la case a 2 ou 3 chiffres
        	var pr=Math.floor(Math.random() * (contccex.length)); // choisir un chiffre aleatoire possible
        	var cc09 = contccex.match(re);
        	var num=cc09[pr];
        	// Positionnement
        	contenu[cc]=num;	
        	origin="H"+cc+num;
        	TraceH+="H";
        	scenario=tradacrit("Hypothèse: " + colPlace[cc] + " = " + num);
        	numtest=numtest+1;
    	} else {
    		putmessage("<u><b>Attention</b></u> : Pas de case à moins de 4 chiffres donc pas d'hypothèse porssible");
    	}
}

function affichecrashousolution(message) {
		listecorr[numerr]=listecalcul+sep+ormg;// Sauvegarde de la liste des calculs pour l'analyse du crash ou de la solution;
		crashtext[numerr]=" "+scenario;
		origin="Fin";
		listescenarios[numerr][etapecalcul+1]=scenario;
		listenm[numerr][etapecalcul+1]=elaborenm();
		nmx=elaborenm();
		if (message=="solution") {putmessage(scenario+" Etape "+(etapecalcul+1))} else {scenario=scenario+resultateffectif; putmessage(scenario+" Etape "+etapecalcul+explainmethods(nmx))}// Message
		listesteps();// Affichage des etapes dont la derniere corrigee listescenarios(etapecalcul]
    	changemethods("Etapes");
}


// reconstituehypothese 13 janvier

function reconstituehypothese() {
var re = /\d/g;
listecalcul+=sep+ormg;
var calcul=listecalcul.split(sep);
crashtext[numerr]=" "+scenario;
var calculfin=calcul.length-1;
listecorr[numerr]=listecalcul;
listescenarios[numerr][etapecalcul+1]=scenario;
listenm[numerr][etapecalcul+1]=elaborenm();
var TraceHp=TraceH;
resultateffectif="";
for (var ii=calcul.length-1; ii>0; ii--) {
	var head=calcul[ii].substring(0,1);
	if (head=="J") {TraceH=TraceH.substring(0,TraceH.length-1); numtest=numtest-1}
	if ((head=="H") || (head=="Z")) {break}// hypothese de calcul a corriger
	if ((head=="K") || (head=="S")) { 
		resultateffectif=tradacrit(" Pas de correction d'hypothèse manuelle étape "+ii);
if (head=="K") {resultateffectif+=" en détermination"} else if (head=="S") {resultateffectif+=" en suppression"} else {resultateffectif+=" en élimination de chiffre-candidat dans une case"}  
		scenhyp[numerr]+=" (plus de modification possible)";
		return false;
	}

}// ii
if (numerr>0) {var dep="La modification "+numerr} else {var dep="Le premier calcul "}
if (ii==0) {
	resultateffectif=tradacrit(" Echec ou solution sans hypothèse ");
	dep=tradacrit(dep+" (Dernière modification) ");
	scenhyp[numerr]=dep+" donne : "+crashtext[numerr]+" Etape "+calculfin;
	return false
}
etapecalcul=ii;
if (etapecalcul>0) {
	for (var ji=0; ji<M; ji++) {contenu[ji]=contentmemory[numerr][etapecalcul-1][ji]}
	var visuhyp=calcul[etapecalcul];
	TraceH=TraceH.substring(0,TraceH.length-1)+"E";// Substitue E au dernier H
	var casesudoku = visuhyp.substring(1,visuhyp.length-1);// xx
	var num=visuhyp.substring(visuhyp.length-1,visuhyp.length);// y
scenario=tradacrit("Correction hypothèse : Chiffre "+num+" plus dans la case " + colPlace[casesudoku]);
	wscen=scenario;
	var cx=contenu[casesudoku];
	eliminationnumero(casesudoku, num);
	var cz=contenu[casesudoku];
	if (cx.length==2) {
		var numsup=cx.substring(0,1);
		if (numsup==num) {numsup=cx.substring(1,2)}
		origin="L"+visuhyp.substring(1,visuhyp.length-1)+numsup;
	} else {
		if (head=="H") {// 1er passage
			var autrechiffre=cz.substring(0,1);
			var numsup=purgenumetchoix(cx, num, casesudoku);
			if (autrechiffre==numsup) {autrechiffre=cz.substring(1,2)}
			wscen=scenario;
			eliminationnumero(casesudoku, autrechiffre);
			origin="Z"+visuhyp.substring(1,visuhyp.length-1)+numsup;
		} else {// 2eme passage
			var numsup=cz.substring(1,2);
			var autrechiffre=cz.substring(0,1);
			wscen=scenario;
			eliminationnumero(casesudoku, autrechiffre);
			origin="L"+visuhyp.substring(1,visuhyp.length-1)+numsup;					
		}
	}
	calcul[etapecalcul]=origin;// Methode modifiee Jxxy ou Zxxy au lieu de la methode Hxxy
	scenario+=tradacrit(" qui contient dorénavant le chiffre "+numsup);
	if (cx.length>2) {
		scenhyp[numerr]=tradacrit(dep+" donne : "+crashtext[numerr]+" Etape "+calculfin+", d'où la correction : "+listescenarios[numerr][etapecalcul]+" étape "+etapecalcul+" changée en "+colPlace[casesudoku]+" ne contient plus ce chiffre. ");
	} else {
		scenhyp[numerr]=tradacrit(dep+" donne : "+crashtext[numerr]+" Etape "+calculfin+", d'où la correction : "+listescenarios[numerr][etapecalcul]+" étape "+etapecalcul+" changée en "+numsup+". ");
	}
	numerr+=1;
	for (var j=0; j<etapecalcul; j++) {
		contentmemory[numerr][j]=new Array();
for (var i=0; i<M; i++) {contentmemory[numerr][j][i]=contentmemory[numerr-1][j][i]}
		listescenarios[numerr][j]=listescenarios[numerr-1][j];	
		listenm[numerr][j]=listenm[numerr-1][j];
	}
	listecalcul="0";
	for (var i=1; i<etapecalcul+1; i++) {listecalcul=listecalcul+sep+calcul[i]}
	listecorr[numerr]=listecalcul;
	contentmemory[numerr][etapecalcul]=new Array();
	for (var i=0; i<M; i++) {contentmemory[numerr][etapecalcul][i]=contenu[i]}
	listescenarios[numerr][etapecalcul]=scenario;
	listenm[numerr][etapecalcul]=elaborenm();
	origincrash=false;
	origin=1;
	return true;
} else {
	putmessage("<u><b>Attention</b></u> : pas d'hypothèse à corriger sur étape initiale");
	return false;
}
}


function reconstituehypothese9avril() {
		var re = /\d/g;
		listecalcul+=sep+ormg;
		var calcul=listecalcul.split(sep);
		crashtext[numerr]=" "+scenario;
		var calculfin=calcul.length-1;
		listecorr[numerr]=listecalcul;// Sauvegarde de la liste des calculs pour l'analyse du crash, en remplacant le 0 final par ormg;
		listescenarios[numerr][etapecalcul+1]=scenario;
		listenm[numerr][etapecalcul+1]=elaborenm();
		var TraceHp=TraceH;
		resultateffectif="";
		for (var ii=calcul.length-1; ii>0; ii--) {
			var head=calcul[ii].substring(0,1);
			if (head=="J") {TraceH=TraceH.substring(0,TraceH.length-1); numtest=numtest-1}// Erreur corrigee, donc eliminee
			if ((head=="H") || (head=="Z")) {break}// hypothese de calcul a corriger
			if ((head=="K") || (head=="S")) {// Pas de correction d'hypothese manuelle, en positionnement ou en suppression 
//        		listescenarios[numerr][etapecalcul+1]=scenario;
//				listenm[numerr][etapecalcul+1]=elaborenm();
        		resultateffectif=tradacrit(" Pas de correction d'hypothèse manuelle étape "+ii);
				if (head=="K") {resultateffectif+=" en détermination"} else if (head=="S") {resultateffectif+=" en suppression"} else {resultateffectif+=" en élimination de chiffre-candidat dans une case"}  
				scenhyp[numerr]+=" (plus de modification possible)";
				return false;
			}
		}// ii
		if (numerr>0) {var dep="La modification "+numerr} else {var dep="Le premier calcul "}
		// Etape actualisee au moment de l'hypothese
		if (ii==0) {// Pas d'hypothese a modifier, la derniere etant corrigee = chaine finie (saturation d'hypotheses)
        	resultateffectif=tradacrit(" Echec ou solution sans hypothèse ");
    		dep=tradacrit(dep+" (Dernière modification) ");
			scenhyp[numerr]=dep+" donne : "+crashtext[numerr]+" Etape "+calculfin;
			return false
		}
		etapecalcul=ii;
		if (etapecalcul>0) {
			for (var ji=0; ji<M; ji++) {contenu[ji]=contentmemory[numerr][etapecalcul-1][ji]}// Contenu avant l'hypothese sauf avant hypothese 0
			// Decodage de calcul[etapecalcul]=Hxxy transformee en Jxxy (plus de y dans xx)
    		var visuhyp=calcul[etapecalcul];
			// Correction d'hypothese : actualisation de la methode origin (dans listecalcul) et de TraceH, nouveau positionnement de la case d'hypothese et renseignement du scenario
			// visuhyp vaut Hxxy ou Zxxy ou Jxxy
			TraceH=TraceH.substring(0,TraceH.length-1)+"E";// Substitue E au dernier H
       		var casesudoku = visuhyp.substring(1,visuhyp.length-1);// xx
       		var num=visuhyp.substring(visuhyp.length-1,visuhyp.length);// y
			scenario=tradacrit("Correction hypothèse : Chiffre "+num+" plus dans la case " + colPlace[casesudoku]);
			wscen=scenario;
			var cx=contenu[casesudoku];
			eliminationnumero(casesudoku, num);// Chiffre num elimine de casesudoku avant de poursuivre
			var cz=contenu[casesudoku];
			if (cx.length==2) {
    					var numsup=cx.substring(0,1);
            			if (numsup==num) {numsup=cx.substring(1,2)}
    					origin="J"+visuhyp.substring(1,visuhyp.length-1)+numsup;
			} else {// Chiffre suivant aleatoire, en eliminant le chiffre num du contenu cx
					if (head=="H") {// 1er passage
    					// purge du chiffre num dans cx, car la case sudoku ne peut plus contenir ce chiffre et selection de l'un des 2 chiffres restants, en eliminant l'autre dans cz
						var autrechiffre=cz.substring(0,1);
    					var numsup=purgenumetchoix(cx, num, casesudoku);
						if (autrechiffre==numsup) {autrechiffre=cz.substring(1,2)}
						wscen=scenario;
						eliminationnumero(casesudoku, autrechiffre);// Chiffre autrechiffre elimine de casesudoku avant de poursuivre
    					origin="Z"+visuhyp.substring(1,visuhyp.length-1)+numsup;
					} else {// 2eme passage
    					// selection du 3eme chiffre de cx cree lors du 1er passage en eliminant l'autre dans cz
    					var numsup=cz.substring(1,2);
    					var autrechiffre=cz.substring(0,1);
						wscen=scenario;
						eliminationnumero(casesudoku, autrechiffre);// Chiffre autrechiffre elimine de casesudoku avant de poursuivre
    					origin="J"+visuhyp.substring(1,visuhyp.length-1)+numsup;					
					}
			}
       		var calculint=new Array();
			for (var k=0; k<etapecalcul; k++) {calculint[k]=calcul[k]}
			calcul=calculint;
			calcul[etapecalcul]=origin;// Methode modifiee Jxxy ou Zxxy au lieu de la methode Hxxy
       		scenario=scenario+tradacrit(" qui contient dorénavant le chiffre "+numsup);
			// Le calcul repart a cette etape, avec l'hypothese changee
			if (cx.length>2) {
					scenhyp[numerr]=tradacrit(dep+" donne : "+crashtext[numerr]+" Etape "+calculfin+", d'où la correction : "+listescenarios[numerr][etapecalcul]+" étape "+etapecalcul+" changée en "+colPlace[casesudoku]+" ne contient plus ce chiffre. ");
			} else {
					scenhyp[numerr]=tradacrit(dep+" donne : "+crashtext[numerr]+" Etape "+calculfin+", d'où la correction : "+listescenarios[numerr][etapecalcul]+" étape "+etapecalcul+" changée en "+numsup+". ");
			}
			// Pointe sur la prochaine hypothese corrigee ou la prochaine solution
			numerr+=1;
       		for (var j=0; j<etapecalcul; j++) {// Recopie du contenu (grille) et du scenario des etapecalcul premieres etapes de numerr-1 vers numerr
        			contentmemory[numerr][j]=new Array();
        			//contentmemory[numerr][j]=contentmemory[numerr-1][j];
					for (var i=0; i<M; i++) {contentmemory[numerr][j][i]=contentmemory[numerr-1][j][i]}
					listescenarios[numerr][j]=listescenarios[numerr-1][j];	
					listenm[numerr][j]=listenm[numerr-1][j];
       		}
        	// Sauvegarde de la correction dans la liste des etapes (listecalcul), la grille a l'etape etapecalcul et erreur numerr (contentmemory[numerr][etapecalcul]) et la liste des scenarios de l'erreur numerr (listescenarios[numerr])
       		listecalcul="0";
       		for (var i=1; i<etapecalcul+1; i++) {listecalcul=listecalcul+sep+calcul[i]}// y compris la methode modifiee a l'etape etapecalcul
			listecorr[numerr]=listecalcul;// Sauvegarde de la liste des calculs pour la suite
   			contentmemory[numerr][etapecalcul]=new Array();
   			for (var i=0; i<M; i++) {contentmemory[numerr][etapecalcul][i]=contenu[i]}// Contenu de l'hypothese corrigee enregistre dans la liste numerr suivante
   			listescenarios[numerr][etapecalcul]=scenario;
    		// Redemarrage du calcul avec methode 1 et origincrash false
           	origincrash=false;
           	origin=1;
    		return true;
		} else {
			putmessage("<u><b>Attention</b></u> : pas d'hypothèse à corriger sur étape initiale");
			return false;
		}
}

function purgenumetchoix(val, pas, casex) {
	var re = /\d/g;
	var x=val.toString().match(re);
	var z="";
	var third="";
	// pas expurge dans z
	for (var i=0; i<x.length; i++) {
		var y=x[i];
		if (y!=pas) {z=z+y}
	}
	// selection aleatoire dans z
    var pr=Math.floor(Math.random() * (z.length)); // choisir un chiffre aleatoire possible
    var cc09 = z.match(re);
	// restructurer val, qui a 3 chiffres, de maniere a mettre en derniere position le 3eme chiffre
	var w=pas.toString()+cc09[pr].toString();
	// recherche 3eme chiffre dans val
	for (var i=0; i<x.length; i++) {
		var y=x[i];
		if ((y!=pas) && (y!=cc09[pr])) {w=w+y; var third=y}
	}
	// sauvegarder dans contentmemory le contenu modifie w
	contentmemory[numerr][etapecalcul-1][casex]=parseInt(w);
    return third;		
}

function elimineauxsommets(chif, yy) {
	// Elimination de chiffre dans la case apres dans
	var re = /\d/g;
	var casesudoku=decodagecolPlace(yy);
	var z=contenu[casesudoku].toString();
	var cref=z.match(re);
	wscen=scenario+" Validation "+chif+" dans "+colPlace[casesudoku];
	for (var hnum=0;hnum<cref.length; hnum++) {
    			var num=cref[hnum];
    			if (num!=chif) {
					eliminationnumero(casesudoku, num)
    			}
    }
}

function eliminecasebugplusun(casebug, chif) {
	// Elimination du chiffre chif dans la case casebug
	var re = /\d/g;
	var casesudoku=decodagecolPlace(casebug);
	var cref=contenu[casesudoku].toString().match(re);
	for (var hnum=0; hnum<cref.length; hnum++) {
		var num=cref[hnum];
		if (num==chif) {
			wscen=scenario+" Elimination "+num+" dans "+colPlace[casesudoku];
    		eliminationnumero(casesudoku, num);
			return;
		}
	}
}

function traitementhypothese() {
	if (numerohypothese<0) {numerohypothese=numerr}
	if (numerohypothese<=numerr) {
		clearsteps();// Effacement des etapes affichees de 0 a etapecalcul (affichage precedent)
        listecalcul=listecorr[numerohypothese];// La liste de l'hypothese erronee ou de la solution, de numero numerohypothese
		var calcul=listecalcul.split(sep);// La liste des etapes du numero numerohypothese
		var crash=scenhyp[numerohypothese];// Nouveau scenario d'hypothese pour reprendre le calcul
		if (numerohypothese>1) {crash=crash+" "+numerr+" modifications (crashs impossibilités ou solutions multiples)"}		
		choixetape=0;
		var etapeiniex=etapeini;
		etapeini=0;
		var l=listecorr[numerohypothese].split(sep);
		var calculfin=l.length-1;
			if ((calculfin > 0) && !(contentmemory[numerohypothese][calculfin-1][0]==undefined)) {for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][calculfin-1][i]}}
			desaffiche();
			affiche();
			listesteps();// Affichage des etapes de 0 jusqu'acalculfin
		etapeini=etapeiniex;
		putmessage(crash);
	} else {
		numerohypothese=numerr;
		putmessage((etapecalcul+1)+"- "+scenario);
	}
}
