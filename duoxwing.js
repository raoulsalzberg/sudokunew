function numeroduo() {
	for (var n=1; n<10; n++) { // Numero 
		for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
			for (var i=0; i<9; i++) {
				var hv=0;
				for (var j=0; j<9; j++) {// Position dans la ligne ou la colonne ou le carre 
					switch (lc) {
	  					case 0: // Ligne
							var h=j+9*i;
						break;
	  					case 1: // Colonne
							var h=i+9*j;
						break;
	  					case 2: // Carre
							var h=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i;
    				   		//hbloc=((h-9*parseInt(h/9))!=(i-9*parseInt(i/9))) && (parseInt(h/9)!=parseInt(i/9));
						break;
						default:
						break;
					}
					var duox=contenu[h].toString();
  					if (duox==n) {hv=10}// cas improbable de case a un chiffre non traitee
					if ((duox.split(n)[0].length<duox.length) && (duox.length>1)) {// Vrai si contenu[h] contient n
        			   if (hv==0) {var hn0=h}
        			   if (hv==1) {var hn1=h}
        			   if (hv==2) {var hn2=h}
        			   hv=hv+1;
    				}
				}
				if (hv==2) {	// Duo	= chiffre n dans 2 cases seulement
					switch (lc) {
	  					case 0: // Ligne   : elimination de n dans les petits chiffres du carre
	  					case 1: // Colonne : elimination de n dans les petits chiffres du carre
							if (carre[hn0]==carre[hn1]) {
                            	var ii=carre[hn0]-1;
                            	//exploration dans le carre ii
                            	var h0=18*parseInt(ii/3)+3*ii
                            	wscen=n + " en "+ colPlace[hn0] + " et "+ colPlace[hn1]+tradacrit(" éliminé du carré : ");
								for (var jj=0; jj<9; jj++) {
                            		var hh=jj+6*parseInt(jj/3)+h0;
                            		if ((hh != hn0) && (hh != hn1)) {
										if (contenu[hh].toString().split(n)[0].length<contenu[hh].length) {
										   wscen=wscen+colPlace[hh]+" ";
										   eliminationnumero(hh, n);
										}
                            		}	
                            	}
								if (scenario!=noeffect) {
									variete=0;
									if (clickmethode) {enregistrescenarios()} else {return}
                    			}
                            }
							break;
	  					case 2: // Carre 
							var difh=(hn1-hn0);
							if ((difh==1)||(difh==2)) { // elimination de n dans les petits chiffres de la ligne                               
							   var ii=parseInt(hn0/9);
                               wscen=n + " en "+ colPlace[hn0] + " et "+ colPlace[hn1]+tradacrit(" éliminé de la ligne : ");
                               //exploration dans la ligne ii
                               for (var jj=0; jj<9; jj++) {
                            		var hh=jj+9*ii;
                            		if ((hh != hn0) && (hh != hn1)) {
										if (contenu[hh].toString().split(n)[0].length<contenu[hh].length) {
										   wscen=wscen+colPlace[hh]+" ";
										   eliminationnumero(hh, n);
										}
                            		}	
                               }							   
                    		   if (scenario!=noeffect) {
            				   	  	variete=0;
									if (clickmethode) {enregistrescenarios()} else {return}
                    			}
							}
							if ((difh==9)||(difh==18)){ // elimination de n dans les petits chiffres de la colonne
                             	var ii=hn0-9*parseInt(hn0/9);
                            	wscen=n + " en "+ colPlace[hn0] + " et "+ colPlace[hn1]+tradacrit(" éliminé de la colonne : ");
                               //exploration dans la colonne ii
                               for (var jj=0; jj<9; jj++) {
                            		var hh=ii+9*jj;
                            		if ((hh != hn0) && (hh != hn1)) {
										if (contenu[hh].toString().split(n)[0].length<contenu[hh].length) {
										   wscen=wscen+colPlace[hh]+" ";
										   eliminationnumero(hh, n);
										}
                            		}	
                               }
                    		   if (scenario!=noeffect) {
            				   	  	variete=0;
									if (clickmethode) {enregistrescenarios()} else {return}
                    			}
							}														
							break;
						default:
							break;
					}
				} else if (hv==3) {// trio dans meme bloc et sur meme axe
					switch (lc) {
	  					case 0: // Ligne   : elimination de n dans les petits chiffres du carre
	  					case 1: // Colonne : elimination de n dans les petits chiffres du carre
							if ((carre[hn0]==carre[hn1]) && (carre[hn0]==carre[hn2])) {
                            	var ii=carre[hn0]-1;
                            	wscen=n + " en "+ colPlace[hn0] + ", "+ colPlace[hn1]+ " et "+ colPlace[hn2]+tradacrit(" éliminé du carré : ");
                            	//exploration dans le carre ii
                            	var h0=18*parseInt(ii/3)+3*ii
                            	for (var jj=0; jj<9; jj++) {
                            		var hh=jj+6*parseInt(jj/3)+h0;
                            		if ((hh != hn0) && (hh != hn1) && (hh != hn2)) {
										if (contenu[hh].toString().split(n)[0].length<contenu[hh].length) {
										   wscen=wscen+colPlace[hh]+" ";
										   eliminationnumero(hh, n);
										}
                            		}	
                            	}
                    			if (scenario!=noeffect) {
            					   	variete=1;
									if (clickmethode) {enregistrescenarios()} else {return}
                    			}
                            }
							break;
	  					case 2: // Carre : elimination de n sur l'axe commun 
							var difh=(hn1-hn0);
							var difh2=(hn2-hn1);
							if ((difh==1)&&(difh2==1)) { // elimination de n dans les petits chiffres de la ligne                               
							   var ii=parseInt(hn0/9);
                               wscen=n + " en "+ colPlace[hn0] + ", "+ colPlace[hn1]+ " et "+ colPlace[hn2]+tradacrit(" éliminé de la ligne : ");
							   //exploration dans la ligne ii
                               for (var jj=0; jj<9; jj++) {
                            		var hh=jj+9*ii;
                            		if ((hh != hn0) && (hh != hn1) && (hh != hn2)) {
										if (contenu[hh].toString().split(n)[0].length<contenu[hh].length) {
										   wscen=wscen+colPlace[hh]+" ";
										   eliminationnumero(hh, n);
										}
                            		}	
                               }							   
                    		   if (scenario!=noeffect) {
            				   	  	variete=1;
									if (clickmethode) {enregistrescenarios()} else {return}
                    			}
							}
				
							if ((difh==9)&& (difh2==9)) { // elimination de n dans les petits chiffres de la colonne
                             	var ii=hn0-9*parseInt(hn0/9);
                            	wscen=n + " en "+ colPlace[hn0] +", "+ colPlace[hn1]+ " et "+ colPlace[hn2]+tradacrit(" éliminé de la colonne : ");
							   //exploration dans la colonne ii
                               for (var jj=0; jj<9; jj++) {
                            		var hh=ii+9*jj;
                            		if ((hh != hn0) && (hh != hn1) && (hh != hn2)) {
										if (contenu[hh].toString().split(n)[0].length<contenu[hh].length) {
										   wscen=wscen+colPlace[hh]+" ";
										   eliminationnumero(hh, n);
										}
                            		}	
                               }
                    		   if (scenario!=noeffect) {
            				   	  	variete=1;
									if (clickmethode) {enregistrescenarios()} else {return}
                    			}
							}														
							break;
						default:
							break;
					}// switch
				}// hv				
			}// j
		}// lc
	}// n
}

