import controller from '../../controller'
import {Router} from 'express';



const router=Router();
router.post('/postpassenger', controller.passengercontroller.postpassenger);
router.get('/getpassenger', controller.passengercontroller.getpassenger);
router.delete('/deletepassenger/:id', controller.passengercontroller.deletepassenger);
router.put('/updatepassenger/:id', controller.passengercontroller.updatepassenger);



export default router;