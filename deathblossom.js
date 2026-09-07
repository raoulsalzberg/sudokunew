function deathblossom() {
	maxvarencours=1;
	nALS12=0;
	var re=/\d/g;
	cce1=M;
	for (tige=0; tige<M; tige++) {
		var postige=contenu[tige];
   		var ch=postige.match(re);
   		chiffrecce=ch[0];
		autrechiffrecce=ch[1];
		if (postige.length==2) {// tige  a 2 chiffres 
			for (var ich=0; ich<2; ich++) {// indice chiffre
				for (var indiceetape=0; indiceetape<3; indiceetape++) {
    				var chiffre=chiffrecce;
    				if (ich==1) {chiffre=autrechiffrecce}
					configalsblossom(chiffre,0, indiceetape);
					if ((scenario!=noeffect) && (casesmodifiees!=""))  {
											variete=0;
        									scenario=scenario+"<br>Cases contenant le chiffre CCE = "+chiffrefirst+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce1]+". Ces 2 cases se voient.<br>";
        									scenario=scenario+"Cases contenant l\'autre chiffre CCE = "+chiffresecond+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce2]+". Ces 2 cases se voient.<br>";
        									scenario=scenario+"<br>Cases contenant le chiffre ACC = "+chiffreaccvrai+" (au moins une case dans chaque axe) : "+csacc+".<br>";
        									scenario=scenario+tradacrit("Cases concernées par l'élimination du chiffre ACC (celles voyant toutes les cases des 2 axes contenant ACC) : ")+reduction(casesmodifiees)+".";
    										if (clickmethode) {
        										var dejavu=false;
        										if (FILTRAGEDESSOLUTIONS) {
    												for (var ivu=0; ivu<nALS12; ivu++) {// Eviter les scenarios en double
            											if ((ALS1[ivu]==nombreals1) && (ALS2[ivu]==nombreals)) {dejavu=true; break}
            											if ((ALS1[ivu]==nombreals) && (ALS2[ivu]==nombreals1)) {dejavu=true; break}
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
				}// indiceetape
			}// ich chiffre
		} else if ((postige.length==3) && (postige.split(chiffrecce)[0].length<postige.length)) {// tige  a 3 chiffres contenant chiffrecce
			lastchiffrecce=ch[2];
			for (var ich=0; ich<3; ich++) {// indice chiffre
				for (var indiceetape=0; indiceetape<3; indiceetape++) {
    				var chiffre=chiffrecce;
    				if (ich==1) {chiffre=autrechiffrecce}
    				if (ich==2) {chiffre=lastchiffrecce}
					configalsblossom3(chiffre,0, indiceetape, false);
					if (indiceetape==0) {configalsblossom3(chiffre,0, indiceetape, true)}
    				if ((scenario!=noeffect) && (casesmodifiees!=""))  {
        									variete=0;
        									scenario+="<br>Death Blossom à 3 chiffres<br><br>";
											scenario=scenario+"<br>Cases contenant le chiffre CCE = "+chiffrefirst+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce1]+". Ces 2 cases se voient.<br>";
        									scenario=scenario+"Cases contenant l\'autre chiffre CCE = "+chiffresecond+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce2]+". Ces 2 cases se voient.<br>";
        									scenario=scenario+"Cases contenant le troisième chiffre CCE = "+chiffrethird+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce3]+". Ces 2 cases se voient.<br>";
        									scenario=scenario+"<br>Cases contenant le chiffre ACC = "+chiffreaccvrai+" (au moins une case dans chaque axe) : "+csacc+".<br>";
        									scenario=scenario+tradacrit("Cases concernées par l'élimination du chiffre ACC (celles voyant toutes les cases des 3 axes contenant ACC) : ")+reduction(casesmodifiees)+".";
    										if (clickmethode) {
        										var dejavu=false;
        										if (FILTRAGEDESSOLUTIONS) {
    												for (var ivu=0; ivu<nALS12; ivu++) {// Eviter les scenarios en double
            											if ((ALS1[ivu]==nombreals1) && (ALS2[ivu]==nombreals)) {dejavu=true; break}
            											if ((ALS1[ivu]==nombreals) && (ALS2[ivu]==nombreals1)) {dejavu=true; break}
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
				}// indiceetape
			}// ich chiffre
		}// postige.length
	}// tige
}

function configalsblossom3(chif, indicecce, istep, pass2) {
	var re=/\d/g;
    var iitige=carre[tige]-1;
    var htige=parseInt(tige/9);
    var vtige=tige-9*htige;
	switch(indicecce) {
		case 0:
			var lccce=0;
			if (istep==2) {lccce=1}
			break;
		case 1:
			var lccce=2;
			if (istep==0) {lccce=1}
			break;
		case 2:
			var lccce=2;
			break;
		default:
			break;
	}
    // axe lcals dependant de lccce et de indicecce
    // axe lcals dependant de lccce
	for (var i=0; i<2; i++){
    	switch (lccce) {
        	case 0:// 1 ou 2
        		var lcals=i+1;
        		break;
        	case 1:// 0 ou 2
        		var lcals=0;
    			if (i==1) {lcals=2}
        		break;
        	case 2:// 0 ou 1
        		var lcals=i;
        		break;
        	default:
        		break;
        }
    	// recherche cce voyant tige sur axe lccce
    	for (var jcce=0; jcce<9; jcce++) {// cce sur axe lccce
    			var hbloc=true;
            	switch(lccce) {
                           	case 0: // Ligne
                               	var h=jcce+9*htige;
                                break;
                            case 1: // Colonne
                               	var h=vtige+9*jcce;
                                break;
                            case 2: // Carre
                               	var h=jcce+6*parseInt(jcce/3)+18*parseInt(iitige/3)+3*iitige;
            					hbloc=((h-9*parseInt(h/9))!=(tige-9*parseInt(tige/9))) && (parseInt(h/9)!=parseInt(tige/9));// dans bloc de la tige mais pas aligne sur la tige (redondant)
                                break;
                            default:
                               	break;					
                }// switch
    //            if ((carre[cce]==carre[tige]) && (indicecce==1) && (carre[cce1]==carre[tige])) {hbloc=false}// cce1 et cce2 pas en meme temps dans bloc de la tige  
    			var poskcce=contenu[h];
    			if (hbloc && (h!=tige) && (poskcce.length>1) && (poskcce.split(chif)[0].length<poskcce.length)) {
    			 		var cce=h;
    					if (indicecce==0) {cce1=h} else if (indicecce==1) {cce2=h} else {cce3=h}
                    	// cce et lcals connus, recherche des cases de cet axe als voyant cce et ne contenant pas chif
    					var poscce=contenu[cce];
                    	var ii=carre[cce]-1;
                    	var hcase=parseInt(cce/9);
                    	var vcase=cce-9*hcase;
                    	var cascce=new Array();
    					cascce=[];// Tableau des cases voyant cce sur axe als, et ne contenant pas chif
        				var itc=0;
    					for (var j=0; j<9; j++) {
        						var hblocals=true;
                    			switch(lcals) {
                                	  case 0: // Ligne
                                			var h=j+9*hcase;
                                			break;
                                	  case 1: // Colonne
                                			var h=vcase+9*j;
                                			break;
                                	  case 2: // Carre
                                			var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii;
                							//hblocals=((h-9*parseInt(h/9))!=(cce-9*parseInt(cce/9))) && (parseInt(h/9)!=parseInt(cce/9));// dans bloc du cce mais pas aligne sur cce
                                			break;
                                	  default:
                                			break;					
                                }// switch
                            	var poskals=contenu[h];						
                    			if (hblocals && (h!=cce) && (poskals.length>1) && (poskals.split(chif)[0].length==poskals.length)) {// h retenu s'il ne contient pas chif
                                	cascce[itc]=h;
    								itc+=1;
    							}
                        }// j
    					// Extraire le tableau caseals des cases als de ce tableau cascce avec un nombre limite de cases
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
                				 caseals=[];// Tableau des cases selectionnees sur axe lcals de cce
                                 caseals[ncase]=cce;
                                 nombreajout=0;
                				 for (var jj=0; jj<itc; jj++) {
                                 	// Test si position dans ij : position jj dans ij vaut 1
                        			if (ij.charAt(jj)==1) {// ajouter case
                					   var posk=contenu[cascce[jj]];
                                       ncase=ncase+1;
                        			   caseals[ncase]=cascce[jj];
                					   nombreals=alsajoutblossom(posk);
                					}//charAt
                           		}// jj
                				if (nombreajout==ajout) {//ALS : cases dans caseals, chiffres dans nombreals
    									if (indicecce==0) {// Fin ALS1
                        				  	 nombreals1=nombreals;
                							 caseals1=[];
                							 for (var icase=0; icase<caseals.length; icase++) {caseals1[icase]=caseals[icase]}
                							 var chh=chif;
    										 chiffrefirst=chif;
    										 if (chif==chiffrecce) {
    										 	chh=autrechiffrecce;
    										 	if ((istep==0) && pass2) {chh=lastchiffrecce}
    										 } else if (chif==autrechiffrecce) {
    										 	chh=chiffrecce;
    										 	if ((istep==0) && pass2) {chh=lastchiffrecce}										 
    										 } else {
    										 	chh=chiffrecce;
    										 	if ((istep==0) && pass2) {chh=autrechiffrecce}										 
    										 }
    										 configalsblossom3(chh, 1, istep, true);
    									} else if (indicecce==1) {// Fin ALS2
                        				  	 nbals2=nombreals;
                							 csals2=[];
                							 for (var icase=0; icase<caseals.length; icase++) {csals2[icase]=caseals[icase]}
                							 var chh=chif;
    										 if (((chif==autrechiffrecce) && (chiffrefirst==chiffrecce)) || ((chif==chiffrecce) && (chiffrefirst==autrechiffrecce))) {chh=lastchiffrecce}
    										 if (((chif==autrechiffrecce) && (chiffrefirst==lastchiffrecce)) || ((chif==lastchiffrecce) && (chiffrefirst==autrechiffrecce))) {chh=chiffrecce}
    										 if (((chif==lastchiffrecce) && (chiffrefirst==chiffrecce)) || ((chif==chiffrecce) && (chiffrefirst==lastchiffrecce))) {chh=autrechiffrecce}
    										 chiffresecond=chif;
    										 chiffrethird=chh;
    										 configalsblossom3(chh, 2, istep, true);
                        				} else {// Fin ALS3
                							 casesmodifiees=testaccblossom3(nombreals, caseals)
                        				}// indicecce
                						if (scenario!=noeffect) {return}
                        		}//ALS (nombreajout=ajout)
                    		}//ajout>
                       }// nconfig : configuration suivante
    			}// hbloc --> cce suivant
    	}// jcce
	}//i pour lcals
}

function configalsblossom(chif, indicecce, istep) {
	var re=/\d/g;
    var iitige=carre[tige]-1;
    var htige=parseInt(tige/9);
    var vtige=tige-9*htige;
	switch(istep) {
		case 0:
		case 1:
			var lccce=0;
			if (indicecce==1) {lccce=istep+1}
			break;
		case 2:
			var lccce=indicecce+1;
			break;
		default:
			break;
	}
    // axe lcals dependant de lccce
	for (var i=0; i<2; i++){
    	switch (lccce) {
        	case 0:// 1 ou 2
        		var lcals=i+1;
        		break;
        	case 1:// 0 ou 2
        		var lcals=0;
    			if (i==1) {lcals=2}
        		break;
        	case 2:// 0 ou 1
        		var lcals=i;
        		break;
        	default:
        		break;
        }
    	// recherche cce voyant tige sur axe lccce
    	for (var jcce=0; jcce<9; jcce++) {// cce sur axe lccce
    			var hbloc=true;
            	switch(lccce) {
                           	case 0: // Ligne
                               	var h=jcce+9*htige;
                                break;
                            case 1: // Colonne
                               	var h=vtige+9*jcce;
                                break;
                            case 2: // Carre
                               	var h=jcce+6*parseInt(jcce/3)+18*parseInt(iitige/3)+3*iitige;
            					hbloc=((h-9*parseInt(h/9))!=(tige-9*parseInt(tige/9))) && (parseInt(h/9)!=parseInt(tige/9));// dans bloc de la tige mais pas aligne sur la tige (redondant)
                                break;
                            default:
                               	break;					
                }// switch
    			var poskcce=contenu[h];
    			if (hbloc && (h!=tige) && (poskcce.length>1) && (poskcce.split(chif)[0].length<poskcce.length)) {
    			 		var cce=h;
    					if (indicecce==0) {cce1=h} else {cce2=h}
                    	// cce et lcals connus, recherche des cases de cet axe als voyant cce et ne contenant pas chif
    					var poscce=contenu[cce];
                    	var ii=carre[cce]-1;
                    	var hcase=parseInt(cce/9);
                    	var vcase=cce-9*hcase;
                    	var cascce=new Array();
    					cascce=[];// Tableau des cases voyant cce sur axe als, et ne contenant pas chif
        				var itc=0;
    					for (var j=0; j<9; j++) {
        						var hblocals=true;
                    			switch(lcals) {
                                	  case 0: // Ligne
                                			var h=j+9*hcase;
                                			break;
                                	  case 1: // Colonne
                                			var h=vcase+9*j;
                                			break;
                                	  case 2: // Carre
                                			var h=j+6*parseInt(j/3)+18*parseInt(ii/3)+3*ii;
                							//hblocals=((h-9*parseInt(h/9))!=(cce-9*parseInt(cce/9))) && (parseInt(h/9)!=parseInt(cce/9));// dans bloc du cce mais pas aligne sur cce
                                			break;
                                	  default:
                                			break;					
                                }// switch
                            	var poskals=contenu[h];						
                    			if (hblocals && (h!=cce) && (poskals.length>1) && (poskals.split(chif)[0].length==poskals.length)) {// h retenu s'il ne contient pas chif
                                	cascce[itc]=h;
    								itc+=1;
    							}
                        }// j
						// Extraire le tableau caseals des cases als de ce tableau cascce avec un nombre limite de cases
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
                				 caseals=[];// Tableau des cases selectionnees sur axe lcals de cce
                                 caseals[ncase]=cce;
                                 nombreajout=0;
                				 for (var jj=0; jj<itc; jj++) {
                                 	// Test si position dans ij : position jj dans ij vaut 1
                        			if (ij.charAt(jj)==1) {// ajouter case
                					   var posk=contenu[cascce[jj]];
                                       ncase=ncase+1;
                        			   caseals[ncase]=cascce[jj];
                					   nombreals=alsajoutblossom(posk);
                					}//charAt
                           		}// jj
                				if (nombreajout==ajout) {//ALS : cases dans caseals, chiffres dans nombreals
    									if (indicecce==0) {// Fin ALS1
                        				  	 nombreals1=nombreals;
                							 caseals1=[];
                							 for (var icase=0; icase<caseals.length; icase++) {caseals1[icase]=caseals[icase]}
                							 var chh=chif;
    										 if (chif==chiffrecce) {chh=autrechiffrecce}
    										 if (chif==autrechiffrecce) {chh=chiffrecce}
    										 chiffrefirst=chif;
    										 chiffresecond=chh;
    										 configalsblossom(chh, 1, istep);
                        				} else {// Fin ALS2
                							 casesmodifiees=testaccblossom(nombreals, caseals)
                        				}// indicecce
                						if (scenario!=noeffect) {return}
                        		}//ALS (nombreajout=ajout)
                    		}//ajout>
                       }// nconfig : configuration suivante
    			}// hbloc --> cce suivant
    	}// jcce
	}//i pour lcals
}

