var chiffreseul="Elimination du chiffre candidat ", incase=" dans la case ", chiffrefort="Elimination des chiffres candidats autres que ";

function lapprochedutigre() {// Methode A.I.C.
		var re=/\d/g;
		maxvarencours=1;
		for (var i=0; i<M; i++) {chiffrexy[i]=0; casexy[i]="Z"}// Premier indice : xychain
		tableauvariante = [];//Reinitialisation de la liste des variantes
		tableauvariante[0] = "Liste calculee des variantes";
		for (var i=0; i<M; i++) {// Case de depart
			if (contenu[i].length>1) {
					Xamont=false;
					xychain=0;// pointeur de la case de casedepart
    				casedepart=i;
    				casexy[0]=colPlace[casedepart];
    				validationdanslachaine(casedepart);
    				if (scenario!=noeffect) {// depilement
    					if (clickmethode) {
    						regroop();
    						enregistrescenarioaic();
    						scenario=noeffect;// Recherche scenario suivant, apres sauvegarde scenario ou son annulation pour doublon, si pas sortie sur variante nmetref
        				} else {
        					return;
        				}
    				}
    		}// contenu>1
   		}// i
}

function recherchehk(lcy, case0ref, chif, kk) {// Test validite case sur zone sudoku lcy et indice  kk dans cette zone : contient chif et different de case0ref  et avec plus de un chiffre
									var hkbloc=true;
									switch (lcy) {
                                    	   case 0://									    Ligne
                                       		  	var hk=kk+9*parseInt(case0ref/9)
                                    			break;
                                    	   case 1://	   	   			 	  	   	  	    Colonne
                                    		  	var hk=9*kk+case0ref-9*parseInt(case0ref/9)
                                    			break;
                                    	   case 2://			   							Bloc
                                       			var ii=carre[case0ref]-1;
                                       		  	var hk=kk+6*parseInt(kk/3)+18*parseInt(ii/3)+3*ii;//  Bloc
                                				// hk dans bloc mais ni sur ligne ni colonne de case0ref
                                				hkbloc=((hk-9*parseInt(hk/9))!=(case0ref-9*parseInt(case0ref/9))) && (parseInt(hk/9)!=parseInt(case0ref/9));
                                    			break;
                                    	   default:
                                    		    break;
                                    }
                           			if  (hkbloc) {
                            			var pos10=contenu[hk];
										if (pos10==chif) {return (M+1)}
										if ((pos10.length>1) && (hk!=case0ref) && (pos10.split(chif)[0].length<pos10.length)) {return hk}
									}
									return M;
}

function hkvoitpasnode(cnode, case2) {
	for (var i=0; i<cnode.length/2; i++) {
		var case1=decodagecolPlace(cnode.substring(2*i, 2*i+2));
		if (!sevoient(case1, case2)) {return true}
	}
	return false;
}


function calculXamont(nouvelX) {
	Xamont=nouvelX;
	for (var i=2; i<xychain+1; i++) {
		var Xamontprevious=Xamont;
		var egalitechiffre=(chiffrexy[i-2] == chiffrexy[i-1]);
		var case2chiffres=(contenu[decodagecolPlace(casexy[i-1])].length==2);
		if (Xamont && egalitechiffre) {
			Xamont=!Xamont;// inversion
		} else if (Xamont && !egalitechiffre && !lienfaible[i-1]) {
			Xamont=Xamont;// inchange true
		} else if (!Xamont && egalitechiffre && !lienfaible[i-1]) {
			Xamont=!Xamont;// inversion
		} else if (!Xamont && !egalitechiffre && case2chiffres) {// inchange false
			Xamont=Xamont;// inchange false
		} else if (!Xamont && lienfaible[i-1]) {// rupture finale
			Xamont="Rupture";
		}
	}
}

