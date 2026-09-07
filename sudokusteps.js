function decortiqfinish() {
// finish K 1- Sélection manuelle B1 = 2, Elimination 2 dans D1 B2 B7 B9 Cascade B9 = 8, Elimination 8 dans A9 C9 F9 H9 I9 B2 B3 B7 A7 C7 Cascade de cascade A9 = 7, Elimination 7 dans C9 F9 H9 I9 A2 A7 C7 
// finish C 1- Opération de suppression manuelle : pas de 9 dans C1
coloris=true;
if (calculencours=="K") {// Affectation ou selection
	var listefinish=finish.split(" = ");
			affiche();
	for (var i=1; i<listefinish.length; i++) {
		var lprev=listefinish[i-1];
		var lencours=listefinish[i];
		var Hprev=lprev.substring(lprev.length-2, lprev.length);
		var hprev=decodagecolPlace(Hprev);
		var n=lencours.substring(0,1);
		// verdir n dans hprev
		miseauvert(hprev,n, BACKVERT);
		var listeh=lencours.split(" dans ")[1];
		var lcases=listeh.split(" ");
			for (var ii=0; ii<contenu[hprev].length; ii++) {
				var m=contenu[hprev].substring(ii, ii+1);
				if (m!=n) {eliminationnumero(hprev, m)}
			}// ii
    		for (var j=0; j<lcases.length-1; j++) {
    			var HH=lcases[j];
    			if ((HH.length==2) && (HH!="de")) {
					var h=decodagecolPlace(HH);
    				// eliminer n dans h;
    				eliminationnumero(h, n);
				}
    		}// j

	}// i
} else {// deselection
	var x=finish.split("pas de ")[1];
	var n=x.substring(0,1);
	var y=x.split(" dans ")[1];
	var HH=y.substring(0,2);
	var h=decodagecolPlace(HH);
    // eliminer n dans h;
    eliminationnumero(h, n);
}
}

