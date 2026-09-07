function lattaqueducobra() {
	maxvarencours=1;
	var re=/\d/g;
	nALS12=0;
    doublecce=false;
	scenario=noeffect;
	ajoutcce2=M;
	combi=false;
	for (chiffrecce=1; chiffrecce<10; chiffrecce++) {
		for (cce1=0; cce1<M; cce1++) {
			var poscce1=contenu[cce1];
			var ii=carre[cce1]-1;
			var hcase=parseInt(cce1/9);
			var vcase=cce1-9*hcase;
			if ((poscce1.length>1) && (poscce1.split(chiffrecce)[0].length<poscce1.length)) {
     			// Recherche cce2 voyant cce1 et contenant chiffre, sur axe commun lcce2 (et bloc commun lcce3 si les 2)
				lcce3=3;
				for (lcce2=0; lcce2<3; lcce2++) {
                   for (var jcce2=0; jcce2<9; jcce2++) {
						switch(lcce2) {
                        	case 0: // Ligne
                            	var h=jcce2+9*hcase;
                                break;
                            case 1: // Colonne
                            	var h=vcase+9*jcce2;
                                break;
                            case 2: // Carre
                            	var h=jcce2+6*parseInt(jcce2/3)+18*parseInt(ii/3)+3*ii;
                                break;
                            default:
                            	break;					
                         }// switch
                         var posk=contenu[h];
                         if ((h!=cce1) && (posk.length>1) && ((posk+"").split(chiffrecce)[0].length<posk.length)) {
						 if (((parseInt(h/9)!=parseInt(cce1/9)) && ((h-9*parseInt(h/9))!=(cce1-9*parseInt(cce1/9))) && (lcce2==2)) || (lcce2!=2)) {// Exclure bloc commun si deja axe commun
							if ((carre[h]==carre[cce1]) && (lcce2!=2)) {lcce3=2}// Exclure bloc commun si axe commun
                        	cce2=h;
							caseals1=[];
							configals(cce1);
							if (casesmodifiees=="") {scenario=noeffect}
							if (scenario!=noeffect)  {
									variete=0;
									scenario+="<br>Cases contenant le chiffre CCE = "+chiffrecce+tradacrit(" (une et une seule case par axe ou aussi cases alignées ou encore cases dans même bloc) : ")+colPlace[cce1]+" et "+colPlace[cce2];
									if (ajoutcce2!=M) {scenario+="-"+colPlace[ajoutcce2]; rechercheautrecce2(); ajoutcce2=M} // 2 ou plus cases cce2
									scenario+=" Ces cases se voient.<br>Cases contenant le chiffre ACC = "+chiffreaccvrai+" (au moins une case dans chaque axe) : "+csacc+".<br>";
									scenario=scenario+tradacrit("Cases concernées par l'élimination du chiffre ACC (celles voyant toutes les cases des 2 axes contenant ACC) : ")+casesmodifiees+".";
									if (clickmethode) {
										var dejavu=false;
										if (FILTRAGEDESSOLUTIONS) {
    										scenario+=" New";
											for (var ivu=0; ivu<nALS12; ivu++) {// Eviter les scenarios en double
    											if ((ALS1[ivu]==(nombreals1)) && (ALS2[ivu]==(nombreals))) {dejavu=true}
    											if ((ALS1[ivu]==(nombreals)) && (ALS2[ivu]==(nombreals1))) {dejavu=true}
    										}
										}
										if (!dejavu) {
    										// Enregistrement et iteration
											enregistrescenarios();
											// Sauvegarde des 2 nombres des ALS
											ALS1[nALS12]=nombreals1;
    										ALS2[nALS12]=nombreals;
        									nALS12=nALS12+1;// Pointe sur ALS suivant
										}
										scenario=noeffect;// Recherche scenario suivant, apres sauvegarde scenario ou son annulation pour doublon, si pas sortie sur variante nmetref
									} else {
										return;// ok, validation sans recherche supplementaire
									}
                			 }// scenario!=noeffect
						 }}// if cce2 et pas axe et bloc communs a cce1 et cce2
					}// jcce2
				}// lcce2
			}//if cce1
		}// cce1
	}// chiffrecce
}

