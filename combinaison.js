function combinaison(){
		maxvarencours=1;
		wscendiscontinu=[];
		wscendiscontinubis=[];
		wscencontinu=[];
		wscencontinubis=[];
		typediscontinu=0;
		typecontinu=0;
		wsceninacheve=[];
		wsceninachevebis=[];
		typeinacheve=0;
		tableauvariante = [];//Reinitialisation de la liste des variantes
		tableauvariante[0] = "Liste calculee des variantes";
		var iter0cumule=0;
		compteurtypecontinu=0;
		compteurtypediscontinu=0;
		compteurtypeinacheve=0;
		casexy=[];
		ials=[];
		for (var i=0; i<MAXTIGRE; i++) {tableaualsaic[i]=new Array(); chiffrealsaic[i]=new Array()}
		var initi=0; 
		var initmax=M;
		if (CASEINITALSCHAIN.length==2) {initi=decodagecolPlace(CASEINITALSCHAIN); initmax=(decodagecolPlace(CASEINITALSCHAIN)+1)}
		for (var i=initi; i<initmax; i++) {// Case de depart
			iter0=0;
			if (contenu[i].length>1) {
				XALS=true;
				lcals1=-1;
				xychain=0;// pointeur de la case de casedepart
   				casedepart=i;
   				casexy[xychain]=colPlace[casedepart];
				ials[xychain]=0;
				tableaualsaic[xychain]=[];
				chiffrealsaic[xychain]=[];
				tableaualsaic[xychain][ials[xychain]]=casexy[xychain];
				chiffrealsaic[xychain][ials[xychain]]=contenu[casedepart];
				validationcombinaison(casedepart);
    			iter0cumule+=iter0;
    		}// contenu.length>1
		}// i
wscen=noeffect;

}

function etablirchaineals(casepre) {
	 for (var i=0; i<xychain; i++) {
			wscen+=casexy[i];
   			if (lienfaible[i]) {wscen+="-"+chiffrexy[i]+"-"} else {wscen+="="+chiffrexy[i]+"="}			
	}
	wscen+=casepre;			
}


function validationcombinaison(caseref) {
var re=/\d/g;
iter0+=1;
var caseprevious=tableaualsaic[xychain][ials[xychain]];
casexy[xychain]=caseprevious;;
var chref=chiffrealsaic[xychain][ials[xychain]].match(re);
var alspre=(caseprevious.length>2);
var ipmax=caseprevious.length/2;
var Xpre=XALS;
wscen=""; etablirchaineals(caseprevious);
var hn0=0; var lc0=0; var k0=0; var hnmax=chref.length;
for (var iprev=0; iprev<ipmax; iprev++) {
	caseref=decodagecolPlace(caseprevious.substring(2*iprev, 2*iprev+2));
for (var hn=hn0; hn<hnmax; hn++) {
	var chiffre=chref[hn];
	chiffrexy[xychain]=chiffre;
	if (alspre && (chiffre==chiffrexy[xychain-1])) {continue}// pas le meme chiffre autour de groupement als
	if (xychain>0) {lc0=0; k0=0}
	for (var lc=lc0; lc<3; lc++) {
		for (var k=k0; k<9; k++) {// Recherche case hk valide sur ligne, colonne ou bloc de caseref
			XALS=Xpre;
			var hk=recherchealshk(lc, caseref, chiffre, k);
			if (hk!=M) {
				if ((hk==casedepart) && (xychain<2)) {continue}// hk pas dans casedepart dans les premiers maillons
				if ((xychain>0) && (hk!=casedepart) && (wscen.split(colPlace[hk])[0].length<wscen.length)) {continue}// hk pas dans wscen sauf casedepart 
				for (var i=0; i<ipmax; i++) {if (sevoient(hk, decodagecolPlace(caseprevious.substring(2*i, 2*i+2)))) {break}}
				if (i<iprev) {continue}
				if (alspre && !testsaturation(colPlace[hk], caseprevious)) {continue}
				if (alspre && (xychain>1) && troismaillons(caseprevious, hk, casexy[xychain-1])) {continue}
				configalslienfantome(caseprevious, caseref, hk, chiffre);// creation tableaux sur xychain+1
               	var nbtab=tableaualsaic[xychain+1].length;
				for (var itab=0; itab<nbtab; itab++) {
					var voitals=tableaualsaic[xychain+1][itab];
					if (alspre) {
							lienfaible[xychain]=lienals(caseprevious , colPlace[hk], chiffre);
                			if (!testokals(caseprevious, colPlace[hk], chiffre)) {continue}
					} else {
						if (itab<nbtab-1) {
							lienfaible[xychain]=lienals(voitals, colPlace[caseref], chiffre);
						} else {
							lienfaible[xychain]=!testlienfortgeneral(decodagecolPlace(caseprevious), hk, chiffre);
						}
						if (xychain>0) {
    						if (!quatrebonscasusuel((chref.length==2), (chiffre==chiffrexy[xychain-1]), !lienfaible[xychain-1], !lienfaible[xychain])) {// !hk
									if ((hk==casedepart) && (itab==nbtab-1)) {// cas solution inachevee
    									if (!XALS &&  !testlienfortgeneral(decodagecolPlace(casexy[xychain]), caseref, chiffrexy[xychain])) {continue}
										if (solutioninachevee(caseref, caseprevious)) {return}
    								}// solution inachevee si hk=casedepart
    								continue;
    						}// quatrebonscas
						} // xychain>0
						if ((itab<nbtab-1) && !XALS) {
							XALS=Xpre; 
							itab=nbtab-2;
							continue;
						}
					}// itab vs nbtab
					if ((xychain>1) && (hk==casedepart)) {// cas solutions continue ou discontinue
						if (solutionboucles(caseprevious, chiffre)) {return}
						continue;
					}// solutions continue ou discontinue
					if (iter0>MAXITER) {return}
					if (xychain>MAXTIGRE) {return}
					xychain+=1;
					ials[xychain]=itab;
           			var wscenbis=wscen;
					validationcombinaison(hk);
	               	wscen=wscenbis;
					XALS=Xpre
					xychain-=1;
               		if (scenario!=noeffect) {return}// depilement
				}// itab
			}// hk!=M
		}// k
	}// lc
}// + hn : recherche chiffre suivant 
}// iprev
}

