function reinit() {
	caseselect=-1;// Hypothese fixe en commencant par la case A1
	numerohypothese=0;
	methodeenjaune(origin+1);	
	clickmethode=false;
	modeexecute=false;
	scenhyp=[];
	casesblanches="";
	choixetape=etapeini;
		 defautunicite=false;
		 defautunicitebugplusun=false;
		 enleverougeetchiffre();
		 desaffiche();
    	numtest=0;
		for (var i=0; i<N; i++) { 
    		listecorr[i]="";
			scenhyp[i]="";
    	}
		TraceH="";
    	numerr=0;
		numinter=-1;
	if ((etapecalcul==0) && (choixetape<1)) {
		etapeini=0;
    	listescenarios[numerr][0]="Grille initiale";
		listenm[numerr][0]="010";
    	listecalcul="0";
	} else {
		enleverougeetchiffre();
		etapecalcul=etapeini;
	}
		listecorr[numerr]=listecalcul;
		for (var i=0; i<M; i++) {contentmemory[numerr][etapecalcul][i]=contenu[i]}
	origin=0;
	coloris=false;
	arret=false;
}

function calculer() {// Calcul par ordinateur
	for (var i=0; i<M; i++) {if (contenu[i].length>1) {break}}
	if (i==M) {putmessage("<u>Attention</u> : Grille solution"); return}
	ormg=ORM;
	calculpur=true;
	var result=calculersuite();
	reamorceaide=false;
	if (numinter!=(-1)) {numerohypothese=numinter; choixetape=listecorr[numerohypothese].split(sep).length-1}
	recalcul=false;
	return result;
}

function calculreduit() {
	for (var i=0; i<M; i++) {if (contenu[i].length>1) {break}}
	if (i==M) {putmessage("<u>Attention</u> : Grille solution"); return}
	ormg=ORMreduit+1;
	calculpur=true;
	var result=calculersuite();
	reamorceaide=false;
	if (numinter!=(-1)) {numerohypothese=numinter; choixetape=listecorr[numerohypothese].split(sep).length-1}
	recalcul=false;
	return result;
}

function double() {// verification case a un chiffre sans doublon
	for (var i0=0; i0<M; i0++) {
			var numr=contenu[i0];
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
					var numhr=contenu[h];
					if ((h!=i0) && (numhr==numr)) {return false}	// Doublon --> Crash				
				}
			}
	}
	return true;
}

function calculersuite() {
coloris=false;
if (clickmethode) {putmessage(tradacrit("<u><b>Attention</b></u> : Calcul interdit après la sélection d'une méthode; sélectionner la grille à calculer au préalable.")); return false}
if (modegeneration) {putmessage(tradacrit("<u><b>Attention</b></u> : Calcul interdit après la génération d'une grille; sélectionner la grille à calculer au préalable.")); return false}
numinter=-1; var limitcalc=0;
do {// Boucle du resultat
	do {// Boucle de calcul
		if (origin==(ormg-1)) {origin=ORM-1} // crash unicite evite
		if (etapecalcul==1) {TraceH=""}
		calc();
		if (scenario != noeffect) {
			if (origincrash || crashunicite) {// Crash par impossibilite ou cases blanches ou evitement non corrobore
				// origin=0	 : crash avec suite			
				scenario+=tradacrit(". Crash classique ou défaut unicité non corroboré.");
				listescenarios[numerr][etapecalcul+1]=scenario;
				listenm[numerr][etapecalcul+1]=elaborenm();
				if (!reconstituehypothese()) {// vers epuisement hypotheses
					// numinter=-1 :  pas de solution
					// numinter : solution unique
					if (numinter!=(-1)) {scenario+=". Grille correcte."} else {scenario+=". Grille fausse soit sans solution, soit avec plusieurs solutions."}
					trisortie();
//					if (crashunicite) {sortiegrillefaussedefautunicite()}
					return (numinter!=(-1));
				}
			} else {// traitement solution
				nextcase();// Enregistrement du scenario
				enleverougeetchiffre();
				nbrefinis=0;
				for (var i=0; i<M; i++) {
					nbrefinis+=contenu[i].length;
					if (contenu[i].lengt>1) {nbrefinis=M+1}
				}
				if ((nbrefinis==M) && double()) {// solution
					for (var i=0; i<M; i++) {contenuoptimisation[i]=contenu[i]}
					scenario="Grille finale Solution  *** ";
if ((numinter != (-1)) || (listecalcul.split("U")[0].length<listecalcul.length)) {// Defaut unicité pour 2ème solution : arrêt
						sortiegrillefaussedefautunicite();
						return false;
					}
					if (!reconstituehypothese()) {// Epuisement hypotheses sur premiere solution = grille correcte
						scenario+=". Grille correcte.";
						numinter=numerr;
						listescenarios[numerr][etapecalcul+1]=scenario;
						listenm[numerr][etapecalcul+1]=elaborenm();
						trisortie();	
						messagefincalcul=scenario;
						etapefincalcul=etapecalcul+1;
						return true;
					}
					// solution trouvee sans epuisement hypothese: continuer en sauvegardant sur numinter			
					numinter=numerr-1;
					putmessage("Solution trouvée en "+numinter+" continuation pour épuiser les hypothèses");
				}// nbrefinis=M
			}// origincrash
		} else {
			origin+=1;
		}// scenario != noeffect
	}// Calcul		
	while ((origin<=ormg) || (origin==ORM));
	hypothese();
	nextcase();// Enregistrement de l'hypothese
	limitcalc+=1
}// Resultat
while (limitcalc<NBHYP);// arret previous si solution ou plus d Hypothese, ou arret si trop de calculs
putmessage("<u><b>Attention</b></u> : calcul trop long");
}


