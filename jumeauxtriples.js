function testdoublonjumeau(ng, lci) {
			// Doublon si ng permutation d'une solution previous de gratteciel[ig]
			var tg=true;
			if ((ngratteciel>0) && FILTRAGEDESSOLUTIONS) {
    			for (var ig=0; ig<ngratteciel; ig++) {
    				var ngg=gratteciel[ig];
					//Test si ng et ngg sont en permutation de 3 elements et meme lc
    				if (permutngnggjumeau(ng, ngg) && (lci==lcprevious[ig])) {tg=false}
    			}
			}
			if (tg) {
			    gratteciel[ngratteciel]=ng;
				lcprevious[ngratteciel]=lci;
				ngratteciel=ngratteciel+1;
				enregistrescenarios();
			} else {
			    scenario=noeffect;
			}
}

function permutngnggjumeau(aa, bb) {
		 var a = new Array(2);
		 var b = new Array(2);
		 a[0]=aa.substring(0,2); 
		 a[1]=aa.substring(2,4); 
		 b[0]=bb.substring(0,2); 
		 b[1]=bb.substring(2,4); 
		 // Test si b de 0 a 1 est une permutation de a de 0 a 1
		 for (var i=0; i<2; i++) {
		 	 var trouv=false;
			 for (var j=0; j<2; j++) {
			 	 if (b[i]==a[j]) {trouv=true}
			 }
			 if (!trouv) {return false}
		 }
		 return true; 
}
function calculjumeaux() {
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""; lcprevious[ig]=3}
	ngratteciel=0;
	var re = /\d/g;
	for (var i0=0; i0<M; i0++) {
		if (contenu[i0].length == 2) {
			var ihorizontal = parseInt(i0/9);
			var ivertical=i0-9*ihorizontal;
			var icarre = carre[i0]-1;
			for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
				var hbloc=true;
				for (var i=0; i<9; i++) {
					switch (lc) {
	  					case 0: // Ligne ihorizontal
							var h=i+9*ihorizontal;
							break;
	  					case 1: // Colonne ivertical
							var h=ivertical+9*i;
							break;
	  					case 2: // Carre icarre
							var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
    				   		hbloc=((h-9*parseInt(h/9))!=(i-9*parseInt(i/9))) && (parseInt(h/9)!=parseInt(i/9));
							break;
					}
					if (hbloc) {
					if ((h!=i0) && (contenu[h]==contenu[i0])) {	// Jumeau trouve de i0 en h (position i) et elimination en ii (position j)
        					wscen="Jumeaux " + contenu[i0] + " en "+ colPlace[i0] + " et " + colPlace[h];
                			if (lc==0) {wscen=wscen+" dans la ligne. Elimination en : "}
                			if (lc==1) {wscen=wscen+" dans la colonne. Elimination en : "}
                			if (lc==2) {wscen=wscen+" dans le bloc. Elimination en : "}
							var hibloc=true;
							for (var j=0; j<9; j++) {					
        					  if (j!=i) {
        					   switch (lc) {
        	  					case 0: // Ligne : elimination dans la ligne ihorizontal
        							 var ii=j+9*ihorizontal;
        							 break;
        	  					case 1: // Colonne : elimination dans la colonne ivertical
        							 var ii=ivertical+9*j;
        							 break;
        	  					case 2: // Carre : elimination dans le carre icarre
        							 var ii=j+6*parseInt(j/3)+18*parseInt(icarre/3)+3*icarre;
    				   				 hibloc=((ii-9*parseInt(ii/9))!=(i0-9*parseInt(i0/9))) && (parseInt(ii/9)!=parseInt(i0/9));
        							 break;
        					   }
        					   if (hibloc) {
							   if (ii!=i0) {
        					   	  if (contenu[ii]==contenu[i0]) { // Triple jumeau en i0, h et ii --> crash
								  	 variete=4;
        						  	 scenario="3 cases de 2 chiffres identiques : "+contenu[ii];
                			if (lc==0) {scenario=scenario+" dans la ligne "+(ihorizontal+1)}
                			if (lc==1) {scenario=scenario+" dans la colonne "+String.fromCharCode(65+ivertical)}
                			if (lc==2) {scenario=scenario+" dans le bloc "+(icarre+1)}
        							 origincrash=true;
        						  	 return;
        						  }
								  var c01 = contenu[i0].toString().match(re);
								  if ((contenu[i0].length>1) && (contenu[ii].length>1)) {
    								  var decodj=contenu[ii];
									  //ii contient c01[0] ou c01[1]
									  if ((decodj.split(c01[0])[0].length<decodj.length) || (decodj.split(c01[1])[0].length<decodj.length)) {
    									  wscen=wscen+colPlace[ii]+" ";
        								  eliminationnumero(ii, c01[0]);								 
                						  eliminationnumero(ii, c01[1]);
									  }
								  }// contenu de 2 chiffres
        					   }// ii different de i0
        					}// j different i
					 	}}// Boucle j et hibloc
                    	if (scenario!=noeffect) {
                           	variete=0;
                        	if (clickmethode) {
                        		var ng0=colPlace[i0]+colPlace[h];
								testdoublonjumeau(ng0, lc);
                        	} else {
                        		return
                        	}
                    	}
					}// h!=i0
				}}// i et hbloc	 
			}// lc
		}// length=2
	}// i0
}