function selectstep(last) {// Visualisation etape choixetape
try {
	affiche();
			enleverougeetchiffre();
	if (choixetape==0){// Grille initiale
			for (var i=0; i<M; i++) {contenu[i]=contenusaisie[i]}
			//departverscontenu();
			afficheini();
			putmessage(listescenarios[numerohypothese][choixetape]);
			return;
	}
	finish=listescenarios[numerohypothese][choixetape];
	if (finish.split("manuelle")[0].length<finish.length) {
		scenario=finish;		
		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape][i]}
		for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
		affiche();
		if (casesblanches.length==0) {coloris=true} 
		var calcul=listecalcul.split(sep);
		calculencours=calcul[choixetape].substring(0,1);
		if ((calculencours!="K") && (calculencours!="C")) {
			calculetape(choixetape);
			elaboreunevariante();
		} else {
			decortiqfinish();
		}
		coloris=false;
		putmessage(choixetape+"- "+finish);
		finish="";
		return;
	}
	if ((finish.split("Solution")[0].length<finish.length) || (finish.split("bug")[0].length<finish.length) || ((finish.split("rectangle")[0].length<finish.length) && !(finish.split("Evitement")[0].length<finish.length))) {
			coloris=true;
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			affiche();
			calculetape(choixetape);
							scenario=finish;
							elaborevariantecrashunicite();// en dissequant scenario en cas de crash
			putmessage("Après élabore");
//			avecrougeetchiffre();
//			enleverougeetchiffresans();
			coloris=false;
			nmx=listenm[numerohypothese][choixetape];
//			putmessage(choixetape+"- "+finish+"<br>nmx ");
//			putmessage(choixetape+"- "+finish+"<br>nmx "+nmx);
			putmessage(choixetape+"- "+finish+"<br>"+explainmethods(nmx));
	   		return;
	}
	if (finish.split("suppression")[0].length<finish.length) {// Supprimer un chiffre de la case
		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
		affiche();
		wscen="";
		if (casesblanches.length==0) {coloris=true} 
		calculetape(choixetape);
		elaboreunevariante();
		coloris=false;
		nmx=listenm[numerohypothese][choixetape];
		putmessage(choixetape+"- "+scenario+"<br>"+explainmethods(nmx));
		return;
	}
	if (finish.split("Optimisation")[0].length<finish.length) {
			enleverougeetchiffre();
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			affiche();
        	coloris=true;
    		calculetape(choixetape);
			coloris=false;
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+finish+"<br>"+explainmethods(nmx));
			return;
	} else if (finish.split("Retour")[0].length<finish.length) {
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			for (var ii=0; ii<M; ii++) {sortieinser[ii]=""}
			affiche();
        	coloris=true;
    		calculetape(choixetape);
			coloris=false;
			putmessage(choixetape+"- "+finish);
			return;
	} else if ((finish.split("impossible")[0].length<finish.length) ||(finish.split("impossibilit")[0].length<finish.length) ) {
			coloris=true;
    		var eff=2;
			if ((choixetape==(oTD.length-1))  && (finish.split("uniquement")[0].length<finish.length)) {eff=1}
			for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-eff][i]}
			affiche();
			calculetape(choixetape-(eff-1));
			enleverougeetchiffre();
			coloris=false;
			affiche();
    		origin=0;// Pour explication generale
			if (casesblanches!="") {variete=4} else {calc(); listescenarios[numerohypothese][choixetape]=scenario}
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));
			return;

	} else if (finish.split("BUG+1 dans")[0].length<finish.length) {
			if (choixetape>1) {
    			coloris=true;
        		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-2][i]}
    			affiche();
        		calculetape(choixetape-1);
    			enleverougeetchiffre();
    			coloris=false;
    			affiche();;
			}
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));			
			return;
	}
		var calcul=listecalcul.split(sep);
		var lastmethode=calcul[choixetape].substring(0,1);
	if (lastmethode=="T") {
			coloris=true;
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			clickmethode=true;
			for (origin=1; origin<ormg; origin++) {
				variete=0;
				for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
			for (var k=0; k<200; k++) {tableauvariante[k]=""}// Pas plus de 200 variantes
			maxvarencours=1;
				calc();
				listescenarios[numerohypothese][choixetape]=scenario;
			}
			coloris=false;
    		origin=calcul[choixetape];// Pour explication generale
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));
    		return;
	}
	if (lastmethode=="W") {
			var hue=calcul[choixetape];
			var ori=hue.substring(1,hue.length);
			coloris=true;
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			clickmethode=true;
			origin=parseInt(ori);
				variete=0;
				for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
				calc();
				listescenarios[numerohypothese][choixetape]=scenario;
			coloris=false;
    		origin=hue;// Pour explication generale
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));
    		return;
	}
	if (lastmethode=="M") {
			var hue=calcul[choixetape].split("V");
			origin=parseInt(hue[0].substring(1,hue[0].length));
			nmetref=parseInt(hue[1]);
			extrait=origin;
			for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
				affiche();
			clickmethode=true;
				variete=0;
				for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
				scenario=listescenarios[numerohypothese][choixetape];
			coloris=true;
				elaboreunevariante();
			coloris=false;
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));
    		return;
	}
	if ((!(finish.split("manuelle")[0].length<finish.length) || !(finish.split("Suppression")[0].length<finish.length)) && !(lastmethode=="L")) {
		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
		desaffiche();
		affiche();
		wscen=""; 
		if (casesblanches.length==0) {coloris=true} 
			calculetape(choixetape);
			scenario=finish;
			listescenarios[numerohypothese][choixetape]=scenario;
		elaboreunevariante();
		coloris=false;
	} else {
		if ((lastmethode=="H") || (lastmethode=="J") || (lastmethode=="Z") || (lastmethode=="L")) {
			coloris=true;
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			calculetape(choixetape);
			coloris=false;
			nmx=listenm[numerohypothese][choixetape];
    		putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));
			return;
		} else {// Grille finale sans solution ou derniere etape manuelle
		putmessage(lastmethode+" : "+finish);
		return;
			coloris=true;
    		for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}
			affiche();
			calculetape(choixetape);
			coloris=false;
			origin="Uxxy";
			nmx=listenm[numerohypothese][choixetape];
			putmessage(choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx));
			return;
		}
		origin="NN";
	}
	nmx=listenm[numerohypothese][choixetape];
	if (origin==22) {
		var xy="XY-Chain ";
		scenario=finish.split(xy)[1]+"  ";
		wscen=scenario;
    	coloris=true;
    	affiche();
		elaborevariantexychainnewbis();
    	putmessage(choixetape+"- "+scenario+"<br>"+explainmethods(nmx));
	} else {
		putmessage("<br>"+choixetape+"- "+listescenarios[numerohypothese][choixetape]+"<br>"+explainmethods(nmx)+"<br>");
	}
} catch(error) {
			  putmessage("OK "+error);
}
}
					   
