

// АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ

import { AsciiChar } from './types/ascii-char.type';

// абвгдеёжзийклмнопрстуфхцчшщъыьэюя
export const ALPHABET_RUSSIAN: string = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
export const ALPHABET_RUSSIAN_WITH_CAPITALS: string = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

// abcdefghijklmnopqrstuvwxyz
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
export const ALPHABET_ENGLISH: string = 'abcdefghijklmnopqrstuvwxyz';
export const ALPHABET_ENGLISH_WITH_CAPITALS: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';



export const CHARS_SUBSCRIPT: Map<string, string> = new Map([
  ['(', '₍'],
  [')', '₎'],
  ['+', '₊'],
  ['-', '₋'],
  ['=', '₌'],
]);



export const CHARS_SUPERSCRIPT: Map<string, string> = new Map([
  ['(', '⁽'],
  [')', '⁾'],
  ['+', '⁺'],
  ['-', '⁻'],
  ['=', '⁼'],
]);



export const NUMBER_SUBSCRIPT: Map<string, string> = new Map([
  ['0', '₀'],
  ['1', '₁'],
  ['2', '₂'],
  ['3', '₃'],
  ['4', '₄'],
  ['5', '₅'],
  ['6', '₆'],
  ['7', '₇'],
  ['8', '₈'],
  ['9', '₉'],

  // [0, '₀'],
  // [1, '₁'],
  // [2, '₂'],
  // [3, '₃'],
  // [4, '₄'],
  // [5, '₅'],
  // [6, '₆'],
  // [7, '₇'],
  // [8, '₈'],
  // [9, '₉'],
]);


export const NUMBER_SUPERSCRIPT: Map<string, string> = new Map([
  ['0', '⁰'],
  ['1', '¹'],
  ['2', '²'],
  ['3', '³'],
  ['4', '⁴'],
  ['5', '⁵'],
  ['6', '⁶'],
  ['7', '⁷'],
  ['8', '⁸'],
  ['9', '⁹'],

  // [0, '⁰'],
  // [1, '¹'],
  // [2, '²'],
  // [3, '³'],
  // [4, '⁴'],
  // [5, '⁵'],
  // [6, '⁶'],
  // [7, '⁷'],
  // [8, '⁸'],
  // [9, '⁹'],
]);


export const LETTER_SUPERSCRIPT: Map<string, string> = new Map([
  ['a', 'ᵃ'],
  ['b', 'ᵇ'],
  ['c', 'ᶜ'],
  ['d', 'ᵈ'],
  ['e', 'ᵉ'],
  ['f', 'ᶠ'],
  ['g', 'ᵍ'],
  ['h', 'ʰ'],
  ['i', 'ⁱ'],
  ['j', 'ʲ'],
  ['k', 'ᵏ'],
  ['l', 'ˡ'],
  ['m', 'ᵐ'],
  ['n', 'ⁿ'],
  ['o', 'ᵒ'],
  ['p', 'ᵖ'],
  //  ['q', '𐞥'], // q	Latin Extended-F	 𐞥	 U+107A5	 &#x107A5;	 	 	 	 
  ['r', 'ʳ'],
  ['s', 'ˢ'],
  ['t', 'ᵗ'],
  ['u', 'ᵘ'],
  ['v', 'ᵛ'],
  ['w', 'ʷ'],
  ['x', 'ˣ'],
  ['y', 'ʸ'],
  ['z', 'ᶻ'],
  //
  // 
  ['A', 'ᴬ'],
  ['B', 'ᴮ'],
  // ['C', 'ᶜ'],
  ['D', 'ᴰ'],
  ['E', 'ᴱ'],
  // ['F', 'ᶠ'],
  ['G', 'ᴳ'],
  ['H', 'ᴴ'],
  ['I', 'ᴵ'],
  ['J', 'ᴶ'],
  ['K', 'ᴷ'],
  ['L', 'ᴸ'],
  ['M', 'ᴹ'],
  ['N', 'ᴺ'],
  ['O', 'ᴼ'],
  ['P', 'ᴾ'],
  //['Q', ''],  (No superscript capital Q)
  ['R', 'ᴿ'],
  //['S', 'ˢ'],
  ['T', 'ᵀ'],
  ['U', 'ᵁ'],
  ['V', 'ⱽ'],
  ['W', 'ᵂ'],
  //['X', 'ˣ'],
  ['Y', 'ʸ'],
  //['Z', 'ᶻ'],
]);



