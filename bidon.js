function regroop() {// -HHHHHH- ou -HH- suivi de -xxxx- ou -x-
	var sx=scenario.split("<br>")[0];
	var regegal = new RegExp('[=]', 'gi');
	var s0=sx.replace(regegal, "-");
	var s1=s0.split("-");
	var xl=(s1[s1.length-1]);
	if (xl.length>2) {scenario+=xl}
	var prems=true;
	for (var i=1; i<s1.length-1; i++) {
    		  if ((s1[i+1].length==1) && (s1[i].length>2)){
    			  if (prems) {
    				scenario+=tradacrit("<br><br>Cases regroupées : ");
        		  }
        		  prems=false;
        		  scenario+=s1[i]+" ";
			  }
	}
	scenario=tradacrit(scenario+"<br>");
}

function lessolutionssinonvalide(hk0, chif0, lienfinal) {
	var re=/\d/g;
	if (xychain>1) {// Recherche solutions au dela du noeud 2
		var posdep=contenu[casedepart];
 		var chkdep=posdep.match(re);
		if ((posdep.length==2) && (posdep==contenu[hk0]) && (chiffrexy[0]==chif0) && !sevoient(casedepart, hk0)) {
				var autrechiffre=chkdep[0];
				if (autrechiffre==chif0) {autrechiffre=chkdep[1]}
				// Eliminer autrechiffre dans toutes les cases voyant casedepart et hk0, sauf les cases node
				wscen="AIC type I ";
				etablirchaine();// Chaine batie avec casexy, chiffrexy et lienfaible, de 0 a xychain
				variete=2;
		}		
	}
}

function lessolutionsextremesegales(case0ref, hknext, chif0) {
	var re=/\d/g;
	var posref=contenu[hknext];
 	var chref=posref.match(re);
	casexy[xychain]=colPlace[case0ref];// xychain
	casexy[xychain+1]=colPlace[hknext];// xychain+1
	chiffrexy[xychain]=chif0;
	// AIC type I
	if (wscen.substring(0,3) != "AIC") {wscen="AIC type I "+wscen}
	variete=2;
	var autrechiffre=chref[0];
	if (autrechiffre==chif0) {autrechiffre=chref[1]}
	// eleminer autrechiffre dans les cases voyant les cases extremes hknext et casedepart
   	if (xychain>1) {
	eliminationchiffre(colPlace[hknext], colPlace[casedepart], autrechiffre)}						
	xychain+=1;
}

