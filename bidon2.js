function testvalidationex(lienavalfort,lienamontfaible,chiffregal,case2chiffres) {
	if (lienavalfort==lienamontfaible) {return chiffregal}// Fort-faible ou faible-fort : vrai si sur meme chiffre
	if (lienavalfort) {return !chiffregal}// Fort-fort : vrai sur chiffre different
	return (!chiffregal && case2chiffres)// Faible-faible : vrai sur chiffre different et case a 2 chiffre
}

function testvalidation(lienavalfort,lienamontfaible,chiffregal,case2chiffres) {
	if (lienavalfort==lienamontfaible) {
		if (!lienamontfaible && chiffregal) {return !case2chiffres} // Exception Fort-faible
	return chiffregal}// Fort-faible ou faible-fort : vrai si sur meme chiffre
	if (lienavalfort) {
	if (chiffregal && !case2chiffres) {return true}// Exception Fort-Fort
	if ((xychain>3) && !chiffregal && (chiffrexy[xychain-1]==chiffrexy[xychain-2]) && (chiffrexy[xychain-3]!=chiffrexy[xychain-2]) && !lienfaible[xychain-2] && !lienfaible[xychain-3] && !case2chiffres) {return false}
	return !chiffregal}// Fort-fort : vrai sur chiffre different
	return (!chiffregal && case2chiffres)// Faible-faible : vrai sur chiffre different et case a 2 chiffre
}

function enregistrescenarioaic() {
var i=maxvarencours;
if (FILTRAGEDESSOLUTIONS) {
	  for (var i=1; i<maxvarencours; i++) {
			if (reperecontinu(scenario, tableauvariante[i], i)) {break}
		 	if (reperetypeI(scenario, tableauvariante[i])) {break}
			if (reperetypeII(scenario, tableauvariante[i])) {break}
	  }// i
}
if (i==maxvarencours) {
            tableauvariante[maxvarencours] = scenario+"$"+variete;
            maxvarencours+=1;
}
scenario=noeffect;
}

function reperecontinu(scen1, scen2, ipre) {
	var a1=scen1.split("loop continu ")[1];
	if (typeof a1 === "undefined") {return false}
	var b1=(a1.split(".")[0]).replace(/-/g, "=");;
	var c1=b1.split("=");
	var j=0;
	var d1=new Array();
	for (var i=0; i<c1.length-1; i++) {
		if (i!=2*parseInt(i/2)) {continue}
		d1[j]=c1[i];
		j+=1;
	}
	a1=scen2.split("loop continu ")[1];
	if (typeof a1 === "undefined") {return false}
	b1=(a1.split(".")[0]).replace(/-/g, "=");;
	c1=b1.split("=");
	j=0;
	var d2=new Array();
	for (var i=0; i<c1.length-1; i++) {
		if (i!=2*parseInt(i/2)) {continue}
		d2[j]=c1[i];
		j+=1;
	}
	// comparer les tableaux d1 et d2, si sont une permutation
	if (d1.length != d2.length) {return false}
	for (var i1=0; i1<d1.length; i1++) {
		for (var i2=0; i2<d2.length; i2++) {if (d1[i1]==d2[i2]) {break}}
		if (i2==d2.length) {return false}// pas de dans le tableau d2
	}
//	messageencours+="<br>"+d1+" permutation de "+d2+" aux positions "+maxvarencours +" et "+ipre;	
	return true; 
}

