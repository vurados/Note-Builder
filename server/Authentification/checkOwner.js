const {Layout, User} = require('../models')

const checkOwner = (Model) => async (req, res, next) => {
    try {
        //TODO: if(Model === Note)
        const record = await Model.findByPk(req.params.id, {
            include:[
                {
                    model:Layout,
                    as: 'Layout',
                    include: {
                        model: User,
                        as: 'User',
                    },
                }
            ]
        })
        // TODO: if(Model === Layout)

        if(!record){
            return res.status(401).send('resource not found')
        }

        const layout = record.Layout
        const user = layout.User

        if(user.id !== req.user.id){
            return res.status(403).send('Access denied, you dont own a record')
        }

        req.record = record
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send('Server busy handling your problems, so you dont have to')
    }
}

module.exports = {checkOwner}