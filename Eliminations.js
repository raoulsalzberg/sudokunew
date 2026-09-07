function eliminationglobale() {
	for (var i=0; i<M; i++) {
		if (contenu[i].length == 1) {// Chiffre seul nouveau
			for (var iisort=0; iisort<M; iisort++) {sortieinser[iisort]=""}
			wscen="";
			pipile=0;
			if (CASCADEIN) {
				var newcol=false;
    			if (coloris) {var newcol=true}
    			coloris=true;
    			testsolution=false;
				elim(i);// Elimination de ce chiffre dans les cases ou il est vu
				if (!newcol) {
					 enleverougeetchiffre();
					 coloris=false;
    			}
			} else {
				elim(i);// Elimination de ce chiffre dans les cases ou il est vu
			}
			casesblanches="";
			for (var iii=0; iii<M; iii++) {
				if (contenu[iii].length==0) {
					if (casesblanches.length==0) {casesblanches=tradacrit("Sélection impossible "+colPlace[i]+"="+contenu[i]+" du fait de cases sans chiffre résiduel")}
					casesblanches=casesblanches+" "+colPlace[iii];
				}
			}
			if (scenario!=noeffect) {
    				variete=0;
    				if (clickmethode) {enregistrescenarios()} else {return}
    		}
		}
	}
}

function elaborevariantepetitschiffres() {
	// scenario=E5 = n+".... dans "+F1 F2 --> variete=0
		 variete=0;
		 var s=scenario.split(" dans ");
		 var s02=s[0].substring(0,3);
		 var num=s[0].substring(5,6);
		affiche();
		 decodevert(s02, num);
		 for (var i=1; i<s.length; i++) {
		 	 var n=s[i-1].substring(s[i-1].length-1, s[i-1].length);
			 decodecase(s[i],n);
		 }
}

function decodecase(liste, m) {
			var s1=liste.split(" ");
			for (var i=0; i<s1.length-1; i++) {
    				if (s1[i].length==2) {
    					var h=decodagecolPlace(s1[i].substring(0,2));
						eliminationnumero(h,m);
					} else {break} 
			}
}

function eliminationnumero(position, numeroaeliminer) {
		var currSquare = SQ + colPlace[position];
		var ini= document.getElementById(currSquare).innerHTML;
		var qelim=contenu[position].toString();
		var j=qelim.split(numeroaeliminer)[0].length;
		var nombrenumeros=qelim.length;
		if (j<nombrenumeros) {// Vrai si contenu[position] contient numeroaeliminer et d'autres chiffres
				scenario=wscen;
				if (coloris) {
					  var inser=PREPRINT+numeroaeliminer+POSTPRINT;// A inserer
        			  var jm=sortieinser[position].length;
    				  if (jm==0) {// Premier passage
    				  	if (j==0) {
						 	sortieinser[position]=inser+PREAUTRE+qelim.substring(j+1,nombrenumeros)+POSTAUTRE;
						} else if (j==(nombrenumeros-1)) {
							sortieinser[position]=PREAUTRE+qelim.substring(0,j)+POSTAUTRE+inser;
						} else {
							sortieinser[position]=PREAUTRE+qelim.substring(0,j)+POSTAUTRE+inser+PREAUTRE+qelim.substring(j+1,nombrenumeros)+POSTAUTRE;
						}
    				  } else {// Suivants
						  if (!(sortieinser[position].split(PREPRINT+numeroaeliminer)[0].length<jm)) {// Pas deja fait
								 var i=0;
								 var jj=0;
								 do	 {
    							 	 var nch=sortieinser[position].split(numeroaeliminer)[i];
    								 var kk=nch.length;
									 jj=jj+kk+1;
								 	 var trouv=false;
									 for (var ii=6; ii>0; ii--) {if (nch.substring(kk-ii, kk-ii+1)=="#") {trouv=true}}
        							 i=i+1;
    							 }
								 while (trouv);
								 if (j<(nombrenumeros-1)) {
								 	sortieinser[position]=sortieinser[position].substring(0,jj-1)+inser+PREAUTRE+sortieinser[position].substring(jj,jm);
								 } else {// sauf jj en dernier
								 	sortieinser[position]=sortieinser[position].substring(0,jj-1)+POSTAUTRE+inser;
								 }
    				  	  }
    				 }
					 document.getElementById(currSquare).innerHTML = sortieinser[position];
				} else {				
					contenu[position] = qelim.substring(0,j) + qelim.substring((j+1),nombrenumeros);
					if (contenu[position].length<2) {
					   if (contenu[position].length==1) {
					   		document.getElementById(currSquare).innerHTML ="<b>"+contenu[position]+"</b>";
					   } else {
							return;
					   }
					} else {
					  document.getElementById(currSquare).innerHTML = "<span style='font-size:xx-large'>"+contenu[position]+"</span>";
					}
					xy=true;
			  }
		}
}