function reperetypeII(scen1, scen2) {
	var a1=scen1.split("chiffre de départ ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif1a=a1.substring(0,1);
	var b1=a1.split("case finale ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH1a=b1.substring(0,2);
	var c1=b1.split(" chiffre final ")[1];
	if (typeof c1 === "undefined") {return false}
	var chif1b=c1.substring(0,1);
	var d1=c1.split("case de départ ")[1];
	if (typeof d1 === "undefined") {return false}
	var HH1b=d1.substring(0,2);
//	messageencours+="<br>"+chif1a+" "+HH1a+" "+chif1b+" "+HH1b;
//	return false;
	var a1=scen2.split("chiffre de départ ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif2a=a1.substring(0,1);
	var b1=a1.split("case finale ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH2a=b1.substring(0,2);
	var c1=b1.split(" chiffre final ")[1];
	if (typeof c1 === "undefined") {return false}
	var chif2b=c1.substring(0,1);
	var d1=c1.split("case de départ ")[1]
	if (typeof d1 === "undefined") {return false}
	var HH2b=d1.substring(0,2);
	var x=((chif1a==chif2a) && (HH1a==HH2a) && (chif1b==chif2b) && (HH1b==HH2b)) || ((chif1a==chif2b) && (HH1a==HH2b) && (chif1b==chif2a) && (HH1b==HH2a));
	return x; 
}

function reperetypeI(scen1, scen2) {
	var a1=scen1.split("chiffre ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif1=a1.substring(0,1);
	var b1=a1.split("voyant ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH1a=b1.substring(0,2);
	var c1=b1.split(" et ")[1];
	if (typeof c1 === "undefined") {return false}
	var HH1b=c1.substring(0,2);
	var a1=scen2.split("chiffre ")[1];
	if (typeof a1 === "undefined") {return false}
	var chif2=a1.substring(0,1);
	var b1=a1.split("voyant ")[1];
	if (typeof b1 === "undefined") {return false}
	var HH2a=b1.substring(0,2);
	var c1=b1.split(" et ")[1];
	if (typeof c1 === "undefined") {return false}
	var HH2b=c1.substring(0,2);
	var x=(chif1==chif2) && (((HH1a==HH2a) && (HH1b==HH2b)) || ((HH1a==HH2b) && (HH1b==HH2a)))
	return x; 
}

function comparaisonscenarios(w0,w1) {
		 // verification eliminations communes identiques (l'un dans l'autre et l'autre dans l'un)
			 var i0=1;
			 var s0=w0.split(chiffrefort)[i0];// Lien fort loop continu (2 chiffres) ou discontinu (1 chiffre)
			 var itrouv=false;
			 while (typeof s0 != "undefined") {
				var chif0=s0.substring(0,1);
				var h0=decodagecolPlace(s0.split(incase)[1].substring(0,2));
				var s00=s0.split("et ")[1];
				if (typeof s00 != "undefined") {
					var chif00=s00.substring(0,1);
				}
    			var itrouv=false;
				var i1=1;
    			var s1comp=w1.split(chiffrefort)[i1];// Lien fort loop continu (2 chiffres) ou discontinu (1 chiffre)
    			while (typeof s1comp != "undefined") {
    				var chif1=s1comp.substring(0,1);
    				var h1=decodagecolPlace(s1comp.split(incase)[1].substring(0,2));
    				var s11=s1comp.split("et ")[1];
    				if (typeof s11 != "undefined") {
						var chif11=s11.substring(0,1);
						if (((h0==h1) || ((typeof s0 != "undefined") && (typeof s1comp != "undefined"))) && (chif11==chif0) && (chif1==chif00)) {chif1=chif0}
					}
    				if ((chif0==chif1) && ((h0==h1) || ((typeof s0 != "undefined") && (typeof s1comp != "undefined")))) {// Meme elimination : ne pas chercher plus loin sur s1comp
					   itrouv=true;
					}
					i1=i1+1;
    			 	var s1comp=w1.split(chiffrefort)[i1];
    			 } 
				 if (!itrouv) {return false}//s0 non trouve dans w1 --> pas de doublon
				 i0=i0+1;
			 	 var s0=w0.split(chiffrefort)[i0];
			 } 
			 i0=1;
			 s0=w0.split(chiffreseul)[i0];// Les 4 varietes
			 itrouv=false;
			 while (typeof s0 != "undefined") {
				chif0=s0.substring(0,1);
				h0=decodagecolPlace(s0.split(incase)[1].substring(0,2));
    			itrouv=false;
				i1=1;
    			s1compnext=w1.split(chiffreseul)[i1];// Les 4 varietes
    			while (typeof s1compnext != "undefined") {
    				chif1=s1compnext.substring(0,1);
    				h1=decodagecolPlace(s1compnext.split(incase)[1].substring(0,2));
					if ((chif0==chif1) && (h0==h1)) {// Meme elimination
					   itrouv=true;
					}
    				i1=i1+1;
    			 	s1compnext=w1.split(chiffreseul)[i1];
    			}
				if (!itrouv) { return false}//s0 non trouve dans w1 --> pas de doublon
				i0=i0+1;
			 	var s0=w0.split(chiffreseul)[i0];
			 }
			 return true;
}



function elaborevarianteAICChain() {
// Programme pour rougir
// Methode 23, 4 varietes (0, 1, 2, 3)
// Variete 0 : AIC Loop continu 
//   Elimination du chiffre candidat "+chif+" dans la case "+colPlace[hk]      ..... s'il existe
//   Elimination des chiffres candidats autres que "+chiffrexy[i]+" et "+chiffrexy[ii]+" dans la case "+colPlace[hk]      ..... s'ils existent
// Variete 1 : AIC Loop discontinu
//   wscen=wscen+"<br>Defaut d\'alternance sur la case de depart "+colPlace[casedepart]+" qui est entouree du meme chiffre candidat "+chiffrexy[0]+" en lien fort.
//	 Cette case contient donc ce chiffre.";
//   Elimination des chiffres candidats autres que "+chiffrexy[0]+" dans la case "+colPlace[casedepart]
//   wscen=wscen+"<br>Defaut d\'alternance sur la case de depart "+colPlace[casedepart]+" qui est entouree du meme chiffre candidat "+chiffrexy[0]+" en lien faible
//	 Cette case ne peut donc contenir ce chiffre.";
//   Elimination du chiffre candidat "+chiffrexy[0]+" dans la case "+colPlace[casedepart]      ..... s'il existe
// Variete 2 : AIC type I C1=2= ...=2=G9... Elimination du chiffre candidat 2 ... case C9 voyant les cases G9 et C1 ...
//   Elimination du chiffre candidat "+chif+" dans la case "+colPlace[hk]      ..... s'il existe
// Variete 3 : AIC type II C1=2= ....=4=C9 ... depart C1 ne peut contenir le candidat final 4. la case C9 ne peut contenir le chiffre candidat de depart 2
//   wscen=wscen+"<br>La case de depart "+colPlace[casedepart]+" ne peut contenir le chiffre candidat final "+chiffrexy[xychain-1]+".";
//   wscen=wscen+"<br>le chiffre candidat de depart "+chiffrexy[0]+" ne peut etre contenu dans la case finale "+colPlace[caseref]+".<br>";
//   Elimination du chiffre candidat "+chiffrexy[xychain-1]+" dans la case "+colPlace[casedepart]      ..... s'il existe
//   Elimination du chiffre candidat "+chiffrexy[0]+" dans la case "+colPlace[caseref]        ....... s'il existe
var re=/\d/g;
//coloris=true;
var a="AIC ";
wscen=scenario;
if (scenario.split("loop continu ")[0]==a){
			 variete=0;
			 var i=1;
			 var s0=scenario.split(chiffreseul)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1cont=s0.split(incase)[1];
				var h=decodagecolPlace(s1cont.substring(0,2));
				eliminationnumero(h,chif);
				i=i+1;			 
			 	s0=scenario.split(chiffreseul)[i];
			 }
			 i=1;
			 s0=scenario.split(chiffrefort)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1continu=s0.split(incase)[1];
				var h=decodagecolPlace(s1continu.substring(0,2));
				var s2=s0.split("et ")[1];
				var chif2=s2.substring(0,1);
				var pos7=contenu[h];
				var ch=pos7.match(re);
				for (var hnum=0; hnum<pos7.length; hnum++) {if ((ch[hnum]!=chif) && (ch[hnum]!=chif2)) {eliminationnumero(h,ch[hnum])}}
				i=i+1;			 
			 	s0=scenario.split(chiffrefort)[i];
			 }
			 // verdir
			 verdiraic(scenario.split("loop continu ")[1]);
} else if (scenario.split("loop discontinu ")[0]==a){
			 variete=1;
			 var i=1;
			 var s0=scenario.split(chiffrefort)[1];
			 if (typeof s0 != "undefined") {// Lien fort
				var chif=s0.substring(0,1);
				var s1discontinufort=s0.split(incase)[1];
				var h=decodagecolPlace(s1discontinufort.substring(0,2));
			 	var pos8=contenu[h];
				var ch=pos8.match(re);
				for (var hnum=0; hnum<pos8.length; hnum++) {if (ch[hnum]!=chif) {
				eliminationnumero(h,ch[hnum])}}
			 } else {// Lien faible
			   	var s0=scenario.split(chiffreseul)[1];
				var chif=s0.substring(0,1);
				var discontinufaible=s0.split(incase)[1];
				var h=decodagecolPlace(discontinufaible.substring(0,2));
				eliminationnumero(h,chif);
			 }
			 // verdir
			 verdiraic(scenario.split("loop discontinu ")[1]);
} else if (scenario.split("type I ")[0]==a){
			 variete=2;
			 var i=1;
			 var s0=scenario.split(chiffreseul)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1type1=s0.split(incase)[1];
				var h=decodagecolPlace(s1type1.substring(0,2));
				eliminationnumero(h,chif);
				i=i+1;			 
			 	s0=scenario.split(chiffreseul)[i];
			 }
			 // verdir les chiffres de la chaine concernes
			 verdiraic(scenario.split("AIC type I ")[1]);
} else if (scenario.split("type II ")[0]==a){
			 variete=3;
			 var i=1;
			 var s0=scenario.split(chiffreseul)[i];
			 while (typeof s0 != "undefined") {
				var chif=s0.substring(0,1);
				var s1type2=s0.split(incase)[1];
				var h=decodagecolPlace(s1type2.substring(0,2));
				eliminationnumero(h,chif);
				i=i+1;			 
			 	s0=scenario.split(chiffreseul)[i];
			 }
			 // verdir
			 verdiraic(scenario.split("AIC type II ")[1]);
}
// Recherche regroupement
   regroop();
}

function verdiraic(s1vert) {
	 var re=/\d/g;
	 var sc=s1vert.split("<br>")[0];
	 var res=sc.replace(/=/g,"-");
	 var s=res.split("-");
	 var ss=s[s.length-1];
	 if (ss.length>2) {// Rougir cases extremes
			for (var j=0; j<(ss.length/2); j++) {
				var h=decodagecolPlace(ss.substring(2*j, (2*j+2)));
				var chk=contenu[h].match(re);
				for (var k=0; k<chk.length; k++) {
					var n=chk[k];
					if (unevariante) {miseauvert(h,n, BACKBLEU)}
				}
			}
	 }
	 for (var i=1; i<s.length; i++) {// verdir la chaine
			var m=s[i];
			for (var j=0; j<(s[i-1].length/2); j++) {
				var h=decodagecolPlace(s[i-1].substring(2*j, (2*j+2)));
				for (var k=0; k<m.length; k++) {
					var n=m[k];
					if (unevariante) {miseauvert(h,n, BACKVERT)}
				}
			}
			i+=1;
			if (m.length>1) {i+=2}
	 }
	 // verdissement et jaunissement case finale
	 var h=decodagecolPlace(s[s.length-1].substring(0,2));
	 var n=s[s.length-2];
	 var m=s[1];
	 if (unevariante) {miseauvert(h,n, BACKVERT); miseauvert(h,m, BACKJAUNE)}
}
function solutioncontinue() {
	var re=/\d/g;
	chiffrexy[xychain+1]=chiffrexy[0];
	lienfaible[xychain+1]=lienfaible[0];
	for (var i=1; i<(xychain+2); i++) {// y compris la case de depart en position finale
		// Case hk en position i entouree de liens forts sauf si la case precedente est en lien fort sur le meme chiffre que sa case precedente en lien fort
		if (!lienfaible[i-1] && !lienfaible[i]) {// case seule entouree de liens forts sauf node, ne peut contenir que les chiffres qui l entourent
			// case vaut les 2 chiffres qui l'entourent
        		var hk=decodagecolPlace(casexy[i]);
        		if (i==(xychain+1)) {hk=casedepart}		
            	var pos14=contenu[hk];
                if ((pos14.length>2) && (chiffrexy[i-1] != chiffrexy[i])) {
                	  var chk=pos14.match(re);
                	  wscen+="<br>"+chiffrefort+chiffrexy[i-1]+" et "+chiffrexy[i]+incase+colPlace[hk]+" entouree de liens forts.";
        			  for (var hnum=0; hnum<chk.length; hnum++) {if ((chk[hnum]!=chiffrexy[i-1]) && (chk[hnum]!=chiffrexy[i])) {
					  eliminationnumero(hk, chk[hnum])}}
            	}
		}// liens forts autour
	}// i
	for (var i=0; i<xychain+1; i++) {// lien faible entre 2 cases de la chaine
		if (lienfaible[i]) {//Lien faible : chiffre a eliminer des cases voyant les 2 cases et leurs nodes eventuels entourant ce lien faible
    		   // si node sur casexy[i], hk doit voir aussi le node
    			var suiv=casexy[i+1];
    			if (i==xychain){suiv=colPlace[casedepart]}
				eliminationchiffre(casexy[i], suiv, chiffrexy[i]);
		}
	}
}

function eliminationchiffreex(case1, case2, chif) {
	var re=/\d/g;
	// case1 et case2 ne se voient pas
	// Recherche de cases hek voyant case1 et case2 et leur node, et contenant chif a eliminer, differente de casedepart, pas dans la chaine ni dans un node
	var casereel=decodagecolPlace(case1.substring(0,2));
	var hkreel=decodagecolPlace(case2.substring(0,2));
	var h1=parseInt(casereel/9);//	Ligne case1
	var v1=casereel-9*h1;// Colonne case 1
	var c1=carre[casereel]-1; // Bloc case1
 	// nodes
	var node1=M;
	if (case1.length>2) {node1=decodagecolPlace(case1.substring(2,4))}
	var node2=M;
	if (case2.length>2) {node2=decodagecolPlace(case2.substring(2,4))}	
	var deb=true;
	for (var lc=0; lc<3; lc++) {
		 for (var k=0; k<9; k++) {// Recherche case hk voyant case1 et case2, qui ne soit pas un node
			 switch (lc) {
			 		case 0:// Ligne de case1
						 var hek=9*h1+k;
						 break;
			 		case 1:// Colonne de case1
						 var hek=9*k+v1;
						 break;
			 		case 2:// Bloc de case1
           		  	   	 var hek=k+6*parseInt(k/3)+18*parseInt(c1/3)+3*c1;
						 break;
			 }
			 var pos15=contenu[hek];
			 if (pos15.length>1) {
			 	var chek=pos15.match(re);
			 	// hek, different des cases, des als et leurs nodes, voit hkreel et contient chif
				var chainee=wscen.split("<br>")[0];
				if ((sevoient(hek, hkreel) && (pos15.split(chif)[0].length<pos15.length)) && (chainee.split(colPlace[hek])[0].length==chainee.length)) {// tous les criteres respectes
					if ((node1===M) || sevoient(hek,node1)) {
					if ((node2===M) || sevoient(hek,node2)) {
						if (deb) {
							wscen+="<br><br>Elimination du chiffre "+chif+" dans toutes les cases voyant "+colPlace[casereel]+" et "+colPlace[hkreel]+" :";
							deb=false;
						}
						if (lc==0) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+colPlace[casereel]+" et "+colPlace[hkreel]+", dont une ligne commune avec "+colPlace[casereel]+" ou "+colPlace[hkreel]+"."}
    					if (lc==1) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+colPlace[casereel]+" et "+colPlace[hkreel]+", dont une colonne commune avec "+colPlace[casereel]+" ou "+colPlace[hkreel]+"."}
    					if ((lc==2) && !hkdejavu(hek, h1, v1)) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+colPlace[casereel]+" et "+colPlace[hkreel]+", dont un bloc commun avec "+colPlace[casereel]+" ou "+colPlace[hkreel]+"."}
						for (var hnum=0; hnum<chek.length; hnum++) {if (chek[hnum]==chif) {
						eliminationnumero(hek, chek[hnum])}}
					}
					}
				}
			}
		 }// k
	}// lc
}

