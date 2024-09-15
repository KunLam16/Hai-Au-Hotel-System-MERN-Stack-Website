import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons';
import './BillCell.css'; // import file CSS 

const BillCell = ({ bill }) => {
    const viewInvoice = () => {
        const invoiceUrl = `http://localhost:5000${bill.invoicePath}`;
        window.open(invoiceUrl, '_blank');
    };

    return (
        <div className="bill-cell">
            <p className="bill-id">Mã hóa đơn: <span className='bill-text-custom'>{bill._id}</span></p>
            <p className="bill-date">Ngày tạo: <span className='bill-text-custom'>{new Date(bill.createdAt).toLocaleDateString()}</span></p>
            <div className="bill-actions">
                <button className="button-view" onClick={viewInvoice}>Xem hóa đơn<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className='fa-icon-view-bill' /></button>
            </div>
        </div>
    );
};

export default BillCell;
