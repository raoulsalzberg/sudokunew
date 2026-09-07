function chargementarchive() {// recuperer la clef dans le tableau archivesgrilles (avec la cle clefarchive) et chargement des grilles de cette clef
	if(typeof localStorage!='undefined' && JSON) {
		if (localStorage.getItem(clefarchive)==null) {// Cle inexistante : charger les archives de base
			archivesgrilles=[];
			archivesgrilles[0] = archivesgrillesdebase;		
			archivesgrilles[1] =  archivesgrillesautres;
			archivesgrilles[2] =  archivesgrillesnext;
			archivesgrilles[3] =  archivesgrillesAIC;
			clef=archivesgrilles[0];
			chargegrillesdebase();
			clef=archivesgrilles[1];
			chargegrillesautres();
			clef=archivesgrilles[2];
			chargegrillesnext();
			clef=archivesgrilles[3];
			chargegrillesAIC();
			archiveencours=0;// selectionner la premiere archive
            var donnees={	
            		indice:archiveencours,
    				grilles: archivesgrilles
            };
        	var val = JSON.stringify(donnees);
			localStorage.setItem(clefarchive, val);
		} else {// charger derniere grille en webstorage : superflu
			var valeur = JSON.parse(localStorage.getItem(clefarchive));// clefarchive existe en dur
    		archiveencours=valeur.indice;
			archivesgrilles= valeur.grilles;
		}
		archiveenblanc(archiveencours);
	}

	clef=archivesgrilles[archiveencours];
	myForm.nomrevuearchive.value=clef;
	listearchives();
	// Chargement avec la clef, creee par le tableau archivesgrilles avec l'indice archiveencours, des grilles stockees avec cette clef : indice des grilles en cours, noms des grilles et contenus de ces grilles
	// et solutions et niveaux de difficulte
	chargementgrille();
	listegrilles();

}

function chargealeatoire() {
				messageglobal="";
	var alea=getRandomInt(2);
	switch(autreniveau) {
		case 1:
			archiveencours=2;
			break;
		case 2:
			archiveencours=3;
			break;
		case 3:
		case 4:
			archiveencours=alea;
			break;
		case 5:
//			archiveencours=3;
			archiveencours=alea*3;
			break;
		default:
			break;
	}
	var prearchive=archiveencours;
	nomsgrilles=[];
	clef=archivesgrilles[archiveencours];
	switch(archiveencours) {
		case 0:
			for (var i=0; i<nomsgrillesdebase.length; i++) {nomsgrilles[i]=nomsgrillesdebase[i]}
			for (var i=0; i<contenusgrillesdebase.length; i++) {contenusgrilles[i]=contenusgrillesdebase[i]}
			for (var i=0; i<niveauxgrillesdebase.length; i++) {niveauxgrilles[i]=niveauxgrillesdebase[i]}
			for (var i=0; i<solutionsgrillesdebase.length; i++) {solutionsgrilles[i]=solutionsgrillesdebase[i]}
			break;
		case 1:
			for (var i=0; i<nomsgrillesautres.length; i++) {nomsgrilles[i]=nomsgrillesautres[i]}
			for (var i=0; i<contenusgrillesautres.length; i++) {contenusgrilles[i]=contenusgrillesautres[i]}
			for (var i=0; i<niveauxgrillesautres.length; i++) {niveauxgrilles[i]=niveauxgrillesautres[i]}
			for (var i=0; i<solutionsgrillesautres.length; i++) {solutionsgrilles[i]=solutionsgrillesautres[i]}
			break;
		case 2:
			for (var i=0; i<nomsgrillesnext.length; i++) {nomsgrilles[i]=nomsgrillesnext[i]}
			for (var i=0; i<contenusgrillesnext.length; i++) {contenusgrilles[i]=contenusgrillesnext[i]}
			for (var i=0; i<niveauxgrillesnext.length; i++) {niveauxgrilles[i]=niveauxgrillesnext[i]}
			for (var i=0; i<solutionsgrillesnext.length; i++) {solutionsgrilles[i]=solutionsgrillesnext[i]}
			break;
		case 3:
			for (var i=0; i<nomsgrillesAIC.length; i++) {nomsgrilles[i]=nomsgrillesAIC[i]}
			for (var i=0; i<contenusgrillesAIC.length; i++) {contenusgrilles[i]=contenusgrillesAIC[i]}
			for (var i=0; i<niveauxgrillesAIC.length; i++) {niveauxgrilles[i]=niveauxgrillesAIC[i]}
			for (var i=0; i<solutionsgrillesAIC.length; i++) {solutionsgrilles[i]=solutionsgrillesAIC[i]}
			break;
		default:
			break;
	}
	var nbgrilles=nomsgrilles.length;
	var nbgrillesreduit=0;
	var tabgrillesreduit=new Array();
	for (var i=0; i<nbgrilles; i++) {
		if (niveauxgrilles[i]==autreniveau) {tabgrillesreduit[nbgrillesreduit]=nomsgrilles[i]; nbgrillesreduit+=1}
	}
	var gril=getRandomInt(nbgrillesreduit);// nbgrillesreduit grilles avec le bon niveau de difficulte, choix aleatoire de grillechoisie
	var nomgrilletrouve=tabgrillesreduit[gril];
	// chercher le numero de cette grille dans le tableau nomsgrilles
	for (var i=0; i<nbgrilles; i++) {
		if (nomgrilletrouve==nomsgrilles[i]) {grilleencours=i; break}
	}
	AIDESAISIEMANUELLE=testcheck();
	// Charger cette grille
	chargergrille();
	changemethods("Etapes");
	switch(archiveencours) {
		case 0:
			for (var i=0; i<solutionsgrillesdebase[grilleencours].length; i++) {contenuok[i]=solutionsgrillesdebase[grilleencours][i]}
			break;
		case 1:
			for (var i=0; i<solutionsgrillesautres[grilleencours].length; i++) {contenuok[i]=solutionsgrillesautres[grilleencours][i]}
			break;
		case 2:
			for (var i=0; i<solutionsgrillesnext[grilleencours].length; i++) {contenuok[i]=solutionsgrillesnext[grilleencours][i]}
			break;
		case 3:
			for (var i=0; i<solutionsgrillesAIC[grilleencours].length; i++) {contenuok[i]=solutionsgrillesAIC[grilleencours][i]}
			break;
		default:
			break;
	}
	myForm.nomrevuearchive.value=clef;
	listearchives();
	choixetape=0;
	putmessage(tradacrit("Grille chargée")+" : <u>"+nomgrilletrouve+"</u> dans archive : <u>"+clef+"</u>"+messageglobal);
}

