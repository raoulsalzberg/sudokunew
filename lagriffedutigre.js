function lagriffedutigre() {
	var re=/\d/g;
	maxvarencours=0;
    variete=0;
	contenudepart=[];
	for (var i=0; i<M; i++) {contenudepart[i]=contenu[i]}
	for (var i=0; i<NCHAIN; i++) {
		knot[i]=M;
		chiffreknot[i]=0;
		casexy[i]=M;
		chiffrexy[i]=0;
	}
	for (var i=0; i<M; i++) {// Case de depart
		for (var j=0; j<9; j++) {casearrivee[j]=M; minarrivee[j]=M; scenarrivee[j]=""}// Reinitialisation pour la case i
		taillearrivee=0;// Nombre de cases d'arrivee pour la meme case de depart
		indicearrivee=0;// Indice de la case d'arrivee en cours parmi les cases d'arrivee possibles
		var ch=(contenu[i]+"").match(re);
		if (ch.length==2) {
		   for (var valeur=0; valeur<2; valeur++) {// Un chiffre puis l'autre			   
			   chiffredepart=ch[valeur];
			   casedepart=i;
			   variete=0;
			   // Recherche case de 2 chiffres contenant le chiffre chiffrexy[xychain] et voyant casexy[xychain] ou xychain eclate
							   xychain=0;
							   sortiexy(i, ch[1-valeur]);
    		   if (scenario!=noeffect) {
    			   if (!clickmethode) {
        			   	maxvarencours=2;
		messageencours=scenardetail+"<br>b<br>";
						elaborevariantexychainnew();
						scenario="XY-Chain "+scenario;
    					return;
    			   }
			   }
    		   //if ((scenario!=noeffect) && !clickmethode) {return}
		   }// valeur
		}// ch.length==2
		// Enregistrement des scenarios differents et minimums de cette case de depart i, selon les cases d'arrivee (taillearrivee cases d'arrivee possibles < 20)
		// Tableau scenarrivee range dans le menu variantes
		if (clickmethode) {
			if (taillearrivee>0) {// Elimination des reverse
    			for (var jaffiche=0; jaffiche<taillearrivee; jaffiche++) {
        			var scenxy=scenarrivee[jaffiche];
					var chiffreencours=scenxy.substring(0,1);
    				var caseencours=scenxy.substring(2,4);
    				var casefinale=scenxy.substring(scenxy.length-4, scenxy.length-2);
    				var previousmax=maxvarencours;
        			var doublescen=false;
    				for (var jprev=1; jprev<previousmax; jprev++) {// Variantes previous
        				var dejafait=tableauvariante[jprev];
        				var chiffreprev=dejafait.substring(0,1);
        				var caseprevini=dejafait.substring(2,4);
        				var caseprevfin=dejafait.substring(dejafait.length-4, dejafait.length-2);
    					if ((chiffreencours==chiffreprev) && (caseencours==caseprevfin) && (casefinale==caseprevini)) {doublescen=true; break}// Reverse
        			}				
    				if (!doublescen) {// Variante sans doublon a valider
						maxvarencours+=1;
						tableauvariante[maxvarencours] ="XY-Chain "+scenarrivee[jaffiche]+"$"+variete;
    				}
        		}// jaffiche
			}// taillearrivee
		}// clickmethode
	}// i
	maxvarencours+=1;
}

function blocxynew() {
	var re=/\d/g;
   	var newcase=casexy[xychain-1];
   	var chiffreex=chiffrexy[xychain-1];
	if (xychain>1) {
			bouclagexy(newcase, chiffreex);			
			if (scenario!=noeffect) {
				  if (clickmethode) {// Gestion des chaines minimales si click sur la methode
					  for (var jarrivee=0; jarrivee<taillearrivee; jarrivee++) {
    					  if (newcase==casearrivee[jarrivee]) {indicearrivee=jarrivee; break}
    				  }
    				  if (jarrivee<taillearrivee) {// Case d'arrivee deja vue precedemment, verifier si sa longueur de chaine est minimale
    				       	if (xychain<minarrivee[indicearrivee]) {
                            	minarrivee[indicearrivee]=xychain;
    		scenardetail+="<br>"+scenario+"<br>";
								enregistrescenarioxychain();// Enregistrement de ce nouveau cas de case d'arrivee en cours avec l'indice indicearrivee
    						}				  	  
    				  } else {// Case d'arrivee nouvelle
    						casearrivee[taillearrivee]=newcase;
    						indicearrivee=taillearrivee;// Cas d'arrivee en cours en fin de liste --> indice pour la case d'arrivee suivante
                            minarrivee[indicearrivee]=xychain;// Longueur de chaine de reference
    				  		taillearrivee=taillearrivee+1;// Nombre de cases d'arrivee differentes
    		scenardetail+="<br>"+scenario+"<br>";
							enregistrescenarioxychain();// Enregistrement 1er cas de nouvelle case d'arrivee
    				  }
    				  //derougir();
					  scenario=noeffect;
				  }
				  return;
   			}
	}// xychain>1
   for (var ischain=0; ischain<3; ischain++) {
	for (var lc=0; lc<3; lc++) {
		   for (var k=0; k<9; k++) {// Recherche case h vue de newcase sur ligne, colonne ou bloc
               // Case vue de newcase, sur axe lc et position k, contenant chiffreex, pas encore traitee, de longueur superieure a 1
			   var h=caseenvue(newcase, lc, k, chiffreex);
			   var cpr=M;
			   if ((xychain>3) && (h!=M)) {// cas exclu : h voit la case en position (xychain-3) et est en lien indirect
			   	  if ((chiffreex==chiffrexy[xychain-2]) && (chiffreex==chiffrexy[xychain-1])) {
				  	 var cpr=casexy[xychain-3];
					 if ((parseInt(h/9)==parseInt(cpr/9)) || ((h-9*parseInt(h/9))==(cpr-9*parseInt(cpr/9))) || (carre[h]==carre[cpr])) {
					 	// Annuler ce lien indirect, en revenant 2 cases en arriere dans la chaine
						return;
					 }
				  }
			   }
			   if (h!=M) {
				  var posk=contenu[h];
				  var cref=posk.match(re);
					  if ((ischain==0) || (ischain==2)) {var jsmax=1} else if (ischain==1) {var jsmax=2}
					  for (var js=0; js<jsmax; js++) {
        				  var chiffre=0;
        				  var autrechiffre=0;
						  switch(ischain) {
            				  	case 0 :// Cas de base
									if (contenu[h].length==2) {
            							   chiffre=cref[0];
            							   if (chiffre==chiffreex) {chiffre=cref[1]}
            						}
            						break;
            					case 1:// 2 possibilites sur case a 3 chiffres : raccords direct (case dans la chaine) ou indirect (case exterieure) sur chiffre et autrechiffre
                        			 if (contenu[h].length==3) {
    									 // chiffreex amont, (chiffre - autrechiffre) = (aval sur case suivante - raccord sur case dans la chaine ou exterieure)
										 for (var ischiffre=0; ischiffre<3; ischiffre++) {// 2 cas : chiffre - autrechiffre ou autrechiffre - chiffre
                            				 if (cref[ischiffre]!=chiffreex) {
                            				 	if (chiffre==0) {
                            					   chiffre=cref[ischiffre];
                            					} else if (autrechiffre==0) {
                            					   autrechiffre=cref[ischiffre];
                            					}
                            				 }
                            			 }
										 if (js==1) {// chiffre - autrechiffre --> autrechiffre - chiffre
										 	var interm=chiffre;
											chiffre=autrechiffre;
											autrechiffre=interm;
        								 }
										 if (raccordxy(h, chiffre, autrechiffre, newcase, chiffreex)==M) {//  Pas de raccord sinon case exterieure ou case previous de la chaine
        									  chiffre=0;
											  if (js==1) {// Pas de raccord
    											  knot[xychain]=M;
    											  chiffreknot[xychain]=0;
											  }
										 }
									 }
            						 break;
            					case 2:// Lien indirect sur hsuite a 2 chiffres en lien fort avec h par chiffreex et ne faisant pas partie de la chaine
									 chiffre=0;
		                			 var hplus=caseaveclienfort(lc, h, chiffreex);// 2 cas possible de lc
                					 if (hplus!=M) {// lien indirect
											// Enregistrer h puis hplus avec chiffreex
											casexy[xychain]=h;
            								chiffrexy[xychain]=chiffreex;
                                  			xychain=xychain+1;
            								chiffre=chiffreex;
    										h=hplus;// Mais, la case suivante par chiffre ne doit pas voir casedepart ni newcase ?
        							 }
									 break;
						  }// switch ischain
        				  if (chiffre!=0) {
                       			casexy[xychain]=h;
                               	chiffrexy[xychain]=chiffre;
                    			xychain=xychain+1;
                    			blocxynew();//Reentrant avec la case suivante
                        		xychain=xychain-1;
                        		knot[xychain]=M;
                        		casexy[xychain]=M;
                        		chiffreknot[xychain]=0;
								if (ischain==2) {// annulation lien indirect
								   knot[xychain]=M;
								   xychain=xychain-1;
								} else {// Pour test annulation indirection
								  chiffrexy[xychain]=0;
								}
                    			if ((scenario!=noeffect) || (xychain>MAXGRIFFE)) {
								 return}// depilement avec longueur de chaine MAXGRIFFE pour relance
        				  }// chiffre != 0
					  }// js
			 }// h!=M
    	 }// k
    }// lc
  }// ischain
}