function elaborevariantedeathblossom() {
    //scenario="Elimination "+z+" dans la zone du CCE : "+HH HH HH
	//scenario="Cases contenant le chiffre CCE = "+chiffrecce+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce1]+". Ces 2 cases se voient.
		//scenario= "Cases contenant le chiffre CCE = "+z + "(sur la tige et sur une et une seule case par axe) : "+HH HH ...
	//scenario="Cases contenant l\'autre chiffre CCE = "+chiffrecce+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce2]+". Ces 2 cases se voient.	
	//scenario= "Cases contenant le chiffre ACC = "+z + "(au moins une case dans chaque axe) : "+HH HH ...
	//scenario="Cases contenant le dernier chiffre CCE = "+chiffrecce+" (sur la tige et sur une et une seule case de l\' axe) : "+colPlace[tige]+" "+colPlace[cce2]+". Ces 2 cases se voient.	
	//scenario= "Cases contenant le chiffre ACC = "+z + "(au moins une case dans chaque axe) : "+HH HH ...
	//scenario="Cases contenant le chiffre ACC = "+chiffreaccvrai ...
	//scenario="Cases concernees par l'elimination du chiffre ACC (celles voyant toutes les cases des 2 rangees contenant ACC) : "+casesmodifiees+".<br>"
		var ee=new Array(); var ff=new Array();
		var s0=scenario.split("chiffre ACC = ")[1];
    	var chiffre=s0.substring(0,1);
		var s1=s0.split("contenant ACC) : ")[1];
    	var intersec=s1.split(".")[0];
    	wscen=scenario;
    	cobraexpl(chiffre, intersec);
		// verdir chiffres de la tige et des 2 ou 3 ALS
		var re=/\d/g;
		// verdir la tige
		var s1=scenario.split("Tige ")[1];
		var tige=s1.substring(0,2)+" ";
		var h=decodagecolPlace(tige);
		var chk=contenu[h].match(re);
		for (var i=0; i<chk.length; i++) {
			decodevert(tige, chk[i]);
		}
		// verdir les ALS
		var s2=s1.split(" axe ALS ");
		for (var j=1; j<s2.length; j++) {
			var ligne=s2[j];
			var nlig=ligne.split(" dans ");
			var nk=nlig[0].match(re);
			var liste=nlig[1];
			if (j==(s2.length-1)) {liste=nlig[1].split(". ")[0]+" "}
			var dd=liste.split(" ");
			if (dd[0].length==0) {dd.shift()}// enleve le premier element vide intempestif
			liste=""; for (var i=0; i<dd.length; i++) {liste+=dd[i]+" "}
			if (liste.length>0) {
    			for (var i=0; i<nk.length; i++) {
					decodevert(liste, nk[i]);
    			}
			}			
		} // j
}

