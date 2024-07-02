import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "colin18@ethereal.email",
    pass: "RvctHYpBB8wJqSzmPB",
  },
});

const sendLowStockEmail = async (toEmail, productName,quantity) => {
  try {
    const info = await transporter.sendMail({
      from: "colin18@ethereal.email", 
      to: toEmail,
      subject: "Low Stock Alert",
      html: `<p>Low stock alert for product: ${productName}</p><br><p> Customer needs ${quantity}`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export { sendLowStockEmail };
