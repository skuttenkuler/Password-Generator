const userPassEl = document.querySelector('#userPass');
const lengthEl = document.querySelector('#passwordLength');
const lowercaseEl = document.querySelector('#lowercase');
const uppercaseEl = document.querySelector('#uppercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
    
    
//set array with keys to each getRandom functions
    const randomChar = {
        lower: getRandomLower,
        upper: getRandomUpper,
        numbers: getRandomNumber,
        symbols: getRandomSymbol,
    };
    //console.log(randomChar);
generateButton.addEventListener('click', () => {
        //set password length
        const passwordLength = +lengthEl.value;
        //assign 'checked' values
        const checkedLower = lowercaseEl.checked;
	    const checkedUpper = uppercaseEl.checked;
	    const checkedNumbers = numbersEl.checked;
        const checkedSymbols = symbolsEl.checked;
        //get the return value or password from the function generatePassword
        userPassEl.innerText = generatePassword(passwordLength, checkedLower, checkedUpper, checkedNumbers, checkedSymbols);
    });
    //console.log("it clicked")
        
        function generatePassword(passwordLength, lower, upper, numbers, symbols) { 
            
            let password = '';
            // set types for random pull loop
            const typesChar = lower + upper + numbers + symbols;
            //set up array for checked or not checked filter
            const typesCharArr = [{lower}, {upper}, {numbers}, {symbols}].filter(
                //filter true boolean from false
                item => Object.values(item)[0]);
                //check if no types were selected
                if(typesChar === 0) {
                    alert("Must select at least one type of character!")
                }
                
                //loop through the types and pull random character from each type
                for(let i = 0; i < passwordLength; i += typesChar){
                    typesCharArr.forEach(type => {
                        const charKey = Object.keys(type)[0];
                        console.log("charkey :" +charKey)
                        password += randomChar[charKey]();
                        
                    });
                }
                    
                    const userPassword = password
                    //return the user's password
                    return userPassword;
                    //console.log(userPassword)
            
            }  
            
//generate random functions with return strings of browser characters sets
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
        
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
        
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);        
}
        
function getRandomSymbol() {
    const symbols = ' !"#$%&()*+,-./:;<=>?@[]^_`{|}~'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
    
    //function that copies passwor to clipboard after click copy button
copyButton.addEventListener('click', () => {
    //set new variable and create new element
    const textarea = document.createElement("textarea");
    const copiedPass = userPassEl.innerText;
    //point password value to new element
    textarea.value = copiedPass;
    //add value to element
    document.body.appendChild(textarea);
    //select the element
    textarea.select();
    //copy element
    document.execCommand('copy');
    // remove the text area
    textarea.remove();
    //alert copy happened
    alert("Password copied");
});