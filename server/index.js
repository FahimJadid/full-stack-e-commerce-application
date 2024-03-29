const express = require("express");
const app = express();

require("dotenv").config();
const connectToDatabase = require("./config/database");
const PORT = process.env.PORT || 4040;
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/productCategoryRoutes");
const blogCategoryRouter = require("./routes/blogCategoryRoutes");
const brandRouter = require("./routes/brandRoutes");
const colorRouter = require("./routes/colorRoutes");
const couponRouter = require("./routes/couponRoutes");
const enquiryRouter = require("./routes/enquiryRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/blogCategory", blogCategoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/color", colorRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/enquiry", enquiryRouter);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
    await connectToDatabase();
  } catch (error) {
    console.error("Error starting the server: ", error.message);
    process.exit(1);
  }
};

startServer();