export const LETTER_SUBSCRIPT: Map<string, string> = new Map([
  ['a', 'ₐ'],
  // ['b', ''],  (No subscript b)
  // ['c', ''],  (No subscript c)
  // ['d', ''],  (No subscript d)
  ['e', 'ₑ'],
  // ['f', ''],  (No subscript f)
  // ['g', ''],  (No subscript g)
  // ['h', ''],  (No subscript h)
  ['i', 'ᵢ'],
  // ['j', ''],  (No subscript j)
  // ['k', ''],  (No subscript k)
  // ['l', ''],  (No subscript l)
  // ['m', ''],  (No subscript m)
  ['n', 'ₙ'],
  ['o', 'ₒ'],
  // ['p', ''],  (No subscript p)
  // ['q', ''],  (No subscript q)
  ['r', 'ᵣ'],
  ['s', 'ₛ'],
  ['t', 'ₜ'],
  ['u', 'ᵤ'],
  ['v', 'ᵥ'],
  //['w', ''],  (No subscript w)
  ['x', 'ₓ'],
  // ['y', ''],  (No subscript y)
  // ['z', '']   (No subscript z)
]);






// Frequency of letters in the Russain alphabet (in percent)
// sorted by frequency
// export const ALPHABET_FREQUENCY_RUSSIAN = new Map([
//   ['о', 10.983],
//   ['е', 8.483],
//   ['а', 7.998],
//   ['и', 7.367],
//   ['н', 6.7],
//   ['т', 6.318],
//   ['с', 5.473],
//   ['р', 4.746],
//   ['в', 4.533],
//   ['л', 4.343],
//   ['к', 3.486],
//   ['м', 3.203],
//   ['д', 2.977],
//   ['п', 2.804],
//   ['у', 2.615],
//   ['я', 2.001],
//   ['ы', 1.898],
//   ['ь', 1.735],
//   ['г', 1.687],
//   ['з', 1.641],
//   ['б', 1.592],
//   ['ч', 1.45],
//   ['й', 1.208],
//   ['х', 0.966],
//   ['ж', 0.94],
//   ['ш', 0.718],
//   ['ю', 0.638],
//   ['ц', 0.486],
//   ['щ', 0.361],
//   ['э', 0.331],
//   ['ф', 0.267],
//   ['ъ', 0.037],
//   ['ё', 0.013],
// ]);
// by alphabet
export const ALPHABET_FREQUENCY_RUSSIAN = new Map([
  ['а', 7.998],
  ['б', 1.592],
  ['в', 4.533],
  ['г', 1.687],
  ['д', 2.977],
  ['е', 8.483],
  ['ё', 0.013],
  ['ж', 0.94],
  ['з', 1.641],
  ['и', 7.367],
  ['й', 1.208],
  ['к', 3.486],
  ['л', 4.343],
  ['м', 3.203],
  ['н', 6.7],
  ['о', 10.983],
  ['п', 2.804],
  ['р', 4.746],
  ['с', 5.473],
  ['т', 6.318],
  ['у', 2.615],
  ['ф', 0.267],
  ['х', 0.966],
  ['ц', 0.486],
  ['ч', 1.45],
  ['ш', 0.718],
  ['щ', 0.361],
  ['ъ', 0.037],
  ['ы', 1.898],
  ['ь', 1.735],
  ['э', 0.331],
  ['ю', 0.638],
  ['я', 2.001],
]);


// Frequency of letters in the English alphabet (in percent)
export const ALPHABET_FREQUENCY_ENGLISH = new Map([
  ['a', 8.167],
  ['b', 1.492],
  ['c', 2.782],
  ['d', 4.253],
  ['e', 12.702],
  ['f', 2.228],
  ['g', 2.015],
  ['h', 6.094],
  ['i', 6.966],
  ['j', 0.153],
  ['k', 0.772],
  ['l', 4.025],
  ['m', 2.406],
  ['n', 6.749],
  ['o', 7.507],
  ['p', 1.929],
  ['q', 0.095],
  ['r', 5.987],
  ['s', 6.327],
  ['t', 9.056],
  ['u', 2.758],
  ['v', 0.978],
  ['w', 2.360],
  ['x', 0.150],
  ['y', 1.974],
  ['z', 0.074],
]);



