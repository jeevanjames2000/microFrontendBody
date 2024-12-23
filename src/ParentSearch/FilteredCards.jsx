import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid2,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import database from "host/database";
import { addToCart } from "host/cartSlice";
export default function FilteredCards() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.config.searchRoute.results);
  const [filteredData, setFilteredData] = useState([]);
  console.log("filteredData: ", filteredData);
  const [Suggestions, setSuggestions] = useState([]);
  const [random, setRandom] = useState([]);
  const getRandomItems = (array, count) => {
    const randomItems = [];
    const max = array.length;
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * max);
      randomItems.push(array[randomIndex]);
    }
    return randomItems;
  };
  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = database.flatMap(
        (category) =>
          category.products?.filter((product) =>
            product.name.toLowerCase().includes(lowerCaseQuery)
          ) ?? []
      );
      setFilteredData(filtered);
      const categoryWithMatch = database
        .filter((category) =>
          category.products?.some((product) =>
            product.name.toLowerCase().includes(lowerCaseQuery)
          )
        )
        .map((category) => category.products)
        .flat();
      setSuggestions(categoryWithMatch);
      if (filteredData.length === 0 && Suggestions.length === 0) {
        const randomCategoryIndex = Math.floor(Math.random() * database.length);
        const randomCategory = database[randomCategoryIndex];
        const randomProducts = getRandomItems(randomCategory.products, 6);
        setRandom(randomProducts);
      }
    } else {
      setFilteredData([]);
      setSuggestions([]);
    }
  }, [searchQuery]);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2">Search Results</Typography>
      {filteredData.length > 0 ? (
        <>
          {}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                p: 1,
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              {filteredData?.slice(0, 5).map((product, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: "230px",
                    borderRadius: 2,
                    boxShadow: 3,
                    flexShrink: 0,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ mt: 1 }}
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
          {}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5">Suggestions</Typography>
            <Grid2 container spacing={2}>
              {Suggestions.map((product, index) => (
                <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="info"
                        sx={{ mt: 1 }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
          {}
          <Box>
            <Typography variant="h5">Similar Products</Typography>
            <Grid2 container spacing={2}>
              {random.map((product, index) => (
                <Grid2 item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: "150px", borderRadius: "4px" }}
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Box
                        display={"flex"}
                        sx={{ justifyContent: "space-between" }}
                      >
                        <div>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ₹{product.price}
                          </Typography>
                        </div>
                        <Button
                          variant="contained"
                          color="info"
                          sx={{ mt: 1 }}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No results found for "{searchQuery}".
        </Typography>
      )}
    </Box>
  );
}