function getRandomInt(max) {
	return Math.floor(Math.random()*max);
}

function chargearchive() {// chargement des grilles dans archive clef
			chargementgrille();// grilles dans webstorage avec grille en cours previous
			clearsteps();
			cleargrids();
			clearhypotheses();
			clearvariantes() ;
			listegrilles();// liste des grilles dans archive clef
			var tit=nomsgrilles[grilleencours];// nom grille previous
			desaffiche();// Diagramme de cette grille
			myForm.nomrevue.value=tit;// affichage du nom de cette grille
			changemethods("Grilles");
//			putmessage("Grille <u>"+tit+"</u> dans archive <u>"+clef+"</u>");
}

function validerlistearchives() {
	var noma=myForm.nomrevuearchive.value;
	for (var i=0; i<archivesgrilles.length; i++) {
		if (archivesgrilles[i]==noma) {archiveencours=i}
	}
	listearchives();
	putmessage("Chargement archives");
}

function listearchives() {// Pour affichage des archives
	cleararchives();// Effacement de la liste affichee des archives
	cleargrids();
	// Affichage de la liste des clefs ,dans le tableau archivesgrilles
	oTable = document.getElementById('Lxlx');
        oTR = oTable.getElementsByTagName('tr');
        oTD = oTable.getElementsByTagName('td');
	// Creation de 1 ligne blanche
	for (var i=0; i<1; i++) {
         row = document.createElement("tr");// Avec attribut bgcolor
         cell = document.createElement("td");
		 texte = document.createTextNode(" ");
         cell.appendChild(texte);
         row.appendChild(cell);
		 oTable.appendChild(row);// oTable ?
		 row.style.setProperty("background-color", "#FFFF80");
	}
	for (var i=0; i<archivesgrilles.length; i++) {
        var newcook=archivesgrilles[i];
    	 // Creation d'une ligne du tableau par archive
         row = document.createElement("tr");// Avec attribut bgcolor
         cell = document.createElement("td");// Avec attribut id
		 texte = document.createTextNode((i)+"- "+newcook);
         cell.appendChild(texte);
         row.appendChild(cell);
		 oTable.appendChild(row);// oTable ?
		 cell.setAttribute("id",i+"A");
		 cell.style.setProperty("font-size","xx-large");
		 row.style.setProperty("background-color", "#FFFF80");
		 if (i==archiveencours) {archiveenblanc(i)} else {archiveenjaune(i)}
    }// i
	changemethods("Archives");
for(var i=1; i <  oTD.length; i++){
	 // affecte la fonction mouseclick
	 oTD[i].onclick = function(){// oTD non definie		
			var ex=archiveencours;
			enregistrementgrille();// sauvegarde de la grille en cours
			archiveenjaune(archiveencours+2);
			archiveencours=this.id.split("A")[0];
			archiveenblanc(parseInt(archiveencours)+2);
			clef=archivesgrilles[archiveencours];
			myForm.nomrevuearchive.value=clef;
			chargearchive();
			changemethods("Grilles");
	 }// mouseclick
}//i
	archiveenjaune(archiveencours);
	archiveenblanc(archiveencours+2);
}

