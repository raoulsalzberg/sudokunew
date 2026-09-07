function chargementgrille() {// recuperer en memoire les tableaux nomsgrilles et contenusgrilles (et aussi niveauxgrilles et solutionsgrilles) avec la cle clef = restauration de l'archive a partir de son stockage, ce qui ecrase les modifs en cours
// recuperer aussi grilleencours
	if(typeof localStorage!='undefined' && JSON) {
//		clef=archivesgrilles[archiveencours];
		clef=myForm.nomrevuearchive.value;
        // Methode de lecture
        if (JSON.parse(localStorage.getItem(clef))==null) {// Archive de la clef inexistante : charger les grilles de base
			chargegrillesdebase();
		} else {
			var valeur = JSON.parse(localStorage.getItem(clef));
    		grilleencours=valeur.indice;// grille previous
			nomsgrilles= valeur.grilles;
    		contenusgrilles=valeur.contenu;
			niveauxgrilles=valeur.niveau;
			solutionsgrilles=valeur.solution;
		}		
	}
	   if (grilleencours>=nomsgrilles.length) {grilleencours=nomsgrilles.length-1}
}

function grilleenblanc(numgrille) {
		oTable = document.getElementById('Lili');
        oTR = oTable.getElementsByTagName('tr');
		oTR[numgrille].style.setProperty("background-color", "#FFFFFF");
}

function grilleenjaune(numgrille) {
		oTable = document.getElementById('Lili');
        oTR = oTable.getElementsByTagName('tr');
		if (numgrille<oTR.length) {oTR[numgrille].style.setProperty("background-color", "#FFFF80")} 
}

function gridup() {
		 	 affiche();
			 effechargemethode=false;
    		 choixetape=0;
		 	 clickmethode=false;
			 grilleenjaune(grilleencours+1)
			 grilleencours=grilleencours-1;
			 if (grilleencours!=-1) {
				grilleNameBegin = nomsgrilles[grilleencours]
			 	myForm.nomrevue.value=grilleNameBegin;
			 	clearsteps();
			 	chargergrille();
			} else {
			  	grilleencours=0;
			}
			 etapecalcul=0;
			 grilleenblanc(grilleencours+1);
			 desaffiche();
			 putmessage("Grille <u>"+grilleNameBegin+"</u> dans archive <u>"+myForm.nomrevuearchive.value+"</u>");
}

function griddown() {
		 	 affiche();
			 effechargemethode=false;
			 clickmethode=false;
    		 choixetape=0;
			 grilleenjaune(grilleencours+1)
			 grilleencours=grilleencours+1;
			 if (grilleencours>nomsgrilles.length) {grilleencours=(nomsgrilles.length-1)}
			 if (grilleencours>(nomsgrilles.length-1)) {
			 	grilleencours=nomsgrilles.length-1;
			 } else {
			 	grilleNameBegin = nomsgrilles[grilleencours];
			 	myForm.nomrevue.value=grilleNameBegin;
			 	clearsteps();
				chargergrille();
			 }
			 etapecalcul=0;
			 grilleenblanc(grilleencours+1)
			 desaffiche();
			 putmessage("Grille <u>"+grilleNameBegin+"</u> dans archive <u>"+myForm.nomrevuearchive.value+"</u>");
}

function cleargrids() {// Effacement des grilles
	oTable = document.getElementById('Lili');
	oTR = oTable.getElementsByTagName('tr');
	oTD = oTable.getElementsByTagName('td');
	for (var i=oTR.length-1; i>0; i--) {
		var disparu=oTable.removeChild(oTable.lastChild);
	}
}