function sortiegrillefaussedefautunicite() {
	scenario+=tradacrit("<br><br>Grille fausse par défaut d'unicité");
    if (TraceH!="") {scenario+=tradacrit(" avec signature hypothèse ")+TraceH+". "} else {scenario+=". "}
		numinter=numerr;
		scenhyp[numerr]=scenario;
		if (numinter>0) {scenario+=" en modification "+numinter+". "}
	origin=0;
	nextcase();
	listecorr[numerr]=listecalcul;
	resultateffectif=scenario;
	if (numinter>-1) {affichehypothese()}
	listescenarios[numerr][etapecalcul]=scenario;
	listenm[numerr][etapecalcul]=elaborenm();
	elaborevariantecrashunicite();// mise au vert
}


function nextcase() {
    etapecalcul+=1;
    listecalcul=listecalcul+sep+origin;
	listescenarios[numerr][etapecalcul]=scenario;
	listenm[numerr][etapecalcul]=elaborenm();
	contentmemory[numerr][etapecalcul]=new Array(M);//Reinits Array
	for (var i=0; i<M; i++) {contentmemory[numerr][etapecalcul][i]=contenu[i]}
	origin=0;
}


function trisortie() {// Saturation des Hypotheses ou crash unicite--> sortie definitive
		contenuok=[];
		if (numinter>(-1)) {// Solution trouvee avant ce crash avec saturation Hypotheses pour numerr=numinter
			// organiser une 2eme passe, en reduisant le nombre de modifications avec des Hypotheses optimisees
			if ((numerr>0) && REDUITHYPOTHESE) {
				calculerfin();
			} else {
    			if (numerr>0) {// Solution en modification 0
        			resultateffectif=" Grille correcte (solution en modification "+numinter+" sur "+numerr+"). ";
					for (var i=0; i<M; i++) {contenuok[i]=contenuoptimisation[i]}
    			} else {
					resultateffectif=" (Grille correcte)";
					for (var i=0; i<M; i++) {contenuok[i]=contenu[i]}
				}
				affichehypothese();
			} 
		} else {// Aucune solution trouvee avant ce crash : gestion des hypotheses d'une grille impossible (pas de solution)
			if (numerr==(NBMODIF+1)) {numerr=NBMODIF}
    		resultateffectif=". Grille fausse (aucune solution). ";
			affichehypothese();
		}
}


function affichehypothese() {
	if (flagsansgen) {
		var finliste=listecalcul.substring(listecalcul.length-2, listecalcul.length);
		crashtext[numerr]=" "+scenario;
    	numerohypothese=numinter;// selection de la solution si elle existe
		// Ajouter l'indication d'erreur a tous les scenhyp
		if (numerr>0) {for (var i=0; i<numerr; i++) {scenhyp[i]+=resultateffectif}} else {scenhyp[numerr]=etapecalcul+"- "+scenario}
		clearhypotheses();
		if (numerr>0) {listehypotheses()}
		traitementhypothese();
		changemethods("Etapes");		
	} else {
		changemethods("Grilles");		
	}
}

function calculerfin() {
		etapecalcul=0;
		numerr=0;
		origin=0;
		numinter=-1;
		numerohypothese=0;
		choixetape=0;
    	listecalcul="0";
    	for (var i=0; i<M; i++) {contenu[i]=contenusaisie[i]}
		TraceH="";
		reinit();
		do {// Boucle du resultat
				do {// Boucle de calcul
						calc();
						if (scenario != noeffect) {
							nextcase();
							nbrefinis=0;
								for (var i=0; i<M; i++) {
									nbrefinis=nbrefinis+contenu[i].length;
									if (contenu[i].length==0) {nbrefinis=M+1}
								}
							if (nbrefinis==M) {// solution
								affiche();
                    			scenario="Grille finale solution ** ";
                    			if (TraceH!="") {scenario+=" avec signature "+TraceH} 
								crashtext[numerr]=scenario;
								nextcase();
								clearsteps();// Reinitilisation des etapes
								listecorr[numerohypothese]=listecalcul;
                    			listesteps();// Affichage des etapes
                    			changemethods("Etapes");
								origin="Solution";
								listenm[numerohypothese][etapecalcul]="Solution";
								putmessage(scenario+"<br>");
								return true;// Fin ok
        					}// nbrefinis=M
            			} else {
            				origin=origin+1;
            			}// scenario != noeffect
            	}// Boucle de calcul		
            	while (origin<ormg);
				// Creation d'une hypothese optimisee, en choisissant la case la plus longue, avec son resultat
				if (!choixoptimum()) {// Resultat final apres epuisement des hypotheses
						listescenarios[numerohypothese][etapecalcul]="Optimisation "+listescenarios[numerohypothese][etapecalcul];
						nextcase();
						var messagefinal=tradacrit("Grille finale étape ")+(etapecalcul+1);
						if (TraceH!="") {messagefinal=messagefinal+tradacrit(" avec signature hypothèse ")+TraceH}
                    	crashtext[numerr]=messagefinal;
						scenario=messagefinal;
						clearsteps();// Reinitilisation des etapes
						listecorr[numerohypothese]=listecalcul;
                    	listesteps();// Affichage des etapes
                    	changemethods("Etapes");
				}
				nextcase();
		}// Resultat
		while (etapecalcul<(2*M))// Pour poser une butee, inutile car la solution arrivera avant
		putmessage("?????"); 
}