function decorticxy() {
		 // Etablissement des tableaux casexy, chiffrexy, knot et chiffreknot a partir du scenario tronque (groupes de 5 caracteres : -n-hh)
		 // visualisationchaine est devenu faux (tableaux knot et chiffreknot expurges)
		 var ik=0;
		 var td="";
		var xy="XY-Chain ";
		if (scenario.split(xy)[0].length<scenario.length) {scenario=scenario.split(xy)[1]}
		 var scenvu=scenario.split("<br>")[0];
		 xychain=parseInt((scenvu.length)/5)-1;
		 for (var i=0; i<xychain+1; i++){
			 knot[i]=M;
			 var ivu=scenvu.substring((5*i), (5+5*i));
			 var chiffrev=ivu.substring(0,1);
			 var casev=ivu.substring(2,4);
			 var cs=decodagecolPlace(casev);
			 var aster=ivu.substring(1,2);
			 if(aster=="*") {// Element raccord en i --> case suivante en (i+1)
				ik=ik+1;
			 	knot[i-ik]=cs;
				chiffreknot[i-ik]=chiffrev;
			 } else {
				casexy[i-ik]=cs;
    			chiffrexy[i-ik]=chiffrev;
				td=td+chiffrev+"-"+colPlace[cs]+"-";
			 }
		 }
		 xychain=xychain-ik;
}

function elaborevariantexychainnew() {
       		var re=/\d/g;
		var xy="XY-Chain ";
	if (nmetref>0) {
		scenario=tableauvariante[nmetref];
		if (scenario.split(xy)[0].length<scenario.length) {scenario=scenario.split(xy)[1]}
		var scenarioint=scenario;
		chiffredepart=scenarioint.substring(0,1);
		var caseini=scenarioint.substring(2,4);
		var casefin=scenarioint.substring((scenarioint.length-6), (scenarioint.length-4));
		// Sauf case raccord finale
		if (scenarioint.substring((scenarioint.length-7),(scenarioint.length-6))=="*") {casefin=scenarioint.substring((scenarioint.length-11), (scenarioint.length-9))}
		casedepart=decodagecolPlace(caseini);
		var lastc=decodagecolPlace(casefin);
		// Elimination de chiffredepart dans les cases voyant les cases extrêmes de la chaine, casedepart et lastc, puis affichage du message
		scenardetail+="<br><br>Elimination du chiffre "+chiffredepart+" dans les cases voyant les cases extrêmes de la chaîne "+caseini +" et "+casefin+" : ";
		Eliminationxychain(lastc);
		if (nmetref<=maxvarencours) {// Variante particuliere
        	// decorticage du scenario, pour trouver les tableaux casexy, chiffrexy, knot et chiffreknot
			decorticxy();
			// visualisationchaine() est devenu faux (knot et chiffreknot expurges)
			// Les 2 types de raccord
			scenardetail+="<br><br>";		
			for (var i=0; i<xychain+1; i++) {
				if (knot[i]!=M) {
    			   // Passage par un raccord
				   if (casexy[i]==lastc) {var chiffref=chiffredepart} else {var chiffref=chiffrexy[i+1]}
	scenardetail+="Raccord de la case de la chaîne à 3 chiffres "+colPlace[casexy[i]]+"="+contenu[casexy[i]]+" entre les chiffres "+chiffrexy[i]+" et "+chiffref+" via le 3ème chiffre "+chiffreknot[i];
				   var h=knot[i];
				   var chif=chiffreknot[i]
				   miseauvert(casexy[i],chif, BACKJAUNE);
				   // Recherche si h fait partie de la chaine avec chiffre chif en sortie (raccord 1)
					  var yest1=false;
					  for (var iii=0; iii<(i-1); iii++) {
						   if ((chiffrexy[iii+1]==chif) && (h==casexy[iii])) {
							  scenardetail+=" voyant la case précédente de la chaîne "+colPlace[h]+" ayant ce 3ème chiffre en sortie.<br><br>";
				   			  miseauvert(h,chif, BACKJAUNE);
							  yest1=true;
    					   }
        			  }//iii
					// ou h est une case exterieure, a 2 chiffres, contenant chif 
					// et dont le chiffre complement autre est en sortie d une case vue et previous de la chaine (raccord 2)
    				  if (!yest1) {// pas raccord 1
						  var posh=contenu[h];
        				  var ch=posh.match(re);
        				  var autre=ch[0];
        				  if (autre==chif) {autre=ch[1]}
				   		  miseauvert(h,chif, BACKJAUNE);
				   		  miseauvert(h,autre, BACKBLEU);
    					  // Recherche case previous de la chaine voyant h et ayant autre en sortie (raccord 2)
    					  for (var iii=0; iii<(i-1); iii++) {
								  var casechaine=casexy[iii];								  
        						  if ((chiffrexy[iii+1]==autre) && ((carre[h]==carre[casechaine]) || (parseInt(h/9)==parseInt(casechaine/9))|| ((h-9*parseInt(h/9)) == (casechaine-9*parseInt(casechaine/9))))) {
            						 scenardetail+=" voyant une case extérieure a la chaîne "+colPlace[h]+"="+contenu[h]+" par ce 3ème chiffre et dont le chiffre complément "+autre+" est en sortie d\'une case précédente de la chaîne "+colPlace[casechaine]+" vue de cette case extérieure "+colPlace[h]+".<br>";
				   		  			 miseauvert(casechaine,autre, BACKBLEU);
									 break;
        						  }
            			  }//iii
					  }// yest1
				}// knot
    		}// i
			var cascade=true;
			// Les liens indirects
			for (var i2=0; i2<xychain; i2++){
				 if (i2==xychain-1) {chiffrexy[i2+2]=chiffredepart}
				 if ((i2<(xychain-1)) && (chiffrexy[i2]==chiffrexy[i2+1]) && (chiffrexy[i2+1]==chiffrexy[i2+2]) &&  cascade) {// Lien indirect
					   scenardetail+="<br>Lien indirect par le chiffre "+chiffrexy[i2]+" entre les cases "+colPlace[casexy[i2-1]]+" et "+colPlace[casexy[i2+2]]+" via les cases d\'indirection reliées en lien fort par ce chiffre "+colPlace[casexy[i2]]+ " et "+colPlace[casexy[i2+1]]+".<br>";
					   cascade=false;
					   // bleuissement cases d indirection
					   miseauvert(casexy[i2],chiffrexy[i2], BACKBLEU);
					   miseauvert(casexy[i2+1],chiffrexy[i2], BACKBLEU);
					   
    			 } else {cascade=true}
    		}// i2
		}// nmetref
		// verdissement
						var zz=scenardetail.split("chiffre ")[1];
						var m=zz.substring(0,1);
						var hh=(scenardetail.split("chaîne ")[1]);
						var case1=hh.substring(0,2);
						var h=decodagecolPlace(case1);
        				var currSquare = SQ + colPlace[h];
        				var inih= document.getElementById(currSquare).innerHTML;
						miseauvert(h,m, BACKVERT);
						var hh=(scenardetail.split("et ")[1]);
						var case2=hh.substring(0,2);
						var h=decodagecolPlace(case2);
        				var currSquare = SQ + colPlace[h];
        				var inih= document.getElementById(currSquare).innerHTML;
						miseauvert(h,m, BACKVERT);
			if (scenario.split(xy)[0].length==scenario.length) {scenario=xy+scenario}
			scenario+=scenardetail;
	}
}



function enregistrescenarioxychain() {// Version reduite du scenario
    variete=0;
    // Enregistrement dans le menu variante
    scenarrivee[indicearrivee]=scenario;
}

function visualisationchaine() {
	   // Etablissement de la chaine a partir des tableaux casexy, chiffrexy, knot et chiffreknot
	   var chaine=chiffredepart+"-";
	   for (var j=0; j<xychain; j++) {
		   chaine=chaine+colPlace[casexy[j]];
		   if ((knot[j]!=M) && (contenu[casexy[j]].length==3)) {// Intercale la case raccord ou la case externe
		   	  	chaine+="*"+chiffreknot[j]+"*"+colPlace[knot[j]];
		   }
		   if (j<(xychain-1)) {
		   	  var lien="-";
			  if ((j>0) && (chiffrexy[j]==chiffrexy[j-1])&& (chiffrexy[j]==chiffrexy[j+1])) {lien="="}// Lien indirect fort
			  // Mais verifier lien fort par chiffrexy[j] entre cases casexy[j] et casexy[j+1]
			  if (lienfortxy(casexy[j], casexy[j+1], chiffrexy[j])) {lien="="} else {lien="-"}
			  chaine+=lien+chiffrexy[j]+lien;
		   } 
	   }
	   return chaine;
}

