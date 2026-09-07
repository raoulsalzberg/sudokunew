function nishio() {
	for (var chiffre=1; chiffre<10; chiffre++) { // Numero 
		for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
			for (var i=0; i<9; i++) {// Le numero de la zone
				for (var j=0; j<9; j++) {// Position dans la ligne ou la colonne ou le carre
					switch (lc) {
	  					case 0: // Ligne
							var pivot=j+9*i;
						break;
	  					case 1: // Colonne
							var pivot=i+9*j;
						break;
	  					case 2: // Carre
							var pivot=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i;
    				   		//hbloc=((h-9*parseInt(h/9))!=(i-9*parseInt(i/9))) && (parseInt(h/9)!=parseInt(i/9));
						break;
					}
					var pospivot=contenu[pivot];
					if ((pospivot.length>1) && (pospivot.split(chiffre)[0].length<pospivot.length)) {
						// Recherche case xfort en lien fort avec pivot par chiffre
                   		var lignepivot=parseInt(pivot/9);
						var colonnepivot=pivot-9*lignepivot;
						var blocpivot=carre[pivot]-1;
						for (var lcpivot=0; lcpivot<3; lcpivot++) {// Ligne puis colonne puis carre autour de la case pivot
                   			for (var jpivot=0; jpivot<9; jpivot++) {// Position dans la ligne ou la colonne ou le carre  de la case pivot
								switch (lcpivot) {
                   	  				case 0: // Ligne
                   						var xfort=jpivot+9*lignepivot;
                   						break;
                   	  				case 1: // Colonne
                   						var xfort=colonnepivot+9*jpivot;
                   						break;
                   	  				case 2: // Carre
                   						var xfort=jpivot+6*parseInt(jpivot/3)+18*parseInt(blocpivot/3)+3*blocpivot;
                   					break;
                   				}
                   				var posxfort=contenu[xfort];
								if ((xfort!=pivot) && (posxfort.length>1) && (posxfort.split(chiffre)[0].length<posxfort.length) && testlienfortgeneral(pivot, xfort, chiffre)) {
									// Recherche case cible en lien avec xfort par chiffre
                               		var lignexfort=parseInt(xfort/9);
            						var colonnexfort=xfort-9*lignexfort;
            						var blocxfort=carre[xfort]-1;
           						for (var lcxfort=0; lcxfort<3; lcxfort++) {// Ligne puis colonne puis carre autour de la case xfort
 										for (var jxfort=0; jxfort<9; jxfort++) {// Position dans la ligne ou la colonne ou le carre  de la case xfort
												switch (lcxfort) {
                                	  				case 0: // Ligne
                                						var cible=jxfort+9*lignexfort;
                                						break;
                                	  				case 1: // Colonne
                                						var cible=colonnexfort+9*jxfort;
                                						break;
                                	  				case 2: // Carre
                                						var cible=jxfort+6*parseInt(jxfort/3)+18*parseInt(blocxfort/3)+3*blocxfort;
                                					break;
                                				}
                                				var poscible=contenu[cible];
             								if ((xfort!=cible) && (poscible.length==2) && (poscible.split(chiffre)[0].length<poscible.length)) {
 												var  autrechiffre=poscible[0];
 												if (autrechiffre==chiffre) {autrechiffre=poscible[1]}
  												// Recherche case xfaible voyant la case pivot, contenant autrechiffre inclus dans pivot dans zone sudoku differente de lcxfort                            					
												if (pospivot.split(autrechiffre)[0].length<pospivot.length) {
    												for (var lcxfaible=0; lcxfaible<3; lcxfaible++) {// Ligne puis colonne puis carre autour de la case xfaible
                                                   		if (lcxfaible!=lcxfort) {
         													for (var jxfaible=0; jxfaible<9; jxfaible++) {// Position dans la ligne ou la colonne ou le carre  de la case pivot
                                                       			switch (lcxfaible) {
                                                       	  				case 0: // Ligne
                                                       						var xfaible=jxfaible+9*lignepivot;
                                                       						break;
                                                       	  				case 1: // Colonne
                                                       						var xfaible=colonnepivot+9*jxfaible;
                                                       						break;
                                                       	  				case 2: // Carre
                                                       						var xfaible=jxfaible+6*parseInt(jxfaible/3)+18*parseInt(blocpivot/3)+3*blocpivot;
                                                       					break;
                                                       			}
                                                       			var posxfaible=contenu[xfaible];
                                    							if ((xfaible!=pivot) && (xfaible!=xfort) && (posxfaible.length>1) && (posxfaible.split(autrechiffre)[0].length<posxfaible.length)) {
                                                						// Recherche case loin en lien fort avec xfaible par autrechiffre
     																	var lignexfaible=parseInt(xfaible/9);
                                                  						var colonnexfaible=xfaible-9*lignexfaible;
                                                  						var blocxfaible=carre[xfaible]-1;
                                                  						for (var lcloin=0; lcloin<3; lcloin++) {// Ligne puis colonne puis carre autour de la case xfaible
                                                                     		for (var jloin=0; jloin<9; jloin++) {// Position dans la ligne ou la colonne ou le carre  de la case xfaible
                                                                   				switch (lcloin) {
                                                                   	  				case 0: // Ligne
                                                                   						var loin=jloin+9*lignexfaible;
                                                                   						break;
                                                                   	  				case 1: // Colonne
                                                                   						var loin=colonnexfaible+9*jloin;
                                                                   						break;
                                                                   	  				case 2: // Carre
                                                                   						var loin=jloin+6*parseInt(jloin/3)+18*parseInt(blocxfaible/3)+3*blocxfaible;
                                                                   					break;
                                                                   				}
                                                                   				var posloin=contenu[loin];
                                               									if ((loin!=xfaible) && (loin!=pivot) && (loin!=cible) && (loin!=xfort) && (posloin.length>1) && (posloin.split(autrechiffre)[0].length<posloin.length) && testlienfortgeneral(xfaible, loin, autrechiffre)) {
    																				// sprint final : cible voit loin
    																				if (sevoient(loin, cible)) {// Solution : la case pivot ne contient pas autrehiffre
																						wscen="Nishio "+colPlace[pivot]+" ne peut contenir "+autrechiffre+" car cette case est reliée par ce chiffre à la case "+colPlace[xfaible]+ " (qui, de ce fait, ne le contiendrait plus) et en lien fort par le chiffre "+chiffre+" à la case "+colPlace[xfort]+ " qui, de ce fait, deviendrait égale à "+chiffre+".<br>La case "+colPlace[xfaible]+", qui ne contiendrait plus "+autrechiffre+", est de plus reliée en lien fort par le chiffre "+autrechiffre+" à la case "+colPlace[loin]+ " qui, de ce fait, deviendrait égale à "+autrechiffre+".<br>";
																						wscen+="En conséquence si "+colPlace[pivot]+" est égale à "+autrechiffre+", alors la case "+colPlace[cible]+"="+contenu[cible]+" voyant les cases "+colPlace[xfort]+" et "+colPlace[loin]+" deviendrait vide."
																						eliminationnumero(pivot, autrechiffre); 
																						if (scenario!=noeffect) {
    																						variete=0;
                                                                    						if (clickmethode) {enregistrescenarios()} else {return}
                                                            							}
    																				}
    																			}// la case loin, differente de la case xfaible, contient autrechiffre, avec plus de un chiffre, en lien fort par autrechiffre avec la case xfaible 
    																		}// jloin
    																	}// lcloin
    															}// la case xfaible, differente de la case pivot, contient autrechiffre, voit la case pivot	
     														}// jxfaible
    													}// lcxfaible!=lcxfort
    												}// lcxfaible
												}// pivot contient autrechiffre
											}// la case cible, differente de la case xfort, contient chiffre, avec deux chiffres							
 										}// jxfort
									}// lcxfort
								}// la case xfort, differente de la case pivot, contient chiffre, avec plus de un chiffre, en lien fort par chiffre avec la case pivot                  					
							}// jpivot
						}// lcpivot
					}// la case pivot contient chiffre, avec plus de un chiffre
				}// j 
			}// i
		}// lc
	}// chiffre
}

function elaborevarianteNishio() {
		 // wscen="Nishio "+colPlace[pivot]+" ne peut contenir "+autrechiffre
		 var re=/\d/g;
		 var s0=scenario.split("Nishio ")[1];
		 var hn=decodagecolPlace(s0.substring(0,2));
		 var n=(s0.split(" ne peut contenir ")[1]).substring(0,1);
		 var ch=contenu[hn].match(re);
		 for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] == n) {eliminationnumero(hn, ch[hnum])}}// hnum
}
