import React, { useState, useEffect, FormEvent, useCallback, useRef } from 'react';
import { FiArrowLeft,FiLogIn, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import * as Yup from 'yup';

import { Form } from '@unform/web';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background }  from './styles';

import getValidationErrors from '../../utils/getValidationErros';

const SignUp: React.FC = function(){
    const formRef = useRef<FormHandles>(null);



    const handlerSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            const retorno = await schema.validate(data, {
                abortEarly: false
            });
            console.log(retorno);


            } catch (err) {
            console.log(err);
            const errors = getValidationErrors(err.inner);

            formRef.current?.setErrors(errors);
        }
    }, [] );

    return (
    <Container>
        <Background/>

        <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handlerSubmit}>
                <h1>Faça seu cadasatro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome"/>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="">
                <FiArrowLeft/>
                Voltar para logon
            </a>
        </Content>


    </Container>
    );
}

export default SignUp;

