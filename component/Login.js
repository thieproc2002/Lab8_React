import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import MainScreen from './MainScreen';
const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        fetch('http://localhost:3000/account', {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(accountData => {
            console.log(accountData);
            setAccounts(accountData); // Thay đổi setData thành setAccounts
        }).catch(error => {
            // handle error
        })
    }, []);

    const handleLogin = () => {
        const matchedAccount = accounts.find(account => account.username === username && account.password === password);
        if (matchedAccount) {
            navigation.navigate('MainScreen');
        } else {
            alert('Đăng nhập không thành công');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.imgLogomini} source={require('../assets/logomini.png')}>
                </Image>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Đăng nhập</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    onChangeText={text => setUsername(text)}
                />
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Mật khẩu"
                        secureTextEntry={!showPassword}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                        <Feather name={showPassword ? 'eye' : 'eye-off'} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
            <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Onboarding_Step1')}>
                    <Text style={styles.createButtonText}>Tạo tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    logo: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    body: {
        flex: 2
    },
    footer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight:'700'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    passwordInputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    passwordInput: {
        flex: 1,
        height: 40,
    },
    loginButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 50,
        marginTop: 20
    },
    loginButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
        borderWidth:1,
        borderBlockColor:'#0055F9',
        marginBottom:50
    },
    createButtonText: {
        color: 'blue',
        textAlign: 'center'
    },
    forgotPasswordText: {
        marginLeft: 270,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    imgLogomini: {
        width: 185,
        height: 44
    },
});

export default LoginScreen;