function lienfortxy(case1, case2, chiffre) {
   // Recherche lien fort entre case1 et case2 par chiffre
   var i1=carre[case1]-1;
   var h1=parseInt(case1/9);
   var v1=case1-9*h1;
   var i2=carre[case2]-1;
   var h2=parseInt(case2/9);
   // 2 cas : meme bloc ou meme axe (ligne ou colonne)   
   var lf=true;
   if (i1==i2) {// meme bloc
   		 for (var k=0; k<9; k++) {
               var hx=k+6*parseInt(k/3)+18*parseInt(i1/3)+3*i1;
               var posk=contenu[hx];
        	   if ((hx!=case1) && (hx!=case2) && ((posk+"").split(chiffre)[0].length<posk.length)) {lf=false}// lien faible
		 }
		 if (lf) {return true}// lien fort dans bloc   
   }
   // Recherche type de lien sur axe commun (ligne ou colonne) sans lien fort sur bloc commun
   for (var k=0; k<9; k++) {
         if (h1==h2) {var hx=9*h1+k} else {var hx=v1+9*k}
         var posk=contenu[hx];
       	 if ((hx!=case1) && (hx!=case2) && ((posk+"").split(chiffre)[0].length<posk.length)) {return false}// lien faible sur axe sans lien fort dans bloc
   }
   return true;// lien fort sur axe
}

function Eliminationxychain(caseend) {
		 // Elimination de chiffredepart dans les cases voyant casedepart et caseend
		 var hdepart=parseInt(casedepart/9);
		 var vdepart=casedepart-9*hdepart;
		 var cdepart=carre[casedepart];
		 var ii=cdepart-1;
		 var hend=parseInt(caseend/9);
		 var vend=caseend-9*hend;
		 var cend=carre[caseend];
		 for (var lc=0; lc<3; lc++) {
		 	 for (var k=0; k<9; k++) {
			 	 switch(lc) {
			 			case 0:
							 var hk=9*hdepart +k;
							 break;
			 			case 1:
							 var hk=9*k + vdepart;
							 break;
			 			case 2:
                        	 var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
							 break;
			 	}// switch
				if ((hk!=casedepart) && (hk!=caseend)) {
				   // hk voit caseend et contient chiffredepart
				   if ((parseInt(hk/9)==hend) || ((hk-9*parseInt(hk/9))==vend) || (carre[hk]==cend)) {
					  var posk=contenu[hk];
					  if(posk!=contenudepart[hk]) {posk=contenudepart[hk]}
					  if ((posk+"").split(chiffredepart)[0].length<posk.length) {
						 if (((lc<2) && (carre[hk]!=carre[casedepart])) || ((lc==2) && (carre[hk]==carre[casedepart]))) {// Pour eviter les doublons
							eliminationnumero(hk, chiffredepart);
							scenardetail+=" "+colPlace[hk];
						 }
					  }
				   }// hk voit caseend
				}// hk!= casedepart et caseend
			 }// k
		 }// lc
}

function bouclagexy(nouvellecase, nouveauchiffre) {// Avant essai case suivante : cases ne se voyant pas et partageant le meme chiffre
   var posk=contenu[nouvellecase];
   // le chiffre nouveauchiffre contenu dans nouvellecase est egal a chiffredepart et la case nouvellecase ne voit pas la casedepart
   if ((xychain>2) && (posk.length<4) && (nouveauchiffre==chiffredepart) && (carre[casedepart]!=carre[nouvellecase]) && (parseInt(nouvellecase/9)!=parseInt(casedepart/9)) && ((nouvellecase-9*parseInt(nouvellecase/9))!=(casedepart-9*parseInt(casedepart/9)))) {
	   // Recherche bouclage sur valeur du 1er chiffre (chiffredepart)
	   var re=/\d/g;
	   var hnouvellecase=parseInt(nouvellecase/9);
	   var vnouvellecase=nouvellecase-9*hnouvellecase;
	   wscen=visualisationchaine()+"-"+chiffredepart;
	   var hcasedepart=parseInt(casedepart/9);
	   var vcasedepart=casedepart-9*hcasedepart;
	   // Eliminer nouveauchiffre dans les cases voyant nouvellecase et casedepart
	   // 3 cas : blocs horizontaux, blocs verticaux, autres
	   var cdep=carre[casedepart]-1;
	   var cnouv=carre[nouvellecase]-1;
	   var h1=parseInt(cdep/3);
	   var h2=parseInt(cnouv/3);
	   var v1=cdep-3*h1;
	   var v2=cnouv-3*h2
	   var enplus="";
	   if (h1==h2) {// blocs horizontaux
			 for (var k=0; k<9; k++) {// Ligne de nouvellecase et bloc de casedepart
			 	 var h=9*hnouvellecase+k;
				 xyz=false;
				 if ((carre[h]==carre[casedepart]) && (h!=nouvellecase)) {traitexy(h, chiffredepart)}
			 	 var posk=contenu[h];
				 if (xyz) {enplus=enplus+" dans case horizontale "+colPlace[h]}		  
			 }
		  	 for (var k=0; k<9; k++) {// Ligne de casedepart et bloc de nouvellecase
			 	 var h=9*hcasedepart+k;
				 xyz=false;
				 if ((carre[h]==carre[nouvellecase]) && (h!=casedepart)) {traitexy(h, chiffredepart)}			 
			 	 var posk=contenu[h];
				 if (xyz) {enplus=enplus+" dans case horizontale "+colPlace[h]}		  
			 }
	   } else if (v1==v2) {// blocs verticaux
			 for (var k=0; k<9; k++) {// Colonne de nouvellecase et bloc de casedepart
			 	 var h=vnouvellecase+9*k;
				 xyz=false;
				 if ((carre[h]==carre[casedepart])&& (h!=nouvellecase)) {traitexy(h, chiffredepart)}			 
			 	 var posk=contenu[h];
				 if (xyz) {enplus=enplus+" dans case verticale "+colPlace[h]}		  
			 }
		  	 for (var k=0; k<9; k++) {// Colonne de casedepart et bloc de nouvellecase
			 	 var h=vcasedepart+9*k;
				 xyz=false;
				 if ((carre[h]==carre[nouvellecase])&& (h!=casedepart)) {traitexy(h, chiffredepart)}
			 	 var posk=contenu[h];
				 if (xyz) {enplus=enplus+" dans case verticale "+colPlace[h]}		  
			 }	
	   } else {// Autres : ligne de l'un et colonne de l'autre
			 var h=9*hcasedepart+vnouvellecase;
				 xyz=false;
			 traitexy(h, chiffredepart);		  
			 	 var posk=contenu[h];
				 if (xyz) {enplus=enplus+" dans case autre "+colPlace[h]}		  
		  	 var h=9*hnouvellecase+vcasedepart;
			 traitexy(h, chiffredepart);		  
				 if (xyz) {enplus=enplus+" dans case autre "+colPlace[h]}	
	   }
	}
}

function traitexy(x, y) {
	var cc=contenu[x];
	xyz=false;
	if ((cc.length>1)&& (cc.split(y)[0].length<cc.length)) {// cannibalistique
	   eliminationnumero(x, y);
	   xyz=true;
	}
}

function raccordxy(x, chif, autrechif, y, chifamont) {
	var hx=parseInt(x/9);
	var vx=x-9*hx;
	var cx=carre[x];
	var ii=cx-1;			  
   	var re=/\d/g;
    // Raccord direct de la case x voyant une case previous de la chaine, autre que y, par autrechif en sortie
	for (var isprev=0; isprev<xychain-1; isprev++) {
		var hprev=casexy[isprev];
		if ((autrechif==chiffrexy[isprev]) && (hprev!=y)) {
			  if ((cx==carre[hprev]) || (hx==parseInt(hprev/9)) || (vx == (hprev-9*parseInt(hprev/9)))) {// x voit hprev
				 	if (!((isprev>0) && (chiffrexy[isprev]==chiffrexy[isprev-1]))) {// Sauf cases internes d'un lien indirect
							knot[xychain]=hprev; 
                        	chiffreknot[xychain]=autrechif;
							return hprev;// Sortie sur case previous
					} 
			  }// cx
		}//hprev
	}// isprev
	// Raccord indirect sur case exterieure a 2 chiffres contenant autrechif et un autre chiffre, mettons alterchif, vue en sortie d une case de la chaine avec alterchif (casevu)
	// Chercher en premier case suivante hnext non contenue dans la chaine, a 2 ou 3 chiffres, contenant chif (procedure inverse du raccord direct de x sur une case précédente de la chaine)
	for (var lc=0; lc<3; lc++) {
	  for (var k=0; k<9; k++) {
	  	  switch(lc) {
			 case 0:
			 	  var hnext=9*hx+k;
				  break;									 	  
			 case 1:
			 	  var hnext=9*k+vx;
				  break;
			 case 2:
     		 	  var hnext=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
				  break;
		  }
		  var posk=contenu[hnext];
		  if ((hnext!=x) && (hnext!=y) && (hnext!=casedepart) && (posk.length==2) && ((posk+"").split(chif)[0].length<posk.length)) {
		  	 var pasvupasfait=true;
			 for (var ic=0; ic<xychain; ic++) {if (hnext==casexy[ic]) {pasvupasfait=false}}
			 if (pasvupasfait) {			 	
				// En second, rechercher case exterieure a 2 chiffres contenant autrechif et un autre chiffre, mettons alterchif, vue en sortie d une case de la chaine avec alterchif (casevu)
				for (var lcext=0; lcext<3; lcext++) {
				  	  for (var kext=0; kext<9; kext++) {
					  	  switch(lcext) {
						  			 case 0:
									 	  var hnextext=9*hx+kext;
										  break;									 	  
									 case 1:
									 	  var hnextext=9*kext+vx;
										  break;
									 case 2:
                        	 		 	  var hnextext=kext+6*parseInt(kext/3)+18*parseInt(ii/3)+3*ii;
										  break;
						  }
						  var poskext=contenu[hnextext]
						  if ((hnextext!=x) && (hnextext!=y) && (hnextext!=casedepart) && (poskext.length==2) && (poskext.split(autrechif)[0].length<poskext.length)) {
						  	 var pasvupasfaitext=true;
							 for (var icext=0; icext<xychain; icext++) {if (hnextext==casexy[icext]) {pasvupasfaitext=false}}
							 if (pasvupasfaitext) {
							 	var cref=contenu[hnextext].toString().match(re);
								var alterchif=cref[0];
								if (alterchif==autrechif) {alterchif=cref[1]}
								// Recherche case de la chaine, vue de hnextext et ayant alterchif en sortie
                				for (var ic=0; ic<xychain; ic++) {
									var casevu=casexy[ic];
									if ((chiffrexy[ic]==alterchif) && (casevu != x) && (casevu!=y) && (casevu!=hnext)) {
								   	   if (!((ic>0) && (chiffrexy[ic]==chiffrexy[ic-1]))) {// Sauf cases internes d'un lien indirect
    									   if ((carre[hnextext]==carre[casevu]) || (parseInt(hnextext/9)==parseInt(casevu/9)) || ((hnextext-9*parseInt(hnextext/9))==(casevu-9*parseInt(casevu/9)))) {
                                                			  chiffreknot[xychain]=autrechif;
															  knot[xychain]=hnextext; 
                            							 	  // case exterieure hnextext reliee a une case de la chaine casevu par chiffre alterchif
    														  // y-chifamont-x-chif-hnext et x-autrechif-hnextext-alterchif-casevu
    														  // alterchif et casevu a reconstituer dans elaboreunevariante
															  return hnext;
    									   }// carre
									   }
									}// alterchif
								}// ic								  
							 }// pasvupasfaitext
						  }// if hnextext
					  }// kext		  
				}// lcext 
			 }// pasvupasfait
		  }// if
	  }// k				  
	}// lc 
	return M;
}

