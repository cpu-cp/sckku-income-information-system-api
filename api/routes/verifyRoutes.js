const router = require("express").Router();
const mongoose = require("mongoose");
_ = require("underscore");

const recordKkufmisCollection = require("../models/recordKkufmisModel");
const recordIncomeCollection = require("../models/recordIncomeModel");

const parentDict = [
    ['410100000'],
    ['410102000', '410102001', '410102002', '410102003', '410102004', '410102005', '410102006', '410102007', '410102999',
        '410103000', '410103001', '410103002', '410103003', '410103004', '410103006', '410103007', '410103008', '410103009',
        '410103010', '410103011', '410103013-1', '410103013-2', '410103999', '410104000', '410104001', '410104002'],
    ['410105000', '410105001', '410105002', '410105003', '410106000', '410106002', '410106004', '410106999'],
    ['410300000', '410301000', '410301001', '410301002', '410301003', '410301014', '410301015', '410301017', '410302000',
        '410302001', '410302002', '410303000', '410303001', '410304000', '410304001', '410304002'],
    ['410400000', '410401000', '410401003', '410402000', '410402001', '410403000', '410403001', '410404000', '410404001',
        '410404002', '410404003', '410404007', '410404008', '410404011', '410404013'],
    ['410500000', '410501000', '410502000', '410503000', '410505000'],
    ['410600000', '410601000', '410602000', '410603000', '410604000', '410605000'],
    ['410800000', '410803000', '410804000', '410805000', '410806000', '410807000', '410808000'],
    ['411300000', '411301000', '411302000', '411303000', '411304000'],
    ['999999912'],
    ['411000000', '411001000', '411002000'],
    ['999999914'],
    ['999999915'],
    ['999999916'],
    ['999999917'],
    ['411200000', '411203000', '411204000', '411205000', '411206000', '411207000', '411208000', '411209000', '411210000', '411211000', '411299000']
]

router.get("/", async (req, res, next) => {
    try {
        const kkufmisDocs = await recordKkufmisCollection
            .find()
            .sort({ _id: -1 })
            .exec();
        if (kkufmisDocs == "") {
            res.status(401).json({
                message: "empty"
            });
            return;
        } 

        const incomeDocs = await recordIncomeCollection
            .find();
        if (incomeDocs == "") {
            res.status(401).json({
                message: "emtpy"
            });
            return;
        }

        const mergedData = [
            {
                sc: '410100000',
                kkufmis: getKKUFMISValue('410100000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410102000',
                kkufmis: getKKUFMISValue('410102000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410105000',
                kkufmis: getKKUFMISValue('410105000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410300000',
                kkufmis: getKKUFMISValue('410300000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410400000',
                kkufmis: getKKUFMISValue('410400000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410500000',
                kkufmis: getKKUFMISValue('410500000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410600000',
                kkufmis: getKKUFMISValue('410600000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '410800000',
                kkufmis: getKKUFMISValue('410800000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '411300000',
                kkufmis: getKKUFMISValue('411300000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '999999912',
                kkufmis: getKKUFMISValue('999999912', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '411000000',
                kkufmis: getKKUFMISValue('411000000', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '999999914',
                kkufmis: getKKUFMISValue('999999914', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '999999915',
                kkufmis: getKKUFMISValue('999999915', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '999999916',
                kkufmis: getKKUFMISValue('999999916', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '999999917',
                kkufmis: getKKUFMISValue('999999917', kkufmisDocs[0].incomes),
				daily: 0
            }, {
                sc: '411200000',
                kkufmis: getKKUFMISValue('411200000', kkufmisDocs[0].incomes),
				daily: 0
            }
        ]

        for (const i of incomeDocs) {
            addDailyToMergedData(i, mergedData);
        }

        res.status(201).json(mergedData);

    } catch (err) {
        console.error(err);
    }
});

function addDailyToMergedData(income, mergedData) {
    const parent = findParentCode(income.incomeCodeSc);
    console.log(parent);
    if (parent === null) return;
    for (const i of mergedData) {
        if (i.sc === parent)
            i.daily += income.amountOfMoney;
    }
}

function findParentCode(code) {
    for (const i of parentDict) {
        for (const j of i) {
            if (code == j) {
                return i[0];
            }
        }
    }
    return null;
}

function getKKUFMISValue(code, kkufmisIncomes) {
    for (const i of kkufmisIncomes) {
        if (i.sc == code) {
            return i.value;
        }
    }
}

module.exports = router;