function configalslienfantome(listecaseref, case1, combcce1, chif) {// caseref, hk, chiffre, avec hk pasvupasfait, contient chiffre et voit caseref et aussi caserefprevious
	var cascce=new Array();// Tableau des cases dans zone sudoku de combcce1 et differente des cases du tableau caseals autour de combcce1
	var re=/\d/g;
	var ii=carre[combcce1]-1;
	var hcase=parseInt(combcce1/9);
	var vcase=combcce1-9*hcase;
   	tableaualsaic[xychain+1]=[];
   	chiffrealsaic[xychain+1]=[];
	for (var lc=0; lc<3; lc++) {
    	combnombreajout=0;
    	cascce=[];
    	var wtc=0;
    	var nbmax=8;
		for (var j=0; j<9; j++) {
			var h=0;
    			switch(lc) {
                	  case 0: // Ligne
                			var h=j+9*hcase;
    						var idlc=(parseInt(case1/9)==hcase);
                			break;
                	  case 1: // Colonne
                			var h=vcase+9*j;
    						var idlc=((case1-9*parseInt(case1/9))==vcase);
                			break;
                	  case 2: // Carre
                			var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii;
                			var idlc=(carre[case1]==carre[combcce1]);
    						break;
                	  default:
                			break;					
                }// switch
				var posconf=contenu[h];			
    			if ((h!=case1) && (h!=combcce1) && (posconf.length>1)  && verifpasdanschaine(h)) {// h pas !=case1 et h!=combcce1 (hk), avec au moins 2 chiffres, non vu dans chaine  (pas de casecade als)
    					if (!((posconf.split(chif)[0].length<posconf.length) && !sevoient(h, combcce1))) {
							cascce[wtc]=h;
    						wtc+=1;
    					}
                 }
    			 if (posconf.length==1) {nbmax-=1}
         }// j
		 if (!idlc) {nbmax+=1}// case sur axe et bloc
    	 var voitcce="";
    	 for (var i=0; i<cascce.length; i++) {voitcce+=colPlace[cascce[i]]}
    	 var nbconf=Math.pow(2,wtc);// Nombre de configurations de cases
    	 var poscce=contenu[combcce1];
    	 var nbchiffre=poscce.length;// Initialisation nombre de chiffres
    	 for (var nconfig=0; nconfig<nbconf; nconfig++) {// Configurations
           	 combnombreals=poscce;
           	 var ij=nconfig.toString(2);
             while (ij.length<wtc) {ij="0"+ij}// Ajustement sur 2 caracteres
    		 var nbcase=1;// Nombre de cases de la configuration en cours
    		 for (var nbij=0; nbij<wtc+2; nbij++) {
    		 	 if (ij.substring(nbij, (nbij+1))==1) {nbcase+=1}
    		 }
    		 var ajout=nbcase+1-nbchiffre;
    		 if (ajout>-1) {
        		 var ncase=0;
    			 combcaseals=[];
    			 combcaseals[0]=combcce1;
                 combnombreajout=0;
    			 for (var jj=0; jj<wtc; jj++) {
                     	// Test si position dans ij : position jj dans ij vaut 1
            			if (ij.charAt(jj)==1) {// ajouter case
    					   var posk5=contenu[cascce[jj]];
                           ncase+=1;
            			   combcaseals[ncase]=cascce[jj];
    					   var nombre1=combnombreals.toString();
    					   for (var neuf=0; neuf<posk5.length; neuf++) {
                           	   var m=posk5.substring(neuf, (neuf+1));
                               if (!(nombre1.split(m)[0].length<nombre1.length)) {// ajouter nouveau chiffre
                                  combnombreajout+=1;
        						  // ajouter m dans nombreals de maniere ordonnee
                                  var nombre0=nombre1;
    							  for (var jcr=0; jcr<nombre0.length; jcr++) {
                                  	  var ipo=nombre0.substring(jcr, (jcr+1));
                                      if (ipo>m) {
    									 //nombre1=nombre0.split(ipo)[0]+m+ipo+nombre0.split(ipo)[1];                        			
    									 nombre1=nombre0.substring(0,jcr)+m+nombre0.substring(jcr,nombre0.length);                        			
            							 break;
                                      }
                                   }// jcr
                                   if (jcr==nombre0.length) {nombre1=nombre0+m}
    							}// nombre1 split
                           }// neuf
    					   combnombreals=nombre1;
    					}//charAt
           		}// jj
				var voitcce=colPlace[combcce1];
    			for (var i=1; i<cascce.length; i++) {
           				var h=cascce[i];
           				voitcce+=colPlace[h];
    			}
				var voitals=colPlace[combcce1];
    			for (var i=1; i<combcaseals.length; i++) {
           				var h=combcaseals[i];
           				voitals+=colPlace[h];
    			}
				if ((combnombreajout==ajout) && (combcaseals.length>1) && (combnombreals.split(chif)[0].length<combnombreals.length)) {//ALS : cases dans combcaseals, chiffres dans combnombreals, als avec 2 cases minimum, chif dans combnombreals
					var nombrecases=voitals.length/2;
					// Tester les cases de cascce non contenues dans combcaseals et verifier si leur contenu ne fait pas partie de combnombreals
    				if (nombrecases<nbmax) {// Pas de saturation de l axe et tableau entre 3 et 6 cases
						// case1 voit toutes les cases de voitals contenant chif et pas d autre
						if (eliminationmultiple(combcaseals) && eliminationvoitalsendouble(voitals) && testokals(listecaseref, voitals, chif)) {
							if (XALS && testsaturation(listecaseref, voitals)) {
								tableaualsaic[xychain+1].push(voitals);
    							// expurger chif de combnombreals 
    							chiffrealsaic[xychain+1].push(expurge(combnombreals, chif));
							}
						}
    				}
            	}//ALS (combnombreajout=ajout)
        	 }//ajout>
         }// nconfig
	 }// lc
	 tableaualsaic[xychain+1].push(colPlace[combcce1]);
	 chiffrealsaic[xychain+1].push(contenu[combcce1]);
}

