function f3DMedusa() {// Methode 3D Medusa
var re=/\d/g;
tableauvariante = [];//Reinitialisation de la liste des variantes
tableauvariante[0] = "Liste calculee des variantes";
for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
scenario=noeffect;
	for (var i=0; i<M; i++) {// Case de depart
		if (contenu[i].length>1) {
        	xychain=0;// pointeur de la case de casedepart
			casedepart=i;
			casexy[0]=casedepart;
            var posref=contenu[casedepart];
            var chref=posref.match(re);
   			chiffrexy[0]=chref[0];
   			validationdanslachainemedusa();
			if (scenario!=noeffect) {return}// depilement
		}
   	}// i
}


function validationdanslachainemedusa() {
	if (xychain>MAXMEDUSA) {return}
	var re=/\d/g;
	var casepre=casedepart;
	if (xychain>0) {casepre=casexy[xychain-1]}
	var caseref=casexy[xychain];
	var posref=contenu[caseref];
 	var chref=posref.match(re);
	if (xychain>0) {var chiffrepre=chiffrexy[xychain-1]}
	var ii=carre[caseref]-1;
   	// Recherche noeud suivant vu de caseref et en lien fort avec caseref par chiffre
etablirchainemedusa();
	for (var indicem=0; indicem<chref.length; indicem++) {
		var chiffre=chref[indicem];
		if ((xychain>0) && (chref.length>2) && (chiffre!=chiffrepre)) {continue}
		for (var lc=0; lc<3; lc++) {
            for (var k=0; k<9; k++) {
   				var hkbloc=true;
        		switch (lc) {
                	   case 0:
                   		    var hk=9*parseInt(caseref/9)+k;//		    Ligne caseref
                			break;
                	   case 1:
                   	   		var hk=9*k+caseref-9*parseInt(caseref/9);// Colonne caseref
                			break;
                	   case 2://									Bloc caseref
                   		  	var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;//  Bloc
            				hkbloc=((hk-9*parseInt(hk/9))!=(caseref-9*parseInt(caseref/9))) && (parseInt(hk/9)!=parseInt(caseref/9));
                			break;
                	   default:
                		    break;
                }
    			if  (hkbloc && (hk!=caseref) && (hk!=casepre) && (hk!=casedepart)) {
            			var posval=contenu[hk];
            			var chk=posval.match(re);
						if ((posval.length>1) && (posval.split(chiffre)[0].length<posval.length)) {// Case vue contenant le candidat chiffre
								var pasvupasfait=true;;
                				for (var j=0; j<xychain; j++) {// hk pas dans la chaine sauf variete 1
                						if (hk==casexy[j]) {
                    						pasvupasfait=false;
                						}
                				}
                      			if (pasvupasfait && testlienfortgeneral(caseref, hk, chiffre)) {
										chiffrexy[xychain]=chiffre;
										xychain+=1;// Pointe sur la case suivante hk
                                		casexy[xychain]=hk;
										etablirchainemedusa();
    									// recherche, a partir de wscen, indicesolution parmi 6, elimination doublon et enregistrement dans tableauvariante
										if ((xychain>3) && solutionmedusa()) {// iterer si pas de solution trouvee, sinon, chercher hk suivant
											resultmedusa+="$"+variete;
											enregistrescenariomedusa();// sauf variete 5 et couleurs differentes (cf solutionmedusa)
										} else {
											validationdanslachainemedusa();// Reentrant avec hk
										}
										xychain-=1
    									if (scenario!=noeffect) {return}// Depilement
           						}// pasvupasfait 
        				}// posval 
    			}// hkbloc
            }// k : recherche case hk vue suivante (k puis lc)
		}// lc
	}// indicem
}      

function etablirchainemedusa() {

	wscen="";
	for (var i=0; i<xychain; i++) {
		wscen+=colPlace[casexy[i]]+"="+chiffrexy[i]+"=";
	} 
	wscen+=colPlace[casexy[xychain]];

}

