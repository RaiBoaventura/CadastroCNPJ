document.addEventListener('DOMContentLoaded', () => {
    const cnpjInput = document.getElementById('cnpj');
    const partnersContainer = document.getElementById('partners-container');
    const addPartnerButton = document.getElementById('add-partner');
    const commercialRefsContainer = document.getElementById('commercial-refs-container');
    const addCommercialRefButton = document.getElementById('add-commercial-ref');
    const bankRefsContainer = document.getElementById('bank-refs-container');
    const addBankRefButton = document.getElementById('add-bank-ref');
    const capitalSocialInput = document.getElementById('capitalSocial');

    // Máscara para o campo Capital Social (R$)
    function aplicarMascaraMoeda(element) {
        element.addEventListener('input', () => {
            let value = element.value.replace(/[^0-9]/g, '');
            const numericValue = parseInt(value, 10);
            if (isNaN(numericValue)) {
                element.value = '';
                return;
            }
            element.value = (numericValue / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        });
    }

    aplicarMascaraMoeda(capitalSocialInput);

    // Função para buscar dados do CNPJ usando a BrasilAPI
    async function buscarDadosCNPJ(cnpj) {
        const apiUrl = `https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g, '')}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.message) {
                alert('CNPJ não encontrado. Verifique o número e tente novamente.');
                return;
            }

            // Preencher os campos com os dados retornados
            document.getElementById('razaoSocial').value = data.razao_social || '';
            document.getElementById('nomeFantasia').value = data.nome_fantasia || '';
            document.getElementById('inscricaoEstadual').value = data.inscricao_estadual || '';
            document.getElementById('ramoAtividade').value = data.cnae_fiscal_descricao || '';
            document.getElementById('dataFundacao').value = data.data_inicio_atividade || '';
            document.getElementById('capitalSocial').value = data.capital_social || '';

            document.getElementById('logradouro').value = data.logradouro || '';
            document.getElementById('numeroComplemento').value = data.numero || '';
            document.getElementById('bairro').value = data.bairro || '';
            document.getElementById('cidade').value = data.municipio || '';
            document.getElementById('uf').value = data.uf || '';

            // Adicionar sócios automaticamente
            if (data.qsa && data.qsa.length > 0) {
                data.qsa.forEach((socio) => {
                    adicionarSocioCompleto(socio);
                });
            }
        } catch (error) {
            console.error('Erro ao buscar dados do CNPJ:', error);
            alert('Erro ao buscar dados do CNPJ. Tente novamente mais tarde.');
        }
    }

    // Função para buscar dados do endereço usando a API ViaCEP
    async function buscarDadosCEP(cep, container) {
        const apiUrl = `https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado. Verifique o número e tente novamente.');
                return;
            }

            // Preencher os campos de endereço
            container.querySelector('[placeholder="Endereço"]').value = data.logradouro || '';
            container.querySelector('[placeholder="Bairro"]').value = data.bairro || '';
            container.querySelector('[placeholder="Cidade"]').value = data.localidade || '';
            container.querySelector('[placeholder="UF"]').value = data.uf || '';
        } catch (error) {
            console.error('Erro ao buscar dados do CEP:', error);
            alert('Erro ao buscar dados do CEP. Tente novamente mais tarde.');
        }
    }

    // Função para adicionar sócio manualmente
    function adicionarSocioManual() {
        adicionarSocioCompleto({});
    }

    // Função para adicionar sócio com todos os campos, permitindo edição
    function adicionarSocioCompleto(socio = {}) {
        const partnerDiv = document.createElement('div');
        partnerDiv.classList.add('partner-form');
        partnerDiv.innerHTML = `
            <h3>Dados do Sócio</h3>
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" value="${socio.nome_socio || ''}" placeholder="Nome do Sócio">
            </div>
            <div class="form-group">
                <label>Qualificação:</label>
                <input type="text" value="${socio.qualificacao_socio || ''}" placeholder="Qualificação do Sócio">
            </div>
            <div class="form-group">
                <label>Faixa Etária:</label>
                <input type="text" value="${socio.faixa_etaria || ''}" placeholder="Faixa Etária">
            </div>
            <div class="form-group">
                <label>Data de Entrada na Sociedade:</label>
                <input type="date" value="${socio.data_entrada_sociedade || ''}">
            </div>
            <div class="form-group">
                <label>CEP:</label>
                <input type="text" class="cep" placeholder="CEP">
            </div>
            <div class="form-group">
                <label>Endereço:</label>
                <input type="text" placeholder="Endereço">
            </div>
            <div class="form-group">
                <label>Número/Complemento:</label>
                <input type="text" placeholder="Número e Complemento">
            </div>
            <div class="form-group">
                <label>Bairro:</label>
                <input type="text" placeholder="Bairro">
            </div>
            <div class="form-group">
                <label>Cidade:</label>
                <input type="text" placeholder="Cidade">
            </div>
            <div class="form-group">
                <label>UF:</label>
                <input type="text" placeholder="UF" maxlength="2">
            </div>
            <button type="button" class="remove-button">Remover Sócio</button>
        `;
        partnersContainer.appendChild(partnerDiv);

        // Evento para remover o sócio
        partnerDiv.querySelector('.remove-button').addEventListener('click', () => {
            partnersContainer.removeChild(partnerDiv);
        });

        // Evento para buscar o endereço ao preencher o CEP
        const cepInput = partnerDiv.querySelector('.cep');
        cepInput.addEventListener('blur', () => {
            const cep = cepInput.value;
            if (cep.replace(/\D/g, '').length === 8) {
                buscarDadosCEP(cep, partnerDiv);
            }
        });
    }

    // Função para adicionar referência comercial
    function adicionarReferenciaComercial() {
        const refDiv = document.createElement('div');
        refDiv.classList.add('commercial-ref-form');
        refDiv.innerHTML = `
            <h4>Referência Comercial</h4>
            <div class="form-group">
                <label>Fornecedor:</label>
                <input type="text" placeholder="Nome do Fornecedor">
            </div>
            <div class="form-group">
                <label>Telefone:</label>
                <input type="text" placeholder="Telefone">
            </div>
            <div class="form-group">
                <label>Ramo:</label>
                <input type="text" placeholder="Ramo de Atividade">
            </div>
            <div class="form-group">
                <label>Contato:</label>
                <input type="text" placeholder="Nome do Contato">
            </div>
            <button type="button" class="remove-button">Remover Referência</button>
        `;
        commercialRefsContainer.appendChild(refDiv);

        refDiv.querySelector('.remove-button').addEventListener('click', () => {
            commercialRefsContainer.removeChild(refDiv);
        });
    }

    // Função para adicionar referência bancária
    function adicionarReferenciaBancaria() {
        const refDiv = document.createElement('div');
        refDiv.classList.add('bank-ref-form');
        refDiv.innerHTML = `
            <h4>Referência Bancária</h4>
            <div class="form-group">
                <label>Banco:</label>
                <input type="text" placeholder="Nome do Banco">
            </div>
            <div class="form-group">
                <label>Agência:</label>
                <input type="text" placeholder="Agência">
            </div>
            <div class="form-group">
                <label>Conta:</label>
                <input type="text" placeholder="Conta">
            </div>
            <div class="form-group">
                <label>Data de Abertura:</label>
                <input type="date">
            </div>
            <div class="form-group">
                <label>Telefone:</label>
                <input type="text" placeholder="Telefone">
            </div>
            <div class="form-group">
                <label>Gerente:</label>
                <input type="text" placeholder="Nome do Gerente">
            </div>
            <div class="form-group">
                <label>Observações:</label>
                <textarea placeholder="Observações"></textarea>
            </div>
            <button type="button" class="remove-button">Remover Referência</button>
        `;
        bankRefsContainer.appendChild(refDiv);

        refDiv.querySelector('.remove-button').addEventListener('click', () => {
            bankRefsContainer.removeChild(refDiv);
        });
    }

    // Eventos para adicionar referências
    addCommercialRefButton.addEventListener('click', adicionarReferenciaComercial);
    addBankRefButton.addEventListener('click', adicionarReferenciaBancaria);

    // Evento para buscar os dados do CNPJ
    cnpjInput.addEventListener('blur', () => {
        const cnpj = cnpjInput.value;
        if (cnpj.replace(/\D/g, '').length === 14) {
            buscarDadosCNPJ(cnpj);
        } else {
            alert('CNPJ inválido. Verifique e tente novamente.');
        }
    });

    // Evento para adicionar sócio manualmente
    addPartnerButton.addEventListener('click', adicionarSocioManual);
});
