function laigleetsaproie() {
	// 2 cases identiques ne se voyant pas
  	variete=0;// Une seule variete
	var re=/\d/g;
	for (var i=0; i<M; i++) {
		var c=contenu[i]+"";
		var ch=c.match(re);
		var hi=parseInt(i/9);
		var vi=i-9*hi;
		var ci=carre[i]-1;
		if (ch.length==2) {
			var x=ch[0];
			var y=ch[1];
		    // Recherche 2 cases vues a 2 chiffres contenant l'un des chiffres et un chiffre commun
        	// Case hj contenant x
			for (var lc=0; lc<3; lc++) {
        	   for (var j=0; j<9; j++) {
			   	   var hjbloc=true;
		 	   	   switch(lc) {
                   		  case 0:
                   		  	   var hj=j+9*hi;//									   Ligne
                			   break;
                   		  case 1:
                		  	   var hj=9*j+vi;//	   	   			 	  	   	  	   Colonne
                			   break;
                   		  case 2:
                   		  	   var hj=j+6*parseInt(j/3)+18*parseInt(ci/3)+3*ci;//  Bloc
        					   // hj dans bloc mais pas sur ligne ni colonne
        					   var hjbloc=((hj-9*parseInt(hj/9))!=(i-9*parseInt(i/9))) && (parseInt(hj/9)!=parseInt(i/9));
        					   break;
                   		  default:
                			   break;
                	}
					if (hjbloc) {
					   var posj=contenu[hj]+"";
        			   var chj=posj.match(re);
				   	   if ((hj!=i) && (posj.length==2) && (posj.split(x)[0].length<2)) {
				   	   	  // Autre chiffre de hj
						  var z=chj[0];
						  if (z==x) {z=chj[1]}
						  if (z!=y) {
    						  // case hk contenant y et z
                           	  for (var lck=0; lck<3; lck++) {
    							  if (lck!=lc) {
                        	   	  	 for (var k=0; k<9; k++) {
			   	   					  	   var hkbloc=true;
                        		 	   	   switch(lck) {
                                           		  case 0:
                                           		  	   var hk=k+9*hi;//									   Ligne
                                        			   break;
                                           		  case 1:
                                        		  	   var hk=9*k+vi;//	   	   			 	  	   	  	   Colonne
                                        			   break;
                                           		  case 2:
                                           		  	   var hk=k+6*parseInt(k/3)+18*parseInt(ci/3)+3*ci;//  Bloc
                                					   // hk dans bloc mais pas sur ligne ni colonne
                                					   var hkbloc=((hk-9*parseInt(hk/9))!=(i-9*parseInt(i/9))) && (parseInt(hk/9)!=parseInt(i/9));
                                					   break;
                                           		  default:
                                        			   break;
                                        	}
                                			if (hkbloc) {
                                			   var laigle=contenu[hk]+"";
                                			   var chk=laigle.match(re);
                        				   	   if ((hk!=i) && (laigle.length==2) && (laigle.split(y)[0].length<2) && (laigle.split(z)[0].length<2)) {
            								   	  // 2eme serre trouvee
    											  // Recherche cases contenant z et voyant les 2 serres hj et hk
												  voitles2avecz(i, hj, hk, z);
                                        		  if (scenario!=noeffect) {
                                        				variete=0;
                                        				if (clickmethode) {enregistrescenarios()} 
                                        		  }
    										   }// hk!=i
    										}//hkbloc
    								  }// k
    							  }// lck != lc
    						  }// lck
						  }// z!=y
					   }// hj!=i
					}// hjbloc
			   }// j
			}// lc
		} else if (ch.length==3){// ch
		   for (var j=0; j<3; j++) {// Aigle a 3 chiffres, a decomposer entre x, y et z, le chiffre a supprimer etant x
		   	   var x=ch[j];
			   switch (j) {
			   		  case 0:
					  	   var y=ch[1];
						   var z=ch[2];
						   break;
			   		  case 1:
					  	   var y=ch[0];
						   var z=ch[2];
						   break;
			   		  case 2:
					  	   var y=ch[0];
						   var z=ch[1];
						   break;
			   		  default:
						   break;
			   }
		   	   // Recherche 2 cases vues par i a 2 chiffres contenant x et l'un des chiffres y ou z (y<z), non alignees avec i
			   if (x<y) {var c1=String(x)+String(y)} else {var c1=String(y)+String(x)}// c1 contient xy ou yx (dans l'ordre)
			   if (x<z) {var c2=String(x)+String(z)} else {var c2=String(z)+String(x)}// c2 contient xz ou yz (dans l'ordre)
        	   var i1=M;
			   var i2=M;
			   for (var ial=0; ial<M; ial++) {// Recherche i1 et i2 vus par i, contenant c1 et c2 respectivement
			   	   if (ial!=i) {
				   if ((((carre[ial]== carre[i]) || (parseInt(ial/9)== parseInt(i/9)) || ((ial-9*parseInt(ial/9))==(i-9*parseInt(i/9))))) && (contenu[ial].length==2)) {
					  if (String(contenu[ial])==c1) {i1=ial}
					  if (String(contenu[ial])==c2) {i2=ial}
				   }}
			   }// ial
			   if ((i1<M)&&(i2<M)){// Trouve sauf alignement i, i1, i2 et sauf meme bloc
			   if (!(((parseInt(i/9)==parseInt(i1/9)) && (parseInt(i/9)==parseInt(i2/9))) || (((i-9*parseInt(i/9))==(i1-9*parseInt(i1/9))) && ((i-9*parseInt(i/9))==(i2-9*parseInt(i2/9)))))) {
			   if (!((carre[i1]==carre[i]) && (carre[i2]==carre[i]))) {// Trouve sauf i, i1, i2 dans meme bloc
				  if (carre[i1]==carre[i]) {// Recherche dans le carre de  i1 et i les proies voyant i2 (ligne ou colonne), pour y supprimer x
				  	 var iic=carre[i]-1;
					 for (var k=0; k<9; k++) {
					 	 var h=k+6*parseInt(k/3)+18*parseInt(iic/3)+3*iic;// Proie dans le carre de i et i1
						 var ligne=parseInt(i/9);
						 var colonne=i-9*ligne;						 
						 if (ligne==parseInt(i2/9)) {// i2 sur meme ligne que i
						 	if ((h!=i) && (ligne==parseInt(h/9))) {// h sur meme ligne que i et i2
                			  var chh=(contenu[h]+"").match(re);
                			  wscen="XYZ-Wing : Aigle " + colPlace[i]+" et serres "+colPlace[i1]+" et "+colPlace[i2]+tradacrit(", élimination ")+x+ " dans "+colPlace[h];
							  eliminationnumero(h, x);							
							}
						 } else if (colonne==(i2-9*parseInt(i2/9))) {// i2 sur meme colonne que i
						 	if ((h!=i) && (colonne==(h-9*parseInt(h/9)))) {// h sur meme colonne que i
                			  var chh=(contenu[h]+"").match(re);
                			  wscen="XYZ-Wing : Aigle " + colPlace[i]+" et serres "+colPlace[i1]+" et "+colPlace[i2]+tradacrit(", élimination ")+x+ " dans "+colPlace[h];
							  eliminationnumero(h, x);							
							}						 
						 }
                		 if (scenario!=noeffect) {
									variete=1;
									if (clickmethode) {enregistrescenarios()} 
									if (scenario!=noeffect) {return}// Solution particuliere
                		 }
					 }				  
				  } else if (carre[i2]==carre[i]) {// Recherche dans le carre de i2 et i les proies voyant i1 (ligne ou colonne), pour y supprimer x
				  	 var iic=carre[i]-1;
					 for (var k=0; k<9; k++) {
					 	 var h=k+6*parseInt(k/3)+18*parseInt(iic/3)+3*iic;// Proie dans le carre de i et i2
						 var ligne=parseInt(i/9);
						 var colonne=i-9*ligne;						 
						 if (ligne==parseInt(i1/9)) {// i1 sur meme ligne que i
						 	if ((h!=i)&& (ligne==parseInt(h/9))) {// h sur meme ligne que i et i1
                			  var chh=(contenu[h]+"").match(re);
                			  wscen="XYZ-Wing : Aigle " + colPlace[i]+" et serres "+colPlace[i1]+" et "+colPlace[i2]+tradacrit(", élimination ")+x+" dans "+colPlace[h];
							  eliminationnumero(h, x);							
							}
						 } else if (colonne==(i1-9*parseInt(i1/9))) {// i1 sur meme colonne que i
						 	if ((h!=i) && (colonne==(h-9*parseInt(h/9)))) {// h sur meme colonne que i
                			  var chh=(contenu[h]+"").match(re);
                			  wscen="XYZ-Wing : Aigle " + colPlace[i]+" et serres "+colPlace[i1]+" et "+colPlace[i2]+tradacrit(", élimination ")+x+ " dans "+colPlace[h];
							  eliminationnumero(h, x);							
							}						 
						 }
						 if (scenario!=noeffect) {
								variete=1;
								if (clickmethode) {enregistrescenarios()} 
								if (scenario!=noeffect) {return}// Solution particuliere
            			 }
					 }// k				  
				  }			   
			   }}}// M+			   
			}// j	
		}// ch				  
	}// i
}

