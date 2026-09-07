function forteressemaxilien() {
	 indiceforteresse=0;
	for (var ik=0; ik<N; ik++) {casesforteresse[ik]=""}// Reinitialisation
	for (var ik=0; ik<N; ik++) {resultatforteresse[ik]=""}// Reinitialisation
	var re=/\d/g;
		for (var i=0; i<M; i++) {// Case de depart
			if (contenu[i].length==2) {
			   var ch=(contenu[i]+"").match(re);
        	   casedepart=i;
        	   casexy[0]=i;
			   for (var j=0; j<1; j++) {
					chiffrexy[0]=ch[j];
					chiffredepart=ch[j];
					xychain=1;// pointeur de la case suivant la case depart 
					validationforteresse(true);
					if (scenario!=noeffect) {return}
				}
    		}
   		}// i
}

function etablirchaineforteresse() {
		wscen=wscen+colPlace[casexy[0]];
		for (var i=1; i<xychain; i++) {
    		var et="-";
			if (testlienfortforteresse(casexy[i-1], casexy[i], chiffrexy[i])) {et="="}
			wscen=wscen+et+chiffrexy[i]+et+colPlace[casexy[i]];
		}
		var hk=casexy[xychain];
		var chiffre=chiffrexy[xychain];
  		if ((xychain>1) && (chiffre==chiffredepart) && ((parseInt(hk/9)==parseInt(casedepart/9)) || ((hk-9*parseInt(hk/9)) == (casedepart-9*parseInt(casedepart/9))) || (carre[hk]==carre[casedepart]))) {
		   wscen=wscen+"-"+chiffre+"-"+colPlace[casedepart]+". Elimination ";
		} 
}

function etablirchaineforteresseouverte(annexe) {
		wscen=wscen+colPlace[casexy[0]];
		for (var i=1; i<xychain; i++) {
    		var et="-";
			if (testlienfortforteresse(casexy[i-1], casexy[i], chiffrexy[i])) {et="="}
			wscen=wscen+et+chiffrexy[i]+et+colPlace[casexy[i]];
		}
		wscen+="-"+annexe;
}

function validationforteresse(pasindi) {
  var re=/\d/g;
  var caseref=casexy[xychain-1];
  var chiffrepre=chiffrexy[xychain-1];//0  
  var posref=contenu[caseref];
  var chref=posref.match(re);
  var chiffre=chref[0];
  if (chiffre==chiffrepre) {chiffre=chref[1]}// inversion pour case a 2 chiffres(cas usuel) sauf pendant indirection
	if (!pasindi) {chiffre=chiffrepre}
	if (xychain>MAXMAXILIEN) {return}
  if ((posref.length==2) || !pasindi) {// Exception : sortie indirection
	testsolutionforteresse(caseref, chiffre, pasindi);
	if (scenario!=noeffect) {// Enregistreement
       	if (clickmethode) {enregistrescenarios()} else {elaboreunevariante(); return}
	}
  }
for (var icas=0; icas<2; icas++) { 
  for (var lc=0; lc<3; lc++) {
		switch (lc) {
        	   case 0:
           		    var hl=parseInt(caseref/9);//		   Ligne caseref
        			break;
        	   case 1:
           	   		var hl=caseref-9*parseInt(caseref/9);// Colonne caseref
        			break;
        	   case 2:
           			var ii=carre[caseref]-1;//			   Bloc caseref
        			break;
        	   default:
        		    break;
        }
        for (var k=0; k<9; k++) {// Recherche case hk sur ligne, colonne ou bloc de caseref
		   var hkbloc=true;
		   switch (lc) {
           		  case 0:
           		  	   var hk=k+9*hl;//									   Ligne
        			   break;
           		  case 1:
        		  	   var hk=9*k+hl;//	   	   			 	  	   	  	   Colonne
        			   break;
           		  case 2:
           		  	   var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;//  Bloc
					   // hk dans bloc mais pas sur ligne ni colonne
					   hkbloc=((hk-9*parseInt(hk/9))!=(caseref-9*parseInt(caseref/9))) && (parseInt(hk/9)!=parseInt(caseref/9));
					   break;
           		  default:
        			   break;
        	}
			hkbloc=hkbloc && (hk!=caseref) && (hk!=casedepart);
			if (hkbloc) {
			   var posk=contenu[hk];
    		   var pasvupasfait=true;
               for (var j=0; j<xychain; j++) {if (hk==casexy[j]) {pasvupasfait=false}}
			   if (pasvupasfait) {// Case hk vue par caseref, differente des cases precedentes de la boucle et des cases en indirection
					var lienok=false;
					if (icas==0) {// cas usuel ou sortie indirection
						var indi=true;
    					if (pasindi) {
    						if (posk.split(chiffre)[0].length<posk.length) {// Cas usuel  avec inversion sur case a 2 chiffres ou plus si indirection
        					    //lienok=(posref.length==2) && ((xychain==1) || (posk.length==2)) && (chiffre!=chiffrepre);
        					    lienok=(posref.length==2) && (chiffre!=chiffrepre);
        					    //lienok=(posref.length==2) && (posk.length==2) && (chiffre!=chiffrepre);
        					}
						} else if ((posk.split(chiffrepre)[0].length<posk.length) && (posk.length==2)) {// hk a 2 chiffres (sortie indirection) Eviter icas=1
							chiffre=chiffrepre;
							lienok=true;
						}
					} else if ((posk.split(chiffrepre)[0].length<posk.length) && (posk.length>1)) {// milieu indirection avec lien fort : icas=1
						// traiter uniquement cas usuel puis milieu indirection et non sortie indirection puis milieu indirection
						var chiffreprepre=0;
						if (xychain>1) {chiffreprepre=chiffrexy[xychain-2]}
						chiffre=chiffrepre;
						lienok= testlienfortforteresse(caseref,hk, chiffrepre) && (chiffre!=chiffreprepre) && (xychain>1);
						var indi=!lienok;// Milieu indirection valide donne seul indi=false
					}
					if (lienok) {// Case en mode direct a 2 chiffres (cas standard) ou en mode indirect '2 cas possibles) 
                        		chiffrexy[xychain]=chiffre;
                                casexy[xychain]=hk;
    							xychain=xychain+1;
                            	validationforteresse(indi);// Reentrant avec caseref=hk, nouvelle reference
                         		if (scenario!=noeffect) {return} // Depilement
								xychain=xychain-1;
                                // Retour au cas standard de chiffre : inversion
    				}// lienok
        	   }// pasvupasfait			   
			}// hkbloc 
        }// k : recherche case hk vue suivante (k puis lc)
     }// lc
}// icas
}