function decodevert(liste, m) {
	if (unevariante) {
			var s1=liste.split(" ");
			for (var i=0; i<(s1.length-1); i++) {
    			var h=autredecode(s1[i].substring(0,2));
				if (s1[i].length==2) {miseauvert(h,m, BACKVERT)} else {break} 
			}
	}
}

function decodebleu(liste, m) {
	if (unevariante) {
			var s1=liste.split(" ");
			for (var i=0; i<(s1.length-1); i++) {
    			var h=decodagecolPlace(s1[i].substring(0,2));
				if (s1[i].length==2) {miseauvert(h,m, BACKBLEU)} else {break} 
			}
	}
}

function miseauvert(position, numeroaverdir, verdir) {
	var currSquare = SQ + colPlace[position];
	var ini= document.getElementById(currSquare).innerHTML;
	var xx=contenu[position];
	var qelim=xx.toString();
	var j=qelim.split(numeroaverdir)[0].length;
	var nombrenumeros=qelim.length;
	if (ini.length==1) {// case vide
		ini=contenu[position];
		// chercher le chiffre a verdir		
		var poschiffre=ini.split(numeroaverdir);
		if (poschiffre[0].length<ini.length) {
			var newdoc=PREAUTRE+poschiffre[0]+POSTAUTRE+PRETOUTE+verdir+POSTINSER+numeroaverdir+POSTPRINT+PREAUTRE+poschiffre[1]+POSTAUTRE;
	    	document.getElementById(currSquare).innerHTML = newdoc;
		}
		return;	
	}
	var pat=POSTINSER+numeroaverdir+"<";
	var pospat=ini.split(pat)[0];
	if (pospat.length<ini.length) {// chiffre isole : soit rouge, soit de fond colore, soit en compagnie de chiffres colores
		// inserer verdir
		var newdoc=pospat+verdir+pat+ini.split(pat)[1];
		document.getElementById(currSquare).innerHTML = newdoc;
		return;	
	} else {// chiffre melange avec les autres
		// enlever ce chiffre ou il est et reporter  en fin de ligne le chiffre avec fond colore
		var poschiffre=ini.split(numeroaverdir);
		var jj=0;
		for (var i=0; i<poschiffre.length; i++) {
			var prev=poschiffre[i];
			jj+=prev.length;
			var prevchiffre=prev.substring(prev.length-7, prev.length);
			if (prevchiffre.split(POSTINSER)[0].length<prevchiffre.length) {// bon chiffre
var newdoc=ini.substring(0,jj)+POSTAUTRE+PRETOUTE+verdir+POSTINSER+numeroaverdir+POSTPRINT
if (qelim.substring(qelim.length-1, qelim.length) != numeroaverdir) {newdoc+=PREAUTRE+ini.substring(jj+1, ini.length)}
        		document.getElementById(currSquare).innerHTML = newdoc;
				return;	
			} else {
				jj+=1;
			}
		}
	}
	// Rien trouve
}

