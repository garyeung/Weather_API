import {rateLimit} from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60*1000, // 1 minute
    limit: 10,     // limit each IP to 10 requests per 'window'
    standardHeaders: true
})