function rechercheautrecce2() {// Attente exemple pour traiter
/*	// identifier si existent autres cases cce2 que cce2 et ajoutcce2, contenues dans le tableau csals2, contenant le chiffre chiffrecce, et faisant partie de l alignement cce1-cce2-ajoutcce2 (ouf!)
	// ligne ou colonne commune a cce1 et cce2
	var lc=1;
	if (parseInt(cce1/9)==parseInt(cce2/9)) {lc=0}
	for (var i=0; i<caseals.length; i++) {
		var h=caseals[i];
		var posk=contenu[h];
		if ((h!=cce2) && (h!=ajoutcce2) && (posk.split(chiffrecce)[0].length<posk.length)) {// 1 + 3 conditiond
			if ((lc==0) && (parseInt(h/9)==parseInt(cce1/9))) {// case sur meme ligne que cce1-cce2
				// Ajouter colPlace[h] a la liste affichee de cce2
			} else if ((lc==1) && ((h-9*parseInt(h/9))==(cce1-9*parseInt(cce1/9)))) {// case sur meme colonne que cce1-cce2
				// Ajouter colPlace[h] a la liste affichee de cce2
			} else {

			}		
		}// h!=
	}// i
*/}

function configals(cce) {
    // cce voit cce2 et contient chiffrecce
	var cascce=new Array();// Tableau des cases contenant cce et differente des cases du tableau caseals1 contenant cce1
	var re=/\d/g;
	var poscce=contenu[cce];
	var ii=carre[cce]-1;
	var hcase=parseInt(cce/9);
	var vcase=cce-9*hcase;
	//  Chargement des tableaux des cases et leur contenu
    for (var lc=0; lc<3; lc++) {
		var nolc=(lc!=lcce2) && (lc!=lcce3);// ALS1 et ALS2 sur axes differents de l'axe commun lcce2 a cce1 et cce2 (ou lcce3 si bloc et axe communs)
		if (cce==cce1) {lcals1=lc} else {
			lcals2=lc;
			var pasaxecommun=((lcals1==0) && (parseInt(cce1/9)!=parseInt(cce2/9)) || ((lcals1==1) && (cce1-9*parseInt(cce1/9))!=(cce2-9*parseInt(cce2/9))));
			nolc=nolc && pasaxecommun;
		}
		if (nolc) {// ALS2 pas en ligne avec ALS1 (lcals1)
		cascce=[];
		var itc=0;
		for (var j=0; j<9; j++) {
			switch(lc) {
            	  case 0: // Ligne
            			var h=j+9*hcase;
            			break;
            	  case 1: // Colonne
            			var h=vcase+9*j;
            			break;
            	  case 2: // Carre
            			var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii;
            			break;
            	  default:
            			break;					
            }// switch
        	var posk=contenu[h];						
			if ((h!=cce) && (posk.length>1)) {// h retenu s'il ne contient pas chiffrecce ou qu'il est sur l'axe cce1-cce2 (!)
				var suraxecce=((lcce2==0) && (parseInt(h/9)==parseInt(cce/9))) || ((lcce2==1) && ((h-9*parseInt(h/9))==(cce-9*parseInt(cce/9))));
				if (!((posk+"").split(chiffrecce)[0].length<posk.length) || suraxecce) {
					  var ajoutpre=M;
					  if (suraxecce) {ajoutpre=h}// case additionnelle ajoutcce2 a valider dans solution
    				  var vu=false;
    				  if (cce!=cce1) {
    					 for (var ncc=0; ncc<caseals1.length; ncc++) {
    					 	 if (h==caseals1[ncc]) {vu=true}
    					 }				  
    				  }
    				  if (!vu) {
        				  cascce[itc]=h;
                          itc=itc+1;
    				  }
				 }
             }
    	 }// j
		 var nbchiffre=poscce.length;// Nombre de chiffres
		 var nbcasemax=itc;// Nombre de cases maximum sans saturer
         var nbconf=Math.pow(2,nbcasemax);// Nombre de configurations
         var nbconf2=nbconf.toString(2);
         var imax=nbconf2.length-1;
		 for (var nconfig=0; nconfig<nbconf; nconfig++) {// Configurations
        		 nombreals=poscce.toString();
         	 var ij=nconfig.toString(2);
             while (ij.length<imax) {ij="0"+ij}// Ajustement sur 2 caracteres
			 var nbcase=1;// Nombre de cases de la configuration en cours
			 for (var nbij=0; nbij<imax; nbij++) {
			 	 if (ij.substring(nbij, (nbij+1))==1) {nbcase=nbcase+1}
			 }
			 var ajout=nbcase+1-nbchiffre;
			 if (ajout>-1) {
    			 var ncase=0;
				 caseals=[];
                 caseals[ncase]=cce;
                 nombreajout=0;
				 for (var jj=0; jj<itc; jj++) {
                 	// Test si position dans ij : position jj dans ij vaut 1
        			if (ij.charAt(jj)==1) {// ajouter case
					   var posk=contenu[cascce[jj]];
                       ncase=ncase+1;
        			   caseals[ncase]=cascce[jj];
					   nombreals=alsajout(posk);
					}//charAt
           		}// jj
				if (nombreajout==ajout) {//ALS : cases dans caseals, chiffres dans nombreals
						if (cce==cce1) {// Fin ALS1
        				  	 if (combi) {return}
							 nombreals1=nombreals;
							 var yest=true;
							 caseals1=[];
							 for (var icase=0; icase<caseals.length; icase++) {
								 if (cce2==caseals[icase]) {yest=false}// cce2 pas dans als1
								 caseals1[icase]=caseals[icase];
							 }
							 if (yest) {
							 configals(cce2)}
        				} else {
							 if (((caseals1.length!=1) || (caseals.length!=1)) && pasbloc(caseals1, caseals)) {
							 ajoutcce2=ajoutpre;
							 casesmodifiees=testacc(nombreals, caseals)}// ALS sur axes differents
        				}// cce=cce1
						if (scenario!=noeffect) {return}
        		}//ALS (nombreajout=ajout)
    		}//ajout>
       }// nconfig
    }}// lc et nolc
}