function enregistrescenariomedusa() {
	  var pasvu=true;
	  for (var i=1; i<maxvarencours; i++) {
			if (tableauvariante[i].split("<br>")[1]==resultmedusa.split("<br>")[1]) {pasvu=false; break}
	  }
	  if (pasvu) {
		  tableauvariante[maxvarencours] = resultmedusa;
          maxvarencours+=1;
		  	 wscen=resultmedusa.split("<br>")[2];
			 fabricationdeseliminationsbis();
			 annexe();
	  }						
}

function annexe() {
	var s0=wscen.split("Elimination ");
	for (var j=1; j<s0.length; j++) {
		var s1=s0[j].split(" dans ");
		for (var i=1; i<s1.length; i++) {
           		var n=s1[i-1].substring(s1[i-1].length-1, s1[i-1].length);
               	var HH=s1[i].substring(0,2);
        		var h=decodagecolPlace(HH);
				iter3+="<br>Elimination "+n+" dans "+HH+" avec maxvarencours "+maxvarencours;
				// tester si pas deja rouge
				eliminationnumerobis(h,n);
//				iter3+="<br>Résultat "+sortieinser[h]+"<br>";
				sortieinser[h]="";
        }// i
	}// j
//	colorise3Dmedusa(wscen.split("<br>")[2].split(" Elimination")[0]);

}

function eliminationnumerobis(position, numeroaeliminer) {
		var currSquare = SQ + colPlace[position];
		var ini= document.getElementById(currSquare).innerHTML;
		var qelim=contenu[position].toString();
		var j=qelim.split(numeroaeliminer)[0].length;
		var nombrenumeros=qelim.length;
		if (j<nombrenumeros) {// Vrai si contenu[position] contient numeroaeliminer et d'autres chiffres
//				scenario=wscen;
				if (coloris) {
					  var inser=PREPRINT+numeroaeliminer+POSTPRINT;// A inserer
        			  var jm=sortieinser[position].length;
					  if (jm==0) {// Premier passage
    				  	if (j==0) {
						 	sortieinser[position]=inser+PREAUTRE+qelim.substring(j+1,nombrenumeros)+POSTAUTRE;
						} else if (j==(nombrenumeros-1)) {
							sortieinser[position]=PREAUTRE+qelim.substring(0,j)+POSTAUTRE+inser;
						} else {
							sortieinser[position]=PREAUTRE+qelim.substring(0,j)+POSTAUTRE+inser+PREAUTRE+qelim.substring(j+1,nombrenumeros)+POSTAUTRE;
						}
    				  } else {// Suivants
						  if (!(sortieinser[position].split(PREPRINT+numeroaeliminer)[0].length<jm)) {// Pas deja fait
								 var i=0;
								 var jj=0;
								 do	 {
    							 	 var nch=sortieinser[position].split(numeroaeliminer)[i];
    								 var kk=nch.length;
									 jj=jj+kk+1;
								 	 var trouv=false;
									 for (var ii=6; ii>0; ii--) {if (nch.substring(kk-ii, kk-ii+1)=="#") {trouv=true}}
        							 i=i+1;
    							 }
								 while (trouv);
								 if (j<(nombrenumeros-1)) {
								 	sortieinser[position]=sortieinser[position].substring(0,jj-1)+inser+PREAUTRE+sortieinser[position].substring(jj,jm);
								 } else {// sauf jj en dernier
								 	sortieinser[position]=sortieinser[position].substring(0,jj-1)+POSTAUTRE+inser;
								 }
    				  	  }
    				 }
					 document.getElementById(currSquare).innerHTML = sortieinser[position];
				} else {				
					contenu[position] = qelim.substring(0,j) + qelim.substring((j+1),nombrenumeros);
					if (contenu[position].length<2) {
					   if (contenu[position].length==1) {
					   		document.getElementById(currSquare).innerHTML ="<b>"+contenu[position]+"</b>";
					   } else {
							return;
					   }
					} else {
					  document.getElementById(currSquare).innerHTML = "<span style='font-size:xx-large'>"+contenu[position]+"</span>";
					}
					xy=true;
			  }
		}
}


