import React, { useState, useEffect, FormEvent, useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErros';



import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background }  from './styles';

const SignIn: React.FC = function(){
    const formRef = useRef<FormHandles>(null);

    const handlerSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
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
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handlerSubmit}>
                <h1>Faça seu logon</h1>

                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                <Button type="submit">Entrar</Button>

                <a href="forgot">Esqueci minha senha</a>
            </Form>

            <a href="">
                <FiLogIn/>
                Criar Conta
            </a>
        </Content>

        <Background/>
    </Container>
    );
}

export default SignIn;