function pasdejafait(lcx, kx, h1, chif) {// lcx et kx : hk en cours; caseref chiffre
	return true;
	var ii=carre[h1]-1;
	for (var lc=0; lc<(lcx+1); lc++) {
		for (var k=0; k<kx; k++) {
			switch(lc) {
  					case 0: // Ligne h1
						var h=k+9*parseInt(h1/9);
						break;
  					case 1: // Colonne h1
						var h=h1-9*parseInt(h1/9)+9*k;
						break;
  					case 2: // Carre h1
						var h=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii; // Position k dans le carre de h1
						break;
					default:
						break;
			}// switch
			var posfait=contenu[h];
			// h = hk previous contenant chif, different de case1 (caseref) : pas de recherche als par configalslienfantome
			if ((h!=h1) && (posfait.length>1) && (posfait.split(chif)[0].length<posfait.length)) {return false}
		}// k
	}// lc
	return true;
}

function solutionboucles(liste1, chif) {
	wscen="";
	etablirchaineals(liste1);
    var alfa="=";
	if (lienfaible[xychain]) {alfa="-"}
	var continuer=true
	if (quatrebonscas((contenu[casedepart].length==2), (chiffrexy[0]==chif), !lienfaible[xychain], false)) {
			wscen+=alfa+chif+alfa+colPlace[casedepart];
			if (!solutionbouclediscontinue()) {scenario=noeffect};// Boucle discontinue			
			continuer = false;
	} else if (quatrebonscas((contenu[casedepart].length==2), (chiffrexy[0]==chif), !lienfaible[xychain], true)) {
    		var deco=wscen.split("="+chif+"=");
			if (deco.length!=((wscen.length-2)/5+1)) {
            	wscen+=alfa+chif+alfa+colPlace[casedepart];
            	if (!solutionbouclecontinue()) {scenario=noeffect};// Boucle continue
            }
	}
	if (scenario!=noeffect) {// Solution
		iter2+=1;
		if (clickmethode) {enregistrescenarioaicals();scenario=noeffect}
    }// solution
	return continuer;
}

function solutioninachevee(case1, liste1) {
	var autrechiffre=calculautrechiffre(contenu[case1], chiffrexy[xychain-1], contenu[casedepart], chiffrexy[0]);
	if (autrechiffre!=M) {
			wscen="";
			etablirchaineals(liste1);
			var alfa="=";
			if (lienfaible[xychain]) {alfa="-"}
   			wscen+=alfa+autrechiffre+alfa+colPlace[casedepart];
			if (!solutionboucleinachevee(case1, autrechiffre)) {scenario=noeffect};
       		if (scenario!=noeffect) {// Solution
				iter2+=1;
       			if (clickmethode) {enregistrescenarioaicals();scenario=noeffect}
       			return true;//  avec ou sans solution (rupture casedepart)
      		}// solution
	}
return false;
}