function sortiexy(x, ch) {
   			casexy[xychain]=x;
           	chiffrexy[xychain]=ch;
			xychain=xychain+1;
			blocxynew();//Reentrant avec la case suivante
			xychain=xychain-1;
    		knot[xychain]=M;
    		casexy[xychain]=M;
    		chiffreknot[xychain]=0;
}

function caseaveclienfort(lcex, casesuite, chiffre) {
   // Recherche case hpossible unique voyant casesuite en lien fort et contenant chiffre sur axe lc, different e lcex, et non contenue dans la chaine
   var ii=carre[casesuite]-1;
   var hh=parseInt(casesuite/9);
   var hv=casesuite-9*hh;
   for (var lc=0; lc<3; lc++) {
   	   var hpossible=M;
       if (lc!=lcex) {
    	   var lf=true;
		   for (var k=0; k<9; k++) {
                		   switch(lc) {
                               	case 0:
                            		 var hx=9*hh+k;
                            		 break;
                            	case 1:
                            		 var hx=hv+9*k;
                            		 break;
                            	case 2:
                                	 var hx=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
                        			 break;
                           }// switch
                           var posk=contenu[hx];
        				   if ((hx!=casesuite) && ((posk+"").split(chiffre)[0].length<posk.length)) {
        					  if (hpossible==M) {hpossible=hx} else {lf=false}// Pas de lien fort sur cet axe 
            			   }
           }// k
           if (lf) {
           	   // Verification que hpossible ne fait pas partie de la chaine
			   var pasvupasfait=true;
               for (var j=0; j<xychain; j++) {if (hpossible==casexy[j])  {pasvupasfait=false}}
               if (pasvupasfait) {return hpossible}// Yes !!
           }
	   }// lc!=lcex
   }// lc
   return M;
}

function caseenvue(case1, axe, posit, chif) {
   // Recherche case hx contenant chif, sur axe, en position posit, ne faisant pas partie de la chaine
   var ii=carre[case1]-1;
   var hh=parseInt(case1/9);
   var hv=case1-9*hh;
   var horsaxe=true;
   switch(axe) {
       	case 0:
    		 var hx=9*hh+posit;
    		 break;
    	case 1:
    		 var hx=hv+9*posit;
    		 break;
    	case 2:
        	 var hx=posit+6*parseInt(posit/3)+18*parseInt(ii/3)+3*ii;
    		 var horsaxe=!((parseInt(hx/9)==hh) || ((hx-9*parseInt(hx/9))==hv));
			 break;
   }
   var posk=contenu[hx];
   if ((posk.length>1) && (hx!=case1) && ((posk+"").split(chif)[0].length<posk.length)) {
		var pasvupasfait=horsaxe;
        for (var j=0; j<xychain+1; j++) {if (hx==casexy[j]) {pasvupasfait=false}} // Pas de boucle sur hx sauf pour le lien fort
		if (pasvupasfait) {return hx}       
   }
   return M;
}

function regroop() {// -HHHHHH- ou -HH- suivi de -xxxx- ou -x-
	var sx=scenario.split("<br>")[0];
	var regegal = new RegExp('[=]', 'gi');
	var s0=sx.replace(regegal, "-");
	var s1=s0.split("-");
	var xl=(s1[s1.length-1]);
	if (xl.length>2) {scenario+=xl}
	var prems=true;
	for (var i=1; i<s1.length-1; i++) {
    		  if ((s1[i+1].length==1) && (s1[i].length>2)){
    			  if (prems) {
    				scenario+=tradacrit("<br><br>Cases regroupées : ");
        		  }
        		  prems=false;
        		  scenario+=s1[i]+" ";
			  }
	}
	scenario=tradacrit(scenario+"<br>");
}

function lessolutionssinonvalide(hk0, chif0, lienfinal) {
	var re=/\d/g;
	if (xychain>1) {// Recherche solutions au dela du noeud 2
		var posdep=contenu[casedepart];
 		var chkdep=posdep.match(re);
		if ((posdep.length==2) && (posdep==contenu[hk0]) && (chiffrexy[0]==chif0) && !sevoient(casedepart, hk0)) {
				var autrechiffre=chkdep[0];
				if (autrechiffre==chif0) {autrechiffre=chkdep[1]}
				// Eliminer autrechiffre dans toutes les cases voyant casedepart et hk0, sauf les cases node
				wscen="AIC type I ";
				etablirchaine();// Chaine batie avec casexy, chiffrexy et lienfaible, de 0 a xychain
				variete=2;
		}		
	}
}

function lessolutionsextremesegales(case0ref, hknext, chif0) {
	var re=/\d/g;
	var posref=contenu[hknext];
 	var chref=posref.match(re);
	casexy[xychain]=colPlace[case0ref];// xychain
	casexy[xychain+1]=colPlace[hknext];// xychain+1
	chiffrexy[xychain]=chif0;
	// AIC type I
	if (wscen.substring(0,3) != "AIC") {wscen="AIC type I "+wscen}
	variete=2;
	var autrechiffre=chref[0];
	if (autrechiffre==chif0) {autrechiffre=chref[1]}
	// eleminer autrechiffre dans les cases voyant les cases extremes hknext et casedepart
   	if (xychain>1) {
	eliminationchiffre(colPlace[hknext], colPlace[casedepart], autrechiffre)}						
	xychain+=1;
}