function elaborevariantexychainnewbis() {
       		var re=/\d/g;
		var xy="XY-Chain ";
		var scenarioint=scenario;
		chiffredepart=scenarioint.substring(0,1);
		var caseini=scenarioint.substring(2,4);
		var casefin=scenarioint.substring((scenarioint.length-6), (scenarioint.length-4));
		// Sauf case raccord finale
		if (scenarioint.substring((scenarioint.length-7),(scenarioint.length-6))=="*") {casefin=scenarioint.substring((scenarioint.length-11), (scenarioint.length-9))}
		casedepart=decodagecolPlace(caseini);
		var lastc=decodagecolPlace(casefin);
		// Elimination de chiffredepart dans les cases voyant les cases extrêmes de la chaine, casedepart et lastc, puis affichage du message
		scenardetail+="<br><br>Elimination du chiffre "+chiffredepart+" dans les cases voyant les cases extrêmes de la chaîne "+caseini +" et "+casefin+" : ";
		Eliminationxychain(lastc);
//		if (nmetref<=maxvarencours) {// Variante particuliere
        	// decorticage du scenario, pour trouver les tableaux casexy, chiffrexy, knot et chiffreknot
			decorticxy();
			// visualisationchaine() est devenu faux (knot et chiffreknot expurges)
			// Les 2 types de raccord
			scenardetail+="<br><br>";		
			for (var i=0; i<xychain+1; i++) {
				if (knot[i]!=M) {
    			   // Passage par un raccord
				   if (casexy[i]==lastc) {var chiffref=chiffredepart} else {var chiffref=chiffrexy[i+1]}
	scenardetail+="Raccord de la case de la chaîne Ã  3 chiffres "+colPlace[casexy[i]]+"="+contenu[casexy[i]]+" entre les chiffres "+chiffrexy[i]+" et "+chiffref+" via le 3ème chiffre "+chiffreknot[i];
				   var h=knot[i];
				   var chif=chiffreknot[i]
				   miseauvert(casexy[i],chif, BACKJAUNE);
				   // Recherche si h fait partie de la chaine avec chiffre chif en sortie (raccord 1)
					  var yest1=false;
					  for (var iii=0; iii<(i-1); iii++) {
						   if ((chiffrexy[iii+1]==chif) && (h==casexy[iii])) {
							  scenardetail+=" voyant la case précédente de la chaîne "+colPlace[h]+" ayant ce 3ème chiffre en sortie.<br><br>";
				   			  miseauvert(h,chif, BACKJAUNE);
							  yest1=true;
    					   }
        			  }//iii
					// ou h est une case exterieure, a 2 chiffres, contenant chif 
					// et dont le chiffre complement autre est en sortie d une case vue et previous de la chaine (raccord 2)
    				  if (!yest1) {// pas raccord 1
						  var posh=contenu[h];
        				  var ch=posh.match(re);
        				  var autre=ch[0];
        				  if (autre==chif) {autre=ch[1]}
				   		  miseauvert(h,chif, BACKJAUNE);
				   		  miseauvert(h,autre, BACKBLEU);
    					  // Recherche case previous de la chaine voyant h et ayant autre en sortie (raccord 2)
    					  for (var iii=0; iii<(i-1); iii++) {
								  var casechaine=casexy[iii];								  
        						  if ((chiffrexy[iii+1]==autre) && ((carre[h]==carre[casechaine]) || (parseInt(h/9)==parseInt(casechaine/9))|| ((h-9*parseInt(h/9)) == (casechaine-9*parseInt(casechaine/9))))) {
            						 scenardetail+=" voyant une case extérieure a la chaîne "+colPlace[h]+"="+contenu[h]+" par ce 3ème chiffre et dont le chiffre complément "+autre+" est en sortie d\'une case précédente de la chaîne "+colPlace[casechaine]+" vue de cette case extérieure "+colPlace[h]+".<br>";
				   		  			 miseauvert(casechaine,autre, BACKBLEU);
									 break;
        						  }
            			  }//iii
					  }// yest1
				}// knot
    		}// i
			var cascade=true;
			// Les liens indirects
			for (var i2=0; i2<xychain; i2++){
				 if (i2==xychain-1) {chiffrexy[i2+2]=chiffredepart}
				 if ((i2<(xychain-1)) && (chiffrexy[i2]==chiffrexy[i2+1]) && (chiffrexy[i2+1]==chiffrexy[i2+2]) &&  cascade) {// Lien indirect
					   scenardetail+="<br>Lien indirect par le chiffre "+chiffrexy[i2]+" entre les cases "+colPlace[casexy[i2-1]]+" et "+colPlace[casexy[i2+2]]+" via les cases d\'indirection reliées en lien fort par ce chiffre "+colPlace[casexy[i2]]+ " et "+colPlace[casexy[i2+1]]+".<br>";
					   cascade=false;
					   // bleuissement cases d indirection
					   miseauvert(casexy[i2],chiffrexy[i2], BACKBLEU);
					   miseauvert(casexy[i2+1],chiffrexy[i2], BACKBLEU);
					   
    			 } else {cascade=true}
    		}// i2
		// verdissement
						var zz=scenardetail.split("chiffre ")[1];
						var m=zz.substring(0,1);
						var hh=(scenardetail.split("chaîne ")[1]);
						var case1=hh.substring(0,2);
						var h=decodagecolPlace(case1);
        				var currSquare = SQ + colPlace[h];
        				var inih= document.getElementById(currSquare).innerHTML;
						miseauvert(h,m, BACKVERT);
						var hh=(scenardetail.split("et ")[1]);
						var case2=hh.substring(0,2);
						var h=decodagecolPlace(case2);
        				var currSquare = SQ + colPlace[h];
        				var inih= document.getElementById(currSquare).innerHTML;
						miseauvert(h,m, BACKVERT);
			if (scenario.split(xy)[0].length==scenario.length) {scenario=xy+scenario}
			scenario+=scenardetail;
}


