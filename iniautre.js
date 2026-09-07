function test() {
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	var hh=new Array(9);
	var hhautre=new Array(9);
	var re = /\d/g;
	var lc=0;
	var j=6;


			var k=0;
			var kautre=0;
			for (var i=0; i<9; i++) {
            	switch (lc) {
            	   case 0: // Ligne
				   		var h=i+9*j;
						break;
					case 1: // Colonne
						 var h=j+9*i;
						 break;
					case 2: // Carre
						 var h=i+6*parseInt(i/3)+18*parseInt(j/3)+3*j;
						 break;
				}
				var posk=contenu[h];
				if ((posk.length>1) && (posk.length<5)) {// attributaire possible
				   hh[k]=h;
				   k+=1;
				} else {
				  hhautre[kautre]=h;
				  kautre+=1;
				}// posk
			}// i
			var number=Math.pow(2,k);
			var rec="";

			for (var ii=15; ii<number; ii++) {
				var jjini=decimalToBinary(ii);
				var jj=jjini;

				for (var jjplus=jjini.length; jjplus<k; jjplus++) {// extension jj sur k caracteres
					// avec des 0 devant et derriere
					jj="0"+jj;
				}

				if (nbre_caracteres("1",jj)==4) {
				   // Cas a explorer parmi les possibles
				   // 3 etapes :  2 a 4 chiffres possibles dans 4 cases dites de base 
				   // - 4 cases de base avec 4 chiffres dans tableau contenu[hh]
				   // - Pas d'autre case avec uniquement ces chiffres dans tableau contenu[hhautre]
				   // - Elimination de ces chiffres dans les autres cases du tableau contenu[hhautre}
		   
				   
var cquad="";
var listecase=new Array();
var listeautrecase=new Array();
var xcase=0;
var xautrecase=0;
for (var kk=0; kk<k; kk++) {// tableau contenu[hh]
    var jrecup=jj.substring(kk, (kk+1));
   	if (jrecup==1) {
		listecase[xcase]=colPlace[hh[kk]];
		xcase+=1;
		var d=contenu[hh[kk]];
		// jj sur k caracteres avec des 0 et des 1 : selectionner les 1 parmi les hh
    	var d01=d.match(re);
    	for (var mm=0; mm<d.length; mm++) {
    		var dd=d01[mm]+"";
    		if (cquad.split(dd)[0].length==cquad.length) {// non inclus
    			   cquad+=dd;// ajouter
    		}// non inclus
    	}// mm	
	} else {
		listeautrecase[xautrecase]=colPlace[hh[kk]];
		xautrecase+=1;
	}// jrecup
}// kk
if (cquad.length<5) {
rec+="<br>ii "+ii+" sur "+number+" cquad "+cquad+" de longueur "+cquad.length+" jj "+jj;
rec+="<br>"+listecase+" de longueur "+xcase+"<br>"+listeautrecase+" de longueur "+xautrecase+"<br>";

    	wscen="Quadruples " + cquad + " en "+ listecase+" Elimination ";									
    	rec+="<br>"+wscen;
    for (var kkautre=0; kkautre<xautrecase; kkautre++) {// tableau contenu[hhautre] dans listeautrecase
    	var d=contenu[decodagecolPlace(listeautrecase[kkautre])];
    	rec+="<br>"+d+" dans "+listeautrecase[kkautre];
    	var c01=cquad.match(re);
    	var d01=d.match(re);
    	var nm=0;
		for (var mm=0; mm<d.length; mm++) {
    		var dd=d01[mm];
    		if (cquad.split(dd)[0].length<cquad.length) {// inclus
    		   nm+=1;
    		}
    	}// mm
		rec+="<br>nm "+nm+" vs "+d.length+" ";
    	if (nm==d.length) {//nouvelle case incluse dans cquad
    		 scenario="5 cases pour 4 chiffres : "+cquad+" --> "+colPlace[hhautre[kkautre]]+",  "+colPlace[hh[0]]+",  "+colPlace[hh[1]]+",  "+colPlace[hh[2]]+" et "+colPlace[hh[3]];
    	 	 origincrash=true;
    	  	 return;	
    	}
		rec+="<br> Essai élimination chiffres dans "+d+" ou "+d01+" si dans "+cquad+" kautre "+kautre;
		for (var x=0; x<2; x++) {}
		for (var juju=0; juju<d.length; juju++) {
			var ddx=d01[juju];
    		if (cquad.split(ddx)[0].length<cquad.length) {// inclus
    		   wscen+=ddx+" dans "+listeautrecase[kkautre]+" ";
			   eliminationnumero(decodagecolPlace(listeautrecase[kkautre]), ddx);// elimination
			}
    	}// juju

    }// kkautre

}
}// nbre

}// ii

var ng0=listecase[0]+listecase[1]+listecase[2]+listecase[3];
putmessage(scenario+"<br>"+ng0);
};

