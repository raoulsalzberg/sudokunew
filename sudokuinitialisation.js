	var contenuinitial="123456789", M=81, N=200, NCHAIN=80, NFAIT=500, NERR=10, MAXPARCASE=3, CONSTALS="012345678", MODIFCASE=" $";
	var NCASEARRIVEE=20, MAXITER=10, MAXTIGRE=8, MAXGRIFFE=12, CASEINITALSCHAIN="Autre";
	var NOMMETHODE="Espadon", NUMEROMETHODE=15, TAILLECHIFFRES=2, a;
	var SQ="square", ORM=33, ORMreduit=20, AUTORISEALS=true, SELECTSISELECTION=false;
	var MAXMAXILIEN=20, MAXMEDUSA=10;
	var CASCADEIN=true, REINITARCH=false, MASKAGE=-1, AIDESAISIEMANUELLE=false, FILTRAGEDESSOLUTIONS=true;
	var MODEDEVELOPPEMENT=false;
	var PREANT='<span style="', PREINSER="font-size:xx-large", PREBEGIN="<i><b>";
	var POSTAUTRE="</span>", POSTINSER='">', POSTPRINT="</span></b></i>";
	var BACKVERT="; background-color:hsla(134, 76%, 55%, 1.0)", BACKBLEU="; background-color:hsla(294, 46%, 75%, 1.0)", COULEURROUGE="color:#FF1493", COLORZERO='<span style="font-size:xx-large; color:#000000">'; 
	var BACKJAUNE="; background-color:hsla(64, 76%, 55%, 1.0)";
	var PREAUTRE=PREANT+PREINSER+POSTINSER, PRETOUTE=PREBEGIN+PREANT+PREINSER, PREPRINT=PREBEGIN+PREANT+COULEURROUGE+"; "+PREINSER+POSTINSER;
	//
	var clef='Base1', CLAVIERVIRTUEL=false, titrearchive="<b><u>Liste des archives</u></b>", niveau="Grille facile", autreniveau=1, nivred=1;
	var REDUITHYPOTHESE=false, NPREPRINT='<i><b><span style="color:#FF1493; font-size:xx-large">';
	var TITREPLUS=" Etape ", noeffect="Pas d'effet", modecreation=false, modegeneration=false, empile=0, wlocal=new Array(), empileplus, wlocalplus=new Array();
	var firstgrid=false, basculeaffiche=true, nparnumero=new Array(9), etapeini=0, NMAXNUM=4, MAXCH=24;
	var NBGENERE=0, typegrille, MAXCHIFFRESPARZONE=3, NBRECHECS=60, kritmanuel;
	var PTVIRG=";", SUBSTPTVIRG=".", NBMODIF=200, NBHYP=70, ORMUNI=20;
	var delay = 1000, secs0=5, unevariante=true, maxvarencours=0, itergen=1, iter=0, iter0=0, iter1=0, iter2=3, iter3=0, iter4="",
nbregenere=0, modeexecute=false, testsolution=false, caseselect=0, nombregrilles, titregrille, titrer, titrehypothese, titrevariante, titreecran="Ecran des Filtres, Options et Contraintes", idliste="Lolo";
	var sep=","// Separateur de saisie et de calcul
	var calculpur=true, messageglobal="", finish, calculencours, messageencours="", methodeseule="";
