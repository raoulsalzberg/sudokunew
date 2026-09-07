function voitcellule() {
oTable = document.getElementById('Lala');
oTD = oTable.getElementsByTagName('td');
var nb = oTD.length;
oTH = oTable.getElementsByTagName('th');
var nh = oTH.length;
for( i=0; i < nb; i++){
     icurnew="";
	 // affecte la fonction mouseover
	 oTD[i].onmouseover = function(){
		icurnew=this.id;
		if (icurnew.split(SQ)[0].length<icurnew.length){// Entree dans une cellule
			contentnew=document.getElementById(icurnew);
    		    if (icur!=icurnew) {// Soit provenance d une autre case : icur contient une table (cas 5) ou pas (cas 6) , soit de l exterieur (cas 1)          	
					if (icur.split(SQ)[0].length<icur.length){// Provenance d une case 
            			var content=document.getElementById(icur);
                    	if (content.childNodes.length>1) {// cas 5 : effacer table creee dans icur
							if (content.lastChild.nodeName=="TABLE") {content.removeChild(content.lastChild); }
            			}
					}// icur split
					// provenance case ou exterieur (cas 1, 5 et 6)
					// creer table dans icurnew (enregistre dans icur)  				
        			icur=icurnew;
            		var textcur=icur.split(SQ)[1];
            		var i0=textcur.substring(0,1);
            		var i2=textcur.substring(1,2)-1;
            		var i1=i0.charCodeAt(0)-65;
            		var ii=9*i2+i1;
					var itest=document.getElementById(icur);
							this.ondblclick=function() {// soit en mode creation soit en mode manuel
									 if (icurnew.split(SQ)[0].length<icur.length){// case en cours
										flagvariante="";
                                        var textcur=icurnew.split(SQ)[1];
                                        var i0=textcur.substring(0,1);
                                        var i2=textcur.substring(1,2)-1;
                                        var i1=i0.charCodeAt(0)-65;
                                        var ii=9*i2+i1;
										if (contenu[ii].length==1) {// Suppression si case a un chiffre
											TraceH="";
											if (!modecreation) {// Mode manuel hors creation
            										var num=contenu[ii];
                                                	//validsaisie();// pour message sous icône validation methode : obsolete
                                            		origin="S"+ii+""+num;// pour listecalcul utilise dans le calcul et dans calculetape()
													origincrash=false;
                                        			numerohypothese=numerr;
														if (choixetape==0) {for (var pp=0; pp<M; pp++) {contentmemory[numerr][choixetape][pp]=contenu[pp]}}
                                                    	// Grille sans cette disposition erronee : case ii avec la valeur sans les chiffres vus
														reinitialisecase(ii);
														if (contenu[ii].length>1) {
    														etapeenjaune(choixetape);
                											scenario="Suppression manuelle "+colPlace[ii]+"="+num+" dont le contenu redevient "+contenu[ii]+tradacrit(" sans reconstitution possible des chiffres-candidats concernés");
    														if (contenuok[ii]!=num) {scenario=scenario+" !"}
//    														putmessage(scenario);
    														listescenarios[numerr][choixetape+1]=scenario;
															listenm[numerr][choixetape+1]=elaborenm();
                                                			wscen=scenario;
                                                			enleverougeetchiffre();
                                                			contentmemory[numerr][choixetape+1]=new Array(M);//Reinits Array
    														for (var pp=0; pp<M; pp++) {contentmemory[numerr][choixetape+1][pp]=contenu[pp]}
    														crashtext[numerohypothese]=scenario;
    														choixcalculmanuel();
															affiche();
														} else {
															putmessage("<u><b>Attention</b></u> pas de suppression possible de chiffre affecté à une case où ce chiffre est imposé");
														}
											} else if (contenudepart[ii]>0) {// Mode creation : eliminee de la grille de depart
												contenudepart[ii]=0;
    											contenu[ii]=contenuinitial;
                                            	// Reinitialise la grille sans cette disposition erronee
        										reinitialisegrille();
											}// modecreation
											desaffiche();
										}// contenu.length
									 }// icurnew.split 
							}// on double click
							if (contenu[ii].length>1) {creetable(ii)};// Creer table : cas 5  et 6
    			}// icur!=icurnew
		}// split
	 }// mouseover
}//i
for( i=0; i < nh; i++){
	 // affecte la fonction mouseover
	 oTH[i].onmouseover = function(){
					if ((icur!="") && (icur.split(SQ)[0].length<icur.length)) {// Provenance d une case 
            			var content=document.getElementById(icur);
                    	if (content.childNodes.length>1) {// cas 5 : effacer table creee dans icur
							if (content.lastChild.nodeName=="TABLE") {content.removeChild(content.lastChild); }
            			}
					}// icur split
					icur="";
	 }
}// i
}