function testsolutionforteresse(hkdirect, chiffrecomp, ouvert) {
  var re=/\d/g;
	// Test si la case hkdirect voit la case depart : solution boucle
    if((carre[hkdirect]==carre[casedepart]) || (parseInt(casedepart/9)==parseInt(hkdirect/9)) || ((casedepart-9*parseInt(casedepart/9))==(hkdirect-9*parseInt(hkdirect/9)))) {
       		if (chiffrecomp==chiffredepart) {// Case hkdirect contenant le candidat chiffredepart
                wscen="Forteresse maxilien ";
        		if (xychain>2) {// Boucle trouvee si longueur de chaine >2
                	chiffrexy[xychain]=chiffrecomp;
                  	casexy[xychain]=casedepart;
        			etablirchaineforteresse();
					boucleforteresse();
					variete=0;
    			}// z>3
		}// hkdirect contient chiffre depart
   } else if (ouvert) {
		// chiffrecomp appartient a casedepart et a casexy[xychain-1]
		var commun=(contenu[casedepart].split(chiffrecomp)[0].length<contenu[casedepart].length) && (contenu[casexy[xychain-1]].split(chiffrecomp)[0].length<contenu[casexy[xychain-1]].length);
		if ((chiffrecomp!=chiffrexy[1]) && (chiffrecomp!=chiffrexy[xychain-1]) && commun) {
			    wscen="Forteresse maxilien ";
				if (xychain>4) {// Boucle trouvee si longueur de chaine >4
					// Recherche de case contenant chiffrecomp et voyant casedepart et hkdirect, pour y enlever chiffrecomp
					variete=1;
                	chiffrexy[xychain]=chiffrecomp;
        			etablirchaineforteresseouverte(chiffrecomp);
					if (hkdirect!=casedepart) {eliminationchiffreforteresse(hkdirect, casedepart, chiffrecomp)}
    			}//xychain>2
		}// chiffrecomp different des chiffres extremes de la chaine
	}//case hkdirect ne voit pas casedepart = chaine ouverte 
					if (scenario!=noeffect) {
            			   // Test si scenario pas deja vu : meme chaine de cases dans casesforteresse index : indiceforteresse
						   var pasvu=true;
            			   // Extraire n dans H ... dans scenario de type ...maxilien n-H-n-H....-n-H+....  Elimination n dans H n dans H ..
						   var s00=scenario.split("maxilien ")[1];
						   var s0plus=s00.split(". Elimination")[0];
						   var s0after=s00.split(". Elimination")[1]
						   s0plus=s0plus.substring(0,s0plus.length-3); 
            			   var regegal = new RegExp('[=]', 'gi');
            			   s0=s0plus.replace(regegal, "-");
            			   var s1=s0.split("-");
            			   var pasvu=true;
						   if (indiceforteresse>0) {
    					   	   // Test si s0after n'est pas deja vu 
							   for (var indf=0; indf<indiceforteresse; indf++) {
							   	   // Tester si deja vu, si oui, choisir le sci le plus court
								   if (s0after==resultatforteresse[indf]) {
								   	  var sci=casesforteresse[indf];
									  if (sci.length>s1.length) {
									  	 casesforteresse[indf]=s1;
									  }
									  pasvu=false;
								   }
							   }
             			   	   if (pasvu) {
								   // Test si s1 n'est pas une permutation circulaire d'un casesforteresse previous
                    			   for (var indf=0; indf<indiceforteresse; indf++) {
                    			   	   var sci=casesforteresse[indf];// Tableau s1
    								   // Comparaison sci et s1
    								   if (sci.length==s1.length) {            						  
    									  var pasvu=true;
    									  var nbsc=0;
    									  for (var ij=0; ij<sci.length; ij++) {
                								  if (s1[ij]==sci[ij]) {nbsc=nbsc+1}
                						  }
                						  if (nbsc==s1.length) {
    									  pasvu=false}// tableaux identiques 
        					   			  if (pasvu) {
    										  var vasygene=true;
    										  for (var ij=0; ij<sci.length; ij++) {
        									  	  var vasy=false;
    											  for (var kl=0; kl<s1.length; kl++) {
                    								  if (s1[kl]==sci[ij]) {vasy=true}
                    							  }
    											  if (!vasy) {vasygene=false}
                    						  }
                    						  if (vasygene) {pasvu=false}// Permutation circulaire constatee --> ne pas enregistrer
                    					   }
    								   }
    								   if (!pasvu) {break}
    							   }
							   }// pasvu
    					   }						   
						   if (pasvu) {// Solution
								resultatforteresse[indiceforteresse]=s0after;
								casesforteresse[indiceforteresse]=s1;
    						  	indiceforteresse=indiceforteresse+1;
       							//if (clickmethode) {enregistrescenarios()} else {return}
    					   } else {
								scenario= noeffect;													   
    					   }													   
    					//}//
    				}// scenario!=noeffect
}

function elaborevarianteforteresse() {
		 // variete=0 ou 1 "Forteresse maxilien n-HH-n-H....-n-H+....+". Elimination n dans H n dans H...n dans H
		 var s00=scenario.split(". Elimination ")[0];
		 var s0=scenario.split(". Elimination ")[1];
		 var s1=s0.split(" dans ");
		 for (var i=0; i<s1.length-1; i++) {
			 var n=s1[i].substring(3,4);
			 if (i==0) {n=s1[i].substring(0,1)}
			 var h=decodagecolPlace(s1[i+1].substring(0,2));
			 var posh=contenu[h]+"";
			 if ((posh.length>1) && (posh.split(n)[0].length<posh.length)) {
			 eliminationnumero(h,n)}
		 }
		 var s01=s00.split(" maxilien ")[1];
         var regegal = new RegExp('[=]', 'gi');
         s0=s01.replace(regegal, "-");
         var s1=s0.split("-");// Mutation en n-HH-n-HH-n-HH.. --> n,HH,n,HH,n,HH..
		 var scenardetail="<br>";
		 for (var i=1; i<s1.length; i++) {
		 	 if (i!=2*parseInt(i/2)) {// Les chiffres
			 	if ((i>2) && ((s1[i]==s1[i-2]) && (s1[i]==s1[i+2]))) {// Indirection
				   scenardetail=scenardetail+"<br>Chaine éclatée : ";
				   scenardetail=scenardetail+"indirection entre les cases "+s1[i-3]+" et "+s1[i+3]+" reliees par le chiffre "+s1[i]+" via les cases "+s1[i-1]+" et "+s1[i+1]+" en lien fort.<br>";
				   if (unevariante) {// Bleuir indirection
					   miseauvert(decodagecolPlace(s1[i-1]), s1[i], BACKBLEU);
    				   miseauvert(decodagecolPlace(s1[i+1]), s1[i], BACKBLEU);
					   i+=2;
				   }
				} else {// verdir
				   if (unevariante) {miseauvert(decodagecolPlace(s1[i-1]), s1[i], BACKVERT)}
				}
			 }
		 }
		 scenario=scenario+scenardetail;
}

