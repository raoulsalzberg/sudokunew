 	var zlbern, nnbern=new Array(), pbern, xbern, refmatch, resultbern=new Array(), ibern=0, indfact;
function etablirres(nnn,cht) {
	// Initialisation
	var referee="123456789";
	var re=/\d/g;
	refmatch=cht.match(re); 
	zlbern=cht.length+1;
	var refsub=referee.substring(0,nnn);
	nnbern=refsub.match(re);
	//nnbern=referee.substring(0,nnn).match(re);
	resultbern=[];
	pbern=nnn-1;
	xbern=nnn;
	ibern=0;
	indfact=nnn+1;
	// Recherche toutes les configurations de nnn chiffres dans cht
	// Signification des variables :
	// refmatch   : decomposition de cht en tableau
	// zlbern     : longueur de cht +1
	// refsub     : sous-chaine des nnn premiers chiffres de referee="123456789"
	// nnbern     : decomposition de refsub en tableau = initialisation premiere configuration = masque du tableau de resultat resultbern
	// resultbern : tableau des resultats pour un nombre nnn de chiffres extraits de cht
	// ibern      : nombre de resultats pour un nombre nnn de chiffres extraits de cht, initialise a 0, indice du tableau resultbern
	// xbern      : initialise a nnn dernier element du tableau nnbern
	// pbern      : initialise a nnn-1 indice du dernier element du tableau nnbern
	// indfact    : initialise a nnn+1 profondeur de recursivite
	factm();
}

function factm() {
	while (xbern<zlbern) {
		if (indfact==1) {
		   while (xbern<zlbern) {
			  var res="";
			  for (var j=0; j<nnbern.length; j++) {
			  	  for (var k=0; k<refmatch.length; k++) {
				  	  if (nnbern[j]==(k+1)) {res=res+refmatch[k]}
				  }
			  }
    		  resultbern[ibern]=res;
			  ibern=ibern+1;
			  xbern=xbern+1;			  
			  // Ne pas charger le masque xbern=zlbern
			  nnbern[pbern]=xbern;
		   }
		}
		indfact=indfact-1;
		if (indfact>0) {
    		factm();// Reentrant
    		if (pbern<0) {return}
		}
		indfact=indfact+1;
		pbern=pbern-indfact;
        if (pbern>(-1)) {
    		nnbern[pbern]=parseInt(nnbern[pbern])+1;
    		for (var i=0; i<indfact; i++) {
    			pbern=pbern+1;
                nnbern[pbern]=nnbern[pbern-1]+1;
    		}
            xbern=nnbern[pbern];
		}
	}
}

function nplusunecasespournchiffres() {// Test (n+1) cases contiennent n chiffres
	var re = /\d/g;
	var cases=new Array();
	cases=[];
	for (var lcnplus=0; lcnplus<3; lcnplus++) {// Ligne colonne bloc
		for (var i=0; i<9; i++) {// Numero d'axe ou de bloc
			var chiffretotal="";
			var z=0;
			for (var j=0; j<9; j++) {// Numero de case
    			switch(lcnplus) {
    				case 0:// Ligne i
    					 var h=	9*i+j;
						 break;				   
    				case 1:// Colonne i
    					 var h=	i+9*j;
						 break;				   
    				case 2:// Bloc i
						 var h=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i;
						 break;	    			
    			}// switch
				var posk=contenu[h];
				if (posk.length>1) {// cases avec au moins 2 chiffres
				   cases[z]=h;
				   var ch=posk.match(re);
				   for (var hnum=0; hnum<posk.length; hnum++) {
				   	   var newn=ch[hnum].toString();
					   if (chiffretotal.length==0) {
					   	  chiffretotal=newn;
					   } else if (chiffretotal.split(newn)[0].length==chiffretotal.length) {// pas deja vu a inserer
					   	  var chtot=chiffretotal.match(re);
						  var newch="";
						  for (var itot=0; itot<chtot.length; itot++) {
							  if (chtot[itot]<newn) {newch=newch+chtot[itot]} else {newch=newch+newn+chtot[itot]; newn=""}
						  }
						  if (chtot[itot-1]<newn) {newch=newch+newn}
						  chiffretotal=newch;// a verifier
					   }// chiffretotal					   
				   }// hnum
				   z=z+1;
				}// posk.length
			}// j
			if ((chiffretotal.length>1) && (z>2) && (z<chiffretotal.length)) {
    			chtot=chiffretotal.match(re);
    			// Exploration de l'axe i ou du bloc i, dont les cases sont dans le tableau cases et les chiffres sont dans le tableau chiffres
    			// Longueur z
				for (var n=2; n<z; n++) {
    				etablirres(n, chiffretotal.toString());// Balayage de toutes les configurations de n chiffres parmi les z inclus dans chiffretotal
    				var ncrash=0;
    				for (var ich=0; ich<ibern; ich++) {
        				var chiffresdebase=resultbern[ich].toString();
        				// chiffresdebase contient n chiffres
						// Recherche des nbc cases dans axe lc, parmi les z cases ayant plus de 1 chiffre, dont le contenu est dans chffresdebase
						// Ces cases sont dans le tableau casesincluses
        				var casesincluses=new Array();
						casesincluses=[];
    					var nbc=0;
    					for (var ncase=0; ncase<z; ncase++) {
        						var h=cases[ncase];
            					var poskint=contenu[h];
            					// verifier que cette case h ne contient que des termes de chiffresdebase
								var pasde=true;
    							for (var hnum=0; hnum<poskint.length; hnum++) {
                						var intn=poskint.substring(hnum, hnum+1);
										if (!(chiffresdebase.split(intn)[0].length<chiffresdebase.length)) {pasde=false}
                				}
            					if (pasde) {
								casesincluses[nbc]=colPlace[h]; 
								nbc=nbc+1;
								} else {
								}
        				}// ncase
						if (nbc>n) {// crash : nbc cases contiennent n chiffres et eux-seuls, avec n inferieur a nbc
    					   ncrash=ncrash+1;
        							var casesr="";
									for (var ic=0; ic<casesincluses.length; ic++) {casesr=casesr+casesincluses[ic]+"="+contenu[decodagecolPlace(casesincluses[ic])]+" "}
									variete=2;
            						scenario=" : Les "+nbc+" cases "+casesr+" ne contiennent que les  "+n +" chiffres "+resultbern[ich];
    								if (lcnplus==0) {scenario=scenario+" dans la ligne "+(i+1)}
    								if (lcnplus==1) {scenario=scenario+" dans la colonne "+String.fromCharCode(65+i)}
    								if (lcnplus==2) {scenario=scenario+" dans le bloc "+(i+1)}
									origincrash=true;
									if (clickmethode) {enregistrescenarios()} else {return}
    					}
        			}// ich
    			}// n
			}//chiffretotal.length
		}// i
	}// lcnplus
}
