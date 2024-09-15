const port = 5000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Account, Customer,Manager,Employee,Room,BookedRoom,Service,BookedService,Payment,Bill,Report } = require('./models');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(bodyParser.json());

//Kết nối MongoDB
const mongoURI = 'mongodb+srv://lam16:kpLXsWXfG6IDIkn9@cluster0.n3l8nds.mongodb.net/HotelM';
mongoose.connect(mongoURI);



// API đăng nhập
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Account.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        }

        let fullname = '';
        let customerId = '';
        let employeeId = '';
        if (user.role === 'customer') {
            const customer = await Customer.findOne({ username: user.username });
            fullname = customer ? customer.fullname : '';
            customerId = customer ? customer._id.toString() : '';  // Lấy mã khách hàng
        } else if (user.role === 'manager') {
            const manager = await Manager.findOne({ username: user.username });
            fullname = manager ? manager.fullname : '';
        } else if (user.role === 'employee') {
            const employee = await Employee.findOne({ username: user.username });
            fullname = employee ? employee.fullname : '';
            employeeId = employee ? employee._id.toString() : '';  // Lấy mã nhân viên
        }

        const token = jwt.sign({ username: user.username, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, fullname, customerId, employeeId }); // Trả về mã khách hàng
    } catch (error) {
        console.error('Lỗi trong API đăng nhập:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});


// API đăng ký khách hàng
app.post('/signup', async (req, res) => {
    try {
        const { username, fullname, email, phone, password } = req.body;

        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới
        const newAccount = new Account({ username, email, password: hashedPassword, role: 'customer' });
        await newAccount.save();

        // Tạo thông tin khách hàng mới
        const newCustomer = new Customer({ username, fullname, phone });
        await newCustomer.save();

        const token = jwt.sign({ username: newAccount.username, role: newAccount.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Lỗi trong API đăng ký:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

//API tạo tài khoản quản lý
app.post('/managersignup', async (req, res) => {
    try {
        const { username, fullname, email, phone, password } = req.body;

        // Kiểm tra xem tài khoản đã tồn tại chưa
        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới
        const newAccount = new Account({ username, email, password: hashedPassword, role: 'manager' });
        await newAccount.save();

        // Tạo thông tin quản lý mới
        const newManager = new Manager({ username, fullname, phone });
        await newManager.save();

        const token = jwt.sign({ username: newAccount.username, role: newAccount.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Lỗi trong API đăng ký:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Phục vụ các tệp tĩnh từ thư mục RoomImages, ServiceImages, bill
app.use('/RoomImages', express.static(path.join(__dirname, 'RoomImages')));
app.use('/ServiceImages', express.static(path.join(__dirname, 'ServiceImages')));
app.use('/bill', express.static(path.join(__dirname, 'bill')));


// API lấy danh sách phòng
app.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phòng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
//API lấy danh sách dịch vụ
app.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
// API lấy chi tiết phòng
app.get('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findOne({ _id: req.params.id });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// API lấy chi tiết dịch vụ
app.get('/services/:id', async (req, res) => {
    try {
        const service = await Service.findOne({ _id: req.params.id });
        if (!service) {
            return res.status(404).json({ message: 'Không tìm thấy dịch vụ' });
        }
        res.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});


//API đặt phòng
app.post('/book-room', async (req, res) => {
    try {
        const { customerId, roomId, checkInDate, checkOutDate } = req.body;

        // Tạo đối tượng đặt phòng mới
        const newBooking = new BookedRoom({
            customerId,
            roomId,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            status: 'pending'
        });

        // Lưu vào MongoDB
        await newBooking.save();

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Đặt phòng thành công!', booking: newBooking });
    } catch (error) {
        console.error('Lỗi khi đặt phòng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
//API đặt dịch vụ
app.post('/book-service', async (req, res) => {
    try {
        const { customerId, serviceId, date } = req.body;

        // Tạo đối tượng đặt phòng mới
        const newServiceBooking = new BookedService({
            customerId,
            serviceId,
            date: new Date(date),
            status: 'not paid'
        });

        // Lưu vào MongoDB
        await newServiceBooking.save();

        // Trả về phản hồi thành công
        res.status(201).json({ message: 'Đặt dịch vụ thành công!', booking: newServiceBooking });
    } catch (error) {
        console.error('Lỗi khi đặt dịch vụ:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API lấy danh sách đặt phòng của khách hàng với thông tin phòng
app.get('/bookings/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;

        // Tìm tất cả các đặt phòng của khách hàng
        const bookings = await BookedRoom.find({ customerId });

        // Lấy thông tin phòng cho từng đặt phòng
        const roomIds = bookings.map(booking => booking.roomId);
        const rooms = await Room.find({ _id: { $in: roomIds } });

        // Tạo bản đồ phòng để tra cứu dễ dàng
        const roomsMap = rooms.reduce((acc, room) => {
            acc[room._id.toString()] = room;
            return acc;
        }, {});

        // Kết hợp thông tin phòng vào các đặt phòng
        const bookingsWithRoomDetails = bookings.map(booking => ({
            ...booking.toObject(),
            room: roomsMap[booking.roomId.toString()],
        }));

        res.json(bookingsWithRoomDetails);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đặt phòng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
// API hủy đặt phòng
app.delete('/cancel-booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Xóa đặt phòng khỏi cơ sở dữ liệu
        const deletedBooking = await BookedRoom.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Không tìm thấy đặt phòng' });
        }

        res.json({ message: 'Đã hủy đặt phòng thành công!' });
    } catch (error) {
        console.error('Lỗi khi hủy đặt phòng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API lấy danh sách đặt dịch vụ của khách hàng với thông tin dịch vụ
app.get('/sbookings/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;

        // Tìm tất cả các đặt đặt dịch vụ  của khách hàng
        const bookings = await BookedService.find({ customerId });

        // Lấy thông tin dịch vụ  cho từng đặt dịch vụ 
        const serviceIds = bookings.map(booking => booking.serviceId);
        const services = await Service.find({ _id: { $in: serviceIds } });

        // Tạo bản dịch vụ để tra cứu dễ dàng
        const servicesMap = services.reduce((acc, service) => {
            acc[service._id.toString()] = service;
            return acc;
        }, {});

        // Kết hợp thông tin dịch vụ vào các đặt dịch vụ
        const bookingsWithServiceDetails = bookings.map(booking => ({
            ...booking.toObject(),
            service: servicesMap[booking.serviceId.toString()],
        }));

        res.json(bookingsWithServiceDetails);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đặt dịch vụ:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API lấy chi tiết đặt phòng
app.get('/bookings/details/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await BookedRoom.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy đặt phòng' });
        }

        const room = await Room.findById(booking.roomId);
        if (!room) {
            return res.status(404).json({ message: 'Không tìm thấy phòng' });
        }

        res.json({ ...booking.toObject(), room });
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đặt phòng:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API lấy danh sách dịch vụ chưa thanh toán cho booking
app.get('/servicesbookings/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await BookedRoom.findById(bookingId);
        
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy đặt phòng' });
        }

        const servicesBookings = await BookedService.find({ customerId: booking.customerId, status: 'not paid' });

        res.json(servicesBookings);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ chưa thanh toán:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
//API thanh toán tiền mặt
app.post('/payments/cash', async (req, res) => {
    try {
        const { roomsbookingId, servicesbookingId, amount } = req.body;

        const newPayment = new Payment({
            roomsbookingId,
            servicesbookingId,
            amount,
            status: 'pending',
            method: 'cash'
        });

        await newPayment.save();

        res.status(201).json({ message: 'Thanh toán bằng tiền mặt thành công!', payment: newPayment });
    } catch (error) {
        console.error('Lỗi khi thanh toán bằng tiền mặt:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
//API thanh toán trực tuyến
app.post('/payments/paypal', async (req, res) => {
    try {
        const { roomsbookingId, servicesbookingId, amount } = req.body;

        const newPayment = new Payment({
            roomsbookingId,
            servicesbookingId,
            amount,
            status: 'pending',
            method: 'paypal'
        });

        await newPayment.save();

        res.status(201).json({ message: 'Thanh toán qua PayPal thành công!', payment: newPayment });
    } catch (error) {
        console.error('Lỗi khi thanh toán qua PayPal:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API lấy danh sách thanh toán theo customerId
app.get('/payments/:customerId', async (req, res) => {
    try {
      const { customerId } = req.params;
  
      // Tìm tất cả các bookings của khách hàng
      const roomsBookings = await BookedRoom.find({ customerId });
  
      // Lấy danh sách roomsbookingId
      const roomsbookingIds = roomsBookings.map(booking => booking._id.toString());
  
      // Tìm tất cả các thanh toán liên quan đến các bookings này
      const payments = await Payment.find({ roomsbookingId: { $in: roomsbookingIds } });
  
      // Tạo bản đồ rooms để tra cứu dễ dàng
      const roomsMap = {};
      for (const booking of roomsBookings) {
        const room = await Room.findById(booking.roomId);
        roomsMap[booking._id.toString()] = { ...booking.toObject(), room };
      }
  
      // Kết hợp thông tin phòng vào các thanh toán
      const paymentsWithRoomDetails = payments.map(payment => ({
        ...payment.toObject(),
        roomDetails: roomsMap[payment.roomsbookingId]
      }));
  
      res.json(paymentsWithRoomDetails);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách thanh toán:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  });


//API kiểm tra xem roomsbookingId đã có trong payments chưa
app.get('/payments/check/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Tìm thanh toán dựa trên mã đặt phòng
        const payment = await Payment.findOne({ roomsbookingId: bookingId });

        if (payment) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái thanh toán:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API thêm nhân viên
app.post('/add-employee', async (req, res) => {
    try {
        const { _id, username, fullname, email, phone, password } = req.body;

        // Kiểm tra xem _id đã tồn tại trong collection employee chưa
        const existingEmployee = await Employee.findById(_id);
        if (existingEmployee) {
            return res.status(400).json({ message: 'ID nhân viên đã tồn tại' });
        }

        // Kiểm tra xem tài khoản đã tồn tại chưa
        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới
        const newAccount = new Account({ username, email, password: hashedPassword, role: 'employee' });
        await newAccount.save();

        // Tạo thông tin nhân viên mới
        const newEmployee = new Employee({ _id, username, fullname, phone });
        await newEmployee.save();

        const token = jwt.sign({ username: newAccount.username, role: newAccount.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Lỗi trong API thêm nhân viên:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// API để lấy danh sách booking có trạng thái "pending"
app.get('/manage-bookings', async (req, res) => {
    try {
        const pendingBookings = await BookedRoom.find({ status: 'pending' });

        const bookingDetails = await Promise.all(pendingBookings.map(async (booking) => {
            const room = await Room.findById(booking.roomId);
            const customer = await Customer.findById(booking.customerId);

            if (room && customer) {
                return {
                    bookingId: booking._id,
                    roomName: room.name,
                    roomImage: room.image,
                    customerName: customer.fullname,
                    checkInDate: booking.checkInDate,
                    checkOutDate: booking.checkOutDate,
                    status: booking.status
                };
            }
        }));

        res.json(bookingDetails.filter(Boolean)); // Lọc bỏ các giá trị undefined
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách booking" });
    }
});

// API để xác nhận đặt phòng và cập nhật trạng thái phòng
app.post('/confirm-booking/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await BookedRoom.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin đặt phòng!' });
        }

        const room = await Room.findById(booking.roomId);

        if (room.status !== 'available') {
            return res.status(400).json({ error: 'Phòng không khả dụng!' });
        }

        await BookedRoom.findByIdAndUpdate(bookingId, { status: 'confirmed' });
        await Room.findByIdAndUpdate(booking.roomId, { status: 'not available' });

        res.json({ message: 'Đã xác nhận đặt phòng!' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Configuring Multer cho upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'ServiceImages/');
    },
    filename: (req, file, cb) => {
        // lưu file với tên gốc
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// API thêm dịch vụ
app.post('/services', upload.single('image'), async (req, res) => {
    try {
        const { _id, name, description, price } = req.body;
        const image = req.file.filename; // Lấy tên file ảnh

        // Kiểm tra xem _id đã tồn tại chưa
        const existingService = await Service.findById(_id);
        if (existingService) {
            return res.status(400).json({ message: 'ID này đã tồn tại. Vui lòng chọn ID khác!' });
        }

        const newService = new Service({ _id, name, description, price, image });
        await newService.save();

        res.status(201).json({ message: 'Dịch vụ đã được thêm thành công!' });
    } catch (error) {
        console.error('Error adding service:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm dịch vụ.' });
    }
});

// API kiểm tra xem service ID đã tồn tại chưa
app.get('/services-check/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existingService = await Service.findById(id);

        res.json({ exists: !!existingService });
    } catch (error) {
        console.error('Error checking service ID:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi kiểm tra ID.' });
    }
});

// API lấy table dịch vụ
app.get('/services-table', async (req, res) => {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách dịch vụ.' });
    }
  });

  // API xóa dịch vụ
app.delete('/services/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const service = await Service.findByIdAndDelete(id);
  
      if (!service) {
        return res.status(404).json({ message: 'Dịch vụ không tồn tại.' });
      }
  
      res.status(200).json({ message: 'Dịch vụ đã được xóa thành công!' });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Có lỗi xảy ra khi xóa dịch vụ.' });
    }
  });

// API để chỉnh sửa dịch vụ
app.put('/edit-service/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { name, description, price, image },
            { new: true, useFindAndModify: false }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
        }

        res.json({ message: 'Cập nhật dịch vụ thành công!', service: updatedService });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật dịch vụ' });
    }
});
  
// API lấy danh sách thanh toán với trạng thái "pending" và gộp thông tin
app.get('/manage-payment-pending', async (req, res) => {
    try {
        const payments = await Payment.find({ status: 'pending' }).lean();

        const result = await Promise.all(payments.map(async payment => {
            const booking = await BookedRoom.findById(payment.roomsbookingId).lean();
            const room = await Room.findById(booking.roomId).lean();
            const customer = await Customer.findById(booking.customerId).lean();

            return {
                ...payment,
                roomBooking: {
                    ...booking,
                    room,
                    customer
                }
            };
        }));

        res.json(result);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách thanh toán:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

// Tạo thư mục 'bill' nếu chưa tồn tại
const billsDir = path.join(__dirname, 'bill');
if (!fs.existsSync(billsDir)) {
    fs.mkdirSync(billsDir);
}

// API xác nhận thanh toán
app.put('/manage-payment-confirm/:id', async (req, res) => {
    try {
        const paymentId = req.params.id;

        // Cập nhật trạng thái payment thành 'confirmed'
        const payment = await Payment.findByIdAndUpdate(paymentId, { status: 'confirmed' }, { new: true }).lean();

        if (!payment) {
            return res.status(404).json({ message: 'Không tìm thấy thanh toán' });
        }

        // Lấy thông tin đặt phòng và các dịch vụ
        const booking = await BookedRoom.findById(payment.roomsbookingId).lean();
        if (!booking) {
            return res.status(404).json({ message: 'Không tìm thấy đặt phòng' });
        }

        const room = await Room.findById(booking.roomId).lean();
        const customer = await Customer.findById(booking.customerId).lean();

        // Lấy thông tin các dịch vụ
        const bookedServices = await BookedService.find({ _id: { $in: payment.servicesbookingId } }).lean();
        const serviceIds = bookedServices.map(serviceBooking => serviceBooking.serviceId);
        const services = await Service.find({ _id: { $in: serviceIds } }).lean();

        // Cập nhật trạng thái các dịch vụ thành 'paid'
        await BookedService.updateMany({ _id: { $in: payment.servicesbookingId } }, { status: 'paid' });

        // Cập nhật trạng thái phòng thành 'available'
        await Room.findByIdAndUpdate(booking.roomId, { status: 'available' });

        // Tính toán số đêm
        const checkInDate = new Date(booking.checkInDate);
        const checkOutDate = new Date(booking.checkOutDate);
        const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        // Tính toán tổng tiền
        const roomCost = room.price * numberOfNights;
        const serviceCost = services.reduce((total, service) => total + (service.price || 0), 0);
        const vat = (roomCost + serviceCost) * 0.1;
        const totalAmount = roomCost + serviceCost + vat;

        // Tạo một đối tượng Bill mới nhưng chưa lưu vào DB
        const newBill = new Bill({
            paymentId: payment._id.toString(), // Chuyển _id của payment thành chuỗi
            customerId: customer._id.toString(),
            invoicePath: '', // Sẽ cập nhật sau
        });

        // Lấy ID của Bill mới
        const billId = newBill._id.toString();
        const invoicePath = path.join(billsDir, `${billId}.pdf`);

        // Cập nhật invoicePath cho Bill
        newBill.invoicePath = `/bill/${billId}.pdf`;

        // Lưu Bill vào DB
        await newBill.save();

       // Tạo file PDF hóa đơn
        const doc = new PDFDocument({ margin: 30 });
        doc.pipe(fs.createWriteStream(invoicePath));

        // Sử dụng font hỗ trợ tiếng Việt
        doc.font(path.join(__dirname, 'fonts', 'RobotoSlab-VariableFont_wght.ttf'));

        // Thêm thông tin khách sạn và số hóa đơn
        doc.fontSize(10).text('KHÁCH SẠN HẢI ÂU', 30, 20);
        doc.text(`Số: ${billId}`, { align: 'right' });
        doc.moveDown();

        // Tiêu đề
        doc.fontSize(20).text('HÓA ĐƠN THANH TOÁN TỔNG HỢP', { align: 'center' });
        doc.moveDown();

        // Thông tin khách hàng và đặt phòng
        doc.fontSize(12).text(`Tên khách hàng: ${customer.fullname}`);
        doc.text(`Tên phòng: ${room.name}`);
        doc.text(`Ngày đến: ${new Date(booking.checkInDate).toLocaleDateString('vi-VN')}`);
        doc.text(`Ngày đi: ${new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}`);
        doc.text(`Số đêm: ${numberOfNights}`);
        doc.moveDown();

        // Vẽ bảng
        const tableTop = 250; // Dịch chuyển bảng xuống dưới
        const itemCodeX = 50;
        const descriptionX = 150;
        const amountX = 350;
        const lineHeight = 20;

        doc.fontSize(12).text('Dịch vụ', { underline: true });

        // Vẽ tiêu đề bảng
        doc.fontSize(10)
            .text('Mã dịch vụ', itemCodeX, tableTop)
            .text('Tên dịch vụ', descriptionX, tableTop)
            .text('Số tiền', amountX, tableTop);

        // Vẽ đường kẻ ngang
        doc.moveTo(50, tableTop + lineHeight)
            .lineTo(550, tableTop + lineHeight)
            .stroke();

        // Vẽ các hàng trong bảng
        let y = tableTop + lineHeight + 10;
        services.forEach(service => {
            doc.text(service._id, itemCodeX, y)
                .text(service.name, descriptionX, y)
                .text(service.price.toLocaleString('vi-VN') + ' VNĐ', amountX, y);
            y += lineHeight;
        });

        // Tính toán tổng tiền và thuế VAT
        y += 20; // Adjust this value to add more space between the table and the totals
        doc.text(`Tiền phòng: ${roomCost.toLocaleString('vi-VN')} VNĐ`, itemCodeX, y);
        y += lineHeight;
        doc.text(`Tổng tiền dịch vụ: ${serviceCost.toLocaleString('vi-VN')} VNĐ`, itemCodeX, y);
        y += lineHeight;
        doc.text(`VAT (10%): ${vat.toLocaleString('vi-VN')} VNĐ`, itemCodeX, y);
        y += lineHeight;
        doc.text(`Tổng cộng: ${totalAmount.toLocaleString('vi-VN')} VNĐ`, itemCodeX, y, { bold: true });
        y += lineHeight;
        doc.text('Đã bao gồm thuế GTGT', { align: 'right' });

        doc.end();

        res.json({ message: 'Đã xác nhận thanh toán!', invoicePath: newBill.invoicePath });
    } catch (error) {
        console.error('Lỗi khi xác nhận thanh toán:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});
//API lấy các hóa đơn của khách hàng
app.get('/bills/:customerId', async (req, res) => {
    const { customerId } = req.params;
    try {
        const bills = await Bill.find({ customerId });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách hóa đơn', error });
    }
});

// API Lấy danh sach nhân viên
app.get('/manage-employee', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API cập nhật thông tin nhân viên
app.put('/manage-employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }

        // Cập nhật thông tin nhân viên
        employee.fullname = req.body.fullname || employee.fullname;
        employee.phone = req.body.phone || employee.phone;

        const updatedEmployee = await employee.save();
        res.json({ message: 'Thông tin nhân viên đã được cập nhật!', employee: updatedEmployee });
    } catch (err) {
        res.status(400).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin nhân viên', error: err.message });
    }
});
// API Xóa nhân viên và tài khoản
app.delete('/manage-employee/:id', async (req, res) => {
    try {
        console.log('Deleting employee with ID:', req.params.id); // Log ID nhân viên

        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            console.log('Employee not found'); // Log nếu không tìm thấy nhân viên
            return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
        }

        const username = employee.username;
        console.log('Employee username:', username); // Log username của nhân viên

        await employee.deleteOne();

        const account = await Account.findOneAndDelete({ username });
        if (!account) {
            console.log('Account not found'); // Log nếu không tìm thấy tài khoản
            return res.status(404).json({ message: 'Không tìm thấy tài khoản của nhân viên!' });
        }

        res.json({ message: 'Đã xóa thông tin nhân viên!' });
    } catch (err) {
        console.error('Error deleting employee:', err); // Log lỗi chi tiết
        res.status(500).json({ message: err.message });
    }
});

// API Lấy danh sách khách hàng
app.get('/manage-customer', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API Cập nhật thông tin khách hàng
app.put('/manage-customer/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Không tìm thấy khách hàng!' });
        }

        // Cập nhật thông tin khách hàng
        customer.fullname = req.body.fullname || customer.fullname;
        customer.phone = req.body.phone || customer.phone;

        const updatedCustomer = await customer.save();
        res.json({ message: 'Thông tin khách hàng đã được cập nhật!', customer: updatedCustomer });
    } catch (err) {
        res.status(400).json({ message: 'Có lỗi xảy ra khi cập nhật thông tin khách hàng', error: err.message });
    }
});

// Xóa khách hàng và tài khoản
app.delete('/manage-customer/:id', async (req, res) => {
    try {
        console.log('Deleting customer with ID:', req.params.id); // Log ID khách hàng

        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            console.log('Customer not found'); // Log nếu không tìm thấy khách hàng
            return res.status(404).json({ message: 'Không tìm thấy khách hàng!' });
        }

        const username = customer.username;
        console.log('Customer username:', username); // Log username của khách hàng

        await customer.deleteOne();

        const account = await Account.findOneAndDelete({ username });
        if (!account) {
            console.log('Account not found'); // Log nếu không tìm thấy tài khoản
            return res.status(404).json({ message: 'Không tìm thấy tài khoản của khách hàng!' });
        }

        res.json({ message: 'Đã xóa thông tin khách hàng!' });
    } catch (err) {
        console.error('Error deleting customer:', err); // Log lỗi chi tiết
        res.status(500).json({ message: err.message });
    }
});

// Tạo thư mục tĩnh để lưu báo cáo PDF
const reportsDir = path.join(__dirname, 'report');
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
}

// Cấu hình thư mục tĩnh cho các file báo cáo
app.use('/report', express.static(reportsDir));


//API tạo báo cáo doanh thu
app.post('/create-revenue-report', async (req, res) => {
    try {
        const { employeeId, fullname } = req.body;
        const payments = await Payment.find().lean();
        const currentYear = new Date().getFullYear();

        // Tạo mảng lưu doanh thu hàng tháng
        const monthlyRevenue = new Array(12).fill(0);
        let totalRevenue = 0; // Khai báo biến totalRevenue

        for (const payment of payments) {
            const roomsBooking = await BookedRoom.findById(payment.roomsbookingId).lean();
            if (roomsBooking) {
                const month = new Date(roomsBooking.checkOutDate).getMonth();
                const year = new Date(roomsBooking.checkOutDate).getFullYear();
                if (year === currentYear) {
                    monthlyRevenue[month] += payment.amount;
                    totalRevenue += payment.amount;
                }
            }
        }

        // Tạo đối tượng Report mới nhưng chưa lưu vào DB
        const newReport = new Report({
            name: `Báo cáo doanh thu ${currentYear}`,
            type: 'revenue',
            date: new Date(),
            employeeId,
            reportPath: '' // Sẽ cập nhật sau
        });

        // Lấy ID của Report mới
        const reportId = newReport._id.toString();
        const filePath = path.join(reportsDir, `${reportId}.pdf`);

        // Cập nhật reportPath cho Report
        newReport.reportPath = `/report/${reportId}.pdf`;

        // Lưu Report vào DB
        await newReport.save();

       // Tạo file PDF báo cáo
       const doc = new PDFDocument();
       doc.pipe(fs.createWriteStream(filePath));

       // Sử dụng font hỗ trợ tiếng Việt
       doc.font(path.join(__dirname, 'fonts', 'RobotoSlab-VariableFont_wght.ttf'));

         // Tiêu đề
         doc.fontSize(12).text('KHÁCH SẠN HẢI ÂU', 50, 20, { align: 'left' });
         doc.fontSize(12).text(`Số: ${reportId}`, 350, 20, { align: 'right' });
         doc.moveDown();
         doc.fontSize(20).text(`BÁO CÁO DOANH THU ${currentYear}`,80,50, { align: 'center' });
         doc.moveDown();

       // Bảng báo cáo
       const tableTop = 100;
       const itemMargin = 10;
       const rowHeight = 30;

       const column1 = 50+60;
       const column2 = 150+60;
       const column3 = 250+60;
       const column4 = 450+60;

       doc.fontSize(12).text('Tháng', column1, tableTop+10,{ width: column2 - column1, align: 'center' });
       doc.text('Năm', column2, tableTop+10, { width: column3 - column2, align: 'center' });
       doc.text('Doanh thu', column3, tableTop+10, { width: column4 - column3, align: 'center' });
       doc.moveDown();

       monthlyRevenue.forEach((revenue, index) => {
           const y = tableTop + (index + 1) * rowHeight;
           doc.text(`Tháng ${index + 1}`, column1, y + itemMargin, { width: column2 - column1, align: 'center' });
           doc.text(currentYear.toString(), column2, y + itemMargin, { width: column3 - column2, align: 'center' });
           doc.text(revenue.toLocaleString('vi-VN') + ' VND', column3, y + itemMargin, { width: column4 - column3, align: 'center' });
       });

       // Tổng doanh thu
       const totalY = tableTop + (13) * rowHeight;
       doc.fontSize(14).text('Tổng cộng:', column1, totalY + itemMargin, { width: column2 - column1, align: 'center' });
       doc.text(totalRevenue.toLocaleString('vi-VN') + ' VND', column3, totalY + itemMargin, { width: column4 - column3, align: 'center' });

       // Đường kẻ bảng
       const tableWidth = column4 - column1;
       for (let i = 0; i <= 12; i++) {
           const y = tableTop + i * rowHeight;
           doc.moveTo(column1, y).lineTo(column1 + tableWidth, y).stroke();
       }
       doc.moveTo(column1, tableTop).lineTo(column1, tableTop + 13 * rowHeight).stroke();
       doc.moveTo(column2, tableTop).lineTo(column2, tableTop + 13 * rowHeight).stroke();
       doc.moveTo(column3, tableTop).lineTo(column3, tableTop + 13 * rowHeight).stroke();
       doc.moveTo(column4, tableTop).lineTo(column4, tableTop + 13 * rowHeight).stroke();

       // Đường kẻ cuối cùng
       doc.moveTo(column1, tableTop + 13 * rowHeight).lineTo(column1 + tableWidth, tableTop + 13 * rowHeight).stroke();

      // Ngày báo cáo và nhân viên
      doc.fontSize(12).text(`Ngày báo cáo: ${new Date().toLocaleDateString('vi-VN')}`, 50, tableTop + 16 * rowHeight, { align: 'right' });
      doc.text(`Nhân viên: ${fullname}`, 50, tableTop + 16.5 * rowHeight, { align: 'right' });

      doc.end();

        res.json({ message: 'Báo cáo doanh thu đã được tạo!', reportPath: newReport.reportPath });
    } catch (error) {
        console.error('Lỗi khi tạo báo cáo doanh thu:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi tạo báo cáo doanh thu.' });
    }
});


// Tạo API để tạo báo cáo khách hàng
app.post('/create-customer-report', async (req, res) => {
    try {
        const { employeeId, fullname } = req.body; // Lấy fullname từ body request
        const payments = await Payment.find().lean();
        const currentYear = new Date().getFullYear();

        const bookedRoomIds = payments.map(payment => payment.roomsbookingId);
        const bookedRooms = await BookedRoom.find({ _id: { $in: bookedRoomIds } }).lean();

        const monthlyCustomers = new Array(12).fill(0).map(() => new Set());
        bookedRooms.forEach(room => {
            const month = new Date(room.checkOutDate).getMonth();
            const year = new Date(room.checkOutDate).getFullYear();
            if (year === currentYear) {
                monthlyCustomers[month].add(room.customerId.toString());
            }
        });

        const customerCounts = monthlyCustomers.map(set => set.size);

        // Tạo đối tượng Report mới nhưng chưa lưu vào DB
        const newReport = new Report({
            name: `Báo cáo khách hàng ${currentYear}`,
            type: 'customer',
            date: new Date(),
            employeeId,
            reportPath: '' // Sẽ cập nhật sau
        });

        // Lấy ID của Report mới
        const reportId = newReport._id.toString();
        const filePath = path.join(reportsDir, `${reportId}.pdf`);

        // Cập nhật reportPath cho Report
        newReport.reportPath = `/report/${reportId}.pdf`;

        // Lưu Report vào DB
        await newReport.save();

        // Tạo file PDF báo cáo
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(filePath));

        // Sử dụng font hỗ trợ tiếng Việt
        doc.font(path.join(__dirname, 'fonts', 'RobotoSlab-VariableFont_wght.ttf'));

        // Tiêu đề
        doc.fontSize(12).text('KHÁCH SẠN HẢI ÂU', 50, 20, { align: 'left' });
        doc.fontSize(12).text(`Số: ${reportId}`, 350, 20, { align: 'right' });
        doc.moveDown();
        doc.fontSize(20).text(`BÁO CÁO KHÁCH HÀNG ${currentYear}`, 80, 50, { align: 'center' });
        doc.moveDown();

        // Bảng báo cáo
        const tableTop = 100;
        const itemMargin = 10;
        const rowHeight = 30;

        const column1 = 50 + 60;
        const column2 = 150 + 60;
        const column3 = 250 + 60;
        const column4 = 450 + 60;

        doc.fontSize(12).text('Tháng', column1, tableTop + 10, { width: column2 - column1, align: 'center' });
        doc.text('Năm', column2, tableTop + 10, { width: column3 - column2, align: 'center' });
        doc.text('Số lượng khách hàng', column3, tableTop + 10, { width: column4 - column3, align: 'center' });
        doc.moveDown();

        customerCounts.forEach((count, index) => {
            const y = tableTop + (index + 1) * rowHeight;
            doc.text(`Tháng ${index + 1}`, column1, y + itemMargin, { width: column2 - column1, align: 'center' });
            doc.text(currentYear.toString(), column2, y + itemMargin, { width: column3 - column2, align: 'center' });
            doc.text(count.toLocaleString('vi-VN'), column3, y + itemMargin, { width: column4 - column3, align: 'center' });
        });

        // Tổng khách hàng
        const totalCustomers = customerCounts.reduce((sum, count) => sum + count, 0);
        const totalY = tableTop + (13) * rowHeight;
        doc.fontSize(14).text('Tổng cộng:', column1, totalY + itemMargin, { width: column2 - column1, align: 'center' });
        doc.text(totalCustomers.toLocaleString('vi-VN'), column3, totalY + itemMargin, { width: column4 - column3, align: 'center' });

        // Đường kẻ bảng
        const tableWidth = column4 - column1;
        for (let i = 0; i <= 12; i++) {
            const y = tableTop + i * rowHeight;
            doc.moveTo(column1, y).lineTo(column1 + tableWidth, y).stroke();
        }
        doc.moveTo(column1, tableTop).lineTo(column1, tableTop + 13 * rowHeight).stroke();
        doc.moveTo(column2, tableTop).lineTo(column2, tableTop + 13 * rowHeight).stroke();
        doc.moveTo(column3, tableTop).lineTo(column3, tableTop + 13 * rowHeight).stroke();
        doc.moveTo(column4, tableTop).lineTo(column4, tableTop + 13 * rowHeight).stroke();

        // Đường kẻ cuối cùng
        doc.moveTo(column1, tableTop + 13 * rowHeight).lineTo(column1 + tableWidth, tableTop + 13 * rowHeight).stroke();

        // Ngày báo cáo và nhân viên
        doc.fontSize(12).text(`Ngày báo cáo: ${new Date().toLocaleDateString('vi-VN')}`, 50, tableTop + 16 * rowHeight, { align: 'right' });
        doc.text(`Nhân viên: ${fullname}`, 50, tableTop + 16.5 * rowHeight, { align: 'right' });

        doc.end();

        res.json({ message: 'Báo cáo khách hàng đã được tạo!', reportPath: newReport.reportPath });
    } catch (error) {
        console.error('Lỗi khi tạo báo cáo khách hàng:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra khi tạo báo cáo khách hàng.' });
    }
});

// Tạo API để lấy danh sách báo cáo theo employeeId
app.get('/employee-report', async (req, res) => {
    const { employeeId } = req.query;

    if (!employeeId) {
        return res.status(400).json({ error: 'Cần employeeId' });
    }

    try {
        const reports = await Report.find({ employeeId });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reports' });
    }
});

// // Lấy tất cả các reports
// app.get('/reports', async (req, res) => {
//     try {
//         const reports = await Report.find();
//         res.json(reports);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Lấy thông tin tất cả nhân viên
// app.get('/employees', async (req, res) => {
//     try {
//         const employees = await Employee.find();
//         res.json(employees);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// Lấy report kèm tên nhân viên
app.get('/manager-reports', async (req, res) => {
    try {
        const reports = await Report.find();
        const reportsWithEmployeeNames = await Promise.all(reports.map(async report => {
            const employee = await Employee.findById(report.employeeId).lean();
            return {
                ...report.toObject(),
                employeeName: employee ? employee.fullname : 'Không rõ'
            };
        }));
        res.json(reportsWithEmployeeNames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



//Tạo API "/" để kiểm tra server
app.get('/', (req, res) => {
    res.send("Xin chào, đây là backend ExpressJS");
})

app.listen(port, (e) => {
    if(!e) {
        console.log(`Server đang chạy trên cổng ${port}`);
    }
    else {
        console.log("Lỗi: "+e);
    }
})