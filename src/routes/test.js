'use-strict'
import testService from 'services/testService'

export default (app) => {
    app.use('/task', testService)
}
