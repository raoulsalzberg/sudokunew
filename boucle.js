function boucle() {
	var re=/\d/g;
  	indiceboucle=0;
	casesboucle=[];
	var chiffresvus=new Array();
	var nombrechiffresvus=0;
	for (var icase=0; icase<B; icase++) {
		voit[icase]=new Array(C);
		numvue[icase]=0;
	}
	var i=0;//  Case de depart
	do {
		if ((contenu[i].length)==2) {// Boucle de cases a 2 chiffres
			var pasdejafait=true;
			for (var k=0; k<nombrechiffresvus; k++) {
				if (contenu[i]==chiffresvus[k]) {pasdejafait=false}			
			}			
			if (pasdejafait) {
    			chiffresvus[nombrechiffresvus]=contenu[i];
    			nombrechiffresvus=nombrechiffresvus+1;
    			var j=0;// Nombre de brins de la boucle
    			chem[0]=i;
				var kkase=colPlace[i]+" ";
				for (var iii=(i+1);iii<M;iii++) {
    				if (contenu[i]==contenu[iii]) {// Cases avec les memes 2 chiffres  
    				   j=j+1;
    				   chem[j]=iii;// Le tableau chem contient les cases successives prises dans l'ordre de la grille, de 0 a M, sans notion de lien
					   kkase=kkase+colPlace[iii]+" ";
    				}				
    			}
            	if(j>=NBM) {//Boucle a plus de NBM cases
					var jmax=j+1;	
                	var cref=contenu[chem[0]].toString().match(re);// Les 2 chiffres
                	// On batit les liens de chaque case du tableau chem : cases vues (tableau voit) et nombre de cases vues (tableau numvue)
                	for (var jj=0;jj<jmax;jj++) {
                		// Recherche doublons horizontal, vertical ou en carre selon chem[jj]
                		var igrille=chem[jj];
                		var ihorizontal = parseInt(igrille/9);
                		var ivertical=igrille-9*ihorizontal;
                		var icarre = carre[igrille];
                		var voitjj=0;
                		numvue[jj]=0;
						for (var ij=0; ij<jmax; ij++) {
                			if (ij!=jj) {
                    			var jgrille=chem[ij];
                    			var jhorizontal = parseInt(jgrille/9);
                    			var jvertical=jgrille-9*jhorizontal;
                    			var jcarre=carre[jgrille];
                    			// Recherche doublon jj par ij suivant horizontal ou vertical ou carre			
                    			if ((ihorizontal==jhorizontal)||(ivertical==jvertical)|| (icarre==jcarre)) {// Cases vues du noeud j contenant les 2 chiffres
                    			   	  voit[jj][voitjj]=String(ij);
                    				  voitjj=voitjj+1;
                    				  numvue[jj]=numvue[jj]+1;// numvue[jj]=voitjj ??
                    			}
                			}
                		}// ij
                	}// jj
                	// Elimination des isoles dans le tableau chem, cases sans lien
                	for (var jj=0;jj<jmax;jj++) {
                		if (numvue[jj]==0) {
                		   eliminationcases(jmax, jj);
                		   jmax=jmax-1;
                		}
                	}
				kkase="";
				for (var ijj=0; ijj<jmax; ijj++) {
					   kkase=kkase+colPlace[chem[ijj]]+" ";
    			}
                	// Recherche de boucles ouvertes : Remote Pair et Remote Pair-1
                	if (jmax>NBM-1) {
        				for (var jj=0; jj<jmax; jj++) {
                        		chemboucle[0]=jj;// 1ere case : numero dans le tableau chem sauf si deja vu !
                    			testboucle();
        		if ((scenario!=noeffect) && !clickmethode) {return}
                    	}
    				}
        		}// j>NBM : nombre de brins minimum
			}//pasdejafait
		}// case  initiale a 2 chiffres
		i=i+1;// case initiale suivante
	}
    while (i<M);
}
 
