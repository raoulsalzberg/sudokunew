function suedecoq() {
	var re=/\d/g;
	wscen="";
	for (var i=0; i<9; i++) {// Blocs 6
		var h0=3*i+18*parseInt(i/3);// Case de reference du bloc
		var ligne0=parseInt(h0/9);// Lgne de reference
		var colonne0=h0-9*ligne0;// Colonne de reference
		for (var lc=0; lc<2; lc++) {// Ligne puis colonne du bloc soie
			var fac=9-8*lc;
			for (var jaxe=0; jaxe<3; jaxe++) {// Numero de ligne (resp.colonne)
					var hp=h0+fac*jaxe;
					var fac2=10-fac;
					// Exploration des 3 cases de la ligne (resp. colonne) du bloc : 4 cas possibles (12, 13, 23 et 123) sinon rien
						hsdc1=hp;
    					hsdc2=hp+fac2;
       					hsdc3=hp+fac2+fac2;
						var pos1=contenu[hsdc1];
						var hpos1=(pos1.length>1);
						var pos2=contenu[hsdc2];
						var hpos2=(pos2.length>1);
						var pos3=contenu[hsdc3];
						var hpos3=(pos3.length>1);
						cas123=false;
						if (hpos1 && hpos2) {
							if (hpos3) {
								cas123=true;
							} else {
							
							}
						} else if (hpos1 && hpos3) {
							hsdc2=hsdc3;
							pos2=pos3;
						} else if (hpos2 && hpos3)  {
							hsdc1=hsdc2;
							pos1=pos2;
							hsdc2=hsdc3;
							pos2=pos3;
						} else {continue}
                                	var nombre=pos1;
                                	var cref2=pos2.match(re);
                                	for (var j=0; j<cref2.length; j++) {
                                		if (!(pos1.split(cref2[j])[0].length<pos1.length)) {// cref2[j] non encore trouve dans pos1 (nombre)
											var ncref=cref2[j].toString();
											var cref=nombre.match(re);
											var nomprev=nombre;
											for (var zc=0; zc<cref.length; zc++) {
												if (ncref<cref[zc]) {nombre=nombre.substring(0,zc)+ncref+nombre.substring(zc, nombre.length); break}
											}
                                			if (zc==cref.length) {nombre=nombre+ncref}
										}
                                	}
									var cref3=pos3.match(re);
                                	if (cas123) {
        								for (var j=0; j<cref3.length; j++) {
                                    		if (!(nombre.split(cref3[j])[0].length<nombre.length)) {// cref3[j] non encore trouve dans nombre
												var ncref=cref3[j].toString();
    											var cref=nombre.match(re);
    											var nomprev=nombre;
    											for (var zc=0; zc<cref.length; zc++) {
    												if (ncref<cref[zc]) {nombre=nombre.substring(0,zc)+ncref+nombre.substring(zc, nombre.length); break}
    											}
                                				if (zc==cref.length) {nombre=nombre+ncref}
    										}
                                    	}
    								}                            	   
								   var nbchiffre=nombre.length;
                            	   var nbconf=Math.pow(2, nbchiffre);// Extraire 2 et n-2, 3 et n-3 etc..
                            	   var nbconf2=nbconf.toString(2);//1111..
                            	   var imax=nbconf2.length-1;
                            	   for (var nconfig=0; nconfig<nbconf; nconfig++) {
                            	   	   var ij=nconfig.toString(2);
                            		   while(ij.length<imax) {ij="0"+ij}
                            		   var crefij=ij.match(re);
                            		   var nbch=0;
                            		   var nbxy=0;
									   sdcab=new Array();
									   sdcxy=new Array();
        							   for (var nbij=0; nbij<imax; nbij++) {
                            			   if (crefij[nbij]==1) {
                            				  sdcab[nbch]=nombre.charAt(nbij);
                            			   	  nbch=nbch+1;
                            			   } else {
                            				  sdcxy[nbxy]=nombre.charAt(nbij);
                            				  nbxy=nbxy+1;
                            			   }
                            		   }
        							   if ((nbch>1) && (nbxy>1)) {// Configuration a 2 groupes d au moins 2 dans nombre avec chiffres sdcab selectionnes
                            				var lcx=1;
        									if (parseInt(hsdc1/9)==parseInt(hsdc2/9)) {lcx=0}
											configsuedecoq(sdcab, lcx)// Exploration sur l axe hsdc1-hsdc2
											if (scenario!=noeffect) {
                    							if (clickmethode) {enregistrescenarios()} else {return} 
                            				}
        							   }
        							}// nconfig
			}// jaxe
		}// lc
	}// i
}