function pasbloc(tabals1, tabals2) {// als1 et als2 pas dans meme bloc
	var bloc=carre[tabals1[0]];
	for (var i=1; i<tabals1.length; i++) {
		if (carre[tabals1[i]] != bloc) {return true}
	}
	for (var i=0; i<tabals2.length; i++) {
		if (carre[tabals2[i]] != bloc) {return true}
	}
	return false;
}

function alsajout(osk) {
                       var posk=osk;
					   var nombre1=nombreals.toString();
					   for (var neuf=0; neuf<posk.length; neuf++) {
                       	   var m=posk.substring(neuf, (neuf+1));
                           if (!(nombre1.split(m)[0].length<nombre1.length)) {// ajouter nouveau chiffre
                              nombreajout=nombreajout+1;
    						  // ajouter m dans nombreals de maniere ordonnee
                              var nombre0=nombre1;
							  for (var jcr=0; jcr<nombre0.length; jcr++) {
                              	  var ipo=nombre0.substring(jcr, (jcr+1));
                                  if (ipo>m) {
									 nombre1=nombre0.substring(0,jcr)+m+nombre0.substring(jcr,nombre0.length);                        			
        							 break;
                                  }
                               }// jcr
                               if (jcr==nombre0.length) {nombre1=nombre0+m}
							}// nombre1 split
                       }// neuf
					   return nombre1;
}