function caseenvueforteresse(caseautre, axe, posit, chiffre) {
   var ii=carre[caseautre]-1;
   var hh=parseInt(caseautre/9);
   var hv=caseautre-9*hh;
   switch(axe) {
       	case 0:
    		 var hx=9*hh+posit;
    		 break;
    	case 1:
    		 var hx=hv+9*posit;
    		 break;
    	case 2:
        	 var hx=posit+6*parseInt(posit/3)+18*parseInt(ii/3)+3*ii;
    		 break;
   }
   var posk=contenu[hx];
   if ((posk.length>1) && (hx!=caseautre)) {
       	if ((posk+"").split(chiffre)[0].length<posk.length) {return hx}       
   }
   return M;
}

function boucleforteresse() {
	// Elimination si 2 cases successives en lien faible
	for (var i=0; i<xychain; i++) {
		var chiffre=chiffrexy[i+1];
		var casedebut=casexy[i];
		var casefin=casexy[i+1];
		eliminationchiffreforteresse(casedebut, casefin, chiffre);
	}
}

function eliminationchiffreforteresse(case1, case2, chif) {
	var re=/\d/g;
	var hk0=new Array();
	var i0=0;
	// case1 et case2 ne se voient pas
	// Recherche de cases hk voyant case1 et case2 et contenant chif a eliminer
	var h1=parseInt(case1/9);//	Ligne case1
	var v1=case1-9*h1;// Colonne case 1
	var c1=carre[case1]-1; // Bloc case1
    var h2=parseInt(case2/9);//	Ligne case2
	var v2=case2-9*h2;// Colonne case2
	var c2=carre[case2]; // Bloc case2
	var debutelim=". Elimination ";
	if (wscen.split(debutelim)[0].length==wscen.length) {wscen+=debutelim}
	for (var lc=0; lc<3; lc++) {
		 for (var k=0; k<9; k++) {// Recherche case hk sur zone de case1 vue par case2
			 var hkbloc=true;
			 switch (lc) {
			 		case 0:// Ligne de case1
						 var hk=9*h1+k;
						 break;
			 		case 1:// Colonne de case1
						 var hk=9*k+v1;
						 break;
			 		case 2:// Bloc de case1
           		  	   	 var hk=k+6*parseInt(k/3)+18*parseInt(c1/3)+3*c1;
					   	 hkbloc=((hk-9*parseInt(hk/9))!=v1) && (parseInt(hk/9)!=h1);
						 break;
			 }
			 if ((hk!=case2) && (hk!=case1) && hkbloc) {
    			 var posk=contenu[hk];
    			 var chk=posk.match(re);
				 var voitoupas=	((carre[hk]==c2) || (parseInt(hk/9)==h2) || ((hk-9*parseInt(hk/9))==v2));
    			 if (voitoupas &&  (posk.split(chif)[0].length<posk.length)) {
        				var pasvupasfait=(hk!=casedepart);
                       	if (lc<2) {
    					   hk0[i0]=hk;
    					   i0=i0+1;
    					} else {// Doublon axe - bloc
    					   for (var i=0; i<i0; i++) {
    						 	 if (hk==hk0[i]) {pasvupasfait=false}
    					   }
    					}
                    	if (xychain>0) {for (var j=0; j<xychain; j++) {if (hk==casexy[j]) {pasvupasfait=false}}}
                        if (pasvupasfait) {// Supprimer chif, s'il existe dans hk et si hk pas dans la chaine (non cannibalistique)
        					wscen+=chif+" dans "+colPlace[hk]+" ";//voyant les cases de la boucle en lien faible "+colPlace[case1]+" et "+colPlace[case2]+" ";
							for (var hnum=0; hnum<chk.length; hnum++) {
            					if (chk[hnum] ==chif) {
								   eliminationnumero(hk, chif)
            					}
        					}// hnum
    					}// pasvupasfait
    			 }// hk
			 }// hkbloc			 
		 }// k
	}// lc
}

function testlienfortforteresse(case1, case2, chif) {
   var ii=carre[case2]-1;
   var carhv=(carre[case1]==carre[case2]);// Meme bloc
   var h1=parseInt(case1/9);
   var v1=case1-9*h1;
   var h2=parseInt(case2/9);
   var v2=case2-9*h2;
   var axe=2;// axe case1-case2
   if(h2==h1) {axe=0}
   if(v2==v1) {axe=1}
   // Recherche lien fort ou faible entre case1 et case2, dans bloc ou axe commun (ligne ou colonne)
   for (var i=0; i<3; i++) {
	   var j=carhv;
	   if (i>0) {j=(axe==(i-1))}
	   if(j) {
			var lienretour=true;
			for (var k=0; k<9; k++) {// Recherche autre case contenant chif, differente de case1 et case2 (test lien fort)
    			if (i==0) {var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii} else if (i==1) {var hk=9*h2+k} else {var hk=v2+9*k}
				var posk=contenu[hk];
				var lienautre=((hk!=case1) && (hk!=case2) && ((posk+"").split(chif)[0].length<posk.length) && (posk.length>1));
				if (lienautre) {lienretour=false}//Autre case contenant le chiffre --> lien faible
    		}
			if (lienretour) {return true}
       }// j 
   }// i
   return false;
}

function eliminationchiffrecycle(casefinale) {
	var re=/\d/g;
	var lienfort=testlienfortcolortrap(casedepart, casefinale);
	if (lienfort) {//Valider chiffretrap dans casedepart et eliminer dans casefinale et casexy[1]
       if (lienfaible[xychain]) {// Terminer sur un lien faible
    	   wscen=wscen+"<br><br>Validation de "+chiffretrap+" dans la case de depart de la boucle : "+colPlace[casedepart];
    	   var posk=contenu[casedepart]
           var chk=posk.match(re);	   
           for (var hnum=0; hnum<posk.length; hnum++) {if (chiffretrap!=chk[hnum]) {eliminationnumero(casedepart, chk[hnum])}}
           wscen=wscen+"<br><br>Elimination de "+chiffretrap+" dans les cases de la boucle voyant "+colPlace[casedepart]+" : ";//+colPlace[hk];
    	   var posk=contenu[casefinale]
           var chk=posk.match(re);	   
    	   wscen=wscen+colPlace[casefinale]+" ";
           for (var hnum=0; hnum<posk.length; hnum++) {if (chiffretrap==chk[hnum]) {eliminationnumero(casefinale, chiffretrap)}}
    	   var posk=contenu[casexy[1]]
           var chk=posk.match(re);	   
    	   wscen=wscen+colPlace[casexy[1]];
           for (var hnum=0; hnum<posk.length; hnum++) {if (chiffretrap==chk[hnum]) {eliminationnumero(casexy[1], chiffretrap)}}
	   }
	} else {// Eliminer chiffretrap sur l'axe  ou le bloc casedepart - casefinale si parite paire de xychain
	   if (xychain==2*parseInt(xychain/2)) {
    	   var hdepart=parseInt(casedepart/9);
    	   var vdepart=casedepart-9*hdepart;
    	   var hfinale=parseInt(casefinale/9);
    	   var vfinale=casefinale-9*hfinale;
    	   var ic=carre[casedepart]-1;
           wscen=wscen+"<br><br>Elimination de "+chiffretrap+" dans les cases voyant "+colPlace[casedepart]+" et "+colPlace[casefinale]+" :";//+colPlace[hk];
		   for (var k=0; k<9;k++) {
    	   	   if (hfinale==hdepart) {var hk=9*hdepart+k}
    	   	   else if (vfinale==vdepart) {var hk=vdepart+9*k}
    	   	   else if (carre[casedepart]==carre[casefinale]) {hk=k+6*parseInt(k/3)+18*parseInt(ic/3)+3*ic}
        	   var posk=contenu[hk];
        	   var chk=posk.match(re);
        	   if (((posk+"").split(chiffretrap)[0].length<posk.length) && (hk!=casedepart) && (hk!=casefinale)) {
    			   // Eliminer chiffretrap dans hk
        		   wscen=wscen+" "+colPlace[hk];
            	   for (var hnum=0; hnum<posk.length; hnum++) {if (chiffretrap==chk[hnum]) {eliminationnumero(hk, chiffretrap)}}
			   }
    	   }
	   }	
	}
}