function eliminationchiffre(case1, case2, chif) {
	var re=/\d/g;
	// case1 et case2 ne se voient pas
	// Recherche de cases hek voyant case1 et case2 et leur node, et contenant chif a eliminer, differente de casedepart, pas dans la chaine ni dans un node
	var casereel=decodagecolPlace(case1);
	var hkreel=decodagecolPlace(case2);
	var h1=parseInt(casereel/9);//	Ligne case1
	var v1=casereel-9*h1;// Colonne case 1
	var c1=carre[casereel]-1; // Bloc case1
 	// nodes
	var node1=M;
	if (case1.length>2) {node1=decodagecolPlace(case1.substring(2,4))}
	var node2=M;
	if (case2.length>2) {node2=decodagecolPlace(case2.substring(2,4))}	
	var deb=true;
	for (var lc=0; lc<3; lc++) {
		 for (var k=0; k<9; k++) {// Recherche case hk voyant case1 et case2, qui ne soit pas un node
			 switch (lc) {
			 		case 0:// Ligne de case1
						 var hek=9*h1+k;
						 break;
			 		case 1:// Colonne de case1
						 var hek=9*k+v1;
						 break;
			 		case 2:// Bloc de case1
           		  	   	 var hek=k+6*parseInt(k/3)+18*parseInt(c1/3)+3*c1;
						 break;
			 }
			 var pos15=contenu[hek];
			 if (pos15.length>1) {
			 	var chek=pos15.match(re);
			 	// hek, different des cases, des als et leurs nodes, voit hkreel et contient chif
				var chainee=wscen.split("<br>")[0];
				var last=chainee.substring(chainee.length-2, chainee.length);
				var hkplus=hkreel;
				if (last!=case2) {hkplus=decodagecolPlace(last)}
				if ((sevoient(hek, hkreel) && sevoient(hek, hkplus) && (pos15.split(chif)[0].length<pos15.length)) && (chainee.split(colPlace[hek])[0].length==chainee.length)) {// tous les criteres respectes
					if ((node1===M) || sevoient(hek,node1)) {
					if ((node2===M) || sevoient(hek,node2)) {
						if (deb) {// cas de double
							wscen+="<br><br>Elimination du chiffre "+chif+" dans toutes les cases voyant "+case1+" et "+case2+" :";
							deb=false;
						}
						if (lc==0) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+case1+" et "+case2+", dont une ligne commune avec "+case1+" ou "+case2+"."}
    					if (lc==1) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+case1+" et "+case2+", dont une colonne commune avec "+case1+" ou "+case2+"."}
    					if ((lc==2) && !hkdejavu(hek, h1, v1)) {wscen+="<br>"+chiffreseul+chif+incase+colPlace[hek]+" voyant les cases "+case1+" et "+case2+", dont un bloc commun avec "+case1+" ou "+case2+"."}
						for (var hnum=0; hnum<chek.length; hnum++) {if (chek[hnum]==chif) {
						eliminationnumero(hek, chek[hnum])}}
					}
					}
				}
			}
		 }// k
	}// lc
}


