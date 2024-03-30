import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import axios from "../../app/api";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/auth/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [loading, setLoading] = useState(true);
    const [SubmitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
          navigate('/');
        } else {
          setLoading(false); // Only show the sign-in form if not authenticated
        }
      }, [isAuthenticated, navigate]);
    
    if (loading) {
        return null; // Or a loading spinner
    }
    
    const onFinish = (values) => {
        setSubmitLoading(true);
        axios.post('register', values)
        .then(response => {
            console.log(response);
            const accessToken = response.data.access_token;
            localStorage.setItem('accessToken', accessToken);
            navigate('/');
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setSubmitLoading(false);
        });
    };
    
    return (
        <div className="flex flex-col w-full h-full items-center justify-center ">
            <div className=" p-20 rounded-lg shadow-lg bg-gray-200">
                <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className=""
                >
                    <Form.Item
                        label="Kullanıcı Adı"
                        name="username"
                        rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
                    >
                        <Input />
                    </Form.Item>
                
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{ required: true, message: 'Lütfen email adresinizi giriniz!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button loading={SubmitLoading} type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
    };

export default Register;