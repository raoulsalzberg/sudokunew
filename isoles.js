function soloisole() {
	var re=/\d/g;
	for (var n=1; n<10; n++) { // Numero 
		var vu="";
		for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2) puis sudoku carre (lc=3)
			for (var i=0; i<9; i++) {// bloc
				var hv=0;
				for (var j=0; j<9; j++) {//  indice de case
					switch (lc) {
	  					case 0: // Ligne i
							var h=j+9*i;
							break;
	  					case 1: // Colonne i
							var h=i+9*j;
							break;
	  					case 2: // Carre i
							var h=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i; // Position j dans le carre i
							break;
						default:
							break;
					}// switch
    				var qisol=contenu[h].toString();
        			if (qisol==n) {hv=2}
					if ((qisol.split(n)[0].length<qisol.length) && (qisol.length>1)) {
        				   hv=hv+1;
    					   var hn=h;
					}
				}// j
				if (hv==1) {// Solo = seule case avec ce chiffre n
    					wscen="Solo " + n + " en "+ colPlace[hn];
						var svu=wscen;
						var ch=contenu[hn].toString().match(re);
    					if (lc==0) {wscen=wscen+" dans la ligne"}
    					if (lc==1) {wscen=wscen+" dans la colonne"}
    					if (lc==2) {wscen=wscen+" dans le bloc"}
    					for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] != n) {eliminationnumero(hn, ch[hnum])}}// hnum
						if (scenario!=noeffect) {
							if (vu!=svu) {
							    vu=svu;
    							variete=0;
        						if (clickmethode) {enregistrescenarios()} else {return}
							}
            			}
				}// hv
			}// i
		}// lc
	}// n
}

function elaborevariantesolo() {
		 // wscen=Solo n en H7
		 var re=/\d/g;
		 var s0=scenario.split("Solo ")[1];
		 var n=s0.substring(0,1);
		 var hn=decodagecolPlace(s0.split(" en ")[1]);
		 var ch=contenu[hn].toString().match(re);
		 for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] != n) {eliminationnumero(hn, ch[hnum])}}// hnum
		 if (unevariante){miseauvert(hn, n, BACKVERT)}		 
}

function jumeauxisoles() {
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""; lcprevious[ig]=3}
	ngratteciel=0;
	var liste=new Array(2);
	var lie=new Array(10);
	for (var i=0; i<10; i++) {lie[i]=""}
	var re=/\d/g;
	for (var lc=0;lc<3; lc++) {// lignes puis colonnes puis carres
		for (var i=0; i<9; i++) {
			for (var nber=1; nber<10; nber++) {lie[nber]=""}
			for (var j=0; j<9; j++) { 
			   switch (lc) {
			   		case 0:
						 var h=j+9*i;
						 break;
					case 1:
						 var h=i+9*j;
						 break;
					case 2:
						 var h=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i;
						 break;
					default:
						 break;
				}
				var ch=contenu[h].toString().match(re);
				// Chiffre ch[hnum] contenu en position j
				for (var hnum=0; hnum<ch.length; hnum++) {lie[ch[hnum]]=lie[ch[hnum]]+j}
			}// j
			// Recherche 2 valeurs egales dans lie, de longueur 2
			for (var k=1; k<10; k++) {
			  var posjd=lie[k].toString();
			  if (posjd!="") {
    			  var jd=posjd.match(re);// lie contient les positions pour chaque chiffre de 1 a 9
    			  if (jd.length==2) {
    				for (var l=k+1; l<10; l++) {
    					if (lie[l]==lie[k]) {// Jumeaux isoles
    					   for (var m=0; m<2; m++) {
                			   var jj=parseInt(jd[m]);
    						   switch (lc) {
                			   		case 0:
                						 var h=jj+9*i;
                						 break;
                					case 1:
                						 var h=i+9*jj;
                						 break;
                					case 2:
                						 var h=jj+6*parseInt(jj/3)+18*parseInt(i/3)+3*i;
                						 break;
                					default:
                						 break;
                				}
    							liste[m]=h;										   
    					   }			
    					   // 2 cases sur 9 contiennent les 2 chiffres, formant un jumeau isole
            			   if ((contenu[liste[0]].length>2) || (contenu[liste[1]].length>2)) {// Pas des jumeaux simples
            			   	  // jumeaux isoles
            				  wscen="Jumeaux isoles " + k+" "+l + " en "+ colPlace[liste[0]] + " et " + colPlace[liste[1]]+" Elimination ";
    						  for (var kk=0; kk<2;kk++) { 
            				  	  var hh=liste[kk];
                    			  var jum=contenu[hh].toString();
                    			  var jj1=jum.split(k)[0].length;// Position du chiffre1
                    			  var jj2=jum.split(l)[0].length;// Position du chiffre2
            					  var ch=jum.match(re);
    							  for (var hnum=0; hnum<ch.length; hnum++) {//position du petit chiffre
            					  	  if ((hnum!=jj1) && (hnum!=jj2)) {// Elimination des autres chiffres de la case
            							 wscen+=ch[hnum]+" dans "+colPlace[hh]+" ";
										 eliminationnumero(hh, ch[hnum]);
            		   				  }
            					   }
            				   }// kk
            				   // Pas de recherche autre
                    		   if (scenario!=noeffect) {
    						   	  	variete=0;
                                	if (clickmethode) {
                                		var ng0=colPlace[liste[0]]+colPlace[liste[1]];
        								testdoublonjumeau(ng0, lc);
                                	} else {
                                		return
                                	}
                    			}
            				}// length contenu				   					   
    					}// m
    				}// l
				}// posjd != ""
			  }// jd
			}//k
		}// i
	}// lc		 
}

