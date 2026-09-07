function listegrilles() {// Pour affichage des grilles
	cleargrids();
	oTable = document.getElementById('Lili');
	titregrille="Liste des grilles de l\'archive "+clef;
	for (var i=0; i<nomsgrilles.length; i++) {
        var newcook=nomsgrilles[i];
    	 // Creation d'une ligne du tableau par grille
         row = document.createElement("tr");// Avec attribut bgcolor
         cell = document.createElement("td");// Avec attribut id
    	 texte = document.createTextNode(i+"- "+newcook);
         cell.appendChild(texte);
         row.appendChild(cell);
		 oTable.appendChild(row);// oTable ?
		 cell.setAttribute("id",i+"G");
		 row.style.setProperty("background-color", "#FFFF80");
    }// i
nombregrilles=oTD.length;
oTD = oTable.getElementsByTagName('td');
	var nb = oTD.length;
	grilleenblanc(grilleencours+1);
for(var i=0; i < nb; i++){
	 // affecte la fonction mouseclick
	 oTD[i].onclick = function(){// oTD non definie		
		// Effacement listes affichees variantes et hypotheses
		clearvariantes();
		clearhypotheses();
		// Preparation du calcul
		scenario="";
		listecalcul="0";
//		var metencours=0;
//		if (!isNaN(metencours)) {metencours=parseInt(origin)}
//		if ((metencours!=0) && !isNaN(metencours)) {methodeenjaune(metencours+1)} // Sauf isNaN
		nmetref=0;
		coloris=true;
		 	 clickmethode=false;
    		 choixetape=0;// ou -1
			 grilleenjaune(grilleencours+1)
			 grilleencours=parseInt(this.id);
		if (nomsgrilles[grilleencours]!=myForm.nomrevue.value) {effechargemethode=false; affiche()}		
			 	grilleNameBegin = nomsgrilles[grilleencours];
			 	myForm.nomrevue.value=grilleNameBegin;
			 	clearsteps();
				chargergrille();
				maxvarencours=0;
			 etapecalcul=0;
			 etapeini=0;
			 grilleenblanc(grilleencours+1);
			 desaffiche();			 
			 var charge="Grille <u>"+grilleNameBegin+"</u> dans archive <u>"+myForm.nomrevuearchive.value+"</u>";
			 if (archiveencours>3) {
				var xpre=new Array();
				for (var i=0; i<M; i++) {xpre[i]=contenu[i]}
				if (SELECTSISELECTION) {
				calculer();
				if (contenuok.length==0) {charge+="<br><br><u>Grille fausse</u>"+"<br><br>"+scenario+"<br><br>Assistance indisponible car non pertinente pour une grille fausse"}
				}
				changemethods("Grilles");
				clearsteps();
				chargergrille();
//				for (var i=0; i<M; i++) {contenu[i]=xpre[i]}
//				enregistrementgrille();
			 }
			 putmessage(charge);
	 }// mouseclick
}//i
}

function enregistrementarchive() {// enregistrer la clef dans le tableau archivesgrilles (avec la cle clefarchive)
	if(typeof localStorage!='undefined' && JSON) {
        var donnees={	
        		indice:archiveencours,
				grilles: archivesgrilles
        };
        var val = JSON.stringify(donnees);
        localStorage.setItem(clefarchive, val);
	}
}

