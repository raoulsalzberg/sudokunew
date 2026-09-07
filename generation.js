function initgen() {
                	for (var i=0; i<10; i++) {nparnumero[i]=0}
					for (var i=0; i<M; i++) {contenudepart[i]=0; contenu[i]=contenuinitial}
					nbgen=0;
					origincrash=false;
					generecrash=false;
					nombrecrash=0;
					calculpur=false;
}

function generer() {
	if (archiveencours<4) {putmessage("Pas de génération de grille dans les 4 archives de base"); return}
	myForm.nomrevue.value="Grille générée";
	echec=0;
	echecunicite=0;
	grilleenjaune(grilleencours+1);
	do {
            		// Boucle de selection de cases terminee par un calcul
            		initgen();
					// Selection des cases affectees de la grille sans crash impossibilite
					var okb=0;
					do {
    					selectionnecase();
						okb=okb+1;
    					if (generecrash) {initgen()}
					}
            		while ((okb<2000) && (nbgen<MAXCH));// nbgen = nombre de chiffres selectionnes plafonnees a MAXCH
					if (okb==2000) {
						echec=NBRECHECS;
					} else {
        				echec+=1;
                		departverscontenu();
        				var rr=calculgen();
						if (crashunicite) {echecunicite+=1}
					}
    }
    while (!rr && (echec<NBRECHECS));// crash impossibilite ou cases blanches (ou trop d'hypotheses) ou defaut unicite ou maximum d'echecs atteint : recommencer cette boucle impossibilite ou echec unicite
	var mess="Grille générée : "+myForm.nomrevue.value+" après "+echec;
	var limite = false;
	if (echec==NBRECHECS) {
    	mess+=" échecs. Grille probablement fausse car limite du nombre d'échecs atteinte.";// Arreter le calcul
		limite=true;
	} else {
    	if (echec<2) {mess+=" échec et "+echecunicite} else {mess+=" échecs et "+echecunicite}
    	if (echecunicite<2) {mess+=" échec unicité"} else {mess+=" échecs unicité"}
	}
		putmessage(mess);
		departverscontenu();
    	choixetape=0;
		sauvegenere();// sauvegarde grille avec 60 echecs
	// Affichage grille et liste des grilles, effacement des etapes et des hypotheses
	departverscontenu();
	desaffiche();
	clearsteps();
	clearhypotheses();
	changemethods("Grilles");
	modegeneration=true;
}

function calculgen() {
    departverscontenu();
    etapecalcul=0;
    for (var i=0; i<M; i++) {contentmemory[0][0][i]=contenu[i]}
   	listecalcul="0";
	casesblanches="";
	origin=0;
	numerohypothese=0;
	numerr=0;
	numinter=0;
	origincrash=false;
	TraceH="";
	choixetape=0;
	etapeini=0;
	crashunicite=false;
    ormg=ORMreduit+1;
				var etapeunicite=100;
				var limitcalc=0;
				do {// Boucle du resultat
					do {// Boucle de calcul
						if (casesblanches.length>0) {// Traitement des cases blanches du cas previous : crash
							scenario=casesblanches;
							origincrash=true;
							if (numerr==0) {ajoutstep()}
							nextcasemoins();
						} else if (origin<ormg) {
							calc();
						} else {
								if (unicitebugcrash()  || uniciterectanglecrash()) {// Defaut unicite = crash
   										//sortiegrillefaussedefautunicite();
										return false;
								}
						}
						if (scenario != noeffect) {
if (origin=="U") {return false}
							if (origincrash) {// Crash par impossibilite ou cases blanches
									if (casesblanches=="") {// crash autre que cases blanches
												scenario=tradacrit(scenario+". Crash pour impossibilité.");    											
												resultateffectif=scenario;
												listescenarios[numerr][etapecalcul+1]=scenario;
									} else {
												if (etapecalcul==1) {etapecalcul=0}
									}
									return false;
							} else {
								nextcase();// Enregistrement du scenario
    							nbrefinis=0;
    							for (var i=0; i<M; i++) {
    									nbrefinis=nbrefinis+contenu[i].length;
    									if (contenu[i].length!=1) {nbrefinis=M+1}
    							}
    							if (nbrefinis==M) {// solution
    										scenario="Solution "
											nextcase();
                                			if (TraceH=="") {// Sortie definitive avec solution directe
												listecorr[numerr]=listecalcul;
        										scenario="Grille finale solution sans blocage";
												listescenarios[numerr][etapecalcul+1]=scenario;
        										scenhyp[numerr]=scenario;
												affichehypothese();
												return true;
        									}
											// solution possible avec des modifications
											return false;
    							}
							}
            			} else {
            				origin=origin+1;
            			}// scenario != noeffect
            		}// Calcul		
            		while (origin<=ormg);
					// Creation d'une Hypothese aleatoire
					if (TraceH.length>1) {return false}
					casesblanches="";
					hypothese();
					scenario=tradacrit(scenario);
					nextcase();// Enregistrement de l'hypothese
					limitcalc=limitcalc+1
				}// Resultat
				while (limitcalc<NBHYP);// arret previous si solution ou plus d Hypothese, ou arret si trop de calculs
            	putmessage("Calcul trop long");
}