function calculetape(choix) {
try {
	var re=/\d/g;
			var calcul=listecalcul.split(sep);
			origin=parseInt(calcul[choix]);
			if (isNaN(origin)) {// Hypothese (H ou J) ou icone choix variante (M)
			   	var neworigin=calcul[choix];
				if ((neworigin.split("M")[0].length==neworigin.length) && (neworigin.split("T")[0].length==neworigin.length) && (neworigin.split("W")[0].length==neworigin.length)) {// M, T, W = icones choix variante
					if (neworigin=="Fin") {
					
					} else if (neworigin=="U") {// crash unicite bug+1
//						scenario=tradacrit("Crash défaut d'unicité bug + 1 (aucune case n'a plus de 2 chiffres). Etape "+etapecalcul+". ");					
					} else {
    					var re=/\D(\d\d)(\d)/;
            			if ((calcul[choix].length)==3) {re=/\D(\d)(\d)/}
						var stock=calcul[choix].toString().match(re);
    					var positionhyp=stock[1];
            			var num=stock[2];
						for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
    					var head=calcul[choix].substring(0,1);
						if ((head=="H") || (head=="U") || (head=="V") || (head=="J") || (head=="Z") || (head=="L") || (head=="C")) {// Selection directe ou unicite
    						var re2=/\d/g;
                			var ch=contenu[positionhyp].toString().match(re2);
							if (head=="H") {scenario="Hypothèse "} else if ((head=="U") || (head=="V")) {scenario="Défaut uniité évité corrigé "} else if (head=="C") {scenario="Sélection manuelle "} else {scenario="Hypothèse corrigée "}
							if (head=="C" ) {scenario=scenario+colPlace[positionhyp]+" différent de "+num} else {scenario=scenario+colPlace[positionhyp]+"="+num}
							wscen=scenario;
							for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
							for (var hnum=0; hnum<ch.length; hnum++) {
								if ((head!="U") && (head!="C")) {// bug+1
									if (ch[hnum] != num) {eliminationnumero(positionhyp, ch[hnum])}
								} else {// rectangle ou suppression
									if (ch[hnum] == num) {eliminationnumero(positionhyp, ch[hnum])}
								}
							}
						} else if (head=="K") {// Selection manuelle
							var re2=/\d/g;
                			var ch=contenu[positionhyp].match(re2);
							for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] != num) {eliminationnumero(positionhyp, ch[hnum])}}
							   	var contenupre=contenu[positionhyp];
							   	contenu[positionhyp]=num;
							   	wscen="";
                   				if (CASCADEIN) {
                    				var newcol=false;
                        			if (coloris) {var newcol=true}
                        			coloris=true;
                        			testsolution=false;
									scenario=wscen;
                    				elim(positionhyp);// Elimination de ce chiffre dans les cases ou il est vu
                    				if (!newcol) {
                    					 enleverougeetchiffre();
                    					 coloris=false;
                        			}
                    			} else {
                    				elim(positionhyp);// Elimination de ce chiffre dans les cases ou il est vu
                    			}
							   	scenario="Sélection manuelle "+scenario;
							   	contenu[positionhyp]=contenupre;
							//}					
    					} else if (head=="S") {//Sppression manuelle du chiffre num dans la case positionhyp a l'etape choixetape
								var contenupre=contenu[positionhyp];
								reinitialisecase(positionhyp);
								if (contenudepart[positionhyp]==0) {// Case non affecte au depart
										scenario=tradacrit("Suppression manuelle "+colPlace[positionhyp]+"="+contenu[positionhyp]+" et retour Ã  la situation de cette case avant qu'un chiffre ne lui soit affecté");
    							} else {// Case affectee au depart : Supprimer comme en mode creation, donc retour a la grille de depart mais prenant en compte les positionnements ulterieures
            							scenario=tradacrit("Suppression manuelle "+colPlace[positionhyp]+"="+num+" qui est une case de la grille de départ et dont le contenu devient "+contenu[positionhyp]);
								}
								contentmemory[numerohypothese][choixetape][positionhyp]=contenu[positionhyp];
								affiche();
    					}
					}					
				} else {// Les 3 cas de choix de methode avec leurs variantes : 
						//1- Toutes les methodes applicables avec toutes leurs variantes (neworigin = "T")
						//2- Toutes les variantes d une methode particuliere (neworigin = "Wxx")
						//3- Une variante particuliere d une methode particuliere (neworigin = "MxxVyy")
    				scenario=listescenarios[numerr][choix];
    				wscen=scenario;
    				enleverougeetchiffre();
            		coloris=true;
    				var head=calcul[choix].substring(0,1);
					if (head=="M") {// Methode par icone variante : MxxVyy = Methode xx et variante yy; decoder scenario de listescenarios[numerr][choix]
						var as=(neworigin.split("M")[1]).split("V");
    					origin=parseInt(as[0]);
        				nmetref=as[1];
    					elaboreunevariante();
					} else if (head=="T") {// Methode par icone methode : toutes les methodes applicables avec toutes leurs variantes
						// reperer les methodes applicables dans le scenario, avec leurs nombres de variantes
						// ou relancer leur calcul
					} else {// Methode particuliere Wxx : methode xx avec toutes ses variantes
						origin=parseInt(calcul[choix].substring(1,calcul[choix].length));
						calc();
						listescenarios[numerohypothese][choixetape]=scenario;
						nmetref=200;// Toutes les variantes de la methode origin
						calculvariante();
					}
					changemethods("Etapes");
    				coloris=false;
				}
        	} else if ((origin<=ormg) || (origin==32)) {// Calcul methode origin ou crash
					variete=0;
					for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
					var prescenario=listescenarios[numerohypothese][choixetape];
					if (prescenario.substring(0,3) != "ALS") {
						if ((origin!=ORM) && (origin!=0)) {
							calc();
						} else {
							scenario=prescenario;
							variete=1;
							var originprev=origin;
							elaborevariantecrashunicite();// en dissequant scenario en cas de crash
							nmx=listenm[numerohypothese][choixetape];
//							putmessage(scenario+"<br>"+explainmethods(nmx))
						}
						listescenarios[numerohypothese][choixetape]=scenario;
					}
			}
} catch(error) {
  putmessage(error);
}
}



