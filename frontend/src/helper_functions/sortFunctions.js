export const sortFunction = (by, a, b) => {
    var nameA = a[by].toUpperCase();
    var nameB = b[by].toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
}