function testsaturation(listecase, listeals) {//caseprevious et voitals
	// Pour eviter une saturation, identifier lc de listeals
	// puis calculer la somme des cases dans lc de : cases a 1chiffre + cases de listecase + cases de listeals  : 9 = saturation
	var h0=decodagecolPlace(listeals.substring(0,2));
	var h1=decodagecolPlace(listeals.substring(2,4));
	var lc=-1;
	if (parseInt(h0/9) == parseInt(h1/9)) {lc=0}
	if ((h0-9*parseInt(h0/9)) == (h1-9*parseInt(h1/9))) {lc=1}
	if (carre[h0] == carre[h1]) {lc+=3}
	var jmax=1+(lc>2);
	var icarre=carre[h0]-1;
	for (var j=0; j<jmax; j++) {
		if (j==1) {lc=2} else {if (lc>2) {lc-=3}}
		for (var i=0; i<9; i++) {
			switch (lc) {
				case 0: // Ligne ihorizontal
					var h=i+9*parseInt(h0/9);
					break;
				case 1: // Colonne ivertical
					var h=(h0-9*parseInt(h0/9))+9*i;
					break;
				case 2: // Carre icarre
					var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
					break;
			}
			if (!((listecase.split(colPlace[h])[0].length<listecase.length) || (listeals.split(colPlace[h])[0].length<listeals.length) || (contenu[h].length==1))) {break}
		}// i
		if (i==9) {return false}// saturation
	}// j
	return true;
}	

function troismaillons(listeals, h0, listeprevious) {//caseprevious, hk et casexy[xychain-1]
	// Pas 3 maillons sur meme lc
	// verifier si sur un lc de h0, tout listeals est vu ainsi que tout listeprevious
	var icarre=carre[h0]-1;
	for (var lc=0; lc<3; lc++) {
		var nals=0;
		var nprevious=0;
		for (var i=0; i<9; i++) {
			switch (lc) {
				case 0: // Ligne de h0
					var h=i+9*parseInt(h0/9);
					break;
				case 1: // Colonne de h0
					var h=(h0-9*parseInt(h0/9))+9*i;
					break;
				case 2: // Bloc de h0
					var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
					break;
			}
			if (listeals.split(colPlace[h])[0].length<listeals.length) {nals+=1}
			if (listeprevious.split(colPlace[h])[0].length<listeprevious.length) {nprevious+=1}
		}// i
		if ((nals==listeals.length/2) && (nprevious==listeprevious.length/2)) {return true}// 3 maillons dans meme lc
	}// lc
	return false;
}	

function quatrebonscas(x2, c2, lamont, param) {
	if (!param) {// Vers solution discontinue
		if (XALS && c2) {return true} //Discontinue 
		if (!XALS && lamont && !c2) {return true}
	} else {// Cas general ou solution continue    	
		if (XALS && x2 && !c2) {return true}
		if (!XALS && lamont && c2) {return true}
	}
	return false;// Rupture par defaut
}
function quatrebonscasusuel(x2, c2, lamont, laval) {// cas general
	if (XALS && x2) {XALS=!c2; return true}
	if (XALS && c2) {XALS=false; return true} 
	if (!XALS && lamont) {XALS=c2; return true}
	return false;// Rupture par defaut
}

function lienals(listeals, caseals, chif) {
	// Evaluer le lien entre listeals et case1 par chif
	var case1=decodagecolPlace(caseals);
	var hh1=parseInt(case1/9);
	var vv1=case1-9*hh1;
	var ii1=carre[case1]-1;
	var listevue="";
	for (var lp=0; lp<2; lp++) {// remplir listevue, puis tester case voyant listevue et contenant chif, pas dans listevue
    	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) 	utour de case1
    		for (var i=0; i<9; i++) {
					var pasendouble=true;
    				switch (lc) {
    	  					case 0: // Ligne case1
    							var h=i+9*hh1;
    							break;
    	  					case 1: // Colonne case1
    							var h=vv1+9*i;
    							break;
    	  					case 2: // Bloc case1
    							var h=i+6*parseInt(i/3)+18*parseInt(ii1/3)+3*ii1; // Position j dans le carre i
    							if ((parseInt(h/9)==hh1) || ((h-9*parseInt(h/9)) == vv1)) {pasendouble=false}
    							break;
    						default:
    							break;
    				}// switch
        			if (pasendouble && (h!=case1)) {// h voit case1
						if ((lp==0) && (listeals.split(colPlace[h])[0].length<listeals.length)) {// chargement listevue
								listevue+=colPlace[h];
						} else if ((lp==1) && (listevue.split(colPlace[h])[0].length==listevue.length)) {// h pas dans listevue
    						var posk=contenu[h];
    						if ((posk.length>1) && (posk.split(chif)[0].length<posk.length)) {// h contient chif
								for (var qp=0; qp<listevue.length/2; qp++) {
									var casevue=listevue.substring(2*qp, 2*qp+2);
									var hvue=decodagecolPlace(casevue);
									if (!sevoient(h, hvue)) {break}
								}//qp
								if (qp==listevue.length/2) {return true}// lienfaible car il existe h voyant case1, contenant chif et voyant toutes le cases de listevue
        					}// chif
        				}// if lp
  				}// pasendouble
    		}// i
    	}// lc
	}// lp
	return false;	 
}

