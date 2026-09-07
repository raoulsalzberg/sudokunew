function testcheck() {
	var checkcase=new Array();
    var inputs = document.getElementsByTagName("input"); 
    var j=0;
	for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        checkcase[j]=inputs[i].checked;
    	j+=1;
      }
    }
	return checkcase[0];
}

function enregistrementconfiguration() {// recuperer la clef de configuration pour enregistrer dans le webstorage la copie des ecrans de contraintes, filtres et options
	var selectcase=new Array();
	var indexselectcase=new Array();
	var checkcase=new Array();
    // copie ecran des contraintes dans tableaux
    var inputs = document.getElementsByTagName("input"); 
    var j=0;
	for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        checkcase[j]=inputs[i].checked;
    	j+=1;
      }
    }
	var input = document.getElementsByTagName("Select");
    var inputList = Array.prototype.slice.call(input);
    inputList.forEach(function(valeur, index) {
    		var x=valeur.selectedIndex;
    		var y=valeur.options;
    		if ((index!=7) && (index!=0)) {selectcase[index]=parseInt(y[x].text)} else {selectcase[index]=y[x].text} // texte pour niveau difficulté (index 0) et aussi case initiale als chain (index 8)
    		indexselectcase[index]=x;
		}
	)
	if(typeof localStorage!='undefined' && JSON) {
		// supprimer la clef pour la regenerer avec la nouvelle configuration
		localStorage.removeItem(clefconfiguration);
//		if (localStorage.getItem(clefconfiguration)!=null) {localStorage.removeItem(clefconfiguration)}
		// Charger la configuration des ecrans dans le webstorage 
			valeurreduit();
			var donnees={	
            		check:checkcase,
    				selectionne: selectcase,
    				indexselectionne: indexselectcase
            };
        	var val = JSON.stringify(donnees);
			localStorage.setItem(clefconfiguration, val);
}
}

function chargementconfiguration() {// chargement de la configuration en webstorage dans les ecrans
	var selectcase=new Array();
	var indexselectcase=new Array();
	var checkcase=new Array();
	if(typeof localStorage!='undefined' && JSON) {
		if (localStorage.getItem(clefconfiguration)!=null) {// si la clef clefconfiguration existe dans le webstorage, charger cette config du webstorage dans les ecrans de configuration
			var valeur = JSON.parse(localStorage.getItem(clefconfiguration));// clefconfiguration 
    		checkcase=valeur.check;
			selectcase= valeur.selectionne;
    		indexselectcase=valeur.indexselectionne;
			// Copie tableau dans ecran des contraintes
            var inputs = document.getElementsByTagName("input"); 
            var j=0;
            for (var i = 0; i < inputs.length; i++) {
              if (inputs[i].type == "checkbox") {
            	inputs[i].checked=checkcase[j];
            	j=j+1;
              }
            }
            var input = document.getElementsByTagName("Select");
            var inputList = Array.prototype.slice.call(input);
            inputList.forEach(function(valeur, index) {valeur.selectedIndex=indexselectcase[index]})
			// configuration affectee
			selectcase[0]="Grilles faciles";
			niveau=selectcase[0];
			MAXCH=selectcase[1];
			MAXNUM=selectcase[2];
			NBRECHECS=selectcase[3];
			ORMreduit=selectcase[4];
//			MAXTIGRE=selectcase[5];
			MAXITER=selectcase[5];
/*			CASEINITALSCHAIN=selectcase[7];
			MAXGRIFFE=selectcase[8];
			MAXMAXILIEN=selectcase[9];
			MAXMEDUSA=selectcase[10];
*/			TAILLECHIFFRES=selectcase[6];
			AIDESAISIEMANUELLE=checkcase[0];
//			REDUITHYPOTHESE=checkcase[1];
//			CASCADEIN=checkcase[2];
			CLAVIERVIRTUEL=checkcase[1];
//			COPYARCHIVE=checkcase[3];
//			ANNULEETREMPLACE=checkcase[5];
//			CASEISOLEEINCORPOREE=checkcase[6];
			REINITARCH=checkcase[2];
			FILTRAGEDESSOLUTIONS=checkcase[5];
			SELECTSISELECTION=checkcase[4];
			MODEDEVELOPPEMENT=checkcase[3];
//			AUTORISEALS=checkcase[7];
		} else {// Chargement des valeurs par defaut dans le webstorage
			enregistrementconfiguration();
		}
	}
}

