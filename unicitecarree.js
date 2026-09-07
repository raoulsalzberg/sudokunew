function listecarree() {// fonction de variete
	scenario=noeffect;
	switch(variete) {
		case 1:// Bug+1
			unicitebugplusun();
			break;
		case 2:// Solo
			unicitecarresolo();
			break;
		case 3:// Duo form 1
			unicitecarreduo1();
			break;
		case 4:// Duo form 2
			unicitecarreduo2();
			break;
		case 5:// Duo différents
			unicitecarreduodifferents();
			break;
		case 6:// Duo diagonale
			unicitediagonale();
			break;
		case 7:// LT1
		case 8:// LT2
		case 9:// LT3
		case 10:// LT4
		case 11:// LT4 bis
		case 12:// LT5
		case 13:// LT6
		case 14:// rectangle cache nÂ°1
		case 15:// rectangle cache nÂ°2
		case 16:// rectangle cache nÂ°3
		case 17:// rectangle cache nÂ°4
		case 18:// rectangle cache nÂ°5
			uniciteLT();
			break;
		case 19:
//			uniciteavoidable();
			break;
		case 20:
			uniciteavoidable2();
			break;
		default:
			break;
	}
}

function uniciteLT() {
var re=/\d/g;
var tabbloc=[[1,2,3,6],[2,4,7],[5,8],[4,5,6],[5,7],[8],[7,8],[8]];
var maxbloc=[4,3,2,3,2,1,2,1];
var cotes=["12","34","13", "24"]; 
for (var alfa=1; alfa<9; alfa++) {
	for (var beta=alfa+1; beta<10; beta++) {
		for (var h1=0; h1<M-9; h1++) {
			var posh1=contenu[h1];
			if ((posh1.length >1) && (posh1.split(alfa)[0].length<posh1.length) && (posh1.split(beta)[0].length<posh1.length)) {// h1 contient alfa et beta
				bloch1=carre[h1]-1;
				for (var ibloc=0; ibloc<maxbloc[bloch1]; ibloc++) {// recherche quatrieme sommet h4 dans bloc bloch4
					// blocs differents sur meme axe
					bloch4=tabbloc[bloch1][ibloc];
					var rap=parseInt(bloch4/3);
					var h40=3*(bloch4-3*rap)+27*rap;// case en haut et a gauche du bloc bloch4
					for (var j=0; j<9; j++) {
						var h4=h40+j+6*parseInt(j/3);
						var posh4=contenu[h4];
					for (var icas2=0; icas2<2; icas2++) {// icas2=1 : cas particulier rectangles caches nÂ°2
						// 4 Conditions de validite h4 : plus grand que h1, pas sur meme axe (horizontal ou vertical), avec au moins 2 chiffres
						var conditions=(h4>h1) && (parseInt(h1/9)!=parseInt(h4/9)) && ((h1-9*parseInt(h1/9))!=(h4-9*parseInt(h4/9))) && (posh4.length>1);
						if ((icas2==1) && conditions) {// cas 2 rectangles caches : case h4 contenant alfa ou beta et pas les 2
							if (posh4.split(alfa)[0].length<posh4.length) {
								// autres chiffres differents de beta
								if (posh4.split(beta)[0].length<posh4.length) {continue}
							} else if (posh4.split(beta)[0].length<posh4.length) {
								// autres chiffres differents de alfa
								if (posh4.split(alfa)[0].length<posh4.length) {continue}							
							} else {continue}
						} else {// 2 Conditions de validite h4 supplementaires : contient alfa et beta
							var conditions=conditions && (posh4.split(alfa)[0].length<posh4.length) && (posh4.split(beta)[0].length<posh4.length);
						}
						if (conditions) {
							// Construire les 2 autres sommets
							var h2=h1-(h1-9*parseInt(h1/9))+(h4-9*parseInt(h4/9));// h2 sur axe horizontal de h1
							var h3=h1-9*(parseInt(h1/9)-parseInt(h4/9));// h3 sur axe vertical de h1
							//verifier contiennent alfa et beta
							var posh2=contenu[h2];
							var posh3=contenu[h3];
							if ((posh2.length>1) && (posh2.split(alfa)[0].length<posh2.length) && (posh2.split(beta)[0].length<posh2.length) && (posh3.length>1) && (posh3.split(alfa)[0].length<posh3.length) && (posh3.split(beta)[0].length<posh3.length) ) {
								if ((variete>13) && (variete<19)) {// rectangle cachés
											//identification case a 2 chiffres dans le rectangle
											var nch=0;
											for (var i2ch=4; i2ch>0; i2ch--) {
												var ib=0;
												switch(i2ch) {
													case 1:
														if (contenu[h1].length==2) {var h=h1; nch+=1; var ib=i2ch; if (nch==0) {var hh=h}}
														break;
													case 2:
														if (contenu[h2].length==2) {var h=h2; nch+=1; var ib=i2ch; if (nch==0) {var hh=h}}
														break;
													case 3:
														if (contenu[h3].length==2) {var h=h3; nch+=1; var ib=i2ch; if (nch==0) {var hh=h}}
														break;
													case 4:
														if (contenu[h4].length==2) {var h=h4; nch+=1; var ib=i2ch; var hh=h}
														break;
												}
												if ((nch!=1) && ((variete==14) || (variete==18))) {continue}// Pas de rectangle cache, pour les cas 1 et 5 si pas une case a 2 chiffres. Chercher LT
												if ((nch!=2) && ((variete==15) || (variete==16) || (variete==17))) {continue}// Pas de rectangle cache, pour les cas 2,3 et 4 si pas deux cases a 2 chiffres. Chercher LT
												switch(ib) {
													case 1:
														sommet1=h1;
														sommet2=h2;
														sommet3=h3;
														sommet4=h4;
														break;
													case 2:
														sommet1=h2;
														sommet2=h1;
														sommet3=h4;
														sommet4=h3;
														break;
													case 3:
														sommet1=h3;
														sommet2=h4;
														sommet3=h1;
														sommet4=h2;
														break;
													case 4:
														sommet1=h4;
														sommet2=h3;
														sommet3=h2;
														sommet4=h1;
														break;
												}

    											wscen=tradacrit("Evitement défaut unicité Rectangle caché numero ")+(variete-13)+" dans rectangle "+colPlace[sommet1]+" "+colPlace[sommet2]+" "+colPlace[sommet3]+" "+colPlace[sommet4]+" avec chiffres "+alfa+" et "+beta+" dans ces cases.";
												var wscen0=wscen;
    											// tester alfa et beta
												switch(variete) {
														case 14:
        													if (testlienfortgeneral(sommet4, sommet3, alfa) && testlienfortgeneral(sommet4,sommet2, alfa)) {
            													// elimination beta dans sommet4
                        															wscen+="<br><br>la case "+colPlace[sommet1]+" ne contient que 2 chiffres.<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"1 : suppression "+beta+" dans "+colPlace[sommet4]+".<br>";
                            														eliminationnumero(sommet4, beta);
            												} else if (testlienfortgeneral(sommet4, sommet3, beta) && testlienfortgeneral(sommet4,sommet2, beta)) {
            													// elimination alfa dans sommet4
                        															wscen+="<br><br>la case "+colPlace[sommet1]+" ne contient que 2 chiffres.<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"1 : suppression "+alfa+" dans "+colPlace[sommet4]+".<br>";
                            														eliminationnumero(sommet4, alfa);
            												}											
															break;
														case 15:
        													if (testlienfortgeneral(sommet1, sommet2, alfa) && testlienfortgeneral(sommet4,sommet2, beta) && (contenu[sommet1].length==2)) {
            													// elimination alfa dans sommet3
                        															wscen+="<br><br>la case "+colPlace[sommet1]+" ne contient que 2 chiffres. La case "+colPlace[sommet4]+" ne contient pas le chiffre "+alfa+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet1]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"2 : suppression "+alfa+" dans "+colPlace[sommet3]+".<br>";
                            														eliminationnumero(sommet3, alfa);
            												} else if (testlienfortgeneral(sommet1, sommet2, beta) && testlienfortgeneral(sommet4,sommet2, alfa) && (contenu[sommet1].length==2)) {
            													// elimination beta dans sommet3
                        															wscen+="<br><br>la case "+colPlace[sommet1]+" ne contient que 2 chiffres. La case "+colPlace[sommet4]+" ne contient pas le chiffre "+beta+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet1]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"2 : suppression "+beta+" dans "+colPlace[sommet3]+".<br>";
                            														eliminationnumero(sommet3, beta);
            												}											
															break;
														case 16:
															if (testlienfortgeneral(sommet1, sommet2, alfa) && testlienfortgeneral(sommet3,sommet4, beta) && (contenu[sommet1].length==2) && (contenu[sommet4].length==2)) {
            													// elimination alfa dans sommet3 et beta dans sommet2 
                        															wscen+="<br><br>les case "+colPlace[sommet1]+" et "+colPlace[sommet4]+" ne contiennent que 2 chiffres.<br><br>";
                    																wscen+="Les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"3 : suppression "+alfa+" dans "+colPlace[sommet3]+" et "+beta+" dans "+colPlace[sommet2]+".<br>";
                            														eliminationnumero(sommet3, alfa);
                            														eliminationnumero(sommet2, beta);
            												} else if (testlienfortgeneral(sommet1, sommet2, beta) && testlienfortgeneral(sommet3,sommet4, alfa) && (contenu[sommet1].length==2) && (contenu[sommet4].length==2)) {
            													// elimination beta dans sommet3 et alfa dans sommet2 
                        															wscen+="<br><br>les case "+colPlace[sommet1]+" et "+colPlace[sommet4]+" ne contiennent que 2 chiffres.<br><br>";
                    																wscen+="Les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"3 : suppression "+beta+" dans "+colPlace[sommet3]+" et "+alfa+" dans "+colPlace[sommet2]+".";
                            														eliminationnumero(sommet3, beta);
                            														eliminationnumero(sommet2, alfa);
            												}											
															break;
														case 17:
															if (testlienfortgeneral(sommet1, sommet2, alfa) && testlienfortgeneral(sommet3,sommet4, alfa) && (contenu[sommet1].length==2) && (contenu[sommet3].length==2)) {
            													// elimination alfa dans sommet3 et beta dans sommet2 
                        															wscen+="<br><br>les case "+colPlace[sommet1]+" et "+colPlace[sommet3]+" ne contiennent que 2 chiffres.<br><br>";
                    																wscen+="Les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"4 : suppression "+beta+" dans "+colPlace[sommet2]+" et "+beta+" dans "+colPlace[sommet4]+".<br>";
                            														eliminationnumero(sommet2, beta);
                            														eliminationnumero(sommet4, beta);
            												} else if (testlienfortgeneral(sommet1, sommet2, beta) && testlienfortgeneral(sommet3,sommet4, beta) && (contenu[sommet1].length==2) && (contenu[sommet3].length==2)) {
            													// elimination beta dans sommet3 et alfa dans sommet2 
                        															wscen+="<br><br>les case "+colPlace[sommet1]+" et "+colPlace[sommet3]+" ne contiennent que 2 chiffres.<br><br>";
                    																wscen+="Les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"4 : suppression "+alfa+" dans "+colPlace[sommet2]+" et "+alfa+" dans "+colPlace[sommet4]+".<br>";
                            														eliminationnumero(sommet2, alfa);
                            														eliminationnumero(sommet4, alfa);
            												}											
															break;
														case 18:
															if (testlienfortgeneral(sommet2, sommet4, alfa) && testlienfortgeneral(sommet3,sommet4, beta) && (contenu[sommet1].length==2)) {
            													// elimination alfa dans sommet4 et beta dans sommet2 + suppression autres chiffres que alfa et beta dans sommet3
wscen+="<br><br>La case "+colPlace[sommet1]+" ne contient que 2 chiffres de base et la case "+colPlace[sommet3]+" ne peut contenir que ces 2 chiffres de base (suppression des autres chiffres).<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
wscen+=tradacrit("Cas Rectangle caché numero ")+"5 : suppression "+beta+" dans "+colPlace[sommet2]+" et "+alfa+" dans "+colPlace[sommet3]+". Suppression "+tradacrit("également")+" des autres chiffres que les chiffres de base "+alfa+" et "+beta+" dans la case "+colPlace[sommet4]+".<br>";
                            														eliminationnumero(sommet2, beta);
                            														eliminationnumero(sommet3, alfa);
																					var posk=contenu[sommet4];
																					var chk=posk.match(re);
																					for (var ch=0; ch<chk.length; ch++) {
																						if ((chk[ch]!=alfa) && (chk[ch]!=beta)) {eliminationnumero(sommet4, chk[ch])}
																					}

            												} else if (testlienfortgeneral(sommet1, sommet2, beta) && testlienfortgeneral(sommet3,sommet4, alfa) && (contenu[sommet1].length==2)) {
            													// elimination beta dans sommet4 et alfa dans sommet2 + suppression autres chiffres que alfa et beta dans sommet3
wscen+="<br><br>La case "+colPlace[sommet1]+" ne contient que 2 chiffres de base et la case "+colPlace[sommet4]+" ne peut contenir que ces 2 chiffres de base (suppression des autres chiffres).<br><br>";
                    																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet1]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+beta+".<br><br>";
                    																wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+alfa+".<br><br>";
//                            														wscen+=tradacrit("Cas Rectangle caché numero ")+"5 : suppression "+alfa+" dans "+colPlace[sommet2]+" et "+beta+" dans "+colPlace[sommet3]+".";
wscen+=tradacrit("Cas Rectangle caché numero ")+"5 : suppression "+alfa+" dans "+colPlace[sommet2]+" et "+beta+" dans "+colPlace[sommet3]+". Suppression "+tradacrit("également")+" des autres chiffres que les chiffres de base "+alfa+" et "+beta+" dans la case "+colPlace[sommet4]+".<br>";
                            														eliminationnumero(sommet2, alfa);
                            														eliminationnumero(sommet3, beta);
																					var posk=contenu[sommet4];
																					var chk=posk.match(re);
																					for (var ch=0; ch<chk.length; ch++) {
																						if ((chk[ch]!=alfa) && (chk[ch]!=beta)) {eliminationnumero(sommet4, chk[ch])}
																					}
            												}											
															break;
												}
                                    			if (scenario!=noeffect) {
													choixunicite=true;
            										if (clickmethode) {enregistrescenarios()} else {return}
            										wscen=wscen0;
                                    			}
											}//i2ch						 
								} else if ((variete>6) && (variete<14)) {// LT
										//selon bloch1-bloch4 horizontal (bloch4<bloch1+3) ou bloch1-bloch4 vertical (bloch4>=bloch1+3): cotes h1-h2 et h3-h4 ou bien h1-h3 et h2-h4
//    									for (var icote=0; icote<2; icote++) {
    									for (var icote=0; icote<1; icote++) {
    										var jcote=icote;
    										var horizontal=(bloch4<bloch1+3);
    										if  (!horizontal) {jcote+=2}// vertical
        									for (var ilarron=0; ilarron<2; ilarron++) {
        										var chiffre=alfa;
        										var autrechiffre=beta;
        										if (ilarron==1) {chiffre=beta; autrechiffre=alfa}
            									// 4 cas pour chercher larron : si horizontal : h1-h2 (larron a droite) ou h2-h1 (larron a gauche) ou h3-h4 (larron a droite) ou h4-h3 (larron a gauche)
            									// 4 cas pour chercher larron : si vertical : h1-h3 (larron a droite) ou h3-h1 (larron a gauche) ou h2-h4 (larron a droite) ou h4-h2 (larron a gauche)
												if (findlarron(cotes[jcote], h1, h2, h3, h4, chiffre, horizontal)) {// determination des 4 sommets avec le larron contenant alfa puis beta
        											wscen=tradacrit("Evitement défaut unicité LT dans rectangle ")+colPlace[sommet1]+" "+colPlace[sommet2]+" "+colPlace[sommet3]+" "+colPlace[sommet4]+" avec chiffres "+alfa+" et "+beta+" dans ces cases.";
        											wscen+="<br>Autre case "+colPlace[larron]+" contenant le chiffre "+chiffre+tradacrit(", seule à contenir")+" ce chiffre, en dehors des cases du rectangle, dans le bloc de "+colPlace[sommet4]+"-"+colPlace[sommet2]+". ";
													var wscen0=wscen;
														switch(variete) {
            												case 7:
            													if (LT12 && (contenu[sommet1].length==2) && (contenu[sommet3].length==2)) {//LT1
        															wscen+="<br>Case "+tradacrit("également")+tradacrit(" seule à contenir")+" ce chiffre, hors du rectangle,  sur l\'axe "+colPlace[sommet1]+"-"+colPlace[sommet2]+".";
            														wscen+="<br><br>les cases "+colPlace[sommet1]+" et "+colPlace[sommet3]+" ne contiennent que 2 chiffres.<br><br>";
        															wscen+=" Cas LT1 : suppression "+autrechiffre+" dans "+colPlace[sommet2]+".<br><br>";
            														eliminationnumero(sommet2, autrechiffre);
            													}
            													break;
            												case 8:
        														if (LT12 && (contenu[sommet2].length==2) && (contenu[sommet3].length==2)) {//LT2
        															wscen+="<br> Case "+tradacrit("également")+tradacrit(" seule à contenir")+" ce chiffre, hors du rectangle,  sur l\'axe "+colPlace[sommet1]+"-"+colPlace[sommet2]+".<br><br>";
            														wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet3]+" ne contiennent que 2 chiffres.<br><br>";
            														wscen+=" Cas LT2 : suppression "+chiffre+" dans "+colPlace[sommet1]+".<br><br>";
            														eliminationnumero(sommet1, chiffre);
            													}
            													break;
        	   												case 9:
        														// Exclure les cas de plus de une case a 2 chiffres dans le rectangle
        														if (larronseul()) {
        															if ((contenu[sommet1].length==2) && testlienfortgeneral(sommet3, sommet1, autrechiffre) && (wscen.split("LT1")[0].length==wscen.length) && sevoient(larron, sommet1)) {//LT3 sans LT1
            															wscen+="<br><br>la case "+colPlace[sommet1]+" ne contient que 2 chiffres.<br><br>";
        																wscen+="Les cases "+colPlace[sommet1]+" et "+colPlace[sommet3]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+autrechiffre+".<br><br>";
        																wscen+="La case "+colPlace[larron]+" doit voir la case de l'autre bloc prolongeant le côté de la case "+colPlace[sommet2]+".<br><br>";
        																wscen+="Cas LT3 : suppression "+autrechiffre+" dans "+colPlace[sommet2]+".<br><br>";
                														eliminationnumero(sommet2, autrechiffre);
                													}
        														}
            													break;
            												case 10:
        														// Exclure les cas de plus de une case a 2 chiffres dans le rectangle
        														if (larronseul() && sevoient(larron, sommet1)) {
            														if ((contenu[sommet3].length==2) && testlienfortgeneral(sommet4, sommet2, autrechiffre)){//LT4
            															wscen+="<br><br>la case "+colPlace[sommet3]+" ne contient que 2 chiffres.<br><br>";
        																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+autrechiffre+".<br><br>";
        																wscen+=tradacrit("La case extérieure au rectangle "+colPlace[larron]+" voit la case "+colPlace[sommet1]+" où le chiffre "+chiffre + " est supprimé.<br><br>");
                														wscen+="Cas LT4 : suppression "+chiffre+" dans "+colPlace[sommet1]+".";
                														eliminationnumero(sommet1, chiffre);
                													}
        														}
            													break;
           													case 11:
        														if (larronseul() && sevoient(larron, sommet1)) {
        															if ((contenu[sommet1].length==2) && testlienfortgeneral(sommet4, sommet2, autrechiffre)) {//LT4 bis
            															wscen+="<br><br>la case "+colPlace[sommet1]+" ne contient que 2 chiffres. ";
        																wscen+="Les cases "+colPlace[sommet2]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+autrechiffre+".<br><br>";
        																wscen+=tradacrit("Une case extérieure au rectangle "+colPlace[larron]+" se trouve dans le bloc des cases en lien fort, contient le chiffre "+chiffre+" et est la seule dans ce cas dans le bloc, hormis les cases du rectangle. ");
        																wscen+=tradacrit("Cette  case extérieure au rectangle voit aussi la case à 2 chiffres "+colPlace[sommet1]+".<br><br>");
        																wscen+="Cas LT4<sup>bis</sup> : suppression "+autrechiffre+" dans "+colPlace[sommet3]+".";
                														eliminationnumero(sommet3, autrechiffre);
                													}
        														}
            													break;
            												case 12:
        														if (testlienfortgeneral(sommet2, sommet1, autrechiffre) && testlienfortgeneral(sommet1, sommet3, autrechiffre) && voitcase(sommet2, sommet3, larron) && sevoient(larron, sommet1)) {//LT5
        															wscen+="<br><br>Les cases "+colPlace[sommet2]+" et "+colPlace[sommet1]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+autrechiffre+".<br><br>";
        															wscen+="Les cases "+colPlace[sommet1]+" et "+colPlace[sommet3]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+autrechiffre+".<br><br>";
            														wscen+="Cas LT5: suppression "+chiffre+" dans "+colPlace[sommet1]+".";
        															wscen+=tradacrit("<br><br>La case extérieure "+colPlace[larron]+" doit voir cette case "+colPlace[sommet1]+" ainsi que l'une des 2 cases reliée en lien fort avec cette case.<br><br>");
        															eliminationnumero(sommet1, chiffre);
            													}
            													break;
            												case 13:														
        														if (testlienfortgeneral(sommet3, sommet1, chiffre) && testlienfortgeneral(sommet3, sommet4, autrechiffre) && sevoient(larron, voitcase(sommet1, sommet4, sommet2))) {//LT6
        															wscen+="<br><br>Les cases "+colPlace[sommet3]+" et "+colPlace[sommet1]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+chiffre+".<br><br>";
        															wscen+="Les cases "+colPlace[sommet3]+" et "+colPlace[sommet4]+tradacrit(" sont reliées en lien fort")+" par le chiffre "+autrechiffre+".<br><br>";
            														wscen+="Cas LT6 : suppression "+autrechiffre+" dans "+colPlace[sommet2]+".<br><br>";
        															wscen+=tradacrit("La case extérieure "+colPlace[larron]+" doit voir la case du rectangle dans l'autre bloc voyant "+colPlace[sommet2]+".<br><br>");
            														eliminationnumero(sommet2, autrechiffre);
            													}
            													break;
            												default:
            													break;
            											}
                                						if (scenario!=noeffect) {
																	choixunicite=true;
        															if (clickmethode) {enregistrescenarios()} else {return}
        															wscen=wscen0;
                                						}						 
            									}// findlarron
        									}// ilarron
										}// icote
								} // variete
							}// h2 et h3 contiennent alfa et beta
						}// validation h4
					}}// icas2 et j
				}// ibloc
			}// h1 contient alfa et beta
		}// h1
	}// beta
}// alfa
}