function effacegrilleexok() {// Efface la grille affichee de la liste et charge la derniere grille de la liste
	oTable = document.getElementById('Lili');
	oTD = oTable.getElementsByTagName('td');
	var content=document.getElementById(grilleencours+"G");
    content.parentNode.parentNode.removeChild(content.parentNode);
	// Necessite d'actualiser les id, depuis grilleencours jusqu'a oTD.length et de renumeroter:
	var clefprevious=nomsgrilles[grilleencours];
	var grillepreviious=grilleencours;
	for (var i=grilleencours; i<oTD.length;i++) {
		var fintext=document.getElementById((i+1)+"G").innerHTML;
		oTD[i].setAttribute("id", i+"G");
		document.getElementById(i+"G").innerHTML=tradacrit(i+"- "+fintext.split("- ")[1]);
	}
	supprimer();
	grilleencours=oTD.length;// se positionner sur la derniere grille
	if (grilleencours>0) {
		grilleNameBegin = nomsgrilles[grilleencours-1];
		grilleenblanc(grilleencours);
	} else {// plus de grille dans cette archive : effacer cette archive et charger affiche previous et sa dernier grille
		var clefprevious=archivesgrilles[archiveencours];
		effacearchive();
		enregistrementarchive();
		archiveencours-=1;
		cleargrids();
		clef=archivesgrilles[archiveencours];
		chargementarchives();// liste actualisee des archives etchargement des grilles de la nouvelle archive
		grilleencours=nomsgrilles[nomsgrilles.length-1];// derniere grille de cette archive
		grilleNameBegin=nomsgrilles[grilleencours];
		contenu=contenusgrilles[grilleencours];
		listegrilles();
		desaffiche();
	}
	myForm.nomrevue.value=grilleNameBegin;
	grilleencours-=1;	
	putmessage("Grille remplaçante : "+grilleNameBegin+" dans archive "+clef+" grilleencours previous "+grillepreviious + " de nom "+clefprevious);
	changemethods("Grilles");
}

function effacegrille() {
	grilleNameBegin=myForm.nomrevue.value;
	if (grilleNameBegin=="") {putmessage("<u>Attention</u>, nom de grille vide"); return}
	clef=myForm.nomrevuearchive.value;
	if (clef=="") {putmessage("<u>Attention</u>, nom d\'archive vide"); return}
	var clefprevious=clef;
	var grilleNameBeginprevious=grilleNameBegin;
	// Recherche archiveencours
	var x=archivesgrilles.length;
	for (var i=0; i<x; i++) {
		if (clef==archivesgrilles[i]) {archiveencours=i; break}
	}
	if (i==x) {putmessage("Archive non encore créée, pas d'effacement de grille possible");	return}
	if (i<4) {putmessage("Pas d\'effacement de grille dans les archives de base"); return}
	// chercher grilleencours dans le webstorage dans la liste des grilles de l'archive clef
	chargementgrille();// Determination de nomsgrilles
	var y=nomsgrilles.length;
	for (var i=0; i<y; i++) {
		if (nomsgrilles[i]==grilleNameBegin) {grilleencours=i; break}
	}
	if (i==y) {// Grille pas dans la liste : pas effacement possible
		putmessage("Grille "+grilleNameBegin+" pas dans l\'archive "+clef+". Pas d\'effacement possible");
		return;
	}
	// Effacement grille du webstorage
	var grilleprevious=grilleencours;
	supprimer();
	// Actualistaion de la liste
	if (grilleencours>=0) {// se positionner sur la derniere grille dans supprimer
		grilleNameBegin = nomsgrilles[grilleencours];
   		for (i=0; i<M; i++) {contenu[i]=contenusgrilles[grilleencours][i]}
		cleargrids();
		listegrilles();
		grilleencours+=1;
	} else {// plus de grille dans cette archive : effacer cette archive et charger affiche previous et sa dernier grille
		var clefprevious=archivesgrilles[archiveencours];
		effacearchive();
		enregistrementarchive();
		archiveencours-=1;
		cleargrids();
		clef=archivesgrilles[archiveencours];
		chargementarchives();// liste actualisee des archives etchargement des grilles de la nouvelle archive
		grilleencours=nomsgrilles[nomsgrilles.length-1];// derniere grille de cette archive
		grilleNameBegin=nomsgrilles[grilleencours];
   		for (i=0; i<M; i++) {contenusgrilles[grilleencours][i]=contenu[i]}
		listegrilles();
		desaffiche();
	}
	// Actualisation du nom de grille affiche et de son archive
	myForm.nomrevue.value=grilleNameBegin;
	myForm.nomrevuearchive.value=clef;
	grilleencours-=1;
	desaffiche();	
	putmessage("Grille remplaçante : "+grilleNameBegin+" dans archive "+clef+" grille précédente effacée "+grilleprevious + " de nom "+grilleNameBeginprevious+" dans archive précédente "+clefprevious);
}


function affichedernieregrille() {
	// Chargement derniere grille
	grilleencours=nomsgrilles.length-1;
	choixgrille();
	putmessage(grilleNameBegin);
	desaffiche();
}

function choixgrille() {
	choixetape=0;
	etapecalcul=0;
	listecalcul="0";
	chargergrille();
}		