function elaborevariantejumeauxisoles() {
		 // wscen=Jumeaux isoles xxxx .... en h2 et h3 Elimination n dans hh n dans hh
		 var s0=scenario.split("Jumeaux isoles ")[1];
		 var s1=s0.split(" en ")[1];
		 decodecaseautre(s1, s0.substring(0,1), s0.substring(2,3));
		 if (unevariante) {decodecaseverte(s1, s0.substring(0,1), s0.substring(2,3))}
}

function decodecaseautre(liste, m, p) {
	var s1=liste.split(" et ");
	var re=/\d/g;
	for (var i=0; i<s1.length; i++) {
		var h=decodagecolPlace(s1[i].substring(0,2));
		var decod=contenu[h];
		var ch=decod.match(re);
		for (var hnum=0; hnum<ch.length; hnum++) {if ((ch[hnum]!=m) && (ch[hnum]!=p)) {eliminationnumero(h,ch[hnum])}}
	}
}

function decodecaseverte(liste, m, p) {
	var s1=liste.split(" et ");
	var re=/\d/g;
	for (var i=0; i<s1.length; i++) {
		var h=decodagecolPlace(s1[i].substring(0,2));
		var decod=contenu[h];
		var ch=decod.match(re);
		for (var hnum=0; hnum<ch.length; hnum++) {if ((ch[hnum]==m) || (ch[hnum]==p)) {miseauvert(h,ch[hnum], BACKVERT)}}
	}
}