function reinitialisecase(case1) {
	var re=/\d/g;
	contenu[case1]=contenuinitial;
	var hh=parseInt(case1/9);
	var vv=case1-9*hh;
	var ii=carre[case1]-1;
	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) puis sudoku carre (lc=3)
		for (var j=0; j<9; j++) {//  indice de case
			switch (lc) {
	  			case 0: // Ligne de case1
					var h=j+9*hh;
					break;
	  			case 1: // Colonne de case1
					var h=vv+9*j;
					break;
	  			case 2: // Bloc de case1
					var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii; 
					break;
				default:
					break;
			}// switch
			var n=contenu[h];
    		if ((h!=case1) && (n.length==1)) {
        		//Elimination du chiffre n dans case1
				var ref=contenu[case1].toString();
				var cref=ref.match(re);
				var newc="";
				for (var hnum=0; hnum<cref.length; hnum++) {
					if (cref[hnum]!=n) {newc=newc+cref[hnum]}
				}
				contenu[case1]=newc;
			}
		}// j
	}// lc
}

function creetable(hk) {
		var posk=contenu[hk];
		// Reference vers icur = squarexx
        var celcase = document.getElementById(icur);
        // cree un element <table> dans la case icur
		table     = document.createElement("table");
        celcase.appendChild(table);
		table.style.border="3px solid blue";
		table.style.width="100px";
        for (var j=0; j<3; j++) {
    		// cree une ligne de tableau sur cette table
            row = document.createElement("tr");
            table.appendChild(row);
    		row.style.padding=0;
    		row.style.border="1px solid blue";
    		row.style.spacing=0;
    		// cree les elements td de cette ligne
    		for(var i = 0; i < 3; i++) {
                   cell = document.createElement("td");
                   row.appendChild(cell);
    			   cell.style.padding=0;
    			   cell.style.border="1px solid blue";
    			   cell.style.spacing=0;
    			   cell.style.fontSize="x-large";
				   var ii=3*j+i+1;
        		   if ((posk+"").split(ii)[0].length<posk.length) {
				   	  	   cell.innerHTML=ii;
    					   //cell.style.width="50";
				   } else {
				   	  	   cell.innerHTML="";				   
				   }// split
            }// i
		}// j
		setTimeout(autoriseclick,300); 
}

function autoriseclick() {	
		// Ecoute sur les cases du tableau interne
		xTD = table.getElementsByTagName('td');
        for (var i=0; i<xTD.length; i++) {
			if (xTD[i].innerHTML.length>0) {
    			xTD[i].id="xx "+(i+1);
				xTD[i].onclick=function(){// Selectionne un chiffre avec click gauche
					if (crashmanuel || origincrash) {
						putmessage("<u><b>Attention</b></u> ; crash grille en cours, annuler la dernière opération manuelle pour continuer la résolution en manuel"); 
                	} else if (choixetape<etapecalcul) {
                		putmessage("<u><b>Attention</b></u> ; opération manuelle non autorisée en milieu de calcul"); 
                	} else {
						if (pasrouge(this.id)) {
							if (inversionchiffres) {affectecase(this.id); listecorr[numerohypothese]=listecalcul; enleverougeetchiffre(); desaffiche()} else {effaceunchiffre(this.id); enleverougeetchiffre(); affiche()}
						} else {
							putmessage("<u><b>Attention</b></u> ; impossible de sélectionner un chiffre éliminé par l\'opération manuelle précédente"); 
						}
    				}
				}
    			xTD[i].onmousedown=function(event) {// Efface chiffre avec click droit
					if (crashmanuel || origincrash) {
                		putmessage("<u><b>Attention</b></u> ; crash grille impossible en cours, annuler la dernière opération manuelle pour continuer la résolution en manuel"); 
                	} else if (choixetape<etapecalcul) {
                		putmessage("<u><b>Attention</b></u> ; opération manuelle non autorisée en milieu de calcul"); 
					} else {
						if (pasrouge(this.id)) {
							if(navigator.appName != "Microsoft Internet Explorer") {if(event.which>1) {effaceunchiffre(this.id); return false}}
                        	else if(window.event.button>1) {effaceunchiffre(this.id); return false}
                        	return true;
						} else {
							putmessage("<u><b>Attention</b></u> ; impossible d'éliminer un chiffre déjà éliminé par l\'opération manuelle précédente"); 
						}
					}
					return;
                }			
			}// XTD.length 			
    	}// i
}