function chargergrille() {// Charger une grille choisie (par grilleencours)
	clearsteps();
	clearhypotheses();
	clearvariantes();
	reamorceaide=true;
	modegeneration=false;
	clickmethode=false;
	modegeneration=false;
	recalcul=true;
	   grilleNameBegin=nomsgrilles[grilleencours];
	   myForm.nomrevue.value=grilleNameBegin;
	   coloris=false;
	   var listecontenu=contenusgrilles[grilleencours];
	   if (listecontenu === undefined) {supprimer(); listecontenu=contenusgrilles[grilleencours]; putmessage("Grille "+grilleencours); return}
			for (var i=0; i<M; i++) {
				var cc=listecontenu.toString().split(sep)[i];// c est aussi contenu[i]
				contenu[i]=cc;
				contenusaisie[i]=cc;
				if (cc.length==1) {
				   contenudepart[i]=cc;
				   document.getElementById(SQ+transi(i)).innerHTML = tradacrit(cc);
				} else {
				  contenudepart[i]=0;
				}
			}
			var k=0;
			var indication="";
			var previous="";
			for (var i=0; i<M; i++) {// Cases isolees
				if (caseisolee(i)) {
					contenudepart[i]=0;
    				document.getElementById(SQ+transi(i)).innerHTML = " ";
					if (k==0) {indication=" et case isolée : "+colPlace[i]+"="+contenu[i]; var previous=colPlace[i]+"="+contenu[i]}
					if (k==1) {indication=" et cases isolées : "+previous}
					if (k>0) {indication=indication+" "+colPlace[i]+"="+contenu[i]}
					k=k+1;
				}
			}
		choixetape=0;
		etapecalcul=0;
		clearsteps();
		mainraz();
		var message="Grille : "+grilleNameBegin+indication;
		desaffiche(); 
		if (effechargemethode) {message+="<br>Visualisation de l'application des méthodes possibles."; effechargemethode=false;}
		titrer=tradacrit("<b>Liste des étapes pour la grille <u>")+myForm.nomrevue.value+"</u>";
		document.getElementById("Titrestep").innerHTML=tradacrit(titrer);
		// initialiser le diagramme initial
   		for (var i=0; i<M; i++) {contentmemory[0][0][i]=contenu[i]}		
}


function caseisolee(x) {
	var num=contenu[x];
	var hh=parseInt(x/9);
	var vv=x-9*hh;
	var cc=carre[x]-1;
	var tabnum=new Array(10);
	tabnum=[];
	tabnum[0]=1;
	var tabzone=new Array(10);
	tabzone=[];
	tabzone[0]=1;
	for (var j=1; j<10; j++) {tabnum[j]=0}// Tableau 1 a 9 initialise a 0
	tabnum[num]=1;
	for (var lc=0; lc<3; lc++) {
    	for (var j=1; j<10; j++) {tabzone[j]=0}// Tableau 1 a 9 initialise a 0
    	tabzone[num]=1;
		for (var i=0; i<9; i++) {
			switch(lc){
	  					case 0: // Ligne x
							var h=i+9*hh;
							break;
	  					case 1: // Colonne x
							var h=vv+9*i;
							break;
	  					case 2: // Carre i
							var h=i+6*parseInt(i/3)+18*parseInt(cc/3)+3*cc; // Position i dans le carre cc
							break;
						default:
							break;			
			}// switch
			if (h!=x) {
				var valh=contenu[h];
				if (valh<10) {
    				tabnum[valh]=1;
    				tabzone[valh]=1;
				}
			}
		}// i
    	for (var j=1; j<10; j++) {// Test si tabzone rempli de 1
    		if (tabzone[j]==0) {break}
    	}
    	if (j==10) {return false}// zone complete : pas de case isolee  
	}// lc

	for (var j=1; j<10; j++) {// Test si tabnum rempli de 1
		if (tabnum[j]==0) {return false}
	}
	// Tableau tabnum rempli de 1 : case isolee
	return true;  
}


function transi(h0) {
		 var hi=parseInt(h0/9);
		 var vi=h0-9*hi;
		 return String.fromCharCode(vi+65)+(hi+1);
}

function chargegrillesdebase() {
	   nomsgrilles=nomsgrillesdebase;
	   contenusgrilles=contenusgrillesdebase;
	   solutionsgrilles=solutionsgrillesdebase;
	   niveauxgrilles=niveauxgrillesdebase;
	   grilleencours=nomsgrilles.length-1;
	   grilleNameBegin=nomsgrilles[grilleencours]// Grille last : Danielle
	   contenu=contenusgrilles[grilleencours];
	   myForm.nomrevue.value=grilleNameBegin;
	   enregistrementgrille();// enregistrer les grilles de base
	   cleargrids();
}