function hkdejavu(case1, hh1, vv1) {
		 for (var k=0; k<9; k++) {
		 	 if ((case1==(9*hh1+k)) || (case1==(9*k+vv1))) {return true}
		 }
		 return false;
}

function testlienfort(case1, case2, chif) {// Identification de la nature du lien entre case1 et case2 contenant chif, en excluant un ou plusieurs nodes potentiels de case1 (caseref) : a faire
	// une fois le lien identifie, on peut proceder a la validation de la liaison passant par case1, assurant la continuite de la chaine AIC
	var h1=parseInt(case1/9);
	var v1=case1-9*h1;
	var h2=parseInt(case2/9);
	var v2=case2-9*h2;
	var ii=carre[case1];
	var jj=carre[case2];
	if (((h1==h2) || (v1==v2)) && (jj!=ii)) {// Recherche sur axe commun et blocs differents
    	var lien=true;
    	for (var k=0; k<9; k++) {// Recherche sur cet axe case1-case2, case1 et case2 dans blocs differents
        	 if (h1==h2) {var hk=9*h1+k}
        	 if (v1==v2) {var hk=9*k+v1}
        	 var pos12=contenu[hk];
        	 if ((hk!=case1) && (hk!=case2) && ((pos12+"").split(chif)[0].length<pos12.length)) {lien=false}
        }// k
		if (lien) {return true}// Retour en lien fort sur axe commun et blocs differents
	}
	if (jj==ii) {// bloc commun case1-case2 
		var lien=true;
		ii=ii-1;
		for (var k=0; k<9; k++) {// Recherche dans bloc case1-case2 autre case contenant chif, differente de case1, case2
           	 var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
			 var pos13=contenu[hk];
			 if ((hk!=case1) && (hk!=case2) && ((pos13+"").split(chif)[0].length<pos13.length)) {lien=false}
		}// k
		if (lien) {return true}// Retour en lien fort dans bloc
	}
	return false;
}