function listesteps() {// Creation et affichage des etapes successives de la grille depuis etapeini jusqu'a etapecalcul, base sur le tableau listescenarios
		var etapefinale=listecalcul.split(sep).length-1;
		if (etapeini==0) {listescenarios[numerohypothese][0]="Grille initiale"; clearsteps()} else {etapeini=etapeini+1}
		titrer=tradacrit("<b>Liste des étapes pour la grille <u>")+myForm.nomrevue.value+"</u>";
		var nerr=numerohypothese;
		if ((nerr!=undefined) && (numerr>0)) {titrer=titrer+tradacrit(" et hypothèse <u>")+nerr+"</u>"}
		titrer=titrer+"</b>";
		document.getElementById("Titrestep").innerHTML=tradacrit(titrer);
		oTable = document.getElementById('Lulu');
        oTR = oTable.getElementsByTagName('tr');
        oTD = oTable.getElementsByTagName('td');
		var insidestep="";
		for (var i=etapeini; i<etapefinale+1; i++) {        
				if ((i>0) && (i<etapefinale)) {var insidestep= listescenarios[numerohypothese][i]} 
				else if (i==etapefinale) {var insidestep=crashtext[numerohypothese]}
				else {insidestep="Grille initiale"}
				if (insidestep.split("<br>")[0].length<insidestep.length) {insidestep=insidestep.split("<br>")[0]}
				// cree une ligne de tableau
                row = document.createElement("tr");
                cell = document.createElement("td");
				texte = document.createTextNode(i+"-"+insidestep);
				cell.appendChild(texte);
                row.appendChild(cell);
    	 		oTable.appendChild(row);
				row.setAttribute("id", "row"+i);
				cell.setAttribute("id", i+"E");
		 cell.style.setProperty("font-size","xx-large");
		 cell.style.setProperty("font-weight","bold");
		 		row.style.setProperty("background-color", "#FFFF80");
		}// i
		etapeenjaune(etapeini);
		etapeenblanc(etapefinale);
		choixetape=parseInt(etapefinale);
        changemethods("Etapes");
// Cas de click sur une etape
for(var i=0; i < oTD.length; i++){
	 // affecte la fonction mouseclick
	 oTD[i].onclick = function(){
			  var tronq=this.id.split("E")[0]
			  var ch=parseInt(tronq);
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
			  clickmethode=false;
			  coloris=true;
			  etapeenjaune(choixetape);
			  var metencours=parseInt(origin);
			  if (metencours<ORM+1) {methodeenjaune(metencours+1)}
			  choixetape=ch;
			  etapeenblanc(choixetape);
			  scenario=listescenarios[numerohypothese][choixetape];
			  selectstep(etapefinale-1);
     }
}
}