function fabricationdeseliminationsbis() {
	var re=/\d/g;
	variete=wscen.split(tradacrit("$"))[1].substring(0,1);
	var ws1="";
	switch(parseInt(variete)) {
		case 1:// Same color twice in a cell
		case 4:// Emptying a cell
		case 5:// twice in a unit
			// Validation dans cases de couleur valide et Elimination dans cases de couleur invalide
			// La derniere case est de couleur fausse
			var chaine=wscen.split("$")[0];
//			var chaine=wscen.split("<br>")[2];
			wscen+=" Elimination";
			if (variete==5) {var finalcolor=couleurchaine(chaine, true)} else {var finalcolor=couleurchainebis(chaine, true)}
			break;
		case 0:// two colors in a cell
			// validation chiffre et chiffre0 dans case de départ
			var ws1=resultmedusa.split("chiffres ")[1];
//			var ws1=wscen.split("chiffres ")[1];
			var chiffre0=ws1.substring(0,1);
			var chiffre=ws1.substring(5,6);
//			variete=wscen.split(tradacrit("variété "))[1].substring(0,1);
			var ws2=ws1.split("case ")[1];
			var HH=ws2.substring(0,2);
			var h=decodagecolPlace(HH);
			var posh=contenu[h];
			var chh=posh.match(re);
			wscen+=tradacrit("<br>Boucle fermée avec 2 chiffres valides dans case de départ : Elimination ");
			for (var k=0; k<posh.length; k++) {
					var m=chh[k];
					if ((m!=chiffre0) && (m!=chiffre)) {
					wscen+=" "+m+" dans "+HH
					}// a eliminer
			}// k
			break;
		case 2:// Sees two different colors
			// Elimination chiffre dans cases exterieures
			var ws1=resultmedusa.split("chiffre ")[1];
//			var ws1=wscen.split("chiffre ")[1];
			var chiffre=ws1.substring(0,1);			
			var ws2=ws1.split(tradacrit("extérieure "))[1];
			var ws3=ws2.split(" voyant ")[0];
			var ws4=ws3.split(" ");
			wscen+="<br>Elimination ";
			for (var k=0; k<ws4.length-1; k++) {
				wscen+=" "+chiffre +" dans "+ws4[k];
			}
			break;
		case 3:// unit-cell elimination
			// Elimination chiffre dans case de la chaine
			var ws1=resultmedusa.split("chiffre ")[1];
//   			var ws1=wscen.split("chiffre ")[1];
   			var chiffre=ws1.substring(0,1);
   			var ws2=ws1.split(tradacrit("de la chaîne "))[1];
   			var HH=ws2.substring(0,2);
   			wscen+="<br><br>Elimination "+chiffre+" dans "+HH;
			break;
		default:
			break;			
	}
	return true;
}