function reinitialisegrille() {// Contraintes prises en compte : etoiles et diagonales croissantes 
		coloris=false;
		for (var i=0; i<M; i++) {contenu[i]=contenuinitial}
		for (var i=0; i<M; i++) {			
			if (contenudepart[i]!=0) {
			   contenu[i]=contenudepart[i];
			   elim(i);
			}
		}
		// La griile initiale
		for (var i=0; i<M; i++) {contenusaisie[i]=contenu[i]}
		affiche();
}

function changenombrecases(valeur) {
		var ii=valeur.selectedIndex;
    	MAXCH=valeur.options[ii].text;
		valeurreduit();
}

function nombremaximumparchiffre(valeur) {
		var ii=valeur.selectedIndex;
    	NMAXNUM=valeur.options[ii].text;
}

function crashautorise(valeur) {
		var ii=valeur.selectedIndex;
    	NBRECHECS=valeur.options[ii].text;
}

function maximummodifs(valeur) {
		var ii=valeur.selectedIndex;
    	NBMODIF=valeur.options[ii].text;
}

function maximummethodes(valeur) {
		var ii=valeur.selectedIndex;
    	ORMreduit=parseInt(valeur.options[ii].text);
		valeurreduit();
}

function maximumchains(valeur) {
		var ii=valeur.selectedIndex;
    	MAXTIGRE=valeur.options[ii].text;
}

function maximumiterations(valeur) {
		var ii=valeur.selectedIndex;
    	MAXITER=valeur.options[ii].text;
}

function caseinitialeALSChain(valeur) {
		var ii=valeur.selectedIndex;
    	CASEINITALSCHAIN=valeur.options[ii].text;
}

function maximumchainsgriffe(valeur) {
		var ii=valeur.selectedIndex;
    	MAXGRIFFE=valeur.options[ii].text;
}

function maximumchainsmaxilien(valeur) {
		var ii=valeur.selectedIndex;
    	MAXMAXILIEN=valeur.options[ii].text;
}

function maximumchainsmedusa(valeur) {
		var ii=valeur.selectedIndex;
    	MAXMEDUSA=valeur.options[ii].text;
}

function testnumerr(valeur) {
		var ii=valeur.selectedIndex;
    	numerr=valeur.options[ii].text;
}

function niveaudifficulte(valeur) {
		var ii=valeur.selectedIndex;
    	niveau=valeur.options[ii].text;
		autreniveau=ii+1;
}

function testetape(valeur) {
		var ii=valeur.selectedIndex;
    	etapecalcul=valeur.options[ii].text;
}

function testmethode(valeur) {
		var ii=valeur.selectedIndex;
    	var met=valeur.options[ii].text;
		NOMMETHODE=met.split("- ")[1];
		NUMEROMETHODE=met.split("- ")[0];
		valeurreduit();
}

function nombregrillesgenerees(valeur) {
		var ii=valeur.selectedIndex;
    	NBGENERE=parseInt(valeur.options[ii].text);
}

function nombremethodes(valeur) {
		var ii=valeur.selectedIndex;
    	NBGENERE=parseInt(valeur.options[ii].text);
}

function nombrechiffrescandidats() {
		var ii=valeur.selectedIndex;
    	TAILLECHIFFRES=parseInt(valeur.options[ii].text);
}

