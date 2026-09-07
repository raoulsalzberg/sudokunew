function enregistrescenarios() {
	  for (var i=1; i<maxvarencours; i++) {if (scenario==tableauvariante[i]) {break}}
	  if (i==maxvarencours) {
		  tableauvariante[maxvarencours] = scenario+"$"+variete;
          maxvarencours+=1;
	  }						
	  if (!origincrash) {scenario=noeffect}
}

function calculvariante() {
changemethods("Variantes");
if (nmetref==0) {// toutes les variantes
	var b=tableauvariante.length;
	if (b>0) {
		var a="Nombre de variantes de la méthode "+methodeseule+" : "+(b-1);
		for (nmetref=1; nmetref<b; nmetref++) {
//			traitementvariante();
		}
	} else {
		var a="Pas de variantes de la méthode "+methodeseule;
	}
	putmessage(a+"<br>"+messageencours); 
	return;
}
// Une variante particuliere
		if (maxvarencours>0) {
		   modeexecute=true;
		   valeurreduit();
		   scenardetail="";
		   messageglobal="";
		   traitementvariante();
		   putmessage(scenario+"<br>"+explainmethods(nmx)+"<br><br><br>"+messageencours);
		} else {
		  modeexecute=false;
		  putmessage("<br><br><u><b>Attention</b></u> : Pas de variante"+titrecomplet(false));
		}
}

function traitementvariante() {
		scenario=tableauvariante[nmetref].split("$")[1];
		variete=tableauvariante[nmetref].split("$")[2];
		var nmz=tableauvariante[nmetref].split("$")[0];
		nmx=nmz.substring(0, nmz.length-1) + variete;
		// recup origin et variete et sousvariete
		origin=parseInt(nmx.substring(0,2));
		if (origin==32) {nmx=nmz}
		for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
		regenereaffiche();
		if (idliste=="Lwlw") {elaboreunevarianteuni()} else {elaboreunevariante()}
}

function listevariante() {// Creation et affichage des variantes successives de la grille, base sur le tableau tableauvariante
		titrevariante=titrecomplet(true);
		oTable = document.getElementById('Lzlz');
		oTD = oTable.getElementsByTagName('td');
		document.getElementById("Titrevar").innerHTML="<b><u>"+tradacrit(titrevariante)+"</u></b>";
		for (var i=0; i<maxvarencours+1; i++) {        
				// cree une ligne de tableau
				if (i>0) {var tabsansbr=tableauvariante[i].split("$")[1]} else {var tabsansbr=tableauvariante[i]}
                row = document.createElement("tr");
                cell = document.createElement("td");
				texte = document.createTextNode((i+"-"+tabsansbr).replaceAll('<br>','. '));
				cell.appendChild(texte);
                row.appendChild(cell);
    	 		oTable.appendChild(row);
				row.setAttribute("id", "row"+i);
				cell.setAttribute("id", i+"V");
		 		row.style.setProperty("background-color", "#FFFF80");
		}// i
		// Selection toutes les vatiantes
		nmetref=0;
		varianteenblanc(nmetref);
		idliste="Lzlz"; 
		calculvariante();
// Cas de click sur une variante
for(var i=0; i < oTD.length; i++){
	 // affecte la fonction mouseclick de selection de la variante nmetref du tableau tableauvariante
	 // avec la methode origin dans ce tableau
	 oTD[i].onclick = function(){
			coloris=true;
			varianteenjaune(nmetref);// variante previous	
			nmetref=parseInt(this.id);
			varianteenblanc(nmetref);
    		scenario=tableauvariante[nmetref];
			afficheini();
			calculvariante();
			flagvariante="M"+origin+"V"+nmetref;
     }
}
}

function varianteenblanc(numgrille) {
		numgrille=numgrille+3;
		permetvalidation=true;
		oTable = document.getElementById('Lzlz');
        oTR = oTable.getElementsByTagName('tr');
		oTR[numgrille].style.setProperty("background-color", "#FFFFFF");
}

function varianteenjaune(numgrille) {
try {
		numgrille=numgrille+3;
		oTable = document.getElementById('Lzlz');
        oTR = oTable.getElementsByTagName('tr');
		oTD = oTable.getElementsByTagName('td');
		a+=" numgrille "+numgrille+" oTR.length "+oTR.length+" : "+tableauvariante[numgrille-2];
		oTR[numgrille].style.setProperty("background-color", "#FFFF80"); 
} catch(error) {
	a+=error;
}
}