function elaborevarianteduo() {
		 // wscen=n+" en HH(, HH) et HH : "+F1 F2
		 var n=scenario.substring(0,1);
		 var s0=scenario.split(" : ")[1]; 
		 decodecase(s0,n);
		 var s1=scenario.split(" en ")[1]
		 var t=s1.substring(2,3);
		 if (t==sep) {
		 	var hh1=s1.substring(0,2)+" ";
		 	var hh2=s1.substring(4,7);
			var hh3=s1.substring(10,13);
		 	decodevert(hh3, n);
		 } else {
		 	var hh1=s1.substring(0,3);
		 	var hh2=s1.substring(6,9);
		 }
		 decodevert(hh1, n);
		 decodevert(hh2, n);
}

function xwing() {
  var re=/\d/g;
  for (var n=1; n<10; n++) { // Numero 
	  for (var i=0; i<9; i++) {		
  	  	 for (var lc=0;lc<2;lc++) { // D'abord ligne puis colonne
		  	var cf1=8*lc+1;
		 	var cf2=8*(1-lc)+1;
	  	  	// Ligne ou colonne i : Recherche n sur colonnes croisant cette ligne ou sur lignes croisant cette colonne
			var hv=0;
			for (var j=0; j<9; j++) {// Colonnes ou lignes j coupant i : recherche de n a leur intersection
				var h=cf1*j+cf2*i;
				var duoxy1=contenu[h];
				if (duoxy1.split(n)[0].length<duoxy1.length) {
				   if (hv==0) {var hn0=h} // Premiere intersection
				   if (hv==1) {var hn1=h} // Deuxieme intersection
				   hv=hv+1;
				}
			}// j
			if ((hv==2) && (carre[hn1]!=carre[hn0])) {	// Duo n verifie sur ligne ou colonne i et colonnes (resp. lignes) colig0 et colig1
			   		   		// n sur aucune autre colonne (resp. ligne) a l'intersection avec la ligne (resp. colonne) i
				switch(lc) {
					case 0:
						 var colig0=hn0-9*i;
						 var colig1=hn1-9*i;
						 break;
					case 1:
						 var colig0=(hn0-i)/9;
						 var colig1=(hn1-i)/9;
						 break;
				}
				for (var k=0;k<9;k++) {// verification duo n sur colonne k et lignes colig0 et colig1
						 					 // 			ou sur ligne k et colonnes colig0 et colig1
					if (k!=i) {
    					var hk0=cf1*colig0+cf2*k;
    					var duoxx0=contenu[hk0];
    					var hk1=cf1*colig1+cf2*k;
    					var duoxx1=contenu[hk1];
    					if ((carre[hk0]!=carre[hn0]) && (carre[hk1]!=carre[hn1])) {
    						var duo0=(duoxx0.split(n)[0].length<duoxx0.length);
        					var duo1=(duoxx1.split(n)[0].length<duoxx1.length);
							if (duo0 && duo1) {// Duo verifie sur colonne (resp. ligne) k 
        					   var hvl=true;
        					   var hfinned=false;
                    		   for (var l=0;l<9;l++) { // Recherche sur autres lignes coupant la colonne k (ou autres colonnes coupant la ligne k)
                    		   	   if ((l!=colig0)&&(l!=colig1)) {
        							  var hq=cf1*l+cf2*k;
        							  var duoxy2=contenu[hq];
        							  if (duoxy2.split(n)[0].length<duoxy2.length) {
        							  	 if (hvl) {// 2eme case pour xwing
        								    hfinned=true;//3eme case pour finned xwing si hq dans bloc hk1 ou hk2 (differents !)
        									var hnageoire=hq; 
        								 } else {// Plus de 3 cases ou hk0 et hk1 dans même bloc
        								    hfinned=false;// 3 cases et hk0 dans bloc different de hk1 : hfinned=true
        								 }								 
        								 hvl=false;
        							  }
                    			   }
                    		    }// l
								if (hvl) {//xwing ! pas d'autre n sur la colonne (resp. ligne) k effacer n sur petits chiffres de colig0 et colig1
                    						 // sauf sur colonnes resp. lignes i et k
                    			   wscen="Xwing "+n+tradacrit(" éliminé par ")+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hk0]+" "+colPlace[hk1]+" dans ";
                    			   for (var m=0;m<9;m++) {// Colonnes ou lignes sur lignes ou colonnes colig0 et colig1 
                    			   	   if ((m!=i) && (m!=k)) {
        								  var hm=cf2*m+cf1*colig0; // Ligne ou colonne colig0
										  var poshm=contenu[hm];
        								  if ((contenu[hm].length>1)  && (poshm.split(n)[0].length<poshm.length)) {
										  	 wscen=wscen+colPlace[hm]+" ";
										  	 eliminationnumero(hm, n); 
										  }
                    					  hm=cf2*m+cf1*colig1;// Ligne ou colonne colig1
										  var poshm=contenu[hm];
        								  if ((poshm.length>1) && (poshm.split(n)[0].length<poshm.length)) {
										  	 wscen=wscen+colPlace[hm]+" ";
											 eliminationnumero(hm, n);
										  }
                    				   }
                    				}																	
									if (scenario!=noeffect) {
                        			   	  	variete=0;// Cas de base
											if (clickmethode) {enregistrescenarios()}
											else {return}// ok
                        			}
            						if (hfinned && (carre[hn0]!= carre[hn1]) && (carre[hn0]!= carre[hk0])) {// Finnedxwing ! 3eme case hq contenant n sur la colonne (resp. ligne) k effacer n sur petits chiffres 
            						   		   	  			 // du carre commun a hq et une des cases hk0 ou hk1 (qui sont sur blocs differents)
                        			   wscen="Finned Xwing "+n+tradacrit(" éliminé par ")+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hk0]+" "+colPlace[hk1]+" avec nageoire "+colPlace[hnageoire]+" dans ";
                        			   var ii=carre[hnageoire]-1;
            						   var iik0=carre[hk0]-1;
            						   var iik1=carre[hk1]-1;
            						   if (ii==iik0) {
            						   	  var hkq=hk0;
            						   } else if (ii==iik1) {
            						   	  var hkq=hk1;
            						   } else {
            						   	  var hkq=-1;
            						   }
            						   if (hkq!=(-1)) {
                            			   for (var m=0;m<9;m++) {// Bloc de hnageoire et hkq (hk1 ou hk2) sur sa ligne (resp. sa colonne) 
                							   var hm=m+6*parseInt(m/3)+18*parseInt(ii/3)+3*ii;
            								   if ((hm!=hkq) && (((lc==1) && (parseInt(hm/9)==parseInt(hkq/9))) || ((lc==0) && (hm-parseInt(hm/9))==(hkq-parseInt(hkq/9))))) {
        										  var poshm=contenu[hm];
                								  if ((poshm.length>1) && (poshm.split(n)[0].length<poshm.length)) {
        										  	 wscen=wscen+colPlace[hm]+" ";
        											 eliminationnumero(hm, n)
        										  }
            									  //if (contenu[hm].length>1) {eliminationnumero(hm, n)}
                            				   }
                            				}
            							}																	
                            			if (scenario!=noeffect) {
                        			   	  	variete=1;// Finned
											if (clickmethode) {enregistrescenarios()}
											else {elaborevarianteXWing(); return}// ok
                            			}
                        			}// hfinned
                    			}// hvl
                    		}// duo0 et duo1
							for (var iduo=0; iduo<2; iduo++) {
        					   if (iduo==0) {var duo=duo0} else {var duo=duo1}
							   if (duo) {
    							   var hvl=true;
            					   var dfinned=true;
            					   var hnageoire=M;
            					   var hfinned=M;
            					   var hksashimi=hk0;
								   var hkdiff=hk1
            					   if (duo1) {hksashimi=hk1; hkdiff=hk0}
            					   for (var l=0;l<9;l++) { // Recherche sur autres lignes coupant la colonne k (ou autres colonnes coupant la ligne k)
            						   var hq=cf1*l+cf2*k;
									   if (hq!=hksashimi) {
            							  var duoxy3=contenu[hq];
										  if (duoxy3.split(n)[0].length<duoxy3.length) {
    											if (hnageoire==M) {
            									   hnageoire=hq;
            									} else {// Sauf double Finned
            									   hvl=false;
            									   if (hfinned==M) {
												   	  if (hq!=hkdiff) {hfinned=hq}
												   } else {dfinned=false}
            									} 
            							  }
                        			   }// if l
                        		    }// l
                        			if (hvl && (carre[hn0]!=carre[hnageoire]) && (hnageoire!=M)) {// Sashimi xwing !						
            							var hksashimi=hk0;
            							if (duo1) {hksashimi=hk1}
            							var hnsashimi=hn1;
            							if (duo1) {hnsashimi=hn0}
										wscen="Sashimi Xwing "+n+tradacrit(" éliminé par ")+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hksashimi]+" "+colPlace[hnageoire]+" dans ";
            							traitesashimi(hnsashimi, hnageoire, n)
                            			if (scenario!=noeffect) {
                        			   	  	variete=2;// Sashimi
											if (clickmethode) {enregistrescenarios()}
											else {elaborevarianteXWing(); return}// ok
                            			   	return;// ok
                            			}
            						}// hvl
                        			if (dfinned && (hfinned!=M)) {// Sashimi double Finned xwing !						
            							if (carre[hnageoire]==carre[hfinned]) {
                							var hksashimi=hk0;
                							if (duo1) {hksashimi=hk1}
                							var hnsashimi=hn1;
                							if (duo1) {hnsashimi=hn0}
                                    	   	if (carre[hnageoire]!=carre[hksashimi]) {
                								wscen="Sashimi double Finned Xwing "+n+tradacrit(" éliminé par ")+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hksashimi]+" "+colPlace[hnageoire]+" "+colPlace[hfinned]+" dans ";
                    							traitedoublesashimi(hnsashimi, hnageoire, hfinned, n)
                                    			if (scenario!=noeffect) {
                                    			   	  	variete=3;// Sashimi double finned
            											if (clickmethode) {enregistrescenarios()}
											else {elaborevarianteXWing(); return}// ok
                                    			   	  	return;// ok
                                    			}
            								}
            							}
            						}// dfinned
    								var hn=hn1;
    								var hnbis=hn0;
    								var hk=hk0;
    								if (duo1) {hk=hk1; hn=hn0; hnbis=hn1}
    								var hfranken=M;
    								var chk=carre[hk]-1;
    								var hvl=true;
    								//var dfranken=true;
        							var hfinned0=M;
        							var hfinned1=M;
    								for (var j=0; j<9; j++) {// Dans carre de hk
    									var h=j+6*parseInt(j/3)+18*parseInt(chk/3)+3*chk;
    									var duoxy4=contenu[h];
    									if ((h!=hk) && (duoxy4.split(n)[0].length<duoxy4.length)) {
    									   //h sur axe hk
    									   var autreaxe=(parseInt(hk/9)==parseInt(h/9)) || ((hk-9*parseInt(hk/9))==(h-9*parseInt(h/9)));
        								   // h sur axe hnbis-hk;
        								   var suraxe=((parseInt(hnbis/9)==parseInt(hk/9)) && (parseInt(h/9)==parseInt(hk/9))) || (((hnbis-9*parseInt(hnbis/9))==((hk-9*parseInt(hk/9))) && ((h-9*parseInt(h/9))==(hk-9*parseInt(hk/9)))));
    									   if (!autreaxe) {if (hfranken==M) {hfranken=h} else {hvl=false}} // Franken ou Finned Franken
    									   if (autreaxe && !suraxe) {hvl=false}
										   if (suraxe) {// Finned Franken
												if (hfinned0==M) {
    											   	  hfinned0=h;
            								  } else if (hfinned1==M) {
    											   	  hfinned1=h;
    										  }// hfinned0 ou hfinned1
    									   }// suraxe
    									}// duoxy4								
    								}//j
    								if (hfranken!=M) {// Case Franken
        								if (hvl) {// Une seule case du bloc ne voyant pas hk, et pas de case voyant hk et hors axe hk-hnbis
											if (hfinned0==M) {// Pas de case Finned, donc Franken
                    								wscen="Franken Xwing "+n+tradacrit(" éliminé par ")+colPlace[hn]+" "+colPlace[hnbis]+" "+colPlace[hk]+" "+colPlace[hfranken]+" dans ";
                        							// Elimination dans case voyant hn et hfranken et ne voyant pas hnbis
        											var hhn=parseInt(hn/9);
        											var hhnbis=parseInt(hnbis/9);
        											var vhn=hn-9*hhn;
        											var hhfranken=parseInt(hfranken/9);
        											var vhfranken=hfranken-9*hhfranken;
        											var hcase=9*hhfranken+vhn;
        											if (hhn!=hhnbis) {hcase=vhfranken+9*hhn}
                								  	var poshcase=contenu[hcase];
													if ((poshcase.length>1) && (poshcase.split(n)[0].length<poshcase.length)) {wscen=wscen+colPlace[hcase]+" "; eliminationnumero(hcase, n)}
													wscen=wscen+tradacrit("<br><br>Références : bloc ")+carre[hfranken]+" (blocs numerotes de 1 a 9 a partir du coin en haut et a gauche), et";
													var col3=parseInt(hn/9);
													var axeh=true;
													if (col3!=parseInt(hnbis/9)) {axeh=false; col3=hn-9*col3}
													if (axeh) {wscen=wscen+" ligne  "+(col3+1)} else {wscen=wscen+" colonne  "+String.fromCharCode(65+col3)}
                                        			if (scenario!=noeffect) {
                                        			   	  	scenario=wscen;
															variete=4;// Franken
                											if (clickmethode) {enregistrescenarios()}
											else {elaborevarianteXWing(); return}// ok
                                        			   	  	return;// ok
                                        			}
        									} else if (hfinned1!=M) {// 2 cases Finned Franken donc Finned Franken
                        							variete=5;
													var nage="nageoires "+colPlace[hfinned0]+" "+colPlace[hfinned1]+"  ";
                            						// Elimination dans case voyant hn et hfranken et ne voyant pas hnbis
            										var hhn=parseInt(hn/9);
            										var hhnbis=parseInt(hnbis/9);
            										var vhn=hn-9*hhn;
            										var hhfranken=parseInt(hfranken/9);
            										var vhfranken=hfranken-9*hhfranken;
            										var hcase=9*hhfranken+vhn;
            										if (hhn!=hhnbis) {hcase=vhfranken+9*hhn}
            										wscen="Finned Franken Xwing "+n+tradacrit(" éliminé par ")+colPlace[hn]+" "+colPlace[hnbis]+" "+colPlace[hk]+" "+colPlace[hfranken]+" avec "+nage+" dans "+colPlace[hcase];
                								  	var poshcase=contenu[hcase];
													if ((poshcase.length>1) && (poshcase.split(n)[0].length<poshcase.length)) {eliminationnumero(hcase, n)}
													wscen=wscen+tradacrit("<br><br>Références : bloc ")+carre[hfranken]+" (blocs numerotes de 1 a 9 a partir du coin en haut et a gauche), et";
													var col3=parseInt(hn/9);
													var axeh=true;
													if (col3!=parseInt(hnbis/9)) {axeh=false; col3=hn-9*col3}
													if (axeh) {wscen=wscen+" ligne  "+(col3+1)} else {wscen=wscen+" colonne  "+String.fromCharCode(65+col3)}
                                          			if (scenario!=noeffect) {
                                        			   	  	scenario=wscen;
															variete=5;// Finned Franken
                											if (clickmethode) {enregistrescenarios()}
											else {elaborevarianteXWing(); return}// ok
															return;// ok
                                          			}
        									}// hvlfin
										}// hvl
    								}// hfranken!=M
								}// duo
        					}// iduo
						}// Tous blocs differents
					}//k!=i
            	}// k
			}// hv=2
		  }// lc
	   }// i
	}// n
}