function elaborevariantesuedecoq() {
	// Decodage du scenario et chargement des tableaux autrecasesdc1 (csvu1), nombresdc1, autrecasesdc (csvu), nombresdc et listeautreschiffres (qui donne le tableau autrechiffrecommun),
	// et des valeurs hsdc1, hsdc2 et hsdc3 (intersec)
	// utilise dans la grille (eliminationnumero)
	var re=/\d/g;
	var s0=scenario.split(tradacrit(" éliminés "))[1];
	nombresdc1=s0.split(" dans ")[0].toString().match(re);	
	var s1=s0.split(" dans ")[1];
	var sautre=s1.search(" et aussi ");
	variete=0;
	var listeautreschiffres="";
	if (sautre!=(-1)) {
	   var csvu1=s1.split(" et ")[0];
	   nombresdc=s1.split(" et aussi ")[1].toString().match(re);
	   var s2=s0.split(" dans ")[2];
	   var csvu=s2.split(tradacrit(" à partir de "))[0];
	   var s2b=s2.split("intersection ")[1];
	   var intersec=s2b.split(" entre ")[0];
	   if(intersec.length==5) {variete=0} else {variete=1}
	   if (csvu!="") {sueexpl(nombresdc, csvu)}
	   var scase=s0.split(" Les cases ")[1];
	   var csbase1=scase.split(" de l\'arme et ")[0];
	   var scaseplus=scase.split(" de l\'arme et ")[1];
	   var csbase=scaseplus.split(" de la soie ")[0];
	} else {
	   var csvu1=s1.split(tradacrit(" à partir de "))[1];
	}
	if (csvu1!=undefined ) {
		if (csvu1!="") {sueexpl(nombresdc1, csvu1)}
    	sautre=(s0.split(" dans ")[4]);// 3 si sautre previous undefined
		if (sautre!=undefined) {
    		sautre=sautre.search("du ou des chiffres : ");
        	if (sautre!=(-1)) {
        		var s3=s0.split("du ou des chiffres : ")[1];
        		var listeautreschiffres=s3.split(tradacrit(", à éliminer "))[0];
            	var intersec2=(s3.split(" : ")[1]).split(" .")[0];
				if (intersec2!="") {sueexpl(listeautreschiffres,intersec2)}
        	}
    	}
	}
	for (var i=0; i<nombresdc1.length; i++) {
		var chif=nombresdc1[i];
		decodevert(csbase1, chif); 
		decodevert(intersec, chif);
	}
	for (var i=0; i<nombresdc.length; i++) {
		var chif=nombresdc[i];
    		decodevert(csbase, chif);
			decodevertinter(intersec, chif);
	}
}

function decodevertinter(liste, m) {
	if (unevariante) {
			var s1=liste.split(" ");
			for (var i=0; i<s1.length; i++) {
    			var h=decodagecolPlace(s1[i].substring(0,2));
				if (s1[i].length==2) {miseauvert(h,m, BACKVERT)} else {break} 
			}
	}
}



function sueexpl(chif, cs) {
	if (typeof cs != 'undefined') {
    	var c=cs.split(" ");		 
    	for (var j=0; j<c.length; j++) {
    		if (c[j].length==2) {
				var d=decodagecolPlace(c[j]);
        		for (var i=0; i<chif.length;i++) {
    				var posk=contenu[d];
					if (posk.split(chif[i])[0].length<posk.length) {eliminationnumero(d, chif[i])}
        		}
    		}
    	}
	}
}