function unicitecarree() {// origin=0 --> ormg
	tableauvariante = [];//Reinitialisation de la liste des variantes
	tableauvariante[0] = "Liste calculee des variantes";
	maxvarencours=1;
	choixunicite=false;
	for (variete=1; variete<21; variete++) {
		listecarree();
		if (choixunicite) {break}
	}
	//crash unicite carree ab ab ab ab
}

function testlienfortgeneral(hh1, hh2, chif) {// Test sur 3 zones sudoku
	var ii=carre[hh1]-1;
	var hor1=parseInt(hh1/9);
	var vert1=hh1-9*hor1;
	var hor2=parseInt(hh2/9);
	var vert2=hh2-9*hor2;

	if (hor1 == hor2) {// Même ligne
		for (var k=0; k<9; k++) {
            var hk=hor1*9+k;
			var posh=contenu[hk];
            if ((hk!=hh1) && (hk!=hh2) && (posh.split(chif)[0].length<posh.length)) {return false}
		}// k
	}// hor1=hor2
	
	if (vert1==vert2) {
		for (var k=0; k<9; k++) {// Même colonne
            var hk=vert1+9*k;
			var posv=contenu[hk];
			if ((hk!=hh1) && (hk!=hh2) && (posv.split(chif)[0].length<posv.length)) {return false}
		}// k
	}// vert1=vert2
	
	if (carre[hh1]==carre[hh2]) {// Bloc
		for (var k=0; k<9; k++) {
			var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
            var posc=contenu[hk];
			if ((hk!=hh1) && (hk!=hh2) && (posc.split(chif)[0].length<posc.length)) {return false}
		}// k
	}// bloc
	return true;
}