function testboucle() {// batir le tableau des indices chemboucle (dans le tableau chem) des cases successives de la boucle reliees entre elles
var i=0;
kvue[i]=0;// 1ere case vue par la premiere case
while (i>-1) {
	 // Etablissement d une chaine
	 do {
		 var jj=voit[chemboucle[i]][kvue[i]];// Case chem[jj] sur le brin kvue[i] de la case chem[chemboucle[i]]. Nombre de brins : numvue[chemboucle[i]]
		 // Test saturation des brins de cette case
		 while (kvue[i]==numvue[chemboucle[i]]) {// Case saturee non bouclee, revenir a case previous 
			 if (i==0) {return}//throw("Plus de case disponible")}// Plus de cases
			 i=i-1;// Case previous de la boucle
    		 kvue[i]=kvue[i]+1;// brin suivant de la case previous
    	 }
     	 var jj=voit[chemboucle[i]][kvue[i]];// Case sur le brin kvue[i] de la case chem[chemboucle[i]] non encore saturee 
	 	 // Test si case jj deja vue
		 var vu=false;
		 for (var ivu=0; ivu<i; ivu++) {
		 	 if (chemboucle[ivu]==jj) {
    		 	 vu=true;
    			 kvue[i]=kvue[i]+1;
			 }
		 }
		 //vu=vu && (kvue[i]<numvue[chemboucle[i]]); //Eviter une nouvelle saturation 
	 }
	 while (vu);
	 //validation case i et recherche case suivante, sur son brin 0
	 i=i+1;
	 // tableau chemboucle : indices dans le tableau chem des cases identifiees
	 chemboucle[i]=jj;
	 kvue[i]=0;
	 // Test boucle de taille > NBM entre la case jj en position i dans la boucle et une case previous non encore vue en position ijk
	 if (i>(NBM-1)) {
		 var jcv=chem[chemboucle[i]];// La case de depart de la boucle, en position i dans cette boucle a explorer jusque case previous
    	 for (var ijk=0; ijk<(i-NBM+1); ijk++) {// Exploration d une chaine
		 	 var d=i-ijk;
			 var jcw=chem[chemboucle[ijk]];// La case finale ulterieure testee
			 // jcv ne voit pas jcw
			 if ((parseInt(jcv/9)!=parseInt(jcw/9)) && ((jcv-9*parseInt(jcv/9))!=(jcw-9*parseInt(jcw/9)))&& (carre[jcv]!=carre[jcw])) { 
			 	if (d==(2*parseInt(d/2)+1)) {// Boucle paire (nombre impair de brins) --> Tester Remote Pair
						// Le programme de test du Remote Pair : supprimer les chiffres de la boucle dans les cases voyant les cases extremes de la boucle
        				variete=0;
						elimboucle(jcv, jcw, ijk, (i+1));
			 	} else {// Boucle impaire (nombre pair de brins) --> Remote Pair-1
						// Le programme de test du Remote Pair-1 : supprimer les chiffres de la boucle dans les cases isolees sur un axe voyant les cases extremes de la boucle
        				variete=1;
						elimbouclemoinsun(jcv, jcw, ijk, (i+1));
				}			 
        		if (scenario!=noeffect) {
						if (clickmethode) {
        					   // Test si scenario pas deja vu : meme chaine de cases dans casesboucle index : indiceboucle
            				   var pasvu=true;
            				   // Extraire Remote pairs xx HH HH HH HH dans scenario  --> scnew
            				   var s0=scenario.split("successives")[1];
            				   var s1=s0.split(" ");// s1[1] s1[2] s1[3] s1[4], xx
        					   var scnew=s1[1]+""+s1[2]+s1[3]+s1[4];
            				   // Test si scnew n'est pas une permutation circulaire d'un casesboucle previous --> elimination des doublons
            				   if ((indiceboucle>0) && FILTRAGEDESSOLUTIONS) {
                				   for (var indf=0; indf<indiceboucle; indf++) {
                    				   var sci=casesboucle[indf];//HH HH HH HH --> 0,2   2,4   4,6   6,8
                					   var nbsc=0;
                					   for (var ij=0; ij<4; ij++) {
            							  	  var hsci=sci.substring(2*ij, (2*ij+2));
            								  for (var kl=0; kl<4; kl++) {
            								  	  var hscnew=scnew.substring(2*kl, (2*kl+2));
            									  if (hscnew==hsci) {nbsc=nbsc+1}
            								  }
        							   }
            						   if (nbsc==4) {pasvu=false}// Permutation circulaire constatee --> ne pas enregistrer
            						}
                				}// indiceboucle
            					if (pasvu) {
            					   	  casesboucle[indiceboucle]=scnew;
            						  indiceboucle=indiceboucle+1;
                						//if (clickmethode) {enregistrescenarios()} else {return}
            						  enregistrescenarios();
            					} else {
        							  scenario= noeffect;													   
        						}
        				} else {
								return;
						}
        		}// scenario!=noeffect
			 } else if (d==(2*parseInt(d/2)+1)) {// Boucle paire fermee (nombre impair de brins) --> Erreur

			 }// jcv et jcw se voient ou pas    		 
    	 }// ijk
	 }// i>NBM		 
}
}

