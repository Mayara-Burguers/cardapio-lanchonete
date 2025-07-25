require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: "Servidor da Mayara Burguer's está no ar!" });
});

// --- ROTAS DE PRODUTOS (COM GERENCIAMENTO COMPLETO) ---
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT p.*, c.nome AS categoria_nome FROM Produtos p JOIN Categorias c ON p.categoria_id = c.id ORDER BY c.ordem, p.id');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/produtos', async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const { nome, descricao, preco_base, categoria_id, subcategoria, preco_pao_especial, preco_pao_baby, imagem_url, receita } = req.body;
        if (!nome || !preco_base || !categoria_id) {
            return res.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' });
        }

        const sqlProduto = 'INSERT INTO Produtos (nome, descricao, preco_base, categoria_id, subcategoria, preco_pao_especial, preco_pao_baby, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await connection.query(sqlProduto, [nome, descricao, preco_base, categoria_id, subcategoria || null, preco_pao_especial || null, preco_pao_baby || null, imagem_url || 'placeholder.jpg']);
        const produtoId = result.insertId;

        if (receita && receita.length > 0) {
            const sqlReceita = 'INSERT INTO Receitas (produto_id, ingrediente_id, quantidade_usada) VALUES ?';
            const values = receita.map(item => [produtoId, item.ingrediente_id, item.quantidade_usada]);
            await connection.query(sqlReceita, [values]);
        }

        await connection.commit();
        res.status(201).json({ id: produtoId, message: 'Produto criado com sucesso!' });
    } catch (error) {
        await connection.rollback();
        console.error("Erro ao criar produto:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    } finally {
        connection.release();
    }
});

app.put('/api/produtos/:id', async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const { id } = req.params;
        const { nome, descricao, preco_base, categoria_id, subcategoria, preco_pao_especial, preco_pao_baby, imagem_url, receita } = req.body;
        if (!nome || !preco_base || !categoria_id) {
            return res.status(400).json({ error: 'Nome, preço e categoria são obrigatórios.' });
        }

        const sqlProduto = 'UPDATE Produtos SET nome=?, descricao=?, preco_base=?, categoria_id=?, subcategoria=?, preco_pao_especial=?, preco_pao_baby=?, imagem_url=? WHERE id=?';
        await connection.query(sqlProduto, [nome, descricao, preco_base, categoria_id, subcategoria || null, preco_pao_especial || null, preco_pao_baby || null, imagem_url || 'placeholder.jpg', id]);

        await connection.query('DELETE FROM Receitas WHERE produto_id = ?', [id]);

        if (receita && receita.length > 0) {
            const sqlReceita = 'INSERT INTO Receitas (produto_id, ingrediente_id, quantidade_usada) VALUES ?';
            const values = receita.map(item => [id, item.ingrediente_id, item.quantidade_usada]);
            await connection.query(sqlReceita, [values]);
        }

        await connection.commit();
        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        await connection.rollback();
        console.error("Erro ao atualizar produto:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    } finally {
        connection.release();
    }
});

app.delete('/api/produtos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Receitas WHERE produto_id = ?', [id]);
        await db.query('DELETE FROM Produtos WHERE id = ?', [id]);
        res.status(200).json({ message: 'Produto apagado com sucesso!' });
    } catch (error) {
        console.error("Erro ao apagar produto:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// --- ROTAS DE RECEITAS ---
app.get('/api/produtos/:id/receita', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            'SELECT r.id, r.ingrediente_id, i.nome as ingrediente_nome, r.quantidade_usada, i.unidade FROM Receitas r JOIN Ingredientes i ON r.ingrediente_id = i.id WHERE r.produto_id = ?',
            [id]
        );
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar receita' });
    }
});