function testlienfortavecnodeapres(case1, hnode, chif) {
	// calcul lien entre case1 et node hnode par chif
	var ii=carre[case1]-1;
	var hor=parseInt(case1/9);
	var vert=case1-9*parseInt(case1/9);
	var ii=carre[case1]-1;
	var inode=0;	
		var case2=decodagecolPlace(hnode.substring(2*inode, 2*inode+2));
    	if (carre[case1]==carre[case2]) {
    		for (var k=0; k<9; k++) {
    			var hk=k+6*parseInt(k/3)+18*parseInt(ii/3)+3*ii;
                var posc=contenu[hk];
                if ((hk!=case1) && (hk!=case1) && (posc.length>1) && (hnode.split(colPlace[hk])[0].length==hnode.length) && (posc.split(chif)[0].length<posc.length)) {return false}
    		}// k
    		return true;
    	}
    	var hh=parseInt(case1/9);
    	if (parseInt(case1/9) == parseInt(case2/9)) {
    		for (var k=0; k<9; k++) {
                var hk=hh*9+k;
    			var posh=contenu[hk];
                if ((hk!=case1) && (hk!=case2) && (posh.length>1) && (hnode.split(colPlace[hk])[0].length==hnode.length) && (posh.split(chif)[0].length<posh.length)) {return false}
    		}// k
    		return true;
    	}
    	var vv=case1-9*hh;
    	for (var k=0; k<9; k++) {
                var hk=vv+9*k;
    			var posv=contenu[hk];
                if ((hk!=case1) && (hk!=case2) && (posv.length>1) && (hnode.split(colPlace[hk])[0].length==hnode.length) && (posv.split(chif)[0].length<posv.length)) {return false}
    	}// k
    	return true;
}