function changelistemethodes() {
		var tableauglobal=new Array();
		tableauglobal=[];
		if (idliste=="Lwlw") {
		  	messageglobal="<br>Résultat de toutes les variantes de toutes les méthodes unicité applicables à l'étape en cours : ";
			origin=32;
			var imax=ORMUNI;
		} else {
		  	messageglobal="<br>Résultat de toutes les variantes de toutes les méthodes applicables à l'étape en cours : ";
			var preorigin=origin;
			var imax=ORM-1;
		}
		coloris=true;		
		var nvariantesapplicables=0;
		if (choixetape>0) {for (var i=0; i<M; i++) {contenu[i]=contentmemory[numerohypothese][choixetape-1][i]}}
		var j=0;// compteur des méthodes applicables
		for (var i=1; i<imax; i++) {
			clickstep=false;
			clickmethode=true;
			maxvarencours=1;
			tableauvariante=[];
			if (idliste=="Lwlw") {variete=i; var sigle="B"; listecarree()} else {origin=i; var sigle="M"; calc()}
//			messageglobal+="<br>"+wscen;
			if (maxvarencours>1) {
				j+=1;
				var x=(document.getElementById(i+sigle).innerHTML).split("- ")[1];// Nom de la méthode i ou de la variete i
				if (maxvarencours>2) {messageglobal+=x+" : "+(maxvarencours-1)+" variantes,   "} else {messageglobal+=x+" : "+(maxvarencours-1)+" variante,   "}
				nvariantesapplicables+=maxvarencours-1;
				var first=tableauvariante.shift();
				for (var k=0; k<tableauvariante.length; k++) {var aa=tableauvariante[k].split("$"); variete=aa[1]; var nm=elaborenm(); tableauvariante[k]=nm+"$"+tableauvariante[k]} 
				if (j==1) {
					tableauglobal=tableauvariante;
				} else {
					for (var k=0; k<tableauvariante.length; k++) {var long2=tableauglobal.push(tableauvariante[k])}
				}
			}
//			} else {messageglobal+="<br>Pas de variante méthode "+i+" sur "+(imax-1)+" sigle "+sigle+" idliste "+idliste}
		}// i
		maxvarencours=nvariantesapplicables;
		tableauvariante=tableauglobal;
		var lastfirst=tableauvariante.unshift("Toutes les variantes au nombre de "+maxvarencours)
		var lst=messageglobal.substring(0, (messageglobal.length-3))+".";
		if (messageglobal.substring((messageglobal.length-4), (messageglobal.length-3))==sep) {lst=messageglobal.substring(0, (messageglobal.length-4))+"."}
		variete=0;
		if (idliste=="Lolo") {
			messageglobal=lst;
			origin=preorigin;
		} else {
			origin=32;
			messageglobal=lst;
		}
		flagvariante="T";
		modeexecute=(nvariantesapplicables>0);
		effechargemethode=true;
		messageencours=messageglobal;
}

function varianteup() {
		if (nmetref==0) {return}
		nmetref-=1;
    	coloris=true;
		varianteenjaune(nmetref+1);// variante previous en jaune
        varianteenblanc(nmetref);
		scenario=tableauvariante[nmetref];
		calculvariante();	
}
	
function variantedown() {
		if (nmetref==maxvarencours) {return}
		nmetref+=1;
    	coloris=true;
        varianteenjaune(nmetref-1);// variante previous en jaune
		varianteenblanc(nmetref);
    	scenario=tableauvariante[nmetref];
    	calculvariante();
}

function titrecomplet(kas) {
	var titre=tradacrit(" pour la grille <u>"+myForm.nomrevue.value);
	if (kas) {
		titre="Liste des variantes"+titre;
	}
	if (idliste=="Lwlw") {
		var meth=variete+"B";
	} else {
		var meth=origin+"M";
	}
	var textmeth=document.getElementById(meth).innerHTML;
	textmeth="<u>"+textmeth.split("- ")[1]+"</u>";
	if (idliste=="Lwlw") {
		titre+="</u> avec la variété "+ textmeth+" de la liste des méthodes pour pallier les défauts d'unicité";
	} else {
    	if (origin != (ORM+1)) {titre+="</u> avec la méthode "+ textmeth+" "} else {titre+="</u> pour "+ textmeth+" "}
    	if (etapecalcul>0) {
    		oTable = document.getElementById('Lulu');
    		oTD = oTable.getElementsByTagName('td');
    		titre+=" et l'étape <u>"+choixetape+" sur "+oTD.length+"</u>"
    	}
	}
	return tradacrit(titre);
}

