/*
============================================================
| JAVASCRIPT FINAL - VERSÃO PÚBLICA E AUTOSSUFICIENTE      |
| Este código NÃO precisa de servidor local (npm) para     |
| funcionar. Ele contém todos os produtos internamente.    |
============================================================
*/
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================
    // INÍCIO DO CARDÁPIO COMPLETO (DADOS DOS PRODUTOS)
    // ==========================================================
    const todosOsProdutos = [
        // --- LANCHES ---
        { id: 1, nome: 'Simples', descricao: 'Carne, salada (alface + tomate), milho, molhos e batata palha', preco_base: 13.00, categoria_nome: 'Lanches', imagem_url: 'simples.jpg', tem_pao_baby: true },
        { id: 2, nome: 'X-Burguer', descricao: 'Carne, presunto, queijo, milho, molhos e batata palha', preco_base: 16.00, categoria_nome: 'Lanches', imagem_url: 'x burguer.jpg', tem_pao_baby: true },
        { id: 3, nome: 'X-Salada', descricao: 'Carne, presunto, queijo, salada (alface + tomate), milho, molhos e batata palha', preco_base: 17.00, categoria_nome: 'Lanches', imagem_url: 'salada.jpg', tem_pao_baby: true },
        { id: 4, nome: 'X-Egg', descricao: 'Ovo, requeijão, carne, presunto, queijo, salada, milho, molhos e batata palha', preco_base: 20.00, categoria_nome: 'Lanches', imagem_url: '331899b7-9d0c-473c-a929-8640037bf571.jpg', tem_pao_baby: true },
        { id: 5, nome: 'X-Calabresa', descricao: 'Calabresa, requeijão, presunto, queijo, salada, milho, molhos e batata palha', preco_base: 20.00, categoria_nome: 'Lanches', imagem_url: 'x calabresa.jpg', tem_pao_baby: true },
        { id: 6, nome: 'X-Frango', descricao: 'Frango, requeijão, presunto, queijo, salada, milho, molhos e batata palha', preco_base: 22.00, categoria_nome: 'Lanches', imagem_url: 'x frango.jpg', tem_pao_baby: true },
        { id: 7, nome: 'X-Bacon', descricao: 'Bacon, requeijão, carne, queijo, presunto, salada, milho, molhos e batata palha', preco_base: 22.00, categoria_nome: 'Lanches', imagem_url: 'x bacon.jpg', tem_pao_baby: true },
        { id: 8, nome: 'Misto Quente', descricao: '2 presuntos, 4 queijos, salada, milho, molhos e batata palha', preco_base: 21.00, categoria_nome: 'Lanches', imagem_url: 'misto.jpg', tem_pao_baby: true },
        { id: 9, nome: 'X-Tudo', descricao: 'Carne, requeijão, presunto, queijo, ovo, bacon, calabresa, salada, milho, molhos e batata palha', preco_base: 25.00, categoria_nome: 'Lanches', imagem_url: 'tudo1.jpg', tem_pao_baby: true },
        { id: 10, nome: 'X-Léozão', descricao: 'Carne, frango, requeijão, presunto, queijo, ovo, bacon, calabresa, salada, milho, molhos e batata palha', preco_base: 28.00, categoria_nome: 'Lanches', imagem_url: 'leozao.jpg', tem_pao_baby: true },
        { id: 11, nome: 'Pão com Linguiça', descricao: 'Linguiça toscana (300g), purê, 2 queijos, salada e molhos', preco_base: 22.00, categoria_nome: 'Lanches', imagem_url: 'Pao-Com-Linguica-Apimentada-Destaque.jpg', tem_pao_baby: false },
        { id: 12, nome: 'X-Contra Filé', descricao: 'Isca de contra filé (300g), purê, 2 queijos, salada e molhos', preco_base: 34.00, categoria_nome: 'Lanches', imagem_url: 'WhatsApp-Image-2019-01-07-at-18.00.43-1024x538.jpeg', tem_pao_baby: false },
        { id: 13, nome: 'Hot Dog Tradicional', descricao: 'Pão, 2 salsicha com molho, purê, tomate, molhos, milho, batata palha', preco_base: 14.00, categoria_nome: 'Hot Dog', imagem_url: 'hot dog.jpg' },
        { id: 14, nome: 'Hot Dog Bacon', descricao: 'Pão, 2 salsicha com molho, bacon, purê, tomate, molhos, milho, batata palha', preco_base: 16.00, categoria_nome: 'Hot Dog', imagem_url: 'hot bacon.jpeg' },
        { id: 15, nome: 'Hot Dog Queijo', descricao: 'Pão, 2 salsicha com molho, mussarela, purê, tomate, molhos, milho, batata palha', preco_base: 16.00, categoria_nome: 'Hot Dog', imagem_url: 'hot queijo.jpg' },
        { id: 16, nome: 'Hot Dog Bacon com Queijo', descricao: 'Pão, 2 salsicha com molho, bacon, mussarela, purê, tomate, molhos, milho, batata palha', preco_base: 18.00, categoria_nome: 'Hot Dog', imagem_url: 'bacon e queijo.jpg' },
        { id: 17, nome: 'Hot Dog Na Chapa', descricao: 'Pão, 4 salsichas, bacon, queijo, catupiry, cheddar, purê, tomate, molhos, milho, batata palha', preco_base: 32.00, categoria_nome: 'Hot Dog', imagem_url: 'hot na chapa.avif' },
        { id: 18, nome: 'Pastel de Carne Moída', descricao: '', preco_base: 10.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel carne moida.jpg' },
        { id: 19, nome: 'Pastel de Queijo', descricao: '', preco_base: 10.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel de uqeijo.jpg' },
        { id: 20, nome: 'Pastel de Frango', descricao: '', preco_base: 10.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel frango.jpg' },
        { id: 21, nome: 'Pastel de Calabresa', descricao: '', preco_base: 10.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel calabresa.jpg' },
        { id: 22, nome: 'Pastel de Pizza', descricao: '(Presunto, queijo e tomate)', preco_base: 12.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel pizza.jpg' },
        { id: 23, nome: 'Pastel de Palmito', descricao: '', preco_base: 12.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel de palmito.jpg' },
        { id: 24, nome: 'Pastel de Frango C/ Requeijão', descricao: '', preco_base: 12.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'frango requeijao.jpg' },
        { id: 25, nome: 'Pastel de Brócolis C/ Bacon', descricao: '', preco_base: 15.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel brocolis.jpg' },
        { id: 26, nome: 'Pastel de Frango C/ Catupiry', descricao: '', preco_base: 15.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'frango catupiry.jpg' },
        { id: 27, nome: 'Pastel de Strogonoff de Frango', descricao: '(Acompanha Batata Palha)', preco_base: 18.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel strogonof.jpg' },
        { id: 28, nome: 'Pastel de Strogonoff de Carne', descricao: '(Acompanha Batata Palha)', preco_base: 18.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'strogonoff de carne.jpg' },
        { id: 29, nome: 'Pastel de Vento', descricao: '', preco_base: 5.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'pastel vento.jpg', semAdicionais: true },
        { id: 30, nome: 'Massinha', descricao: '', preco_base: 5.00, categoria_nome: 'Pastéis', subcategoria: 'Salgados', imagem_url: 'massinha.jpg', semAdicionais: true },
        { id: 31, nome: 'Pastel de Chocolate', descricao: '', preco_base: 10.00, categoria_nome: 'Pastéis', subcategoria: 'Doces', imagem_url: 'pastel chocolate.jpg' },
        { id: 32, nome: 'Pastel de Doce de Leite', descricao: '', preco_base: 10.00, categoria_nome: 'Pastéis', subcategoria: 'Doces', imagem_url: 'pastel caramelo.jpg' },
        { id: 33, nome: 'Pastel de Brigadeiro', descricao: '', preco_base: 12.00, categoria_nome: 'Pastéis', subcategoria: 'Doces', imagem_url: 'pastel brigadeiro.jpg' },
        { id: 34, nome: 'Pastel Romeu e Julieta', descricao: 'Queijo com goiabada', preco_base: 15.00, categoria_nome: 'Pastéis', subcategoria: 'Doces', imagem_url: 'pastel romeu.jpg' },
        { id: 35, nome: 'Pastel de Creme de Avelã', descricao: '', preco_base: 16.00, categoria_nome: 'Pastéis', subcategoria: 'Doces', imagem_url: 'creme avela.png' },
        { id: 36, nome: 'Pastel de Nutella ou Ninho', descricao: '', preco_base: 18.00, categoria_nome: 'Pastéis', subcategoria: 'Doces', imagem_url: 'pastel ninho ou nutela.jpg' },
        { id: 37, nome: 'Açaí 300ml', descricao: 'Açaí puro com direito a adicionais', preco_base: 8.00, categoria_nome: 'Açaí & Cupuaçu', imagem_url: '300 mçl.jpg' },
        { id: 38, nome: 'Açaí 500ml', descricao: 'Açaí puro com direito a adicionais', preco_base: 12.00, categoria_nome: 'Açaí & Cupuaçu', imagem_url: '500 ml.jpg' },
        { id: 39, nome: 'Açaí 700ml', descricao: 'Açaí puro com direito a adicionais', preco_base: 14.00, categoria_nome: 'Açaí & Cupuaçu', imagem_url: '700 ml.jpg' },
        { id: 40, nome: 'Açaí 1 Litro', descricao: 'Açaí puro com direito a adicionais', preco_base: 18.00, categoria_nome: 'Açaí & Cupuaçu', imagem_url: '1L.jpg' },
        { id: 41, nome: 'Batata Frita', descricao: 'Aproximadamente 500g', preco_base: 25.00, categoria_nome: 'Porções', imagem_url: 'batata_frita.jpg' },
        { id: 42, nome: 'Batata Frita c/ Queijo', descricao: 'Aproximadamente 500g', preco_base: 30.00, categoria_nome: 'Porções', imagem_url: 'batata_queijo.jpg' },
        { id: 43, nome: 'Batata Frita c/ Queijo e Bacon', descricao: 'Aproximadamente 500g', preco_base: 35.00, categoria_nome: 'Porções', imagem_url: 'batata_bacon.jpg' },
        { id: 44, nome: 'Batata Frita c/ Queijo, Bacon, Catupiry e Cheddar', descricao: 'Aproximadamente 500g', preco_base: 45.00, categoria_nome: 'Porções', imagem_url: 'batata_completa.jpg' },
        { id: 45, nome: 'Nuggets', descricao: 'Aproximadamente 500g', preco_base: 35.00, categoria_nome: 'Porções', imagem_url: 'nuggets.jpg' },
        { id: 46, nome: 'Anel de Cebola', descricao: 'Aproximadamente 500g', preco_base: 35.00, categoria_nome: 'Porções', imagem_url: 'anel_cebola.jpg' },
        { id: 47, nome: 'Calabresa Acebolada', descricao: 'Aproximadamente 500g', preco_base: 30.00, categoria_nome: 'Porções', imagem_url: 'calabresa_acebolada.jpg' },
        { id: 48, nome: 'Batata - Strogonoff de Frango', descricao: 'Acompanha molho, requeijão e batata palha', preco_base: 20.00, categoria_nome: 'Batatas Recheadas', imagem_url: 'batata_strogonoff_frango.jpg' },
        { id: 49, nome: 'Batata - Strogonoff de Carne', descricao: 'Acompanha molho, requeijão e batata palha', preco_base: 20.00, categoria_nome: 'Batatas Recheadas', imagem_url: 'batata_strogonoff_carne.jpg' },
        { id: 50, nome: 'Batata - Bolonhesa', descricao: 'Acompanha molho, requeijão e batata palha', preco_base: 20.00, categoria_nome: 'Batatas Recheadas', imagem_url: 'batata_bolonhesa.jpg' },
        { id: 51, nome: 'Coca-Cola Lata 350ml', descricao: '', preco_base: 5.00, categoria_nome: 'Bebidas', imagem_url: 'coca_lata.jpg', semAdicionais: true },
        { id: 52, nome: 'Guaraná Antartica Lata 350ml', descricao: '', preco_base: 5.00, categoria_nome: 'Bebidas', imagem_url: 'guarana_lata.jpg', semAdicionais: true },
        { id: 53, nome: 'Coca-Cola 2L', descricao: '', preco_base: 15.00, categoria_nome: 'Bebidas', imagem_url: 'coca_2l.jpg', semAdicionais: true },
    ];
    const adicionaisLanches = [{ nome: 'Ovo', preco: 2.50 }, { nome: 'Alface', preco: 2.50 }, { nome: 'Milho', preco: 2.50 }, { nome: 'Cebola', preco: 2.50 }, { nome: 'Tomate', preco: 2.50 }, { nome: 'Cheddar', preco: 2.50 }, { nome: 'Batata Palha', preco: 3.00 }, { nome: 'Requeijão', preco: 3.00 }, { nome: 'Mussarela', preco: 3.00 }, { nome: 'Apresuntado', preco: 3.00 }, { nome: 'Carne Extra', preco: 3.00 }, { nome: 'Salsicha', preco: 5.00 }, { nome: 'Brócolis', preco: 5.00 }, { nome: 'Calabresa', preco: 6.00 }, { nome: 'Frango', preco: 6.00 }, { nome: 'Purê de Batata', preco: 6.00 }, { nome: 'Catupiry Original', preco: 6.00 }, { nome: 'Linguiça Toscana', preco: 6.00 }, { nome: 'Bacon', preco: 6.00 }];
    const adicionaisHotDog = [{ nome: 'Milho', preco: 2.50 }, { nome: 'Tomate', preco: 2.50 }, { nome: 'Batata Palha', preco: 3.00 }, { nome: 'Purê', preco: 6.00 }, { nome: 'Brócolis', preco: 6.00 }, { nome: 'Frango', preco: 6.00 }, { nome: 'Bacon', preco: 6.00 }, { nome: 'Requeijão', preco: 2.50 }, { nome: 'Cheddar', preco: 2.50 }, { nome: 'Queijo', preco: 6.00 }, { nome: 'Calabresa', preco: 6.00 }, { nome: 'Carne Moída', preco: 6.00 }, { nome: 'Catupiry Original', preco: 6.00 }];
    const adicionaisPastelSalgado = [{ nome: 'Milho', preco: 2.50 }, { nome: 'Tomate', preco: 2.50 }, { nome: 'Requeijão', preco: 2.50 }, { nome: 'Cheddar', preco: 2.50 }, { nome: 'Vinagrete', preco: 2.50 }, { nome: 'Purê', preco: 6.00 }, { nome: 'Brócolis', preco: 6.00 }, { nome: 'Frango', preco: 6.00 }, { nome: 'Bacon', preco: 6.00 }, { nome: 'Queijo', preco: 6.00 }, { nome: 'Calabresa', preco: 6.00 }, { nome: 'Carne Moída', preco: 6.00 }, { nome: 'Catupiry Original', preco: 6.00 }, { nome: 'Palmito', preco: 6.00 }];
    const adicionaisPastelDoce = [{ nome: 'Morango', preco: 4.00 }, { nome: 'Banana', preco: 4.00 }, { nome: 'Uva', preco: 4.00 }, { nome: 'Kiwi', preco: 4.00 }];
    const adicionaisAcai = [{ nome: 'Amendoim', preco: 2.50 }, { nome: 'Coco ralado', preco: 2.50 }, { nome: 'Granola', preco: 2.50 }, { nome: 'Banana', preco: 2.50 }, { nome: 'Confete', preco: 2.50 }, { nome: 'Leite em pó', preco: 2.50 }, { nome: 'Bis', preco: 2.50 }, { nome: 'Doce de Leite', preco: 2.50 }, { nome: 'Leite Condensado', preco: 2.50 }, { nome: 'Canudinho', preco: 2.50 }, { nome: 'Farinha Lactea', preco: 2.50 }, { nome: 'Gotas de Chocolate', preco: 2.50 }, { nome: 'Ovomaltine', preco: 2.50 }, { nome: 'Paçoca', preco: 2.50 }, { nome: 'Sucrilhos', preco: 2.50 }, { nome: 'Morango', preco: 4.00 }, { nome: 'Uva', preco: 4.00 }, { nome: 'Kiwi', preco: 4.00 }, { nome: 'Sonho de valsa', preco: 4.00 }, { nome: 'Kit Kat', preco: 4.00 }, { nome: 'Leite Ninho', preco: 4.00 }, { nome: 'Brigadeiro de Colher', preco: 4.00 }, { nome: 'Ouro branco', preco: 4.00 }, { nome: 'Creme de Avelã', preco: 6.00 }, { nome: 'Nutella', preco: 8.00 }];
    const adicionaisPorcao = [{ nome: 'Vinagrete', preco: 2.50 }];
    const adicionaisBatataRecheada = [{ nome: 'Requeijão', preco: 2.50 }, { nome: 'Cheddar', preco: 2.50 }, { nome: 'Milho', preco: 2.50 }, { nome: 'Batata Palha', preco: 5.00 }, { nome: 'Apresuntado', preco: 5.00 }, { nome: 'Brócolis', preco: 5.00 }, { nome: 'Frango', preco: 6.00 }, { nome: 'Queijo', preco: 6.00 }, { nome: 'Bacon', preco: 6.00 }, { nome: 'Catupiry Original', preco: 6.00 }, { nome: 'Calabresa', preco: 6.00 }];
    const menuContainer = document.getElementById('menu-container');
    const navContainer = document.getElementById('nav-categorias');
    const modalGenericoEl = document.getElementById('modalGenerico');
    const modalGenerico = new bootstrap.Modal(modalGenericoEl);
    function renderizarMenu() {
        const categorias = todosOsProdutos.reduce((acc, produto) => {
            const catNome = produto.categoria_nome || 'Outros';
            (acc[catNome] = acc[catNome] || []).push(produto);
            return acc;
        }, {});
        navContainer.innerHTML = '';
        menuContainer.innerHTML = '';
        let primeiro = true;
        for (const nomeCategoria in categorias) {
            const slug = nomeCategoria.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            navContainer.innerHTML += `<a href="#${slug}" class="btn btn-orange ${primeiro ? 'active' : ''}">${nomeCategoria}</a>`;
            const section = document.createElement('section');
            section.id = slug;
            section.className = 'categoria py-4';
            if (!primeiro) section.style.display = 'none';
            let produtosHtml = `<h2 class="text-center mb-4">${nomeCategoria}</h2>`;
            const temSubcategorias = categorias[nomeCategoria].some(p => p.subcategoria);
            if (temSubcategorias) {
                const subcategorias = categorias[nomeCategoria].reduce((acc, produto) => {
                    const subcatNome = produto.subcategoria || 'Salgados';
                    (acc[subcatNome] = acc[subcatNome] || []).push(produto);
                    return acc;
                }, {});
                for (const nomeSubcat in subcategorias) {
                    produtosHtml += `<h4 class="text-center text-muted mb-3 mt-4">${nomeSubcat}</h4><div class="row g-4">`;
                    subcategorias[nomeSubcat].forEach(produto => {
                        produtosHtml += criarCardProduto(produto);
                    });
                    produtosHtml += `</div>`;
                }
            } else {
                produtosHtml += `<div class="row g-4">`;
                categorias[nomeCategoria].forEach(produto => {
                    produtosHtml += criarCardProduto(produto);
                });
                produtosHtml += `</div>`;
            }
            section.innerHTML = produtosHtml;
            menuContainer.appendChild(section);
            primeiro = false;
        }
    }
    function criarCardProduto(produto) {
        const buttonHtml = produto.semAdicionais
            ? `<button class="btn btn-sm btn-orange simple-add-btn" data-item='${JSON.stringify({ nome: produto.nome, preco: produto.preco_base })}'>Adicionar</button>`
            : `<button class="btn btn-sm btn-orange btn-personalize" data-product-id="${produto.id}"><i class="fas fa-utensils"></i> Personalizar</button>`;
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card item h-100">
                    <img src="${produto.imagem_url || 'placeholder.jpg'}" class="card-img-top" alt="${produto.nome}">
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">${produto.nome}</h3>
                        <p class="card-text">${produto.descricao || ''}</p>
                        <div class="d-flex justify-content-between align-items-center mt-auto">
                            <span class="price">${parseFloat(produto.preco_base).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            ${buttonHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    function preencherEabrirModal(produto) {
        const modalBody = modalGenericoEl.querySelector('.modal-body');
        modalGenericoEl.querySelector('.nome-lanche').textContent = produto.nome;
        modalGenericoEl.dataset.baseprice = produto.preco_base;
        let htmlPao = '';
        if (produto.categoria_nome === 'Lanches') {
            htmlPao = `
                <div class="option-group">
                    <div class="option-title"><i class="fas fa-bread-slice"></i> Tipo de Pão</div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="paoGenerico" id="paoPadrao" value="Pão de Hambúrguer" checked data-price="0">
                        <label class="form-check-label" for="paoPadrao">Pão de Hambúrguer (Padrão)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="paoGenerico" id="paoFrances" value="Pão Francês" data-price="2.00">
                        <label class="form-check-label" for="paoFrances">Pão Francês <span class="price-change">+R$ 2,00</span></label>
                    </div>`;
            if (produto.tem_pao_baby) {
                htmlPao += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="paoGenerico" id="paoBaby" value="Pão Baby" data-price="-3.00">
                        <label class="form-check-label" for="paoBaby">Pão Baby <span class="price-change">-R$ 3,00</span></label>
                    </div>`;
            }
            htmlPao += `</div>`;
        }
        let listaAdicionais = [];
        if (!produto.semAdicionais) {
            switch (produto.categoria_nome) {
                case 'Lanches': listaAdicionais = adicionaisLanches; break;
                case 'Hot Dog': listaAdicionais = adicionaisHotDog; break;
                case 'Pastéis': listaAdicionais = (produto.subcategoria === 'Doces') ? adicionaisPastelDoce : adicionaisPastelSalgado; break;
                case 'Açaí & Cupuaçu': listaAdicionais = adicionaisAcai; break;
                case 'Porções': listaAdicionais = adicionaisPorcao; break;
                case 'Batatas Recheadas': listaAdicionais = adicionaisBatataRecheada; break;
            }
        }
        let htmlAdicionais = '';
        if (listaAdicionais.length > 0) {
            htmlAdicionais = `<div class="option-group"><div class="option-title"><i class="fas fa-plus-circle"></i> Adicionais</div><div class="adicional-section">`;
            listaAdicionais.forEach((ad, index) => {
                htmlAdicionais += `
                    <div class="adicional-item">
                        <input type="checkbox" class="form-check-input adicional-checkbox" id="adicional-${index}">
                        <label for="adicional-${index}" class="form-check-label">${ad.nome} <span class="price-change">+${ad.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></label>
                        <input type="number" class="form-control adicional-quantidade" min="0" value="0" data-nome="${ad.nome}" data-price="${ad.preco}" disabled>
                    </div>`;
            });
            htmlAdicionais += `</div></div>`;
        }
        modalBody.innerHTML = htmlPao + htmlAdicionais + `
            <div class="option-group">
                <div class="option-title"><i class="fas fa-edit"></i> Observações</div>
                <textarea class="observacoes-textarea form-control" placeholder="Ex: Sem cebola, carne bem passada, etc."></textarea>
            </div>
            <div class="current-price">Total: R$ <span class="preco-final">0,00</span></div>
        `;
        atualizarPreco(modalGenericoEl);
        modalGenerico.show();
    }
    navContainer.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            e.preventDefault();
            navContainer.querySelectorAll('a').forEach(el => el.classList.remove('active'));
            link.classList.add('active');
            menuContainer.querySelectorAll('.categoria').forEach(cat => cat.style.display = 'none');
            const destino = document.querySelector(link.getAttribute('href'));
            if (destino) destino.style.display = 'block';
        }
    });
    menuContainer.addEventListener('click', (e) => {
        const btnPersonalize = e.target.closest('.btn-personalize');
        const btnSimpleAdd = e.target.closest('.simple-add-btn');
        if (btnPersonalize) {
            const produtoId = parseInt(btnPersonalize.dataset.productId);
            const produto = todosOsProdutos.find(p => p.id === produtoId);
            if (produto) preencherEabrirModal(produto);
        }
        if (btnSimpleAdd) {
            const itemData = JSON.parse(btnSimpleAdd.dataset.item);
            adicionarAoCarrinho({ nome: itemData.nome, preco: itemData.preco, quantidade: 1, extras: [], observacoes: '' });
            alert(`${itemData.nome} adicionado ao carrinho!`);
        }
    });
    function atualizarPreco(modal) {
        let total = parseFloat(modal.dataset.baseprice || 0);
        modal.querySelectorAll('input[name="paoGenerico"]:checked').forEach(radio => total += parseFloat(radio.dataset.price || 0));
        modal.querySelectorAll('.adicional-item').forEach(item => {
            total += (parseInt(item.querySelector('.adicional-quantidade').value) || 0) * (parseFloat(item.querySelector('.adicional-quantidade').dataset.price) || 0);
        });
        modal.querySelector('.preco-final').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    modalGenericoEl.addEventListener('change', e => {
        if (e.target.matches('.adicional-checkbox, input[name="paoGenerico"]')) {
            if (e.target.matches('.adicional-checkbox')) {
                const quantidadeInput = e.target.nextElementSibling.nextElementSibling;
                quantidadeInput.disabled = !e.target.checked;
                if (!e.target.checked) quantidadeInput.value = 0;
                else if (quantidadeInput.value === '0') quantidadeInput.value = 1;
            }
            atualizarPreco(modalGenericoEl);
        }
    });
    modalGenericoEl.addEventListener('input', e => {
        if (e.target.matches('.adicional-quantidade')) {
            atualizarPreco(modalGenericoEl);
        }
    });
    function adicionarAoCarrinho(item) {
        const carrinho = JSON.parse(localStorage.getItem("cart")) || [];
        carrinho.push(item);
        localStorage.setItem("cart", JSON.stringify(carrinho));
        // Adicionar chamada para renderizar carrinho aqui se tiver a função
    }
    document.querySelector('#modalGenerico .btn-add-custom').addEventListener('click', function () {
        const modal = this.closest('.modal-personalizacao');
        const nomeProduto = modal.querySelector('.nome-lanche').textContent.trim();
        const precoFinalStr = modal.querySelector('.preco-final').textContent;
        const preco = parseFloat(precoFinalStr.replace('R$', '').replace('.', '').replace(',', '.').trim());
        const paoEl = modal.querySelector('input[name="paoGenerico"]:checked');
        const pao = paoEl ? paoEl.value : null;
        const adicionais = Array.from(modal.querySelectorAll('.adicional-quantidade'))
            .filter(i => i.value > 0)
            .map(i => `${i.value}x ${i.dataset.nome}`);
        const observacoes = modal.querySelector('.observacoes-textarea').value.trim();
        adicionarAoCarrinho({ nome: nomeProduto, pão: pao, extras: adicionais, observacoes: observacoes, quantidade: 1, preco: preco });
        alert(`${nomeProduto} foi personalizado e adicionado ao carrinho!`);
        modalGenerico.hide();
    });
    renderizarMenu();
    if (document.querySelector('#nav-categorias a')) {
        document.querySelector('#nav-categorias a').click();
    }
});
