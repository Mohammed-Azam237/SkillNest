const mailSender = require("../utils/mailSender");

exports.contactUs = async (req, res) => {
  console.log("=== REQUEST BODY RECEIVED ===", req.body);
  console.log("firstName:", req.body.firstName);
  console.log("email:", req.body.email);
  console.log("message:", req.body.message);

  const { firstName, lastName, email, message, phoneNo } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).send({  // ← 400 = Bad Request
      success: false,
      message: "All Fields are required",
    });
  }

  try {
    const data = {
      firstName,
      lastName: lastName || "null",
      email,
      message,
      phoneNo: phoneNo || "null",
    };

    const info = await mailSender(
      process.env.CONTACT_MAIL,
      "Enquiry",
      `<html><body>${Object.keys(data).map(
        (key) => `<p>${key} : ${data[key]}</p>`
      ).join("")}</body></html>`
    );

    console.log("MAIL SENDER INFO:", info);

    if (info) {
      return res.status(200).send({
        success: true,
        message: "Your message has been sent successfully",
      });
    } else {
      return res.status(500).send({   // ← Internal Server Error
        success: false,
        message: "Something went wrong while sending the email",
      });
    }
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).send({     // ← Internal Server Error
      success: false,
      message: "Something went wrong during mail sending",
    });
  }
};
