import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";

const linkData = [
    { link: "/product", label: "Product" },
    { link: "/order-create", label: "Add Order" },
    { link: "/order-list", label: "Order List" },
];

const Layout = () => {
    return (
        <>
            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
