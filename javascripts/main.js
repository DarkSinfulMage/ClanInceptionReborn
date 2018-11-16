// Game general variables and functions
// place information
var places = { };

// Names
function randomMaleName()
{
	// Reserved named, must NOT be used below
	// Weshptah

	var names = ['Abasi', 'Abubakar', 'Agymah', 'Ak', 'Amenoteph', 'Amon', 'An-Her', 'Anok',
		'Apophis', 'Asim', 'Atemu', 'Badru', 'Bakari', 'Baruti', 'Behdeti', 'Chibale',
		'Chigaru', 'Chuma', 'Cris', 'Ctesphon', 'Fadil', 'Fenukuh', 'Hanif', 'Hak', 'Heru',
		'Horemheb', 'Ini-Herit', 'Issa', 'Karanthes', 'Khafra', 'Khaldun', 'Khaza', 'Kutamun',
		'Menes', 'Mes', 'Mun', 'Naeem', 'Narmer', 'Onuris', 'Osahar', 'Rakllamon', 'Ramsa',
		'Re', 'Sebak', 'Serapis', 'Setankmek', 'Siptah', 'Teferi', 'Thoth', 'Thugra', 'Tuthamon',
		'Thutothmes', 'Thutmekri'];
	return getRandomElem(names);
}

function randomFemaleName()
{
	// Reserved names
	//	Thoth, Ankh, Osiris
	
	var names = ["Akila", "Amunet", "Ankhetitat", "Ast", "Astarte", "Atet", "Aziza", "Bahiti", "Bakt", "Bastet", "Beketaten", "Betresh", "Chione", "Dendera",
		"Dalila", "Echidna", "Eshe", "Eopei", "Enskerk",
		"Hafsha", "Hatshepsut", "Heqet", "Herneith", "Hesi", "Hasra", "Henite", "Herit", "Hunra", "Iseret",
		"Kakra", "Kanika", "Kasmut", "Kawit", "Kesi", "Kephira", "Kemat", "Khonsu", "Kema",
		"Mafuane", "Mandisa", "Meht-Urt", "Merei", "Menhit", "Meshkenet", "Monifa", "Muminah",
		"Merneith", "Merti", "Merysankh", "Mutemwiya", "Mutnofret", "Muyet", "Mesta",
		"Nefertari", "Nabirye", "Naheemah", "Nailah", "Neith", "Neithotep", "Nekhbet", "Nefret", "Nofret", "Nuru", "Nushim",
		"Olufemi", "Omorose", "Ouei", "Oohhotep", "Pasht", "Pelkha", "Phut", "Pipui", "Pthah-se",
		"Rabiah", "Raia", "Rashida", "Rehema", "Sabah", "Sagira", "Sakhmet", "Sanura", "Shani",
		"Sharifa", "Subira", "Tahirah", "Tauret", "Thema", "Thermuthis", "Tuyu", "Uatit", "Zahra", "Zalika"];
	return getRandomElem(names);
}

document.title = "Clan: Inception 2.2 : Reborn 0.1.0";