function etablirchainecolor(case1) {// Changement de couleur sur lien fort et alternance lien fort - lien faible
		var couleurtrap=false;// Casedepart en lien fort
		wscen="";
		if (xychain>0) {
    		for (var i=0; i<xychain+1; i++) {
    			var il="=";
    			if (lienfaible[i]) {il="-"} else {couleurtrap=!couleurtrap}
    			wscen=wscen+colPlace[casexy[i]]+il+chiffretrap+il;
    		}
    		wscen=wscen+colPlace[case1];
		}
		return couleurtrap;
}

function colortrap(){
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
  // X-chain = chaine sur un seul chiffre sans 2 liens faibles successifs, sur au moins 3 brins, avec alternance de couleurs
  // 2 cases extremes de meme couleur se voient --> elimination de cette couleur et validation de l'autre couleur (Color Wrap)
  // 2 cases extremes de couleurs differentes ne se voient pas (Color Trap)  ou se voient (Color Cycle) --> toute case voyant ces cases ne peut contenir le chiffre
  // Color Cycle : 2 cases extremes de couleurs differentes se voient --> toute case voyant ces cases ne peut contenir le chiffre
  for (indextrap=0; indextrap<6; indextrap++) {
      variete=indextrap;
	  for (chiffretrap=1; chiffretrap<10; chiffretrap++) {// Chiffre candidat
        	for (casedepart=0; casedepart<M; casedepart++) {// Case de depart
    			var posk=contenu[casedepart];
    			if (((posk+"").split(chiffretrap)[0].length<posk.length) && (posk.length>1)) {// casedepart contient chiffretrap
    			   casexy[0]=casedepart;
    			   xychain=0;
    			   casetrap();
        		   if (scenario!=noeffect) {return}
    			}// posk
    		}// i    
      }// chiffretrap
  }// indextrap
}

