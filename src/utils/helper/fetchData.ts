import { httpsGet } from "../http";

/**
 * @description Single Get API request
 */
export const fetchDataWithGetReq = async (endPoint: string) => {
  try {
    const result = await httpsGet(endPoint);
    return result;
  } catch (error) {
    console.error("Error in fetchDataWithGetReq", error);
  }
};

/**
 * @description dealing with multiple APIs in sync
 * @param endPoints
 * @returns
 */
export const fetchDataFromMultipleEndPoints = async (endPoints: string[]) => {
  try {
    const promises = await endPoints.map((endPoint) =>
      fetchDataWithGetReq(endPoint)
    );

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error("Error in fetchDataFromMultipleEndPoints", error);
  }
};