function enregistrementgrille() {// enregistrer les tableaux nomsgrilles et contenusgrilles avec la clef en cours clef= modification archive existante = modifications en cours
// enregistrer aussi les tableaux niveauxgrilles et solutionsgrilles
	if(typeof localStorage!='undefined' && JSON) {
		// Methode de stockage
        var donnees={	
        		indice:grilleencours,
				grilles: nomsgrilles,
				contenu: contenusgrilles,
				niveau: niveauxgrilles,
				solution: solutionsgrilles
        };
        var val = JSON.stringify(donnees);
        localStorage.setItem(clef, val);
	}
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

function moonautre() {
    var rr=calculer();
    if (!rr) {// grille fausse
		myForm.nomrevue.value=myForm.nomrevue.value+" (Grille fausse à corriger)";
    	departverscontenu();
    	desaffiche();
    	clearsteps();
	} else {// grille correcte sauvegardée avec son niveau de difficulte
		niveaudedifficultegrille();
		departverscontenu();
	}
}

function ajoutgrille(newgrille) {// Apres creation ou modification, lors de la sauvegarde
	oTable = document.getElementById('Lili');
	oTD = oTable.getElementsByTagName('td');
	grilleencours=oTD.length;
	// Creation ligne supplementaire
             row = document.createElement("tr");// Avec attribut bgcolor
             cell = document.createElement("td");// Avec attribut id
        	 texte = document.createTextNode(grilleencours+"- "+newgrille);
             cell.appendChild(texte);
             row.appendChild(cell);
        	 oTable.appendChild(row);
        	 cell.setAttribute("id",i+"G");
    		 row.style.setProperty("background-color", "#FFFFFF");
	// Ancienne grille en jaune, Actualiser grilleencours et nouvelle ligne en blanc
    oTD[oTD.length-1].onclick = function(){
    		grilleenjaune(grilleencours+1);//<--- ???
    		var tt=this.id;
    		grilleencours=parseInt(tt);
        	// Selection d'une nouvelle grille : blanchir la nouvelle et jaunir l'ancienne
    		grilleenblanc(grilleencours+1);
			choixetape=0;
			clearsteps();
			choixgrille();
    		etapecalcul=0;
    		desaffiche();
    }// mouseclick
}

function recuperecontenu() { // Sauvegarde archive puis grille  en fin de liste affichee avec les noms affiches de grille et archive
	var choixetape0=choixetape;
	var contenuprev=new Array(M);
	if (choixetape0>5) {myForm.nomrevue.value+=" Etape "+choixetape}
	grilleNameBegin=myForm.nomrevue.value;
	if (grilleNameBegin=="") {putmessage("<u>Attention</u>, nom de grille vide"); return}
	clef=myForm.nomrevuearchive.value;
	if (clef=="") {putmessage("<u>Attention</u>, nom d\'archive vide"); return}
	// Recherche archiveencours
	var x=archivesgrilles.length;
	for (var i=0; i<x; i++) {
		if (clef==archivesgrilles[i]) {archiveencours=i; break}
	}
	if (i<4) {// nom de archive de base : imposer le nom "nouvelle archive", le creer si pas encore existant, sinon a traiter comme archive existante
		clef="Nouvelle archive";
		myForm.nomrevuearchive.value=clef;
		// verifier si cette archive speciale existe deja
		for (var i=0; i<x; i++) {
			if (clef==archivesgrilles[i]) {archiveencours=i; break}
		}
	}
	if (i==x) {// archive "Nouvelle archive" inexistante ou aucune archive particuliere : la creer
    	archiveencours=archivesgrilles.length;
    	archivesgrilles.push(clef);
   		enregistrementarchive();
   		// Initialiser la grille
   		nomsgrilles=[];
   		grilleencours=0;		
		// Renseigner 2 des 4 composantes de la grille
		nomsgrilles[grilleencours]=grilleNameBegin;
		for (i=0; i<M; i++) {contenusgrilles[grilleencours][i]=contenu[i]}
		enregistrementgrille();
		validerlistearchives();// Avec la nouvelle archive
		listesteps();
		choixetape=1;
		clearsteps();
		etapeenblanc(choixetape-1);
		putmessage("Grille <u>"+grilleNameBegin+"</u> créée dans nouvelle archive <u>"+clef+"</u>");
		changemethods("Grilles");
		listearchives();
		return;
	}
	// archive existant chercher grilleencours dans le webstorage dans la liste des grilles de l'archive clef, si  archive pas de base
	chargementgrille();// Determination de nomsgrilles dans l'archive en cours
	var y=nomsgrilles.length;
	for (var i=0; i<y; i++) {
		if (nomsgrilles[i]==grilleNameBegin) {grilleencours=i; break}
	}
    if (i==y) {// Nom de grille pas dans la liste, verifier contenu
    	if (contenusgrilles.length<y) {nomsgrilles.pop(); y-=1}
		for (var i=0; i<y; i++) {
			var b=true; for (var j=0; j<M; j++) {if (contenusgrilles[i][j] != contenu[j]){b=false; break}}
			if (b) {grilleencours=i; break}
    	}
		if (i==y) {// Contenu de grille pas dans la liste : cas usuel avec nouveaux nom et contenu enregistrer avec 4 composantes
			grilleencours=nomsgrilles.length;
			nomsgrilles.push(grilleNameBegin);// ajoute nom nouvelle grille dans la liste
			contenusgrilles[grilleencours]=new Array();
//			contenusgrilles[grilleencours]=contenu;
			for (i=0; i<M; i++) {contenusgrilles[grilleencours][i]=contenu[i]}
			enregistrementgrille();	
			cleargrids();
			listegrilles();			
			recalcul=false;			
			changemethods("Grilles");
			putmessage("Enregistrement grille "+grilleNameBegin+" dans archive "+clef);
			return;
			var z=" Grille "+grilleencours+" parmi "+nomsgrille.length+" ! ";
		} else {// meme contenu et nom different : enregistrer ce nouveau nom en lieu et place de l ancien
			var namebefore=nomsgrilles[grilleencours];
			nomsgrilles[grilleencours]=grilleNameBegin;
			enregistrementgrille();	
			cleargrids();
			listegrilles();			
			changemethods("Grilles");
			putmessage("Changement du nom de la grille, sans modifier son contenu : "+grilleNameBegin+" dans l\'archive "+clef+" au lieu de "+namebefore);
			return;
		}
	} else {// Nom de grille dans la liste, verifier contenu
    	for (var i=0; i<y; i++) {
			var b=true; for (var j=0; j<M; j++) {if (contenusgrilles[i][j] != contenu[j]){b=false; break}}
			if (b) {grilleencours=i; break}
    	}
	putmessage("Archive "+clef+" ou "+archiveencours+" parmi "+x+" archives nombre de grilles "+y+" recherche "+grilleNameBegin+" i "+i+" vérification "+(i==y));
		if (i==y) {// Contenu de grille pas dans la liste avec meme nom : enregistrer nom en fin de liste en y ajoutant contenu modifie avec 4 composantes
			var avant=grilleNameBegin;
			grilleNameBegin+=tradacrit(" contenu modifié");
			grilleencours=nomsgrilles.length;
			nomsgrilles.push(grilleNameBegin);// ajoute nom nouvelle grille dans la liste
			for (i=0; i<M; i++) {contenusgrilles[grilleencours][i]=contenu[i]}
			var z=tradacrit("Grille avec même nom et contenu différent après moins de 5 modifications, enregistrée en fin de liste en ajoutant contenu modifié au nom de la grille. ");
			// Enregistrer la grille dans newarchive
			enregistrementgrille();
			cleargrids();
			listegrilles();
			recalcul=false;			
			changemethods("Grilles");
			putmessage(z+"Grille "+grilleNameBegin+" dans l\'archive "+clef+" avec son niveau de difficulté <u>"+nivred+"</u>");
		} else {
			putmessage("Erreur : grille avec même nom et même contenu");
	changemethods("Archives");
			return;
		}
	}
	modecreation=false;
	changemethods("Grilles");
}

function savearchive() { //Deplacement de la clef en fin de tableau archivesgrilles sans toucher aux grilles
	if (archiveencours<4) {putmessage("<u><b>Attention</b></u> : impossible de déplacer les 4 archives de base"); return}
	var n=archivesgrilles.length;
	var p=parseInt(archiveencours);
	for (var i=0; i<n;  i++) {
    	if (clef==archivesgrilles[i]) {
			for (var j=i; j<n-1; j++) {
				archivesgrilles[j]=archivesgrilles[j+1];
			}
			archivesgrilles[j]=clef;
			break;
		}
    }
	listearchives();
	archiveenjaune(p+2);
	archiveenblanc(n+1);
	archiveencours=n-1;
	enregistrementarchive();// nouvelle structures de clefs
	changemethods("Archives");
	putmessage("Déplacement de l'archive "+archivesgrilles[archiveencours]+" en fin de liste");
}



function newarchive() {// Creation de cle pour cette nouvelle archive
		archiveencours=archivesgrilles.length;// Pointe sur la ligne clef en cours des archives 
		var titre=myForm.nomrevuearchive.value;// Titre de la nouvelle archive
		if (titre.length==0) {putmessage("<u><b>Attention</b></u> : donnez un titre à votre nouvelle archive"); return}
		// Verifier que ce titre n'existe pas deja --> nouvelle clef
for (var i=0; i<archivesgrilles.length;  i++) {
	if (titre==archivesgrilles[i]) {break}
}
		if (i==archivesgrilles.length) {
			archivesgrilles[archiveencours]=titre;// La nouvelle archive = clef
			enregistrementarchive();// nouvelle cle de cette archive
			clef=titre;
			document.getElementById("nomarchive").innerHTML="  Archive en cours : "+clef;
			listearchives();		
			// Rechargement grilles dans cette nouvelle archive
			nomsgrilles=[];
			contenusgrilles=[];
			grilleencours=0;
			nomsgrilles[grilleencours]=myForm.nomrevue.value;
			contenusgrilles[grilleencours]=new Array(M);
			for (var i=0; i<M; i++) {contenusgrilles[grilleencours][i]=contenu[i]}
			//contenusgrilles[grilleencours]=contenu;
			enregistrementgrille();// grille en cours comme premiere grille de la nouvelle archive avec la cle titre	
			cleargrids();
			listegrilles();		
    		changemethods("Grilles");
			putmessage("Archive "+titre+" créée avec la grille "+myForm.nomrevue.value+" chargée");
		} else {
			putmessage("<u><b>Attention</b></u> : donnez un titre à votre nouvelle archive différent des titres d'archives existants");
		}
}

function newgrid() {// Creation a partir de 0 : vider la grille, effacer les etapes de calcul, avant de remplir manuellement cette grille, puis de la sauvegarder (alerte message)
	clearsteps();
	clearhypotheses();
	clearvariantes();
		modecreation=true;
		choixetape=0;
		etapecalcul=0;
		listecalcul="0";
		grilleenjaune(grilleencours+1);
		choixetape=0;
		for (var i=0; i<M; i++) {contenudepart[i]=0}
		reinitialisegrille();// avec prise en compte etoiles
		grilleencours=nomsgrilles.length;// Pointe sur la ligne de la grille a creer
		desaffiche();// Sans les petits chiffres
		myForm.nomrevue.value="N";
		// Titre derniere grille
		var titre= nomsgrilles[nomsgrilles.length-1];
		grilleNameBegin =myForm.nomrevue.value;
		if (titre==myForm.nomrevue.value) {erasegrid()}
		niveauxgrilles[grilleencours]=0;// Initialisser par défaut arbitrairement
		solutionsgrilles=solutionsgrillesdebase;;// Initialisser par défaut arbitrairement
		changemethods("Grilles");
}


function niveaudedifficultegrille() {// Niveau de difficulte affiche dans le titre
	var ajj=" (niveau de difficulté ";
	nivred=0;
	switch(numerr) {
		case 0:// Pas d hypothese
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
					nivred=1;
					ajj=ajj+"1)";
					break;
				case 4:
				case 5:
					nivred=2;
					ajj=ajj+"2)";
					break;
				case 6:
				case 7:
					nivred=2;
					ajj=ajj+"3)";
					break;
				case 8:
				case 9:
					nivred=3;
					ajj=ajj+"4)";
					break;
				case 10:
				case 11:
					nivred=3;
					ajj=ajj+"5)";
					break;
				case 12:
				case 13:
					nivred=4;
					ajj=ajj+"6)";
					break;
				case 14:
				case 15:
					nivred=4;
					ajj=ajj+"7)";
					break;
				case 16:
				case 17:
					nivred=4;
					ajj=ajj+"8)";
					break;
				case 18:
				case 19:
					nivred=5;
					ajj=ajj+"9)";
					break;
				case 20:
				case 21:
				case 22:
				case 23:
					nivred=5;
					ajj=ajj+"10)";
					break;
				case 24:
				case 25:
				case 26:
				case 27:
					nivred=5;
					ajj=ajj+"11)";
					break;
				case 28:
				case 29:
				case 30:
				case 31:
					nivred=5;
					ajj=ajj+"12)";
					break;
				default:
					ajj=ajj+"non répertorié sans hypothèse)";
					break;
			}
			break;
		case 1:
			nivred=5;
			ajj=ajj+"13)";
			break;
		case 2:
			nivred=5;
			ajj=ajj+"14)";
			break;
		case 3:
			nivred=5;
			ajj=ajj+"15)";
			break;
		case 4:
			nivred=5;
			ajj=ajj+"16)";
			break;
		case 5:
		case 6:
			nivred=5;
			ajj=ajj+"17)";
			break;
		case 7:
		case 8:
			nivred=5;
			ajj=ajj+"18)";
			break;
		case 9:
		case 10:
		case 11:
		case 12:
			nivred=5;
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
			nivred=5;
			ajj=ajj+"20)";
			break;
		default:
			ajj=ajj+"21)";
			break;
	}	
//	myForm.nomrevue.value=myForm.nomrevue.value+ajj;
	putmessage("Niveau de difficulté : "+ajj+" soit, de manière contractée : "+nivred);
	niveauxgrilles[grilleencours]=nivred;
}


