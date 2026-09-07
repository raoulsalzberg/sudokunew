function calculquadruples() {
    for (var ig=0; ig<N; ig++) {gratteciel[ig]=""}
	ngratteciel=0;
	var hh=new Array(9);
	var hhautre=new Array(9);
	var re = /\d/g;
	for (var lc=0; lc<3; lc++) {
		for (var j=0; j<9; j++) {// 
			var k=0;
			var kautre=0;
			for (var i=0; i<9; i++) {
            	switch (lc) {
            	   case 0: // Ligne
				   		var h=i+9*j;
						break;
					case 1: // Colonne
						 var h=j+9*i;
						 break;
					case 2: // Carre
						 var h=i+6*parseInt(i/3)+18*parseInt(j/3)+3*j;
						 break;
				}
				var posk=contenu[h];
				if ((posk.length>1) && (posk.length<5)) {// attributaire possible
				   hh[k]=h;
				   k+=1;
				} else {
				  hhautre[kautre]=h;
				  kautre+=1;
				}// posk
			}// i
			var number=Math.pow(2,k);

			for (var ii=15; ii<number; ii++) {
				var jjini=decimalToBinary(ii);
				var jj=jjini;

				for (var jjplus=jjini.length; jjplus<k; jjplus++) {// extension jj sur k caracteres
					// avec des 0 devant et derriere
					jj="0"+jj;
				}

				if (nbre_caracteres("1",jj)==4) {
				   // Cas a explorer parmi les possibles
				   // 3 etapes :  2 a 4 chiffres possibles dans 4 cases dites de base 
				   // - 4 cases de base avec 4 chiffres dans tableau contenu[hh]
				   // - Pas d'autre case avec uniquement ces chiffres dans tableau contenu[hhautre]
				   // - Elimination de ces chiffres dans les autres cases du tableau contenu[hhautre}
		   
				   
var cquad="";
var listecase=new Array();
var listeautrecase=new Array();
var xcase=0;
var xautrecase=0;
for (var kk=0; kk<k; kk++) {// tableau contenu[hh]
    var jrecup=jj.substring(kk, (kk+1));
   	if (jrecup==1) {
		listecase[xcase]=colPlace[hh[kk]];
		xcase+=1;
		var d=contenu[hh[kk]];
		// jj sur k caracteres avec des 0 et des 1 : selectionner les 1 parmi les hh
    	var d01=d.match(re);
    	for (var mm=0; mm<d.length; mm++) {
    		var dd=d01[mm]+"";
    		if (cquad.split(dd)[0].length==cquad.length) {// non inclus
    			   cquad+=dd;// ajouter
    		}// non inclus
    	}// mm	
	} else {
		listeautrecase[xautrecase]=colPlace[hh[kk]];
		xautrecase+=1;
	}// jrecup
}// kk
if (cquad.length<5) {

    	wscen="Quadruples " + cquad + " en "+ listecase[0]+ listecase[1]+ listecase[2]+ listecase[3]+" Elimination ";									
    for (var kkautre=0; kkautre<xautrecase; kkautre++) {// tableau contenu[hhautre] dans listeautrecase
    	var d=contenu[decodagecolPlace(listeautrecase[kkautre])];
    	var c01=cquad.match(re);
    	var d01=d.match(re);
    	var nm=0;
		for (var mm=0; mm<d.length; mm++) {
    		var dd=d01[mm];
    		if (cquad.split(dd)[0].length<cquad.length) {// inclus
    		   nm+=1;
    		}
    	}// mm
    	if (nm==d.length) {//nouvelle case incluse dans cquad
    		 scenario="5 cases pour 4 chiffres : "+cquad+" --> "+colPlace[hhautre[kkautre]]+",  "+colPlace[hh[0]]+",  "+colPlace[hh[1]]+",  "+colPlace[hh[2]]+" et "+colPlace[hh[3]];
    	 	 origincrash=true;
    	  	 return;	
    	}
		for (var x=0; x<2; x++) {}
		for (var juju=0; juju<d.length; juju++) {
			var ddx=d01[juju];
    		if (cquad.split(ddx)[0].length<cquad.length) {// inclus
    		   wscen+=ddx+" dans "+listeautrecase[kkautre]+" ";
			   eliminationnumero(decodagecolPlace(listeautrecase[kkautre]), ddx);// elimination
			}
    	}// juju

    }// kkautre
	if (scenario!=noeffect) {
	   if (clickmethode) {
	   	  var ng0=listecase[0]+listecase[1]+listecase[2]+listecase[3];
		  //var ng0=colPlace[h0]+colPlace[hh[1]]+colPlace[hh[2]]+colPlace[hh[3]];
		  testdoublon(ng0);
	   } else {
	   	 return
	   }
	}

}// cquad
}// nbre

}// ii


}//j
}// lc

}