//
// OCT, HEX,BIN, Symbol, Description
// 
// Initial array for preparing own maps
export const ASCII: [string, string, string, string, string][] =
  [
    ['000', '00', '00000000', 'NUL', 'Null char'],
    ['001', '01', '00000001', 'SOH', 'Start of Heading'],
    ['002', '02', '00000010', 'STX', 'Start of Text'],
    ['003', '03', '00000011', 'ETX', 'End of Text'],
    ['004', '04', '00000100', 'EOT', 'End of Transmission'],
    ['005', '05', '00000101', 'ENQ', 'Enquiry'],
    ['006', '06', '00000110', 'ACK', 'Acknowledgment'],
    ['007', '07', '00000111', 'BEL', 'Bell'],
    ['010', '08', '00001000', 'BS', 'Back Space'],
    ['011', '09', '00001001', 'HT', 'Horizontal Tab'],
    ['012', '0A', '00001010', 'LF', 'Line Feed'],
    ['013', '0B', '00001011', 'VT', 'Vertical Tab'],
    ['014', '0C', '00001100', 'FF', 'Form Feed'],
    ['015', '0D', '00001101', 'CR', 'Carriage Return'],
    ['016', '0E', '00001110', 'SO', 'Shift Out / X-On'],
    ['017', '0F', '00001111', 'SI', 'Shift In / X-Off'],
    ['020', '10', '00010000', 'DLE', 'Data Line Escape'],
    ['021', '11', '00010001', 'DC1', 'Device Control 1 (oft. XON)'],
    ['022', '12', '00010010', 'DC2', 'Device Control 2'],
    ['023', '13', '00010011', 'DC3', 'Device Control 3 (oft. XOFF)'],
    ['024', '14', '00010100', 'DC4', 'Device Control 4'],
    ['025', '15', '00010101', 'NAK', 'Negative Acknowledgement'],
    ['026', '16', '00010110', 'SYN', 'Synchronous Idle'],
    ['027', '17', '00010111', 'ETB', 'End of Transmit Block'],
    ['030', '18', '00011000', 'CAN', 'Cancel'],
    ['031', '19', '00011001', 'EM', 'End of Medium'],
    ['032', '1A', '00011010', 'SUB', 'Substitute'],
    ['033', '1B', '00011011', 'ESC', 'Escape'],
    ['034', '1C', '00011100', 'FS', 'File Separator'],
    ['035', '1D', '00011101', 'GS', 'Group Separator'],
    ['036', '1E', '00011110', 'RS', 'Record Separator'],
    ['037', '1F', '00011111', 'US', 'Unit Separator'],
    ['040', '20', '00100000', ' ', 'Space'],
    ['041', '21', '00100001', '!', 'Exclamation mark'],
    ['042', '22', '00100010', '\'', 'Double quotes (or speech marks)'],
    ['043', '23', '00100011', '#', 'Number'],
    ['044', '24', '00100100', '$', 'Dollar'],
    ['045', '25', '00100101', '%', 'Per cent sign'],
    // ['046', '26', '00100110', '&', '&amp;', 'Ampersand'],
    ['046', '26', '00100110', '&', 'Ampersand'],
    ['047', '27', '00100111', '\'', 'Single quote'],
    ['050', '28', '00101000', '(', 'Open parenthesis (or open bracket)'],
    ['051', '29', '00101001', ')', 'Close parenthesis (or close bracket)'],
    ['052', '2A', '00101010', '*', 'Asterisk'],
    ['053', '2B', '00101011', '+', 'Plus'],
    ['054', '2C', '00101100', ',', 'Comma'],
    ['055', '2D', '00101101', '-', 'Hyphen'],
    ['056', '2E', '00101110', '.', 'Period, dot or full stop'],
    ['057', '2F', '00101111', '/', 'Slash or divide'],
    ['060', '30', '00110000', '0', 'Zero'],
    ['061', '31', '00110001', '1', 'One'],
    ['062', '32', '00110010', '2', 'Two'],
    ['063', '33', '00110011', '3', 'Three'],
    ['064', '34', '00110100', '4', 'Four'],
    ['065', '35', '00110101', '5', 'Five'],
    ['066', '36', '00110110', '6', 'Six'],
    ['067', '37', '00110111', '7', 'Seven'],
    ['070', '38', '00111000', '8', 'Eight'],
    ['071', '39', '00111001', '9', 'Nine'],
    ['072', '3A', '00111010', ':', 'Colon'],
    ['073', '3B', '00111011', ';', 'Semicolon'],
    ['074', '3C', '00111100', '<', 'Less than (or open angled bracket)'],
    ['075', '3D', '00111101', '=', 'Equals'],
    ['076', '3E', '00111110', '>', 'Greater than (or close angled bracket)'],
    ['077', '3F', '00111111', '?', 'Question mark'],
    ['100', '40', '01000000', '@', 'At symbol'],
    ['101', '41', '01000001', 'A', 'Uppercase A'],
    ['102', '42', '01000010', 'B', 'Uppercase B'],
    ['103', '43', '01000011', 'C', 'Uppercase C'],
    ['104', '44', '01000100', 'D', 'Uppercase D'],
    ['105', '45', '01000101', 'E', 'Uppercase E'],
    ['106', '46', '01000110', 'F', 'Uppercase F'],
    ['107', '47', '01000111', 'G', 'Uppercase G'],
    ['110', '48', '01001000', 'H', 'Uppercase H'],
    ['111', '49', '01001001', 'I', 'Uppercase I'],
    ['112', '4A', '01001010', 'J', 'Uppercase J'],
    ['113', '4B', '01001011', 'K', 'Uppercase K'],
    ['114', '4C', '01001100', 'L', 'Uppercase L'],
    ['115', '4D', '01001101', 'M', 'Uppercase M'],
    ['116', '4E', '01001110', 'N', 'Uppercase N'],
    ['117', '4F', '01001111', 'O', 'Uppercase O'],
    ['120', '50', '01010000', 'P', 'Uppercase P'],
    ['121', '51', '01010001', 'Q', 'Uppercase Q'],
    ['122', '52', '01010010', 'R', 'Uppercase R'],
    ['123', '53', '01010011', 'S', 'Uppercase S'],
    ['124', '54', '01010100', 'T', 'Uppercase T'],
    ['125', '55', '01010101', 'U', 'Uppercase U'],
    ['126', '56', '01010110', 'V', 'Uppercase V'],
    ['127', '57', '01010111', 'W', 'Uppercase W'],
    ['130', '58', '01011000', 'X', 'Uppercase X'],
    ['131', '59', '01011001', 'Y', 'Uppercase Y'],
    ['132', '5A', '01011010', 'Z', 'Uppercase Z'],
    ['133', '5B', '01011011', '[', 'Opening bracket'],
    ['134', '5C', '01011100', '\\', 'Backslash'],
    ['135', '5D', '01011101', ']', 'Closing bracket'],
    ['136', '5E', '01011110', '^', 'Caret - circumflex'],
    ['137', '5F', '01011111', '_', 'Underscore'],
    ['140', '60', '01100000', '`', 'Grave accent'],
    ['141', '61', '01100001', 'a', 'Lowercase a'],
    ['142', '62', '01100010', 'b', 'Lowercase b'],
    ['143', '63', '01100011', 'c', 'Lowercase c'],
    ['144', '64', '01100100', 'd', 'Lowercase d'],
    ['145', '65', '01100101', 'e', 'Lowercase e'],
    ['146', '66', '01100110', 'f', 'Lowercase f'],
    ['147', '67', '01100111', 'g', 'Lowercase g'],
    ['150', '68', '01101000', 'h', 'Lowercase h'],
    ['151', '69', '01101001', 'i', 'Lowercase i'],
    ['152', '6A', '01101010', 'j', 'Lowercase j'],
    ['153', '6B', '01101011', 'k', 'Lowercase k'],
    ['154', '6C', '01101100', 'l', 'Lowercase l'],
    ['155', '6D', '01101101', 'm', 'Lowercase m'],
    ['156', '6E', '01101110', 'n', 'Lowercase n'],
    ['157', '6F', '01101111', 'o', 'Lowercase o'],
    ['160', '70', '01110000', 'p', 'Lowercase p'],
    ['161', '71', '01110001', 'q', 'Lowercase q'],
    ['162', '72', '01110010', 'r', 'Lowercase r'],
    ['163', '73', '01110011', 's', 'Lowercase s'],
    ['164', '74', '01110100', 't', 'Lowercase t'],
    ['165', '75', '01110101', 'u', 'Lowercase u'],
    ['166', '76', '01110110', 'v', 'Lowercase v'],
    ['167', '77', '01110111', 'w', 'Lowercase w'],
    ['170', '78', '01111000', 'x', 'Lowercase x'],
    ['171', '79', '01111001', 'y', 'Lowercase y'],
    ['172', '7A', '01111010', 'z', 'Lowercase z'],
    ['173', '7B', '01111011', '{', 'Opening brace'],
    ['174', '7C', '01111100', '|', 'Vertical bar'],
    ['175', '7D', '01111101', '}', 'Closing brace'],
    ['176', '7E', '01111110', '~', 'Equivalency sign - tilde'],
    ['177', '7F', '01111111', '', 'Delete'],
    ['200', '80', '10000000', '€', 'Euro sign'],
    ['201', '81', '10000001', ' ', ''],
    ['202', '82', '10000010', '‚', 'Single low-9 quotation mark'],
    ['203', '83', '10000011', 'ƒ', 'Latin small letter f with hook'],
    ['204', '84', '10000100', '„', 'Double low-9 quotation mark'],
    ['205', '85', '10000101', '…', 'Horizontal ellipsis'],
    ['206', '86', '10000110', '†', 'Dagger'],
    ['207', '87', '10000111', '‡', 'Double dagger'],
    ['210', '88', '10001000', 'ˆ', 'Modifier letter circumflex accent'],
    ['211', '89', '10001001', '‰', 'Per mille sign'],
    ['212', '8A', '10001010', 'Š', 'Latin capital letter S with caron'],
    ['213', '8B', '10001011', '‹', 'Single left-pointing angle quotation'],
    ['214', '8C', '10001100', 'Œ', 'Latin capital ligature OE'],
    ['215', '8D', '10001101', ' ', ' '],
    ['216', '8E', '10001110', 'Ž', 'Latin capital letter Z with caron'],
    ['217', '8F', '10001111', ' ', ' '],
    ['220', '90', '10010000', ' ', ' '],
    ['221', '91', '10010001', '‘', 'Left single quotation mark'],
    ['222', '92', '10010010', '’', 'Right single quotation mark'],
    ['223', '93', '10010011', '“', 'Left double quotation mark'],
    ['224', '94', '10010100', '”', 'Right double quotation mark'],
    ['225', '95', '10010101', '•', 'Bullet'],
    ['226', '96', '10010110', '–', 'En dash'],
    ['227', '97', '10010111', '—', 'Em dash'],
    ['230', '98', '10011000', '˜', 'Small tilde'],
    ['231', '99', '10011001', '™', 'Trade mark sign'],
    ['232', '9A', '10011010', 'š', 'Latin small letter S with caron'],
    ['233', '9B', '10011011', '›', 'Single right-pointing angle quotation mark'],
    ['234', '9C', '10011100', 'œ', 'Latin small ligature oe'],
    ['235', '9D', '10011101', ' ', ' '],
    ['236', '9E', '10011110', 'ž', 'Latin small letter z with caron'],
    ['237', '9F', '10011111', 'Ÿ', 'Latin capital letter Y with diaeresis'],
    ['240', 'A0', '10100000', ' ', 'Non-breaking space'],
    ['241', 'A1', '10100001', '¡', 'Inverted exclamation mark'],
    ['242', 'A2', '10100010', '¢', 'Cent sign'],
    ['243', 'A3', '10100011', '£', 'Pound sign'],
    ['244', 'A4', '10100100', '¤', 'Currency sign'],
    ['245', 'A5', '10100101', '¥', 'Yen sign'],
    ['246', 'A6', '10100110', '¦', 'Pipe, Broken vertical bar'],
    ['247', 'A7', '10100111', '§', 'Section sign'],
    ['250', 'A8', '10101000', '¨', 'Spacing diaeresis - umlaut'],
    ['251', 'A9', '10101001', '©', 'Copyright sign'],
    ['252', 'AA', '10101010', 'ª', 'Feminine ordinal indicator'],
    ['253', 'AB', '10101011', '«', 'Left double angle quotes'],
    ['254', 'AC', '10101100', '¬', 'Not sign'],
    ['255', 'AD', '10101101', '­', 'Soft hyphen'],
    ['256', 'AE', '10101110', '®', 'Registered trade mark sign'],
    ['257', 'AF', '10101111', '¯', 'Spacing macron - overline'],
    ['260', 'B0', '10110000', '°', 'Degree sign'],
    ['261', 'B1', '10110001', '±', 'Plus-or-minus sign'],
    ['262', 'B2', '10110010', '²', 'Superscript two - squared'],
    ['263', 'B3', '10110011', '³', 'Superscript three - cubed'],
    ['264', 'B4', '10110100', '´', 'Acute accent - spacing acute'],
    ['265', 'B5', '10110101', 'µ', 'Micro sign'],
    ['266', 'B6', '10110110', '¶', 'Pilcrow sign - paragraph sign'],
    ['267', 'B7', '10110111', '·', 'Middle dot - Georgian comma'],
    ['270', 'B8', '10111000', '¸', 'Spacing cedilla'],
    ['271', 'B9', '10111001', '¹', 'Superscript one'],
    ['272', 'BA', '10111010', 'º', 'Masculine ordinal indicator'],
    ['273', 'BB', '10111011', '»', 'Right double angle quotes'],
    ['274', 'BC', '10111100', '¼', 'Fraction one quarter'],
    ['275', 'BD', '10111101', '½', 'Fraction one half'],
    ['276', 'BE', '10111110', '¾', 'Fraction three quarters'],
    ['277', 'BF', '10111111', '¿', 'Inverted question mark'],
    ['300', 'C0', '11000000', 'À', 'Latin capital letter A with grave'],
    ['301', 'C1', '11000001', 'Á', 'Latin capital letter A with acute'],
    ['302', 'C2', '11000010', 'Â', 'Latin capital letter A with circumflex'],
    ['303', 'C3', '11000011', 'Ã', 'Latin capital letter A with tilde'],
    ['304', 'C4', '11000100', 'Ä', 'Latin capital letter A with diaeresis'],
    ['305', 'C5', '11000101', 'Å', 'Latin capital letter A with ring above'],
    ['306', 'C6', '11000110', 'Æ', 'Latin capital letter AE'],
    ['307', 'C7', '11000111', 'Ç', 'Latin capital letter C with cedilla'],
    ['310', 'C8', '11001000', 'È', 'Latin capital letter E with grave'],
    ['311', 'C9', '11001001', 'É', 'Latin capital letter E with acute'],
    ['312', 'CA', '11001010', 'Ê', 'Latin capital letter E with circumflex'],
    ['313', 'CB', '11001011', 'Ë', 'Latin capital letter E with diaeresis'],
    ['314', 'CC', '11001100', 'Ì', 'Latin capital letter I with grave'],
    ['315', 'CD', '11001101', 'Í', 'Latin capital letter I with acute'],
    ['316', 'CE', '11001110', 'Î', 'Latin capital letter I with circumflex'],
    ['317', 'CF', '11001111', 'Ï', 'Latin capital letter I with diaeresis'],
    ['320', 'D0', '11010000', 'Ð', 'Latin capital letter ETH'],
    ['321', 'D1', '11010001', 'Ñ', 'Latin capital letter N with tilde'],
    ['322', 'D2', '11010010', 'Ò', 'Latin capital letter O with grave'],
    ['323', 'D3', '11010011', 'Ó', 'Latin capital letter O with acute'],
    ['324', 'D4', '11010100', 'Ô', 'Latin capital letter O with circumflex'],
    ['325', 'D5', '11010101', 'Õ', 'Latin capital letter O with tilde'],
    ['326', 'D6', '11010110', 'Ö', 'Latin capital letter O with diaeresis'],
    ['327', 'D7', '11010111', '×', 'Multiplication sign'],
    ['330', 'D8', '11011000', 'Ø', 'Latin capital letter O with slash'],
    ['331', 'D9', '11011001', 'Ù', 'Latin capital letter U with grave'],
    ['332', 'DA', '11011010', 'Ú', 'Latin capital letter U with acute'],
    ['333', 'DB', '11011011', 'Û', 'Latin capital letter U with circumflex'],
    ['334', 'DC', '11011100', 'Ü', 'Latin capital letter U with diaeresis'],
    ['335', 'DD', '11011101', 'Ý', 'Latin capital letter Y with acute'],
    ['336', 'DE', '11011110', 'Þ', 'Latin capital letter THORN'],
    ['337', 'DF', '11011111', 'ß', 'Latin small letter sharp s - ess-zed'],
    ['340', 'E0', '11100000', 'à', 'Latin small letter a with grave'],
    ['341', 'E1', '11100001', 'á', 'Latin small letter a with acute'],
    ['342', 'E2', '11100010', 'â', 'Latin small letter a with circumflex'],
    ['343', 'E3', '11100011', 'ã', 'Latin small letter a with tilde'],
    ['344', 'E4', '11100100', 'ä', 'Latin small letter a with diaeresis'],
    ['345', 'E5', '11100101', 'å', 'Latin small letter a with ring above'],
    ['346', 'E6', '11100110', 'æ', 'Latin small letter ae'],
    ['347', 'E7', '11100111', 'ç', 'Latin small letter c with cedilla'],
    ['350', 'E8', '11101000', 'è', 'Latin small letter e with grave'],
    ['351', 'E9', '11101001', 'é', 'Latin small letter e with acute'],
    ['352', 'EA', '11101010', 'ê', 'Latin small letter e with circumflex'],
    ['353', 'EB', '11101011', 'ë', 'Latin small letter e with diaeresis'],
    ['354', 'EC', '11101100', 'ì', 'Latin small letter i with grave'],
    ['355', 'ED', '11101101', 'í', 'Latin small letter i with acute'],
    ['356', 'EE', '11101110', 'î', 'Latin small letter i with circumflex'],
    ['357', 'EF', '11101111', 'ï', 'Latin small letter i with diaeresis'],
    ['360', 'F0', '11110000', 'ð', 'Latin small letter eth'],
    ['361', 'F1', '11110001', 'ñ', 'Latin small letter n with tilde'],
    ['362', 'F2', '11110010', 'ò', 'Latin small letter o with grave'],
    ['363', 'F3', '11110011', 'ó', 'Latin small letter o with acute'],
    ['364', 'F4', '11110100', 'ô', 'Latin small letter o with circumflex'],
    ['365', 'F5', '11110101', 'õ', 'Latin small letter o with tilde'],
    ['366', 'F6', '11110110', 'ö', 'Latin small letter o with diaeresis'],
    ['367', 'F7', '11110111', '÷', 'Division sign'],
    ['370', 'F8', '11111000', 'ø', 'Latin small letter o with slash'],
    ['371', 'F9', '11111001', 'ù', 'Latin small letter u with grave'],
    ['372', 'FA', '11111010', 'ú', 'Latin small letter u with acute'],
    ['373', 'FB', '11111011', 'û', 'Latin small letter u with circumflex'],
    ['374', 'FC', '11111100', 'ü', 'Latin small letter u with diaeresis'],
    ['375', 'FD', '11111101', 'ý', 'Latin small letter y with acute'],
    ['376', 'FE', '11111110', 'þ', 'Latin small letter thorn'],
    ['377', 'FF', '11111111', 'ÿ', 'Latin small letter y with diaeresis']
  ];


