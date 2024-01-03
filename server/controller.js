const serie = require('./data_models');

exports.createSerie = async (req, res) => {
    try 
    {
        // get the serie from the body
        const serieData = await req.body;
        //create a new serie then save
        await serie.create(serieData)
            .then((createdserie) => {
                if (!createdserie) return res.status(404)
                    .json({
                        success: false,
                        message: "serie creation failed",
                        error: "Unable get created serie"
                    })
                res.status(201)
                    .json({
                        success: true,
                        createdserie
                    })
            })
            .catch((error) => {
                res.status(404)
                .json({
                    success: false,
                    error: error.message
                })
            })
    } 
    catch (error) {
        res.status(500)
            .json({
                success: false,
                message: "Internal server error"
            })
    }
}

// define the get route
exports.createSerie = async (req, res) => {
    try 
    {
        // get the serie from the body
        const serieData = await req.body;
        //create a new serie then save
        await serie.create(serieData)
            .then((createdserie) => {
                if (!createdserie) return res.status(404)
                .json({
                    success: false,
                    message: "serie creation failed",
                    error: "Unable get created serie"
                })
                res.status(201)
                .json({
                    success: true,
                    createdserie
                })
            })
            .catch((error) => {
                res.status(404)
                .json({
                    success: false,
                    error: error.message
                })
            })
    } 
    catch (error) {
        res.status(500)
        .json({
            success: false,
            message: "Internal server error"
        })
    }
}
  
exports.getSeries = async (req, res) => {
    //get all the data in the model and return it as response
    try 
    {
        serie.find()
            .then((allseries) => {
                res.status(200)
                .json({
                    success: true,
                    allseries
                })
            })
            .catch((error) => {
                res.status(404)
                    .json({
                        success: false,
                        message: "Cant fined ",
                        error
                    })
            })
    } 
    catch (error) {
        res.status(500)
            .json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
    }
}