function validationdanslachaine(caseref) {
var re=/\d/g;
var hn0=0; var lc0=0; var k0=0;
var chref=contenu[caseref].match(re);
for (var hn=hn0; hn<chref.length; hn++) {
	var chiffre=chref[hn];
	chiffrexy[xychain]=chiffre;
	if ((xychain>0) && (casexy[xychain].length>2) && (chiffre!=chiffrexy[xychain-1])) {continue}// si node, case entourée des memes chiffres
	if (xychain>0) {calculXamont(true)}
			wscen="";
			etablirchaine();
	if (xychain>0) {
		if ((chiffre!=chiffrexy[xychain-1]) && (contenu[caseref].length>2) && !Xamont) {continue}
	}
	var breaklc=false;
	for (var lc=lc0; lc<3; lc++) {
		var tabals="";
		if (breaklc) {break}
		for (var k=k0; k<9; k++) {// Recherche case hk valide sur ligne, colonne ou bloc de caseref
			var hk=recherchehk(lc, caseref, chiffre, k);
				if (hk==(M+1)) {break}
				if (hk!=M) {
					// hk doit voir node, mais pas casepre
  					if (xychain>0) {
						var casepre=decodagecolPlace(casexy[xychain-1].substring(0,2));
					}
					if ((xychain>0) && (casexy[xychain].length>2) && (hkvoitpasnode(casexy[xychain], hk) || sevoient(casepre, hk))) {
					continue}
					var validsortie=verifpasdanschaine(hk) || ((xychain>3) && (hk==casedepart));// sauf solution avec hk=D1
					a=casexy[xychain+1];
					if (!(typeof a === "undefined") && (a.length>2) && (a.split(colPlace[hk])[0].length<a.length)) {continue}
					casexy[xychain+1]=colPlace[hk];
					var lienfort=testlienfortgeneral(caseref, hk, chiffre);
					if ((xychain==0) && !lienfort) {lienfort=testnode(caseref, hk, chiffre)}// au depart, lien fort possible si node sur hk
					if (casexy[xychain].length>2) {
						lienfort=liennodeamont(colPlace[hk], casexy[xychain], chiffre);
					}// lien de node
					if (!Xamont && !lienfort && (xychain>2) && (chiffre!=chiffrexy[xychain-1])) {breaklc=true; break}
					lienfaible[xychain]=!lienfort;
					if (validsortie) {// verifpasdanschaine
        					var maxpoint=1;
							if(xychain==0) {maxpoint=3}
							for (var pointnode=0; pointnode<maxpoint; pointnode++) {
    							if (xychain>0) {// pas exploration du cas de depart sauf hk dans node
    									var chiffrepre=chiffrexy[xychain-1];
    									var lienfaibleprevious=lienfaible[xychain-1];
    									var egalitechiffres=(chiffrepre==chiffre);
                    					var validsortie=testvalidation(lienfort, lienfaibleprevious, egalitechiffres, (chref.length==2));// validation autour de caseref : cas normal
	   									validsortie=validsortie  && !((!Xamont || (Xamont && !egalitechiffres)) && !lienfort)
										var c=contenu[caseref];
										if (lienfort && !egalitechiffres && (c.length>2) && (c.split(contenu[hk])[0].length<c.length)) {break}// Test lienfort avec plusieurs chiffres communs caseref et hk
//    									var lasequence=((xychain>3) && (chiffrepre==chiffre) && (chiffrexy[xychain-2]==chiffre) && (chiffrexy[xychain-3]==chiffre) && !lienfaibleprevious && !lienfaible[xychain-2] && lienfaible[xychain+-3] && (contenu[decodagecolPlace(casexy[xychain])].length>2));
//										var seq=true;
//										if (lasequence) {seq=!lienfaible}// pas de lien faible apres la sequence
										var casfaux=!egalitechiffres && (casexy[xychain].length>2);
//        								if (!casfaux && seq) {// solution cas normal sauf node (et non als) avec egalitechiffres faux
        								if (!casfaux) {// solution cas normal sauf node (et non als) avec egalitechiffres faux
    										if (Xamont) {
											lessolutions(chiffre)}
    										if (scenario!=noeffect) {
                                        		if (clickmethode) {enregistrescenarioaic(); scenario=noeffect}
        										return;
                                           	} else if (hk==casedepart) {continue}
    									}
                						if ((contenu[hk].length==2) && (contenu[hk]==contenu[casedepart]) && !sevoient(hk, casedepart) && validsortie && lienfaible[0] && (chiffre==chiffrexy[0]) && !lienfort) {
    										wscen+="-"+chiffre+"-"+colPlace[hk];
                    						//lienfaible[xychain]=!lienfort;
//                    						lessolutionsextremesegales(caseref, hk, chiffre)// solution cas particulier
                    					}
										if (!validsortie && (casexy[xychain].length==2)) {// caseref non valide ; explorer node pour voir si valide quand meme; sauf node sur caseref
                    							var casepre=decodagecolPlace(casexy[xychain-1].substring(0,2));// node ou als possible sur casepre
                								if (pasmemezone(casepre, caseref, hk)) {// casepre, caseref et hk pas dans la meme zone sudoku pour un node
                    								var lienfortaval= testnode(caseref, hk, chiffre);
        											if (casexy[xychain+1].length>2) {// node
        												lienfaible[xychain]=!lienfortaval;// enregistrement lien aval
        												// validation autour de caseref : cas avec node
    													if ((xychain>2) && (testvalidation(lienfortaval, lienfaibleprevious, egalitechiffres, (chref.length==2)))) {
    														lessolutionssinonvalide(hk, chiffre, lienfort)
    														validsortie=true;
    													}// Chercher solution dans le cas validation par node
    												} 
    											}
                    					}// node
                                        if (scenario!=noeffect) {
    										if (clickmethode) {enregistrescenarioaic(); scenario=noeffect} else {return}
                                       	}
    							} else {// au depart
										testnodebegin(caseref, hk, chiffre, pointnode);
										if (casexy[1].length==2) {pointnode=2}
    							}// (xychain>0)
                				if (validsortie) {
    									var Xamontprevious=Xamont;
    									xychain+=1;
                                        validationdanslachaine(hk)
    									xychain-=1;
    									Xamont=Xamontprevious;
                                       	if (scenario!=noeffect) {return}// depilement si en cours de calcul et non test methode
                				}
							}//pointnode
					}// verifpasdanschaine
				}// hk!=M
			}// k
		}// lc
  }// + hn : recherche chiffre suivant 
}

