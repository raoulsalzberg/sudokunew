function calc() {
	scenario=noeffect;
	nmet=0;
	origincrash=false;
	crashunicite=false;
	switch (parseInt(origin)) {
	  case 1: //Elimination globale des petits chiffres de solitaires ou defaut d'unicite (2 cas)
		eliminationglobale();
		break;
	  case 2: // solo isole = solitaire ?
		soloisole();
		break;
	  case 3: //jumeaux
	  	calculjumeaux();
	  	break;
	  case 4: // Chiffre en duo dans un carre, sur une ligne ou une colonne
	  	numeroduo();
		break;
	  case 5: // triples
	  	calcultriples();
	  	break;
	  case 6: // quadruples
		calculquadruples();
		break;
	  case 7: // jumeaux isoles
	  	jumeauxisoles();
		break; 
	  case 8: // triples isoles
	  	triplesisoles();
		break; 
	  case 9: // Gratte-ciel
		gratteciel();
		break;
	  case 10: // Boucle paire ou impaire
		boucle();
		break;
	  case 16: // Turbot fish (X-chain) 12
		turbotfish();
		break;
	  case 12: // L'arme et la soie
		suedecoq();
		break;
	  case 13: // L'aile de l'aigle (W-Wing)
		lailedelaigle();
		break;
	  case 14: // Le rectangle vide
	  	rectanglevide();
		break;
	  case 15: // cerf-volant
	  	cerfvolant();
		break;
	  case 11: // L'attaque du cobra
		lattaqueducobra();
		break;
	  case 17:// Color trap (X-chain)
		colortrap();
		break;
	  case 18: // L'aigle et sa proie (XY-Wing)
	  	laigleetsaproie();
		break;
	  case 19: // Swordfish (La dynamique de l'espadon)
		swordfish();
		break;
	  case 20:  // Forteresse maxilien
		forteressemaxilien();
		break;
	  case 21: // X'wing
		xwing();
		break;
	  case 22: // La griffe du tigre
		lagriffedutigre();
		break;
	  case 23: // L'approche du tigre
		lapprochedutigre();
		break;
	  case 24: // Death Blossom
		deathblossom();
		break;
	  case 25: // ALS-XY-WING
		alsxywing();
		break;
	  case 26: // Jellyfish
		jellyfish();
		break;
	  case 27: // Squirmbag
		squirmbag();
		break;
	  case 28: // 3D Medusa
		if (calculpur) {f3DMedusa()}
		break;
	  case 29: // Nishio
		nishio();
		break;
	  case 30: // Y-wing
		ywing();
		break;
	  case 31: // Combinaison ALS + autre methode
		if (calculpur && AUTORISEALS) {combinaison()}
		break;
	  case (ORM-1): // 32 : pour eviter un defaut d'unicite carre (variete 0 a 19)		
		if (calculpur) {unicitecarree()}
		break;
	  case ORM: // 33 : Test crash par defaut d'unicite, soit carree soit bug+1 (variete 1 et 0)
		unicitecrash();
		break;
	  case 0: // Crash pour impossibilite (4 cas : variete 0 a 3) 
		doublecrash();// Doublon (variete 0) ou chiffre manquant dans une zone sudoku (variete 1) ou 2 seuls chiffres dans une case (variete 3)
		if (!origincrash) {nplusunecasespournchiffres()}// Pas assez de chiffres pour le nombre de cases (variete 2)
		if (!origincrash) {testcasesblanches()}// cases blanches (variete 4)
		if (!origincrash) {origincrash=uniciterectanglecrash()}
		break;
	  default:
		break;
	}
}

function choixoptimum() {
	// Chercher la case la plus longue et lui affecter le resultat final ok
	var longmax=1;
	var num=0;
	var casesudoku=M;
	for (var i=0; i<M; i++) {
		var ct=contenu[i].length;
		if (ct>longmax) {longmax=ct; casesudoku=i; num=contenuoptimisation[i]}
	}
	if (casesudoku==M) {return false}
        	origin="K"+casesudoku+num;
        	TraceH+="K";
        	contenu[casesudoku]=num; // Hypothese
			wscen=tradacrit("Hypothèse ");
			if (CASCADEIN) {
				var newcol=false;
    			if (coloris) {var newcol=true}
    			coloris=true;
    			testsolution=false;
				elim(casesudoku);// Elimination de ce chiffre dans les cases ou il est vu
				if (!newcol) {
        			 enleverougeetchiffre();
        			 coloris=false;
    			}
			} else {
				elim(casesudoku);// Elimination de ce chiffre dans les cases ou il est vu
			}
			return true;
}