function testacc(nombreals2, caseals2) {
		 var re=/\d/g;
    	 csacc="";// Liste des cases contenant le chiffre chiffreacc
         indicateuracc=true;
		 var caseh="";
		 for (var i=0; i<nombreals1.length; i++) {
		 	 chiffreacc=nombreals1.substring(i, (i+1));
			 if ((chiffreacc!=chiffrecce) && (nombreals2.split(chiffreacc)[0].length<nombreals2.length)) {
			 	var nacc=0;
			 	var nacc1=0;
				var caseacc=new Array();
				caseacc=[];// Clears array
				for (var j=0; j<caseals1.length; j++) {
					var m=contenu[caseals1[j]];
					if (m.split(chiffreacc)[0].length<m.length) {
					   caseacc[nacc]=caseals1[j];
					   nacc=nacc+1;
					   nacc1=nacc1+1;
					}// split m
				}//j
			 	var nacc2=0;
				for (var j=0; j<caseals2.length; j++) {
					var m=contenu[caseals2[j]];
					if (m.split(chiffreacc)[0].length<m.length) {
        				var commun = false;
						for (var j1=0; j1<caseals1.length; j1++) {
        					if (caseals1[j1]==caseals2[j]) {commun=true}// Case commune aux 2 als
        				}//j1
					   	if (!commun) {
    						caseacc[nacc]=caseals2[j];
    					   	nacc=nacc+1;
					   nacc2=nacc2+1;
						}
					}// split m
				}//j
				var case0=caseacc[0];
        		var hcase=parseInt(case0/9);
        		var vcase=case0-9*hcase;
        		var ii=carre[case0]-1;
				for (var lc=0; lc<3; lc++) {
            		for (var j=0; j<9; j++) {
			   	   		var hbloc=true;
                        switch(lc) {
                        	  case 0: // Ligne
                        			var h=j+9*hcase;
                        			break;
                        	  case 1: // Colonne
                        			var h=vcase+9*j;
                        			break;
                        	  case 2: // Carre
                        			var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii;
        					   		hbloc=((h-9*parseInt(h/9))!=(case0-9*parseInt(case0/9))) && (parseInt(h/9)!=parseInt(case0/9));
                        			break;
                        	  default:
                        			break;					
                        }// switch
                    	if (hbloc) {
    						var posk=contenu[h];
            				var hh=parseInt(h/9);
            				var vh=h-9*hh;
            				var ih=carre[h];						
                            if ((posk.length>1) && ((posk+"").split(chiffreacc)[0].length<posk.length)) {
                        		  // verifier cases du tableau caseacc vues par h et differentes de h
            					  var vudetous=true;
								  var csvu3="";
								  for (var icase=0; icase<nacc; icase++) {
            					  	  var casen=caseacc[icase];
            						  if ((parseInt(casen/9)!=hh) && ((casen-9*parseInt(casen/9))!=vh) && (carre[casen]!=ih)) {vudetous=false}
									  csvu3=csvu3+colPlace[casen]+"="+contenu[casen]+" ";
            					  }
            					  var pasvu=true;
            					  for (var cv=0; cv<nacc; cv++) {if (h==caseacc[cv]) {pasvu=false}}
								  if (vudetous && pasvu) {
            						 // Eliminer chiffreacc dans h
                   					 var csvu1="";
									 for (var cv=0; cv<caseals1.length; cv++) {
    								 	 csvu1+=colPlace[caseals1[cv]]+" ";
    									 if ((contenu[caseals1[cv]].split(chiffreacc)[0].length<contenu[caseals1[cv]].length) && indicateuracc) {csacc=csacc+" "+colPlace[caseals1[cv]]}
    								 }
									 csvu1+=" ";
									 var csvu2="";
            	   					 for (var cv=0; cv<caseals2.length; cv++) {
    								 	 csvu2+=colPlace[caseals2[cv]]+" ";
										 if ((contenu[caseals2[cv]].split(chiffreacc)[0].length<contenu[caseals2[cv]].length) && indicateuracc) {csacc=csacc+" "+colPlace[caseals2[cv]]}
    								 }
									 csvu2+=" ";
									 indicateuracc=false;
									 // Intercaler ici l'elimination des cases superflues
									 wscen="Attaque du cobra : axe ALS "+nombreals1+" dans "+csvu1+" et axe ALS "+nombreals2+" dans "+csvu2+". CCE "+chiffrecce+" ACC "+chiffreacc+".<br><br>";
									 chiffreaccvrai=chiffreacc;
									 var csaccvrai=csacc;
									 if (caseh.length>0) {// Test si pas deja fait
									 	var cch=caseh.split(" ");
										var dj=true;
										for (var icch=0; icch<cch.length; icch++) {
											if (cch[icch]==colPlace[h]) {dj=false}
										}
										if (dj) {
										   caseh=caseh+colPlace[h]+" "
										   eliminationnumero(h, chiffreacc);
										}
									 } else {
									   caseh=caseh+colPlace[h]+" ";
									   eliminationnumero(h, chiffreacc);
									 }
            					  }
                            }// chiffreacc dans h
						}// hbloc
                	 }// j
        		}// lc
				if (alignementacc(caseacc) && pasdejumeau(caseals1, caseals) && (caseals1.length>1) && (caseals.length>1)) {// Double cce
                   					 var csvu1="";
									 for (var cv=0; cv<caseals1.length; cv++) {
    								 	 csvu1=csvu1+colPlace[caseals1[cv]]+" ";
    								 }
									 var csvu2="";
            	   					 for (var cv=0; cv<caseals2.length; cv++) {
    								 	 csvu2=csvu2+colPlace[caseals2[cv]]+" ";
    								 }
									 wscen="Attaque du cobra : axe ALS "+nombreals1+" dans "+csvu1+" et axe ALS "+nombreals2+" dans "+csvu2+". CCE "+chiffrecce+" ACC "+chiffreacc+".<br><br>";
					doublecce=true;
					wscen+="<br> Double CCE = "+chiffreacc+"<br><br>";
        			wscen+="Suppression "+chiffrecce+" dans la zone du CCE : ";
        			vidage(cce1, cce2, chiffrecce);// Elimination de chiffrecce dans la zone cce1-cce2
        			wscen+="<br>Suppression "+chiffreacc+" dans la zone du double CCE : ";
					var wscen0=wscen;
					vidageacc(csacc, chiffreacc); // Elimination de chiffreacc dans csacc
					if (wscen==wscen0) {wscen+=tradacrit("Pas d\'élimination du chiffre ")+chiffreacc+" dans cette zone sudoku"}
        			wscen+=tradacrit("<br>Suppression des chiffres de l'ALS1 (hormis le CCE ou, éventuellement, le double CCE) dans la zone sudoku de l'ALS1 hors ALS1 : "); 
	       			vidagezone(lcals1, nombreals1, caseals1);// Elimination des chiffres de nombreals1, hors chiffreacc et chiffrecce dans la zone lcals1 ou se trouvent les cases du tableau caseals1
        			wscen+=tradacrit("<br>Suppression des chiffres de l'ALS2 (hormis le CCE ou, éventuellement, le double CCE) dans la zone sudoku de l'ALS2 hors ALS2 : "); 
					vidagezone(lcals2, nombreals2, caseals2); // Bis repetita pour ALS2
        			// Attention, dans le programme vidagezone, penser a eliminer les chiffres de nombreals qui se trouvent dans des cases d'une autre meme zone sudoku, dans toute cette zone sudoku
        		}
			 }// split nombreals2
		 }// i
		 return caseh;
}

