function methodeenjaune(nummethode) {
		oTable = document.getElementById(idliste);
        oTR = oTable.getElementsByTagName('tr');
		if (nummethode<OMIX) {oTR[nummethode].style.setProperty("background-color", "#FFFF80")} 
}

function voitcellulemethode(param) {
idliste=param;
if (idliste=="Lwlw") {OMIX=(ORMUNI+1)} else {OMIX=(ORM+1)}
oTable = document.getElementById(idliste);
oTR = oTable.getElementsByTagName('tr');
oTD = oTable.getElementsByTagName('td');
var nb = oTD.length;
// Lignes en jaune
for( i=0; i < nb; i++){oTR[i+1].style.setProperty("background-color", "#FFFF80")} 
for( i=0; i < nb; i++){
	 // affecte la fonction mouseclick de selection methode : origin ou variete
	 oTD[i].onclick = function(){
		clearvariantes();
		clickstep=false;
		clickmethode=true;
		for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
		if (idliste=="Lwlw") {
			methodeenjaune((variete+1));	// previous
			var veriforigin=parseInt(this.id);
			variete=veriforigin;// variete
			origin=32;
			methodeenblanc((veriforigin+1));	// en cours
   			if (etablirmethode(veriforigin, document.getElementById(this.id).innerHTML.split("- ")[1])) {modeexecute=true; changemethods("Variantes")} else {modeexecute=false}
		} else {
			if (!isNaN(origin)) {methodeenjaune((parseInt(origin)+1))} else {methodeenjaune(parseInt(extrait))}
			extrait=this.id.substring(0, this.id.length-1);
			var veriforigin=parseInt(extrait);
			methodeenblanc((veriforigin+1));	// en cours
    		if ((veriforigin!=31) || AUTORISEALS) {
        		if (etablirmethode(veriforigin, document.getElementById(this.id).innerHTML.split("- ")[1])) {modeexecute=true; changemethods("Variantes")} else {modeexecute=false}
    			flagvariante="W"+extrait;
    		} else {// Methode 31 = ALS Chain
    			putmessage("Méthode ALS Chain non autorisée");
    		}
		}
	}//mouseclick
}// i
}

function methodeenblanc(nummethode) {
		oTable = document.getElementById(idliste);
        oTR = oTable.getElementsByTagName('tr');
		if (nummethode<OMIX+1) {oTR[nummethode].style.setProperty("background-color", "#FFFFFF")} 
}

function methodedown() {
			 // Annulation effet methode previous
			 derougir();
			 // Incrementation origin
			 var metencours=parseInt(origin);
			 methodeenjaune((metencours+1));
			 metencours=metencours+1;
			 if (metencours>OMIX) {metencours=OMIX}
			 origin=metencours;
			 nmetref=1;
    		 methodeenblanc((parseInt(metencours)+1));
oTable = document.getElementById(idliste);
oTR = oTable.getElementsByTagName('tr');
oTD = oTable.getElementsByTagName('td');
			 oTD[metencours].click();
}

function methodeup() {
			 a=(idliste=="Lwlw");
			 // Annulation effet methode previous
			 derougir();
			 // Decrementation variete ou origin
			 if (a) {var methencours=parseInt(variete)} else {var metencours=parseInt(origin)}
			 methodeenjaune((metencours+1));
			 metencours=metencours-1;
			 if (metencours<0) {metencours=0}
			 nmetref=1;
			 if (a) {variete=metencours} else {origin=metencours}
			 methodeenblanc((parseInt(metencours)+1));
oTable = document.getElementById(idliste);
oTR = oTable.getElementsByTagName('tr');
oTD = oTable.getElementsByTagName('td');
			 oTD[metencours].click();
}

function etablirmethode(ttmet, methode) {
		methodeseule=methode;
		if (idliste=="Lwlw") {
			var variantemax=0;
		} else {
			var preorigin=origin;
			if (preorigin!=ttmet) {origin=ttmet}
			variete=0;
			var variantemax=ORM+1;
		}
		indicescen=0;// Indice de la liste des scenarios
		affiche();
		if (ttmet==variantemax) {// toutes les variantes de toutes les methodes applicables
			changelistemethodes();
		} else {
			// Calcul et enregistrement de la liste des variantes de la methode selectionnee, si nouvelle methode
				//affiche();
				messageglobal="";
				messageencours="";
				tableauvariante= [];//Reinitialisation de la liste des variantes
				coloris=true;
				maxvarencours=1;
				if (idliste=="Lwlw") {listecarree()} else {calc()}
				for (var k=0; k<tableauvariante.length; k++) {var nm=elaborenm(); tableauvariante[k]=nm+"$"+tableauvariante[k]} 
				// Le menu variantes contient le titre liste calculee des variantes, suivi des variantes
				// maxvarencours contient le nombre de variantes +1
				// Ajout ligne de variante concernant toutes les variantes si click methode
        		maxvarencours-=1;
		}
				tableauvariante[0] = "Toutes les variantes, au nombre de "+maxvarencours;
				var debmess=maxvarencours+" variante";
				if(maxvarencours>1) {debmess=debmess+"s"}
				   if (clickstep) {// Appel de la variante 1 si click sur une etape (pas MxxVyy)
						if (idliste=="Lwlw") {elaboreunevarianteuni()} else {elaboreunevariante()}
				   } else {//  Affichage du nombre de variantes, gerees ensuite, si click sur une methode
						listevariante();
				   }
		return (maxvarencours>0);
}
