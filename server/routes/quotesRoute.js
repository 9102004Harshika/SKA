import express from 'express';
import{
    createQuote,
    getQuote
} from '../controllers/quotesController.js'
const router=express.Router()
router.post('/add',createQuote)
router.get('/getQuote',getQuote)
export default router;