function selectionnecase() {
		var contenuinter=new Array(M);
		var re = /\d/g;
		var uku=0;
		do {
    		var k=Math.floor(Math.random() * (M-nbgen-1));// case choisie aleatoirement parmi M-nbgen-1
    		var j=-1;
			for (var i=0; i<M; i++) {
				if (contenudepart[i]==0) {
					j=j+1;
					if (j==k) {var cc=i; break}
				}	
			}
    		var contccex=contenu[cc].toString();
			uku=uku+1;
    	}
    	while ((uku<50) && ((contccex.length==1) || maxparzone(cc)));// selection si pas deja faite ni vue et si aucune zone sudoku saturee
		// Selection chiffre dans la case
		var pr=Math.floor(Math.random() * (contccex.length)); // choisir un chiffre aleatoire possible
		var cc09 = contccex.match(re);
		var num=cc09[pr];
		if(nparnumero[num]<NMAXNUM) {// Pas plus de 4 fois le meme chiffre dans la grille
		 	for (var i=0; i<M; i++) {contenuinter[i]=contenu[i]}
			contenudepart[cc]=num;
			contenu[cc]=num;
			elim(cc);
			var xxx=effetcrash();
    		if (generecrash || xxx) {// Crash : chiffre manquant dans une zone, ou doublon, ou n cases avec (n-1) chiffres dans la meme zone sudoku
				contenudepart[cc]=0;// Deselection
				for (var i=0; i<M; i++) {contenu[i]=contenuinter[i]}
    			// Reduction de la case cc sans ce chiffre num
				var reduccc=contccex.match(re);
    			var b="";
           		for (var j=0; j<reduccc.length; j++) {
           				if (num!=reduccc[j]) {b=b+reduccc[j]}
           		}
				contenu[cc]=b;
    			nbgen=nbgen+1;// Etape valide avec suppression de chiffre dans une case (comme click droit)
				// Verification que des cases vues de cc contiennent num
				nombrecrash=nombrecrash+1;
				if (nombrecrash<3) {generecrash=false} else {generecrash=true; origincrash=true}
				// Si crash en cascade, eliminer selection previous
        	} else {// Pas de crash : valider contenudepart, incrementer nparnumero et incrementer le compteur de case,
    			nparnumero[num]+=1;
    			nbgen+=1;// validation (comme click gauche)
    		}
		}
}

function verifcc(caseref, chiffre) {
		 var hh=parseInt(caseref/9);
		 var vv=caseref-9*hh;
		 var ii=carre[caseref]-1;
		 var casevue="";
		 for (var lc=0; lc<3; lc++) {
		 	 for (var j=0; j<9; j++) {
					switch (lc) {
	  					case 0: // Ligne hh
							var h=j+9*hh;
							break;
	  					case 1: // Colonne vv
							var h=vv+9*j;
							break;
	  					case 2: // Carre ii
							var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii; // Position j dans le carre ii
							break;
						default:
							break;
					}// switch
		 	 		if (h!=caseref) {
					   var x0=contenu[h].split(chiffre);
					   var x1=x0[0];
					   if (x1.length<contenu[h].length) {casevue=casevue+colPlace[h]+" "}
					}
			 }// j		 	
		 }// lc
		 return casevue;
}

