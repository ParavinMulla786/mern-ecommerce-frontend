import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ProductCard from "./ProductCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import ErrorMessage from "../common/ErrorMessage";
import Pagination from "../pagination/Pagination";

import {
  fetchProducts,
  selectProducts,
  selectProductLoading,
  selectProductError,
  selectPagination,
} from "../../redux/productSlice";

const ProductGrid = ({ filters = {} }) => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handlePageChange = (page) => {
    dispatch(
      fetchProducts({
        ...filters,
        page,
      })
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchProducts(filters))}
      />
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="No Products Found"
        description="Try changing filters or search another product."
      />
    );
  }

  return (
    <div>
      <div className="row g-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGrid;