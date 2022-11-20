import {publicProcedure, router} from "./index";
import {z} from 'zod'
export const productRouter = router({
    get: publicProcedure?.input(z.string())?.query(()=>{
        return true
    })
})