function elimplus(i0, chif, iprev) {
			empile=empile+1;
			empileplus=0;
			var re=/\d/g;
 			var num0=contenu[i0];
			var ch=num0.match(re);
			var num=ch[0];
			if (num==chif) {num=ch[1]}
			var ihorizontal = parseInt(i0/9);
			var ivertical=i0-9*ihorizontal;
			var icarre = carre[i0]-1;
			wlocal[empile]="   Cascade "+colPlace[i0]+" = "+num+", Elimination "+num+" dans ";
			contraintes(i0);
			var garde=wlocal[empile];
			for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
				var hbloc=true;
				for (var i=0; i<9; i++) {
					switch (lc) {
	  					case 0: // Ligne ihorizontal
							var h=i+9*ihorizontal;
							break;
	  					case 1: // Colonne ivertical
							var h=ivertical+9*i;
							break;
	  					case 2: // Carre icarre
							var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
    				   		hbloc=((h-9*parseInt(h/9))!=(i0-9*parseInt(i0/9))) && (parseInt(h/9)!=parseInt(i0/9));
							break;
					}// switch
					if (hbloc) {// pas deja vu
					if ((h!=i0) && (contenu[h].length>1)) {
					   if (contenu[h].split(num)[0].length<contenu[h].length) {
    						   wlocal[empile]=wlocal[empile]+colPlace[h]+" ";
							   eliminationnumero(h, num);// Rougit elimination
							   var lncas=contenu[h].length;
							   var lncasref=1;
							   if (coloris) {lncasref=2}
        		var x=colPlace[h]+" =";
							   if ((lncas==lncasref) && (h!=iprev)) {// Elimination en casecade de cascade et empileplus
        							if (!dejafait(colPlace[h])) {// Test case pas deja faite, ni cascade ni Residuel : la traiter
											elimplusplus(h, num);
        							}					
							   }
					   }
					}}// h!=i0
				}// i
			}// lc
    		if (wlocal[empile]==garde) {
			   wlocal[empile]="";
			} else {
			   for (var k=1; k<(empileplus+1); k++) {wlocal[empile]=wlocal[empile]+wlocalplus[k]}
			}
}


function elimplusplus(i0, chif) {
			empileplus=empileplus+1;
			var re=/\d/g;
 			var num0=contenu[i0];
			var ch=num0.match(re);
			var num=ch[0];
			if (num==chif) {num=ch[1]}
			var ihorizontal = parseInt(i0/9);
			var ivertical=i0-9*ihorizontal;
			var icarre = carre[i0]-1;
			wlocalplus[empileplus]="   Cascade de cascade "+colPlace[i0]+" = "+num+", Elimination "+num+" dans ";
			contraintes(i0);
			var garde=wlocalplus[empileplus];
			for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
				var hbloc=true;
				for (var i=0; i<9; i++) {
					switch (lc) {
	  					case 0: // Ligne ihorizontal
							var h=i+9*ihorizontal;
							break;
	  					case 1: // Colonne ivertical
							var h=ivertical+9*i;
							break;
	  					case 2: // Carre icarre
							var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
    				   		hbloc=((h-9*parseInt(h/9))!=(i0-9*parseInt(i0/9))) && (parseInt(h/9)!=parseInt(i0/9));
							break;
					}// switch
					if (hbloc) {// pas deja vu
					if ((h!=i0) && (contenu[h].length>1)) {
					   if (contenu[h].split(num)[0].length<contenu[h].length) {
    						   wlocalplus[empileplus]=wlocalplus[empileplus]+colPlace[h]+" ";
							   eliminationnumero(h, num);// Rougit elimination
					   }
					}}// h!=i0
				}// i
			}// lc
    		if (wlocalplus[empileplus]==garde) {
			   wlocalplus[empileplus]="";
			}
}


function elim(i0) {
				//pipile=pipile+1;
				empile=0;
				empileplus=0;
                wlocal=new Array();
				wlocal=[];						
                wlocalplus=new Array();
				wlocalplus=[];
 			var num=contenu[i0];
			var ih = parseInt(i0/9);
			var iv=i0-9*ih;
			var icarre = carre[i0]-1;
			wscen=wscen+colPlace[i0]+" = "+num+", Elimination "+num+" dans ";
			var garde0=wscen.split(tradacrit("Résiduel "+colPlace[i0]+" = "+num))[0];
			contraintes(i0);
			var garde=wscen;
			for (var lc=0; lc<3; lc++) {// Ligne (lc=0) puis colonne (lc=1) puis carre (lc=2)
				var hbloc=true;
				for (var i=0; i<9; i++) {
					switch (lc) {
	  					case 0: // Ligne ih
							var h=i+9*ih;
							break;
	  					case 1: // Colonne iv
							var h=iv+9*i;
							break;
	  					case 2: // Carre icarre
							var h=i+6*parseInt(i/3)+18*parseInt(icarre/3)+3*icarre;
    				   		hbloc=((h-9*parseInt(h/9))!=(i0-9*parseInt(i0/9))) && (parseInt(h/9)!=parseInt(i0/9));
							break;
					}// switch
					if (hbloc) {// pas deja vu
					if ((h!=i0) && (contenu[h].length>1)) {
					   if (contenu[h].split(num)[0].length<contenu[h].length) {
    						   wscen=wscen+colPlace[h]+" ";
							   eliminationnumero(h, num);
							   var lncas=contenu[h].length;
							   var lncasref=1;
							   if (coloris) {lncasref=2}
							   if ((lncas==lncasref) && CASCADEIN) {// Elimination en casecade si case h pas deja vue
									if (!dejafait(colPlace[h])) {// Test case pas deja faite, ni cascade ni Residuel : la traiter
        										empileplus=0;
                                       			wlocalplus=[];
        										elimplus(h, num, i0);
        							}					
							   }
					   }
					}}// h!=i0
				}// i
			}// lc
				if (wscen==garde) {// Pas de cascade
				   wscen=garde0.split("dans")[0]+" : pas de chiffre "+tradacrit("à éliminer");
				} else {
    				for (var k=1; k<(empile+1); k++) {wscen=wscen+wlocal[k]}
        			scenario=wscen;
					if (CASCADEIN) {
						testsc(i0);
    				}
				}
				// fin de cette case i0 et de ses cases Residuelles induites
}