function pasrouge(idname) {
	var num=idname.substring(3,4);// choix du nombre dans la case
    var content=document.getElementById(icur).innerHTML;
	var k=">"+num;
	var zz=content.split(k)[0];
	var l=zz.length+1;
	var m=NPREPRINT.length;
	var j=NPREPRINT.substring(0,NPREPRINT.length-1);
	return (zz.substring(l-m,l)!=j);
}

function chiffrevu(case1, chiffre) {
	// Affectation chiffre a la case case1, si ce chiffre n'est pas affecte a une case vue de case1
	var re=/\d/g;
	var hh=parseInt(case1/9);
	var vv=case1-9*hh;
	var ii=carre[case1]-1;
	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) puis sudoku carre (lc=3)
		for (var j=0; j<9; j++) {//  indice de case
			switch (lc) {
	  			case 0: // Ligne de case1
					var h=j+9*hh;
					break;
	  			case 1: // Colonne de case1
					var h=vv+9*j;
					break;
	  			case 2: // Bloc de case1
					var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii; 
					break;
				default:
					break;
			}// switch
			var n=contenu[h];
    		if ((h!=case1) && (n.length==1) && (n==chiffre)) {return h}// Case vue a un chiffre contenant chiffre
		}// j
	}// lc
	// Affectation chiffre a la case case1
	var x=contenu[case1];
	var ch=x.match(re);
	var newcase="";
	var chiffreint=chiffre;
	for (var i=0; i<ch.length; i++) {
		var x=ch[i];
		if (chiffreint<x) {newcase+=chiffre+""+x; chiffreint=10} else {newcase+=x}
	}
	contenu[case1]=newcase;
	affiche();
	kritmanuel=false;
	return M;
}
function verifchiffrevu(case1, chiffre) {
	// Verification si chiffre n'est pas affecte a une case vue de case1
	var re=/\d/g;
	var hh=parseInt(case1/9);
	var vv=case1-9*hh;
	var ii=carre[case1]-1;
	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) puis sudoku carre (lc=3)
		for (var j=0; j<9; j++) {//  indice de case
			switch (lc) {
	  			case 0: // Ligne de case1
					var h=j+9*hh;
					break;
	  			case 1: // Colonne de case1
					var h=vv+9*j;
					break;
	  			case 2: // Bloc de case1
					var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii; 
					break;
				default:
					break;
			}// switch
			var n=contenu[h];
    		if ((h!=case1) && (n.length==1) && (n==chiffre)) {return h}// Case vue a un chiffre contenant chiffre
		}// j
	}// lc
	kritmanuel=false;
	return M;
}

function mainraz() {
	modecreation=false;
	if (reamorceaide) {// calcul non effectue
    	if (AIDESAISIEMANUELLE) {
// chercher la solution dans le tableau solutiongrille, selon archiveencours dans le tableau archivesgrilles et grilleencours dans le tableau nomsgrille 
// ensuite selon la case activee dans le tableau interne donnant scenario
				departverscontenu();
				affiche();
        		numerohypothese=0;
				choixetape=0;
        		clearsteps();
				clearArrays();// Reinitialise les tableaux listescenarios et contentmemory
				clearhypotheses(); // efface les hypotheses
    			putmessage("Assistance au calcul manuel activée");
    	}
    			// Créer ligne etape initiale
        		scenario="Grille initiale";
        		numerr=0;
        		choixetape=0;
				listescenarios[numerr][choixetape]=scenario;
				listenm[numerr][choixetape]=elaborenm();
        		for( var i=0; i<M; i++) {contenu[i]=contenusaisie[i]}
				ajoutstepreinit();		
    	listecalcul="0";
		etapeini=0;
	} else {// calcul effectue
			// actualise listecalcul entre 0 et choixetape
			var calcul=listecalcul.split(sep);
			listecalcul="0";
			for (var i=1; i<choixetape+1; i++) {listecalcul+=sep+calcul[i]}	
			//choixetape+=1;
			etapeini=choixetape;
			clearsteps();
			clearArrays();// efface les zones posterieures des tableaux listescenarios et de contentmemory selon numerohypothese et choixetape
			//choixetape+=-1;
	}
	origincrash=false;
	crashmanuel=false;
	clearvariantes();
	affiche();
}

