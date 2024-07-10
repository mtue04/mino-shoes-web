import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/products/category/${category}?page=${page}`);
                setProducts(data.products);
                setPage(data.page);
                setPages(data.pages);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="product-grid">
                        {products.map((product) => (
                            <div key={product._id} className="product-card">
                                <Link to={`/product/${product._id}`}>
                                    <img src={product.image} alt={product.name} />
                                    <h2>{product.name}</h2>
                                    <p>{product.price}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        {[...Array(pages).keys()].map((x) => (
                            <button
                                key={x + 1}
                                onClick={() => handlePageChange(x + 1)}
                                disabled={x + 1 === page}
                            >
                                {x + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;