function elaborevariantejumeaux() {
		 // wscen=Jumeaux xx en HH et HH Elimination en : h2 h3 h5
		 var s0=scenario.split("Jumeaux ")[1];
		 var cq=s0.substring(0,2);
		 var s1=s0.split(" : ")[1];
		 var s02=scenario.split(" et ");
		 var s03=s02[0];
		 var s04=s02[1];
		 var cq1= cq.substring(0,1);
		 var cq2= cq.substring(1,2);
		 var hh=s03.substring(s03.length-2, s03.length)+" "+s04.substring(0,2)+" ";
		 for (var i=0; i<2; i++) {
		 	   decodecase(s1, cq.substring(i,(i+1)));
			   if (i==0) {var ccq=cq1} else {var ccq=cq2}
		 	   decodevert(hh, ccq);
		 }
}

function testdoublontriple(ng) {
			// Doublon si ng permutation d'une solution previous de gratteciel[ig]
			var tg=true;
			if ((ngratteciel>0) && FILTRAGEDESSOLUTIONS) {
    			for (var ig=0; ig<ngratteciel; ig++) {
    				var ngg=gratteciel[ig];
					//Test si ng et ngg sont en permutation de 3 elements
    				if (permutngnggtriple(ng, ngg)) {tg=false}
    			}
			}
			if (tg) {
			    gratteciel[ngratteciel]=ng;
				ngratteciel=ngratteciel+1;
				enregistrescenarios();
			} else {
			    scenario=noeffect;
			}
}

function permutngnggtriple(aa, bb) {
		 var a = new Array(3);
		 var b = new Array(3);
		 a[0]=aa.substring(0,2); 
		 a[1]=aa.substring(2,4); 
		 a[2]=aa.substring(4,6); 
		 b[0]=bb.substring(0,2); 
		 b[1]=bb.substring(2,4); 
		 b[2]=bb.substring(4,6); 
		 // Test si b de 0 a 2 est une permutation de a de 0 a 2
		 for (var i=0; i<3; i++) {
		 	 var trouv=false;
			 for (var j=0; j<3; j++) {
			 	 if (b[i]==a[j]) {trouv=true}
			 }
			 if (!trouv) {return false}
		 }
		 return true; 
}