function elaborevariantecobra() {
    //scenario="Suppresion "+z+" dans la zone du CCE : "+HH HH HH
    //scenario="Suppresion "z+" dans la zone du double CCE : "+HH HH HH
	//scenario="Suppression des chiffres .... Elimination chiffre "+z+" dans "+HH HH ... Rlimination chiffre "+z+" dans "+HH HH 
	//scenario="Suppression des chiffres .... Elimination chiffre "+z+" dans "+HH HH ... Rlimination chiffre "+z+" dans "+HH HH 
	//scenario= "Cases contenant lr chiffre CCE = "+z + "(une et une seule case par axe) : "+HH HH ...
	//scenario= "Cases contenant lr chiffre ACC = "+z + "(au moins une case dans chaque axe) : "+HH HH ...
	//scenario="Cases contenant le chiffre ACC = "+chiffreaccvrai ...
	//scenario="Cases concernees par l'elimination du chiffre ACC (celles voyant toutes les cases des 2 rangees contenant ACC) : "+casesmodifiees+".<br>"
	if (scenario.split("Suppression ")[0].length==scenario.length) {// Cas habituel
		var s0=scenario.split("chiffre ACC = ")[1];
    	var chiffre=s0.substring(0,1);
		var s1=s0.split("contenant ACC) : ")[1];
    	var intersec=s1.split(".")[0];
    	wscen=scenario;
    	cobraexpl(chiffre, intersec)
	} else {// Double CCE
		var sini=scenario.split("Suppression ")[1];
		//CCE
    		var chiffre=sini.substring(0,1);
    		var s1=sini.split("CCE : ")[1];
    		var intersec=s1.split("<br>")[0];
			wscen=scenario;
    		cobraexpl(chiffre, intersec);
		//Double CCE
    		var s2=scenario.split("Suppression ")[2];
    		var s3=s2.split("CCE : ")[1];
    		chiffre=s2.substring(0,1);
    		intersec=s3.split("<br>")[0];
			wscen=scenario;
    		cobraexpl(chiffre, intersec);
		//Chiffres ALS1 elimines hors ALS1
    		var suite=scenario.split("<br>")[7];
			var autreseq=suite.split("Elimination chiffre ");
			for (var i=1; i<autreseq.length; i++) {
				var seq=autreseq[i];
				chiffre=seq.substring(0,1);
				intersec=seq.split("dans ")[1];
				if (i<(autreseq.length-1)) {intersec=intersec.substring(0, intersec.length-2)}
				wscen=scenario;
				cobraexpl(chiffre,intersec);
			}
		//Chiffres ALS2 elimines hors ALS2
    		var suite=scenario.split("<br>")[8];
			var autreseq=suite.split("Elimination chiffre ");
			for (var i=1; i<autreseq.length; i++) {
				var seq=autreseq[i];
				chiffre=seq.substring(0,1);
				intersec=seq.split("dans ")[1];
				if (i<(autreseq.length-1)) {intersec=intersec.substring(0, intersec.length-2)}
				wscen=scenario;
				cobraexpl(chiffre,intersec);
			}
	}
		// verdir nombreals dans chaque als
		var s2=scenario.split("axe ALS ");
		var s21=s2[1].split(" dans ");
		var nals1=s21[0];
		var s31=s21[1].split(" et ");
		var als1=s31[0];
		var s22=s2[2].split(" dans ");
		var nals2=s22[0];
		var s32=s22[1].split(". ");
		var als2=s32[0];
		nals1=nals1.toString();
		for (var i=0; i<nals1.length; i++) {
			var m=parseInt(nals1[i]);
			decodevert(als1, m);
		}
		for (var i=0; i<nals2.length; i++) {
			var m=parseInt(nals2[i]);
			decodevert(als2, m);
		}
}

