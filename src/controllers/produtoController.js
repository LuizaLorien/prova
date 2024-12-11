import { Sequelize } from "sequelize";
import conn from '../config/conn.js';
import { v4 as uuidv4 } from "uuid";


export const buscarProduto = async (req, res) => {
    const checkSql = /*sql*/ `
    SELECT * FROM produtos
    `;

    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const produtos = data;
        res.status(200).json(produtos);
        res.end();
    });
};

export const buscaridProduto = async (req, res) => {
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM produtos`;

    const valiSql = ["produto_id", id];

    
    conn.query(checkSql, valiSql, (err, data) => {
        if(err){
            res.status(500).json({message: `Erro ao buscar os dados!`});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum produto com este ID!"});
        }

        const produto = data;
        res.status(200).json(produto);
        res.end();
    })
};

export const criarProduto = async (req, res) => {
    const { nome, descricao, preco, categoria, status } = req.body;

    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!descricao){
        return res.status(400).json({message: "O descricao não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "A preco não pode ser vazio"});
    }
    if(!categoria){
        return res.status(400).json({message: "a categoria não pode estar vazia"});
    }
    if(!status){
        return res.status(400).json({message: "O status não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `
    SELECT * FROM produtos
    WHERE ?? = ?
    `;
    const validatenome = ["nome", nome]

    conn.query(checkSql, validatenome, (err, data) => {
        if(err){
            console.log(err)
            res.status(500).json({message: "Erro ao cadastrar o produto!"});
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(404).json({message: "2 produtos não podem ter o mesmo nome!"});
        }
        const id = uuidv4();
        const addproduto = /*sql*/ `
        INSERT INTO produtos(?? ,??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?, ?)
        `;
        const insertProduto = ["produto_id", "nome", "descricao", "preco", "categoria", "status", id, nome, descricao, preco, categoria, status];

        conn.query(addproduto, insertProduto, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o produto!"});
                return console.error(err);
            }
            res.status(201).json({message:`produto ${nome} foi cadastrado com sucesso!`});
        })
    });
};

export const editarProduto = (req, res) => {
    const {id} = req.params;
    const {nome, descricao, preco, categoria, status } = req.body;
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!descricao){
        return res.status(400).json({message: "O descricao não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preço não pode ser vazio"});
    }
    if(!categoria){
        return res.status(400).json({message: "A categoria não pode estar vazia"});
    }
    if(!status){
        return res.status(400).json({message: "O status não pode ser vazio"});
    }
   
    
    const checkSql = /*sql*/ `
    SELECT * FROM produtos
    WHERE ?? = ?
    `;
    const validatenome = ["nome", nome]

    conn.query(checkSql, validatenome, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum produto com este ID!"});
        }

        const check = /*sql*/ `
        SELECT * FROM produtos
        `;

        conn.query(check, (err, data) => {
            if(err){
                res.status(500).json({message: "Erro ao buscar os dados!"});
                return console.error(err);
            }

            const index = data.findIndex(produto => produto.id == id)
            data.splice(index, 1)

            if(data.filter(produto => produto.nome == nome).length > 0){
                return res.status(403).json({message: "Já existe um produto com este nome!"})
            }

            const updateSQL = /*sql*/ `
            UPDATE produtos
            SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
            WHERE ?? = ?
            `;

            const updateData = ["nome", nome, "descricao", descricao, "preco", preco, "categoria", categoria, "status", status,  "produto_id", id]

            conn.query(updateSQL, updateData, (err) => {
                if(err){
                    res.status(500).json({message: "erro ao atualizar o produto"})
                    return console.error(err);
                }
                res.status(200).json({message: `O produto ${nome} foi atualizado com sucesso!`});
                res.end()
            })
        })
        
    })
}