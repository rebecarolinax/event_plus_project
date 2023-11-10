/**
 *
 * @param {*} data
 * @returns
 */

export const dateFormatDbToView = data => {
  data = data.substr(0, 9);
  data = data.split("-");
  return `${data[2]}/${data[1]}/${data[0]}`;
};