/**
 * Symbol to ASCII map 
 */
export const ASCII_MAP: Map<string, AsciiChar> = new Map(ASCII.reduce((
  a: [string, AsciiChar][],
  c: [string, string, string, string, string],
  i: number,
) => {

  const asciiChar: AsciiChar = {
    dec: String(i), // decimal
    oct: c[0], // OCT
    hex: c[1], // HEX
    bin: c[2], // BIN
    char: c[3], // Symbol
    desc: c[4], // Description
  };

  const element: [string, AsciiChar] = [c[3], asciiChar];
  a.push(element);
  return a;
}, [] as [string, AsciiChar][]));


/**
 * bin to ASCII map 
 */
export const BIN_TO_ASCII: Map<string, AsciiChar> = new Map(ASCII.reduce((
  a: [string, AsciiChar][],
  c: [string, string, string, string, string],
  i: number,
) => {

  const asciiChar: AsciiChar = {
    dec: String(i), // decimal
    oct: c[0], // OCT
    hex: c[1], // HEX
    bin: c[2], // BIN
    char: c[3], // Symbol
    desc: c[4], // Description
  };

  const element: [string, AsciiChar] = [c[2], asciiChar];
  a.push(element);
  return a;
}, [] as [string, AsciiChar][]));


/**
 * First 1000 prime numbers
 */
