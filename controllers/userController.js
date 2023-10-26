const User = require('../models/User');
const secret = require('../config/auth.json');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const { name,password, email} = req.body;
    const newpassword = await bcrypt.hash(password, 10);
    await User.create({
       name: name,
       password: newpassword,
       email:email


    }).then(() => {
        res.json('Cadastro de usuário realizado com sucesso! ');
        console.log('Cadastro de usuário realizado com sucesso!');
    }).catch((erro) => {
        res.json(' deu pau             ');
        console.log(`É isso amigos  : ${erro}`);
    })
}

const findUsers = async (req, res) => {
    const users    = await User.findAll();
    try {
        res.json(users);
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.json(" Usuário deletado com sucesso  ");
        })
    } catch (error) {
        res.status(404).json("É isso amigos");
    }
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name,password, email} = req.body;
    try {
        await User.update(
            {
                name: name,
       password: password,
       email:email
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("Usuário atualizado realizado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("Usuário atualizado realizado com sucesso!");
    }
}

const authenticatedUser = async (req, res) => {
    const { email, password, newpassword } = req.body;
    const response = await bcrypt.compare(password, newpassword);
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                email: email,
                password: response
            }
        })
        const token = jwt.sign({
            id: email },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email,
            token: token
        });
    } catch (error) {
        return res.json("Usuário não foi encontrado");
    }
}

module.exports = { createUser,  findUsers,deleteUser,updateUser, authenticatedUser};