function calcultriples() {
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	var re = /\d/g;
	var c01=new Array(2);
	for (var i0=0; i0<M; i0++) {
		c01 = contenu[i0].toString().match(re);
		var ihorizontal = parseInt(i0/9);
		var ivertical=i0-9*ihorizontal;
		var icarre = carre[i0]-1;
		for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
			var hbloc=true;
			for (var i=0; i<9; i++) {// Elements h "voyant " i0, contenus dans i0, differents de i0
				switch (lc) {
	  				case 0: // Ligne ihorizontal
						var h=i+9*ihorizontal;
						break;
	  				case 1: // Colonne ivertical
						var h=ivertical+9*i;
						break;
	  				case 2: // Carre icarre
						var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
    				   	hbloc=((h-9*parseInt(h/9))!=(i0-9*parseInt(i0/9))) && (parseInt(h/9)!=parseInt(i0/9));
						break;
				}// switch lc
				if (hbloc) {
				if (h!=i0) {				   	
					if (contenu[i0].length == 3) {// Case de reference a 3 chiffres
    					if (((contenu[h].length==2) || (contenu[h].length==3)) && verif(contenu[h],contenu[i0])) { // Recherche de triple de i0 : contenu en h (position i) inclus dans i0				
        					 for (var j=0; j<9; j++) { // Elements ij " voyant " h et i0, contenus dans i0, differents de h et i0					
        					   switch (lc) {
        	  						  case 0: // Ligne : elimination dans la ligne ihorizontal
        							  	   var ij=j+9*ihorizontal;
        							 	   break;
        	  						 case 1: // Colonne : elimination dans la colonne
        							 	  var ij=ivertical+9*j;
        							 	  break;
        	  						 case 2: // Carre : elimination dans le carre
        							 	  var ij=j+6*parseInt(j/3)+18*parseInt(icarre/3)+3*icarre;
        							 	  break;
        					   }
        					   if((ij!=i0) && (ij!=h)) {
            					   if ((((contenu[ij].length==2)&& (contenu[ij]!=contenu[h])) || (contenu[ij].length==3))  && verif(contenu[ij],contenu[i0])) {// Triples i0, h, ij => elimination dans les autres cases ii
									   wscen="Triples " + contenu[i0] + " en "+ colPlace[i0] + ", "+colPlace[ij]+" et " + colPlace[h]+". Elimination dans les cases : ";									
									   for (var k=0; k<9; k++) {// Elements ii differents de ij, h, et i0					
            					   		   	  switch (lc) {
            	  							  		 case 0: // Ligne : elimination dans la ligne ihorizontal
            							 			 	  var ii=k+9*ihorizontal;
            							 				  break;
            	  									 case 1: // Colonne : elimination dans la colonne
            							 			 	  var ii=ivertical+9*k;
            							 				  break;
            	  									 case 2: // Carre : elimination dans le carre
            							 			 	  var ii=k+6*parseInt(k/3)+18*parseInt(icarre/3)+3*icarre;
            							 				  break;
            					   			  }
            								  if ((ii!=i0) && (ii!=h) && (ii!=ij)&& (contenu[ii].length>1)) { 
								  				   if (verif(contenu[ii], contenu[i0])) {
                            						  	 scenario="4 cases pour 3 chiffres : "+contenu[i0]+" --> "+colPlace[h]+",  "+colPlace[i0]+",  "+colPlace[ij]+" et "+colPlace[ii];
								  	 					 variete=5;
        							 					 origincrash=true;
														 return;
                            					   }
												   var ttr=false;
												   for (var kk=0; kk<3; kk++) {
												   	   if(contenu[ii].split(c01[kk])[0].length<contenu[ii].length) {
													   		if (!ttr) {wscen=wscen+colPlace[ii]+" "}
													   		eliminationnumero(ii, c01[kk]);
															ttr=true;
													   }
												   }
											  }// test ii
            					       	}// k
                                        if (scenario!=noeffect) {
                                                variete=0;
                        						if (clickmethode) {
                        								var ng0=colPlace[i0]+colPlace[ij]+colPlace[h];
														testdoublontriple(ng0);
                        						} else {
                        							   return
                        						}
                                        		//if (clickmethode) {enregistrescenarios()} else {return}
                                        }
            						}// length contenu
            					 }// ij
        					 }// j
    					}// length h						  
    				} else if (contenu[i0].length == 2) {// Case de reference a 2 chiffres
					  	c01[2]=  verif2(contenu[h],contenu[i0]);// Un chiffre sur 2 de h (pas les 2) inclus dans i0, le chiffre supplementaire de h dans c01[2]   
    					if ((contenu[h].length==2) && (c01[2]!=0)) { 				
        					 for (var j=i+1; j<9; j++) { // ij " voyant " h et i0, contenant 2 des 3 chiffres : i0 et 					
        					   switch (lc) {
        	  						  case 0: // Ligne : elimination dans la ligne ihorizontal
        							  	   var ij=j+9*ihorizontal;
        							 	   break;
        	  						 case 1: // Colonne : elimination dans la colonne
        							 	  var ij=ivertical+9*j;
        							 	  break;
        	  						 case 2: // Carre : elimination dans le carre
        							 	  var ij=j+6*parseInt(j/3)+18*parseInt(icarre/3)+3*icarre;
        							 	  break;
        					   }// switch lc
        					   if((ij!=i0) && (ij!=h)) {
            					   var x=c01[0]+c01[1]+c01[2];
								   if ((contenu[ij].length==2) && (contenu[ij]!=contenu[i0]) && verif(contenu[ij],x)) {// ij contenu dans x (c01)
                					   wscen="Triples " + x + " en "+ colPlace[i0] + ", "+colPlace[h]+" et " + colPlace[ij]+". Elimination dans les cases : ";									
            					 	   for (var k=0; k<9; k++) {// Elements ii differents de ij, h, et i0					
            					   		   	  switch (lc) {
            	  							  		 case 0: // Ligne : elimination dans la ligne ihorizontal
            							 			 	  var ii=k+9*ihorizontal;
            							 				  break;
            	  									 case 1: // Colonne : elimination dans la colonne
            							 			 	  var ii=ivertical+9*k;
            							 				  break;
            	  									 case 2: // Carre : elimination dans le carre
            							 			 	  var ii=k+6*parseInt(k/3)+18*parseInt(icarre/3)+3*icarre;
            							 				  break;
            					   			  }// switch lc
            								  if ((ii!=i0) && (ii!=h) && (ii!=ij)&& (contenu[ii].length>1)) { 
								  				   if (verif(contenu[ii], contenu[i0])) {
                            						  	 scenario="4 cases pour 3 chiffres : "+contenu[i0]+" --> "+colPlace[h]+",  "+colPlace[i0]+",  "+colPlace[ij]+" et "+colPlace[ii];
                            							 variete=5;
        							 					 origincrash=true;
                            						  	 return;
                            					   }
												   var ttr=false;
												   for (var kk=0; kk<3; kk++) {
												   	   if(contenu[ii].split(c01[kk])[0].length<contenu[ii].length) {
													   		if (!ttr) {wscen=wscen+colPlace[ii]+" "}
															eliminationnumero(ii, c01[kk]);
															ttr=true;
													   }
												   }
											  }// test ii
										}// k
                                        if (scenario!=noeffect) {
                                            	variete=0;
                        						if (clickmethode) {
                        								var ng0=colPlace[i0]+colPlace[ij]+colPlace[h];
                        								testdoublontriple(ng0);
                        						} else {
                        							   return
                        						}
                                        }
            					     }// length contenu
            					 }// ij 
            				 }// j
        				}// length h
    				}// length i0				
    			}//  h != i0 
			 }}// i et hbloc
		}// lc
	}// i0
}
function verif(a, b) { // Test si nombre a est contenu dans nombre b, dans chacun de ses chiffres
	var re = /\d/g;
	var aa = a.toString().match(re);
	for (var j=0; j<aa.length; j++) {if (!(b.toString().split(aa[j])[0].length<b.length)) {return false}}// Chiffre aa[j] non contenu dans b
	return true;
}