export const PRIME_NUMBERS: number[] =
  [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53,
    59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
    127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191,
    193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263,
    269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347,
    349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
    431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499,
    503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593,
    599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661,
    673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757,
    761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853,
    857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
    947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031,
    1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103,
    1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201,
    1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289,
    1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381,
    1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471,
    1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553,
    1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621,
    1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723,
    1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823,
    1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913,
    1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011,
    2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099,
    2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207,
    2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293,
    2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381,
    2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467,
    2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591,
    2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683,
    2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749,
    2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843,
    2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953,
    2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049,
    3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169,
    3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259,
    3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359,
    3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463,
    3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547,
    3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637,
    3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733,
    3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847,
    3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929,
    3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027,
    4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133,
    4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241,
    4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339,
    4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451,
    4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549,
    4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651,
    4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759,
    4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877,
    4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969,
    4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059,
    5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171,
    5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281,
    5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407,
    5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483,
    5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581,
    5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689,
    5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801,
    5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869,
    5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011,
    6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113,
    6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217,
    6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311,
    6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389,
    6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547,
    6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653,
    6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737,
    6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841,
    6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959,
    6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039,
    7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177,
    7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283,
    7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417,
    7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523,
    7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591,
    7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699,
    7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823,
    7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919,
  ];



/**
 * base 64 char to bin table 
 * based on https://datatracker.ietf.org/doc/html/rfc4648
 */
