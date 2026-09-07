function repartition(ir) {
	switch(ir) {
		case 0:// calcul
			if (!modecreation) {
    			if (recalcul) {
    				putmessage("Lancement du calcul automatique complet"); 
        			flagsansgen=true;
        			iter1=0;
					iter2=0;
					calculer();
				} else {
					putmessage("<b><u>Attention</u></b> : calcul interdit après un calcul ou une génération ; sélectionner la grille à calculer au préalable");
				}
			} else {
				putmessage("<b><u>Attention</u></b> : calcul interdit en cours de saisie de nouvelle grille ou de modification de grille : sauvegarder la grille avant de la calculer");
			}
			break;
		case 1:// calcul reduit
			if (!modecreation) {
    			if (recalcul) {
        			putmessage("Lancement du calcul automatique réduit"); 
        			flagsansgen=true;
        			calculreduit();
				} else {
					putmessage("<b><u>Attention</u></b> : Calcul réduit interdit après un calcul réduit ou une génération ; sélectionner la grille à calculer au préalable");
				}
			} else {
				putmessage("<b><u>Attention</u></b> : calcul interdit en cours de saisie de nouvelle grille : sauvegarder la grille avant de la calculer");
			}
			break;
		case 2:// generation
			recalcul=false;
			reamorceaide=true;
			putmessage("Génération de grille");
			generer();
			desaffiche();
			etapecalcul=0;
			break;
		case 5:// inversion de la presentation des chiffres dans les cases
			basculef();
			inversionchiffres=!inversionchiffres;
			break;
		case 8:
			test();
			break;
		case 9:// Annule derniere operation manuelle
    		annulation();
			recalcul=true;
			etapecalcul=choixetape;
			break;
		case 10:// Creation de grille
			modecreation=true;
			recalcul=true;
			reamorceaide=true;
			crashmanuel=false;
			putmessage("Création de grille");
			newgrid();
			etapecalcul=0;
			choixetape=0;
			for (var i=0; i<M; i++) {contenureserve[choixetape][i]=contenu[i]}// Initialisation sauvegarde contenu
			break;
		case 11:// Sauvegarde grille
			modecreation=false;
			recalcul=true;
			reamorceaide=true;
			enleverougeetchiffre();
			recuperecontenu();
			return;
			desaffiche();
			listegrille();
			break;
		case 12:// Effacement grille
			effacegrille();
			changemethods("Grilles");
			break;
		case 13:// Sauvegarde lien grille et options
			recalcul=true;
			sortie();
			break;
		case 14:// Selection aleatoire de grille dans une des 4 archives de base
			choixetape=0;
			etapecalcul=0;
			clearsteps();
			chargealeatoire();
			break;
		default:
			break;
	}
}

function sortie() {
	for (var i=0; i<archivesgrilles.length; i++) {if (archivesgrilles[i]==clef) {break}}
	if (i==archivesgrilles.length) {
		putmessage("<u><b>Attention</b></u> : votre archive n'existe pas ou n'est pas référencée");
	} else {
		reamorceaide=true;
		enregistrementgrille();
		enregistrementconfiguration();
		putmessage("Enregistrement effectué de la grille dans son archive ainsi que de la configuration de filtres (pour calcul et génération) et d'options.");
	}
}