function expurge(num, ch) {
	var result="";
	var re=/\d/g;
	var nb=(num+"").match(re);
	for (var i=0; i<nb.length; i++) {
		var x=nb[i];
		if (x!=ch) {result+=x}
	}
	return result;
}

function eliminationmultiple(hc) {
	for (var i=0; i<hc.length; i++) {
		var ki=contenu[hc[i]];
		for (var j=i+1; j<hc.length; j++) {
			var kj=contenu[hc[j]];
			var melij=melange(ki, kj);
			if (melij.length==2) {return false}// paire
			for (var k=j+1; k<hc.length; k++) {
				var kk=contenu[hc[k]];
				var melijk=melange(melij, kk);
				if (melijk.length==3) {return false}// triple
    			for (var l=k+1; l<hc.length; l++) {
    				var kl=contenu[hc[l]];
					var melijkl=melange(melijk, kl);
    				if (melijkl.length==4) {return false}// quadruple
    			}// l
			}// k
		}// j
	}// i
	return true;
}
function eliminationvoitalsendouble(tabencours) {
	var tabfait=tableaualsaic[xychain];
	var tablen=tabfait.length;
	for (var i=0; i<tablen; i++) {
		if (tabencours==tabfait[i]) {return false}
	}
	return true;
}

function melange(xxx, y) {
	var re=/\d/g;
	var yy=y.match(re);
	var alfa=xxx+"";
	for (var j=0; j<yy.length; j++) {
		var cary=yy[j];
		if (xxx.split(cary)[0].length==xxx.length) {alfa+=cary}
	}
	return alfa;	
}

function testokals(listeprevious, listecase1, chiffre1) {// Toutes les cases contenant chiffre1, des 2 listes, doivent se voir
	var yest=false;
	for (var i=0; i<listeprevious.length/2; i++) {
		var hh=listeprevious.substring(2*i, 2*i+2);
		var h=decodagecolPlace(hh);
		var poshh=contenu[h];
		for (var j=0; j<listecase1.length/2; j++) {
    		var case1=decodagecolPlace(listecase1.substring(2*j, 2*j+2));
    		if ((h!=case1) && (poshh.split(chiffre1)[0].length<poshh.length)) {// case h dans als contient chiffre1
			var poscase1=contenu[case1];
       		if (poscase1.split(chiffre1)[0].length<poscase1.length) {// case1 dans listecase1 contient chiffre1
        			yest=true;
        			if (!sevoient(h, case1)) {return false} // h ne voit pas case1 --> non valide
        		}
			}
		}// j
	}// i
	return yest;
}

function enregistrescenarioaicals() {
			  tableauvariante[maxvarencours] = scenario+"$"+variete;
    		  maxvarencours+=1;
}


function elaborevarianteALSChain() {
// Methode 31, 2 varietes de boucle
// Variete 0 : ALS Chain Boucle discontinue
//   Elimination du chiffre de depart n dans la case  de depart HH
// Variete 1 : ALS Chain Boucle continue
//   Liens faibles entre 2 cases requalifies en liens forts : Elimination du chiffre n dans toute case HH voyant ces 2 cases
//   Cases entre 2 liens forts, ne conservent que les 2 chiffres qui l entourent: Elimination des chiffres differents de n et m dans la case HH entouree de ces chiffres en lien fort
// Variete 2 : ALS Chain Boucle inachevee
//   Elimination du chiffre autre qu le chiffre de depart dans la case  de depart a 2 chiffres, dans toutes les cases voyant la case de depart et la case finale de la chaine a 3 chiffres
var re=/\d/g;
a="ALS Chain ";
if (scenario.split("Boucle discontinue ")[0]==a){
			 variete=0;
			 var xxx=scenario.split("<br>")[1];
			 var caseinit=xxx.substring(0,2);
			 var chiffreinit=xxx.substring(3,4);
			 eliminationnumero(decodagecolPlace(caseinit), chiffreinit);
			 verdirals(scenario);

}
if (scenario.split("Boucle continue ")[0]==a){
			// le chiffre autre que le chiffre de depart dans la case de depart ne peut etre dans les cases voyant les cases de depart et finale
			 variete=1;
			 wscen=scenario.split("<br>")[0]+"<br>"+scenario.split("<br>")[1];
			 textecontinu();
			 verdirals(scenario);

}
if (scenario.split(tradacrit("Boucle inachevée "))[0]==a){
			 variete=2;
			 wscen=scenario.split("<br><br>")[0];;
			 var xxx=scenario.split("<br>")[1];
			 casedepart=decodagecolPlace(xxx.substring(0,2));
			 var chiffrefinal=xxx.substring(xxx.length-4, xxx.length-3);
			 var casefinale=xxx.substring(xxx.length-7, xxx.length-5)
			 texteinacheve(decodagecolPlace(casefinale), chiffrefinal);
			 verdirals(scenario);

}

// Recherche regroupement als
   regroopals();
}

