function lailedelaigle() {
	// 2 cases identiques ne se voyant pas
  	var re=/\d/g;
	for (var i=0; i<M; i++) {
		var c=contenu[i]+"";
		var ch=c.match(re);
		if (ch.length==2) {
		   // Recherche case identique non vue
		 for (var ial=i+1; ial<M; ial++) {
		 if ((carre[ial]!= carre[i]) && (parseInt(ial/9)!= parseInt(i/9)) && ((ial-9*parseInt(ial/9))!=(i-9*parseInt(i/9))) && (contenu[ial]==contenu[i]) ) {// Pas vu+meme contenu
		   for (var j=0; j<2; j++) {
		   	   var x=ch[j];
			   var y=ch[1-j];
			   for (var lc=0; lc<3; lc++) {// ligne, colonne et bloc de i
			   	   var hbloc=true;
				   for (var k=0; k<9; k++) {// Case correspondante h voyant i et contenant x
				   	   switch(lc) {
					   		case 0:
								 var h=9*parseInt(i/9)+k;
								 break;
					   		case 1:
								 var h=i-9*parseInt(i/9)+9*k;
								 break;
					   		case 2:
								 var ii=carre[i]-1;
								 var h=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
    				   			 hbloc=((h-9*parseInt(h/9))!=(i-9*parseInt(i/9))) && (parseInt(h/9)!=parseInt(i/9));
								 break;
					   		default:
								 break;
					   }
					   if (hbloc) {
					   var posk=contenu[h];					   
					   if ((h!=i) && (posk.length>1) && ((posk+"").split(x)[0].length<posk.length))  {
					   	  // Recherche d'une case hfort  avec lien fort x sur la case h et voyant ial
            			   for (var lch=0; lch<3; lch++) {// ligne, colonne et bloc de h
            			   	   var hfort=-1;
							   for (var kh=0; kh<9; kh++) {// Case correspondante hh voyant h et contenant x (lien fort)
            				   	   switch(lch) {
            					   		case 0:
            								 var hh=9*parseInt(h/9)+kh;
            								 break;
            					   		case 1:
            								 var hh=h-9*parseInt(h/9)+9*kh;
            								 break;
            					   		case 2:
            								 var iih=carre[h]-1;
            								 var hh=kh+6*parseInt(kh/3)+18*parseInt(iih/3)+3*iih;
            								 break;
            					   		default:
            								 break;
            					   }
            					   var posk=contenu[hh];					   
            					   if ((hh!=h) && (posk.length>1) && ((posk+"").split(x)[0].length<posk.length))  {
            					   	  // Verification du lien fort
            						  if (hfort==(-1)) {
									  	 hfort=hh;
									  } else {//  Pas de lien fort
									  	hfort=M;
									  }									  
								   }
							   }
							   if ((hfort!=M) && (hfort!=ial)) {// Lien fort : voit-il ial
								  if ((carre[ial]== carre[hfort]) || (parseInt(ial/9)== parseInt(hfort/9)) || ((ial-9*parseInt(ial/9))==(hfort-9*parseInt(hfort/9)))) {// Vu
								  	 // Trouver cible voyant i et ial, + h puis hfort
									 wscen="W-Wing : les 2 cases "+ colPlace[i]+" "+colPlace[ial]+tradacrit(" contenant les mêmes chiffres ")+x+" et "+y+" sont en lien indirect par les 2 cases "+colPlace[h]+" "+colPlace[hfort]+tradacrit(" elles-mêmes reliées")+" en lien fort par le chiffre "+x+"."
									 wscen=wscen+" Elimination autre chiffre "+y+" dans toutes les cases voyant "+ colPlace[i]+" et "+colPlace[ial]+" : ";
									 for (var cible=0; cible<M; cible++) {
									 	 if ((cible!=i) && (cible!=ial) && (cible!=h)&& (cible!=hfort)) {
    										if (contenu[cible].split(y)[0].length<contenu[cible].length) {										 	
        											if ((carre[cible]== carre[i]) || (parseInt(cible/9)== parseInt(i/9)) || ((cible-9*parseInt(cible/9))==(i-9*parseInt(i/9)))) {
        										 	if ((carre[cible]== carre[ial]) || (parseInt(cible/9)== parseInt(ial/9)) || ((cible-9*parseInt(cible/9))==(ial-9*parseInt(ial/9)))) {
                												var chh=contenu[cible].toString().match(re);
                												variete=0;
                								  				wscen=wscen+colPlace[cible]+" ";
                												for (var hnum=0; hnum<chh.length; hnum++) {if (ch[hnum] == y) {eliminationnumero(cible, ch[hnum])}}
        											}}
                                        		    if (scenario!=noeffect) {
        											 	if (clickmethode) {enregistrescenarios()} else {return}
                                        			}
											}// cible contient y
										}// cible != i, ial, h, hfort									 
									 }// cible
								   }// hfort voit ial 
							   }// hfort
						   } // lch
					   } // x dans h
				   }}// k et hbloc
			   }// lc
		   }// j
		}}}
	}
}

