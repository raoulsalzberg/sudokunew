function jellyfish() {
	for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
	var axe=new Array(9);
	for (var n=1; n<10; n++) { // Chiffre
	for (var lc=0; lc<2; lc++) {
		var fac=9-8*lc;// lc=0 : ligne lc=1 : colonne
		// Recherche liens a 4 case contenant le chiffre n
		for (var i=0; i<6; i++) {// 1ere Ligne 
			var kl1=0;
			axe=[];// Reinitialisation
			var casejelly1="";
			for (var ii=0; ii<9; ii++) {// Case dans la ligne
    			var h=fac*i+(10-fac)*ii;
				var y=contenu[h];
				if (y==n) {break}// solo isole
        		if (y.split(n)[0].length<y.length) {
        			// Case trouvee contenant le chiffre n, kl1eme sur cette ligne
					axe[kl1]=ii;// colonne correspondante (resp ligne)
					casejelly1+=colPlace[h]+" ";
					kl1+=1;
				}
			}// Fin ii
			if ((axe.length>0) && (kl1<5) && (ii==9)) {// 1ere ligne ok
				for (var j=i+1; j<7; j++) {// 2eme Ligne
                	var axe1=axe;
					var casejelly=casejelly1;
					var kl2=0;
					var yest=true;
                    var casejelly2="";
        			for (var jj=0; jj<9; jj++) {// Case dans la ligne
            			h=fac*j+(10-fac)*jj;
        				y=contenu[h];
				if (y==n) {break}// solo isole
        		if (y.split(n)[0].length<y.length) {
    						var retjkl=false;
							var jklmin=0;
    						for (var jkl=0; jkl<axe.length; jkl++) {
								if (axe[jkl]==jj) {retjkl=true}
								if (axe[jkl]<jj) {jklmin=jkl+1}
							}
							if (retjkl) {
								casejelly2+=colPlace[h]+" ";
								kl2+=1;
							} else {
    							if ((kl1==2) || (kl1==3)) {
    								if (axe.length<4) {
    									var axepre=axe;
    									axe=[];
    									for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
    									axe[jklmin]=jj;
    									for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
    									casejelly2+=colPlace[h]+" ";
    									kl2+=1;
    								} else {yest=false; axe=axe1; break}
    							} else {yest=false; axe=axe1; break}
    						}
						}
        			}// Fin jj
					if ((axe.length>0) && yest && (kl2>1) && (kl2<5) && (jj==9)) {// 2eme ligne ok
                    	casejelly+=casejelly2;
						for (var k=j+1; k<8; k++) {// 3eme Ligne
							var axe2=axe;
							var kl3=0;
							yest=false;
                    		var casejelly3="";
							for (var kk=0; kk<9; kk++) {// Case dans la ligne
                        		h=fac*k+(10-fac)*kk;
                    			y=contenu[h];
				if (y==n) {break}// solo isole
        		if (y.split(n)[0].length<y.length) {
									var retjkl=false;
									var jklmin=0;
    								for (var jkl=0; jkl<axe.length; jkl++) {
										if (axe[jkl]==kk) {retjkl=true}
										if (axe[jkl]<kk) {jklmin=jkl+1}
									}
									if (retjkl) {
										casejelly3+=colPlace[h]+" ";
										kl3+=1;
										yest=true;
        							} else {
    									if (kl2<4) {
            								if (axe.length<4) {
    											var axepre=axe;
    											axe=[];
    											for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
    											axe[jklmin]=kk;
    											for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
            									casejelly3+=colPlace[h]+" ";
            									kl3+=1;
    											yest=true;
            								} else {yest=false; axe=axe2; break}
    									} else {yest=false; axe=axe2; break}
            						}
        						}
                    		}// Fin kk
							if (yest && (kl3<5) && (kk==9)) {// 3eme ligne ok
								casejelly+=casejelly3;
								for (var l=k+1; l<9; l++) {// 4eme Ligne
                					var axe3=axe;
									var kl4=0;
									yest=false;
                                	var casejelly4=""
									for (var ll=0; ll<9; ll++) {// Case dans la ligne
                                		h=fac*l+(10-fac)*ll;
                                		y=contenu[h];
				if (y==n) {break}// solo isole
        		if (y.split(n)[0].length<y.length) {
    										var retjkl=false;
											var jklmin=0;
    										for (var jkl=0; jkl<axe.length; jkl++) {
												if (axe[jkl]==ll) {retjkl=true}
												if (axe[jkl]<ll) {jklmin=jkl+1}
											}
											if (retjkl) {
    											casejelly4+=colPlace[h]+" ";
    											kl4+=1;
												yest=true;
                        					} else {
    											if (kl3<4) {
    												if (axe.length<4) {
            											var axepre=axe;
            											axe=[];
            											for (var jkl=0; jkl<jklmin; jkl++) {axe[jkl]=axepre[jkl]}
            											axe[jklmin]=ll;
            											for (var jkl=jklmin; jkl<axepre.length; jkl++) {axe[jkl+1]=axepre[jkl]}
                            							casejelly4+=colPlace[h]+" ";
                            							kl4+=1;
    													yest=true;
                            						} else {yest=false; axe=axe3; break}
    											} else {yest=false; axe=axe3; break}
                            				}
                        				}
                                	}// Fin ll
                                	if (yest && (ll==9)) {// 4eme ligne ok
                    					casejelly+=casejelly4;
										// Jellyfish : eliminer sur axe dans cases pas dans i, j, k, l
    									wscen="Jellyfish avec chiffre " + n + " en "+ casejelly+" Elimination dans ";
										for (var mm=0; mm<axe.length; mm++) {
											var xx=axe[mm];
											for (var x=0; x<9; x++) {
												h=fac*x+(10-fac)*xx;
												y=contenu[h];
                                              		if ((x!=i) && (x!=j) && (x!=k) && (x!=l) && ((y.length>1)&& (y.split(n)[0].length<y.length))) {
													wscen+=colPlace[h]+" ";
													eliminationnumero(h, n);
                                				}														
											}// x
										}// mm
										if (scenario!=noeffect) {
											variete=0;
                            				if (clickmethode) {enregistrescenarios()} else {return}
											i=9; j=9; k=9; l=9;											
										}												
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

function elaborevariantejellyfish() {
		 // Jellyfish... sur chiffre +n+...dans cases H4 H5
		 var s0=scenario.split("avec chiffre ")[1];
		 var num=s0.substring(0,1);
		 var s01=s0.split("Elimination dans ")[1];
		 variete=0;
		 decodecase(s01, num);
		 var s02=s0.split(" en ")[1]
		 var liste=s02.split(" Elimination dans ")[0];
		 decodevert(liste, num);
}