function casetrap() {
	var re=/\d/g;
	var caseref=casexy[xychain];
	var lcaxe=-1;
	var lcbloc=-1;
	if (xychain>0) {
		  var caseprevious=casexy[xychain-1];
		  //  Eviter un axe ou un bloc commun caseprevious-caseref-hk
		  if (carre[caseref]==carre[caseprevious]) {lcbloc=2}
		  if (parseInt(caseref/9)==parseInt(caseprevious/9)) {lcaxe=0}
		  if ((caseref-9*parseInt(caseref/9))==(caseprevious-9*parseInt(caseprevious/9))) {lcaxe=1}
	}
	var posref=contenu[caseref];
 	var chref=posref.match(re);
	for (var lc=0; lc<3; lc++) {
		if ((lc!=lcaxe) && (lc!=lcbloc)) {// Recherche ailleurs que sur le lien previous
			switch (lc) {
            	   case 0:
               		    var hl=parseInt(caseref/9);//		   Ligne caseref
            			break;
            	   case 1:
               	   		var hl=caseref-9*parseInt(caseref/9);// Colonne caseref
            			break;
            	   case 2:
               			var ii=carre[caseref]-1;//			   Bloc caseref
            			break;
            	   default:
            		    break;
            }
            for (var k=0; k<9; k++) {// Recherche case hk sur ligne, colonne ou bloc de caseref
    		   var hkbloc=true;
    		   switch (lc) {
               		  case 0:
               		  	   var hk=k+9*hl;//									   Ligne
            			   break;
               		  case 1:
            		  	   var hk=9*k+hl;//	   	   			 	  	   	  	   Colonne
            			   break;
               		  case 2:
               		  	   var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;//  Bloc
    					   // hk dans bloc mais pas sur ligne ni colonne
    					   hkbloc=((hk-9*parseInt(hk/9))!=(caseref-9*parseInt(caseref/9))) && (parseInt(hk/9)!=parseInt(caseref/9));
    					   break;
               		  default:
            			   break;
            	}
    			if (hkbloc) {
				   var posk=contenu[hk];
    			   var chk=posk.match(re);
				   // Pas de retour sur case precedente et case a plus de 1 chiffre
            	   if ((hk!=caseref) && (posk.length>1))  {
            		   if ((posk+"").split(chiffretrap)[0].length<posk.length) {// Case vue contenant le candidat chiffretrap
    						   var pasvupasfait=true;
                        	   for (var j=0; j<xychain; j++) {if (hk==casexy[j]) {pasvupasfait=false}}
                        	   if (pasvupasfait) {// Case hk vue par caseref, differente des cases precedentes de la boucle
    							  // Test lien fort ou faible entre caseref et hk
								  var lienfort=testlienfortcolortrap(caseref, hk);// affecte caseref et non hk
								  lienfaible[xychain]=!lienfort;
								  var trap=lienfort;// 0 ou 1 ou 3 : liens forts partout
								  if ((xychain>0) && ((indextrap==2) || (indextrap==4)|| (indextrap==5)) ) {// 2 ou 4 ou 5
								  	 trap=lienfort!=(!lienfaible[xychain-1])// Pas 2 liens faibles successifs ni 2 liens forts successifs
								  } 
								  if (trap) {// Lien valide --> iteration et recursivite
									 if (xychain>1) {
										 var couleur=!etablirchainecolor(hk);
										 if ((((indextrap==3) || (indextrap==4)) && couleur) || (((indextrap==0) || (indextrap==1) || (indextrap==5)) && !couleur) || (indextrap==2)) {
											var hkvoitcasedepart=(carre[hk]==carre[casedepart]) || (parseInt(casedepart/9)==parseInt(hk/9)) || ((casedepart-9*parseInt(casedepart/9))==(hk-9*parseInt(hk/9)));
											variete=indextrap
											switch(indextrap) {
												case 0:// trap en liens forts
													 if (!hkvoitcasedepart) {
            											wscen="X-Chain (Color Trap) en liens forts "+wscen;														
                                						// Elimination chiffretrap dans les cases voyant les cases extremes de la boucle
														eliminationchiffrecolor(hk, casedepart);
													 }
													 break;
												case 1:// cycle en liens forts
													 if (hkvoitcasedepart) {
            											wscen="X-Chain (Color Cycle) en liens forts "+wscen;														
                                						// Elimination chiffretrap dans les cases voyant les cases extremes de la boucle
														eliminationchiffrecolor(hk, casedepart);
								 if (scenario!=noeffect) {
									 if (clickmethode) {
    											var ng=scenario.substring(scenario.length-9, scenario.length-7)+scenario.substring(scenario.length-3, scenario.length-1);
												var tg=true;
												if (ngratteciel>0) {
        											for (var ig=0; ig<ngratteciel; ig++) {
         												var ngg=gratteciel[ig];
														if ((ng==ngg) || ((ng.substring(0,2)==ngg.substring(ngg.length-2,ngg.length)) && (ng.substring(ng.length-2, ng.length)==ngg.substring(0,2)))) {tg=false}
        											}
    											}
    											if (tg) {
    											   gratteciel[ngratteciel]=ng;
    											   ngratteciel+=1;
    											   enregistrescenarios();
    											} else {
    											  scenario=noeffect;
    											}
									} else {return}
							  }
													 }
													 break;
												case 2:// cycle en liens alternes : ne conserver que la premiere solution
													 if (hkvoitcasedepart) {
            											wscen="X-Chain (Color Cycle) en liens alternés "+wscen;														
                                						// 2 cas : 
														// - lien fort entre casedepart et case finale : valider la case depart
														// - lien faible entre casedepart et case finale : transformer en lien fort si parite paire 
														eliminationchiffrecycle(hk);
													 }
													 break;
												case 3:// wrap en liens forts
													 if (hkvoitcasedepart) {
            											wscen="X-Chain (Color Wrap) en liens forts "+wscen;														
        												// Elimination chiffretrap dans les cases colorees de la boucle et validation dans les cases non colorees
														bouclecolortrap(hk);
													 }
													 break;
												case 4:// wrap en liens alternes : verifier lienfort final entre casedepart et hk ERROR
													 /*
													 if (hkvoitcasedepart && testlienfortcolortrap(casedepart, hk)) {
            											wscen="X-Chain (Color Wrap) en liens alternés "+wscen;														
        												// Elimination chiffretrap dans les cases colorees de la boucle et validation dans les cases non colorees
														bouclecolortrap(hk);
													 }
													 */
													 break;
												case 5:// trap en liens alternes : verifier lienfort final entre caseref et hk ERREUR
													 if (!hkvoitcasedepart && lienfort) {
            											wscen="X-Chain (Color Trap) en liens alternés "+wscen;														
                                						// Elimination chiffretrap dans les cases voyant les cases extremes de la boucle
														eliminationchiffrecolor(hk, casedepart);
													 }
													 break;
											}// switch indextrap	
    									 }// trap2									 								  
    									 if (scenario!=noeffect) {
											if ((indextrap!=2) && (indextrap!=5)){
												if (clickmethode) {enregistrescenarios()} else {return}// Variete 0,1,2
    										} else if (clickmethode) {
    											if (indextrap==2) {
    												var ng=scenario.split("voyant ")[1];
    												ng=ng.split(" : ")[0];
												} else {
    												var ng=scenario.split("extremes ")[1];
    												ng=ng.split(".")[0];
												}
												ng=ng.substring(0,2)+ng.substring(ng.length-2,ng.length);
    											var tg=true;
    											if (ngratteciel>0) {
        											for (var ig=0; ig<ngratteciel; ig++) {
         												var ngg=gratteciel[ig];
														if ((ng==ngg) || ((ng.substring(0,2)==ngg.substring(ngg.length-2,ngg.length)) && (ng.substring(ng.length-2, ng.length)==ngg.substring(0,2)))) {tg=false}
        											}
    											}
    											if (tg) {
    											   gratteciel[ngratteciel]=ng;
    											   ngratteciel=ngratteciel+1;
    											   enregistrescenarios();
    											} else {
    											  scenario=noeffect;
    											}
    										 } else {return}

										 } 
    								  }// xychain>1
        							  // iteration case hk sauf en cas de solution cycle en liens alternes
    									  xychain=xychain+1;                                  		  
                						  casexy[xychain]=hk;
            							  casetrap();// Reentrant avec caseref=hk, nouvelle reference
                						  xychain=xychain-1;
                                          if (scenario!=noeffect) {return}// depilement
								  }// trap
                               }// pasvupasfait
            		   }// (posk+"").split
            	   }// hk!=caseref
    			}// hkbloc 
            }// k : recherche case hk vue suivante (k puis lc)
		}// lc!=lcaxe et lcbloc
    }// lc
    // Case avortee  
	// case précédente et sa case vue suivante, puis son chiffre suivant
}

