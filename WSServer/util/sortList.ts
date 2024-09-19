import marketItem from "../model/marketItem";


/* 
    After adding timestamp indicating when items were
    fetched, it requires sorting algorithm because it 
    would not be viable to paste old fetched items
    with new timestamp.
*/


export default function sortList(newList: marketItem[], oldList: marketItem[]) {

    

    newList.forEach((newItem, index) => {
        // Find the corresponding item in the old list using the key
        const oldItem = oldList.find(oldItem => oldItem.name === newItem.name);
        
        // If a match is found, replace the item in the new list with the old one
        if (oldItem) {
          newList[index].timeFetched = oldItem.timeFetched;
        }
    });

    return newList;
} 