function alsxywing() {
	maxvarencours=1;
	var re=/\d/g;
	nALS12=0;
	cce3=M;
	for (chiffrecce=1; chiffrecce<10; chiffrecce++) {
		for (cce1=0; cce1<M; cce1++) {
			var poscce1=contenu[cce1];
			var ii=carre[cce1]-1;
			var hcase=parseInt(cce1/9);
			var vcase=cce1-9*hcase;
			if ((poscce1.length>1) && (poscce1.split(chiffrecce)[0].length<poscce1.length)) {
     			// Recherche als1 : nombreals1 et caseals1
				caseals1=[];
				configalsxywing(cce1, chiffrecce, 3);
				if (scenario!=noeffect) {return}
			}//if cce1
		}// cce1
	}// chiffrecce
}

function plusscenario() {
							 if ((scenario!=noeffect) && (casesmodifiees!=""))  {
									variete=0;
									// ajouter case appartenant a csals2, contenant chiffrecce, voyant cce1 et differente de cce2bis
									var case2autre=casemore(csals2, chiffrecce, cce2bis);
									scenario=scenario+"<br>Cases contenant le chiffre commun exclusif CCE = "+chiffrecce+" : "+colPlace[cce1]+" (sur ALS commun) et "+colPlace[cce2bis]+case2autre+" (sur premier ALS).<br>";
									// ajouter case appartenant a caseals3, contenant autrechiffrecce, voyant cce1 et differente de cce3bis
									var case3autre=casemore(caseals3, autrechiffrecce, cce3bis);
									scenario=scenario+"Cases contenant l'autre chiffre commun exclusif CCE = "+autrechiffreccebis+" : "+colPlace[autrecce1bis]+" (sur ALS commun) et "+colPlace[cce3bis]+case3autre+tradacrit(" (sur deuxième ALS).<br>");
									scenario=scenario+"Cases contenant l'autre chiffre commun ACC aux autres ALS = "+chiffreaccvrai+" (au moins une case dans chaque ALS) : "+reduction(csacc)+".<br>";
									scenario=scenario+tradacrit("Cases concernées par l'élimination de l'autre chiffre commun ACC (celles voyant toutes les cases des 2 autres ALS contenant ACC) : ")+casesmodifiees+".";
									if (clickmethode) {
										var dejavu=false;
										if (FILTRAGEDESSOLUTIONS) {
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

}

function casemore(cs,chiffre,cce) {
	var y="";
	for (var i=0; i<cs.length; i++) {
		var x=cs[i];
		var xx=contenu[x];
		if ((xx.split(chiffre)[0].length<xx.length) && (x!=cce)) {
			if ((carre[x]==carre[cce1]) || (parseInt(x/9)==parseInt(cce1/9)) || ((x-9*parseInt(x/9)) == (cce1-9*parseInt(cce1/9)))) {y+=" "+colPlace[x]}
		}
	}
	return y;
}

function reduction (x) {
	var ch=x.split(" ");
	var gr="";
	for (var i=0; i<ch.length; i++) {
		var y=ch[i];
		for (var j=0; j<i; j++) {
			if (ch[j]==y) {break}
		}
		if (j==i) {gr+=y+" "}
	}
	return gr;
}

function configalsxywing(cce, chiffre, lcals) {// Construction als autour de cce avec chiffre sur lc different de lcals
	var cascce=new Array();// Tableau des cases contenant chiffre et differentes des cases du tableau caseals contenant cce et son chiffrecce
	var re=/\d/g;
	var poscce=contenu[cce];
	var ii=carre[cce]-1;
	var hcase=parseInt(cce/9);
	var vcase=cce-9*hcase;
	//  Chargement des tableaux des cases et leur contenu : recherche als
	for (var lc=0; lc<3; lc++) {
    		cascce=[];// Tableau des cases sur axe lc autour de cce et ne contenant pas chiffre sauf sur axe lcals (lc=2)
    		var ncasecce=0;
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
				var hbloc=false;
    			if (cce!=cce1) {
    					var memeaxe=(caseals1.length==1) && ((parseInt(h/9)==parseInt(cce1/9)) || ((h-9*parseInt(h/9))==(cce1-9*parseInt(cce1/9))) || (carre[h]==carre[cce1]));
        				hbloc=(posk.split(chiffre)[0].length<posk.length) && memeaxe && (h!=cce);
				}
				if (pasdanscaseals1(h) && (posk.length>1) && ((posk.split(chiffre)[0].length==posk.length) || hbloc)) {
                    		 cascce[ncasecce]=h;
        					 ncasecce+=1;
				}
    		}
			// Extraction du tableau caseals contenu dans cascce		 
    	 	var nbchiffre=poscce.length;// Nombre de chiffres
            var nbcasemax=ncasecce;// Nombre de cases maximum sans saturer
            var nbconf=Math.pow(2,nbcasemax);// Nombre de configurations
            var nbconf2=nbconf.toString(2);
            var imax=nbconf2.length-1;
            for (var nconfig=nbconf-1; nconfig>-1; nconfig--) {// Configurations
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
                    caseals[0]=cce;
                    nombreajout=0;
					for (var jj=0; jj<cascce.length; jj++) {
                    	// Test si position dans ij : position jj dans ij vaut 1
                        if (ij.charAt(jj)==1) {// ajouter case
                    		var posk=contenu[cascce[jj]];
                            ncase=ncase+1;
                            caseals[ncase]=cascce[jj];
                    		nombreals=alsajout(posk);
                    	}//charAt
                     }// jj
    				 if (nombreajout==ajout) {//ALS : cases dans caseals, chiffres dans nombreals
              			// Eviter jumeaux ou triples ou quadruple dans caseals
						if (evitepoly(caseals)) {
						if (cce==cce1) {// Fin ALS1 : nombreals1=nombreals et caseals1=caseals sauf cce2
                        	// on construit cce2 sur lc de cce1 different du lc de als1 avec chiffrecce
    						// Puis on construit autrecc dans caseals1, qui peut être cce1 et on en extrait autrechiffrecce different de chiffrecce
    						// Enfin on conetruit cce3 sur lc de autrecc different du lc de als1 avec autrechiffrecce
    						// Enfin on cherche chiffreacc commun a caseals2 et caseals3, puis les cases contenant le chiffreacc et voyant toutes ces cases
    						nombreals1=nombreals;
                        	caseals1=[];
							lcals1=lc;
                        	for (var icase=0; icase<caseals.length; icase++) {caseals1[icase]=caseals[icase]}
							for (var lc2=0; lc2<3; lc2++) {
    								for (var j2=0; j2<9; j2++) {
                            			switch(lc2) {
                                        	  case 0: // Ligne
                                        			var h=j2+9*hcase;
                                        			break;
                                        	  case 1: // Colonne
                                        			var h=vcase+9*j2;
                                        			break;
                                        	  case 2: // Carre
                                        			var h=j2+6*parseInt(j2/3)+18*parseInt(ii/3)+3*ii;
                                        			break;
                                        	  default:
                                        			break;					
                                        }// switch
                                    	var posk=contenu[h];						
                            			if ((h!=cce1) && (posk.length>1) && (posk.split(chiffrecce)[0].length<posk.length)) {// h voyant cce retenu s'il contient chiffrecce
                                        		cce2=h;
												// ajouter case appartenant a casals, contenant chiffrecce et voyant cce1
												configalsxywing(cce2, chiffrecce, lc2);
												if (scenario!=noeffect) {return}
                            			}
                            		}// j2
							}// lc2
    					} else if (cce==cce2) {// Fin ALS2  Recherche autrecc sur axe als1 avec chiffre different de autrechiffrecce a determiner Exception : caseals1.length=1 auquel cas autrecce1=cce1
   							nbals2=nombreals;
                        	csals2=[];
                        	for (var icase=0; icase<caseals.length; icase++) {csals2[icase]=caseals[icase]}
	var poscce1=contenu[cce1];
	var ii1=carre[cce1]-1;
	var hcase1=parseInt(cce1/9);
	var vcase1=cce1-9*hcase1;
									for (var jautre=0; jautre<9; jautre++) {
                                      			switch(lcals1) {
                                                  	  case 0: // Ligne
                                                  			var h=jautre+9*hcase1;
                                                  			break;
                                                  	  case 1: // Colonne
                                                  			var h=vcase1+9*jautre;
                                                  			break;
                                                  	  case 2: // Carre
                                                  			var h=jautre+6*parseInt(jautre/3)+18*parseInt(ii1/3)+3*ii1;
                                                  			break;
                                                  	  default:
                                                  			break;					
                                                  }// switch
                                              	var posk=contenu[h];
                                      			if ((posk.length>1) && (posk.split(chiffrecce)[0].length==posk.length)) {// autrecc=h sur axe als1 et contenant plusieurs chiffres candidats, pouvant etre egal a cce1
                                                  		autrecce1=h;// sauf caseals1 a un seul chiffre : autrecce1=cce1
          												var ch=posk.match(re);
          												for (var ccc=0; ccc<ch.length; ccc++) {
          													autrechiffrecce=ch[ccc];
          													if ((autrechiffrecce!=chiffrecce) && uniquedanscaseals(autrechiffrecce)) {// different de chiffrecce et unique dans caseals1
          														// Recherche cce3 voyant autrecc avec chiffre autrechiffrecce
																	var posccebis=contenu[autrecce1];
                                                                	var iibis=carre[autrecce1]-1;
                                                                	var hcasebis=parseInt(autrecce1/9);
                                                                	var vcasebis=autrecce1-9*hcasebis;
                                                            		for (var lc3=0; lc3<1; lc3++) {
                                        								//if (lc3!=lcals1) {
          																for (var j3=0; j3<9; j3++) {
                                                                    			switch(lc3) {
                                                                                	  case 0: // Ligne
                                                                                			var hq=j3+9*hcasebis;
                                                                                			break;
                                                                                	  case 1: // Colonne
                                                                                			var hq=vcasebis+9*j3;
                                                                                			break;
                                                                                	  case 2: // Carre
                                                                                			var hq=j3+6*parseInt(j3/3)+18*parseInt(iibis/3)+3*iibis;
                                                                                			break;
                                                                                	  default:
                                                                                			break;					
                                                                                }// switch
                                                                                var posk=contenu[hq];
                                                                        		  if ((posk.length>1) && (posk.split(autrechiffrecce)[0].length<posk.length) && pasdansals12(hq)) {// hq voyant autrecc retenu s'il contient autrechiffrecce
                                                                                    		cce3=hq;
																							configalsxywing(cce3, autrechiffrecce, lc3);
																							if (scenario!=noeffect) {return}
                                                                        		  }
                                                                    		}// j3
                                        							}// lc3
          													}// autrechiffrecce!=chiffrecce												
          												}// ccc
                                      			}// posk.length>1
          								}// jautre
						} else {// Fin ALS3 : cce=cce3 avec autre chiffrecce
							if (pascommun23()) {
								var sevoit=true;
								if (caseals1.length==1)  {
									autrecce1=cce1;
									// verifier cce1 voit cce3
									sevoit=(parseInt(cce1/9)==parseInt(cce3/9)) || (carre[cce1]==carre[cce3]) || ((cce1-9*parseInt(cce1/9)) == (cce3-9*parseInt(cce3/9)));
								}
								sevoit=sevoit && danscaseals1(autrecce1);
                        		caseals3=[];
								for (var icase=0; icase<caseals.length; icase++) {caseals3[icase]=caseals[icase]}
								if (sevoit) {casesmodifiees=testaccxywing(nombreals, caseals)}
								autrecce1bis=autrecce1;
							}// ALS2 (nbals2 et csals2) et ALS3 (nombreals et caseals) sans case commune
                        }// cce=cce1
						plusscenario();
						if (scenario!=noeffect) {return}
						}// evite poly
                	}//ALS (nombreajout=ajout)
            	}//ajout>
        	}// nconfig
    }// lc 
}

function pasdanscaseals1(case1) {
	for (var i=0; i<caseals1.length; i++) {
		if (caseals1[i]==case1) {return false}
	}
	return true;
}

function danscaseals1(case1) {
	for (var i=0; i<caseals1.length; i++) {
		if (caseals1[i]==case1) {return true}
	}
	return false;
}


function uniquedanscaseals(chiffre) {
	var il=0;
	for (var i=0; i<caseals1.length; i++) {
		var x=contenu[caseals1[i]];
		if (x.split(chiffre)[0].length<x.length) {il+=1}
	}
	return (il==1);
}


function pascommun23() {
	for (var i=0; i<csals2.length; i++) {
    	for (var j=0; j<caseals.length; j++) {
    		if (caseals[j]==csals2[i]) {return false}
    	}
	}
	return true;
}

function pasdansals12(case1) {
	for (var i=0; i<caseals1.length; i++) {
		if (case1==caseals1[i]) {return false}
	}
	for (var i=0; i<csals2.length; i++) {
		if (case1==csals2[i]) {return false}
	}
	return true;
}

function evitepoly(xh) {
	var re=/\d/g;
	for (var i=0; i<xh.length; i++) {
		var y=contenu[xh[i]];
		if (y.length==2) {// jumeaux
			for (var j=0; j<i; j++) {
				if (y==contenu[xh[j]]) {
					return false;
				}
			} 
		}
	}// i
return true;
}

function testaccxywing(nombreals2, caseals2) {// sur Als3 : 679 en D2 D5
		 var re=/\d/g;
    	 csacc="";// Liste des cases contenant le chiffre chiffreacc
		 for (var i=nbals2.length-1; i>-1; i--) {// sur als2 247 sur G1 H1 --> chiffreacc=7 different de 4 et 6
		 	 chiffreacc=nbals2.substring(i, (i+1));
			 if ((chiffreacc!=chiffrecce) && (chiffreacc!=autrechiffrecce) && (nombreals2.split(chiffreacc)[0].length<nombreals2.length)) {
				var caseh="";
			 	var nacc=0;
			 	var nacc1=0;
				var caseacc=new Array();
				caseacc=[];// Clears array
				for (var j=0; j<csals2.length; j++) {
					var m=contenu[csals2[j]];
					if (m.split(chiffreacc)[0].length<m.length) {
					   caseacc[nacc]=csals2[j];
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
        					if (csals2[j1]==caseals2[j]) {commun=true}// Case commune aux 2 als
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
									 for (var cv=0; cv<csals2.length; cv++) {
    								 	 csvu1=csvu1+" "+colPlace[csals2[cv]];
    									 if (contenu[csals2[cv]].split(chiffreacc)[0].length<contenu[csals2[cv]].length) {csacc=csacc+" "+colPlace[csals2[cv]]}
    								 }
									 var csvu2="";
            	   					 for (var cv=0; cv<caseals2.length; cv++) {
    								 	 csvu2=csvu2+" "+colPlace[caseals2[cv]];
    									 if (contenu[caseals2[cv]].split(chiffreacc)[0].length<contenu[caseals2[cv]].length) {csacc=csacc+" "+colPlace[caseals2[cv]]}
    								 }
									 // Intercaler ici l'elimination des cases superflues
									 wscen="ALS-XY-WING : ALS "+nbals2+" dans "+csvu1+" et ALS "+nombreals2+" dans "+csvu2+". CCE "+chiffrecce+" et "+autrechiffrecce+" ACC "+chiffreacc+".<br><br>";
									 cce2bis=cce2;
									 cce3bis=cce3;
									 autrechiffreccebis=autrechiffrecce;
									 var csvu0="";
            	   					 for (var cv=0; cv<caseals1.length; cv++) {
    								 	 csvu0=csvu0+" "+colPlace[caseals1[cv]];
    								 }
									 wscen+="ALS commun "+nombreals1+" dans "+csvu0+".<br><br>";
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
			 }// split nombreals2
		 }// i
		 return caseh;
}

function elaborevariantealsxywing() {
	//scenario= "Cases contenant lr chiffre ACC = "+z + "(au moins une case dans chaque axe) : "+HH HH ...
	//scenario="Cases contenant le chiffre ACC = "+chiffreaccvrai ...
	//scenario="Cases concernees par l'elimination du chiffre ACC (celles voyant toutes les cases des 2 rangees contenant ACC) : "+casesmodifiees+".<br>"
		var re=/\d/g;
		var s0=scenario.split("chiffre commun ACC aux autres ALS = ")[1]; 
		var chiffre=s0.substring(0,1);
		var s1=s0.split("contenant ACC) : ")[1];
		var intersec=s1.split(".")[0];
    	wscen=scenario;
    	cobraexpl(chiffre, intersec)
		// verdir
		var s2=scenario.split(" dans ");
		for (var j=1; j<4; j++) {
			var ligne=s2[j];
			switch(j) {
				case 1:
					var liste=ligne.split("et")[0];
					break;
				case 2:
					var liste=ligne.split(".")[0]+" ";
					break;
				case 3:
					var liste=ligne.split(".<br>")[0]+" ";
					break;
				default:
					var liste="";
					break;			
			}
			var cc=liste.split(" ");
			if (cc[0].length==0) {cc.shift()}// enleve le premier element vide intempestif
			if (cc[cc.length-1].length==0) {cc.pop()}// enleve le dernier element vide intempestif
			for (var k=0; k<cc.length; k++) {
				var x=cc[k];
				var h=decodagecolPlace(x);
				var ch=contenu[h].match(re);
				if (unevariante) {
        			for (var i=0; i<ch.length; i++) {miseauvert(h, ch[i], BACKVERT)}
    			}			
			}
		}// j
}