function elaboreunevarianteuni() {// Avec scenario 32 et selon variete
		wscen=scenario;
		switch(parseInt(variete)) {
			case 1:// Bug+1
				var s0=scenario.split("chiffre ")[1];
				var n=s0.substring(0,1);
				var s1=s0.split(" dans ")[1];
				var s2=s1.substring(0,2);
				var h=decodagecolPlace(s2);
				var posk=contenu[h].toString();
				var ch=posk.match(re);
				for (var i=0; i<3; i++) {
            			if (ch[i]!=n) {eliminationnumero(h,ch[i])}
           		}
				break;
			case 2:// Solo
				var s0=scenario.split("solo ")[1];
				if (s0.split("corroboré")[0].length==s0.length) {
    				 var s1=s0.split(" chiffre ")[1];
    				 var nc1=s1.substring(0,1);
    				 var nc2=s1.substring(2,3);
    				 var s2=s0.split("dans ")[1];
                	 var h=decodagecolPlace(s2);
    				 eliminationnumero(h,nc1);
    				 eliminationnumero(h,nc2);
				}
				break;
			case 3:// Duo form 1
				if (scenario.split("forme 1")[0].length<scenario.length) {// forme 1
    					 var s0=scenario.split("duo forme 1 ")[1];
    					 var s1=s0.split(" chiffre ")[1];
    					 var nc=s1.substring(0,1);
    					 var s2=s0.split("Elimination dans ")[1];
    					 var imax=s2.length/3;
    					 for (var i=0; i<imax; i++) {
    					 	var scar=s2.substring(3*i, 3*i+2);
    					 	var h=decodagecolPlace(scar);
    						eliminationnumero(h,nc);
						}
    			}
				break;
			case 4:// Duo form 2
				if (scenario.split("forme 2")[0].length<scenario.length) {// forme 2
    					 var s0=scenario.split("duo forme 2 ")[1];
    					 var s1=s0.split(" chiffre ")[1];
    					 var nc1=s1.substring(0,1);
    					 var nc2=s1.substring(5,6);
    					 var s2=s0.split("Elimination dans ")[1];
    					 var imax=s2.length/3;
    					 for (var i=0; i<imax; i++) {
    					 	var scar=s2.substring(3*i, 3*i+2);
    					 	var h=decodagecolPlace(scar);
    						if (contenu[h].split(nc1)[0].length<contenu[h].length) {eliminationnumero(h,nc1)}
    						if (contenu[h].split(nc2)[0].length<contenu[h].length) {eliminationnumero(h,nc2)}
    					}
				}
				break;
			case 5:// Duo differents
				if (scenario.split("differents ")[0].length<scenario.length) {// differents
						var s0=scenario.split("differents ")[1];
						var s1=s0.split("du chiffre ")[1];
						var n=s1.substring(0,1);
						var s2=s1.split(" dans ")[1];
						var hh1=decodagecolPlace(s2.substring(0,2));
						var hh2=decodagecolPlace(s2.substring(6,8));
						eliminationnumero(hh1,n);
						eliminationnumero(hh2,n);
				}
				break;
			case 6:// Duo diagonale
				if (scenario.split("diagonale ")[0].length<scenario.length) {// diagonale
						var s0=scenario.split("diagonale ")[1];
						var s1=s0.split("le chiffre ")[1];
						var n=s1.substring(0,1);
						var s2=s1.split(" dans les cases ")[1];
						var hh1=decodagecolPlace(s2.substring(0,2));
						var hh2=decodagecolPlace(s2.substring(6,8));
						eliminationnumero(hh1,n);
						eliminationnumero(hh2,n);
				}
				break;
			case 7:// LT1 si variete=7 cas==1
			case 8:// LT2
			case 9:// LT3
			case 10:// LT4
			case 11:// LT4 bis
			case 12:// LT5
			case 13:// LT6
				var cas=variete-6;
				if (variete==11) {cas="4 bis"}
				if (variete>11) {cas-=1}
				var s0=scenario.split("Cas LT"+cas)[1];
    					var bis=s0.substring(1,2);
    					if (bis=="<") {cas+=1} else if(cas>4) {cas+=1}
						var s1=s0.split("uppression ")[1]
    					var n=s1.substring(0,1);
    					var s2=s1.split(" dans ")[1];
						var HH=s2.substring(0,2);
						var h=autredecode(HH);
                    	var rect=scenario.split("rectangle ")[1];
    					var chiff=rect.split("chiffres ")[1];
                    	var alfa=parseInt(chiff.substring(0,1));
                    	var beta=chiff.substring(5,6);
                    	var casesrect=rect.substring(0,12);
                    	var verslarr=rect.split("Autre case ")[1];
                    	var caselarr=verslarr.substring(0,2);
                    	var gamma=verslarr.split("le chiffre ")[1].substring(0,1);
                    	var larr=autredecode(caselarr);
						eliminationnumero(h, n);
                    	decodevert(casesrect, alfa);
                    	decodevert(casesrect,beta);
                    	miseauvert(larr, gamma, BACKBLEU);
				break;
			case 14:// Rectangle cache nÂ°1
			case 15:// Rectangle cache nÂ°2
			case 16:// Rectangle cache nÂ°3
			case 17:// Rectangle cache nÂ°4
			case 18:// Rectangle cache nÂ°5
				var cas=variete-13;
					var xs0=scenario.split("unicité Rectangle caché nÂ°");
					var s0=xs0[1];
                    var rect=s0.split("dans rectangle ")[1];
                    var caserect=rect.substring(0,12);
					var s1=s0.split(": suppression ")[1]
    				var n=s1.substring(0,1);
    				var s2=s1.split(" dans ")[1];
					var HH=s2.substring(0,2);
					var h=autredecode(HH);
    				var chiff=rect.split("chiffres ")[1];
                    var alfa=parseInt(chiff.substring(0,1));
                    var beta=chiff.substring(5,6);
					eliminationnumero(h, n);
					if ((cas==3) || (cas==4) || (cas==5)) {
						var s3=s1.split(" et ")[1];
        				var n=s3.substring(0,1);
        				var s2=s3.split(" dans ")[1];
    					var h=decodagecolPlace(s2.substring(0,2));
						eliminationnumero(h, n);
					}
					if (cas==5) {
						var h=decodagecolPlace(caserect.substring(caserect.length-3, caserect.length-1));					
						var posk=contenu[h];
						var chk=posk.match(re);
						for (var ch=0; ch<chk.length; ch++) {
							if ((chk[ch]!=alfa) && (chk[ch]!=beta)) {eliminationnumero(h, chk[ch])}
						}
					}
                    decodevert(caserect, alfa);
                    decodevert(caserect,beta);
				break;
			case 19:// avoidable
			case 20:// avoidable 2
					var cas=variete-17;
					var s0=scenario.split("avoidable nÂ°")[1];
					var s1=s0.split("Elimination ")[1]
    				var n=s1.substring(0,1);
					var sw=s1.split(" dans ");
					for (var j=1; j<sw.length; j++) {// chiffre n commun pour avoidable nÂ°2
						var s2=sw[j]
    					var HH=s2.substring(0,2);
    					var h=autredecode(HH);
    					eliminationnumero(h, n);
					}
				break;
			default:
				break;
		}
}