function effetcrash() {
        scenario=noeffect;
		doublecrash();// doublon ou chiffre manquant
		return (scenario!=noeffect);		
}

function departverscontenu() {
	for (var i=0; i<M; i++) {contenu[i]=contenuinitial}
    for (var i=0; i<M; i++) {
    		if (contenudepart[i]!=0) {
    		   contenu[i]=contenudepart[i];
			   elim(i);
    		}				
	}
    etapecalcul=0;
}

function sauvegenere() {// Sauvegarde avec copie en fin de liste
	if (archiveencours>3) {
		departverscontenu();
		var listecontenu="";
		for (var i=0; i<M; i++) {
    		listecontenu=listecontenu+contenu[i];
    		if(i<(M-1)) {listecontenu=listecontenu+sep}
		}
			// sauvegarde avec copie en fin de liste
    		contenusgrilles.push(listecontenu);
    		nomsgrilles.push(myForm.nomrevue.value);
			grilleenjaune(grilleencours+1);
			grilleencours=nomsgrilles.length-1;
			grilleenblanc(nomsgrilles.length-1);
		majgrille();// enregistrement en memoire
		cleargrids();
		listegrilles();
		etapecalcul=0;
		choixetape=0;
		etapeini=0;
		departverscontenu();
		desaffiche();
		clearsteps();
		changemethods("Grilles");
	}
}


function sauvegenereplus() {// Sauvegarde avec remplacement
	if (archiveencours>3) {
		departverscontenu();
		var listecontenu="";
		for (var i=0; i<M; i++) {
    		listecontenu=listecontenu+contenu[i];
    		if(i<(M-1)) {listecontenu=listecontenu+sep}
		}
			// sauvegarde avec remplacement
			nomsgrilles[grilleencours]=myForm.nomrevue.value;
			contenusgrilles[grilleencours]=listecontenu;
			//if (nomsgrilles.length!=grilleencours) {grilleenjaune(nomsgrilles.length)}
		majgrille();// enregistrement en memoire
			grilleenblanc(grilleencours+1);
			grilleenjaune(nomsgrilles.length);
		cleargrids();
		listegrilles();
		etapecalcul=0;
		choixetape=0;
		etapeini=0;
		departverscontenu();
		desaffiche();
		clearsteps();
		changemethods("Grilles");
	}
}


function nextcasemoins() {// sans aactualisation listecalcul
    etapecalcul=etapecalcul+1;
    listescenarios[numerr][etapecalcul]=scenario;
	contentmemory[numerr][etapecalcul]=new Array(M);//Reinits Array
	for (var i=0; i<M; i++) {contentmemory[numerr][etapecalcul][i]=contenu[i]}
    origin=0;
}

function maxparzone(case1) {
		var hh=parseInt(case1/9);
		var vv=case1-9*hh;
		var cc=carre[case1]-1;
	for (var lc=0; lc<3; lc++) {
		var n=0;
		for (var i=0; i<9; i++) {
			switch(lc) {
	  					case 0: // Ligne i
							var h=i+9*hh;// position i dans la ligne hh
							break;
	  					case 1: // Colonne i
							var h=vv+9*i;// position i dans la colonne vv
							break;
	  					case 2: // Carre i
							var h=i+6*parseInt(i/3)+18*parseInt(cc/3)+3*cc;// position i dans le bloc cc
							break;
						default:
							break;
			}
			if (contenu[h].length==1) {n=n+1}
			if (n==MAXCHIFFRESPARZONE) {return true}// y compris case1
		}	
	}
	return false;
}