function triplesisoles() {
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	var re=/\d/g;
	indicearrivee=0;
	for (var lc=0;lc<3; lc++) {// lignes puis colonnes puis carres
		for (var i=0; i<9; i++) {
			var nomtot="";
			var contenutot="";
			var casetot="";
			for (var j=0; j<9; j++) {
			   switch (lc) {
			   		  case 0:
					  	   var h=j+9*i; // Ligne i colonne j
						   break;
					  case 1:
						   var h=i+9*j; // Colonne i ligne j
						   break;
					  case 2:
						   var h=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i; // Carre (i+1) position j dans le carre
						   break;
					  default:
						   break;
				}
				var cc=contenu[h];
				if(j==0) {var h0=h}
				if (contenu[h].length>1) {// cases a determiner
    				var cref=cc.match(re);
					contenutot=contenutot+contenu[h]+" ";
					casetot=casetot+colPlace[h]+" ";
					for (var hnum=0; hnum<cref.length; hnum++) {
    				   	var nxx=cref[hnum];
    					if (nomtot.length>0) {
    					   	  if (!(nomtot.split(nxx)[0].length<nomtot.length)) {
    						  	 var crnomtot=nomtot.match(re)
								 var nomplus="";
								 for (var itot=0; itot<crnomtot.length; itot++) {
								 	 var crxx=crnomtot[itot];
									 // insertion nxx dans nomtot
									 if (nxx>crxx) {nomplus=nomplus+crxx} else {nomplus=nomplus+nxx+crxx; nxx=10}
								 }
    							 if (nxx!=10) {nomplus=nomplus+nxx}
								 nomtot=nomplus;
							  }
    					} else {
    					  nomtot=nomtot+nxx;
    					}
    				}
				}
			}// j
			casetot=casetot.substring(0,(casetot.length-1));
			var pctot=casetot.split(" ");
			if ((pctot.length>2) && (pctot.length==nomtot.length)) {// au-dela des jumeaux et avec autant de cases que de chiffres
    			var caseavec=new Array(9);// cases contenant les ciffres : chiffre1, chiffre2 et chiffre3
    			contenutot=contenutot.substring(0,(contenutot.length-1));
				var contot=contenutot.split(" ");
				var ntot=nomtot.match(re);
				var n=ntot.length;// Nombre de chiffres, egal au nombre de cases a determiner
				for (var cavec=0; cavec<n; cavec++) {caseavec[cavec]=10}// Initialisation
				for (var n1=0; n1<(n-2); n1++) {
    				var chiffre1=ntot[n1];
					for (var n2=(n1+1); n2<(n-1); n2++) {
    					var chiffre2=ntot[n2];
						for (var n3=(n2+1); n3<n; n3++) {
    						var chiffre3=ntot[n3];
							// Combinaison chiffre1-chiffre2-chiffre3 a ne pas trouver dans (n-3) cases
							var nbr=0;
							var navec=0;							
							for (var csans=0; csans<n; csans++) {// Exploration du contenu des n cases
								var xx=contot[csans];
								if ((xx.split(chiffre1)[0].length<xx.length) || (xx.split(chiffre2)[0].length<xx.length) || (xx.split(chiffre3)[0].length<xx.length)) {
								   // xx contient au moins un des chiffres chiffre1, chiffre2 ou chiffre3
								   caseavec[navec]=pctot[csans];
								   navec=navec+1;
								} else {// case contenant au moins l'un des 3 chiffres chiffre1, chiffre2, chiffre3
								   //xx ne contient ni chiffre1, ni chiffre2, ni chiffre3
								   nbr=nbr+1;
								}
							}// csans
							if (nbr==(n-3)) {// triples isoles
            					  wscen=tradacrit("Triples isolés ") + chiffre1+chiffre2 +chiffre3+" en "+ caseavec[0] + ", " + caseavec[1]+ " et " + caseavec[2];
								  for (var fff=0; fff<3; fff++) {
										  var incp=autredecode(caseavec[fff]);
										  var ch=contenu[incp].toString().match(re);
										  for (var hnum=0; hnum<ch.length; hnum++) {
                                    	  	  if ((ch[hnum]!=chiffre1) && (ch[hnum]!=chiffre2)&& (ch[hnum]!=chiffre3)) {// Elimination des autres chiffres s'ils existent
                                    			 eliminationnumero(incp, ch[hnum]);
            								  }
            							  }
            					  }// fff
								  if (scenario!=noeffect) {
            						   	variete=0;
										if (clickmethode) {
                                        	var ng0=caseavec[0]+caseavec[1]+caseavec[2];
            								testdoublontriple(ng0);
                                        } else {
                                        	return
                                        }
            					  }							
							}// nbr==(n-3)
    					}// n3
    				}// n2
				}// n1
			}// postot.length
	   }// i
   }// lc
}

function elaborevariantetriplesisoles() {
		 // wscen=Triples isolés xxxx .... : h2 h3 h5
		 var s0=scenario.split(tradacrit("Triples isolés "))[1];
		 var s1=s0.split(" en ")[1];
		 decodecaseautretriple(s1.substring(0,2), s0.substring(0,1), s0.substring(1,2), s0.substring(2,3));
		 decodecaseautretriple(s1.substring(4,6), s0.substring(0,1), s0.substring(1,2), s0.substring(2,3));
		 decodecaseautretriple(s1.substring(10,12), s0.substring(0,1), s0.substring(1,2), s0.substring(2,3));
		 if (unevariante) {
    		 decodecasevertetriple(s1.substring(0,2), s0.substring(0,1), s0.substring(1,2), s0.substring(2,3));
    		 decodecasevertetriple(s1.substring(4,6), s0.substring(0,1), s0.substring(1,2), s0.substring(2,3));
    		 decodecasevertetriple(s1.substring(10,12), s0.substring(0,1), s0.substring(1,2), s0.substring(2,3));
		 }
}

function decodecaseautretriple(casetestee, m, p, q) {
		var re=/\d/g;
		var h=decodagecolPlace(casetestee);
		var decodt=contenu[h];
		var ch=decodt.match(re);
		for (var hnum=0; hnum<ch.length; hnum++) {if ((ch[hnum]!=m) && (ch[hnum]!=p) && (ch[hnum]!=q)) {eliminationnumero(h,ch[hnum])}}
}

function decodecasevertetriple(casetestee, m, p, q) {
		var re=/\d/g;
		var h=decodagecolPlace(casetestee);
		var decodt=contenu[h];
		var ch=decodt.match(re);
		for (var hnum=0; hnum<ch.length; hnum++) {if ((ch[hnum]==m) || (ch[hnum]==p) || (ch[hnum]==q)) {miseauvert(h,ch[hnum], BACKVERT)}}
}

function autredecode(xxlettre) {
	var vert=xxlettre.charCodeAt(0)-65;
	var hor=xxlettre.substring(1,2)-1;
	return hor*9+vert;
}