//	var acritalfaplus=new Array("ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨","ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â®", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â´", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹", "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§");
	var acritalfa=new Array("ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¨","ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Âª", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â®", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â´", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â»", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¹", "ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â§");
	var acritautre=new Array("&eacute;", "&egrave;", "&agrave;", "&ecirc;", "&icirc;", "&ocirc;", "&ucirc;", "&ugrave;", "&ccedil;");
	var acritnew=new Array("Ã©","Ã¨","Ã ","Ãª","Ã®","Ã´","Ã»","Ã¹","Ã§");
	var acritnewalfa=new Array("Ã©","Ã¨","Ã ","Ãª","Ã®","Ã´","Ã»","Ã¹","Ã§");
	var acrittete="Ã".substring(0,1);
	var acrit=new Array("\351", "\350", "\340", "\352", "\356", "\364", "\373", "\371", "\347");
	//
	var listecalcul="0", titreint, nombreexclu, flagexclu, flagsansgen=true, crashmanuel=false, pipile=0, reamorceaide;
	var nomsgrilles=new Array(), contenusgrilles=new Array(), archivesgrilles=new Array();
	var colPlace = new Array("A1","B1","C1","D1","E1","F1","G1","H1","I1","A2","B2","C2","D2","E2","F2","G2","H2","I2","A3","B3","C3","D3","E3","F3","G3","H3","I3","A4","B4","C4","D4","E4","F4","G4","H4","I4","A5","B5","C5","D5","E5","F5","G5","H5","I5","A6","B6","C6","D6","E6","F6","G6","H6","I6","A7","B7","C7","D7","E7","F7","G7","H7","I7","A8","B8","C8","D8","E8","F8","G8","H8","I8","A9","B9","C9","D9","E9","F9","G9","H9","I9");
	var carre = new Array(1,1,1,2,2,2,3,3,3,1,1,1,2,2,2,3,3,3,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,4,4,4,5,5,5,6,6,6,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,7,7,7,8,8,8,9,9,9,7,7,7,8,8,8,9,9,9);
	//
	var inversionchiffres=true;
	var timerID = null, timerRunning = false, secs, scenario, origin=0, origin0=0, origincrash=false, crashunicite=false, choixunicite=false, generecrash=false, nombrecrash=0, grille, choixetape=0, arret=false, variete=0, sousvariete=10, recalcul=true;
	var diagcrois=false, diagdecrois=false, diagonale=false, casesnonconsec=false, etoile=false,sudokucar=false, sudokuautre=false, extrait, flagvariante="", effechargemethode=false;
	var etapesaisie=0, etapecalcul=0, duo, coloris=false, choixauto=true, etapetermine=5000, nbrefinis, casesblanches="", echec=0, echecunicite=0, caseplus=0;
	var TraceH="", xplus, cquadruple, diag, diag0, ctriple;
	var numinter=(-1), ormg=ORM, resultateffectif, nbgen, casechoisie=0, messagefincalcul, etapefincalcul, nmx;
	var ntestforteresse=0, resultmedusa;
	var sortieinser=new Array(M);
	var ntest=0, nmet=0, nmetref=1, icur="", icurnew="",clickmethode=false, xyz=false;
	//
	var contenureserve=new Array(N); 
	var contenu = new Array(M), contenusaisie=new Array(M), contenudepart = new Array(M), contenuok = new Array(M), contenuoptimisation = new Array(M), contenuaux = new Array(M),   excont;// Petits chiffres + sauvegarde grille de saisie, sauvegarde hypotheses, grille finale ok, grille auxiliaire pour solution manuelle, nombre auxiliaire pour effacement dans case de generation
	var listescenarios = new Array(), listenm = new Array(); // Liste des scenarios des etapes successives
	var scenhyp=new Array(N), contentmemory=new Array(N), genmemory=new Array(N), chiffreexclu=new Array(M), nexclu=new Array(M);
	var numtest=0, numerr=0, listecorr=new Array(NERR), crashtext=new Array(NERR);
	var scenardetail="", wscen, wscenplus, liensfortscolor, wscenb;
	var hkforteresse=0, indiceforteresse=0, casesforteresse=new Array(N), knotforteresse=new Array(N), resultatforteresse=new Array(N);
	var ngratteciel=0, gratteciel=new Array(N), lcprevious=new Array(), hnageoire, hnageoire2, sashimi, quadruplenageoire;
	var knot=new Array(N), chiffreknot=new Array(N);
	var casedepart, chiffredepart, taillearrivee=0, indicearrivee, casearrivee=new Array(NCASEARRIVEE), minarrivee=new Array(NCASEARRIVEE), scenarrivee=new Array(NCASEARRIVEE), scenautre=new Array(NCASEARRIVEE);
	var xychain=0, Xamont;
	var chiffrexy=new Array(), lienfaible=new Array(), casexy=new Array();
	var lcencours=0, turbotchiffre, testxychain=0, chiffretrap, indextrap;
	var iautre, isoie, altersoie, haltersoie, chaltersoie=new Array(2), autrechiffre=new Array(9), casearme=new Array(2); 
	var casesmodifiees, lcce2, lcce3, chiffrecce, autrechiffrecce, lastchiffrecce, chiffreacc, chiffreaccvrai=0, indicateuracc, cce1, cce2, nombreals, caseals=new Array(), nombreals1, caseals1=new Array(),nbals2, csals2=new Array(), lcals1, lcals2, lcals3, csacc="", doublecce, biscar, tige, chiffrefirst, chiffresecond, chiffrethird;
	var hsdc1, hsdc2, hsdc3, cas123=false, ijchiffre, trouvaxe, nomissu, nombresdc1, nombresdc, nbrabxy=new Array(), casesdc=new Array(), casesdc1=new Array(),autrecasesdc=new Array(), autrecasesdc1=new Array(), autrechiffrecommun=new Array();
	var pointeurcaseals, precaseals=new Array(9), chiffreplusals=new Array(9), chiffreals, nextals=false, nnals, nnbls="begin", rpext="A", ajoutcce2=M, combi=false;
	var ALS1=new Array(), ALS2=new Array(), nALS12, nombreajout, combnombreals=contenuinitial, combcaseals=new Array();
	var B=14, C=3, NBM=2, jfin, axeduremote=0;
 	var chem=new Array(B);//  Positions des cases de boucle
 	var chemboucle=new Array(B);//  Positions des cases de boucle rangees
 	var voit=new Array(B); // Cases vues d'une case de boucle
 	var numvue=new Array(B), kvue=new Array(B); // Nombre de cases vues par position de boucle, position parmi les cases vues
	var chiffreexclu=new Array(M), valexclu=new Array(M);// Chiffres exclus dans une generation de grilles
	var indiceboucle=0, casesboucle=new Array(N);
	var clickstep=false;
	var tableauvariante=new Array(), indicemedusa=new Array();
	var mywindow;
	var numerohypothese=0;
	var grilleNameBegin, grilleencours=99, archiveNameBegin, archiveencours;
	var clefconfiguration="clefconfig", finalegal=true;
	var clickgauche=true;
	var typediscontinu=0, wscendiscontinu=new Array(), wscendiscontinubis=new Array(), compteurtypedisconntinu;
	var typecontinu=0, wscencontinu=new Array(), wscencontinubis=new Array(), compteurtypeconntinu;
	var typeinacheve=0, wsceninacheve=new Array(), wsceninachevebis=new Array(), compteurtypeinacheve;
	var XALS=true, Xsolution=true, chaineref, returnsolution=0;
	var chiffrealsaic=new Array(),  tableaualsaic=new Array(), ials=new Array();
	var larron, bloch1, bloch4, sommet1, sommet2, sommet3, sommet4;
	var indice3DMedusa;

function tradacrit(ff) {
	var result="";
	for (var n=0; n<ff.length; n++) {
		var ee=ff.substring(n, n+1);
		if (ee==acrittete) {
    		n+=1;
			ee=ff.substring(n, n+1);
			for (var i=0; i<acrit.length; i++) {
    			var y=acritnew[i];
    			if (y.substring((y.length-1), y.length)==ee) {result+=acrit[i]}
    		}
		} else {result+=ee}
	}
	return result;
}

