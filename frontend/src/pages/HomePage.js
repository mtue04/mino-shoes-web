import React from "react";
import axios from "axios";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get("/api/products");
            setProducts(data);
        }
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Latest Products</h1>
            <div>
                {products.map(product => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;