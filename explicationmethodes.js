function decodagecolPlace(xxlettre) {
	var vert=xxlettre.charCodeAt(0)-65;
	var hor=xxlettre.substring(1,2)-1;
	return hor*9+vert;
}

function elaborenm() {
	// origin sur 2 caracteres et num = variete
	var nm=origin+"";
	if ((nm.length==1) && (nm!="T")) {nm="0"+nm}
	if(!isNaN(nm)) {
		if ((nm==29) && (sousvariete!=10)) {nm+=variete+""+sousvariete} else {nm+=variete}
		if (origin==(ormg-1)) {nm="32"+variete}// crash unicite evitee variete 0 a 10 (et 11 a 17 ??)
		if (origin==ormg) {nm="000"+variete}// crash unicite 0 ou 1
		// origin = 0 : crash impossibilite de 0 a 4
	}
	return nm;
}
	
function explainmethods(nm) {
	if(!isNaN(nm)) {
		switch(nm) {
       		case "0000":// crash unicite variete 0 : bug+1
       			 var mess="<br><br><u>Crash par suite d\'un défaut d'unicité bug+1 n\'ayant pu être évité (voir méthode Défaut unicité évité). Le calcul s\'arrête et la grille est fausse pour défaut d\'unicité.</u><br><br>";
				 mess+="Aucune case de la grille ne contient plus de 2 chiffres (hormis le cas de la solution)";
       			 break;
       		case "0001":// crash unicite variete 1 : unicite rectangle
       			 var mess="<br><br><u>Crash par suite d\'un défaut d'unicité rectangle n\'ayant pu être évité (voir méthode Défaut unicité évité). Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).</u><br><br>";
       			 mess=mess+"Grille fausse quand 4 cases aux sommets d'un rectangle contiennent les mêmes 2 chiffres";
				 break;
       		case "000":// crash variete 0 : doublon
				var mess="";
/*       			 var mess="<br><br><u>Crash par suite d\'un doublon</u><br><br>";
       			 mess+="Grille fausse quand 2 cases contenant un seul même chiffre sont dans une même zone sudoku (même ligne ou même colonne ou même bloc)";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
*/
       			 break;
       		case "001":// crash variete 1 : chiffre manquant sur un axe ou un bloc
       			 var mess="<br><br><u>Crash par suite d\'un chiffre manquant</u><br><br>";
       			 mess=mess+"Grille fausse quand un chiffre manque dans une zone sudoku (ligne, ou colonne ou bloc)";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
       			 break;
       		case "002":// crash variete 2 : n cases pour (n-1) chiffres
       			 var mess="<br><br><u>Crash par suite d\'un ensemble de n cases ne comportant que (n-1) chiffres</u><br><br>";
       			 mess=mess+"Grille fausse quand elle comporte n cases d\'une même zone sudoku contenant les (n-1) mêmes chiffres.<br>";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
       			 break;
       		case "003":// crash variete 3 : case en solo sur 2 chiffres
				 var mess="<br><br><u>Crash par suite de 2 chiffres contenus uniquement dans une seule case d\'une zone sudoku</u><br><br>";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
       			 break;
       		case "004":// crash variete 4 : case blanche
       			 var mess="<br><br><u>Crash par suite de cases sans chiffre-candidat</u><br><br>";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
       			 break;
       		case "005":// crash variete 5 : plusieurs solutions
       			 var mess="<br><br><u>Crash par suite d'un défaut d'unicité dù à plusieurs solutions. Le calcul s\'arrête et la grille est fausse.</u><br><br>";
       			 break;
       		case "006":// crash variete 6 : rectangle
       			 var mess="<br><br><u>Crash par suite d'un défaut d'unicité rectangle.</u><br><br>";
       			 mess+="Grille fausse quand 4 cases aux sommets d'un rectangle contiennent les mêmes 2 chiffres";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
       			 break;
       		case "007":// crash variete 7 : bug+1
       			 var mess="<br><br><u>Crash par suite d'un défaut d'unicité bug+1.. Le calcul s\'arrête et la grille est fausse.</u><br><br>";
       		case "008":// crash variete 8 : évitement non corroboré
       			 var mess="<br><br><u>Crash par suite d'un défaut d'unicité pour évitement non corroboré.</u><br><br>";
				 mess+="<br><br>Le calcul continue cependant en modifiant la dernière hypothèse si elle existe; sinon, le calcul s\arrête, et la grille est correcte si une seule solution a été trouvée (sinon, la grille est fausse).<br><br>";
       			 break;
       		case "0020":// Case finale en cas de solution positive
       			 var mess="<br><br><u>Résultat</u><br>";
       			 break;
       		case "0030":// depart
       			 var mess="<br><br><u>Grille initiale</u><br>";
       			 break;
       		case "010":// petits chiffres variete 0
       			 var mess="<br><br><u>Case à un chiffre</u><br><br>";
       			 mess=mess+"Un chiffre affecté seul à une case ne peut se trouver dans aucune des autres cases des 3 zones sudoku de cette case (même ligne ou même colonne ou même bloc).";
       			 break;
       		case "011":// petits chiffres variete 1 cases non consecutives
       			 var mess="<br><br><u>Case à un chiffre</u><br><br>";
       			 mess=mess+"Un chiffre affecté seul à une case ne peut se trouver dans aucune des autres cases des 3 zones sudoku de cette case (même ligne ou même colonne ou même bloc).";
       			 mess=mess+"<br><br>Le choix de la contrainte que les cases voisines soient non consécutives, impose ce critère supplémentaire à respecter.";
       			 break;
       		case "012":// petits chiffres variete 2 diagonales principales zones sudoku
       			 var mess="<br><br><u>Case à un chiffre</u><br><br>";
       			 mess=mess+"Un chiffre affecté seul à une case ne peut se trouver dans aucune des autres cases des 3 zones sudoku de cette case (même ligne ou même colonne ou même bloc).";
       			 mess=mess+"<br><br>Le choix de la contrainte que les diagonales principales soient une zone sudoku, ajoute donc cette nouvelle zone sudoku.";
       			 break;
       		case "013":// petits chiffres variete 3 diagonales principales croissantes
       			 var mess="<br><br><u>Case à un chiffre</u><br><br>";
       			 mess=mess+"Un chiffre affecté seul à une case ne peut se trouver dans aucune des autres cases des 3 zones sudoku de cette case (même ligne ou même colonne ou même bloc).";
       			 mess=mess+"<br><br>Le choix de la contrainte que les diagonales principales soient croissantes, impose ce critère supplémentaire à respecter.";
       			 break;
       		case "014":// petits chiffres variete 4 diagonales principales decroissantes
       			 var mess="<br><br><u>Case à un chiffre</u><br><br>";
       			 mess=mess+"Un chiffre affecté seul à une case ne peut se trouver dans aucune des autres cases des 3 zones sudoku de cette case (même ligne ou même colonne ou même bloc).";
       			 mess=mess+"<br><br>Le choix de la contrainte que les diagonales principales soient décroissantes, impose ce critère supplémentaire à respecter.";
       			 break;
       		case "020":// solo variete 0 : sur ligne ou colonne ou bloc
       			 var mess="<br><br><u>Solo : un seul chiffre peut être affecté à une case</u><br><br>";
       			 mess=mess+"Si un chiffre dans une case ne se trouve dans aucune des autres cases d'une des zones sudoku de cette case (même ligne ou même colonne ou même bloc), ce chiffre est affecté à cette case.";
       			 break;
       		case "030":// jumeaux variete 0
       			 var mess="<br><br><u>Jumeaux : 2 cases se voyant et comportant les mêmes 2 chiffres</u><br><br>";
       			 mess=mess+"Lorsque 2 cases d'une même zone sudoku (ligne ou colonne ou bloc) contiennent les mêmes 2 chiffres, et eux seuls, on ne peut trouver ces 2 chiffres dans les autres cases de cette zone sudoku.";
       			 break;
       		case "040":// duo variete 0
       			 var mess="<br><br><u>Duo : même chiffre affecté en lien fort à 2 cases se voyant</u><br><br>";
       			 mess=mess+"Lorsque 2 cases contiennent un même chiffre en lien fort, c'est-à-dire que ce chiffre ne se trouve dans aucune des autres cases d'une des zones sudoku de ces 2 cases (ligne ou colonne ou bloc), ce chiffre ne peut se trouver ailleurs dans l'autre zone sudoku éventuelle de ces 2 cases.";
       			 break;
       		case "041":// duo variete 1
       			 var mess="<br><br><u>Trio : même chiffre affecté en lien fort à 3 cases sur un même axe (ligne ou colonne) et dans un même bloc</u>.<br><br>";
       			 mess=mess+"Lorsque 3 cases contiennent un même chiffre en lien fort, c'est-à-dire que ce chiffre ne se trouve dans aucune des autres cases d'une des zones sudoku de ces 3 cases (ligne ou colonne ou bloc), ce chiffre ne peut se trouver ailleurs dans l'autre zone sudoku éventuelle de ces 3 cases.";
       			 break;
       		case "050":// triples variete 0
       			 var mess="<br><br><u>Triples : 3 cases de la même zone sudoku comportent les mêmes 3 chiffres</u><br><br>";
       			 mess=mess+"Lorsque 3 cases d'une même zone sudoku (ligne ou colonne ou bloc) contiennent les mêmes 3 chiffres (2 de ces 3 chiffres ou les 3 chiffres), et eux seuls, on ne peut trouver ces 3 chiffres dans les autres cases de la même zone sudoku que ces 3 cases.";
       			 break;
       		case "060":// quadruples variete 0 
       			 var mess="<br><br><u>Quadruples : 4 cases de la même zone sudoku comportent les mêmes 4 chiffres</u><br><br>";
       			 var mess=mess+"Lorsque 4 cases d'une même zone sudoku (ligne ou colonne ou bloc) contiennent les mêmes 4 chiffres (2, 3 ou 4 de ces 4 chiffres), et eux seuls, on ne peut trouver ces 4 chiffres dans les autres cases de la même zone sudoku que ces 4 cases.";
       			 break;
       		case "070":// jumeaux isoles variete 0
       			 var mess="<br><br><u>Jumeaux isolés : 2 cases de la même zone sudoku comportent 2 chiffres ne se trouvant pas dans les autres cases de cette zone</u><br><br>";
       			 mess=mess+"Lorsque 2 cases d'une même zone sudoku (ligne ou colonne ou bloc) contiennent les mêmes 2 chiffres, et que ces 2 chiffres ne se trouvent dans aucune des autres cases de la zone sudoku, ces 2 cases ne peuvent contenir que ces 2 chiffres.";
       			 break;
       		case "080":// triples isoles variete 0
       			 var mess="<br><br><u>Triples isolés : 3 cases de la même zone sudoku comportent 3 chiffres ne se trouvant pas dans les autres cases de cette zone</u><br><br>";
       			 mess=mess+"Lorsque 3 cases d'une même zone sudoku (ligne ou colonne ou bloc) contiennent les mêmes 3 chiffres, et que ces 3 chiffres ne se trouvent dans aucune des autres cases de la zone sudoku, ces 3 cases ne peuvent contenir que ces 3 chiffres.";
       			 break;
       		case "090":// Gratte-ciel
       			 var mess="<br><br><u>Gratte-ciel (Skyscrapper)</u><br><br>";
       			 mess=mess+"Il s\'agit d\'un groupement de 4 cases, contenant le même chiffre candidat, à raison de 2 cases sur 2 axes parallèles (lignes ou colonnes).<br>";
       			 mess=mess+"Une case d\'un axe est sur le même axe perpendiculaire aux axes parallèles qu\'une case de l'autre axe.<br>";
       			 mess=mess+"Sur chaque parallèle, les cases sont en lien fort par le chiffre candidat commun.<br>";
       			 mess=mess+"Toute case voyant les 2 cases non situees sur la perpendiculaire, ne peut contenir le chiffre-candidat commun.<br><br>"; 
       			 mess=mess+"Le gratte-ciel est un cas particulier de la méthode turbot-fish";
       			 break;
       		case "100":// boucle variete 0 : Remote Pair
       			 var mess="<br><br><u>Boucle paire (Remote Pair)</u><br><br>";
       			 mess=mess=mess+"Boucle de cases avec les mêmes 2 chiffres, se voyant successivement, en nombre pair (donc avec un nombre impair de liens).<br><br>";
       			 mess=mess+"Aucune case voyant les 2 extrémités de cette chaîne ne peut contenir les 2 chiffres de la boucle.";
       			 break;
       		case "101":// boucle variete 1 : Remote Pair -1
       			 var mess="<br><br><u>Boucle impaire (Remote Pair-1)</u><br><br>";
       			 mess=mess+"Boucle de cases avec les mêmes 2 chiffres, se voyant successivement, en nombre impair (donc avec un nombre pair de liens).<br><br>";
       			 mess=mess+"Soit une zone sudoku, constituée d\'un axe horizontal ou vertical, croisant un bloc contenant une extrémité de la chaîne.<br><br>";
				 mess=mess+"Une premiere partie de cette zone est constituée de cases voyant des cases de la boucle de numero impair (dont obligatoirement l'autre extrémité de la boucle), et contenant un ou les deux chiffres de la boucle.<br><br>";
				 mess=mess+"Parmi ces cases se trouvent celles au croisement de l\'axe et du bloc, contenant une extrémité de la chaîne.<br><br>";
				 mess=mess+"Une deuxième partie de cet axe sont les cases ayant un seul chiffre affecté. Ce chiffre affecté ne peut faire partie des chiffres de la chaîne.<br><br>";
				 mess=mess+"Une troisième partie de cet axe est constituée des autres cases.<br><br>"; 
       			 mess=mess+"S'il reste, parmi les cases de cette troisième partie,  une case et une seule, qui contienne au moins un des 2 chiffres de la boucle. ";
       			 mess=mess+"Alors cette dernière case doit obligatoirement contenir ce ou ces deux chiffres de la boucle uniquement. On peut donc éliminer les autres chiffres de cette case.";
       			 break;
       		case "110":// L'attaque du cobra variete 0 
       			 var mess="<br><br><u>L'attaque du cobra</u><br><br>";
       			 mess=mess+"Cela concerne 2 rangées de cases distinctes (chaque rangée est dans une même zone sudoku : ligne ou colonne ou bloc). Chaque rangée contient un chiffre de plus que de cases (ALS = Almost Locked Set).<br><br>";
       			 mess=mess+"Ces 2 rangées partagent 2 types de chiffres : un chiffre commun exclusif, dit CCE, reliant 2 cases, une et une seule de chaque rangée, ces 2 cases partageant une même zone sudoku (ligne ou colonne ou bloc).<br><br>";
       			 mess=mess+"Ces 2 rangées partagent également un autre chiffre commun, dit ACC, non exclusif. Les cases contenant le chiffre ACC ne sont pas nécessairement dans une même zone sudoku.<br><br>";
       			 mess=mess+"Ce chiffre ACC peut être supprimé de toute case extérieure aux 2 rangées et voyant l'ensemble des cases des 2 rangées contenant cet ACC.";
				 mess+="<br><br>Si le chiffre ACC n'existe qu'une seule fois dans chaque ALS, et que les 2 cases concernées se voient, il s'agit d'un double CCE.<br>"
				 mess+="Dans ce cas, de nombreuses autres suppressions de chiffres-candidats supplémentaires deviennent effectives ;<br>";
				 mess+="- Toutes les cases de la zone sudoku des CCE ne peuvent contenir le chiffre CCE<br>";
				 mess+="- Toutes les cases de la zone sudoku des ACC ne peuvent contenir le chiffre ACC<br>";
				 mess+="- Dans chaque ALS, les chiffres contenus dans les cases de l'ALS sont exclusifs et ne peuvent être contenus dans les autres cases de leur zone sudoku<br>";
				 mess+="- De plus, dans chaque ALS, les cases concernées par un chiffre, si elle sont alignées, sont également exclusives dans cette autre zone sudoku";
       			 break;
       		case "120":// Sue de coq variete 0 : 2 cases et 4 chiffres de l'intersection entre l'arme et la soie et une case extérieure dans l'arme et une case extérieure dans la soie
       			 var mess="<br><br><u>Sue de Coq avec intersection à 2 ou 3 cases (variété 0)</u><br><br>";
       			 mess+="Intersection entre un axe : ligne ou colonne (l\'arme) et un bloc (la soie).<br><br>";
				 mess+="Les cases de l'arme et les cases de la soie constituent un groupe fermé avec l'intersection, par les chiffres de l'arme et les chiffres de la soie.<br><br>"
       			 mess+="2 cases et 4 chiffres de l'intersection entre l'arme et la soie et une case extérieure dans l'arme et une case extérieure dans la soie.<br><br>"
				 mess=mess+"Suppression d\'au moins 2 chiffres de l\'intersection dans des cases de l\'arme et d\'au moins 2 autres chiffres de l\'intersection dans des cases de la soie.<br><br>";
       			 mess=mess+"Suppression de chiffres supplémentaires possibles : soit dans l\'intersection, soit dans l\'arme, soit dans la soie, s\'ils se retrouvent seuls avec les autres.<br>";
       			 break;
       		case "121":// Sue de coq variete 1 : 3 cases et 4 chiffres de l'intersection entre l'arme et la soie et une case exterieure dans l'arme et une case exterieure dans la soie
       			 var mess="<br><br><u>Sue de Coq avec intersection à 2 ou 3 cases (variété 1)</u><br><br>";
       			 mess=mess+"Intersection de 2 ou 3 cases entre un axe : ligne ou colonne (l\'arme) et un bloc (la soie).<br><br>"
				 mess+="Les cases de l'arme et les cases de la soie constituent un groupe fermé avec l'intersection, par les chiffres de l'arme et les chiffres de la soie.<br><br>"
       			 mess+="3 cases et 4 chiffres de l'intersection entre l'arme et la soie et une case exterieure dans l'arme et une case exterieure dans la soie.<br><br>"
				 mess=mess+"Suppression d\'au moins 2 chiffres de l\'intersection dans des cases de l\'arme et d\'au moins 2 autres chiffres de l\'intersection dans des cases de la soie.<br><br>"
       			 mess=mess+"Suppression de chiffres supplémentaires possible : soit dans l\'intersection, soit dans l\'arme, soit dans la soie, s\'ils se retrouvent seuls avec les autres.<br>";
       			 break;
       		case "130":// W-Wing  (l'aile de l'aigle) variete 0
       			 var mess="<br><br><u>L\'aile de l\'aigle (W-Wing)</u><br><br>";
       			 var mess=mess+"2 cases ayant les mêmes 2 chiffres ont un lien indirect sur l\'un de ces chiffres, via 2 autres cases reliées en lien fort sur ce chiffre.";
       			 mess=mess+"<br><br>Suppression du 2<sup>ème</sup> chiffre de ces 2 cases, dans toute case voyant ces 2 cases.<br>"
       			 break;
       		case "140":// Rectangle vide variete 0
       			 var mess="<br><br><u>Rectangle vide</u><br><br>";
       			 mess=mess+"Il s\'agit d\'un ensemble de cases contenant un seul chiffre candidat : un bloc et 2 cases extérieures à ce bloc reliées en lien fort.<br><br>";
       			 mess=mess+"L\'une des cases en lien fort voit une partie des cases du bloc, contenant le chiffre candidat.<br><br>";
       			 mess=mess+"L\'autre case en lien fort voit une case extérieure contenant le chiffre candidat, laquelle case extérieure voit également des cases du bloc, contenant le chiffre candidat.<br><br>";
       			 mess=mess+"Les cases vues du bloc, soit par la case en lien fort, soit par la case extérieure, saturent le bloc, c\'est-à-dire qu\'il n\'existe pas d\'autre case du bloc contenant le chiffre candidat.<br><br>";
       			 mess=mess+"Cette case extérieure ne peut donc contenir le chiffre candidat."
       			 break;
       		case "150":// Cerf-volant variete 0
       			 var mess="<br><br><u>Cerf volant</u><br><br>";
       			 mess=mess+"2 cases d\'un même bloc contiennent le même chiffre, chacune reliée en lien fort par ce chiffre, l\'une sur sa ligne, l\'autre sur sa colonne, à 2 cases hors du bloc.<br><br>";
       			 mess=mess+"Toute case voyant ces 2 cases hors du bloc ne peut contenir le chiffre.";
       			 break;
       		case "160":// turbot fish variete 0
       			 var mess="<br><br><u>Turbot fish</u><br><br>";
       			 mess=mess+"Il existe une chaîne de cases en nombre pair contenant le même chiffre, alternant un lien fort puis un lien faible, toute case voyant les extrémités de la chaîne ne peut contenir ce chiffre.<br><br>"; 
       			 mess=mess+"Un lien fort entre 2 cases pour un chiffre existe si aucune autre case d'une zone sudoku commune (ligne ou colonne ou bloc) reliant ces 2 cases, ne contient ce chiffre commun.<br><br>";
       			 break;
       		case "170":// X-Chain variete 0
				 var mess="<br><br><u>X-Chain (Color-Trap)</u><br><br>";
				 mess=mess+"Chaîne de cases reliées en lien fort par le même chiffre.<br><br>";
				 mess+="Les cases de la chaine alternent deux couleurs différentes.<br><br>";
				 mess=mess+"Si les cases extrêmes de la chaîne ne sont pas dans la même zone sudoku (ligne ou colonne ou bloc) et sont de couleur différente, ";
				 mess=mess+"toute case voyant ces cases extrêmes ne peut contenir ce chiffre.<br><br>";
				 break;
       		case "171":// X-Chain variete 1
				 var mess="<br><br><u>X-Chain (Color-Cycle ou X-Cycle) en liens forts</u><br><br>";
				 mess=mess+"Boucle de cases reliées en lien fort par le même chiffre.<br><br>";
				 mess+="Les cases de la chaine alternent deux couleurs différentes.<br><br>";
				 mess=mess+"Les cases extrêmes de la boucle sont dans la même zone sudoku (ligne ou colonne ou bloc) et sont de couleur différente.<br><br>";
				 mess=mess+"Si ces cases extrêmes sont en lien faible, elles deviennent comme en lien fort.<br><br>";
				 mess=mess+"Toute case voyant les cases extrêmes (dans la même zone sudoku) ne peut contenir ce chiffre.<br><br>";
				 break;
       		case "172":// X-Chain variete 2
				 var mess="<br><br><u>X-Chain (Color-Cycle ou X-Cycle) en liens alternés</u><br><br>";
				 mess=mess+"Boucle de cases reliées par le même chiffre.<br><br>";
				 mess+="Les cases de la chaine alternent deux couleurs différentes.<br><br>";
				 mess=mess+"Les cases extrêmes de la boucle sont dans la même zone sudoku (ligne ou colonne ou bloc) et sont de couleur différente.<br><br>";
				 mess=mess+"Si la case finale et la case de départ sont en lien fort, le chiffre est valide dans la case de départ et éliminé dans les cases adjacentes de la boucle.<br><br>";
				 mess=mess+"Si la case finale et la case de départ sont en lien faible, elles sont considérées en lien fort ce qui élimine toutes les autres cases de leur zone sudoku.";
				 break;
       		case "173":// X-Chain variete 3
				 var mess="<br><br><u>X-Chain (Color Wrap) en liens forts</u><br><br>";
				 mess=mess+"Chaîne de cases reliées en liens forts par le même chiffre.<br><br>";
				 mess+="Les cases de la chaine alternent deux couleurs différentes.<br><br>";
				 mess=mess+"Si les cases extrêmes de la chaîne sont dans la même zone sudoku (ligne ou colonne ou bloc) et sont de même couleur, ";
				 mess=mess+"la couleur des cases extrêmes n\'est pas bonne, et le chiffre peut être éliminé de toutes les cases de la chaîne de cette couleur.<br>";
				 mess=mess+"A contrario, le chiffre est affecté à toutes les cases de la chaîne de l\'autre couleur.";   
				 break;
       		case "174":// X-Chain variete 4
				 var mess="<br><br><u>X-Chain (Color Wrap) en liens alternés</u><br><br>";
				 mess=mess+"Boucle de cases reliées en lien fort par le même chiffre.<br><br>";
				 mess+="Les cases de la chaine alternent deux couleurs différentes.<br><br>";
				 mess=mess+"Si les cases extrêmes de la chaîne sont dans la même zone sudoku (ligne ou colonne ou bloc) et sont de même couleur, ";
				 mess=mess+"la couleur des cases extrêmes n\'est pas bonne, et le chiffre peut être éliminé de toutes les cases de la chaîne de cette couleur.<br>";
				 mess=mess+"A contrario, le chiffre est affecté à toutes les cases de la chaîne de l\'autre couleur.";   
				 break;
       		case "175":// X-Chain variete 5
				 var mess="<br><br><u>X-Chain (Color-Trap)</u><br><br>";
				 mess=mess+"Chaîne de cases reliées en liens alternés fort - faible par le même chiffre.<br><br>";
				 mess+="Les cases de la chaine alternent deux couleurs différentes.<br><br>";
				 mess=mess+"Si les cases extrêmes de la chaîne ne sont pas dans la même zone sudoku (ligne ou colonne ou bloc) et sont de couleur différente, ";
				 mess=mess+"toute case voyant ces cases extrêmes ne peut contenir ce chiffre.<br><br>";
				 break;
       		case "180":// XY-Wing variete 0
       			 var mess="<br><br><u>L'aigle et sa proie (XY-Wing)</u><br><br>";
       			 mess=mess+"Cette technique utilise trois cases, chacune ayant exactement deux candidats. La case du centre est appelée l'aigle, et les 2 autres les serres.<br><br>";
       			 mess=mess+"L'aigle voit chacune des deux serres, c'est-à-dire qu'il appartient à une même zone sudoku (ligne, colonne ou bloc).<br><br>";
       			 mess=mess+"Chaque serre contient l'un des 2 candidats de l'aigle (différent pour chaque serre), ainsi qu'un candidat commun aux deux serres.<br><br>";
       			 mess=mess+"Toute case qui voit les deux serres ne pourra contenir le candidat commun à ces deux serres.";
       			 break;
       		case "181":// XYZ-Wing variete 1
       			 var mess="<br><br><u>L'aigle et sa proie (XYZ-Wing)</u><br><br>";
       			 mess=mess+"Cette technique utilise trois cases. La case du centre, qui contient 3 candidats, est appelée l'aigle et les 2 autres, appelées les serres, contiennent chacune 2 candidats.<br><br>";
       			 mess=mess+"L'aigle voit chacune des deux serres, c'est-à-dire qu'il appartient à une même zone sudoku (ligne, colonne ou bloc).<br><br>";
       			 mess=mess+"Chaque serre contient l'un des 3 candidats de l'aigle (différent pour chaque serre), ainsi qu'un candidat commun aux deux serres, également troisieme candidat de l'aigle.<br><br>";
       			 mess=mess+"Toute case qui voit les deux serres et l'aigle ne pourra contenir le candidat commun à ces deux serres.";
       			 break;
       		case "190":// Swordfish variete 0 : cas de base
       			 var mess="<br><u>Swordfish (L\'espadon)</u><br><br>";
       			 mess=mess+"3 rangées de 2 ou 3 cases (toutes verticales ou toutes horizontales) sont reliées en lien exclusif sur le même chiffre.<br>";  
       			 mess=mess+"<br>Le chiffre en question doit appartenir à cet ensemble fermé.<br><br>";
       			 mess=mess+"Donc suppression de ce chiffre dans toutes les autres cases sur les axes transverses ou perpendiculaires de ces cases (tous horizontaux ou tous verticaux).";
       			 break;
       		case "191":// Swordfish variete 1 : Finned swordfish
       			 var mess="<br><u>Finned Swordfish (L\'espadon avec ajout d\'une ou deux cases, appelées nageoires)</u><br><br>";
       			 mess=mess+"2 rangées de 2 ou 3 cases, et une 3<sup>ème</sup> rangée jusqu\'à 5 cases (toutes verticales ou toutes horizontales) sont reliées en lien exclusif sur le même chiffre.<br><br>";
				 mess=mess+"Il existe une ou deux cases supplémentaires sur une des rangées, et dans le même bloc, appelées nageoires (ou fin en anglais), qui viennent polluer l\'espadon.<br><br>";
       			 mess=mess+"Ces 2 cases, dites finned, sont situées dans le même bloc qu\'une des cases de l\'espadon standard, sur la rangée de cette case. ";
				 mess=mess+"Dans le bloc des nageoires, on peut supprimer le chiffre dans les cases adjacentes de la case faisant partie de l\'espadon, différentes des nageoires.<br><br>";
				 mess=mess+"Attention : ces cases ne peuvent faire partie des cases de l\'espadon.<br><br>";
       			 break;
       		case "192":// Swordfish variete 2 : Sashimi swordfish
       			 var mess="<br><u>Sashimi Swordfish (L\'espadon avec une case manquante, et ajout éventuel d\'une ou 2 cases appelées nageoires)</u><br><br>";
       			 mess=mess+"2 rangées de 2 ou 3 cases, et une 3<sup>ème</sup> rangée jusqu\'à 4 cases  (toutes verticales ou toutes horizontales) sont reliées en lien exclusif sur le même chiffre.<br><br>";
				 mess=mess+"Il manque une case (ou trou) sur une des rangées pour que cet espadon soit complet.<br><br>";
				 mess=mess+"Dans le bloc de ce trou, il existe une ou deux cases supplémentaires sur la rangée, appelées nageoires (ou fin en anglais), autour du trou.<br><br>";
				 mess=mess+"Dans ce bloc des nageoires, on peut supprimer le chiffre dans les cases adjacentes du trou, différentes des nageoires.<br><br>";
				 mess=mess+"Attention : ces cases ne peuvent faire partie des cases de l\'espadon.<br><br>";
				 mess=mess+"Avec une nageoire, c\'est un Finned Sashimi Swordfish. ";
				 mess=mess+"Avec deux nageoires, c\'est un Finned Sashimi Double Swordfish.<br><br>";
  				 mess=mess+"Il existe encore une variété avec 4 nageoires, dénommée  Sashimi quadruple Finned Swordfish, avec 2 trous dans un bloc, encadrés par les 4 nageoires, toutes faisant parties de deux rangées de l\'espadon, 2 par 2. ";
				 mess=mess+"Pour ce Sashimi quadruple, on peut supprimer le chiffre dans la case du bloc au centre des 4 nageoires.<br><br>";
       			 break;
       		case "193":// Swordfish variete 3 : Franken ou Kraken  swordfish
       			 var mess="<br><u>Franken ou Kraken Swordfish (L\'espadon avec un bloc remplacant la 3<sup>ème</sup> rangée du Swordfish standard)</u><br><br>";
       			 mess=mess+"2 rangées de 2 ou 3 cases contenant le chiffre exclusivement (verticales ou horizontales), et un bloc, avec sur 2 de ses rangées jusqu\'à 6 cases du Swordfish, sont reliées en lien exclusif sur le même chiffre.<br><br>";
       			 mess=mess+"2 axes transverses passant par 2 des cases de ces 2 rangées, coupent le bloc.<br><br>"
				 mess=mess+"Aucune case de la 3<sup>ème</sup> rangée du bloc Franken, non alignée sur les autres cases du Swordfish, ne doit contenir le chiffre.<br><br>";
				 mess=mess+"On peut supprimer le chiffre dans toutes les cases transversales au Swordfish, qui ne font pas partie du Swordfish (ni sur les 2 rangées, ni dans le bloc Franken).<br><br>";
				 mess=mess+"Cela peut concerner jusqu\'à 15 cases !<br><br>";
				 mess=mess+"Dans une des 2 rangées du Swordfish (qui peuvent couper le bloc Franken), il peut exister une case supplémentaire contenant le chiffre (4<sup>ème</sup> case de cette rangée), appelée nageoire, sur le même axe que la 3<sup>ème</sup> rangée du bloc. ";
				 mess=mess+"Dans ce cas, c\'est un Finned Franken Swordfish. ";
				 mess=mess+"On peut alors supprimer le chiffre dans les cases, uniquement dans le bloc de la nageoire, qui ne sont pas sur le Swordfish et qui ne sont pas alignées sur la 3<sup>ème</sup> rangée du bloc Franken Swordfish.<br><br>";
       			 break;
       		case "200":// Forteresse maxilien variete 0
       			 var mess="<br><br><u>La forteresse Maxilien</u><br><br>";
       			 mess=mess+"Chaîne fermée de cases, contenant chacune 2 chiffres, avec alternance de chiffres dans cette chaîne.<br><br>";
       			 mess=mess+"De ce fait, chaque chiffre d\'un lien de la chaîne est nécessairement dans l\'une des 2 cases entourant ce chiffre, comme s\'il s\'agissait d\'un lien fort.<br><br>";
       			 mess=mess+"Tous les liens faibles de la chaîne sont donc considérés comme des liens forts.<br><br>";
       			 mess=mess+"Un renfort par 2 cases en lien fort peut rétablir la continuité de la chaîne si ces 2 cases voient 2 cases de la chaîne qui, elles, ne se voient pas. Il s\'agit d\'un renfort d\'une chaîne éclatée.<br>";
       			 mess=mess+"<br>Remarques :<br><br>";
       			 mess=mess+"<br>- Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).<br<";
       			 mess=mess+"<br>- Un lien illustré par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible."
       			 break;
       		case "201":// Forteresse maxilien variete 1
       			 var mess="<br><br><u>La forteresse Maxilien</u><br><br>";
       			 mess=mess+"Chaîne ouverte de cases, contenant chacune 2 chiffres, avec alternance de chiffres dans cette chaîne.<br><br>";
       			 mess=mess+"Les cases extrêmes de la chaîne ont un chiffre commun qui n'est pas dans la chaîne.<br><br>";
       			 mess=mess+"Toute case voyant ces cases extrêmes ne peut contenir ce chiffre commun.<br><br>";
       			 mess=mess+"Un renfort par 2 cases en lien fort peut rétablir la continuité de la chaîne si ces 2 cases voient 2 cases de la chaîne qui, elles, ne se voient pas. Il s\'agit d\'un renfort d\'une chaîne éclatée.<br>";
       			 mess=mess+"<br>Remarques :<br><br>";
       			 mess=mess+"<br>- Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).<br<";
       			 mess=mess+"<br>- Un lien illustré par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible."
       			 break;
       		case "210":// X-Wing variete 0 : cas de base
       			 var mess="<br><br><u>X-Wing</u><br><br>";
				 mess=mess+"Un même chiffre se trouve dans 4 cases aux sommets d'un rectangle.<br><br>";
				 mess=mess+"Sur 2 des lignes parallèles de ce rectangle, les 2 cases sont reliées en lien fort.<br>";
				 mess=mess+"<br>Dans ces conditions, sur les 2 autres parallèles de ce rectangle, les 2 cases sont aussi reliées en lien fort, ce qui élimine le chiffre des autres cases de ces 2 autres axes.";
       			 break;
       		case "211":// X-Wing variete 1 : finned
       			 var mess="<br><br><u>X-Wing Finned</u><br><br>";
				 mess=mess+"Un même chiffre se trouve dans 4 cases aux sommets d'un rectangle.<br><br>";
				 mess=mess+"Sur 2 des lignes parallèles de ce rectangle, les 2 cases sont reliées en lien fort.<br><br>";
				 mess=mess+"Mais une 5<sup>ème</sup> case contient ce chiffre, sur l\'une des branches parallèles du rectangle, polluant le lien fort, donc le X-Wing potentiel.<br><br>";
				 mess=mess+"Si cette 5<sup>ème</sup> case se trouve aussi dans le bloc d\'une case du rectangle, c\'est ce que l\'on appelle une nageoire (Fin en anglais.<br><br>";
				 mess=mess+"Dans ces conditions, les cases du bloc entourant cette case du rectangle ne peuvent contenir le chiffre.<br><br>"; 
				 mess=mess+"<br>Dans ces conditions, sur les 2 autres parallèles de ce rectangle, les 2 cases sont aussi reliées en lien fort, ce qui élimine le chiffre des autres cases de ces 2 autres axes.";
       			 break;
       		case "212":// X-Wing variete 2 : Sashimi
       			 var mess="<br><br><u>X-Wing Sashimi</u><br><br>";
				 mess=mess+"Un même chiffre se trouve dans 3 cases aux sommets d'un rectangle, le 4<sup>ème</sup> sommet du rectangle étant vide.<br><br>";
				 mess=mess+"Mais une 4<sup>ème</sup> case existe, dans le bloc de ce sommet manquant, sur l\'une des parallèles du rectangle.<br><br>";
				 mess=mess+"Dans ces conditions, le chiffre peut être supprimé des cases de ce bloc, sur la branche du rectangle perpendiculaire à cette parallèle et contenant le trou de la 4<sup>ème</sup> case manquante du X-Wing.<br><br>";
				 mess=mess+"Mais aussi sur la branche du rectangle perpendiculaire à cette parallèle et contenant la 4<sup>ème</sup> case, et dans le bloc de la 1ère case du rectangle.<br><br>";
       			 break;
       		case "213":// X-Wing variete 3 : sashimi double finned
       			 var mess="<br><br><u>X-Wing sashimi double finned</u><br><br>";
				 mess=mess+"Un même chiffre se trouve dans 3 cases aux sommets d'un rectangle, le 4<sup>ème</sup> sommet du rectangle étant vide.<br><br>";
				 mess=mess+"Une 4<sup>ème</sup> case existe, dans le bloc de ce sommet manquant, sur l\'une des parallèles du rectangle.<br><br>";
				 mess=mess+"Il existe aussi une 5<sup>ème</sup> case, dans le bloc du trou, sur la 4<sup>ème</sup> branche du rectangle, complétant le trou et la 4<sup>ème</sup> case.<br><br>"; 
				 mess=mess+"Il s\'agit d\'un Double Finned X-Wing Sashimi.<br><br>"; 
				 mess=mess+"Les cases autour du trou, dans le bloc du trou, sur la perpendiculaire à la 4<sup>ème</sup> branche du rectangle, ne peuvent contenir le chiffre.<br><br>"; 
       			 break;
       		case "214":// X-Wing variete 4 : franken
       			 var mess="<br><br><u>X-Wing franken</u><br><br>";
				 mess=mess+"Un même chiffre se trouve dans 2 cases en lien fort d\'un axe (ligne ou colonne) et dans 2 cases en lien fort d\'un bloc.<br><br>";
				 mess=mess+"Une des cases de l\'axe est en lien fort avec une des cases du bloc.<br><br>";
				 mess=mess+"Toute case voyant les 2 autres cases ne peut contenir le chiffre.";
       			 break;
       		case "215":// X-Wing variete 5 : finned franken
       			 var mess="<br><br>X-Wing Finned Franken<br><br>";
				 mess=mess+"Un même chiffre se trouve dans 2 cases en lien fort d\'un axe (ligne ou colonne) et dans 3 ou 4 cases d\'un bloc.<br><br>";
				 mess=mess+"Une des cases de l\'axe est en lien fort avec 3 des cases du bloc.<br><br>";
				 mess=mess+"Toute case voyant l\'autre case de l\'axe et la case non vue du bloc ne peut contenir le chiffre.";
       			 break;
       		case "220":// XY-Chain (Griffe du tigre) variete 0
       			 var mess="<br><br><u>Griffe du tigre (ou XY-Chain)</u><br><br>";
       			 mess=mess+"Il s\'agit d\'une chaîne de cases à 2 chiffres, avec alternance de chiffre.<br>Si les cases extrêmes ont un chiffre commun, toute case voyant ces cases extrêmes ne pourra contenir ce chiffre commun.<br><br>";
       			 mess=mess+"Des cases de la chaîne peuvent contenir 3 chiffres sans rompre la chaîne (théorie du raccord), si le 3<sup>ème</sup> chiffre de la case se trouve en sortie d\'une case précédente de la chaîne, et que cette case est vue par la case à 3 chiffres (raccord sur case de la chaîne);<br><br>";
       			 mess=mess+"ou si une case extérieure à la chaîne à 2 chiffres, voyant la case à 3 chiffres, contient ce 3<sup>ème</sup> chiffre et un chiffre de sortie d\'une case précédente de la chaîne, également vue par cette case extérieure (raccord sur case extérieure à la chaîne).<br><br>";
       			 mess=mess+"Une case de la chaîne assurant la liaison par le même chiffre, entre une case amont et un lien fort vers une case aval, peut contenir plus de 2 chiffres, sans rompre la chaîne (lien indirect).<br><br>"
       			 mess=mess+"<br><br><u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li></ul>"
       			 break;
       		case "230":// AIC Chain (Approche du tigre) variete 0 : boucle continue
       			 var mess="<br><br><br><u>Approche du tigre en boucle fermée continue</u>.<br><br>";
       			 mess=mess+"Il s\'agit d\'une chaîne fermée continue de cases avec une alternance de chiffres (AIC = Alternate Inference Chain).<br>";
       			 mess=mess+"La chaîne est fermée car elle revient à son point de départ. Elle est continue car elle peut tourner en boucle indéfiniment.<br>";
       			 mess=mess+"Les cases de la chaîne entourées de liens forts, ne peuvent contenir que les 2 chiffres candidats les entourant.<br>";
       			 mess=mess+"Les chiffres candidats reliant en lien faible 2 cases de la chaîne, sont contenus dans une des cases les entourant, et peuvent donc être supprimés de toutes les cases voyant les 2 cases entourant ce chiffre candidat. Ce lien faible est devenu un lien fort.<br>";
       			 mess=mess+"L\'information est transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.<br><br>";
       			 mess=mess+"La forme principale de maintien de la continuité est la suivante :";
       			 mess=mess+"<ul><li>Si une case de la chaîne est entourée de liens de type différent (faible suivi de fort ou fort suivi de faible), les chiffres candidats autour de cette case doivent être les mêmes.</li>";
       			 mess=mess+"<li>Si une case de la chaîne est entourée de liens de même type (fort suivi de fort ou faible suivi de faible), les chiffres candidats autour de cette case doivent être différents.</li>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li>";
       			 mess=mess+"<li>Mais ce maintien de la continuité, s\'il est rompu, peut être rétabli sous les 2 formes suivantes :</li>";
       			 mess=mess+"<ul><li>Si un lien faible est non valide et si ce lien peut être rendu fort par un groupement de cases (ou node), alors ce groupement de cases rend la liaison valide.</li>";
       			 mess=mess+"<li>Si un lien fort est non valide, alors que si ce lien était faible, la liaison deviendrait valide, alors ce lien fort peut être requalifié en lien faible.</li></ul>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li></ul>";
       			 mess=mess+"<br><br><u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li>"
       			 mess=mess+"<li>Groupement de cases dans une chaîne : 2 ou 3 cases sont regroupées et considérées comme une seule case si elles sont en lien fort par un chiffre, vues toutes les 2 ou 3 par le lien amont avec ce chiffre, et vues également par le lien aval avec ce même chiffre.</li>";
       			 mess+="<li>Insertion dans la chaîne d'ensembles als (Almost Locked Set) issus de la technique dite de l\'attaque du cobra (combinaison dite als-aic) : leur validation consiste à ce que au moins une des cases entourant chacun de ces ensembles als ne contient pas son chiffre de liaison.</li></ul>"; 
				 mess+="<u>Quelques interdictions sur les groupements</u> :<br>";
				 mess+="<ul><li>Pas de groupement sur la case de départ.</li>";
				 mess+="<li>Les cases d'un groupement doivent être dans un même bloc et alignées.</li>";
				 mess+="<li>La case de sortie d'une case avec groupement doit voir toutes les cases du groupement.</li>";
				 mess+="<li>Il existe des solutions spéciales dites particulières.</li>";
				 mess+="<li>Une case avec groupement ne peut être dans la même zone sudoku que ses cases amont et aval.</li>";
       			 mess+="<li>Pour éviter les solutions redondantes, la case de départ a une position inférieure à la case finale de la chaîne. Les cases sont numérotées à partir du coin en haut et à gauche de la grille</li></ul>"
				 break;
       		case "231":// AIC Chain (Approche du tigre) variete 1 : boucle discontinue
       			 var mess="<br><br><u>Approche du tigre en boucle fermée discontinue</u>.<br><br>";
       			 mess=mess+"Il s\'agit d\'une chaîne de cases avec une alternance de chiffres (AIC = Alternate Inference Chain).<br>";
       			 mess=mess+"La chaîne est fermée car elle revient à son point de départ. Elle est discontinue si un défaut d'alternance et un seul se produit dans la chaîne.<br>";
       			 mess=mess+"Autour de ce défaut d\'alternance, la règle est la suivante : s\'il s\'agit de deux liens faibles sur un même candidat autour de la case, ce candidat peut être supprimé de la case, et s\'il s\'agit de deux liens forts, ce candidat est validé pour la case.<br>"; 
       			 mess=mess+"Ce défaut d\'alternance apparaît sur la case de départ (qui est la case d\'arrivée).<br>";
       			 mess=mess+"Sinon, l\'information est transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.<br>";
       			 mess=mess+"La forme principale de maintien de la continuité est la suivante :";
       			 mess=mess+"<ul><li>Si une case de la chaîne est entourée de liens de type différent (faible suivi de fort ou fort suivi de faible), les chiffres candidats autour de cette case doivent être les mêmes.</li>";
       			 mess=mess+"<li>Si une case de la chaîne est entourée de liens de même type (fort suivi de fort ou faible suivi de faible), les chiffres candidats autour de cette case doivent être différents.</li>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li>";
       			 mess=mess+"<li>Mais ce maintien de la continuité, s\'il est rompu, peut être rétabli sous les 2 formes suivantes :</li>";
       			 mess=mess+"<ul><li>Si un lien faible est non valide et si ce lien peut être rendu fort par un groupement de cases (ou node), alors ce groupement de cases rend la liaison valide.</li>";
       			 mess=mess+"<li>Si un lien fort est non valide, alors que si ce lien était faible, la liaison deviendrait valide, alors ce lien fort peut être requalifié en lien faible.</li></ul>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li></ul>";
       			 mess=mess+"<u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li>"
       			 mess=mess+"<li>Groupement de cases dans une chaîne : 2 ou 3 cases sont regroupées et considérées comme une seule case si elles sont en lien fort par un chiffre, vues toutes les 2 ou 3 par le lien amont avec ce chiffre, et vues également par le lien aval avec ce même chiffre.</li>";
       			 mess+="<li>Insertion dans la chaîne d'ensembles als (Almost Locked Set) issus de la technique dite de l\'attaque du cobra (combinaison dite als-aic) : leur validation consiste à ce que au moins une des cases entourant chacun de ces ensembles als ne contient pas son chiffre de liaison.</li></ul>"; 
				 mess+="<u>Quelques interdictions sur les groupements</u> :<br>";
				 mess+="<ul><li>Pas de groupement sur la case de départ.</li>";
				 mess+="<li>Les cases d'un groupement doivent être dans un même bloc et alignées.</li>";
				 mess+="<li>La case de sortie d'une case avec groupement doit voir toutes les cases du groupement.</li>";
				 mess+="<li>Il existe des solutions spéciales dites particulières.</li>";
				 mess+="<li>Une case avec groupement ne peut être dans la même zone sudoku que ses cases amont et aval.</li>";
       			 mess+="<li>Pour éviter les solutions redondantes, la case de départ a une position inférieure à la case finale de la chaîne. Les cases sont numérotées à partir du coin en haut et à gauche de la grille</li></ul>"
       			 break;
       		case "232":// AIC Chain (Approche du tigre) variete 2 : Type 1
       			 var mess="<br><u>Approche du tigre en boucle ouverte (AIC Type I)</u>.<br>";
       			 mess=mess+"Il s\'agit d\'une chaîne de cases avec une alternance de chiffres (AIC = Alternate Inference Chain).<br>";
       			 mess=mess+"La chaîne est ouverte car elle ne revient pas à son point de départ. Elle est de type 1, c\'est-à-dire que les liens aux extrémités sont forts sur un même chiffre candidat ou faibles sur une case extrême à 2 chiffres (dont le chiffre de l\'autre case extrême) et les cases de départ et de fin ne sont pas dans la même zone sudoku.<br>";
//       			 mess=mess+"On peut supprimer ce chiffre candidat dans toutes les cases voyant les cases des extrémités de la chaîne.<br>";
				 mess+="On peut supprimer ce chiffre candidat dans toutes les cases voyant les cases des extrémités de la chaîne.<br>";
       			 mess+="Si les cases extrêmes de la chaîne ont le même contenu de 2 chiffres, l\'autre chiffre peut aussi être supprimé  dans toutes les cases voyant les cases des extrémités de la chaîne.<br><br>";
       			 mess=mess+"L\'information est transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.<br><br>";
       			 mess=mess+"La forme principale de maintien de la continuité est la suivante :";
       			 mess=mess+"<ul><li>Si une case de la chaîne est entourée de liens de type différent (faible suivi de fort ou fort suivi de faible), les chiffres candidats autour de cette case doivent être les mêmes.</li>";
       			 mess=mess+"<li>Si une case de la chaîne est entourée de liens de même type (fort suivi de fort ou faible suivi de faible), les chiffres candidats autour de cette case doivent être différents.</li>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li>";
       			 mess=mess+"<li>Mais ce maintien de la continuité, s\'il est rompu, peut être rétabli sous les 2 formes suivantes :</li>";
       			 mess=mess+"<ul><li>Si un lien faible est non valide et si ce lien peut être rendu fort par un groupement de cases (ou node), alors ce groupement de cases rend la liaison valide.</li>";
       			 mess=mess+"<li>Si un lien fort est non valide, alors que si ce lien était faible, la liaison deviendrait valide, alors ce lien fort peut être requalifié en lien faible.</li></ul>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li></ul>";
       			 mess=mess+"<u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li>"
       			 mess=mess+"<li>Groupement de cases dans une chaîne : 2 ou 3 cases sont regroupées et considérées comme une seule case si elles sont en lien fort par un chiffre, vues toutes les 2 ou 3 par le lien amont avec ce chiffre, et vues également par le lien aval avec ce même chiffre.</li>";
       			 mess+="<li>Insertion dans la chaîne d'ensembles als (Almost Locked Set) issus de la technique dite de l\'attaque du cobra (combinaison dite als-aic) : leur validation consiste à ce que au moins une des cases entourant chacun de ces ensembles als ne contient pas son chiffre de liaison.</li></ul>"; 
				 mess+="<u>Quelques interdictions sur les groupements</u> :<br>";
				 mess+="<ul><li>Pas de groupement sur la case de départ.</li>";
				 mess+="<li>Les cases d'un groupement doivent être dans un même bloc et alignées.</li>";
				 mess+="<li>La case de sortie d'une case avec groupement doit voir toutes les cases du groupement.</li>";
				 mess+="<li>Il existe des solutions spéciales dites particulières.</li>";
				 mess+="<li>Une case avec groupement ne peut être dans la même zone sudoku que ses cases amont et aval.</li>";
       			 mess+="<li>Pour éviter les solutions redondantes, la case de départ a une position inférieure à la case finale de la chaîne. Les cases sont numérotées à partir du coin en haut et à gauche de la grille</li></ul>"
       			 break;
       		case "233":// AIC Chain (Approche du tigre) variete 3 : Type 2
       			 var mess="<br><br><u>Approche du tigre en boucle ouverte (AIC Type II)</u>.<br><br>";
       			 mess=mess+"Il s\'agit d\'une chaîne de cases avec une alternance de chiffres (AIC = Alternate Inference Chain).<br>";
       			 mess=mess+"La chaîne est ouverte car elle ne revient pas à son point de départ. Elle est de type 2, c\'est-à-dire que les chiffres candidats aux extrémités sont différents et les cases de départ et de fin sont dans la même zone sudoku. ";
       			 mess=mess+"L\'information est transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.<br>";
       			 mess=mess+"Le chiffre candidat du début ne peut être dans la case finale, et le chiffre candidat de fin de chaîne ne peut être dans la case de départ.<br><br>";
       			 mess=mess+"La forme principale de maintien de la continuité est la suivante :";
       			 mess=mess+"<ul><li>Si une case de la chaîne est entourée de liens de type différent (faible suivi de fort ou fort suivi de faible), les chiffres candidats autour de cette case doivent être les mêmes.</li>";
       			 mess=mess+"<li>Si une case de la chaîne est entourée de liens de même type (fort suivi de fort ou faible suivi de faible), les chiffres candidats autour de cette case doivent être différents.</li>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li>";
       			 mess=mess+"<li>Mais ce maintien de la continuité, s\'il est rompu, peut être rétabli sous les 2 formes suivantes :</li>";
       			 mess=mess+"<ul><li>Si un lien faible est non valide et si ce lien peut être rendu fort par un groupement de cases (ou node), alors ce groupement de cases rend la liaison valide.</li>";
       			 mess=mess+"<li>Si un lien fort est non valide, alors que si ce lien était faible, la liaison deviendrait valide, alors ce lien fort peut être requalifié en lien faible.</li></ul>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li></ul>";
       			 mess=mess+"<br><br><u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li>"
       			 mess=mess+"<li>Groupement de cases dans une chaîne : 2 ou 3 cases sont regroupées et considérées comme une seule case si elles sont en lien fort par un chiffre, vues toutes les 2 ou 3 par le lien amont avec ce chiffre, et vues également par le lien aval avec ce même chiffre.</li>";
       			 mess+="<li>Insertion dans la chaîne d'ensembles als (Almost Locked Set) issus de la technique dite de l\'attaque du cobra (combinaison dite als-aic) : leur validation consiste à ce que au moins une des cases entourant chacun de ces ensembles als ne contient pas son chiffre de liaison.</li></ul>"; 
				 mess+="<u>Quelques interdictions sur les groupements</u> :<br>";
				 mess+="<ul><li>Pas de groupement sur la case de départ.</li>";
				 mess+="<li>Les cases d'un groupement doivent être dans un même bloc et alignées.</li>";
				 mess+="<li>La case de sortie d'une case avec groupement doit voir toutes les cases du groupement.</li>";
				 mess+="<li>Il existe des solutions spéciales dites particulières.</li>";
				 mess+="<li>Une case avec groupement ne peut être dans la même zone sudoku que ses cases amont et aval.</li>";
       			 mess+="<li>Pour éviter les solutions redondantes, la case de départ a une position inférieure à la case finale de la chaîne. Les cases sont numérotées à partir du coin en haut et à gauche de la grille</li></ul>"
       			 break;
       		case "234":// AIC Chain (Approche du tigre) variete 4 : avec ALS
       			 var mess="<br><br><u>Approche du tigre en boucle ouverte (AIC avec ALS final)</u>.<br>";
       			 mess=mess+"Il s\'agit d\'une chaîne de cases avec une alternance de chiffres (AIC = Alternate Inference Chain).<br>";
       			 mess=mess+"La chaîne est ouverte car elle ne revient pas à son point de départ. Elle est de type avec regroupement ALS (Almost Locked Set) devant la case finale.<br>";
				 mess+="La case finale voit la case de départ et contient 3 chiffres : le chiffre final de la chaîne, et les 2 chiffres de la case de départ. Le chiffre commun aux case extrêmes qui n'est pas le chiffre de départ de la chaîne, doit être dans l\'une de ces 2 cases extrêmes.<br>";
				mess+="Toute case voyant les 2 cases extrêmes de la chaine ne peut contenir ce chiffre.<br><br>";
       			 mess=mess+"L\'information est transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.<br>";
       			 mess=mess+"La forme principale de maintien de la continuité est la suivante :";
       			 mess=mess+"<ul><li>Si une case de la chaîne est entourée de liens de type différent (faible suivi de fort ou fort suivi de faible), les chiffres candidats autour de cette case doivent être les mêmes.</li>";
       			 mess=mess+"<li>Si une case de la chaîne est entourée de liens de même type (fort suivi de fort ou faible suivi de faible), les chiffres candidats autour de cette case doivent être différents.</li>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li>";
       			 mess=mess+"<li>Mais ce maintien de la continuité, s\'il est rompu, peut être rétabli sous les 2 formes suivantes :</li>";
       			 mess=mess+"<ul><li>Si un lien faible est non valide et si ce lien peut être rendu fort par un groupement de cases (ou node), alors ce groupement de cases rend la liaison valide.</li>";
       			 mess=mess+"<li>Si un lien fort est non valide, alors que si ce lien était faible, la liaison deviendrait valide, alors ce lien fort peut être requalifié en lien faible.</li></ul>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li></ul>";
       			 mess=mess+"<br><br><u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li>"
       			 mess=mess+"<li>Groupement de cases dans une chaîne : 2 ou 3 cases sont regroupées et considérées comme une seule case si elles sont en lien fort par un chiffre, vues toutes les 2 ou 3 par le lien amont avec ce chiffre, et vues également par le lien aval avec ce même chiffre.</li>";
       			 mess+="<li>Insertion dans la chaîne d'ensembles als (Almost Locked Set) issus de la technique dite de l\'attaque du cobra (combinaison dite als-aic) : leur validation consiste à ce que au moins une des cases entourant chacun de ces ensembles als ne contient pas son chiffre de liaison.</li></ul>"; 
				 mess+="<u>Quelques interdictions sur les groupements</u> :<br>";
				 mess+="<ul><li>Pas de groupement sur la case de départ.</li>";
				 mess+="<li>Les cases d'un groupement doivent être dans un même bloc et alignées.</li>";
				 mess+="<li>La case de sortie d'une case avec groupement doit voir toutes les cases du groupement.</li>";
				 mess+="<li>Il existe des solutions spéciales dites particulières.</li>";
				 mess+="<li>Une case avec groupement ne peut être dans la même zone sudoku que ses cases amont et aval.</li>";
       			 mess+="<li>Pour éviter les solutions redondantes, la case de départ a une position inférieure à la case finale de la chaîne. Les cases sont numérotées à partir du coin en haut et à gauche de la grille</li></ul>"
       			 break;
       		case "235":// AIC Chain (Approche du tigre) variete 5 : avec ALS
       			 var mess="<br><br><u>Approche du tigre en boucle ouverte (AIC avec ALS final)</u>.<br><br><br>";
       			 mess=mess+"Il s\'agit d\'une chaîne de cases avec une alternance de chiffres (AIC = Alternate Inference Chain).<br>";
       			 mess=mess+"La chaîne est ouverte car elle ne revient pas à son point de départ. Elle est de type avec regroupement ALS (Almost Locked Set) devant la case finale.";
				 mess+=" La case finale voit la case de départ et contient le chiffre final de la chaîne, qui est aussi contenu dans la case de départ. Ce chiffre commun aux case extrêmes ne peut être dans la case finale.<br>";
       			 mess=mess+"L\'information est transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.<br>";
       			 mess=mess+"La forme principale de maintien de la continuité est la suivante :";
       			 mess=mess+"<ul><li>Si une case de la chaîne est entourée de liens de type différent (faible suivi de fort ou fort suivi de faible), les chiffres candidats autour de cette case doivent être les mêmes.</li>";
       			 mess=mess+"<li>Si une case de la chaîne est entourée de liens de même type (fort suivi de fort ou faible suivi de faible), les chiffres candidats autour de cette case doivent être différents.</li>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li>";
       			 mess=mess+"<li>Mais ce maintien de la continuité, s\'il est rompu, peut être rétabli sous les 2 formes suivantes :</li>";
       			 mess=mess+"<ul><li>Si un lien faible est non valide et si ce lien peut être rendu fort par un groupement de cases (ou node), alors ce groupement de cases rend la liaison valide.</li>";
       			 mess=mess+"<li>Si un lien fort est non valide, alors que si ce lien était faible, la liaison deviendrait valide, alors ce lien fort peut être requalifié en lien faible.</li></ul>";
       			 mess=mess+"<li>De plus, si une case de la chaîne est entourée de liens faibles, cette case ne doit comporter que 2 chiffres.</li></ul>";
       			 mess=mess+"<br><br><u>Remarques</u> :<br>";
       			 mess=mess+"<ul><li>Un lien fort entre 2 cases selon un chiffre, veut dire que ce chiffre est uniquement localisé dans ces 2 cases (et dans aucune autre case d\'une zone sudoku qui relie ces cases : ligne ou colonne ou bloc).</li>";
       			 mess=mess+"<li>Un lien illustré dans la chaîne ci-dessus par un double trait est fort, alors qu\'un lien illustré par un simple trait est faible.</li>"
       			 mess=mess+"<li>Groupement de cases dans une chaîne : 2 ou 3 cases sont regroupées et considérées comme une seule case si elles sont en lien fort par un chiffre, vues toutes les 2 ou 3 par le lien amont avec ce chiffre, et vues également par le lien aval avec ce même chiffre.</li>";
       			 mess+="<li>Insertion dans la chaîne d'ensembles als (Almost Locked Set) issus de la technique dite de l\'attaque du cobra (combinaison dite als-aic) : leur validation consiste à ce que au moins une des cases entourant chacun de ces ensembles als ne contient pas son chiffre de liaison.</li></ul>"; 
				 mess+="<u>Quelques interdictions sur les groupements</u> :<br>";
				 mess+="<ul><li>Pas de groupement sur la case de départ.</li>";
				 mess+="<li>Les cases d'un groupement doivent être dans un même bloc et alignées.</li>";
				 mess+="<li>La case de sortie d'une case avec groupement doit voir toutes les cases du groupement.</li>";
				 mess+="<li>Il existe des solutions spéciales dites particulières.</li>";
				 mess+="<li>Une case avec groupement ne peut être dans la même zone sudoku que ses cases amont et aval.</li>";
       			 mess+="<li>Pour éviter les solutions redondantes, la case de départ a une position inférieure à la case finale de la chaîne. Les cases sont numérotées à partir du coin en haut et à gauche de la grille</li></ul>"
       			 break;
       		case "240":// Death Blossom
       			 var mess="<br><br><u>Death Blossom</u><br><br>";
       			 mess+="Cette méthode est basée sur une case appelée tige comportant 2 ou 3 chiffres.<br><br>";
				 mess+="Cette tige voit 2 ou 3 cases contenant chacune un de ses 2 ou 3 chiffres (différents pour chacune de ces cases).<br><br>";
				 mess+="Dans le cas d'une tige à 2 chiffres, les  2 cases que voit cette tige contiennent l'un des 2 chiffres de la tige, chiffre qui n'est pas le même. Ces 2 chiffres sont des chiffres communs exclusifs (CCE) de 2 rangées de cases distinctes (chaque rangée est dans une même zone sudoku : ligne ou colonne ou bloc). Chaque rangée contient un chiffre de plus que de cases (ALS = Almost Locked Set).<br><br>"
       			 mess=mess+"Ces 2 rangées partagent un chiffre commun, dit ACC, non exclusif. Les cases contenant le chiffre ACC ne sont pas nécessairement dans une même zone sudoku.<br><br>";
       			 mess=mess+"Ce chiffre ACC peut être supprimé de toute case extérieure aux 2 rangées et voyant l'ensemble des cases des 2 rangées contenant cet ACC.";
       			 break;
        	case "250":// ALS-XY-WING
       			 var mess="<br><br><u>ALS-XY-WING</u><br><br>";
       			 mess+="Cette méthode est basée sur 3 rangées de cases distinctes (chaque rangée est dans une même zone sudoku : ligne ou colonne ou bloc). Chaque rangée contient un chiffre de plus que de cases (ALS = Almost Locked Set).<br><br>";
				 mess+="Une  de ces ALS, dite ALS commun, partage 2 Chiffres Communs Exclusifs ou CCE, un par autre ALS, avec chacune des 2 autres ALS.<br><br>";
				 mess+="Ces 2 autres ALS partagent un Autre Chiffre Commun ou ACC.<br><br>"
       			 mess+="Ce chiffre ACC peut être supprimé de toute case extérieure à ces 2 rangées et voyant l'ensemble des cases des 2 rangées contenant cet ACC.";
       			 break;
       		case "260":// Jellyfish variete 0 : cas de base
       			 var mess="<br><u>Jellyfish</u><br><br>";
       			 mess=mess+"4 rangées de 2, 3 ou 4 cases contenant le même chiffre<br>";
				 mess+="Ces rangées sont toutes des lignes (ou des colonnes) et toutes les cases sont sur 4 axes transverses, c'est-à dire 4 colonnes (respectivement 4 lignes).<br><br>";  
       			 mess=mess+"Donc suppression de ce chiffre dans toutes les autres cases de ces axes transverses.<br><br>";
       			 break;
       		case "261":// Jellyfish variete 1 : Finned Jellyfish
       			 var mess="<br><u>Finned Jellyfish (avec ajout d\'une ou deux cases, appelées nageoires)</u><br><br>";
       			 mess=mess+"3 rangées de 2 ou 3 ou 4 cases, et une 4<sup>ème</sup> rangée jusqu\'à 6 cases (toutes verticales ou toutes horizontales) sont reliées en lien exclusif sur le même chiffre.<br><br>";
				 mess=mess+"Il existe une ou deux cases supplémentaires sur une des rangées, et dans le même bloc, appelées nageoires (ou fin en anglais), qui viennent polluer le jellyfish.<br><br>";
       			 mess=mess+"Ces 2 cases, dites finned, sont situées dans le même bloc qu\'une des cases du jrllyfish standard, sur la rangée de cette case. ";
				 mess=mess+"Dans le bloc des nageoires, on peut supprimer le chiffre dans les cases adjacentes de la case faisant partie du jellyfish, différentes des nageoires.<br><br>";
				 mess=mess+"Attention : ces cases ne peuvent faire partie des cases du jellyfish.<br><br>";
       			 break;
       		case "262":// Jellyfish variete 2 : Sashimi Jellyfish
       			 var mess="<br><u>Sashimi Jellyfish (avec une case manquante, et ajout éventuel d\'une ou 2 cases appelées nageoires)</u><br><br>";
       			 mess=mess+"3 rangées de 2 ou 3 ou 4 cases, et une 4<sup>ème</sup> rangée jusqu\'à 5 cases  (toutes verticales ou toutes horizontales) sont reliées en lien exclusif sur le même chiffre.<br><br>";
				 mess=mess+"Il manque une case (ou trou) sur une des rangées pour que ce jellyfish soit complet.<br><br>";
				 mess=mess+"Dans le bloc de ce trou, il existe une ou deux cases supplémentaires sur la rangée, appelées nageoires (ou fin en anglais), autour du trou.<br><br>";
				 mess=mess+"Dans ce bloc des nageoires, on peut supprimer le chiffre dans les cases adjacentes du trou, différentes des nageoires.<br><br>";
				 mess=mess+"Attention : ces cases ne peuvent faire partie des cases du jellyfish.<br><br>";
				 mess=mess+"Avec une nageoire, c\'est un Finned Sashimi Jellyfish. ";
				 mess=mess+"Avec deux nageoires, c\'est un Finned Sashimi Double Jellyfish.<br><br>";
  				 mess=mess+"Il existe encore une variété avec 4 nageoires, dénommée  Sashimi quadruple Finned Jellyfish, avec 2 trous dans un bloc, encadrés par les 4 nageoires, toutes faisant parties de deux rangées du jellyfish, 2 par 2. ";
				 mess=mess+"Pour ce Sashimi quadruple, on peut supprimer le chiffre dans la case du bloc au centre des 4 nageoires.<br><br>";
       			 break;
       		case "270":// Squirmbag variete 0 : cas de base
       			 var mess="<br><u>Squirmbag</u><br><br>";
       			 mess=mess+"5 rangées de 2, 3 , 4 ou 5 cases contenant le même chiffre.<br><br>";
				 mess+="Ces rangées sont toutes des lignes (ou des colonnes) et toutes les cases sont sur 5 axes transverses, c'est-à dire 5 colonnes (respectivement 5 lignes).<br><br>";  
       			 mess=mess+"Donc suppression de ce chiffre dans toutes les autres cases de ces axes transverses.<br><br>";
				 mess+="Les axes transverses ne doivent pas constituer un groupe fermé.<br><br>";
       			 break;
       		case "280":// 3D Medusa variete 1 : two colors in a cell
       			 var mess="<br><u>Chaîne 3D Medusa</u><br><br>";
       			 mess+="Une chaîne 3D Medusa est constituée de cases reliées en lien fort avec alternance de couleur. Une des couleurs est la solution et pas l\'autre.<br>";
       			 mess+="<br>La variété 0 correspond à une chaîne 3D Medusa en boucle fermée avec 2 chiffres de couleurs différentes à l'extrémité commune.<br><br>";
				 mess+="<br>Dans cette case, les autres chiffres sont supprimés.<br>";
				 mess+="<br><br><u>Principe d\'évolution de la couleur des chiffres dans la chaîne</u> : ";
				 mess+="<ul><li>Toute case entourée du même chiffre a une couleur différente de ce chiffre dans les cases adjacentes.</li>";
				 mess+="<li>Toute case entourée de 2 chiffres différents, contient ces 2 chiffres avec des couleurs différentes, la couleur de ces chiffres dans les cases adjacentes est différente de celle dans cette case.</li></ul>";
       			 mess+="L\'information est ainsi transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.";
				 mess+="<br><br><u>2 chiffres de même couleur ne peuvent se voir, c'est-à-dire être dans une même zone sudoku (ligne ou colonne ou bloc). Ils sont donc éliminés, et la couleur complémentaire est validée. ";
				 mess+="Ce principe est à la base de toutes les variétés de chaînes 3D Medusa.</u>";
				 break;
       		case "281":// 3D Medusa variete 0 : same color twice in a cell
       			 var mess="<br><u>Chaîne 3D Medusa</u><br><br>";
       			 mess+="Une chaîne 3D Medusa est constituée de cases reliées en lien fort avec alternance de couleur. Une des couleurs est la solution et pas l\'autre.<br>";
				 mess+="<br>La variété 1 correspond à une chaîne 3D Medusa en boucle fermée avec 2 chiffres de même couleur à l'extrémité commune.<br><br>";
				 mess+="La couleur commune de ces 2 chiffres est fausse, et la couleur complémentaire est bonne: "
				 mess+="<ul><li>Tous les chiffres de la mauvaise couleur sont éliminés dans la chaîne.</li>";
				 mess+="<li>Tous les chiffres de la bonne couleur sont validés, et les autres chiffres de leur case sont éliminés.</li></ul>";
				 mess+="<br><br><u>Principe d\'évolution de la couleur des chiffres dans la chaîne</u> : ";
				 mess+="<ul><li>Toute case entourée du même chiffre a une couleur différente de ce chiffre dans les cases adjacentes.</li>";
				 mess+="<li>Toute case entourée de 2 chiffres différents, contient ces 2 chiffres avec des couleurs différentes, la couleur de ces chiffres dans les cases adjacentes est différente de celle dans cette case.</li></ul>";
       			 mess+="L\'information est ainsi transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.";
				 mess+="<br><br><u>2 chiffres de même couleur ne peuvent se voir, c'est-à-dire être dans une même zone sudoku (ligne ou colonne ou bloc). Ils sont donc éliminés, et la couleur complémentaire est validée. ";
				 mess+="Ce principe est à la base de toutes les variétés de chaînes 3D Medusa.</u>";
       			 break;
       		case "282":// 3D Medusa variete 2 : sees two different colors
       			 var mess="<br><u>Chaîne 3D Medusa</u><br><br>";
       			 mess+="Une chaîne 3D Medusa est constituée de cases reliées en lien fort avec alternance de couleur. Une des couleurs est la solution et pas l\'autre.<br>";
       			 mess+="<br>La variété 2 correspond à une chaîne 3D Medusa en boucle ouverte avec des cases extrêmes contenant le chiffre de départ de la chaîne. La case finale ne contient que 2 chiffres, dont le chiffre final, différent du chiffre de départ, avec une même couleur.<br>";
				 mess+="<br>Toute case extérieure à la chaîne et voyant les cases extrêmes de cette chaîne ne peut contenir le chiffre de départ de la chaîne.<br><br>";
				 mess+="<br><br><u>Principe d\'évolution de la couleur des chiffres dans la chaîne</u> : ";
				 mess+="<ul><li>Toute case entourée du même chiffre a une couleur différente de ce chiffre dans les cases adjacentes.</li>";
				 mess+="<li>Toute case entourée de 2 chiffres différents, contient ces 2 chiffres avec des couleurs différentes, la couleur de ces chiffres dans les cases adjacentes est différente de celle dans cette case.</li></ul>";
       			 mess+="L\'information est ainsi transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.";
				 mess+="<br><br><u>2 chiffres de même couleur ne peuvent se voir, c'est-à-dire être dans une même zone sudoku (ligne ou colonne ou bloc). Ils sont donc éliminés, et la couleur complémentaire est validée. ";
				 mess+="Ce principe est à la base de toutes les variétés de chaînes 3D Medusa.</u>";
      			 break;
       		case "283":// 3D Medusa variete 3 : unit-cell elimination
       			 var mess="<br><u>Chaîne 3D Medusa</u><br><br>";
       			 mess+="Une chaîne 3D Medusa est constituée de cases reliées en lien fort avec alternance de couleur. Une des couleurs est la solution et pas l\'autre.<br>";
       			 mess+="<br>La variété 3 correspond à une chaîne 3D Medusa en boucle ouverte avec les cases extrêmes contenant des chiffres différents de couleurs différentes. La case finale ne peut contenir le chiffre de départ de la chaîne.<br><br>";
				 mess+="<br><br><u>Principe d\'évolution de la couleur des chiffres dans la chaîne</u> : ";
				 mess+="<ul><li>Toute case entourée du même chiffre a une couleur différente de ce chiffre dans les cases adjacentes.</li>";
				 mess+="<li>Toute case entourée de 2 chiffres différents, contient ces 2 chiffres avec des couleurs différentes, la couleur de ces chiffres dans les cases adjacentes est différente de celle dans cette case.</li></ul>";
       			 mess+="L\'information est ainsi transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.";
				 mess+="<br><br><u>2 chiffres de même couleur ne peuvent se voir, c'est-à-dire être dans une même zone sudoku (ligne ou colonne ou bloc). Ils sont donc éliminés, et la couleur complémentaire est validée. ";
				 mess+="Ce principe est à la base de toutes les variétés de chaînes 3D Medusa.</u>";
				 break;
       		case "284":// 3D Medusa variete 4 : emptying a cell
       			 var mess="<br><u>Chaîne 3D Medusa</u><br><br>";
       			 mess+="Une chaîne 3D Medusa est constituée de cases reliées en lien fort avec alternance de couleur. Une des couleurs est la solution et pas l\'autre.<br>";
				 mess+="<br>La variété 4 correspond à une chaîne 3D Medusa en boucle ouverte. Les cases extrêmes de la chaîne ont des chiffres différents de même couleur.. Ils voient une case extérieure à 2 chiffres, qui sont ceux de ces 2 cases. La couleur commune à ces chiffres est mauvaise, et la couleur complémentaire est la bonne.<br>";
				 mess+="<ul><li>Tous les chiffres de la mauvaise couleur sont éliminés dans la chaîne.</li>";
				 mess+="<li>Tous les chiffres de la bonne couleur sont validés, et les autres chiffres de leur case sont éliminés.</li></ul>";
				 mess+="<br><br><u>Principe d\'évolution de la couleur des chiffres dans la chaîne</u> : ";
				 mess+="<ul><li>Toute case entourée du même chiffre a une couleur différente de ce chiffre dans les cases adjacentes.</li>";
				 mess+="<li>Toute case entourée de 2 chiffres différents, contient ces 2 chiffres avec des couleurs différentes, la couleur de ces chiffres dans les cases adjacentes est différente de celle dans cette case.</li></ul>";
       			 mess+="L\'information est ainsi transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.";
				 mess+="<br><br><u>2 chiffres de même couleur ne peuvent se voir, c'est-à-dire être dans une même zone sudoku (ligne ou colonne ou bloc). Ils sont donc éliminés, et la couleur complémentaire est validée. ";
				 mess+="Ce principe est à la base de toutes les variétés de chaînes 3D Medusa.</u>";
       			 break;
       		case "285":// 3D Medusa variete 5 : twice in a unit
       			 var mess="<br><u>Chaîne 3D Medusa</u><br><br>";
       			 mess+="Une chaîne 3D Medusa est constituée de cases reliées en lien fort avec alternance de couleur. Une des couleurs est la solution et pas l\'autre.<br>";
				 mess+="<br>La variété 5 correspond à une chaîne 3D Medusa en boucle ouverte. Les cases extrêmes se voient avec des chiffres différents de couleur différente, la case de départ contenant le chiffre final.<br>";
				 mess+="La couleur commune du chiffre final et d'un chiffre de la case de départ est mauvaise et la couleur complémentaire est la bonne.";
				 mess+="<ul><li>Tous les chiffres de la mauvaise couleur sont éliminés dans la chaîne.</li>";
				 mess+="<li>Tous les chiffres de la bonne couleur sont validés, et les autres chiffres de leur case sont éliminés.</li></ul>";
				 mess+="<br><br><u>Principe d\'évolution de la couleur des chiffres dans la chaîne</u> : ";
				 mess+="<ul><li>Toute case entourée du même chiffre a une couleur différente de ce chiffre dans les cases adjacentes.</li>";
				 mess+="<li>Toute case entourée de 2 chiffres différents, contient ces 2 chiffres avec des couleurs différentes, la couleur de ces chiffres dans les cases adjacentes est différente de celle dans cette case.</li></ul>";
       			 mess+="L\'information est ainsi transmise de case en case sans que, d\'une manière ou d\'une autre la chaîne ne soit rompue.";
				 mess+="<br><br><u>2 chiffres de même couleur ne peuvent se voir, c'est-à-dire être dans une même zone sudoku (ligne ou colonne ou bloc). Ils sont donc éliminés, et la couleur complémentaire est validée. ";
				 mess+="Ce principe est à la base de toutes les variétés de chaînes 3D Medusa.</u>";
       			 break;
       		case "290"://Nishio
       			 var mess="<br><u>Nishio</u><br><br>";
				 mess+="Cette méthode consiste à supposer que, si une case se voit attribuer un de ses chiffres-candidats, cela aboutira à une autre case devenue vide.<br><br>";
				 mess+="Cela est dù au processus suivant ;"
				 mess+="<ul><li>Une case est vue en lien fort par la case de référence avec un autre chiffre.</li>";
				 mess+="<li>Une autre case est vue par la case de référence avec le chiffre attribué à cette case. Et cette autre case voit, en lien fort par ce chiffre, une 3<sup>ème</sup> case.</li>";
				 mess+="<li>Alors, une 4<sup>ème</sup> case, qui voit ces 2 cases, et qui possède 2 chiffres, qui sont justement les chiffres répertoriés ci-dessus, devient vide.</li></ul>";
				 mess+="La case de référence ne peut donc contenir le chiffre-candidat qui aboutit à ce résultat."
				 break;
       		case "300"://Y-Wing
       			 var mess="<br><u>Y-Wing</u><br><br>";
				 mess+="Cette méthode consiste à trouver une case-cible à 2 chiffes-candidats voyant 2 autres cases à 2 chiffres-candidats, chacune de celles-ci contenant un des chiffres-candidats de la case-cible et un 3<sup>ème</sup> chiffre-candidat commmun.<br>";
				 mess+="Aucune case voyant ces 2 cases ne peut contenir ce 3<sup>ème</sup> chiffre, sinon la case-cible devient vide.";
				 break;
       		case "310":// Chaine ALS discontinue
       			 var mess="<b><u>Chaîne ALS discontinue formant une boucle fermée, avec contradiction entre le début et la fin de la boucle.</u></b><br>";
       			 mess+="<br>La méthode ALS (Almost Locked Set), dénommée aussi l\'attaque du cobra, est utilisée dans une chaîne de groupements ALS.<br>";
				 mess+="<br>Une caractéristique importante est véhiculée le long de la chaîne, à savoir <u>une case vaut-elle son chiffre de sortie ?</u> Nous l\'appellerons XALS. ";
				 mess+="Au départ de la chaîne, XALS est arbitrairement vraie.<br><br>Si la case d\'entrée d\'un groupement ALS est égale au chiffre d\'entrée, la case de sortie de ce groupement ALS ne peut contenir son chiffre de sortie (<u>chiffre nécessairement différent du chiffre d\'entrée</u>, sinon l\'ALS serait prise en défaut, ne pouvant avoir plus d\'un chiffre extérieur); et réciproquement.<br>";
 				 mess+="<br><br>Les 4 conditions de validité d\'un groupement ALS sont les suivantes :";
				 mess+="<ul><li>Le chiffre de sortie doit être différent du chiffre d\'entrée.</li>";
				 mess+="<li>La case d\'entrée, relayée par un chiffre dit d\'entrée à cet ALS, doit voir toutes les cases de cet ALS contenant ce chiffre d\'entrée.</li>";
				 mess+="<li>La case de sortie, relayée par un chiffre dit de sortie à cet ALS, doit voir toutes les cases de cet ALS contenant le chiffre de sortie.</li>";
				 mess+="<li>La condition XALS doit être vraie en entrée ALS.</li></ul>";
				 mess+="En sortie de groupement ALS, la condition XALS est inchangée donc vraie.<br>";
				 mess+="<br>De plus, afin de limiter le nombre de cas étudiés, évitant les calculs redondants, 2 conditions supplémentaires sont mises en place :<br>";
				 mess+="<ul><li>Si des cases d\'un groupement ALS partagent la vue de la case de sortie de l\'ALS avec le même chiffre, la première de ces cases est étudiée.</li>";
				 mess+="<li>Si la case d\'entrée d\'un groupement ALS et les cases de cet ALS sont ensemble contenues dans un ALS précédent, ce cas ne nécessite pas d\'être étudié.</li></ul>";
				 mess+="<br><br>XALS se propage ainsi le long de la chaîne, parsemée de groupements ALS, jusqu\'au retour à la case de départ. Si XALS est alors vraie, la boucle est continue. Sinon, elle est discontinue, car il y a contradiction. <br><br>";
				 mess+="En dehors du respect des contraintes ci-dessus autour des groupements ALS, chaque case de la chaîne doit respecter l\'une des 3 conditions suivantes, pour que la chaîne ne soit pas rompue, avec des valeurs adéquates de 5 paramètres binaires suivants : XALS, case à 2 chiffres, case entre 2 mêmes chiffres, lien fort amont, lien fort aval. Selon les cas, la caractéristique XALS est inversée ou pas après cette case.";
				 mess+="<ul><li><u>XALS vraie et case à 2 chiffres</u>. XALS est inversée (donc fausse) si la case est entourée des mêmes chiffres.</li>";// 3
				 mess+="<li><u>XALS vraie et case entre 2 mêmes chiffres, lien amont fort et lien aval fort</u>. XALS est inversée (donc fausse).</li>";// 4
				 mess+="<li><u>XALS fausse et lien amont fort</u>. Avec inversion de XALS (donc vraie) si la case est entre 2 chiffres différents.</li></ul>";// 14
				 mess+="Au retour sur la case de départ, la caractéristique XALS doit être devenue fausse, pour que la boucle soit discontinue. Pour cela, la case de départ doit alors respecter l\'une des 2 conditions suivantes :";
				 mess+="<ul><li><u>XALS vraie, case de départ entre 2 mêmes chiffres, lien amont fort et lien aval fort</u>. D'où XALS devenue fausse (inversion) sur cette case de départ (boucle discontinue).</li>";
				 mess+="<li><u>XALS fausse, case de départ entre 2 chiffres différents et lien fort entre la case finale et la case de départ</u>. D'où XALS restée fausse pour cette case de départ (boucle discontinue).</li></ul>";// 32
				 mess+="<br><u><b>Remarque importante</u></b> : Quand on dit que la caractéristique XALS est vraie, il s\'agit d\'une supposition qui entraîne des conséquences. Cela ne veut pas dire qu\'elle est vraie (chaîne conditionnelle). <u>La validation de XALS se fait au moment du bouclage final par la solution</u>.<br>";
				 mess+="<br><u><b>Autre remarque importante</u></b> : la caractéristique XALS étant vraie au  départ, la boucle est traitée dans un sens et pas dans l\'autre. On aurait pu démarrer avec XALS fausse.<br>";
				 mess+="<br><u><b>Dernière remarque importante</u></b> : Il peut y avoir plusieurs chiffres communs à la case de départ et la case finale de la boucle, ce qui peut donner plusieurs solutions valides.<br>";
				 break;
       		case "311":// Chaine ALS continue
       			 var mess="<b><u>Chaîne ALS continue formant une boucle fermée, avec continuité entre le début et la fin de la boucle.</u></b><br>";
       			 mess+="<br>La méthode ALS (Almost Locked Set), dénommée aussi l\'attaque du cobra, est utilisée dans une chaîne de groupements ALS.<br>";
				 mess+="<br>Une caractéristique importante est véhiculée le long de la chaîne, à savoir <u>une case vaut-elle son chiffre de sortie ?</u> Nous l\'appellerons XALS. ";
				 mess+="Au départ de la chaîne, XALS est arbitrairement vraie.<br><br>Si la case d\'entrée d\'un groupement ALS est égale au chiffre d\'entrée, la case de sortie de ce groupement ALS ne peut contenir son chiffre de sortie (<u>chiffre nécessairement différent du chiffre d\'entrée</u>, sinon l\'ALS serait prise en défaut, ne pouvant avoir plus d\'un chiffre extérieur); et réciproquement.<br>";
 				 mess+="<br><br>Les 4 conditions de validité d\'un groupement ALS sont les suivantes :";
				 mess+="<ul><li>Le chiffre de sortie doit être différent du chiffre d\'entrée.</li>";
				 mess+="<li>La case d\'entrée, relayée par un chiffre dit d\'entrée à cet ALS, doit voir toutes les cases de cet ALS contenant ce chiffre d\'entrée.</li>";
				 mess+="<li>La case de sortie, relayée par un chiffre dit de sortie à cet ALS, doit voir toutes les cases de cet ALS contenant le chiffre de sortie.</li>";
				 mess+="<li>La condition XALS doit être vraie en entrée ALS.</li></ul>";
				 mess+="En sortie de groupement ALS, la condition XALS est inchangée donc vraie.<br>";
				 mess+="<br>De plus, afin de limiter le nombre de cas étudiés, évitant les calculs redondants, 2 conditions supplémentaires sont mises en place :<br>";
				 mess+="<ul><li>Si des cases d\'un groupement ALS partagent la vue de la case de sortie de l\'ALS avec le même chiffre, la première de ces cases est étudiée.</li>";
				 mess+="<li>Si la case d\'entrée d\'un groupement ALS et les cases de cet ALS sont ensemble contenues dans un ALS précédent, ce cas ne nécessite pas d\'être étudié.</li></ul>";
				 mess+="<br><br>XALS se propage ainsi le long de la chaîne, parsemée de groupements ALS, jusqu\'au retour à la case de départ. Si XALS est alors vraie, la boucle est continue. Sinon, elle est discontinue, car il y a contradiction. <br><br>";
				 mess+="En dehors du respect des contraintes ci-dessus autour des groupements ALS, chaque case de la chaîne doit respecter l\'une des 3 conditions suivantes, pour que la chaîne ne soit pas rompue, avec des valeurs adéquates de 5 paramètres binaires suivants : XALS, case à 2 chiffres, case entre 2 mêmes chiffres, lien fort amont, lien fort aval. Selon les cas, la caractéristique XALS est inversée ou pas après cette case.";
				 mess+="<ul><li><u>XALS vraie et case à 2 chiffres</u>. XALS est inversée (donc fausse) si la case est entourée des mêmes chiffres.</li>";// 3
				 mess+="<li><u>XALS vraie et case entre 2 mêmes chiffres, lien amont fort et lien aval fort</u>. XALS est inversée (donc fausse).</li>";// 4
				 mess+="<li><u>XALS fausse et lien amont fort</u>. Avec inversion de XALS (donc vraie) si la case est entre 2 chiffres différents.</li></ul>";// 14
				 mess+="Au retour sur la case de départ, la caractéristique XALS doit être restée vraie, pour que la boucle soit continue. La case de départ doit alors respecter l\'un des 2 conditions suivantes :<br>";
				 mess+="<ul><li><u>XALS vraie et case de départ à 2 chiffres entourée de chiffres différents</u>. D'où XALS restée vraie sur cette case de départ (boucle continue).</li>";
				 mess+="<li><u>XALS fausse, case de départ entre 2 mêmes chiffres et lien fort entre la case finale et la case de départ</u>. D'où XALS devenue vraie pour cette case de départ (boucle continue).</li></ul>";// 32
				 mess+="<br><u><b>Remarque importante</u></b> : Quand on dit que la caractéristique XALS est vraie, il s\'agit d\'une supposition qui entraîne des conséquences. Cela ne veut pas dire qu\'elle est vraie (chaîne conditionnelle). <u>La validation de XALS se fait au moment du bouclage final par la solution</u>.<br>";
				 mess+="<br><u><b>Autre remarque importante</u></b> : la caractéristique XALS étant vraie au départ, la boucle est traitée dans un sens et pas dans l\'autre. On aurait pu démarrer avec XALS fausse.<br>";
       			 break;
       		case "312":// Chaine ALS inachevee
       			 var mess="<b><u>Chaîne ALS inachevée formant une boucle fermée, avec rupture entre la fin de la boucle et le retour sur la case de départ.</u></b><br>";
       			 mess+="<br>La méthode ALS (Almost Locked Set), dénommée aussi l\'attaque du cobra, est utilisée dans une chaîne de groupements ALS.<br>";
				 mess+="<br>Une caractéristique importante est véhiculée le long de la chaîne, à savoir <u>une case vaut-elle son chiffre de sortie ?</u> Nous l\'appellerons XALS. ";
				 mess+="Au départ de la chaîne, XALS est arbitrairement vraie.<br><br>Si la case d\'entrée d\'un groupement ALS est égale au chiffre d\'entrée, la case de sortie de ce groupement ALS ne peut contenir son chiffre de sortie (<u>chiffre nécessairement différent du chiffre d\'entrée</u>, sinon l\'ALS serait prise en défaut, ne pouvant avoir plus d\'un chiffre extérieur); et réciproquement.<br>";
 				 mess+="<br><br>Les 4 conditions de validité d\'un groupement ALS sont les suivantes :";
				 mess+="<ul><li>Le chiffre de sortie doit être différent du chiffre d\'entrée.</li>";
				 mess+="<li>La case d\'entrée, relayée par un chiffre dit d\'entrée à cet ALS, doit voir toutes les cases de cet ALS contenant ce chiffre d\'entrée.</li>";
				 mess+="<li>La case de sortie, relayée par un chiffre dit de sortie à cet ALS, doit voir toutes les cases de cet ALS contenant le chiffre de sortie.</li>";
				 mess+="<li>La condition XALS doit être vraie en entrée ALS.</li></ul>";
				 mess+="En sortie de groupement ALS, la condition XALS est inchangée donc vraie.<br>";
				 mess+="<br>De plus, afin de limiter le nombre de cas étudiés, évitant les calculs redondants, 2 conditions supplémentaires sont mises en place :<br>";
				 mess+="<ul><li>Si des cases d\'un groupement ALS partagent la vue de la case de sortie de l\'ALS avec le même chiffre, la première de ces cases est étudiée.</li>";
				 mess+="<li>Si la case d\'entrée d\'un groupement ALS et les cases de cet ALS sont ensemble contenues dans un ALS précédent, ce cas ne nécessite pas d\'être étudié.</li></ul>";
				 mess+="XALS se propage ainsi le long de la chaîne, parsemée de groupements ALS, jusqu\'au retour sur la case finale voyant la case de départ.<br>";
				 mess+="En dehors du respect des contraintes ci-dessus autour des groupements ALS, chaque case de la chaîne doit respecter l\'une des 3 conditions suivantes, pour que la chaîne ne soit pas rompue, avec des valeurs adéquates de 4 paramètres binaires suivants : XALS, case à 2 chiffres, case entre 2 mêmes chiffres, lien fort amont. Selon les cas, la caractéristique XALS est inversée ou pas après cette case.";
				 mess+="<ul><li>XALS vraie et case à 2 chiffres. XALS est inversée (donc fausse) si la case est entourée des mêmes chiffres.</li>";// 3
				 mess+="<li>XALS vraie et case à plus de 2 chiffres  et case entre 2 mêmes chiffres et lien amont fort. XALS est inversée (donc fausse).</li>";// 4
				 mess+="<li>XALS fausse et lien amont fort. Avec inversion de XALS (donc vraie) si la case est entre 2 chiffres différents.</li></ul>";// 14
				 mess+="<br> La chaîne est rompue entre la case finale et le retour sur la case de départ. La case de départ contient 2 chiffres, et la case finale 3 chiffres, dont les 2 chiffres de la case de départ et un troisième chiffre égal au chiffre amont de cette case finale.  Le chiffre commun aux 2 cases, différent du chiffre de départ de la chaîne, est obligatoirement dans l\'une de ces 2 cases ; toute case voyant ces 2 cases ne peut donc contenir ce chiffre.<br><br>";
				 mess+="<br><u><b>Remarque importante</u></b> : Quand on dit que la caractéristique XALS est vraie, il s\'agit d\'une supposition qui entraîne des conséquences. Cela ne veut pas dire qu\'elle est vraie (chaîne conditionnelle). <u>La validation de XALS se fait au moment du bouclage final par la solution</u>.<br>";
				 mess+="<br><u><b>Autre remarque importante</u></b> : la caractéristique XALS étant vraie au départ, la boucle est traitée dans un sens et pas dans l\'autre. On aurait pu démarrer avec XALS fausse.<br>";
       			 break;
       		case "321":// unicité Bug + 1 variete 1
       			 var mess="<br><br><u>Pour pallier un défaut d\'unicité dit Bug+1</u><br><br>";
       			 mess=mess+"Une seule case de la grille contient 3 chiffres, toutes les autres en contenant 2 ou 1.<br>"
       			 mess=mess+"Pour éviter une erreur d'unicité, seul le chiffre de cette case vu plus de 1 fois dans la même zone sudoku, aucun des 2 autres chiffres n'étant dans ce cas, est valide.<br>";
       			 break;
       		case "322":// unicité carre variete 2 
				 var mess="<br><br><u>Défaut d\'unicité rectangle évité, variété solo</u><br><br>";
       			 mess+="Soit un rectangle de 4 cases, dans 2 blocs différents, contenant les mêmes 2 chiffres, ";
				 mess+="Si 3 de ces cases contiennent uniquement ces 2 chiffres, la 4<sup>ème</sup> case ne peut les contenir.<br><br>";
				 mess+="<u>Remarque</u> : Cet évitement peut être invalidé si les chiffres autres que les 2 chiffres communs dans cette 4<sup>ème</sup> case sont éliminables par l\'un des chiffres de l\'une des 2 autres cases du rectangle voyant cette case. Ce cas d\'évitement invalidé équivaut à un crash non unicité, et le calcul continue en modifiant la dernière hypothèse. Si aucune hypothèse modifiable n\'existe plus, le calcul s\'arrête, et la grille est considérée comme correcte si une seule solution a été trouvée.";
       			 break;
       		case "323":// unicité carre duo 1
       			 var mess="<br><br><u>Défaut d\'unicité rectangle évité, variété duo 1</u><br><br>";
       	 		 mess+="Pour éviter un défaut d\'unicité dans un rectangle dont les sommets contiennent les 2 mêmes chiffres, 2 sommets avec ces seuls chiffres, et 2 autres sommets contigus avec un 3<sup>ème</sup> chiffre commun.";
				 mess+="Toute case voyant ces 2 dernières cases ne peut contenir le 3<sup>ème</sup> chiffre commun.";
       			 break;
       		case "324":// unicité carré duo 2
       			 var mess="<br><br><u>Défaut d\'unicité rectangle évité, variété duo 2</u><br><br>";
       	 		 mess+="Pour éviter un défaut d\'unicité dans un rectangle dont les sommets contiennent les 2 mêmes chiffres, 2 sommets avec ces seuls chiffres, et 2 autres sommets contigus avec un 3<sup>ème</sup> et un 4<sup>ème</sup> chiffre commun.";
				 mess+=" Une 3<sup>ème</sup> case à 2 chiffres du même bloc et alignée contient ces 2 chiffres supplémentaires. Toute case voyant ces 3 cases ne peut contenir les 2 chiffres supplémentaires.";
       			 break;
       		case "325":// unicité duo differents
       			 var mess="<br><br><u>Défaut d\'unicité rectangle évité, variété duo différent</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>"; 
				 mess+="2 de ces cases ne contiennent que ces 2 chiffres, les deux autres cases étant reliées en lienfort par un de ces 2 chiffres à chacune des cases à 2 chiffres. Elles ne peuvent contenir l'autre chiffre";
       			 break;
       		case "326":// unicité duo diagonale
       			 var mess="<br><br><u>Défaut d\'unicité rectangle évité, variété duo diagonale</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases dont 2 cases en diagonale ont les mêmes 2 chiffres uniquement, alors que les 2 autres sommets contiennent ces 2 chiffres et d\'autres chiffres.<br><br>";
				 mess+="Un des 2 chiffres relie en lien fort 2 des sommets et aussi les 2 autres sommets. Il peut être éliminé des sommets à plus de 2 chiffres.";
       			 break;
       		case "327":// unicité LT1
				 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numéro 1</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="Une case extérieure au rectangle contient un de ces 2 chiffres uniquement, et est la seule dans ce cas, à la fois dans un des blocs contenant un côté du rectangle, et aussi sur un axe prolongeant un des côtés du rectangle.<br><br>"
				 mess+="Sur le côté du rectangle extérieur au bloc contenant cette case extérieure, les 2 sommets contiennent les 2 chiffres uniquement.<br><br>";
				 mess+="Dans ces conditions, la case du rectangle, à la fois dans le bloc de cette case extérieure, et sur l'axe de cette case extérieure, ne peut contenir l'autre chiffre.";
       			 break;
       		case "328":// unicité LT2
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numéro 2</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="Une case extérieure au rectangle contient un de ces 2 chiffres uniquement, et est la seule dans ce cas, à la fois dans un des blocs contenant un côté du rectangle, et aussi sur un axe prolongeant un des côtés du rectangle.<br><br>"
				 mess+="2 des cases du rectangle, en diagonale, ne contiennent que 2 chiffres : celle près de la case extérieure, dans son bloc et sur son axe, ainsi que son opposée dans le rectangle.<br><br>";
				 mess+="Dans ces conditions, la case du rectangle, à la fois dans l'autre bloc que cette case extérieure, et sur l'axe de cette case extérieure, ne peut contenir ce chiffre.";
				 mess+="<br><br><u>Remarque</u> : La permutation des 2 sommets du rectangle avec 2 chiffres conduit à une 2<sup>ème</sup> solution.";
       			 break;
       		case "329":// unicité LT3
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numero 3</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="Une des cases du rectangle ne contient que 2 chiffres et est en lien fort par un des 2 chiffres avec une case sur un même côté du rectangle.<br><br>";
				 mess+="Une case extérieure au rectangle contient l'autre de ces 2 chiffres, et est la seule case dans ce cas dans le bloc contenant l'autre côté du rectangle.<br><br>"
				 mess+="Dans ces conditions, la case du rectangle, à la fois dans le bloc de cette case extérieure, et sur un côté du rectangle contenant cette case extérieure, ne peut contenir le chiffre.";
				 mess+="<br><br>La case extérieure doit voir la case de l'autre bloc prolongeant le côté du rectangle contenant la case où a lieu cette suppression de chiffre.<br><br>";
				 mess+="<br><br><u>Remarque</u> : La permutation des 2 côtés du rectangle de chaque bloc conduit à une 2<sup>ème</sup> solution.";
       			 break;
       		case "3210":// unicité LT4
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numéro 4</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="Une des cases du rectangle ne contient que 2 chiffres. Les 2 cases du bloc opposé sont reliées en lien fort par un des 2 chiffres. ";
				 mess+="Une case extérieure au rectangle contient l'autre de ces 2 chiffres, et est la seule case dans ce cas dans le bloc contenant les cases en lien fort du rectangle. De plus, elle voit la 4<sup>ème</sup> case du rectangle.<br><br>"
				 mess+="Dans ces conditions, cette 4<sup>ème</sup> case du rectangle, ne peut contenir l'autre chiffre. La case extérieure au rectangle doit voir cette case.";
       			 break;
       		case "3211":// unicité LT4bis
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numero 4<sup>bis</sup></u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="Une des cases du rectangle ne contient que 2 chiffres. Les 2 cases du bloc opposé sont reliées en lien fort par un des 2 chiffres. ";
				 mess+="Une case extérieure au rectangle contient l'autre de ces 2 chiffres, et est la seule case dans ce cas dans le bloc contenant les cases en lien fort du rectangle. De plus, elle voit la case à 2 chiffres du rectangle.<br><br>"
				 mess+="Dans ces conditions, cette 4<sup>ème</sup> case du rectangle, ne peut contenir le chiffre.";
       			 break;
       		case "3212":// unicité LT5
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numéro 5</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="2 cases sont reliées en lien fort par un des 2 chiffres.<br><br>";
				 mess+="2 cases sur un côté perpendiculaire sont reliées en lien fort par ce même chiffre. Il existe donc une case commune à ces 2 côtés du rectangle.<br><br>";
				 mess+="Une case extérieure au rectangle contient l'autre de ces 2 chiffres, et est la seule case dans ce cas dans le bloc ne contenant pas la case commune à ces 2 côtés du rectangle. Elle est sur l'axe d'un des côtés avec lien fort.<br><br>"; 
				 mess+="Dans ces conditions, la case commune ne peut contenir l'autre chiffre.<br><br>";
				 mess+="La case extérieure doit voir cette case commune ainsi que l'une des deux cases reliée en lien fort avec cette case commune.";
       			 break;
       		case "3213":// unicité LT6
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété LT numéro 6</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="2 cases sont reliées en lien fort par un des 2 chiffres.<br><br>";
				 mess+="2 cases sur le côté perpendiculaire sont reliées en lien fort par l'autre chiffre.<br><br>";
				 mess+="Une case extérieure au rectangle contient cet autre chiffre, et est la seule case dans ce cas dans le bloc ne contenant pas le côté du rectangle contenant les cases en lien fort avec le chiffre. Elle est sur l'axe du côté opposé de la case commune aux 2 côtés avec lien fort.<br><br>"; 
				 mess+="Dans ces conditions, la case à l'opposé en diagonale de la case commune des côtés avec lien fort ne peut contenir le chiffre.<br><br>";
				 mess+="La case extérieure doit voir cette case ainsi que l'une des deux cases de l'autre bloc reliée en lien fort avec cette case.";
       			 break;
       		case "3214":// unicité Rectangle cache numero 1
				 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle caché numéro 1</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="2 cases sont reliées en lien fort par un des 2 chiffres.<br><br>";
				 mess+="2 cases sur le côté perpendiculaire sont reliées en lien fort par le même chiffre.<br><br>";
				 mess+="La case en dehors de ces 2 liens forts contient 2 chiffres.<br><br>";
				 mess+="Dans ces conditions, la case à l'opposé en diagonale de cette case à 2 chiffres ne peut contenir l\'autre chiffre.<br><br>";
       			 break;
       		case "3215":// unicité Rectangle cache numero 2
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle caché numéro 2</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases, dont 3 cases contiennent les mêmes 2 chiffres, la quatrième n'en contenant qu\'un de ces 2 chiffres.<br><br>";
				 mess+="2 cases avec les 2 chiffres de base, dans un même bloc, sont reliées en lien fort par un des 2 chiffres de base. Une de ces 2 cases est reliée en lien fort par l\'autre chiffre à la case n'ayant qu\'un seul chiffre de base, sur un côté perpendiculaire du rectangle. L\'autre case n\'a que 2 chiffres.<br><br>";
				 mess+="Dans ces conditions, la case hors des 2 liens forts ne peut contenir cet autre chiffre.<br><br>";
       			 break;
       		case "3216":// unicité Rectangle cache numero 3
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle caché numéro 3</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="2 cases sont reliées en lien fort par un des 2 chiffres.<br><br>";
				 mess+="2 cases sur le côté parallèle du rectangle sont reliées en lien fort par l\'autre chiffre.<br><br>";
				 mess+="Deux cases situées en diagonale ne contiennent que 2 chiffres.<br><br>";
				 mess+="Dans ces conditions, les 2 autres cases sur l\'autre diagonale ne peuvent contenir le chiffre de leur lien fort.<br><br>";
       			 break;
       		case "3217":// unicité Rectangle cache numero 4
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle caché numéro 4</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres,<br><br>";
				 mess+="2 cases de 2 blocs différents nsont reliées en lien fort par un des 2 chiffres.<br><br>";
				 mess+="2 cases sur le côté parallèle du rectangle sont reliées en lien fort par le même chiffre.<br><br>";
				 mess+="Deux cases situées dans un même bloc ne contiennent que 2 chiffres.<br><br>";
				 mess+="Dans ces conditions, les 2 autres cases dans l\'autre bloc ne peuvent contenir le chiffre autre que le chiffre de leur lien fort.<br><br>";
       			 break;
       		case "3218":// unicité Rectangle cache numero 5
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle caché numéro 5</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres, dits de base,<br><br>";
				 mess+="2 cases de 2 blocs différents sont reliées en lien fort par un des 2 chiffres de base.<br><br>";
				 mess+="2 cases sur un côté perpendiculaire du rectangle, dans un même bloc, sont reliées en lien fort par l\'autre chiffre de base.<br><br>";
				 mess+="La case hors de ces 2 liens forts ne contient que les 2 chiffres de base.<br><br>";
				 mess+="Dans ces conditions, les 2 cases adjacentes de la case à 2 chiffres ne peuvent contenir, l\'une (celle du même bloc) l\'autre chiffre de base, l\'autre le chiffre de base<br><br>";
				 mess+="Enfin, la case en diagonale de la case à 2 chiffres ne peut contenir que les 2 chiffres de base.";
       			 break;
       		case "3219":// unicité Rectangle avoidable numero 1
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle avoidable numéro 1</u><br><br>";
       			 mess+="Pour éviter un défaut d'unicité dans un rectangle de 4 cases contenant les mêmes 2 chiffres, dits de base,<br><br>";
				 mess+="2 cases formant le côté d\'un rectangle contiennent un seul chiffre.<br><br>";
				 mess+="Une troisième case formant un côté du rectangle avec une de ces 2 cases, contient le chiffre de l\'autre case.<br><br>";
				 mess+="La quatrième case du rectangle ne peut contenir le chiffre de la première case.<br><br>";
       			 break;
       		case "3220":// unicité Rectangle avoidable numero 2
       			 var mess="<u>Défaut d\'unicité rectangle évité, variété Rectangle avoidable numéro 2</u><br><br>";
       			 mess+="Pour éviter un défaut d\'unicité dans un rectangle de 4 cases dans 2 blocs différents, dont 2 cases d\'un bloc ne contiennent qu\'un seul chiffre (les 2 chiffres de ces cases sont dits de base), et les 2 autres cases contiennent 2 chiffres dont un chiffre commun, l\'autre chiffre étant un des 2 chiffres de base.<br><br>";
				 mess+="Toute case voyant les cases à 2 chiffres, ne peut contenir leur chiffre commun.";
       			 break;
			case ((ORM+1)+"0"):// Toutes les variantes applicables
			case ((ORM+1)+"0."):// Toutes les variantes applicables
				var mess="<br><br><u>Résultat de toutes les variantes, au nombre de "+maxvarencours+","+titrecomplet(false)+"</u>";
			 	effechargemethode=false;
				break;
			default:
       			 var mess="<br><br>";
				 break;				 
       	}
	} else {
	  var teteorigin=nm.substring(0,1);
	  switch(teteorigin) {
	  			case "H":// Hypothese
	  				 var mess="<br><br><u>Hypothèse</u>, nécessitée par le fait qu'aucune des 32 méthodes implantées dans ce programme n'est applicable";
					 break;
	  			case "Z":
				case "L":// Correction hypothese
	  				 var mess="<br><br><u>Correction d'une hypothèse</u>, qui s'est révélée fausse, après calcul ultérieur";
					 break;
	  			case "M":// variante : MxxVyy, avec xx=origin et yy=variante
	  				 var mess="<br><br><u>Sélection manuelle d\'une variante d\'une méthode</u>";
					 break;
	  			case "W":// variante : Wxx, avec xx=origin
	  				 var mess="<br><br><u>Sélection manuelle de toutes les variantes d\'une méthode applicable</u>";
					 break;
	  			case "T":// variante : T
	  				 var mess="<br><br><u>Sélection manuelle de toutes les variantes de toutes les méthode applicables</u>";
					 break;
	  			case "K":// chiffre à une case Hxxy, avec xx=case et y=chiffre
	  				 var mess="<br><br><u>Sélection manuelle d\'un chiffre dans une case</u>";
					 break;
	  			case "J":// Suppression chiffre dans une case : Jxxy, avec xx=case et y=chiffre
	  				 var mess="<br><br><u>Suppression manuelle d\'un chiffre candidat dans une case</u>";
					 break;
	  			case "N":// Cas extremes ou cases blanches
	  				 var mess="<br><br><u>Grille initiale ou grille finale ou correction hypothèse ou opération manuelle</u>";
					 break;
	  			case "U":// Defaut d'unicite
	  				 var mess="<br><br><u>Grille erronée pour défaut d'unicité bug+1 (pas de case à plus de 2 chiffres-candidats) et au moins 4 cases avec 2 chiffres-candidats, sans méthode applicable</u>";
					 break;
	  			default:// Suppression des cas "A" et "C" : approche du tigre (methode 17), remplaces par MxxVyy; +"Solution"
	  				 var mess="<br><br>";
//	  				 var mess="<br><br><u>Sélection manuelle obsolète d\'une variété de la méthode dite Approche du tigre</u>";
					 break;
	  }
	}
	mess=tradacrit(mess);
	return mess;
}