function elaborevarianteXWing() {
	// variete=0 "Xwing "+n+" elimine par "+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hk0]+" "+colPlace[hk1]+" dans "+H1 H2 ..
	// variete=1 "Finned Xwing "+n+" elimine par "+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hk0]+" "+colPlace[hk1]+" avec nageoire "+colPlace[hnageoire]+" dans "+H1 H2 ...
	// variete=2 "Sashimi Xwing "+n+" elimine par "+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hksashimi]+" "+colPlace[hnageoire]+" dans "+H1 H2 ...
	// variete=3 "Sashimi double Finned Xwing "+n+" elimine par "+colPlace[hn0]+" "+colPlace[hn1]+" "+colPlace[hksashimi]+" "+colPlace[hnageoire]+" "+colPlace[hfinned]+" dans "+H1 H2 ...
	// variete=4 "Franken Xwing "+n+" elimine par "+colPlace[hn]+" "+colPlace[hnbis]+" "+colPlace[hk]+" "+colPlace[hfranken]+" dans "+H1 H2 ..
	// variete=5 "Finned Franken Xwing "+n+" elimine par "+colPlace[hn]+" "+colPlace[hnbis]+" "+colPlace[hk]+" "+colPlace[hfranken]+" avec  "+nage+H1 H2 ...+" dans "+colPlace[hcase]
	var sx=scenario.split("Xwing ");
	switch (sx[0]) {
		   case ("undefined"):
		   		variete=0;
				break;
		   case ("Finned "):
		   		variete=1;
				break;
		   case ("Sashimi  "):
		   		variete=2;
				break;
		   case ("Sashimi double Finned "):
		   		variete=3;
				break;
		   case ("Franken  "):
		   		variete=4;
				break;
		   case ("Finned Franken  "):
		   		variete=5;
				break;
	}
	var s0=sx[1];
	var n=s0.substring(0,1);
	var s1=s0.split("dans ")[1];
	var sy=s1.split("<br>")[0];
	var suite=true;
	if (sy.length<s1.length) {// Une suite derriere les cases affectees
		if (sy.length>2) {
			sy=sy.substring(0,(sy.length-1));
			var s2=sy.split(" ")
		} else {
			var h=decodagecolPlace(sy);
    		var duoxy5=contenu[h];
    		if (duoxy5.split(n)[0].length<duoxy5.length) {eliminationnumero(h, n)}
			suite=false;
		 }
	} else {
		s1=s1.substring(0,(s1.length-1));
		var s2=s1.split(" ");
	}
	if (suite) {
		for (var i=0; i<s2.length; i++) {
    		var h=decodagecolPlace(s2[i]);
    		var duoxy6=contenu[h];
    		if (duoxy6.split(n)[0].length<duoxy6.length) {eliminationnumero(h, n)}
    	}
	}
	var ss=(s0.split("dans ")[0]).split(tradacrit(" éliminé par "))[1];// sauf varietes 1 et 5 (nageoires)
	if (ss.split("nageoire")[0].length<ss.length){// ajouter a ss la ou les nageoires
		var sp=ss.split("avec nageoire");
		var sp0=sp[0];
		var sp1=sp[1];
		if (sp1.substring(0,1)=="s") {sp1=sp1.substring(2,sp1.length)} else {sp1=sp1.substring(1,sp1.length)}
		ss=sp0;
		decodebleu(sp1,n);
	} 
	decodevert(ss, n);

}