function testsc(caseprev) {// test rouge et peut enlever rouge et/ou chiffre : residuel
	for (var i=0; i<M; i++) {contenuaux[i]=contenu[i]}
	for (var i=0; i<M; i++) {
		if (contenu[i].length>1) {// Cases a plus de un chiffre
				var newi= rouge(3, i); // partie des chiffres non rouges
				if ((newi.length==1) && (newi!=" ")) {// Test un seul chiffre non rouge : verifier que cette case n'a pas deja ete traitee (dans wscen) pour la traiter
							if (!dejafait(colPlace[i])) {// Test case pas deja faite, ni cascade ni residuel : la traiter
								var exchiffre=contenu[i];
								contenu[i]=newi;
								wscen=wscen+tradacrit(" Résiduel ")//+colPlace[i]+" = "+newcont+ Elimination "+newi+" dans ";
								elim(i);// Reentrant
								if (testsolution) {return}// Depilement
								contenuaux[i]=newi;// Le contenu de la case i sans les chiffres rouges
								contenu[i]=exchiffre;
							}					
				}
		}
	}
	// Fin des cases induites
							nbrefinis=0;
								for (var i=0; i<M; i++) {
									nbrefinis=nbrefinis+contenuaux[i].length;
									if (contenuaux[i].length==0) {nbrefinis=M+1}
								}
							if (nbrefinis==M) {testsolution=true}// solution induite : depiler	
}

function dejafait(fait) {
	var j=1;	
	var listefait="";

	var scenplus=wscen;
	for (var k=1; k<empile+1; k++) {scenplus=scenplus+wlocal[k]}
	while (!(scenplus.split("ascade ")[j]===undefined)) {
		x=scenplus.split("ascade ")[j];
		var xsuite=x.substring(0,2);
		if (xsuite!="de") {listefait=listefait+xsuite+" "}
		j=j+1;
	}
	var j=1;	
	while (!(scenplus.split("ascade ")[j]===undefined)) {
		x=scenplus.split("ascade ")[j];
		var xsuite=x.substring(0,2);
		if (xsuite==fait) {return true}
		j=j+1;
	}
	listefait="";
	j=1;
	while (!(scenplus.split("siduel ")[j]===undefined)) {
		x=scenplus.split("siduel ")[j];
		var xsuite=x.substring(0,2);
		listefait=listefait+xsuite+" ";
		j=j+1;
	}
	j=1;
	while (!(scenplus.split("siduel ")[j]===undefined)) {
		x=scenplus.split("siduel ")[j];
		var xsuite=x.substring(0,2);
		if (xsuite==fait) {return true}
		j=j+1;
	}
	return false;
}
	