function chargegrillesnext() {
	   nomsgrilles=nomsgrillesnext;
	   contenusgrilles=contenusgrillesnext;
	   solutionsgrilles=solutionsgrillesnext;
	   niveauxgrilles=niveauxgrillesnext;
	   grilleencours=nomsgrilles.length-1;
	   grilleNameBegin=nomsgrilles[grilleencours]// Grille last
	   contenu=contenusgrilles[grilleencours];
	   myForm.nomrevue.value=grilleNameBegin;
	   enregistrementgrille();// enregistrer les grilles de base de cette archive
	   cleargrids();
}

function chargegrillesautres() {
	   nomsgrilles=nomsgrillesautres;
	   contenusgrilles=contenusgrillesautres;
	   solutionsgrilles=solutionsgrillesautres;
	   niveauxgrilles=niveauxgrillesautres;
	   grilleencours=nomsgrilles.length-1;
	   grilleNameBegin=nomsgrilles[grilleencours]// Grille last : theta
	   contenu=contenusgrilles[grilleencours];
	   myForm.nomrevue.value=grilleNameBegin;
	   enregistrementgrille();// enregistrer les grilles de base de cette archive
	   cleargrids();
}

function chargegrillesAIC() {
	   nomsgrilles=nomsgrillesAIC;
	   contenusgrilles=contenusgrillesAIC;
	   solutionsgrilles=solutionsgrillesAIC;
	   niveauxgrilles=niveauxgrillesAIC;
	   grilleencours=nomsgrilles.length-1;
	   grilleNameBegin=nomsgrilles[grilleencours]// Grille last : theta
	   contenu=contenusgrilles[grilleencours];
	   myForm.nomrevue.value=grilleNameBegin;
	   enregistrementgrille();// enregistrer les grilles de base de cette archive
	   cleargrids();
}


function erasegrid() {
    	if (archiveencours<4) {putmessage ("<u><b>Attention</b></u> : impossible d'effacer des grilles dans une des 4 archives de base"); return}
		if (prompt(myForm.nomrevue.value, "Supprimer cette grille "+grilleencours)) {
    		if (nomsgrilles.length>1) {
    			supprimer();// Suppression
        		cleargrids();
				listegrilles();
    			chargergrille();
        		choixetape=0;
        		etapecalcul=0;
        		listecalcul="0";
        		desaffiche();
        		clearsteps();
        		changemethods("Grilles");
				crashmanuel=false;
				recalcul=true;
			}  else {// effacement derniere grille de cette archive : effacement archive et chargement de la derniere grille archive precedente
//				putmessage("<u><b>Attention</b></u> : impossible de supprimer la grille restante de cette archive");
			}
    	}
}

function eraseallgrids() {// obsolete car redondant avec la suppression de l'archive
	if (archiveencours<4) {putmessage("<u><b>Attention</b></u> : pas de suppression de grille dans les 4 archives de base"); return}
//Suppression de toutes les grilles avec leurs contenus, suppression de l'archive en cours,  puis affichage de la liste des archives ainsi modifiee
	if (prompt("Effacement general des grilles", "Supprimer toutes les grilles de cette archive puis supprimer cette archive")) {
		cleargrids();// Efface la liste actuelle affichee des grilles
		clearsteps();
		clearhypotheses();
		clearvariantes();
		
		nomsgrilles=[];//Clear table
		contenusgrilles=[];//Clear table
		localStorage.removeItem(clef);
	
		listearchives();
		// a faire : selectionner la nouvelle archive a charger
	
	}
}

function supprimer() {// Suppression grille en cours des tableaux nomsgrilles et contenusgrilles et du storage
		clearsteps();
		clearhypotheses();
		clearvariantes();
    	// Suppression de la grille de numero grilleencours sauf derniere (effectue par pop)
		for (var i=grilleencours; i<nomsgrilles.length-1; i++) {
			nomsgrilles[i]=nomsgrilles[i+1];
			contenusgrilles[i]=contenusgrilles[i+1];
		}
		// Suppression du dernier element redondant
		nomsgrilles.pop();
		contenusgrilles.pop();
		grilleencours=nomsgrilles.length-1;
		enregistrementgrille();
}

function majgrille() {
		clearsteps();
		clearhypotheses();
		clearvariantes();
		modecreation=false;
		origincrash=false;
		if (grilleencours>=(nomsgrilles.length-1)) {grilleencours=nomsgrilles.length-1}
		for (var i=0; i<M; i++) {contenusgrilles[grilleencours][i]=contenu[i]}
		enregistrementgrille();
}