function reinitialisationarchives() {
		if (REINITARCH) {putmessage("Retour aux 4 archives de base"); localStorage.removeItem(clefarchive); chargementarchive(); listearchives}  else {putmessage("<u><b>Attention</b></u> : pas de retour possible aux 4 archives de base (eliminant toutes les autres archives); cocher la case des options pour activer cette fonction")}
}

function cleararchives() {// Effacement de la liste des archives
	oTable = document.getElementById('Lxlx');
	oTR = oTable.getElementsByTagName('tr');
	for (var i=oTR.length-1; i>0; i--) {
		var disparu=oTable.removeChild(oTable.lastChild);
	}
}

function effacearchive() {// Efface archive affichee de la liste, supprime la clef de cette archive et charge la derniere archive de la liste
    	oTable = document.getElementById('Lxlx');
    	oTD = oTable.getElementsByTagName('td');
	var previousarchive=archiveencours;
	var clefprevious=archivesgrilles[archiveencours];
	if (archiveencours<4) {putmessage("<u><b>Attention</b></u> : effacement interdit archive "+archiveencours+" parmi les 4 archives de base"); return}
	localStorage.removeItem(archivesgrilles[archiveencours]);// anleve cette archive du webstorage
	for (var i=archiveencours; i<oTD.length; i++) {// liste actualisee des archives derriere archive a supprimer
		archivesgrilles[i]=archivesgrilles[i+1];
   	}
   	archivesgrilles.pop();// effacement derniere ligne du tableau archivesgrilles
	archiveencours=archivesgrilles.length-1;// selectionne derniere archive
	localStorage.removeItem(archivesgrilles[archiveencours]);// anleve cette archive du webstorage
   	archivesgrilles.pop();// effacement derniere ligne du tableau archivesgrilles
	archiveencours=archivesgrilles.length-1;// selectionne derniere archive
	clef=archivesgrilles[archiveencours];
   	myForm.nomrevuearchive.value=clef;// affichage du nom de cette archive clef
		chargementgrille();// Chargement des grilles de la nouvelle archive
		listegrilles();// Actualisation de la liste des grilles sur cette archive remplacante
		affichedernieregrille(); // et affiche sa derniere grille
	listearchives()// nouvelle liste
	changemethods("Archives");
	putmessage("Nouvelle archive "+archiveencours+" : "+clef+" après effacement archive "+previousarchive+" sur "+(oTD.length-1)+" : "+clefprevious);
}


function archiveenblanc(numarchive) {
		oTable = document.getElementById('Lxlx');
        oTR = oTable.getElementsByTagName('tr');
		if (numarchive<oTR.length) {oTR[numarchive].style.setProperty("background-color", "#FFFFFF")} 
}

function archiveenjaune(numarchive) {
		oTable = document.getElementById('Lxlx');
        oTR = oTable.getElementsByTagName('tr');
		if (numarchive<oTR.length) {oTR[numarchive].style.setProperty("background-color", "#FFFF80")} 
}

function archiveup() {
			 var p=parseInt(archiveencours);
			 if (p>0) {
				enregistrementgrille();// sauvegarde de la grille en cours
				archiveenjaune(p+2);
    			archiveenblanc(p+1);
			 	archiveencours=(p-1);
			 	myForm.nomrevuearchive.value=archivesgrilles[p-1];
			 	clef=archivesgrilles[p-1];
				putmessage("archive d'avant : "+myForm.nomrevuearchive.value+" nnuméro "+(p+1));
    			chargearchive();
			}
}

function archivedown() {
			 var p=parseInt(archiveencours);
			 if (p<archivesgrilles.length-1) {
				enregistrementgrille();// sauvegarde de la grille en cours
			 	archiveenjaune(p+2);
			 	archiveenblanc(p+3);
				archiveencours=(p+1);
			 	myForm.nomrevuearchive.value=archivesgrilles[p+1];
				clef=archivesgrilles[p+1];
				putmessage("archive suivante : "+myForm.nomrevuearchive.value+" nnuméro "+(p+3));
			 	chargearchive();
			 }
}

