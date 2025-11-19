import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../actions/adminAction";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productsAction";
import Loader from "../Layout/Loader";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import MetaData from "../../utils/MetaData";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, loading } = useSelector((state) => state.productState);
  const categorys = [
    "Electronics",
    "Mobile Phone",
    "Laptop",
    "Accessories",
    "Headphones",
    "Bike",
    "Food",
    "Books",
    "ClothesShoes",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    seller: "",
    stock: "",
  });
  const [clearImages, setClearImages] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const onChange = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages((oldImages) => [...oldImages, file]);
            setPreviewImages((oldImages) => [
              ...oldImages,
              { image: reader.result },
            ]);
          }
        };
      });
    } else {
      setProductData({ ...productData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("stock", productData.stock);
    formData.append("seller", productData.seller);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("clearImages", clearImages);
    images.forEach((image) => {
      formData.append("images", image);
    });
    await dispatch(updateProduct(productId, formData));
    toast.success("Product is updated", { position: "bottom-center" });
  };

  const deleteImages = () => {
    setPreviewImages([]);
    setImages([]);
    setClearImages(true);
  };

  useEffect(() => {
    dispatch(getProduct(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    setProductData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      seller: product.seller,
      stock: product.stock,
    });
    setPreviewImages(product.images);
  }, [product]);

  return (
    <div className="row">
      <MetaData title={"Admin update product"} />
      <SideBar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container container-fluid col-12 col-md-9 ml-auto mr-auto">
          <div className="wrapper my-5">
            <form
              onSubmit={handleSubmit}
              className="shadow-lg"
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  defaultValue={product.name}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="number"
                  id="price_field"
                  className="form-control"
                  name="price"
                  defaultValue={product.price}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  name="description"
                  defaultValue={product.description}
                  onChange={onChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select
                  className="form-control"
                  id="category_field"
                  name="category"
                  onChange={onChange}
                  defaultValue={product.category}
                >
                  {categorys.map((category, i) => (
                    <option key={i} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  name="stock"
                  onChange={onChange}
                  defaultValue={product.stock}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  name="seller"
                  onChange={onChange}
                  defaultValue={product.seller}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="images"
                    onChange={onChange}
                    className="custom-file-input"
                    id="customFile"
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                  <div className="flex items-center justify-start">
                    {previewImages?.length > 0 ? (
                      <MdDelete
                        onClick={deleteImages}
                        size={35}
                        className="m-1"
                      />
                    ) : null}
                    <div className="flex overflow-auto m-2">
                      {previewImages?.map((image, i) => (
                        <img
                          key={i}
                          src={image.image}
                          alt="previewImage"
                          width={48}
                          height={48}
                          className="m-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3 m-1"
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
