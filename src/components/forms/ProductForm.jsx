import React, {
    useEffect,
    useState
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    toast
} from "react-toastify";

import {
    createProduct,
    updateProduct,
    getProductById
} from "../../redux/productSlice";

import {
    getAllBrands
} from "../../redux/brandSlice";

import {
    getAllCategories
} from "../../redux/categorySlice";

import Loader from "../common/Loader";

const ProductForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const {
        loading,
        selectedProduct
    } = useSelector(
        state => state.product
    );

    const {
        brands
    } = useSelector(
        state => state.brand
    );

    const {
        categories
    } = useSelector(
        state => state.category
    );

    const [
        formData,
        setFormData
    ] = useState({
        productName: "",
        description: "",
        categoryId: "",
        brandId: "",
        price: "",
        discountPrice: "",
        stock: "",
        sku: "",
        isFeatured: false,
        isActive: true
    });

    const [
        images,
        setImages
    ] = useState([]);

    const [
        previewImages,
        setPreviewImages
    ] = useState([]);

    useEffect(() => {
        dispatch(
            getAllBrands()
        );
        dispatch(
            getAllCategories()
        );
        if (isEdit) {
            dispatch(
                getProductById(id)
            );
        }
    }, [
        dispatch,
        id,
        isEdit
    ]);

    useEffect(() => {
        if (
            isEdit &&
            selectedProduct
        ) {
            setFormData({
                productName:
                    selectedProduct.productName || "",
                description:
                    selectedProduct.description || "",
                categoryId:
                    selectedProduct.categoryId?._id || "",
                brandId:
                    selectedProduct.brandId?._id || "",
                price:
                    selectedProduct.price || "",
                discountPrice:
                    selectedProduct.discountPrice || "",
                stock:
                    selectedProduct.stock || "",
                sku:
                    selectedProduct.sku || "",
                isFeatured:
                    selectedProduct.isFeatured,
                isActive:
                    selectedProduct.isActive
            });

            setPreviewImages(
                selectedProduct.images || []
            );
        }
    }, [
        selectedProduct,
        isEdit
    ]);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData(
            prev => ({
                ...prev,
                [name]:
                    type === "checkbox"
                        ?
                        checked
                        :
                        value
            })
        );
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map((file) =>
            URL.createObjectURL(file)
        );
        setPreviewImages(previews);
    };

    const validateForm = () => {
        if (!formData.productName.trim()) {
            toast.error("Product name is required");
            return false;
        }

        if (!formData.description.trim()) {
            toast.error("Description is required");
            return false;
        }

        if (!formData.categoryId) {
            toast.error("Please select category");
            return false;
        }

        if (!formData.brandId) {
            toast.error("Please select brand");
            return false;
        }

        if (!formData.price || Number(formData.price) <= 0) {
            toast.error("Enter valid price");
            return false;
        }

        if (Number(formData.discountPrice) < 0) {
            toast.error("Invalid discount price");
            return false;
        }

        if (!formData.stock || Number(formData.stock) < 0) {
            toast.error("Enter valid stock");
            return false;
        }

        if (!formData.sku.trim()) {
            toast.error("SKU is required");
            return false;
        }

        if (!isEdit && images.length === 0) {
            toast.error("Please upload product image");
            return false;
        }

        return true;
    };

    // MOVED handleSubmit HERE - before the return statement
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const productData = new FormData();
            productData.append(
                "productName",
                formData.productName
            );
            productData.append(
                "description",
                formData.description
            );
            productData.append(
                "categoryId",
                formData.categoryId
            );
            productData.append(
                "brandId",
                formData.brandId
            );
            productData.append(
                "price",
                formData.price
            );
            productData.append(
                "discountPrice",
                formData.discountPrice || 0
            );
            productData.append(
                "stock",
                formData.stock
            );
            productData.append(
                "sku",
                formData.sku
            );
            productData.append(
                "isFeatured",
                formData.isFeatured
            );
            productData.append(
                "isActive",
                formData.isActive
            );

            images.forEach((image) => {
                productData.append(
                    "images",
                    image
                );
            });

            if (isEdit) {
                await dispatch(
                    updateProduct({
                        id,
                        productData
                    })
                ).unwrap();
                toast.success(
                    "Product updated successfully"
                );
            } else {
                await dispatch(
                    createProduct(
                        productData
                    )
                ).unwrap();
                toast.success(
                    "Product created successfully"
                );
            }

            navigate("/vendor/products");
        } catch (error) {
            toast.error(
                error ||
                "Failed to save product"
            );
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="card shadow border-0">
            <div className="card-body">
                <h3 className="fw-bold mb-4">
                    {
                        isEdit
                            ?
                            "Update Product"
                            :
                            "Add Product"
                    }
                </h3>

                {/* ADDED onSubmit handler HERE */}
                <form onSubmit={handleSubmit}>

                    {/* Product Name */}
                    <div className="mb-3">
                        <label className="form-label">
                            Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>
                        <textarea
                            rows="5"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="row">
                        {/* Category */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Category
                            </label>
                            <select
                                className="form-select"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Category
                                </option>
                                {
                                    categories?.map(category => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.categoryName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Brand
                            </label>
                            <select
                                className="form-select"
                                name="brandId"
                                value={formData.brandId}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Brand
                                </option>
                                {
                                    brands?.map(brand => (
                                        <option
                                            key={brand._id}
                                            value={brand._id}
                                        >
                                            {brand.brandName}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        {/* Price */}
                        <div className="col-md-3 mb-3">
                            <label className="form-label">
                                Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Discount */}
                        <div className="col-md-3 mb-3">
                            <label className="form-label">
                                Discount Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Stock */}
                        <div className="col-md-3 mb-3">
                            <label className="form-label">
                                Stock
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </div>

                        {/* SKU */}
                        <div className="col-md-3 mb-3">
                            <label className="form-label">
                                SKU
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Product Images */}
                    <div className="mb-4">
                        <label className="form-label">
                            Product Images
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {
                        previewImages.length > 0 && (
                            <div className="row mb-4">
                                {
                                    previewImages.map(
                                        (image, index) => (
                                            <div
                                                key={index}
                                                className="col-md-3 mb-3"
                                            >
                                                <img
                                                    src={image}
                                                    alt="Preview"
                                                    className="img-fluid rounded border"
                                                    style={{
                                                        height: "180px",
                                                        width: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        )
                    }

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isFeatured"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="isFeatured"
                                    className="form-check-label"
                                >
                                    Featured Product
                                </label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="isActive"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="isActive"
                                    className="form-check-label"
                                >
                                    Active Product
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {
                                loading
                                    ?
                                    "Saving..."
                                    :
                                    isEdit
                                        ?
                                        "Update Product"
                                        :
                                        "Create Product"
                            }
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;