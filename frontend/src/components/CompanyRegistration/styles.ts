import styled from "styled-components";
import BackgroundLeft from '../../assets/images/dog.jpg';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-end;
    background-color: white;

    h2 {
        font-size: 24px;
        color: black;
        font-family: Arial, Helvetica, sans-serif;
    }
`;

export const Left = styled.div`
    width: 50%;
    height: 100vh;
    background-image: url(${BackgroundLeft});
    margin: 0;
`;

export const Right = styled.div`
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
        width: 100%;
        height: 55px;
        border: 0px;
        border-bottom: 1px solid black;

        &:focus {
            outline: none;
        }
    }

    button {
        float: right;
        margin-top: 50px;
        background-color: #007bff;
        border: none;
        color: white;
        padding: 20px;
        cursor: pointer;
        border-radius: 10px;
        font-size: 14px;
    }
`;

export const ContainerRight = styled.div`
    width: 80%;
    height: 80%;
`;