function newCard() {
	for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
	for (var i=0; i<acritalfa.length; i++) {
		var s=acritalfa[i];
		var t=s;
		if (s.length==4) {var t=s.substring(0,1)+ s.substring(3,4)}
		acritalfa[i]=t;
	}
	for (var i=0; i<M; i++) {contenudepart[i]=0}
	for (var i=0; i<N; i++) {knot[i]=false}
	for (var i=0; i<N; i++) {
		contentmemory[i]=new Array();
		contenureserve[i]=new Array();
		for (var step=0; step<100; step++) {//Reinits Array
			contentmemory[i][step]=new Array(M);			
			contenureserve[i][step]=new Array(M);			
		}
	}
	for (var i=0; i<M; i++) {contenureserve[i][0]=contenuinitial}
	for (var i=0; i<N; i++) {listescenarios[i]=new Array(); listenm[i]=new Array()}// Premier indice : numerr
	for (var i=0; i<1500; i++) {contenusgrilles[i]=new Array(M)}// Archives de grilles
	cleargrids();
	// Chargement configuration des filtres (de generation et de calcul), contraintes et options 
	chargementconfiguration();
// Chargement archives de base si pas encore mises par le webstorage avecla clefarchive ("llave")
	chargementarchive();
	voitcellulemethode('Lwlw');// pour clic sur methode unicite
	// Demarrage dans espace manuel avec grille aleatoire tres facile
	autreniveau=1;
	chargealeatoire();
	//
	valeurreduit();// commentaires calcul reduit et generation grille
	reamorceaide=true; // permet d'initialiser l'aide au calcul manuel
	voitcellule();// Pour la saisie de chiffres dans les cases, ou leur annulation
	changemethods("Etapes");// liste etapes
	changemanuel("starsmanuel");// espace calcul manuel
	recalcul=true;
	develop();// mode developpement ou pas, selon parametres
			recuperecontenu();
}

function develop() {
	// mode developpement
			var ele=document.getElementsByClassName("modedeveloppement");
			if (!MODEDEVELOPPEMENT) {
			 	ele[0].style.zIndex="0";
    		 	ele[0].style.opacity="0";
			 	ele[1].style.zIndex="0";
    		 	ele[1].style.opacity="0";
			 	ele[2].style.zIndex="0";
    		 	ele[2].style.opacity="0";
			}

}

function tableauassociatif() {
//  Enumeration tableau associatif
	var tableau={"un":1,"deux":2,"trois":3,"quatre":4};
	
	Object.keys(tableau).forEach(function(cle) {
	});
	
	var x=Object.keys(tableau).map(function(k) {return tableau[k]})

			var arrr=new Array(1,2,3,4,5,6,7,8,9,10);
            //var arrrList = Array.prototype.slice.call(arrr);


	
    //var tableau2 = Array.prototype.slice.call(arrr);// ok
    //var tableau2 = Array.prototype.slice.call(tableau);// faux
	var tableau2 = arrr.slice(4,8);// ok
		
	var y=Object.keys(tableau2).map(function(k) {return tableau2[k]})

}

function evalLink(lien) {// simulation click sur un lien 
   	window.location.href = document.getElementById(lien).href;
}
/*   		  <form>
				<a href="#" class="info" onClick="PrintOptions();"><img src="images/Impression.png" class="img img11" alt="Filtres et Options" /></a>
   		  </form>
*/
function PrintElem(elem)
{
	mywindow = window.open('', 'PRINT', 'fullscreen=yes, height=0,width=0');
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');
    return true;
}

function PrintEcran(taille, sigle, liste, writeok) {
	if (writeok) {
		mywindow = window.open('', 'PRINT', 'fullscreen=yes, height=0,width=0');
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />');
       	//mywindow.document.write('</head><link rel="stylesheet" rev="stylesheet" href="ecranannexe.css" type="text/css" /><body >');	
       	mywindow.document.write('</head><body >');
    	mywindow.document.write('<div id="starsannexe">');
        mywindow.document.write('<a href="javascript:close()"><span>Retour &agrave; l\'&eacute;cran principal</span></a>');
    	mywindow.document.write('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="javascript:print()"><span>Impression de cet &eacute;cran</span></a><br>');
    	mywindow.document.write('</div>');
    	mywindow.document.write('<br><b><br><b><u> '+liste+'</u></b><br><br>')
    		for (var i=0; i<taille+1; i++) {
        		var ident=i.toString()+sigle;
				mywindow.document.write(document.getElementById(ident).innerHTML+'<br>');
        	}
    	mywindow.document.write('</body></html>');
	} else {
		putmessage("Aucun élément à imprimer");
	}
	return true;
}

function PrintDiagramme() {
    document.getElementById(precheck).style.opacity="-1";
	window.print();
    document.getElementById(precheck).style.opacity="1";
}

function PrintOptions() {
    document.getElementById("Lala").style.opacity="-1";
	print();
    document.getElementById("Lala").style.opacity="1";
}

function affiche() {// Afficher toutes les cases sans le tableau interne et efface rouge
	afficheini();
}