function lessolutionsbid(chif0) {}


function etablirchaine() {
	 for (var i=0; i<xychain+1; i++) {
			wscen+=casexy[i];
   			if (i!=xychain) {if (lienfaible[i]) {wscen+="-"+chiffrexy[i]+"-"} else {wscen+="="+chiffrexy[i]+"="}}
	}			
}

function verifpasdanschaine(casehk) {// test si casehk ne fait pas partie de la chaine (y compris als)
	var y=colPlace[casehk];
	var z="";
	for (var i=0; i<xychain+1; i++) {z+=casexy[i]}
	return (z.split(y)[0].length==z.length);
}

function pasmemezone(case1, case2, case3) {
	if ((carre[case1]==carre[case2]) && (carre[case1]==carre[case3])) {return false}
	if ((parseInt(case1/9)==parseInt(case2/9)) && (parseInt(case1/9)==parseInt(case3/9))) {return false}
	if (((case1-9*parseInt(case1/9))==(case2-9*parseInt(case2/9))) && ((case1-9*parseInt(case1/9))==(case3-9*parseInt(case3/9)))) {return false}
	return true;
}

function liennodeamont(cpre, c1, chif) {
	var hpre=decodagecolPlace(cpre);
	var hencours=new Array();
	for (var i=0; i<c1.length/2; i++) {
		hencours[i]=decodagecolPlace(c1.substring(2*i, 2*i+2));
	}
	var ii=carre[hpre]-1;
	var ligne=parseInt(hpre/9);
	var colonne=hpre-9*ligne;
	var lcz=2;
	if (carre[hpre]!=carre[hencours[0]]) {
		if (parseInt(hencours[0]/9)==parseInt(hencours[1]/9)) {lcz=0} else {lcz=1}
	}
	for (var j=0; j<9; j++) {//  indice de case=casexy[xychain]
		switch (lcz) {
	  		case 0: // Ligne
				var h=j+9*ligne;
				break;
	  		case 1: // Colonne
				var h=colonne+9*j;
				break;
	  		case 2: // Carre
				var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii; // Position j dans le carre ii
				break;
			default:
				break;
		}// switch
		var posh=contenu[h];
		if ((posh.length>1) && (h!=hpre) && hnot(hencours, h) && (posh.split(chif)[0].length<posh.length) && (cpre.split(colPlace[h])[0].length==cpre.length)) {return false}// case exterieure a casepre et case1 contenant chif
	}// j
	return true;
}

function hnot(casex, caseverif) {// verification si caseverif pas dans le tableau casex
	for (var i=0; i<casex.length; i++) {
		if (caseverif==casex[i]) {return false}
	}
	return true;
}