function configsuedecoq(nombre, llc) {
	var re=/\d/g;
	var casebase=new Array();
	var caseenplus=new Array();
	var nombreplus=new Array();
	autrecasesdc=[];
	if (llc<2) {casesdc1=[]; autrecasesdc1=[]}// Clears Arrays
	// Tester les cases contenant nombresdc1 sur l axe hsdc1-hsdc2 ou nombresdc dans le bloc commun hsdc1-hsdc2
	var nbbase=0;
	var nbplus=0;
	var icarre=carre[hsdc1]-1;
	for (var j=0; j<9; j++) {
		if (llc==0) {var h=9*parseInt(hsdc1/9)+j}
		if (llc==1) {var h=hsdc1-9*parseInt(hsdc1/9)+9*j}
		if (llc==2) {var h=j+6*parseInt(j/3)+18*parseInt(icarre/3)+3*icarre}
		var posk=contenu[h];
		if ((h!=hsdc1) && (h!=hsdc2)&& (h!=hsdc3) && (posk.length>1)) {
			var yest=false;
			for (var nn=0; nn<nombre.length; nn++) {
    			if ((posk.split(nombre[nn])[0].length<posk.length) && !yest) {// case contenant nombresdc1 ou nombresdc
    				//insertion ordonnee de h dans le tableau casebase
					for (var zc=0; zc<nbbase; zc++) {
						var hzc=casebase[zc];
						if (h<hzc) {
							for (var zd=nbbase; zd>zc; zd--) {casebase[zd]=casebase[zd-1]}
							casebase[zc]=h;
							break;
						}
					}
					if (zc==nbbase) {casebase[nbbase]=h}
					//casebase[nbbase]=h;
    				nbbase=nbbase+1;
					yest=true;
				}// posk split
			}// nn
			if (!yest) {
    				caseenplus[nbplus]=h;
    				nbplus=nbplus+1;
			}
		}// h!= hsdc1 ou hsdc2 ou hsdc3 
	}// j
	// Ajouter a casebase la ou les cases de caseenplus dont le contenu est partie de tous les chiffres des casebase deja vus (tableau nombreplus a construire) 
	// Construction du tableau nombreplus
	for (var jj=0; jj<casebase.length; jj++) {
		var ch=contenu[casebase[jj]].toString().match(re);
		for (var hnum=0; hnum<ch.length; hnum++) {
			for (var kk=0; kk<nombreplus.length; kk++) {
				if (ch[hnum]==nombreplus[kk]) {break}
			}
			if (kk==nombreplus.length) {nombreplus[kk]=ch[hnum]}
		}	
	}
	var kkk=0;
	// Ajout des cases de caseenplus dont le contenu est inclus dans nombreplus
	for (var jj=0; jj<caseenplus.length; jj++) {
		var h=caseenplus[jj];
		var ch=contenu[h].toString().match(re);
		for (var hnum=0; hnum<ch.length; hnum++) {
			for (var kk=0; kk<nombreplus.length; kk++) {
				if (ch[hnum]==nombreplus[kk]) {break}// chiffre inclus
			}
			if (kk==nombreplus.length) {break}// chiffre non contenu : voir case suivante
		}
		if (hnum==ch.length) {
    				//insertion ordonnée de h dans le tableau casebase
					for (var zc=0; zc<nbbase; zc++) {
						var hzc=casebase[zc];
						if (h<hzc) {
							for (var zd=nbbase; zd>zc; zd--) {casebase[zd]=casebase[zd-1]}
							casebase[zc]=h;
							break;
						}
					}
					if (zc==nbbase) {casebase[nbbase]=h}
					//casebase[nbbase]=h;
    				nbbase=nbbase+1;
				// Elimination de cette case du tableau caseenplus dans le tableau autrecasesdc (case candidate aux suppressions de chiffre)
		} else {
			autrecasesdc[kkk]=h;
			kkk=kkk+1;
		}	
	}
	// Extraire de casebase une configuration
	var nbchiffre=nombre.length;// chiffres de base
 	var nbcasemax=casebase.length;// ou nbbase
    var nbconf=Math.pow(2,nbcasemax);
    var nbconf2=nbconf.toString(2);
    var imax=nbconf2.length-1;
	for (var nconfig=0; nconfig<nbconf; nconfig++) {// Configurations de cases
       	 var ij=nconfig.toString(2);
         while (ij.length<imax) {ij="0"+ij}
		 var crefij=ij.match(re);
		 var nbcase=0;
		 for (var nbij=0; nbij<imax; nbij++) {
		 	 if (crefij[nbij]==1) {nbcase=nbcase+1}// Cases du masque selectionnees
		 }
		 var ajout=nbcase+1-nbchiffre;
		 if ((cas123) && (llc==2)) {ajout=ajout+1}
		 if (ajout>-1) {
			var ncase=0;
            var casesdc=new Array();
        	nombresdc=nombre[0].toString();
			for (var nnp=1; nnp<nombre.length; nnp++) {nombresdc=nombresdc+nombre[nnp]}
            var nombreajout=0;
    		for (var jj=(nbbase-1); jj>-1; jj--) {
                 // Test si position dans ij : position jj dans ij vaut 1
        		 if (ij.charAt(jj)==1) {// ajouter case
                       var posk=contenu[casebase[jj]];
                       var cref=posk.match(re);
        			   casesdc[ncase]=casebase[jj];
                       ncase=ncase+1;
        			   for (var neuf=0; neuf<cref.length; neuf++) {
                       	   var m=cref[neuf];
        				   var nombre0=nombresdc;
    					   var plus=true;
                           if (!(nombresdc.split(m)[0].length<nombresdc.length)) {// ajouter chiffre
                              nombreajout=nombreajout+1;
    						  // ajouter m dans nombresdc
                              var crefbase=nombresdc.toString().match(re);
                              for (var jcr=0; jcr<crefbase.length; jcr++) {
                              	  ipo=crefbase[jcr];
                                  if ((ipo>m)&& plus) {
                                  	 nombresdc=nombresdc.split(ipo)[0]+m+ipo+nombresdc.split(ipo)[1];                        			
        							 plus=false;
                                  }
                               }// jcr
                               if (nombre0==nombresdc) {nombresdc=nombresdc+m}
                           }// nombresdc split
                      }// neuf
                }//charAt
           	}// jj
			if (nombreajout==ajout) {//Sue de Coq : cases dans casesdc, chiffres dans nombresdc
				// cases de casebase non retenues, a ajouter a autrecasesdc et a retirer de casebase
				var iautre=autrecasesdc.length;
				var i=0;
				var nbbase0=nbbase;
				var cb0=new Array();
				for (var ib=0; ib<nbbase; ib++) {cb0[ib]=casebase[ib]}
				while (i<nbbase0) {
					if (crefij[i]=="0") {
						// ajouter a autrecasesdc
						autrecasesdc[iautre]=cb0[i];
						// et a retirer du tableau casebase
						for (var j=i; j<nbbase; j++) {
							casebase[j]=casebase[j+1];
						}
						nbbase=nbbase-1;
						iautre=iautre+1;
					}
					i=i+1;
				}
				if (llc<2) {
				   for (var k=0; k<casesdc.length; k++) {casesdc1[k]=casesdc[k]}
				   for (var k=0; k<autrecasesdc.length; k++) {autrecasesdc1[k]=autrecasesdc[k]}
				   nombresdc1=nombresdc;
				   var lc=2;
				   configsuedecoq(sdcxy, lc);
				   return
				} else {
				   if ((nombresdc1!=0) && (nombresdc!=0)) {// Sue de coq : Eliminer nombresdc1 dans autrecasesdc1 et nombresdc dans autrecasesdc				   
    				   var intersec=colPlace[hsdc1]+" "+colPlace[hsdc2];
    				   if (cas123) {intersec=colPlace[hsdc1]+" "+colPlace[hsdc2]+" "+colPlace[hsdc3]}
					   var csvu1="";
    				   for (var cv=0; cv<autrecasesdc1.length; cv++) {csvu1=csvu1+colPlace[autrecasesdc1[cv]]+" "} 
					   var csvu="";
    				   for (var cv=0; cv<autrecasesdc.length; cv++) {csvu=csvu+colPlace[autrecasesdc[cv]]+" "} 
    				   var csbase1="";
    				   for (var cv=0; cv<casesdc1.length; cv++) {if (carre[casesdc1[cv]]!=carre[hsdc1]) {csbase1=csbase1+colPlace[casesdc1[cv]]+" "}} 
    				   var csbase="";
    				   for (var cv=0; cv<casesdc.length; cv++) {csbase=csbase+colPlace[casesdc[cv]]+" "} 
    				   var lc=1;
    				   if (parseInt(hsdc1/9)==parseInt(hsdc2/9)) {lc=0}
    				   if (lc==0) {var codeasc=parseInt(hsdc1/9)+1} else {var codeasc=String.fromCharCode(65+hsdc1-9*parseInt(hsdc1/9))}    				   
					   if (csbase1!="") {
							if (lc==0) {wscen=tradacrit(" Sue de Coq  chiffres éliminés "+ nombresdc1+" dans "+csvu1+ " et aussi "+ nombresdc+" dans "+csvu +" à partir de l\'intersection "+ intersec+" entre ligne "+codeasc+" (arme) voyant "+csbase1+" et bloc "+carre[hsdc1]+" (soie) voyant "+csbase+". Les cases "+csbase1+" de l\'arme et "+csbase+" de la soie constituent un groupe fermé avec l\'intersection "+intersec+" par les chiffres "+nombresdc1+" et " +nombresdc+" (autant de chiffres que de cases sauf chiffres communs aux 3 groupes).")}
                			if (lc==1) {wscen=tradacrit(" Sue de Coq  chiffres éliminés "+ nombresdc1+" dans "+csvu1+ " et aussi "+ nombresdc+" dans "+csvu+" à partir de  l\'intersection "+  intersec+" entre colonne "+codeasc+" (arme) voyant "+csbase1+" et bloc "+carre[hsdc1]+" (soie) voyant "+csbase+". Les cases "+csbase1+" de l\'arme et "+csbase+" de la soie constituent un groupe fermé avec l\'intersection "+intersec+" par les chiffres "+nombresdc1+" et " +nombresdc+" (autant de chiffres que de cases sauf chiffres communs aux 3 groupes).")}
                			if (cas123) {wscen=tradacrit(" Sue de Coq  chiffres éliminés "+ nombresdc1+" dans "+csvu1+ " et aussi "+ nombresdc+" dans "+csvu +" à partir de  l\'intersection "+ intersec+" entre axe "+codeasc+" (arme) voyant "+csbase1+" et bloc "+carre[hsdc1]+" (soie) voyant "+csbase+". Les cases "+csbase1+" de l\'arme et "+csbase+" de la soie constituent un groupe fermé avec l\'intersection "+intersec+" par les chiffres "+nombresdc1+" et " +nombresdc+" (autant de chiffres que de cases sauf chiffres communs aux 3 groupes).")}
						   // Nombre de chiffres - ceux en double
        				   var nbch=nombresdc1.length+nombresdc.length;
						   var  ssd1=nombresdc1.toString().match(re)
						   var ssd=nombresdc.toString().match(re)
    					   autrechiffrecommun=[];
        				   var indiceautrechiffre=0;
        				   var listeautreschiffres="";
        				   for (var ic=0; ic<ssd.length; ic++) {
        				   	   var memechiffre=false;
        					   for (var jc=0; jc<ssd1.length; jc++) {
        					   	   if (ssd1[jc]==ssd[ic]) {memechiffre=true}
        					   }
        					   if (memechiffre) {autrechiffrecommun[indiceautrechiffre]=ssd[ic]; indiceautrechiffre=indiceautrechiffre+1; listeautreschiffres=listeautreschiffres+ssd[ic];} 						   
        					}
        				   // Nombre de cases
        				   var nbcase=casesdc1.length+casesdc.length+2;
        				   if (cas123) {nbcase=nbcase+1}
						   if (nbcase>(nbch-indiceautrechiffre)) {// Plus de cases que de chiffres --> les chiffres communs ne peuvent etre dans l\'intersection hsdc1, hsdc2 et eventuellement hsdc3
        				   	  if (listeautreschiffres.length>0) {
    							  wscen=wscen+tradacrit("<br>Lorsqu\'il y a plus de cases concernées (cases de l\'intersection + cases de l\'arme + cases de la soie = "+nbcase+" cases) que de chiffres dans ces cases ("+(nbch-indiceautrechiffre)+"), les chiffres communs aux 3 groupes ne peuvent se trouver dans l\'intersection. ");
            					  // Construire intersec2, liste des cases de intersec contenant les chiffres de listeautreschiffres
    							  var intersec2=construireintersection(listeautreschiffres, intersec);
    							  wscen=wscen+"Il s\'agit du ou des chiffres : "+listeautreschiffres+tradacrit(", à éliminer ");
    							  if (intersec2.length==3) {wscen=wscen+" de la case : "+intersec2} else {wscen=wscen+" des cases : "+intersec2}
							  }
        				   }
        				   for (var is=0; is<autrecasesdc1.length; is++) {
        					   for (var ic=0; ic<ssd1.length; ic++) {
        						   eliminationnumero(autrecasesdc1[is], ssd1[ic]);						   
        					   }
        				   }
 						   for (var is=0; is<autrecasesdc.length; is++) {
        					   for (var ic=0; ic<ssd.length; ic++) {
        						   eliminationnumero(autrecasesdc[is], ssd[ic]);
        					   }
        				   }
        				   for (var ic=0; ic<indiceautrechiffre; ic++) {
        					  	  eliminationnumero(hsdc1, autrechiffrecommun[ic]);
        					  	  eliminationnumero(hsdc2, autrechiffrecommun[ic]);
        					  	  if (cas123) {eliminationnumero(hsdc3, autrechiffrecommun[ic])}
        				   }
						   return;				   
					   }// csbase1!=""				   
					}// nombresdc1>0 et nombresdc>0
				}// llc<2
			}// nombreajout==ajout  
		 }// ajout>-1			  
	}// nconfig
}