function voitles2avecz(aigle, serre1, serre2, chif) {
		 for (var h=0; h<M; h++) {
		 	 var posh=contenu[h]+"";
			 if ((h!=serre1) && (h!=serre2)) {
    			 if (((parseInt(h/9)==parseInt(serre1/9)) || ((h-9*parseInt(h/9))==(serre1-9*parseInt(serre1/9))) || (carre[h]==carre[serre1])) && ((parseInt(h/9)==parseInt(serre2/9)) || ((h-9*parseInt(h/9))==(serre2-9*parseInt(serre2/9))) || (carre[h]==carre[serre2])) && (posh.split(chif)[0].length<posh.length)) {
                    wscen="XY-Wing : Aigle " + colPlace[aigle]+" et serres "+colPlace[serre1]+" et "+colPlace[serre2]+tradacrit(", élimination ")+chif+ " dans "+colPlace[h];
    				eliminationnumero(h, chif);										 	
    			 }
			 }  
		 }
}

function elaborevariantelaigle() {
    //scenario=" Aigle C3 et serres B2 et B3 elimination 7 dans E5
    //scenario=" Rectangle vide bloc 7 et lien fort D9 et D1 elimination 6 dans A1
	var s3=scenario.split(tradacrit("élimination "))[1];
	var chiffre=s3.substring(0,1);
	var s4=s3.split("dans ")[1];
	var result=s4.substring(0,2);
	eliminationnumero(decodagecolPlace(result), chiffre);
	if (scenario.split("Aigle")[0].length<scenario.length) {
		var s5=scenario.split("Aigle ")[1];
		var aigle=s5.substring(0,3);// Aigle
		var aigle2=s5.substring(0,2);
		var s6=s5.split("serres ")[1];
		var serre=s6.substring(0,3);
		serre+=s6.substring(6,8)+" ";
		decodevert(serre, chiffre);
		var re=/\d/g;
		var h=decodagecolPlace(aigle2);
		var ch=contenu[h].match(re);
		for (var i=0; i<3; i++) {
			decodebleu(aigle, ch[i]);
		}
	}
	 else {
		var s5=scenario.split("fort ")[1];
		var liste=s5.substring(0,3);
		var s6=s5.split("et ")[1];
		liste+=s6.substring(0,3);
		decodevert(liste, chiffre);
		var bloc=scenario.split("bloc ")[1].substring(0,1)-1;
		// + tous les chiffres chiffre du bloc
		var liste="";
		for (var j=0; j<9; j++) {
			var h=j+6*parseInt(j/3)+18*parseInt(bloc/3)+3*bloc; // Position j dans le carre bloc
			var posk=contenu[h];
			if (posk.split(chiffre)[0].length<posk.length) {liste+=colPlace[h]+" "}
		}
		decodevert(liste,chiffre);
	}
}