export const BASE64_CHAR: Map<string, string> = new Map([
  ['A', '000000'],
  ['B', '000001'],
  ['C', '000010'],
  ['D', '000011'],
  ['E', '000100'],
  ['F', '000101'],
  ['G', '000110'],
  ['H', '000111'],
  ['I', '001000'],
  ['J', '001001'],
  ['K', '001010'],
  ['L', '001011'],
  ['M', '001100'],
  ['N', '001101'],
  ['O', '001110'],
  ['P', '001111'],
  ['Q', '010000'],
  ['R', '010001'],
  ['S', '010010'],
  ['T', '010011'],
  ['U', '010100'],
  ['V', '010101'],
  ['W', '010110'],
  ['X', '010111'],
  ['Y', '011000'],
  ['Z', '011001'],
  ['a', '011010'],
  ['b', '011011'],
  ['c', '011100'],
  ['d', '011101'],
  ['e', '011110'],
  ['f', '011111'],
  ['g', '100000'],
  ['h', '100001'],
  ['i', '100010'],
  ['j', '100011'],
  ['k', '100100'],
  ['l', '100101'],
  ['m', '100110'],
  ['n', '100111'],
  ['o', '101000'],
  ['p', '101001'],
  ['q', '101010'],
  ['r', '101011'],
  ['s', '101100'],
  ['t', '101101'],
  ['u', '101110'],
  ['v', '101111'],
  ['w', '110000'],
  ['x', '110001'],
  ['y', '110010'],
  ['z', '110011'],
  ['0', '110100'],
  ['1', '110101'],
  ['2', '110110'],
  ['3', '110111'],
  ['4', '111000'],
  ['5', '111001'],
  ['6', '111010'],
  ['7', '111011'],
  ['8', '111100'],
  ['9', '111101'],
  ['+', '111110'],
  ['/', '111111'],
]);

