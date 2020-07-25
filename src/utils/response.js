'use strict'
export const filterVal = async (data, value, type) => {
    if (type == 'c') {
        return data.filter(x => x[value]).map(y => { return y[value] }).toString()
    } else {
        return data[value].toString()
    }

}

export const calculateRatio = async (num_1, num_2) => {
    for (let num = num_2; num > 1; num--) {
        if ((num_1 % num) == 0 && (num_2 % num) == 0) {
            num_1 = num_1 / num;
            num_2 = num_2 / num;
        }
    }
    let ratio = num_1 + ":" + num_2;
    return ratio;
}


export const mergeTwo = async (data) => {
    let result = {}
    data.forEach(element => {
        for (let key in element) {
            let value = element[key]
            if (!result[key]) {
                result[key] = []
            }
            result[key] = [...result[key], ...value]
        }
    })
    return result
}
export const staticResponse = async (msg) => {

    const dataOne = {
        CountryCode: [{ 91: 'India' }, { 61: 'Australia' }],
        States: {
            India: ["Karnataka", "Delhi", "Maharashtra", "TamilNadu"],
            Australia: ["Queensland", "Tasmania", "Victoria"]
        }
    }

    const dataTwo = {
        India: ["TamiNadu", "Andra pradesh", "Bihar", "Maharashtra"],
        Australia: ["Westren Australia"]
    }

    const dataThree = [
        {
            "country": "India",
            "population": 5000,
            "populationbygender": [
                {
                    "male": 3000
                },
                {
                    "female": 2000
                }
            ],
            "populationbyage": [
                {
                    "18": 1000
                },
                {
                    "30": 1000
                },
                {
                    "50": 3000
                }
            ],
            "TotalVechilescount": 8000,
            "Vechilecountbysector": [
                {
                    "Public": 5000
                },
                {
                    "Private": 2500
                },
                {
                    "others": 500
                }
            ]
        },
        {
            "country": "China",
            "population": 8000,
            "populationbygender": [
                {
                    "male": 6000
                },
                {
                    "female": 2000
                }
            ],
            "populationbyage": [
                {
                    "18": 2000
                },
                {
                    "30": 2000
                },
                {
                    "50": 4000
                }
            ],
            "TotalVechilescount": 4000,
            "Vechilecountbysector": [
                {
                    "Public": 1000
                },
                {
                    "Private": 2000
                },
                {
                    "others": 1000
                }
            ]
        },
        {
            "country": "UAE",
            "population": 7000,
            "populationbygender": [
                {
                    "male": 3000
                },
                {
                    "female": 4000
                }
            ],
            "populationbyage": [
                {
                    "18": 1000
                },
                {
                    "30": 3000
                },
                {
                    "50": 3000
                }
            ],
            "TotalVechilescount": 10000,
            "Vechilecountbysector": [
                {
                    "Public": 5000
                },
                {
                    "Private": 2500
                },
                {
                    "others": 2500
                }
            ]
        },
        {
            "country": "UK",
            "population": 12000,
            "populationbygender": [
                {
                    "male": 7500
                },
                {
                    "female": 4500
                }
            ],
            "populationbyage": [
                {
                    "18": 6000
                },
                {
                    "30": 2000
                },
                {
                    "50": 4000
                }
            ],
            "TotalVechilescount": 2000,
            "Vechilecountbysector": [
                {
                    "Public": 500
                },
                {
                    "Private": 1000
                },
                {
                    "others": 1000
                }
            ]
        }
    ]

    if (msg == 'one') {
        return dataOne
    } else if (msg == 'two') {
        return dataTwo
    } else {
        return dataThree
    }
}