function elimboucle(casei, casef, first, nbcases) {
		 var re=/\d/g;
		 var cref=contenu[chem[0]].toString().match(re);// Les 2 chiffres
                    	 var voir="";// Les cases de la boucle dans voir, a partir de la case first, et de nombre nbcases
                    	 for (var cv=first; cv<nbcases; cv++) {
                    		voir=voir+colPlace[chem[chemboucle[cv]]]+" ";
							//affichageenvert(chem[chemboucle[cv]]);		
                    	 }
    					 wscen="Remote Pair avec les chiffres "+contenu[chem[0]]+"  dans les cases successives "+voir+". Elimination dans ";
		 for (var lc=0; lc<3; lc++) {
		 	 // Elimination des 2 chiffres dans les cases voyant les 2 cases extremes de la boucle casei et casef
			 var hbloc=true;
			 for (var i=0; i<9; i++) {
			 	 switch(lc) {
				 			case 0:
								 var h=i+9*parseInt(casei/9);
								 break;
				 			case 1:
								 var h=casei-9*+parseInt(casei/9)+9*i;
								 break;
				 			case 2:
								 var h=i+6*parseInt(i/3)+18*parseInt((carre[casei]-1)/3)+3*(carre[casei]-1);
    				   			 hbloc=((h-9*parseInt(h/9))!=(casei-9*parseInt(casei/9))) && (parseInt(h/9)!=parseInt(casei/9));
								 break;
				 }
				 if (hbloc) {
    				 if ((h!=casei) && (h!=casef) && (contenu[h].length>1) && ((parseInt(h/9)==parseInt(casef/9)) || ((h-9*parseInt(h/9))==(casef-9*parseInt(casef/9))) || (carre[h]==carre[casef]))) {
        				 	 var boucl=contenu[h];
    						 if ((boucl.split(cref[0])[0].length<boucl.length) || (boucl.split(cref[1])[0].length<boucl.length)) {// h contient au moins un des 2 chiffres
    							 wscen=wscen+colPlace[h]+" ";
    							 var ch=boucl.toString().match(re);
        						 for (var hnum=0; hnum<ch.length; hnum++) {if ((ch[hnum] == cref[0]) || (ch[hnum] == cref[1])) {eliminationnumero(h, ch[hnum])}}
    						 }
    				 }// h voit casei et casef et contient des chiffres de cref
				 }
			 }// i
		 }// lc
}