function elaborevarianteXChain() {
  //Decodage et execution
  // X-chain = chaine sur un seul chiffrede soit de liens forts, soit alternee de liens forts et faibles 
  // variete=0 ou 5: chaine de liens forts (variete=0) ou alternes (variete=5), les cases extremes ne se voient pas et sont de couleur differente (Color Trap)
  //             --> elimination du chiffre dans les cases voyant les cases extremes  
  // Autres : boucle fermee
  // variete=1 : chaine de liens forts avec cases extremes se voient et sont de couleur differente (Color Cycle) 
  //             --> elimination du chiffre dans les cases voyant les cases extremes en lien faible   
  // variete=2 : chaine de liens alternes sans 2 liens faibles successifs avec cases extremes se voient en lien fort et sont de couleur differente (Color Cycle) 
  //             --> elimination du chiffre dans les cases voyant les cases en lien faible ou validation case depart si lien fort final 
  // variete=3 : chaine de liens forts avec cases extremes se voient et sont de meme couleur (Color Wrap)
  //             --> elimination du chiffre dans les cases de la couleur des cases extremes et validation du chiffre dans les autres cases de la chaine  
  // variete=4 : chaine de liens alternes sans 2 liens faibles successifs avec cases extremes se voient en lien fort et sont de meme couleur (Color Wrap)
  //     Erreur  --> elimination du chiffre dans les cases de la couleur des cases extremes et validation du chiffre dans les autres cases de la chaine  
  var re=/\d/g;
  var strap=scenario.split("Color ")[1].substring(0,1);
  if ((strap=="T") || (strap=="C")) {// Color Trap ou Color Cycle
      if (strap=="T") {variete=0} else {variete=1}
	  var sliens=scenario.split("en liens ")[1].substring(0,7)
	  if ((strap=="C") && (sliens=="alterné")) {variete=2}
	  if ((strap=="T") && (sliens=="alterné")) {variete=5}
	  if ((variete<2) || (variete==5)) {
    	  var i=1;
          var s0=scenario.split("candidat ");
		  do {
              var s1=s0[i];
        	  var n=s1.substring(0,1);
              var s2=s1.split("la case ")[1];  	  
          	  var h=decodagecolPlace(s2.substring(0,2));
        	  eliminationnumero(h,n);
        	  i=i+1;
          }
          while(i<s0.length);
	  } else {// variete=2
		  var s0=scenario.split("Validation de ")[1];
		  if (!(s0===undefined)) {
			 var n=s0.substring(0,1);
			 var h=decodagecolPlace(s0.split(": ")[1].substring(0,2));
			 var posk=contenu[h];
			 var chk=posk.match(re);
			 for (var hnum=0; hnum<posk.length; hnum++) {if (chk[hnum]!=n) {eliminationnumero(h, chk[hnum])}}
			 var s1=s0.split(": ")[2];
			 var s2=s1.split(" ");
             for (var i=0; i<s2.length; i++) {
              	  var h=decodagecolPlace(s2[i]);
				  eliminationnumero(h,n);
             }
		  } else { 
			 var n=scenario.split("Elimination de ")[1].substring(0,1);
    		 var s1=scenario.split(" :")[1];  
			 var s2=s1.split(" ");
			 for (var i=1; i<s2.length; i++) {
              	  var h=decodagecolPlace(s2[i]);
				  eliminationnumero(h,n);
             }
		  }
	  }
  } else if (strap=="W") {// Color Wrap
  	variete=3;
	var sliens=scenario.split("en liens ")[1].substring(0,7)
	if (sliens=="alterné") {variete=4}
	var schiffre=scenario.split("candidat ")[1];
	var n=schiffre.substring(0,1);
	var s0=scenario.split(" : ")
	for (var i=1; i<s0.length; i++) {
		var s00=s0[i].split("<br>")[0];
		var s1=s00.split(" ");
		for (var j=0; j<s1.length-1; j++) {
			if (i==1) {
			   var h=decodagecolPlace(s1[j]);
			   eliminationnumero(h,n);
			} else {
			   var h=decodagecolPlace(s1[j]);
			   var re=/\d/g;
			   var ch=(contenu[h]+"").match(re);
			   for (hnum=0; hnum<ch.length; hnum++) {if (ch[hnum]!=n) {eliminationnumero(h,ch[hnum])}}
			}
		}// j
	}// i
  }// strap
  // Verdissement
  var sc0=scenario.split("liens forts ");
  if (sc0.length==1) {sc0=scenario.split("liens alternés ")}
  var sc1=sc0[1].split("<br>")[0]+"xxx";
  var liste="";
  for (var i=0; i<sc1.length; i++) {
  	var reste=i-5*parseInt(i/5);
	if (reste==2) {liste+=" "} else if (reste<2) {liste+=sc1[i]}
  }
  decodevertbleu(liste,n);
}

function decodevertbleu(liste, m) {
	if (unevariante) {
			var s1=liste.split(" ");
			var farbe=true;
			for (var i=0; i<(s1.length-1); i++) {
    			var h=decodagecolPlace(s1[i].substring(0,2));
				if (s1[i].length==2) {
					if (farbe) {miseauvert(h,m, BACKVERT)} else {miseauvert(h,m, BACKBLEU)}
					farbe=!farbe;
				} else {
					break;
				} 
			}
	}
}

function casesfortescolorcycle() {
		 var re=/\d/g;
		 wscen=wscen+"<br><br>La case des extremites "+colPlace[casexy[0]]+" est de couleur differente entre le depart et la fin du cycle.<br><br>";
		 for (var i=1; i<(xychain+1); i++) {
			 if (!lienfaible[i+1] && !lienfaible[i] && lienfaible[i-1]) {// Case entouree de liens forts t avec un lien faible pre-amont : valider le chiffre dans cette case				
						// Supprimer chiffretrap dans les cases de la chaine entourant la case i (cases i-1 et i+1) et valider a chiffretrap la case i
						wscen=wscen+"La case "+colPlace[casexy[i]]+" est entouree de liens forts avec les cases amont "+colPlace[casexy[i-1]]+" (precedee en lien faible avec la case "+colPlace[casexy[i-2]]+") et aval "+colPlace[casexy[i+1]]+". ";
						wscen=wscen+"Cela induit que cette case contient le chiffre "+chiffretrap+" alors que ses cases adjacentes ne le contiennent pas.<br><br>";
						var posk=contenu[casexy[i-1]];
    					var chk=posk.match(re);
    					for (var hnum=0; hnum<chk.length; hnum++) {if (chk[hnum] ==chiffretrap) {eliminationnumero(casexy[i-1], chk[hnum])}}
						var posk=contenu[casexy[i]];
    					var chk=posk.match(re);
    					for (var hnum=0; hnum<chk.length; hnum++) {if (chk[hnum] !=chiffretrap) {eliminationnumero(casexy[i], chk[hnum])}}
						var posk=contenu[casexy[i+1]];
    					var chk=posk.match(re);
    					for (var hnum=0; hnum<chk.length; hnum++) {if (chk[hnum] ==chiffretrap) {eliminationnumero(casexy[i+1], chk[hnum])}}
			 }
		 }
}

function bouclecolortrap(casefinale) {
	var re=/\d/g;
	wscen=wscen+"<br>Elimination du chiffre candidat "+chiffretrap+" dans les cases de la couleur des extremites de la chaine : ";
	var couleur=true;
	for (var i=0; i<xychain+2; i++) {
		var casefin=casexy[i];
		if (i==xychain+1) {casefin=casefinale}
		var posk=contenu[casefin]
		var chk=posk.match(re);
		if (couleur) {// Meme couleur : valider chiffre	
				wscen=wscen+colPlace[casefin]+" ";
				for (var hnum=0; hnum<chk.length; hnum++) {if (chk[hnum] ==chiffretrap) {eliminationnumero(casefin, chk[hnum])}}		
		}
		if (!lienfaible[i]) {couleur=!couleur}		
	}
	wscen=wscen+"<br>Validation du chiffre candidat "+chiffretrap+" dans les cases de la couleur opposee aux cases des extremites de la chaine : ";
	var couleur=true;
	for (var i=0; i<xychain+2; i++) {
		var casefin=casexy[i];
		if (i==xychain+1) {casefin=casefinale}
		var posk=contenu[casefin]
		var chk=posk.match(re);		
		if (!couleur) {// // Couleur opposee : supprimer chiffre		
				wscen=wscen+colPlace[casefin]+" ";
                for (var hnum=0; hnum<chk.length; hnum++) {if (chk[hnum] !=chiffretrap) {eliminationnumero(casefin, chk[hnum])}}				
		}
		if (!lienfaible[i]) {couleur=!couleur}		
	}
	scenario=scenario+".<br>";
}

