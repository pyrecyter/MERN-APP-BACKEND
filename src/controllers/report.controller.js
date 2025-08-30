import Sale from "../models/sale.model.js";

// get reports based on date range
export const getReports = async (req, res) => {
  try {
    const { from, to } = req.query;
    const reports = await Sale.find({
      createdAt: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });

    const reportsWithTotal = reports.map((report) => {
      let totalPrice = 0;
      report.items.forEach((item) => {
        const itemPrice = item.quantity * item.productUnitPrice;
        totalPrice += itemPrice;
      });
      return { ...report.toObject(), totalPrice };
    });

    res.status(200).json(reportsWithTotal);
  } catch (error) {
    const message = "Error fetching reports";
    console.log(message, ":", error);
    res.status(500).json({ message });
  }
};
