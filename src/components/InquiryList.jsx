export default function InquiryList({ inquiries }) {
    return (
      <div className="space-y-4">
        {inquiries.length === 0 && <p>No inquiries found.</p>}
        {inquiries.map((inq) => (
          <div key={inq._id} className="p-4 border border-gray-200 rounded bg-white shadow-sm dark:bg-color-gray-800">
            <p><strong>Name:</strong> {inq.name}</p>
            <p><strong>Email:</strong> {inq.email}</p>
            {inq.type === 'PRODUCT' && (
              <>
                <p><strong>Product:</strong> {inq.product_name}</p>
                <p><strong>Part #:</strong> {inq.part_number}</p>
                <p><strong>Qty:</strong> {inq.quantity}</p>
              </>
            )}
            <p><strong>Message:</strong> {inq.message || inq.comment}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Submitted: {new Date(inq.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }
  