function elaborevarianteWWing() {
	// wscen=n+".... : "+F1 F2
	var sn=scenario.split("autre chiffre ")[1];
	var n=sn.substring(0,1);
	var s0=scenario.split(" : ")[2]; 
	decodecase(s0,n);
	var sm=scenario.split(" chiffres ")[1];
	var m=sm.substring(0,1);
	var cs=scenario.split(" les 2 cases ");
	var csbase=cs[1].split(" contenant")[0];
	var csbase1=cs[2].split(" elles")[0];
	csbase+=" ";
	csbase1+=" ";
    decodevert(csbase, n);
    decodevert(csbase, m);
    decodevert(csbase1, m);
}

function cerfvolant() {// Liens forts sur bloc a ajouter (Espadon ou Swordfish)
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	var re=/\d/g;
	for (var n=1; n<10; n++) { // Chiffre
		var x=String(n);
		// Recherche lien fort sur ligne contenant le chiffre n
		for (var i=0; i<9; i++) {// Ligne 
        	var lienplus=0;
    		for (var j=0; j<9; j++) {// Case dans la ligne
    			if (lienplus==0) {
    				var href=9*i+j;
    				var y=String(contenu[href]);
            		if ((y.length>1)&& (y.split(x)[0].length<y.length)) {
            		   // Case trouvee contenant le chiffre n : recherche lien fort sur cette ligne, sur autre bloc
    				   for (var jj=j+1; jj<9; jj++) {
            		   	   if (lienplus<2) {
        					   var h=9*i+jj;
        					   var z=String(contenu[h]);
                			   if ((z.length>1)&& (z.split(x)[0].length<z.length)) {
        					   	 if (carre[href]!=carre[h]) {
        						  	lienplus=lienplus+1;
        						  	if (lienplus==1) {var hbout=h}
        						 } else {
        						  	lienplus=lienplus+2;
        							// Iterer sur ligne suivante
        						 }// carre
                			   }// z length
    						}// lienplus<2
    					}// jj
    					if (lienplus==1) {// Lien fort
    						  // Recherche d'un lien faible dans le bloc de href (puis de hbout) qui soit en lien fort sur sa colonne
    						  for (var ihi=0; ihi<2; ihi++) {
    						  if (ihi==1){// Permuter href et hbout
    						  	 var ihint=href;
    							 href=hbout;
    							 hbout=ihint
    						  }						  
    						  var ii=carre[href]-1;
    						  for (var k=0; k<9; k++) {// Recherche lien faible dans le bloc sur ligne et colonne differente de href
    						  	  var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
    							  if ((parseInt(hk/9)!=parseInt(href/9)) && ((hk-9*parseInt(hk/9))!=(href-9*parseInt(href/9)))) {
    								 var w=String(contenu[hk]);
            				  		 if ((w.length>1)&& (w.split(x)[0].length<w.length)) {
    								 	// Recherche lien fort sur colonne de cette case hk, dans autre bloc
    									var colk=hk-9*parseInt(hk/9);
                            		   	var liennext=0;
                            		   	for (var kk=0; kk<9; kk++) {
    										if (liennext<2) {
        				        		   	   var hsuite=9*kk+colk;
                        					   var v=String(contenu[hsuite]);
                                			   if ((hsuite!=hk) && (v.length>1)&& (v.split(x)[0].length<v.length)) {
        									   	  if (carre[hsuite]!=carre[hk]) {
        										  	 liennext=liennext+1;
                        						  	 if (liennext==1) {var hkbout=hsuite}
                           						 } else {
                           						  	liennext=liennext+2;
                           						 }// carre
        									   }// hsuite
    										}// liennext<2
    									 }// kk
                    					 if (liennext==1) {// Lien fort
                    					 	 // Recherche d'une case sur ligne de hkbout et colonne hbout contenant n a supprimer
    										 var hsup=	9*parseInt(hkbout/9)+hbout-9*parseInt(hbout/9);
                						  	 var zsup=String(contenu[hsup]);
                        					 var zsupbloc=zsup.match(re);
    	 									 if ((zsup.length>1)&& (zsup.split(x)[0].length<zsup.length)) {
                							 	// Chiffre n a eliminer
                								var listecases=colPlace[href]+" "+colPlace[hbout]+" "+colPlace[hk]+" "+colPlace[hkbout]+" ";
                								wscen="Cerf-volant par les cases "+listecases+" Elimination "+n+" dans case "+colPlace[hsup];
												wscen=wscen+". Liens forts par "+n+" entre "+colPlace[href] +" et "+ colPlace[hbout] +" d\'une part, et "+colPlace[hk] +" et "+ colPlace[hkbout] +" d\'autre part.<br><br>";
												wscen=wscen+"La case "+colPlace[hsup]+", qui voit les cases "+colPlace[hbout]+" et "+colPlace[hkbout]+" hors du bloc "+carre[href]+", ne contient pas "+n+".";
								  				variete=0;
												for (var hnum=0; hnum<zsupbloc.length; hnum++) {
                									if (zsupbloc[hnum] == x) {eliminationnumero(hsup, x)}
                								}								
                							 }										 
    									 }// liennext=1																 
										 if (scenario!=noeffect) {
											 	if (clickmethode) {
        											var ng=listecases;
        											var tg=true;
													if (ngratteciel>0) {
            											for (var ig=0; ig<ngratteciel; ig++) {
            												var ngg=gratteciel[ig];
            												var tg1=((ngg.substring(0,2)==ng.substring(4,6)) && (ngg.substring(2,4)==ng.substring(6,8)));
            												var tg2=((ngg.substring(0,2)==ng.substring(6,8)) && (ngg.substring(2,4)==ng.substring(4,6)));
            												var tg3=((ng.substring(0,2)==ngg.substring(4,6)) && (ng.substring(2,4)==ngg.substring(6,8)));
            												var tg4=((ng.substring(0,2)==ngg.substring(6,8)) && (ng.substring(2,4)==ngg.substring(4,6)));
             												if (((tg1||tg2) && (tg3||tg4))) {tg=false}
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
    								 }// w length 
    							  }// pas meme ligne ni meme colonne 
    						  }//k bloc 					   
    					   }// ihi 
    				    }// lienplus=1
    				}// y length
				}//lienplus=0
			}// j
		}// i
	}// n
}

function elaborevariantecerfvolant() {
		 // wscen=Elimination n+".... La case E8
		 var sn=scenario.split("Elimination ")[1];
		 var n=sn.substring(0,1);
		 var s0=scenario.split("La case ")[1]; 
		 var h=decodagecolPlace(s0.substring(0,2));
		 eliminationnumero(h,n);
		 var sliste=scenario.split("les cases ")[1];
		 liste=sliste.split(" Elimination")[0];
		 decodevert(liste, n);			
}

