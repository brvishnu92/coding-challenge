import React from "react";
import styled from "styled-components";
import { User } from "../../types";
import { AppHeader, HeaderText, Username } from "./styles";

const Header = ({ user }: { user: User | null }) => {

    return (
        <AppHeader>
            <HeaderText>Analytics Dashboard</HeaderText>
            <Username data-testid='welcome-name'>Welcome, {user ? user.firstName : "Guest"}!</Username>
        </AppHeader>
    )
}

export default Header