function lessolutions(chif0) {
	var lienint=lienfaible[xychain];
	var casefinale=casexy[xychain];
	var case0ref=decodagecolPlace(casefinale.substring(0,2));
	if ((casefinale.length>2) && !sevoient(casedepart, decodagecolPlace(casefinale.substring(2,4)))) {return}
	wscen=scenario;
	var re=/\d/g;
	var posref=contenu[case0ref];
 	var chref=posref.match(re);
	if (xychain>1) {// Recherche solutions au dela du noeud 2
		var posdep=contenu[casedepart];
 		var chkdep=posdep.match(re);
		var lienfortpre=!lienfaible[xychain-1];// Nature du lien amont de case0ref
		// Case de depart differente de case0ref contenant le candidat chif0 de case0ref
		if ((posdep.split(chif0)[0].length<posdep.length) && (case0ref!=casedepart)) {
			var lienfortinitial=!lienfaible[0];
			// case de depart voit la case case0ref : boucles (continue ou discontinue) ou AIC Type II
			if (sevoient(case0ref, casedepart)) {// case0ref voit casedepart
                chiffrexy[xychain]=chif0;
                var lienfortfinal=(xychain>2) && testlienfortgeneral(case0ref, casedepart, chif0);
                lienfaible[xychain]=!lienfortfinal;// lien final
                var egalitechiffres=(chiffrexy[xychain-1]==chif0);
                var egalitechiffresinitial=(chiffrexy[0]==chif0);
                var egalitechiffresfinal=(chiffrexy[0]==chiffrexy[xychain-1]);
                var validsortie=(Xamont && egalitechiffres)  || (Xamont && !egalitechiffres && lienfortfinal);
				if (validsortie) {// Lien valide entre case0ref et casedepart : boucle
                	if (!egalitechiffres) {Xamont=!Xamont}
                	validsortie =(Xamont &&  egalitechiffresinitial) || (!Xamont && !egalitechiffresinitial);
					if (validsortie && lienfortinitial)  {
                			wscen="AIC loop continu ";
                 			etablirchaine();
                  			if (lienfortfinal) {wscen+="="+chif0+"="} else {wscen+="-"+chif0+"-"}
                 			wscen+=colPlace[casedepart];
                			solutioncontinue();
                			variete=0;
                	} else if (egalitechiffresinitial && (lienfortfinal == lienfortinitial)) {
						chiffrexy[xychain+1]=chif0;
						wscen="AIC loop discontinu ";
						etablirchaine();
                		if (lienfortfinal) {wscen+="="+chif0+"="} else {wscen+="-"+chif0+"-"}
                		wscen+=colPlace[casedepart];
						xychain+=1;
						calculXamont(false);
						xychain-=1;
                		variete=1;
						if (!Xamont) {
							if (lienfortfinal) {
wscen+=tradacrit("<br>Défaut d\'alternance sur la case de départ "+colPlace[casedepart]+tradacrit(" qui est entourée des chiffres candidats égaux ")+chif0+" avec des liens forts. Cette case contient "+chif0+".<br><br>");
                            	wscen+=chiffrefort+chif0+incase+colPlace[casedepart]+".";
								for (var hnum=0; hnum<posdep.length; hnum++) {if (chkdep[hnum] !=chif0) {
								eliminationnumero(casedepart, chkdep[hnum])}}
							} else {
								calculXamont(true);
								if (Xamont) {
wscen+=tradacrit("<br>Défaut d\'alternance sur la case de départ "+colPlace[casedepart]+tradacrit(" qui est entourée des chiffres candidats égaux ")+chif0+" avec des liens faibles. Cette case ne contient pas "+chif0+".<br><br>");
    								wscen+=chiffreseul+chif0+incase+colPlace[casedepart]+".";
        							eliminationnumero(casedepart, chif0);
								}
							}
						}
                	}// test valide autour de casedepart	
				} else {// Lien non valide entre case0ref et casedepart qui se voient (pas de boucle car discontinuite) : AIC Type II (variete 3)
         					// AIC Type II si liens forts aux extremites sur chiffres differents, sans node final
        					//               donc supprimer chiffrexy[xychain-1] dans casedepart, si il y est, et chiffrexy[0] dans case0ref, si il y est
                			if ((chiffrexy[xychain-1]!=chiffrexy[0]) && lienfortpre && lienfortinitial) {
                    				wscen="AIC type II ";
                                    etablirchaine();
            						wscen+=tradacrit("<br>Elimination du chiffre de départ "+chiffrexy[0]+" dans la case finale "+colPlace[case0ref]);
                					wscen+=tradacrit("<br>Elimination du chiffre final "+chiffrexy[xychain-1]+tradacrit(" dans la case de départ ")+colPlace[casedepart]+"<br><br>");
            						if (contenu[case0ref].split(chiffrexy[0])[0].length<contenu[case0ref].length) {wscen=wscen+chiffreseul+chiffrexy[0]+incase+colPlace[case0ref]+".<br>"}
            						if (contenu[casedepart].split(chiffrexy[xychain-1])[0].length<contenu[casedepart].length) {wscen+=chiffreseul+chiffrexy[xychain-1]+incase+colPlace[casedepart]+".<br>"}
        							if (posdep.split(chiffrexy[xychain-1])[0].length<posdep.length) {
									eliminationnumero(casedepart, chiffrexy[xychain-1])}														
        							if (posref.split(chiffrexy[0])[0].length<posref.length) {
									eliminationnumero(case0ref, chiffrexy[0])}														
									variete=3;
                       		}// case0ref voit casedepart avec liaison valide sur case0ref et liens forts aux extremites sur chiffres differents : AIC Type II
					} // validation autour de case0ref
			} else {// case0ref et casedepart ne se voient pas  AIC Type I (variete 2)
        				// AIC type I
                        wscen="AIC type I ";
                        etablirchaine();// Chaine batie avec casexy, chiffrexy et lienfaible, de 0 a xychain
						variete=2;
    					if (chiffrexy[xychain-1]==chiffrexy[0]) {
    						if (lienfortpre && lienfortinitial) {//Meme chiffre + liens forts aux extremites sur meme chiffre =
                        		// case0ref et casedepart ne se voient pas avec liens forts aux extremites sur meme chiffre =  AIC Type I
    							// Elimination chiffrexy[0] dans les cases voyant casefinale (avec node eventuel) et casedepart
    							if (xychain>2) {eliminationchiffre(casefinale, colPlace[casedepart], chiffrexy[0])}
								if ((posdep==posref) && (posdep.length==2)) {// cases egales a 2 chiffres : eliminer aussi aytre chiffre
        							var autrechiffre=chref[0];
                					if (autrechiffre==chiffrexy[0]) {autrechiffre=chref[1]}
								}
            				}
    					}
			}// case0ref et casedepart se voient ou pas
		}// posdep : casedepart, differente de case0ref, contient chiffre --> AIC (4 varietes)
	}// xychain > 2 sans node final
	lienfaible[xychain]=lienint;
}

function testvalidationex(lienavalfort,lienamontfaible,chiffregal,case2chiffres) {
	if (lienavalfort==lienamontfaible) {return chiffregal}// Fort-faible ou faible-fort : vrai si sur meme chiffre
	if (lienavalfort) {return !chiffregal}// Fort-fort : vrai sur chiffre different
	return (!chiffregal && case2chiffres)// Faible-faible : vrai sur chiffre different et case a 2 chiffre
}

function testvalidation(lienavalfort,lienamontfaible,chiffregal,case2chiffres) {
	if (lienavalfort==lienamontfaible) {
		if (!lienamontfaible && chiffregal) {return !case2chiffres} // Exception Fort-faible
	return chiffregal}// Fort-faible ou faible-fort : vrai si sur meme chiffre
	if (lienavalfort) {
	if (chiffregal && !case2chiffres) {return true}// Exception Fort-Fort
	if ((xychain>3) && !chiffregal && (chiffrexy[xychain-1]==chiffrexy[xychain-2]) && (chiffrexy[xychain-3]!=chiffrexy[xychain-2]) && !lienfaible[xychain-2] && !lienfaible[xychain-3] && !case2chiffres) {return false}
	return !chiffregal}// Fort-fort : vrai sur chiffre different
	return (!chiffregal && case2chiffres)// Faible-faible : vrai sur chiffre different et case a 2 chiffre
}

function enregistrescenarioaic() {
var i=maxvarencours;
if (FILTRAGEDESSOLUTIONS) {
	  for (var i=1; i<maxvarencours; i++) {
			if (reperecontinu(scenario, tableauvariante[i], i)) {break}
		 	if (reperetypeI(scenario, tableauvariante[i])) {break}
			if (reperetypeII(scenario, tableauvariante[i])) {break}
	  }// i
}
if (i==maxvarencours) {
            tableauvariante[maxvarencours] = scenario+"$"+variete;
            maxvarencours+=1;
}
scenario=noeffect;
}

function reperecontinu(scen1, scen2, ipre) {
	var a1=scen1.split("loop continu ")[1];
	if (typeof a1 === "undefined") {return false}
	var b1=(a1.split(".")[0]).replace(/-/g, "=");;
	var c1=b1.split("=");
	var j=0;
	var d1=new Array();
	for (var i=0; i<c1.length-1; i++) {
		if (i!=2*parseInt(i/2)) {continue}
		d1[j]=c1[i];
		j+=1;
	}
	a1=scen2.split("loop continu ")[1];
	if (typeof a1 === "undefined") {return false}
	b1=(a1.split(".")[0]).replace(/-/g, "=");;
	c1=b1.split("=");
	j=0;
	var d2=new Array();
	for (var i=0; i<c1.length-1; i++) {
		if (i!=2*parseInt(i/2)) {continue}
		d2[j]=c1[i];
		j+=1;
	}
	// comparer les tableaux d1 et d2, si sont une permutation
	if (d1.length != d2.length) {return false}
	for (var i1=0; i1<d1.length; i1++) {
		for (var i2=0; i2<d2.length; i2++) {if (d1[i1]==d2[i2]) {break}}
		if (i2==d2.length) {return false}// pas de dans le tableau d2
	}
	return true; 
}

