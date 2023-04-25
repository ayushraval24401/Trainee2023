import mongoose from 'mongoose';
import fetchData from './jsondata';

const dbURI = 'mongodb://127.0.0.1:27017/Drug_Management_System';

async function mongoDbData() {
    mongoose.connect(dbURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB', err));


    const userSchema = new mongoose.Schema({
        drug_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }],
        first_name: String,
        last_name: String,
        email: String,
        gender: String
    });
    const User = mongoose.model('customer_details', userSchema);
    const userData = User.find();
    return userData
    // console.log(userData)

}
mongoDbData().then((result) => {
    console.log(result)
})


// async function findUserData() {
//     try {
//         const options = {
//             useNewUrlParser: true
//         } as mongoose.ConnectOptions;

//         mongoose.connect(dbURI, options);
//         console.log('Connected to MongoDB');

//         const User = mongoose.model('customer_details', new mongoose.Schema({
//             drug_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }],
//             first_name: String,
//             last_name: String,
//             email: String,
//             gender: String
//         }));

//         const userData = await User.find();
//         console.log(userData);
//         return userData;
//     } catch (error) {
//         console.error('Error connecting to MongoDB', error);
//         throw error;
//     } finally {
//         await mongoose.disconnect();
//         console.log('Disconnected from MongoDB');
//     }
// }

// findUserData().then((result) => {
//     console.log(result);
// }).catch((error) => {
//     console.error(error);
// });


//console.log(User)
// module.exports = User;

// Create a model
// const User1 = require('./models/user');

// User.find({}, (err, users) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(users);
//   }
// });


// Async await

async function add(params: number, x: number) {
    return params + x

}
console.log(add(2, 9))

function add1(x: number, y: number) {
    return new Promise((resolve, reject) => {
        resolve(x + y)
    })
}
add1(44, 4).then((result) => {
    console.log(result)
})


// IMPORT data

fetchData(); // calls the fetchData function and logs the JSON object to the console



async function dataDisplay() {

    return new Promise((resolve, reject) => {
        resolve(fetchData())
    })
}
dataDisplay().then((result) => {
    console.log(result)
})

console.log("Alok")


const dbData = (a: any, b: number, c: number) => {
    return new Promise((resolve, reject) => {

        resolve(a + b + c)
    })
}

const addd = async () => {
 const sum1 = await dbData(22,22,34);
 const sum2 = await dbData(sum1,2,3);
 return sum2;
}
addd().then((value)=>{
console.log(value)
})