function rectanglevide() {
	variete=0;// Une seule variete
	var re=/\d/g;
	for (var n=1; n<10; n++) {// Chiffre
		for (var i=0; i<9; i++) {// Bloc
			var h0=18*parseInt(i/3)+3*i;
			// Recherche d'une seule ligne et une seule colonne occupee
			var nr=1;
			var ligne=10;
			var colonne=10;
			var recap="";
			var zoneinterdite=false;
			for (var j=0; j<9; j++) {// Case du bloc
				var h=j+6*parseInt(j/3)+h0;
				var rectangle=contenu[h];
    			if (rectangle.split(n)[0].length<rectangle.length) {// n dans la case
					if (rectangle.length==1) {zoneinterdite=true; break}
					recap=recap+colPlace[h]+"="+rectangle+" ";
					var ligneh=parseInt(j/3);
					var colonneh=j-3*parseInt(j/3);
					switch(nr) {
						case 1:// 1ere case
    						var ligne1=ligneh;
    						var colonne1=colonneh;
    						var h1=h;
    						break;
						case 2:// 2eme case
    						var ligne2=ligneh;
    						var colonne2=colonneh;
    						var h2=h;
							if (ligne1==ligne2) {ligne=ligne1}
							if (colonne1==colonne2) {colonne=colonne1}
    						break;
						default:// cases suivantes   						
    						if ((ligne!=10) && (colonne!=10)) {
							   if ((ligneh!=ligne) && (colonneh!=colonne)) {zoneinterdite=true}
							}
    						if (ligne==10)  {
							   if ((ligneh==ligne1) || (ligneh==ligne2)) {ligne=ligneh} else {zoneinterdite=true}
							}
    						if (colonne==10)  {
							   if ((colonneh==colonne1) || (colonneh==colonne2)) {colonne=colonneh} else {zoneinterdite=true}
							}
							break;
					}
					nr=nr+1;
    			}// n dans la case h
			}// j
			if (!zoneinterdite && (ligne!=10) && (colonne!=10)) {//Solution
			   // Recherche d'une case de la ligne hors du bloc, contenant n
			   var lh=parseInt(h0/9)+ligne;// Ligne du diagramme
			   var chh=h0-9*parseInt(h0/9)+colonne;// colonne du diagramme
			   for (var k=0; k<9; k++) {// case de la meme ligne hors du bloc
				   var hh=9*lh+k;
				   if (i!=(carre[hh]-1)) {//case hors bloc
        				var rectangle=contenu[hh].toString();
						if ((rectangle.split(n)[0].length<rectangle.length) && (rectangle.length>1)) {// n dans la case
						   // Recherche lien fort sur la colonne de la case hh, hors de son bloc
						   var lienfort=true;
						   var nbreliens=0;
						   var hfort=M;
						   for (var kk=0; kk<9; kk++) {// lien fort hors bloc hh
						   	   var hhh=(hh-9*parseInt(hh/9))+9*kk;
							   if (hhh!=hh) {//lien fort hors hh
                    				var rectangle=contenu[hhh];
                        			if ((rectangle.split(n)[0].length<rectangle.length) && (rectangle.length>1)) {// n dans la case
									   nbreliens=nbreliens+1;
									   if (nbreliens==1) {var hfort=hhh} //1er lien
									   if (nbreliens>1) {lienfort=false}// Pas de lien fort     
									}// n dans la case hhh							   
							   }//lien fort hors hh
						   }// Recherche lien fort kk --> hhh (devenant hfort) hors bloc hh
						   if (lienfort && (hfort!=M)) {// Lien fort trouve
							  // Rectangle vide : supprimer n sur case de la ligne hfort et de colonne colonne
							  var cible=9*parseInt(hfort/9)+chh;
                    		  if (carre[cible]!=(i+1)) {
								  var ch=contenu[cible].toString().match(re);
								  wscen="Rectangle vide bloc " + (i+1) + " et lien fort "+ colPlace[hh]+" et "+colPlace[hfort]+tradacrit(" élimination ")+n+" dans "+colPlace[cible];
								  for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] == n) {eliminationnumero(cible, ch[hnum])}}
							  }
						   }// Lien fort trouve
                		   if (scenario!=noeffect) {
									if (clickmethode) {enregistrescenarios()} else {return}
                		   }
						}// n dans la case hh
				   }//Case hors bloc
			   }// case de la meme ligne
			   // Recherche d'une case de la colonne hors du bloc, contenant n
			   var chh=h0-9*parseInt(h0/9)+colonne;// colonne du diagramme
			   var lh=parseInt(h0/9)+ligne;// Ligne du diagramme
			   for (var k=0; k<9; k++) {// case de la meme colonne hors du bloc
			   	   var hh=chh+9*k;
				   if (i!=(carre[hh]-1)) {//case hors bloc
        				var rectangle=contenu[hh].toString();
            			if ((rectangle.split(n)[0].length<rectangle.length) && (rectangle.length>1)) {// n dans la case
						   // Recherche lien fort sur la ligne de la case hh, hors de son bloc
						   var lienfort=true;
						   var nbreliens=0;
						   var hfort=M;
						   for (var kk=0; kk<9; kk++) {// lien fort hors bloc hh
						   	   var hhh=9*parseInt(hh/9)+kk;
							   if (hhh!=hh) {//lien fort hors hh
                    				var rectangle=contenu[hhh];
                        			if ((rectangle.split(n)[0].length<rectangle.length) && (rectangle.length>1)) {// n dans la case
									   nbreliens=nbreliens+1;
									   if (nbreliens==1) {var hfort=hhh} //1er lien
									   if (nbreliens>1) {lienfort=false}// Pas de lien fort     
									}// n dans la case hhh							   
							   }//lien fort hors hh
						   }// Recherche lien fort kk --> hhh (devenant hfort) hors bloc hh
						   if (lienfort && (hfort!=M)) {// Lien fort trouve
						   	  // Rectangle vide : supprimer n sur case de la colonne hfort et de ligne, hors bloc i
							  var cible=(hfort-9*parseInt(hfort/9))+9*lh;
                    		  if (carre[cible]!=(i+1)) {
    							  var ch=contenu[cible].toString().match(re);
                    			  wscen="Rectangle vide bloc " + (i+1) + " et lien fort "+ colPlace[hh]+" et "+colPlace[hfort]+tradacrit(" élimination ")+n+" dans "+colPlace[cible];
								  for (var hnum=0; hnum<ch.length; hnum++) {if (ch[hnum] == n) {eliminationnumero(cible, ch[hnum])}}
							  }							  
						   }// Lien fort trouve
                		   if (scenario!=noeffect) {
				  					if (clickmethode) {enregistrescenarios()} else {return} 
                		   }
						}// n dans la case hh
				   }//Case hors bloc
			   }// k case de la meme colonne
			}// j==9		
		}// Bloc i
	}// Chiffre n
}

