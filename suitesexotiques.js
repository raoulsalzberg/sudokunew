function gratteciel() {
    // Recherche triple lien fort en fer a cheval sur un candidat unique
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	wscen=noeffect;
	for (var n=1; n<10; n++) {// Chiffre
    	for (var i=0; i<M; i++) {// Premier chiffre
    		var hi=parseInt(i/9);
			var vi=i-9*hi
			var posi=contenu[i].toString();
			if ((posi.split(n)[0].length<posi.length) && (posi.length>1)) {// la case i contient n
    			for (var lc=0; lc<2; lc++) {// axe vertical ou horizontal de i
					var trouve=true;
					var jj=M;
					for (var j=0; j<9; j++) {// Le long de l'axe de i
    					var h=9*hi+j;//Ligne de i
    					if (lc==1) {h=vi+9*j}// Colonne de i
						var posh=contenu[h].toString();
						if ((posh.split(n)[0].length<posh.length) && (h!=i)) {// la case h contient n et != i
						   if (trouve) {trouve=false; jj=h} else {jj=M}// trouve une fois : lien fort; une autre fois : lien faible
						}//n dans case h
    				}// j
					if (jj!=M) {// lien fort i-jj
					   var hjj=parseInt(jj/9);
					   var vjj=jj-9*hjj;
					   for (var k=0; k<9; k++) {// Le long de l'axe perpendiculaire a l'axe i-jj passant par i
					   	   var hh=9*hi+k;
						   if (lc==0) {hh=vi+9*k}
						   var poshh=contenu[hh].toString();
    					   if ((poshh.split(n)[0].length<poshh.length) && (hh!=i)) {// la case hh contient n et != i
      						   // Recherche mm en lien fort avec hh, contenant n et sur axe parallele a i-jj
      						   var hkk=parseInt(hh/9);
      						   var vkk=hh-9*hkk;
      						   trouve=true;
      						   var mm=M;
							   for (var m=0; m<9; m++) {// Le long de la parallele a l'axe i-jj passant par hh 
      						   	   var hhh=9*hkk+m;
      							   if (lc==1) {hhh=vkk+9*m}
          						   var poshhh=contenu[hhh].toString();
              					   if ((poshhh.split(n)[0].length<poshhh.length) && (hhh!=hh)) {// la case hhh contient n et != hh
              						   if (trouve) {trouve=false; var mm=hhh} else {var mm=M; break}
          						   }//n dans case hhh 
      						   }// m
							   if ((mm!=M) && !((carre[mm]==carre[hh]) && (carre[mm]==carre[jj]) && (carre[mm]==carre[i]))) {// Lien fort --> Gratte-ciel ! sauf mm dans meme bloc que hh et i et jj
      					   	   	  // Elimination de n dans les cases voyant jj et mm
      							  var hmm=parseInt(mm/9);
      							  var vmm=mm-9*hmm;
      							  var cmm=carre[mm]-1;
      							  // mm et jj pas sur meme axe
      							  if ((hmm!=hjj) && (vmm!=vjj)) {
									  wscen="Gratte-ciel "+colPlace[jj]+colPlace[i]+colPlace[hh]+colPlace[mm]+" par chiffre "+n+" avec liens forts "+colPlace[jj]+colPlace[i]+" et "+colPlace[hh]+colPlace[mm]+" : Elimination "+n+" dans cases voyant "+colPlace[jj]+" et "+colPlace[mm]+" dans ";
          							  for (var lcmm=0; lcmm<3; lcmm++) {
          							  	  for (var p=0; p<9; p++) {// sur axe de mm
          								  	  switch(lcmm) {
          									  		case 0:
          												 var hp=9*hmm+p;
          												 break
          									  		case 1:
          												 var hp=vmm+9*p;
          												 break
          									  		case 2:
          												 var hp=p+6*parseInt(p/3)+18*parseInt(cmm/3)+3*cmm;
          												 break
          									  }
          									  var posk=contenu[hp].toString();
											  if ((posk.split(n)[0].length<posk.length) && (hp!=mm) && (posk.length>1)) {// hp contient n et voit mm
          									  	 if (((parseInt(hp/9)==hjj) || ((hp-9*parseInt(hp/9))==vjj) || (carre[hp]==carre[jj])) && (hp!=jj)) {// hp voit jj
          										 	wscen=wscen+colPlace[hp]+" ";
													variete=0;
													eliminationnumero(hp,n);
          										 }
          									  }
          								  }// p
          							  }// lcmm
      							  	  if (scenario!=noeffect) {
										 if (clickmethode) {
											var ng=colPlace[jj]+colPlace[i]+colPlace[hh]+colPlace[mm];
											var tg=true;
											if ((ngratteciel>0) && FILTRAGEDESSOLUTIONS) {
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
      							  }// mm et kk sur axes !=
      						   }// mm!=M	  
						   }// hh contient n !=i de longueur >1
					   }// k
					}// jj!=M
				}// lc : axe horizontal puis vertical de i
			}// n dans case i
		}// i
    }// n
}

function elaborevariantegratteciel() {
		 // wscen="Gratte-ciel HHHHHHHH...par chiffre "+n+".... : "+F5 F3 
		 var sn=scenario.split("chiffre ")[1];
		 var n=sn.substring(0,1);
		 var s0=scenario.split(" dans ")[2];
		 decodecase(s0,n);
		 var s1=scenario.split("Gratte-ciel ")[1];
		 var m="";
		 for (var i=0; i<4; i++) {m+=s1.substring(2*i, 2*i+2)+" "}
		 decodevert(m,n);
}
