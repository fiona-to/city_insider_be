/**
 *  Purpose: sort an array of objects by nodeName
 *  Input: DETAIL list containing nodeType {nodeId, nodeName}
 *  Output: new array sorted
 *
 */
export const sortArrayByNodeName = (obj1, obj2) => {
  let nodeName1 = obj1.nodeType.nodeName.toUpperCase(); // ignore upper and lowercase
  let nodeName2 = obj2.nodeType.nodeName.toUpperCase(); // ignore upper and lowercase
  if (nodeName1 < nodeName2) {
    return -1;
  }
  if (nodeName1 > nodeName2) {
    return 1;
  }

  // names must be equal
  return 0;
};

/**
 *  Purpose: sort an array of objects by catName
 *  Input: NODE list containing catType {catId, catName}
 *  Output: new array sorted
 *
 */
export const sortArrayByCatName = (obj1, obj2) => {
  let catName1 = obj1.catType.catName.toUpperCase(); // ignore upper and lowercase
  let catName2 = obj2.catType.catName.toUpperCase(); // ignore upper and lowercase
  if (catName1 < catName2) {
    return -1;
  }
  if (catName1 > catName2) {
    return 1;
  }

  // names must be equal
  return 0;
};
