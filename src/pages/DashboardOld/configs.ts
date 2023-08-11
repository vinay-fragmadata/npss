/**
 * @description Dashboard Table headers
 */
export const DASHBOARD_TABLE_HEADERS = [
  { label: "", value: "BREAKDOWN_TYPE", minWidth: 45, align: "left" },
  { label: "IN", value: "IN", minWidth: 45, align: "left" },
  { label: "OUT", value: "OUT", minWidth: 45, align: "left" },
];

export const DASHBOARD_TABLE_ROWS = [
  { BREAKDOWN_TYPE: "FLEX BLOCK", IN: "", OUT: "" },
  { BREAKDOWN_TYPE: "CB Request To Response", IN: "", OUT: "" },
  { BREAKDOWN_TYPE: "Flex Post CB Call", IN: "", OUT: "" },
];

/**
 * @description Chart Data
 */
export const chartData = [
  {
    name: "Average",
    OUT: 0,
    IN: 5,
  },
  {
    name: "Min",
    OUT: 0,
    IN: 0,
  },
  {
    name: "50th Centile",
    OUT: 0,
    IN: 10,
  },
  {
    name: "75th Centile",
    OUT: 0,
    IN: 0,
  },
  {
    name: "95th Centile",
    OUT: 0,
    IN: 0,
  },
  {
    name: "99th Centile",
    OUT: 60,
    IN: 0,
  },
  {
    name: "Max",
    OUT: 0,
    IN: 0,
  },
];
