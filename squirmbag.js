function squirmbag() {
	for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
	var axe=new Array(9);
	for (var n=1; n<10; n++) { // Chiffre
	for (var lc=0; lc<2; lc++) {
		var fac=9-8*lc;// lc=0 : ligne lc=1 : colonne
		// Recherche liens a 4 case contenant le chiffre n
		for (var i=0; i<5; i++) {// 1ere colonne 
			var kl1=0;
			axe=[];// Reinitialisation
			var casesquirmbag1="";
			for (var ii=0; ii<9; ii++) {// Case dans la colonne
    			var h=fac*i+(10-fac)*ii;
				var y=contenu[h];
				if (y==n) {break}
        		if (y.split(n)[0].length<y.length) {
        			// Case trouvee contenant le chiffre n, kl1eme sur cette colonne
					axe[kl1]=ii;// colonne correspondante (resp ligne)
					casesquirmbag1+=colPlace[h]+" ";
					kl1+=1;
				}
			}// Fin ii
			if ((axe.length>0) && (kl1<6) && (ii==9)) {// 1ere colonne ok
				var casesquirmbag=casesquirmbag1;
				for (var j=i+1; j<6; j++) {// 2eme colonne
	               	var axe1=axe;
					var kl2=0;
					var yest=true;
                    var casesquirmbag2="";
					for (var jj=0; jj<9; jj++) {// Case dans la colonne
            			h=fac*j+(10-fac)*jj;
        				y=contenu[h];
				if (y==n) {break}
        		if (y.split(n)[0].length<y.length) {
    						var retjkl=false;
							var jklmin=0;
    						for (var jkl=0; jkl<axe.length; jkl++) {
								if (axe[jkl]==jj) {retjkl=true}
								if (axe[jkl]<jj) {jklmin=jkl+1}
							}
							if (retjkl) {
								casesquirmbag2+=colPlace[h]+" ";
								kl2+=1;
							} else {
    							if ((kl1==2) || (kl1==3) || (kl1==4)) {
    								if (axe.length<4) {
    									var axepre=axe;
    									axe=[];
    									for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
    									axe[jklmin]=jj;
    									for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
    									casesquirmbag2+=colPlace[h]+" ";
    									kl2+=1;
    								} else {yest=false; axe=axe1; break}
    							} else {yest=false; axe=axe1; break}
    						}
						}
        			}// Fin jj
					if (!yest) {casesquirmbag=casesquirmbag1}
					if ((axe.length>0) && yest && (kl2>1) && (kl2<6) && (jj==9)) {// 2eme colonne ok
                    	casesquirmbag+=casesquirmbag2;
						var casesquirmbagpre=casesquirmbag;
						for (var k=j+1; k<7; k++) {// 3eme colonne
							var axe2=axe;
							var kl3=0;
							yest=false;
                    		var casesquirmbag3="";
							for (var kk=0; kk<9; kk++) {// Case dans la colonne
                        		h=fac*k+(10-fac)*kk;
                    			y=contenu[h];
				if (y==n) {break}
        		if (y.split(n)[0].length<y.length) {
									var retjkl=false;
									var jklmin=0;
    								for (var jkl=0; jkl<axe.length; jkl++) {
										if (axe[jkl]==kk) {retjkl=true}
										if (axe[jkl]<kk) {jklmin=jkl+1}
									}
									if (retjkl) {
										casesquirmbag3+=colPlace[h]+" ";
										kl3+=1;
										yest=true;
        							} else {
    									if ((kl2<5) && (kl2>1)) {
            								if (axe.length<5) {
    											var axepre=axe;
    											axe=[];
    											for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
    											axe[jklmin]=kk;
    											for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
            									casesquirmbag3+=colPlace[h]+" ";
            									kl3+=1;
    											yest=true;
            								} else {yest=false; axe=axe2; break}
    									} else {yest=false; axe=axe2; break}
            						}
        						}
                    		}// Fin kk
							if (!yest) {casesquirmbag=casesquirmbagpre} 
							if ((axe.length>0) && yest && (kl3>1) && (kl3<6) && (kk==9)) {// 3eme colonne ok
								casesquirmbag+=casesquirmbag3;
								var casesquirmbagpre=casesquirmbag;
								for (var l=k+1; l<8; l++) {// 4eme colonne
                					var axe3=axe;
									var kl4=0;
									yest=false;
                                	var casesquirmbag4="";
									for (var ll=0; ll<9; ll++) {// Case dans la colonne
                                		h=fac*l+(10-fac)*ll;
                                		y=contenu[h];
				if (y==n) {break}
        		if (y.split(n)[0].length<y.length) {
											var retjkl=false;
											var jklmin=0;
    										for (var jkl=0; jkl<axe.length; jkl++) {
												if (axe[jkl]==ll) {retjkl=true}
												if (axe[jkl]<ll) {jklmin=jkl+1}
											}
											if (retjkl) {
    											casesquirmbag4+=colPlace[h]+" ";
    											kl4+=1;
												yest=true;
                        					} else {
    											if ((kl3>1) && (kl3<5)) {
    												if (axe.length<5) {
            											var axepre=axe;
            											axe=[];
            											for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
            											axe[jklmin]=ll;
            											for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
                            							casesquirmbag4+=colPlace[h]+" ";
                            							kl4+=1;
														yest=true;
                            						} else {yest=false; axe=axe3; break}
    											} else {yest=false; axe=axe3; break}
                            				}
                        				}
                                	}// Fin ll
									if (!yest) {casesquirmbag=casesquirmbagpre} 
									if ((axe.length>0) && yest && (kl4>1) && (kl4<6) && (ll==9)) {// 4eme colonne ok
										casesquirmbag+=casesquirmbag4;
        								casesquirmbagpre=casesquirmbag;
        								for (var m=l+1; m<9; m++) {// 5eme colonne
                        					var axe4=axe;
        									var kl5=0;
        									yest=false;
                                        	var casesquirmbag4="";
											for (var mm=0; mm<9; mm++) {// Case dans la colonne
                                        		h=fac*m+(10-fac)*mm;
                                        		y=contenu[h];
				if (y==n) {break}
        		if (y.split(n)[0].length<y.length) {
													var retjkl=false;
        											var jklmin=0;
            										for (var jkl=0; jkl<axe.length; jkl++) {
        												if (axe[jkl]==mm) {retjkl=true}
        												if (axe[jkl]<mm) {jklmin=jkl+1}
        											}
													if (retjkl) {
            											casesquirmbag4+=colPlace[h]+" ";
            											kl5+=1;
        												yest=true;
                                					} else {
            											if (kl5<5) {
            												if (axe.length<5) {
                    											var axepre=axe;
                    											axe=[];
                    											for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
                    											axe[jklmin]=mm;
                    											for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
                                    							casesquirmbag4+=colPlace[h]+" ";
                                    							kl5+=1;
            													yest=true;
                                    						} else {yest=false; axe=axe4; break}
            											} else {yest=false; axe=axe4; break}
                                    				}
                                				}
                                        	}// Fin mm
									if (!yest) {casesquirmbag=casesquirmbagpre} 
									if (yest && (mm==9)) {// 5eme colonne ok
                    					casesquirmbag+=casesquirmbag4;
										// Squirmbag : eliminer sur axe dans cases pas dans i, j, k, l, m
    									wscen="Squirmbag avec chiffre " + n + " en "+ casesquirmbag+" Elimination dans ";
										for (var aa=0; aa<5; aa++) {
											var xx=axe[aa];
											for (var x=0; x<9; x++) {
												h=fac*x+(10-fac)*xx;
                                        		if (h<M) {
													y=contenu[h];
                                                    if ((x!=i) && (x!=j) && (x!=k) && (x!=l)&& (x!=m) && (y.length>1)&& (y.split(n)[0].length<y.length)) {
        												wscen+=colPlace[h]+" ";
        												eliminationnumero(h, n);
                                        			}
												} else {
													return;
												}														
											}// x
										}// aa
										if (scenario!=noeffect) {
											variete=0;
                            				if (clickmethode) {enregistrescenarios()} else {return}
											i=9; j=9; k=9; l=9; m=9;											
										}												
									}// yest m
								}// m
							}// yest l
						}// l
							}// yest k
						}// k
					}// yest j
				}// j
			}// yest i
		}// i
	}// lc
	}// n
}

function elaborevariantesquirmbag() {
		 // squirmbag... sur chiffre +n+...dans cases H4 H5
		 var s0=scenario.split("avec chiffre ")[1];
		 var num=s0.substring(0,1);
		 var s01=s0.split(" Elimination dans ")[1];
		 var s02=s0.split(" en ")[1];
		 var s03=s02.split(" Elimination dans ")[0];
		 variete=0;
/*		 var s1=s01.split("Finned")[0];
		 if(scenario.split("Nageoire")[0]!=scenario) {variete=1}
		 if(scenario.split("Sashimi")[0]!=scenario) {variete=2}
		 if(scenario.split("Franken")[0]!=scenario) {variete=3; s1=s01.split("Franken")[0]}
*/
		 decodecase(s01, num);
		 decodevert(s02, num);
}