function derougir() {
		 //<i><b><span style='color:#FF1493; font-size:xx-large'>
		 var PREINT=PREPRINT.replace('#FF1493; font-size:xx-large', ' rgb(255, 20, 147); font-size: xx-large;');
		 var PRE=PREINT.replace(/\'/g,"\"");
		 for (var i=0; i<M; i++) {
		 	 var currSquare=SQ+colPlace[i];
			 var inn=document.getElementById(currSquare).innerHTML;			 
			 var inmodif=inn.replace(PRE, "");
			 var infinal=inmodif.replace(POSTPRINT, "");
			 do {
    			 inmodif=infinal.replace(PRE, "");
    			 infinal=inmodif.replace(POSTPRINT, "");
			 }
			 while (infinal!=inmodif);
			 if (infinal!=inn) {
			 	document.getElementById(currSquare).innerHTML=infinal;
			 }
		 }
}

function enlevechiffrerouge() {// Pour test solution, charger le tableau contenuaux debarrasse du rouge
		 var PRE=PREPRINT.replace(/\'/g,"\"");
		 for (var i=0; i<M; i++) {
		 	 contenuaux[i]=contenu[i];
			 var currSquare=SQ+colPlace[i];
			 var mm=document.getElementById(currSquare).innerHTML;			 
			 var x=mm.split(PRE)[0];
			 if (x.length<mm.length) {
				var k=1;
				do {
					var nn=mm.split(POSTPRINT)[k];
					x=x+nn.split(PRE)[0];
					k=k+1;
    			}
    			while (nn.length>PRE.length) ;
   			 	contenuaux[i]=x;
			 }// x.split
		 }// i
}

function enleverougeetchiffre() {// Comme execution de la methode precedente, et affichage correspondant
		 var nbr=new Array(9);
		 var re=/\d/g;
		 var PREINT=PREPRINT.replace('#FF1493; font-size:xx-large', ' rgb(255, 20, 147); font-size: xx-large;');
		 var PRE=PREINT.replace(/\'/g,"\"");// I.E.
		 if(navigator.appCodeName == "Mozilla") {var PRE=NPREPRINT}// Firefox
		 for (var i=0; i<M; i++) {
		 	 var currSquare=SQ+colPlace[i];
			 var inn=document.getElementById(currSquare).innerHTML;			 
			 var ln=inn.length;
			 var j=inn.split(PRE)[0].length;// Identification du premier chiffre rouge
			 if (j<ln) {
			 	var rouge=contenu[i];
				var chk=rouge.match(re);
			 	for (var jk=0; jk<chk.length; jk++) {nbr[jk]=0}
			 	var k=0;
    			while (j<ln) {
			 	 	var jj=j+PRE.length;
    			 	var insans=inn.substring(0,jj)+inn.substring(jj+1,ln);
    				nbr[k]=inn.substring(jj,jj+1);// chiffre en rouge a supprimer
					var inmodif=insans.replace(PRE,"");
    				inn=inmodif.replace(POSTPRINT,"");
					ln=inn.length;
    				j=inn.split(PRE)[0].length;// Chiffre rouge suivant				
    				k=k+1;
    			}// while
				// Affichage sans les chiffres rouges
				document.getElementById(currSquare).innerHTML=inn;
				// Tableau contenu actualise sans les chiffres rouges enleves
				coloris=false;
				for (var kk=0; kk<k; kk++) {
    				 for (var hnum=0; hnum<rouge.length; hnum++) {
        				 if (chk[hnum] ==nbr[kk]) {
						 	 eliminationnumero(i, chk[hnum]);
        					 kk=kk+1;
    					 }
    				 }// hnum
				}// kk
		 }//if
	}// i
	desaffiche();
}

function enleverougeetchiffresans() {// Comme execution de la methode precedente, et affichage correspondant
		 var nbr=new Array(9);
		 var re=/\d/g;
		 var PREINT=PREPRINT.replace('#FF1493; font-size:xx-large', ' rgb(255, 20, 147); font-size: xx-large;');
		 var PRE=PREINT.replace(/\'/g,"\"");// I.E.
		 if(navigator.appCodeName == "Mozilla") {var PRE=NPREPRINT}// Firefox
		 for (var i=0; i<M; i++) {
		 	 var currSquare=SQ+colPlace[i];
			 var inn=document.getElementById(currSquare).innerHTML;			 
			 var ln=inn.length;
			 var j=inn.split(PRE)[0].length;// Identification du premier chiffre rouge
			 if (j<ln) {
			 	var rouge=contenu[i];
				var chk=rouge.match(re);
			 	for (var jk=0; jk<chk.length; jk++) {nbr[jk]=0}
			 	var k=0;
    			while (j<ln) {
			 	 	var jj=j+PRE.length;
    			 	var insans=inn.substring(0,jj)+inn.substring(jj+1,ln);
    				nbr[k]=inn.substring(jj,jj+1);// chiffre en rouge a supprimer
					var inmodif=insans.replace(PRE,"");
    				inn=inmodif.replace(POSTPRINT,"");
					ln=inn.length;
    				j=inn.split(PRE)[0].length;// Chiffre rouge suivant				
    				k=k+1;
    			}// while
				// Affichage sans les chiffres rouges
				document.getElementById(currSquare).innerHTML=inn;
				// Tableau contenu actualise sans les chiffres rouges enleves
				coloris=false;
				for (var kk=0; kk<k; kk++) {
    				 for (var hnum=0; hnum<rouge.length; hnum++) {
        				 if (chk[hnum] ==nbr[kk]) {
						 	 eliminationnumero(i, chk[hnum]);
        					 kk=kk+1;
    					 }
    				 }// hnum
				}// kk
		 }//if
	}// i
//	desaffiche();
}

function avecrougeetchiffre() {// Comme execution de la methode precedente, et affichage correspondant
		 var nbr=new Array(9);
		 var re=/\d/g;
		 var PREINT=PREPRINT.replace('#FF1493; font-size:xx-large', ' rgb(255, 20, 147); font-size: xx-large;');
		 var PRE=PREINT.replace(/\'/g,"\"");// I.E.
		 if(navigator.appCodeName == "Mozilla") {var PRE=NPREPRINT}// Firefox
		 for (var i=0; i<M; i++) {
		 	 var currSquare=SQ+colPlace[i];
			 var inn=document.getElementById(currSquare).innerHTML;			 
			 var ln=inn.length;
			 var j=inn.split(PRE)[0].length;// Identification du premier chiffre rouge
			 if (j<ln) {
			 	var rouge=contenu[i];
				var chk=rouge.match(re);
			 	for (var jk=0; jk<chk.length; jk++) {nbr[jk]=0}
			 	var k=0;
    			while (j<ln) {
			 	 	var jj=j+PRE.length;
    			 	var insans=inn.substring(0,jj)+inn.substring(jj+1,ln);
    				nbr[k]=inn.substring(jj,jj+1);// chiffre en rouge a supprimer
					var inmodif=insans.replace(PRE,"");
    				inn=inmodif.replace(POSTPRINT,"");
					ln=inn.length;
    				j=inn.split(PRE)[0].length;// Chiffre rouge suivant				
    				k=k+1;
    			}// while
				// Affichage sans les chiffres rouges
				document.getElementById(currSquare).innerHTML=inn;
				// Tableau contenu actualise sans les chiffres rouges enleves
//				coloris=false;
				for (var kk=0; kk<k; kk++) {
    				 for (var hnum=0; hnum<rouge.length; hnum++) {
        				 if (chk[hnum] ==nbr[kk]) {
						 	 eliminationnumero(i, chk[hnum]);
        					 kk=kk+1;
    					 }
    				 }// hnum
				}// kk
		 }//if
	}// i
//	desaffiche();
}

function rouge(opt, place) {
	// 3 options pour opt :
	// 1- oter rouge et chiffre
	// 2- test tout rouge
	// 3- tester 1 chiffre 
	// 0- redondant avec affiche() qui enleve le rouge, donc pour memoire
	// place : caseresiduel
				var inn=document.getElementById(SQ + colPlace[place]).innerHTML;
        		var j=0;
        		var newcont="";
        		while(!(inn.split(NPREPRINT)[j]===undefined)) {// Test chiffre rouge de ce chiffre de la case
            		var x=inn.split(NPREPRINT)[j];// NPREPRINT isole le chiffre rouge a droite et le ou les chiffres non rouges a gauche
        			if (j==0) {newcont=x} else {newcont=newcont+x.split(POSTPRINT)[1]}// Ajout du ou des chiffres non rouges, s ils existent 
            		j=j+1;
        		}
				// newcont contient tous les chiffres non rouges !
				switch(opt) {
					case 1:// Enlever rouge et chiffre de la case
						contenu[place]=newcont;
						affiche();
						break;
					case 2:// Test si tous les chiffres de la case sont rouges
						return (newcont.length==0);
					case 3:// Test un seul chiffre non rouge residuel dans la case
						//+" code Asci "+newcont.charCodeAt(0))}
						return newcont;
					default:// Enlever le rouge de la case
						affiche();
						break;
				}
}

