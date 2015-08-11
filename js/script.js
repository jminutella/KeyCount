/* @author Jim Minutella
 * @date 8/2/2015
 * 
 * Functionality for our Key Count and palindrome checker
 */

// Set the default value of the textarea
function load() {
	var textarea = document.getElementById('textarea'),
			textareaValue = textarea.value,
			defaultStr = 'John: 2 \nJane: 3 \nJohn: 4 \nJane: 5';

	// Load our default textarea text
  textarea.value = defaultStr;
}

// This function will calculate the sum of the keys
function sum() {
	var textarea = document.getElementById('textarea'),
			output = document.getElementById('output'),
			textareaValue = textarea.value,
			textAreaLines = [],
			key,
			count,
			indexOfColon,
			outputStr = '',
			totalLinesObj = {},
			i;
	
	// Split the string at every line break into an array so we can work with individual lines
	if (textareaValue) {
		textAreaLines = textareaValue.split('\n');
	}	
	
	// Loop through the number of lines
	for (i=0; i < textAreaLines.length; i++) {
		indexOfColon = textAreaLines[i].indexOf(':');
		
		// Extract the key from the textarea line string
		key = textAreaLines[i].substring(0, indexOfColon);
		
		// Extract the count from the textarea line string
		count = (textAreaLines[i].substring(indexOfColon + 1, textAreaLines[i].length)).trim();
		
		// Convert to lowercase so we don't need to worry about case-sensitivity
	//	key = key.toLowerCase();
		
		// Parse the count from string into integer
		count = parseInt(count, 10);
		
		/* Create an object that contains all of our totals. If a key exists, 
		we take the current value and add to it for our total sum, otherwise, we create a new property
		on the object */
		if (totalLinesObj.hasOwnProperty(key)) {
			totalLinesObj[key] += count;		
		} else {
			totalLinesObj[key] = count;
		}
	}
	
	// Create output string
	for (var property in totalLinesObj) {
		
		// Check if key is a palindrome so we can add our class
		if (checkPalindrome(property)) {
			outputStr += '<span class="palindrome">The total for ' + property + ' is ' + totalLinesObj[property] + '.</span></br>';
		} else {
			outputStr += 'The total for ' + property + ' is ' + totalLinesObj[property] + '. </br>';
		}
		
	}
	
	// Show the output	
	output.innerHTML = outputStr;
}

// Clear our input and output
function clearResults() {
	var	textarea = document.getElementById('textarea'),
			output = document.getElementById('output');
	
	textarea.value = '';
	output.innerHTML = '';
}

// Check if our key is a palindrome
function checkPalindrome(key) {
	var keyNoPunctuation = key.replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""), // remove punctuation
	    keyNoSpaces = keyNoPunctuation.replace(/ /g, ''), // remove whitespace
	    keyArray = [],
	    reversedKey;
	
	// Take our key, convert into an array and then reverse the array    
	keyArray = keyNoSpaces.split('').reverse();
	
	// Take the reversed array and convert it into a string
	reversedKey = keyArray.join('');
	
	// If the lowercase reversed key string equates to our original key (lowercase), key is a palindrome
	return (reversedKey.toLowerCase() === keyNoSpaces.toLowerCase()); 
	
}
