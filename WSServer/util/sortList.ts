import marketItem from "../model/marketItem";


/* 
    After adding timestamp indicating when items were
    fetched, it requires sorting algorithm because it 
    would not be viable to paste old fetched items
    with new timestamp.
*/

export default function sortList(currentList: marketItem[], oldList: marketItem[]) {

    const newList: marketItem[] = [];

    console.log("sortList ------------------------------------------------");
    currentList.forEach((cItem: marketItem, index: number) => {
        let isInList = false;
        oldList.forEach((oldItem: marketItem, _index: number, arr: marketItem[]) => {
            if(cItem.name === oldItem.name) {
                newList.push(oldItem);
                isInList = true;
                arr.length += 1;

            }
        })
        
        if(!isInList) {
            newList.push(cItem);
        } else isInList = false;
    })

    return newList;
}