function reperetypeII(scen1, scen2) {
	var a1=scen1.split("chiffre de départ ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif1a=a1.substring(0,1);
	var b1=a1.split("case finale ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH1a=b1.substring(0,2);
	var c1=b1.split(" chiffre final ")[1];
	if (typeof c1 === "undefined") {return false}
	var chif1b=c1.substring(0,1);
	var d1=c1.split("case de départ ")[1];
	if (typeof d1 === "undefined") {return false}
	var HH1b=d1.substring(0,2);
	var a1=scen2.split("chiffre de départ ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif2a=a1.substring(0,1);
	var b1=a1.split("case finale ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH2a=b1.substring(0,2);
	var c1=b1.split(" chiffre final ")[1];
	if (typeof c1 === "undefined") {return false}
	var chif2b=c1.substring(0,1);
	var d1=c1.split("case de départ ")[1]
	if (typeof d1 === "undefined") {return false}
	var HH2b=d1.substring(0,2);
	var x=((chif1a==chif2a) && (HH1a==HH2a) && (chif1b==chif2b) && (HH1b==HH2b)) || ((chif1a==chif2b) && (HH1a==HH2b) && (chif1b==chif2a) && (HH1b==HH2a));
	return x; 
}

function reperetypeI(scen1, scen2) {
	var a1=scen1.split("chiffre ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif1=a1.substring(0,1);
	var b1=a1.split("voyant ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH1a=b1.substring(0,2);
	var c1=b1.split(" et ")[1];
	if (typeof c1 === "undefined") {return false}
	var HH1b=c1.substring(0,2);
	var a1=scen2.split("chiffre ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif2=a1.substring(0,1);
	var b1=a1.split("voyant ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH2a=b1.substring(0,2);
	var c1=b1.split(" et ")[1];
	if (typeof c1 === "undefined") {return false}
	var HH2b=c1.substring(0,2);
	var x=(chif1==chif2) && (((HH1a==HH2a) && (HH1b==HH2b)) || ((HH1a==HH2b) && (HH1b==HH2a)))
	return x; 
}

function comparaisonscenarios(w0,w1) {
		 // verification eliminations communes identiques (l'un dans l'autre et l'autre dans l'un)
			 var i0=1;
			 var s0=w0.split(chiffrefort)[i0];// Lien fort loop continu (2 chiffres) ou discontinu (1 chiffre)
			 var itrouv=false;
			 while (typeof s0 != "undefined") {
				var chif0=s0.substring(0,1);
				var h0=decodagecolPlace(s0.split(incase)[1].substring(0,2));
				var s00=s0.split("et ")[1];
				if (typeof s00 != "undefined") {
					var chif00=s00.substring(0,1);
				}
    			var itrouv=false;
				var i1=1;
    			var s1comp=w1.split(chiffrefort)[i1];// Lien fort loop continu (2 chiffres) ou discontinu (1 chiffre)
    			while (typeof s1comp != "undefined") {
    				var chif1=s1comp.substring(0,1);
    				var h1=decodagecolPlace(s1comp.split(incase)[1].substring(0,2));
    				var s11=s1comp.split("et ")[1];
    				if (typeof s11 != "undefined") {
						var chif11=s11.substring(0,1);
						if (((h0==h1) || ((typeof s0 != "undefined") && (typeof s1comp != "undefined"))) && (chif11==chif0) && (chif1==chif00)) {chif1=chif0}
					}
    				if ((chif0==chif1) && ((h0==h1) || ((typeof s0 != "undefined") && (typeof s1comp != "undefined")))) {// Meme elimination : ne pas chercher plus loin sur s1comp
					   itrouv=true;
					}
					i1=i1+1;
    			 	var s1comp=w1.split(chiffrefort)[i1];
    			 } 
				 if (!itrouv) {return false}//s0 non trouve dans w1 --> pas de doublon
				 i0=i0+1;
			 	 var s0=w0.split(chiffrefort)[i0];
			 } 
			 i0=1;
			 s0=w0.split(chiffreseul)[i0];// Les 4 varietes
			 itrouv=false;
			 while (typeof s0 != "undefined") {
				chif0=s0.substring(0,1);
				h0=decodagecolPlace(s0.split(incase)[1].substring(0,2));
    			itrouv=false;
				i1=1;
    			s1compnext=w1.split(chiffreseul)[i1];// Les 4 varietes
    			while (typeof s1compnext != "undefined") {
    				chif1=s1compnext.substring(0,1);
    				h1=decodagecolPlace(s1compnext.split(incase)[1].substring(0,2));
					if ((chif0==chif1) && (h0==h1)) {// Meme elimination
					   itrouv=true;
					}
    				i1=i1+1;
    			 	s1compnext=w1.split(chiffreseul)[i1];
    			}
				if (!itrouv) { return false}//s0 non trouve dans w1 --> pas de doublon
				i0=i0+1;
			 	var s0=w0.split(chiffreseul)[i0];
			 }
			 return true;
}



function elaborevarianteAICChain() {
// Programme pour rougir
// Methode 23, 4 varietes (0, 1, 2, 3)
// Variete 0 : AIC Loop continu 
//   Elimination du chiffre candidat "+chif+" dans la case "+colPlace[hk]      ..... s'il existe
//   Elimination des chiffres candidats autres que "+chiffrexy[i]+" et "+chiffrexy[ii]+" dans la case "+colPlace[hk]      ..... s'ils existent
// Variete 1 : AIC Loop discontinu
//   wscen=wscen+"<br>Defaut d\'alternance sur la case de depart "+colPlace[casedepart]+" qui est entouree du meme chiffre candidat "+chiffrexy[0]+" en lien fort.
//	 Cette case contient donc ce chiffre.";
//   Elimination des chiffres candidats autres que "+chiffrexy[0]+" dans la case "+colPlace[casedepart]
//   wscen=wscen+"<br>Defaut d\'alternance sur la case de depart "+colPlace[casedepart]+" qui est entouree du meme chiffre candidat "+chiffrexy[0]+" en lien faible
//	 Cette case ne peut donc contenir ce chiffre.";
//   Elimination du chiffre candidat "+chiffrexy[0]+" dans la case "+colPlace[casedepart]      ..... s'il existe
// Variete 2 : AIC type I C1=2= ...=2=G9... Elimination du chiffre candidat 2 ... case C9 voyant les cases G9 et C1 ...
//   Elimination du chiffre candidat "+chif+" dans la case "+colPlace[hk]      ..... s'il existe
// Variete 3 : AIC type II C1=2= ....=4=C9 ... depart C1 ne peut contenir le candidat final 4. la case C9 ne peut contenir le chiffre candidat de depart 2
//   wscen=wscen+"<br>La case de depart "+colPlace[casedepart]+" ne peut contenir le chiffre candidat final "+chiffrexy[xychain-1]+".";
//   wscen=wscen+"<br>le chiffre candidat de depart "+chiffrexy[0]+" ne peut etre contenu dans la case finale "+colPlace[caseref]+".<br>";
//   Elimination du chiffre candidat "+chiffrexy[xychain-1]+" dans la case "+colPlace[casedepart]      ..... s'il existe
//   Elimination du chiffre candidat "+chiffrexy[0]+" dans la case "+colPlace[caseref]        ....... s'il existe
var re=/\d/g;
//coloris=true;
a="AIC ";
wscen=scenario;
if (scenario.split("loop continu ")[0]==a){
			 variete=0;
			 var i=1;
			 var s0=scenario.split(chiffreseul)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1cont=s0.split(incase)[1];
				var h=decodagecolPlace(s1cont.substring(0,2));
				eliminationnumero(h,chif);
				i=i+1;			 
			 	s0=scenario.split(chiffreseul)[i];
			 }
			 i=1;
			 s0=scenario.split(chiffrefort)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1continu=s0.split(incase)[1];
				var h=decodagecolPlace(s1continu.substring(0,2));
				var s2=s0.split("et ")[1];
				var chif2=s2.substring(0,1);
				var pos7=contenu[h];
				var ch=pos7.match(re);
				for (var hnum=0; hnum<pos7.length; hnum++) {if ((ch[hnum]!=chif) && (ch[hnum]!=chif2)) {eliminationnumero(h,ch[hnum])}}
				i=i+1;			 
			 	s0=scenario.split(chiffrefort)[i];
			 }
			 // verdir
			 verdiraic(scenario.split("loop continu ")[1]);
} else if (scenario.split("loop discontinu ")[0]==a){
			 variete=1;
			 var i=1;
			 var s0=scenario.split(chiffrefort)[1];
			 if (typeof s0 != "undefined") {// Lien fort
				var chif=s0.substring(0,1);
				var s1discontinufort=s0.split(incase)[1];
				var h=decodagecolPlace(s1discontinufort.substring(0,2));
			 	var pos8=contenu[h];
				var ch=pos8.match(re);
				for (var hnum=0; hnum<pos8.length; hnum++) {if (ch[hnum]!=chif) {
				eliminationnumero(h,ch[hnum])}}
			 } else {// Lien faible
			   	var s0=scenario.split(chiffreseul)[1];
				var chif=s0.substring(0,1);
				var discontinufaible=s0.split(incase)[1];
				var h=decodagecolPlace(discontinufaible.substring(0,2));
				eliminationnumero(h,chif);
			 }
			 // verdir
			 verdiraic(scenario.split("loop discontinu ")[1]);
} else if (scenario.split("type I ")[0]==a){
			 variete=2;
			 var i=1;
			 var s0=scenario.split(chiffreseul)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1type1=s0.split(incase)[1];
				var h=decodagecolPlace(s1type1.substring(0,2));
				eliminationnumero(h,chif);
				i=i+1;			 
			 	s0=scenario.split(chiffreseul)[i];
			 }
			 // verdir les chiffres de la chaine concernes
			 verdiraic(scenario.split("AIC type I ")[1]);
} else if (scenario.split("type II ")[0]==a){
			 variete=3;
			 var i=1;
			 var s0=scenario.split(chiffreseul)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1type2=s0.split(incase)[1];
				var h=decodagecolPlace(s1type2.substring(0,2));
				eliminationnumero(h,chif);
				i=i+1;			 
			 	s0=scenario.split(chiffreseul)[i];
			 }
			 // verdir
			 verdiraic(scenario.split("AIC type II ")[1]);
}
// Recherche regroupement
   regroop();
}

function verdiraic(s1vert) {
	 var re=/\d/g;
	 var sc=s1vert.split("<br>")[0];
	 var res=sc.replace(/=/g,"-");
	 var s=res.split("-");
	 var ss=s[s.length-1];
	 if (ss.length>2) {// Rougir cases extremes
			for (var j=0; j<(ss.length/2); j++) {
				var h=decodagecolPlace(ss.substring(2*j, (2*j+2)));
				var chk=contenu[h].match(re);
				for (var k=0; k<chk.length; k++) {
					var n=chk[k];
					if (unevariante) {miseauvert(h,n, BACKBLEU)}
				}
			}
	 }
	 for (var i=1; i<s.length; i++) {// verdir la chaine
			var m=s[i];
			for (var j=0; j<(s[i-1].length/2); j++) {
				var h=decodagecolPlace(s[i-1].substring(2*j, (2*j+2)));
				for (var k=0; k<m.length; k++) {
					var n=m[k];
					if (unevariante) {miseauvert(h,n, BACKVERT)}
				}
			}
			i+=1;
			if (m.length>1) {i+=2}
	 }
	 // verdissement et jaunissement case finale
	 var h=decodagecolPlace(s[s.length-1].substring(0,2));
	 var n=s[s.length-2];
	 var m=s[1];
	 if (unevariante) {miseauvert(h,n, BACKVERT); miseauvert(h,m, BACKJAUNE)}
}
function solutioncontinue() {
	var re=/\d/g;
	chiffrexy[xychain+1]=chiffrexy[0];
	lienfaible[xychain+1]=lienfaible[0];
	for (var i=1; i<(xychain+2); i++) {// y compris la case de depart en position finale
		// Case hk en position i entouree de liens forts sauf si la case precedente est en lien fort sur le meme chiffre que sa case precedente en lien fort
		if (!lienfaible[i-1] && !lienfaible[i]) {// case seule entouree de liens forts sauf node, ne peut contenir que les chiffres qui l entourent
			// case vaut les 2 chiffres qui l'entourent
        		var hk=decodagecolPlace(casexy[i]);
        		if (i==(xychain+1)) {hk=casedepart}		
            	var pos14=contenu[hk];
                if ((pos14.length>2) && (chiffrexy[i-1] != chiffrexy[i])) {
                	  var chk=pos14.match(re);
                	  wscen+="<br>"+chiffrefort+chiffrexy[i-1]+" et "+chiffrexy[i]+incase+colPlace[hk]+" entouree de liens forts.";
        			  for (var hnum=0; hnum<chk.length; hnum++) {if ((chk[hnum]!=chiffrexy[i-1]) && (chk[hnum]!=chiffrexy[i])) {
					  eliminationnumero(hk, chk[hnum])}}
            	}
		}// liens forts autour
	}// i
	for (var i=0; i<xychain+1; i++) {// lien faible entre 2 cases de la chaine
		if (lienfaible[i]) {//Lien faible : chiffre a eliminer des cases voyant les 2 cases et leurs nodes eventuels entourant ce lien faible
    		   // si node sur casexy[i], hk doit voir aussi le node
    			var suiv=casexy[i+1];
    			if (i==xychain){suiv=colPlace[casedepart]}
				eliminationchiffre(casexy[i], suiv, chiffrexy[i]);
		}
	}
}

function eliminationchiffreex(case1, case2, chif) {
	var re=/\d/g;
	// case1 et case2 ne se voient pas
	// Recherche de cases hek voyant case1 et case2 et leur node, et contenant chif a eliminer, differente de casedepart, pas dans la chaine ni dans un node
	var casereel=decodagecolPlace(case1.substring(0,2));
	var hkreel=decodagecolPlace(case2.substring(0,2));
	var h1=parseInt(casereel/9);//	Ligne case1
	var v1=casereel-9*h1;// Colonne case 1
	var c1=carre[casereel]-1; // Bloc case1
 	// nodes
	var node1=M;
	if (case1.length>2) {node1=decodagecolPlace(case1.substring(2,4))}
	var node2=M;
	if (case2.length>2) {node2=decodagecolPlace(case2.substring(2,4))}	
	var deb=true;
	for (var lc=0; lc<3; lc++) {
		 for (var k=0; k<9; k++) {// Recherche case hk voyant case1 et case2, qui ne soit pas un node
			 switch (lc) {
			 		case 0:// Ligne de case1
						 var hek=9*h1+k;
						 break;
			 		case 1:// Colonne de case1
						 var hek=9*k+v1;
						 break;
			 		case 2:// Bloc de case1
           		  	   	 var hek=k+6*parseInt(k/3)+18*parseInt(c1/3)+3*c1;
						 break;
			 }
			 var pos15=contenu[hek];
			 if (pos15.length>1) {
			 	var chek=pos15.match(re);
			 	// hek, different des cases, des als et leurs nodes, voit hkreel et contient chif
				var chainee=wscen.split("<br>")[0];
				if ((sevoient(hek, hkreel) && (pos15.split(chif)[0].length<pos15.length)) && (chainee.split(colPlace[hek])[0].length==chainee.length)) {// tous les criteres respectes
					if ((node1===M) || sevoient(hek,node1)) {
					if ((node2===M) || sevoient(hek,node2)) {
						if (deb) {
							wscen+="<br><br>Elimination du chiffre "+chif+" dans toutes les cases voyant "+colPlace[casereel]+" et "+colPlace[hkreel]+" :";
							deb=false;
						}
						if (lc==0) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+colPlace[casereel]+" et "+colPlace[hkreel]+", dont une ligne commune avec "+colPlace[casereel]+" ou "+colPlace[hkreel]+"."}
    					if (lc==1) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+colPlace[casereel]+" et "+colPlace[hkreel]+", dont une colonne commune avec "+colPlace[casereel]+" ou "+colPlace[hkreel]+"."}
    					if ((lc==2) && !hkdejavu(hek, h1, v1)) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+colPlace[casereel]+" et "+colPlace[hkreel]+", dont un bloc commun avec "+colPlace[casereel]+" ou "+colPlace[hkreel]+"."}
						for (var hnum=0; hnum<chek.length; hnum++) {if (chek[hnum]==chif) {
						eliminationnumero(hek, chek[hnum])}}
					}
					}
				}
			}
		 }// k
	}// lc
}

function eliminationchiffre(case1, case2, chif) {
	var re=/\d/g;
	// case1 et case2 ne se voient pas
	// Recherche de cases hek voyant case1 et case2 et leur node, et contenant chif a eliminer, differente de casedepart, pas dans la chaine ni dans un node
	var casereel=decodagecolPlace(case1);
	var hkreel=decodagecolPlace(case2);
	var h1=parseInt(casereel/9);//	Ligne case1
	var v1=casereel-9*h1;// Colonne case 1
	var c1=carre[casereel]-1; // Bloc case1
 	// nodes
	var node1=M;
	if (case1.length>2) {node1=decodagecolPlace(case1.substring(2,4))}
	var node2=M;
	if (case2.length>2) {node2=decodagecolPlace(case2.substring(2,4))}	
	var deb=true;
	for (var lc=0; lc<3; lc++) {
		 for (var k=0; k<9; k++) {// Recherche case hk voyant case1 et case2, qui ne soit pas un node
			 switch (lc) {
			 		case 0:// Ligne de case1
						 var hek=9*h1+k;
						 break;
			 		case 1:// Colonne de case1
						 var hek=9*k+v1;
						 break;
			 		case 2:// Bloc de case1
           		  	   	 var hek=k+6*parseInt(k/3)+18*parseInt(c1/3)+3*c1;
						 break;
			 }
			 var pos15=contenu[hek];
			 if (pos15.length>1) {
			 	var chek=pos15.match(re);
			 	// hek, different des cases, des als et leurs nodes, voit hkreel et contient chif
				var chainee=wscen.split("<br>")[0];
				var last=chainee.substring(chainee.length-2, chainee.length);
				var hkplus=hkreel;
				if (last!=case2) {hkplus=decodagecolPlace(last)}
				if ((sevoient(hek, hkreel) && sevoient(hek, hkplus) && (pos15.split(chif)[0].length<pos15.length)) && (chainee.split(colPlace[hek])[0].length==chainee.length)) {// tous les criteres respectes
					if ((node1===M) || sevoient(hek,node1)) {
					if ((node2===M) || sevoient(hek,node2)) {
						if (deb) {// cas de double
							wscen+="<br><br>Elimination du chiffre "+chif+" dans toutes les cases voyant "+case1+" et "+case2+" :";
							deb=false;
						}
						if (lc==0) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+case1+" et "+case2+", dont une ligne commune avec "+case1+" ou "+case2+"."}
    					if (lc==1) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+case1+" et "+case2+", dont une colonne commune avec "+case1+" ou "+case2+"."}
    					if ((lc==2) && !hkdejavu(hek, h1, v1)) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+case1+" et "+case2+", dont un bloc commun avec "+case1+" ou "+case2+"."}
						for (var hnum=0; hnum<chek.length; hnum++) {if (chek[hnum]==chif) {
						eliminationnumero(hek, chek[hnum])}}
					}
					}
				}
			}
		 }// k
	}// lc
}