function traitesashimi(case1, case2, num) {
	var c1=carre[case1]-1;
	var h1=parseInt(case1/9);
	var v1=case1-9*h1;
	var c2=carre[case2]-1;
	var h2=parseInt(case2/9);
	var v2=case2-9*h2;
	for (var j=0; j<9; j++) {//bloc de case1
		var h=j+6*parseInt(j/3)+18*parseInt(c1/3)+3*c1;
		if (h!=case1) {
		   var hh=parseInt(h/9);
		   var vh=h-9*hh;
		   if ((hh==h2) || (vh==v2)) {// case2 vu
		   	  if ((hh!=h1) && (vh!=v1)) {// pas sur axe case1
				var posh=contenu[h];
				if((posh.length>1) && (posh.split(num)[0].length<posh.length)) {wscen=wscen+colPlace[h]+" "; eliminationnumero(h, num)}
				//if (contenu[h].length>1) {eliminationnumero(h, num)}			  	 
			  }
		   }
		}		
	}
	for (var j=0; j<9; j++) {//bloc de case2
		var h=j+6*parseInt(j/3)+18*parseInt(c2/3)+3*c2;
		if (h!=case2) {
		   var hh=parseInt(h/9);
		   var vh=h-9*hh;
		   if ((hh==h1) || (vh==v1)) {// case1 vu
		   	  if ((hh!=h2) && (vh!=v2)) {// pas sur axe case2
				var posh=contenu[h];
				if((posh.length>1) && (posh.split(num)[0].length<posh.length)) {wscen=wscen+colPlace[h]+" "; eliminationnumero(h, num)}
			  }
		   }
		}		
	}
}
function traitedoublesashimi(case1, case2, case3, num) {
	var c1=carre[case1]-1;
	var h1=parseInt(case1/9);
	var v1=case1-9*h1;
	var c2=carre[case2]-1;
	var h2=parseInt(case2/9);
	var v2=case2-9*h2;
	var c3=carre[case3]-1;
	var h3=parseInt(case3/9);
	var v3=case3-9*h3;
	for (var j=0; j<9; j++) {//bloc de case2 et case3
		var h=j+6*parseInt(j/3)+18*parseInt(c2/3)+3*c2;
		if ((h!=case2) && (h!=case3)) {
		   var hh=parseInt(h/9);
		   var vh=h-9*hh;
		   if ((hh==h1) || (vh==v1)) {// case1 vu
		   	  if ((hh!=h2) && (vh!=v2)) {// pas sur axe case2 ni case3
				var posh=contenu[h];
				if((posh.length>1) && (posh.split(num)[0].length<posh.length)) {wscen=wscen+colPlace[h]+" "; eliminationnumero(h, num)}
			  }
		   }
		}		
	}
}
