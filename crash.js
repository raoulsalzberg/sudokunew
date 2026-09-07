function enleveunchiffrerouge(i) {// Pour case sans chiffre-candidat
		 var PRE=PREPRINT.replace(/\'/g,"\"");
			 var currSquare=SQ+colPlace[i];
			 var mm=document.getElementById(currSquare).innerHTML;			 
			 var x=mm.split(PRE)[0];
			 if (x.length<mm.length) {
				var k=1;
				var y=mm.split(POSTPRINT);
				do {
					var nn=y[k];
					if (nn===undefined) {break}
					x+=nn.split(PRE)[0];
					k+=1;
    			}
    			while (nn.length>PRE.length) ;
			 }// x.split
			return (x.length==0);
}


function testcasesblanches() {
			casesblanches="";
			for (var iii=0; iii<M; iii++) {
				if (contenu[iii].length==0) {
					if (casesblanches.length==0) {casesblanches=tradacrit("Sélection impossible "+colPlace[i]+"="+contenu[i]+" du fait de cases sans chiffre résiduel")}
					casesblanches+=" "+colPlace[iii];
				}
			}
			return (casesblanches!="");
}

function doublecrash() {;// Doublon ou chiffre manquant dans une zone sudoku
		 // Case sans chiffre-candidat
		 for (var i=0; i<M; i++) {
			 if (enleveunchiffrerouge(i)) {
							origin=0;
							variete=4;
							scenario="Case "+colPlace[i]+" sans chiffre-candidat";
							origincrash=true;
							return;
							//if (clickmethode) {enregistrescenarios()} else {return}
			 }
		 }
		 // 2 cases identiques a un chiffre
		 for (var i=0; i<M; i++) {
			 var crw=oterroso(i);
			 if (crw.length==1) {
						var halter=doublon(i);
						if (halter!=(-1)) {// Doublon --> Crash
							origin=0;
							variete=0;
							scenario="Doublon "+colPlace[i]+" = "+colPlace[halter]+" = "+crw;
							//scenario=wscen+" Doublon "+colPlace[i]+" = "+colPlace[halter]+" = "+crw;
							origincrash=true;
							return;
							//if (clickmethode) {enregistrescenarios()} else {return}
						}
			 }
		 }
		 // Axe ou bloc ou manque un chiffre (nncrash)
		 for (var nncrash=1; nncrash<10; nncrash++) {// chiffre
		 	 for (var lcncrash=0; lcncrash<3; lcncrash++) {// Type axe ou bloc
			 	 for (var incrash=0; incrash<9; incrash++) {// Numero axe ou bloc
    				 var trouv=false;
					 for (var j=0; j<9; j++) {
        				 switch (lcncrash) {
        				 		case  0:// Ligne incrash
    								  	  var h=9*incrash+j;
    									  var texth="la ligne "+ (incrash+1)
    								  break;
        				 		case  1:// Colonne incrash
    								  	  var h=incrash+9*j;
    									  var texth="la colonne "+ String.fromCharCode(incrash+65);
    								  break;
        				 		case  2:// Bloc incrash
    									  var h=j+6*parseInt(j/3)+18*parseInt(incrash/3)+3*incrash;
    									  var texth="le bloc "+ (incrash+1);
    								  break;
        				 }// switch
						 var posk=contenu[h]+"";
						 if (posk.split(nncrash)[0].length<posk.length) {trouv=true}
					 }
					 if (!trouv) {// Chiffre nncrash introuvable dans la zone sudoku
					 	 origin=0;
                      	 variete=1;
                       	 scenario="Chiffre "+ nncrash+" introuvable dans "+texth;
						 origincrash=true;
							return;
						 //if (clickmethode) {enregistrescenarios()} else {return}
					 }
				 }// incrash
			 }// lcncrash
		 }// nncrash		 
		 // 1 case contenant 2 chiffres en solo
		 for (var nncrash=1; nncrash<9; nncrash++) {// chiffre
		 for (var ppcrash=(nncrash+1); ppcrash<10; ppcrash++) {// chiffre
		 	 for (var lcncrash=0; lcncrash<3; lcncrash++) {// Type axe ou bloc
			 	 for (var incrash=0; incrash<9; incrash++) {// Numero axe ou bloc
    				 	var trouv=false;
					 	var casesolo=M;
    					for (var j=0; j<9; j++) {
                			switch (lcncrash) {
                				 		case  0:// Ligne incrash
            								  	  var h=9*incrash+j;
            									  var texth="la ligne "+ (incrash+1)
            								  break;
                				 		case  1:// Colonne incrash
            								  	  var h=incrash+9*j;
            									  var texth="la colonne "+ String.fromCharCode(incrash+65);
            								  break;
                				 		case  2:// Bloc incrash
            									  var h=j+6*parseInt(j/3)+18*parseInt(incrash/3)+3*incrash;
            									  var texth="le bloc "+ (incrash+1);
            								  break;
                			}// switch
        					var poskk=contenu[h]+"";
						 //if (h==11) {(colPlace[h]+"="+poskk+" chiffre "+nncrash+" lc "+lcncrash+" j "+j+" bloc "+incrash)}
    		   				var contientnncrash=(poskk.split(nncrash)[0].length<poskk.length);
            				var contientppcrash=(poskk.split(ppcrash)[0].length<poskk.length);
							var lunoulautre=contientnncrash || contientppcrash;
							var lunetlautre=contientnncrash && contientppcrash;
        					if (lunoulautre && !lunetlautre) {trouv=true} else if (lunetlautre) {if (casesolo==M) {casesolo=h} else {trouv=true}}// et sans xor
    					}// j
    					if (!trouv && (casesolo!=M)) {// Chiffres nncrash et ppcrash uniquement dans casesolo 
							 origin=0;
                           	 variete=3;
                           	 scenario="Chiffres "+ nncrash+" et "+ppcrash+" uniquement dans la seule case "+colPlace[casesolo]+" dans "+texth;
							 origincrash=true;
							return;
    						 //if (clickmethode) {enregistrescenarios()} else {return}
    					}
				 }// incrash
			 }// lcncrash
		 }}// nncrash et ppcrash
		 wscen=noeffect;
}

function doublon(i0) {
			var numr=oterroso(i0);
			var ihorizontal = parseInt(i0/9);
			var ivertical=i0-9*ihorizontal;
			var icarre = carre[i0]-1;
			for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
				for (var i=0; i<9; i++) {
					switch (lc) {
	  					case 0: // Ligne ihorizontal
							var h=i+9*ihorizontal;
							break;
	  					case 1: // Colonne ivertical
							var h=ivertical+9*i;
							break;
	  					case 2: // Carre icarre
							var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
							break;
					}
					var numhr=oterroso(h);
					if ((h!=i0) && (numhr==numr)) {return h}	// Doublon --> Crash				
				}
			}
			return (-1);
}