function decimalToBinary(N) { 
    var binary = ''; 
    while (N > 0) { 
        binary = (N % 2) + binary; 
        N = Math.floor(N / 2); 
    }
    return binary; 
} 
  
function nbre_caracteres(lettre,mot)
    {
        mot2 = mot.split(lettre);
        nbre_de_fois_trouve = mot2.length-1;
        return nbre_de_fois_trouve;
    }

function testdoublon(ng) {
			// Doublon si ng permutation d'une solution previous de gratteciel[ig]
			var tg=true;
			if ((ngratteciel>0) && FILTRAGEDESSOLUTIONS) {
    			for (var ig=0; ig<ngratteciel; ig++) {
    				var ngg=gratteciel[ig];
    				//Test si ng et ngg sont en permutation de 4 elements
    				if (permutngngg(ng, ngg)) {tg=false}
    			}
			}
			if (tg) {
			    gratteciel[ngratteciel]=ng;
				ngratteciel=ngratteciel+1;
				enregistrescenarios();
			} else {
			    scenario=noeffect;
			}
}

function permutngngg(aa, bb) {
		 var a = new Array(4);
		 var b = new Array(4);
		 a[0]=aa.substring(0,2); 
		 a[1]=aa.substring(2,4); 
		 a[2]=aa.substring(4,6); 
		 a[3]=aa.substring(6,8); 
		 b[0]=bb.substring(0,2); 
		 b[1]=bb.substring(2,4); 
		 b[2]=bb.substring(4,6); 
		 b[3]=bb.substring(6,8);
		 // Test si b de 0 a 3 est une permutation de a de 0 a 3
		 for (var i=0; i<4; i++) {
		 	 var trouv=false;
			 for (var j=0; j<4; j++) {
			 	 if (b[i]==a[j]) {trouv=true}
			 }
			 if (!trouv) {return false}
		 }
		 return true; 
}

function elaborevariantequadruples() {
		 // "Quadruples " + cquad + " en "+ colPlace[h0]+colPlace[hh[1]]+colPlace[hh[2]]+colPlace[hh[3]]+" Elimination "+ n dans HH n dans HH ...
		 var s0=scenario.split("Quadruples ")[1];
		 var cq=s0.substring(0,4);
		 var s02=scenario.split(" en ")[1];
		 var hh=s02.substring(0,2)+" "+s02.substring(2,4)+" "+s02.substring(4,6)+" "+s02.substring(6,8)+" ";
		 for (var i=0; i<4; i++) {
		 	   var ccq=cq.substring(i,(i+1));
		 	   decodevert(hh, ccq);
		 }
		 var s1=s0.split(" Elimination ")[1];
		 var s12=s1.split(" dans ");
		 var m=s12[0];
		 for (var j=1; j<s12.length; j++) {
		 	var x=s12[j];
			var y=s12[j-1];
			var hh=x.substring(0,2);
			var m=y.substring(y.length-1, y.length);
			var h=decodagecolPlace(hh);			
			putmessage("Hugh3");
    		eliminationnumero(h,m);
		 }
}