function regroopals() {// -HHHHHH- ou -HH- suivi de -xxxx- ou -x-
	var sx=scenario.split("<br>")[1];
	var regegal = new RegExp('[=]', 'gi');
	var s0=sx.replace(regegal, "-");
	var s1=s0.split("-");
	var prems=true;
	for (var i=1; i<s1.length; i++) {// premiere passe pour les als
	   if (s1[i].length>2) {
    		  if (prems) {
    				scenario+="<br><br>Cases dans une ALS (Almost Locked Set ou bien groupe presque complet) : ";
    		  }
    		  prems=false;
    		  scenario+=s1[i]+" ";
	   }
	}
	var xl=(s1[s1.length-1]);
	if (xl.length>2) {scenario+=xl}
	scenario=tradacrit(scenario);
}

function verdirals(s1vert) {
	 var re=/\d/g;
	 var sc=s1vert.split("<br>")[1];
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


function solutionbouclediscontinue() {
       			var excen=wscen;
				wscen="ALS Chain Boucle discontinue <br>"+wscen
				variete=0;
				compteurtypediscontinu+=1;
				if (typediscontinu==0) {// 1ere solution
       				wscendiscontinu[typediscontinu]=wscen;
       				wscendiscontinubis[typediscontinu]=wscen;
					textediscontinu();// contient scenario=wscen
       				typediscontinu+=1;
					return true;
       			} else {
           			for (var i=0; i<typediscontinu; i++) {// solution previous
           				var ref=wscendiscontinu[i].split("<br>")[1];
       					var extref=ref.substring(0,4);
       					var extwscen=excen.substring(0,4);
       					if (extref==extwscen) {// cas previous identique
       						if (ref.length>excen.length) {// solution previous plus longue
                   				wscendiscontinu[i]=wscen;// correction
           						wscendiscontinubis[i]=wscen;
								textediscontinu();// contient scenario=wscen
								maxvarencours-=1;
								return true;
       						}
       						break;
       					}
           			}// i
           			if (i==typediscontinu) {// solution nouvelle avec validite entre als
               				wscendiscontinu[typediscontinu]=wscen;
           					wscendiscontinubis[typediscontinu]=wscen;
							textediscontinu();// contient scenario=wscen
							typediscontinu+=1;
							return true;
					}
       			}// typediscontinu
return false;
}

function solutionboucleinachevee(case1, chif) {
	wscen=tradacrit("ALS Chain Boucle inachevée <br>")+wscen
	if (testlienfort(case1, casedepart, chif)) {return false}
	variete=2;
	compteurtypeinacheve+=1;
	if (typeinacheve==0) {// 1ere solution
		wsceninacheve[typeinacheve]=wscen;
		wsceninachevebis[typeinacheve]=wscen;
		typeinacheve+=1;
		texteinacheve(case1, chif);
		return true;// contient scenario=wscen
	} else {
		for (var i=0; i<typeinacheve; i++) {// solution previous
			var ref=wsceninacheve[i];
			var extref=ref.substring(0,4)+ref.substring(ref.length-4, ref.length);
			var extwscen=wscen.substring(0,4)+wscen.substring(wscen.length-4, wscen.length);
			if (extref==extwscen) {// cas previous identique
				if (ref.length>wscen.length) {// solution previous plus longue
       				wsceninacheve[i]=wscen;// correction
					wsceninachevebis[i]=wscen;
					texteinacheve(case1, chif);
					maxvarencours-=1;
					return true;// contient scenario=wscen
				}
				break;
			}
		}
		if (i==typeinacheve) {// solution nouvelle avec validite entre als
			wsceninacheve[typeinacheve]=wscen;
			wsceninachevebis[typeinacheve]=wscen;
			typeinacheve+=1;
			texteinacheve(case1, chif);
			return true;// contient scenario=wscen
		}
	}// typeinacheve
	return false;
}

function texteinacheve(refer, ch) {// Elimine ch dans les cases voyant refer et casedepart
	var hh1=parseInt(refer/9);
	var vv1=refer-9*hh1;
	var ii1=carre[refer]-1;
	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) 	utour de case1
			for (var i=0; i<9; i++) {
				var pasendouble=true;
    			switch (lc) {
    	  					case 0: // Ligne case1
    							var h=i+9*hh1;
    							break;
    	  					case 1: // Colonne case1
    							var h=vv1+9*i;
    							break;
    	  					case 2: // Bloc case1
    							var h=i+6*parseInt(i/3)+18*parseInt(ii1/3)+3*ii1; // Position j dans le carre i
    							if ((parseInt(h/9)==hh1) || ((h-9*parseInt(h/9)) == vv1)) {pasendouble=false}
    							break;
    						default:
    							break;
    			}// switch
        		if (pasendouble && (h!=refer) && (h!=casedepart) && sevoient(h, casedepart)) {// h ni refer ni casedepart, voit casedepart et contient ch
    				var posk=contenu[h];
					if ((posk.length>1) && (posk.split(ch)[0].length<posk.length)) {// h contient ch
wscen+=tradacrit("<br><br>Elimination du chiffre "+ch+" dans la case "+colPlace[h]+" voyant les cases reliées par ce chiffre "+colPlace[refer]+" et "+colPlace[casedepart]);
						eliminationnumero(h, ch);
        			}
  				}// pasendouble
   		}// i
   	}// lc
	scenario=wscen;
}

