function ywing() {
	for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
		for (var i=0; i<9; i++) {// Le numero de la zone
			for (var j=0; j<9; j++) {// Position dans la ligne ou la colonne ou le carre
				switch (lc) {
	  				case 0: // Ligne
						var cible=j+9*i;
					break;
	  				case 1: // Colonne
						var cible=i+9*j;
					break;
	  				case 2: // Carre
						var cible=j+6*parseInt(j/3)+18*parseInt(i/3)+3*i;
    			   		//hbloc=((h-9*parseInt(h/9))!=(i-9*parseInt(i/9))) && (parseInt(h/9)!=parseInt(i/9));
					break;
				}
				var poscible=contenu[cible];
				if (poscible.length==2) {
						var chiffre=poscible[0];
						var autrechiffre=poscible[1];
						// Recherche case case1 de 2 chiffres voyant cible par chiffre
                   		var lignecible=parseInt(cible/9);
						var colonnecible=cible-9*lignecible;
						var bloccible=carre[cible]-1;
						for (var lccible=0; lccible<3; lccible++) {// Ligne puis colonne puis carre autour de la case cible
                   			for (var jcible=0; jcible<9; jcible++) {// Position dans la ligne ou la colonne ou le carre  de la case cible
								switch (lccible) {
                   	  				case 0: // Ligne
                   						var case1=jcible+9*lignecible;
                   						break;
                   	  				case 1: // Colonne
                   						var case1=colonnecible+9*jcible;
                   						break;
                   	  				case 2: // Carre
                   						var case1=jcible+6*parseInt(jcible/3)+18*parseInt(bloccible/3)+3*bloccible;
                   					break;
                   				}
                   				var poscase1=contenu[case1];
								if ((case1!=cible) && (poscase1.length==2) && (poscase1.split(chiffre)[0].length<poscase1.length)) {
									var troisiemechiffre=poscase1[0];
									if (troisiemechiffre==chiffre) {troisiemechiffre=poscase1[1]}
									if (troisiemechiffre==autrechiffre) {continue}
									// Recherche case case2 en lien avec cible par autrechiffre et contenant troisiemechiffre
            						for (var lccible2=0; lccible2<3; lccible2++) {// Ligne puis colonne puis carre autour de la case cible
                               			for (var jcible2=0; jcible2<9; jcible2++) {// Position dans la ligne ou la colonne ou le carre  de la case cible
            								switch (lccible2) {
                               	  				case 0: // Ligne
                               						var case2=jcible2+9*lignecible;
                               						break;
                               	  				case 1: // Colonne
                               						var case2=colonnecible+9*jcible2;
                               						break;
                               	  				case 2: // Carre
                               						var case2=jcible2+6*parseInt(jcible2/3)+18*parseInt(bloccible/3)+3*bloccible;
                               					break;
                               				}
                   							var poscase2=contenu[case2];
												var hvu="";
            								if ((case2!=cible) && (case2!=case1)&& (poscase2.length==2) && (poscase2.split(autrechiffre)[0].length<poscase2.length) && (poscase2.split(troisiemechiffre)[0].length<poscase2.length)) {
												// Recherche cases voyant case1 et case2 contenant troisiemechiffre : supprimer troisiemechiffre dans ces cases
												wscen="Y-wing<br>";
                                           		var lignecase1=parseInt(case1/9);
                        						var colonnecase1=case1-9*lignecase1;
                        						var bloccase1=carre[case1]-1;
												for (var lccase1=0; lccase1<3; lccase1++) {// Ligne puis colonne puis carre autour de la case case1
                                           			for (var jcase1=0; jcase1<9; jcase1++) {// Position dans la ligne ou la colonne ou le carre  de la case case1
                        								switch (lccase1) {
                                           	  				case 0: // Ligne
                                           						var h=jcase1+9*lignecase1;
                                           						break;
                                           	  				case 1: // Colonne
                                           						var h=colonnecase1+9*jcase1;
                                           						break;
                                           	  				case 2: // Carre
                                           						var h=jcase1+6*parseInt(jcase1/3)+18*parseInt(bloccase1/3)+3*bloccase1;
                                           					break;
                                           				}
                                           				var posh=contenu[h];
                        								if ((h!=cible) && (h!=case1) && (h!=case2) && sevoient(h, case2) && (hvu.split(colPlace[h])[0].length==hvu.length) && (posh.split(troisiemechiffre)[0].length<posh.length)) {
															hvu+=colPlace[h];
															// Suppression troisiemechiffre dans la case h
															wscen+="<br>La case "+colPlace[h]+" ne peut contenir "+troisiemechiffre+" car cette case est reliée par ce chiffre aux cases à 2 chiffres-candidats ";
															wscen+=colPlace[case1]+" et "+colPlace[case2]+" qui voient la case "+colPlace[cible]+" à 2 chiffres-candidats, repectivement par les chiffres "+chiffre+" et "+autrechiffre+". La case "+colPlace[cible] +" deviendrait vide.<br>";
															eliminationnumero(h, troisiemechiffre);
    													}// la case h
													}// jcase1
												}// lccase1
												if (scenario!=noeffect) {if (clickmethode) {enregistrescenarios()} else {return}}
 											}// la case case2						
 										}// jcible2
									}// lccible2
								}// la case case1                  					
							}// jcible
						}// lccible
				}// poscible de longueur 2
			}// j 
		}// i
	}// lc
}

function elaborevarianteywing() {
		 // wscen="Y-wing<br>"+"La case "+colPlace[h]+" ne peut contenir "+troisiemechiffre
		 var re=/\d/g;
		 var s0=scenario.split("Y-wing<br>")[1];
		 var n=(s0.split(" ne peut contenir ")[1]).substring(0,1);
		 var s1=s0.split("La case ")
		 for (var i=1; i<s1.length; i++) {
		 	var hn=decodagecolPlace(s1[i].substring(0,2));
		 	var ch=contenu[hn].match(re);
		 	for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] == n) {eliminationnumero(hn, ch[hnum])}}// hnum
		 }
}