function cobraexpl(chif, cs) {
	var c=cs.split(" ");
	for (var j=0; j<(c.length-1); j++) {
		var d=decodagecolPlace(c[j]);
		if (isNaN(d)) {return}
		var posk=contenu[d];
		if ((posk+"").split(chif)[0].length<posk.length) {
		if (chif==chiffreacc) {
			eliminationnumero(d, chif)}
		}
	}
}

function alignementacc(acc) {// Cases ACC du tableau acc et cases cce1 et cce2 dans une meme zone sudoku (alignement)--> double cce
	for (var i=0; i<acc.length; i++) {
		var x=acc[i];
		var ligne=parseInt(x/9);
		var colonne=x-9*ligne;
		switch(i) {
			case 0:
        		var memeligne=false;
        		var memecolonne=false;
				var ligne0=ligne;
				var colonne0=colonne;
				break;
			case 1:
				if (ligne==ligne0) {memeligne=true}
				if (colonne==colonne0) {memecolonne=true}
				if (!memeligne && !memecolonne) {return false}
				break;
			default:
				if (memeligne && (ligne!=ligne0)) {return false}
				if (memecolonne && (colonne!=colonne0)) {return false}
				break;
		}
	}//i
	// Cas exclu : ligne acc 
	var hcce=parseInt(cce1/9);
	var vcce=cce1-9*hcce;
	// Si meme ligne ou meme colonne acc-cce return false
	if (memeligne && (ligne0==hcce)) {return false}
	if (memecolonne && (colonne0==vcce)) {return false}
	return true;
}

function pasdejumeau(tab1, tab2) {
// Pas de jumeau dans tab1
	var xx=new Array();
	var j=0;
	for (var i=0; i<tab1.length; i++) {
		var y=tab1[i];
		var x=contenu[y];
		if (x.length==2) {
			xx[j]=x;
			for (var k=0; k<j; k++) {
				if (xx[k]==x) {return false}
			}
			j=j+1;
		}
	}
// Pas de jumeau dans tab2
	var j=0;
	for (var i=0; i<tab2.length; i++) {
		var y=tab2[i];
		var x=contenu[y];
		if (x.length==2) {
			xx[j]=x;
			for (var k=0; k<j; k++) {
				if (xx[k]==x) {return false}
			}
			j=j+1;
		}
	}
	return true;
}

