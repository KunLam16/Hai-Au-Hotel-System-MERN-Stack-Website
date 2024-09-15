const mongoose = require('mongoose');


const AccountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
// const managerAccountSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, required: true, default: 'manager' }
// });

const customerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true }
});
const managerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true }
});
const employeeSchema = new mongoose.Schema({
    _id: {type: String,required: true, unique: true },
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
});
const roomSchema = new mongoose.Schema({
    _id: String,
    type: String,
    status: String,
    description: String,
    price: Number,
    image: String, // Đường dẫn đến ảnh
    name: String
});
const servicesSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
    price: Number,
    image: String, // Đường dẫn đến ảnh
    
},{ collection: 'services' });
const bookedRoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    status: { type: String,  default: 'pending' },
    customerId: { type: String, required: true }
}, { collection: 'roomsbookings' }); // Chỉ định tên collection

const bookedServiceSchema = new mongoose.Schema({
    serviceId: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String,  default: 'not paid' },
    customerId: { type: String, required: true }
}, { collection: 'servicesbookings' }); // Chỉ định tên collection

const paymentSchema = new mongoose.Schema({
    roomsbookingId: { type: String, required: true },
    servicesbookingId: [{ type: String, required: true }],
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String },
    method: { type: String, required: true }
  },{ collection: 'payments' });

const BillSchema = new mongoose.Schema({
    paymentId: { type: String, required: true },
    customerId: { type: String, required: true },
    invoicePath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
},{ collection: 'bills' });

const reportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    employeeId: { type: String, required: true },
    reportPath: { type: String, required: true }
},{ collection: 'reports' });

const Account = mongoose.model('Account', AccountSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Manager = mongoose.model('Manager', managerSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Room = mongoose.model('Room', roomSchema);
const Service = mongoose.model('Service', servicesSchema);
const BookedRoom = mongoose.model('BookedRoom', bookedRoomSchema);
const BookedService = mongoose.model('BookedService', bookedServiceSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Bill = mongoose.model('Bill', BillSchema);
const Report = mongoose.model('Report', reportSchema);
// const ManagerAccount = mongoose.model('Account', managerAccountSchema);

module.exports = { Account, Customer,Manager,Employee,Room,BookedRoom,Service,BookedService,Payment,Bill,Report };