function solutionmedusa() {// selon wscen HH n HH n HH ... n HH
var re=/\d/g;
var s0=wscen.split("=");
var couleur=couleurchaine(wscen, false);
var HHfin=s0[s0.length-1];
var chiffre=s0[s0.length-2];
var hk=decodagecolPlace(HHfin)// hk
//eliminationnumero(hk, chiffre);
var caseint=decodagecolPlace(s0[s0.length-3]);// case previous
var chiffre0=chiffrexy[0];
var posref=contenu[casedepart];
var chref=posref.match(re);
var possol=contenu[hk];
var iifinal=carre[hk]-1;
for (indice3DMedusa=0; indice3DMedusa<6; indice3DMedusa++) {
variete=indice3DMedusa;
switch(indice3DMedusa) {
	case 5:
		if (sevoient(casedepart, hk) && (posref.split(chiffre)[0].length<posref.length) && !couleur && (posref.length==2) && (chiffre!=chiffre0)) {
			resultmedusa=tradacrit("3D Medusa variété 5<br>twice in a unit : chiffres "+chiffre+" et "+chiffre0+" dans cases de la boucle "+colPlace[hk] +" et "+colPlace[casedepart]+" se voyant avec des couleurs différentes, la case de départ contenant le chiffre final.<br>")+wscen;
			return true;	
		}
		break;
	case 1:										
		if (sevoient(casedepart, hk)) {
			var couleurfinale=couleurchainebis(wscen, false);
			if ((posref.split(chiffre)[0].length<posref.length) && (chiffre!=chiffre0) && couleurfinale && testlienfortgeneral(casedepart, hk, chiffre)) {
				wscen+="="+chiffre+"="+colPlace[casedepart];
				resultmedusa=tradacrit("3D Medusa variété 1<br>Same color twice in a cell : chiffre "+chiffre+" et "+chiffre0+" de même couleur dans case "+colPlace[casedepart]+"<br>")+wscen;
				return (posref.length>2);// enregistrer si plus de 2 chiffres
			}
		}
		break;
	case 2:
		// Conditions variete 2 : boucle ouverte avec chiffres extrêmes differents et de meme couleur, la case finale possedant 2 chiffres dont le chiffre de depart
		if ((chiffre!=chiffre0) && couleur && (contenu[hk].length==2) && (contenu[hk].split(chiffre0)[0].length<contenu[hk].length)) {
			// Recherche des case externes de la boucle, contenant chiffre0 et voyant les 2 cases hk et casedepart (variete 2)
			var caseext="";
			for (var lc=0; lc<3; lc++) {
				for (var k=0; k<9; k++) {
	        		var hkbloc=true;
  					switch (lc) {
    					case 0:
                        	var hext2=k+9*parseInt(hk/9);
                            break;
    					case 1:
    						var hext2=hk-9*parseInt(hk/9)+9*k;
    						break;
    					case 2:
    						var hext2=k+6*parseInt(k/3)+18*parseInt(iifinal/3)+3*iifinal;
    						hkbloc=((hk-9*parseInt(hk/9))!=(hext2-9*parseInt(hext2/9))) && (parseInt(hk/9)!=parseInt(hext2/9));
    						break;
					}
					if  (hkbloc && (hext2!=hk) && (hext2!=casedepart) && sevoient(hext2, casedepart)) {
						var posext2=contenu[hext2];
						var chext=posext2.match(re);
						if ((posext2.length>1) && (posext2.split(chiffre0)[0].length<posext2.length)) {
							var pasvupasfait=true;;
                			for (var j=0; j<xychain; j++) {// hext2 pas dans la chaine
                				if (hext2==casexy[j]) {pasvupasfait=false}
                			}
                			if (pasvupasfait){caseext+=colPlace[hext2]+" "}
						}// posext2 contient chiffre
    				}// hkbloc 
    			}// k 
    		}// lc
    		if (caseext!="") {
    			// case exterieure contenant chiffre voyant hk et casedepart, avec ce chiffre de même couleur ainsi que caseint contenant chiffre (avant-derniere case de la chaine)
    			resultmedusa=tradacrit("3D Medusa variété 2<br>sees two different colors : chiffre "+chiffre0+" ne peut être dans toute case extérieure "+caseext +" voyant les extrémités de la chaîne "+colPlace[hk]+" et "+colPlace[casedepart]+", sachant que la case finale possède 2 chiffres dont le chiffre de départ de la chaîne et un chiffre final ayant la même couleur que le chiffre de départ de la chaîne.<br>")+wscen;
    			return true;											
    		}
		}// conditions
		break;
	case 0:	
		var couleurfinale=couleurchaine(wscen, false);
		var last=wscen.substring(wscen.length-2, wscen.length);
        if ((posref.split(chiffre)[0].length<posref.length) && testlienfortgeneral(casedepart, hk, chiffre) && (chiffre!=chiffre0) && !couleurfinale && sevoient(casedepart, decodagecolPlace(last))) {
			wscen+="="+chiffre+"="+colPlace[casedepart];
          	resultmedusa=tradacrit("3D Medusa variété 0<br>two colors in a cell : chiffres "+chiffre+" et "+chiffre0+" de couleurs différentes dans case "+colPlace[casedepart]+"<br>")+wscen;
          	return (posref.length>2);// enregistrer si plus de 2 chiffres
        }
		break;
	case 4:
        if ((chiffre!=chiffre0) && couleur && !sevoient(hk, casedepart)) {
            // Recherche case externe devenant vide voyant hk et casedepart ne contenant que les 2 chiffres chiffre et chiffre0
            for (var lc=0; lc<3; lc++) {
            	for (var k=0; k<9; k++) {
            		var hkbloc=true;
            		switch (lc) {
            			case 0:
                 			var hext=9*parseInt(hk/9)+k;
                            break;
            			case 1:
                       	   	var hext=hk-9*parseInt(hk/9)+9*k;
                       		break;
            			case 2:
            				var hext=k+6*parseInt(k/3)+18*parseInt(iifinal/3)+3*iifinal;//  Bloc
            				hkbloc=((hk-9*parseInt(hk/9))!=(hext-9*parseInt(hext/9))) && (parseInt(hk/9)!=parseInt(hext/9));
            				break;
            		}
            		if  (hkbloc && (hext!=hk)  && (hext!=casedepart) && sevoient(hext, casedepart)) {
            			var posext=contenu[hext];
            			var chext=posext.match(re);
            			if ((posext.length==2) && (posext.split(chiffre)[0].length<posext.length) && (posext.split(chiffre0)[0].length<posext.length)) {
                        	var pasvupasfait=true;
                        	for (var j=0; j<xychain; j++) {// hext pas dans la chaine
                        		if (hext==casexy[j]) {pasvupasfait=false}
                        	}
                        	if  (pasvupasfait) {
            // case exterieure contenant chiffre et chiffre0 voyant hk et casedepart
            resultmedusa=tradacrit("3D Medusa variété 4<br>emptying a cell : chiffre "+chiffre+" et "+chiffre0+" dans case extérieure à 2 chiffres "+colPlace[hext] +" voyant les 2 cases extrêmes de la chaîne "+colPlace[hk]+" contenant "+chiffre+" et "+colPlace[casedepart]+" contenant "+chiffre0+" avec les mêmes couleurs.<br>")+wscen;
            					return true;											
            				}
            			}// posext contient chiffre et chiffre0
            		}// hkbloc 
            	}// k 
            }// lc
        }// conditions
		break;
	case 3:
        if (sevoient(casedepart, hk) && (chiffre!=chiffre0) && !couleur && (possol.split(chiffre0)[0].length<possol.length)) {
        	resultmedusa=tradacrit("3D Medusa variété 3<br>unit-cell elimination : chiffre "+	chiffre0+" ne peut être dans case de la chaîne "+colPlace[hk]+" voyant la case de départ de la chaîne "+colPlace[casedepart]+" contenant "+chiffre0+" avec une couleur différente du chiffre "+chiffre+" de cette case "+colPlace[hk]+", chiffre final de la chaîne.<br>")+wscen;
        	return true;
        }
		break;
}
}
return false;
}

