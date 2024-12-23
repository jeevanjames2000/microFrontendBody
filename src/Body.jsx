import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import TopMenu from "./components/TopMenu";
import Ads from "./components/Ads";
import Comp1 from "./components/Comp1";
import Comp2 from "./components/Comp2";
import CartPage from "./components/CartPage";
import BuyNowPage from "./components/BuyNowPage";
import ParentSearchComp from "./ParentSearch/ParentSearchComp";

export default function Body() {
  const isCartOpen = useSelector((state) => state.module.cartStore);
  const buyNow = useSelector((state) => state.module.buynowStore);
  const isSearching = useSelector(
    (state) => state.config.searchRoute.isSearching
  );
  const compHide = useSelector((state) => state.config.compHide);
  const mainRoute = useSelector((state) => state.config.mainRoute);

  useEffect(() => {
    if (isSearching) {
    }
  }, [isSearching]);
  useEffect(() => {
    if (mainRoute) {
      console.log("Reloading page...");
      window.location.reload();
    }
  }, [mainRoute]);

  if (isCartOpen) {
    return <CartPage />;
  }

  if (buyNow && Object.keys(buyNow).length > 0) {
    return <BuyNowPage data={buyNow} />;
  }

  return (
    <Box sx={{ position: "relative", top: 70 }}>
      {compHide ? (
        <ParentSearchComp />
      ) : (
        <>
          <TopMenu />
          <Ads />
          <Comp1 />
          <Comp2 />
        </>
      )}
    </Box>
  );
}