function contraintes(ii) {
	if (!modegeneration) {
/*				var num=contenu[ii]
				if (casenonconsec) {// Cases non consecutives
					variete=1;
					// Enlever les chiffres proches de num (ecart>1 ou <-1)dans les 4 cases autour de ii (ou 3 sur les bords, ou 2 dans les coins), horizontalement et verticalement
        			num=parseInt(num);
        			var wscen0="Elimination "+(num-1)+" et "+(num+1)+" (pour cases voisines non consécutives) dans ";
        			if (num==9) {wscen0="Elimination "+(num-1)+" (pour cases voisines non consécutives) dans "}
        			if (num==1) {wscen0="Elimination "+(num+1)+" (pour cases voisines non consécutives) dans "}
					wscen0=tradacrit(wscen0);
					var prescen=scenario;
					if (scenario==noeffect) {wscen=colPlace[ii]+" = "+num+", "+wscen0} else {wscen=scenario+" et aussi "+wscen0}
					var h=M;
					for (var j=0; j<4;j++) {
						switch (j) {
							case 0:// au-dessus
								var h=ii-9;
								break;
							case 1:// a gauche sauf bordure
								if (ii!=9*parseInt(ii/9)) {var h=ii-1}
								break;
							case 2:// a droite sauf bordure
								if ((ii+1)!=9*parseInt((ii+1)/9)) {var h=ii+1}
								break;
							case 3:// au-dessous
								var h=ii+9;
								break;
								
						}
						// Enlever dans h les chiffres distants de 1 avec num
						if ((h>=0) && (h<M) && (h!=ii)) {
        					if (contenu[h]=="") {generecrash=true; return}				
    						enlevechiffre(num, h, 0)
        					if (contenu[h]=="") {generecrash=true; return}				
						}
					}
					if (wscen.split("non consécutives) dans ")[1].length=="") {wscen=prescen}
				}

				if (diagonale) {// Diagonales principales = zones sudoku
					variete=2;
					num=parseInt(num);        			
					var wscen0="Eimination sur diagonales (diagonales comme zones sudoku) dans ";
					var prescen=scenario;
					if (scenario==noeffect) {wscen=colPlace[ii]+" = "+num+", "+wscen0} else {wscen=scenario+" et aussi "+wscen0}
					// verifier que ii est sur une diagonale (ou les 2 pour E5) et enlever le chiffre num dans les cases de cette diagonale
					if ((ii==8*parseInt(ii/8)) && (ii!=0) && (ii!=80)) {// Diagonale I1-A9, diagonale montante où ligne + colonne = 8     8 16 24 ... 72 (9 cases)
					//if (ii==8*parseInt(ii/8)) {// Diagonale I1-A9, diagonale montante où ligne + colonne = 8     8 16 24 ... 72 (9 cases)
						for (var j=0; j<9; j++) {
							var h=72-8*j;
							//Enlever num dans h
							if (h!=ii) {
								if (contenu[h].split(num)[0].length<contenu[h].length) {
									enlevechiffre(num, h, 1)
								}
							}
						}
					}	// ii mod 8			
					if (ii==10*parseInt(ii/10)) {// Diagonale A1-I9, diagonale descendante où ligne=colonne 0 10 20 .... 80 (9 cases)
						for (var j=0; j<9; j++) {
							var h=10*j;
							//Enlever num dans h
							if (h!=ii) {
								if (contenu[h].split(num)[0].length<contenu[h].length) {
									enlevechiffre(num, h, 1)
								}
							}
						}
					
					}// ii mod 10 = 0
					if (wscen.split("zones sudoku) dans ")[1].length=="") {wscen=prescen}				
				}// diagonale


				if (diagcrois) {// Diagonales croissantes ou decroissantes, mais pas les 2 (priorite a la croissante)
					// enlever les chiffres plus grands que num, dans les 2 diagonales contenant ii, dans les cases plus petites que ii
					// enlever les chiffres plus petits que num, dans les 2 diagonales contenant ii, dans les cases plus grandes que ii
					// verifier que ii est sur une diagonale (ou les 2 pour E5) et enlever le chiffre num dans les cases de cette diagonale
					// Diagonales principales uniquement
					// verifier que ii est sur une diagonale (ou les 2 pour E5) et enlever le chiffre num dans les cases de cette diagonale
					variete=3;
					num=parseInt(num);        			
					var wscen0="élimination sur la diagonale (diagonales croissantes) des chiffres<"+num+" sur cases supérieures et chiffres >"+num+" sur cases inférieures dans ";
					var prescen=scenario;
					if (scenario==noeffect) {wscen=colPlace[ii]+" = "+num+", "+wscen0} else {wscen=scenario+" et aussi "+wscen0}
    				if (ii==10*parseInt(ii/10)) {// Diagonale A1-I9, diagonale descendante ou ligne=colonne 0 10 20 .... 80 (9 cases)
    						for (var j=0; j<9; j++) {
    							var h=10*j;
    							//Enlever chiffres < num dans h si h<ii et chiffres >num si h>ii
    							if (h<ii) {enlevechiffre(num, h, 2)} else {enlevechiffre(num, h, 3)}
    						}
    				}
					//if (ii==8*parseInt(ii/8)) {// Diagonale I1-A9, diagonale montante ou ligne + colonne = 8     8 16 24 ... 72 (9 cases)
					if ((ii==8*parseInt(ii/8)) && (ii!=0) && (ii!=80)) {// Diagonale I1-A9, diagonale montante ou ligne + colonne = 8     8 16 24 ... 72 (9 cases)
    						for (var j=0; j<9; j++) {
    							var h=72-8*j;
    							//Enlever chiffres < num dans h si h<ii et chiffres >num si h>ii
    							if (h<ii) {enlevechiffre(num, h, 2)} else {enlevechiffre(num, h, 3)}
    						}
    				}
					if (wscen.split("inférieures dans ")[1].length=="") {wscen=prescen}
				} else if (diagdecrois) {
						variete=4;
    					if (ii==10*parseInt(ii/10)) {// Diagonale A1-I9, diagonale descendante ligne=colonne 0 10 20 .... 80 (9 cases)
    						for (var j=0; j<9; j++) {
    							var h=10*j;
    							//Enlever chiffres < num dans h si h>ii et chiffres >num si h<ii
    							if (h>ii) {enlevechiffre(num, h, 2)} else {enlevechiffre(num, h, 3)}
    						}
    					}
					//if (ii==8*parseInt(ii/8)) {// Diagonale I1-A9, diagonale montante ligne + colonne = 8     8 16 24 ... 72 (9 cases)
					if ((ii==8*parseInt(ii/8)) && (ii!=0) && (ii!=80)) {// Diagonale I1-A9, diagonale montante ou ligne + colonne = 8     8 16 24 ... 72 (9 cases)
    						for (var j=0; j<9; j++) {
    							var h=72-8*j;
    							//Enlever chiffres < num dans h si h>ii et chiffres >num si h<ii
    							if (h>ii) {enlevechiffre(num, h, 2)} else {enlevechiffre(num, h, 3)}
    						}
    					}
						if (wscen.split("inférieures dans ")[1].length=="") {wscen=prescen}
				}// diagcrois || diagdecrois
*/	}
}