function oterroso(ii) {
	var re=/\d/g;
	var currSquare = SQ + colPlace[ii];
	var voir=document.getElementById(currSquare).innerHTML;
	var j=0;
	var tst=voir.split("FF1493");
	var ibase=contenu[ii];
	do {
   			j=j+1;
			var exep=!(tst[j]===undefined);
   			if (exep) {
				var ligne=tst[j].split(">")[1];
   				var aoter=ligne.substring(0, 1);
           		var cmodif="";
       			var cref=ibase.toString().match(re);
   				for (var k=0; k<cref.length; k++) {
               		if (cref[k]!=aoter) {cmodif=cmodif+cref[k]}
       			}
   				ibase=cmodif;
       		}
	}
	while (exep);
	return ibase;
}

function elaborevariantecrash() {
		 // variete=0 : "Doublon "+colPlace[i]+" = "+colPlace[halter]+" = "+contenu[i]
		 // variete=1 : "Chiffre "+ nncrash+" introuvable dans la ligne (ou la colonne ou le bloc) "+ (incrash+1)
		 // variete=2 : "Crash : les "+n+" cases+" "+casesincluses+" contiennent les "+(n-1) +" chiffres de "+chiffretotal ex variete 4
		 // variete=idem 2 : "3 cases de 2 chiffres identiques : "+contenu[ii]
		 // variete=idem 2 : "4 cases pour 3 chiffres : "+contenu[i0]+" --> "+colPlace[h]+",  "+colPlace[i0]+",  "+colPlace[ij]+" et "+colPlace[ii]
		 // Variete=3 : Chiffres nncrash et ppcrash uniquement dans la seule case colPlace[casesolo] dans la ligne (ou colonne ou bloc)
		 // Variete=4 : Case colPlace[casesolo] sans chiffre-candidat
		 // Ajouter :
		 // Variete=5 : crash plusieurs solutions
		 // variete=6 : crash unicite bug+1
		 // variete=7 : crash unicite rectangle
		 // variete=8 : crash unicite evitement non corrobore
		 // Attention : Crash donc pas d'elimination de chiffre-candidat; juste un affichage de l'explication generale selon la variete obtenue
		 variete=10;// par defaut si pas de crash
		 if (scenario.split("Doublon")[0].length<scenario.length) {variete=0}
		 if (scenario.split("introuvable ")[0].length<scenario.length) {variete=1}
		 if (scenario.split("contiennent")[0].length<scenario.length) {variete=2}
		 if (scenario.split("uniquement")[0].length<scenario.length) {variete=3}
		 if (scenario.split("chiffre-")[0].length<scenario.length) {variete=4}
		 if (scenario.split("Grille fausse par defaut")[0].length<scenario.length) {variete=5}
		 if (scenario.split("dans le rectangle")[0].length<scenario.length) {variete=6}
		 if (scenario.split("aucune case")[0].length<scenario.length) {variete=7}
		 if (scenario.split("non corrobore")[0].length<scenario.length) {variete=8}
}
