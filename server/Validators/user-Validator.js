//for validating the user data

const z =require('zod');

const signupSchema = z.object({

    username: z.string({required_error:"Name is required."}).trim()
    .min(3,{message:"Name must atlest of 3 charachters"})
    .max(50,{message:"Name must be less than 50 charachters"}),

    email: z.string({required_error:"Email is required."}).trim()
                    .email({message:"Invalid email"}),

    phone: z.string({required_error:"PH num required."})
    .trim()
    .min(10,{message:"10 digit ph no required"})
    .max(10,{message:"10 digit ph no required"}),

    password: z.string({required_error:"Pass is required"}).trim()
    .min(6,{message:"min 6 ch pass required"})
    .max(20,{message:"max 20 pass characters"})

});
module.exports = signupSchema;