function enlevechiffre(chiffre, cible, casvu) {
var re=/\d/g;
var ctex=contenu[cible].toString().match(re);
for (var i=0; i<ctex.length; i++) {
    var hnum=ctex[i];
	switch(casvu) {
    	case 0:// cases non consecutives
    		// Enlever les chiffres proches de chiffre (|ecart|<2)dans la case cible
			if (Math.abs(hnum-chiffre)==1) {// Eliminer ce chiffre
				if (contenu[cible].split(hnum)[0].length<contenu[cible].length) {
    				if (wscen.split(colPlace[cible])[0].length==wscen.length) {wscen=wscen+colPlace[cible]+" "}
    				eliminationnumero(cible,hnum);
				}
			}
    		break;
    	case 1:// diagonales principales zones sudoku
    		// enlever chiffre dans la case cible
			if (hnum==chiffre) {// Eliminer ce chiffre
				wscen=wscen+colPlace[cible]+" ";
				eliminationnumero(cible,hnum);
			}
    		break;
    	case 2:// diagonales principales croissantes
    		// enlever les chiffres < chiffre dans la case cible
    		if (hnum<chiffre) {// Eliminer ce chiffre
   				if (wscen.split(colPlace[cible])[0].length==wscen.length) {wscen=wscen+colPlace[cible]+" "}
   				eliminationnumero(cible,hnum);
			}
			break;
    	case 3:// diagonales principales decroissantes
    		// enlever les chiffres > chiffre dans la case cible
    		if (hnum>chiffre) {// Eliminer ce chiffre
   				if (wscen.split(colPlace[cible])[0].length==wscen.length) {wscen=wscen+colPlace[cible]+" "}
   				eliminationnumero(cible,hnum);
			}
			break;
    }// casvu
}// i

}


