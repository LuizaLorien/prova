import conn from "../config/conn.js";

const produtos = /*sql*/`
    create table if not exists produtos (
        produto_id varchar(60) primary key,
        nome varchar(50) not null,
        descricao varchar(255) not null,
        preco int not null,
        categoria varchar(255) not null,
        status varchar(60) not null
    )
`

conn.query(produtos, (err) => {
    if (err) {console.error("Erro ao criar a tabela: " + err.stack);
      return;
    }
    console.log('[API] Tabela "produtos" criada com sucesso.');
  });