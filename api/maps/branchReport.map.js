const allCode = require("./scCode.all");
const properties = require("./scCode.properties");
const parentMap = require("./scCode.map");

function getBranchIndex(branchName) {
  switch (branchName) {
    case "กองบริหารงานคณะ":
      return 0;
    case "นิติวิทย์":
      return 1;
    case "วิทย์-ชีวภาพ":
      return 2;
    case "วัสดุศาสตร์":
      return 3;
    case "คณิตศาสตร์":
      return 4;
    case "เคมี":
      return 5;
    case "จุลชีววิทยา":
      return 6;
    case "ชีวเคมี":
      return 7;
    case "ชีววิทยา":
      return 8;
    case "สิ่งแวดล้อม":
      return 9;
    case "ฟิสิกส์":
      return 10;
    case "คอมพิวเตอร์":
      return 11;
    case "สถิติ":
      return 12;
    case "วมว.":
      return 13;
    default:
      return -1;
  }
}

function getTableRowIndex(scCode) {
    const allCodeLength = allCode.length;
    for (let i = 0; i < allCodeLength; i++) {
        if (scCode === allCode[i]) {
            return i;
        }
    }
    return -1;
}

function getParentArray(scCode) {
    for (const i of parentMap) {
        if (i.child === scCode) {
            return i.parent;
        }
    }
    return null;
}

function getEmptyTable() {
  const table = [];
  for (const code of allCode) {
    table.push({
      scCode: code,
      scName: properties[code].name,
      depth: properties[code].depth,
      values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 0
    });
  }
  return table;
}

function getSum(arr) {
  let sum = 0;
  for (const i of arr) {
    sum += i;
  }
  return sum;
}

module.exports = function(data) {
  const table = getEmptyTable();

  for (const record of data) {
    const bi = getBranchIndex(record.branchName);
    const ri = getTableRowIndex(record.incomeCodeSc)
    const parentArray = getParentArray(record.incomeCodeSc);
    if (bi === -1 || ri === -1 || parentArray === null) continue;
    table[ri].values[bi] += record.amountOfMoney;
    
    for (const parent of parentArray) {
        const pri = getTableRowIndex(parent);
        table[pri].values[bi] += record.amountOfMoney;
    }
  }

  for (const row of table) {
    row.total = getSum(row.values);
  }

  return table;

  /**
   * _id: { type: String },
   * receiptDate: { type: String },
   * paymentLocation: { type: String },
   * departmentName: { type: String },
   * receiptNumber: { type: String },
   * branchName: { type: String },
   * accountCode: { type: String },
   * incomeListKku: { type: String },
   * incomeCodeSc: { type: String },
   * incomeListSc: { type: String },
   * details: { type: String },
   * receivingType: { type: String },
   * dateDeposit: { type: String },
   * checkNumber: { type: String },
   * checkDate: { type: String },
   * amountOfMoney: { type: Number },
   */
};