function extension(chaine, couleurinit, case1, chiffre) {
// Recherche case voyant case1 contenant chiffre, ne faisant pas partie de la chaine
var re=/\d/g;
var ii=carre[case1]-1;
for (var lc=0; lc<3; lc++) {
	for (var k=0; k<9; k++) {
		var hkbloc=true;
		switch (lc) {
			case 0:
     			var hext=9*parseInt(case1/9)+k;
                break;
			case 1:
           	   	var hext=case1-9*parseInt(case1/9)+9*k;
           		break;
			case 2:
				var hext=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;//  Bloc
				hkbloc=((case1-9*parseInt(case1/9))!=(hext-9*parseInt(hext/9))) && (parseInt(case1/9)!=parseInt(hext/9));
				break;
		}
		if  (hkbloc && (hext!=case1)  && (hext!=casedepart)) {// case exterieure voyant case1, differente de case1 et de casedepart
			var posext=contenu[hext];
			var chext=posext.match(re);
			if ((posext.length>1) && (posext.split(chiffre)[0].length<posext.length) && (chaine.split(colPlace[hext])[0].length==chaine.length) && testlienfortgeneral(case1, hext, chiffre)) {// case contenant chiffre et ne faisant pas partie de la chaine
				if (couleurinit) {
					wscen+=" "+chiffre+" dans "+colPlace[hext];// Elimination si couleur vraie
				} else {
					if (posext.length==2) {
						var chext=posext.match(re);
						var p=chext[0];
						if (p==chiffre) {p=chext[1]}
						wscen+=" "+p+" dans "+colPlace[hext];// Elimination complement si couleur fausse et case a 2 chiffres
					}
				}
			}// posext
		}//hkbloc
	}// k
}// lc
}

