export function groupByFirstLetter(items) {
    return items.reduce((acc, item) => {
        const firstLetter = item[0];
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(item);
        return acc;
    }, {});
}

// return PanelName
export function isPanelName(string){

    let res = string.includes("IfcElementAssembly") && !string.includes("PDM0") && !string.includes("Type")

    return res ? string.split("IfcElementAssembly")[1] : false

}

//return true || false
export function isPanelPart(string){

    const panelPieces = ["150S-51-16", "89S-51-16", "200S-51-16"];

    return panelPieces.some(piece => string.includes(piece));

}

export function sortGroups(array){
    array.sort((a, b) => {

        //handle no number in string
        if(!a.match(/\d+$/)){
            return -1
        }

        let matchA = a.match(/\d+$/)
        let matchB = b.match(/\d+$/)

        if (!matchA || !matchB) {
            return -1
        }

        // Extract the number from each element
        let numA = parseInt(matchA[0]);
        let numB = parseInt(matchB[0]);
        

      
        // Compare the extracted numbers
        return numA - numB;
      });

      return array
    
}

export function getElementGroups(elementName) {
    // Check if the element name starts with a letter
    if (/^[A-Za-z]/.test(elementName)) {
        // Handle names starting with a letter
        const lastHyphenIndex = elementName.lastIndexOf('-');

        if (lastHyphenIndex === -1) {
            // If no hyphen is present, remove trailing numbers
            let result = elementName.replace(/\d+$/, '');
            // Remove trailing hyphen if it's the last character
            return result.endsWith('-') ? result.slice(0, -1) : result;
        } else {
            // Extract the part of the string before the last hyphen
            const partBeforeLastHyphen = elementName.substring(0, lastHyphenIndex);
            // Remove trailing numbers from the extracted part
            let result = partBeforeLastHyphen.replace(/\d+$/, '');
            // Remove trailing hyphen if it's the last character
            let res = result.endsWith('-') ? result.slice(0, -1) : result;
            return res == "G" ? "G-W" : res;
        }
    } else {
        // Handle names that don't start with a letter
        let result = elementName.replace(/\d+$/, '');
        // Remove trailing hyphen if it's the last character
        return result.endsWith('-') ? result.slice(0, -1) : result;
    }
}

function extractLastNumber(str) {
    // Use a regular expression to find the last number in the string
    const match = str.match(/(\d+)(?!.*\d)/);
    return match ? parseInt(match[0], 10) : NaN; // Return NaN if no number is found
}

export function sortArrayByLastNumber(arr) {
    return arr.sort((a, b) => {
        const numA = extractLastNumber(a);
        const numB = extractLastNumber(b);
        return numA - numB;
    });
}