function annulation() {
	if (!modecreation) {
	   flagvariante="";
	   if (choixetape<etapecalcul) {choixetape+=1}
	   etapeenjaune(choixetape);
	   oTable = document.getElementById('Lulu');
       oTD = oTable.getElementsByTagName('td');
	   crashmanuel=false;
       // actualise listecalcul entre 0 et choixetape
       var calcul=listecalcul.split(sep);
       listecalcul="0";
       for (var i=1; i<choixetape; i++) {listecalcul+=sep+calcul[i]}	
	   etapeenblanc(choixetape-1);
	   etapecalcul=choixetape;
       clearstepsmanuel();// Efface la derniere etape
	   clearArrays();// efface les zones posterieures des tableaux listescenarios et de contentmemory selon numerohypothese et choixetape
   	   etapecalcul=choixetape-1;
   	   etapeini=etapecalcul;
   	   if (etapeini==0) {
			for (var i=0; i<M; i++) {contenu[i]=contenusaisie[i]}
   			//departverscontenu();
   			afficheini();			
   		} else {
			choixetape-=1;
			regenereaffiche();
			selectstep(etapeini);		
		}
   		putmessage("Effacement étape "+(etapecalcul+1))
		origincrash=false;
		changemethods("Etapes");
	} else if (choixetape>0) {
   		putmessage("Effacement étape de saisie "+(choixetape))
	  	choixetape-=1;
		for (var i=0; i<M; i++) {contenu[i]=contenureserve[i][choixetape]}
		desaffiche();
	} else if (choixetape==0) {
	  	putmessage("Grille vide étape "+choixetape);
	}
}


function clearArrays() {// Selon la modification numerohypothese et l'etape choixetape
	if (numerr>0) {
    	// Efface les tableaux des modifications ulterieures de la modification en cours
		for (var nr=numerr; nr>numerohypothese; nr--) {
    		var lengthetapes=listescenarios[nr].length;
    		for (var j=0; j<lengthetapes; j++) {contentmemory[nr][j]=[]}
    		listescenarios[nr]=[];
			listenm[nr]=[];
    	}
	}
	// Efface, pour la modification numerohypothese, les tableaux des etapes ulterieures a choixetape : listescenarios et contentmemory
    		var lengthetapes=listescenarios[numerohypothese].length;
    		for (var j=lengthetapes; j>choixetape; j--) {contentmemory[numerohypothese][j]=[]}
	// Regenere listescenarios des premieres etapes
			var scenmiddle= new Array();
			var nmmiddle= new Array();
			scenmiddle=listescenarios[numerohypothese];
			nmmiddle=listenm[numerohypothese];
			listescenarios[numerohypothese]=[];
			listenm[numerohypothese]=[];
			for (var j=0; j<choixetape; j++) {listescenarios[numerohypothese][j]=scenmiddle[j]; listenm[numerohypothese][j]=nmmiddle[j]}
}

function clearhypotheseafter() {
    	// Efface la liste des hypotheses ulterieures
		oTable = document.getElementById('Lyly');
    	oTR = oTable.getElementsByTagName('tr');
    	for (var i=oTR.length-1; i>numerohypothese+3; i--) {
			var disparu=oTable.removeChild(oTable.lastChild);
		}

}