function fabricationdeseliminations() {
	var re=/\d/g;
	variete=wscen.split(tradacrit("variété "))[1].substring(0,1);
   	var ws1=resultmedusa.split("chiffre ")[1];
	switch(parseInt(variete)) {
		case 1:// Same color twice in a cell
		case 4:// Emptying a cell
		case 5:// twice in a unit
			// Validation dans cases de couleur valide et Elimination dans cases de couleur invalide
			// La derniere case est de couleur fausse
			var chaine=wscen.split("<br>")[2];
			wscen+=" Elimination";
			if (variete==5) {var finalcolor=couleurchaine(chaine, true)} else {var finalcolor=couleurchainebis(chaine, true)}
			break;
		case 0:// two colors in a cell
			// validation chiffre et chiffre0 dans case de départ
			var chiffre0=ws1.substring(0,1);
			var chiffre=ws1.substring(5,6);
			variete=wscen.split(tradacrit("variété "))[1].substring(0,1);
			var ws2=ws1.split("case ")[1];
			var HH=ws2.substring(0,2);
			var h=decodagecolPlace(HH);
			var posh=contenu[h];
			var chh=posh.match(re);
			wscen+=tradacrit("<br>Boucle fermée avec 2 chiffres valides dans case de départ : Elimination ");
			for (var k=0; k<posh.length; k++) {
					var m=chh[k];
					if ((m!=chiffre0) && (m!=chiffre)) {wscen+=" "+m+" dans "+HH}// a eliminer
			}// k
			break;
		case 2:// Sees two different colors
			// Elimination chiffre dans cases exterieures
			var chiffre=ws1.substring(0,1);
			var ws2=ws1.split(tradacrit("extérieure "))[1];
			var ws3=ws2.split(" voyant ")[0];
			var ws4=ws3.split(" ");
			wscen+="<br>Elimination ";
			for (var k=0; k<ws4.length-1; k++) {
				wscen+=" "+chiffre +" dans "+ws4[k];
			}
			break;
		case 3:// unit-cell elimination
			// Elimination chiffre dans case de la chaine
   			var chiffre=ws1.substring(0,1);
   			var ws2=ws1.split(tradacrit("de la chaîne "))[1];
   			var HH=ws2.substring(0,2);
   			wscen+="<br><br>Elimination "+chiffre+" dans "+HH;
			break;
		default:
			break;			
	}
	return true;
}

function elaborevariante3DMedusa() {
if (fabricationdeseliminations()) {
	// Methode 28
	// Chaine Medusa : Elimination n dans HH n dans HH .... n dans HH
	var re=/\d/g;
	var s0=wscen.split("Elimination ");
	for (var j=1; j<s0.length; j++) {
		var s1=s0[j].split(" dans ");
		for (var i=1; i<s1.length; i++) {
           		var n=s1[i-1].substring(s1[i-1].length-1, s1[i-1].length);
               	var HH=s1[i].substring(0,2);
        		var h=decodagecolPlace(HH);
				eliminationnumero(h,n);
        }// i
	}// j
	colorise3Dmedusa(wscen.split("<br>")[2].split(" Elimination")[0]);
} else {
	// Pas d elimination dans ce tableau
}
}

