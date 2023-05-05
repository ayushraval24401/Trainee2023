// import userRoutes from '../routes/auth/authroutes'
// import dataRoutes from '../routes/auth/dataroutes'

// export default{
//     userRoutes,
//     dataRoutes
// }
import express from 'express';
import trainroutes from '../routes/auth/trainroutes';
import stationroutes from '../routes/auth/stationroutes';
import bookingroutes from '../routes/auth/bookingroutes';
import passengerroutes from '../routes/auth/passengerroutes';

const router = express.Router();
router.use(trainroutes);
router.use(stationroutes);
router.use(bookingroutes);
router.use(passengerroutes)

export default router;