export const BASE64_BIN: Map<string, string> = new Map([
  ['000000', 'A'],
  ['000001', 'B'],
  ['000010', 'C'],
  ['000011', 'D'],
  ['000100', 'E'],
  ['000101', 'F'],
  ['000110', 'G'],
  ['000111', 'H'],
  ['001000', 'I'],
  ['001001', 'J'],
  ['001010', 'K'],
  ['001011', 'L'],
  ['001100', 'M'],
  ['001101', 'N'],
  ['001110', 'O'],
  ['001111', 'P'],
  ['010000', 'Q'],
  ['010001', 'R'],
  ['010010', 'S'],
  ['010011', 'T'],
  ['010100', 'U'],
  ['010101', 'V'],
  ['010110', 'W'],
  ['010111', 'X'],
  ['011000', 'Y'],
  ['011001', 'Z'],
  ['011010', 'a'],
  ['011011', 'b'],
  ['011100', 'c'],
  ['011101', 'd'],
  ['011110', 'e'],
  ['011111', 'f'],
  ['100000', 'g'],
  ['100001', 'h'],
  ['100010', 'i'],
  ['100011', 'j'],
  ['100100', 'k'],
  ['100101', 'l'],
  ['100110', 'm'],
  ['100111', 'n'],
  ['101000', 'o'],
  ['101001', 'p'],
  ['101010', 'q'],
  ['101011', 'r'],
  ['101100', 's'],
  ['101101', 't'],
  ['101110', 'u'],
  ['101111', 'v'],
  ['110000', 'w'],
  ['110001', 'x'],
  ['110010', 'y'],
  ['110011', 'z'],
  ['110100', '0'],
  ['110101', '1'],
  ['110110', '2'],
  ['110111', '3'],
  ['111000', '4'],
  ['111001', '5'],
  ['111010', '6'],
  ['111011', '7'],
  ['111100', '8'],
  ['111101', '9'],
  ['111110', '+'],
  ['111111', '/'],
]);