function choixcalculmanuel() {// Creation grille ou resolution grille
// Regroupe les 4 operations manuelles : 
// - Disposition chiffre (clic gauche tableau interne sur chiffre-candidat), 
// - Effacement chiffre (clic droit tableau interne)
// - Depositionnement chiffre (double-click sur chiffre de case ou retour arriere), 
// - Ajout chiffre (clic gauche tableau interne sur case vide)  ??
	etapecalcul=choixetape;
	etapeini=choixetape;
	etapeenjaune(choixetape);
	oTable = document.getElementById('Lulu');
    oTD = oTable.getElementsByTagName('td');
	choixetape=oTD.length-1;
		//choixetape=choixetape+1;
		listescenarios[numerr][choixetape+1]=scenario;
		listenm[numerr][choixetape+1]=elaborenm();
		modecreation=false;
		clickmethode=false;
		if (flagvariante!="") {origin=flagvariante}
		crashmanuel=origincrash;
		// reinitiliser listecalcul jusque choixetape
		var listepre=listecalcul;
		var calcul=listecalcul.split(sep);
		listecalcul="0";
		for (var i=1; i<choixetape+1; i++) {listecalcul=listecalcul+sep+calcul[i]}
		listecalcul=listecalcul+sep +origin;
		AIDESAISIEMANUELLE=testcheck();
		if (kritmanuel && AIDESAISIEMANUELLE) {scenario=scenario+" !"}					
		ajoutstep();// Ajout ligne de etape modifiee
	etapeini=choixetape;
		origincrash=false;
		doublecrash();// Doublon (variete 0) ou chiffre manquant dans une zone sudoku (variete 1) ou 2 seuls chiffres dans une case (variete 3)
    	if (!origincrash) {nplusunecasespournchiffres()}// Pas assez de chiffres pour le nombre de cases (variete 2)
		if (origincrash) {
			choixetape+=1;
			ajoutstep();// Ajout ligne du_ crash
			putmessage(scenario+". Grille impossible du fait de la dernière modification manuelle. Annuler cette opération pour pouvoir continuer la résolution manuelle");
		} else {
			putmessage(choixetape+"- "+scenario);		
		}
		etapecalcul=choixetape;
		numinter=-1;
		contentmemory[numerr][choixetape]=new Array(M);//Reinits Array
		for (var i=0; i<M; i++) {contentmemory[numerr][choixetape][i]=contenu[i]}
    	//test solution
    	etapeini=choixetape;
		etapeenblanc(choixetape+1);
		changemethods("Etapes");
		verifsolution();
}

function verifsolution() {
	enleverougeetchiffre();
    for (var i=0; i<M; i++) {
    	if (contenu[i].length!=1) {break}
    }
	if (i==M) {// solution
		var choixetapefinale=choixetape;
		scenario=tradacrit("Grille finale Solution. Bravo ! Vous avez réussi à bien résoudre cette grille");
		listescenarios[numerohypothese][choixetape]=scenario;
		clearsteps();
		listesteps();
		etapecalcul-=1;
		ajoutstep();// Ajout ligne de la solution
		putmessage(choixetapefinale+"- "+scenario);
	}
}