function etapeenblanc(numetape) {
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
		if (numetape<oTD.length) {oTD[numetape].style.setProperty("background-color", "#FFFFFF")} 
}

function etapeenjaune(numetape) {
		if (numetape<0) {numetape=0}
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
		if (numetape<oTD.length) {oTD[numetape].style.setProperty("background-color", "#FFFF80")} 
}

function stepup() {
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
        oTR = oTable.getElementsByTagName('tr');
	clickmethode=false;
	if (grilleencours!=-1) {
		var ch=parseInt(choixetape);
		if (ch==(oTR.length-2)) {ch+=1}
		var etapeencours=ch-1;// decrementation
		var derniereetape=oTD.length-1;
		if (etapeencours<0) {return}
		etapeenjaune(etapeencours+1);// etape previous en jaune
	 	etapeenblanc(etapeencours);
		choixetape=etapeencours;
		selectstep(derniereetape);
	}
}

function stepdown() {
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
        oTR = oTable.getElementsByTagName('tr');
	clickmethode=false;
	// Si au moins un storage existe et au moins un calcul fait
	if (grilleencours!=-1) {
		var ch=parseInt(choixetape);
		var etapeencours=ch+1;// incrementation
		var derniereetape=oTD.length-1;
		if (etapeencours>derniereetape) {etapeencours=derniereetape; return}
    	etapeenjaune(etapeencours-1);
    	etapeenblanc(etapeencours);
		choixetape=etapeencours;
		selectstep(derniereetape);
	 }
}

function clearsteps() {// Effacement des etapes successives de la grille, depuis choixetape jusqu'a etapecalcul et reinit titre
		titrer=tradacrit("<b><u>Liste des étapes</u></b>");
		document.getElementById("Titrestep").innerHTML=tradacrit(titrer);
	oTable = document.getElementById('Lulu');
	oTR = oTable.getElementsByTagName('tr');
	for (var i=oTR.length-1; i>choixetape+2; i--) {
		var disparu=oTable.removeChild(oTable.lastChild);
	}
}

function clearstepsmanuel() {// Effacement des etapes successives de la grille, depuis 0 jusqu'a etapecalcul
	oTable = document.getElementById('Lulu');
	oTR = oTable.getElementsByTagName('tr');
	var choix=parseInt(choixetape);
	for (var i=oTR.length-1; i>choix+2; i--) {
		var disparu=oTable.removeChild(oTable.lastChild);
	}
}