function construireintersection(listech, intercases) {
		 // Construire la liste des cases de sortie inter2, à partir des cases de inter contenant au moins un chiffre du tableau liste
		 var re=/\d/g;
		 var inter2="";
		 var cc=intercases.split(" ");
		 var mm=listech.match(re);
		 for (var i=0; i<cc.length; i++) {
			 var jj=false;
		 	 var c=decodagecolPlace(cc[i]);
			 var posk=contenu[c]
			 // Test si la cas c contient au moins un chiffre de mm
			 for (var j=0; j<mm.length; j++) {
			 	 var m=mm[j];
				 if (posk.split(m)[0].length<posk.length) {jj=true}
			 }
			 if (jj) {inter2= inter2+cc[i]+" "} 
		 }
		 return inter2;
}

function chiffrecommun(a, caseautre) {
	var re=/\d/g;
	// Recherche chiffres des cases du tableau caseautre
	// Elles doivent toutes etre incluses dans a
	var retour="";
	for (var i=0; i<caseautre.length; i++) {// Liste des cases
		var posk=contenu[caseautre[i]];
		var cref=posk.match(re);
		for (var j=0; j<cref.length; j++) {// jeme chiffres dans la case i
			var yest=false;
			for (var m=0; m<a.length; m++) {if(cref[j]==a[m]){yest=true}}
			if (yest) {// Chiffre trouve
			   if (!((retour.length>0) && (retour.split(cref[j])[0].length<retour.length))) {// Chiffre pas deja trouve
    			  retour=retour+cref[j];
			   }
			} else {return 0} // pas de chiffre trouve --> pas de sue de coq
		}// j
	}// i
	return retour; 
}

function regroupement(aa, bb) {
	// regroupement des chiffres de a avec ceux de b
	var cc=bb;
	var n=cc.length;
	for (var i=0; i<aa.length; i++) {
		var yest=false;
		for (var j=0; j<bb.length; j++) {
			if (bb[j]==aa[i]) {yest=true}
		}
		if (!yest) {cc[n]=aa[i]; n=n+1}// aa[i] ajoute a cc
	}
	return cc;	
}