function hkdejavu(case1, hh1, vv1) {
		 for (var k=0; k<9; k++) {
		 	 if ((case1==(9*hh1+k)) || (case1==(9*k+vv1))) {return true}
		 }
		 return false;
}

function testlienfort(case1, case2, chif) {// Identification de la nature du lien entre case1 et case2 contenant chif, en excluant un ou plusieurs nodes potentiels de case1 (caseref) : a faire
	// une fois le lien identifie, on peut proceder a la validation de la liaison passant par case1, assurant la continuite de la chaine AIC
	var h1=parseInt(case1/9);
	var v1=case1-9*h1;
	var h2=parseInt(case2/9);
	var v2=case2-9*h2;
	var ii=carre[case1];
	var jj=carre[case2];
	if (((h1==h2) || (v1==v2)) && (jj!=ii)) {// Recherche sur axe commun et blocs differents
    	var lien=true;
    	for (var k=0; k<9; k++) {// Recherche sur cet axe case1-case2, case1 et case2 dans blocs differents
        	 if (h1==h2) {var hk=9*h1+k}
        	 if (v1==v2) {var hk=9*k+v1}
        	 var pos12=contenu[hk];
        	 if ((hk!=case1) && (hk!=case2) && ((pos12+"").split(chif)[0].length<pos12.length)) {lien=false}
        }// k
		if (lien) {return true}// Retour en lien fort sur axe commun et blocs differents
	}
	if (jj==ii) {// bloc commun case1-case2 
		var lien=true;
		ii=ii-1;
		for (var k=0; k<9; k++) {// Recherche dans bloc case1-case2 autre case contenant chif, differente de case1, case2
           	 var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
			 var pos13=contenu[hk];
			 if ((hk!=case1) && (hk!=case2) && ((pos13+"").split(chif)[0].length<pos13.length)) {lien=false}
		}// k
		if (lien) {return true}// Retour en lien fort dans bloc
	}
	return false;
}

