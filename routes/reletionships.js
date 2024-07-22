import express from 'express';
import { addReletionship, deleteReletionship, getReletionships } from '../controllers/reletionship.js';

 const router = express.Router()

 router.get('/', getReletionships);
 router.post('/', addReletionship);
 router.delete('/', deleteReletionship);

 export default router