function alsajoutblossom(osk) {
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


function testaccblossom(nombreals2, caseals2) {
		 var re=/\d/g;
    	 csacc="";// Liste des cases contenant le chiffre chiffreacc
         var caseh="";
		 for (var i=0; i<nombreals1.length; i++) {
		 	 chiffreacc=nombreals1.substring(i, (i+1));
			 if ((chiffreacc!=chiffrecce) && (chiffreacc!=autrechiffrecce) && (nombreals2.split(chiffreacc)[0].length<nombreals2.length)) {// Chiffre commun aux 2 als different des 2 cce
			 	var nacc=0;
			 	var nacc1=0;
				var caseacc=new Array();// tableau des cases des 2 als contenant chiffreacc
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
            					  for (var icase=0; icase<nacc; icase++) {
            					  	  var casen=caseacc[icase];
            						  if ((parseInt(casen/9)!=hh) && ((casen-9*parseInt(casen/9))!=vh) && (carre[casen]!=ih)) {vudetous=false}
            					  }
            					  var pasvu=true;
            					  for (var cv=0; cv<nacc; cv++) {if (h==caseacc[cv]) {pasvu=false}}
								  if (vudetous && pasvu) {
            						 // Eliminer chiffreacc dans h
                   					 var csvu1="";
									 for (var cv=0; cv<caseals1.length; cv++) {
    								 	 csvu1=csvu1+" "+colPlace[caseals1[cv]];
    									 if (contenu[caseals1[cv]].split(chiffreacc)[0].length<contenu[caseals1[cv]].length) {csacc+=" "+colPlace[caseals1[cv]]}
    								 }
									 var csvu2="";
            	   					 for (var cv=0; cv<caseals2.length; cv++) {
    								 	 csvu2=csvu2+" "+colPlace[caseals2[cv]];
    									 if (contenu[caseals2[cv]].split(chiffreacc)[0].length<contenu[caseals2[cv]].length) {csacc+=" "+colPlace[caseals2[cv]]}
    								 }
									 // Intercaler ici l'elimination des cases superflues
									 wscen="Death Blossom : Tige "+colPlace[tige]+"="+contenu[tige]+" axe ALS "+nombreals1+" dans "+csvu1+" axe ALS "+nombreals2+" dans "+csvu2+". CCE "+chiffrecce+" et "+autrechiffrecce+" ACC "+chiffreacc+".<br><br>";
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

function testaccblossom3(nombreals2, caseals2) {
		 var re=/\d/g;
    	 csacc="";// Liste des cases contenant le chiffre chiffreacc
         var caseh="";
		 for (var i=0; i<nombreals1.length; i++) {
		 	 chiffreacc=nombreals1.substring(i, (i+1));
			 if ((chiffreacc!=chiffrecce) && (chiffreacc!=autrechiffrecce) && (chiffreacc!=lastchiffrecce) && (nombreals2.split(chiffreacc)[0].length<nombreals2.length)&& (nbals2.split(chiffreacc)[0].length<nbals2.length)) {// Chiffre commun aux 3 als different des 3 cce
			 	var nacc=0;
			 	var nacc1=0;
				var c=new Array();// tableau des cases des 3 als contenant chiffreacc
				// chiffreacc dans als1
				c=[];// Clears array
				for (var j=0; j<caseals1.length; j++) {
					var m=contenu[caseals1[j]];
					if (m.split(chiffreacc)[0].length<m.length) {
					   c[nacc]=caseals1[j];
					   nacc=nacc+1;
					   nacc1=nacc1+1;
					}// split m
				}//j
				// chiffreacc dans als3
			 	var nacc3=0;
				for (var j=0; j<csals2.length; j++) {
					var m=contenu[csals2[j]];
					if (m.split(chiffreacc)[0].length<m.length) {
    						c[nacc]=csals2[j];
    					   	nacc=nacc+1;
					   		nacc3=nacc3+1;
					}// split m
				}//j
			 	var nacc2=0;
				for (var j=0; j<caseals2.length; j++) {
					var m=contenu[caseals2[j]];
					if (m.split(chiffreacc)[0].length<m.length) {
    						c[nacc]=caseals2[j];
    					   	nacc=nacc+1;
					   		nacc2=nacc2+1;
					}// split m
				}//j
								  // Reduction de caseacc en supprimant les cases redondantes
								  csacc="";
            					  var caseacc=new Array();
								  var n=0;
								  for (var icase=0; icase<nacc; icase++) {
            					  	  var casen=c[icase];
									  		// verification que cette case casen pas deja traitee
											for (var before=0; before<icase; before++) {
												if (casen==c[before]) {break}
											}
											if (before==icase) {
												csacc+=colPlace[casen]+"="+contenu[casen]+" ";
												caseacc[n]=casen;
												n=n+1;
											}
            					  }
				nacc=n;
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
        					   		//hbloc=((h-9*parseInt(h/9))!=(case0-9*parseInt(case0/9))) && (parseInt(h/9)!=parseInt(case0/9));
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
                        		  // verifier cases du tableau caseacc toutes vues par h et differentes de h
            					  for (var icase=0; icase<nacc; icase++) {
            					  	  var casen=caseacc[icase];
            						  if ((h==casen) || ((parseInt(casen/9)!=hh) && ((casen-9*parseInt(casen/9))!=vh) && (carre[casen]!=ih))) {break}
            					  }
            						 // Eliminer chiffreacc dans h
                   					 var csvu1="";
									 for (var cv=0; cv<caseals1.length; cv++) {
    								 	 csvu1+=" "+colPlace[caseals1[cv]];
    								 }
									 var csvu4="";
            	   					 for (var cv=0; cv<csals2.length; cv++) {
    								 	 csvu4+=" "+colPlace[csals2[cv]];
    								 }
									 var csvu2="";
            	   					 for (var cv=0; cv<caseals2.length; cv++) {
    								 	 csvu2+=" "+colPlace[caseals2[cv]];
    								 }
									 // Intercaler ici l'elimination des cases superflues
									 wscen="Death Blossom : Tige "+colPlace[tige]+"="+contenu[tige]+" axe ALS "+nombreals1+" dans "+csvu1+" axe ALS "+nbals2+" dans "+csvu4+" axe ALS "+nombreals2+" dans "+csvu2+". CCE "+chiffrecce+", "+autrechiffrecce+" et "+lastchiffrecce+" ACC "+chiffreacc+".<br><br>";
								  if (icase==nacc) {// vu de tous
									 chiffreaccvrai=chiffreacc;
									 caseh=caseh+colPlace[h]+" ";
									 eliminationnumero(h, chiffreacc);
            					  }// vu de tous
                            }// chiffreacc dans h
						}// hbloc
                	 }// j
        		}// lc
			 }// split nombreals2
		 }// i
		 return caseh;
}