function vidage(case1, case2, chiffre) {// Elimination de chiffre dans la ou les zones sudoku de case1-case2, hors case1 et case2
// sauf case dans une ALS
// lister ces suppressions dans les resultats affiches et en tenir compte pour l'elaboration de la variante
	var h1=parseInt(case1/9);
	var v1=case1-9*h1;
	var i1=carre[case1]-1;
	var h2=parseInt(case2/9);
	var v2=case2-9*h2;
	var i2=carre[case2]-1;
	var lci=2;
	var lc0=3;
	if (h1==h2) {lci=0}
	if (v1==v2) {lci=1}
	if (i1==i2) {lc0=2}
	var nombre=0;
	// 3 cas : lc0=2  et lci=2 ou  lc0==2 et lci=(0 ou 1)   ou lc0=3 et lci= (0 ou 1)
	for (var lc=0; lc<3; lc++) {
    	if ((lc==lci) && (lc<2) || (lc==lc0)) {// ligne ou colonne ou bloc
			for (var j=0; j<9; j++) {
			   	   		var hbloc=true;
                        switch(lc) {
                        	  case 0: // Ligne
                        			var h=j+9*h1;
                        			break;
                        	  case 1: // Colonne
                        			var h=v1+9*j;
                        			break;
                        	  case 2: // Carre
                        			var h=j+6*parseInt(j/3)+18*parseInt(i1/3)+3*i1;
        					   		hbloc=((h-9*parseInt(h/9))!=(case1-9*parseInt(case1/9))) && (parseInt(h/9)!=parseInt(case1/9));
                        			break;
                        	  default:
                        			break;					
                        }// switch
						hbloc=(h!=case1) && (h!=case2) && hbloc;
						if (hbloc) {
    						var posk=contenu[h];
            				var hh=parseInt(h/9);
            				var vh=h-9*hh;
            				var ih=carre[h];						
                            if ((posk.length>1) && (posk.split(chiffre)[0].length<posk.length)) {// sauf case dans une ALS
    				  			var vu=false;
            					for (var ncc=0; ncc<caseals.length; ncc++) {
            					 	 if (h==caseals[ncc]) {vu=true}
            					}				  
            					for (var ncc=0; ncc<caseals1.length; ncc++) {
            					 	 if (h==caseals1[ncc]) {vu=true}
            					}				  
								if (!vu) {
									wscen+=colPlace[h]+" ";
									if (chiffre==chiffreacc) {
										eliminationnumero(h, chiffre);
									}
									nombre+=1;
								}
							}// chiffre dans posk
						}// hbloc
			}//j
		}// lc valide
	}// lc
	if (nombre==0) {wscen+=tradacrit("Pas d\'élimination du chiffre "+chiffre+" dans cette zone sudoku")}
}

function vidageacc(inacc, chiffre) {// Elimination de chiffre dans la ou les zones sudoku inacc
// lister ces suppressions dans les resultats affiches et en tenir compte pour l'elaboration de la variante
	var case1=decodagecolPlace(inacc.substring(1,3));
	var case2=decodagecolPlace(inacc.substring(4,6));
	if (inacc.length>6) {var case3=decodagecolPlace(inacc.substring(7,9))} else {var case3=10}
	if (inacc.length>9) {var case4=decodagecolPlace(inacc.substring(10,12))} else {var case4=10}
	if (inacc.length>12) {var case5=decodagecolPlace(inacc.substring(13,16))} else {var case5=10}
	if (inacc.length>15) {var case6=decodagecolPlace(inacc.substring(17,20))} else {var case6=10}
	var h1=parseInt(case1/9);
	var v1=case1-9*h1;
	var i1=carre[case1]-1;
	var h2=parseInt(case2/9);
	var v2=case2-9*h2;
	var i2=carre[case2]-1;
	var lci=2;
	var lc0=3;
	if (h1==h2) {lci=0}
	if (v1==v2) {lci=1}
	if (i1==i2) {lc0=2}
	// 3 cas : lc0=2  et lci=2 ou  lc0==2 et lci=(0 ou 1)   ou lc0=3 et lci= (0 ou 1)
	for (var lc=0; lc<3; lc++) {
    	if ((lc==lci) && (lc<2) || (lc==lc0)) {// ligne ou colonne ou bloc
			for (var j=0; j<9; j++) {
			   	   		var hbloc=true;
                        switch(lc) {
                        	  case 0: // Ligne
                        			var h=j+9*h1;
                        			break;
                        	  case 1: // Colonne
                        			var h=v1+9*j;
                        			break;
                        	  case 2: // Carre
                        			var h=j+6*parseInt(j/3)+18*parseInt(i1/3)+3*i1;
        					   		hbloc=((h-9*parseInt(h/9))!=(case1-9*parseInt(case1/9))) && (parseInt(h/9)!=parseInt(case1/9));
                        			break;
                        	  default:
                        			break;					
                        }// switch
						hbloc=(h!=case1) && (h!=case2) && (h!=case3) && (h!=case4) && (h!=case5) && (h!=case6) && hbloc;
						if (hbloc) {
    						var posk=contenu[h];
            				var hh=parseInt(h/9);
            				var vh=h-9*hh;
            				var ih=carre[h];						
                            if ((posk.length>1) && (posk.split(chiffre)[0].length<posk.length)) {
								wscen+=colPlace[h]+" ";
								if (chiffre==chiffreacc) {
									eliminationnumero(h, chiffre);
								}
							}// chiffre dans posk
						}// hbloc
			}//j
		}// lc valide
	}// lc
}

