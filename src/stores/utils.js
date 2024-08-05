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