function sevoient(case1, case2) {
	return (((case1-9*parseInt(case1/9))==(case2-9*parseInt(case2/9))) || (parseInt(case1/9)==parseInt(case2/9)) || (carre[case1]==carre[case2]));
}

function unicitecrash() {// crash par defaut d'unicite ex : 1 cas car solo et duo reporte en unicite carre
	variete=1;
	crashunicite=uniciterectanglecrash();// crash rectangle
	if (!crashunicite) {crashunicite=unicitebugcrash()} else {variete=0; origincrash=true};// crash bug
}

function unicitebugcrash() {
	 var re=/\d/g;
 	 var nb3=0;
	 var solution=true;
	 for (var i=0; i<M; i++) {
	 	 var m=contenu[i].length;
		 if (m>2) {
		 	var lacase=i;
			nb3+=1;
			casechoisie=i;
			if (nb3>1) {return false}//Pas de bug + 1 si la case ne contient pas exactement 3 chiffres et n'est pas unique
		 } else if (m>1) {solution=false}
		 var h1=i;
	 }
	if ((nb3==0) && !solution) {// aucune case a plus de 2 chiffres sauf solution 
		scenario=tradacrit("Crash défaut d'unicité bug + 1 (aucune case n'a plus de 2 chiffres). Etape "+(etapecalcul+1)+". ");
		wscen=scenario;
		var previous=listescenarios[numerr][etapecalcul];
		if (previous.split("Retour unicité")[0].length<previous.length) [nextcase()]
        variete=1;
        origin="U";
		if (clickmethode) {enregistrescenarios()}
		return true;
	}
	return false;
}


function uniciterectanglecrash() {
	for (var k=0; k<9; k++) {//carre
		var h0=3*k+18*parseInt(k/3);
		for (var lc=0;lc<2;lc++) {//Ligne puis colonne du carre
		  switch(lc) {
			case 0:
				var coligref=3*(k-3*parseInt(k/3));// Colonne : 0, 3, 6, 0, 3, 6, 0, 3, 6
				var ligco=3*parseInt(k/3);
				break;
		  	case 1:
				var coligref=3*parseInt(k/3);// Ligne :0, 0, 0, 3, 3, 3, 6, 6, 6 
				var ligco=3*(k-3*parseInt(k/3));
				break;
		  }
		  for (var i=0;i<3;i++) {//ligne puis colonne
			var jumeau=true;
			var fac=1+8*lc;
			var hh0=h0+(10-fac)*i;
			var ccom1=contenu[hh0];
			var ccom2=contenu[hh0+fac];
			var ccom3=contenu[hh0+2*fac];		
			if ((ccom1==ccom2) && (ccom1.length==2)) {
			   var h1=hh0;
			   var h2=h1+fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+1;
			} else if ((ccom1==ccom3) && (ccom1.length==2)) {
			   var h1=hh0;
			   var h2=h1+2*fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+2;			
			} else if ((ccom2==ccom3) && (ccom2.length==2)) {
			   var h1=hh0+fac;
			   var h2=h1+fac;
			   var ccom=ccom2;
			   var colig1=coligref+1;
			   var colig2=coligref+2;			
			} else {
			  jumeau=false;
			}
			if (jumeau) {// Recherche sur colonnes (resp. lignes) colig1 et colig2 
				 var re=/\d/g;
				 var cref=ccom.toString().match(re);
				 for (var j=0;j<9;j++) {//Lignes croisant les colonnes colig1 et colig2 (resp. colonnes  vs lignes)
				 	var hh1=fac*colig1+(10-fac)*j;
					var hh2=fac*colig2+(10-fac)*j;
					var c1=contenu[hh1].toString();
					var c2=contenu[hh2].toString();
					var cc1=c1.match(re);
					var cc2=c2.match(re);
					if (hh1!=h1) {
					if ((contenu[h1]==contenu[h2]) && (contenu[h1]==contenu[hh1]) && (contenu[h1]==contenu[hh2]) && (contenu[h1].length==2)) {// crash unicite
							scenario=tradacrit(" Crash défaut d'unicité dans le rectangle "+colPlace[h1]+colPlace[h2]+colPlace[hh1]+colPlace[hh2]);
							if (TraceH.length>0) {scenario+=tradacrit(" signature hypothèses ")+TraceH}
							// Initialiser h1 avec son premier chiffre (hypothese cassant le defaut d'unicite)
							contenu[h1]=contenu[h1].substring(0,1);
							variete=0;
							origin="U"+h1+contenu[h1];
					        if (clickmethode) {enregistrescenarios()}
							return true;
					}}// crash rectangle
				 }// j Croisements
 			}// jumeau
		  }// i ligne puis colonne
		}// lc ligne puis colonne du bloc
	}// k bloc
	return false;
}

function uniciteavoidable() {
	for (var alfa=1; alfa<9; alfa++) {
		for (var beta=alfa+1; beta<10; beta++) {
			for (var h1=0; h1<M-1; h1++) {
				if ((contenu[h1]==alfa) || (contenu[h1]==beta)) {
    				for (var h2=h1+1; h2<M; h2++) {
    					if (sevoient(h1,h2)) {
							if (((contenu[h1] == alfa) && (contenu[h2]==beta)) || ((contenu[h1] == beta) && (contenu[h2]==alfa))) {
									// Rechercher h3 et h4 contenant alfa ou beta et faisant rectangle avec h1 et h2
									// 2 cas :  si meme ligne h1 et h2, balayer les lignes sur les 2 colonnes de h1 et h2; si meme colonne h1 et h2, balayer les colonnes sur les 2 lignes de h1 et h2
									for (var k=0; k<9; k++) {
										var ligne=parseInt(h1/9);
										var colonne=h1-9*ligne;
										var colh2=h2-9*parseInt(h2/9);
										if ((ligne == parseInt(h2/9)) && (k != ligne)) {// meme ligne
											var h3=9*k+colonne;
											var h4=9*k+(h2-9*ligne);
										} else if ((colonne==colh2) && (k!=colonne)) {// meme colonne
											var h3=k+9*parseInt(h1/9);
											var h4=k+9*parseInt(h2/9);
										} else {continue}
    									if (contenu[h3]==alfa) {
    										if ((contenu[h4].split(beta)[0].length<contenu[h4].length) && (contenu[h4].length>1)) {
    											wscen=tradacrit("Evitement défaut unicité avoidable nÂ°1 : Elimination ")+beta+" dans "+colPlace[h4];
												wscen+="<br>Rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[h3]+" "+colPlace[h4]+" -----> chiffres "+alfa+" et "+beta+"<br>";
    											eliminationnumero(h4, beta);
												choixunicite=true;
    										}
    									} else if (contenu[h3]==beta) {
    										if ((contenu[h4].split(alfa)[0].length<contenu[h4].length) && (contenu[h4].length>1)) {
    											wscen="Evitement défaut unicité avoidable nÂ°1 : Elimination "+alfa+" dans "+colPlace[h4];
												wscen+="<br>Rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[h3]+" "+colPlace[h4]+" -----> chiffres "+alfa+" et "+beta+"<br>";
    											eliminationnumero(h4, alfa);
												choixunicite=true;
    										}
    									} else if (contenu[h4]==alfa) {
    										if ((contenu[h3].split(beta)[0].length<contenu[h3].length) && (contenu[h3].length>1)) {
    											wscen="Evitement défaut unicité avoidable nÂ°1 : Elimination "+beta+" dans "+colPlace[h3];
												wscen+="<br>Rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[h3]+" "+colPlace[h4]+" -----> chiffres "+alfa+" et "+beta+"<br>";
    											eliminationnumero(h3, beta);
												choixunicite=true;
    										}
    									} else if (contenu[h4]==beta) {
    										if ((contenu[h3].split(alfa)[0].length<contenu[h3].length) && (contenu[h3].length>1)) {
    											wscen="Evitement défaut unicité avoidable nÂ°1 : Elimination "+alfa+" dans "+colPlace[h3];
												wscen+="<br>Rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[h3]+" "+colPlace[h4]+" -----> chiffres "+alfa+" et "+beta+"<br>";
    											eliminationnumero(h3, alfa);
												choixunicite=true;
    										}
    									}// 4 cas de h3 et h4
									}// k
									if (scenario!=noeffect) {
										variete=19;
            							if (clickmethode) {enregistrescenarios()} else {return}
        							}
							} // 2 cas h1 et h2
						} // sevoient
					} // h2 
				} // h1 contient alfa ou beta
			} // h1
		} // beta
	}// alfa
}