function vidagezone(lc, nombre, cell) {// Elimination des chiffres de nombre dans la zone sudoku lc qui contient le tableau des cases cell
// Si un des chiffres de nombre est contenu dans 2 ou 3 cases d'une autre zone sudoku que celle des cases cell (lc), eliminer ce chiffre aussi dans cette autre zone sudoku
// lister ces suppressions dans les resultats affiches et en tenir compte pour l'elaboration de la variante
	var re=/\d/g;
	var nb=nombre.match(re);
	var wscen00=wscen;
	for (var als=0; als<nb.length; als++) {
		var chif=nb[als];
		if ((chif!=chiffrecce) && (chif!=chiffreacc)) {
    		var wscen0=wscen;
			var ajout="  Elimination chiffre "+chif+" dans "
			wscen+=ajout;
			var lenw=wscen.length;
			vidagehorsals(lc, cell, chif);// Elimination de ce chiffre dans la zone sudoku lc de l'ALS, representee par cell, hors ALS sauf cce et acc
			if (wscen.length==lenw) {wscen=wscen0}
		}		
	}
	if (wscen==wscen00) {wscen+=tradacrit("Pas d\'élimination de chiffre dans cette zone sudoku")}
}

function vidagehorsals(axe, cellals, chiffre) {
	var ex=true
	var cellbls=new Array();
	if (axe<2) {// Chercher un bloc commun contenant chiffre dans le tableau cellals
		var lc=2;
		var bls=0;
		for (var als=0; als<cellals.length; als++) {
			var href=cellals[als];
			var posk=contenu[href];
			var ligne=parseInt(href/9);
			var colonne=href-9*ligne;
			if ((posk.split(chiffre)[0].length<posk.length) && (posk.length>1)){
    			cellbls[bls]=href;
				var bloc=carre[href];
				if (bls==0) {var bloc0=bloc} else {if (bloc!=bloc0) {ex=false}}//si pas de bloc commun, exit
				bls=bls+1;
			}
		}
		var ii=bloc-1;
		// Supprimer aussi dans l als
	} else {// Chercher une ligne commune ou une colonne commune contenant chiffre dans le tableau cellals
		var lc=0;
		var bls=0;
		for (var als=0; als<cellals.length; als++) {
			var href=cellals[als];
			var posk=contenu[href];
			var ii=carre[href]-1;
			if ((posk.split(chiffre)[0].length<posk.length) && (posk.length>1)) {
    			cellbls[bls]=href;
				var ligne=parseInt(href/9);
				var colonne=href-9*ligne;
				if (bls==0) {
					var ligne0=ligne;
					var colonne0=colonne;
				} else {
					if (ligne==ligne0) {
						colonne0=10;
						var lc=0;
					} else if (colonne==colonne0) {
						ligne0=10;
						var lc=1;
					} else {ex=false}// si pas axe commun exit
					if ((ligne0==10) && (colonne0==10)) {ex=false}// si pas axe commun exit
				}
				bls=bls+1;
			}
		}
	}
	if (ex) {
    	for (var i=0; i<9; i++) {
    		switch (lc) {
    			case 0:
    				var h=i+9*ligne;
    				break;
    			case 1:
    				var h=colonne+9*i;
    				break;
    			case 2:
                    var h=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii;
    				break;
    			default:
    				break;			
    		}
    		var horsals=true;
    		var posk=contenu[h];
    		for (var bls=0; bls<cellbls.length; bls++) {
    			if (h==cellbls[bls]) {horsals=false; break}
    		}
    		horsals=horsals && (contenu[h].split(chiffre)[0].length<contenu[h].length) && (contenu[h].length>1);
    		if (horsals) {// h contient chiffre et n est pas dans l als
    			wscen+=colPlace[h]+" ";
				if (chiffre==chiffreacc) {
					eliminationnumero(h, chiffre);
				}
    		}
    	}// i
	}
	// Supprimer aussi dans l axe
	for (var i=0; i<9; i++) {
		switch (axe) {
			case 0:
				var h=i+9*ligne;
				break;
			case 1:
				var h=colonne+9*i;
				break;
			case 2:
                var h=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii;
				break;
			default:
				break;			
		}
		var horsals=true;
		var posk=contenu[h];
		for (var als=0; als<cellals.length; als++) {
			if (h==cellals[als]) {horsals=false; break}
		}
		horsals=horsals && (contenu[h].split(chiffre)[0].length<contenu[h].length) && (contenu[h].length>1);
		if (horsals) {// h contient chiffre et n est pas dans l als
			wscen+=colPlace[h]+" ";
			if (chiffre==chiffreacc) {
				eliminationnumero(h, chiffre);
			}
		}
	}// i

}
