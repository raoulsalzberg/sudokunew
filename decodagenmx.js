function decodagenm(nm) {
	if(!isNaN(nm)) {
		origin=parseint(nm.substring(0,2));
		variete=parseint(nm.substring(2,3));
		if (nm.length==5) {sousvariete=parseint(nm.substring(3,4))}
		switch(nm) {
       		case "0000":// crash unicite variete 0 : bug+1
       		case "0001":// crash unicite variete 1 : unicite rectangle
       		case "000":// crash variete 0 : doublon
       		case "001":// crash variete 1 : chiffre manquant sur un axe ou un bloc
       		case "002":// crash variete 2 : n cases pour (n-1) chiffres
       		case "003":// crash variete 3 : case en solo sur 2 chiffres
       		case "004":// crash variete 4 : case blanche
       		case "005":// crash variete 5 : plusieurs solutions
       		case "006":// crash variete 6 : rectangle
       		case "007":// crash variete 7 : bug+1
       		case "008":// crash variete 8 : évitement non corroboré
      		case "0020":// Case finale en cas de solution positive
       		case "0030":// depart
       		case "010":// petits chiffres variete 0
       		case "011":// petits chiffres variete 1 cases non consecutives
       		case "012":// petits chiffres variete 2 diagonales principales zones sudoku
       		case "013":// petits chiffres variete 3 diagonales principales croissantes
       		case "014":// petits chiffres variete 4 diagonales principales decroissantes
      		case "020":// solo variete 0 : sur ligne ou colonne ou bloc
       		case "030":// jumeaux variete 0
       		case "040":// duo variete 0
       		case "041":// duo variete 1
       		case "050":// triples variete 0
       		case "060":// quadruples variete 0 
       		case "070":// jumeaux isoles variete 0
       		case "080":// triples isoles variete 0
       		case "090":// Gratte-ciel
       		case "100":// boucle variete 0 : Remote Pair
       		case "101":// boucle variete 1 : Remote Pair -1
       		case "110":// L'attaque du cobra variete 0 
       		case "120":// Sue de coq variete 0 : 2 cases et 4 chiffres de l'intersection entre l'arme et la soie et une case extérieure dans l'arme et une case extérieure dans la soie
       		case "121":// Sue de coq variete 1 : 3 cases et 4 chiffres de l'intersection entre l'arme et la soie et une case exterieure dans l'arme et une case exterieure dans la soie
       		case "130":// W-Wing  (l'aile de l'aigle) variete 0
       		case "140":// Rectangle vide variete 0
       		case "150":// Cerf-volant variete 0
       		case "160":// turbot fish variete 0
       		case "170":// X-Chain variete 0
       		case "171":// X-Chain variete 1
       		case "172":// X-Chain variete 2
       		case "173":// X-Chain variete 3
       		case "174":// X-Chain variete 4
       		case "175":// X-Chain variete 5
       		case "180":// XY-Wing variete 0
       		case "181":// XYZ-Wing variete 1
       		case "190":// Swordfish variete 0 : cas de base
       		case "191":// Swordfish variete 1 : Finned swordfish
       		case "192":// Swordfish variete 2 : Sashimi swordfish
       		case "193":// Swordfish variete 3 : Franken ou Kraken  swordfish
       		case "200":// Forteresse maxilien variete 0
       		case "201":// Forteresse maxilien variete 1
       		case "210":// X-Wing variete 0 : cas de base
       		case "211":// X-Wing variete 1 : finned
       		case "212":// X-Wing variete 2 : Sashimi
       		case "213":// X-Wing variete 3 : sashimi double finned
       		case "214":// X-Wing variete 4 : franken
       		case "215":// X-Wing variete 5 : finned franken
       		case "220":// XY-Chain (Griffe du tigre) variete 0
       		case "230":// AIC Chain (Approche du tigre) variete 0 : boucle continue
       		case "231":// AIC Chain (Approche du tigre) variete 1 : boucle discontinue
       		case "232":// AIC Chain (Approche du tigre) variete 2 : Type 1
       		case "233":// AIC Chain (Approche du tigre) variete 3 : Type 2
       		case "234":// AIC Chain (Approche du tigre) variete 4 : avec ALS
       		case "235":// AIC Chain (Approche du tigre) variete 5 : avec ALS
       		case "240":// Death Blossom
        	case "250":// ALS-XY-WING
       		case "260":// Jellyfish variete 0 : cas de base
       		case "261":// Jellyfish variete 1 : Finned Jellyfish
       		case "262":// Jellyfish variete 2 : Sashimi Jellyfish
       		case "270":// Squirmbag variete 0 : cas de base
       		case "280":// 3D Medusa variete 1 : two colors in a cell
       		case "281":// 3D Medusa variete 0 : same color twice in a cell
       		case "282":// 3D Medusa variete 2 : sees two different colors
       		case "283":// 3D Medusa variete 3 : unit-cell elimination
       		case "284":// 3D Medusa variete 4 : emptying a cell
       		case "285":// 3D Medusa variete 5 : twice in a unit
       		case "290"://Nishio
       		case "300"://Y-Wing
       		case "310":// Chaine ALS discontinue
       		case "311":// Chaine ALS continue
       		case "312":// Chaine ALS inachevee
       		case "320":// unicité Bug + 1 variete 0
       		case "321":// unicité carre variete 1 
       		case "322":// unicité carre duo 1
       		case "323":// unicité carré duo 2
       		case "324":// unicité duo differents
       		case "325":// unicité duo diagonale
       		case "326":// unicité LT1
       		case "327":// unicité LT2
       		case "328":// unicité LT3
       		case "329":// unicité LT4
       		case "3210":// unicité LT4bis
       		case "3211":// unicité LT5
       		case "3212":// unicité LT6
       		case "3213":// unicité Rectangle cache numero 1
       		case "3214":// unicité Rectangle cache numero 2
      		case "3215":// unicité Rectangle cache numero 3
       		case "3216":// unicité Rectangle cache numero 4
       		case "3217":// unicité Rectangle cache numero 5
       		case "3218":// unicité Rectangle avoidable numero 1
       		case "3219":// unicité Rectangle avoidable numero 2
			case ((ORM+1)+"0"):// Toutes les variantes applicables
			case ((ORM+1)+"0."):// Toutes les variantes applicables
			default:
       	}
	} else {
	  var teteorigin=nm.substring(0,1);
	  switch(teteorigin) {
	  			case "M":// variante : MxxVyy, avec xx=origin et yy=variante
	  			case "W":// variante : Wxx, avec xx=origin
	  			case "T":// variante : T
	  			case "K":// chiffre à une case Hxxy, avec xx=case et y=chiffre
	  			case "J":// Suppression chiffre dans une case : Jxxy, avec xx=case et y=chiffre
	  			case "N":// Cas extremes ou cases blanches
	  			case "U":// Defaut d'unicite
	  			default:// Suppression des cas "A" et "C" : approche du tigre (methode 17), remplaces par MxxVyy
	  }
	}
}


