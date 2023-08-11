export default class ArrayOperations {
  static removeDuplicateValues(arr: any[]) {
    /**
     * @description only with string or numbers
     */
    if (Array.isArray(arr) && arr.length > 1) {
      /**
       * @description using set
       */
      //   const withoutDupes = [...new Set(arr)];
      //   return withoutDupes;

      /**
       * @description using Filter
       */
      const withoutDupes = arr.filter((ele, index) => {
        return arr.indexOf(ele) == index;
      });

      return withoutDupes;
    }

    /**
     * @description using Reduce
     */
  }
}