function afficheini() {
	for (var ii=0; ii<M; ii++) {
			var currSquare = SQ + colPlace[ii];
            var content=document.getElementById(currSquare);
        	if (content.lastChild.nodeName=="TABLE") {content.removeChild(content.lastChild); }
			if (contenu[ii] == contenudepart[ii]) {// Valeurs initiales en bleu
					document.getElementById(currSquare).innerHTML = "<b><span style='color:#0080FF; font-size:xx-large'>"+contenu[ii]+"</span></b>";						
    		} else if (contenu[ii].length > 1) {// Autres valeurs en noir
					var x=contenu[ii].substring(0,TAILLECHIFFRES);
    				if (contenu[ii].length<=TAILLECHIFFRES) {document.getElementById(currSquare).innerHTML = "<span style='color:#000000; font-size:xx-large'>"+x+"</span>"}
			} else {// cases a un chiffre ??
					document.getElementById(currSquare).innerHTML = "<b><span style='color:#000000; font-size:xx-large'>"+contenu[ii]+"</span></b>";
    		}
		}
}

function desaffiche() {// N'afficher que les cases a un seul chiffre 
	//enleverougeetchiffre();
	for (var i=0; i<M; i++) {
			var currSquare = SQ + colPlace[i];
			if (contenu[i].length > 1) {
				document.getElementById(currSquare).innerHTML = " ";
			} else {
				if (contenu[i] != contenudepart[i]) {// Autres valeurs en noir sauf vides au depart
				   //if (etapecalcul>0) {document.getElementById(currSquare).innerHTML = "<b><span style='color:#000000; font-size:xx-large'>"+contenu[i]+"</span></b>"} else {document.getElementById(currSquare).innerHTML = " "}
				   document.getElementById(currSquare).innerHTML = "<b><span style='color:#000000; font-size:xx-large'>"+contenu[i]+"</span></b>";			
				} else {// Valeurs initiales en bleu
				   document.getElementById(currSquare).innerHTML = "<b><span style='color:#0080FF; font-size:xx-large'>"+contenu[i]+"</span></b>";			
				}							
			}
	}
}

function regenereaffiche() {// affiche() sans enleverougeetchiffre() ni TAILLECHIFFRES
	for (var ii=0; ii<M; ii++) {
			var currSquare = SQ + colPlace[ii];
            var content=document.getElementById(currSquare);
        	if (content.lastChild.nodeName=="TABLE") {content.removeChild(content.lastChild); }
			if (contenu[ii] == contenudepart[ii]) {// Valeurs initiales en bleu
				   document.getElementById(currSquare).innerHTML = "<b><span style='color:#0080FF; font-size:xx-large'>"+contenu[ii]+"</span></b>";						
    		} else if (contenu[ii].length > 1) {// Autres valeurs en noir
    				document.getElementById(currSquare).innerHTML = "<span style='color:#000000; font-size:xx-large'>"+contenu[ii]+"</span>";
			} else {// cases a un chiffre ??
				   document.getElementById(currSquare).innerHTML = "<b><span style='color:#000000; font-size:xx-large'>"+contenu[ii]+"</span></b>";
    		}
	}
	if (!modecreation) {coloris=true}
}

function affichageenvert(c) {
		 var vert=contenu[c];
		 document.getElementById(SQ+colPlace[c]).innerHTML = "<i><b><span style='color:#00B92F; font-size:xx-large'>"+vert+"</span></b></i>";
}

function putmessage(mess) {
	   document.getElementById("Message").innerHTML=tradacrit(mess);
}

function getmessage() {
       return document.getElementById("Message").innerHTML;
}

function basculef() {
			if(basculeaffiche) {
				var calcul=listecalcul.split(sep);
				enleverougeetchiffre();
				if (clickgauche) {regenereaffiche()} else {affiche()}
            	if ((choixetape<calcul.length) && (choixetape>0)) {
				   putmessage(choixetape+" "+listescenarios[numerr][choixetape]);
				   calc();// Pour recuperer la couleur
				}
			 } else {
			   desaffiche();
			 }
			 basculeaffiche=!basculeaffiche;
}

function StartTheTimer() {
	putmessage("Debut recherche grille "+itergen+" sur "+NBGENERE+" avec secs "+secs);
	if (secs==0)  {
		InitializeTimer();// Relance le calcul pour secs0 cas
    } else {
        self.status = secs
        secs = secs - 1;
		if (itergen>NBGENERE) {
			StopTheClock();// Fin generation
			putmessage("Fin de la generation de grilles");
		   	changemethods("Grilles");
			itergen=1;
		} else {		
			generer();
			choixetape=0;
			//recuperecontenu();
			itergen=itergen+1;
			timerRunning = true;
            timerID = self.setTimeout("StartTheTimer()", delay);
            //timerID = setInterval(function(){StartTheTimer()}, delay);
		}
    }
}

function InitializeTimer() {
	itergen=0;
	// Set the length of the timer, in seconds
	secs = secs0;
    StopTheClock();
	StartTheTimer();
}

function StopTheClock() {
	if (timerRunning) {
        clearTimeout(timerID);
    	timerRunning = false;
	}
}

function mapause(time) {
	d=new Date();
	while(1) {
		n=new Date();
		if ((n-d)>time) {break}
	}
}