function eliminationchiffrecolor(case1, case2) {
	var re=/\d/g;
	// case1 et case2 ne se voient pas
	// Recherche de cases hk voyant case1 et case2 , et contenant chiffretrap a eliminer
	var h1=parseInt(case1/9);//	Ligne case1
	var v1=case1-9*h1;// Colonne case 1
	var c1=carre[case1]-1; // Bloc case1
    var h2=parseInt(case2/9);//	Ligne case2
	var v2=case2-9*h2;// Colonne case2
	var c2=carre[case2]; // Bloc case2
	for (var lc=0; lc<3; lc++) {
		 var hkbloc=true;
		 for (var k=0; k<9; k++) {// Recherche case hk sur case1 vue par case2
			 switch (lc) {
			 		case 0:// Ligne de case1
						 var hk=9*h1+k;
						 break;
			 		case 1:// Colonne de case1
						 var hk=9*k+v1;
						 break;
			 		case 2:// Bloc de case1
           		  	   	 var hk=k+6*parseInt(k/3)+18*parseInt(c1/3)+3*c1;
    				   	 hkbloc=((hk-9*parseInt(hk/9))!=(case1-9*parseInt(case1/9))) && (parseInt(hk/9)!=parseInt(case1/9));
						 break;
			 }
			 if (hkbloc) {
			 var posk=contenu[hk];
			 var chk=posk.match(re);
			 // test si hk vue par case2 contient chiffretrap, meme dans boucle (cannibalistique !)
			 var voitoupas=	((carre[hk]==c2) || (parseInt(hk/9)==h2) || ((hk-9*parseInt(hk/9))==v2));
			 // Test hk ne fait pas partie de la chaine
			 for (var i=0; i<xychain; i++) {if (hk==casexy[i]) {voitoupas=false}}
			 if ((hk!=case1) && (hk!=case2) && voitoupas &&  ((posk+"").split(chiffretrap)[0].length<posk.length)) {
    			 	// Supprimer chiffretrap dans hk
					wscen=wscen+"<br>Elimination du chiffre candidat "+chiffretrap+" dans la case "+colPlace[hk]+" voyant les cases extremes "+colPlace[case1]+" et "+colPlace[case2]+".";
					for (var hnum=0; hnum<chk.length; hnum++) {
						if (chk[hnum]==chiffretrap) {eliminationnumero(hk, chk[hnum]);
    					}
					}
			 }}// hk et hkbloc			 
		 }// k
	}// lc
}

function testlienfortcolortrap(case1, case2) {
   // Recherche lien fort entre case1 et case2 par chiffretrap
   var i1=carre[case1]-1;
   var h1=parseInt(case1/9);
   var v1=case1-9*h1;
   var i2=carre[case2]-1;
   var h2=parseInt(case2/9);
   var v2=case2-9*h2;
   // 2 cas : meme bloc ou meme axe (ligne ou colonne)   
   var lf=true;
   if (i1==i2) {// meme bloc
   		 for (var k=0; k<9; k++) {
               var hx=k+6*parseInt(k/3)+18*parseInt(i1/3)+3*i1;
               var posk=contenu[hx];
        	   if ((hx!=case1) && (hx!=case2) && ((posk+"").split(chiffretrap)[0].length<posk.length)) {lf=false}// lien faible
		 }
		 if (lf) {return true}// lien fort dans bloc   
   }
   if ((h1!=h2) && (v1!=v2)) {return false}
   // Recherche type de lien sur axe commun (ligne ou colonne) avec lien faible dans bloc commun ou sans bloc commun
   for (var k=0; k<9; k++) {
         if (h1==h2) {var hx=9*h1+k} else {var hx=v1+9*k}
         var posk=contenu[hx];
       	 if ((hx!=case1) && (hx!=case2) && ((posk+"").split(chiffretrap)[0].length<posk.length)) {return false}// lien faible sur axe sans lien fort dans bloc
   }
   return true;// lien fort sur axe
}

function turbotfish(){
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
  // X-chain = chaine alternee de liens forts et faibles sur un seul chiffre
  // Toute case voyant 2 cases en bout de liens forts, ne peut contenir le chiffre
  for (var num=1; num<10; num++) {// Chiffre candidat
    	for (var i=0; i<M; i++) {// Cases
			var posk=contenu[i];
			if (((posk+"").split(num)[0].length<posk.length) && (posk.length>1)) {// La case i contient le chiffre num, avec d'autres
			   // Debut de chaine partant de cette case i
			   xychain=0;
			   casedepart=i;
			   turbotchiffre=num;
			   caseturbotfish();
    		   if (scenario!=noeffect) {return}
			}
		}// i    
  }// num
}