// --- ROTA DE CATEGORIAS ---
app.get('/api/categorias', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Categorias ORDER BY ordem');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/categorias', async (req, res) => {
    try {
        const { nome, ordem } = req.body;
        if (!nome || ordem === undefined) {
            return res.status(400).json({ error: 'Nome e ordem da categoria são obrigatórios.' });
        }
        const [result] = await db.query(
            'INSERT INTO Categorias (nome, ordem) VALUES (?, ?)',
            [nome, ordem]
        );
        res.status(201).json({ id: result.insertId, message: 'Categoria criada com sucesso!' });
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// --- ROTAS DE PEDIDOS ---
app.get('/api/pedidos', async (req, res) => {
    try {
        const [pedidos] = await db.query('SELECT * FROM Pedidos ORDER BY data_hora DESC');
        for (let pedido of pedidos) {
            const [itens] = await db.query('SELECT * FROM Itens_do_Pedido WHERE pedido_id = ?', [pedido.id]);
            pedido.itens = itens;
        }
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/pedidos', async (req, res) => {
    const { cliente_nome, cliente_telefone, cliente_endereco, tipo_entrega, valor_total, itens, saches_alho, molhos } = req.body;
    if (!cliente_nome || !valor_total || !itens) {
        return res.status(400).json({ error: 'Dados do pedido incompletos.' });
    }

    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        for (const item of itens) {
            const [produtoInfo] = await connection.execute('SELECT p.id, c.nome as categoria_nome FROM Produtos p JOIN Categorias c ON p.categoria_id = c.id WHERE p.nome = ?', [item.name]);
            if (produtoInfo.length === 0) {
                throw new Error(`Produto não encontrado: ${item.name}`);
            }
            if (produtoInfo[0].categoria_nome === 'Bebidas') {
                continue;
            }
            const produtoId = produtoInfo[0].id;
            const [receita] = await connection.execute('SELECT ingrediente_id, quantidade_usada FROM Receitas WHERE produto_id = ?', [produtoId]);

            if (receita.length === 0) {
                console.warn(`Aviso: Receita não encontrada para o produto: ${item.name}. O estoque não será deduzido.`);
                continue;
            }
            for (const ingredienteDaReceita of receita) {
                const quantidadeADeduzir = ingredienteDaReceita.quantidade_usada * item.quantity;
                const sqlUpdateEstoque = `UPDATE Ingredientes SET quantidade_estoque = quantidade_estoque - ? WHERE id = ? AND quantidade_estoque >= ?`;
                const [updateResult] = await connection.execute(sqlUpdateEstoque, [quantidadeADeduzir, ingredienteDaReceita.ingrediente_id, quantidadeADeduzir]);
                if (updateResult.affectedRows === 0) {
                    const [ingredienteInfo] = await connection.execute('SELECT nome FROM Ingredientes WHERE id = ?', [ingredienteDaReceita.ingrediente_id]);
                    throw new Error(`Estoque insuficiente para: ${ingredienteInfo[0].nome}`);
                }
            }
        }

        const pedidoSql = `INSERT INTO Pedidos (cliente_nome, cliente_telefone, cliente_endereco, tipo_entrega, valor_total, saches_alho, molhos) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const [pedidoResult] = await connection.execute(pedidoSql, [cliente_nome, cliente_telefone, cliente_endereco, tipo_entrega, valor_total, saches_alho, molhos]);
        const novoPedidoId = pedidoResult.insertId;

        for (const item of itens) {
            const itemSql = `INSERT INTO Itens_do_Pedido (pedido_id, produto_nome, quantidade, preco_unitario, observacoes, adicionais) VALUES (?, ?, ?, ?, ?, ?);`;
            const adicionaisStr = item.extras ? item.extras.join(', ') : null;
            await connection.execute(itemSql, [novoPedidoId, item.name, item.quantity, item.price, item.notes, adicionaisStr]);
        }

        await connection.commit();
        res.status(201).json({ message: 'Pedido criado com sucesso!', pedidoId: novoPedidoId });

    } catch (error) {
        await connection.rollback();
        console.error('Erro ao criar o pedido:', error.message);
        res.status(500).json({ error: `Falha ao processar o pedido. ${error.message}` });
    } finally {
        connection.release();
    }
});

app.put('/api/pedidos/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const statusValidos = ['Recebido', 'Em Preparo', 'Pronto para Retirada', 'Saiu para Entrega', 'Finalizado', 'Cancelado'];

        if (!status || !statusValidos.includes(status)) {
            return res.status(400).json({ error: 'Status inválido.' });
        }
        await db.query('UPDATE Pedidos SET status = ? WHERE id = ?', [status, id]);
        res.status(200).json({ message: 'Status do pedido atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// --- ROTAS DE ESTOQUE (INGREDIENTES) ---
app.get('/api/ingredientes', async (req, res) => {
    try {
        const [ingredientes] = await db.query('SELECT * FROM Ingredientes ORDER BY nome');
        res.status(200).json(ingredientes);
    } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.put('/api/ingredientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade_estoque } = req.body;
        if (quantidade_estoque === undefined) {
            return res.status(400).json({ error: 'Quantidade não fornecida.' });
        }
        await db.query('UPDATE Ingredientes SET quantidade_estoque = ? WHERE id = ?', [quantidade_estoque, id]);
        res.status(200).json({ message: 'Estoque atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar estoque:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar estoque.' });
    }
});

app.post('/api/ingredientes', async (req, res) => {
    try {
        const { nome, quantidade_estoque, unidade } = req.body;
        if (!nome || quantidade_estoque === undefined || !unidade) {
            return res.status(400).json({ error: 'Dados do ingrediente incompletos.' });
        }
        const [result] = await db.query(
            'INSERT INTO Ingredientes (nome, quantidade_estoque, unidade) VALUES (?, ?, ?)',
            [nome, quantidade_estoque, unidade]
        );
        res.status(201).json({ message: 'Ingrediente adicionado com sucesso!', id: result.insertId });
    } catch (error) {
        console.error('Erro ao adicionar ingrediente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.delete('/api/ingredientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Ingredientes WHERE id = ?', [id]);
        res.status(200).json({ message: 'Ingrediente apagado com sucesso!' });
    } catch (error) {
        console.error('Erro ao apagar ingrediente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});