function uniciteavoidable2() {
	for (var alfa=1; alfa<9; alfa++) {
		for (var beta=alfa+1; beta<10; beta++) {
			for (var h1=0; h1<M-1; h1++) {
				if ((contenu[h1]==alfa) || (contenu[h1]==beta)) {
    				for (var h2=h1+1; h2<M; h2++) {
    					if ((carre[h1]==carre[h2]) && ((parseInt(h1/9)==parseInt(h2/9)) || ((h1-9*parseInt(h1/9)) == (h2-9*parseInt(h2/9))))) {
							var bloc=carre[h1];
							if (((contenu[h1] == alfa) && (contenu[h2]==beta)) || ((contenu[h1] == beta) && (contenu[h2]==alfa))) {
									// Rechercher h3 et h4 contenant alfa ou beta et faisant rectangle avec h1 et h2
									// 2 cas :  si meme ligne h1 et h2, balayer les lignes sur les 2 colonnes de h1 et h2; si meme colonne h1 et h2, balayer les colonnes sur les 2 lignes de h1 et h2
									for (var k=0; k<9; k++) {
										var ligne=parseInt(h1/9);
										var colonne=h1-9*ligne;
										var ligh2=parseInt(h2/9);
										var colh2=h2-9*parseInt(h2/9);
										if ((ligne == ligh2) && (k != ligne)) {// meme ligne
											var h3=9*k+colonne;// h3 sur colonne h1 pas dans bloc commun h1 et h2
											var h4=9*k+colh2;// h4 sur colonne h2
										} else if ((colonne==colh2) && (k!=colonne)) {// meme colonne
											var h3=k+9*ligne;// h3 sur ligne h1
											var h4=k+9*ligh2;// h4 sur ligne h2
										} else {continue}
    									var posh3=contenu[h3];
										var posh4=contenu[h4]
										var bloc3=carre[h3]-1;
										if ((bloc3 != bloc) && ((contenu[h1]==alfa) && (posh3.split(beta)[0].length<posh3.length) && (posh4.split(alfa)[0].length<posh4.length)) || ((contenu[h1]==beta) && (posh3.split(alfa)[0].length<posh3.length) && (posh4.split(beta)[0].length<posh4.length))) {
    										for (var chif=1; chif<10; chif++) {
												if ((chif!=alfa) && (chif!=beta) && (posh3.split(chif)[0].length<posh3.length) && (posh4.split(chif)[0].length<posh4.length) && (posh3.length==2) && (posh4.length==2)) {
    												wscen="Les cases " +colPlace[h1]+" "+colPlace[h2]+" "+colPlace[h3]+" "+colPlace[h4]+" forment un rectangle dans 2 blocs différents. Dans un bloc, les cases "+colPlace[h1]+" et "+colPlace[h2]+" n\'ont qu\'un seul chiffre, et dans l\'autre bloc, les cases "+colPlace[h3]+" et "+colPlace[h4]+" contiennent 2 chiffres dont un chiffre commun : "+chif+", leur autre chiffre étant l\'un des chiffres de l\'autre bloc.<br><br>";
													wscen+="Toute case voyant les cases à 2 chiffres "+colPlace[h3]+" et "+colPlace[h4]+" du rectangle ne peut contenir leur chiffre commun "+chif+".<br><br>";
													wscen+="Evitement défaut unicité avoidable nÂ°2 : Elimination ";// chif +" dans "+colPlace[hvu]
													// eliminer chif dans toutes les cases voyant h3 et h4, soit dans leur bloc, soit sur leur axe commun (meme k), ligne ou colonne
 													// dans bloc
													var h30=3*bloc3+18*parseInt(bloc3/3);
													for (var ii=0; ii<9; ii++) {
														var hvu=h30+ii+6*parseInt(ii/3);
														var posvu=contenu[hvu];
														if ((hvu!=h3) && (hvu!=h4) && (posvu.split(chif)[0].length<posvu.length)) {
															// Eliminer chif dans hvu
															wscen+=chif+" dans "+colPlace[hvu]+" ";
															eliminationnumero(hvu, chif);
															choixunicite=true;
														}
													}// ii
													// dans axe commun
													if (ligne==ligh2) {// ligne
														var ligh3=parseInt(h3/9);
														for (var kk=0; kk<9; kk++) {
															var hvu=kk+9*ligh3;
															var posvu=contenu[hvu];
															if ((hvu!=h3) && (hvu!=h4) && (posvu.split(chif)[0].length<posvu.length)) {
																// Eliminer chif dans hvu
																wscen+=chif+" dans "+colPlace[hvu]+" ";
																eliminationnumero(hvu, chif);
															}
															choixunicite=true;
														}// kk
													}// ligne													
													if (colonne==colh2) {// colonne
														var colh3=h3-9*parseInt(h3/9);
														for (var kk=0; kk<9; kk++) {
															var hvu=9*kk+colh3;
															var posvu=contenu[hvu];
															if ((hvu!=h3) && (hvu!=h4) && (posvu.split(chif)[0].length<posvu.length)) {
																// Eliminer chif dans hvu
																wscen+=chif+" dans "+colPlace[hvu]+" ";
																eliminationnumero(hvu, chif);
																choixunicite=true;
															}
														}// kk
													}// ligne													
												}// if chif
											}// chif										
										}// 2 cas de h3 et h4
									}// k
							} // 2 cas h1 et h2
						} // sevoient
									if (scenario!=noeffect) {
										variete=20;
            							if (clickmethode) {enregistrescenarios()} else {return}
        							}
					} // h2 
				} // h1 contient alfa ou beta
			} // h1
		} // beta
	}// alfa
}

function unicitebugplusun() {
	 var re=/\d/g;
 	 var nb3=0;
	 for (var i=0; i<M; i++) {
	 	 var m=contenu[i].length;
		 if (m>2) {
		 	var lacase=i;
			nb3=nb3+1;
			if ((nb3>1) || (m>3)) {return}//Pas de debug + 1 si la case ne contient pas exactement 3 chiffres et n'est pas unique
		 }
		 var h1=i;
	 }
	 if (nb3==1) {// Une seule case a 3 chiffres
    	 //  verification des 3 chiffres de la case, pour savoir lequel est vu 3 fois
    	 var hcase=parseInt(lacase/9);
    	 var vcase=lacase-9*hcase;
    	 var ccase=carre[lacase]-1;
    	 var ch=contenu[lacase].match(re);
		 var nn=0;
		 for (var ii=0; ii<3; ii++) {
        	 var n=ch[ii];
			 for (var lc=0; lc<3; lc++) {
		 		 var nb=0;
    			 for (var j=0; j<9; j++) {
        		 	 var hbloc=false;
					 switch(lc) {
        			 	case 0:
        					 var h=9*hcase+j;
        					 break;
        			 	case 1:
        					 var h=vcase+9*j;
        					 break;
        			 	case 2:
        					 var h=j+6*parseInt(j/3)+18*parseInt(ccase/3)+3*ccase; // Position j dans le carre ccase
    				   		 hbloc=((h-9*parseInt(h/9))==vcase) || (parseInt(h/9)==hcase);
        					 break;
        			 }
        			 var posk=contenu[h];
        			 if (!hbloc && (h!=lacase) && ((posk.split(n)[0].length<posk.length) && (posk.length>1))) {nb+=1}// Vrai si contenu[h] contient n
        		 }// j
				 // si nb>1, chiffre n a valider, si aucun des 2 autres chiffres dans ce cas
				 if (nb>1) {
				 	nn+=1;
					if (nn>1) {// autre chiffre voyant plus de 1 case --> defaut unicite = arret
						scenario=tradacrit("Défaut unicité BUG+1 avec une seule case à 3 chiffres "+colPlace[lacase]+"="+contenu[lacase]+" mais dont plus de 1 de ces chiffres voit plusieurs cases entraînant un arrêt");
						wscen=scenario;
						variete=1;
						if (clickmethode) {enregistrescenarios()}
						choixunicite=true;
						crashunicite=true;
						return;
					}
					var chiffretrouve=n;
				 }
        	 }// lc
    	 }// ii

		 if (nn==1) {// Superflu car automatique
				// Un seul des 3 chiffres est vu plusieurs fois. On peut l'eliminer pour eviter ce defaut d'unicite
				scenario="unicité BUG +1 validant chiffre " + chiffretrouve + " dans "+ colPlace[lacase]+", un des 3 chiffres de cette case seul à être vu plus de 1 fois dans une zone sudoku commune<br>";
				wscen=scenario;
				variete=1;
				//origin="U"+colPlace[lacase]+nn;
				var contbef=contenu[lacase];
        		for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] != chiffretrouve) {eliminationnumero(lacase, ch[hnum])}}// hnum
				if (clickmethode) {enregistrescenarios()}
				choixunicite=true;
		 }

	}// nb3=1
}

