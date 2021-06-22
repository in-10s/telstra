package com.in10s.util;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Utils {
	public static Object getCountryCapital() { 
		String json = "{\r\n" + 
				"\"data\":\r\n" + 
				"[\r\n" + 
				"{\"country\":\"Abkhazia\",\"capital\":\"Sukhumi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0626e06c\"},\r\n" + 
				"{\"country\":\"Afghanistan\",\"capital\":\"Kabul\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0626e6be\"},\r\n" + 
				"{\"country\":\"Akrotiri and Dhekelia\",\"capital\":\"Episkopi Cantonment\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0626f280\"},\r\n" + 
				"{\"country\":\"Albania\",\"capital\":\"Tirana\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0626f359\"},\r\n" + 
				"{\"country\":\"Algeria\",\"capital\":\"Algiers\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0626f8d7\"},\r\n" + 
				"{\"country\":\"American Samoa\",\"capital\":\"Pago Pago\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627050b\"},\r\n" + 
				"{\"country\":\"Andorra\",\"capital\":\"Andorra la Vella\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06270be1\"},\r\n" + 
				"{\"country\":\"Angola\",\"capital\":\"Luanda\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062719bf\"},\r\n" + 
				"{\"country\":\"Anguilla\",\"capital\":\"The Valley\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06271c04\"},\r\n" + 
				"{\"country\":\"Antigua and Barbuda\",\"capital\":\"St. John's\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627237d\"},\r\n" + 
				"{\"country\":\"Argentina\",\"capital\":\"Buenos Aires\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06272a9b\"},\r\n" + 
				"{\"country\":\"Armenia\",\"capital\":\"Yerevan\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06272d8f\"},\r\n" + 
				"{\"country\":\"Aruba\",\"capital\":\"Oranjestad\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062735ad\"},\r\n" + 
				"{\"country\":\"Ascension Island\",\"capital\":\"Georgetown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06273dba\"},\r\n" + 
				"{\"country\":\"Australia\",\"capital\":\"Canberra\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06273f97\"},\r\n" + 
				"{\"country\":\"Austria\",\"capital\":\"Vienna\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06274a67\"},\r\n" + 
				"{\"country\":\"Azerbaijan\",\"capital\":\"Baku\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06274c40\"},\r\n" + 
				"{\"country\":\"Bahamas\",\"capital\":\"Nassau\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06275044\"},\r\n" + 
				"{\"country\":\"Bahrain\",\"capital\":\"Manama\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062756b7\"},\r\n" + 
				"{\"country\":\"Bangladesh\",\"capital\":\"Dhaka\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627665e\"},\r\n" + 
				"{\"country\":\"Barbados\",\"capital\":\"Bridgetown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06276ca2\"},\r\n" + 
				"{\"country\":\"Belarus\",\"capital\":\"Minsk\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06277120\"},\r\n" + 
				"{\"country\":\"Belgium\",\"capital\":\"Brussels\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06277f7b\"},\r\n" + 
				"{\"country\":\"Belize\",\"capital\":\"Belmopan\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06278352\"},\r\n" + 
				"{\"country\":\"Benin\",\"capital\":\"Porto-Novo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062791e1\"},\r\n" + 
				"{\"country\":\"Bermuda\",\"capital\":\"Hamilton\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06279c36\"},\r\n" + 
				"{\"country\":\"Bhutan\",\"capital\":\"Thimphu\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627aa03\"},\r\n" + 
				"{\"country\":\"Bolivia\",\"capital\":\"Sucre\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627aac5\"},\r\n" + 
				"{\"country\":\"Bolivia\",\"capital\":\"La Paz\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627af26\"},\r\n" + 
				"{\"country\":\"Bosnia and Herzegovina\",\"capital\":\"Sarajevo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627b08b\"},\r\n" + 
				"{\"country\":\"Botswana\",\"capital\":\"Gaborone\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627bed1\"},\r\n" + 
				"{\"country\":\"Brazil\",\"capital\":\"Brasília\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627cb52\"},\r\n" + 
				"{\"country\":\"British Virgin Islands\",\"capital\":\"Road Town\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627d288\"},\r\n" + 
				"{\"country\":\"Brunei\",\"capital\":\"Bandar Seri Begawan\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627dce9\"},\r\n" + 
				"{\"country\":\"Bulgaria\",\"capital\":\"Sofia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627df10\"},\r\n" + 
				"{\"country\":\"Burkina Faso\",\"capital\":\"Ouagadougou\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627e5fd\"},\r\n" + 
				"{\"country\":\"Burundi\",\"capital\":\"Bujumbura\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627e715\"},\r\n" + 
				"{\"country\":\"Cambodia\",\"capital\":\"Phnom Penh\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627e80c\"},\r\n" + 
				"{\"country\":\"Cameroon\",\"capital\":\"Yaoundé\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627e968\"},\r\n" + 
				"{\"country\":\"Canada\",\"capital\":\"Ottawa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627f5c0\"},\r\n" + 
				"{\"country\":\"Cape Verde\",\"capital\":\"Praia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0627fd82\"},\r\n" + 
				"{\"country\":\"Cayman Islands\",\"capital\":\"George Town\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06280bb3\"},\r\n" + 
				"{\"country\":\"Central African Republic\",\"capital\":\"Bangui\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06281817\"},\r\n" + 
				"{\"country\":\"Chad\",\"capital\":\"N'Djamena\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06281b08\"},\r\n" + 
				"{\"country\":\"Chile\",\"capital\":\"Santiago\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062824fd\"},\r\n" + 
				"{\"country\":\"China\",\"capital\":\"Beijing\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062831ed\"},\r\n" + 
				"{\"country\":\"Christmas Island\",\"capital\":\"Flying Fish Cove\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06283f3a\"},\r\n" + 
				"{\"country\":\"Cocos (Keeling) Islands\",\"capital\":\"West Island\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06283f79\"},\r\n" + 
				"{\"country\":\"Colombia\",\"capital\":\"Bogotá\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062841ed\"},\r\n" + 
				"{\"country\":\"Comoros\",\"capital\":\"Moroni\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062843c2\"},\r\n" + 
				"{\"country\":\"Cook Islands\",\"capital\":\"Avarua\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06284b44\"},\r\n" + 
				"{\"country\":\"Costa Rica\",\"capital\":\"San José\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06284d7d\"},\r\n" + 
				"{\"country\":\"Croatia\",\"capital\":\"Zagreb\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06284ef0\"},\r\n" + 
				"{\"country\":\"Cuba\",\"capital\":\"Havana\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06285a12\"},\r\n" + 
				"{\"country\":\"Curaçao\",\"capital\":\"Willemstad\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062866ca\"},\r\n" + 
				"{\"country\":\"Cyprus\",\"capital\":\"Nicosia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628702a\"},\r\n" + 
				"{\"country\":\"Czech Republic\",\"capital\":\"Prague\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062877f0\"},\r\n" + 
				"{\"country\":\"Côte d'Ivoire\",\"capital\":\"Yamoussoukro\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628838a\"},\r\n" + 
				"{\"country\":\"Democratic Republic of the Congo\",\"capital\":\"Kinshasa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062885f1\"},\r\n" + 
				"{\"country\":\"Denmark\",\"capital\":\"Copenhagen\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06288821\"},\r\n" + 
				"{\"country\":\"Djibouti\",\"capital\":\"Djibouti\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062896fd\"},\r\n" + 
				"{\"country\":\"Dominica\",\"capital\":\"Roseau\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06289cc0\"},\r\n" + 
				"{\"country\":\"Dominican Republic\",\"capital\":\"Santo Domingo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628a46f\"},\r\n" + 
				"{\"country\":\"East Timor (Timor-Leste)\",\"capital\":\"Dili\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628b364\"},\r\n" + 
				"{\"country\":\"Easter Island\",\"capital\":\"Hanga Roa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628bb9e\"},\r\n" + 
				"{\"country\":\"Ecuador\",\"capital\":\"Quito\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628c8c8\"},\r\n" + 
				"{\"country\":\"Egypt\",\"capital\":\"Cairo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628c987\"},\r\n" + 
				"{\"country\":\"El Salvador\",\"capital\":\"San Salvador\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628d1eb\"},\r\n" + 
				"{\"country\":\"Equatorial Guinea\",\"capital\":\"Malabo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628d823\"},\r\n" + 
				"{\"country\":\"Eritrea\",\"capital\":\"Asmara\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628e5a7\"},\r\n" + 
				"{\"country\":\"Estonia\",\"capital\":\"Tallinn\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0628f2d7\"},\r\n" + 
				"{\"country\":\"Ethiopia\",\"capital\":\"Addis Ababa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06290256\"},\r\n" + 
				"{\"country\":\"Falkland Islands\",\"capital\":\"Stanley\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06290f3d\"},\r\n" + 
				"{\"country\":\"Faroe Islands\",\"capital\":\"Tórshavn\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062917f0\"},\r\n" + 
				"{\"country\":\"Federated States of Micronesia\",\"capital\":\"Palikir\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062917fa\"},\r\n" + 
				"{\"country\":\"Fiji\",\"capital\":\"Suva\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06292611\"},\r\n" + 
				"{\"country\":\"Finland\",\"capital\":\"Helsinki\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062926a5\"},\r\n" + 
				"{\"country\":\"France\",\"capital\":\"Paris\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062934e5\"},\r\n" + 
				"{\"country\":\"French Guiana\",\"capital\":\"Cayenne\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062944b9\"},\r\n" + 
				"{\"country\":\"French Polynesia\",\"capital\":\"Papeete\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062947f2\"},\r\n" + 
				"{\"country\":\"Gabon\",\"capital\":\"Libreville\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629523b\"},\r\n" + 
				"{\"country\":\"Gambia\",\"capital\":\"Banjul\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629616f\"},\r\n" + 
				"{\"country\":\"Georgia\",\"capital\":\"Tbilisi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06296ccd\"},\r\n" + 
				"{\"country\":\"Germany\",\"capital\":\"Berlin\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062971d3\"},\r\n" + 
				"{\"country\":\"Ghana\",\"capital\":\"Accra\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062971d9\"},\r\n" + 
				"{\"country\":\"Gibraltar\",\"capital\":\"Gibraltar\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062979cd\"},\r\n" + 
				"{\"country\":\"Greece\",\"capital\":\"Athens\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06297d88\"},\r\n" + 
				"{\"country\":\"Greenland\",\"capital\":\"Nuuk\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062986d5\"},\r\n" + 
				"{\"country\":\"Grenada\",\"capital\":\"St. George's\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06298880\"},\r\n" + 
				"{\"country\":\"Guam\",\"capital\":\"Hagåtña\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06299436\"},\r\n" + 
				"{\"country\":\"Guatemala\",\"capital\":\"Guatemala City\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb06299797\"},\r\n" + 
				"{\"country\":\"Guernsey\",\"capital\":\"St. Peter Port\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629a4ea\"},\r\n" + 
				"{\"country\":\"Guinea\",\"capital\":\"Conakry\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629af56\"},\r\n" + 
				"{\"country\":\"Guinea-Bissau\",\"capital\":\"Bissau\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629bd83\"},\r\n" + 
				"{\"country\":\"Guyana\",\"capital\":\"Georgetown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629ccab\"},\r\n" + 
				"{\"country\":\"Haiti\",\"capital\":\"Port-au-Prince\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629d74e\"},\r\n" + 
				"{\"country\":\"Honduras\",\"capital\":\"Tegucigalpa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629df4b\"},\r\n" + 
				"{\"country\":\"Hungary\",\"capital\":\"Budapest\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629e518\"},\r\n" + 
				"{\"country\":\"Iceland\",\"capital\":\"Reykjavík\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629f1e3\"},\r\n" + 
				"{\"country\":\"India\",\"capital\":\"New Delhi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb0629fb0f\"},\r\n" + 
				"{\"country\":\"Indonesia\",\"capital\":\"Jakarta\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a038b\"},\r\n" + 
				"{\"country\":\"Iran\",\"capital\":\"Tehran\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a1385\"},\r\n" + 
				"{\"country\":\"Iraq\",\"capital\":\"Baghdad\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a1b9f\"},\r\n" + 
				"{\"country\":\"Ireland\",\"capital\":\"Dublin\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a2b1c\"},\r\n" + 
				"{\"country\":\"Isle of Man\",\"capital\":\"Douglas\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a3298\"},\r\n" + 
				"{\"country\":\"Israel\",\"capital\":\"Jerusalem\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a32d8\"},\r\n" + 
				"{\"country\":\"Italy\",\"capital\":\"Rome\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a403c\"},\r\n" + 
				"{\"country\":\"Jamaica\",\"capital\":\"Kingston\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a4c4f\"},\r\n" + 
				"{\"country\":\"Japan\",\"capital\":\"Tokyo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a4df6\"},\r\n" + 
				"{\"country\":\"Jersey\",\"capital\":\"St. Helier\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a4e39\"},\r\n" + 
				"{\"country\":\"Jordan\",\"capital\":\"Amman\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a4e49\"},\r\n" + 
				"{\"country\":\"Kazakhstan\",\"capital\":\"Astana\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a5393\"},\r\n" + 
				"{\"country\":\"Kenya\",\"capital\":\"Nairobi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a5a4d\"},\r\n" + 
				"{\"country\":\"Kiribati\",\"capital\":\"Tarawa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a6579\"},\r\n" + 
				"{\"country\":\"Kosovo\",\"capital\":\"Pristina\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a74ba\"},\r\n" + 
				"{\"country\":\"Kuwait\",\"capital\":\"Kuwait City\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a782c\"},\r\n" + 
				"{\"country\":\"Kyrgyzstan\",\"capital\":\"Bishkek\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a79e2\"},\r\n" + 
				"{\"country\":\"Laos\",\"capital\":\"Vientiane\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a7f27\"},\r\n" + 
				"{\"country\":\"Latvia\",\"capital\":\"Riga\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a80d7\"},\r\n" + 
				"{\"country\":\"Lebanon\",\"capital\":\"Beirut\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a8f4b\"},\r\n" + 
				"{\"country\":\"Lesotho\",\"capital\":\"Maseru\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062a97c0\"},\r\n" + 
				"{\"country\":\"Liberia\",\"capital\":\"Monrovia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062aa51e\"},\r\n" + 
				"{\"country\":\"Libya\",\"capital\":\"Tripoli\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062aa937\"},\r\n" + 
				"{\"country\":\"Liechtenstein\",\"capital\":\"Vaduz\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062aabf8\"},\r\n" + 
				"{\"country\":\"Lithuania\",\"capital\":\"Vilnius\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ab1d8\"},\r\n" + 
				"{\"country\":\"Luxembourg\",\"capital\":\"Luxembourg\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062abcce\"},\r\n" + 
				"{\"country\":\"Macedonia\",\"capital\":\"Skopje\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ac4ba\"},\r\n" + 
				"{\"country\":\"Madagascar\",\"capital\":\"Antananarivo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ad118\"},\r\n" + 
				"{\"country\":\"Malawi\",\"capital\":\"Lilongwe\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ad366\"},\r\n" + 
				"{\"country\":\"Malaysia\",\"capital\":\"Kuala Lumpur\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ae209\"},\r\n" + 
				"{\"country\":\"Maldives\",\"capital\":\"Malé\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ae37f\"},\r\n" + 
				"{\"country\":\"Mali\",\"capital\":\"Bamako\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ae3e1\"},\r\n" + 
				"{\"country\":\"Malta\",\"capital\":\"Valletta\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062aea30\"},\r\n" + 
				"{\"country\":\"Marshall Islands\",\"capital\":\"Majuro\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062aebc1\"},\r\n" + 
				"{\"country\":\"Mauritania\",\"capital\":\"Nouakchott\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062afb37\"},\r\n" + 
				"{\"country\":\"Mauritius\",\"capital\":\"Port Louis\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b03c9\"},\r\n" + 
				"{\"country\":\"Mexico\",\"capital\":\"Mexico City\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b10f1\"},\r\n" + 
				"{\"country\":\"Moldova\",\"capital\":\"Chisinau\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b11b3\"},\r\n" + 
				"{\"country\":\"Monaco\",\"capital\":\"Monaco\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b1f1e\"},\r\n" + 
				"{\"country\":\"Mongolia\",\"capital\":\"Ulaanbaatar\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b2b7e\"},\r\n" + 
				"{\"country\":\"Montenegro\",\"capital\":\"Podgorica\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b2ec8\"},\r\n" + 
				"{\"country\":\"Montserrat\",\"capital\":\"Plymouth\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b35dc\"},\r\n" + 
				"{\"country\":\"Morocco\",\"capital\":\"Rabat\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b3b19\"},\r\n" + 
				"{\"country\":\"Mozambique\",\"capital\":\"Maputo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b48e6\"},\r\n" + 
				"{\"country\":\"Myanmar\",\"capital\":\"Naypyidaw\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b4b87\"},\r\n" + 
				"{\"country\":\"Nagorno-Karabakh Republic\",\"capital\":\"Stepanakert\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b5783\"},\r\n" + 
				"{\"country\":\"Namibia\",\"capital\":\"Windhoek\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b5a8a\"},\r\n" + 
				"{\"country\":\"Nauru\",\"capital\":\"Yaren\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b5f3a\"},\r\n" + 
				"{\"country\":\"Nepal\",\"capital\":\"Kathmandu\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b6068\"},\r\n" + 
				"{\"country\":\"Netherlands\",\"capital\":\"Amsterdam\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b6f11\"},\r\n" + 
				"{\"country\":\"New Caledonia\",\"capital\":\"Nouméa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b767c\"},\r\n" + 
				"{\"country\":\"New Zealand\",\"capital\":\"Wellington\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b7917\"},\r\n" + 
				"{\"country\":\"Nicaragua\",\"capital\":\"Managua\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b8683\"},\r\n" + 
				"{\"country\":\"Niger\",\"capital\":\"Niamey\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b95ba\"},\r\n" + 
				"{\"country\":\"Nigeria\",\"capital\":\"Abuja\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062b9fd7\"},\r\n" + 
				"{\"country\":\"Niue\",\"capital\":\"Alofi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bae6c\"},\r\n" + 
				"{\"country\":\"Norfolk Island\",\"capital\":\"Kingston\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bb311\"},\r\n" + 
				"{\"country\":\"North Korea\",\"capital\":\"Pyongyang\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bbf3a\"},\r\n" + 
				"{\"country\":\"Northern Cyprus\",\"capital\":\"Nicosia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bcda6\"},\r\n" + 
				"{\"country\":\"United Kingdom Northern Ireland\",\"capital\":\"Belfast\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bd690\"},\r\n" + 
				"{\"country\":\"Northern Mariana Islands\",\"capital\":\"Saipan\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062be4ae\"},\r\n" + 
				"{\"country\":\"Norway\",\"capital\":\"Oslo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062be5e4\"},\r\n" + 
				"{\"country\":\"Oman\",\"capital\":\"Muscat\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062becfe\"},\r\n" + 
				"{\"country\":\"Pakistan\",\"capital\":\"Islamabad\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bf526\"},\r\n" + 
				"{\"country\":\"Palau\",\"capital\":\"Ngerulmud\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062bfaab\"},\r\n" + 
				"{\"country\":\"Palestine\",\"capital\":\"Jerusalem\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c0a16\"},\r\n" + 
				"{\"country\":\"Panama\",\"capital\":\"Panama City\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c0c1c\"},\r\n" + 
				"{\"country\":\"Papua New Guinea\",\"capital\":\"Port Moresby\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c1534\"},\r\n" + 
				"{\"country\":\"Paraguay\",\"capital\":\"Asunción\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c1927\"},\r\n" + 
				"{\"country\":\"Peru\",\"capital\":\"Lima\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c26e0\"},\r\n" + 
				"{\"country\":\"Philippines\",\"capital\":\"Manila\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c2844\"},\r\n" + 
				"{\"country\":\"Pitcairn Islands\",\"capital\":\"Adamstown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c2f5d\"},\r\n" + 
				"{\"country\":\"Poland\",\"capital\":\"Warsaw\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c390b\"},\r\n" + 
				"{\"country\":\"Portugal\",\"capital\":\"Lisbon\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c4633\"},\r\n" + 
				"{\"country\":\"Puerto Rico\",\"capital\":\"San Juan\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c4fd1\"},\r\n" + 
				"{\"country\":\"Qatar\",\"capital\":\"Doha\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c55a8\"},\r\n" + 
				"{\"country\":\"Republic of China (Taiwan)\",\"capital\":\"Taipei\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c5e3c\"},\r\n" + 
				"{\"country\":\"Republic of the Congo\",\"capital\":\"Brazzaville\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c6cc2\"},\r\n" + 
				"{\"country\":\"Romania\",\"capital\":\"Bucharest\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c7af2\"},\r\n" + 
				"{\"country\":\"Russia\",\"capital\":\"Moscow\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c85ae\"},\r\n" + 
				"{\"country\":\"Rwanda\",\"capital\":\"Kigali\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c86fe\"},\r\n" + 
				"{\"country\":\"Saint Barthélemy\",\"capital\":\"Gustavia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c8c31\"},\r\n" + 
				"{\"country\":\"Saint Helena\",\"capital\":\"Jamestown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062c957f\"},\r\n" + 
				"{\"country\":\"Saint Kitts and Nevis\",\"capital\":\"Basseterre\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ca540\"},\r\n" + 
				"{\"country\":\"Saint Lucia\",\"capital\":\"Castries\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cb138\"},\r\n" + 
				"{\"country\":\"Saint Martin\",\"capital\":\"Marigot\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cb19a\"},\r\n" + 
				"{\"country\":\"Saint Pierre and Miquelon\",\"capital\":\"St. Pierre\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cb577\"},\r\n" + 
				"{\"country\":\"Saint Vincent and the Grenadines\",\"capital\":\"Kingstown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cbbde\"},\r\n" + 
				"{\"country\":\"Samoa\",\"capital\":\"Apia\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cc4d0\"},\r\n" + 
				"{\"country\":\"San Marino\",\"capital\":\"San Marino\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cd066\"},\r\n" + 
				"{\"country\":\"Saudi Arabia\",\"capital\":\"Riyadh\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cdd2d\"},\r\n" + 
				"{\"country\":\"Scotland\",\"capital\":\"Edinburgh\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ce882\"},\r\n" + 
				"{\"country\":\"Senegal\",\"capital\":\"Dakar\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062cf477\"},\r\n" + 
				"{\"country\":\"Serbia\",\"capital\":\"Belgrade\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d0398\"},\r\n" + 
				"{\"country\":\"Seychelles\",\"capital\":\"Victoria\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d0fd0\"},\r\n" + 
				"{\"country\":\"Sierra Leone\",\"capital\":\"Freetown\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d1f29\"},\r\n" + 
				"{\"country\":\"Singapore\",\"capital\":\"Singapore\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d2cf4\"},\r\n" + 
				"{\"country\":\"Sint Maarten\",\"capital\":\"Philipsburg\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d3b8d\"},\r\n" + 
				"{\"country\":\"Slovakia\",\"capital\":\"Bratislava\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d4807\"},\r\n" + 
				"{\"country\":\"Slovenia\",\"capital\":\"Ljubljana\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d4b5c\"},\r\n" + 
				"{\"country\":\"Solomon Islands\",\"capital\":\"Honiara\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d5a05\"},\r\n" + 
				"{\"country\":\"Somalia\",\"capital\":\"Mogadishu\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d662d\"},\r\n" + 
				"{\"country\":\"Somaliland\",\"capital\":\"Hargeisa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d6750\"},\r\n" + 
				"{\"country\":\"South Africa\",\"capital\":\"Pretoria\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d73f8\"},\r\n" + 
				"{\"country\":\"South Georgia and the South Sandwich Islands\",\"capital\":\"Grytviken\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d79ba\"},\r\n" + 
				"{\"country\":\"South Korea\",\"capital\":\"Seoul\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d8937\"},\r\n" + 
				"{\"country\":\"South Ossetia\",\"capital\":\"Tskhinvali\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062d96e5\"},\r\n" + 
				"{\"country\":\"South Sudan South Sudan\",\"capital\":\"Juba\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062da2c0\"},\r\n" + 
				"{\"country\":\"Spain\",\"capital\":\"Madrid\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062da5e1\"},\r\n" + 
				"{\"country\":\"Sri Lanka\",\"capital\":\"Sri Jayawardenapura Kotte\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062dabfa\"},\r\n" + 
				"{\"country\":\"Sudan\",\"capital\":\"Khartoum\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062db202\"},\r\n" + 
				"{\"country\":\"Suriname\",\"capital\":\"Paramaribo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062db309\"},\r\n" + 
				"{\"country\":\"Swaziland\",\"capital\":\"Mbabane\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062db479\"},\r\n" + 
				"{\"country\":\"Sweden\",\"capital\":\"Stockholm\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062db497\"},\r\n" + 
				"{\"country\":\"Switzerland\",\"capital\":\"Bern\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062dc11e\"},\r\n" + 
				"{\"country\":\"Syria\",\"capital\":\"Damascus\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062dc133\"},\r\n" + 
				"{\"country\":\"São Tomé and Príncipe\",\"capital\":\"São Tomé\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062dc975\"},\r\n" + 
				"{\"country\":\"Tajikistan\",\"capital\":\"Dushanbe\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062dd594\"},\r\n" + 
				"{\"country\":\"Tanzania\",\"capital\":\"Dodoma\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ddb79\"},\r\n" + 
				"{\"country\":\"Thailand\",\"capital\":\"Bangkok\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062de3f4\"},\r\n" + 
				"{\"country\":\"Togo\",\"capital\":\"Lomé\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062df1e1\"},\r\n" + 
				"{\"country\":\"Tonga\",\"capital\":\"Nukuʻalofa\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062df681\"},\r\n" + 
				"{\"country\":\"Transnistria\",\"capital\":\"Tiraspol\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e0102\"},\r\n" + 
				"{\"country\":\"Trinidad and Tobago\",\"capital\":\"Port of Spain\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e0c0d\"},\r\n" + 
				"{\"country\":\"Tristan da Cunha\",\"capital\":\"Edinburgh of the Seven Seas\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e0da6\"},\r\n" + 
				"{\"country\":\"Tunisia\",\"capital\":\"Tunis\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e0f2c\"},\r\n" + 
				"{\"country\":\"Turkey\",\"capital\":\"Ankara\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e1329\"},\r\n" + 
				"{\"country\":\"Turkmenistan\",\"capital\":\"Ashgabat\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e1910\"},\r\n" + 
				"{\"country\":\"Turks and Caicos Islands\",\"capital\":\"Cockburn Town\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e1f91\"},\r\n" + 
				"{\"country\":\"Tuvalu\",\"capital\":\"Funafuti\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e274d\"},\r\n" + 
				"{\"country\":\"Uganda\",\"capital\":\"Kampala\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e31d7\"},\r\n" + 
				"{\"country\":\"Ukraine\",\"capital\":\"Kiev\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e3882\"},\r\n" + 
				"{\"country\":\"United Arab Emirates\",\"capital\":\"Abu Dhabi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e42b5\"},\r\n" + 
				"{\"country\":\"United Kingdom; England\",\"capital\":\"London\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e4786\"},\r\n" + 
				"{\"country\":\"United States\",\"capital\":\"Washington, D.C.\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e4ae4\"},\r\n" + 
				"{\"country\":\"United States Virgin Islands\",\"capital\":\"Charlotte Amalie\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e5006\"},\r\n" + 
				"{\"country\":\"Uruguay\",\"capital\":\"Montevideo\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e504c\"},\r\n" + 
				"{\"country\":\"Uzbekistan\",\"capital\":\"Tashkent\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e5c11\"},\r\n" + 
				"{\"country\":\"Vanuatu\",\"capital\":\"Port Vila\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e65eb\"},\r\n" + 
				"{\"country\":\"Vatican City\",\"capital\":\"Vatican City\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e706d\"},\r\n" + 
				"{\"country\":\"Venezuela\",\"capital\":\"Caracas\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e7ab5\"},\r\n" + 
				"{\"country\":\"Vietnam\",\"capital\":\"Hanoi\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e84fb\"},\r\n" + 
				"{\"country\":\"Wales\",\"capital\":\"Cardiff\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e9262\"},\r\n" + 
				"{\"country\":\"Wallis and Futuna\",\"capital\":\"Mata-Utu\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062e9554\"},\r\n" + 
				"{\"country\":\"Western Sahara\",\"capital\":\"El Aaiún\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ea1c7\"},\r\n" + 
				"{\"country\":\"Yemen\",\"capital\":\"Sanaá\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ea318\"},\r\n" + 
				"{\"country\":\"Zambia\",\"capital\":\"Lusaka\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ea617\"},\r\n" + 
				"{\"country\":\"Zimbabwe\",\"capital\":\"Harare\",\"type\":\"countryCapital\",\"_id\":\"7b45e9950a03bd78fef5b2eb062ea7a7\"}\r\n" + 
				"]}";
		JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
		System.out.println(jsonObject);
		return jsonObject;
	}
}
