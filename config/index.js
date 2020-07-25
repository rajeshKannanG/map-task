import config from '12factor-config'
const cfg = config ({
    host : {
        env: 'DBURL',
        type: 'string',
        default: 'mongodb://127.0.0.1:27017/testdb'
    },
    port : {
        env: 'Port',
        type: 'integer',
        default: '3030'
    }
})

module.exports = cfg