function niveaudedifficultegrille() {// Niveau de difficulte affiche dans le titre
	var ajj=" (niveau de difficulté ";
	switch(numerr) {
		case 0:
			var calculpre=listecalcul.split(sep);
			var calcul=new Array();
			for (var i=0; i<(calculpre.length-1); i++) {calcul[i]=calculpre[i]}
			var maxi=calcul.reduce(
				function(a,b) {return Math.max(a,b)}
				);
			switch(maxi) {
				case 1:
				case 2:
				case 3:
					ajj=ajj+"1)";
					break;
				case 4:
				case 5:
					ajj=ajj+"2)";
					break;
				case 6:
				case 7:
					ajj=ajj+"3)";
					break;
				case 8:
				case 9:
					ajj=ajj+"4)";
					break;
				case 10:
				case 11:
					ajj=ajj+"5)";
					break;
				case 12:
				case 13:
					ajj=ajj+"6)";
					break;
				case 14:
				case 15:
					ajj=ajj+"7)";
					break;
				case 16:
				case 17:
					ajj=ajj+"8)";
					break;
				case 18:
				case 19:
					ajj=ajj+"9)";
					break;
				case 20:
				case 21:
				case 22:
				case 23:
					ajj=ajj+"10)";
					break;
				case 24:
				case 25:
				case 26:
				case 27:
					ajj=ajj+"11)";
					break;
				case 28:
				case 29:
				case 30:
				case 31:
					ajj=ajj+"12)";
					break;
				default:
					ajj=ajj+"non répertorié sans hypothèse)";
					break;
			}
			break;
		case 1:
			ajj=ajj+"13)";
			break;
		case 2:
			ajj=ajj+"14)";
			break;
		case 3:
			ajj=ajj+"15)";
			break;
		case 4:
			ajj=ajj+"16)";
			break;
		case 5:
		case 6:
			ajj=ajj+"17)";
			break;
		case 7:
		case 8:
			ajj=ajj+"18)";
			break;
		case 9:
		case 10:
		case 11:
		case 12:
			ajj=ajj+"19)";
			break;
		case 13:
		case 14:
		case 15:
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
		case 21:
		case 22:
		case 23:
		case 24:
		case 25:
		case 26:
		case 27:
		case 28:
		case 29:
		case 30:
			ajj=ajj+"20)";
			break;
		default:
			ajj=ajj+"21)";
			break;
	}	
	myForm.nomrevue.value=myForm.nomrevue.value+ajj;
}

function casessuperflues() {
	var titre=myForm.nomrevue.value;
	myForm.nomrevue.value=myForm.nomrevue.value.split(" (")[0];
    etapeini=0;
    choixetape=0;
    etapecalcul=0;
    TraceH="";
    flagsansgen=false;
    grilleenjaune(grilleencours+1);
    // Boucle de calcul avec chaque case separement et successivement
    var resultat=" cases superflues éliminées : ";
    var nb=0;
	for (var i=0; i<M; i++) {
    	if (contenudepart[i]!=0) {
    		var ex=contenudepart[i];
    		contenudepart[i]=0;
    		departverscontenu();
    		var ey=contenu[i].length;
    		etapeini=0;
    		choixetape=0;
    		etapecalcul=0;
    		TraceH="";
			var rr=calculreduit();
			stop;
    		if (!rr) {
    			if (ey>1) {contenudepart[i]=ex}// sauf case retablie, c'est-a-dire retrouvee apres departverscontenu sans
    		} else {
    			nb+=1;
    			resultat+=" "+colPlace[i]+"="+ex;
    		}
    	}
    }
    departverscontenu();
    listecalcul="0";
    var recalcul=calculreduit();
	if (nb==0) {
    	resultat= " Pas de case superflue éliminée";
    	etapecalcul=0;
    	etapeini=0;
		myForm.nomrevue.value=titre;
		niveaudedifficultegrille();// niveau de difficulte dans le titre
		sauvegenere();// sauvegarde grille avec son titre ou la mention grille fausse
    } else {
       	if (nb==1) {resultat=" 1 case superflue éliminée : "+resultat.split(": ")[1]}
       	if (nb>1) {resultat=nb+" "+resultat}
		departverscontenu();
		affiche();
        var rr=calculer();// Recalcul (3eme) apres elimination cases superflues
		if (!rr) {// grille fausse
    		myForm.nomrevue.value=myForm.nomrevue.value+" (Grille fausse à corriger)";
    	} else {// grille correcte sauvegardée avec son niveau de difficulte
			niveaudedifficultegrille();// niveau de difficulte dans le titre
		}
		sauvegenere();// sauvegarde grille avec son titre ou la mention grille fausse
    }
	return resultat;
}