function elimbouclemoinsun(casei, casef, first, nbcases) {
	var re=/\d/g;
	var cref=contenu[chem[0]].toString().match(re);// Les 2 chiffres
    var voir="";// Les cases de la boucle dans voir, a partir de la case first, et de nombre nbcases
    for (var cv=first; cv<nbcases; cv++) {
    	voir=voir+colPlace[chem[chemboucle[cv]]]+" ";
	}
	for (var lc=0; lc<2; lc++) {// horizontal ou vertical
		var bloci=carre[casei]-1;
		var blocf=carre[casef]-1;
		if (lc==1) {
    		 var axei=parseInt(bloci/3);// axe bloc casei horizontal
    		 var axef=parseInt(blocf/3);// axe bloc casef horizontal
		} else {
    		 var axei=bloci-3*parseInt(bloci/3);// axe bloc casei vertical
    		 var axef=blocf-3*parseInt(blocf/3);// axe bloc casef vertical
		}
		if (axei!=axef) {// casei et casef sur axes blocs differents
    		// Reperage des axes dans axe bloc d une extremite, et pas dans l autre
			// 8 en tout : par orientation (horizontal ou vertical = 2 cas), par case extreme (2 cas), sur axe possible dans le bloc (2 cas)
			for (var icase=0; icase<2; icase++) {// casei ou casef
				var xc=casei;
				var xcp=casef;
				var axec=axei;
				if (icase==1)  {xc=casef; xcp=casei; axec=axef}
				var ii=carre[xc]-1;
				for (var z=0; z<9;z++) {
					var voirfin=false;
    				// axe z croise blos xc 
					if (lc==0) {var zok=(parseInt(z/3)==parseInt(ii/3))} else {var zok=(parseInt(z/3)==ii%3)}
					if (zok) {
							var seulsurz=0;
							var casechaine=voir.split(" ");
							var pasde=true;
							for (var igz=0; igz<9; igz++) {// Exploration de cet axe z
                    			var h=igz+9*z;
								if (lc==1) {h=9*igz+z}
								var boucl=contenu[h];
								// h a un chiffre contenu dans cref : annule cet axe z
								if ((boucl.length==1) && ((boucl==cref[0]) || (boucl==cref[1]))) {pasde=false; break}
								if (boucl.length>1) {
    									 // h voit-il une case de la chaine sur axe ou est-il dans un bloc de case extreme
    								 	 var voirplus=false;
										 var ichvu=1;// numero impair par defaut
										 if (carre[h]==carre[xc]) {
										 	voirplus=true;
											ichvu=0;// numero pair dans bloc par defaut
										 } else {
											 for (var ich=0; ich<casechaine.length-1; ich++) {
        									 	 var xx=casechaine[ich];
        										 var yy=decodagecolPlace(xx);
            									 if ((parseInt(h/9)==parseInt(yy/9)) || ((h-9*parseInt(h/9))==(yy-9*parseInt(yy/9)))) {
                									 	 voirplus=true;
														 var ichvu=ich;
														 if (yy==xcp) {
														 	voirfin=true;
	   													}
            									 }
        									 }// ich
										 }
     									 if (voirplus) {// si voirplus, la case h voit une case de la chaine (qui doit etre de numero pair depuis la case depart) ou est dans le bloc de xc, h doit contenir chiffre(s), sinon pasde=false
    											 pasde=((boucl.split(cref[0])[0].length<boucl.length) || (boucl.split(cref[1])[0].length<boucl.length)) && (ichvu==2*parseInt(ichvu/2));
												 if (!pasde) {
												 break; break}// Voir z suivant
    									 } else {// Sinon test solo si contient au moins un des 2 chiffres
    											 if ((boucl.split(cref[0])[0].length<boucl.length) || (boucl.split(cref[1])[0].length<boucl.length)) {
           									  	 	 seulsurz=seulsurz+1;
            										 var hm=h;
    											 }												 
    									 }// voirplus
								}// boucl.length>1
                    		}// igz
							if ((seulsurz==1) && pasde && voirfin){// Eliminer les autres chiffres dans hm
                    					 if (lc==0) {wscen="Remote Pair -1 sur axe horizontal avec les chiffres "+contenu[chem[0]]+"  dans les cases successives "+voir+". Elimination dans "}
                    					 if (lc==1) {wscen="Remote Pair -1 sur axe vertical avec les chiffres "+contenu[chem[0]]+"  dans les cases successives "+voir+". Elimination dans "}
									 	 wscen=wscen+colPlace[hm]+" ";
										 var remote=(wscen.split("-1")[0].length<wscen.length)
				if (remote) {if (lc==0) {wscen=wscen+tradacrit(" <br><br>Références : ligne ")+colPlace[hm].substring(1,2)+" et bloc "+carre[xc]+".<br><br>"} else {wscen=wscen+tradacrit(" <br><br>Références : colonne ")+colPlace[hm].substring(0,1)+" et bloc "+carre[xc]+".<br><br>"}}
										 var poshm=contenu[hm];
										 var ch=poshm.match(re);
										 for (var hnum=0; hnum<poshm.length; hnum++) {
											if ((ch[hnum]!=cref[0]) && (ch[hnum]!=cref[1])) {
											   var num=ch[hnum];
											   eliminationnumero(hm, num);
											}
										 }
							}// seulsurz
					}// z/3
				}// z
			}// icase
    	}// axei!=axef
	}// lc
}