function unicitecarresolo() {
	for (var k=0; k<9; k++) {//carre
	  var h0=3*k+18*parseInt(k/3);
	  for (var lc=0;lc<2;lc++) {//Ligne puis colonne du carre
		var fac=1+8*lc;
		switch(lc) {
		  case 0:
			var coligref=3*(k-3*parseInt(k/3));// Colonne : 0, 3, 6, 0, 3, 6, 0, 3, 6
			break;
		  case 1:
			var coligref=3*parseInt(k/3);// Ligne :0, 0, 0, 3, 3, 3, 6, 6, 6 
			break;
		}
		for (var i=0;i<3;i++) {//ligne puis colonne
			var jumeau=true;
			var hh0=h0+(10-fac)*i;
			var ccom1=contenu[hh0];
			var ccom2=contenu[hh0+fac];
			var ccom3=contenu[hh0+2*fac];		
			if (((ccom1==ccom2) || verif(ccom2,ccom1)) && (ccom1.length==2)) {//ij=0
			   var h1=hh0;
			   var h2=h1+fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+1;
			} else if (((ccom1==ccom3) || verif(ccom3,ccom1)) && (ccom1.length==2)) {//ij=1
			   var h1=hh0;
			   var h2=h1+2*fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+2;			
			} else if (((ccom2==ccom3)  || verif(ccom3,ccom2)) && (ccom2.length==2)) {//ij=2
			   var h1=hh0+fac;
			   var h2=h1+fac;
			   var ccom=ccom2;
			   var colig1=coligref+1;
			   var colig2=coligref+2;			
			} else {
			  jumeau=false;
			}
			if (jumeau) {// Recherche sur colonnes (resp. lignes) colig1 et colig2 
				 var re=/\d/g;
				 var cref=ccom.toString().match(re);// Chiffres de reference
for (var icrash=0; icrash<2; icrash++) {
				 for (var j=0;j<9;j++) {//Lignes croisant les colonnes colig1 et colig2 (resp. colonnes  vs lignes)
					var hh1=fac*colig1+(10-fac)*j;
					var hh2=fac*colig2+(10-fac)*j;
					if (hh1!=h1) {
					   if ((contenu[hh1]==ccom) && (contenu[hh2]!=ccom) && (contenu[hh2].length>1)) {// Solo a supprimer dans hh2					
							if (corrobore(hh2, h1, h2, hh1, hh2, cref)) {// validation evitement si icrash=1 (priorite au crash unicite)
    					   		if (icrash==1) {// pas d'evitement
    								wscen=tradacrit("unicité solo avec chiffre "+cref+" qui sont les chiffres de base éliminés dans "+colPlace[hh2]+" dans le rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[hh1]+" "+colPlace[hh2]+"<br>");
									scenario=noeffect;
									for (var kk=0; kk<2; kk++) {if (contenu[hh2].split(cref[kk])[0].length<contenu[hh2].length) {eliminationnumero(hh2, cref[kk])}}
        							if (scenario!=noeffect) {
											variete=2;
        									choixunicite=true;
        									if (clickmethode) {enregistrescenarios()} else {return}
                              		}
								}//icrash==1
							} else {return}// crash
					   } 
					   if ((contenu[hh2]==ccom) && (contenu[hh1]!=ccom) && (contenu[hh1].length>1)) {// Solo a supprimer dans hh1						
							if (corrobore(hh1, h1, h2, hh1, hh2, cref)) {// validation evitement si icrash=1
					   			if (icrash==1) {// pas d'evitement
    								wscen=tradacrit("unicité solo avec chiffre "+cref+" qui sont les chiffres de base éliminés dans "+colPlace[hh1]+" dans le rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[hh1]+" "+colPlace[hh2]+"<br>");
    								scenario=noeffect;
    								for (var kk=0; kk<2; kk++) {if (contenu[hh1].split(cref[kk])[0].length<contenu[hh1].length) {eliminationnumero(hh1, cref[kk])}}
    								if (scenario!=noeffect) {
                                      	variete=2;
    									choixunicite=true;
                          				if (clickmethode) {enregistrescenarios()} else {return}
                          			}
								}// icrash==1
							} else {return}// crash
					   }
        			}// hh1
				 }// j
}// icrash
			 }// jumeau
		   }// i
		}// lc
	}// k
}

function corrobore(xsol, x1, x2, x3, x4, ntable) {
var contenupre=new Array(M)
for (var ii=0; ii<M; ii++) {contenupre[ii]=contenu[ii]}
var xcarre=new Array(4);
xcarre[0]=x1;
xcarre[1]=x2;
xcarre[2]=x3;
xcarre[3]=x4;
var contenupre=new Array(M);
for (var ipre=0; ipre<M; ipre++) {contenupre[ipre]=contenu[ipre]}
// reperer cases voyant xsol, differente de xsol
for (var i=0; i<4; i++) {
	var xvu=xcarre[i];
	if ((xvu!=xsol) && sevoient(xvu, xsol)) {
		// valider successivement les 2 chiffres de xvu contenus dans le tableau ntable et verifier si xsol ne contient plus de chiffres autres que ceux de ntanle ce qui invalide la methode
		for (var j=0; j<2; j++) {
			var n1=ntable[j];
			if (j==0) {var n2=ntable[1]} else {var n2=ntable[0]}
			// Validation n1 dans xvu
			contenu[xvu]=n1;
//			elim(xvu);// Elimination de ce chiffre dans les cases ou il est vu
			// verifie contenu modifie de xsol, si ne contient que ntable[0] et/ou ntable[1] : false
			var contenumodifie=contenu[xsol];
			var lensol=contenumodifie.length;
			var nextsol=true;
			if (lensol<3) {
				for (var k=0; k<lensol; k++) {
					var m=contenumodifie.substring(k, k+1);
					if ((m==n1)|| (m==n2)) {continue} else {nextsol=false}					
				}
			} else {nextsol=false}
			if (nextsol) {// pas de corroboration, donc invalidation evitement, avec case xvu
    			wscen=noeffect;;
    			scenario="Evitement défaut unicité solo dans le rectangle "+colPlace[x1]+" "+colPlace[x2]+" "+colPlace[x3]+" "+colPlace[x4]+" contenant les 2 chiffres "+ntable+" non corroboré pour la case "+colPlace[xsol]+", dont le ou les chiffres autres sont invalidés, donc arrêt pour défaut unicité non évitable. C\'est le chiffre "+n1+" de la case "+colPlace[xvu]+" qui contribue à ce que le contenu de "+colPlace[xsol]+" soit réduit à "+contenumodifie+", invalidant ainsi la méthode permettant d'éviter un crash pour défaut d\'unicité.<br>";
				enleverougeetchiffre();
    			choixunicite=true;
    			crashunicite=true;
    			tableauvariante[maxvarencours] = scenario+"<br>";
				for (var ipre=0; ipre<M; ipre++) {contenu[ipre]=contenupre[ipre]}
				return false;
			}
			for (var ii=0; ii<M; ii++) {contenu[ii]=contenupre[ii]}// recup pour suivant						
		}// j 
	}// xvu
}// i
return true;
}

function eliminationpartielle() {
			for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
			wscen="";
			elim(xvu);// Elimination de ce chiffre dans les cases ou il est vu
}


function unicitecarreduo1() {
	for (var k=0; k<9; k++) {//carre
	  var h0=3*k+18*parseInt(k/3);
	  for (var lc=0;lc<2;lc++) {//Ligne puis colonne du carre
		var fac=1+8*lc;
		switch(lc) {
		  case 0:
			var coligref=3*(k-3*parseInt(k/3));// Colonne : 0, 3, 6, 0, 3, 6, 0, 3, 6
			break;
		  case 1:
			var coligref=3*parseInt(k/3);// Ligne :0, 0, 0, 3, 3, 3, 6, 6, 6 
			break;
		}
		for (var i=0;i<3;i++) {//ligne puis colonne
			var jumeau=true;
			var hh0=h0+(10-fac)*i;
			var ccom1=contenu[hh0];
			var ccom2=contenu[hh0+fac];
			var ccom3=contenu[hh0+2*fac];		
			if (((ccom1==ccom2) || verif(ccom2,ccom1)) && (ccom1.length==2)) {//ij=0
			   var h1=hh0;
			   var h2=h1+fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+1;
			} else if (((ccom1==ccom3) || verif(ccom3,ccom1)) && (ccom1.length==2)) {//ij=1
			   var h1=hh0;
			   var h2=h1+2*fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+2;			
			} else if (((ccom2==ccom3)  || verif(ccom3,ccom2)) && (ccom2.length==2)) {//ij=2
			   var h1=hh0+fac;
			   var h2=h1+fac;
			   var ccom=ccom2;
			   var colig1=coligref+1;
			   var colig2=coligref+2;			
			} else {
			  jumeau=false;
			}
			if (jumeau) {// Recherche sur colonnes (resp. lignes) colig1 et colig2 
				 var re=/\d/g;
				 var cref=ccom.match(re);// Chiffres de reference
				 for (var j=0;j<9;j++) {//Lignes croisant les colonnes colig1 et colig2 (resp. colonnes  vs lignes)
				 	var hh1=fac*colig1+(10-fac)*j;
					var hh2=fac*colig2+(10-fac)*j;
						if(hh1!=h1) {
							if ((contenu[hh1]==contenu[hh2]) && (contenu[hh2].length==3) && (contenu[hh1].split(cref[0])[0].length<contenu[hh1].length) && (contenu[hh1].split(cref[1])[0].length<contenu[hh1].length)) {// Duo : supprimer chiffre commun hors ccom dans cases voyanthh1 et hh2
//							if ((contenu[hh1]==contenu[hh2]) && (contenu[hh2].length==3)) {// Duo : supprimer chiffre commun hors ccom dans cases voyanthh1 et hh2
								wscen="unicité duo forme 1 avec chiffres "+cref+" qui sont les chiffres de base contenus dans le rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[hh1]+" "+colPlace[hh2];
    							// calcul 3ème chiffre
    							var contbef=contenu[hh2].match(re);
    							for (ki=0; ki<3; ki++) {
    								var nz=contbef[ki];
    								if (ccom.split(nz)[0].length==ccom.length) {var alfa=nz; break}
    							}						
    							wscen+=". Le 3ème chiffre "+alfa+" commun à "+colPlace[hh1]+" et "+colPlace[hh2]+" est supprimé de toutes les cases voyant "+colPlace[hh1]+" et "+colPlace[hh2];
    							wscen+=". Elimination dans ";
                   				var ihorizontal = parseInt(hh1/9);
                    			var ivertical=hh1-9*ihorizontal;
                    			var icarre = carre[hh1]-1;
                    			for (var lchh1=0; lchh1<3; lchh1++) {
                    				var hbloc=true;
                    				for (var ihh1=0; ihh1<9; ihh1++) {
                    					switch (lchh1) {
                    	  					case 0: // Ligne ihorizontal
                    							var h=ihh1+9*ihorizontal;
                    							break;
                    	  					case 1: // Colonne ivertical
                    							var h=ivertical+9*ihh1;
                    							break;
                    	  					case 2: // Carre icarre
                    							var h=ihh1+6*parseInt(ihh1/3)+18*parseInt(icarre/3)+3*icarre;
                        				   		hbloc=((h-9*parseInt(h/9))!=ivertical) && (parseInt(h/9)!=ihorizontal);
                    							break;
                    					}
                    					if (hbloc) {
                    						if ((h!=hh1) && (h!=hh2) && sevoient(h, hh2)  && (contenu[h].split(alfa)[0].length<contenu[h].length)) {// h voit hh1 et hh2, et contient alfa : ne peut contenir alfa
                    							wscen+=colPlace[h]+" ";
    											eliminationnumero(h, alfa);
                  							}
										}
                    				}// ihh1
            				 	}// lchh1
								if (scenario!=noeffect) {
									choixunicite=true;
    								scenario+="<br>";
									variete=3;
    								if (clickmethode) {enregistrescenarios()} else {return}
								}
						   }// Duo
				 		}// hh1!=h1
				 }// j
			 }// jumeau
		   }// i
		}// lc
	}// k
}

function unicitecarreduo2() {
	for (var k=0; k<9; k++) {//carre
	  var h0=3*k+18*parseInt(k/3);
	  for (var lc=0;lc<2;lc++) {//Ligne puis colonne du carre
		var fac=1+8*lc;
		switch(lc) {
		  case 0:
			var coligref=3*(k-3*parseInt(k/3));// Colonne : 0, 3, 6, 0, 3, 6, 0, 3, 6
			break;
		  case 1:
			var coligref=3*parseInt(k/3);// Ligne :0, 0, 0, 3, 3, 3, 6, 6, 6 
			break;
		}
		for (var i=0;i<3;i++) {//ligne puis colonne
			var jumeau=true;
			var hh0=h0+(10-fac)*i;
			var ccom1=contenu[hh0];
			var ccom2=contenu[hh0+fac];
			var ccom3=contenu[hh0+2*fac];		
			if (((ccom1==ccom2) || verif(ccom2,ccom1)) && (ccom1.length==2)) {//ij=0
			   var h1=hh0;
			   var h2=h1+fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+1;
			} else if (((ccom1==ccom3) || verif(ccom3,ccom1)) && (ccom1.length==2)) {//ij=1
			   var h1=hh0;
			   var h2=h1+2*fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+2;			
			} else if (((ccom2==ccom3)  || verif(ccom3,ccom2)) && (ccom2.length==2)) {//ij=2
			   var h1=hh0+fac;
			   var h2=h1+fac;
			   var ccom=ccom2;
			   var colig1=coligref+1;
			   var colig2=coligref+2;			
			} else {
			  jumeau=false;
			}
			if (jumeau) {// Recherche sur colonnes (resp. lignes) colig1 et colig2 
				 var re=/\d/g;
				 var cref=ccom.match(re);// Chiffres de reference
				 for (var j=0;j<9;j++) {//Lignes croisant les colonnes colig1 et colig2 (resp. colonnes  vs lignes)
				 	var hh1=fac*colig1+(10-fac)*j;
					var hh2=fac*colig2+(10-fac)*j;
					if(hh1!=h1) {
						if ((contenu[hh1]==contenu[hh2]) && (contenu[hh2].length==4) && (contenu[hh1].split(cref[0])[0].length<contenu[hh1].length) && (contenu[hh1].split(cref[1])[0].length<contenu[hh1].length)) {// Duo : supprimer chiffres communs hors ccom dans cases voyant hh1, hh2 et hh3
								wscen="unicité duo forme 2 avec chiffres "+cref+" qui sont les chiffres de base contenus dans le rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[hh1]+" "+colPlace[hh2];
    							// calcul 3ème et 4eme chiffre
    							var contbef=contenu[hh2].match(re);
    							var alfa=0;
								for (ki=0; ki<4; ki++) {
    								var nz=contbef[ki];
    								if (ccom.split(nz)[0].length==ccom.length) {
										if (alfa==0) {
											var alfa=nz; continue;											
										} else {
											var beta=nz; break;
										}
									}
    							}
								// Recherche de hh3 dans bloc de hh1 et hh2, sur leur axe, et contenant alfa et beta uniquement
								var ihorizontal = parseInt(hh1/9);
                    			var ivertical=hh1-9*ihorizontal;
                    			var icarre = carre[hh1]-1;
                   				for (var ihh1=0; ihh1<9; ihh1++) {
	       							var h=ihh1+6*parseInt(ihh1/3)+18*parseInt(icarre/3)+3*icarre;
               				   		var hbloc=((h-9*parseInt(h/9))==ivertical) || (parseInt(h/9)==ihorizontal);
                    				if (hbloc) {// h sur axe et dans bloc
											if ((h!=hh1) && (h!=hh2)) {
												var posk=contenu[h];
												// verification posk=alfa-beta
												if ((posk.length==2) && (posk.split(alfa)[0].length<posk.length) && (posk.split(beta)[0].length<posk.length)) {
													var hh3=h;
													break;
												}
											}
										}
                   				}// ihh1
								if (ihh1<9) {
    								wscen+=". Les 3<sup>ème</sup> et 4<sup>ème</sup> chiffre "+alfa+" et "+beta+" communs à "+colPlace[hh1]+" et "+colPlace[hh2]+" sont supprimés de toutes les cases voyant "+colPlace[hh1]+", "+colPlace[hh2]+" et une 3<sup>ème</sup> case "+colPlace[hh3]+" dans leur bloc et sur leur axe, contenant ces 2 chiffres uniquement";
    								wscen+=". Elimination dans ";
									// suppression alfa et beta dans cases du bloc de hh1, hh2 et hh3
                       				for (var ihh=0; ihh<9; ihh++) {// Elimination dans bloc
    	       							var h=ihh+6*parseInt(ihh/3)+18*parseInt(icarre/3)+3*icarre;
    									if ((h!=hh1) && (h!=hh2) && (h!=hh3)) {
    											var posk=contenu[h];
												var fait=false;
    											if (posk.split(alfa)[0].length<posk.length) {
													wscen+=colPlace[h]+" ";
													fait=true;
													eliminationnumero(h, alfa);
												}
    											if (posk.split(beta)[0].length<posk.length) {
													if (!fait) {wscen+=colPlace[h]+" "}
													eliminationnumero(h, beta);
												}
										}// h !=
									}// ihh
									// axe commun
									var iaxeh=true;
									if (parseInt(hh1/9)!=parseInt(hh2/9)) {iaxe=false}
									// suppression alfa et beta dans cases de axe hh1, hh2 et hh3
                       				for (var ihh=0; ihh<9; ihh++) {// Elimination dans axe
    	       							if (iaxe) {var h=ihh+9*ihorizontal} else {var h=9*ihh+ivertical}
    									if ((h!=hh1) && (h!=hh2) && (h!=hh3)) {
    											var posk=contenu[h];
												var fait=false;
    											if (posk.split(alfa)[0].length<posk.length) {
													wscen+=colPlace[h]+" ";
													fait=true;
													eliminationnumero(h, alfa);
												}
    											if (posk.split(beta)[0].length<posk.length) {
													if (!fait) {wscen+=colPlace[h]+" "}
													eliminationnumero(h, beta);
												}
										}// h !=
                       				}// ihh
								}// ihh1<9
								if (scenario!=noeffect) {
									choixunicite=true;
									variete=4;
    								if (clickmethode) {enregistrescenarios()} else {return}
								}
						   }// Duo
				 	}// hh1!=h1
				 }// j
			 }// jumeau
		   }// i
		}// lc
	}// k
}
/*
function verif(a, b) { // Test si nombre a est contenu dans nombre b, dans chacun de ses chiffres
	var re = /\d/g;
	var aa = a.toString().match(re);
	for (var j=0; j<aa.length; j++) {if (!(b.toString().split(aa[j])[0].length<b.length)) {return false}}// Chiffre aa[j] non contenu dans b
	return true;
}
*/

function unicitecarreduodifferents() {// jumeaux en diagonale
	for (var k=0; k<9; k++) {//carre
	  var h0=3*k+18*parseInt(k/3);
	  for (var lc=0;lc<2;lc++) {//Ligne puis colonne du carre
		var fac=1+8*lc;
		switch(lc) {
		  case 0:
			var coligref=3*(k-3*parseInt(k/3));// Colonne : 0, 3, 6, 0, 3, 6, 0, 3, 6
			break;
		  case 1:
			var coligref=3*parseInt(k/3);// Ligne :0, 0, 0, 3, 3, 3, 6, 6, 6 
			break;
		}
		for (var i=0;i<3;i++) {//ligne puis colonne
			var jumeau=true;
			var hh0=h0+(10-fac)*i;
			var ccom1=contenu[hh0];
			var ccom2=contenu[hh0+fac];
			var ccom3=contenu[hh0+2*fac];		
			if (((ccom1==ccom2) || verif(ccom2,ccom1)) && (ccom1.length==2)) {//ij=0
			   var h1=hh0;
			   var h2=h1+fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+1;
			} else if (((ccom1==ccom3) || verif(ccom3,ccom1)) && (ccom1.length==2)) {//ij=1
			   var h1=hh0;
			   var h2=h1+2*fac;
			   var ccom=ccom1;
			   var colig1=coligref;
			   var colig2=coligref+2;			
			} else if (((ccom2==ccom3)  || verif(ccom3,ccom2)) && (ccom2.length==2)) {//ij=2
			   var h1=hh0+fac;
			   var h2=h1+fac;
			   var ccom=ccom2;
			   var colig1=coligref+1;
			   var colig2=coligref+2;			
			} else {
			  jumeau=false;
			}
			if (jumeau) {// Recherche sur colonnes (resp. lignes) colig1 et colig2 
				 var re=/\d/g;
				 var cref=ccom.match(re);// Chiffres de reference
				 for (var j=0;j<9;j++) {//Lignes croisant les colonnes colig1 et colig2 (resp. colonnes  vs lignes)
				 	var hh1=fac*colig1+(10-fac)*j;
					var hh2=fac*colig2+(10-fac)*j;
					if(hh1!=h1) {
//						if ((contenu[hh1].split(cref[0])[0].length<contenu[hh1].length) && (contenu[hh2].split(cref[1])[0].length<contenu[hh2].length) && (contenu[hh1].split(cref[0])[0].length<contenu[hh1].length) && (contenu[hh2].split(cref[1])[0].length<contenu[hh2].length)) {// Duo : supprimer chiffre cref[1] dans hh1 et hh2 si liens forts par cref[0] entre h1 et hh1, et h2 et hh2
						if ((contenu[hh1].split(cref[0])[0].length<contenu[hh1].length) && (contenu[hh2].split(cref[1])[0].length<contenu[hh2].length) && (contenu[hh1].split(cref[1])[0].length<contenu[hh1].length) && (contenu[hh2].split(cref[0])[0].length<contenu[hh2].length)) {// Duo : supprimer chiffre cref[1] dans hh1 et hh2 si liens forts par cref[0] entre h1 et hh1, et h2 et hh2
								wscen=tradacrit("unicité duo differents avec chiffres ")+cref+" qui sont les chiffres de base contenus dans le rectangle "+colPlace[h1]+" "+colPlace[h2]+" "+colPlace[hh1]+" "+colPlace[hh2];
    							// lien fort h1-hh1 par cref[0] ou cref[1], resp h2-hh2
								var alfa=cref[0];
								var beta = cref[1];
								if (!((contenu[h1]==ccom) && (contenu[h2]==ccom) && (contenu[hh1]==ccom) && (contenu[hh2]==ccom))) {
								if (testlienfortgeneral(h1, hh1, alfa) && testlienfortgeneral(h2, hh2, alfa)) {// Eliminer beta dans hh1 et hh2 sauf rectangle
									wscen+=". Liens forts par le chiffre "+alfa+" entre les cases "+colPlace[h1]+" et "+colPlace[hh1]+" d\'une part, et "+colPlace[h2]+" et "+colPlace[hh2]+" d\'autre part. Elimination du chiffre "+beta+" dans "+colPlace[hh1]+" et "+colPlace[hh2];
									eliminationnumero(hh1, beta);
									eliminationnumero(hh2, beta);
								} else if (testlienfortgeneral(h1, hh1, beta) && testlienfortgeneral(h2, hh2, beta)) {// Eliminer alfa dans hh1 et hh2 sauf rectangle
									wscen+=". Liens forts par le chiffre "+beta+" entre les cases "+colPlace[h1]+" et "+colPlace[hh1]+" d\'une part, et "+colPlace[h2]+" et "+colPlace[hh2]+" d\'autre part. Elimination du chiffre "+alfa+" dans "+colPlace[hh1]+" et "+colPlace[hh2];
									eliminationnumero(hh1, alfa);
									eliminationnumero(hh2, alfa);
								}}
								if (scenario!=noeffect) {
									choixunicite=true;
									variete=5;
    								if (clickmethode) {enregistrescenarios()} else {return}
								}
						   }// Duo
				 	}// hh1!=h1
				 }// j
			 }// jumeau
		   }// i
		}// lc
	}// k
}


function unicitediagonale() {
var re=/\d/g;
var tabbloc=[[1,2,3,6],[2,4,7],[5,8],[4,5,6],[5,7],[8],[7,8],[8]];
var maxbloc=[4,3,2,3,2,1,2,1];
for (var h1=0; h1<M-9; h1++) {
	var posh1=contenu[h1];
	if (posh1.length != 2) {continue}
	var cref=posh1.match(re);
	var alfa=cref[0];
	var beta=cref[1];
	bloch1=carre[h1]-1;
	for (var ibloc=0; ibloc<maxbloc[bloch1]; ibloc++) {
		// blocs differents sur meme axe
		var chh2=tabbloc[bloch1][ibloc];
		var rap=parseInt(chh2/3);
		var hh20=3*(chh2-3*rap)+27*rap;
		for (var jhh2=0; jhh2<9; jhh2++) {
			var hh2=hh20+jhh2+6*parseInt(jhh2/3);
			// 3 Conditions de validite hh2 : plus grand que h1 et pas sur meme axe (horizontal ou vertical)
			if ((hh2>h1) && (parseInt(h1/9)!=parseInt(hh2/9)) && ((h1-9*parseInt(h1/9))!=(hh2-9*parseInt(hh2/9)))) {
				if (contenu[hh2]==posh1) {// cases en diagonale egales avec 2 chiffres
					// Construire les 2 autres sommets
					sommet1=h1-(h1-9*parseInt(h1/9))+(hh2-9*parseInt(hh2/9));
					sommet2=h1-9*(parseInt(h1/9)-parseInt(hh2/9));
					//verifier contiennent alfa et beta
					var pos1=contenu[sommet1];
					var pos2=contenu[sommet2];
					if((pos1.length>2) && (pos2.length>2)) {
						if ((pos1.split(alfa)[0].length<pos1.length) && (pos1.split(beta)[0].length<pos1.length) && (pos2.split(alfa)[0].length<pos2.length) && (pos2.split(beta)[0].length<pos2.length) ) {
							// verifier liens forts par alfa ou par beta
							var cond1=testlienfortgeneral(h1, sommet1, alfa) && testlienfortgeneral(hh2, sommet2, alfa);
							var cond2=testlienfortgeneral(h1, sommet2, alfa) && testlienfortgeneral(hh2, sommet1, alfa);
							var cond3=testlienfortgeneral(h1, sommet1, beta) && testlienfortgeneral(hh2, sommet2, beta);
							var cond4=testlienfortgeneral(h1, sommet2, beta) && testlienfortgeneral(hh2, sommet1, beta);
							if (cond1 || cond2) {// enlever beta de sommet 1 et sommet2
									wscen="Evitement unicité duo diagonale dans le rectangle "+colPlace[h1]+" "+colPlace[sommet1]+" "+colPlace[sommet2]+" "+colPlace[hh2]+" avec chiffres de base "+alfa+" "+beta+" dans "+colPlace[h1]+" et "+colPlace[hh2]+", contenus "+tradacrit("également")+" dans les 2 autres sommets du rectangle. ";
									if (cond1) {wscen+=". Liens forts par le chiffre "+alfa+" entre les cases "+colPlace[h1]+" et "+colPlace[sommet1]+" d\'une part, et "+colPlace[sommet2]+" et "+colPlace[hh2]+" d\'autre part. Elimination du chiffre "+alfa+" dans les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]}
									else if (cond2) {wscen+=". Liens forts par le chiffre "+alfa+" entre les cases "+colPlace[h1]+" et "+colPlace[sommet2]+" d\'une part, et "+colPlace[sommet1]+" et "+colPlace[hh2]+" d\'autre part. Elimination du chiffre "+alfa+" dans les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]}
									eliminationnumero(sommet1, alfa);
									eliminationnumero(sommet2, alfa);
							} else if (cond3 || cond4) {// enlever alfa de sommet 1 et sommet2
									wscen="Evitement unicité duo diagonale dans le rectangle "+colPlace[h1]+" "+colPlace[sommet1]+" "+colPlace[sommet2]+" "+colPlace[hh2]+" avec chiffres de base "+alfa+" "+beta+" dans "+colPlace[h1]+" et "+colPlace[hh2]+", contenus "+tradacrit("également")+" dans les 2 autres sommets du rectangle. ";
									if (cond3) {wscen+=". Liens forts par le chiffre "+beta+" entre les cases "+colPlace[h1]+" et "+colPlace[sommet1]+" d\'une part, et "+colPlace[sommet2]+" et "+colPlace[hh2]+" d\'autre part. Elimination du chiffre "+beta+" dans les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]}
									else if (cond4) {wscen+=". Liens forts par le chiffre "+beta+" entre les cases "+colPlace[h1]+" et "+colPlace[sommet2]+" d\'une part, et "+colPlace[sommet1]+" et "+colPlace[hh2]+" d\'autre part. Elimination du chiffre "+beta+" dans les cases "+colPlace[sommet1]+" et "+colPlace[sommet2]}
									eliminationnumero(sommet1, beta);
									eliminationnumero(sommet2, beta);
							}// conditions 12 et 34
						}// conditions globales
						if (scenario!=noeffect) {
									choixunicite=true;
									variete=6;
    								if (clickmethode) {enregistrescenarios()} else {return}
						}						 
					}// longueur > 2 
				}// cases diagonales egales
			}// 3 conditions hh2
		}// jhh2
	}// ibloc
}// h1
}

function findlarron(param, z1, z2, z3, z4, chif, horizon) {
	var a1=param[0];
	var a2=param[1];
	switch(a1) {
		case "1":
			sommet1=z1;
			break;
		case "2":
			sommet1=z2;
			break;
		case "3":
			sommet1=z3;
			break;
	}	
	switch(a2) {
		case "2":
			sommet2=z2;
			sommet3=z3;
			sommet4=z4;
			break;
		case "3":
			sommet2=z3;
			sommet3=z2;
			sommet4=z4;
			break;
		case "4":
			sommet2=z4;
			sommet3=z1;
			sommet4=z2;
			if (sommet1==z2) {sommet4=z3}
			break;
	}
	var seul=0;
	larron=-1;
	for (var ih=0; ih<9; ih++) {
		var larronencours=9*parseInt(sommet1/9)+ih;
		if (!horizon) {larronencours=9*ih+sommet1-9*parseInt(sommet1/9)}// ligcol-1
		var poslarron=contenu[larronencours];
		var autresommet=sommet3;
		var carl=carre[larronencours]-1;
		if (carre[larronencours]==(bloch4+1)) {autresommet=sommet4}
		if ((larronencours!=sommet1) && (larronencours!=sommet2) && (poslarron.length>1) && (poslarron.split(chif)[0].length<poslarron.length) && sevoient(larronencours, autresommet)) {
			seul+=1;
			if (seul==1) {
    			if ((carl==bloch1) || (carl==bloch4)) {larron=larronencours}
			}
		}
	}// ih
	if (seul==1) {// larron seul sur axe (horizontal ou vertical) contenant chif, different de sommet1 et de sommet2
		LT12=true;
		var krit=(carre[larron]!=(bloch4+1));
		if (larrondansbloc(krit, chif, seul)) {
		return true}
	} else {// larron pas sur axe --> cas LT de numero plus grand que 2 : larron3
		LT12=false;
		if (carre[larron]!=(bloch4+1)) {autresommet=sommet3}
		// Case larron dans blocs bloch1 puis bloch4 (2 cas)
		for (var i=0; i<2; i++) {// dans un bloc ou dans eutre
			var krit=(i==0);
			if (larrondansbloc(krit, chif, seul)) {
			return true}
		}// i
	}// seul
	return false;
}
function larrondansbloc(kritbloch4, chiffre, solo) {
		var blocref=bloch4;
		var x1=sommet2;
		var x2=sommet4;
		if (kritbloch4) {blocref=bloch1; x1=sommet1; x2=sommet3}// ou i=1
		var seul=0;
		var larbloc=M;
		for (var ch=0; ch<9; ch++) {
			var hbloc=ch+6*parseInt(ch/3)+18*parseInt(blocref/3)+3*blocref; // dans le bloc bloch4
			var posbloc=contenu[hbloc];
			if ((hbloc!=x1) && (hbloc!=x2) && (posbloc.length>1) && (posbloc.split(chiffre)[0].length<posbloc.length)) {
				seul+=1;
				if (seul==1) {larbloc=hbloc}
			}
		}// ch
		if (seul==1) {// larron seul dans bloc
			larron=larbloc;
			// larron seul dans le bloc contenant chif, different de h2 et de h4 : ok
			if (carre[larron]==carre[sommet1]) {// reverse
					var rev=sommet1;
    				sommet1=sommet2;
    				sommet2=rev;
    				var rev=sommet3;
    				sommet3=sommet4;
    				sommet4=rev;
   			}
   			return true;
		}
		return false;
}

function larronseul() {// une seule case a 2 chiffres dans le rectangle
	var nlarron=0;
	if (contenu[sommet1].length==2) {nlarron+=1}
	if (contenu[sommet2].length==2) {nlarron+=1}
	if (contenu[sommet3].length==2) {nlarron+=1}
	if (contenu[sommet4].length==2) {nlarron+=1}
	return (nlarron==1);
}

function voitcase(x, y, z) {
	var a = x;
	if (!sevoient(z, y)) {a=y}
	return a;
}

function elaborevarianteunicitecarree() {
	 // variete 0 : Toutes les variantes de toutes les variétés applicables de la méthode 32 (unicitecarree())
		 // variete 1 : "unicite BUG +1 validant chiffre " + n + " dans "+ colPlace[lacase]
		 // variete 2 : "unicite solo avec chiffre "+cref+" qui sont les chiffres de base elimines dans "+colPlace[hh2]+" dans rectangle "+....
		 // variete 3 : "unicite duo forme 1 
		 // variete 4 : "unicite duo forme 2 
		 // variete 5 : "unicite duo differents
		 // variete 6 : "unicite duo diagonale
		 // variete 7 :  "unicite LT nÂ°1
		 // variete 8 :  "unicite LT nÂ°2
		 // variete 9 :  "unicite LT nÂ°3
		 // variete 10 :  "unicite LT nÂ°4
		 // variete 11 : "unicite LT nÂ°4 bis
		 // variete 12 : "unicite LT nÂ°5
		 // variete 13 : "unicite LT nÂ°6
		 // variete 14 : Rectangle caché nÂ°1
		 // variete 15 : Rectangle caché nÂ°2
		 // variete 16 : Rectangle caché nÂ°3
		 // variete 17 : Rectangle caché nÂ°4
		 // variete 18 : Rectangle caché nÂ°5
		 // variete 19 : Rectangle avoidable nÂ°1
		 // variete 20 : Rectangle avoidable nÂ°2
		 var re=/\d/g;
		 var sinit=(scenario.split(tradacrit("unicité "))[1]).split(" ")[0];
		 putmessage("Début élabore sinit "+sinit);
		 switch (sinit) {
		 		case "BUG":
					 variete=1;
					 var s0=scenario.split("chiffre ")[1];
					 var n=s0.substring(0,1);
					 var s1=s0.split(" dans ")[1];
					 var s2=s1.substring(0,2);
					 var h=decodagecolPlace(s2);
					 var posk=contenu[h].toString();
					 var ch=posk.match(re);
					 for (var i=0; i<3; i++) {
            			if (ch[i]!=n) {eliminationnumero(h,ch[i])}
            		 }
					 break;
		 		case "solo":
					 variete=2;
					 var s0=scenario.split("solo ")[1];
					 if (s0.split("corroboré")[0].length==s0.length) {
    					 var s1=s0.split(" chiffre ")[1];
    					 var nc1=s1.substring(0,1);
    					 var nc2=s1.substring(2,3);
    					 var s2=s0.split("dans ")[1];
                		 var h=decodagecolPlace(s2);
    					 eliminationnumero(h,nc1);
    					 eliminationnumero(h,nc2);
					 }
					 break;
		 		case "duo":// forme 1, forme 2 et differents
					 if (scenario.split("forme 1")[0].length<scenario.length) {// forme 1
					 	 variete=3;
    					 var s0=scenario.split("duo forme 1 ")[1];
    					 var s1=s0.split(" chiffre ")[1];
    					 var nc=s1.substring(0,1);
    					 var s2=s0.split("Elimination dans ")[1];
    					 var imax=s2.length/3;
    					 for (var i=0; i<imax; i++) {
    					 	var scar=s2.substring(3*i, 3*i+2);
    					 	var h=decodagecolPlace(scar);
    						eliminationnumero(h,nc);
    					}
					} else if (scenario.split("forme 2")[0].length<scenario.length) {// forme 2
					 	 variete=4;
    					 var s0=scenario.split("duo forme 2 ")[1];
    					 var s1=s0.split(" chiffre ")[1];
    					 var nc1=s1.substring(0,1);
    					 var nc2=s1.substring(5,6);
    					 var s2=s0.split("Elimination dans ")[1];
    					 var imax=s2.length/3;
    					 for (var i=0; i<imax; i++) {
    					 	var scar=s2.substring(3*i, 3*i+2);
    					 	var h=decodagecolPlace(scar);
    						if (contenu[h].split(nc1)[0].length<contenu[h].length) {eliminationnumero(h,nc1)}
    						if (contenu[h].split(nc2)[0].length<contenu[h].length) {eliminationnumero(h,nc2)}
    					}
					} else if (scenario.split("differents ")[0].length<scenario.length) {// differents
						variete=5;
						var s0=scenario.split("differents ")[1];
						var s1=s0.split("du chiffre ")[1];
						var n=s1.substring(0,1);
						var s2=s1.split(" dans ")[1];
						var hh1=decodagecolPlace(s2.substring(0,2));
						var hh2=decodagecolPlace(s2.substring(6,8));
						eliminationnumero(hh1,n);
						eliminationnumero(hh2,n);
					} else if (scenario.split("diagonale ")[0].length<scenario.length) {// diagonale
						variete=6;
						var s0=scenario.split("diagonale ")[1];
						var s1=s0.split("le chiffre ")[1];
						var n=s1.substring(0,1);
						var s2=s1.split(" dans les cases ")[1];
						var hh1=decodagecolPlace(s2.substring(0,2));
						var hh2=decodagecolPlace(s2.substring(6,8));
						eliminationnumero(hh1,n);
						eliminationnumero(hh2,n);
					}
					break;
				case "LT":
					var s0=scenario.split("Cas LT")[1];
					var cas=parseInt(s0.substring(0,1));
    					var bis=s0.substring(1,2);
    					if (bis=="<") {cas+=1} else if(cas>4) {cas+=1}
    					variete=6+cas;
						var s1=s0.split("uppression ")[1]
    					var n=s1.substring(0,1);
    					var s2=s1.split(" dans ")[1];
						var HH=s2.substring(0,2);
						var h=autredecode(HH);
                    	var rect=scenario.split("rectangle ")[1];
    					var chiff=rect.split("chiffres ")[1];
                    	var alfa=parseInt(chiff.substring(0,1));
                    	var beta=chiff.substring(5,6);
                    	var casesrect=rect.substring(0,12);
                    	var verslarr=rect.split("Autre case ")[1];
                    	var caselarr=verslarr.substring(0,2);
                    	var gamma=verslarr.split("le chiffre ")[1].substring(0,1);
                    	var larr=autredecode(caselarr);
						eliminationnumero(h, n);
                    	decodevert(casesrect, alfa);
                    	decodevert(casesrect,beta);
                    	miseauvert(larr, gamma, BACKBLEU);
					break;
				case "Rectangle":
/*
var c=scenario.split("Rec")[0];
putmessage("Schlumpf<br>"+c+"<br>"+c.replaceAll(tradacrit("é"), "e")+"<br>"+c.replaceAll(tradacrit("é"), "é")+"<br><br>"+scenario);
//					var d=scenario.replaceAll(tradacrit("é"), "é");
//					var d=scenario.replaceAll("é", tradacrit("é"));
					var xs0=scenario.split("le chiffre ")[2];
//					var xs0=d.split(tradacrit("numero "));
					var s0=scenario.split(" dans ")[0];
					var s1=scenario.split(" dans ")[1];
					var s2=scenario.split(" dans ")[2];
					var s3=scenario.split(" dans ")[3];
					var s4=scenario.split(" dans ")[4];
					var s5=scenario.split(" dans rectangle ")[1];
					putmessage("Aargh "+s0+"<br>"+s1+"<br>"+s2+"<br>"+s3+"<br>"+s4+"<br><br><br>"+s5);
*/
					var xs0=scenario.split("numero ");
					var s0=xs0[1];
					var cas=parseInt(s0.substring(0,1));
					variete=13+cas;
                    var rect=s0.split("dans rectangle ")[1];
                    var caserect=rect.substring(0,12);
					var s00=xs0[2];
					var s1=s00.split(": suppression ")[1]
    				var n=s1.substring(0,1);
    				var s2=s1.split(" dans ")[1];
					var HH=s2.substring(0,2);
					var h=autredecode(HH);
    				var chiff=rect.split("chiffres ")[1];
                    var alfa=parseInt(chiff.substring(0,1));
                    var beta=chiff.substring(5,6);
					eliminationnumero(h, n);
					if ((cas==3) || (cas==4) || (cas==5)) {
						var s3=s1.split(" et ")[1];
        				var n=s3.substring(0,1);
        				var s2=s3.split(" dans ")[1];
    					var h=decodagecolPlace(s2.substring(0,2));
						eliminationnumero(h, n);
					}
					if (cas==5) {
						var h=decodagecolPlace(caserect.substring(caserect.length-3, caserect.length-1));					
						var posk=contenu[h];
						var chk=posk.match(re);
						for (var ch=0; ch<chk.length; ch++) {
							if ((chk[ch]!=alfa) && (chk[ch]!=beta)) {eliminationnumero(h, chk[ch])}
						}
					}
                    decodevert(caserect, alfa);
                    decodevert(caserect,beta);
					break;
				case "avoidable":
					var s0=scenario.split("avoidable nÂ°")[1];
					var cas=parseInt(s0.substring(0,1));
					variete=18+cas;
					var s1=s0.split("Elimination ")[1]
    				var n=s1.substring(0,1);
					var sw=s1.split(" dans ");
					for (var j=1; j<sw.length; j++) {// chiffre n commun pour avoidable nÂ°2
						var s2=sw[j]
    					var HH=s2.substring(0,2);
    					var h=autredecode(HH);
    					eliminationnumero(h, n);
					}
					break;				
				default:// Pas de variete ... 
					 break;		 
		 }
}


function elaborevariantecrashunicite() {// uniquement pour verdir ou bleuir avec miseauvert(h,n,BACKVERT ou BACKBLEU) ou decodevert(liste, n) ou decodebleu(liste, n)
// variete=0 : "crash unicite bug+1
// variete=1 : "Crash unicite rectangle
//scenario="Evitement défaut unicité solo dans le rectangle "+colPlace[x1]+" "+colPlace[x2]+" "+colPlace[x3]+" "+colPlace[x4]+" contenant les 2 chiffres "+ntable+" non corroboré pour la case "+colPlace[xsol]+", dont le ou les chiffres autres sont invalidés, donc arrêt pour défaut unicité non évitable. C\'est le chiffre "+n1+" de la case "+colPlace[xvu]+" qui contribue à ce que le contenu de "+colPlace[xsol]+" soit réduit à "+contenumodifie+", invalidant ainsi la méthode permettant d'éviter un crash pour défaut d\'unicité.<br>";
		var chifint="est le chiffre ";
		if (scenario.split(chifint)[0].length<scenario.length) {
				var ashe=scenario.split(chifint)[1];
				var n1= ashe.substring(0,1);
				var b=ashe.split("de la case ") [1];
				var xvu=decodagecolPlace(b.substring(0,2));
				miseauvert(xvu, n1, BACKVERT);// verdit le chiffre 9 de la case F2
				var c=b.split("le contenu de ")[1];
				var xsol=decodagecolPlace(c.substring(0,2));
				var d=c.split("réduit à ")[1];
				var contenumodifie=d.split(",")[0];
            	var re=/\d/g;
            	var xerr=contenu[xsol].match(re);
            	coloris=true;
            	for (var ch=0; ch<xerr.length; ch++) {
            		var xx=xerr[ch];
            		if (xx != contenumodifie) {eliminationnumero(xsol, xx)}
    			}
				for (var ic=0; ic<contenumodifie.length; ic++) {miseauvert(xsol, contenumodifie.substring(ic, ic+1), BACKBLEU)}// bleuit le nouveau contenu de la case xsol 
		} else {putmessage(scenario)}
}