function elaboreunevariante() {// Avec scenario
		wscen=scenario;
		if (isNaN(origin) && (extrait!=(ORM+1))) {origin=parseInt(extrait)}
		if ((extrait==(ORM+1)) || (origin==0)) {origin=parseInt(origin)}
		switch(parseInt(origin)) {
	  		case 0: // Crash pour impossibilite (4 cas)
				elaborevariantecrash();// Decodage et execution du scenario crash  impossibilite ou defaut unicite
				break;			
	  		case 1: //Elimination globale des petits chiffres de solitaires
				// Decodage et execution du scenario Elimination globale des petits chiffres sauf en mode manuel et si scenario
				elaborevariantepetitschiffres();
				break;			
	  	   	case ormg: // crash unicite carree
				affiche();
				elaborevarianteunicitecarree();// Decodage et execution du scenario unicite carree
				break;			
	  		case 2: // solo isole = solitaire ?
				elaborevariantesolo();// Decodage et execution du scenario solo isole
				break;			
	  		case 3: //jumeaux
				elaborevariantejumeaux();// Decodage et execution du scenario jumeaux
				break;			
	  	   	case 4: // Chiffre en duo dans un carre, sur une ligne ou une colonne
				elaborevarianteduo();// Decodage et execution du scenario duo
				break;			
	  		case 5: // triples
				elaborevariantetriples();// Decodage et execution du scenario triples
				break;			
	  		case 6: // quadruples
				elaborevariantequadruples();// Decodage et execution du scenario quadruples
				break;			
	  		case 7: // jumeaux isoles
				elaborevariantejumeauxisoles();// Decodage et execution du scenario jumeaux isoles
				break;			
	  		case 8: // triples isoles
				elaborevariantetriplesisoles();// Decodage et execution du scenario triples isoles
				break;			
        	case 9:// Gratteciel
				elaborevariantegratteciel();// Decodage et execution du scenario Gratteciel
				break;			
        	case 10:// Boucle
				elaborevarianteboucle();// Decodage et execution du scenario boucle
				break;			
			case 11:// L attaque du cobra
				elaborevariantecobra();// Decodage et execution du scenario L attaque du cobra(variante nmetref)
				break;			
        	case 12:// Sue de coq
				elaborevariantesuedecoq();// Decodage et execution du scenario sue de coq
				break;			
        	case 13:// W Wing
				elaborevarianteWWing();// Decodage et execution du scenario W Wing (l'aile de l'aigle)
				break;			
        	case 14:// Rectangle vide
				elaborevariantelaigle();// Decodage et execution du scenario rectangle vide (variante nmetref)
				break;			
			case 15:// Cerf-volant
				elaborevariantecerfvolant();// Decodage et execution du scenario cerf-volant
				break;			
        	case 16:// Turbot fish
				elaborevarianteturbotfish();// Decodage et execution du scenario turbot fish
				break;			
			case 17:// X Chain (color trap)
				elaborevarianteXChain();// Decodage et execution du scenario X Chain (variante nmetref)
				break;			
			case 18:// L aigle et sa proie
				elaborevariantelaigle();// Decodage et execution du scenario l aigle et sa proie (variante nmetref)
				if (scenario.substring(0,3)=="XYZ") {variete=1} else {variete=0}
				break;			
			case 19:// Swordfish
				elaborevarianteespadon();// Decodage et execution du scenario swordfich
				break;			
			case 20:// Forteresse maxilien
				elaborevarianteforteresse();// Decodage et execution du scenario forteresse maxilien
				break;			
			case 21:// X Wing
				elaborevarianteXWing();// Decodage et execution du scenario X Wing
				break;			
			case 22:// XY-chain (la griffe du tigre)
				affiche();
				scenardetail="";
				coloris=true;
				elaborevariantexychainnew();
    			break;
			case 23:// AIC Chain (l approche du tigre)
				elaborevarianteAICChain();// Decodage et execution du scenario AIC Chain (variante nmetref)
				break;			
			case 24:// Death Blossom
				elaborevariantedeathblossom();// Decodage et execution du scenario Death Blossom
				break;			
			case 25:// ALS-XY-WING
				elaborevariantealsxywing();// Decodage et execution du scenario ALS-XY-WING
				break;			
			case 26:// Jellyfish
				elaborevariantejellyfish();// Decodage et execution du scenario Jellyfish
				break;			
			case 27:// Squirmbag
				elaborevariantesquirmbag();// Decodage et execution du scenario Squirmbag
				break;			
			case 28:// 3D Medusa
				elaborevariante3DMedusa();// Decodage et execution du scenario 3S Medusa
				break;			
			case 29:// Nishio
				elaborevarianteNishio();// Decodage et execution du scenario Nishio
				break;			
			case 30:// Y-wing
				elaborevarianteywing();// Decodage et execution du scenario Y-wing
				break;			
			case 31:// Combinaison ALS + autre methode
				elaborevarianteALSChain();// Decodage et execution du scenario combinaison
				break;			
	  		case (ORM-1): // 32 : Crash defaut d'unicite evite (8 cas --> 21cas dont 2 cas de crash)
				affiche();
				elaborevarianteunicitecarree();// Decodage et execution du scenario crash unicite evite
				break;			
	  		case ORM: // 33 : Crash defaut d'unicite (21cas)
				elaborevariantecrashunicite();// Decodage et execution du scenario crash unicite
				break;			
			default:
//				putmessage("<u><b>Attention</b></u> : méthode dont les variantes ne sont pas encore activées");
				break;
		}// switch
}
	
function clearvariantes() {// Effacement des variantes
		titrevariante="<b><u>Liste des variantes</u></b>";
		document.getElementById("Titrevar").innerHTML=tradacrit(titrevariante);
	oTable = document.getElementById('Lzlz');
	oTR = oTable.getElementsByTagName('tr');
	for (var i=oTR.length; i>3; i--) {
		var disparu=oTable.removeChild(oTable.lastChild);
	}
	//document.getElementById("Titrevar").innerHTML="<b><u>Liste des variantes</u></b>";
}