function eliminationcases(jm, jn) {
    for (var jjk=0; jjk<jm;jjk++) {
	   for (var jjm=0; jjm<numvue[jjk]; jjm++) {
	   	   var jq=voit[jjk][jjm];
		   if (jq==jn) {
				  for (var jjq=jjm+1; jjq<numvue[jjk]; jjq++) {
				  	  var vv=voit[jjk][jjq-1];
					  voit[jjk][jjq-1]=voit[jjk][jjq];
				  }
		   		  numvue[jjk]=numvue[jjk]-1;
		   }
	   }
    }

    for (var jjk=jn+1; jjk<jm;jjk++) {
	   chem[jjk-1]=chem[jjk];
	   numvue[jjk-1]=numvue[jjk];
    }

    for (var jjk=0; jjk<jn;jjk++) {
	   for (var jjm=0; jjm<numvue[jjk]; jjm++) {
	   	   var jq=voit[jjk][jjm];
		   if (jq>jn) {voit[jjk][jjm]=jq-1}
	   }
    }
    for (var jjk=jn; jjk<jm-1;jjk++) {
	   var voirj=colPlace[chem[jjk]]+" b : ";
	   for (var jjm=0; jjm<numvue[jjk]; jjm++) {
		   var jq=voit[jjk+1][jjm];
		   if (jq>jn) {voit[jjk][jjm]=jq-1} else {voit[jjk][jjm]=jq}
	   }
    }
	return jm-1;
}

function elaborevarianteboucle() {
		 // "Remote Pair avec les chiffres "+contenu[chem[0]]+"  "+voir+". Elimination +" dans "+H2 H3 ...
		 var re=/\d/g;
		 var s0=scenario.split("chiffres")[1];
		 var n0=s0.substring(1,2);
		 var n1=s0.substring(2,3);
		 var s1=s0.split("Elimination dans ")[1];
		 var remote=(scenario.split("-1")[0].length<scenario.length);
		 if (remote) {
		 	variete=1; 
			var s2=s1.substring(0,2);
    		var h=decodagecolPlace(s2);
			var boucl=contenu[h].toString();
    		var ch=boucl.match(re);
			for (var hnum=0; hnum<ch.length; hnum++) {if ((ch[hnum]!=n0) && (ch[hnum]!=n1)) {eliminationnumero(h, ch[hnum])}}				
		 } else {
		   	variete=0;
    		var s2=s1.split(" ");
    		for (var i=0; i<s2.length-1; i++) {
				 var h=decodagecolPlace(s2[i]);
    			 var boucl=contenu[h].toString();
    			 var ch=boucl.match(re);
    			 if (boucl.split(n0)[0].length<boucl.length) {eliminationnumero(h, n0)}
    			 if (boucl.split(n1)[0].length<boucl.length) {eliminationnumero(h, n1)}
			}
		}
  		// Verdissement
  		var sc0=scenario.split("successives ");
  		var liste=sc0[1].split(".")[0];
		decodevert(liste,n0);  
		decodevert(liste,n1);  
}