function clearstepsafter() {// Effacement des etapes de la grille de choixetape jusqu'a etapecalcul (ou calcul.length)
	oTable = document.getElementById('Lulu');
	oTR = oTable.getElementsByTagName('tr');
	oTD = oTable.getElementsByTagName('td');
	var choix=parseInt(choixetape);
	var calcul=listecalcul.split(sep);
	var etap=calcul.length;
	if (etap==(choix+1)) {
	   choixetape=choix+1;
	} else {
		if (oTD.length>1) {
    		if (etap>1) {
        		for (var i=etap+2; i>choix+2; i--) {
					if (i<(oTD.length+3)) {
        				var idname=oTR[i].id;
                		var content=document.getElementById(idname);
        				content.parentNode.removeChild(content);
    				}
    			}
            }	
    	}
	}
	etapecalcul=choixetape-1;
}

function affichestep() {// Validation variante methode par touche v ou hypothese manuelle (selection chiffre ou deselection chiffre)
		oTable = document.getElementById('Lulu');
		oTR = oTable.getElementsByTagName('tr');
        oTD = oTable.getElementsByTagName('td');
        etapecalcul = oTD.length;
        var nb = choixetape;
	// cree une ligne de tableau
        row = document.createElement("tr");
        cell = document.createElement("td");
		texte = document.createTextNode(nb+"-"+scenario.split("<br>")[0]);
		cell.appendChild(texte);
        row.appendChild(cell);
        oTable.appendChild(row);
    	row.setAttribute("id", "row"+nb);
    	cell.setAttribute("id", nb+"E");
		row.style.setProperty("background-color", "#FFFFFF");
		listescenarios[numerohypothese][choixetape]=scenario;
		if (etapeini<choixetape) {etapeini=choixetape}
	 cell.onclick = function(){
			  var tronq=this.id.split("E")[0]
			  var ch=parseInt(tronq);
			  clickmethode=false;
			  coloris=true;
			  var previous=choixetape
			  if (previous==(oTR.length-1)) {previous=previous-1}
			  etapeenjaune(parseInt(previous));// etape precedente			  
			  choixetape=ch;
			  etapeenblanc(ch);
			  var derniereetape=oTD.length;
			  selectstep(derniereetape);
     }
}

function ajoutstepreinit() {// ajoute scenario comme derniere etape etapecalcul
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
		choixetape=etapecalcul;
		var i=oTD.length;
				// cree une ligne de tableau
                row = document.createElement("tr");
                cell = document.createElement("td");
				texte = document.createTextNode(choixetape+"-"+scenario);
				cell.appendChild(texte);
                row.appendChild(cell);
    	 		oTable.appendChild(row);
				row.setAttribute("id", "row"+i);
				cell.setAttribute("id", i+"E");
		 		row.style.setProperty("background-color", "#FFFF80");
		etapeenblanc(etapecalcul);
		cell.onclick=function() {
			  var tronq=this.id.split("E")[0]
			  var ch=parseInt(tronq);
			  etapeenjaune(parseInt(choixetape));// etape precedente			  
			  choixetape=ch;
			  etapeenblanc(ch);
			  selectstep(choixetape);
     }
}

function ajoutstep() {// ajoute scenario comme derniere etape etapecalcul
		oTable = document.getElementById('Lulu');
        oTD = oTable.getElementsByTagName('td');
		choixetape=etapecalcul+1;
		var i=oTD.length;
				var insidebr=scenario.split("<br>");
				var inside="";
				for (var j=0; j<insidebr.length; j++) {
					inside=inside+insidebr[j]+". ";
				}
				// sauf le dernier .
				inside=inside.substring(0,inside.length-2);
				// cree une ligne de tableau
                row = document.createElement("tr");
                cell = document.createElement("td");
				texte = document.createTextNode(choixetape+"-"+inside);
				cell.appendChild(texte);
                row.appendChild(cell);
    	 		oTable.appendChild(row);
				row.setAttribute("id", "row"+i);
				cell.setAttribute("id", i+"E");
		 		row.style.setProperty("background-color", "#FFFF80");
		etapeenjaune(etapecalcul);
		if ((etapecalcul<oTD.length) && (casesblanches=="")) {etapeenblanc(etapecalcul+1)}
		cell.onclick=function() {
			  var tronq=this.id.split("E")[0]
			  var ch=parseInt(tronq);
			  etapeenjaune(parseInt(choixetape));// etape precedente			  
			  choixetape=ch;
			  etapeenblanc(ch);
			  finish="ajoutstep ";
			  selectstep(choixetape);		
     }
}

