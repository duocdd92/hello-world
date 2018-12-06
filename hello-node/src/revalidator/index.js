const revalidator = require('revalidator');

console.log(revalidator.validate({ body: 'TP1234567890', b: 'a' }, {
    properties: {
        // url: {
        //     description: 'the url the object should be stored at',
        //     type: 'string',
        //     pattern: '^/[^#%&*{}\\:<>?\/+]+$',
        //     required: true
        // },
        // challenge: {
        //     description: 'a means of protecting data (insufficient for production, used as example)',
        //     type: 'string',
        //     minLength: 5
        // },
        body: {
            type: 'string',
            required: true,
            pattern: /^[a-zA-Z]{2}[0-9]{10}$/
        },
        b: {
            type: 'string',
            enum: ['a', 'b']
        }
    }
}, { cast: true }));