function affectecase(idname) {// Imposer un chiffre a une case (clic gauche sur tableau interne)
// (creation de grille ou ajout hypothese, avec remise a zero, y compris les candidats deja elimines)
// identifier le chiffre num et la case ii
	clickgauche=true;
	flagvariante="";
	var num=idname.substring(3,4);// choix du nombre dans la case
    var textcur=icur.split(SQ)[1];
    var i0=textcur.substring(0,1);
    var i2=textcur.substring(1,2)-1;
    var i1=i0.charCodeAt(0)-65;
    var ii=9*i2+i1;
	// Positionnement
		enleverougeetchiffre();
		if (!modecreation) {coloris=true}
		for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
    	var re=/\d/g;
		var ch=contenu[ii].toString().match(re);
		if (contenu[ii].split(num)[0].length<contenu[ii].length) {//num contenu dans contenu[ii]
			//Verifier que ce chiffre num n est pas deja affecte a un case vue de ii
			var x=verifchiffrevu(ii, num);
			if (x==M) {
        		affiche();
				for (var hnum=0; hnum<ch.length; hnum++) {if (num!=ch[hnum]) {eliminationnumero(ii,ch[hnum])}}// rougit sans modification    
        		var contenupre=contenu[ii];
    			contenu[ii]=num;// pour rougir effet
    			if (modecreation ) {// Initialisation et affichage pour saisie nouvelle grille
					wscen="";
        			contenu[ii]=num;
					elim(ii);
        	   		// initialisation dans contenudepart
        			contenudepart[ii]=num;
        			desaffiche();
    	   if (modecreation) {
		   	  choixetape+=1; 
    	   	  for (var i=0; i<M; i++) {contenureserve[i][choixetape]=contenu[i]};
    	   	  putmessage("Positionnement chiffre "+num+" dans case "+colPlace[ii]);
		   	  return;
		   }
 
        		} else {// pour selection manuelle
					//choixetape=choixetape+1;
    				etapecalcul=choixetape;
    				scenario=noeffect;
    				empile=0;
            		wlocal=[];
    				empileplus=0;
    				wscen=tradacrit("Sélection manuelle ");
        			contenudepart[ii]=num;
        			if (CASCADEIN) {
        				var newcol=false;
            			if (coloris) {var newcol=true}
            			coloris=true;
						elim(ii);// Elimination de ce chiffre dans les cases ou il est vu
            			if (!newcol) {
                			coloris=false;
            			}
        			} else {
        				elim(ii);// Elimination de ce chiffre dans les cases ou il est vu
        			}
    				origin="K"+ii+""+num;// pour listecalcul utilise dans le calcul
            		contenu[ii]=contenupre;
    				if (scenario==noeffect) {
    					scenario=tradacrit("Sélection manuelle "+colPlace[ii]+"="+num+". Cette sélection est un solo."); 
						verifsolution();
        				wscen=scenario;
    				}
    				kritmanuel=(contenuok[ii]==num);
					choixcalculmanuel();
        		}
			} else {
				putmessage("<u><b>Attention</b></u> : le chiffre "+num+" contenu dans "+colPlace[ii]+" ne peut lui être affecté, car il l'est déjà dans une case en vue "+colPlace[x]);
			}
		} else {
	  		// Ajout du chiffre num à cette case, s'il n'est pas vu
			var x=chiffrevu(ii, num);
			if (x==M) {
				origin="L"+ii+""+num;
				scenario="Ajout du chiffre "+num+" dans "+colPlace[ii]+"="+contenu[ii]; 
				putmessage(scenario);
    			wscen=scenario;
				choixcalculmanuel();			
			} else {
				putmessage("Le chiffre "+num+" ne peut être ajouté à la case "+colPlace[ii]+"="+contenu[ii]+" car contenu dans la case "+colPlace[x]+"="+contenu[x]);
			}
		}
}

function effaceunchiffre(idname) {// clic droit dans tableau interne
// identifier le chiffre num et la case ii
	clickgauche=false;
	flagvariante="";
	var num=parseInt(idname.substring(3,4));// choix du nombre dans la case
	var textcur=icur.split(SQ)[1];
    var i0=textcur.substring(0,1);
    var i2=textcur.substring(1,2)-1;
    var i1=i0.charCodeAt(0)-65;
    var ii=9*i2+i1;
	if (!modecreation) {// pour hypothese en cours de calcul uniquement et si case a plus de 2 chiffres (privilegier la selection a la suppression de chiffre)
    	if (contenu[ii].split(num)[0].length<contenu[ii].length) {//num contenu dans contenu[ii]
    		if (contenu[ii].length>2) {
    			enleverougeetchiffre();
				affiche();
    			coloris=true;
    			for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
    			eliminationnumero(ii,num);
            	scenario=tradacrit("Opération de suppression manuelle : pas de ")+num +" dans "+colPlace[ii];
        		origin="C"+ii+""+num;// pour listecalcul utilise dans le calcul
				kritmanuel=(contenuok[ii]!=num);
    			choixcalculmanuel();
    		} else {
    		  putmessage ("<u><b>Attention</b></u> : la case "+colPlace[ii]+" ne contenant plus que 2 chiffres, sélectionner un chiffre au lieu d'invalider l'autre");
    		}
    	} else {
	  	   	putmessage("<u><b>Attention</b></u> : chiffre "+num+" non contenu dans "+colPlace[ii]+" car éliminé dans la derniere etape");
    	}// num contenu
	}// 
}

function tronquelistes() {// Tronque listecalcul et listescenarios entre choixetape et calcul.length
			   var calcul=listecalcul.split(sep);
			   if (calcul.length!=(choixetape+1)) {// Si egal : tronquage inutile
	   		   	  		for (var iv=(calcul.length); iv>choixetape; iv--) {listescenarios[numerr][iv]=""; listenm[numerr][iv]="010"}// listenm par defaut 010
            	   		listecalcul="0";
            	   		for (i=1; i<choixetape; i++) {listecalcul=listecalcul+sep+calcul[i]}
        	   }
}