function testnode(case1, case2, chif) {// nodes sur case1=caseref ou case2=hk par chif, enregistres sur casexy[xychain]
	// cela cree un lien fort entre les cases case1 et case2=hk
	if (carre[case1]==carre[case2]) {var zone="b"}// meme bloc case1-case2
	else {
		if (parseInt(case1/9)==parseInt(case2/9)) {var zone="h"}// meme axe horisontal case1-case2, sans bloc commun case1-case2
		if ((case1-9*parseInt(case1/9))==(case2-9*parseInt(case2/9))) {var zone="v"}// meme axe vertical case1-case2, sans bloc commun case1-case2
	}
    var ref=case2;// node sur hk
	var alter=false;
   	var ii=carre[ref]-1;
    var hori=parseInt(ref/9);
    var vert=ref-9*hori;
    var chaine=colPlace[ref];
	for (var i=0; i<9; i++) {
			switch(zone) {
				case "b":
        			var node=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii;
					break;
				case "h":
    				var node=i+9*hori;
					break;
				case "v":
    				var node=9*i+vert;
					break;
				default:
        			var node=0;
					break;
			}
			var posnode=contenu[node];
			// 5 + 3 = 8 condirions de base pour node : Case contenant le candidat chif, avec plus de 1 chiffre, differente de case1 et de case2, + est dans le bloc de ref, sur axe commun avec ref et enfin pas dans la chaine --> node potentiel
			var hnode=(parseInt(node/9) == hori);
            var vnode=((node-9*parseInt(node/9)) == vert);
            var axecommun=(hnode  ||  vnode);
			if ((node!=case1) && (node!=case2) && (posnode.length>1) && (posnode.split(chif)[0].length<posnode.length)) {
				// node sur axe case1 - case2 (horizontal ou vertical) si pas bloc commun case1 - case2
				// node pas sur axe commun case1-case2 (horizontal ou vertical) si bloc commun case1 - case2
				if  (((zone=="h") && hnode) || ((zone=="b") && !hnode) || ((zone=="v") && vnode) || ((zone=="b") && !vnode)) {
					if ((carre[node]==carre[ref]) && axecommun && verifpasdanschaine(node)) {
						if ((chaine.length==2) || (zone!="b")) {
							chaine+=colPlace[node];
						} else {// node double
							var nodepre=decodagecolPlace(chaine.substring(2,4));
							var hnodepre=(parseInt(nodepre/9) == hori);
            				var vnodepre=((nodepre-9*parseInt(nodepre/9)) == vert);
							if ((hnodepre == hnode)|| (vnodepre == vnode)) {chaine+=colPlace[node]} else {alter=true}
						}
					} else {alter=true}
				}// zone
			}// node			
    }// i
	if ((chaine.length>2) && !alter) {casexy[xychain+1]=chaine; lienfaible[xychain]=!alter; return true}// lien fort aval sur caseref avec node et/ou sur hk avec node
	return false;// node non trouve ou case autre: lien faible
}	