function calculautrechiffre(val1, chiffre1, val2, chiffre2) {
	var re=/\d/g;
	// Enlever chiffre1 de val1
	var aval=val1.match(re);
	var reste="";
	for (var i=0; i<aval.length; i++) {
		var inval=aval[i];
		if (inval!=chiffre1) {reste+=inval}
	}
	// Si reste=val2, ayant 2 chiffres, selectionner autrechiffre de val2 que chiffre2
	if ((reste.length==2) && (reste==val2)) {
		var adep=val2.match(re);
		var autre=adep[0];
		if (chiffre2==autre) {autre=adep[1]}
		return autre;
	} else {return M}	

}



function textediscontinu() {// disseque wscen et recopie dans scenario, sans rougissement par eliminationnumero
	var xxx=wscen.split("<br>")[1];// La chaine commencant par la case et son chiffre de depart a supprimer
	var chif0=xxx.substring(3,4);
	var case0=xxx.substring(0,2);
	wscen+=tradacrit("<br><br>Elimination du chiffre de départ "+chif0+" de la boucle dans la case de départ "+case0);
	eliminationnumero(decodagecolPlace(case0), chif0);
	scenario=wscen;
}

function textecontinu() {// disseque wscen et recopie dans scenario, sans rougissement par eliminationnumero
	// Lister les liens faibles, a  transformer en liens forts, eliminant le chiffre dans les cases voyant les cases autour de ce lien faible (y compris ALS !)
	var retour=false;
	var autreretour=false;
	var yyy=wscen.split("-");
	var y0=yyy[0];
	if ((y0.length>2) && (y0.split("<br>")[0].length<y0.length)) {yyy[0]=y0.split("<br>")[1]}
	var retour=false;
for (var i=0; i<yyy.length-1; i++) {// Elimination des chiffres de liens faibles dans les cases voyant les cases autour (y compris als)
		var chiffre=yyy[i+1];
    	var textpre=yyy[i];
    	var yyypre=textpre.split("=");
		if (yyypre[0].length==textpre.length) {var casepre=yyypre[0]} else {var casepre=yyypre[yyypre.length-1]}
    	var textpost=yyy[i+2];
		if ((chiffre.length==1) && (yyypre.length>0)) {
    		var yyypost=textpost.split("=");
    		var casepost=yyypost[0];
			var casedevant = casepre;
			var casederriere=casepost;
			if (casepre.length>2) {
				casedevant = casepost;
				casederriere=casepre;
			}
			if (casedevant.length==2) {
    			retour=eliminationdanscasesautour(casedevant, casederriere, chiffre);// Elimine chiffre dans cases voyant casedevant et casederriere
			}
		}
		i+=1;
	}
	var zzz=wscen.split("=");
	for (var i=0; i<zzz.length-1; i++) {// Elimination dans case entouree de liens forts des chiffres autres que ceux qui entourent cette case
		var chiffre=zzz[i+1];
		if (chiffre.length==1) {
    		var caseh=zzz[i+2];
			if ((caseh.length==2) && !(typeof zzz[i+3] === "undefined") && (chiffre!=zzz[i+3])) {// trouve non als
				autreretour=eliminationchiffresdanscase(caseh, chiffre, zzz[i+3]);// Elimination chiffres de caseh differents de chiffre et zzz[i+3]
			}
		}
		i+=1;
	}
	scenario=wscen;
	return retour || autreretour;
}

function eliminationdanscasesautour(case1, case2, chif) {
	var h1=decodagecolPlace(case1);
	var hh1=parseInt(h1/9);
	var vv1=h1-9*hh1;
	var ii1=carre[h1]-1;
   	var retour=false;
	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) 	utour de case1
			for (var i=0; i<9; i++) {
				var pasendouble=true;
    			switch (lc) {
    	  					case 0: // Ligne case1
    							var h=i+9*hh1;
    							break;
    	  					case 1: // Colonne case1
    							var h=vv1+9*i;
    							break;
    	  					case 2: // Bloc case1
    							var h=i+6*parseInt(i/3)+18*parseInt(ii1/3)+3*ii1; // Position j dans le carre i
    							if ((parseInt(h/9)==hh1) || ((h-9*parseInt(h/9)) == vv1)) {pasendouble=false}
    							break;
    						default:
    							break;
    			}// switch
        		if (pasendouble && (h!=h1)) {// h voit case1
    				var posk=contenu[h];
					if ((posk.length>1) && (posk.split(chif)[0].length<posk.length)) {// h contient chif
						if (case2.length==2) {
							if (wscen.split(colPlace[h])[0].length==wscen.length) {// h pas dans la chaine
								var h2=decodagecolPlace(case2);
    							if ((h!=h2) && sevoient(h, h2)) {// elimination chif dans h
    								wscen+=tradacrit("<br>Elimination du chiffre "+chif+" dans la case "+colPlace[h]+" voyant les cases reliées en lien faible par ce chiffre "+case1+" et "+case2);
									retour=true;
									eliminationnumero(h, chif);
    							}
							}
						} else if (case2.split(colPlace[h])[0].length == case2.length) {// als : h doit voir toutes les cases de case2 contenant chif et ne pas appartenir a case2
							var ivu=0;
							for (var k=0; k<case2.length/2; k++) {
								var hk=decodagecolPlace(case2.substring(2*k, 2*k+2));
								var poshk=contenu[hk];
								if (poshk.split(chif)[0].length<poshk.length) {
        							if(sevoient(h,hk)) {ivu+=1}
								}// chif
							}// k
							if (ivu==case2.length/2) {
									wscen+=tradacrit("<br>Elimination du chiffre "+chif+" dans la case "+colPlace[h]+" voyant les cases reliées en lien faible par ce chiffre "+case1+" et "+case2);
									retour=true;
									eliminationnumero(h, chif);
							}
						}//case2.length
        			}// chif
  				}// pasendouble
   		}// i
   	}// lc
	return retour;
}