function caseturbotfish() {
	var re=/\d/g;
	if (xychain>0) {
	   var caseref=casexy[xychain-1];
	} else {
	  var caseref=casedepart;
	}
	var posref=contenu[caseref];
 	var chref=posref.match(re);
	for (var lc=0; lc<3; lc++) {
		switch (lc) {
        	   case 0:
           		    var hl=parseInt(caseref/9);//		   Ligne caseref
        			break;
        	   case 1:
           	   		var hl=caseref-9*parseInt(caseref/9);// Colonne caseref
        			break;
        	   case 2:
           			var ii=carre[caseref]-1;//			   Bloc caseref
        			break;
        	   default:
        		    break;
        }
        for (var k=0; k<9; k++) {// Recherche case hk sur ligne, colonne ou bloc de caseref
		   var hkbloc=true;
		   switch (lc) {
           		  case 0:
           		  	   var hk=k+9*hl;//									   Ligne
        			   break;
           		  case 1:
        		  	   var hk=9*k+hl;//	   	   			 	  	   	  	   Colonne
        			   break;
           		  case 2:
           		  	   var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;//  Bloc
					   // hk dans bloc mais pas sur ligne ni colonne
					   hkbloc=((hk-9*parseInt(hk/9))!=(caseref-9*parseInt(caseref/9))) && (parseInt(hk/9)!=parseInt(caseref/9));
					   break;
           		  default:
        			   break;
        	}
			if (hkbloc) {
			   var posk=contenu[hk];
			   var chk=posk.match(re);
               // Pas de retour sur case precedente et case a plus de 1 chiffre
			   if ((hk!=caseref) && (posk.length>1))  {
        		   if ((posk+"").split(turbotchiffre)[0].length<posk.length) {// Case vue contenant le candidat chiffre
    				   var pasvupasfait=(hk!=casedepart);
                	   if (xychain>0) {for (var j=0; j<xychain; j++) {if (hk==casexy[j]) {pasvupasfait=false}}}
                	   if (pasvupasfait) {// Case hk vue par caseref, differente des cases précédentes de la boucle
						  // Test lien fort entre caseref et hk si xychain pair, 
						  var parite=(xychain==2*parseInt(xychain/2));
 						  if (!parite || (testlienfortforteresse(caseref, hk, turbotchiffre))) {// groupenode sauf 1ere case vue par case depart et 2eme case
    						  // case hk valide --> recherche ien sur case depart (si xychain pair) puis iteration sur case suivante 
                    		  casexy[xychain]=hk;
   							  if ((xychain>2) && parite)  {
							  	 // case voyant case depart et hk, contenant turbotchiffre, a eliminer
								 wscen="Turbot fish entre cases "+colPlace[casedepart]+" et "+colPlace[hk]+"  ";
								 bouclageturbotfishxy();
								 if (scenario!=noeffect) {
									variete=0;
										 if (clickmethode) {
    											var ng=scenario.split("entre cases ")[1];
												ng=ng.substring(0,2)+ng.substring(6,8);
												var tg=true;
    											if (ngratteciel>0) {
        											for (var ig=0; ig<ngratteciel; ig++) {
         												var ngg=gratteciel[ig];
														if ((ng==ngg) || ((ng.substring(0,2)==ngg.substring(ngg.length-2,ngg.length)) && (ng.substring(ng.length-2, ng.length)==ngg.substring(0,2)))) {tg=false}
        											}
    											}
    											if (tg) {
    											   gratteciel[ngratteciel]=ng;
    											   ngratteciel+=1;
    											   enregistrescenarios();
    											} else {
    											  scenario=noeffect;
    											}
										 } else {return}
                    			 }
							  }
                              xychain=xychain+1;// Pointe sur la case suivante
							  caseturbotfish();// Reentrant
    						  xychain=xychain-1;
                    		  if (scenario!=noeffect) {return}
						  }// parite
					   }// pasvupasfait
				   }// (posk+"").split
			   }// hk!=caseref
			}// hkbloc
        }// k : recherche case hk vue suivante (k puis lc)
    }// lc
    // Case avortee  
}

function elaborevarianteturbotfish() {
		 // Turbot fish entre cases H3 et H4 chaine .....élimination chiffre n dans G6 G8 A6
		 var s0=scenario.split("élimination chiffre ")[1];
		 var num=s0.substring(0,1);
		 var s1=s0.split("dans ")[1];
		 decodecase(s1, num);		 
  // Verdissement
  var sc0=scenario.split("chaîne ");
  var sc1=sc0[1].split("élimination")[0]+"xx";
  var liste="";
  for (var i=0; i<sc1.length; i++) {
  	var reste=i-5*parseInt(i/5);
	if (reste==2) {liste+=" "} else if (reste<2) {liste+=sc1[i]}
  }
	decodevert(liste,num);  
}

function bouclageturbotfishxy() {// Avant essai case suivante
	// Recherche bouclage sur turbotchiffre de la case depart
	var re=/\d/g;
	var nouvellecase=casexy[xychain];
	var posk=contenu[nouvellecase];
	   var hnouvellecase=parseInt(nouvellecase/9);
	   var vnouvellecase=nouvellecase-9*hnouvellecase;
       var chaine=colPlace[casedepart];
       var eteg="=";
	   var etneg="-";
	   for (var j=0; j<(xychain+1); j++) {
	   	   if (j==2*parseInt(j/2)) {
		   	  chaine=chaine+eteg+turbotchiffre+eteg+colPlace[casexy[j]];
		   } else {
		   	  chaine=chaine+etneg+turbotchiffre+etneg+colPlace[casexy[j]];
		   }
	   }
	   wscen=wscen+" chaîne "+chaine+" élimination chiffre "+turbotchiffre+ " dans ";
	   var hcasedepart=parseInt(casedepart/9);
	   var vcasedepart=casedepart-9*hcasedepart;
	   if ((vnouvellecase!=vcasedepart) && (hnouvellecase!=hcasedepart) && (carre[casedepart]!=carre[nouvellecase])) {//Turbotfish trouve 
		  // Eliminer turbotchiffre dans les cases voyant nouvellecase et casedepart
		  // 3 cas : blocs horizontaux, blocs verticaux, autres
		  var cdep=carre[casedepart];
		  var cnouv=carre[nouvellecase];
		  var h1=parseInt(cdep/3);
		  var h2=parseInt(cnouv/9);
		  var v1=cdep-3*h1;
		  var v2=cnouv-3*h2
		  if (h1==h2) {// blocs horizontaux
		  	 for (var k=0; k<9; k++) {// Ligne de nouvellecase et bloc de casedepart
			 	 var h=9*hnouvellecase+k;
				 if ((carre[h]==carre[casedepart]) && (h!=nouvellecase)) {traitefishxy(h)}
			 }
		  	 for (var k=0; k<9; k++) {// Ligne de casedepart et bloc de nouvellecase
			 	 var h=9*hcasedepart+k;
				 if ((carre[h]==carre[nouvellecase]) && (h!=casedepart)) {traitefishxy(h)}			 
			 }		  
		  } else if (v1==v2) {// blocs verticaux
			 for (var k=0; k<9; k++) {// Colonne de nouvellecase et bloc de casedepart
			 	 var h=vnouvellecase+9*k;
				 if ((carre[h]==carre[casedepart])&& (h!=nouvellecase)) {traitefishxy(h)}			 
			 }
		  	 for (var k=0; k<9; k++) {// Colonne de casedepart et bloc de nouvellecase
			 	 var h=vcasedepart+9*k;
				 if ((carre[h]==carre[nouvellecase])&& (h!=casedepart)) {traitefishxy(h)}
			 }	
		  } else {// Autres : ligne de l'un et colonne de l'autre
		  		 var h=9*hcasedepart+vnouvellecase;
				 traitefishxy(h);
		  		 var h=9*hnouvellecase+vcasedepart;
				 traitefishxy(h);		  
		  }
	   }// Case non vue
}

function traitefishxy(x) {
	var re=/\d/g;
	var cc=contenu[x]+"";
	var ccbloc=cc.match(re);
    var pasvupasfait=true;
    for (var j=0; j<xychain; j++) {if (x==casexy[j])  {pasvupasfait=false}} // Pas cannibalistique
	if (pasvupasfait && (cc.length>1)&& (cc.split(turbotchiffre)[0].length<cc.length)) {
	   // turbotchiffre a eliminer dans la case x
	   wscen=wscen+colPlace[x]+" ";
	   eliminationnumero(x, turbotchiffre);
	}
}