function verif2(ax, b) { // Test si un chiffre et un seul du nombre a a 2 chiffres est contenu dans nombre b a 2 chiffres
	var re = /\d/g;
	var aa = ax.toString().match(re);
	var c=0;
	for (var j=0; j<aa.length; j++) {
		if (!(b.split(aa[j])[0].length<b.length)) {// aa[j] pas dans b
		   if (b.toString().split(aa[1-j])[0].length<b.length) {// aa[1-j] dans b
		   	 c=aa[j];// Chiffre non commun
		   }
		}
	}
	return c;
}

function elaborevariantetriples() {
		 // wscen=Triples xxxx .... : h2 h3 h5
		 var s0=scenario.split("Triples ")[1];
		 var cq=s0.substring(0,3);
		 var s1=s0.split(" : ")[1];
		 var s02=scenario.split(" en ")[1];
		 var hh=s02.substring(0,2)+" "+s02.substring(4,6)+" "+s02.substring(10,12)+" ";
		 var cq1= cq.substring(0,1);
		 var cq2= cq.substring(1,2);
		 var cq3= cq.substring(2,3);
		 for (var i=0; i<3; i++) {
		 	   decodecase(s1, cq.substring(i,(i+1)));
			   if (i==0) {var ccq=cq1} else  if (i==1) {var ccq=cq2} else {var ccq=cq3}
		 	   decodevert(hh, ccq);
		 }
}

