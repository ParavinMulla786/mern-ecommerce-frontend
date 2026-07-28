import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { FaFilter, FaTimes } from "react-icons/fa";

import { fetchProducts } from "../../redux/productSlice";

import { fetchActiveCategories } from "../../redux/categorySlice";

import { fetchActiveBrands } from "../../redux/brandSlice";

/* =====================================================
   Product Filter
===================================================== */

const ProductFilter = ({ onFilterChange }) => {
  const dispatch = useDispatch();

  /* =====================================================
     Redux State
  ===================================================== */

  const { activeCategories = [] } = useSelector(
    (state) => state.category
  );

  const { activeBrands = [] } = useSelector(
    (state) => state.brand
  );

  /* =====================================================
     Local State
  ===================================================== */

  const [filters, setFilters] = useState({
    categoryId: "",
    brandId: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    inStock: false,
    sort: "newest",
  });

  useEffect(() => {
    dispatch(fetchActiveCategories());
    dispatch(fetchActiveBrands());
  }, [dispatch]);

  /* =====================================================
     Handle Input Change
  ===================================================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* =====================================================
     Apply Filters
  ===================================================== */

  const applyFilters = () => {
    const params = {};

    if (filters.categoryId) {
      params.categoryId = filters.categoryId;
    }

    if (filters.brandId) {
      params.brandId = filters.brandId;
    }

    if (filters.minPrice) {
      params.minPrice = filters.minPrice;
    }

    if (filters.maxPrice) {
      params.maxPrice = filters.maxPrice;
    }

    if (filters.rating) {
      params.rating = filters.rating;
    }

    if (filters.inStock) {
      params.inStock = true;
    }

    if (filters.sort) {
      params.sort = filters.sort;
    }

    dispatch(fetchProducts(params));

    if (onFilterChange) {
      onFilterChange(params);
    }

    toast.success("Filters Applied");
  };

  /* =====================================================
     Clear Filters
  ===================================================== */

  const clearFilters = () => {
    const reset = {
      categoryId: "",
      brandId: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      inStock: false,
      sort: "newest",
    };

    setFilters(reset);

    dispatch(fetchProducts({}));

    if (onFilterChange) {
      onFilterChange({});
    }

    toast.success("Filters Cleared");
  };

  /* =====================================================
     JSX
  ===================================================== */

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          <FaFilter />
          Product Filters
        </h5>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={clearFilters}
        >
          <FaTimes /> Clear
        </button>
      </div>

      <div className="card-body">

        {/* ============================
            Category
        ============================ */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Category
          </label>

          <select
            className="form-select"
            name="categoryId"
            value={filters.categoryId}
            onChange={handleChange}
          >
            <option value="">All Categories</option>

            {activeCategories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* ============================
            Brand
        ============================ */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Brand
          </label>

          <select
            className="form-select"
            name="brandId"
            value={filters.brandId}
            onChange={handleChange}
          >
            <option value="">All Brands</option>

            {activeBrands.map((brand) => (
              <option
                key={brand._id}
                value={brand._id}
              >
                {brand.brandName}
              </option>
            ))}
          </select>
        </div>

        {/* ============================
            Price Range
        ============================ */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Price Range
          </label>

          <div className="row g-2">

            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
              />
            </div>

            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* ============================
            Rating
        ============================ */}

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Rating
          </label>

          <select
            className="form-select"
            name="rating"
            value={filters.rating}
            onChange={handleChange}
          >
            <option value="">All Ratings</option>

            <option value="5">
              ⭐⭐⭐⭐⭐ 5 Star
            </option>

            <option value="4">
              ⭐⭐⭐⭐ 4+ Star
            </option>

            <option value="3">
              ⭐⭐⭐ 3+ Star
            </option>

            <option value="2">
              ⭐⭐ 2+ Star
            </option>

            <option value="1">
              ⭐ 1+ Star
            </option>
          </select>
        </div>

        {/* ============================
            Stock
        ============================ */}

        <div className="form-check mb-3">

          <input
            className="form-check-input"
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={filters.inStock}
            onChange={handleChange}
          />

          <label
            className="form-check-label"
            htmlFor="inStock"
          >
            In Stock Only
          </label>

        </div>

        {/* ============================
            Sort
        ============================ */}

        <div className="mb-4">

          <label className="form-label fw-semibold">
            Sort By
          </label>

          <select
            className="form-select"
            name="sort"
            value={filters.sort}
            onChange={handleChange}
          >
            <option value="newest">
              Newest First
            </option>

            <option value="priceLow">
              Price: Low to High
            </option>

            <option value="priceHigh">
              Price: High to Low
            </option>
          </select>

        </div>

        {/* ============================
            Apply Button
        ============================ */}

        <button
          className="btn btn-primary w-100"
          onClick={applyFilters}
        >
          Apply Filters
        </button>

      </div>
    </div>
  );
};

export default ProductFilter;