function lessolutions(chif0) {
	var lienint=lienfaible[xychain];
	var casefinale=casexy[xychain];
	var case0ref=decodagecolPlace(casefinale.substring(0,2));
	if ((casefinale.length>2) && !sevoient(casedepart, decodagecolPlace(casefinale.substring(2,4)))) {return}
	wscen=scenario;
	var re=/\d/g;
	var posref=contenu[case0ref];
 	var chref=posref.match(re);
	if (xychain>1) {// Recherche solutions au dela du noeud 2
		var posdep=contenu[casedepart];
 		var chkdep=posdep.match(re);
		var lienfortpre=!lienfaible[xychain-1];// Nature du lien amont de case0ref
		// Case de depart differente de case0ref contenant le candidat chif0 de case0ref
		if ((posdep.split(chif0)[0].length<posdep.length) && (case0ref!=casedepart)) {
			var lienfortinitial=!lienfaible[0];
			// case de depart voit la case case0ref : boucles (continue ou discontinue) ou AIC Type II
			if (sevoient(case0ref, casedepart)) {// case0ref voit casedepart
                chiffrexy[xychain]=chif0;
                var lienfortfinal=(xychain>2) && testlienfortgeneral(case0ref, casedepart, chif0);
                lienfaible[xychain]=!lienfortfinal;// lien final
                var egalitechiffres=(chiffrexy[xychain-1]==chif0);
                var egalitechiffresinitial=(chiffrexy[0]==chif0);
                var egalitechiffresfinal=(chiffrexy[0]==chiffrexy[xychain-1]);
                var validsortie=(Xamont && egalitechiffres)  || (Xamont && !egalitechiffres && lienfortfinal);
				if (validsortie) {// Lien valide entre case0ref et casedepart : boucle
                	if (!egalitechiffres) {Xamont=!Xamont}
                	validsortie =(Xamont &&  egalitechiffresinitial) || (!Xamont && !egalitechiffresinitial);
					if (validsortie && lienfortinitial)  {
                			wscen="AIC loop continu ";
                 			etablirchaine();
                  			if (lienfortfinal) {wscen+="="+chif0+"="} else {wscen+="-"+chif0+"-"}
                 			wscen+=colPlace[casedepart];
                			solutioncontinue();
                			variete=0;
                	} else if (egalitechiffresinitial && (lienfortfinal == lienfortinitial)) {
						chiffrexy[xychain+1]=chif0;
						wscen="AIC loop discontinu ";
						etablirchaine();
                		if (lienfortfinal) {wscen+="="+chif0+"="} else {wscen+="-"+chif0+"-"}
                		wscen+=colPlace[casedepart];
						xychain+=1;
						calculXamont(false);
						xychain-=1;
                		variete=1;
						if (!Xamont) {
							if (lienfortfinal) {
wscen+=tradacrit("<br>Défaut d\'alternance sur la case de départ "+colPlace[casedepart]+tradacrit(" qui est entourée des chiffres candidats égaux ")+chif0+" avec des liens forts. Cette case contient "+chif0+".<br><br>");
                            	wscen+=chiffrefort+chif0+incase+colPlace[casedepart]+".";
								for (var hnum=0; hnum<posdep.length; hnum++) {if (chkdep[hnum] !=chif0) {
								eliminationnumero(casedepart, chkdep[hnum])}}
							} else {
								calculXamont(true);
								if (Xamont) {
wscen+=tradacrit("<br>Défaut d\'alternance sur la case de départ "+colPlace[casedepart]+tradacrit(" qui est entourée des chiffres candidats égaux ")+chif0+" avec des liens faibles. Cette case ne contient pas "+chif0+".<br><br>");
    								wscen+=chiffreseul+chif0+incase+colPlace[casedepart]+".";
        							eliminationnumero(casedepart, chif0);
								}
							}
						}
                	}// test valide autour de casedepart	
				} else {// Lien non valide entre case0ref et casedepart qui se voient (pas de boucle car discontinuite) : AIC Type II (variete 3)
         					// AIC Type II si liens forts aux extremites sur chiffres differents, sans node final
        					//               donc supprimer chiffrexy[xychain-1] dans casedepart, si il y est, et chiffrexy[0] dans case0ref, si il y est
                			if ((chiffrexy[xychain-1]!=chiffrexy[0]) && lienfortpre && lienfortinitial) {
                    				wscen="AIC type II ";
                                    etablirchaine();
            						wscen+=tradacrit("<br>Elimination du chiffre de départ "+chiffrexy[0]+" dans la case finale "+colPlace[case0ref]);
                					wscen+=tradacrit("<br>Elimination du chiffre final "+chiffrexy[xychain-1]+tradacrit(" dans la case de départ ")+colPlace[casedepart]+"<br><br>");
            						if (contenu[case0ref].split(chiffrexy[0])[0].length<contenu[case0ref].length) {wscen=wscen+chiffreseul+chiffrexy[0]+incase+colPlace[case0ref]+".<br>"}
            						if (contenu[casedepart].split(chiffrexy[xychain-1])[0].length<contenu[casedepart].length) {wscen+=chiffreseul+chiffrexy[xychain-1]+incase+colPlace[casedepart]+".<br>"}
        							if (posdep.split(chiffrexy[xychain-1])[0].length<posdep.length) {
									eliminationnumero(casedepart, chiffrexy[xychain-1])}														
        							if (posref.split(chiffrexy[0])[0].length<posref.length) {
									eliminationnumero(case0ref, chiffrexy[0])}														
									variete=3;
                       		}// case0ref voit casedepart avec liaison valide sur case0ref et liens forts aux extremites sur chiffres differents : AIC Type II
					} // validation autour de case0ref
			} else {// case0ref et casedepart ne se voient pas  AIC Type I (variete 2)
        				// AIC type I
                        wscen="AIC type I ";
                        etablirchaine();// Chaine batie avec casexy, chiffrexy et lienfaible, de 0 a xychain
						variete=2;
    					if (chiffrexy[xychain-1]==chiffrexy[0]) {
    						if (lienfortpre && lienfortinitial) {//Meme chiffre + liens forts aux extremites sur meme chiffre =
                        		// case0ref et casedepart ne se voient pas avec liens forts aux extremites sur meme chiffre =  AIC Type I
    							// Elimination chiffrexy[0] dans les cases voyant casefinale (avec node eventuel) et casedepart
    							if (xychain>2) {eliminationchiffre(casefinale, colPlace[casedepart], chiffrexy[0])}
								if ((posdep==posref) && (posdep.length==2)) {// cases egales a 2 chiffres : eliminer aussi aytre chiffre
        							var autrechiffre=chref[0];
                					if (autrechiffre==chiffrexy[0]) {autrechiffre=chref[1]}
								}
/*        				   } else if ((posdep==posref) && (posdep.length==2) && (chiffrexy[xychain-1]==chiffrexy[0]) && !lienfortinitial) {
                				// Autre cas : meme contenu a 2 chiffres des cases extremes --> eliminer aussi leur complement dans les cases voyant les cases extremes
                				// Meme chiffre et liens faibles aux extremites
    							var autrechiffre=chref[0];
            					if (autrechiffre==chiffrexy[0]) {autrechiffre=chref[1]}
								if (xychain>2) {
									eliminationchiffre(colPlace[case0ref], colPlace[casedepart], autrechiffre);
                					eliminationchiffre(colPlace[case0ref], colPlace[casedepart], chiffrexy[0]);
								}
*/            				}
    					}
			}// case0ref et casedepart se voient ou pas
		}// posdep : casedepart, differente de case0ref, contient chiffre --> AIC (4 varietes)
	}// xychain > 2 sans node final
	lienfaible[xychain]=lienint;
}

