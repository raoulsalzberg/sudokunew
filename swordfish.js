function swordfish() {// Modeles a 3 lignes (resp. colonnes) de 2 ou 3 cases
	for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	var P=9;
	var ligne  = new Array(P);
	var colonne=new Array(3);// axes pour sashimi
	var taille = new Array(P);
	var caseiseul = new Array(P);
	var casejseul = new Array(P);
	var casekseul = new Array(P);
	var casefish = new Array(P);
	var re=/\d/g;
	for (var i=0; i<9; i++) {ligne[i]=new Array(P)}	
	for (var i=0; i<9; i++) {casefish[i]=new Array(P)}	
	for (var n=1; n<10; n++) { // Chiffre
	for (var lc=0; lc<2; lc++) {
		var fac=9-8*lc;// lc=0 : ligne lc=1 : colonne
		// Recherche liens a 2 ou 3 case contenant le chiffre n
		for (var i=0; i<9; i++) {// Ligne 
    		var kl=0;
			for (var j=0; j<9; j++) {// Case dans la ligne (colonnes de cette ligne avec taille non nulle)
    			var h=fac*i+(10-fac)*j;
				var y=contenu[h];
        		if (y==n) {k1=0; break}
				if (y.split(n)[0].length<y.length) {
        			// Case trouvee contenant le chiffre n, kleme sur cette ligne
					ligne[i][kl]=j;// colonne correspondante (resp ligne)
					casefish[i][kl]=h;
					kl=kl+1;
				}
			}// Fin j
			taille[i]=kl;
		}// Fin i : Nombre de cases par ligne contenant n dans le tableau taille
		for (var i=0; i<7; i++) {// 1ere Ligne
			if ((taille[i]>1) && (taille[i]<6)) {
				for (var j=i+1; j<8; j++) {// 2eme Ligne
				if ((taille[j]>1) && (taille[j]<6)) {
					var kfranken=10;
					for (var k=j+1; k<9; k++) {// 3eme Ligne
					if ((k!=i) && (k!=j) && ((taille[k]>1) && (taille[k]<6)) && !((parseInt(i/3)==0) && (k==(i+2)))) {// Sauf 3 lignes adjacentes
						var uij=0;
						var uik=0;
						var ujk=0;
						var uijk=0;
						var vi=0;
						var vj=0;
						var vk=0
						var traverse=true;
						for (var kk=0; kk<taille[k]; kk++) {// Cases de la 3eme ligne k
									var colk=ligne[k][kk];
									// Verification que cette colonne colk traverse un bloc contenant une case de la ligne i ou une case de la ligne j
									if (!verifcol(i, j, colk, fac, casefish, taille[i], taille[j])) {traverse = false}// Eliminer ce cas
									var yest=false;
									for (var ii=0; ii<taille[i]; ii++) {
									   		if (colk==ligne[i][ii]) {yest=true}
									}
									if (!yest) {// Colonne de k pas dans i
    									var yestplus=false;
    								   	for (var jj=0; jj<taille[j]; jj++) {
    								   		if (colk==ligne[j][jj]) {yestplus=true}
    									}
										if (yestplus) {// Et colonne de k dans j
											ujk=ujk+1;
										} else {// Et colonne de k pas dans j mais traversant les blocs de i et j non isoles
    										casekseul[vk]=colk;
    										vk=vk+1;
											if (vk==2) {
												var colpre=casekseul[0];
												if (parseInt(colk/3)!=parseInt(colpre/3)) {vk=vk+1; break}//2 cases isolees pas dans le meme bloc
											}
										}
									} else {// colonne de k dans i
    									var yestplus=false;
    									for (var jj=0; jj<taille[j]; jj++) {
    								   		if (colk==ligne[j][jj]) {yestplus=true}
    									}
										if (!yestplus) {// Et colonne de k pas dans j
											uik=uik+1;
    									} else {// Et colonne de k dans j (les 3)
											uijk=uijk+1;
										}
									}
						}
						for (var ii=0; ii<taille[i]; ii++) {// Cases de la 1ere ligne i
								var coli=ligne[i][ii];
								// Verification que cette colonne coli traverse un bloc contenant une case de la ligne j ou une case de la ligne k
								if (!verifcol(j, k, coli, fac, casefish, taille[j], taille[k])) {traverse = false}// Eliminer ce cas
								// Verification que cette colonne coli contient une case de la ligne j ou traverse un bloc de case de la ligne j
								if (!verifcolfranken(j, coli, fac, casefish, taille[j])) {kfranken=0}// Eliminer ce cas franken
								var yest=false;
								for (var jj=0; jj<taille[j]; jj++) {
									if (coli==ligne[j][jj]) {yest=true}
								}
								if (yest) {// Colonne de i dans j
    								var yestplus=false;
    								for (var kk=0; kk<taille[k]; kk++) {
    									if (coli==ligne[k][kk]) {yestplus=true}
    								}
									if (!yestplus) {// Et colonne de i pas dans k
										uij=uij+1;
									}
								} else {// colonne de i pas dans j
    								var yestplus=false;
    								for (var kk=0; kk<taille[k]; kk++) {
    									if (coli==ligne[k][kk]) {yestplus=true}
    								}
									if (!yestplus) {// Et colonne de i pas dans k mais traversant les blocs de j et k
    									caseiseul[vi]=coli;
    									vi=vi+1;
										if (vi==2) {
											var colpre=caseiseul[0];
											if (parseInt(coli/3)!=parseInt(colpre/3)) {vi=vi+1; break}//2 cases isolees pas dans le meme bloc
										}
									}
								}
						}
						for (var jj=0; jj<taille[j]; jj++) {// Cases de la 2eme ligne j
								var colj=ligne[j][jj];
								// Verification que cette colonne colj traverse un bloc contenant une case de la ligne i ou une case de la ligne k
								if (!verifcol(i, k, colj, fac, casefish, taille[i], taille[k])) {traverse = false}// Eliminer ce cas
								// Verification que cette colonne colj contient une case de la ligne i  ou traverse un bloc de case de la ligne i
								if (!verifcolfranken(i, colj, fac, casefish, taille[i])) {kfranken=0}// Eliminer ce cas franken
								var yest=false;
								for (var ii=0; ii<taille[i]; ii++) {
									if (colj==ligne[i][ii]) {yest=true}
								}
								if (!yest) {// Colonne de j pas dans i
									var yestplus=false;
    								for (var kk=0; kk<taille[k]; kk++) {
    									if (colj==ligne[k][kk]) {yestplus=true}
    								}
									if (!yestplus) {// Et colonne de j pas dans k mais traversant les blocs de i et k
    									casejseul[vj]=colj;
    									vj=vj+1;
										if (vj==2) {
											var colpre=casejseul[0];
											if (parseInt(colj/3)!=parseInt(colpre/3)) {vj=vj+1; break}//2 cases isolees pas dans le meme bloc
										}
									}
								}
						}
						var pasde=false;
						if ((vi==0) && (vj==0) && ((taille[i]==3) || (taille[i]==4)) && ((taille[j]==2) || (taille[j]==3))) {// Franken sur ligne i et j avec bloc a determiner remplacant ligne k
								// Verifier vi=0 et vj=0 avec bloc Franken et non ligne k
								if (kfranken==10) {
									kfranken=k;
    								variete=3;
    								var pasde=franken(i, j, fac, taille, casefish, n); 			
        							if (pasde) {
        										var wscen0=wscen;
        										//if (hnageoire2==M) {wscen=wscen+" Finned avec nageoire "+colPlace[hnageoire]} else {wscen=wscen+" Finned Double avec nageoires "+colPlace[hnageoire]+" et "+colPlace[hnageoire2]}
												if (scenario!=noeffect) {scenario=wscen}
									} else {scenario=noeffect}
								}
                       	}
						if (!pasde) {
							if (traverse) {
    								if (lc==0) {wscen="Swordfish horizontal sur chiffre "+n+" par "}
                    				if (lc==1) {wscen="Swordfish vertical sur chiffre "+n+" par "}
    								for (var ii=0; ii<taille[i]; ii++) {wscen=wscen+colPlace[fac*i+(10-fac)*ligne[i][ii]]+" "}
    								for (var jj=0; jj<taille[j]; jj++) {wscen=wscen+colPlace[fac*j+(10-fac)*ligne[j][jj]]+" "}
    								for (var kk=0; kk<taille[k]; kk++) {wscen=wscen+colPlace[fac*k+(10-fac)*ligne[k][kk]]+" "}
    								wscen=wscen+". Elimination dans ";
    								if (((uij+uik+ujk+uijk)==3) && (vi==0) && (vj==0) && (vk==0)) {// Swordfish simple
											variete=0;
                							// Elimination sur colonnes communes
                							if (taille[i]==3) {var ligneref=i} else if (taille[j]==3) {var ligneref=j} else if (taille[k]==3) {var ligneref=k} else {var ligneref=10}
                							if (ligneref==10) {// toutes les colonnes de taille 2
                								// Chercher la 3eme colonne hors ligne i
                								var ligneref=i;
                								var trois=ligne[j][0];
                								if ((trois==ligne[i][0]) || (trois==ligne[i][1])) {trois=ligne[j][1]}
                							} else {
                								trois=ligne[ligneref][2];
                							}
                							for (var icol=0; icol<3; icol++) {
                								var col=ligne[ligneref][icol];
                								if (icol==2) {col=trois}
                								for (var ijk=0; ijk<9; ijk++) {
                									if ((ijk!=i) && (ijk!=j) && (ijk!=k)) {
                										var hs=fac*ijk+(10-fac)*col;
                										var posask=contenu[hs];
                										if ((posask.length>1) && (posask.split(n)[0].length<posask.length)) {
                											// Elimination n dans hs
                											wscen=wscen+colPlace[hs]+" ";
                											eliminationnumero(hs, n);											
                										}
                									}//ijk!=
                								}// ijk
                							}// icol
            						} else if (((uij+uik+ujk+uijk)==3) && (((vj==0) && (vk==0)) || ((vi==0) && (vk==0)) || ((vi==0) && (vj==0)))) {//Critere swordfish Finned  avec nageoire (s)				
        									variete=1;
											if ((vi>0) && (vi<3)) {var pasde=cherchenageoirefinned(vi, i, caseiseul, j, k, fac, taille, casefish, n)
        									} else if ((vj>0) && (vj<3)) {var pasde=cherchenageoirefinned(vj, j, casejseul, i, k, fac, taille, casefish, n)
        									} else if ((vk>0) && (vk<3)) {var pasde=cherchenageoirefinned(vk, k, casekseul, i, j, fac, taille, casefish, n)}
        									if (pasde) {
        										var wscen0=wscen;
        										if (hnageoire2==M) {wscen=wscen+" Finned avec nageoire "+colPlace[hnageoire]} else {wscen=wscen+" Finned Double avec nageoires "+colPlace[hnageoire]+" et "+colPlace[hnageoire2]}
        										if (scenario!=noeffect) {scenario=wscen}
        									} else {scenario=noeffect}
            						} else if (((uij+uik+ujk+uijk)==2) && ((vi>0) || (vj>0) || (vk>0))) {//Critere swordfish avec nageoire (s)				
										sashimi=true;
        									if ((vi<3) && (vj<3) && (vk==0)) {
        										if ((vi>0) && (vj==1)) {var pasde=cherchenageoire(vi, i, caseiseul, vj, j, casejseul, k, fac, taille, casefish,n)}
            									if ((vj>1) && (vi==1)) {var pasde=cherchenageoire(vj, j, casejseul, vi, i, caseiseul, k, fac, taille, casefish,n)}
        									} else if ((vi<3) && (vj==0) && (vk<3)) {
            									if ((vi>0) && (vk==1)) {var pasde=cherchenageoire(vi, i, caseiseul, vk, k, casekseul, j, fac, taille, casefish,n)}
            									if ((vk>1) && (vi==1)) {var pasde=cherchenageoire(vk, k, casekseul, vi, i, caseiseul, j, fac, taille, casefish,n)}
        									} else if ((vi==0) && (vj<3) && (vk<3)) {
												if ((vj>0) && (vk==1)) {var pasde=cherchenageoire(vj, j, casejseul, vk, k, casekseul, i, fac, taille, casefish,n)}
            									if ((vk>1) && (vj==1)) {var pasde=cherchenageoire(vk, k, casekseul, vj, j, casejseul, i, fac, taille, casefish,n)}
        									} else {var pasde=false}
        									if (pasde) {
        										var wscen0=wscen;
        										if (hnageoire2==M) {wscen=wscen+" Finned avec nageoire "+colPlace[hnageoire]} else {wscen=wscen+" Finned Double avec nageoires "+colPlace[hnageoire]+" et "+colPlace[hnageoire2]}
        										if (sashimi) {variete=2; if (hnageoire2==M) {wscen=wscen0+" Finned Sashimi avec nageoire "+colPlace[hnageoire]} else {wscen=wscen0+" Finned Sashimi Double avec nageoires "+colPlace[hnageoire]+" et "+colPlace[hnageoire2]}}
        										if (scenario!=noeffect) {scenario=wscen}
        									} else {scenario=noeffect}
            						} else if (((vi==1) && (vj==0) && (vk==0) && (uij+uik+ujk+uijk)==4)) {var pasde=cherchenageoirequadruple(vi, i, caseiseul, j, k, fac, taille, casefish, n)//Critere swordfish quadruple
        									if (pasde) {variete=2; wscen=wscen+" Finned Sashimi Quadruple avec nageoires "+quadruplenageoire; scenario=wscen} else {scenario=noeffect}
    								} else if (((vi==0) && (vj==1) && (vk==0) && (uij+uik+ujk+uijk)==4)) {var pasde=cherchenageoirequadruple(vj, j, casejseul, i, k, fac, taille, casefish, n)
        									if (pasde) {variete=2; wscen=wscen+" Finned Sashimi Quadruple avec nageoires "+quadruplenageoire; scenario=wscen} else {scenario=noeffect}
    								} else if (((vi==0) && (vj==0) && (vk==1) && (uij+uik+ujk+uijk)==4)) {var pasde=cherchenageoirequadruple(vk, k, casekseul, i, j, fac, taille, casefish, n) 			
        									if (pasde) {variete=2; wscen=wscen+" Finned Sashimi Quadruple avec nageoires "+quadruplenageoire; scenario=wscen} else {scenario=noeffect}
    								}// critere swordfish finned et double finned et sashimi
								}// pasde
								}// traverse
								if (scenario!=noeffect) {
										 if (clickmethode) {
											var ng=wscen.split(". Elimination dans ")[1];
											var tg=true;
											if ((ngratteciel>0) && FILTRAGEDESSOLUTIONS) {
    											for (var ig=0; ig<ngratteciel; ig++) {
    												var ngg=gratteciel[ig];
     												if (ng==ngg) {tg=false}
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
					 }}// k et k!= 
				  }}// j et j!=
			}}// i	et i!=	   
	}}// Fin lc et n
}

function verifcol(lin1, lin2, colon, facteur, casesenplus, long1, long2) {// Verification que colon traverse lin1 ou lin2
	var axebloc=parseInt(colon/3);
	for (var i=0; i<long1; i++) {
		var h=casesenplus[lin1][i];
		if (facteur==9) {var krit=(carre[h]-1)%3} else {var krit=parseInt((carre[h]-1)/3)}
		if (krit==axebloc) {return true}
	}
	for (var i=0; i<long2; i++) {
		var h=casesenplus[lin2][i];
		if (facteur==9) {var krit=(carre[h]-1)%3} else {var krit=parseInt((carre[h]-1)/3)}
		if (krit==axebloc) {return true}
	}
	return false;
}

function verifcolfranken(lin1, colon, facteur, casesenplus, long1) {// Verification que colon traverse lin1 
	var axebloc=parseInt(colon/3);
	for (var i=0; i<long1; i++) {
		var h=casesenplus[lin1][i];
		if (facteur==9) {var krit=(carre[h]-1)%3} else {var krit=parseInt((carre[h]-1)/3)}
		if (krit==axebloc) {return true}
	}
	return false;
}

function franken(autre1, autre2, facteur, long, casesenplus, nplus) {
	var caseeni="";
	for (var i=0; i<long[autre1]; i++) {caseeni=caseeni+colPlace[casesenplus[autre1][i]]+" "}
	var caseenj="";
	for (var i=0; i<long[autre2]; i++) {caseenj=caseenj+colPlace[casesenplus[autre2][i]]+" "}
	var col=new Array(4);
	var col0=10;
	var col1=10;
	var col2=10;
	var ijk="";
	// Colonnes transverses adjacentes col1 et col2, autre col0
    	var hautre=casesenplus[autre1][0];
    	var colonne=parseInt(hautre/9);
    	if (colonne==autre1) {colonne=hautre-9*colonne}
		col[0]=colonne;
              	var hautre=casesenplus[autre1][1];
              	var colonne=parseInt(hautre/9);
              	if (colonne==autre1) {colonne=hautre-9*colonne}
    			col[1]=colonne;
				if (parseInt(col[0]/3)==parseInt(col[1]/3)) {// colonnes adjacentes 0 et 1 dans meme bloc
					ijk="01";	
				}
                      	var hautre=casesenplus[autre1][2];
                      	var colonne=parseInt(hautre/9);
                      	if (colonne==autre1) {colonne=hautre-9*colonne}
            			col[2]=colonne;
        				if (parseInt(col[1]/3)==parseInt(col[2]/3)) {// colonnes adjacentes 1 et 2 dans meme bloc
        					if (ijk=="01") {// colonnes adjacentes 0, 1 et 2 dans meme bloc
        						ijk="012";
							} else {// colonnes adjacentes 1, 2 dans meme bloc sans 0
								ijk="12";
							}
        				} 
						if (long[autre1]==4) {
                          	var hautre=casesenplus[autre1][3];
                          	var colonne=parseInt(hautre/9);
                          	if (colonne==autre1) {colonne=hautre-9*colonne}
                			col[3]=colonne;
    						if (parseInt(col[2]/3)==parseInt(col[3]/3)) {// colonnes adjacentes 2 et 3 dans meme bloc
            					if (ijk=="12") {// colonnes adjacentes 1, 2 et 3 dans meme bloc sans 0
            						ijk="123";
    							} else if (ijk!="012") {return false}// colonnes 0, 1 et 2 dans meme bloc sinon exit
            				}
						
						} 
		hnageoire=M;
		hnageoire2=M;
	if(long[autre1]==4) {// Finned Franken
        var hautre=casesenplus[autre1][3];
        var colonne=parseInt(hautre/9);
        if (colonne==autre1) {colonne=hautre-9*colonne}
    	col[3]=colonne;
		// colonnes adjacentes avec 3 dans meme bloc
		if ((parseInt(col[0]/3)==parseInt(col[3]/3)) || (parseInt(col[1]/3)==parseInt(col[3]/3)) || (parseInt(col[2]/3)==parseInt(col[3]/3))) {
			ijk=ijk+"3";// 7 cas :013 023 123 et 03 13 23  il ne peut y avoir 4 cases adjacentes ni 0 case adjacente (ni "" ni 0123) sauf cas 2 et 2
		}// autre 01 02 12 012 ou seul 012 valide
		if (ijk.length==2) {return false}// Il faut 3 cases adjacentes et une 4eme case : col0
		// Decodage ijk col pour identifier col0, col1, col2 et col4
		var int1=parseInt(ijk.substring(0,1));
		var int2=parseInt(ijk.substring(1,2));		
    	var int3=parseInt(ijk.substring(2,3));		
		var col1=col[int1];
		var col2=col[int2];		
    	var col3=col[int3];		
    	var hcolautre1=facteur*autre2+(10-facteur)*col1;
    	var posak1=contenu[hcolautre1];         
    	var hcolautre2=facteur*autre2+(10-facteur)*col2;
    	var posak2=contenu[hcolautre2];         
        var hcolautre3=facteur*autre2+(10-facteur)*col3;
        var posak3=contenu[hcolautre3];         
        var visavis1=((posak1.length>1) &&  (posak1.split(nplus)[0].length<posak1.length));// col1 sans vis-a-vis = nageoire
        var visavis2=((posak2.length>1) &&  (posak2.split(nplus)[0].length<posak2.length));// col2 sans vis-a-vis = nageoire
        var visavis3=((posak3.length>1) &&  (posak3.split(nplus)[0].length<posak3.length));// col3 sans vis-a-vis = nageoire
		if ((visavis1 && visavis2 && visavis3) || (!visavis1 && !visavis2 && !visavis3)) {return false}// Il faut au moins une nageoire, mais il n'en faut pas 3
		// Gestion lourde des vis-a-vis
		if (!visavis1) {// Finned sur col1
			hnageoire=facteur*autre1+(10-facteur)*col1;
    		if (!visavis2) {// Double Finned sur col1 et col2
    			hnageoire2=facteur*autre1+(10-facteur)*col2;
				// Echange col1 et col3
				var colint=col3;
				col3=col1;
				col1=colint;
			} else if (!visavis3) {// Double Finned sur col1 et col3
    			hnageoire2=facteur*autre1+(10-facteur)*col3;
				// Echange col1 et col2
				var colint=col2;
				col2=col1;
				col1=colint;
			} else {// Finned sur col1
				// Echange col1 et col3
				var colint=col3;
				col3=col1;
				col1=colint;			
			}			
		} else if (!visavis2) {// Finned sur col2
			hnageoire=facteur*autre1+(10-facteur)*col2;
    		if (!visavis3) {// Double Finned sur col2 et col3
    			hnageoire2=facteur*autre1+(10-facteur)*col3;			
			} else {// Finned sur col2
				// Echange col2 et col3
				var colint=col2;
				col2=col3;
				col3=colint;
			}		
		} else if (!visavis3) {//Finned sur col3
			hnageoire=facteur*autre1+(10-facteur)*col3;
		}
		// Bilan : col1 avec vis-a-vis et col3 sans vis-a-vis (nageoire), si col2 avec vis-a-vis --> Finned avec nageoire col3, sinon, Double Finned avec nageoires col2 et col3
		// Recherche col0 = 4eme case du tableau col : ni int1, ni int2, ni int3 = non incluse dans ijk
    		var int0=0;
    		while (ijk.split(int0)[0].length<ijk.length) {
				int0=int0+1;
			}
    		var col0=col[int0];
        	var hcolautre0=facteur*autre2+(10-facteur)*col0;
        	var posak0=contenu[hcolautre0];         
            if (!((posak0.length>1) &&  (posak0.split(nplus)[0].length<posak0.length))) {return false}// pas de vis-a-vis de la case non adjacente
	} else {// Franken
		// Decodage ijk col pour identifier col0, col1, col2
		if ((ijk.length==3)|| (ijk.length==0)) {return false}// 3 cases adjacentes ou aucune case adjacente
		var int1=parseInt(ijk.substring(0,1));
		var int2=parseInt(ijk.substring(1,2));		
		var col1=col[int1];
		var col2=col[int2];		
    	var hcolautre2=facteur*autre2+(10-facteur)*col1;
    	var posak1=contenu[hcolautre2];         
    	var hcolautre2=facteur*autre2+(10-facteur)*col2;
    	var posak2=contenu[hcolautre2];         
        if (!((posak1.length>1) &&  (posak1.split(nplus)[0].length<posak1.length)) && !((posak2.length>1) &&  (posak2.split(nplus)[0].length<posak2.length))) {return false}// aucun vis-a-vis des cases adjacentes
		// verifier si la ligne autre2 ne contient pas une cas supplementaire non vue de la ligne autre1 
		// Recherche col0
		var int0=0;
		if ((int0==int1) || (int0==int2)) {int0=1}
		if ((int0==int1) || (int0==int2)) {int0=2}
		var col0=col[int0];
    	var hcolautre2=facteur*autre2+(10-facteur)*col0;
    	var posak0=contenu[hcolautre2];         
        if (!((posak0.length>1) &&  (posak0.split(nplus)[0].length<posak0.length))) {return false}// pas de vis-a-vis de la case non adjacente
		// verifier si la ligne autre2 a une case non contenue dans col0, col1 ou col2
		for (var ic2=0; ic2<long[autre2]; ic2++) {
        	var hautre=casesenplus[autre2][ic2];
        	var colonne=parseInt(hautre/9);
        	if (colonne==autre2) {colonne=hautre-9*colonne}
			if ((colonne!=col0) && (colonne!=col1) && (colonne!=col2)) {return false}		
		}
	}
	if (col0==10) {return false}// autre1 sans col0
	// Recherche colonne transverse col3 adjacente de col1 et col2
	var residu1=col1%3;
    var residu2=col2%3;
    var residu3=(col1+1)%3;
    if (residu3==residu2) {residu3=(col1+2)%3}
    var col3=col1+residu3-residu1;
	// Recherche bloc ii, croisant col1 (et col2) et hors blocs autre1 et autre2
	var bloc1=carre[facteur*autre1+(10-facteur)*col1];
	var bloc2=carre[facteur*autre2+(10-facteur)*col1];
	var alfa=3;
	if (facteur==1) {alfa=1}
	var ii=bloc1+alfa;
	if (ii==bloc2) {ii=ii+alfa}
	if (parseInt((bloc1-1)/3)==1) {ii=bloc1-alfa}
	// Cases de la colonne col3 dans bloc ii ne doivent pas contenir nplus, ailleurs non plus, sauf nageoire sur autre1
	for (var k3=0; k3<9; k3++) {// balayage axe col3
		var h=facteur*k3+(10-facteur)*col3;
		if (carre[h]==ii) {//Pas de case autorise sur cet axe col3 dans bloc ii
			var posxk=contenu[h];
    		if ((posxk.length>1) &&  (posxk.split(nplus)[0].length<posxk.length)) {
				return false;
			}
		}
		// Nageoire possible sur ligne autre1
		if (k3==autre1) {
			var posyk=contenu[h];
    		if ((posyk.length>1) &&  (posyk.split(nplus)[0].length<posyk.length)) {
				hnageoire=h;		
			}
		}
	}
	// Cases des colonnes col1 et  col2 dans bloc ii doivent contenir nplus
	var pasde1=false;
	var pasde2=false;
	for (var k12=0; k12<9; k12++) {// balayage axes col1 et col2
		var h1=facteur*k12+(10-facteur)*col1;
		if (carre[h1]==ii) {//Il faut une case sur cet axe col1 dans bloc ii
			var poszk=contenu[h1];
    		if ((poszk.length>1) &&  (poszk.split(nplus)[0].length<poszk.length)) {pasde1=true}
		}
		var h2=facteur*k12+(10-facteur)*col2;
		if (carre[h2]==ii) {//Il faut une case sur cet axe col2 dans bloc ii
			var postk=contenu[h2];
    		if ((postk.length>1) &&  (postk.split(nplus)[0].length<postk.length)) {pasde2=true}
		}
	}
	if (!pasde1 || !pasde2) {return false}
	// Cases swordfish dans axes autre1 et autre2
	if (facteur==9) {wscen="Swordfish horizontal sur chiffre "+nplus+" par "}
    if (facteur==1) {wscen="Swordfish vertical sur chiffre "+nplus+" par "}
	for (var jj=0; jj<long[autre1]; jj++) {wscen=wscen+colPlace[casesenplus[autre1][jj]]+" "}
	for (var jj=0; jj<long[autre2]; jj++) {wscen=wscen+colPlace[casesenplus[autre2][jj]]+" "}
	// Ajout des cases de col1 et col2, du bloc ii et contenant nplus (ouf !)
	for (var k12=0; k12<9; k12++) {// balayage axes col1 et col2 dans bloc ii
			var h1=facteur*k12+(10-facteur)*col1;
    		if (carre[h1]==ii) {
    			var posuk=contenu[h1];
    			if ((posuk.length>1) &&  (posuk.split(nplus)[0].length<posuk.length)) {wscen=wscen+colPlace[h1]+" "}//Dans le swordfish
			}
			var h2=facteur*k12+(10-facteur)*col2;
    		if (carre[h2]==ii) {
    			var posvk=contenu[h2];
    			if ((posvk.length>1) &&  (posvk.split(nplus)[0].length<posvk.length)) {wscen=wscen+colPlace[h2]+" "}//Dans le swordfish
			}
	}
	wscen=wscen+". Elimination dans ";
	// Exploration des cases a modifier sur axes col0, col1 et col2, non incluses sur les axes autre1 et autre2, et pas dans bloc de ii
	for (var i=0; i<9; i++) {
		if((i!=autre1) && (i!=autre2)) {
    		if (hnageoire==M) {
    			var h0=facteur*i+(10-facteur)*col0;
    			var poswk=contenu[h0];
    			if ((poswk.length>1) && (poswk.split(nplus)[0].length<poswk.length)) {
            			// Elimination nplus dans h0
                        wscen=wscen+colPlace[h0]+" ";
                        eliminationnumero(h0, nplus);
				}
    		}
			var h1=facteur*i+(10-facteur)*col1;
    		var h2=facteur*i+(10-facteur)*col2;
			if (carre[h2]!=ii) {// ou carre[h1]
    			if ((hnageoire==M) || (carre[h1]==carre[hnageoire])) {
					var posqk=contenu[h1];
        			if ((posqk.length>1) && (posqk.split(nplus)[0].length<posqk.length)) {
                			// Elimination nplus dans h1
                            wscen=wscen+colPlace[h1]+" ";
                            eliminationnumero(h1, nplus);																		
        			}
        		}
    			if ((hnageoire==M) || (carre[h2]==carre[hnageoire])) {
    				var posa2k=contenu[h2];
            		if ((posa2k.length>1) && (posa2k.split(nplus)[0].length<posa2k.length)) {
                   			// Elimination nplus dans h2
                             wscen=wscen+colPlace[h2]+" ";
                             eliminationnumero(h2, nplus);																		
            		}
				}
    		}
		}
	}// i
	if (facteur==9) {
		wscen=wscen+" Franken avec bloc "+ii+" (blocs numerotes de 1 a 9 a partir du coin en haut et a gauche), lignes "+(autre1+1)+" et "+(autre2+1)+", colonnes transversales "+String.fromCharCode(65+col0)+" "+String.fromCharCode(65+col1)+" "+String.fromCharCode(65+col2)+" et colonne d\'exclusion du bloc et des 2 lignes : "+String.fromCharCode(65+col3);
	} else {
		wscen=wscen+" Franken avec bloc "+ii+" (blocs numerotes de 1 a 9 a partir du coin en haut et a gauche), colonnes "+String.fromCharCode(65+autre1)+" et "+String.fromCharCode(65+autre2)+", lignes transversales "+(col0+1)+" "+(col1+1)+" "+(col2+1)+" et ligne d\'exclusion du bloc et des 2 colonnes : "+(col3+1);
	}  
	if (hnageoire!=M) {wscen=wscen+" Finned avec nageoire "+colPlace[hnageoire]}
	return true;
}

function validationgrille(ix, iy, iz, maxijk, lscases, nn, nby, soly, facto) {
	var hz0=M;
	var hz1=M;
	var hy0=M;
	var hy1=M;
	for (var z=0; z<maxijk[iz]; z++) {
		var hz=lscases[iz][z];
		// axe transverse colz
		var colz=parseInt(hz/9);
        if (colz==iz) {colz=hz-9*colz}
		for (var y=0; y<maxijk[iy]; y++) {
			var hy=lscases[iy][y];
    		var coly=parseInt(hy/9);
    		if (coly==iy) {coly=hy-9*coly}
			if (coly==colz) {if (hy0==M) {var hy0=hy; hz0=hz} else {hy1=hy; hz1=hz}}
		}
	}
	var hnage=M;
	for (var z=0; z<maxijk[iz]; z++) {
		var hz=lscases[iz][z];
    	if ((hz!=hz0) && (hz!=hz1)) {
      		// axe transverse colz
      		var colz=parseInt(hz/9);
        	if (colz==iz) {colz=hz-9*colz}
      		for (var y=0; y<maxijk[iy]; y++) {
      			var hy=lscases[iy][y];
          		var coly=parseInt(hy/9);
          		if (coly==iy) {coly=hy-9*coly}
          		if ((hy!=hy0) && (hy!=hy1)) {
      				// axe transverse coly
          			if (coly!=colz) {
          				for (var x=0; x<maxijk[ix]; x++) {
                  				var hx=lscases[ix][x];
                          		var colx=parseInt(hx/9);
                          		if (colx==ix) {colx=hx-9*colx}
              					if ((colx==colz) || (colx==colz)) {//Couverture par case sur swordfish
								} else {// Couverture case isolee
    								// axe transverse colx verification sur axe bloc de coly ou de colz
                  					if ((parseInt(colx/3)!=parseInt(coly/3)) && (parseInt(colx/3)!=parseInt(colz/3))) {// Axe ix non couvert par l'un des axes iy ou iz
        								var hnage=facto*iy+(10-facto)*soly[0];
        								var colnage=soly[0];
										if (parseInt(colx/3)!=parseInt(colnage/3)) {return false} 
        							}
								}
                  			}// x
          			}// coly!=colz
          		}//hy !=
      		}// y
		}// hz!=
	}// z
	return true;
}

function cherchenageoire(nbrnag, ligneref, colnag, nbrnagautre, autre1, colnagautre, autre2, facteur, long, casesenplus, nplus) {//
	if (long[autre1]==nbrnagautre) {return false}//Pas de nageoires seules sur autre case
	if (!validationgrille(ligneref, autre1, autre2, long, casesenplus, nplus, nbrnagautre, colnagautre, facteur)) {return false}
	hnageoire=facteur*ligneref+(10-facteur)*colnag[0];
	var col0=colnag[0];
	var coltrou1=(col0%3+1)%3+3*parseInt(col0/3);
	var coltrou2=(col0%3+2)%3+3*parseInt(col0/3);
	var htrou1=facteur*ligneref+(10-facteur)*coltrou1;
	var htrou2=facteur*ligneref+(10-facteur)*coltrou2
    var residu=ligneref%3; 
    var ligcase1=(ligneref%3+1)%3+3*parseInt(ligneref/3);
    var ligcase2=(ligneref%3+2)%3+3*parseInt(ligneref/3);
	hnageoire2=M;
	if(nbrnag==2) {// 2 nageoires : chercher Finned Double 
    	hnageoire2=facteur*ligneref+(10-facteur)*colnag[1];
    	if (carre[hnageoire2]!=carre[hnageoire]) {return false}// Meme bloc de nageoires necessaire sur l'axe ligneref
		if (hnageoire2==htrou1) {htrou1=htrou2; coltrou1=coltrou2}
		htrou2=M//Trou egal a 2eme nageoire : le supprimer
	}
									// Verifier si htrou1 ou htrou2 fait partie du swordfish (Finned) ou pas (Finned Sashimi)									
                					for (var p=0; p<long[ligneref]; p++) {
                						if (htrou1==casesenplus[ligneref][p]) {sashimi=false}
                						if (htrou2==casesenplus[ligneref][p]) {sashimi=false}
                					}
	// 1er trou
	// Verification cases du swordfish vue de ce trou
	var haxe1=facteur*autre1+(10-facteur)*coltrou1;// Croisement ligne autre1 avec colonne du trou1
	var haxe2=facteur*autre2+(10-facteur)*coltrou1;// Croisement ligne autre2 avec colonne du trou1
					var haxe=M;
					for (var p=0; p<long[autre1]; p++) {
						if (haxe1==casesenplus[autre1][p]) {haxe=haxe1}
					}
					for (var p=0; p<long[autre2]; p++) {// possible
						if (haxe2==casesenplus[autre2][p]) {haxe=haxe2}
					}
	if (haxe!=M) {// Si case du swordfish en face de ce trou ou faux trou (si cette case htrou1 fait partie du swordfish)
		// Suppression autour de ce trou sur axe coltrou1 : case hcase1 et hcase2
    	var hcase1=(10-facteur)*coltrou1+facteur*ligcase1;// Croisement ligne ligcase1 avec colonne du trou1
    	var hcase2=(10-facteur)*coltrou1+facteur*ligcase2;// Croisement ligne ligcase2 avec colonne du trou1
    					// Verification hcase1 et hcase2 pas dans le swordfish 
    					var pasde1=true;
    					var pasde2=true;
    					for (var p=0; p<long[autre1]; p++) {
    						if (hcase1==casesenplus[autre1][p]) {pasde1=false}
    						if (hcase2==casesenplus[autre1][p]) {pasde2=false}
    					}
    					for (var p=0; p<long[autre2]; p++) {
    						if (hcase1==casesenplus[autre2][p]) {pasde1=false}
    						if (hcase2==casesenplus[autre2][p]) {pasde2=false}
    					}
    					if (pasde1) {// hcase1 pas dans le swordfish
        					var posak=contenu[hcase1];
            				if ((posak.length>1) && (posak.split(nplus)[0].length<posak.length)) {// Yes
    								// Elimination nplus dans hcase1
                    				wscen=wscen+colPlace[hcase1]+" ";
                    				eliminationnumero(hcase1, nplus);
            				}
    					}    				
    					if (pasde2) {// hcase2 pas dans le swordfish
        					var posa3k=contenu[hcase2];
            				if ((posa3k.length>1) && (posa3k.split(nplus)[0].length<posa3k.length)) {// Yes
    								// Elimination nplus dans hcase2
                    				wscen=wscen+colPlace[hcase2]+" ";
                    				eliminationnumero(hcase2, nplus);															
            				}
    					}
	}// haxe!=M
	// Second trou si il existe (pas de 2eme nageoire) : rebelote
	if (hnageoire2==M) {
		// Verification case du swodfish vue de ce trou
    	var haxe1=facteur*autre1+(10-facteur)*coltrou2;// Croisement ligne autre1 avec colonne du trou2
    	var haxe2=facteur*autre2+(10-facteur)*coltrou2;// Croisement ligne autre2 avec colonne du trou2
    	var haxe=M;
    					for (var p=0; p<long[autre1]; p++) {
    						if (haxe1==casesenplus[autre1][p]) {haxe=haxe1}
    					}
    					for (var p=0; p<long[autre2]; p++) {// possible
    						if (haxe2==casesenplus[autre2][p]) {haxe=haxe2}
    					}
		if (haxe!=M) {// Si case du swordfish en face de ce trou ou faux trou (si cette case htrou2 fait partie du swordfish)
        	// Suppression autour de ce trou sur axe coltrou2 : case hcase3 et hcase4
        	var hcase3=(10-facteur)*coltrou2+facteur*ligcase1;// Croisement ligne ligcase1 avec colonne du trou2
        	var hcase4=(10-facteur)*coltrou2+facteur*ligcase2;// Croisement ligne ligcase2 avec colonne du trou2
        					// Verification hcase3 et hcase4 pas dans le swordfish
        					var pasde1=true;
        					var pasde2=true;
        					for (var p=0; p<long[autre1]; p++) {
        						if (hcase3==casesenplus[autre1][p]) {pasde1=false}
        						if (hcase4==casesenplus[autre1][p]) {pasde2=false}
        					}
        					for (var p=0; p<long[autre2]; p++) {
        						if (hcase3==casesenplus[autre2][p]) {pasde1=false}
        						if (hcase4==casesenplus[autre2][p]) {pasde2=false}
        					}
 							if (pasde1) {// hcase3 pas dans le swordfish
            					var posak=contenu[hcase3];
                				if ((posak.length>1) && (posak.split(nplus)[0].length<posak.length)) {// Yes
        								// Elimination nplus dans hcase3
                        				wscen=wscen+colPlace[hcase3]+" ";
                        				eliminationnumero(hcase3, nplus);															
                				}
        					}
            				if (pasde2) {// hcase4 pas dans le swordfish
            					var posa4k=contenu[hcase4];
                				if ((posa4k.length>1) && (posa4k.split(nplus)[0].length<posa4k.length)) {// Yes
        								// Elimination nplus dans hcase4
                        				wscen=wscen+colPlace[hcase4]+" ";
                        				eliminationnumero(hcase4, nplus);															
                				}
							}
		}//haxe !=M
	}// hnageoire2==M
	return (scenario!=noeffect);
}

function cherchenageoirefinned(nbrnag, ligneref, colnag, autre1, autre2, facteur, long, casesenplus, nplus) {//
	hnageoire=facteur*ligneref+(10-facteur)*colnag[0];
	var col0=colnag[0];
	var coltrou1=(col0%3+1)%3+3*parseInt(col0/3);
	var coltrou2=(col0%3+2)%3+3*parseInt(col0/3);
	var htrou1=facteur*ligneref+(10-facteur)*coltrou1;
	var htrou2=facteur*ligneref+(10-facteur)*coltrou2;
	var colbase=10;// Colonne fausse par defaut	
	hnageoire2=M;
	if(nbrnag==2) {// 2 nageoires : chercher Finned Double 
    	hnageoire2=facteur*ligneref+(10-facteur)*colnag[1];
    	if (carre[hnageoire2]!=carre[hnageoire]) {return false}// Meme bloc de nageoires necessaire sur l'axe ligneref
		if (hnageoire2==htrou1) {htrou1=htrou2; coltrou1=coltrou2}
		htrou2=M//Trou egal a 2eme nageoire : le supprimer
	}
									// htrou1 ou htrou2 fait partie du swordfish (Finned) --> colonne des cases avec suppression									
                					for (var p=0; p<long[ligneref]; p++) {
                						if (htrou1==casesenplus[ligneref][p]) {var colbase=coltrou1}
                						if (htrou2==casesenplus[ligneref][p]) {var colbase=coltrou2}
                					}
	
	if (colbase==10) {return false}
    var residu=ligneref%3; 
    var ligcase1=(ligneref%3+1)%3+3*parseInt(ligneref/3);
    var ligcase2=(ligneref%3+2)%3+3*parseInt(ligneref/3);
		// Suppression autour de hbase sur axe colbase : case hcase1 et hcase2
    	var hcase1=(10-facteur)*colbase+facteur*ligcase1;// Croisement ligne ligcase1 avec colonne colbase
		var hcase2=(10-facteur)*colbase+facteur*ligcase2;// Croisement ligne ligcase2 avec colonne colbase
    					// Verification hcase1 et hcase2 pas dans le swordfish 
    					var pasde1=true;
    					var pasde2=true;
    					for (var p=0; p<long[autre1]; p++) {
    						if (hcase1==casesenplus[autre1][p]) {pasde1=false}
    						if (hcase2==casesenplus[autre1][p]) {pasde2=false}
    					}
    					for (var p=0; p<long[autre2]; p++) {
    						if (hcase1==casesenplus[autre2][p]) {pasde1=false}
    						if (hcase2==casesenplus[autre2][p]) {pasde2=false}
    					}
    					if (pasde1) {// hcase1 pas dans le swordfish
        					var posa5k=contenu[hcase1];
            				if ((posa5k.length>1) && (posa5k.split(nplus)[0].length<posa5k.length)) {// Yes
    								// Elimination nplus dans hcase1
                    				wscen=wscen+colPlace[hcase1]+" ";
                    				eliminationnumero(hcase1, nplus);
            				}
    					}    				
    					if (pasde2) {// hcase2 pas dans le swordfish
        					var posa8k=contenu[hcase2];
            				if ((posa8k.length>1) && (posa8k.split(nplus)[0].length<posa8k.length)) {// Yes
    								// Elimination nplus dans hcase2
                    				wscen=wscen+colPlace[hcase2]+" ";
                    				eliminationnumero(hcase2, nplus);															
            				}
    					}
	return (scenario!=noeffect);
}

function cherchenageoirequadruple(nbrnag, ligneref, colnag, autre1, autre2, facteur, long, casesenplus, nplus) {//
	// autre1 et autre2 sur meme axe bloc
	if (parseInt(autre1/3)!=parseInt(autre2/3)) {return false}
    	var col0=colnag[0];
    	hnageoire=facteur*ligneref+(10-facteur)*col0;// nageoire sur isole
    	// identification axes transverses col1 et col2 ne se trouvant pas sur axe bloc de col0
        // Sur autre1
			var hsword1=M;
			var hsword2=M;
			var col1=10;
			var col2=10;
			for (var p=0; p<long[autre1]; p++) {
        		var hsword=casesenplus[autre1][p];
        		var col=parseInt(hsword/9);
				if (col==autre1) {col=hsword-9*col}// axe transverse
				if (parseInt(col/3)!=parseInt(col0/3)) {// axe transverse col pas sur axe bloc de la nageoire
					if (hsword1==M) {hsword1=hsword; col1=col} else {hsword2=hsword; col2=col}
				}
        	}
			if (hsword1==M) {return false} // pas d axe transverse valide
			if (hsword2==M) {// Recherche autre axe transverse aur autre2
    			for (var p=0; p<long[autre2]; p++) {
            		var hsword=casesenplus[autre2][p];
            		var col=parseInt(hsword/9);
    				if (col==autre2) {col=hsword-9*col}// axe transverse
    				if (parseInt(col/3)!=parseInt(col0/3)) {// axe transverse col pas sur axe bloc de la nageoire
    					if (hsword2==M) {hsword2=hsword; col2=col} // else ?? 
    				}
            	}
			}
			if (hsword2==M) {return false} // pas de 2eme axe transverse valide
		// Cases intersection de col0 avec autre1 et autre2
		var hinter1=facteur*autre1+(10-facteur)*col0;
		var hinter2=facteur*autre2+(10-facteur)*col0;
		var hcase=M;
		// Verification que les 4 cases de ce bloc intersection avec les lignes autre1 et autre2 font partie du swordfish
		var ii=carre[hinter1]-1;
		quadruplenageoire="";
		for (var i=0; i<9; i++) {// 9 cases du bloc
			var h=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii; // Position i dans le carre ii
			var ligcol=parseInt(h/9);
			var sym=h-9*ligcol;
			if (facteur==1) {var xx=ligcol; ligcol=sym; sym=xx}
			if ((ligcol==autre1) && (sym!=col0)) {
				// verifier dans swordfish
    			var yest=false;
				for (var p=0; p<long[autre1]; p++) {
    				if (h==casesenplus[autre1][p]) {yest=true; quadruplenageoire=quadruplenageoire+colPlace[h]}
            	}
				if (!yest) {return false}// case hors swordfish				
			}
			if ((ligcol==autre2) && (sym!=col0)) {
				// verifier dans swordfish
    			var yest=false;
				for (var p=0; p<long[autre1]; p++) {
    				if (h==casesenplus[autre2][p]) {yest=true; quadruplenageoire=quadruplenageoire+colPlace[h]}
            	}
				if (!yest) {return false}// case hors swordfish				
			}
			if ((sym==col0) && (ligcol!=autre1) && (ligcol!=autre2)) {var hcase=h}
		}
    	if (hcase!=M) {// Yes !
            	var posa6k=contenu[hcase];
                if ((posa6k.length>1) && (posa6k.split(nplus)[0].length<posa6k.length)) {// Yes
        				// Elimination nplus dans hcase
                 		wscen=wscen+colPlace[hcase]+" ";
                        eliminationnumero(hcase, nplus);															
                }
		}
	return (scenario!=noeffect);
}

function elaborevarianteespadon() {
		 // Swordfish... sur chiffre +n+ par HH HH HH . Elimination dans cases H4 H5
		 var s0=scenario.split("sur chiffre ")[1];
		 var num=s0.substring(0,1);
		 var s01=s0.split(". Elimination dans ")[1];
		 var s1=s01.split("Finned")[0];
		 variete=0;
		 if(scenario.split("Nageoire")[0]!=scenario) {variete=1}
		 if(scenario.split("Sashimi")[0]!=scenario) {variete=2}
		 if(scenario.split("Franken")[0]!=scenario) {variete=3; s1=s01.split("Franken")[0]}
		 decodecase(s1, num);
		 var s02=s0.split(" par ")[1]
		 var liste=s02.split(". Elimination dans ")[0];
		 decodevert(liste, num);
}