function solutionbouclecontinue() {
			wscen="ALS Chain Boucle continue <br>"+wscen
			if (textecontinu()) {
				variete=1;
				compteurtypecontinu+=1;
				if (typecontinu==0) {// 1ere solution
       				wscencontinu[typecontinu]=wscen;
       				wscencontinubis[typecontinu]=wscen;
       				typecontinu+=1;
					return true;// contient scenario=wscen
       			} else {
					for (var i=0; i<typecontinu; i++) {// solution previous
           				var ref=wscencontinu[i].split("<br>")[2];
						var inwscen=wscen.split("<br>")[2];
						if ((ref.split("du chiffre ")[0].length<ref.length) && (inwscen.split("du chiffre ")[0].length<inwscen.length)) {
							// comparer liens faibles : chiffre et premiere case impactee; comparaison priorisee
							var refplus=ref.split("du chiffre ")[1];
							var refchiffre=refplus.substring(0,1);
							var refcase=(refplus.split("dans la case ")[1]).substring(0,2);
							var wscenplus=inwscen.split("du chiffre ")[1];
							var wscenchiffre=wscenplus.substring(0,1);
							var wscencase=(wscenplus.split("dans la case ")[1]).substring(0,2);
							if ((refchiffre==wscenchiffre) && (refcase==wscencase)) {// meme resultat
								if (ref.length>inwscen.length) {// solution previous plus longue
                       				wscencontinu[i]=wscen;// correction
               						wscencontinubis[typecontinu]=wscen;
									maxvarencours-=1;
    								return true;// contient scenario=wscen
           						}
								break;
							}
						} else if ((ref.split("des chiffres ")[0].length<ref.length) && (inwscen.split("des chiffres ")[0].length<inwscen.length)) {
							// comparer liens forts : chiffres et premiere case impactee
							var refplus=ref.split(tradacrit("des chiffres différents de "))[1];
							var refchiffre1=refplus.substring(0,1);
							var refchiffre2=(refplus.split(" et ")[1]).substring(0,1);
							var refcase=(refplus.split("dans la case ")[1]).substring(0,2);
							var wscenplus=inwscen.split(tradacrit("des chiffres différents de "))[1];
							var wscenchiffre1=wscenplus.substring(0,1);
							var wscenchiffre2=(wscenplus.split(" et ")[1]).substring(0,1);
							var wscencase=(wscenplus.split("dans la case ")[1]).substring(0,2);
							if ((refchiffre1==wscenchiffre1) && (refchiffre2==wscenchiffre2) && (refcase==wscencase)) {// meme resultat
           						if (ref.length>inwscen.length) {// solution previous plus longue
                       				wscencontinu[i]=wscen;// correction
               						wscencontinubis[typecontinu]=wscen;
									maxvarencours-=1;
    								return true;// contient scenario=wscen
           						}
           						break;
							}
						} else {
							// pas de comparaison
							continue;
						}
           			}
           			if (i==typecontinu) {// solution nouvelle avec validite entre als
               				wscencontinu[typecontinu]=wscen;
           					wscencontinubis[typecontinu]=wscen;
               				typecontinu+=1;
							return true;// contient scenario=wscen
       				}
       			}// typecontinu
			}// textecontinue
return false;
}

function eliminationchiffresdanscase(case1, chif1, chif2) {
var re=/\d/g;
var retour=false;
if ((chif1!=chif2) && (case1.length==2)){// sauf als
	var h1=decodagecolPlace(case1);
	var chk=contenu[h1].match(re);
	if (chk.length>2) {
    	wscen+=tradacrit("<br>Elimination des chiffres différents de "+chif1+" et "+chif2+" dans la case "+case1+" entourée de ces chiffres en liens forts.");
    	for (var hnum=0; hnum<chk.length; hnum++) {
    		var ch=chk[hnum];
    		retour=true;
			if ((ch!=chif1) && (ch!=chif2)) {eliminationnumero(h1, ch)}
    	}
	}
}
return retour;
}

function recherchealshk(lcy, case0ref, chif, kk) {// Test validite case sur zone sudoku lcy et indice  kk dans cette zone : contient chif et different de case0ref  et avec plus de un chiffre
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
                            			var pos10=contenu[hk]+"";
										if ((pos10.length>1) && (hk!=case0ref) && (pos10.split(chif)[0].length<pos10.length)) {
										return hk}
									}
									return M;
}