function couleurchaine(HH, plus) {
var re=/\d/g;
var imax=parseInt(HH.length/5);
var n=parseInt(HH.substring(3,4));
var h=decodagecolPlace(HH.substring(0,2));
var posref=contenu[h];
var couleur=true;
if (plus) {extension(HH, couleur, h, n)}
if (posref.length==2) {
	var chk=posref.match(re);
	var p=chk[0];
	if (n==p) {p=chk[1]}
	if (plus) {wscen+=" "+p+" dans "+colPlace[h]}
}
for (var i=0; i<imax; i++) {
	var x=HH.substring(5*i+2, 5*i+7);
	var h=decodagecolPlace(x.substring(3,5));
	var m=x.substring(1,2);
	if (m==n) {couleur=!couleur}
	if (plus) {extension(HH, couleur, h, m)}
	if (couleur && plus) {
		var poscol=contenu[h];
		var chk=poscol.match(re);
		for (var ch=0; ch<chk.length; ch++) {
			var p=chk[ch];
			if (p!=m) {wscen+=" "+p+" dans "+colPlace[h]}
		}
	}
	if (!couleur && plus && (contenu[h].length==2)) {wscen+=" "+m+" dans "+colPlace[h]}
	n=m;
}// i
return couleur;
}

function couleurchainebis(HH, plus) {
var re=/\d/g;
var imax=parseInt(HH.length/5);
var n=parseInt(HH.substring(3,4));
var h0=decodagecolPlace(HH.substring(0,2));
var posref=contenu[h];
var couleur=false;
for (var i=0; i<imax; i++) {
	var x=HH.substring(5*i+2, 5*i+7);
	var h=decodagecolPlace(x.substring(3,5));
	var m=x.substring(1,2);
	if (m==n) {couleur=!couleur}
	if (h==casedepart) {continue}	
	if (plus && (i<imax-1)) {extension(HH, couleur, h, m)}
	if (plus&& (i<imax-1)) {
    	if (couleur) {
    		var poscolbis=contenu[h];
    		var chk=poscolbis.match(re);
    		for (var ch=0; ch<chk.length; ch++) {
    			var p=chk[ch];
    			if (p!=m) {wscen+=" "+p+" dans "+colPlace[h]}
    		}
		} else {
			if (n==m) {wscen+=" "+n+" dans "+colPlace[h]}
		}
	}
	if (!couleur && plus && (contenu[h].length==2)) {wscen+=" "+m+" dans "+colPlace[h]}
	n=m;
}// i
return couleur;
}

function colorise3Dmedusa(HH) {
var imax=parseInt(HH.length/5);
var couleur=BACKVERT;
var couleurpre=couleur;
var hpre=decodagecolPlace(HH.substring(0, 2));//1ere case
var n=parseInt(HH.substring(3,4));
var n0=n;
var h0=hpre;
miseauvert(hpre, n, couleur);
var xcolor=true;
for (var i=0; i<imax; i++) {
	var x=HH.substring(5*i+2, 5*i+7);
	var h=decodagecolPlace(x.substring(3,5));
	var m=x.substring(1,2);
	if (m==n) {// inversion couleur de m dans h
		if (couleur==BACKVERT) {couleur=BACKBLEU} else {couleur=BACKVERT}
		xcolor=!xcolor;
	} else {// conserver couleur de m dans h, inverser couleur de m dans hpre
		if (couleur==BACKVERT) {couleurpre=BACKBLEU} else {couleurpre=BACKVERT}
		miseauvert(hpre, m, couleurpre);	
	}
	miseauvert(h, m, couleur);
	hpre=h;
	n=m;
}// i
}

