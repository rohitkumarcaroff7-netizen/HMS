

const validate =(Schema) => async (req,res,next) => {

    try {
        const data = await Schema.parseAsync(req.body);
        req.body = data;
        next();

    } catch (err) {
        const status = 422;
        const message="Fill the data properly";
        const extraDetails=err.errors[0];
        const error={
            status,message,extraDetails
                    };
        console.log(error);
        next(error);
        // res.status(400).json({msg:message});
    }
}
module.exports = validate;