function testnodebegin(case1, case2, chif, nonnode) {// nodes sur case1=caseref ou case2=hk par chif, enregistres sur casexy[xychain]
	// cela cree un lien fort entre les cases case1 et case2=hk
    var chaine=colPlace[case2];
	if (nonnode==2) {
		casexy[xychain+1]=chaine; 
		lienfaible[xychain]=!testlienfortgeneral(case1, case2, chif); 
		return;	
	}
	if (carre[case1]==carre[case2]) {var zone="b"}// meme bloc case1-case2
	else {
		if (parseInt(case1/9)==parseInt(case2/9)) {var zone="h"}// meme axe horisontal case1-case2, sans bloc commun case1-case2
		if ((case1-9*parseInt(case1/9))==(case2-9*parseInt(case2/9))) {var zone="v"}// meme axe vertical case1-case2, sans bloc commun case1-case2
	}
    var ref=case2;// node sur hk
	var autre=true;
   	var ii=carre[ref]-1;
    var hori=parseInt(ref/9);
    var vert=ref-9*hori;
	var nonnodein=0;
	for (var i=0; i<9; i++) {
			switch(zone) {
				case "b":
        			var node=i+6*parseInt(i/3)+18*parseInt(ii/3)+3*ii;
					break;
				case "h":
    				var node=i+9*hori;
					break;
				case "v":
    				var node=9*i+vert;
					break;
				default:
        			var node=0;
					break;
			}
			var posnode=contenu[node];
			// 5 + 3 = 8 condirions de base pour node : Case contenant le candidat chif, avec plus de 1 chiffre, differente de case1 et de case2, + est dans le bloc de ref, sur axe commun avec ref et enfin pas dans la chaine --> node potentiel
			var hnode=(parseInt(node/9) == hori);
            var vnode=((node-9*parseInt(node/9)) == vert);
            var axecommun=(hnode  ||  vnode);
			if ((node!=case1) && (node!=case2) && (posnode.length>1) && (posnode.split(chif)[0].length<posnode.length)) {
				// node sur axe case1 - case2 (horizontal ou vertical) si pas bloc commun case1 - case2
				// node pas sur axe commun case1-case2 (horizontal ou vertical) si bloc commun case1 - case2
				if  (((zone=="h") && hnode) || ((zone=="b") && !hnode) || ((zone=="v") && vnode) || ((zone=="b") && !vnode)) {
					if ((carre[node]==carre[ref]) && axecommun && verifpasdanschaine(node)) {
						if ((chaine.length==2) || (zone!="b")) {
							chaine+=colPlace[node];
							if (nonnode==1) {autre=false}
						} else {
							var nodepre=decodagecolPlace(chaine.substring(2,4));
							var hnodepre=(parseInt(nodepre/9) == hori);
            				var vnodepre=((nodepre-9*parseInt(nodepre/9)) == vert);
							if ((hnodepre == hnode)|| (vnodepre == vnode)) {chaine+=colPlace[node]} else {autre=false}
						}
					} else {
						autre=false;
					}
				} else {
						autre=false;
				}// zone
			}// node			 
        	if (chaine.length>2) {// node trouve
					if (nonnode==nonnodein) {
						casexy[xychain+1]=chaine;
					} else {// recherche node suivant
						nonnodein+=1;
						chaine=colPlace[ref];
					}
        	}// lien fort aval sur caseref avec node et/ou sur hk avec node
}// i
	if (chaine.length>2) {casexy[xychain+1]=chaine; lienfaible[xychain]=!autre}// lien fort aval sur caseref avec node et/ou sur hk avec node
}	