function testlienfortavecnodeapres(case1, hnode, chif) {
	// calcul lien entre case1 et node hnode par chif
	var ii=carre[case1]-1;
	var hor=parseInt(case1/9);
	var vert=case1-9*parseInt(case1/9);
	var ii=carre[case1]-1;
	var inode=0;	
		var case2=decodagecolPlace(hnode.substring(2*inode, 2*inode+2));
    	if (carre[case1]==carre[case2]) {
    		for (var k=0; k<9; k++) {
    			var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
                var posc=contenu[hk];
                if ((hk!=case1) && (hk!=case1) && (posc.length>1) && (hnode.split(colPlace[hk])[0].length==hnode.length) && (posc.split(chif)[0].length<posc.length)) {return false}
    		}// k
    		return true;
    	}
    	var hh=parseInt(case1/9);
    	if (parseInt(case1/9) == parseInt(case2/9)) {
    		for (var k=0; k<9; k++) {
                var hk=hh*9+k;
    			var posh=contenu[hk];
                if ((hk!=case1) && (hk!=case2) && (posh.length>1) && (hnode.split(colPlace[hk])[0].length==hnode.length) && (posh.split(chif)[0].length<posh.length)) {return false}
    		}// k
    		return true;
    	}
    	var vv=case1-9*hh;
    	for (var k=0; k<9; k++) {
                var hk=vv+9*k;
    			var posv=contenu[hk];
                if ((hk!=case1) && (hk!=case2) && (posv.length>1) && (hnode.split(colPlace[hk])[0].length==hnode.length) && (posv.split(chif)[0].length<posv.length)) {return false}
    	}// k
    	return true;
}

function testnode(case1, case2, chif) {// nodes sur case1=caseref ou case2=hk par chif, enregistres sur casexy[xychain]
	// cela cree un lien fort entre les cases case1 et case2=hk
	if (carre[case1]==carre[case2]) {var zone="b"}// meme bloc case1-case2
	else {
		if (parseInt(case1/9)==parseInt(case2/9)) {var zone="h"}// meme axe horisontal case1-case2, sans bloc commun case1-case2
		if ((case1-9*parseInt(case1/9))==(case2-9*parseInt(case2/9))) {var zone="v"}// meme axe vertical case1-case2, sans bloc commun case1-case2
	}
    var ref=case2;// node sur hk
	var alter=false;
   	var ii=carre[ref]-1;
    var hori=parseInt(ref/9);
    var vert=ref-9*hori;
    var chaine=colPlace[ref];
	for (var i=0; i<9; i++) {
			switch(zone) {
				case "b":
        			var node=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii;
					break;
				case "h":
    				var node=i+9*hori;
					break;
				case "v":
    				var node=9*i+vert;
					break;
				default:
        			var node=0;
					break;
			}
			var posnode=contenu[node];
			// 5 + 3 = 8 condirions de base pour node : Case contenant le candidat chif, avec plus de 1 chiffre, differente de case1 et de case2, + est dans le bloc de ref, sur axe commun avec ref et enfin pas dans la chaine --> node potentiel
			var hnode=(parseInt(node/9) == hori);
            var vnode=((node-9*parseInt(node/9)) == vert);
            var axecommun=(hnode  ||  vnode);
			if ((node!=case1) && (node!=case2) && (posnode.length>1) && (posnode.split(chif)[0].length<posnode.length)) {
				// node sur axe case1 - case2 (horizontal ou vertical) si pas bloc commun case1 - case2
				// node pas sur axe commun case1-case2 (horizontal ou vertical) si bloc commun case1 - case2
				if  (((zone=="h") && hnode) || ((zone=="b") && !hnode) || ((zone=="v") && vnode) || ((zone=="b") && !vnode)) {
					if ((carre[node]==carre[ref]) && axecommun && verifpasdanschaine(node)) {
						if ((chaine.length==2) || (zone!="b")) {
							chaine+=colPlace[node];
						} else {// node double
							var nodepre=decodagecolPlace(chaine.substring(2,4));
							var hnodepre=(parseInt(nodepre/9) == hori);
            				var vnodepre=((nodepre-9*parseInt(nodepre/9)) == vert);
							if ((hnodepre == hnode)|| (vnodepre == vnode)) {chaine+=colPlace[node]} else {alter=true}
						}
					} else {alter=true}
				}// zone
			}// node			
    }// i
	if ((chaine.length>2) && !alter) {casexy[xychain+1]=chaine; lienfaible[xychain]=!alter; return true}// lien fort aval sur caseref avec node et/ou sur hk avec node
	return false;// node non trouve ou case autre: lien faible
}	

function testnodebegin(case1, case2, chif, nonnode) {// nodes sur case1=caseref ou case2=hk par chif, enregistres sur casexy[xychain]
	// cela cree un lien fort entre les cases case1 et case2=hk
    var chaine=colPlace[case2];
	if (nonnode==2) {
		casexy[xychain+1]=chaine; 
		lienfaible[xychain]=!testlienfortgeneral(case1, case2, chif); 
		return;	
	}
	if (carre[case1]==carre[case2]) {var zone="b"}// meme bloc case1-case2
	else {
		if (parseInt(case1/9)==parseInt(case2/9)) {var zone="h"}// meme axe horisontal case1-case2, sans bloc commun case1-case2
		if ((case1-9*parseInt(case1/9))==(case2-9*parseInt(case2/9))) {var zone="v"}// meme axe vertical case1-case2, sans bloc commun case1-case2
	}
    var ref=case2;// node sur hk
	var autre=true;
   	var ii=carre[ref]-1;
    var hori=parseInt(ref/9);
    var vert=ref-9*hori;
	var nonnodein=0;
	for (var i=0; i<9; i++) {
			switch(zone) {
				case "b":
        			var node=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii;
					break;
				case "h":
    				var node=i+9*hori;
					break;
				case "v":
    				var node=9*i+vert;
					break;
				default:
        			var node=0;
					break;
			}
			var posnode=contenu[node];
			// 5 + 3 = 8 condirions de base pour node : Case contenant le candidat chif, avec plus de 1 chiffre, differente de case1 et de case2, + est dans le bloc de ref, sur axe commun avec ref et enfin pas dans la chaine --> node potentiel
			var hnode=(parseInt(node/9) == hori);
            var vnode=((node-9*parseInt(node/9)) == vert);
            var axecommun=(hnode  ||  vnode);
			if ((node!=case1) && (node!=case2) && (posnode.length>1) && (posnode.split(chif)[0].length<posnode.length)) {
				// node sur axe case1 - case2 (horizontal ou vertical) si pas bloc commun case1 - case2
				// node pas sur axe commun case1-case2 (horizontal ou vertical) si bloc commun case1 - case2
				if  (((zone=="h") && hnode) || ((zone=="b") && !hnode) || ((zone=="v") && vnode) || ((zone=="b") && !vnode)) {
					if ((carre[node]==carre[ref]) && axecommun && verifpasdanschaine(node)) {
						if ((chaine.length==2) || (zone!="b")) {
							chaine+=colPlace[node];
							if (nonnode==1) {autre=false}
						} else {
							var nodepre=decodagecolPlace(chaine.substring(2,4));
							var hnodepre=(parseInt(nodepre/9) == hori);
            				var vnodepre=((nodepre-9*parseInt(nodepre/9)) == vert);
							if ((hnodepre == hnode)|| (vnodepre == vnode)) {chaine+=colPlace[node]} else {autre=false}
						}
					} else {
						autre=false;
					}
				} else {
						autre=false;
				}// zone
			}// node			 
        	if (chaine.length>2) {// node trouve
					if (nonnode==nonnodein) {
						casexy[xychain+1]=chaine;
					} else {// recherche node suivant
						nonnodein+=1;
						chaine=colPlace[ref];
					}
        	}// lien fort aval sur caseref avec node et/ou sur hk avec node
}// i
	if (chaine.length>2) {casexy[xychain+1]=chaine; lienfaible[xychain]=!autre}// lien fort aval sur caseref avec node et/ou sur hk avec node
}	

