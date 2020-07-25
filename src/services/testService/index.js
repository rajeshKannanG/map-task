'use-strict'
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import { staticResponse, filterVal, mergeTwo, calculateRatio } from '../../utils/response'
const app = express(feathers())

const response = (status, data, res) => {
    res.status(status)
    res.send(JSON.stringify(data))
}


app.post('/question-set-one/task-one', async (req, res) => {
    try {
        const countryCode = req.body.countryCode || ''
        if (countryCode == '') {
            return response(400, { error: true, msg: 'countryCode missing' }, res)
        }
        let dataOne = await staticResponse('one')
        const country = dataOne.CountryCode
        const states = dataOne.States
        const countryName = await filterVal(country, countryCode, 'c') || ''
        //const country = dataOne.CountryCode.filter( x => x[countryCode]).map(y => { return y[countryCode]}).toString()
        if (!countryName) {
            return response(400, { error: true, msg: 'Incorrect country code' }, res)
        }
        const statesName = await filterVal(states, countryName, 's') || ''
        const data = {
            countryName: `${countryName.toString()}`,
            statesName: `${statesName.toString()}`
        }

        return response(200, { error: false, data }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-one/task-two', async (req, res) => {
    try {
        let dataOne = await staticResponse('one')
        const states = dataOne.States
        let displayArray = []
        for (let key in states) {
            let value = states[key]
            displayArray.push(value[0])
        }
        const data = {
            states: `First value of each key: ${displayArray.toString()}`
        }
        return response(200, { error: false, data }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-one/task-three', async (req, res) => {
    try {
        let dataOne = await staticResponse('one')
        const states = dataOne.States
        let displayArray = []
        for (let key in states) {
            let value = states[key]
            displayArray.push(value[value.length - 1])
        }
        const data = {
            states: `Last value of each key: ${displayArray.toString()}`
        }
        return response(200, { error: false, data }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-one/task-five', async (req, res) => {
    try {
        const dataOne = await staticResponse('one')
        const dataTwo = await staticResponse('two')
        const states = dataOne.States
        const finalOne = [states, dataTwo]
        const finalObj = await mergeTwo(finalOne)
        return response(200, { error: false, finalObj }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-one/task-six', async (req, res) => {
    try {
        const dataOne = await staticResponse('one')
        const dataTwo = await staticResponse('two')
        const states = dataOne.States
        const finalOne = [states, dataTwo]
        const finalObj = await mergeTwo(finalOne)
        for (let key in finalObj) {
            finalObj[key] = finalObj[key].filter((data, index) => finalObj[key].indexOf(data) === index)
        }
        return response(200, { error: false, statesObj: finalObj }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})



app.get('/question-set-two/task-one', async (req, res) => {
    try {
        const dataThree = await staticResponse('three')
        let maxPopulation = dataThree.reduce((max, p) => p.population > max ? p.population : max, dataThree[0].population)
        let minPopulation = dataThree.reduce((max, p) => p.population < max ? p.population : max, dataThree[0].population)
        let maxPopulationCountry = []
        let minPopulationCountry = []
        for (let index = 0; index < dataThree.length; index++) {
            const element = dataThree[index]
            if (element.population == maxPopulation) {
                maxPopulationCountry.push(element.country)
            }
            if (element.population == minPopulation) {
                minPopulationCountry.push(element.country)
            }
        }
        maxPopulationCountry = maxPopulationCountry.toString()
        minPopulationCountry = minPopulationCountry.toString()
        return response(200, {
            error: false,
            maxPopulationCountry,
            maxPopulation,
            minPopulationCountry,
            minPopulation
        }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-two/task-two', async (req, res) => {
    try {
        const dataThree = await staticResponse('three')
        let maleFemaleArray = []
        for (let index = 0; index < dataThree.length; index++) {
            const element = dataThree[index].populationbygender
            let tmp = {}
            tmp.country = dataThree[index].country
            for (let index = 0; index < element.length; index++) {
                const data = element[index]
                if (data.male) {
                    tmp.male = data.male
                }
                if (data.female) {
                    tmp.female = data.female
                }
            }
            maleFemaleArray.push(tmp)
        }
        let maxPopulation = maleFemaleArray.reduce((max, p) => p.male > max ? p.male : max, maleFemaleArray[0].male)
        let minPopulation = maleFemaleArray.reduce((max, p) => p.male < max ? p.male : max, maleFemaleArray[0].male)
        let maxMalePopulationCountry = []
        let minMalePopulationCountry = []
        for (let index = 0; index < maleFemaleArray.length; index++) {
            const element = maleFemaleArray[index];
            if (element.male == maxPopulation) {
                maxMalePopulationCountry.push(element.country)
            }
            if (element.male == minPopulation) {
                minMalePopulationCountry.push(element.country)
            }
        }
        maxMalePopulationCountry = maxMalePopulationCountry.toString()
        minMalePopulationCountry = minMalePopulationCountry.toString()
        return response(200, {
            error: false,
            maxMalePopulationCountry,
            maxPopulation,
            minMalePopulationCountry,
            minPopulation
        }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})


app.get('/question-set-two/task-three', async (req, res) => {
    try {
        const dataThree = await staticResponse('three')
        let maleFemaleArray = []
        for (let index = 0; index < dataThree.length; index++) {
            const element = dataThree[index].populationbygender
            let tmp = {}
            tmp.country = dataThree[index].country
            for (let index = 0; index < element.length; index++) {
                const data = element[index]
                if (data.male) {
                    tmp.male = data.male
                }
                if (data.female) {
                    tmp.female = data.female
                }
            }
            maleFemaleArray.push(tmp)
        }
        for (let index = 0; index < maleFemaleArray.length; index++) {
            const element = maleFemaleArray[index]
            element.ratio = await calculateRatio(element.male, element.female)
            element.ratio = `male:female = ${element.ratio}`
        }
        return response(200, {
            error: false,
            data: maleFemaleArray
        }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-two/task-four', async (req, res) => {
    try {
        const dataThree = await staticResponse('three')
        let displayArray = []
        for (let index = 0; index < dataThree.length; index++) {
            const element = dataThree[index]
            let tmp = {}
            tmp.country = element.country
            tmp.population = element.population
            tmp.TotalVechilescount = element.TotalVechilescount
            let ratio = await calculateRatio(element.population, element.TotalVechilescount)
            tmp.ratio = `person:vechile = ${ratio}`
            displayArray.push(tmp)
        }
        return response(200, {
            error: false,
            data: displayArray
        }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-two/task-five', async (req, res) => {
    try {
        const dataThree = await staticResponse('three')
        let displayArray = []
        for (let index = 0; index < dataThree.length; index++) {
            const element = dataThree[index].Vechilecountbysector
            let tmp = {}
            tmp.country = dataThree[index].country
            tmp.TotalVechilescount = dataThree[index].TotalVechilescount
            for (let index = 0; index < element.length; index++) {
                const data = element[index]
                if (data.Public) {
                    tmp.Public = data.Public
                    let percentage = ((data.Public * 100) / tmp.TotalVechilescount)
                    tmp.percentageOfPublic = `Public sector is ${percentage}%`
                }
                if (data.Private) {
                    tmp.Private = data.Private
                    let percentage = ((data.Private * 100) / tmp.TotalVechilescount)
                    tmp.percentageOfPrivate = `Private sector is ${percentage}%`
                }
                if (data.others) {
                    tmp.others = data.others
                    let percentage = ((data.others * 100) / tmp.TotalVechilescount)
                    tmp.percentageOfOthers = `Other sector is ${percentage}%`
                }
            }
            displayArray.push(tmp)
        }

        return response(200, {
            error: false,
            data: displayArray
        }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})

app.get('/question-set-two/task-six', async (req, res) => {
    try {
        const dataThree = await staticResponse('three')
        let displayArray = []
        for (let index = 0; index < dataThree.length; index++) {
            const element = dataThree[index].Vechilecountbysector
            let tmp = {}
            tmp.country = dataThree[index].country
            tmp.TotalVechilescount = dataThree[index].TotalVechilescount
            if (tmp.country == 'China') {
                for (let index = 0; index < element.length; index++) {
                    const data = element[index]
                    if (data.Public) {
                        tmp.Public = data.Public
                        let percentage = ((data.Public * 100) / tmp.TotalVechilescount)
                        tmp.percentageOfPublic = `Public sector is ${percentage}%`
                    }
                }
                displayArray.push(tmp)
            }
        }

        return response(200, {
            error: false,
            data: displayArray
        }, res)
    } catch (error) {
        console.log('Error:', error)
        return response(200, { error: true, msg: 'Internal server erro' }, res)
    }
})


export default app